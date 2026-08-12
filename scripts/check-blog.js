const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const generated = fs.readFileSync(path.join(root, "assets", "posts.js"), "utf8");
const modifiedTimes = JSON.parse(fs.readFileSync(path.join(root, "assets", "post-modified-times.json"), "utf8"));
const publishedDates = JSON.parse(fs.readFileSync(path.join(root, "assets", "post-published-dates.json"), "utf8"));
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
  if (post.date !== publishedDates[post.source]) throw new Error(`Published date is not recorded for: ${post.source}`);
  if (!post.html || !Array.isArray(post.headings)) throw new Error(`Missing rendered Markdown: ${post.source}`);
  if (typeof post.excerpt !== "string" || !post.excerpt.trim()) throw new Error(`Missing article excerpt: ${post.source}`);
  if (post.updated !== modifiedTimes[post.source]) throw new Error(`Modified time is not recorded for: ${post.source}`);
  if (/\*{3,}\\?\*/.test(post.html)) throw new Error(`Malformed emphasis remains: ${post.source}`);

  const headingIds = new Set();
  for (const heading of post.headings) {
    if (!heading.id || headingIds.has(heading.id)) throw new Error(`Duplicate heading id in ${post.source}: ${heading.id}`);
    headingIds.add(heading.id);
  }

  const sourcePath = path.join(root, ...post.source.split("/"));
  if (!fs.existsSync(sourcePath)) throw new Error(`Missing source file: ${post.source}`);
}

for (let index = 1; index < posts.length; index += 1) {
  if (new Date(posts[index - 1].updated) < new Date(posts[index].updated)) {
    throw new Error("Posts are not sorted by modified time descending");
  }
}

console.log(`Checked ${posts.length} posts: dates, metadata, Markdown output, ids and modified-time order are valid.`);
