# LNMP 部署环境

LNMP 是 PHP 首选的部署环境，本教程全面介绍了 LNMP 部署环境的搭建

本教程适合初学者熟悉 LNMP 结构的入门教程，学完自己就可以轻松搭建 LNMP 环境，也可以当作开发者日常参考手册使用

## 测试环境

本次有两个测试环境：

### 腾讯云 CVM

测试环境 `CVM` 的系统参数如下：

-   系统 :` Debian GNU/Linux 11 (bullseye) x86_64`
-   内核 : `5.10.0-9-amd64`
-   内存 : `1854Mb`
-   处理器 : `Intel Xeon Gold 6133 (1) @ 2.494GHz`

### WMware 虚拟机

测试环境 `虚拟机` 的系统参数如下：

-   系统 :` Debian GNU/Linux 11 (bullseye) x86_64`
-   内核 : `5.10.0-9-amd64`

## 目录结构

整个 LNMP 项目部署结构

```text
====================================================
LNMP 部署环境目录
====================================================
├─ /lnmp                 LNMP 核心目录
|   ├─ nginx             nginx
|   |  ├─ conf         nginx配置文件
|   |  └─ ...
|   |
|   ├─ php               PHP 版本目录
|   |  ├─ 8.0         PHP8.0
|   |  ├─ 8.1         PHP8.1
|   |  └─ ...
|   |
|   ├─ ImageMagick         ImageMagick
|   |  └─ ...
|   |
|   ├─ MariaDB             MariaDB
|   |  └─ ...
|   |
|   ├─ Sqlite3             Sqlite3
|   |  └─ ...
|   |
|   ├─ Redis               Redis
|   |  └─ ...
|   |
|   ├─ run                 Redis
|   |  └─ ...
|   |
|   ├─ default             缺省站点路径
|   |   ├─ pma             MySQL 管理工具
|   |   ├─ adminer.php     数据库管理工具
|   |   ├─ phpinfo.php     PHP 配置的信息
|   |   ├─ index.php       缺省站点提示页面
|   |
|   ├─ /web                    wamp配置目录
|   |   ├─ sites               虚拟主机配置文件目录
|   |   |
|   |   ├─ www                 站点根目录
|   |   |
|   |   ├─ data                MariaDB的数据目录
|   |   |
|   |   ├─ logs                服务器相关日志文件目录
|   |   |  ├─ httpd            httpd日志目录
|   |   |  ├─ mariadb          MariaDB日志目录
|   |   |
|
├─ install.bat             安装wamp相关服务到系统服务
|
├─ uninstall.bat           卸载wamp相关系统服务
|
├─ menu.bat                日常用到的操作菜单
|
└─ force-delete.bat        net指令删除wamp相关系统服务
```

## lnmp 准备工作

### 目录说明

-   /server 目录

    存放运行 lnmp 时必要的数据和编译文件

-   /package/lnmp 目录

    下载的软件包，存放在这个目录下

### 创建用户

1. vsftpd 用户

    pam 验证的虚拟用户的系统映射用户

    ```sh
    $ useradd -c 'This Linux user is used to map VSFTPD virtual users' -u 2001 -s /usr/sbin/nologin -d /server/default -M -U www
    ```

2. nginx 用户

    ```sh
    $ useradd -c 'This is the nginx service user' -u 2002 -s /usr/sbin/nologin -d /server/www -M -U nginx
    ```

3. php-fpm 用户

    ```sh
    $ useradd -c 'This is the php-fpm service user' -u 2003 -s /usr/sbin/nologin -d /server/www -M -U phpfpm
    ```

### 创建子目录

-   /server 目录

    ```sh
    $ mkdir -p /server/www
    $ mkdir /server/default /server/sites /server/nginx /server/php /server/redis /server/sqlite3 /server/ImageMagick
    $ mkdir -p /server/run/mariadb
    $ mkdir /server/run/nginx /server/run/redis /server/run/php
    $ mkdir -p /server/logs/nginx
    $ mkdir /server/logs/mariadb /server/logs/php
    ```

-   /package/lnmp 目录

    ```sh
    $ mkdir -p /package/lnmp/default
    $ mkdir /package/lnmp/ext_static
    $ mkdir /package/lnmp/ext_dynamic
    ```

### 目录配置权限

```sh
$ chown nginx /server/run/nginx /server/logs/nginx
$ chown phpfpm /server/run/php /server/logs/php
$ chown mysql /server/run/mariadb /server/logs/mariadb
```

> 提示：mysql 用户需要在构建 MariaDB 时自动生成的

### 安装包列表

这些软件包都是需要解压的，后面都会用到

#### lnmp 包

目录： /package/lnmp

-   [nginx-1.20.2.tar.gz](http://nginx.org/en/download.html)
-   [openssl-1.1.1m.tar.gz](https://www.openssl.org/source/)
-   [pcre-8.45.tar.gz](https://sourceforge.net/projects/pcre/files/pcre/)
-   [zlib-1.2.11.tar.gz](http://www.zlib.net/)
-   [php-7.4.27.tar.gz](https://www.php.net/distributions/)
-   [php-8.0.14.tar.gz](https://www.php.net/distributions/)
-   [php-8.1.1.tar.gz](https://www.php.net/distributions/)
-   [redis-6.2.6.tar.gz](https://download.redis.io/releases/redis-6.2.6.tar.gz)
-   [sqlite-autoconf-3370000.tar.gz](https://www.sqlite.org/download.html)
-   [ImageMagick-7.1.0-19.tar.gz](https://download.imagemagick.org/ImageMagick/download/ImageMagick-7.1.0-19.tar.gz)

#### PHP 静态扩展

目录： /package/lnmp/ext_static

-   [redis-5.3.5.tgz](https://pecl.php.net/package/redis)
-   [swoole-4.8.0.tgz](https://pecl.php.net/package/swoole)
-   [yaml-2.2.2.tgz](https://pecl.php.net/package/yaml)

#### PHP 动态扩展

目录： /package/lnmp/ext_dynamic

-   [imagick-3.6.0.tgz](https://pecl.php.net/package/imagick)

## 用户

本次 lnmp 主要涉及到如下几个用户

nginx phpfpm www mysql root

### root

root 是 linux 的超级用户，拥有操作系统的全部能力

略过讲解

### mysql

mysql 用户是 MariaDB 的管理用户

-   MariaDB 的 unix socket 使用 mysql 用户创建
-   MariaDB 的 pid 文件使用 mysql 用户创建
-   MariaDB 的数据库使用 mysql 用户管理
-   MariaDB 运行用户也是 mysql

### www

www 用户是 vsftpd 的用户，我们 web 站点文件使用 www 用户及 www 用户组

### nginx

nginx 用户是 nginx 服务器访问 web 站点的用户

为了保证 nginx 用户能正常访问 web 站点，需要将 nginx 加入到 www 用户组中

```sh
$ usermod -G www nginx
```

### phpfpm

phpfpm 用户是 php-fpm 服务的管理用户

php-fpm 服务用户监听站点的用户是 nginx

所以通常来讲 phpfpm 用户并不需要对 web 站点有访问权限，如有必要，再行加入到 www 用户组中

```sh
$ usermod -G www phpfpm
```

## 文件权限

| 文件类型 | 权限 |
| -------- | ---- |
| 用户     | www  |
| 用户组   | www  |
| 目录     | 750  |
| 文件     | 640  |

-   设置站点用户

    ```sh
    $ chown www:www -R /site/to/path/
    ```

-   设置站点文件权限

    ```sh
    $ find /site/to/path -type f -exec chmod 640 {} \;
    ```

-   设置站点目录权限

    ```sh
    $ find /site/to/path -type d -exec chmod 750 {} \;
    ```

-   写入权限

    如果 php-fpm 服务对目录需要写入权限

    通常只需要 nginx 用户有写入权限即可

    phpfpm 用户通常与站点权限无光

    ```sh
    $ chmod 770 /write/to/path
    ```

-   读取权限

    如果只需要读取权限的话，安全起见修改为 root 用户

    ```sh
    $ chown root:root /read/to/path
    $ find /read/to/path -type f -exec chmod 444 {} \;
    $ find /read/to/path -type f -exec chmod 555 {} \;
    ```

## 用户及用户组

nginx 和 phpfpm 用户通常需要多个用户组权限

-   开发环境下，简单粗暴

    ```sh
    # phpfpm 加入 www 和 nginx 用户组
    $ usermod -G www,nginx phpfpm

    # nginx 加入 www 用户组
    $ usermod -G www nginx
    # nginx 追加到 phpfpm 用户组
    $ usermod -G phpfpm -a nginx
    ```

-   部署环境，phpfpm 和 nginx 加入 www 用户

    ```sh
    $ usermod -G www phpfpm
    $ usermod -G www nginx
    ```

    根据实际情况 判断 nginx 和 phpfpm 是否需要加入对方用户组
