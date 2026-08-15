# UV 精炼学习笔记

## 1. UV 是什么？

`uv` 是一个现代 Python 包与项目管理工具，可以统一处理：

- Python 版本
- 虚拟环境 `.venv`
- Python 依赖
- 项目依赖声明 `pyproject.toml`
- 依赖锁定 `uv.lock`
- 项目运行 `uv run`

可以把它理解成：

```
Python + venv + pip + 部分 pyenv / pip-tools 能力
                ↓
               uv
```

对于日常 Python 项目，最重要的是理解下面 5 个东西：

```
Python
.venv
pyproject.toml
uv.lock
uv run
```

## 2. `.venv`：项目自己的 Python 环境

不同项目可能依赖不同版本的库，例如：

```
项目 A：torch 2.x / numpy 2.x
项目 B：torch 1.x / numpy 1.x
```

如果全部装进系统 Python，很容易产生依赖冲突。

因此每个项目使用独立虚拟环境：

```
project/
├── .venv/
├── main.py
└── ...
```

`.venv` 中主要包含：

```
Python 解释器
+
当前项目安装的依赖
```

创建虚拟环境：

```
uv venv
```

指定 Python：

```
uv venv --python 3.12
```

## 3. UV 也可以管理 Python 版本

安装 Python：

```
uv python install 3.12
```

查看可用 Python：

```
uv python list
```

一次安装多个版本：

```
uv python install 3.11 3.12
```

因此很多情况下，不需要再手动去官网下载多个 Python 并配置 PATH。

## 4. `pyproject.toml`：项目“需要什么”

toml：简介，最小的语言



现代 Python 项目通常使用 `pyproject.toml` 描述项目和依赖。

例如：

```
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

翻译成中文，就是这个项目所依赖的全部python环境：

```
项目名：my-project
版本：0.1.0
要求 Python >= 3.11
依赖：torch / numpy / wandb
```

## 5. `uv add` 和 `uv pip install` 的区别

### `uv pip install`

```
uv pip install numpy
```

更接近传统：

```
pip install numpy
```

意思是：

> 把 numpy 安装进当前虚拟环境。

### `uv add`

```
uv add numpy
```

意思是：

> 把 numpy 正式加入当前项目依赖。

它会同时：

```
修改 pyproject.toml
        ↓
重新解析依赖
        ↓
更新 uv.lock
        ↓
同步 .venv
```

因此对于自己维护的新项目：

> **优先使用** `**uv add**`**。**

例如：

```
uv add numpy
uv add torch
uv add wandb
```

## 6. `uv.lock`：项目“最终具体用了什么版本”

假设：

```
numpy >= 2.0
```

不同时间安装时，可能得到不同版本。

`uv.lock` 会记录实际解析出的精确依赖版本和依赖关系，使环境更容易复现。

可以记成：

```
pyproject.toml
= 我需要什么

uv.lock
= 我最终使用了什么版本
```

通常：

> `uv.lock` **应该提交到 Git。**

## 7. `uv run`：在正确的项目环境中运行程序

常见命令：

```
uv run python train.py
```

它不只是简单地在 `python` 前加一个 `uv`，而是会检查：

```
pyproject.toml
      ↓
uv.lock
      ↓
.venv 是否同步
      ↓
必要时同步环境
      ↓
运行程序
```

因此通常不需要手动：

```
source .venv/bin/activate
```

直接：

```
uv run python train.py
```

即可。

## 8. `uv sync`：把本地环境同步成项目需要的样子

从 GitHub clone 一个项目：

```
git clone xxx
cd xxx
```

如果项目里已经有：

```
pyproject.toml
uv.lock
```

直接执行：

```
uv sync
```

UV 会创建或更新 `.venv`，并安装 lockfile 中要求的依赖。

可以简单理解：

```
uv lock
= 决定装什么

uv sync
= 真正装进去
```

不过日常使用时，`uv add`、`uv run` 等命令也会自动完成部分锁定和同步操作。

## 9. 两种 UV 使用模式

### 模式一：pip 兼容模式

```
uv venv
uv pip install numpy
uv pip install torch
uv pip list
uv pip uninstall numpy
```

可以理解为：

```
pip → uv pip
```

适合：

- 老项目
- `requirements.txt`
- 已经习惯 pip 的工作流

### 模式二：现代项目模式

更推荐新项目使用：

```
uv init
uv add numpy
uv add torch
uv run python train.py
```

核心文件：

```
pyproject.toml
uv.lock
.venv
```

## 10. 最常用命令

| 目的         | 命令                     |
| ------------ | ------------------------ |
| 查看 UV 版本 | `uv --version`           |
| 查看 Python  | `uv python list`         |
| 安装 Python  | `uv python install 3.12` |
| 初始化项目   | `uv init`                |
| 创建虚拟环境 | `uv venv`                |
| 添加依赖     | `uv add numpy`           |
| 删除依赖     | `uv remove numpy`        |
| 同步环境     | `uv sync`                |
| 运行程序     | `uv run python main.py`  |
| 查看依赖树   | `uv tree`                |

真正高频的通常只有：

```
uv add
uv remove
uv sync
uv run
```

## 11. 一个标准 UV 工作流

### 新项目

```
mkdir my-project
cd my-project

uv init
uv add torch numpy wandb
uv run python train.py
```

项目逐渐会形成：

```
my-project/
├── pyproject.toml
├── uv.lock
├── .venv/
├── .python-version
└── train.py
```

### Clone 别人的项目

```
git clone xxx
cd xxx

uv sync
uv run python main.py
```

## 12. UV、pip、venv、conda 的关系

传统 Python 项目通常是：

```
Python
+
venv
+
pip
+
requirements.txt
```

现代 UV 项目更像：

```
uv
+
pyproject.toml
+
uv.lock
```

### UV

更偏向：

- Python 项目管理
- Python 版本管理
- 虚拟环境
- Python 包依赖
- 可复现环境

### Conda

除了 Python 包，还更擅长处理：

- 系统级二进制依赖
- C/C++ 库
- 特殊科学计算库
- R / Python 混合环境
- conda-forge 生态

因此不应该简单理解成：

```
uv VS conda
只能选一个
```

而应该问：

> **这个项目仅靠 Python 生态能否解决？**

如果能：

```
优先 uv
```

如果涉及复杂系统级依赖：

```
再考虑 conda
```

## 13. PyTorch / CUDA 能不能用 UV？

可以。

普通的 Python 深度学习项目，例如：

```
PyTorch
Transformers
Datasets
NumPy
Pandas
WandB
FastAPI
LangChain
```

现在都可以优先尝试使用 UV 管理。

但要区分：

```
Python 包
→ uv 可以管理

CUDA Driver
系统库
gcc
ffmpeg
特殊 C/C++ 二进制依赖
→ uv 不是完整的系统包管理器
```

所以更准确的理解是：

> **UV 可以很好地管理 Python 世界里的深度学习项目，但不是 apt / conda 那种通用系统包管理器。**

## 14. 看到一个 UV 项目时应该先看什么？

建议形成固定习惯：

```
1. pyproject.toml
   ↓
项目需要什么？

2. uv.lock
   ↓
具体锁了哪些版本？

3. .python-version
   ↓
使用什么 Python？

4. uv sync
   ↓
准备环境

5. uv run python xxx.py
   ↓
运行项目
```

新增依赖：

```
uv add transformers
```

而不是第一反应：

```
pip install transformers
```

## 15. 最终记忆版

UV 主要帮我做四件事：

```
① 管 Python
   uv python install 3.12

② 管虚拟环境
   .venv

③ 管依赖
   uv add torch
   uv remove torch

④ 管项目运行
   uv run python train.py
```

三个关键文件 / 目录：

```
pyproject.toml
= 项目“需要什么”

uv.lock
= 最终“具体装什么版本”

.venv
= 这些东西“实际装在哪里”
```

最常用工作流：

```
git clone xxx
cd xxx

uv sync
uv run python xxx.py
```

自己创建项目：

```
uv init
uv add torch numpy wandb
uv run python train.py
```

一句话记住：

> `**pyproject.toml**` **声明需求，**`**uv.lock**` **锁定版本，**`**.venv**` **存放环境，**`**uv run**` **在这个环境里运行程序。**