const fs = require("node:fs");
const path = require("node:path");
const MarkdownIt = require("markdown-it");

const root = path.resolve(__dirname, "..");
const postsDir = path.join(root, "posts");
const outFile = path.join(root, "assets", "posts.js");
const modifiedTimesFile = path.join(root, "assets", "post-modified-times.json");
const useRecordedTimes = process.argv.includes("--use-recorded-times");
const markdown = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: false,
});

function readRecordedTimes() {
  if (!fs.existsSync(modifiedTimesFile)) return {};
  try {
    return JSON.parse(fs.readFileSync(modifiedTimesFile, "utf8"));
  } catch {
    return {};
  }
}

const recordedTimes = readRecordedTimes();
const nextRecordedTimes = {};

function modifiedTimeFor(filePath, source, meta) {
  let modified;
  if (useRecordedTimes) {
    modified = recordedTimes[source] || meta.updated || meta.date || fs.statSync(filePath).mtime.toISOString();
  } else {
    modified = fs.statSync(filePath).mtime.toISOString();
  }
  nextRecordedTimes[source] = modified;
  return modified;
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    return entry.isFile() && entry.name.toLowerCase().endsWith(".md") ? [fullPath] : [];
  });
}

function slugify(text) {
  const plain = text.replace(/<[^>]+>/g, "").trim();
  return plain
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\u4e00-\u9fa5\-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

function parseFrontMatter(raw) {
  raw = raw.replace(/^\uFEFF/, "");
  if (!raw.startsWith("---")) return [{}, raw.trim()];
  const end = raw.indexOf("\n---", 3);
  if (end === -1) return [{}, raw.trim()];
  const frontMatter = raw.slice(3, end).trim();
  const body = raw.slice(end + 4).trim();
  const meta = {};
  frontMatter.split(/\r?\n/).forEach((line) => {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) return;
    const [, key, value] = match;
    meta[key] = parseValue(value);
  });
  return [meta, body];
}

function parseValue(value) {
  const trimmed = value.trim();
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    return trimmed.slice(1, -1).split(",").map((s) => s.trim().replace(/^["']|["']$/g, "")).filter(Boolean);
  }
  return trimmed.replace(/^["']|["']$/g, "");
}

function inlineText(token) {
  if (!token) return "";
  if (Array.isArray(token.children)) {
    return token.children.map((child) => {
      if (child.type === "softbreak" || child.type === "hardbreak") return " ";
      return child.content || inlineText(child);
    }).join("");
  }
  return token.content || "";
}

function renderMarkdown(source) {
  const env = {};
  const tokens = markdown.parse(source, env);
  const headings = [];
  const slugCounts = new Map();

  tokens.forEach((token, index) => {
    if (token.type !== "heading_open") return;
    const inline = tokens[index + 1];
    const text = inlineText(inline).trim();
    const base = slugify(text) || `heading-${headings.length + 1}`;
    const count = slugCounts.get(base) || 0;
    slugCounts.set(base, count + 1);
    const id = count ? `${base}-${count + 1}` : base;
    token.attrSet("id", id);
    headings.push({ id, level: Number(token.tag.slice(1)), text });
  });

  const paragraphs = [];
  tokens.forEach((token, index) => {
    if (token.type === "inline") {
      const text = inlineText(token).trim();
      if (tokens[index - 1]?.type === "paragraph_open" && text) paragraphs.push(text);
    }
  });

  const excerpt = paragraphs[0] || "";
  return {
    html: markdown.renderer.render(tokens, markdown.options, env),
    headings,
    excerpt: excerpt.length > 120 ? `${excerpt.slice(0, 120)}...` : excerpt,
  };
}

function deriveCategory(filePath) {
  const rel = path.relative(postsDir, filePath).replace(/\\/g, "/");
  const parts = rel.split("/");
  parts.pop();
  return {
    parts,
    l1: parts[0] || "",
    l2: parts.slice(1).join(" / "),
    category: parts.join(" / "),
  };
}

const posts = walk(postsDir)
  .map((filePath) => {
    const raw = fs.readFileSync(filePath, "utf8");
    const [meta, body] = parseFrontMatter(raw);
    const cat = deriveCategory(filePath);
    const rendered = renderMarkdown(body);
    const category = cat.category || meta.category || "未分类";
    const source = path.relative(root, filePath).replace(/\\/g, "/");
    const updated = modifiedTimeFor(filePath, source, meta);
    return {
      id: meta.slug || slugify(meta.title || filePath),
      title: meta.title || path.basename(filePath, ".md"),
      date: meta.date || "1970-01-01",
      updated,
      category,
      catL1: cat.l1 || meta.catL1 || meta.category || "未分类",
      catL2: cat.category ? cat.l2 : (meta.catL2 || ""),
      tags: Array.isArray(meta.tags) ? meta.tags : [],
      excerpt: meta.excerpt || rendered.excerpt,
      html: rendered.html,
      headings: rendered.headings,
      source,
    };
  })
  .sort((a, b) => new Date(b.updated) - new Date(a.updated));

fs.mkdirSync(path.dirname(outFile), { recursive: true });
if (!useRecordedTimes) {
  fs.writeFileSync(modifiedTimesFile, `${JSON.stringify(nextRecordedTimes, null, 2)}\n`, "utf8");
}
fs.writeFileSync(outFile, `window.BLOG_POSTS = ${JSON.stringify(posts)};\n`, "utf8");
console.log(`Generated ${posts.length} posts -> ${path.relative(root, outFile)}`);
