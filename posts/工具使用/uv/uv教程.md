# 一、理解UV

你以前可能是这样理解 Python：

```text
Python
  ↓
pip 安装包
  ↓
venv 创建环境
```

而用了 uv 后，可以理解为：

```text
                 uv
        ┌────────┼─────────┐
        ↓        ↓         ↓
     Python    虚拟环境    Python 包
    版本管理    .venv      torch/numpy
        │        │         │
        └────────┼─────────┘
                 ↓
             Python 项目
                 ↓
          pyproject.toml
                 ↓
              uv.lock
                 ↓
             uv run xxx
```

也就是说，**uv 把以前零散的几件事统一起来了。**

你作为新手，实际上只需要理解下面 **5 个东西**：

```text
Python
.venv
pyproject.toml
uv.lock
uv run
```

理解了这五个，uv 基本就懂了。

------

# 二、第一件事：`.venv` 是什么？

假设你有两个项目：

```text
项目A：
torch 2.x
numpy 2.x

项目B：
torch 1.x
numpy 1.x
```

如果所有东西都装进系统 Python：

```text
C:\Python\
```

很容易互相打架。

所以我们给每个项目一个独立环境：

```text
projectA/
    .venv/
    train.py

projectB/
    .venv/
    main.py
```

`.venv` 本质上就是这个项目自己的.py环境，里面有：

```text
Python解释器
+
这个项目安装的各种包
```

uv 默认就很强调虚拟环境隔离；使用 `uv pip` 时，默认要求你在虚拟环境中工作。([Astral 文档](https://docs.astral.sh/uv/pip/environments/))

在项目内手动创建虚拟环境：

```bash
uv venv
```

于是：

```text
project/
├── .venv/
├── main.py
└── ...
```

也可以指定 Python：

```bash
uv venv --python 3.12
```

如果本机没有符合要求的 Python，uv 可以自动下载。

------

# 三、第二件事：uv 甚至可以管理 Python 本身

这是很多介绍 uv 的文章没讲清楚的地方。

以前你可能会：

```text
官网下载 Python 3.10
官网下载 Python 3.11
官网下载 Python 3.12

然后配置 PATH
然后搞环境
```

现在可以：

```bash
uv python install 3.12
```

查看：

```bash
uv python list
```

甚至：

```bash
uv python install 3.11 3.12
```

同时安装多个版本。uv 也会自动发现你电脑上已经存在的 Python。([Astral 文档](https://docs.astral.sh/uv/guides/install-python/))

所以可以把：

```text
pyenv
+
venv
+
pip
```

很多常见职责都交给 uv。

------

# 四、第三件事：`pyproject.toml` 是什么？

这个是你真正应该学会的。

假设你项目需要：

```text
torch
numpy
wandb
tqdm
```

以前是：`requirements.txt`，但是现在现代 Python 项目越来越常见的是：`pyproject.toml`

里面可能长这样：

```toml
[project]
name = "my-project"
version = "0.1.0"
requires-python = ">=3.11"

dependencies = [
    "torch",
    "numpy",
    "wandb",
    "tqdm",
]
```

它相当于告诉别人：

> **“我的项目需要这些东西。”**

uv 项目就是围绕 `pyproject.toml` 来管理依赖的。

------

# 五、所以为什么更推荐 `uv add`，而不是 `uv pip install`？

这是你以后最容易搞混的地方。

比如：

```bash
uv pip install numpy
```

意思更接近：

> 把 numpy 安装进当前虚拟环境。

和：

```bash
pip install numpy
```

思维非常接近。

但是：

```bash
uv add numpy
```

意思是：

> **“我的项目正式依赖 numpy。”**

它会同时做几件事：

```text
pyproject.toml
      ↓
加入 numpy
      ↓
重新解析依赖
      ↓
更新 uv.lock
      ↓
同步 .venv
```

这是官方推荐的项目工作流；`uv add` 会修改 `pyproject.toml`，同时更新 lockfile 和项目环境。([Astral 文档](https://docs.astral.sh/uv/guides/projects/))

所以你以后可以记一个非常简单的规则：

> **自己维护的新项目：优先 `uv add`。**

例如：

```bash
uv add numpy
uv add torch
uv add wandb
```

而不是一直：

```bash
uv pip install ...
```

------

# 六、第四件事：`uv.lock` 是什么？

这是 uv 很重要的东西。

假设 `pyproject.toml` 写：

```toml
numpy >= 2.0
```

这只是说：

```text
2.0 可以
2.1 可以
2.2 可以
2.3 也可能可以
```

但问题来了：

你电脑安装：

```text
numpy 2.2.6
```

你同学一个月以后安装：

```text
numpy 2.3.1
```

可能：

```text
你能跑
同学不能跑
```

所以需要：

```text
uv.lock
```

里面记录实际解析出的**精确依赖版本和依赖关系**。

简单理解：

```text
pyproject.toml

numpy >= 2.0
torch >= 2.0

        ↓ uv解析

uv.lock

numpy = 某个确定版本
torch = 某个确定版本
依赖A = 某版本
依赖B = 某版本
...
```

官方把 `uv.lock` 定义为跨平台的 lockfile；通常应该提交 Git，让团队和部署环境得到一致、可复现的依赖解析。([Astral 文档](https://docs.astral.sh/uv/concepts/projects/layout/))

所以：

```text
pyproject.toml
```

回答：

> **我需要什么？**

而：

```text
uv.lock
```

回答：

> **最后具体用了什么版本？**

这是一个非常重要的区别。

------

# 七、第五件事：`uv run` 到底干了什么？

这个对你尤其重要。

例如：

```bash
uv run python train.py
```

不要简单理解成：

> “在 python 前面加了个 uv。”

它实际是：

```text
检查 pyproject.toml
        ↓
检查 uv.lock 是否匹配
        ↓
检查 .venv 是否同步
        ↓
必要时同步依赖
        ↓
在项目环境里
运行 python train.py
```

官方明确说明，每次 `uv run` 前，uv 会检查 lockfile 和项目环境，使程序运行在项目所要求的锁定依赖环境中。([Astral 文档](https://docs.astral.sh/uv/guides/projects/))

所以你经常写：

```bash
uv run python main_train.py
```

实际上是一个非常标准的 uv 用法。([Astral 文档](https://docs.astral.sh/uv/guides/projects/))

而且这有个好处：

**你通常甚至不用手动 activate。**

传统：

```bash
source .venv/bin/activate
python train.py
```

uv：

```bash
uv run python train.py
```

就行。

------

# 八、`uv sync` 又是什么？

假设你从 GitHub clone 一个项目：

```bash
git clone xxx
cd xxx
```

项目里面：

```text
pyproject.toml
uv.lock
```

但是你电脑没有 `.venv`。

执行：

```bash
uv sync
```

uv 就会：

```text
读取 uv.lock
      ↓
创建/更新 .venv
      ↓
安装需要的依赖
      ↓
让你的环境和项目保持一致
```

官方把这个过程叫做 **syncing**：按照 lockfile 把包安装进项目环境。([Astral 文档](https://docs.astral.sh/uv/concepts/projects/sync/))

所以可以简单理解：

```text
uv lock
    ↓
“决定装什么”

uv sync
    ↓
“真的装进去”
```

不过日常使用时很多情况下你甚至不需要手动 `uv lock` 和 `uv sync`，因为 `uv add`、`uv run` 等项目命令会自动完成相应的锁定/同步工作。([Astral 文档](https://docs.astral.sh/uv/concepts/projects/sync/))

------

# 九、那 `uv pip` 又是干嘛的？

uv 有两套你容易混淆的使用方式。

### 老式 / pip 兼容模式

```bash
uv venv

uv pip install numpy
uv pip install torch

uv pip list
uv pip uninstall numpy
```

基本可以理解成：

```text
pip
↓
uv pip
```

官方也把 `uv pip` 称为 pip-compatible interface，主要面向熟悉 `pip` / `pip-tools` 的用户和老项目。([Astral 文档](https://docs.astral.sh/uv/pip/?utm_source=chatgpt.com))

### 现代项目模式

更推荐你逐渐习惯：

```bash
uv init

uv add numpy
uv add torch

uv run python train.py
```

对应：

```text
pyproject.toml
+
uv.lock
+
.venv
```

**这才是我更建议你重点掌握的 uv 用法。**

------

# 十、你只需要背这 10 个命令

作为小白，现在掌握这些就足够了：

| 目的         | 命令                     |
| ------------ | ------------------------ |
| 查看 uv      | `uv --version`           |
| 查看 Python  | `uv python list`         |
| 安装 Python  | `uv python install 3.12` |
| 初始化项目   | `uv init`                |
| 创建虚拟环境 | `uv venv`                |
| 添加依赖     | `uv add numpy`           |
| 删除依赖     | `uv remove numpy`        |
| 同步环境     | `uv sync`                |
| 运行程序     | `uv run python main.py`  |
| 查看依赖树   | `uv tree`                |

其中真正天天用的可能只有：

```bash
uv add
uv remove
uv sync
uv run
```

这些正是 uv 官方项目接口的核心命令。([Astral 文档](https://docs.astral.sh/uv/getting-started/features/?utm_source=chatgpt.com))

------

# 十一、一个完整例子，你一看就懂

假设你今天要创建一个机器学习实验。

### ① 创建项目

```bash
mkdir my-exp
cd my-exp

uv init
```

项目大致变成：

```text
my-exp/
├── pyproject.toml
├── .python-version
├── README.md
└── ...
```

首次运行项目命令后，还会产生 `.venv` 和 `uv.lock`。([Astral 文档](https://docs.astral.sh/uv/guides/projects/))

### ② 指定 Python

例如：

```bash
uv python install 3.12
```

或者：

```bash
uv venv --python 3.12
```

### ③ 安装依赖

```bash
uv add numpy
uv add matplotlib
uv add torch
uv add wandb
```

现在：

```text
pyproject.toml
```

已经记录这些依赖，同时 `uv.lock` 和项目环境也会被更新。([Astral 文档](https://docs.astral.sh/uv/guides/projects/))

### ④ 写代码

```python
import torch

print(torch.cuda.is_available())
```

保存：

```text
train.py
```

### ⑤ 运行

```bash
uv run python train.py
```

完事。

这基本就是你以后 80% 的 uv 工作流。

------

# 十二、那 uv、pip、venv、conda 到底是什么关系？

你可以记成这张图：

```text
                    Python 环境工具
                         │
         ┌───────────────┴────────────────┐
         │                                │
       conda                              uv
         │                                │
   Python + 非Python                 Python生态为核心
   二进制/系统依赖                  │
         │                 ┌────────┼────────┐
         │                 │        │        │
      conda env          Python   .venv   Python包
                         管理             管理
                                          │
                                     类似 pip
```

传统组合：

```text
Python
+
venv
+
pip
+
requirements.txt
```

现代 uv：

```text
uv
+
pyproject.toml
+
uv.lock
```

------

# 十三、你贴的资料里，有几个地方要纠正

最重要的是下面几个。

### ① “uv 使用 libsolv”

**不对。**

现在 uv 官方文档明确写的是：

> uv 使用 Rust 实现的 **PubGrub（pubgrub-rs）** 依赖解析器。

不是文章所说的 `libsolv`。([Astral 文档](https://docs.astral.sh/uv/reference/internals/resolver/))

这个你如果只是用户不用深入知道，但如果别人问：

> uv 为什么依赖解析快？

你可以回答：

```text
Rust 实现
+
PubGrub 依赖解析
+
并行获取 metadata
+
积极缓存
```

uv 也会积极缓存已经下载或构建过的依赖，以减少重复下载和构建。([Astral 文档](https://docs.astral.sh/uv/concepts/cache/))

------

### ② “uv 不能搞 PyTorch / CUDA”

这个说法**现在已经明显过时**。

2026 年的 uv 官方文档已经专门支持 PyTorch 项目，可以控制 CPU/CUDA 等 accelerator，并配置 PyTorch 的专用 package index。([Astral 文档](https://docs.astral.sh/uv/guides/integration/pytorch/))

所以现在更准确的说法应该是：

```text
PyTorch Python 项目
        ↓
uv 完全可以管理

但是

CUDA Driver
系统库
ffmpeg
gcc
系统级依赖
        ↓
uv 不是完整的系统包管理器
```

也就是说：

> **uv 可以很好地管理“Python 世界里的深度学习项目”，但它并不因此变成 conda/apt 那样的通用系统二进制包管理器。**

------

### ③ “uv 跨平台一致性很差”

这个说法也不太准确了。

`uv.lock` 本身就是一个 **universal / cross-platform lockfile**，能够记录不同 OS、架构、Python 版本对应的依赖解析。([Astral 文档](https://docs.astral.sh/uv/concepts/projects/layout/))

当然，这不代表：

```text
Windows上的任何包
↓
Linux 100% 都能运行
```

底层包本身有没有对应平台的 wheel/构建依然是另一回事。

但说 uv “没有跨平台锁定能力”，已经不符合现在的 uv。

------

# 十四、所以 uv 和 conda，到底该怎么选？

对你这种 Python / 大模型实验用户，我建议思维不要变成：

```text
uv VS conda

必须选一个
```

而是：

```text
这个项目 uv 能解决吗？
        │
        ├─ 能 → uv
        │
        └─ 涉及复杂系统级依赖 → 再考虑 conda
```

例如普通：

```text
PyTorch
Transformers
Datasets
WandB
NumPy
Pandas
FastAPI
LangChain
```

现在完全可以优先尝试：

```text
uv
```

而如果是非常复杂的：

```text
系统 CUDA toolkit
特殊 C/C++ 库
特殊科学计算二进制依赖
R/Python 混合环境
特定 conda-forge 包
```

再考虑 conda。

------

# 十五、结合你现在的项目，你应该形成这个习惯

你现在已经经常在项目里跑类似：

```bash
uv run python main_train.py \
    --train_data_path ... \
    --device cuda
```

所以你实际上**已经在用 uv 了，只是之前不知道它背后到底干了什么**。

以后看到一个 uv 项目，第一反应应该是：

```text
1. 看 pyproject.toml
   ↓
   这个项目需要什么？

2. 看 uv.lock
   ↓
   具体锁了哪些版本？

3. 看 .python-version
   ↓
   用什么 Python？

4. uv sync
   ↓
   把环境准备好

5. uv run python xxx.py
   ↓
   在正确环境运行
```

新增库，例如：

```bash
uv add transformers
```

而不是第一反应：

```bash
pip install transformers
```

------

# 最后给你一张「小白版 uv 总纲」

你把下面这段背下来，现阶段就完全够用了：

```text
uv 是一个现代 Python 包和项目管理工具。

它主要帮我做四件事：

① 管 Python
   uv python install 3.12

② 管虚拟环境
   .venv

③ 管依赖
   uv add torch
   uv remove torch

④ 管项目运行
   uv run python train.py


三个关键文件：

pyproject.toml
= 我的项目“需要什么”

uv.lock
= 最终“具体装什么版本”

.venv
= 这些东西“实际装在哪里”


最常用工作流：

git clone xxx
cd xxx

uv sync

uv run python xxx.py


自己开项目：

uv init
uv add torch numpy wandb
uv run python train.py
```

如果你只记一句话：

> **`pyproject.toml` 声明需求，`uv.lock` 锁死版本，`.venv` 存放环境，`uv run` 在这个环境里运行程序。**

把这一套彻底搞明白以后，你再看到 `uv pip`、`uv sync`、`uv lock`、`uv add`，就不会觉得它们是一堆莫名其妙的命令了。([Astral 文档](https://docs.astral.sh/uv/guides/projects/))