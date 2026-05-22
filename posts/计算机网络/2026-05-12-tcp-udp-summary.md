---
title: TCP 与 UDP 核心区别速记
date: 2026-05-12
updated: 2026-05-13
category: 计算机网络
tags: [TCP, UDP, 网络]
---

TCP 更像稳定可靠的字节流，UDP 更像轻量快速的报文投递。理解它们的区别，要从连接、可靠性、首部开销和应用场景看。

## 核心区别

TCP 是面向连接的协议，需要三次握手建立连接，并通过确认、重传、流量控制和拥塞控制保证可靠传输。

UDP 是无连接协议，首部更小，延迟更低，但不保证可靠到达。它适合视频会议、直播、游戏同步、DNS 查询等场景。

```text
TCP: reliable, ordered, connection-oriented
UDP: fast, simple, message-oriented
```
