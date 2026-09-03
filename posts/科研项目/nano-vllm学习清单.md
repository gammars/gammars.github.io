## 阶段 0｜前置知识（1–2 天）

本阶段目标是建立最小够用的[心智模型](https://zhida.zhihu.com/search?content_id=273909145&content_type=Article&match_order=1&q=心智模型&zhida_source=entity)，覆盖 Transformer/LLM 基础、PyTorch 核心概念以及 GPU/CUDA 极简认知。

## 0.1 Transformer / LLM 推理常识

• [transformer到LLM极速入门](https://zhuanlan.zhihu.com/p/1897817622134890991) 按PPT思路图多文少，适合快速建立整体印象

• [【LLM指北】Transformer工作流程详解](https://zhuanlan.zhihu.com/p/671835777) 从[编码器](https://zhida.zhihu.com/search?content_id=273909145&content_type=Article&match_order=1&q=编码器&zhida_source=entity)到解码器完整过一遍，重点讲[自回归](https://zhida.zhihu.com/search?content_id=273909145&content_type=Article&match_order=1&q=自回归&zhida_source=entity)

• [【系统学习LLM】Transformer训练与推理流程](https://zhuanlan.zhihu.com/p/22423899260) 从训练到推理全流程精讲，含代码示例

• [大模型LLM知识整理](https://zhuanlan.zhihu.com/p/641109766) 全景式知识整理，适合反复查阅

• [LLM模型推理入门](https://zhuanlan.zhihu.com/p/711395880) 从Prefill到Decode的完整推理流程介绍

## 0.2 PyTorch 基础

• [torch.compile 使用指南](https://zhuanlan.zhihu.com/p/620163218) 官方文档翻译+实战示例，快速了解JIT编译加速

• [理解torch.compile基本原理和使用方式](https://zhuanlan.zhihu.com/p/12712224407) 深入解析TorchDynamo和[TorchInductor](https://zhida.zhihu.com/search?content_id=273909145&content_type=Article&match_order=1&q=TorchInductor&zhida_source=entity)

• [torch.compile 技术剖析：PyTorch 2.x 编译系统详解](https://zhuanlan.zhihu.com/p/1968068966934095005) 万字长文，从原理到实践

## 0.3 GPU / CUDA 极简认知

• [CUDA编程入门极简教程【从硬件到代码】](https://zhuanlan.zhihu.com/p/26890920210) 覆盖HBM/[SRAM](https://zhida.zhihu.com/search?content_id=273909145&content_type=Article&match_order=1&q=SRAM&zhida_source=entity)/kernel等核心概念

• [GPU到底是如何工作的？AI Infra入门](https://zhuanlan.zhihu.com/p/1925562905065160856) 全景视角理解GPU架构与CUDA[编程模型](https://zhida.zhihu.com/search?content_id=273909145&content_type=Article&match_order=1&q=编程模型&zhida_source=entity)

• [GPU架构与计算入门指南](https://zhuanlan.zhihu.com/p/664916308) 理解kernel、SM、[warp](https://zhida.zhihu.com/search?content_id=273909145&content_type=Article&match_order=1&q=warp&zhida_source=entity)等核心概念

• [GPU内存(显存)的理解与基本使用](https://zhuanlan.zhihu.com/p/462191421) 详解HBM、[GDDR](https://zhida.zhihu.com/search?content_id=273909145&content_type=Article&match_order=1&q=GDDR&zhida_source=entity)等显存介质

## 阶段 1｜LLM 推理的本质问题（半天）

本阶段纯理论，建立“为什么需要推理框架”的认知，重点是 Prefill/Decode 两阶段和 KV Cache。

## 1.1 Prefill 与 Decode 两阶段

• [理解大模型推理中的KV Cache](https://zhuanlan.zhihu.com/p/1942589614205441599) 从prefill到decode全流程图解，非常清晰

• [大模型推理阶段KV计算分析：prefill和decode](https://zhuanlan.zhihu.com/p/716688741) [量化分析](https://zhida.zhihu.com/search?content_id=273909145&content_type=Article&match_order=1&q=量化分析&zhida_source=entity)两阶段的[计算量](https://zhida.zhihu.com/search?content_id=273909145&content_type=Article&match_order=1&q=计算量&zhida_source=entity)和带宽占用

• [大模型Prefill-Decode分离式推理架构解读](https://zhuanlan.zhihu.com/p/1957513179971158240) 理解为什么要把prefill和decode分开调度

## 1.2 KV Cache 的由来与原理

• [LLM推理的KV Cache](https://zhuanlan.zhihu.com/p/684263914) 从零推导 KV Cache 的必要性和实现原理

• [LLM(20)：漫谈KV Cache优化方法](https://zhuanlan.zhihu.com/p/659770503) 整理多种KV Cache优化方案，含StreamingLLM

• [从零实现玩具版LLM推理引擎（一）：彻底搞懂Prefill](https://zhuanlan.zhihu.com/p/2018242525970835129) 用最简单的代码手写KV Cache和Prefill

## 阶段 2｜跑起来 + 摸 [API](https://zhida.zhihu.com/search?content_id=273909145&content_type=Article&match_order=1&q=API&zhida_source=entity)（1 天）

本阶段重点是把 nano-vllm 跑通，理解入口代码和主循环。可先通读 vLLM 整体架构背景资料。

• [图解大模型计算加速系列：vLLM源码解析1，整体架构](https://zhuanlan.zhihu.com/p/691045737) 图文并茂讲解vLLM整体架构，适合建立全局视图

• [vLLM源码解析系列0：关键技术概括](https://zhuanlan.zhihu.com/p/1918093061688397955) 总览所有关键技术点，适合快速导航

• [大模型推理框架vLLM源码解析（一）：框架概览](https://zhuanlan.zhihu.com/p/681402162) 从模块结构到核心流程的源码级解读

## 阶段 3｜[调度层](https://zhida.zhihu.com/search?content_id=273909145&content_type=Article&match_order=1&q=调度层&zhida_source=entity)：Scheduler & Continuous Batching（2 天）

调度层是 CPU 上的纯 Python 逻辑，理解 Scheduler、Sequence [状态机](https://zhida.zhihu.com/search?content_id=273909145&content_type=Article&match_order=1&q=状态机&zhida_source=entity)和 Continuous Batching 的精髓。

## 3.1 Continuous Batching 原理

• [vLLM源码解析之continuous batch](https://zhuanlan.zhihu.com/p/1914965829864362801) 深入讲解调度实现细节，含chunked prefill

• [大模型推理服务调度优化技术：Continuous Batching](https://zhuanlan.zhihu.com/p/719610083) 各大推理框架中Continuous Batching的应用对比

## 3.2 vLLM Scheduler 源码解读

• [图解vLLM源码解读2，调度器策略(Scheduler)](https://zhuanlan.zhihu.com/p/692540949) 图解系列，用图片拆解调度策略的每一步

• [vllm v1代码走读-Scheduler](https://zhuanlan.zhihu.com/p/1929225987897426611) 基于vllm v1的调度器源码逐行分析

• [vLLM Scheduler逻辑难喃？先手搓一个基础调度器](https://zhuanlan.zhihu.com/p/1988193790129902960) 手写简化版调度器，加深理解

## 阶段 4｜内存管理：BlockManager 与 PagedAttention（2 天）

PagedAttention 是 vLLM 最有名的创新，把 KV Cache 切成固定大小的 block，类似操作系统的[虚拟内存管理](https://zhida.zhihu.com/search?content_id=273909145&content_type=Article&match_order=1&q=虚拟内存管理&zhida_source=entity)。

## 4.1 PagedAttention 原理

• [图解vLLM核心技术PagedAttention原理](https://zhuanlan.zhihu.com/p/691038809) 图解系列精品，最直观的PagedAttention解释

• [vLLM（一）PagedAttention 算法](https://zhuanlan.zhihu.com/p/680153425) 从算法层面详解分块、按需分配、内部碎片解决

• [显存管理革命：分页注意力机制PagedAttention](https://zhuanlan.zhihu.com/p/1962435371720745525) 以操作系统分页类比，通俗易懂

## 4.2 vLLM 显存管理源码

• [vLLM显存管理详解](https://zhuanlan.zhihu.com/p/1916529253169734444) 含显存[时序图](https://zhida.zhihu.com/search?content_id=273909145&content_type=Article&match_order=1&q=时序图&zhida_source=entity)，详解各部分[显存占用](https://zhida.zhihu.com/search?content_id=273909145&content_type=Article&match_order=1&q=显存占用&zhida_source=entity)

• [LLM推理加速04 内存管理-PagedAttention和vllm](https://zhuanlan.zhihu.com/p/693033673) 含block预申请和slot mapping细节

• [谈一谈vllm中的PagedAttention技术](https://zhuanlan.zhihu.com/p/1995208571181367796) 核心策略总结：按块领用+[表映射](https://zhida.zhihu.com/search?content_id=273909145&content_type=Article&match_order=1&q=表映射&zhida_source=entity)

## 阶段 5｜模型层：从 [Tensor](https://zhida.zhihu.com/search?content_id=273909145&content_type=Article&match_order=1&q=Tensor&zhida_source=entity) 到 Qwen3（2 天）

理解 Qwen3 [模型架构](https://zhida.zhihu.com/search?content_id=273909145&content_type=Article&match_order=1&q=模型架构&zhida_source=entity)和关键组件：RMSNorm、RoPE、SwiGLU 等。

## 5.1 Qwen 模型架构

• [详解各种LLM系列｜ Qwen技术内容详解（万字长文）](https://zhuanlan.zhihu.com/p/713421330) 深入解析Qwen[架构设计](https://zhida.zhihu.com/search?content_id=273909145&content_type=Article&match_order=1&q=架构设计&zhida_source=entity)和训练细节

• [Qwen3模块详解与相对Qwen1/2的演进](https://zhuanlan.zhihu.com/p/2023781244639429693) 对比三代Qwen架构差异，含[GQA](https://zhida.zhihu.com/search?content_id=273909145&content_type=Article&match_order=1&q=GQA&zhida_source=entity)详解

• [Qwen通义千问模型拓扑结构解析](https://zhuanlan.zhihu.com/p/675332872) [拓扑图](https://zhida.zhihu.com/search?content_id=273909145&content_type=Article&match_order=1&q=拓扑图&zhida_source=entity)+代码级结构解析

• [QWen模型解析](https://zhuanlan.zhihu.com/p/1951751277815011155) 涵盖SwiGLU、RMSNorm、RoPE各组件解读

## 5.2 关键组件详解

• [RMSNorm与SwiGLU：关键组件优化详解](https://zhuanlan.zhihu.com/p/1969396824147207888) 从原理到代码实现，含性能对比

• [十分钟读懂旋转编码（RoPE）](https://zhuanlan.zhihu.com/p/647109286) 简洁明了，快速建立直觉

• [图解RoPE旋转位置编码及其特性](https://zhuanlan.zhihu.com/p/667864459) 图解深入，含外推性分析

• [RoPE旋转位置编码详解](https://zhuanlan.zhihu.com/p/1984200620912185896) 当前主流开源大模型采用的位置编码详解

## 阶段 6｜Attention 与 KV Cache 落地（3 天）

本阶段是难点集中区，需要理解 FlashAttention、[slot_mapping](https://zhida.zhihu.com/search?content_id=273909145&content_type=Article&match_order=1&q=slot_mapping&zhida_source=entity)、block_table 以及 [Triton kernel](https://zhida.zhihu.com/search?content_id=273909145&content_type=Article&match_order=1&q=Triton+kernel&zhida_source=entity)。

## 6.1 FlashAttention 原理

• [万字长文详解FlashAttention v1/v2](https://zhuanlan.zhihu.com/p/642962397) 从[伪代码](https://zhida.zhihu.com/search?content_id=273909145&content_type=Article&match_order=1&q=伪代码&zhida_source=entity)到计算流程全解析

• [Flash Attention全解析（上）：从V1、V2到Flash Decoding](https://zhuanlan.zhihu.com/p/1953761827025584899) 计算量、显存、IO复杂度理论剖析

• [图解FlashAttention V1，从硬件到计算逻辑](https://zhuanlan.zhihu.com/p/669926191) 图解系列，用图片讲透tiling和recomputation

• [图解FlashAttention V2，从原理到并行计算](https://zhuanlan.zhihu.com/p/691067658) V2内外循环交换的原理解释

• [[Attention优化\] 从Online-Softmax到FlashAttention](https://zhuanlan.zhihu.com/p/668888063) 通俗易懂的算法推导

## 6.2 Triton 入门（可选但强烈推荐）

• [Triton入门教学第一课：不写CUDA也能实现高性能Kernel](https://zhuanlan.zhihu.com/p/1989287222680233914) 从零开始的Triton入门，含vector-add示例

• [Triton写算子入门](https://zhuanlan.zhihu.com/p/887257776) 简洁的Triton编程模型介绍

• [Triton极简入门：Vector Add](https://zhuanlan.zhihu.com/p/1902778199261291694) 用[向量加法](https://zhida.zhihu.com/search?content_id=273909145&content_type=Article&match_order=1&q=向量加法&zhida_source=entity)快速理解Triton基础

• [最详细的Triton基础教程第一课：Softmax kernel](https://zhuanlan.zhihu.com/p/1931780102540211448) 手写softmax kernel，回头看推理框架就秒懂

• [最详细的Triton基础教程第三课：FlashAttention](https://zhuanlan.zhihu.com/p/1951322029157519500) 用Triton手写FlashAttention，融会贯通

• [Triton写算子：Flash Attention v2（入门版）](https://zhuanlan.zhihu.com/p/17790319806) 从原理到Triton实现的完整教程

## 阶段 7｜Sampling 与输出（半天）

理解 Gumbel-Max trick 采样原理和输出循环。

• [Gumbel-Softmax Trick（通俗理解）](https://zhuanlan.zhihu.com/p/633431594) 直观解释 gumbel sample 的核心思想

• [Gumbel-Softmax Trick](https://zhuanlan.zhihu.com/p/144140006) 数学推导+代码实现，彻底理解采样原理

• [重参数化技巧（Gumbel-Softmax）](https://zhuanlan.zhihu.com/p/561328468) 从重参数化角度理解采样的可导性

## 阶段 8｜[性能优化](https://zhida.zhihu.com/search?content_id=273909145&content_type=Article&match_order=1&q=性能优化&zhida_source=entity)三板斜（2 天）

覆盖 CUDA Graph、torch.compile 和[异步数据](https://zhida.zhihu.com/search?content_id=273909145&content_type=Article&match_order=1&q=异步数据&zhida_source=entity)搬运三大优化手段。

## 8.1 CUDA Graph

• [浅谈CUDA Graph在LLM推理中的应用](https://zhuanlan.zhihu.com/p/715863693) 结合vLLM解释为什么只对decode用CUDA Graph

• [CUDA Graph在大模型推理中的应用](https://zhuanlan.zhihu.com/p/1999478323806491516) 从kernel launch开销到Graph录制回放的完整解释

• [CUDA Graph 学习笔记](https://zhuanlan.zhihu.com/p/1989300687725688824) 结合LLM推理场景的学习笔记

• [算子层优化：释放GPU算力的关键技术](https://zhuanlan.zhihu.com/p/1967302801286738283) 含CUDA Graph和[算子融合](https://zhida.zhihu.com/search?content_id=273909145&content_type=Article&match_order=1&q=算子融合&zhida_source=entity)的综合解读

## 8.2 torch.compile 与算子融合

• [torch.compile 使用指南](https://zhuanlan.zhihu.com/p/620163218) 了解element-wise操作fuse成fused kernel的原理

• [LLM 推理加速的全流程梳理](https://zhuanlan.zhihu.com/p/2004953637508642260) 从Torch.compile到Triton的全流程优化梳理

## 8.3 异步数据搬运

• [详解PyTorch里的pin_memory和non_blocking](https://zhuanlan.zhihu.com/p/477870660) 从device角度解释异步数据传输的原理

• [通过pin_memory优化PyTorch数据加载和传输](https://zhuanlan.zhihu.com/p/5869827283) 实战向导，含性能对比

## 阶段 9｜张量并行 Tensor Parallelism（2 天）

理解大模型多卡推理的核心能力：ColumnParallel、RowParallel、NCCL 通信。

## 9.1 张量并行原理

• [图解大模型训练之：张量模型并行(TP)，Megatron-LM](https://zhuanlan.zhihu.com/p/622212228) 图解系列精品，Column/[Row Parallel](https://zhida.zhihu.com/search?content_id=273909145&content_type=Article&match_order=1&q=Row+Parallel&zhida_source=entity)的最直观解释

• [大模型训练工程（二）张量并行](https://zhuanlan.zhihu.com/p/20053129328) 从分割策略到通信模式的完整讲解

• [大模型效率工程（四）：张量并行训练及其优化详解](https://zhuanlan.zhihu.com/p/707623638) 含forward/backward的通信模式分析

• [万字解析张量并行、流水线并行、序列并行](https://zhuanlan.zhihu.com/p/1898828998898853670) 一篇文章搞定三种并行策略

## 9.2 NCCL 多 GPU 通信

• [NCCL及其原语(all_reduce等)](https://zhuanlan.zhihu.com/p/1980067178658149155) all-reduce、[all-gather](https://zhida.zhihu.com/search?content_id=273909145&content_type=Article&match_order=1&q=all-gather&zhida_source=entity)等通信原语详解

• [一文讲清NCCL集合通信原理与优化](https://zhuanlan.zhihu.com/p/720502061) 从Ring到Tree拓扑的通信算法

• [NCCL性能解析（一）节点内性能分析](https://zhuanlan.zhihu.com/p/584500146) 结合实际硬件的性能分析

## 阶段 10｜对比真 vLLM、扩展能力（持续）

理解 nano-vllm 的简化之处，学习真 vLLM 源码和相关论文，并通过练手项目巩固理解。

## 10.1 vLLM 源码深入解读

• [vLLM源码解析系列1：多进程架构与离线批处理实现详解](https://zhuanlan.zhihu.com/p/1937978035992245539) 深入v1的多进程架构和ZeroMQ[消息队列](https://zhida.zhihu.com/search?content_id=273909145&content_type=Article&match_order=1&q=消息队列&zhida_source=entity)

• [vllm架构及源码系列](https://zhuanlan.zhihu.com/p/27885591141) 系统性的vLLM源码解读系列

• [Vllm源码学习-第1篇 Python业务层开篇](https://zhuanlan.zhihu.com/p/2009964803276420196) 从Python业务层切入的源码学习

## 10.2 FlashAttention 论文

• [FlashAttention笔记](https://zhuanlan.zhihu.com/p/12107755947) 梳理FlashAttention从v1到v3的发展过程

• [FlashAttention 2代码分析：Triton与CuTile实现](https://zhuanlan.zhihu.com/p/2014101400808862224) Triton和CuTile两种实现的对比分析

## 10.3 Speculative Decoding 投机解码

• [投机解码（Speculative Decoding）详解](https://zhuanlan.zhihu.com/p/15575453436) 核心思想：draft模型生成+大模型验证

• [Speculative Decoding推测解码方案详解](https://zhuanlan.zhihu.com/p/1920447613800547342) 丰富的投机解码方案总结

• [【LLM推理加速】投机解码Speculative Decoding](https://zhuanlan.zhihu.com/p/1975325118000564111) 通俗易懂的原理解释

## 10.4 Triton 深入学习

• [CUDA与Triton入门：从GPU编程基础到PyTorch实践](https://zhuanlan.zhihu.com/p/1958479057554509835) 从零开始的完整学习路线

• [Triton入门教程：安装与编写和运行简单Triton内核](https://zhuanlan.zhihu.com/p/1895776568367894849) 实操向导，从安装到运行第一个kernel