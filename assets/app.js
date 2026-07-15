const site = {
  name: "godmars",
  bio: "待补充",
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

function formatDate(value) {
  return new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(value));
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
  viewHeader.innerHTML = `<h2>${escapeHtml(title)}</h2><p>${escapeHtml(description)}</p>`;
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
  if (state.filter.type === "category") return post.category === state.filter.value;
  return true;
}

function renderPostCard(post) {
  return `
    <article class="post">
      <h3 class="post-title"><button type="button" data-open="${post.id}">${escapeHtml(post.title)}</button></h3>
      <div class="meta">
        <span>发表于 ${formatDate(post.date)}</span>
        <span>更新于 ${formatDate(post.updated)}</span>
        <span>分类于 <button class="chip" type="button" data-category="${escapeHtml(post.category)}">${escapeHtml(post.category)}</button></span>
      </div>
      <p class="excerpt">${escapeHtml(post.excerpt)}</p>
      <div class="tag-row">
        ${post.tags.map((tag) => `<button class="chip" type="button" data-tag="${escapeHtml(tag)}"># ${escapeHtml(tag)}</button>`).join("")}
      </div>
      <button class="read-more" type="button" data-open="${post.id}">阅读全文</button>
    </article>
  `;
}

function renderHome() {
  const filtered = posts.filter(matchesPost);
  const label = state.filter ? `${state.filter.type === "tag" ? "标签" : "分类"}：${state.filter.value}` : "最新文章";
  setHeader(label, state.query ? `搜索 "${state.query}" 的结果` : "像参考站一样，把文章、分类、标签和归档放在一个清爽的个人空间里。");
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
  setHeader(post.title, `发表于 ${formatDate(post.date)}，分类于 ${post.category}`);
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
        <li>支持首页、关于、分类、标签、归档和搜索。</li>
        <li>响应式布局，手机和电脑都能阅读。</li>
      </ul>
    </article>
  `;
}

function renderTaxonomy(type) {
  const isTag = type === "tags";
  const map = countsBy(isTag ? "tags" : "category");
  setHeader(isTag ? "标签" : "分类", isTag ? "按标签聚合文章。" : "按分类浏览文章。");
  setDocumentMeta(`${isTag ? "标签" : "分类"} | ${site.title}`, `浏览 ${site.name} 的博客${isTag ? "标签" : "分类"}`);
  app.innerHTML = `
    <div class="grid-list">
      ${[...map.entries()].map(([name, count]) => `
        <div class="taxonomy-card">
          <button type="button" data-${isTag ? "tag" : "category"}="${escapeHtml(name)}">
            <strong>${escapeHtml(name)}</strong>
            <span>${count} 篇文章</span>
          </button>
        </div>
      `).join("")}
    </div>
  `;
}

function renderCategoryTree() {
  const tree = {};
  posts.forEach(p => {
    const l1 = p.catL1 || "未分类";
    const l2 = p.catL2 || "";
    if (!tree[l1]) tree[l1] = {};
    if (!tree[l1][l2]) tree[l1][l2] = 0;
    tree[l1][l2]++;
  });

  setHeader("分类", "浏览所有分类");
  setDocumentMeta(`分类 | ${site.title}`, `浏览 ${site.name} 的博客分类`);
  app.innerHTML = `
    <div class="category-tree">
      ${Object.entries(tree).map(([l1, l2obj]) => `
        <div class="cat-l1">
          <h3 class="cat-name">${escapeHtml(l1)}</h3>
          <div class="cat-children">
            ${Object.entries(l2obj).map(([l2, count]) => {
              const fullCat = l2 ? `${l1} / ${l2}` : l1;
              return `<button class="chip" type="button" data-category="${escapeHtml(fullCat)}">${escapeHtml(l2 || l1)} (${count})</button>`;
            }).join("")}
          </div>
        </div>
      `).join("")}
    </div>
  `;
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
          <button type="button" data-open="${post.id}">${escapeHtml(post.title)}</button>
        </div>
      `).join("")}
    </div>
  `;
}

function render() {
  document.body.classList.toggle("is-article", state.view === "post");
  document.querySelectorAll(".nav a").forEach((link) => {
    const active = link.dataset.view === state.view;
    link.classList.toggle("is-active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });

  if (state.view === "post") return renderArticle(state.postId);
  if (state.view === "about") renderAbout();
  else if (state.view === "tags") renderTaxonomy("tags");
  else if (state.view === "categories") renderCategoryTree();
  else if (state.view === "archive") renderArchive();
  else renderHome();
  return true;
}

function updateHash() {
  const filter = state.filter ? `/${state.filter.type}/${encodeURIComponent(state.filter.value)}` : "";
  navigate(state.view === "home" ? `#home${filter}` : `#${state.view}`);
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

function scrollToRouteTarget(headingId) {
  requestAnimationFrame(() => {
    const target = headingId ? document.getElementById(headingId) : document.querySelector(".content-panel");
    target?.scrollIntoView({ block: "start" });
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
  const supported = new Set(["home", "post", "about", "tags", "categories", "archive"]);
  state.view = supported.has(route) ? route : "home";
  state.filter = null;
  state.postId = null;

  if (state.view === "post") {
    state.postId = safeDecode(parts[1]);
    const headingId = safeDecode(parts[2]);
    const rendered = render();
    if (rendered) scrollToRouteTarget(headingId);
    return;
  }

  if (state.view === "home" && parts[1] && parts[2]) {
    state.view = "home";
    state.filter = { type: parts[1], value: safeDecode(parts[2]) };
  }
  render();
}

let tocObserver = null;

function setupTocObserver() {
  if (tocObserver) tocObserver.disconnect();
  if (!tocEl) return;
  
  const headings = document.querySelectorAll(".article-body h1, .article-body h2, .article-body h3, .article-body h4");
  if (!headings.length) return;

  const links = [...tocEl.querySelectorAll("a")];
  
  tocObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(l => l.classList.toggle("is-active", l.dataset.heading === id));
      }
    });
  }, { rootMargin: "-80px 0px -70% 0px", threshold: 0 });

  headings.forEach(h => tocObserver.observe(h));
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("button, a");
  if (!target) return;

  if (target.dataset.heading) {
    event.preventDefault();
    history.pushState(null, "", postHash(target.dataset.post, target.dataset.heading));
    document.getElementById(target.dataset.heading)?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  if (target.dataset.view) {
    event.preventDefault();
    state.view = target.dataset.view;
    state.filter = null;
    updateHash();
    return;
  }

  if (target.dataset.open) {
    navigate(postHash(target.dataset.open));
    return;
  }

  if (target.dataset.tag) {
    state.view = "home";
    state.filter = { type: "tag", value: target.dataset.tag };
    updateHash();
    return;
  }

  if (target.dataset.category) {
    state.view = "home";
    state.filter = { type: "category", value: target.dataset.category };
    updateHash();
    return;
  }

  if (target.dataset.back !== undefined) {
    state.view = "home";
    state.filter = null;
    updateHash();
  }
});

searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  state.view = "home";
  state.filter = null;
  history.replaceState(null, "", "#home");
  render();
});

document.querySelector(".theme-toggle").addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "" : "dark";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("theme", next);
  document.querySelector(".theme-toggle").setAttribute("aria-pressed", String(next === "dark"));
});

window.addEventListener("popstate", applyHash);

document.querySelector("#profileName").textContent = site.name;
document.querySelector("#profileBio").textContent = site.bio;
document.querySelector("#postCount").textContent = posts.length;
document.querySelector("#categoryCount").textContent = unique(posts.map((post) => post.category)).length;
document.querySelector("#tagCount").textContent = unique(posts.flatMap((post) => post.tags)).length;
document.querySelector("#year").textContent = new Date().getFullYear();
document.documentElement.dataset.theme = localStorage.getItem("theme") || "";
document.querySelector(".theme-toggle").setAttribute("aria-pressed", String(document.documentElement.dataset.theme === "dark"));

applyHash();
