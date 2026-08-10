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

front matter 是可选的。最省事的写法是直接从正文开始，系统会自动使用文件名作为标题、
目录路径作为分类、第一段作为摘要，并记录首次发布时间与最后修改时间。

如果需要自定义标题、标签或首次发布时间，可以在文件顶部写：

````md
---
title: 文章标题
date: 2026-05-22
tags: [GitHub Pages, 前端, 博客]
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
npm install
npm run build:posts
```

如果 Windows PowerShell 拦截 `npm.ps1`，用下面任意一个：

```bash
npm.cmd run build:posts
node scripts/build-posts.js
```

脚本会扫描 `posts/**/*.md`，使用 Markdown It 解析标题、嵌套列表、表格、引用、
链接、图片和代码块，并自动生成 `assets/posts.js`。页面另外使用 KaTeX 渲染
`$...$` 与 `$$...$$` 数学公式。

首页会按照 Markdown 文件在本地操作系统中的最后修改时间倒序排列。运行
`npm run build:posts` 时，这些时间会记录到 `assets/post-modified-times.json`；
GitHub Actions 会读取这份记录，避免 Git 检出文件时丢失原本的本地修改时间。

如果没有填写 `date`，文章第一次被本地构建发现时会自动把当时的精确时间记录到
`assets/post-published-dates.json`，以后修改文章时不会改变。旧的日期记录会在存在可靠
Git 历史或文件创建时间时自动补全到分钟。手写 `date` 只用于覆盖自动时间；`updated`
不需要填写。

分类会直接取自 Markdown 文件在 `posts/` 下的目录路径。例如
`posts/操作系统/期末总结.md` 会归入“操作系统”，
`posts/课程/操作系统/期末总结.md` 会归入“课程 / 操作系统”。只要文章位于子目录，
目录分类会优先于 front matter 中的 `category`；直接放在 `posts/` 根目录的文章仍可使用
front matter 的 `category`，未填写时归入“未分类”。

提交前可以运行完整检查：

```bash
npm run check
```

发布到 GitHub 时，仓库里的 `.github/workflows/pages.yml` 会自动运行这个脚本，所以你只提交 Markdown 文件也可以发布。要使用这个自动发布方式，在仓库 `Settings > Pages` 中把 `Build and deployment > Source` 选为 `GitHub Actions`。

## 修改站点

- 个人信息：编辑 `assets/app.js` 顶部的 `site`。
- 头像/封面：替换 `assets/profile-card.png`。
- 样式：编辑 `assets/styles.css`。

## 部署到 GitHub Pages

### Windows 一键同步

直接双击仓库根目录的 `同步博客到GitHub.cmd`。脚本会依次：

1. 从 GitHub 拉取当前分支的最新内容；
2. 记录 Markdown 文件修改时间并重新生成文章数据；
3. 运行博客检查；
4. 暂存仓库内的全部改动并自动创建提交；
5. 推送到 GitHub。

默认提交信息格式为 `sync blog 年-月-日 时:分`。如果需要自定义提交信息，可以在
PowerShell 中运行：

```powershell
.\scripts\sync-blog.ps1 -Message "更新数据库复习笔记"
```

只检查脚本而不提交、推送：

```powershell
.\scripts\sync-blog.ps1 -CheckOnly
```

脚本会同步仓库中的全部改动；如果出现构建失败、合并冲突或 GitHub 登录问题，流程会
立即停止，不会使用强制推送。空白 Markdown 文件会被当作占位文件跳过，不会发布成
空文章。

### 手动部署

```bash
git init
git add .
git commit -m "init blog"
git branch -M main
git remote add origin https://github.com/你的用户名/你的用户名.github.io.git
git push -u origin main
```

推送后，在仓库 `Settings > Pages` 中把 `Build and deployment > Source` 选为 `GitHub Actions`。之后每次 push 到 `main` 都会自动构建并发布。

git remote add origin https://github.com/gammars/gammars.github.io.git
