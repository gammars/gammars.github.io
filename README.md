# GitHub Pages Blog

一个轻量的个人博客静态站，风格参考 Hexo/NexT 类博客：左侧个人信息栏，右侧文章流，包含首页、关于、标签、分类、归档和搜索。

## 写文章

文章放在 `posts/` 文件夹里，可以继续按分类建立子文件夹，例如：

```text
posts/
  2026-05-22-github-pages-blog.md
  学习/
    2026-05-18-study-notes-template.md
  计算机网络/
    2026-05-12-tcp-udp-summary.md
```

每篇 Markdown 文件顶部写 front matter：

````md
---
title: 文章标题
date: 2026-05-22
updated: 2026-05-22
category: 建站
tags: [GitHub Pages, 前端, 博客]
excerpt: 首页摘要，可省略；省略后会自动取第一段。
---

这里开始写正文。

## 二级标题

- 列表项
- 列表项

```text
代码块
```
````

本地预览前，运行：

```bash
npm run build:posts
```

如果 Windows PowerShell 拦截 `npm.ps1`，用下面任意一个：

```bash
npm.cmd run build:posts
node scripts/build-posts.js
```

脚本会扫描 `posts/**/*.md`，自动生成 `assets/posts.js`。

发布到 GitHub 时，仓库里的 `.github/workflows/pages.yml` 会自动运行这个脚本，所以你只提交 Markdown 文件也可以发布。要使用这个自动发布方式，在仓库 `Settings > Pages` 中把 `Build and deployment > Source` 选为 `GitHub Actions`。

## 修改站点

- 个人信息：编辑 `assets/app.js` 顶部的 `site`。
- 头像/封面：替换 `assets/profile-card.png`。
- 样式：编辑 `assets/styles.css`。

## 部署到 GitHub Pages

```bash
git init
git add .
git commit -m "init blog"
git branch -M main
git remote add origin https://github.com/你的用户名/你的用户名.github.io.git
git push -u origin main
```

推送后，在仓库 `Settings > Pages` 中把 `Build and deployment > Source` 选为 `GitHub Actions`。之后每次 push 到 `main` 都会自动构建并发布。
