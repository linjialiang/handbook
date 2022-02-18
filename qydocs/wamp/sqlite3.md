# sqlite3

sqlite3 安装非常方便，但是版本最好跟 php 扩展对应的构建版本一致

当然你使用 sqlite3 官网上网最新版也没有任何问题，因为 php 内置的 php_sqlite3 扩展不需要依赖

就算我们电脑上不安装 sqlite3 应用，只要链接上 `sqlite3 数据库文件`，php 依然可以对 sqlite3 数据库做 api 范围内的所有操作

### 确定 Sqlite3 版本

1. 开启 PHP 扩展

    php.ini 需要先开启 sqlite3 扩展的支持，这样才能查看到构建扩展时对应包的版本

    ```ini
    # php.ini
    extension=pdo_sqlite
    extension=sqlite3
    ```

2. cmd 下输入指令

    ```bash
    $ php --ri sqlite3
    sqlite3

    SQLite3 support => enabled
    SQLite Library => 3.33.0

    Directive => Local Value => Master Value
    sqlite3.extension_dir => no value => no value
    sqlite3.defensive => On => On
    ```

    ```bash
    $ php --ri pdo_sqlite
    pdo_sqlite

    PDO Driver for SQLite 3.x => enabled
    SQLite Library => 3.33.0
    ```

    > 本次需要的 sqlite3 依赖版本为 `3.33.0`

### 下载 sqlite3

[sqlite3 官网](https://www.sqlite.org/download.html) 下载 2 个包：

-   [sqlite-dll](https://www.sqlite.org/2020/sqlite-dll-win64-x64-3330000.zip)
-   [sqlite-tools](https://www.sqlite.org/2020/sqlite-tools-win32-x86-3330000.zip)

### 解压包

将 `sqlite-dll` 和 `sqlite-tools` 的解压文件都放到 `wmap/Sqlite3` 目录下，共计 5 个文件：

-   sqlite-dll : 2 个文件
-   sqlite-tools : 3 个文件

### 加入系统环境变量

将 wamp/Sqlite3 目录加入环境变量 Path 中，以方便我们后期使用
