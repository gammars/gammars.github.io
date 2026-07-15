const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const generated = fs.readFileSync(path.join(root, "assets", "posts.js"), "utf8");
const context = { window: {} };
vm.runInNewContext(generated, context);

const posts = context.window.BLOG_POSTS;
if (!Array.isArray(posts)) throw new Error("BLOG_POSTS is not an array");

const postIds = new Set();
for (const post of posts) {
  if (!post.id || postIds.has(post.id)) throw new Error(`Duplicate or empty post id: ${post.id}`);
  postIds.add(post.id);
  if (!post.title) throw new Error(`Missing title: ${post.source}`);
  if (!post.category) throw new Error(`Missing category: ${post.source}`);
  if (Number.isNaN(Date.parse(post.date))) throw new Error(`Invalid date: ${post.source}`);
  if (!post.html || !Array.isArray(post.headings)) throw new Error(`Missing rendered Markdown: ${post.source}`);
  if (/\*{3,}\\?\*/.test(post.html)) throw new Error(`Malformed emphasis remains: ${post.source}`);

  const headingIds = new Set();
  for (const heading of post.headings) {
    if (!heading.id || headingIds.has(heading.id)) throw new Error(`Duplicate heading id in ${post.source}: ${heading.id}`);
    headingIds.add(heading.id);
  }

  const sourcePath = path.join(root, ...post.source.split("/"));
  if (!fs.existsSync(sourcePath)) throw new Error(`Missing source file: ${post.source}`);
}

console.log(`Checked ${posts.length} posts: metadata, Markdown output and ids are valid.`);
