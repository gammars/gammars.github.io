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

function escapeHtml(value) {
  return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

function parseInline(text) {
  const codeSpans = [];
  let s = String(text).replace(/`([^`]+)`/g, (_, code) => {
    const index = codeSpans.push(code) - 1;
    return `\u0000CODE${index}\u0000`;
  });
  s = escapeHtml(s);
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, "<em>$1</em>");
  s = s.replace(/\u0000CODE(\d+)\u0000/g, (_, index) => `<code>${escapeHtml(codeSpans[Number(index)])}</code>`);
  return s;
}

function parseMarkdown(markdown) {
  const lines = markdown.replace(/\r/g, "").split("\n");
  const blocks = [];
  let paragraph = [];
  let list = [];
  let listType = null;
  let code = [];
  let inCode = false;
  let headingCounter = 0;

  const flushP = () => { if (paragraph.length) { blocks.push({ type: "p", text: parseInline(paragraph.join(" ").trim()) }); paragraph = []; } };
  const flushL = () => {
    if (list.length) blocks.push({ type: listType, items: list.map(parseInline) });
    list = [];
    listType = null;
  };
  const flushC = () => { blocks.push({ type: "code", text: code.join("\n") }); code = []; };

  for (const line of lines) {
    if (line.trim().startsWith("```")) { if (inCode) { flushC(); inCode = false; } else { flushP(); flushL(); inCode = true; } continue; }
    if (inCode) { code.push(line); continue; }
    const heading = line.match(/^(#{1,4})\s+(.+)$/);
    const bullet = line.match(/^\s*[-\*\+]\s+(.+)$/);
    const ordered = line.match(/^\s*\d+\.\s+(.+)$/);
    const quote = line.match(/^\s*>\s?(.*)$/);
    const hr = /^(=|-|\*|_){3,}\s*$/.test(line.trim());
    if (hr && !bullet) { flushP(); flushL(); blocks.push({ type: "hr" }); }
    else if (!line.trim()) { flushP(); flushL(); }
    else if (heading) { flushP(); flushL(); const lvl = heading[1].length; const text = heading[2].trim(); const id = slugify(text) || `h${lvl}-${headingCounter}`; headingCounter++; blocks.push({ type: `h${lvl}`, text: parseInline(text), id }); }
    else if (bullet || ordered) {
      flushP();
      const nextListType = ordered ? "ol" : "ul";
      if (listType && listType !== nextListType) flushL();
      listType = nextListType;
      list.push((ordered || bullet)[1].trim());
    }
    else if (quote) { flushP(); flushL(); blocks.push({ type: "blockquote", text: parseInline(quote[1].trim()) }); }
    else { flushL(); paragraph.push(line.trim()); }
  }
  flushP(); flushL(); if (inCode) flushC();
  return blocks;
}

function excerptFrom(blocks) {
  const p = blocks.find((b) => b.type === "p");
  if (!p) return "";
  const clean = p.text.replace(/<[^>]+>/g, "");
  return clean.length > 120 ? `${clean.slice(0, 120)}...` : clean;
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
    const content = parseMarkdown(body);
    const category = cat.category || meta.category || "未分类";
    return {
      id: meta.slug || slugify(meta.title || filePath),
      title: meta.title || path.basename(filePath, ".md"),
      date: meta.date || "1970-01-01",
      updated: meta.updated || meta.date || "1970-01-01",
      category,
      catL1: cat.l1 || meta.catL1 || meta.category || "未分类",
      catL2: cat.category ? cat.l2 : (meta.catL2 || ""),
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
