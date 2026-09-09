const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");
const vm = require("node:vm");
const { IMAGE_EXTENSIONS } = require("./post-assets");

const root = path.resolve(__dirname, "..");
const generated = fs.readFileSync(path.join(root, "assets", "posts.js"), "utf8");
const modifiedTimes = JSON.parse(fs.readFileSync(path.join(root, "assets", "post-modified-times.json"), "utf8"));
const publishedDates = JSON.parse(fs.readFileSync(path.join(root, "assets", "post-published-dates.json"), "utf8"));
const context = { window: {} };
vm.runInNewContext(generated, context);

const posts = context.window.BLOG_POSTS;
if (!Array.isArray(posts)) throw new Error("BLOG_POSTS is not an array");

function referencedLocalImages() {
  const referenced = new Set();
  for (const post of posts) {
    for (const match of post.html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/gi)) {
      const imageUrl = new URL(match[1], "https://blog.invalid/");
      if (imageUrl.origin !== "https://blog.invalid") continue;
      let decoded;
      try {
        decoded = imageUrl.pathname.split("/").filter(Boolean).map(decodeURIComponent).join("/");
      } catch {
        throw new Error(`Invalid generated image URL in ${post.source}: ${match[1]}`);
      }
      referenced.add(decoded);
    }
  }
  return referenced;
}

function articleAssetFiles(directory, output = []) {
  if (!fs.existsSync(directory)) return output;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isSymbolicLink()) continue;
    if (entry.isDirectory()) {
      articleAssetFiles(fullPath, output);
    } else if (entry.isFile() && IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      const relative = path.relative(root, fullPath).replace(/\\/g, "/");
      if (relative.split("/").some((part) => part.toLowerCase() === "assets")) output.push(relative);
    }
  }
  return output;
}

function filesBelow(directory, output = []) {
  if (!fs.existsSync(directory)) return output;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isSymbolicLink()) continue;
    if (entry.isDirectory()) filesBelow(fullPath, output);
    else if (entry.isFile()) output.push(path.relative(root, fullPath).replace(/\\/g, "/"));
  }
  return output;
}

function assertNotIgnored(relativePath) {
  try {
    execFileSync("git", ["check-ignore", "--quiet", "--", relativePath], {
      cwd: root,
      stdio: "ignore",
    });
  } catch (error) {
    if (error.status === 1) return;
    throw error;
  }
  throw new Error(`Referenced image is ignored by Git: ${relativePath}`);
}

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

const referencedImages = referencedLocalImages();
for (const relativePath of referencedImages) {
  if (relativePath.startsWith("posts/") || relativePath.startsWith("assets/")) {
    assertNotIgnored(relativePath);
  }
}
const unusedArticleImages = articleAssetFiles(path.join(root, "posts"))
  .filter((relativePath) => !referencedImages.has(relativePath));
for (const relativePath of unusedArticleImages) {
  console.warn(`Unused article image (kept on disk): ${relativePath}`);
}
for (const relativePath of filesBelow(path.join(root, "assets", "uploads"))) {
  console.warn(`Legacy upload file (kept on disk): ${relativePath}`);
}

console.log(`Checked ${posts.length} posts: dates, metadata, Markdown output, images, ids and modified-time order are valid.`);
