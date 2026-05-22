const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const postsDir = path.join(root, "posts");
const outFile = path.join(root, "assets", "posts.js");

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    return entry.isFile() && entry.name.toLowerCase().endsWith(".md") ? [fullPath] : [];
  });
}

function slugify(filePath) {
  const relative = path.relative(postsDir, filePath).replace(/\\/g, "/");
  return relative
    .replace(/\.md$/i, "")
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseFrontMatter(raw) {
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
    return trimmed
      .slice(1, -1)
      .split(",")
      .map((item) => item.trim().replace(/^["']|["']$/g, ""))
      .filter(Boolean);
  }
  return trimmed.replace(/^["']|["']$/g, "");
}

function parseMarkdown(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks = [];
  let paragraph = [];
  let list = [];
  let code = [];
  let inCode = false;

  function flushParagraph() {
    if (!paragraph.length) return;
    blocks.push({ type: "p", text: paragraph.join(" ").trim() });
    paragraph = [];
  }

  function flushList() {
    if (!list.length) return;
    blocks.push({ type: "ul", items: list });
    list = [];
  }

  function flushCode() {
    blocks.push({ type: "code", text: code.join("\n") });
    code = [];
  }

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      if (inCode) {
        flushCode();
        inCode = false;
      } else {
        flushParagraph();
        flushList();
        inCode = true;
      }
      continue;
    }

    if (inCode) {
      code.push(line);
      continue;
    }

    const heading = line.match(/^(#{2,4})\s+(.+)$/);
    const bullet = line.match(/^\s*[-*]\s+(.+)$/);

    if (!line.trim()) {
      flushParagraph();
      flushList();
    } else if (heading) {
      flushParagraph();
      flushList();
      blocks.push({ type: "h3", text: heading[2].trim() });
    } else if (bullet) {
      flushParagraph();
      list.push(bullet[1].trim());
    } else {
      flushList();
      paragraph.push(line.trim());
    }
  }

  flushParagraph();
  flushList();
  if (inCode) flushCode();
  return blocks;
}

function excerptFrom(blocks) {
  const paragraph = blocks.find((block) => block.type === "p");
  if (!paragraph) return "";
  return paragraph.text.length > 120 ? `${paragraph.text.slice(0, 120)}...` : paragraph.text;
}

const posts = walk(postsDir)
  .map((filePath) => {
    const raw = fs.readFileSync(filePath, "utf8");
    const [meta, body] = parseFrontMatter(raw);
    const content = parseMarkdown(body);
    return {
      id: meta.slug || slugify(filePath),
      title: meta.title || path.basename(filePath, ".md"),
      date: meta.date || "1970-01-01",
      updated: meta.updated || meta.date || "1970-01-01",
      category: meta.category || "未分类",
      tags: Array.isArray(meta.tags) ? meta.tags : [],
      excerpt: meta.excerpt || excerptFrom(content),
      content,
      source: path.relative(root, filePath).replace(/\\/g, "/"),
    };
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date));

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, `window.BLOG_POSTS = ${JSON.stringify(posts, null, 2)};\n`, "utf8");
console.log(`Generated ${posts.length} posts -> ${path.relative(root, outFile)}`);
