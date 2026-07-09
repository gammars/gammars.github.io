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
        "text": "这个站点采用纯 HTML、CSS 和 JavaScript 编写，文章源文件保存在 <code>posts/</code> 文件夹里。你写 Markdown，脚本负责生成页面要读取的数据。"
      },
      {
        "type": "h2",
        "text": "部署思路"
      },
      {
        "type": "ul",
        "items": [
          "创建名为 username.github.io 的仓库。",
          "把本项目文件推送到仓库根目录。",
          "在仓库 Settings &gt; Pages 中选择 main 分支发布。"
        ]
      },
      {
        "type": "h2",
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
    "id": "操作系统-期末总结",
    "title": "操作系统期末复习提纲",
    "date": "2026-05-22",
    "updated": "2026-05-22",
    "category": "大三下",
    "tags": [],
    "excerpt": "同学们好！欢迎来到《操作系统》期末冲刺提分班！我是你们的讲师。",
    "content": [
      {
        "type": "p",
        "text": "同学们好！欢迎来到《操作系统》期末冲刺提分班！我是你们的讲师。"
      },
      {
        "type": "p",
        "text": "第一章<strong>《计算机系统概述》</strong>是整门课的“地基”。操作系统作为计算机的“大管家”，它管理的就是底层的硬件。如果底层硬件的工作逻辑没搞清楚，后面讲进程、讲内存你就会听得云里雾里。"
      },
      {
        "type": "p",
        "text": "对于零基础的同学，不要怕这一章里出现的硬件术语。我已经将这份 PPT 浓缩成了考点最密集的<strong>内部绝密速成提纲</strong>，重点非常明确，只要掌握这四个模块，第一章的分数你就稳拿了！"
      },
      {
        "type": "hr"
      },
      {
        "type": "h1",
        "text": "🚀 第一章 计算机系统概述"
      },
      {
        "type": "h2",
        "text": "第一模块：硬件“四大金刚”与寄存器 (填空/名词解释区)"
      },
      {
        "type": "p",
        "text": "计算机底层的物理世界由四个核心部件组成，它们构成了操作系统的主要管理对象："
      },
      {
        "type": "p",
        "text": "1. <strong>处理器 (Processor/CPU)</strong>：控制计算机操作，执行数据处理功能。"
      },
      {
        "type": "p",
        "text": "2. <strong>主存储器 (Main Memory)</strong>：也叫实存储器。注意它的核心考点：<strong>易失性 (Volatile)</strong>，一旦关机内容就丢失了。"
      },
      {
        "type": "p",
        "text": "3. <strong>输入/输出模块 (I/O Modules)</strong>：负责在计算机和外部环境（如硬盘、终端、通讯设备）之间移动数据。"
      },
      {
        "type": "p",
        "text": "4. <strong>系统总线 (System Bus)</strong>：处理器、内存和 I/O 模块之间通信的高速公路。"
      },
      {
        "type": "p",
        "text": "<strong>🌟</strong> <strong>重点辨析：寄存器的两副面孔</strong>"
      },
      {
        "type": "p",
        "text": "处理器内部有两类非常关键的寄存器，考试常考分类："
      },
      {
        "type": "ul",
        "items": [
          "<strong>用户可见寄存器</strong>：程序员可以用的（如数据寄存器、地址寄存器、段指针、栈指针），用来优化内存引用。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>控制和状态寄存器（OS的核心武器）</strong>：对普通用户不可见，用于控制程序执行。必背的三个："
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>PC (程序计数器)</strong>：永远保存<strong>下一次要取的指令地址</strong>。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>IR (指令寄存器)</strong>：保存<strong>当前最近获取到的指令</strong>。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>PSW (程序状态字)</strong>：包含条件码、中断允许/禁止位、内核/用户模式位。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>避坑提醒</strong>：<strong>条件码（如结果为正、负、零、溢出）是由硬件操作自动设置的，不能通过程序显式修改！</strong>"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第二模块：核心机制：指令周期与中断 (简答题/逻辑推演)"
      },
      {
        "type": "p",
        "text": "<strong>1. 基本的指令周期</strong>"
      },
      {
        "type": "p",
        "text": "处理器执行程序就干两步死循环：<strong>取指令 (Fetch) $\\rightarrow$ 执行指令 (Execute)</strong>。"
      },
      {
        "type": "p",
        "text": "每取完一次指令，PC 的值就会自动递增，指向下一条指令。"
      },
      {
        "type": "p",
        "text": "<strong>2. 中断机制 (Interrupts) —— 为什么需要中断？</strong>"
      },
      {
        "type": "ul",
        "items": [
          "<strong>痛点</strong>：I/O 设备（如打印机、硬盘）的速度比 CPU 慢得多。如果让 CPU 干等 I/O 完成，是对 CPU 资源的极大浪费。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>解决方案</strong>：引入中断。CPU 给 I/O 发完指令后就去干别的事，I/O 干完活了再“中断” CPU 报告结果。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>四大中断类型（常考选择题）</strong>：程序中断（如算术溢出、除以零）、定时器中断、I/O 中断、硬件故障中断。"
        ]
      },
      {
        "type": "p",
        "text": "<strong>3. 发生中断时，CPU 是怎么处理的？（底层逻辑）</strong>"
      },
      {
        "type": "ul",
        "items": [
          "硬件层面，处理器会把当前的状态（<strong>PSW 和 PC</strong>）压入<strong>控制栈</strong>中保护起来，然后加载中断处理程序的入口地址到 PC 中。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "等中断处理完，再从栈里把旧的 PSW 和 PC 弹出来，恢复原程序的执行。"
        ]
      },
      {
        "type": "p",
        "text": "<strong>4. 多个中断“大撞车”怎么办？</strong>"
      },
      {
        "type": "p",
        "text": "如果正在处理一个中断时，又来了一个中断（比如边接收数据边打印），有两种处理策略："
      },
      {
        "type": "p",
        "text": "1. <strong>顺序中断处理</strong>：处理一个中断时，<strong>禁止（屏蔽）</strong>其他中断发生，后来的只能排队。"
      },
      {
        "type": "p",
        "text": "2. <strong>嵌套中断处理</strong>：定义<strong>中断优先级</strong>。优先级高的中断可以强行打断优先级低的中断。"
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第三模块：必考大题区：存储器层次结构与 Cache"
      },
      {
        "type": "p",
        "text": "<strong>1. 存储器的“金字塔”层次结构</strong>"
      },
      {
        "type": "p",
        "text": "为了解决容量、速度和价格之间的矛盾，存储器被设计成金字塔结构（寄存器 $\\rightarrow$ Cache $\\rightarrow$ 主存 $\\rightarrow$ 磁盘 $\\rightarrow$ 磁带）。沿着金字塔往下看，规律如下（<strong>必背</strong>）："
      },
      {
        "type": "ul",
        "items": [
          "<strong>每“位”的价格递减</strong>（越来越便宜）。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>容量递增</strong>（越来越大）。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>存取时间递增</strong>（越来越慢）。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>处理器访问存储器的频率递减</strong>（去底层找数据的次数越来越少）。"
        ]
      },
      {
        "type": "p",
        "text": "<strong>2.</strong> <strong>🌟</strong> <strong>局部性原理 (Locality) —— 现代体系结构的灵魂</strong>"
      },
      {
        "type": "ul",
        "items": [
          "<strong>空间局部性</strong>：处理器访问内存倾向于“簇化”（比如遍历数组，访问了地址 A，大概率马上会访问地址 A+1）。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>时间局部性</strong>：处理器倾向于访问最近刚使用过的数据（比如循环体中的变量）。"
        ]
      },
      {
        "type": "p",
        "text": "<strong>3. 高速缓存 (Cache)</strong>"
      },
      {
        "type": "ul",
        "items": [
          "<strong>原理</strong>：利用局部性原理，在 CPU 和主存之间放一个“小而快”的 Cache，保存一部分主存数据的副本。<strong>Cache 对操作系统是不可见的</strong>。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>高速缓存设计的五大核心问题（常考填空或选择）</strong>："
        ]
      },
      {
        "type": "p",
        "text": "1. <strong>高速缓存大小</strong>。"
      },
      {
        "type": "p",
        "text": "2. <strong>块大小</strong>（与内存交换的数据单位）。"
      },
      {
        "type": "p",
        "text": "3. <strong>映射函数</strong>（决定主存块放进 Cache 的哪个位置）。"
      },
      {
        "type": "p",
        "text": "4. <strong>置换算法</strong>（Cache 满了该踢谁出去？最常用的是 <strong>LRU 最近最少使用算法</strong>，淘汰最长时间未被访问的块）。"
      },
      {
        "type": "p",
        "text": "5. <strong>写策略</strong>（更新数据时，是每次都写回主存，还是等块被替换出 Cache 时才写回？这关乎性能和数据一致性）。"
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第四模块：I/O 技术的“三次进化” (选择题大户)"
      },
      {
        "type": "p",
        "text": "计算机的发展史，就是 CPU 不断“甩锅” I/O 任务的历史。考卷上特别喜欢考这三种技术的优缺点对比："
      },
      {
        "type": "p",
        "text": "1. <strong>可编程 I/O (Programmed I/O)</strong>："
      },
      {
        "type": "ul",
        "items": [
          "<strong>特点</strong>：最原始。CPU 发出命令后，需要<strong>周期性地不断检查</strong> I/O 设备的状态（这叫“忙等待”）。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>致命缺点</strong>：严重浪费 CPU 时间，导致整个系统性能严重下降。"
        ]
      },
      {
        "type": "p",
        "text": "2. <strong>中断驱动 I/O (Interrupt-Driven I/O)</strong>："
      },
      {
        "type": "ul",
        "items": [
          "<strong>特点</strong>：CPU 发出命令后继续做其他事，I/O 准备好了再发中断信号通知 CPU。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>缺陷</strong>：每次只能传输一个字的数据，而且<strong>读写的每个字依然要经过 CPU</strong>。CPU 还是被大量的数据搬运工作给拖累了。"
        ]
      },
      {
        "type": "p",
        "text": "3. <strong>🌟</strong> <strong>直接内存存取 (DMA, Direct Memory Access)</strong>："
      },
      {
        "type": "ul",
        "items": [
          "<strong>特点</strong>：终极杀器。由一块专门的 DMA 芯片接管总线。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>优势</strong>：将<strong>整个数据块</strong>直接在 I/O 和内存之间传输，<strong>完全不需要经过处理器</strong>！CPU 只在传输开始和结束时介入一下。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>代价</strong>：在 DMA 大量传输数据占用总线时，CPU 可能会因为抢不到总线而稍微执行得慢一点（周期窃取），但这比前两种方法有效得多！"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "p",
        "text": "<strong>讲师寄语：</strong>"
      },
      {
        "type": "p",
        "text": "这份提纲已经把第一章的骨架全部拎出来了。本章不涉及复杂的代码和计算，主要是<strong>概念的辨析</strong>。你在复习时，重点抓住<strong>“中断保护了什么”、“Cache的局部性原理与LRU算法”、“DMA与前两种I/O机制的本质区别”</strong>这三个核心考点，应对期末考试的客观题和简答题就绰绰有余了！"
      },
      {
        "type": "p",
        "text": "怎么样？第一章是不是瞬间变得清晰好懂了？如果你对 DMA 或者 Cache 的某个具体设计细节还有疑惑，随时提问！"
      },
      {
        "type": "p",
        "text": "同学们好！欢迎来到《操作系统》期末冲刺提分班！我是你们的讲师。"
      },
      {
        "type": "p",
        "text": "如果说上一章我们搞定了硬件，那么今天我们要攻克的是计算机的“大管家”——<strong>第二章《操作系统概述》</strong>。对于零基础的同学来说，这章是建立整个课程宏观框架的绝对重点。很多期末考试的名词解释、简答题和选择题都直接出自这里。"
      },
      {
        "type": "p",
        "text": "不用怕专业术语，我已经为你把这份枯燥的PPT“嚼碎了、消化了”，浓缩成了下面这份<strong>内部绝密速成提纲</strong>。跟着我的节奏，我们直接拿下这章的核心考点！"
      },
      {
        "type": "hr"
      },
      {
        "type": "h1",
        "text": "🚀 第二章 操作系统概述"
      },
      {
        "type": "h2",
        "text": "第一模块：操作系统的“三大目标”与“两副面孔” (必考填空/简答)"
      },
      {
        "type": "p",
        "text": "首先，我们要搞清楚操作系统（OS）到底是个什么东西。"
      },
      {
        "type": "ul",
        "items": [
          "<strong>三大主要目标</strong>："
        ]
      },
      {
        "type": "p",
        "text": "1. <strong>方便</strong>：作为用户和计算机之间的接口（让你不用手敲二进制代码）。"
      },
      {
        "type": "p",
        "text": "2. <strong>有效</strong>：作为资源管理器（合理分配CPU和内存）。"
      },
      {
        "type": "p",
        "text": "3. <strong>扩展能力</strong>：允许系统随着时间推移去升级硬件、添加新服务和纠正错误。"
      },
      {
        "type": "ul",
        "items": [
          "<strong>两副面孔（核心定位）</strong>："
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>作为接口</strong>：它为程序开发、程序运行、I/O设备访问、文件访问控制、错误检测等提供服务。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>作为资源管理器</strong>：操作系统本质上<strong>也是一段程序</strong>，它靠处理器执行。它会经常把处理器的控制权交给其他程序，然后再想办法把控制权“抢”回来。"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第二模块：操作系统的“进化史” (选择/排序题高频区)"
      },
      {
        "type": "p",
        "text": "操作系统不是一天建成的，它经历了四个极其重要的进化阶段。你必须记住它们的顺序和解决的痛点："
      },
      {
        "type": "p",
        "text": "1. <strong>串行处理 (Serial Processing)</strong>："
      },
      {
        "type": "ul",
        "items": [
          "<strong>时代背景</strong>：最早期的计算机（如1946年的ENIAC），<strong>没有操作系统</strong>。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>痛点</strong>：程序员直接操作硬件，全靠手工预约时间，准备时间极长，CPU大量时间被浪费在等待人工操作上。"
        ]
      },
      {
        "type": "p",
        "text": "2. <strong>简单批处理系统 (Simple Batch Systems)</strong>："
      },
      {
        "type": "ul",
        "items": [
          "<strong>核心发明</strong>：<strong>监控程序 (Monitor)</strong> 的诞生。用户不再直接访问机器，而是把作业交给操作员打包（批处理），监控程序会自动加载下一个程序，减少了人工干预。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>硬件支持</strong>：为了不让用户程序捣乱，硬件引入了<strong>内存保护、定时器、特权指令和中断</strong>。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>考点（运行模式）</strong>：由此诞生了<strong>用户模式（User Mode，用户程序运行，权限低）和内核模式（Kernel Mode，监控程序运行，权限高）</strong>。"
        ]
      },
      {
        "type": "p",
        "text": "3. <strong>多道批处理系统 (Multiprogrammed Batch Systems)</strong>："
      },
      {
        "type": "ul",
        "items": [
          "<strong>痛点</strong>：简单批处理时，由于I/O设备太慢，CPU经常处于空闲（闲着没事干）状态。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>伟大飞跃</strong>：<strong>多道程序设计 (Multiprogramming)</strong>！内存里同时装好几个程序。当程序A等待I/O时，CPU立刻切换去执行程序B。这极大提高了CPU和内存的利用率以及系统吞吐量。"
        ]
      },
      {
        "type": "p",
        "text": "4. <strong>分时系统 (Time Sharing Systems)</strong>："
      },
      {
        "type": "ul",
        "items": [
          "<strong>痛点</strong>：批处理系统不能让人机交互。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>解决方案</strong>：让处理器的时间在多个用户之间快速“切片”共享。最著名的早期系统是MIT开发的<strong>CTSS（兼容分时系统）</strong>，它靠时钟中断（约0.2秒一次）来抢占处理器并切换用户。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>对比考点</strong>：批处理的目标是<strong>最大化处理器利用率</strong>，而分时系统的目标是<strong>最小化响应时间</strong>。"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第三模块：现代操作系统的“五大理论基石” (核心大题区)"
      },
      {
        "type": "p",
        "text": "操作系统发展至今，拿下了5个最重要的理论成就，这是重中之重："
      },
      {
        "type": "p",
        "text": "<strong>1. 进程 (Process)</strong>"
      },
      {
        "type": "ul",
        "items": [
          "<strong>定义（必背）</strong>：一个正在执行的程序 / 一个单一顺序线程、当前状态和一组系统资源的活动单元。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>组成部分</strong>：一段可执行程序 + 相关数据 + <strong>执行上下文（进程状态，最关键！）</strong>。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>解决的问题</strong>：解决了并发执行时容易出现的错误，如不正确的同步、失败的互斥、死锁等。"
        ]
      },
      {
        "type": "p",
        "text": "<strong>2. 内存管理 (Memory Management)</strong>"
      },
      {
        "type": "ul",
        "items": [
          "<strong>五大职责</strong>：进程隔离、自动分配和管理、支持模块化程序设计、保护和访问控制、长期存储。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>虚存 (Virtual Memory) 与分页</strong>：允许程序以逻辑方式访问内存，物理上把程序切成固定大小的块（称为<strong>页</strong>），实现动态映射，彻底打破了物理内存大小的限制。"
        ]
      },
      {
        "type": "p",
        "text": "<strong>3. 信息保护和安全</strong>"
      },
      {
        "type": "ul",
        "items": [
          "记住四个关键词：<strong>可用性</strong>（防中断）、<strong>保密性</strong>（防偷看）、<strong>数据完整性</strong>（防篡改）、<strong>认证</strong>（验明正身）。"
        ]
      },
      {
        "type": "p",
        "text": "<strong>4. 调度和资源管理</strong>"
      },
      {
        "type": "ul",
        "items": [
          "策略必须考虑三个要素：<strong>公平性、有差别的响应性、有效性</strong>。"
        ]
      },
      {
        "type": "p",
        "text": "<strong>5. 系统结构</strong>"
      },
      {
        "type": "ul",
        "items": [
          "将复杂的操作系统划分为层次结构，每一层只依赖下一层。"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第四模块：现代操作系统的“新式武器” (概念连线题)"
      },
      {
        "type": "p",
        "text": "为了适应多核和网络时代，现代操作系统引入了以下新架构："
      },
      {
        "type": "ul",
        "items": [
          "<strong>微内核 (Microkernel)</strong>：把大部分功能踢出内核，内核只保留最基本的（如地址空间、IPC、基本调度）。优点是简化设计、极其灵活、<strong>非常适合分布式环境</strong>。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>多线程 (Multithreading)</strong>：把进程进一步切分为<strong>线程</strong>（可分派的工作单元）。进程成了资源分配的容器，线程才是真正在CPU上跑的实体。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>对称多处理 (SMP)</strong>：多个处理器共享内存和I/O，都能执行相同功能。优点是<strong>性能高、可用性强（坏一个不至于全死）、可扩展</strong>。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>面向对象设计 &amp; 客户-服务器模型</strong>：通过RPC（远程过程调用）通信，极大提高了操作系统的模块化和分布式计算能力。"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第五模块：实战演练——Windows 与 UNIX/Linux 架构"
      },
      {
        "type": "p",
        "text": "考试中通常会以常识题出现，了解它们的设计特点："
      },
      {
        "type": "ul",
        "items": [
          "<strong>Windows体系结构</strong>："
        ]
      },
      {
        "type": "ul",
        "items": [
          "广泛使用了面向对象概念（封装、继承、多态）和客户-服务器模型。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>内核模式</strong>包含：执行体（核心服务）、内核、HAL（硬件抽象层，屏蔽底层硬件差异）、设备驱动等。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>用户模式</strong>包含：环境子系统、用户应用程序、服务进程等。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>UNIX/Linux体系结构</strong>："
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>UNIX里程碑</strong>：当年用 <strong>C语言重写</strong> 是一个巨大飞跃。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>Linux特点</strong>：由Linus Torvalds开发，免费开源。最核心的考点是它是<strong>高度模块化的单体内核</strong>，支持<strong>可加载模块</strong>（动态链接、可堆叠），不需要重新编译整个内核就能添加新功能。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>系统调用 (System Call)</strong>：记住，所有用户应用程序想请求内核服务，都必须通过<strong>系统调用接口</strong>。"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "p",
        "text": "<strong>讲师寄语：</strong>"
      },
      {
        "type": "p",
        "text": "这份提纲是不是让第二章的脉络瞬间清晰了？这章的核心就在于理解操作系统<strong>“为了解决什么痛点，进化出了什么技术”</strong>（比如为了解决人工慢有了批处理，为了解决I/O慢有了多道程序，为了交互有了分时）。"
      },
      {
        "type": "p",
        "text": "把这份讲义里的<strong>粗体字</strong>和<strong>括号里的英文/解析</strong>多读两遍，这章的基础分数你就已经稳稳拿捏了！如果需要我针对某个考点（比如多道程序设计的推演）做进一步的详细拆解，随时告诉我！"
      },
      {
        "type": "p",
        "text": "同学们好！欢迎来到《操作系统》期末冲刺提分班！我是你们的讲师。"
      },
      {
        "type": "p",
        "text": "今天我们要啃下整门课最核心的硬骨头——<strong>第三章《进程描述和控制》</strong>。如果说操作系统是计算机的大管家，那么“进程”就是大管家手底下干活的打工人。这章的名词极其密集，是期中/期末考试画图题、简答题的<strong>绝对重灾区</strong>！"
      },
      {
        "type": "p",
        "text": "别慌，我已经把这份 PPT 里的所有考点给你“抽筋剥骨”，整理成了下面这份<strong>绝密速成提纲</strong>。跟紧我的思路，我们发车！"
      },
      {
        "type": "hr"
      },
      {
        "type": "h1",
        "text": "🚀 第三章 进程描述和控制"
      },
      {
        "type": "h2",
        "text": "第一模块：揭开“进程”的真面目 (必考概念/填空区)"
      },
      {
        "type": "p",
        "text": "很多零基础同学搞不懂程序和进程的区别。记住讲师一句话：<strong>程序是死在硬盘上的代码，进程是活在内存里干活的实体！</strong>"
      },
      {
        "type": "p",
        "text": "<strong>1. 进程的两大基本要素</strong>"
      },
      {
        "type": "p",
        "text": "当处理器开始执行代码时，这个执行实体就叫进程，它由两部分组成：<strong>程序代码</strong> 和 <strong>与代码相关联的数据集</strong>。"
      },
      {
        "type": "p",
        "text": "<strong>2.</strong> <strong>🌟</strong> <strong>绝对核心：进程映像 (Process Image)</strong>"
      },
      {
        "type": "p",
        "text": "考试如果问“进程到底包含了什么物理结构”，一定要答这四个词："
      },
      {
        "type": "ul",
        "items": [
          "<strong>用户程序 (User Program)</strong>：你要执行的代码。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>用户数据 (User Data)</strong>：程序运行时要用的数据，属于用户空间的可修改部分。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>系统栈 (System Stack)</strong>：用来保存过程调用和系统调用的参数及返回地址。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>进程控制块 (PCB - Process Control Block)</strong>：<strong>这是全章第一大重点！</strong>。"
        ]
      },
      {
        "type": "p",
        "text": "<strong>3. 进程的“身份证与病历本”：PCB</strong>"
      },
      {
        "type": "ul",
        "items": [
          "<strong>地位</strong>：PCB 是操作系统中<strong>最重要的数据结构</strong>！操作系统就是靠它来管理进程的。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>里面装了什么？</strong> (背诵口诀：<strong>我是谁、我在哪、我有什么特权</strong>)"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>进程标识符</strong>：每个进程独一无二的 ID（父进程和子进程也靠这个关联）。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>处理器状态信息</strong>：程序计数器（下一条执行哪句）、状态寄存器（如 x86 的 EFLAGS）和栈指针。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>进程控制信息</strong>：进程现在的状态（运行还是阻塞？）、优先级、拥有哪些资源。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>考点避坑</strong>：PCB 极度重要，一旦被破坏（比如被系统 bug 篡改），操作系统就会失去对该进程的控制。"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第二模块：进程的“生老病死”状态机 (画图题/大题重灾区)"
      },
      {
        "type": "p",
        "text": "这部分必考画图或状态转移判断！必须拿下！"
      },
      {
        "type": "p",
        "text": "<strong>1. 初级形态：双态模型</strong>"
      },
      {
        "type": "p",
        "text": "最简单的理解，进程要么在<strong>运行态 (Running)</strong>，要么在<strong>非运行态 (Not Running)</strong>。决定谁上处理器的那个小程序叫 <strong>分派器/调度器 (Dispatcher)</strong>。"
      },
      {
        "type": "p",
        "text": "<strong>2.</strong> <strong>🌟</strong> <strong>进阶形态：五态模型 (必背画图)</strong>"
      },
      {
        "type": "p",
        "text": "非运行态被细化了，变成了五个状态："
      },
      {
        "type": "ul",
        "items": [
          "<strong>新建 (New)</strong>：刚被创建，还没完全进内存。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>就绪 (Ready)</strong>：万事俱备，只欠 CPU（只要分派器选中我，我立马能跑）。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>运行 (Running)</strong>：正在 CPU 上狂奔。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>阻塞 (Blocked)</strong>：<strong>重点！</strong> 进程在等待某个事件（比如等用户输入、等 I/O 读取），这时候<strong>即使把 CPU 给它，它也跑不了</strong>。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>退出 (Exit)</strong>：进程结束。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>【考点辨析】</strong>：从“运行”到“就绪”是因为<strong>时间片用完了 (Timeout)</strong>；从“运行”到“阻塞”是因为<strong>申请 I/O 或等待事件 (Event Wait)</strong>。千万别搞混！"
        ]
      },
      {
        "type": "p",
        "text": "<strong>3. 终极形态：挂起状态 (Suspend)</strong>"
      },
      {
        "type": "ul",
        "items": [
          "<strong>痛点</strong>：内存空间是有限的。如果内存里所有进程都在“阻塞”等 I/O，CPU 就会闲着没事干。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>绝招</strong>：操作系统会把阻塞的进程<strong>踢出主存，放到磁盘上</strong>，腾出地方给新进程，这个动作叫 <strong>交换 (Swapping)</strong>。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>挂起的特征</strong>：被挂起的进程不能立即执行（因为在磁盘上），除非被显式唤醒。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>状态分裂</strong>：由此诞生了 <strong>就绪/挂起 (Ready/Suspend)</strong> 和 <strong>阻塞/挂起 (Blocked/Suspend)</strong> 两个新状态。"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第三模块：操作系统的“幕后管理学” (选择/简答区)"
      },
      {
        "type": "p",
        "text": "<strong>1. 操作系统的“四大账本”</strong>"
      },
      {
        "type": "p",
        "text": "为了管理整个系统，操作系统维护了四张表，它们互相交叉引用："
      },
      {
        "type": "ul",
        "items": [
          "<strong>内存表</strong>：管内存分配和虚拟内存映射。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>I/O 表</strong>：管设备通道分配和传输状态。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>文件表</strong>：管文件存在哪、当前状态和属性。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>进程表</strong>：管所有进程的 PCB。"
        ]
      },
      {
        "type": "p",
        "text": "<strong>2. 用户态 vs 内核态</strong>"
      },
      {
        "type": "p",
        "text": "处理器执行时有两副面孔："
      },
      {
        "type": "ul",
        "items": [
          "<strong>用户态 (User Mode)</strong>：低特权，普通用户程序在这跑，防止你乱搞破坏系统。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>系统态/内核态 (Kernel Mode)</strong>：高特权，操作系统的核心代码在这跑，能执行特权指令。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>怎么切换？</strong> 当发生<strong>系统调用、中断 (如时钟/IO) 或 陷阱 (如程序报错)</strong> 时，程序计数器会跳转，CPU 从用户态切入内核态。"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第四模块：模式切换与进程切换的终极辨析 (核心易错点)"
      },
      {
        "type": "p",
        "text": "考试极喜欢问：<strong>模式切换和进程切换是一回事吗？绝对不是！</strong>"
      },
      {
        "type": "ul",
        "items": [
          "<strong>模式切换 (Mode Switch)</strong>：只是 CPU 的权限变了（比如从用户态切到内核态去处理一个中断），但<strong>底层跑的还是同一个进程</strong>。只需保存几条寄存器信息，开销极小。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>进程切换 (Process Switch)</strong>：这可是“大换血”！CPU 要从进程 A 彻底切换到进程 B。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>七步走（必背流程）</strong>：1. 保存当前处理器的上下文 -&gt; 2. 更新当前进程的 PCB（把状态改为就绪/阻塞） -&gt; 3. 把 PCB 移到相应队列 -&gt; 4. <strong>挑选一个新进程</strong> -&gt; 5. 更新新进程的 PCB -&gt; 6. 更新内存管理数据结构 -&gt; 7. 恢复新进程的上下文。开销巨大！"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第五模块：实战演练——UNIX 进程机制 (高频扩展考点)"
      },
      {
        "type": "p",
        "text": "结合 UNIX 系统，讲师给大家圈几个常考的实战概念："
      },
      {
        "type": "p",
        "text": "<strong>1. UNIX 状态机的特殊形态</strong>"
      },
      {
        "type": "ul",
        "items": [
          "<strong>僵尸态 (Zombie)</strong>：进程其实已经死透了（不再存在），但它还<strong>留下了一条记录等待父进程来收尸（收集状态信息）</strong>，这就叫僵尸进程。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>抢占 (Preempted)</strong>：进程从内核态返回用户态时，内核觉得另一个进程更急，直接把它踢下来，此时状态变为被抢占。"
        ]
      },
      {
        "type": "p",
        "text": "<strong>2. 神奇的</strong> <code><strong>fork()</strong></code> <strong>创建大法</strong>"
      },
      {
        "type": "p",
        "text": "UNIX 是怎么生孩子的（创建进程）？通过内核系统调用 <code>fork()</code>。"
      },
      {
        "type": "ul",
        "items": [
          "<strong>动作</strong>：内核会给子进程分配 ID，然后<strong>直接复制一份父进程的映像（共享内存除外）</strong>。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>认亲密码（核心考点）</strong>：<code>fork()</code> 会返回两次！它把 <strong>子进程的 ID 返回给父进程</strong>，然后把 <strong>0 返回给子进程</strong>。程序就是靠这个返回值来判断自己到底是爸爸还是儿子的！"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "p",
        "text": "<strong>讲师寄语：</strong>"
      },
      {
        "type": "p",
        "text": "同学们，第三章的速成提纲都在这里了！这章的任督二脉就是：<strong>PCB是核心资产，五态模型是生命周期，内核态/用户态是权限管理，进程切换是大手术！</strong>"
      },
      {
        "type": "p",
        "text": "建议你现在立刻拿出一张白纸，闭上眼睛把<strong>五态/挂起模型转移图</strong>画一遍。如果能画出来，这章你至少已经拿下了 70% 的分数！需要我给你出道历年真题测测你的“画图功底”吗？"
      },
      {
        "type": "p",
        "text": "同学们好！欢迎再次来到《操作系统》期末冲刺提分班！我是你们的讲师。"
      },
      {
        "type": "p",
        "text": "今天我们要一举拿下<strong>第四章《线程、SMP与微内核》</strong>。对于零基础的同学来说，如果说前面学的“进程”是操作系统里干活的“包工头”，那么今天我们要学的“线程”就是真正搬砖的“工人”。"
      },
      {
        "type": "p",
        "text": "这一章是期中/期末考试的<strong>绝对得分重灾区</strong>，特别是“用户级线程和内核级线程的区别”，几乎年年必考大题或简答题！"
      },
      {
        "type": "p",
        "text": "我已经为你把这份PPT浓缩成了下面这份<strong>内部绝密速成提纲</strong>，请一定要把标粗的重点刻在脑子里，我们直接发车！"
      },
      {
        "type": "hr"
      },
      {
        "type": "h1",
        "text": "🚀 第四章 线程、SMP与微内核"
      },
      {
        "type": "h2",
        "text": "第一模块：包工头与打工人 —— 进程 vs 线程 (必考概念/辨析题)"
      },
      {
        "type": "p",
        "text": "在早期的操作系统中，进程既要占地盘（拥有资源），又要干苦力（被调度执行）。但这样太笨重了，于是现代操作系统把这两个身份拆开了："
      },
      {
        "type": "ul",
        "items": [
          "<strong>进程 (Process) —— “包工头”</strong>：它是<strong>资源所有权</strong>的单位（占有虚拟地址空间、内存、文件等）。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>线程 (Thread) —— “打工人”</strong>：它是<strong>调度/执行（分派）</strong>的单位。一个进程里可以有多个线程，它们共享包工头的地盘（内存、资源），但各自干各自的活。"
        ]
      },
      {
        "type": "p",
        "text": "<strong>🌟</strong> <strong>核心考点：为什么我们需要引入线程？（背诵“四大快”）</strong>"
      },
      {
        "type": "p",
        "text": "1. <strong>创建快</strong>：创建一个新线程比新进程快得多（不用重新分配虚拟地址空间）。"
      },
      {
        "type": "p",
        "text": "2. <strong>销毁快</strong>：终止线程比终止进程快。"
      },
      {
        "type": "p",
        "text": "3. <strong>切换快</strong>：同一进程内的线程切换，不需要清空CPU缓存和TLB，开销极小。"
      },
      {
        "type": "p",
        "text": "4. <strong>通信快（免内核）</strong>：因为同进程的线程共享内存，它们互相传数据直接读写内存就行，<strong>不需要调用内核</strong>。"
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第二模块：两大门派的对决 —— ULT vs KLT (🔥 全卷最高频大题)"
      },
      {
        "type": "p",
        "text": "线程具体是怎么被管理的？考试最爱考这两种线程架构的<strong>优缺点对比</strong>："
      },
      {
        "type": "h3",
        "text": "用户级线程 (ULT - User-Level Threads)"
      },
      {
        "type": "ul",
        "items": [
          "<strong>谁来管</strong>：完全由用户空间的<strong>线程库</strong>（Threads Library）来管理，<strong>内核根本不知道这些线程的存在</strong>（内核眼里只有一个进程）。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>优点（快、自由）</strong>："
        ]
      },
      {
        "type": "ul",
        "items": [
          "线程切换在用户态完成，<strong>不需要切换到内核模式</strong>，速度极快。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "调度算法可以由应用程序自己定制。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "可以在任何操作系统上运行（只要有对应的线程库）。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>致命缺点（考试最爱考）</strong>："
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>“一人拉胯，全家连坐”</strong>：因为内核只认进程，如果其中一个线程执行系统调用被阻塞了，<strong>整个进程里的所有线程都会被内核一起阻塞</strong>。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>不能利用多核</strong>：纯ULT策略下，即使是多核CPU，内核一次也只能把这个进程分配给一个核心，里面的多个线程无法真正并行。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>补救措施</strong>：使用<strong>套管（Jacketing）</strong>技术，把阻塞系统调用转化为非阻塞调用。"
        ]
      },
      {
        "type": "h3",
        "text": "内核级线程 (KLT - Kernel-Level Threads)"
      },
      {
        "type": "ul",
        "items": [
          "<strong>谁来管</strong>：所有的线程管理都由<strong>操作系统内核</strong>亲力亲为。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>优点（真正的并发）</strong>："
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>完美利用多核</strong>：内核可以把同一个进程的不同线程，同时分派到不同的处理器上并行执行。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>独立阻塞</strong>：一个线程阻塞了，内核可以继续调度该进程的其他线程去执行。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>致命缺点</strong>："
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>慢（开销大）</strong>：同一进程内的线程切换，也必须切换到<strong>内核模式（特权模式）</strong>，开销远大于ULT。"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第三模块：多核时代的引擎 —— SMP 对称多处理 (选择/填空)"
      },
      {
        "type": "ul",
        "items": [
          "<strong>它的前世今生 (Flynn分类法)</strong>：在计算机架构中，SMP 属于 <strong>MIMD（多指令多数据流）</strong> 下的“共享内存（紧密耦合）”分支。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>SMP 的特征</strong>：内核可以在<strong>任何处理器</strong>上执行，处理器会从池子里自己找活干。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>SMP 操作系统的设计难点 (考简答)</strong>："
        ]
      },
      {
        "type": "p",
        "text": "由于多个CPU同时跑，内核代码必须是<strong>可重入的</strong>，必须解决<strong>调度分配、互斥同步（防止数据被同时改写）、存储器一致性以及容错性</strong>等复杂问题。"
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第四模块：操作系统的“极简风” —— 微内核 (Microkernel)"
      },
      {
        "type": "p",
        "text": "传统操作系统是个大杂烩，什么都塞在内核里。而微内核理念是<strong>“断舍离”</strong>。"
      },
      {
        "type": "ul",
        "items": [
          "<strong>核心理念</strong>：内核只保留最基础的服务（如低级存储器管理、IPC消息传递），其他像文件系统、设备驱动、窗口系统，全部踢出内核，作为外围服务运行。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>优点 (4大特性)</strong>："
        ]
      },
      {
        "type": "p",
        "text": "1. <strong>统一界面</strong>：大家全靠<strong>消息传递 (Message Passing)</strong> 沟通。"
      },
      {
        "type": "p",
        "text": "2. <strong>灵活性/扩展性</strong>：加功能、减功能都不需要动内核。"
      },
      {
        "type": "p",
        "text": "3. <strong>可移植性</strong>：换了新硬件，只要改微内核那一点点代码就行。"
      },
      {
        "type": "p",
        "text": "4. <strong>分布式系统支持</strong>：发消息给本地服务和远程服务，在微内核看来是一样的。"
      },
      {
        "type": "ul",
        "items": [
          "<strong>致命缺点</strong>：<strong>性能损失！</strong> 因为组件之间疯狂发消息，开销比传统系统调用大得多。"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第五模块：实战大PK —— 各大系统的独门绝技 (常识连线题)"
      },
      {
        "type": "p",
        "text": "这部分考得很细，重点记住这几个系统的“骚操作”："
      },
      {
        "type": "p",
        "text": "1. <strong>Windows 的“亲和性”</strong>"
      },
      {
        "type": "ul",
        "items": [
          "<strong>软亲和性</strong>：调度器尽量把线程安排在它上次跑的那个CPU上（为了利用还没被冲刷掉的<strong>L1/L2缓存数据</strong>）。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>硬亲和性</strong>：强制规定某个线程只能在特定的某个CPU上跑。"
        ]
      },
      {
        "type": "p",
        "text": "2. <strong>Solaris 的“四层汉堡”与“神级中断”</strong>"
      },
      {
        "type": "ul",
        "items": [
          "它为了融合 ULT 和 KLT，搞了个中间层叫 <strong>轻量级进程 (LWP)</strong>，负责把用户级线程映射到内核级线程上。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>极其特殊的考点</strong>：Solaris <strong>把硬件中断也当作线程来处理</strong>！并且中断线程的优先级<strong>高于所有其他类型的内核线程</strong>。"
        ]
      },
      {
        "type": "p",
        "text": "3. <strong>Linux 的“障眼法”</strong>"
      },
      {
        "type": "ul",
        "items": [
          "<strong>绝对考点</strong>：Linux 底层<strong>根本不区分进程和线程</strong>！它统称它们为“任务 (Task)”，由 <code>task_struct</code> 结构管理。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>怎么实现线程？</strong> 它通过一个神仙系统调用 <code><strong>clone()</strong></code>。它本质上是创建一个新进程，但可以通过标志位（如 <code>CLONE_VM</code>, <code>CLONE_FILES</code>）让新进程和老进程<strong>共享同一个内存地址空间和文件表</strong>。共享了资源的进程，在表现上不就是线程了吗！"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "p",
        "text": "<strong>讲师寄语：</strong>"
      },
      {
        "type": "p",
        "text": "同学们，这章其实是一次思维的升级。你只要记住<strong>“线程是为了快而生，微内核是为了灵活而生”</strong>，并在脑海里把<strong>“ULT的阻塞连坐问题”</strong>和<strong>“Linux的 clone() 假装是线程”</strong>这两个最爱考的点划上重点星号，这章的客观题和简答题你就已经提前锁定胜局了！"
      },
      {
        "type": "p",
        "text": "先把重点背下来，如果需要我帮你用这章的知识解答一下哪道具体的历年真题，随时发给我！"
      },
      {
        "type": "p",
        "text": "同学们好！欢迎来到《操作系统》期末冲刺提分班！我是你们的讲师。"
      },
      {
        "type": "p",
        "text": "今天我们要一举拿下全书最核心、最硬核，也是期末考试<strong>代码大题和简答题的“重灾区”</strong>——<strong>第五章《并发性：互斥和同步》</strong>。"
      },
      {
        "type": "p",
        "text": "对于零基础的同学来说，这章的代码和概念看起来像天书，但别怕！它的底层逻辑其实就是<strong>“多个人怎么排队抢厕所”</strong>以及<strong>“多个人怎么分工合作”</strong>。我已经把这份PPT嚼碎了，为你浓缩成下面这份<strong>内部绝密速成提纲</strong>。抓紧扶手，我们要发车了！"
      },
      {
        "type": "hr"
      },
      {
        "type": "h1",
        "text": "🚀 第五章：并发的互斥与同步"
      },
      {
        "type": "h2",
        "text": "第一模块：认清敌人——并发为什么会出Bug？"
      },
      {
        "type": "p",
        "text": "在单核或多核CPU中，多个程序交错或同时运行，因为<strong>执行的相对速度无法预测</strong>，就会产生并发问题。"
      },
      {
        "type": "ul",
        "items": [
          "<strong>核心痛点：竞争条件 (Race Condition)</strong>"
        ]
      },
      {
        "type": "p",
        "text": "当多个进程读写同一个共享数据时，最终的结果完全取决于它们执行的先后顺序，这就叫竞争条件。比如两个线程同时对变量进行加减，最后的值可能完全不对。"
      },
      {
        "type": "ul",
        "items": [
          "<strong>基础武器：原子操作 (Atomic Operation)</strong>"
        ]
      },
      {
        "type": "p",
        "text": "要解决并发问题，底层必须依赖“原子操作”：<strong>它要么完全执行到底，要么根本不执行，绝对不会在中间被打断</strong>。"
      },
      {
        "type": "ul",
        "items": [
          "<strong>生动案例：喂猫问题 (Feeding the Cat)</strong>"
        ]
      },
      {
        "type": "p",
        "text": "PPT里用了一个生动的例子：你和室友共同养了一只猫，猫每天只能喂一次。如果不加限制，你们俩可能会把猫撑死（重复喂）或者饿死（互相以为对方喂了）。为了解决这个问题，我们需要引入“锁”的概念。"
      },
      {
        "type": "h2",
        "text": "第二模块：必考名词解释（考前默写区）"
      },
      {
        "type": "p",
        "text": "考试极其喜欢考这些概念的辨析，请死死记住这张表："
      },
      {
        "type": "p",
        "text": "1. <strong>临界区 (Critical Section)</strong>：程序中访问共享资源的那段代码。<strong>一次只能有一个进程进去</strong>。"
      },
      {
        "type": "p",
        "text": "2. <strong>互斥 (Mutual Exclusion)</strong>：当一个进程在临界区时，绝对不允许其他进程进入。"
      },
      {
        "type": "p",
        "text": "3. <strong>死锁 (Deadlock)</strong>：两个或多个进程互相死等对方释放资源，导致谁也无法继续。"
      },
      {
        "type": "p",
        "text": "4. <strong>活锁 (Livelock)</strong>：进程没有被阻塞，但一直在疯狂改变状态互相谦让，导致谁都干不了正事（比如Dekker算法的早期版本就容易出现）。"
      },
      {
        "type": "p",
        "text": "5. <strong>饥饿 (Starvation)</strong>：某个可运行的倒霉进程，被调度器无限期地忽略，永远得不到执行。"
      },
      {
        "type": "h2",
        "text": "第三模块：从“石器时代”到“青铜时代”的解决方案"
      },
      {
        "type": "p",
        "text": "为了实现互斥，计算机科学家们尝试了软件和硬件的两套方案。这部分常考<strong>优缺点辨析</strong>："
      },
      {
        "type": "h3",
        "text": "纯软件方案 (烧脑且易错)"
      },
      {
        "type": "ul",
        "items": [
          "<strong>Peterson 算法</strong>：通过 <code>flag</code>（表示意愿）和 <code>turn</code>（表示谦让）完美实现了互斥，且比早期的 Dekker 算法更容易证明正确性。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>Lamport 面包店算法 (Bakery Algorithm)</strong>：专门解决N个进程的互斥。思想源于排队取号：票号最小的先进去；如果票号相同，进程 ID 小的优先（字典序比较）。"
        ]
      },
      {
        "type": "h3",
        "text": "硬件级别的支持 (简单粗暴)"
      },
      {
        "type": "ul",
        "items": [
          "<strong>禁用中断</strong>：进程进临界区前直接关闭中断。<strong>致命缺点</strong>：把关中断特权交给用户很危险，且在多处理器（多核）上完全无效。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>专用机器指令 (</strong><code><strong>testset</strong></code> <strong>/</strong> <code><strong>exchange</strong></code><strong>)</strong>：硬件层面提供的一气呵成、绝对不会被打断的指令，可以在多处理器上使用。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>🚨</strong> <strong>终极考点（机器指令的缺点）</strong>："
        ]
      },
      {
        "type": "p",
        "text": "1. 会产生<strong>“忙等待” (Busy Waiting)</strong>，拿不到锁的进程会在门口疯狂死循环，白白浪费CPU时间。"
      },
      {
        "type": "p",
        "text": "2. 可能导致某些进程永远抢不到锁，发生<strong>饥饿</strong>。"
      },
      {
        "type": "p",
        "text": "3. 如果有优先级机制，还可能引发死锁。"
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第四模块：黄金时代的“三大法宝”（期末大题轰炸区！！！）"
      },
      {
        "type": "p",
        "text": "因为硬件指令有“忙等待”的缺陷，操作系统为我们封装了三大高级同步原语。这是本章的绝对核心！"
      },
      {
        "type": "h3",
        "text": "法宝一：信号量 (Semaphore) —— 考代码题最多！"
      },
      {
        "type": "ul",
        "items": [
          "<strong>本质</strong>：一个包含非负整数值和等待队列的结构体。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>两大原子操作</strong>："
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>P 操作 (</strong><code><strong>semWait</strong></code><strong>)</strong>：测试。值减1，如果值 &lt; 0，进程<strong>把自己扔进队列睡眠（阻塞）</strong>。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>V 操作 (</strong><code><strong>semSignal</strong></code><strong>)</strong>：增加。值加1，如果值 &lt;= 0，从队列里<strong>唤醒</strong>一个进程。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>强/弱信号量</strong>：如果等待队列采用<strong>先进先出 (FIFO)</strong>，就是强信号量（能避免饥饿）；如果不规定顺序，就是弱信号量。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>🚨</strong> <strong>必考大题模型：生产者/消费者问题</strong>"
        ]
      },
      {
        "type": "ul",
        "items": [
          "要用三个信号量：互斥锁 <code>s=1</code>，商品数 <code>n=0</code>，空位数 <code>e=缓冲区大小</code>。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>考试致命避坑点</strong>：<strong>申请资源的 P 操作（</strong><code><strong>semWait(n)</strong></code> <strong>或</strong> <code><strong>semWait(e)</strong></code><strong>），必须永远写在申请互斥锁的 P 操作（</strong><code><strong>semWait(s)</strong></code><strong>）前面！</strong> 否则如果进去后发现没资源，抱着互斥锁睡觉，必然导致全系统<strong>死锁</strong>！而 V 操作的顺序则无所谓，只影响效率。"
        ]
      },
      {
        "type": "h3",
        "text": "法宝二：管程 (Monitors) —— 傻瓜式的高级锁"
      },
      {
        "type": "ul",
        "items": [
          "<strong>动机</strong>：信号量的 P/V 操作散落在代码各处，极其容易写错导致死锁。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>机制</strong>：管程把共享数据和方法封装在一起。天生自带互斥（任何时候只有一个进程能在管程里）。同步则依赖<strong>条件变量</strong>。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>常考流派对比</strong>："
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>Hoare 管程</strong>：唤醒别人后，被唤醒者立刻执行。缺点是调度开销大，要求系统极其可靠。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>Mesa 管程</strong>：使用 <code>cnotify</code> 和 <code>cbroadcast</code>。发出通知后，发信号的进程继续执行；被唤醒的进程进入就绪队列，<strong>等真正轮到它时，必须重新检查一次条件</strong>（错误更少，模块化更好）。"
        ]
      },
      {
        "type": "h3",
        "text": "法宝三：消息传递 (Message Passing) —— 分布式必备"
      },
      {
        "type": "ul",
        "items": [
          "<strong>动机</strong>：管程搞不定多台计算机之间的同步，必须用消息传递。它同时满足<strong>同步和通信</strong>两大需求。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>最常用组合</strong>：<strong>无阻塞 Send（发完就去干别的） + 阻塞 Receive（死等消息到来）</strong>。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>寻址方式</strong>：可以通过信箱 (Mailbox) 进行间接寻址，实现更灵活的多对多通信。"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第五模块：终极Boss实战 —— 读者/写者问题"
      },
      {
        "type": "p",
        "text": "这部分是检验你是否真正掌握了并发原语的试金石。"
      },
      {
        "type": "ul",
        "items": [
          "<strong>问题规则</strong>：无数个读者可以同时看；写者必须绝对独占（排斥其他写者和读者）。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>核心策略辨析</strong>："
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>读者优先</strong>：只要系统里还有读者，新来的读者不用等写者，直接进。容易导致写者饥饿。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>写者优先</strong>：一旦有写者排队，后面的读者就必须被拦住，优先让写者进。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>🚨</strong> <strong>考试易错判断题</strong>："
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>问：</strong> 读者/写者问题是不是生产者/消费者问题的特例？"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>答：</strong> <strong>绝对不是！</strong> 生产者只是写入，但它也必须读取并修改队列指针；消费者同样要修改指针。两者对数据的操作机制完全不同。"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "p",
        "text": "<strong>讲师寄语：</strong>"
      },
      {
        "type": "p",
        "text": "这份提纲已经把第五章所有的核心骨架给你搭好了！考试中遇到这章的选择填空，就到前三个模块和概念里找答案；遇到大题，一定要在草稿纸上模拟推演信号量（P/V）的数值变化，牢记<strong>“先要资源，再要互斥锁”</strong>的口诀。"
      },
      {
        "type": "p",
        "text": "你现在可以去看看PPT最后一页布置的作业题（5.3, 5.4, 5.5, 5.7, 5.11, 5.12, 5.21, 5.25），你会发现它们考的完全就是我们刚才讲的这些核心痛点！准备好进入大题实战了吗？"
      },
      {
        "type": "p",
        "text": "同学们好！欢迎来到《操作系统》期末冲刺提分班！我是你们的讲师。"
      },
      {
        "type": "p",
        "text": "今天我们要一举拿下<strong>第六章《并发性：死锁和饥饿》</strong>。对于零基础的同学来说，这章的内容听起来很吓人，但其实它的底层逻辑非常贴近生活（比如“交通堵塞”和“银行借钱”）。为了让大家在最短时间内拿到这章的分数，我为你量身定制了这份<strong>内部绝密速成提纲</strong>。请集中注意力，我们马上发车！"
      },
      {
        "type": "hr"
      },
      {
        "type": "h1",
        "text": "🚀 操作系统期末冲刺绝密讲义：死锁与饥饿"
      },
      {
        "type": "h2",
        "text": "第一模块：认清敌人——什么是死锁？(选择/判断高频区)"
      },
      {
        "type": "p",
        "text": "要解决问题，首先要认清问题。"
      },
      {
        "type": "p",
        "text": "<strong>1. 死锁的本质</strong>"
      },
      {
        "type": "ul",
        "items": [
          "<strong>绝对定义</strong>：死锁是一组竞争系统资源或相互通信的进程被<strong>永久阻塞</strong>。每个进程都在等待另一个同组进程占用的某些资源，导致大家一起卡死。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>考试避坑</strong>：目前在系统设计中并没有绝对完美的有效解决方案。"
        ]
      },
      {
        "type": "p",
        "text": "<strong>2. 资源的“两大门派”</strong>"
      },
      {
        "type": "p",
        "text": "考试极爱考资源的分类，记住以下两个特征："
      },
      {
        "type": "ul",
        "items": [
          "<strong>可重用资源</strong>：一次仅一个进程安全使用，且<strong>不会因使用而耗尽</strong>（例如：处理器、主存、文件、数据库和信号量）。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>可消耗资源</strong>：可以被动态地<strong>创建和销毁</strong>（例如：中断、信号、消息和I/O缓冲区中的信息）。如果进程间都在互相等待对方发送消息，就会引发可消耗资源死锁。"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第二模块：召唤死锁的“四大条件”(必背大题)"
      },
      {
        "type": "p",
        "text": "这四个条件就像召唤神龙的四颗龙珠，<strong>四个条件一起构成了死锁的充分必要条件</strong>："
      },
      {
        "type": "p",
        "text": "1. <strong>互斥 (Mutual exclusion)</strong>：一次只有一个进程可以使用一个资源。"
      },
      {
        "type": "p",
        "text": "2. <strong>占有且等待 (Hold and wait)</strong>：当一个进程等待其他进程时，继续占有它已经分配到的资源。"
      },
      {
        "type": "p",
        "text": "3. <strong>不可抢占 (No preemption)</strong>：不能强行抢占进程已占有的资源。"
      },
      {
        "type": "p",
        "text": "4. <strong>循环等待 (Circular wait)</strong>：存在一个闭合的进程链，每个进程至少占有下一个进程所需的一个资源。前三个条件是发生死锁的必要条件，而第四个条件实际上是前三个条件的潜在后果。"
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第三模块：三大战役——如何处理死锁？(核心应用/简答题)"
      },
      {
        "type": "p",
        "text": "操作系统对付死锁有三套截然不同的武功心法，考试最爱考它们的对比！"
      },
      {
        "type": "h3",
        "text": "战法一：死锁预防 (Deadlock Prevention) —— 严防死守的“保守派”"
      },
      {
        "type": "ul",
        "items": [
          "<strong>核心思想</strong>：设计一个不可能出现死锁的系统，直接破坏四个必要条件之一。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>破解招式与致命缺点</strong>："
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>破“互斥”</strong>：不可行，因为有些资源天生必须互斥。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>破“占有并等待”</strong>：要求进程一上来就<strong>一次性请求所有所需资源</strong>。缺点是极度浪费资源，且系统往往不知道进程未来需要什么。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>破“不可抢占”</strong>：如果进程请求被拒，必须释放已有资源。缺点是仅当状态可以轻松保存并稍后恢复时才实用（比如处理器），对其他资源不实用。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>破“循环等待”</strong>：给资源定义<strong>线性排序</strong>，只能按固定顺序申请。缺点是会不必要地拒绝资源，缺乏灵活性。"
        ]
      },
      {
        "type": "h3",
        "text": "战法二：死锁避免 (Deadlock Avoidance) —— 走钢丝的“聪明人”"
      },
      {
        "type": "ul",
        "items": [
          "<strong>核心思想</strong>：允许前三个条件存在，但在每次分配资源前，系统会<strong>动态做出明智的选择</strong>以确保永远不会达到死锁点。它比“预防”允许更多的并发。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>🌟</strong> <strong>终极考点：银行家算法 (Banker&#039;s Algorithm)</strong>"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>打个比方</strong>：把操作系统看作银行，进程看作借钱的客户，资源就是钱。银行保证在客户请求时，永远不会离开“安全状态”。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>安全状态 vs 不安全状态</strong>：如果系统能找到至少一个资源分配序列不会导致死锁，就是<strong>安全状态</strong>。<strong>注意避坑：不安全状态不等于死锁状态！</strong> 它只是预见到可能出现死锁，提前拒绝借钱。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>算法前提（极其严苛）</strong>：必须事先知道每个进程需要的<strong>最大资源量</strong>（Claim矩阵）、当前分配的资源量（Allocation矩阵）和系统当前的可用资源（Available向量）。并且占有资源时进程不能退出。"
        ]
      },
      {
        "type": "h3",
        "text": "战法三：死锁检测与恢复 (Deadlock Detection) —— 亡羊补牢的“乐天派”"
      },
      {
        "type": "ul",
        "items": [
          "<strong>核心思想</strong>：非常自由，不限制资源访问，只要有可能就会把资源分配给进程。系统定期执行死锁检测算法，检测是否发生了循环等待。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>恢复绝招（怎么收拾残局）</strong>：一旦检测到死锁，就终止所有死锁进程，或者回滚、连续抢占资源。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>杀进程的挑选标准（选择题常客）</strong>"
        ]
      },
      {
        "type": "p",
        "text": "... [OUTPUT TRUNCATED - 2537 chars omitted out of 52537 total] ..."
      },
      {
        "type": "p",
        "text": "*：随着进程不断进进出出，内存中会产生大量微小的、不连续的空隙。虽然总容量够，但拼不到一起去，这就是“分区外部”的垃圾空间。"
      },
      {
        "type": "ul",
        "items": [
          "<strong>解决绝招——压缩 (Compaction)</strong>：操作系统不时地移动进程，把它们挤到一起，腾出一大块连续的空闲内存。但缺点是<strong>极度耗时且浪费 CPU 时间</strong>。"
        ]
      },
      {
        "type": "p",
        "text": "<strong>3. 折中方案：伙伴系统 (Buddy System)（大题考点）</strong>"
      },
      {
        "type": "ul",
        "items": [
          "<strong>核心逻辑</strong>：内存块的大小永远是 <strong>2 的幂次方</strong>（比如128K, 256K）。如果要分配 70K 的空间，系统会把 256K 一分为二变成 128K，再把其中一个分配出去。等空间释放时，相邻的“伙伴”会像消消乐一样重新合并成大块。"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第三模块：动态分区的“三大选房策略”（选择题必考）"
      },
      {
        "type": "p",
        "text": "当系统里有多个空闲内存块时，新来的进程该选哪一块？（对应我们之前做过的习题7.5）"
      },
      {
        "type": "p",
        "text": "1. <strong>首次适配 (First-fit)</strong>：从头开始扫描，碰到<strong>第一个</strong>足够大的就塞进去。"
      },
      {
        "type": "ul",
        "items": [
          "<strong>特点</strong>：通常是最快、最好的，但会让内存前端产生很多小碎片。"
        ]
      },
      {
        "type": "p",
        "text": "2. <strong>下次适配 (Next-fit)</strong>：从上次放置的位置<strong>继续往下扫</strong>，碰到够大的就塞。"
      },
      {
        "type": "ul",
        "items": [
          "<strong>特点</strong>：容易导致内存末尾的大块空闲空间很快被切碎，需要更频繁地进行压缩。"
        ]
      },
      {
        "type": "p",
        "text": "3. <strong>最佳适配 (Best-fit)</strong>：扫描全局，选一个<strong>大小最接近</strong>请求的空闲块。"
      },
      {
        "type": "ul",
        "items": [
          "<strong>🔥</strong> <strong>考试避坑</strong>：名字叫“最佳”，但<strong>总体表现最差！</strong> 因为它每次都切得很抠门，留下的碎片小到任何程序都用不了，导致最严重的碎片化。"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第四模块：地址转换的底层逻辑（计算题/填空题）"
      },
      {
        "type": "ul",
        "items": [
          "<strong>逻辑地址</strong>：相对于程序起始点的地址，比如“程序开头往后偏移 1500 字节”。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>物理地址（绝对地址）</strong>：内存条上实实在在的物理位置。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>硬件支持（两把锁）</strong>："
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>基址寄存器 (Base Register)</strong>：存程序的起始物理地址。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>界限寄存器 (Bounds Register)</strong>：存程序的长度上限（为了防止越界报错）。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>转换公式</strong>：物理地址 = 基址寄存器的值 + 逻辑地址（相对地址）。"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第五模块：终极解决方案——分页与分段（全章最核心对比）"
      },
      {
        "type": "p",
        "text": "为了彻底消灭固定分区的“内部碎片”和动态分区的“外部碎片”，现代操作系统引入了这两种技术："
      },
      {
        "type": "p",
        "text": "<strong>1. 简单分页 (Paging)</strong>"
      },
      {
        "type": "ul",
        "items": [
          "<strong>原理</strong>：把物理内存切成大小相等的<strong>页框 (Frame)</strong>，把进程切成同样大小的<strong>页 (Page)</strong>。这样一页刚好塞进一个页框里，不需要连续存放。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>碎片情况</strong>：<strong>没有外部碎片</strong>。只在进程的最后一页有<strong>极少量的内部碎片</strong>。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>地址结构</strong>：逻辑地址被拆分为两部分 = <strong>页号 + 偏移量</strong>。操作系统通过查<strong>页表 (Page Table)</strong> 来找到页框号。"
        ]
      },
      {
        "type": "p",
        "text": "<strong>2. 简单分段 (Segmentation)</strong>"
      },
      {
        "type": "ul",
        "items": [
          "<strong>原理</strong>：按照程序的逻辑结构（比如主函数一段、数据一段、栈一段）切分成<strong>长度不等</strong>的片段（有最大长度限制）。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>碎片情况</strong>：<strong>没有内部碎片</strong>，但存在<strong>外部碎片</strong>（类似于动态分区）。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>优势</strong>：非常符合程序员的逻辑思维，天然支持模块化编程和数据保护/共享。"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "p",
        "text": "<strong>讲师寄语：</strong>"
      },
      {
        "type": "p",
        "text": "这份提纲就是第七章的全部骨架！这章的重点非常集中：<strong>一定要背熟那张各种技术的优缺点对比图（内部碎片 vs 外部碎片）</strong>！另外，结合我们之前推演过的课后题（比如 7.7 的伙伴系统拆分、7.14 的段表地址计算），你再把“基址+偏移量”的转换公式看一遍，这章的选择题和计算题就没问题了！"
      },
      {
        "type": "p",
        "text": "你现在需要我用真题带你实战演练一下<strong>伙伴系统的合并过程</strong>或者<strong>逻辑地址的转换计算</strong>吗？"
      },
      {
        "type": "p",
        "text": "同学们好！欢迎来到《操作系统》期末冲刺提分班！我是你们的讲师。"
      },
      {
        "type": "p",
        "text": "如果说前面的章节是操作系统的“骨架”，那么今天我们要拿下的<strong>第八章《虚拟内存》</strong>，就是这门课里最神奇、也是期末考试<strong>计算题、大题和核心概念</strong>最密集的“心脏”地带！"
      },
      {
        "type": "p",
        "text": "对于零基础的同学来说，这章的各种表格和算法看起来像天书，但它的底层逻辑其实就是<strong>“如何用小书桌（内存）去处理整个图书馆（磁盘）的书”</strong>。"
      },
      {
        "type": "p",
        "text": "我已经把这几十页PPT的精华全部提炼出来了。请打起十二分精神，收好这份<strong>内部绝密速成提纲</strong>，我们直接冲刺满分！"
      },
      {
        "type": "hr"
      },
      {
        "type": "h1",
        "text": "🚀 操作系统期末冲刺绝密讲义：第八章 虚拟内存"
      },
      {
        "type": "h2",
        "text": "第一模块：揭开魔法的面纱——虚拟内存的核心概念 (必考名词解释/填空)"
      },
      {
        "type": "p",
        "text": "<strong>1. 什么是虚拟内存？</strong>"
      },
      {
        "type": "ul",
        "items": [
          "<strong>核心魔法</strong>：计算机的物理内存（实存）可能只有 8GB，但你却能同时跑几十个加起来需要几十GB的程序。为什么？因为操作系统只把程序<strong>当前正在使用的那几页</strong>（常驻集 Resident Set）放进主存，其余的都放在磁盘上。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>三大地址概念</strong>："
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>虚拟地址</strong>：程序里生成的地址（假地址）。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>实地址</strong>：内存中真实的物理地址。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>地址转换</strong>：所有虚拟地址在运行时都要被动态翻译成实地址。"
        ]
      },
      {
        "type": "p",
        "text": "<strong>2. 两个极端现象（重点考点）</strong>"
      },
      {
        "type": "ul",
        "items": [
          "<strong>👿</strong> <strong>系统抖动 (Thrashing)</strong>：如果你把太多程序塞进内存，导致每个程序分到的内存太少，系统就会疯狂地在磁盘和内存之间来回搬运数据，反而不干正事了（CPU利用率暴跌）。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>👼</strong> <strong>局部性原理 (Locality)</strong>：怎么避免抖动？靠这个原理！它指出程序在一段时间内，访问的代码和数据往往<strong>聚集在一小块区域</strong>。所以操作系统可以大胆猜测未来需要哪些页，提前准备好，不用频繁搬运。"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第二模块：底层的硬件护法——页表与 TLB (高频选择/简答题)"
      },
      {
        "type": "p",
        "text": "虚拟内存要起作用，必须靠强大的数据结构和硬件来快速完成“地址翻译”。"
      },
      {
        "type": "p",
        "text": "<strong>1. 页表太大了怎么办？（两招破解）</strong>"
      },
      {
        "type": "p",
        "text": "每个进程都有自己的页表。如果地址空间极大，页表自己就会占满内存。"
      },
      {
        "type": "ul",
        "items": [
          "<strong>多级页表</strong>：就像书的目录。用一个“根页表”指向“用户页表”，把庞大的单层目录变成多层，不需要的时候只把根目录放进内存。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>倒排页表 (Inverted Page Table)</strong>：不管你有多少进程，这个表的大小只和<strong>物理内存的页框数</strong>有关。它用哈希函数来查找，极大地节省了空间（用于 PowerPC 等架构）。"
        ]
      },
      {
        "type": "p",
        "text": "<strong>2.</strong> <strong>🌟</strong> <strong>终极考点：转换检测缓冲区 (TLB) —— 地址翻译的“作弊小抄”</strong>"
      },
      {
        "type": "ul",
        "items": [
          "<strong>痛点</strong>：因为页表也放在内存里，所以每次访问数据，CPU 都要访问<strong>两次内存</strong>（一次查页表，一次取数据），速度直接慢一半。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>解法 (TLB)</strong>：在 CPU 里搞一个硬件缓存（TLB），专门存放<strong>最近查过的页表项</strong>。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>运行逻辑（必考流程）</strong>：CPU 拿到虚拟地址，先去 TLB 里找。如果<strong>命中 (TLB Hit)</strong>，直接算出物理地址取数据；如果<strong>未命中 (TLB Miss)</strong>，再去内存里查慢速的页表，查完顺便把新条目更新到 TLB 里。"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第三模块：内存管理的“大管家”——四大策略 (大题/计算题重灾区)"
      },
      {
        "type": "p",
        "text": "这部分是期末考试的绝对核心！操作系统如何管理这方寸之地的内存？一共有四大策略："
      },
      {
        "type": "h3",
        "text": "读取策略 (Fetch) —— 什么时候把书拿上桌？"
      },
      {
        "type": "ul",
        "items": [
          "<strong>请求分页</strong>：不见兔子不撒鹰，只有缺页报错了，才去磁盘把这页读进来（刚启动时缺页极多，后面靠局部性原理变少）。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>预先分页</strong>：一次性连带把周围的好几页全读进来（利用磁盘连续读取快的特性）。"
        ]
      },
      {
        "type": "h3",
        "text": "🌟 置换策略 (Replacement) —— 书桌满了，扔哪本？（必考推演题）"
      },
      {
        "type": "p",
        "text": "当发生缺页，但内存已满时，必须踢掉一页。"
      },
      {
        "type": "ul",
        "items": [
          "<strong>OPT (最佳策略)</strong>：预知未来，踢掉<strong>将来最长时间内不会被用到的页</strong>。性能无敌，但无法实现，仅做对比标准。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>LRU (最近最少使用)</strong>：踢掉<strong>最久没有被访问</strong>的那一页。性能最接近 OPT，但每次访问都要记录时间，开销太大。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>FIFO (先进先出)</strong>：最简单，谁先来就先踢谁。<strong>缺点</strong>：经常用的核心代码可能也会被盲目踢掉。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>Clock (时钟策略)</strong>：给每个页加一个“使用位(u)”。指针像钟表一样转，遇到 u=1 就变成 u=0 并跳过，遇到 u=0 直接踢掉！这是<strong>性能和开销的最佳平衡</strong>。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>(升级版)</strong> <strong>改进的时钟策略</strong>：不仅看“使用位(u)”，还看“修改位(m)”。优先踢掉 <code>(u=0, m=0)</code> 的页（既没用过也没改过），这样连写回磁盘的时间都省了！找页的顺序极其严格，考前必须手推一遍！"
        ]
      },
      {
        "type": "h3",
        "text": "驻留集管理 (Resident Set) —— 给每个人分多大地盘？"
      },
      {
        "type": "ul",
        "items": [
          "<strong>分配方式</strong>：<strong>固定分配</strong>（一开始说好给几页就给几页） vs <strong>可变分配</strong>（根据程序运行情况动态调整）。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>置换范围</strong>：<strong>局部置换</strong>（只能踢自己进程的页） vs <strong>全局置换</strong>（可以抢其他进程的空闲页）。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>(高阶考点)</strong> <strong>工作集 (Working Set, W(t, Δ))</strong>：利用过去 Δ 窗口内的访问记录来预测未来需要多少页。"
        ]
      },
      {
        "type": "h3",
        "text": "清除与加载控制 (Load Control) —— 宏观调控"
      },
      {
        "type": "ul",
        "items": [
          "<strong>页缓冲</strong>：被踢掉的页不直接消失，而是放入“空闲链表”或“修改链表”缓存一下。万一马上又要用，瞬间就能找回，极大弥补了 FIFO 算法的缺陷。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>多道程序设计级别</strong>：程序太少，CPU闲置；程序太多，系统抖动。需要挂起进程时，系统一般挑“优先级最低的”、“缺页的”或“占地儿最大的”进程开刀。"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第四模块：大厂怎么做？—— Linux 与 Windows 的实战应用 (选择题/连线题)"
      },
      {
        "type": "p",
        "text": "这部分考得很细，直接背核心特征："
      },
      {
        "type": "ul",
        "items": [
          "<strong>Linux 系统</strong>："
        ]
      },
      {
        "type": "ul",
        "items": [
          "采用<strong>三级页表结构</strong>：页目录、页中间目录、页表。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>内核内存分配</strong>：因为内核经常需要分配极其微小的内存块，普通的按页分配太浪费，Linux 采用了<strong>懒惰伙伴系统 (Lazy Buddy System)</strong>，推迟合并，极大提高了小块内存分配效率。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>Windows 系统</strong>："
        ]
      },
      {
        "type": "ul",
        "items": [
          "32位系统下，把 4GB 空间一分为二，<strong>2GB给用户，2GB给操作系统</strong>。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "页的三种状态：<strong>可用、保留、提交</strong>。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "驻留集策略：使用<strong>可变分配、局部范围</strong>的策略（给每个进程配个工作集来动态调整）。"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "p",
        "text": "<strong>讲师寄语：</strong>"
      },
      {
        "type": "p",
        "text": "好了同学们！第八章虽然硬核，但考点非常清晰。"
      },
      {
        "type": "p",
        "text": "如果考<strong>简答题</strong>，大概率考：<strong>TLB 的作用和原理</strong>、<strong>局部性原理</strong>、<strong>什么是系统抖动</strong>。"
      },
      {
        "type": "p",
        "text": "如果考<strong>大题（15-20分）</strong>，<strong>绝对是页面置换算法（LRU、FIFO、Clock）的推演计算</strong>！你必须会在试卷上画那个框框，算出发生了多少次缺页中断。"
      },
      {
        "type": "p",
        "text": "你可以随时回复我，如果需要，我们马上针对历年期中/期末考卷里最刁钻的<strong>页面置换计算题</strong>，或者<strong>工作集的 Δ 窗口题</strong>进行手把手拆解练习！需要从哪一种题型开始冲刺？"
      },
      {
        "type": "p",
        "text": "同学们好！欢迎来到《操作系统》期末冲刺提分班！我是你们的讲师。"
      },
      {
        "type": "p",
        "text": "如果说前面的章节是在搭建操作系统的舞台，那么今天我们要拿下的<strong>第九章《单处理器调度》</strong>，就是舞台上最核心的“导演”。这章是一座巨大的<strong>“大题/计算题金矿”</strong>！考试中一定会让你根据几个进程的到达时间、服务时间，去画甘特图、算周转时间。"
      },
      {
        "type": "p",
        "text": "零基础不要怕，我已经把这份极其硬核的PPT嚼碎了，为你浓缩成了下面这份<strong>内部绝密速成提纲</strong>。抓紧扶手，我们要开始冲刺了！"
      },
      {
        "type": "hr"
      },
      {
        "type": "h1",
        "text": "🚀 操作系统期末冲刺讲义：第九章 单处理器调度"
      },
      {
        "type": "h2",
        "text": "第一模块：调度家族的“三兄弟” (必考选择/填空)"
      },
      {
        "type": "p",
        "text": "操作系统的调度不是一步到位的，它按时间长短分为三个阶段。你必须分清它们各自的任务："
      },
      {
        "type": "p",
        "text": "1. <strong>长程调度 (Long-term scheduling) —— “守门员”</strong>"
      },
      {
        "type": "ul",
        "items": [
          "<strong>核心任务</strong>：决定把哪些作业放进系统变成进程，控制系统的<strong>并发度</strong>（内存里到底装多少个进程）。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>特点</strong>：如果放进来的进程太多，每个进程分到的CPU时间就少。"
        ]
      },
      {
        "type": "p",
        "text": "2. <strong>中程调度 (Medium-term scheduling) —— “搬运工”</strong>"
      },
      {
        "type": "ul",
        "items": [
          "<strong>核心任务</strong>：也就是我们常说的<strong>交换 (Swapping)</strong>。决定把谁换入内存、把谁换出到磁盘挂起。"
        ]
      },
      {
        "type": "p",
        "text": "3. <strong>短程调度 (Short-term scheduling) —— “分配器 (Dispatcher)”</strong>"
      },
      {
        "type": "ul",
        "items": [
          "<strong>核心任务</strong>：决定<strong>下一次由哪个就绪进程来执行</strong>。这是执行<strong>最频繁</strong>的调度。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>触发时机（考点）</strong>：当时钟中断、I/O中断、操作系统调用或信号发生时，短程调度程序就会跳出来干活。"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第二模块：评判调度的“KPI”与“两把基本刷子” (简答/概念辨析)"
      },
      {
        "type": "p",
        "text": "在学习具体算法前，先搞懂规则："
      },
      {
        "type": "h3",
        "text": "调度的 KPI 评判指标"
      },
      {
        "type": "ul",
        "items": [
          "<strong>面向用户</strong>：最核心的是 <strong>周转时间 (Turnaround time)</strong>（从提交到完成的总时间，包含等待和执行时间）和 <strong>响应时间 (Response time)</strong>（交互式系统中，从提交到第一次给出响应的时间）。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>面向系统</strong>：最核心的是 <strong>吞吐量 (Throughput)</strong>（单位时间完成的进程数）和 <strong>处理器利用率</strong>。"
        ]
      },
      {
        "type": "h3",
        "text": "两把基本刷子：非抢占 vs 抢占 (Decision Mode)"
      },
      {
        "type": "p",
        "text": "这是所有调度算法的底层基因，考试选择题必考："
      },
      {
        "type": "ul",
        "items": [
          "<strong>非抢占 (Non-preemptive)</strong>：一旦进程开始跑，除非它自己运行完毕或请求I/O被阻塞，否则<strong>绝对不会被打断</strong>。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>抢占 (Preemptive)</strong>：当前运行的进程可能随时被操作系统强行中断（比如时间片到了，或者来了个更高优先级的进程），把它扔回就绪队列。"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第三模块：👑 六大核心调度算法 (本章终极大Boss：必考计算大题)"
      },
      {
        "type": "p",
        "text": "这一部分请竖起耳朵，期末必考<strong>填表和画调度图</strong>。我们假定：$w$=已等待时间，$e$=已执行时间，$s$=需要的总服务时间。"
      },
      {
        "type": "h3",
        "text": "先来先服务 (FCFS - First-Come-First-Served)"
      },
      {
        "type": "ul",
        "items": [
          "<strong>原理</strong>：谁先排队谁先上（选择在队列中停留时间最长的，$max[w]$）。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>特点</strong>：<strong>非抢占式</strong>。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>致命缺点</strong>：对短进程极度不友好。一个短进程排在一个长进程后面，会等得望眼欲穿。同时它<strong>严重惩罚了I/O密集型进程</strong>。"
        ]
      },
      {
        "type": "h3",
        "text": "轮转 (RR - Round Robin)"
      },
      {
        "type": "ul",
        "items": [
          "<strong>原理</strong>：基于时钟中断的<strong>抢占式</strong>算法。大家排好队，每个人只允许跑一个“时间片 (Quantum)”。时间到了就强行踢回队尾。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>避坑考点</strong>：<strong>时间片的大小极其关键</strong>。时间片太短会导致频繁切换，开销极大；时间片太长就会退化成FCFS。一般建议时间片要<strong>略大于一次典型交互的时间</strong>。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>进阶版：虚拟轮转法 (VRR)</strong>：为了解决传统RR对I/O密集型进程不公平的问题，VRR 引入了一个<strong>辅助队列</strong>。从I/O阻塞中恢复的进程放进辅助队列，优先被调度，补偿它们之前没用完的时间片。"
        ]
      },
      {
        "type": "h3",
        "text": "最短进程优先 (SPN - Shortest Process Next)"
      },
      {
        "type": "ul",
        "items": [
          "<strong>原理</strong>：<strong>非抢占式</strong>。谁需要的服务时间最短（$min[s]$），就让谁插队先跑。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>致命缺点</strong>：虽然极大改善了整体周转时间，但是长进程面临<strong>饥饿 (Starvation)</strong> 的风险，可能永远轮不到它。而且操作系统很难事先知道一个进程到底需要跑多久。"
        ]
      },
      {
        "type": "h3",
        "text": "最短剩余时间 (SRT - Shortest Remaining Time)"
      },
      {
        "type": "ul",
        "items": [
          "<strong>原理</strong>：<strong>SPN 的抢占版</strong>。如果新来了一个进程，它需要的总时间，比当前正在跑的进程的“剩余时间 ($s-e$)”还要短，就立刻抢占CPU。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>特点</strong>：周转时间比SPN更优，但长进程依然会饥饿。"
        ]
      },
      {
        "type": "h3",
        "text": "最高响应比优先 (HRRN - Highest Response Ratio Next) —— “养老尊贤”"
      },
      {
        "type": "ul",
        "items": [
          "<strong>原理</strong>：<strong>非抢占式</strong>。每次调度时，计算每个进程的响应比：<strong>$Ratio = (w + s) / s$</strong>（等待时间+服务时间，除以服务时间），选最大的。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>精妙之处（简答题常客）</strong>：它完美结合了FCFS和SPN的优点。短作业的 $s$ 小，初始 Ratio 高，容易被选中；而长作业虽然 $s$ 大，但随着它等的时间 $w$ 越来越长，它的 Ratio 也会不断增加（<strong>年龄老化机制</strong>），最终一定会被选中，<strong>彻底解决了饥饿问题</strong>！"
        ]
      },
      {
        "type": "h3",
        "text": "反馈调度 (Feedback) —— “动态降级”"
      },
      {
        "type": "ul",
        "items": [
          "<strong>原理</strong>：<strong>抢占式</strong>，多级队列机制。系统根本不需要提前知道进程需要跑多久。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>玩法</strong>：新来的进程进最高优先级队列（例如RQ0）。如果在它的时间片内没跑完，就被“惩罚”<strong>降级</strong>，掉入下一个低优先级队列（RQ1...RQn）。越是长作业，最后掉得越深，在底层队列里使用轮转调度。"
        ]
      },
      {
        "type": "p",
        "text": "<strong>(注：以上六大算法的对比总结表在讲义第7页，考试前一定要在脑子里默写一遍！)</strong>"
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第四模块：其他现代调度机制 (填空/连线题)"
      },
      {
        "type": "p",
        "text": "1. <strong>公平共享调度 (Fair-Share Scheduling)</strong>"
      },
      {
        "type": "ul",
        "items": [
          "<strong>核心思想</strong>：不以“进程”为单位分配，而是以“用户”或“用户组”为单位进行份额分配。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>公式逻辑</strong>：如果一个组占用的CPU超出了它的公平份额，这个组里所有进程的优先级就会被降低。"
        ]
      },
      {
        "type": "p",
        "text": "2. <strong>传统 UNIX 调度</strong>"
      },
      {
        "type": "ul",
        "items": [
          "<strong>机制</strong>：主要针对分时交互环境，采用多级反馈队列+轮转法（1秒抢占）。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>优先级顺序（必背排序）</strong>：优先级从高到低依次为：<strong>交换程序 &gt; 块I/O设备控制 &gt; 文件操作 &gt; 字符I/O设备控制 &gt; 用户进程</strong>。系统非常偏爱I/O操作，以求快速响应。"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "p",
        "text": "<strong>🎓</strong> <strong>讲师寄语：</strong>"
      },
      {
        "type": "p",
        "text": "同学们，第九章最硬核的不是背书，而是<strong>实操计算</strong>。请务必记住 <code>FCFS</code>、<code>RR</code>、<code>SPN</code>、<code>SRT</code>、<code>HRRN</code> 这几个英文缩写代表什么，以及它们谁是抢占式的、谁会饥饿（SPN和SRT会，HRRN不会）。"
      },
      {
        "type": "p",
        "text": "<strong>课后行动指南</strong>：PPT最后布置了三道必做作业：<strong>9.2, 9.3, 9.16</strong> 。这类题目通常是给你一张类似讲义里“到达时间、服务时间”的表格，让你算每个算法的周转时间。这正是期末卷子上的压轴大题！"
      },
      {
        "type": "p",
        "text": "如果你对上面哪个算法（比如最容易搞混的最高响应比 HRRN 或 反馈队列 Feedback）的时序推演还有疑惑，或者需要我带你手把手做一道计算真题，请随时告诉我，我们直接在题盘上见真章！"
      },
      {
        "type": "p",
        "text": "同学们好！欢迎再次来到《操作系统》期末冲刺提分班！我是你们的讲师。"
      },
      {
        "type": "p",
        "text": "今天我们要一举拿下<strong>第十章《多处理器和实时调度》</strong>。如果说之前的单核CPU调度是“一个人怎么规划时间”，那这一章就是<strong>“一个团队怎么分工（多处理器）”</strong>以及<strong>“遇到十万火急的死命令怎么抢救（实时调度）”</strong>。"
      },
      {
        "type": "p",
        "text": "这章在期末考试中极爱出<strong>名词解释（如优先级反转）和特征对比选择题</strong>。不要怕，我同样为你把这份PPT浓缩成了下面这份<strong>内部绝密速成提纲</strong>，全是干货，请抓紧扶好！"
      },
      {
        "type": "hr"
      },
      {
        "type": "h1",
        "text": "🚀 操作系统期末冲刺绝密讲义：第十章 多处理器与实时调度"
      },
      {
        "type": "h2",
        "text": "第一模块：多处理器调度 —— “多核团队怎么干活？”"
      },
      {
        "type": "p",
        "text": "这一部分重点考察不同粒度的概念和线程的分配策略。"
      },
      {
        "type": "p",
        "text": "<strong>1. 并行性的“五大粒度” (常考选择填空)</strong>"
      },
      {
        "type": "p",
        "text": "这就好比工作的拆分精细度："
      },
      {
        "type": "ul",
        "items": [
          "<strong>细粒度</strong>（&lt;20条指令）：极短的代码级并行，极其复杂。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>中粒度</strong>（20-200条指令）：单应用程序内的多线程交互。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>粗粒度</strong>（200-2000条指令）：单核里多道程序的并发。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>极粗粒度</strong>（2000-1M条指令）：分布式网络节点运算。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>无约束</strong>：各个进程之间毫无瓜葛（比如分时系统里你打字、我听歌）。"
        ]
      },
      {
        "type": "p",
        "text": "<strong>2. 处理器分配的两大阵营 (对比题)</strong>"
      },
      {
        "type": "p",
        "text": "把任务分给CPU，谁说了算？"
      },
      {
        "type": "ul",
        "items": [
          "<strong>主从架构 (Master/Slave)</strong>：一个CPU当“包工头（主）”管调度，其他CPU当“打工人（从）”干活。<strong>缺点</strong>是包工头一旦挂了，全盘崩溃，且容易成为性能瓶颈。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>对等架构 (Peer)</strong>：没有阶级，所有CPU自己去任务池里抢活干。<strong>缺点</strong>是操作系统设计极其复杂，得防止两个CPU抢到同一个任务。"
        ]
      },
      {
        "type": "p",
        "text": "<strong>3.</strong> <strong>🌟</strong> <strong>核心考点：多处理器线程调度的四大绝招</strong>"
      },
      {
        "type": "p",
        "text": "这是大题/简答题的高频区，必须记住它们的名字和特点："
      },
      {
        "type": "ul",
        "items": [
          "<strong>负载分配 (Load Sharing)</strong>：最简单常用。所有CPU共用一个全局任务队列（像银行排号排一队）。<strong>缺点</strong>是全局队列容易成瓶颈，且缓存命中率低（因为线程可能在不同CPU上横跳）。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>组调度 (Gang Scheduling)</strong>：<strong>“打团战”模式</strong>。同一个程序的所有线程被<strong>同时</strong>调度到不同的处理器上一起运行。这样可以极大减少线程间互相等待的阻塞时间。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>专用处理器分配 (Dedicated Processor)</strong>：<strong>“VIP包房”模式</strong>。一个程序运行期间，分给它的CPU就一直死死绑定给它，哪怕线程在等I/O，CPU也宁可闲着。适用于有成百上千个CPU的土豪系统，省去了进程切换的开销。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>动态调度 (Dynamic Scheduling)</strong>：OS负责分CPU，应用程序自己根据情况动态增减线程数量，极其灵活。"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第二模块：实时调度 —— “十万火急的任务怎么插队？”"
      },
      {
        "type": "p",
        "text": "实时系统（如航天器、工厂控制）不仅要求结果算得对，更要求<strong>“按时交卷”</strong>。晚一秒可能就是机毁人亡！"
      },
      {
        "type": "p",
        "text": "<strong>1. 两大任务类型 (基础概念)</strong>"
      },
      {
        "type": "ul",
        "items": [
          "<strong>硬实时 (Hard real-time)</strong>：<strong>绝对不能迟到</strong>，迟到系统就彻底崩溃或引发灾难（比如汽车安全气囊）。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>软实时 (Soft real-time)</strong>：有最后期限，最好能按时做完，<strong>迟到了也没关系</strong>，只是体验差一点（比如视频直播卡顿）。"
        ]
      },
      {
        "type": "p",
        "text": "<strong>2. 实时OS的“五大修养” (简答题背诵)</strong>"
      },
      {
        "type": "p",
        "text": "什么样的系统才配叫实时操作系统？"
      },
      {
        "type": "ul",
        "items": [
          "<strong>可确定性</strong>：响应中断的时间是固定可预期的。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>可响应性</strong>：能光速处理中断并开始执行服务代码（从高优先级中断到开始服务通常只要几十到几百毫秒）。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>用户控制</strong>：允许用户自己定“谁是硬实时，谁是软实时”，权限给够。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>可靠性</strong>：死机就是灾难，必须稳如老狗。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>故障弱化操作</strong>：如果实在干不完了，系统必须优先保全最重要的任务，丢车保帅。"
        ]
      },
      {
        "type": "p",
        "text": "<strong>3. 实时调度的四种流派 (连线题)</strong>"
      },
      {
        "type": "ul",
        "items": [
          "<strong>静态表调度</strong>：运行前就安排好死板的时间表（适合周期性任务）。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>静态优先级抢占</strong>：事先排好VIP等级，高级来了直接抢占低级（如速率单调算法）。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>基于动态规划</strong>：任务来了临时算一下能不能排得开。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>动态尽力而为</strong>：不废话直接干，干不完就直接杀掉进程（最容易实现）。"
        ]
      },
      {
        "type": "p",
        "text": "<strong>4.</strong> <strong>🌟</strong> <strong>速率单调算法 (RMS)</strong>"
      },
      {
        "type": "p",
        "text": "这是一个具体的静态优先级算法：<strong>任务的周期越短，执行频率越高，优先级就越高</strong>。"
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第三模块：🔥 终极Boss —— 优先级反转 (期末必考大题)"
      },
      {
        "type": "p",
        "text": "如果这张卷子只考一道大题，大概率就是它！"
      },
      {
        "type": "p",
        "text": "<strong>1. 什么是优先级反转 (Priority Inversion)？</strong>"
      },
      {
        "type": "ul",
        "items": [
          "<strong>故事背景（火星探路者号故障）</strong>：高优先级任务 T1 和低优先级任务 T3 要共享一个临界资源（比如一块内存）。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>灾难发生</strong>：T3 先拿到了资源锁。T1 来了，发现资源被锁，只能等待。结果，一个中等优先级任务 T2 跑出来<strong>抢占了 T3</strong>。这就导致：中等优先级 T2 在爽，低优先级 T3 被挂起锁着资源，高优先级 T1 被迫干瞪眼死等！这就叫<strong>无界优先级反转</strong>。"
        ]
      },
      {
        "type": "p",
        "text": "<strong>2. 两大破解之法 (核心解法)</strong>"
      },
      {
        "type": "ul",
        "items": [
          "<strong>优先级继承 (Priority Inheritance)</strong>：T1 发现自己被 T3 堵住了，就<strong>临时把自己的高优先级借给（继承）T3</strong>，让 T3 赶紧跑完释放资源。T3 跑完后，优先级打回原形，T1 拿到资源继续跑。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>优先级置顶 (Priority Ceiling)</strong>：提前规定好，这块共享资源的优先级，比所有可能会用它的任务的优先级<strong>还要高一级</strong>。谁拿到这个资源，优先级瞬间飙升到顶点，直到用完才恢复。"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第四模块：实战演练 —— 三大操作系统的调度对比 (填空/选择)"
      },
      {
        "type": "p",
        "text": "不用死记硬背代码，只需要记住它们的<strong>优先级设定</strong>区别："
      },
      {
        "type": "ul",
        "items": [
          "<strong>Linux (O(1) 调度程序)</strong>："
        ]
      },
      {
        "type": "ul",
        "items": [
          "采用 <strong>活动队列 + 过期队列</strong> 两个位图交替工作，时间片用完就扔到过期队列，活动队列空了就直接指针互换。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "优先级：数字<strong>越小越高</strong>！0-99是实时任务，100-139是普通任务。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>UNIX SVR4</strong>："
        ]
      },
      {
        "type": "ul",
        "items": [
          "引入了160个优先级，分三个阶级（不可逾越）。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>实时 (159-100)</strong> &gt; <strong>内核 (99-60)</strong> &gt; <strong>分时/用户 (59-0)</strong>。数字越大越高！"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>Windows</strong>："
        ]
      },
      {
        "type": "ul",
        "items": [
          "32个优先级。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>实时类 (16-31)</strong> &gt; <strong>可变类 (0-15)</strong>。"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "p",
        "text": "<strong>讲师寄语：</strong>"
      },
      {
        "type": "p",
        "text": "第十章的复习重点非常明确！你只要把 <strong>“四大线程调度（特别是组调度和负载分配）”</strong> 、 <strong>“硬实时与软实时的区别”</strong> 以及重中之重的 <strong>“优先级反转的成因与解决（继承/置顶）”</strong> 掌握透彻，这章的分数就稳如泰山了！"
      },
      {
        "type": "p",
        "text": "这份速成提纲是不是让你感觉轻松了很多？你需要我把<strong>火星探路者（优先级反转）</strong>的过程，用推演题的形式带你再走一遍吗？"
      },
      {
        "type": "p",
        "text": "同学们好！欢迎回到《操作系统》期末冲刺提分班！我是你们的讲师。"
      },
      {
        "type": "p",
        "text": "今天我们要一举拿下的是绝对的“拿分大户”——<strong>第11章《I/O管理和磁盘调度》</strong>！"
      },
      {
        "type": "p",
        "text": "如果说前面的章节是讲CPU和内存怎么在“内宫”里宫斗，那这一章讲的就是系统怎么和外设（磁盘、打印机、键盘）这些“外臣”打交道。对于零基础的同学，不要怕，这一章的实战性极强，特别是<strong>磁盘调度算法</strong>和<strong>RAID（磁盘阵列）</strong>，几乎是每年期末考试必考的大题！"
      },
      {
        "type": "p",
        "text": "我已经把这几十页的PPT浓缩成了下面这份<strong>内部绝密速成提纲</strong>。抓紧时间，我们直接发车拿分！"
      },
      {
        "type": "hr"
      },
      {
        "type": "h1",
        "text": "🚀 操作系统期末冲刺讲义：第11章 I/O管理和磁盘调度"
      },
      {
        "type": "h2",
        "text": "第一模块：I/O控制的三大绝招与“神级外包” DMA (必考选择/简答)"
      },
      {
        "type": "p",
        "text": "外设种类繁多，速度差异极大（键盘极慢，网络极快）。为了让飞快的CPU不被慢吞吞的外设拖后腿，I/O控制技术经历了三次进化："
      },
      {
        "type": "p",
        "text": "1. <strong>程序控制I/O</strong>：CPU亲自盯着设备，一直死等（忙等待），极度浪费CPU时间。"
      },
      {
        "type": "p",
        "text": "2. <strong>中断驱动I/O</strong>：CPU下达命令后去干别的，设备干完活发个“中断（短信）”通知CPU。"
      },
      {
        "type": "p",
        "text": "3. <strong>🌟</strong> <strong>终极考点：DMA（直接存储器访问）</strong>"
      },
      {
        "type": "ul",
        "items": [
          "<strong>打个比方</strong>：CPU是大老板，DMA就是“专门负责搬砖的外包队长”。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>核心逻辑</strong>：CPU只需要在<strong>开始和结束时</strong>介入。CPU把要读写的地址和字数告诉DMA，DMA就直接控制内存和设备之间的数据传输，完全不需要CPU插手。传完之后，DMA再给CPU发个中断报告“活干完了”。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>考试避坑</strong>：DMA不是不需要CPU，而是把CPU的干预降到了最低！"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第二模块：缓冲技术 (Buffering) —— 操作系统的“蓄水池”"
      },
      {
        "type": "p",
        "text": "为什么需要缓冲？因为I/O速度跟不上处理器，不能让进程干等。"
      },
      {
        "type": "p",
        "text": "考试常考缓冲分类及其特性："
      },
      {
        "type": "ul",
        "items": [
          "<strong>设备分类</strong>："
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>面向块（Block）</strong>：数据一块一块传（如磁盘、U盘）。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>面向流（Stream）</strong>：数据一字节一字节传，没结构（如打印机、终端键盘）。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>缓冲方案对比</strong>："
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>单缓冲 (Single Buffering)</strong>：系统分出一个缓冲区，设备一边往里写，进程一边从里读。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>双缓冲 (Double Buffering)</strong>：又叫<strong>缓冲交换</strong>。设两个蓄水池，设备装满A池时，进程可以去喝B池的水，完美交替。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>循环缓冲 (Circular Buffering)</strong>：两个以上缓冲区首尾相连，专门应对I/O需求爆发的场景。"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第三模块：磁盘调度算法 (💥 绝对重点！必考大题推演)"
      },
      {
        "type": "p",
        "text": "这就是期末考试绝对会出的一道10-15分大题！系统有一堆读写磁道的请求，先去哪个后去哪个，决定了磁盘的生死存亡。"
      },
      {
        "type": "p",
        "text": "<strong>1. 磁盘时间的“三剑客”</strong>"
      },
      {
        "type": "ul",
        "items": [
          "<strong>寻道时间 (Seek Time)</strong>：磁头移动到正确<strong>磁道</strong>的时间。（这个最耗时，是所有算法优化的唯一目标！）"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>旋转延迟 (Rotational Delay)</strong>：等磁盘转到正确<strong>扇区</strong>的时间。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>传输时间 (Transfer Time)</strong>：真正读写数据的时间。"
        ]
      },
      {
        "type": "p",
        "text": "<strong>2. 必背五大调度算法</strong>"
      },
      {
        "type": "p",
        "text": "假设磁头现在在100道，请求队列是：55, 58, 39..."
      },
      {
        "type": "ul",
        "items": [
          "<strong>FIFO (先进先出)</strong>：谁先来先服务谁。最公平，但磁头可能满天飞，性能极差。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>SSTF (最短服务时间优先)</strong>：<strong>永远找离当前磁头最近的</strong>磁道。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>缺点</strong>：会导致“饥饿”，边缘的磁道永远等不到磁头。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>🌟</strong> <strong>SCAN (扫描算法 / 电梯算法)</strong>：<strong>必考！</strong>"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>逻辑</strong>：就像电梯，先一直往一个方向走（比如朝大数走），把路上的请求全扫完，<strong>碰壁后（到底了）再掉头</strong>往回扫。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>优点</strong>：比SSTF公平，防止了饥饿。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>C-SCAN (循环扫描)</strong>：电梯只在一楼接人上楼。扫到顶后，<strong>直接飞速空车返回底部</strong>，再从底向上扫，让两端的等待时间更均匀。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>N-step-SCAN &amp; FSCAN</strong>：为了防止磁头在某个磁道“粘住”（不断有新请求落在当前磁道），把队列分成子队列，扫描时新来的请求只能进下一个队列排队。"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第四模块：RAID 磁盘阵列 (选择/填空重灾区)"
      },
      {
        "type": "p",
        "text": "RAID（独立磁盘冗余阵列）的核心思想是：<strong>“鸡蛋不要放在一个篮子里”</strong>。用多块便宜的磁盘组合起来，速度快又防崩溃。"
      },
      {
        "type": "p",
        "text": "你必须记住以下几个级别的核心特征："
      },
      {
        "type": "ul",
        "items": [
          "<strong>RAID 0 (条带化, 无冗余)</strong>：不考虑安全，纯追求速度。数据拆分存在不同盘上，一旦坏一块盘，数据全毁。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>RAID 1 (镜像)</strong>：最土豪最安全。数据写两份（复制粘贴），坏了一块还有备份。成本最高（100%冗余）。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>RAID 2 / 3 / 4</strong>：通过不同方式（如汉明码、奇偶校验盘）做恢复。缺点是如果只用一个盘做校验，那个校验盘会成为性能瓶颈。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>🌟</strong> <strong>RAID 5 (块级分布式奇偶校验)</strong>：<strong>企业最常用！必考！</strong> 它把校验位<strong>均匀分散</strong>在所有盘上，避免了RAID 4的校验盘瓶颈。坏任意一块盘都能通过其他盘算出来恢复。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>RAID 6 (双重冗余)</strong>：有两个不同的校验块，牛逼在<strong>允许同时坏两块盘</strong>！代价是写入速度慢（有写损失）。"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第五模块：磁盘缓存与置换策略 (概念辨析)"
      },
      {
        "type": "p",
        "text": "为了少读磁盘，我们在主存里划一块区域当“磁盘高速缓存(Disk Cache)”。缓存满了怎么踢人？"
      },
      {
        "type": "ul",
        "items": [
          "<strong>LRU (最近最少使用)</strong>：把最久没被访问的块踢出去，用堆栈实现。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>LFU (最不常使用)</strong>：谁被访问的次数最少踢谁。缺点是容易被短时间内的集中访问“欺骗”。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>基于频率的置换 (Frequency-Based Replacement)</strong>：把堆栈分成“新、中、老”三区。在“新区”里的访问不增加计数器，只有跑到“老区”且计数最小的才会被踢。完美结合了LRU和LFU的优点。"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第六模块：Linux 和 Windows 的 I/O 绝活 (常识连线题)"
      },
      {
        "type": "ul",
        "items": [
          "<strong>Linux I/O 调度器</strong>："
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>Linus电梯</strong>：基本排序合并请求。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>最后期限调度 (Deadline)</strong>：加了3个队列，加上了过期时间，防止请求饿死。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>预期调度 (Anticipatory)</strong>：<strong>很聪明的一招！</strong> 读完一个扇区后，磁头<strong>故意停下来等几毫秒</strong>，赌下一个请求就在旁边（因为程序的局部性），极大提高了性能。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>Windows I/O</strong>："
        ]
      },
      {
        "type": "ul",
        "items": [
          "提供<strong>异步I/O</strong>（发起请求后不阻塞继续运行）和<strong>同步I/O</strong>（死等）两种模式。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "提供多达5种完成信号技术（如信号通知、异步过程调用APC、I/O完成端口等）。"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "p",
        "text": "<strong>讲师寄语：</strong>"
      },
      {
        "type": "p",
        "text": "第11章的核心得分点极其明确！你现在需要闭上眼睛问自己三个问题："
      },
      {
        "type": "p",
        "text": "1. <strong>DMA到底是干嘛的？</strong>（代替CPU搬砖）"
      },
      {
        "type": "p",
        "text": "2. <strong>电梯算法（SCAN）的运行轨迹是什么样的？</strong>（一路走到黑再掉头）"
      },
      {
        "type": "p",
        "text": "3. <strong>RAID 0, RAID 1, RAID 5 的区别是什么？</strong>（0最快无备份，1备份最贵，5均分校验最常用）。"
      },
      {
        "type": "p",
        "text": "把这三个大点吃透，这章考试80%的分数就已经稳稳落入你的口袋了！需要我给你出道<strong>磁盘调度</strong>的往年真题咱们现场推演一下吗？"
      },
      {
        "type": "p",
        "text": "同学们好！欢迎来到《操作系统》期末冲刺提分班！我是你们的讲师。"
      },
      {
        "type": "p",
        "text": "今天我们要拿下的是<strong>第十二章《文件管理》</strong>。这也是我们这门课中非常贴近大家日常使用体验的一章——毕竟大家每天都在电脑上建文件夹、存文件。对于零基础的同学，不要被底层的术语吓倒。这一章的考试套路非常固定，主要是考<strong>“文件是怎么存放的”、“怎么分块的”以及“空闲空间怎么管理”</strong>的优缺点对比。"
      },
      {
        "type": "p",
        "text": "我已经把 PPT 里的知识点给你们“抽筋剥骨”，整理成了这份<strong>内部绝密速成提纲</strong>。抓紧时间，我们直接上干货！"
      },
      {
        "type": "hr"
      },
      {
        "type": "h1",
        "text": "🚀 操作系统期末冲刺绝密讲义：第十二章 文件管理"
      },
      {
        "type": "h2",
        "text": "第一模块：基本概念与文件的“五大阵型” (名词解释/选择题区)"
      },
      {
        "type": "p",
        "text": "<strong>1. 数据的“套娃”层级</strong>"
      },
      {
        "type": "p",
        "text": "在文件系统中，数据是按照从小到大的层级组织的，考试常考这四个名词的递进关系："
      },
      {
        "type": "ul",
        "items": [
          "<strong>域 (Field)</strong>：数据的基本元素，包含单个值。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>记录 (Record)</strong>：一组相关域的集合，被视为一个单元。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>文件 (File)</strong>：相似记录的集合，作为单一实体对待，通过名称引用。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>数据库 (Database)</strong>：相关数据的收集，数据元素之间的关系明确。"
        ]
      },
      {
        "type": "p",
        "text": "<strong>2.</strong> <strong>🌟</strong> <strong>必考核心：五种常见的文件组织形式</strong>"
      },
      {
        "type": "p",
        "text": "考试极爱考它们各自的特点和应用场景（连线题/选择题必背）："
      },
      {
        "type": "ul",
        "items": [
          "<strong>堆 (Pile)</strong>：最简单的形式，数据按到达的顺序收集，没有任何结构，只能通过<strong>穷举搜索</strong>来找数据。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>顺序文件 (Sequential)</strong>：最常见，记录按“关键字”顺序存储，通常用于<strong>批量应用</strong>。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>索引顺序文件 (Indexed Sequential)</strong>：在顺序文件基础上加了<strong>索引和溢出文件</strong>，大大减少了查找时间。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>索引文件 (Indexed)</strong>：只能通过索引访问，包含详尽索引或部分索引；极其适合<strong>信息及时性至关重要的应用</strong>（如机票预订、库存控制）。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>直接或散列文件 (Hashed)</strong>：利用对键值的散列，直接访问已知地址的块；适用于需要<strong>非常快速的访问</strong>且一次只访问一条记录的场景（如目录、定价表）。"
        ]
      },
      {
        "type": "p",
        "text": "<strong>注：现代数据库的索引经常使用 B树 (B-Tree)，它的特点是平衡、宽且浅，搜索很快就能结束。</strong>"
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第二模块：记录怎么装箱？—— 记录组块 (简答题/对比题)"
      },
      {
        "type": "p",
        "text": "文件是由“记录”组成的，而磁盘 I/O 的读写单位是“块”。把记录塞进块里，有三种“装箱”策略："
      },
      {
        "type": "p",
        "text": "1. <strong>定长组块 (Fixed Blocking)</strong>：使用固定长度的记录，完整的记录全塞在一个块里。"
      },
      {
        "type": "ul",
        "items": [
          "<strong>致命考点</strong>：块的末尾会有装不满的空间，产生<strong>内部碎片</strong>。"
        ]
      },
      {
        "type": "p",
        "text": "2. <strong>变长跨越式组块 (Variable Blocking: Spanned)</strong>：记录紧缩在块中，不留空隙。如果一个记录太长，会<strong>跨越两个块</strong>，中间用指针连起来。"
      },
      {
        "type": "ul",
        "items": [
          "<strong>优点</strong>：存储利用率极高，不浪费空间。<strong>缺点</strong>：实现起来非常困难。"
        ]
      },
      {
        "type": "p",
        "text": "3. <strong>变长非跨越式组块 (Variable Blocking: Unspanned)</strong>：记录变长，但绝不跨块。"
      },
      {
        "type": "ul",
        "items": [
          "<strong>缺点</strong>：会导致大量浪费的空间（内部碎片），并限制了记录的最大长度。"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第三模块：地盘怎么分？—— 文件分配方法 (🌟 全章第一大重点)"
      },
      {
        "type": "p",
        "text": "文件要在磁盘上安家，操作系统怎么给它分地盘？这三种方法的优缺点对比是期末必考大题！"
      },
      {
        "type": "p",
        "text": "<strong>1. 连续分配 (Contiguous Allocation)</strong>"
      },
      {
        "type": "ul",
        "items": [
          "<strong>做法</strong>：创建文件时，给它分配一组<strong>连续的块</strong>。文件分配表（FAT）里只需记下<strong>起始块和长度</strong>。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>考点</strong>：对单个顺序文件来说性能最好，但会产生<strong>外部碎片</strong>，必须靠“紧缩”来解决。"
        ]
      },
      {
        "type": "p",
        "text": "<strong>2. 链式分配 (Chained Allocation)</strong>"
      },
      {
        "type": "ul",
        "items": [
          "<strong>做法</strong>：基于单个块分配，每个块里都藏着一个<strong>指向下一个块的指针</strong>。FAT 表同样只有一条记录。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>考点</strong>：完美解决了外部碎片问题，但<strong>局部性原理不再适用</strong>（磁头可能满磁盘乱跑），需要周期性合并。最适合顺序处理。"
        ]
      },
      {
        "type": "p",
        "text": "<strong>3. 索引分配 (Indexed Allocation)</strong>"
      },
      {
        "type": "ul",
        "items": [
          "<strong>做法</strong>：FAT 表为每个文件建一个<strong>单独的一级索引表</strong>。索引表里记录了文件占用的所有块的块号,。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>考点</strong>：它结合了前两者的优点，是极其重要的方法，Unix 系统就是用这种思路。"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第四模块：剩下的地盘怎么管？—— 空闲空间管理 (选择/填空)"
      },
      {
        "type": "p",
        "text": "分配完文件后，磁盘上剩下的空闲块怎么管？有四种方法："
      },
      {
        "type": "p",
        "text": "1. <strong>位表 (Bit Tables)</strong>：用一串 0 和 1 表示，每个位代表一个块（0表示空闲，1表示占用）。它非常小，容易找空闲块。"
      },
      {
        "type": "p",
        "text": "2. <strong>链接空闲区 (Chained Free Portions)</strong>：把所有空闲块用指针串起来。不需要额外的表，但会产生碎片，且每次分配都要读块来找指针，开销大,。"
      },
      {
        "type": "p",
        "text": "3. <strong>索引 (Indexing)</strong>：把空闲空间直接当成一个文件，用索引表来管理。"
      },
      {
        "type": "p",
        "text": "4. <strong>空闲块列表 (Free Block List)</strong>：把所有空闲块的序号存下来，放在主存里当作“栈”或者“FIFO队列”来管理。"
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第五模块：实战大厂怎么做？—— UNIX 与 Windows NTFS (大题扩展区)"
      },
      {
        "type": "p",
        "text": "这一部分主要考一些名词对应的操作系统，比如问你 <code>inode</code> 是谁家的，<code>VFS</code> 是什么。"
      },
      {
        "type": "p",
        "text": "<strong>1. UNIX 的独门绝技</strong>"
      },
      {
        "type": "ul",
        "items": [
          "<strong>索引节点 (Inode)</strong>：这是 UNIX 管理文件的核心！一个活跃的 Inode 控制着一个文件，里面包含了文件的所有元数据。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>分配方案</strong>：UNIX 在 Inode 中使用了极其精妙的设计：包含多个<strong>直接指针</strong>，以及<strong>一级、二级、三级间接指针</strong>。这使得它可以支持超过 16GB 的巨大文件。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>Linux VFS (虚拟文件系统)</strong>：它为用户提供了一个统一的接口，不管底层是什么文件系统，它都抽象成四个核心对象：<strong>超级块对象</strong>、<strong>索引节点对象</strong>、<strong>目录项对象</strong>、<strong>文件对象</strong>。"
        ]
      },
      {
        "type": "p",
        "text": "<strong>2. Windows NTFS 的特点</strong>"
      },
      {
        "type": "ul",
        "items": [
          "NTFS 设计用来满足高端需求，考点在于它的特性：<strong>可恢复性、安全性（安全描述符）、大磁盘支持、日志、压缩和加密</strong>。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>存储单位</strong>：在 NTFS 中，磁盘的层级是 <strong>扇区 (Sector)</strong> $\\rightarrow$ <strong>簇 (Cluster，连续扇区)</strong> $\\rightarrow$ <strong>卷 (Volume，逻辑分区)</strong>。"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "p",
        "text": "<strong>讲师寄语：</strong>"
      },
      {
        "type": "p",
        "text": "同学们，第十二章的“速成提纲”就在这里了！这一章的任督二脉就是：<strong>“五种文件组织”（谁最快、谁最省）、“三种文件分配表FAT的记法”（连续、链式、索引）、以及“如何管理空闲的磁盘块”</strong>。"
      },
      {
        "type": "p",
        "text": "你在复习的时候，重点对比<strong>连续分配</strong>和<strong>链式分配</strong>在碎片问题上的不同，这往往是期末大题的踩分点。需要我针对里面 UNIX 的“三级间接指针”怎么算文件最大容量给你做个具体的推演吗？"
      },
      {
        "type": "p",
        "text": "同学们好！欢迎来到《操作系统》期末冲刺提分班！我是你们的讲师。"
      },
      {
        "type": "p",
        "text": "今天我们要突破的是<strong>第十三章《分布式处理、客户-服务器和集群》</strong>。如果说前面的章节教的是“一台电脑怎么管好自己”，那这一章教的就是<strong>“一堆电脑怎么协同作战”</strong>。"
      },
      {
        "type": "p",
        "text": "对于零基础的同学，这章最容易被各种高大上的名词（RPC、中间件、集群、Beowulf）绕晕。别怕！我已经把整份PPT的内容浓缩提炼，整理成了下面这份<strong>内部绝密速成提纲</strong>。跟着我的逻辑，我们直接去考卷上“抢分”！"
      },
      {
        "type": "hr"
      },
      {
        "type": "h1",
        "text": "🚀 操作系统期末冲刺绝密讲义：第十三章 分布式与集群"
      },
      {
        "type": "h2",
        "text": "第一模块：客户-服务器（C/S）架构的“四种形态”与“三层境界” (选择/判断高频区)"
      },
      {
        "type": "p",
        "text": "<strong>1. 谁是客户？谁是服务器？</strong>"
      },
      {
        "type": "ul",
        "items": [
          "<strong>客户 (Client)</strong>：通常是你的个人PC，负责给你提供友好的图形界面（GUI、窗口、鼠标）。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>服务器 (Server)</strong>：背后的大佬，通常是高性能计算机，运行着关系数据库（DBMS），允许多个客户共享访问。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>网络</strong>：连接两者的第三个基本要素。"
        ]
      },
      {
        "type": "p",
        "text": "<strong>2.</strong> <strong>🌟</strong> <strong>必考点：C/S 架构的四大门派（应用级任务怎么分配？）</strong>"
      },
      {
        "type": "p",
        "text": "考试极爱考这四种架构的特征对比："
      },
      {
        "type": "ul",
        "items": [
          "<strong>基于主机的处理 (Host-based)</strong>：<strong>不是真正的C/S</strong>。主机包揽一切，客户机只是个“哑终端”（只负责显示）。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>基于服务器的处理 (Server-based)</strong>：服务器包干几乎所有处理，客户端只提供图形界面。好处是系统好维护。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>基于客户的处理 (Client-based)</strong>：<strong>目前最普遍的模式！</strong> 应用处理都在客户端完成，服务器只负责最核心的数据库逻辑。好处是用户可以高度定制本地应用。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>合作处理 (Cooperative)</strong>：两边“胖瘦搭配”，以最优化的方式协同处理。好处是生产和网络效率最高，<strong>缺点是设置和维护极其复杂</strong>。"
        ]
      },
      {
        "type": "p",
        "text": "<strong>3. 三层 C/S 架构 (Three-tier Architecture)</strong>"
      },
      {
        "type": "p",
        "text": "为了进一步解耦，现代系统变成了三层："
      },
      {
        "type": "ul",
        "items": [
          "<strong>用户机器</strong>（瘦客户端） $\\rightarrow$ <strong>中间层服务器</strong>（应用服务器/网关，负责转换协议和融合结果） $\\rightarrow$ <strong>后端服务器</strong>（数据服务器）。"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第二模块：沟通的桥梁——中间件与缓存 (概念填空区)"
      },
      {
        "type": "p",
        "text": "<strong>1. 中间件 (Middleware) —— 系统的“通用翻译官”</strong>"
      },
      {
        "type": "ul",
        "items": [
          "<strong>痛点</strong>：客户和服务器的操作系统、硬件五花八门，程序员怎么写代码？"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>大招</strong>：引入中间件！它提供一组标准的 API（应用程序编程接口），让程序员可以<strong>忽略底层的跨平台差异</strong>，无论数据在哪都能用相同的方法访问。"
        ]
      },
      {
        "type": "p",
        "text": "<strong>2. 文件高速缓存一致性 (File Cache Consistency)</strong>"
      },
      {
        "type": "ul",
        "items": [
          "<strong>痛点</strong>：网络传输太慢了，每次都去服务器读文件会卡死。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>绝招</strong>：利用<strong>局部性原理</strong>，把最近访问的文件缓存在本地。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>考点避坑</strong>：怎么保证本地缓存和服务器一致？最简单粗暴的方法是<strong>文件锁技术</strong>，防止多人同时访问，但<strong>代价是牺牲了性能和灵活性</strong>。"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第三模块：进程如何跨机器聊天？(核心对比大题)"
      },
      {
        "type": "p",
        "text": "机器不在同一台物理机上，进程怎么通信？这是本章的绝对核心！"
      },
      {
        "type": "p",
        "text": "<strong>1. 分布式消息传递 (Message Passing)</strong>"
      },
      {
        "type": "ul",
        "items": [
          "<strong>可靠性 vs 不可靠性</strong>：可靠机制保证传输正确（有确认回复），不可靠机制只管发不管到（降低了复杂性和开销）。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>🌟</strong> <strong>阻塞 vs 无阻塞（必背对比）</strong>："
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>阻塞 (Blocking / 同步)</strong>：发消息后死等，直到确认对方收到才继续运行。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>无阻塞 (Nonblocking / 异步)</strong>：发完就去干别的事，<strong>极其高效灵活</strong>，但<strong>致命缺点是极难测试和调试</strong>（由于时间顺序不确定，会产生很多奇怪的bug）。"
        ]
      },
      {
        "type": "p",
        "text": "<strong>2.</strong> <strong>🌟</strong> <strong>远程过程调用 (RPC, Remote Procedure Call)</strong>"
      },
      {
        "type": "ul",
        "items": [
          "<strong>概念</strong>：就像调用本地函数一样，去调用另一台机器上的函数。它能自动生成通信代码。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>绑定方式对比</strong>："
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>非永久绑定</strong>：打完一次电话就挂断（连接/断开频繁，开销大，不适合频繁调用）。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>永久绑定</strong>：电话一直通着，适合多次重复调用。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>考试大坑（参数传递的困难）</strong>：RPC传“值”很容易，但<strong>传“引用（指针）”极其困难</strong>！因为两台机器的内存地址完全不一样，必须要实现系统范围内的全局指针，代价极高。而且两边编程语言不同也会导致数据格式不一致。"
        ]
      },
      {
        "type": "p",
        "text": "<strong>3. 面向对象机制</strong>"
      },
      {
        "type": "ul",
        "items": [
          "引入<strong>对象请求中介 (ORB)</strong> 作为代理，客户和服务器之间互传对象消息。经典例子：微软的 COM 和 CORBA。"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第四模块：终极武器——集群 (Clusters) (简答/优势列举区)"
      },
      {
        "type": "p",
        "text": "如果一台服务器扛不住，那就上一群服务器！"
      },
      {
        "type": "p",
        "text": "<strong>1. 什么是集群？</strong>"
      },
      {
        "type": "p",
        "text": "一组互连的<strong>完整计算机</strong>（注意：必须是离开集群也能独立运行的机器），像一台计算机一样协同工作。每一台叫一个“节点”。"
      },
      {
        "type": "p",
        "text": "<strong>2.</strong> <strong>🌟</strong> <strong>集群的四大绝对优势（必背简答题）</strong>"
      },
      {
        "type": "p",
        "text": "1. <strong>绝对可伸缩性</strong>：几十上百台机器绑一起，性能远超最大的单体计算机。"
      },
      {
        "type": "p",
        "text": "2. <strong>增加可伸缩性（增量扩展）</strong>：随时往里添新机器，工作量极小。"
      },
      {
        "type": "p",
        "text": "3. <strong>高可用性</strong>：一台机器宕机了，其他机器顶上，系统不死。"
      },
      {
        "type": "p",
        "text": "4. <strong>高性价比</strong>：用市面上便宜的普通PC拼装，就能打败昂贵的大型机。"
      },
      {
        "type": "p",
        "text": "<strong>3. 集群 vs 对称多处理器 (SMP) （选择/辨析题）</strong>"
      },
      {
        "type": "ul",
        "items": [
          "<strong>SMP 的优点</strong>：容易管理配置，占地小，耗电少，稳定。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>集群的优点</strong>：在绝对规模和扩展性上，集群<strong>完爆</strong> SMP。"
        ]
      },
      {
        "type": "p",
        "text": "<strong>4. 操作系统要解决的三个核心问题</strong>"
      },
      {
        "type": "ul",
        "items": [
          "<strong>故障管理</strong>：故障补救 (Failover，把任务切给好机器) 和 故障恢复 (Failback，机器修好后切回来)。注意：自动 Failback 可能会导致任务来回“反弹”。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>负载平衡</strong>：新机器加入时自动分配任务。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>并行计算</strong>：依赖并行编译器、并行应用和参数计算（同算法不同参数）。"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第五模块：实战演练——Windows、Sun 与 Linux 集群 (连线/常识题)"
      },
      {
        "type": "p",
        "text": "<strong>1. Windows 故障转移集群</strong>"
      },
      {
        "type": "ul",
        "items": [
          "这是一种<strong>不共享</strong>集群（资源在某时刻只归单个节点所有）。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "核心概念：<strong>集群服务</strong>（管家）、<strong>资源</strong>（被管理的对象）、<strong>组</strong>（按单位管理的资源集，用于故障补救和负载平衡）。"
        ]
      },
      {
        "type": "p",
        "text": "<strong>2. Sun 集群</strong>"
      },
      {
        "type": "ul",
        "items": [
          "包含统一的对象框架、全局分布式文件系统等。"
        ]
      },
      {
        "type": "p",
        "text": "<strong>3. Beowulf 和 Linux 集群（高频背景考点）</strong>"
      },
      {
        "type": "ul",
        "items": [
          "<strong>身世</strong>：1994年NASA发起，目前最重要的集群技术。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>特征（专考选择题）</strong>：用<strong>市面上常见的部件（COTS）</strong>，<strong>专用的私有网络</strong>，<strong>免费的开源软件库</strong>，绝不搞花里胡哨的定制硬件，极易复制。代表软件有 BPROC（分布式进程空间）。"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "p",
        "text": "<strong>讲师寄语：</strong>"
      },
      {
        "type": "p",
        "text": "同学们，这章的内容其实非常有意思！它的核心脉络就是：<strong>单机不够用 $\\rightarrow$ 拆成C/S架构 $\\rightarrow$ 发现通信难，引入中间件和RPC $\\rightarrow$ 服务器扛不住，引入集群技术</strong>。"
      },
      {
        "type": "p",
        "text": "你在复习时，重点死磕<strong>“C/S的四种应用处理分类”</strong>、<strong>“RPC传引用的困难点”</strong>以及<strong>“集群的四大优势”</strong>，这几处是期末考卷上最爱出大题的地方！"
      },
      {
        "type": "p",
        "text": "怎么样？这章的架构是不是瞬间清晰了？如果你对“RPC参数传递”或者“集群故障转移”的具体机制还有疑惑，随时向我提问！"
      },
      {
        "type": "p",
        "text": "同学们好！欢迎再次来到《操作系统》期末冲刺提分班！我是你们的讲师。"
      },
      {
        "type": "p",
        "text": "今天我们要攻克的是这本书最后、也是最前沿的一块硬骨头——<strong>第14章《分布式进程管理》</strong>。对于零基础的同学来说，这章难点在于“没有上帝视角”：在分布式系统里，大家都是平等的机器，<strong>没有公共时钟、没有共享内存</strong>。"
      },
      {
        "type": "p",
        "text": "别怕！我已经把这份复杂的PPT“抽筋剥骨”，为你翻译成了最直白的生活场景。请拿好这份<strong>内部绝密速成提纲</strong>，我们直接发车！"
      },
      {
        "type": "hr"
      },
      {
        "type": "h1",
        "text": "🚀 操作系统期末冲刺绝密讲义：第14章 分布式进程管理"
      },
      {
        "type": "h2",
        "text": "第一模块：跨电脑“搬家”—— 进程迁移 (Process Migration)"
      },
      {
        "type": "p",
        "text": "在分布式系统中，进程有时候跑着跑着，需要换一台电脑继续跑，这就是进程迁移。"
      },
      {
        "type": "p",
        "text": "<strong>1. 为什么要搬家？（必背四大动机）</strong>"
      },
      {
        "type": "ul",
        "items": [
          "<strong>负载共享</strong>：这台机器太卡了，去另一台闲置的机器跑。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>通信性能</strong>：数据在哪，进程就去哪（为了少传数据）。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>可用性</strong>：这台机器马上要关机维护了，赶紧跑路。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>特殊功能</strong>：目标机器上有特殊的硬件（比如高端GPU）或软件。"
        ]
      },
      {
        "type": "p",
        "text": "<strong>2. 怎么搬家？（“四大搬家策略”选择题常客）</strong>"
      },
      {
        "type": "p",
        "text": "必须在原机器销毁，在目标机器创建。内存地址空间怎么搬？"
      },
      {
        "type": "ul",
        "items": [
          "<strong>Eager (all) 全搬</strong>：简单粗暴，把所有地址空间一次性全传过去。（缺点：太慢，很多空间根本用不上）"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>Eager (dirty) 脏搬</strong>：只传在主存里被<strong>修改过（dirty）</strong>的部分，剩下的按需传输。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>Copy-on-reference 按需搬</strong>：先过去，用到哪页再传哪页。（优点：初始启动最快）。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>Flushing 刷新</strong>：把脏页刷回磁盘，清空主存资源。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>(扩展：</strong>预先复制 Precopy<strong>：一边偷偷传数据，一边让进程继续跑，减少进程被冻结的时间)</strong>"
        ]
      },
      {
        "type": "p",
        "text": "<strong>3. 移出 (Eviction)</strong>"
      },
      {
        "type": "p",
        "text": "如果一个进程迁移到了一台闲置工作站，但工作站的主人突然回来了（开始操作电脑），为了保证主人的响应时间，必须把这个外来进程<strong>“踢出去”（移出）</strong>。"
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第二模块：拍合影的难题—— 分布式全局状态 (Global State)"
      },
      {
        "type": "p",
        "text": "在分布式系统里找Bug或者检测死锁，需要给整个系统拍个“快照”。但因为大家<strong>没有统一的手表（公共时钟）</strong>，极容易出现时空错乱。"
      },
      {
        "type": "p",
        "text": "<strong>1. 核心考点：一致性状态 vs 不一致状态</strong>"
      },
      {
        "type": "ul",
        "items": [
          "<strong>一致状态 (Consistent)</strong>：发信和收信的历史是吻合的。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>不一致状态 (Inconsistent)（必考辨析）</strong>：<strong>接收方已经记录了收到消息，但发送方居然还没记录发送这个消息！</strong>（就像你收到了快递，但淘宝上显示商家还没发货，典型的时空悖论）。"
        ]
      },
      {
        "type": "p",
        "text": "<strong>2. 分布式快照算法</strong>"
      },
      {
        "type": "ul",
        "items": [
          "<strong>秘密武器：标识 (Marker)</strong>。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "进程通过向所有流出通道广播一个“标识”来启动算法。保证记录下大家的状态和通道里的消息。"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第三模块：抢共享资源的终极PK—— 分布式互斥 (Mutual Exclusion)"
      },
      {
        "type": "p",
        "text": "既然没有共享内存，大家怎么抢同一把锁？<strong>全靠互相发消息商量！</strong>"
      },
      {
        "type": "p",
        "text": "<strong>1. 如何给事件排先后？（基于时间戳的算法）</strong>"
      },
      {
        "type": "p",
        "text": "大家既然没有公共时钟，就自己维护一个计数器。"
      },
      {
        "type": "ul",
        "items": [
          "发消息时带上自己的计数器：<code>(消息内容, 时间戳, 进程ID)</code>。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "收到消息时，更新自己的时钟：<code>我的新时钟 = 1 + max(收到时间戳, 我的旧时钟)</code>。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>谁排前面？</strong> 时间戳小的优先；如果时间戳一样，进程ID小的优先。"
        ]
      },
      {
        "type": "p",
        "text": "<strong>2.</strong> <strong>🌟</strong> <strong>三大分布式互斥算法对比（全卷最高频考点！）</strong>"
      },
      {
        "type": "p",
        "text": "这是大题和选择题的重灾区，记住它们的优缺点和消息数量！"
      },
      {
        "type": "ul",
        "items": [
          "<strong>① Lamport 算法（拉姆波特算法）</strong>"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>原理</strong>：大家都有一个请求队列。想进临界区，必须给所有人发 <code>Request</code>，等所有人回复 <code>Reply</code>。用完后发 <code>Release</code>。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>开销</strong>：进一次临界区需要 <strong>3(N-1)</strong> 条消息。（N-1个请求，N-1个回复，N-1个释放）。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>② Ricart &amp; Agrawala 算法（优化版）</strong>"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>原理</strong>：去掉了释放消息。如果你收到了别人的请求，但你正在用，你就<strong>装死不回复</strong>（推迟回复），等你用完了再发 <code>Reply</code>。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>开销</strong>：优化到了 <strong>2(N-1)</strong> 条消息。（N-1个请求，N-1个回复）。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>③ Token-Passing (令牌传递算法)</strong>"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>原理</strong>：系统里只有一个“令牌”，谁拿到令牌谁就能进临界区。用完按顺序传给下一个需要的人。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>开销</strong>：如果你手里没令牌，需要 <strong>N</strong> 条消息去请求；如果你手里刚好有令牌，<strong>0条消息</strong>就能进！（性能波动大）。"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第四模块：跨主机的“死结”—— 分布式死锁 (Distributed Deadlock)"
      },
      {
        "type": "p",
        "text": "大家互相发消息等资源，极其容易等成死胡同。"
      },
      {
        "type": "p",
        "text": "<strong>1. 死锁预防的两个神技</strong>"
      },
      {
        "type": "p",
        "text": "遇到冲突时，系统通过比较两个进程的“时间戳（年龄）”来决定谁生谁死："
      },
      {
        "type": "ul",
        "items": [
          "<strong>Wait-die (等或死)</strong>：老进程可以等新进程；新进程如果遇到老进程占着资源，新进程直接自杀。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>Wound-wait (伤或等)</strong>：老进程可以直接“砍死（抢占）”新进程的资源；新进程遇到老进程，只能乖乖等。"
        ]
      },
      {
        "type": "p",
        "text": "<strong>2. 消息通信中的死锁（Buffer满了）</strong>"
      },
      {
        "type": "p",
        "text": "不仅仅是等资源会死锁，<strong>发消息也会死锁</strong>！"
      },
      {
        "type": "ul",
        "items": [
          "<strong>直接/间接存储转发死锁</strong>：节点A给B发了一堆包，把B的缓冲区塞满了；B也要给A发包，把A塞满了。结果大家都发不出去，彻底卡死。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>终极解法</strong>：<strong>结构化缓冲池 (Structured Buffer Pool)</strong>。根据消息走过的跳数（hops）来分配特定的缓冲区，防止环形死锁。"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "p",
        "text": "<strong>讲师寄语：</strong>"
      },
      {
        "type": "p",
        "text": "同学们，这章虽然在第14章，但考点非常清晰！你只需要记住："
      },
      {
        "type": "p",
        "text": "1. <strong>进程迁移有哪四种方式</strong>"
      },
      {
        "type": "p",
        "text": "2. <strong>什么叫“不一致的快照状态”</strong>"
      },
      {
        "type": "p",
        "text": "3. <strong>Lamport 是 3(N-1) 条消息，Ricart&amp;Agrawala 是 2(N-1) 条消息</strong>"
      },
      {
        "type": "p",
        "text": "4. <strong>缓冲池满了会导致消息通信死锁</strong>"
      },
      {
        "type": "p",
        "text": "把这四条刻在脑子里，这章的客观题和简答题你就稳拿80%以上的分数了！如果你对<strong>基于时间戳的事件排序推演</strong>还有疑惑，我可以立马给你出一道真题练练手！"
      },
      {
        "type": "p",
        "text": "同学们好！欢迎再次来到《操作系统》期末冲刺提分班！我是你们的讲师。"
      },
      {
        "type": "p",
        "text": "今天我们要攻克的是全书的最后一座堡垒——<strong>第十五章《安全性》</strong>。对于零基础的同学来说，这章不再是枯燥的代码和底层硬件，它更像是一场<strong>“警察抓小偷”的谍战大片</strong>。考试中这部分极爱出<strong>名词解释、连线题和简答题</strong>。"
      },
      {
        "type": "p",
        "text": "我已经为你把这份 PPT 里的所有“黑客武器”和“系统防御工事”全部拆解完毕，浓缩成了下面这份<strong>内部绝密速成提纲</strong>。集中注意力，我们要锁门发车了！"
      },
      {
        "type": "hr"
      },
      {
        "type": "h1",
        "text": "🚀 操作系统期末冲刺绝密讲义：第十五章 安全性"
      },
      {
        "type": "h2",
        "text": "第一模块：认清底线与敌人（安全要求与四大威胁）"
      },
      {
        "type": "p",
        "text": "任何安全系统的设计，都必须死守“四大底线”，而黑客的攻击刚好与这四条底线一一对应（<strong>必背配对考点</strong>）："
      },
      {
        "type": "p",
        "text": "1. <strong>机密性 (Confidentiality) vs 侦听 (Interception)</strong>"
      },
      {
        "type": "ul",
        "items": [
          "<strong>要求</strong>：信息只能给授权的人看。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>威胁</strong>：窃听、违法复制文件。这属于<strong>被动攻击</strong>，只偷看，不搞破坏。"
        ]
      },
      {
        "type": "p",
        "text": "2. <strong>完整性 (Integrity) vs 更改 (Modification)</strong>"
      },
      {
        "type": "ul",
        "items": [
          "<strong>要求</strong>：资产只能由授权的人修改。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>威胁</strong>：篡改数据、修改网络消息。这属于<strong>主动攻击</strong>。"
        ]
      },
      {
        "type": "p",
        "text": "3. <strong>可用性 (Availability) vs 中断 (Interruption)</strong>"
      },
      {
        "type": "ul",
        "items": [
          "<strong>要求</strong>：系统必须随时能用。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>威胁</strong>：破坏硬件、切断线路。或者发动<strong>拒绝服务 (Denial of service, DoS)</strong>，用垃圾消息把网络塞满，让合法用户进不来。"
        ]
      },
      {
        "type": "p",
        "text": "4. <strong>可靠性/真实性 (Authenticity) vs 伪造 (Fabrication)</strong>"
      },
      {
        "type": "ul",
        "items": [
          "<strong>要求</strong>：验证你的身份到底是不是你本人。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>威胁</strong>：伪装成别人 (Masquerade)、在网络中插入虚假消息。"
        ]
      },
      {
        "type": "p",
        "text": "&gt; <strong>🌟</strong> <strong>讲师防坑提示（网络攻击分类）</strong>："
      },
      {
        "type": "p",
        "text": "&gt; 考试常问“被动攻击”和“主动攻击”的区别。记住：<strong>被动攻击（如通信分析、窃听）不影响系统资源，极难被发现；主动攻击（如重放、伪装、拒绝服务）会改变系统状态，必须被检测和防御</strong>。"
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第二模块：城防系统构建（访问控制与口令）"
      },
      {
        "type": "h3",
        "text": "守大门：面向用户的认证（口令策略）"
      },
      {
        "type": "p",
        "text": "操作系统是怎么验证你身份的？最常见的就是 ID 和 口令（密码）。为了防黑客猜密码，系统有三大策略（<strong>优缺点必考</strong>）："
      },
      {
        "type": "ul",
        "items": [
          "<strong>计算机生成口令</strong>：极其安全，但<strong>人类根本记不住</strong>，容易写在纸上被偷。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>反应性口令检查 (Reactive)</strong>：系统定期扮演黑客去破解用户的密码，猜中了就强制用户改。缺点是<strong>非常浪费资源</strong>。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>前摄性口令检查 (Proactive)</strong>：<strong>目前最好的方案</strong>。在用户刚设置密码的时候就进行检查，不符合复杂度的直接拒绝。"
        ]
      },
      {
        "type": "h3",
        "text": "守房间：面向数据的控制（访问矩阵）"
      },
      {
        "type": "p",
        "text": "当用户进了系统，怎么限制他能访问哪些文件？操作系统维护了一个<strong>“访问矩阵” (Access Matrix)</strong>，包含主体（用户）、对象（文件）和访问权（读/写）。"
      },
      {
        "type": "p",
        "text": "因为矩阵太大而且很多空格，实际系统中会把它拆开成两种形式（<strong>核心对比题</strong>）："
      },
      {
        "type": "ul",
        "items": [
          "<strong>访问控制列表 (ACL - Access Control List)</strong>：<strong>按“列”拆分</strong>。每个文件门上挂个牌子，写着“张三可以读，李四可以写”。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>能力票据 (Capability Tickets)</strong>：<strong>按“行”拆分</strong>。给每个用户发一串钥匙，张三的钥匙串上写着“能开1号门和3号门”。"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第三模块：黑客武器图鉴（恶意程序分类大全）"
      },
      {
        "type": "p",
        "text": "这是期末考试<strong>最爱出分类填空和连线题</strong>的地方。恶意程序分为两大流派："
      },
      {
        "type": "h3",
        "text": "流派一：需要“宿主程序”（不能独立存在）"
      },
      {
        "type": "p",
        "text": "1. <strong>后门 (Trapdoor/Backdoor)</strong>：程序员测试时留下的秘密入口，能绕过验证。"
      },
      {
        "type": "p",
        "text": "2. <strong>逻辑炸弹 (Logic bomb)</strong>：像定时炸弹一样，平时没反应，一旦满足特定条件（比如到了某一天、某个文件被删），就会“爆炸”破坏系统。"
      },
      {
        "type": "p",
        "text": "3. <strong>特洛伊木马 (Trojan horse)</strong>：表面上是一个有用的程序（比如游戏），背地里偷偷干坏事（比如帮你把所有文件权限公开）。"
      },
      {
        "type": "p",
        "text": "4. <strong>病毒 (Viruses)</strong>：最狡猾！它会把自己的代码<strong>“感染”（复制）</strong>到其他可执行程序中。"
      },
      {
        "type": "h3",
        "text": "流派二：独立运行的程序"
      },
      {
        "type": "p",
        "text": "1. <strong>蠕虫 (Worm)</strong>：<strong>不需要别人运行，它自己长了脚！</strong> 会通过网络连接、电子邮件主动寻找漏洞，把自己从一台机器复制到另一台机器。"
      },
      {
        "type": "p",
        "text": "2. <strong>僵尸 (Zombie)</strong>：秘密接管你的电脑，让你的电脑变成受黑客控制的“肉鸡”，用来对别人发动攻击，极其难以追踪。"
      },
      {
        "type": "p",
        "text": "&gt; <strong>🌟</strong> <strong>高频考点：病毒的生命周期与特殊变种</strong>"
      },
      {
        "type": "p",
        "text": "&gt; <strong>四个阶段</strong>：潜伏 $\\rightarrow$ 繁殖 $\\rightarrow$ 引发 $\\rightarrow$ 执行。"
      },
      {
        "type": "p",
        "text": "&gt; <strong>多态病毒 (Polymorphic)</strong>：这是最难杀的病毒。它每次感染都会<strong>变异并改变自己的加密密钥</strong>，导致传统的“特征码扫描”对它完全无效。"
      },
      {
        "type": "p",
        "text": "&gt; <strong>宏病毒 (Macro Viruses)</strong>：跨平台，不感染可执行程序，<strong>专挑文档（如 Word 文件）感染</strong>，传播极其容易。"
      },
      {
        "type": "hr"
      },
      {
        "type": "h2",
        "text": "第四模块：终极防御体系（入侵检测与可信系统）"
      },
      {
        "type": "h3",
        "text": "入侵检测系统 (IDS)"
      },
      {
        "type": "p",
        "text": "操作系统怎么抓内鬼和黑客？靠观察行为。"
      },
      {
        "type": "ul",
        "items": [
          "<strong>统计异常检测</strong>：收集合法用户平时的行为画像。如果你平时只看 1 个文件，今天突然下载了 1 万个，系统就判定你是异常。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>基于规则的检测</strong>：用专家系统直接定义什么是可疑行为。"
        ]
      },
      {
        "type": "h3",
        "text": "反病毒方法 (Antivirus)"
      },
      {
        "type": "p",
        "text": "杀毒软件的终极武器之一是<strong>通用解密 (GD)</strong>，它会在系统里建一个<strong>CPU仿真器</strong>（就像一个虚拟的隔离病房），把可疑程序放进去模拟运行，看看它有没有病毒特征，从而防止真实系统被破坏。"
      },
      {
        "type": "h3",
        "text": "🌟 最难理解的考点：可信系统 (Trusted Systems) 的多级安全"
      },
      {
        "type": "p",
        "text": "军事和金融系统需要极高的保密级别（绝密 $\\rightarrow$ 机密 $\\rightarrow$ 秘密 $\\rightarrow$ 无密）。为了防泄密，系统通过“访问监视器”制定了两条铁律："
      },
      {
        "type": "ul",
        "items": [
          "<strong>不向上读 (No read up)</strong>：你级别低，不能看高级别的机密文件（防偷窥）。"
        ]
      },
      {
        "type": "ul",
        "items": [
          "<strong>不向下写 (No write down)</strong>：<strong>【最易错点】你级别高，绝对不允许</strong>把文件写到低级别的区域去（防止高级特工把绝密文件拷给普通级别的内鬼）！"
        ]
      },
      {
        "type": "hr"
      },
      {
        "type": "p",
        "text": "<strong>讲师寄语：</strong>"
      },
      {
        "type": "p",
        "text": "这份提纲就是第十五章的全部通关秘籍！这章不需要你死记硬背复杂的代码逻辑，你只需要<strong>在脑海里建立几个对应关系</strong>：四大威胁对应四大底线、ACL 对应按列拆分文件、木马需要伪装而蠕虫可以自己跑、多态病毒会变异改密钥。"
      },
      {
        "type": "p",
        "text": "把讲义里加粗的词语多看两遍，应付这章的期末客观题就如同探囊取物了！需要我给你出两道<strong>“被动攻击与主动攻击辨析”</strong>的历年真题测测你的直觉吗？"
      }
    ],
    "source": "posts/操作系统/期末总结.md"
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
        "type": "h2",
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
        "type": "h2",
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
