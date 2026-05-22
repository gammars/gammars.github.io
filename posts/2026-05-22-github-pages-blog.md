---
title: GitHub Pages 博客搭建记录
date: 2026-05-22
updated: 2026-05-22
category: 建站
tags: [GitHub Pages, 前端, 博客]
excerpt: 从一个空文件夹开始，搭建一个可以直接部署到 GitHub Pages 的静态博客。
---

这个站点采用纯 HTML、CSS 和 JavaScript 编写，文章源文件保存在 `posts/` 文件夹里。你写 Markdown，脚本负责生成页面要读取的数据。

## 部署思路

- 创建名为 username.github.io 的仓库。
- 把本项目文件推送到仓库根目录。
- 在仓库 Settings > Pages 中选择 main 分支发布。

## 常用命令

```bash
npm run build:posts
git add .
git commit -m "publish posts"
git push
```
