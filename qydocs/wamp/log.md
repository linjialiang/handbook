# 更新日志

WAMP 开发环境版本更新历程，部分版本的更新内容没有记录

## v8.0.5 更新说明

-   php 启用了 `php_yaml` 扩展

## v8.0.3 更新说明

-   修复了 v8.0.2-bate 已知的 bug

## v8.0.2-bate 更新说明

-   加入了 sqlite3
-   加入了 redis
-   bat 脚本文件增加了 redis 操作
-   php 升级至 8.0.13
-   此版本开始，wamp 和 php 的次版本号保持一致

## v6.6.8 更新说明

-   为 git bash 终端增加 composer 文件
-   优化了 php 配置
-   php 引入 imagick 图形扩展（默认不开启）

## v6.6.5 更新说明

-   composer 升级至 v2.1.6

## v6.6.4 更新说明

-   php 升级至 8.0.10
-   mariadb 升级至 10.6.4
-   httpd 加入了 https 协议
-   httpd 加入了 gzip 压缩传输

## v6.4.3 更新说明

-   解决了 php_curl 检测不通过问题

## v6.4.2 更新说明

-   php 升级至 8.0.7
-   mariadb 升级至 10.5.10
-   新增 adminer
-   phpMyAdmin 升级至 5.1.1
-   composer 升级至 v2.1.1 版本
-   httpd 升级至 v2.4.48 版本

## v6.4.0 更新说明

-   php 升级至 8.0.0
-   mariadb 升级至 10.5.8
-   移除 adminer
-   phpMyAdmin 升级至 5.0.4
-   composer 由 1.x 升级至 v2.0.8 版本
-   php_openssl 扩展添加了 `cert.pem` 证书

## v6.3.19 更新说明

-   php 升级至 7.4.10
-   mariadb 升级至 10.5.5
-   httpd 升级至 2.4.46
-   adminer 升级至 7.4.7
-   php 移除 imagick 图形扩展

## v6.3.18 更新说明

-   php 升级至 7.4.6
-   mariadb 升级至 10.4.13
-   adminer 升级至 4.7.7

## v6.3.16 更新说明

-   phpMyAdmin 升级至 5.0.2
-   php 升级至 7.4.5
-   httpd 升级至 2.4.43
-   移除了 php.ini 中没有内容的区块

## v6.3.9 更新说明

-   MariaDB 配置文件 my.ini 移除了两个参数
-   对 phpMyAdmin 性能做了优化

```ini
skip-external-locking
bind-address                = 127.0.0.1
```

> 说明：wamp 下 my.ini 移除这两个参数后，phpMyAdmin 速度大大提升！

## v6.3.8 更新说明

-   httpd 错误日志记录级别修改为 `LogLevel crit`

## v6.3.6 更新说明

-   添加了 phpMyAdmin，并更新至 5.0.0
-   php 默认移除了 xdebug 扩展，它太重了
-   MariaDB 配置禁用多种日志，减轻压力

## v6.3.0 更新说明

-   移除了 phpMyAdmin

## v6.2.1 更新说明

-   php 升级至 v7.4.1

## v6.1.2 更新说明

-   MariaDB 升级至 v10.4.11
-   phpmyadmin 部分插件做了更新

## v6.0.1 更新说明

-   移除了 v6.0.0 多余的文件

## v6.0.0 更新说明

-   php 升级到 v7.4.0
-   MariaDB 升级到 v10.4.11
-   内置了 composer 安装的 phpMyAdmin
-   adminer 改用 composer 安装
-   解决了 php 扩展 curl 无法正确加载问题
-   php_xdebug 升级至 v2.9.0

## v5.0.5 更新说明

-   修复了 v5.0.4 中的 bug。

## v5.0.4 更新说明

-   修复了 php 下的 php_imagick 扩展
-   MariaDB 的 my.ini 配置做了调整

## v5.0.2 更新说明

-   php 增加了 `php_imagick` 扩展，及其安装方法
-   php 升级至 `v7.3.11`
-   Adminer 升级至 `v4.7.4`
-   MariaDB 开启了二进制日志
-   httpd 配置文件重构
-   httpd 移除了变量 `HTPORT`
-   httpd 新增了变量 `HTTP_PORT、HTTPS_PORT`

## v4.3.18 更新说明

-   修复了 4.3.17 版本的几个 bug

## v4.3.17 更新说明

-   移除 phpmyadmin
-   php 升级至 v7.3.10
-   mariadb 升级至 v10.4.8
-   arminer 升级至 v4.7.3

## v4.3.15 更新说明

-   composer 升级至 v1.9.0
-   php 升级至 v7.3.8
-   mariadb 升级至 v10.4.7
-   phpmyadmin 升级至 v4.9.0.1
-   arminer 升级至 v4.7.2

## v4.3.11 更新说明

-   php 升级至 v7.3.6
-   mariadb 升级至 v10.4.6
-   php_xdebug 升级至 v2.7.2
-   composer 升级至 v1.8.6

## v4.3.8 更新说明

-   php 升级至 v7.3.4
-   mariadb 升级至 v10.3.14
-   httpd 升级至 v2.4.39
-   php_xdebug 升级至 v2.7.1
-   php.ini 参数更新
-   httpd 移除扩展 mod_access_compat

## v4.3.7 更新说明

-   php.ini 参数更新

## v4.3.6 更新说明

-   php_xdebug 升级至 `v2.7.0` 正式版

## v4.3.5 更新说明

-   php_xdebug 升级至 `v2.7.0RC2` 版本

## v4.3.4 更新说明

-   php 升级至 `v7.3.3`

## v4.3.4 更新说明

-   mariadb 版本升级到 `10.3.13`

## v4.3.3 更新说明

-   apache24 端口统一设置为变量值 `${HTPORT}`

## v4.3.2 更新说明

-   php 升级至 `v7.3.2`
-   composer 升级至 `v.1.8.4`

## v4.3.1 更新说明

-   phpMyAdmin 升级至 `v4.8.5`
-   Adminer 升级至 `v4.7.1`
-   php_xdebug 升级至 `v2.7.0rc1`
-   composer 升级至 `v.1.8.3`

## v4.3.0 更新说明

-   目录结构做了调整，在根目录增加了 `web` 目录
-   将 `sites & www & data & logs` 这 4 个目录移动到 `web` 目录下
-   `my.ini` 数据目录改为 `c:\wamp\web\data`
-   apache24 配置文件的变量名做了相应调整：

## v4.2.1 更新说明

-   php 版本升级到 `7.3.1`
-   mariadb 版本升级到 `10.3.12`
-   php 目录下增加了 composer，版本为 `1.8.0`
-   phpMyAdmin 版本升级到 4.8.4

## v4.2.0 更新说明

-   php 版本升级到 php7.3.0
-   php 目录下移除了 composer，有需要自行添加！

## v4.1.1 更新说明

-   在 `v4.0.1` 的基础上，修复了部分 bug

## v4.0.1 更新说明

-   在 `v4.0.0` 的基础上，重新设计了目录结构

## v4.0.0 更新说明

-   移除了 32 位版本，mariadb 更新至 `10.3.11`
-   `composer` 更新至 `1.8.0`

## v3.3.0 更新说明

-   64 位版本，更新 php 至 7.2.12；

## v3.2.1 更新说明

-   将 `php` 除了 `php_xdebug` 以外的所有扩展都禁用掉，需要的话自定开启；
-   为 `php` 增加了 `composer` ，只需要将指定 php 根目录加入环境变量中即可在终端中使用，例如：
