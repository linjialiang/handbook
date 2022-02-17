# 系统配置

刚刚安装成功的 Debian 系统是非常干净的，我们需要对其进行适当的配置，并且添加一些常用软件包。

本次测试环境为 WMware 虚拟机，配置如下：

```text
OS: Debian GNU/Linux 11 (bullseye) x86_64
Host: VMware Virtual Platform None
Kernel: 5.10.0-9-amd64
Uptime: 3 mins
Packages: 331 (dpkg)
Shell: bash 5.1.4
Resolution: preferred
Terminal: /dev/pts/0
CPU: Intel i3-9100F (2) @ 3.599GHz
GPU: 00:0f.0 VMware SVGA II Adapter
Memory: 107MiB / 3900MiB
```

## 连接终端

使用本地 xshell 链接终端，在后续工作更加方便

1. 虚拟电脑开启桥接模式

2. 修改 sshd 配置文件

    ```sh
    $ cp /etc/ssh/sshd_config{,.bak}
    $ vi /etc/ssh/sshd_config
    ```

    ssh 允许 Root 用户登录登录：

    ```sh
    # PermitRootLogin prohibit-password
    PermitRootLogin yes
    ```

## 配置网络

联网是非常重要的一件事情，除非特别要求，否则都应该尽可能先让网络顺畅

作为本地开发环境，对安全性要求不高，直接使用桥接联网模式，简单又更接近服务器的网络配置

## 查看网卡信息

虚拟机移动到其它电脑后，网卡信息有可能发生改变，我们可以使用这个指令查看：

```sh
# TODO 该指令似乎不正确
$ ip addr
```

### 网络相关配置文件

-   配置 ip 地址: /etc/network/interfaces
-   配置 dns: /etc/resolv.conf

### 配置 ip 地址

这里需要配置为静态地址

```sh
$ cp /etc/network/interfaces{,.bak}
$ vi /etc/network/interfaces
```

1. 配置静态地址：

    ```sh
    # This file describes the network interfaces available on your system
    # and how to activate them. For more information, see interfaces(5).

    source /etc/network/interfaces.d/*

    # The loopback network interface
    auto lo
    iface lo inet loopback

    # The primary network interface
    allow-hotplug ens33
    iface ens33 inet static
        address 192.168.10.254
        netmask 255.255.255.0
        gateway 192.168.10.1
    ```

2. 配置动态地址(默认就是这个)：

    ```sh
    # This file describes the network interfaces available on your system
    # and how to activate them. For more information, see interfaces(5).

    source /etc/network/interfaces.d/*

    # The loopback network interface
    auto lo
    iface lo inet loopback

    # The primary network interface
    allow-hotplug ens33
    iface ens33 inet dhcp
    ```

### 配置 DNS

```sh
$ cp /etc/resolv.conf{,.bak}
$ vi /etc/resolv.conf
```

案例如下：

```sh
# 默认即可
domain lan
search lan
nameserver 192.168.10.1
```

重启虚拟主机，以完成重新配置网络（虚拟主机重启更加方便）

## 修改镜像源

更换镜像源地址

```sh
$ cp /etc/apt/sources.list{,.bak}
$ vi /etc/apt/sources.list
```

中科大镜像-完整版

```sh
deb http://mirrors.ustc.edu.cn/debian/ bullseye main contrib non-free
deb-src http://mirrors.ustc.edu.cn/debian/ bullseye main contrib non-free

deb http://mirrors.ustc.edu.cn/debian/ bullseye-updates main contrib non-free
deb-src http://mirrors.ustc.edu.cn/debian/ bullseye-updates main contrib non-free

deb http://mirrors.ustc.edu.cn/debian/ bullseye-backports main contrib non-free
deb-src http://mirrors.ustc.edu.cn/debian/ bullseye-backports main contrib non-free

deb http://mirrors.ustc.edu.cn/debian-security/ bullseye-security main contrib non-free
deb-src http://mirrors.ustc.edu.cn/debian-security/ bullseye-security main contrib non-free
```

中科大镜像-main 版

```sh
deb http://mirrors.ustc.edu.cn/debian/ bullseye main
deb-src http://mirrors.ustc.edu.cn/debian/ bullseye main

deb http://mirrors.ustc.edu.cn/debian/ bullseye-updates main
deb-src http://mirrors.ustc.edu.cn/debian/ bullseye-updates main

deb http://mirrors.ustc.edu.cn/debian/ bullseye-backports main
deb-src http://mirrors.ustc.edu.cn/debian/ bullseye-backports main

deb http://mirrors.ustc.edu.cn/debian-security/ bullseye-security main
deb-src http://mirrors.ustc.edu.cn/debian-security/ bullseye-security main
```

更新软件包

```sh
$ apt update
$ apt upgrade
```

## 设置中文环境

汉语比英文好的同胞，可以设置成中文环境 `zh_CN.UTF-8`

```sh
# 检查是否安装 locales
$ apt list --installed locales
# 未安装，则需要先安装
$ apt install locales

$ dpkg-reconfigure locales
```

## 设置时区

tzdata 可以设置时区

选项中文： `亚洲 > 上海` 选项英文： `Asia > Shanghai`

```sh
$ dpkg-reconfigure tzdata
```

## 安装几个实用扩展

```sh
$ apt install lrzsz tar gzip bzip2 curl wget neofetch zip unzip -y
```

1. lrzsz -- 传输工具
2. curl -- 传输工具
3. wget -- 传输工具
4. tar -- 打包工具
5. gzip -- 压缩工具
6. bzip2 -- 压缩工具
7. neofetch -- 系统信息工具
8. zip -- 压缩工具（composer 会用到）
9. unizp -- 解压工具（composer 会用到）

## 安装 neovim

neovim 是 vi/vim 的替代品，后续会有对 neovim 专门的文档来讲解

```sh
$ apt install neovim -y
```

## 安装 Git

Git 是最流行的版本控制系统，安装指令如下：

```sh
$ apt install git -y
```

全局配置 Git 指令：

```sh
$ git config --global user.name linjialiang
$ git config --global user.email linjialiang@163.com
$ git config --global color.ui true
$ git config --global color.status auto
$ git config --global color.branch auto
$ git config --global color.interactive auto
$ git config --global color.diff auto
$ git config --global core.autocrlf input
$ git config --global core.quotepath false
$ git config --global core.editor vim
$ git config --global credential.helper store
```

查看 Git 配置信息：

```sh
$ git config --list
$ git config --global --list
```

## 创建系统用户

创建 www 系统用户及用户组

这是一个在 web 开发环境中广泛使用的业务用户名

-   虚拟机开发环境

    创建正常可以登录终端的用户名，提供 samba 使用

    ```sh
    # 设置为 /bin/bash 终端，下面的美化才有效果，默认是 /bin/sh 终端
    $ useradd -c 'This is a business user name widely used in web development environments' -u 2001 -s /bin/bash -d /home/www -m -U www
    # 设置密码，用户登录
    $ passwd www
    ```

-   服务器部署环境

    创建无法登录终端的用户名，提供 vsftpd 使用

    ```sh
    $ mkdir /server/default
    $ useradd -c 'This Linux user is used to map VSFTPD virtual users' -u 2001 -s /usr/sbin/nologin -d /server/default -M -U www
    ```

### www 用处

-   用于 vsftpd : pam 验证的虚拟用户的系统映射用户
-   用于 samba : 上传文件权限用户
-   用于 php : php-fpm 用户可以绑定到 www 用户组
-   用于 nginx : nginx 用户可以绑定到 www 用户组

## 美化 bash 终端

修改用户根目录下的 .bashrc 可以美化 bash 控制台，具体如下：

```sh
$ cp ~/.bashrc{,.bak}
$ vim ~/.bashrc
```

示例：

```sh
PS1='[${debian_chroot:+($debian_chroot)}\u \W]\$ '
export LS_OPTIONS='--color=auto'
eval "`dircolors`"
alias ls='ls $LS_OPTIONS -F'
alias ll='ls $LS_OPTIONS -lF'
alias lla='ls $LS_OPTIONS -laF'
```

使用 source 更新终端界面：

```sh
$ source ~/.bashrc
```
