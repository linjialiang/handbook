# zsh 终端

推荐使用 zsh 终端替代 bash

## 安装 zsh

```sh
$ apt install zsh -y
```

## 终端切换

1. bash 切换到 zsh

    ```sh
    $ zsh
    ```

2. zsh 切换到 bash

    ```sh
    $ bash
    ```

## 默认启用 zsh

这里推荐单独为用户指定 zsh 为默认终端

1. 查看 shell 列表

```sh
$ cat /etc/shells
/bin/sh
/bin/bash
/usr/bin/bash
/bin/rbash
/usr/bin/rbash
/bin/dash
/usr/bin/dash
/bin/zsh
/usr/bin/zsh
```

```sh
$ usermod -s /bin/zsh www
$ usermod -s /bin/zsh root
```

接下我们使用 ohmyzsh 让 zsh 配置变得简单、美观

## 安装 ohmyzsh

安装基础包前，需要先登录对应用户，如：

-   www 用户

    ```sh
    $ su www
    $ cd ~
    ```

-   root 用户

    ```sh
    $ su root
    $ cd ~
    ```

#### 自动安装

-   curl 方式

    ```sh
    $ sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
    ```

-   wget 方式

    ```sh
    $ sh -c "$(wget https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh -O -)"
    ```

#### 手动安装

如果你无法下载上述 install.sh 安装脚本，可以选择手动安装

1. 获取安装脚本

    拉取 ohmyzsh 官方仓库到用户根目录

    ```sh
    $ git clone https://github.com/ohmyzsh/ohmyzsh.git ohmyzsh
    ```

2. 执行安装脚本

    ohmyzsh 官方仓库自带安装脚本

    ```sh
    $ cd /root/ohmyzsh/tools
    $ chmod u+x install.sh
    $ sh install.sh
    ```

    其它用户安装

    ```sh
    $ cp /root/ohmyzsh/tools/install.sh /home/www/
    $ cd /home/www/
    $ chown www:www install.sh
    $ chmod u+x install.sh
    # 必须切换用户，最佳方式是使用www用户登录
    $ su www
    $ sh install.sh
    ```

3. 删除多余仓库

    ohmyzsh 安装完成后，ohmyzsh 项目就没用了，可以直接删除

    ```sh
    $ cd /root/
    $ rm -rf ohmyzsh
    ```

### 添加插件

oh-my-zsh 默认只开启 git 插件支持，这里增加 3 个插件

#### apt 安装插件

apt 安装的是全局插件

```sh
$ apt install autojump zsh-syntax-highlighting zsh-autosuggestions -y
```

#### 绑定插件

在不同用户 `~/.zshrc` 配置文件中，引入同样的语句，即可绑定插件

```sh
$ vim ~/.zshrc
```

-   autojump

    ```.zshrc
    ...
    . /usr/share/autojump/autojump.sh
    ```

-   zsh-autosuggestions

    ```.zshrc
    ...
    . /usr/share/zsh-autosuggestions/zsh-autosuggestions.zsh
    ```

-   zsh-syntax-highlighting

    ```.zshrc
    ...
    . /usr/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
    ```

#### 提示

网上很多都是要在 plugins 参数里加入插件名称，apt 安装的全局插件这样是无法正常调用

这种方式仅针对将插件源码安装在用户的 `~/.oh-my-zsh/custom/plugins/` 目录下

```.zshrc
...
plugins=(
    git
    autojump
    zsh-autosuggestions
    zsh-syntax-highlighting
)
...
```

### 安装状态插件（终端版）

只需要在宿主机上安装了 [Nerd Fonts](https://www.nerdfonts.com/) 系列的 [MesloLGM NF](https://github.com/ryanoasis/nerd-fonts/releases/download/v2.1.0/Meslo.zip) 字体，并在 xshell 上使用该字体即可

### 安装状态插件（桌面版）

powerline 是 linux 下非常优秀的状态美化插件，这是桌面系统才需要安装的，终端不需要

```sh
$ apt install powerline
```

### 修改主题

ZSH_THEME 全局变量用于设置主题

```.zshrc
...
# ZSH_THEME="robbyrussell"
ZSH_THEME="agnoster"
...
```

## 优化主题

zsh 的主题虽然很美观，但是设置上通常都按作者的意愿来的，我们需要稍微调整下。

下面是针对 agnoster 主题的调整（最近喜欢 `robbyrussell` 主题）

> 说明： oh-my-zsh 推荐使用 `robbyrussell`， 而 oh-my-posh 则推荐使用 `agnoster`

### 配置文件路径

-   agnoster 主题配置文件

    ~/.oh-my-zsh/themes/agnoster.zsh-theme

-   zsh 终端配置文件

    ~/.zshrc

-   两者关系

    被修改的是 zsh 终端配置文件，

    根据当前主题配置文件来修改 zsh 终端配置文件

### 具体修改

~/.zshrc 底部需要添加两处内容，用于覆盖主题配置文件

1. 去掉主机名

    ```sh
    # agnoster.zsh-theme 自带
    prompt_context() {
    if [[ "$USERNAME" != "$DEFAULT_USER" || -n "$SSH_CLIENT" ]]; then
        prompt_segment black default "%(!.%{%F{yellow}%}.)%n@%m"
    fi
    }
    ```

    ```sh
    # ~/.zshrc 添加
    prompt_context() {
    if [[ "$USERNAME" != "$DEFAULT_USER" || -n "$SSH_CLIENT" ]]; then
        prompt_segment black default "%(!.%{%F{yellow}%}.)%n"
    fi
    }
    ```

2. 去掉全路径

    ```sh
    # agnoster.zsh-theme 自带
    prompt_dir() {
        prompt_segment blue $CURRENT_FG '%~'
    }
    ```

    ```sh
    # ~/.zshrc 添加
    prompt_dir() {
        prompt_segment blue $CURRENT_FG '%c'
    }
    ```

## 使用 robbyrussell 主题

使用 `robbyrussell` 我们无法实时获取当前用户，这回造成一些麻烦，下面有几个解决方案：

### 自定义样式

`robbyrussell` 代码非常简单，我们可以直接不用主题，自定义 zsh 样式：

```sh
# 修改 ~/.zshrc 文件

# 备注掉 ZSH_THEME 所在行
# ZSH_THEME="robbyrussell"

# 底部增加
PROMPT="%(?:%{$fg_bold[green]%}%n ➜ :%{$fg_bold[red]%}➜ )"
PROMPT+='%{$fg[cyan]%}%c%{$reset_color%} $(git_prompt_info)'

ZSH_THEME_GIT_PROMPT_PREFIX="%{$fg_bold[blue]%}git:(%{$fg[red]%}"
ZSH_THEME_GIT_PROMPT_SUFFIX="%{$reset_color%} "
ZSH_THEME_GIT_PROMPT_DIRTY="%{$fg[blue]%}) %{$fg[yellow]%}✗"
ZSH_THEME_GIT_PROMPT_CLEAN="%{$fg[blue]%})"
```
