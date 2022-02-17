# samba

如果你的开发环境是虚拟主机或者局域网单独的电脑，选择 samba 会非常方便

## samba 价值

我们的开发环境通常是 windows，而服务器通常是 Linux，由于开发和部署系统存在差异，在实际部署时可能会遇到各种问题

而 samba 可以作为一个桥梁来解决这个问题：

1. 在局域网或虚拟机搭建 Linux 作为开发环境
2. 在 Linux 下安装 samba server
3. 配置好 samba 用户即上传权限跟 ftp 用户权限一致
4. windows 本机通过资源管理器，连接到 samba 服务器
5. windows 将共享目录映射到系统盘
6. 通过以上 5 步后，我们就可以使用本机 IDE 直接操作 Linux 上的项目了

通常 samba 和 vsftpd 只能完全正常运行一个，这是因为：

-   samba 对根目录需要写入权限
-   vsftpd 考虑安全性根目录设为不能有写入权限
-   但这不会有太大的冲突，samba 主要应用于开发环境，而 vsftpd 应用于部署环境

## 安装 samba

使用 apt 安装 samba

```sh
$ apt install samba -y
```

## samba 守护进程

samba 有三个守护进程，分别为：

1. smbd

    ```text
    - 处理文件服务
    - 处理打印服务
    - 处理授权与被授权
    ```

2. nmbd

    处理，名字解析、浏览服务

3. samba-ad-dc

    处理域控制器

## 控制 samba 单元

-   管理 smbd 守护进程

    ```sh
    $ service smbd start
    $ service smbd stop
    $ service smbd restart
    ```

-   管理 nmbd 守护进程

    ```sh
    $ service nmbd start
    $ service nmbd stop
    $ service nmbd restart
    ```

-   管理 amba-ad-dc 守护进程

    ```sh
    $ service amba-ad-dc start
    $ service amba-ad-dc stop
    $ service amba-ad-dc restart
    ```

## 管理 samba

1. 测试 samba.conf 配置文件正确性

    ```sh
    $ testparm
    ```

2. 列出当前 smbd 服务器上的连接

    ```sh
    $ smbstatus
    ```

3. 管理 samba 用户指令集

    pdbedit

    指令格式: pdbedit [选项] 用户名

    - `-a` : 添加系统用户为 smb 用户
    - `-x` : 删除 smb 用户
    - `-L` : 列出 smb 用户列表，读取 passdb.tdb 数据库文件
    - `-L -v` : 列出 smb 用户列表，并附带详细信息

    > 使用 `pdbedit -h` 查看更多相关指令

4. 管理 samba 的用户密码

    指令名称：smbpasswd

    指令格式：smbpasswd [选项] 用户名

    - `-a` : 系统用户添加为 smb 用户
    - `-d` : 禁用 smb 用户
    - `-e` : 启用 smb 用户
    - `-n` : 将指定用户的 smb 密码设置为空
    - `-x` : 将系统用户从 smb 用户列表中删除

    > 使用 `smbpasswd -h` 查看更多相关指令

    提示：smbpasswd 和 pdbedit 对应着同一个数据库，所以两者可以混合使用

## samba 配置文件

samba 虽然有多个守护进程，但是配置项都在 `/etc/samba/smb.conf` 文件里

```sh
$ cp /etc/samba/smb.conf{,.bak}
$ vim /etc/samba/smb.conf
```

### 配置文件内容分类

samba 的配置文件内容主要分为以下 3 类：

1. 全局模块： `[global]`
2. 默认共享模块： `[homes]`
3. 共享模块： `[自定义共享名]`

### 全局模块参数

全局模块参数需要掌握的参数很少，通常默认即可，具体如下：

### security

作用：设置用户认证方式

格式: security = [参数值]

默认: security = user

共有 4 个可选值：

1. user

    共享目录只能被授权的用户访问，账号和密码需要通过 pdbedit 或 smbpasswd 建立

2. domain

    将身份验证交由域控制器负责，基本用不到

3. share

    所有人都可以访问这台 samba 服务器

    samba 4.x 后删除该值

4. server

    与 user 相同，只是将身份验证交由指定的另一台 samba 服务器负责

    samba 4.x 后删除该值

### map to guest

固定格式: map to guest = bad user

参数说明：如果登陆的用户名密码错误，自动转换成 guest 登陆

### usershare allow guests

作用：是否允许 guest 登陆(匿名登陆)，其中 guest 默认映射到 nobody 系统用户

格式: usershare allow guests = [yes|no]

默认：usershare allow guests = yes

共有 2 个可选值：

1. yes : 允许匿名用户登陆
2. no : 不允许匿名用户登陆

### 全局模块组合案例：

1. 允许匿名用户登陆共享

    ```conf
    security = user
    usershare allow guests = yes
    ```

2. 允许登陆失败的用户，转成匿名用户登陆共享：

    ```conf
    security = user
    usershare allow guests = yes
    map to guest = bad user
    ```

### 默认共享模块

其它共享模块的配置文件种没有设置的参数，将自动获取该模块里的参数

具体参数见 `自定义共享模块`

### 自定义共享模块

samba 配置文件下，可以根据自己需要，配置多个共享分组，具体参数如下：

```conf
[group]                             # 该共享分组名
browseable = yes/no                 # 指定该共享是否可以浏览
create mask = 0640                  # 上传文件权限
directory mask = 0750               # 上传目录权限
comment = message                   # 该共享分组描述
path = to/path                      # 该共享分组路径
valid users = user1, user2          # 允许访问该共享的用户
write list = user1, user2, @group1  # 允许写入该共享的用户
force group = test                  # 指定上传文件的所属用户为 test
force user = test                   # 指定上传文件的所属用户组为 test
read only = yes/no                  # 指定该共享路径是否只读
admin users = user1, @group1        # 此列表的用户将映射为 系统用户 root 登陆
guest ok = yes/no                   # 指定该共享是否允许 guest 账户访问
invalid users = user1, user2        # 禁止访问该共享的用户
```

> 提示：`writable` 和 `read only` 不能同时设置成 `yes`！

-   参考模版 1：

    www 用户登录，上传文件所属用户为 www

    ```sh
    [www]
        browseable = yes
        create mask = 0640
        directory mask = 0750
        comment = "sites root dir"
        path = /server/www
        valid users = www
        write list = www
        force group = www
        force user = www
    ```

-   参考模板 2:

    www 用户登录，上传文件所属用户为 root

    ```sh
    [default]
        browseable = yes
        create mask = 0644
        directory mask = 0755
        comment = "sites default dir"
        path = /server/default
        valid users = www
        write list = www
        force group = root
        force user = root
        admin users = www
    [sites]
        browseable = yes
        create mask = 0644
        directory mask = 0755
        comment = "nginx sites config dir"
        path = /server/sites
        valid users = www
        write list = www
        force group = root
        force user = root
        admin users = www
    ```

### 共享目录权限说明

-   浏览文件 : 登陆用户必须有读权限
-   下载文件 : 登陆用户必须有读权限
-   上传文件 : 登陆用户必须有写权限
-   修改文件 : 登陆用户必须有写权限

> 提示：samba 配置文件设定的权限和 linux 系统设置的权限必须同时具备，才能拥有对应操作权限！

## 创建 samba 用户

推荐使用 pdbedit 将系统用户映射到 samba 用户列表中

推荐使用 smbpasswd 来对 samba 用户列表中的用户修改密码

普通用户掌握 pdbedit 和 smbpasswd 其中一个，就能配置 samba

1. 创建 Linux 系统用户

    ```sh
    $ groupadd test
    $ useradd -c 'this is samba user' -u 3001 -M -g test test
    ```

2. 将 Linux 用户变成 smb 用户

    ```sh
    $ pdbedit -a test
    # 或者
    $ pdbedit -a -u test
    ```

3. 删除 smb 用户

    ```sh
    $ pdbedit -x test
    ```

4. 查看 smb 用户

    ```sh
    $ pdbedit -L
    # 或者
    $ pdbedit -Lv
    ```

5. 修改 smb 用户密码

    ```sh
    # smbpasswd 用户名
    $ smbpasswd test
    ```

## windows 下切换已登录的共享资源

1. 打开 `运行` -> 输入 `cmd` -> 按回车 -> 输入 `net use \* /del /y`

2. 输入 `win+e` 打开资源管理器 -> 在任务管理器中重启资源管理器

3. 打开 `运行` -> 输入 `\\192.168.10.251` -> 之后就会提示重新登陆账号密码

4. 如果是选择了记住凭据，还需要去控制面板修改密码：

    ```sh
    -- 控制面板 -> 所有控制面板项 -> 凭据管理器 -> Windows 凭据
    -- 找到该凭据， 一般带有后面中括号里的字样 【\\192.168.10.251】
    -- 可以直接删除掉，也可以选择修改账户密码
    -- 最后，重启资源管理器
    ```

## 利用 samba 实现局域网开发注意事项

1. 将 samba 用户及用户组设置为 www
2. 将 /server/www 目录设置为 smb 家目录
3. 将系统用户 www 设为 /bin/bash 方式登陆，方便 composer 操作
4. /server/www 目录权限设为 750（vsftpd 会无法正常登录该目录）
5. 直接将服务器上的项目加入到编辑器上，即可实现局域网开发

案例如下：

```sh
$ mkdir -p /server/www /server/default /server/sites
$ usermod -s /bin/bash www
$ chown www:www /server/www
$ chmod 750 /server/www
$ chown root:root /server/default /server/sites
$ chmod 755 /server/default
```
