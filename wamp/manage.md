# wamp 维护篇

本篇涉及 httpd 和 mariadb 两个软件的 `安装、卸载、启动、关闭、开机启动项` 等设置

## 维护 httpd

1. 将 httpd 安装进系统服务中

    以管理员的身份打开 cmd，具体操作如下：

    ```cmd
    cd c:\wamp\base\httpd\bin
    httpd.exe -k install -n <service-httpd>
    ```

    > 安装多个 httpd 服务时，httpd 服务名称不能一样

2. 将 httpd 从系统服务中卸载

    ```cmd
    # httpd 卸载
    > httpd.exe -k uninstall -n <service-httpd>

    # sc 卸载
    > sc delete <service-httpd>
    ```

3. httpd 服务启停

    启动: net start <service-httpd> 停止: net stop <service-httpd>

## 维护 mariadb

1. 安装 mariadb 到系统服务

    以管理员的身份打开 cmd，具体操作如下：

    ```cmd
    cd c:\wamp\base\mariadb\bin
    mysql_install_db.exe --datadir=c:/wamp/web/data --password=123456 --config=c:/wamp/base/mariadb/my.ini --service=mariadb
    ```

2. 卸载 mariadb 系统服务

    ```cmd
    # mariadb 卸载
    > mysqld.exe --remove <service-mariadb>

    # sc 卸载
    > sc <server> delete <service-mariadb>
    ```

3. mariadb 启停

    启动: net start <service-mariadb> 停止: net stop <service-mariadb>

## 维护 Redis

Redis 安装比较简单，具体维护操作可以直接查看 [redis](./redis.md) 说明文件

## 修改系统服务启动类型

Win 系统服务项的启动类型分为如下 3 种：

-   auto: 开机自动启动
-   demand: 需要手动启动
-   disabled: 无法启动

以管理员的身份打开 cmd，具体操作如下：

```cmd
> sc config <service-name> start=<set-value>
```

## wamp 使用说明书

-   下载 wamp-vx.x.x.7z，以下统一简写为 wamp
-   将 wamp 解压至 C 盘根目录
-   使用 install.bat 脚本安装系统服务
-   使用 menu.bat 脚本管理服务启动
-   将虚拟主机配置文件存放到 C:\wamp\web\sites 目录下
-   将 C:\wamp\base\php 加入用户环境变量 PATH
-   将 C:\wamp\base\httpd\bin 加入用户环境变量 PATH
-   将 C:\wamp\base\mariadb\bin 加入用户环境变量 PATH
-   将 C:\wamp\base\Sqlite3 加入用户环境变量 PATH
-   将 C:\wamp\base\Redis 加入用户环境变量 PATH
-   将 C:\wamp\base\ImageMagick\bin 加入**系统环境变量** PATH
-   http://localhost/adminer 进入 adminer
-   http://localhost/pma 进入 phpMyAdmin
-   MariaDB 的 root@localhost 默认密码为 123456

### 更换 WAMP 路径

如无必要请不要更换 WAMP 路径

如需更改 WAMP 路径，需要修改以下几个文件的内容：

-   httpd-root.conf 下所有与绝对路径相关的参数值
-   my.ini 下所有与绝对路径相关的参数值
-   php.ini 下所有与绝对路径相关的参数值

### wamp 脚本参考

wamp 一共使用的 4 个 bat 脚本文件，用户管理 wamp 的各项工作，具体如下：

| 脚本类型 | 文件名                                               |
| -------- | ---------------------------------------------------- |
| 安装脚本 | [install.bat](./source/bat/install.bat.md)           |
| 卸载脚本 | [uninstall.bat](./source/bat/uninstall.bat.md)       |
| 强制卸载 | [force-delete.bat](./source/bat/force-delete.bat.md) |
| 管理操作 | [menu.bat](./source/bat/menu.bat.md)                 |
