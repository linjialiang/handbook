# sqlite3 篇

[sqlite3](https://www.sqlite.org) 是一款轻型的数据库，也是经常跟 php 结合使用的

## 构建安装

由于 sqlite3 并非主要数据库，所以我们这里只做最简单的构建

### 构建指令

1. 进入目录

    ```sh
    $ cd /package/lnmp/sqlite-autoconf-3370000/
    ```

2. 编译

    ```sh
    $ ./configure --prefix=/server/sqlite3
    $ make
    ```

3. 安装并指定安装目录

    ```sh
    $ make install
    ```

至此，sqlite 安装完成
