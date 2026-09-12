const MarkdownIt = require("markdown-it");
const hljs = require("highlight.js/lib/common");

const LANGUAGE_ALIASES = new Map([
  ["js", "javascript"],
  ["jsx", "javascript"],
  ["ts", "typescript"],
  ["tsx", "typescript"],
  ["py", "python"],
  ["sh", "bash"],
  ["shell", "bash"],
  ["zsh", "bash"],
  ["yml", "yaml"],
  ["md", "markdown"],
  ["html", "xml"],
  ["svg", "xml"],
  ["c++", "cpp"],
  ["cc", "cpp"],
  ["hpp", "cpp"],
  ["c#", "csharp"],
  ["cs", "csharp"],
  ["golang", "go"],
  ["text", "plaintext"],
  ["txt", "plaintext"],
  ["plain", "plaintext"],
]);

const LANGUAGE_LABELS = new Map([
  ["javascript", "JavaScript"],
  ["typescript", "TypeScript"],
  ["python", "Python"],
  ["java", "Java"],
  ["cpp", "C++"],
  ["c", "C"],
  ["csharp", "C#"],
  ["bash", "Shell"],
  ["sql", "SQL"],
  ["json", "JSON"],
  ["xml", "HTML/XML"],
  ["css", "CSS"],
  ["markdown", "Markdown"],
  ["plaintext", "纯文本"],
]);

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function languageInfo(info) {
  const raw = String(info || "").trim().split(/\s+/, 1)[0] || "";
  const clean = raw.replace(/^language-/, "").toLowerCase();
  const language = LANGUAGE_ALIASES.get(clean) || clean;
  const supported = Boolean(language && hljs.getLanguage(language));
  return {
    raw,
    language: supported ? language : "",
    label: LANGUAGE_LABELS.get(language) || raw || "纯文本",
  };
}

function highlightCode(code, language) {
  if (!language) return escapeHtml(code);
  try {
    return hljs.highlight(code, { language, ignoreIllegals: true }).value;
  } catch {
    return escapeHtml(code);
  }
}

// highlight.js may keep one <span> open across a newline (comments and
// template strings are common examples). Split only after balancing tags so
// each visual line remains valid HTML while preserving the highlighted text.
function highlightedLines(html) {
  const lines = [];
  let current = "";
  let openTags = [];
  for (let index = 0; index < html.length;) {
    if (html[index] === "\n") {
      lines.push(`${current}${openTags.map(() => "</span>").reverse().join("")}`);
      current = openTags.join("");
      index += 1;
      continue;
    }
    if (html[index] === "<") {
      const end = html.indexOf(">", index);
      if (end >= 0) {
        const tag = html.slice(index, end + 1);
        current += tag;
        if (/^<span\b/i.test(tag)) openTags.push(tag);
        else if (/^<\/span>/i.test(tag)) openTags.pop();
        index = end + 1;
        continue;
      }
    }
    current += html[index];
    index += 1;
  }
  lines.push(`${current}${openTags.map(() => "</span>").reverse().join("")}`);
  return lines;
}

function renderCodeBlock(token) {
  const info = languageInfo(token.info);
  const highlighted = highlightCode(token.content, info.language);
  const trailingNewline = token.content.endsWith("\n");
  const lines = highlightedLines(highlighted);
  if (trailingNewline && lines.at(-1) === "") lines.pop();
  const lineHtml = lines.map((line, index) => (
    `<span class="code-line"><span class="code-line-number" aria-hidden="true">${index + 1}</span><span class="code-line-content">${line}</span></span>`
  )).join("");
  const languageClass = info.language ? ` language-${escapeHtml(info.language)}` : "";
  const label = escapeHtml(info.label);
  return `<div class="code-block" data-language="${label}" data-trailing-newline="${trailingNewline}">
  <div class="code-toolbar"><span class="code-language">${label}</span><button class="code-copy" type="button" data-copy-code aria-label="复制${label}代码">复制</button></div>
  <pre class="hljs code-pre"><code class="code-content${languageClass}">${lineHtml}</code></pre>
</div>\n`;
}

function createMarkdownRenderer() {
  const markdown = new MarkdownIt({
    html: false,
    linkify: true,
    typographer: false,
  });

  // Markdown-It parses GFM task markers as ordinary inline text by default.
  // Turn the leading "[ ]" / "[x]" in a list item into a safe, read-only
  // checkbox after inline parsing, without enabling arbitrary HTML in posts.
  markdown.core.ruler.after("inline", "task_lists", (state) => {
    const listStack = [];
    for (const token of state.tokens) {
      if (token.type === "bullet_list_open" || token.type === "ordered_list_open") {
        listStack.push(token);
        continue;
      }
      if (token.type === "bullet_list_close" || token.type === "ordered_list_close") {
        listStack.pop();
        continue;
      }
      if (token.type !== "list_item_open") continue;

      const inline = state.tokens.slice(state.tokens.indexOf(token) + 1)
        .find((next) => next.type === "inline" || next.type === "list_item_close");
      if (!inline || inline.type !== "inline") continue;

      const marker = inline.content.match(/^\[([ xX])\][ \t]+/);
      if (!marker) continue;

      const checked = marker[1].toLowerCase() === "x";
      inline.content = inline.content.slice(marker[0].length);
      const firstText = inline.children?.find((child) => child.type === "text" && /^\[([ xX])\][ \t]+/.test(child.content));
      if (firstText) firstText.content = firstText.content.replace(/^\[([ xX])\][ \t]+/, "");
      inline.children?.unshift({ type: "task_checkbox", meta: { checked } });
      token.attrJoin("class", "task-list-item");
      const parentList = listStack.at(-1);
      if (parentList && !(parentList.attrGet("class") || "").split(/\s+/).includes("task-list")) {
        parentList.attrJoin("class", "task-list");
      }
    }
  });
  markdown.renderer.rules.task_checkbox = (tokens, index) => {
    const checked = tokens[index].meta?.checked ? " checked" : "";
    return `<input class="task-list-checkbox" type="checkbox" disabled${checked} aria-label="任务${checked ? "已完成" : "未完成"}"> `;
  };
  // Article images can be numerous and relatively large. Defer their
  // network request until they are near the viewport and decode them off the
  // critical rendering path so opening an image-heavy post stays responsive.
  markdown.renderer.rules.image = (tokens, index, options, env, self) => {
    const token = tokens[index];
    const src = escapeHtml(token.attrGet("src") || "");
    const alt = escapeHtml(token.content || "");
    const title = token.attrGet("title");
    const titleAttr = title ? ` title="${escapeHtml(title)}"` : "";
    return `<img src="${src}" alt="${alt}" loading="lazy" decoding="async"${titleAttr}>`;
  };
  markdown.renderer.rules.fence = (tokens, index) => renderCodeBlock(tokens[index]);
  return markdown;
}

module.exports = {
  createMarkdownRenderer,
  escapeHtml,
  languageInfo,
  renderCodeBlock,
};
