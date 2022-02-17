# PHP 5.6 篇

由于业务需要，服务器需要安装 php5.6.40 版本，以适用于老项目中

## 测试环境

```sh
       _,met$$$$$gg.          root@xxx
    ,g$$$$$$$$$$$$$$$P.       ----------------------------
  ,g$$P"     """Y$$.".        OS: Debian GNU/Linux 10 (buster) x86_64
 ,$$P'              `$$$.     Host: xxx
',$$P       ,ggs.     `$$b:   Kernel: 4.19.0-16-amd64
`d$$'     ,$P"'   .    $$$    Uptime: xxx days, xx hours, xx mins
 $$P      d$'     ,    $$P    Packages: xxx (dpkg)
 $$:      $$.   -    ,d$$'    Shell: bash 5.0.3
 $$;      Y$b._   _,d$P'      Terminal: /dev/pts/1
 Y$$.    `.`"Y$$$$P"'         CPU: Intel Xeon Platinum 8269CY (4) @ 2.500GHz
 `$$b      "-.__              GPU: Cirrus Logic GD 5446
  `Y$$                        Memory: 1256MiB / 16042MiB
   `Y$$.
     `$$b.
       `Y$$b.
          `"Y$b._
              `"""
```

## 编译指令

```sh
$ mkdir /package/php-5.6.40/build_php
$ mkdir /server/php5.6
$ cd /package/php-5.6.40/build_php/
```

```sh
$ ../configure --prefix=/server/php5.6 \
--enable-fpm \
--with-fpm-user=php-fpm \
--with-fpm-group=php-fpm \
--enable-mbstring \
--enable-mysqlnd \
--with-mysql-sock=/run/mysqld/mysqld.sock \
--with-mysqli=mysqlnd \
--with-pdo-mysql=mysqlnd
```

```sh
$ nohup make -j4 &
$ make test
$ make install
```

## 配置 php.ini

php.ini 是 php 的配置文件，具体信息请查看 [官方手册](https://www.php.net/manual/zh/ini.php)

### 模板

php 编译完成后，在源码包根目录下会生成两个 php.ini 模版文件

1. 开发环境推荐: php.ini-development
2. 部署环境推荐: php.ini-production

### 路径

下面两个指令，可以快速获取到配置文件存放路径：

```sh
# 使用 php-config 程序
$ /server/php5.6/bin/php --ini

# 使用 php 程序
$ /server/php5.6/bin/php-config --ini-path
```

### 拷贝推荐文件

```sh
$ cp -p -r /package/php-5.6.40/php.ini-production /server/php5.6/lib/php.ini
```

### 开启 OPcache 扩展

OPcache 只能编译为共享扩展

-   开启方式

    在 php.ini 第 923 行，加入 opcache 扩展

    ```ini
    zend_extension=opcache
    ```

-   性能配置

    在 php.ini 第 1761 行，加入以下内容，可获得较好性能

    ```ini
    [opcache]
    opcache.memory_consumption=128
    opcache.interned_strings_buffer=8
    opcache.max_accelerated_files=4000
    opcache.revalidate_freq=60
    opcache.fast_shutdown=1
    opcache.enable_cli=1
    ```

> 说明：开发环境建议不要开启 opcache 扩展，opcache 可能会导致 php 自动缓存

## 配置 php-fpm

nginx 本身只能处理静态页面，如果要处理 php 脚本，就必须借助类似 php-fpm 的服务

在配置方面 php-fpm 分为： `主进程配置` 、 `工作池进程配置`

### 配置文件说明

下面是 php-fpm 的主进程配置和工作池进程配置的详细说明

#### 主进程配置文件

主进程(master)配置文件，是针对整个 php-fpm 通用配置：

-   路径 : `php 根目录/etc/php-fpm.conf`
-   数量 : 1 个
-   命名 : 固定
-   需求 : 必须
-   默认 : 默认未创建
-   模板 : `php 根目录/etc/php-fpm.conf.default`

#### 工作池进程配置文件

工作池进程(pool)配置文件，是针对单个工作进程的配置文件：

-   路径 : `php 根目录/etc/php-fpm.d/*.conf`
-   数量 : 若干个
-   命名 : 自定义
-   需求 : 至少 1 个
-   默认 : 默认未创建
-   模板 : `php 根目录/etc/php-fpm.d/www.conf.default`

### php-fpm 配置范例

php-fpm 详细参考范例如下：

-   主配置文件参考

    路径: /server/php5.6/etc/php-fpm.conf

    ```sh
    pid = /server/run/php/phpfpm-5.6.pid
    error_log = /server/logs/php/phpfpm-5.6.log
    include=/server/php5.6/etc/php-fpm.d/*.conf
    ```

-   工作池进程配置文件参考

    路径: /server/php5.6/etc/php-fpm.d/\*.conf

    ```sh
    [default]
    user                    = php-fpm
    group                   = php-fpm

    listen                  = /server/run/php/phpfpm-5.6.sock
    listen.backlog          = -1
    listen.owner            = nginx
    listen.group            = nginx
    listen.mode             = 0660
    listen.allowed_clients  = 127.0.0.1

    pm                      = static
    pm.max_children         = 50
    pm.max_requests         = 1000
    ```

## Systemd 管理

php-fpm 自带了一套比较完善的进程管理指令，编译完成后还会在构建目录下生成 Unit 文件

在 php 多版本共存的环境，我们需要自己去为每个 php 版本配置 Unit 文件

### 创建单元文件

```sh
$ vim /usr/lib/systemd/system/phpfpm-5.6.service
```

> 输入 php 5.6 Unit 文件参考中的内容

```sh
# /usr/lib/systemd/system/phpfpm-5.6.service
[Unit]
Description=The PHP 5.6 FastCGI Process Manager
After=network.target

[Service]
Type=simple
PIDFile=/server/run/php/phpfpm-5.6.pid
ExecStart=/server/php5.6/sbin/php-fpm --nodaemonize --fpm-config /server/php5.6/etc/php-fpm.conf
ExecReload=/bin/kill -USR2 $MAINPID
PrivateTmp=true
ProtectSystem=full
PrivateDevices=true
ProtectKernelModules=true
ProtectKernelTunables=true
ProtectControlGroups=true
RestrictRealtime=true
RestrictAddressFamilies=AF_INET AF_INET6 AF_NETLINK AF_UNIX
RestrictNamespaces=true

[Install]
WantedBy=multi-user.target
```

### 单元文件加入开机启动

```sh
$ systemctl enable phpfpm-5.6
```

### 重新加载 Systemd 配置文件

```sh
$ systemctl daemon-reload
```
