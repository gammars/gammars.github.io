const site = {
  name: "godmars",
  bio: "伽德玛斯",
  title: "godmars' Blog",
  github: "https://github.com/gammars",
  email: "811096909@qq.com",
};

const posts = Array.isArray(window.BLOG_POSTS)
  ? window.BLOG_POSTS.map((post) => ({ ...post, searchText: plainTextFromHtml(post.html) }))
  : [];

const state = {
  view: "home",
  filter: null,
  query: "",
  postId: null,
  returnHash: "#home",
  openCategoryPanels: new Set(),
  categoryPanelsReady: false,
};

const app = document.querySelector("#app");
const viewHeader = document.querySelector("#viewHeader");
const searchInput = document.querySelector("#searchInput");
const tocEl = document.querySelector("#toc");

function plainTextFromHtml(html = "") {
  const template = document.createElement("template");
  template.innerHTML = html;
  return template.content.textContent || "";
}

function unique(values) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b, "zh-CN"));
}

function formatDate(value, includeTime = false) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  if (includeTime) Object.assign(options, { hour: "2-digit", minute: "2-digit", hour12: false });
  return new Intl.DateTimeFormat("zh-CN", options).format(new Date(value));
}

function formatPublishedDate(value) {
  return formatDate(value, /T\d{2}:\d{2}/.test(value));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function countsBy(key) {
  return posts.reduce((map, post) => {
    const values = Array.isArray(post[key]) ? post[key] : [post[key]];
    values.forEach((value) => map.set(value, (map.get(value) || 0) + 1));
    return map;
  }, new Map());
}

function setHeader(title, description) {
  viewHeader.innerHTML = `<h2 tabindex="-1">${escapeHtml(title)}</h2><p role="status">${escapeHtml(description)}</p>`;
}

function setDocumentMeta(title, description) {
  document.title = title;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.content = description;
}

function postHash(postId, headingId = "") {
  const heading = headingId ? `/${encodeURIComponent(headingId)}` : "";
  return `#post/${encodeURIComponent(postId)}${heading}`;
}

function matchesPost(post) {
  const query = state.query.trim().toLowerCase();
  const contentText = post.searchText || post.content?.map((block) => block.text || (block.items || []).join(" ")).join(" ") || "";
  const text = [post.title, post.category, post.excerpt, post.tags.join(" "), contentText].join(" ").toLowerCase();
  if (query && !text.includes(query)) return false;
  if (!state.filter) return true;
  if (state.filter.type === "tag") return post.tags.includes(state.filter.value);
  if (state.filter.type === "category-direct") return post.category === state.filter.value;
  if (state.filter.type === "category") {
    return post.category === state.filter.value || post.category.startsWith(`${state.filter.value} / `);
  }
  return true;
}

function renderPostCard(post) {
  const tags = post.tags.length
    ? post.tags.map((tag) => `<button class="post-tag" type="button" data-tag="${escapeHtml(tag)}"># ${escapeHtml(tag)}</button>`).join("")
    : "";
  return `
    <article class="post">
      <div class="post-main">
        <h3 class="post-title"><button type="button" data-open="${escapeHtml(post.id)}">${escapeHtml(post.title)}</button></h3>
        <p class="excerpt">${escapeHtml(post.excerpt)}</p>
        <div class="post-meta">
          <span class="post-date">
            <span class="post-meta-label">首次发布</span>
            <time datetime="${escapeHtml(post.date)}">${formatPublishedDate(post.date)}</time>
          </span>
          <span class="post-date">
            <span class="post-meta-label">最后更新</span>
            <time datetime="${escapeHtml(post.updated)}">${formatDate(post.updated, true)}</time>
          </span>
          <span class="post-taxonomy">
            <button class="post-category" type="button" data-category="${escapeHtml(post.category)}">${escapeHtml(post.category)}</button>
            ${tags}
          </span>
        </div>
      </div>
    </article>
  `;
}

function renderHome() {
  const filtered = posts.filter(matchesPost);
  const filterLabel = state.filter?.type === "tag"
    ? `标签：${state.filter.value}`
    : state.filter?.type === "category-direct"
      ? `分类：${state.filter.value}（仅本级）`
      : state.filter
        ? `分类：${state.filter.value}`
        : "";
  const label = filterLabel || "最新博文";
  const description = state.query
    ? `找到 ${filtered.length} 篇与“${state.query}”相关的文章`
    : state.filter
      ? `${state.filter.type === "tag" ? "当前标签" : "当前分类"}下共 ${filtered.length} 篇文章`
      : `共 ${posts.length} 篇博文，按本地文件最后修改时间排列`;
  setHeader(label, description);
  setDocumentMeta(site.title, `${site.name} 的个人博客`);
  app.innerHTML = filtered.length
    ? `<div class="post-list">${filtered.map(renderPostCard).join("")}</div>`
    : `<div class="empty">没有找到匹配的文章。</div>`;
  renderToc(null);
}

function renderToc(post) {
  if (!tocEl) return;
  if (!post) {
    tocEl.innerHTML = "";
    teardownTocTracking();
    return;
  }
  const headings = post.headings || post.content.filter(b => /^h[1-3]$/.test(b.type));
  if (!headings.length) {
    tocEl.innerHTML = "";
    return;
  }
  tocEl.innerHTML = `
    <div class="toc-title">目录</div>
    <ul class="toc-list">
      ${headings.map(b => {
        const level = b.level || Number(b.type?.slice(1)) || 1;
        const cls = level === 1 ? "toc-h1" : level === 2 ? "toc-h2" : "toc-h3";
        return `<li><a href="${postHash(post.id, b.id)}" data-post="${escapeHtml(post.id)}" data-heading="${escapeHtml(b.id)}" class="${cls}">${escapeHtml(b.text)}</a></li>`;
      }).join("")}
    </ul>
  `;
}

function setActiveHeading(headingId) {
  document.querySelectorAll("[data-heading]").forEach((link) => {
    const active = link.dataset.heading === headingId;
    link.classList.toggle("is-active", active);
    if (active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}

function renderArticle(id) {
  const post = posts.find((item) => item.id === id);
  if (!post) {
    setHeader("文章不存在", "这个地址没有对应的文章，可能已被移动或删除。");
    setDocumentMeta(`文章不存在 | ${site.title}`, "没有找到对应的博客文章");
    app.innerHTML = `<div class="empty"><button class="text-button" type="button" data-back>返回文章列表</button></div>`;
    renderToc(null);
    return false;
  }
  state.postId = post.id;
  setHeader(post.title, `发表于 ${formatPublishedDate(post.date)}，更新于 ${formatDate(post.updated, true)}，分类于 ${post.category}`);
  setDocumentMeta(`${post.title} | ${site.title}`, post.excerpt || `${post.title} - ${site.name}`);
  const headings = post.headings || post.content.filter((block) => /^h[1-3]$/.test(block.type)).map((block) => ({
    id: block.id,
    level: Number(block.type.slice(1)),
    text: block.text.replace(/<[^>]+>/g, ""),
  }));
  const mobileToc = headings.length ? `
    <details class="mobile-toc">
      <summary>文章目录（${headings.length}）</summary>
      <ul class="toc-list">
        ${headings.map((heading) => `
          <li><a href="${postHash(post.id, heading.id)}" data-post="${escapeHtml(post.id)}" data-heading="${escapeHtml(heading.id)}">${escapeHtml(heading.text)}</a></li>
        `).join("")}
      </ul>
    </details>
  ` : "";
  app.innerHTML = `
    <article class="article-body">
      <div class="tag-row">${post.tags.map((tag) => `<button class="chip" type="button" data-tag="${escapeHtml(tag)}"># ${escapeHtml(tag)}</button>`).join("")}</div>
      ${mobileToc}
      ${post.html || post.content.map(renderBlock).join("")}
      <div class="article-actions">
        <button class="text-button" type="button" data-back>返回文章列表</button>
      </div>
    </article>
  `;
  renderMath(app);
  renderToc(post);
  setupTocObserver();
  return true;
}

function renderMath(element) {
  if (typeof window.renderMathInElement !== "function") return;
  window.renderMathInElement(element, {
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "$", right: "$", display: false },
      { left: "\\(", right: "\\)", display: false },
      { left: "\\[", right: "\\]", display: true },
    ],
    throwOnError: false,
  });
}

function renderBlock(block) {
  if (block.type === "hr") return "<hr>";
  if (/^h[1-4]$/.test(block.type)) {
    const level = block.type[1];
    return `<h${level} id="${block.id}">${block.text}</h${level}>`;
  }
  if (block.type === "ul" || block.type === "ol") return `<${block.type}>${block.items.map((item) => `<li>${item}</li>`).join("")}</${block.type}>`;
  if (block.type === "blockquote") return `<blockquote>${block.text}</blockquote>`;
  if (block.type === "code") return `<pre><code>${escapeHtml(block.text)}</code></pre>`;
  return `<p>${block.text}</p>`;
}

function renderAbout() {
  setHeader("关于", "godmars 的个人资料与博客说明。");
  setDocumentMeta(`关于 | ${site.title}`, `${site.name} 的个人介绍`);
  app.innerHTML = `
    <article class="article-body">
      <p>你好，我是 ${site.name}。个人简介待补充。</p>
      <p>GitHub：<a href="${site.github}" target="_blank" rel="noreferrer">${site.github}</a></p>
      <p>邮箱：<a href="mailto:${site.email}">${site.email}</a></p>
      <p>你只需要在 posts 文件夹里新增 Markdown 文件，然后运行 npm run build:posts 生成文章数据。</p>
      <h3>站点特性</h3>
      <ul>
        <li>纯静态文件，适合 GitHub Pages。</li>
        <li>支持首页、关于、归档、搜索以及分类和标签快捷筛选。</li>
        <li>响应式布局，手机和电脑都能阅读。</li>
      </ul>
    </article>
  `;
}

function buildCategoryTree() {
  const root = { children: new Map() };
  posts.forEach((post) => {
    const parts = String(post.category || "未分类").split(/\s*\/\s*/).filter(Boolean);
    let parent = root;
    parts.forEach((name, index) => {
      if (!parent.children.has(name)) {
        parent.children.set(name, {
          name,
          path: parts.slice(0, index + 1).join(" / "),
          total: 0,
          direct: 0,
          children: new Map(),
        });
      }
      const node = parent.children.get(name);
      node.total += 1;
      parent = node;
    });
    parent.direct += 1;
  });
  return [...root.children.values()]
    .sort((a, b) => a.name.localeCompare(b.name, "zh-CN"));
}

function sortedCategoryChildren(node) {
  return [...node.children.values()]
    .sort((a, b) => a.name.localeCompare(b.name, "zh-CN"));
}

let categoryPanelSequence = 0;

function renderCategoryNode(node, depth = 0, idPrefix = "category-tree") {
  const children = sortedCategoryChildren(node);
  const active = state.filter?.type === "category" && state.filter.value === node.path;
  const directActive = state.filter?.type === "category-direct" && state.filter.value === node.path;
  const open = state.openCategoryPanels.has(node.path);
  const panelId = `${idPrefix}-panel-${categoryPanelSequence += 1}`;
  return `
    <div class="category-node" data-depth="${depth}">
      <div class="category-row${children.length ? " has-children" : ""}">
        <button class="category-link${active ? " is-active" : ""}" type="button" data-category="${escapeHtml(node.path)}" aria-pressed="${active}" title="查看“${escapeHtml(node.path)}”下的博文">
          <span class="category-name">${escapeHtml(node.name)}</span>
          <span class="category-count" aria-label="${node.total} 篇博文">${node.total}</span>
        </button>
        ${children.length ? `
          <button class="category-toggle" type="button" data-category-toggle="${escapeHtml(node.path)}" data-category-depth="${depth}" aria-expanded="${open}" aria-controls="${panelId}" aria-label="${open ? "收起" : "展开"}“${escapeHtml(node.name)}”">
            <span class="category-chevron" aria-hidden="true">›</span>
          </button>
        ` : ""}
      </div>
      ${children.length ? `
        <div id="${panelId}" class="category-children"${open ? "" : " hidden"}>
          ${node.direct ? `
            <button class="category-link category-direct${directActive ? " is-active" : ""}" type="button" data-category-direct="${escapeHtml(node.path)}" aria-pressed="${directActive}" title="仅查看直接归入“${escapeHtml(node.path)}”的博文">
              <span class="category-name">仅本级博文</span>
              <span class="category-count" aria-label="${node.direct} 篇博文">${node.direct}</span>
            </button>
          ` : ""}
          ${children.map((child) => renderCategoryNode(child, depth + 1, idPrefix)).join("")}
        </div>
      ` : ""}
    </div>
  `;
}

function countCategoryNodes(nodes) {
  return nodes.reduce((total, node) => total + 1 + countCategoryNodes([...node.children.values()]), 0);
}

function setCategoryPanelExpanded(category, expanded) {
  document.querySelectorAll("button[data-category-toggle]").forEach((button) => {
    if (button.dataset.categoryToggle !== category) return;
    button.setAttribute("aria-expanded", String(expanded));
    button.setAttribute("aria-label", `${expanded ? "收起" : "展开"}“${button.dataset.categoryToggle.split(" / ").at(-1)}”`);
    const panel = document.getElementById(button.getAttribute("aria-controls"));
    if (panel) panel.hidden = !expanded;
  });
}

function renderDiscovery() {
  const categoryTree = buildCategoryTree();
  const tags = [...countsBy("tags").entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "zh-CN"));

  if (!state.categoryPanelsReady) {
    const firstExpandable = categoryTree.find((node) => node.children.size);
    if (categoryTree.length <= 6 && firstExpandable) state.openCategoryPanels.add(firstExpandable.path);
    state.categoryPanelsReady = true;
  }
  if (["category", "category-direct"].includes(state.filter?.type)) {
    const parts = state.filter.value.split(" / ");
    for (let index = 1; index <= parts.length; index += 1) {
      state.openCategoryPanels.add(parts.slice(0, index).join(" / "));
    }
  }

  const categoryCount = countCategoryNodes(categoryTree);
  document.querySelectorAll("[data-category-total]").forEach((element) => {
    element.textContent = `${categoryTree.length} 组 · ${categoryCount} 类`;
  });
  document.querySelectorAll("[data-tag-total]").forEach((element) => {
    element.textContent = `${tags.length} 个`;
  });
  document.querySelectorAll("[data-discovery-summary]").forEach((element) => {
    element.textContent = state.filter?.type === "tag"
      ? `标签：${state.filter.value}`
      : state.filter?.type === "category-direct"
        ? `分类：${state.filter.value}（仅本级）`
        : state.filter
          ? `分类：${state.filter.value}`
          : `${categoryCount} 个分类`;
  });
  document.querySelectorAll("[data-category-cards]").forEach((element, index) => {
    categoryPanelSequence = 0;
    const allActive = state.view === "home" && !state.filter && !state.query;
    element.innerHTML = `
      <button class="category-link category-root${allActive ? " is-active" : ""}" type="button" data-view="home" aria-pressed="${allActive}">
        <span class="category-name">全部博文</span>
        <span class="category-count" aria-label="${posts.length} 篇博文">${posts.length}</span>
      </button>
      ${categoryTree.map((node) => renderCategoryNode(node, 0, `category-tree-${index}`)).join("")}
    `;
  });
  const tagMarkup = tags.map(([name, count]) => {
    const active = state.filter?.type === "tag" && state.filter.value === name;
    return `<button class="discovery-tag${active ? " is-active" : ""}" type="button" data-tag="${escapeHtml(name)}" aria-pressed="${active}"># ${escapeHtml(name)} <span>${count}</span></button>`;
  }).join("") || `<span class="discovery-empty">暂无标签</span>`;
  document.querySelectorAll("[data-tag-cards]").forEach((element) => {
    element.innerHTML = tagMarkup;
  });
}

function renderArchive() {
  setHeader("归档", "按照发布时间整理所有文章。");
  setDocumentMeta(`归档 | ${site.title}`, `浏览 ${site.name} 的博客归档`);
  const sorted = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
  app.innerHTML = `
    <div class="archive-list">
      ${sorted.map((post) => `
        <div class="archive-item">
          <time datetime="${escapeHtml(post.date)}">${formatDate(post.date)}</time>
          <button type="button" data-open="${escapeHtml(post.id)}">${escapeHtml(post.title)}</button>
        </div>
      `).join("")}
    </div>
  `;
}

function render() {
  document.body.classList.toggle("is-article", state.view === "post");
  renderDiscovery();
  document.querySelectorAll(".nav a").forEach((link) => {
    const active = link.dataset.view === state.view;
    link.classList.toggle("is-active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });

  if (state.view === "post") return renderArticle(state.postId);
  if (state.view === "about") renderAbout();
  else if (state.view === "archive") renderArchive();
  else renderHome();
  return true;
}

function updateHash() {
  const filter = state.filter ? `/${state.filter.type}/${encodeURIComponent(state.filter.value)}` : "";
  navigate(state.view === "home" ? `#home${filter}` : `#${state.view}`);
}

function closeTaxonomyDrawer() {
  const drawer = document.querySelector(".discovery-drawer");
  if (drawer) drawer.open = false;
}

function updateTaxonomyHash({ preserveViewport = false } = {}) {
  const previousScrollY = window.scrollY;
  if (preserveViewport) document.documentElement.classList.add("is-taxonomy-updating");
  updateHash();
  closeTaxonomyDrawer();
  if (!preserveViewport) return;
  const restoreViewport = () => window.scrollTo({ top: previousScrollY, behavior: "auto" });
  restoreViewport();
  requestAnimationFrame(() => {
    restoreViewport();
    requestAnimationFrame(() => {
      restoreViewport();
      document.documentElement.classList.remove("is-taxonomy-updating");
    });
  });
}

function navigate(hash, { replace = false } = {}) {
  history[replace ? "replaceState" : "pushState"](null, "", hash);
  applyHash();
}

function safeDecode(value) {
  try {
    return decodeURIComponent(value || "");
  } catch {
    return "";
  }
}

function articleHeadingById(headingId) {
  if (!headingId) return null;
  return [...document.querySelectorAll(".article-body h1[id], .article-body h2[id], .article-body h3[id], .article-body h4[id], .article-body h5[id], .article-body h6[id]")]
    .find((heading) => heading.id === headingId) || null;
}

function scrollToHeading(headingId, { smooth = true, focus = false } = {}) {
  const target = articleHeadingById(headingId);
  if (!target) return false;
  const headerBottom = document.querySelector(".topbar")?.getBoundingClientRect().bottom || 0;
  const gap = 16;
  const rect = target.getBoundingClientRect();
  const visible = rect.top >= headerBottom + gap && rect.bottom <= window.innerHeight - gap;
  if (!visible) {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: Math.max(0, window.scrollY + rect.top - headerBottom - gap),
      behavior: smooth && !reducedMotion ? "smooth" : "auto",
    });
  }
  if (focus) {
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
    target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
  }
  return true;
}

function scrollToRouteTarget(headingId) {
  requestAnimationFrame(() => {
    if (headingId && articleHeadingById(headingId)) {
      setActiveHeading(headingId);
      scrollToHeading(headingId, { smooth: false });
      return;
    }
    const target = document.querySelector(".content-panel");
    if (!target) return;
    const headerBottom = document.querySelector(".topbar")?.getBoundingClientRect().bottom || 0;
    const top = window.scrollY + target.getBoundingClientRect().top - headerBottom - 16;
    window.scrollTo({ top: Math.max(0, top), behavior: "auto" });
  });
}

function applyHash() {
  let hash = location.hash.replace(/^#/, "");
  if (!hash) {
    history.replaceState(null, "", "#home");
    hash = "home";
  }
  const parts = hash.split("/");
  const route = parts[0];
  const supported = new Set(["home", "post", "about", "archive"]);
  const decodedFilter = safeDecode(parts[2]);
  const validHomeFilter = !parts[1]
    || (["category", "category-direct", "tag"].includes(parts[1]) && Boolean(decodedFilter) && parts.length === 3);
  if (!supported.has(route) || (route === "home" && !validHomeFilter)) {
    history.replaceState(null, "", "#home");
    hash = "home";
    parts.splice(0, parts.length, "home");
  }
  state.view = supported.has(parts[0]) ? parts[0] : "home";
  state.filter = null;
  state.postId = null;

  if (state.view === "post") {
    state.postId = safeDecode(parts[1]);
    const headingId = safeDecode(parts[2]);
    const rendered = render();
    if (rendered) scrollToRouteTarget(headingId);
    return;
  }

  if (state.view === "home" && ["category", "category-direct", "tag"].includes(parts[1]) && parts[2]) {
    state.view = "home";
    state.filter = { type: parts[1], value: decodedFilter };
  }
  render();
}

let tocScrollFrame = null;
let tocScrollHandler = null;

function teardownTocTracking() {
  if (tocScrollHandler) {
    window.removeEventListener("scroll", tocScrollHandler);
    window.removeEventListener("resize", tocScrollHandler);
    tocScrollHandler = null;
  }
  if (tocScrollFrame) {
    cancelAnimationFrame(tocScrollFrame);
    tocScrollFrame = null;
  }
}

function setupTocObserver() {
  teardownTocTracking();
  if (!tocEl) return;
  
  const headings = [...document.querySelectorAll(".article-body h1[id], .article-body h2[id], .article-body h3[id], .article-body h4[id], .article-body h5[id], .article-body h6[id]")];
  if (!headings.length) return;

  const updateActiveHeading = () => {
    tocScrollFrame = null;
    const activationY = (document.querySelector(".topbar")?.getBoundingClientRect().bottom || 0) + 16;
    let activeHeading = null;
    for (const heading of headings) {
      if (heading.getBoundingClientRect().top <= activationY + 1) activeHeading = heading;
      else break;
    }
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
      activeHeading = headings.at(-1);
    }
    setActiveHeading(activeHeading?.id || "");
  };
  tocScrollHandler = () => {
    if (!tocScrollFrame) tocScrollFrame = requestAnimationFrame(updateActiveHeading);
  };
  window.addEventListener("scroll", tocScrollHandler, { passive: true });
  window.addEventListener("resize", tocScrollHandler);
  tocScrollHandler();
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("button, a");
  if (!target) return;

  if (target.dataset.heading) {
    event.preventDefault();
    const nextHash = postHash(target.dataset.post, target.dataset.heading);
    if (location.hash !== nextHash) history.pushState(null, "", nextHash);
    setActiveHeading(target.dataset.heading);
    const mobileToc = target.closest(".mobile-toc");
    if (mobileToc) mobileToc.open = false;
    const keyboardActivated = event.detail === 0;
    requestAnimationFrame(() => scrollToHeading(target.dataset.heading, { smooth: true, focus: keyboardActivated || Boolean(mobileToc) }));
    return;
  }

  if (target.dataset.view) {
    event.preventDefault();
    const fromTaxonomy = target.classList.contains("category-root");
    state.view = target.dataset.view;
    state.filter = null;
    state.query = "";
    searchInput.value = "";
    if (fromTaxonomy) updateTaxonomyHash({ preserveViewport: Boolean(target.closest(".discovery-panel")) });
    else updateHash();
    return;
  }

  if (target.dataset.open) {
    if (state.view === "home") state.returnHash = location.hash || "#home";
    navigate(postHash(target.dataset.open));
    return;
  }

  if (target.dataset.categoryToggle) {
    const category = target.dataset.categoryToggle;
    const expanded = target.getAttribute("aria-expanded") === "true";
    if (!expanded && target.dataset.categoryDepth === "0") {
      const activeRoot = ["category", "category-direct"].includes(state.filter?.type)
        ? state.filter.value.split(" / ")[0]
        : "";
      [...state.openCategoryPanels]
        .filter((path) => !path.includes(" / ") && path !== category && path !== activeRoot)
        .forEach((path) => {
          state.openCategoryPanels.delete(path);
          setCategoryPanelExpanded(path, false);
        });
    }
    if (expanded) state.openCategoryPanels.delete(category);
    else state.openCategoryPanels.add(category);
    setCategoryPanelExpanded(category, !expanded);
    return;
  }

  if (target.dataset.tag) {
    state.view = "home";
    state.filter = state.filter?.type === "tag" && state.filter.value === target.dataset.tag
      ? null
      : { type: "tag", value: target.dataset.tag };
    state.query = "";
    searchInput.value = "";
    updateTaxonomyHash({ preserveViewport: Boolean(target.closest(".discovery-panel")) });
    return;
  }

  if (target.dataset.category) {
    state.view = "home";
    state.filter = state.filter?.type === "category" && state.filter.value === target.dataset.category
      ? null
      : { type: "category", value: target.dataset.category };
    state.query = "";
    searchInput.value = "";
    updateTaxonomyHash({ preserveViewport: Boolean(target.closest(".discovery-panel")) });
    return;
  }

  if (target.dataset.categoryDirect) {
    state.view = "home";
    state.filter = state.filter?.type === "category-direct" && state.filter.value === target.dataset.categoryDirect
      ? null
      : { type: "category-direct", value: target.dataset.categoryDirect };
    state.query = "";
    searchInput.value = "";
    updateTaxonomyHash({ preserveViewport: Boolean(target.closest(".discovery-panel")) });
    return;
  }

  if (target.dataset.back !== undefined) {
    navigate(state.returnHash || "#home");
  }
});

searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  state.view = "home";
  state.filter = null;
  history.replaceState(null, "", "#home");
  render();
});

function updateThemeToggle() {
  const dark = document.documentElement.dataset.theme === "dark";
  const toggle = document.querySelector(".theme-toggle");
  toggle.setAttribute("aria-pressed", String(dark));
  toggle.setAttribute("aria-label", dark ? "切换浅色模式" : "切换深色模式");
  toggle.title = dark ? "切换浅色模式" : "切换深色模式";
}

document.querySelector(".theme-toggle").addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "" : "dark";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("theme", next);
  updateThemeToggle();
});

window.addEventListener("popstate", () => {
  applyHash();
  if (state.view === "home" && state.filter) closeTaxonomyDrawer();
});

document.querySelector("#profileName").textContent = site.name;
document.querySelector("#profileBio").textContent = site.bio;
document.querySelector("#postCount").textContent = posts.length;
document.querySelector("#categoryCount").textContent = countCategoryNodes(buildCategoryTree());
document.querySelector("#tagCount").textContent = unique(posts.flatMap((post) => post.tags)).length;
document.querySelector("#year").textContent = new Date().getFullYear();
document.documentElement.dataset.theme = localStorage.getItem("theme") || "";
updateThemeToggle();

applyHash();
