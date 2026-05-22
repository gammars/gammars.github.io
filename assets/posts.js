window.BLOG_POSTS = [
  {
    "id": "2026-05-22-github-pages-blog",
    "title": "GitHub Pages 博客搭建记录",
    "date": "2026-05-22",
    "updated": "2026-05-22",
    "category": "建站",
    "tags": [
      "GitHub Pages",
      "前端",
      "博客"
    ],
    "excerpt": "从一个空文件夹开始，搭建一个可以直接部署到 GitHub Pages 的静态博客。",
    "content": [
      {
        "type": "p",
        "text": "这个站点采用纯 HTML、CSS 和 JavaScript 编写，文章源文件保存在 `posts/` 文件夹里。你写 Markdown，脚本负责生成页面要读取的数据。"
      },
      {
        "type": "h3",
        "text": "部署思路"
      },
      {
        "type": "ul",
        "items": [
          "创建名为 username.github.io 的仓库。",
          "把本项目文件推送到仓库根目录。",
          "在仓库 Settings > Pages 中选择 main 分支发布。"
        ]
      },
      {
        "type": "h3",
        "text": "常用命令"
      },
      {
        "type": "code",
        "text": "npm run build:posts\ngit add .\ngit commit -m \"publish posts\"\ngit push"
      }
    ],
    "source": "posts/2026-05-22-github-pages-blog.md"
  },
  {
    "id": "学习-2026-05-18-study-notes-template",
    "title": "学习笔记的整理模板",
    "date": "2026-05-18",
    "updated": "2026-05-20",
    "category": "学习",
    "tags": [
      "笔记",
      "方法",
      "复盘"
    ],
    "excerpt": "一篇笔记不一定要长，但最好能留下问题、结论、例子和下一步行动。这样以后回来翻，才不会只看到一团热闹。",
    "content": [
      {
        "type": "p",
        "text": "一篇笔记不一定要长，但最好能留下问题、结论、例子和下一步行动。这样以后回来翻，才不会只看到一团热闹。"
      },
      {
        "type": "h3",
        "text": "我的结构"
      },
      {
        "type": "ul",
        "items": [
          "背景：为什么要学这个。",
          "概念：用自己的话解释关键点。",
          "例子：写一个能跑通的最小案例。",
          "问题：记录还没想明白的地方。"
        ]
      },
      {
        "type": "p",
        "text": "如果要长期维护博客，可以先保持这个轻量 Markdown 工作流，后面再升级成 Hexo、VitePress 或 Astro。"
      }
    ],
    "source": "posts/学习/2026-05-18-study-notes-template.md"
  },
  {
    "id": "计算机网络-2026-05-12-tcp-udp-summary",
    "title": "TCP 与 UDP 核心区别速记",
    "date": "2026-05-12",
    "updated": "2026-05-13",
    "category": "计算机网络",
    "tags": [
      "TCP",
      "UDP",
      "网络"
    ],
    "excerpt": "TCP 更像稳定可靠的字节流，UDP 更像轻量快速的报文投递。理解它们的区别，要从连接、可靠性、首部开销和应用场景看。",
    "content": [
      {
        "type": "p",
        "text": "TCP 更像稳定可靠的字节流，UDP 更像轻量快速的报文投递。理解它们的区别，要从连接、可靠性、首部开销和应用场景看。"
      },
      {
        "type": "h3",
        "text": "核心区别"
      },
      {
        "type": "p",
        "text": "TCP 是面向连接的协议，需要三次握手建立连接，并通过确认、重传、流量控制和拥塞控制保证可靠传输。"
      },
      {
        "type": "p",
        "text": "UDP 是无连接协议，首部更小，延迟更低，但不保证可靠到达。它适合视频会议、直播、游戏同步、DNS 查询等场景。"
      },
      {
        "type": "code",
        "text": "TCP: reliable, ordered, connection-oriented\nUDP: fast, simple, message-oriented"
      }
    ],
    "source": "posts/计算机网络/2026-05-12-tcp-udp-summary.md"
  }
];
