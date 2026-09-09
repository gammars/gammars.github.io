const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const IMAGE_EXTENSIONS = new Set([".gif", ".jpeg", ".jpg", ".png", ".webp"]);

class PostAssetError extends Error {
  constructor(code, message, details = {}) {
    super(message);
    this.name = "PostAssetError";
    this.code = code;
    this.details = details;
  }
}

function normalizePostSource(sourcePath) {
  const normalized = String(sourcePath ?? "").replace(/\\/g, "/").replace(/^\.\//, "");
  const withRoot = normalized.startsWith("posts/") ? normalized : `posts/${normalized}`;
  if (
    !withRoot.toLowerCase().endsWith(".md")
    || path.posix.isAbsolute(withRoot)
    || withRoot.split("/").some((part) => !part || part === "." || part === "..")
  ) {
    throw new PostAssetError("INVALID_POST_PATH", `文章路径无效：${sourcePath}`);
  }
  return withRoot;
}

function articleAssetDirectory(sourcePath) {
  const source = normalizePostSource(sourcePath);
  return path.posix.join(path.posix.dirname(source), "assets");
}

function encodePathSegment(value) {
  return encodeURIComponent(value).replace(/[!'()*]/g, (character) => `%${character.charCodeAt(0).toString(16).toUpperCase()}`);
}

function encodePath(relativePath) {
  return relativePath.split("/").map(encodePathSegment).join("/");
}

function decodePath(rawPath, sourcePath) {
  if (rawPath.includes("\\")) {
    throw new PostAssetError("ABSOLUTE_IMAGE_PATH", `图片不能使用 Windows 路径：${rawPath}`, { sourcePath, image: rawPath });
  }
  const decoded = rawPath.split("/").map((part) => {
    let value;
    try {
      value = decodeURIComponent(part);
    } catch {
      throw new PostAssetError("INVALID_IMAGE_URL", `图片 URL 编码无效：${rawPath}`, { sourcePath, image: rawPath });
    }
    if (value.includes("/")) {
      throw new PostAssetError("INVALID_IMAGE_URL", `图片路径片段无效：${rawPath}`, { sourcePath, image: rawPath });
    }
    return value;
  }).join("/");
  if (/^[A-Za-z]:[\\/]/.test(decoded) || decoded.startsWith("//") || decoded.startsWith("\\\\")) {
    throw new PostAssetError("ABSOLUTE_IMAGE_PATH", `图片不能使用本机绝对路径：${rawPath}`, { sourcePath, image: rawPath });
  }
  if (decoded.includes("\\")) {
    throw new PostAssetError("INVALID_IMAGE_URL", `图片路径不能包含反斜杠：${rawPath}`, { sourcePath, image: rawPath });
  }
  return decoded;
}

function isRemoteImage(source) {
  return /^(?:https?:)?\/\//i.test(source) || /^(?:data|blob):/i.test(source);
}

function pathWithoutSuffix(source) {
  const suffixIndex = source.search(/[?#]/);
  return suffixIndex === -1 ? source : source.slice(0, suffixIndex);
}

function assertInside(base, candidate, code, message, details) {
  const relation = path.relative(base, candidate);
  if (relation === ".." || relation.startsWith(`..${path.sep}`) || path.isAbsolute(relation)) {
    throw new PostAssetError(code, message, details);
  }
}

function resolvePostImage(rootDirectory, sourcePath, imageSource) {
  const root = path.resolve(rootDirectory);
  const source = normalizePostSource(sourcePath);
  const raw = String(imageSource ?? "").trim().replace(/^<|>$/g, "");
  if (!raw) {
    throw new PostAssetError("EMPTY_IMAGE_PATH", `文章 ${source} 包含空图片地址。`, { sourcePath: source, image: raw });
  }
  if (isRemoteImage(raw)) return { external: true, source: raw };

  const decoded = decodePath(pathWithoutSuffix(raw), source);
  let relativeFile;
  if (decoded.startsWith("/")) {
    relativeFile = path.posix.normalize(decoded.slice(1));
  } else {
    relativeFile = path.posix.normalize(path.posix.join(path.posix.dirname(source), decoded));
  }
  if (!relativeFile || relativeFile === "." || relativeFile === ".." || relativeFile.startsWith("../")) {
    throw new PostAssetError("IMAGE_OUTSIDE_REPOSITORY", `图片路径超出仓库：${raw}`, { sourcePath: source, image: raw });
  }

  const ownAssets = `${articleAssetDirectory(source)}/`;
  const isOwnAsset = relativeFile.startsWith(ownAssets);
  const isGlobalAsset = relativeFile.startsWith("assets/") && !relativeFile.startsWith("assets/uploads/");
  if (relativeFile.startsWith("assets/uploads/")) {
    throw new PostAssetError(
      "LEGACY_UPLOAD_PATH",
      `文章 ${source} 仍引用旧 uploads 图片：${raw}。请迁移到 ${articleAssetDirectory(source)}。`,
      { sourcePath: source, image: raw, relativeFile },
    );
  }
  if (!isOwnAsset && !isGlobalAsset) {
    throw new PostAssetError(
      "IMAGE_OUTSIDE_ARTICLE_ASSETS",
      `文章图片必须位于文章目录下的 assets 目录或全局 assets 目录：${source} -> ${raw}`,
      { sourcePath: source, image: raw, relativeFile },
    );
  }

  const extension = path.posix.extname(relativeFile).toLowerCase();
  if (!IMAGE_EXTENSIONS.has(extension)) {
    throw new PostAssetError("UNSUPPORTED_IMAGE_TYPE", `不支持的文章图片格式：${raw}`, {
      sourcePath: source,
      image: raw,
      relativeFile,
    });
  }

  const fullPath = path.resolve(root, ...relativeFile.split("/"));
  assertInside(root, fullPath, "IMAGE_OUTSIDE_REPOSITORY", `图片路径超出仓库：${raw}`, {
    sourcePath: source,
    image: raw,
  });
  let stat;
  try {
    stat = fs.statSync(fullPath);
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new PostAssetError("MISSING_IMAGE", `文章 ${source} 引用的图片不存在：${raw}`, {
        sourcePath: source,
        image: raw,
        relativeFile,
      });
    }
    throw error;
  }
  if (!stat.isFile()) {
    throw new PostAssetError("IMAGE_NOT_FILE", `文章图片不是普通文件：${raw}`, {
      sourcePath: source,
      image: raw,
      relativeFile,
    });
  }
  const realRoot = fs.realpathSync(root);
  const realFile = fs.realpathSync(fullPath);
  assertInside(realRoot, realFile, "IMAGE_OUTSIDE_REPOSITORY", `图片实际路径超出仓库：${raw}`, {
    sourcePath: source,
    image: raw,
  });

  const digest = crypto.createHash("sha256").update(fs.readFileSync(realFile)).digest("hex").slice(0, 12);
  return {
    external: false,
    fullPath: realFile,
    relativeFile,
    source: raw,
    publicUrl: `/${encodePath(relativeFile)}?v=${digest}`,
    digest,
    kind: isOwnAsset ? "article" : "global",
  };
}

function imageTokens(tokens, output = []) {
  for (const token of tokens || []) {
    if (token.type === "image") output.push(token);
    if (Array.isArray(token.children)) imageTokens(token.children, output);
  }
  return output;
}

function imageTokenEntries(tokens, output = [], inheritedLine = null) {
  for (const token of tokens || []) {
    const line = Array.isArray(token.map) ? token.map[0] + 1 : inheritedLine;
    if (token.type === "image") output.push({ token, line });
    if (Array.isArray(token.children)) imageTokenEntries(token.children, output, line);
  }
  return output;
}

function rewritePostImages(tokens, { root, sourcePath }) {
  const images = [];
  for (const { token, line } of imageTokenEntries(tokens)) {
    const source = token.attrGet("src");
    let resolved;
    try {
      resolved = resolvePostImage(root, sourcePath, source);
    } catch (error) {
      if (error instanceof PostAssetError && line) {
        error.details.line = line;
        error.message = `${error.message}（第 ${line} 行）`;
      }
      throw error;
    }
    if (!resolved.external) {
      token.attrSet("src", resolved.publicUrl);
      images.push(resolved);
    }
  }
  return images;
}

function markdownImageReference(sourcePath, storedName) {
  const source = normalizePostSource(sourcePath);
  if (path.posix.basename(storedName) !== storedName || !storedName) {
    throw new PostAssetError("INVALID_IMAGE_NAME", `图片文件名无效：${storedName}`);
  }
  const directoryName = path.posix.basename(articleAssetDirectory(source));
  return `./${encodePathSegment(directoryName)}/${encodePathSegment(storedName)}`;
}

module.exports = {
  IMAGE_EXTENSIONS,
  PostAssetError,
  articleAssetDirectory,
  encodePathSegment,
  imageTokens,
  markdownImageReference,
  normalizePostSource,
  resolvePostImage,
  rewritePostImages,
};
