# 使用 PowerShell

PowerShell 是一个由微软开发的终端，它开源并且非常好用，以下简称 `posh`

windows 系统下 `vscode + posh` 得到的体验也非常不错

## 安装 posh

推荐使用 [官方 MSI 包](https://github.com/PowerShell/PowerShell/releases/download/v7.2.0/PowerShell-7.2.0-win-x64.msi) 安装

安装 posh 前，建议先将 windows 自带的 `Windows PowerShell 2.0` 功能卸载掉

-   [github 地址](https://github.com/PowerShell/PowerShell/)
-   [官方中文文档](https://docs.microsoft.com/zh-cn/powershell/)

卸载 `Windows PowerShell 2.0` 步骤：

1. 控制面板
2. 所有控制面板项
3. 程序和功能
4. 启用或关闭 Windows 功能
5. 将对应的打勾，去掉即可
6. 最后重启系统

安装 posh 步骤：

1. 下载 [posh](https://github.com/PowerShell/PowerShell/releases/download/v7.2.0/PowerShell-7.2.0-win-x64.msi)
2. 双击安装
3. 最后重启系统

## 安装模块

我们需要安装模块，增强和美化 posh 功能

1. posh-git

    让 posh 支持 Git 补全

    ```bash
    $ Install-Module posh-git -Scope CurrentUser
    ```

2. [oh-my-posh](https://ohmyposh.dev/)

    类似于 oh-my-zhs，美化 posh 主题

    ```bash
    $ Install-Module oh-my-posh -Scope CurrentUser
    ```

    > 提示：部分主题需要 [nerdfonts 字体](https://github.com/ryanoasis/nerd-fonts) 支持

3. PSReadLine

    增强 posh 功能：支持依据历史进行命令补全预测以及高级的方向键历史命令搜索

    ```bash
    $ Install-Module -Name PSReadLine -AllowPrerelease -Scope CurrentUser -Force -SkipPublisherCheck
    ```

## Nerd Fonts 字体

Nerd Fonts 是一个项目，它使用大量字形（图标）修补开发人员的目标字体。

oh-my-posh 官方推荐使用 [MesloLGM NF](https://github.com/ryanoasis/nerd-fonts/releases/download/v2.1.0/Meslo.zip) 字体

其它 Nerd Fonts 字体也都能满足需求

### 步骤

-   安装字体

    字体的安装方式与其它常规字体一样： `解压 > 选择文件 > 右键 > 安装` 即可

-   设置 posh 字体

    posh 终端字体需要设置为指定的 Nerd Fonts 字体，具体步骤：

    1. 打开 posh
    2. posh 顶部 `右键`
    3. 选择 `默认值`
    4. 选择指定的 Nerd Fonts 字体，官方推荐 `MesloLGM NF`

-   设置 vscode 终端字体

    见 [vscode 配置](#vscode)

## 更新模块

posh 支持模块更新

```bash
$ Update-Module posh-git
$ Update-Module oh-my-posh
$ Update-Module PSReadLine
```

## 配置模块自动载入

posh 通过配置 `$PROFILE` 文件，实现自动加载模块

```bash
# vscode 打开$PROFILE文件
$ code $PROFILE
```

## 配置案例说明

下面以一个案例的形式简单说明下

```ini
# 以 utf-8 编码进入 posh
chcp 65001
# 载入 posh-git
Import-Module posh-git
# 载入 oh-my-posh
Import-Module oh-my-posh
# 载入 PSReadLine
Import-Module PSReadLine

# 配置 oh-my-posh 主题， 推荐 robbyrussel zash agnoster
Set-PoshPrompt -Theme robbyrussel

# 配置 PSReadLine
# 启用，依据历史进行命令补全预测
Set-PSReadLineOption -PredictionSource History
# 启用，箭头键的高级自动完成
Set-PSReadlineKeyHandler -Key UpArrow -Function HistorySearchBackward
Set-PSReadlineKeyHandler -Key DownArrow -Function HistorySearchForward
```

## 其它说明

1. 查看全部主题样式

    ```bash
    $ get-PoshThemes
    ```

2.

## vscode

将 posh 嵌入到 vscode 是我们最终目的

### 增加配置

settings.json 配置文件增加如下内容

```json
{
    "terminal.integrated.defaultProfile.windows": "PowerShell",
    "terminal.explorerKind": "external",
    "terminal.external.windowsExec": "C:\\Program Files\\PowerShell\\7\\pwsh.exe",
    "terminal.integrated.fontFamily": "'JetBrains Mono', '思源黑体 CN', 'MesloLGM NF'"
}
```
