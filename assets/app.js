const site = {
  name: "你的名字",
  bio: "记录技术、课程、阅读与生活里的清醒瞬间。",
};

const posts = Array.isArray(window.BLOG_POSTS) ? window.BLOG_POSTS : [];

const state = {
  view: "home",
  filter: null,
  query: "",
};

const app = document.querySelector("#app");
const viewHeader = document.querySelector("#viewHeader");
const searchInput = document.querySelector("#searchInput");

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

function matchesPost(post) {
  const query = state.query.trim().toLowerCase();
  const text = [post.title, post.category, post.excerpt, post.tags.join(" "), post.content.map((block) => block.text || (block.items || []).join(" ")).join(" ")].join(" ").toLowerCase();
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
  app.innerHTML = filtered.length
    ? `<div class="post-list">${filtered.map(renderPostCard).join("")}</div>`
    : `<div class="empty">没有找到匹配的文章。</div>`;
}

function renderArticle(id) {
  const post = posts.find((item) => item.id === id) || posts[0];
  if (!post) {
    setHeader("暂无文章", "在 posts 文件夹里创建 Markdown 后运行 npm run build:posts。");
    app.innerHTML = `<div class="empty">还没有生成文章数据。</div>`;
    return;
  }
  setHeader(post.title, `发表于 ${formatDate(post.date)}，分类于 ${post.category}`);
  app.innerHTML = `
    <article class="article-body">
      <div class="tag-row">${post.tags.map((tag) => `<button class="chip" type="button" data-tag="${escapeHtml(tag)}"># ${escapeHtml(tag)}</button>`).join("")}</div>
      ${post.content.map(renderBlock).join("")}
      <div class="article-actions">
        <button class="text-button" type="button" data-back>返回文章列表</button>
      </div>
    </article>
  `;
}

function renderBlock(block) {
  if (block.type === "h3") return `<h3>${escapeHtml(block.text)}</h3>`;
  if (block.type === "ul") return `<ul>${block.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
  if (block.type === "code") return `<pre><code>${escapeHtml(block.text)}</code></pre>`;
  return `<p>${escapeHtml(block.text)}</p>`;
}

function renderAbout() {
  setHeader("关于", "这里可以放你的个人介绍、研究方向、项目链接和联系方式。");
  app.innerHTML = `
    <article class="article-body">
      <p>你好，这里是 ${site.name} 的博客。我会在这里记录课程笔记、技术实践、工具折腾、阅读摘要和阶段复盘。</p>
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

function renderArchive() {
  setHeader("归档", "按照发布时间整理所有文章。");
  const sorted = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
  app.innerHTML = `
    <div class="archive-list">
      ${sorted.map((post) => `
        <div class="archive-item">
          <time>${formatDate(post.date)}</time>
          <button type="button" data-open="${post.id}">${escapeHtml(post.title)}</button>
        </div>
      `).join("")}
    </div>
  `;
}

function render() {
  document.querySelectorAll(".nav a").forEach((link) => {
    link.classList.toggle("is-active", link.dataset.view === state.view);
  });

  if (state.view === "about") renderAbout();
  else if (state.view === "tags") renderTaxonomy("tags");
  else if (state.view === "categories") renderTaxonomy("categories");
  else if (state.view === "archive") renderArchive();
  else renderHome();
}

function updateHash() {
  const filter = state.filter ? `/${state.filter.type}/${encodeURIComponent(state.filter.value)}` : "";
  location.hash = state.view === "home" ? `#home${filter}` : `#${state.view}`;
}

function applyHash() {
  const parts = location.hash.replace(/^#/, "").split("/");
  state.view = parts[0] || "home";
  state.filter = null;
  if (parts[1] && parts[2]) {
    state.view = "home";
    state.filter = { type: parts[1], value: decodeURIComponent(parts[2]) };
  }
  render();
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("button, a");
  if (!target) return;

  if (target.dataset.view) {
    state.view = target.dataset.view;
    state.filter = null;
    updateHash();
  }

  if (target.dataset.open) {
    renderArticle(target.dataset.open);
    history.replaceState(null, "", `#post/${target.dataset.open}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (target.dataset.tag) {
    state.view = "home";
    state.filter = { type: "tag", value: target.dataset.tag };
    updateHash();
  }

  if (target.dataset.category) {
    state.view = "home";
    state.filter = { type: "category", value: target.dataset.category };
    updateHash();
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
  render();
});

document.querySelector(".theme-toggle").addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "" : "dark";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("theme", next);
});

window.addEventListener("hashchange", applyHash);

document.querySelector("#profileName").textContent = site.name;
document.querySelector("#profileBio").textContent = site.bio;
document.querySelector("#postCount").textContent = posts.length;
document.querySelector("#categoryCount").textContent = unique(posts.map((post) => post.category)).length;
document.querySelector("#tagCount").textContent = unique(posts.flatMap((post) => post.tags)).length;
document.querySelector("#year").textContent = new Date().getFullYear();
document.documentElement.dataset.theme = localStorage.getItem("theme") || "";

if (location.hash.startsWith("#post/")) {
  renderArticle(location.hash.replace("#post/", ""));
} else {
  applyHash();
}
