[CmdletBinding()]
param(
  [string]$Message = "",
  [switch]$CheckOnly
)

$ErrorActionPreference = "Stop"
[Console]::InputEncoding = [System.Text.UTF8Encoding]::new($false)
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)

function Write-Step {
  param([string]$Text)
  Write-Host ""
  Write-Host "==> $Text" -ForegroundColor Cyan
}

function Invoke-External {
  param(
    [string]$Program,
    [string[]]$Arguments
  )

  & $Program @Arguments
  if ($LASTEXITCODE -ne 0) {
    throw "命令执行失败（退出码 $LASTEXITCODE）：$Program $($Arguments -join ' ')"
  }
}

# GitHub over HTTPS can fail while rewinding a large RPC request when Git uses
# the default HTTP settings. Keep the transport options on the network calls
# so the sync script works without changing the user's global Git config.
$gitHttpOptions = @(
  "-c", "http.sslBackend=openssl",
  "-c", "http.version=HTTP/1.1",
  "-c", "http.postBuffer=524288000"
)

try {
  $repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
  Set-Location -LiteralPath $repoRoot

  if (-not (Get-Command git.exe -ErrorAction SilentlyContinue)) {
    throw "没有找到 Git，请先安装 Git for Windows。"
  }
  if (-not (Get-Command npm.cmd -ErrorAction SilentlyContinue)) {
    throw "没有找到 npm，请先安装 Node.js。"
  }
  if (-not (Test-Path -LiteralPath (Join-Path $repoRoot ".git"))) {
    throw "当前目录不是 Git 仓库：$repoRoot"
  }

  $branch = (& git.exe branch --show-current).Trim()
  if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($branch)) {
    throw "无法确定当前 Git 分支。"
  }

  $remote = (& git.exe remote get-url origin).Trim()
  if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($remote)) {
    throw "没有找到 origin 远程仓库。"
  }

  Write-Host "仓库：$repoRoot"
  Write-Host "分支：$branch"
  Write-Host "远程：$remote"

  if (-not $CheckOnly) {
    Write-Step "拉取 GitHub 最新内容"
    Invoke-External "git.exe" ($gitHttpOptions + @("pull", "--rebase", "--autostash", "origin", $branch))
  }

  if (-not (Test-Path -LiteralPath (Join-Path $repoRoot "node_modules\markdown-it"))) {
    Write-Step "安装博客构建依赖"
    Invoke-External "npm.cmd" @("ci")
  }

  Write-Step "记录文章修改时间、生成博客并执行检查"
  Invoke-External "npm.cmd" @("run", "check")

  if ($CheckOnly) {
    Write-Step "脚本检查模式完成（未提交、未推送）"
    Invoke-External "git.exe" @("status", "-sb")
    exit 0
  }

  Write-Step "暂存仓库内的全部改动"
  Invoke-External "git.exe" @("add", "-A")
  Invoke-External "git.exe" @("diff", "--cached", "--check")

  & git.exe diff --cached --quiet
  $hasStagedChanges = $LASTEXITCODE -eq 1
  if ($LASTEXITCODE -gt 1) {
    throw "无法检查待提交内容。"
  }

  if ($hasStagedChanges) {
    if ([string]::IsNullOrWhiteSpace($Message)) {
      $Message = "sync blog $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
    }
    Write-Step "创建提交：$Message"
    Invoke-External "git.exe" @("commit", "-m", $Message)
  } else {
    Write-Step "没有需要提交的新改动"
  }

  Write-Step "推送到 GitHub"
  Invoke-External "git.exe" ($gitHttpOptions + @("push", "origin", $branch))

  Write-Step "同步成功"
  Invoke-External "git.exe" @("status", "-sb")
  exit 0
} catch {
  Write-Host ""
  Write-Host "同步已停止：$($_.Exception.Message)" -ForegroundColor Red
  Write-Host "你的本地文件不会被脚本强制覆盖，请处理错误后重新运行。" -ForegroundColor Yellow
  exit 1
}
