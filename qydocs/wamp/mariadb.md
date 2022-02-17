# MariaDB 操作篇

MariaDB 是 MySQL 的分支版本，各大 Linux 发行版镜像源都用 MariaDB 替代 MySQL 了

## my.ini

my.ini 是 MariaDB 默认配置文件名，可以有多种路径选择，具体如下：

### my.ini 文件路径

MariaDB 的根配置文件，只能读取 1 个，如果有多个，可以做为子配置文件，从根配置文件里加载

-   c:\my.ini

    ```text
    - Win下 MariaDB 全局配置文件
    - 所有的 mysqld.exe 被启动时都可以读取
    ```

-   c:\wamp\mariadb\my.ini

    ```text
    - 对应的 mysqld.exe 服务被启动时可读取
    - 这个是我们预先写好的配置文件，在安装MariaDB时被引入
    ```

-   c:\wamp\web\data\my.ini

    ```text
    - 对应的 mysqld.exe 服务被启动时可读取
    - MariaDB 安装指令，默认会生成此配置文件
    ```

### my.ini 优先级

如果 win 系统上有多个 MariaDB 配置文件，MariaDB 会按优先级依次读取，直到读取到 1 个配置文件后，就会结束继续读取

如果 win 系统上没有 MariaDB 配置文件，那么 MariaDB 将无法启动

my.ini 优先级具体如下：

1. --defaults-file="path"

    ```text
    - 由 --defaults-file 指定的配置文件
    - 优先级：1，具体最高优先权
    - 安装系统服务上
        1. 指定了该参数，没有找到该文件就会报错，其它配置文件自动失效
        2. 没有指定该参数，将查看下1个
    ```

2. c:\my.ini

    ```text
    - 系统盘根目录下的配置文件
    - 优先级： 2
    - 如果该文件不存在，将继续查看下1个
    ```

3. c:\wamp\mariadb\my.ini

    ```text
    - MariaDB 根目录下的配置文件
    - 优先级：3
    - 如果该文件不存在，将继续查看下1个
    ```

4. c:\wamp\web\data\my.ini

    ```text
    - MariaDB 数据目录下的配置文件
    - 优先级：4
    - 如果该文件不存在，系统将报错
    ```

可以 [点击查看](./source/my.ini.md) my.ini 参考案例

## 初始化数据

MariaDB 默认没有 data 数据目录，需要我们自己进行初始化，这里我们推荐使用 mysql_install_db.exe 来管理

mysql_install_db.exe 会自动生成系统服务，如果只想生成 data 数据，可以使用 mysqld 相关指令

### 入门级操作

初学者不想使用指令，可以如下操作

| 步骤 | 具体操作                                    |
| ---- | ------------------------------------------- |
| 1    | 双击 mysql_install_db.exe 生成 datadir 目录 |
| 2    | 默认路径：c:\wamp\base\mariadb\data         |

### 通用初始化操作

可以将 c:\wamp\base\mariadb\bin 加入环境变量中，在任意目录下执行

也可以先 进入 c:\wamp\base\mariadb\bin 目录下，在执行

-   不指定配置文件

    指定 data 目录、初始密码

    ```cmd
    > cd c:\wamp\base\mariadb\bin
    > mysql_install_db.exe --datadir=c:/wamp/web/data --password=123456
    ```

-   指定配置文件

    指定 data 目录、初始密码、加载预先写好的配置文件信息、设置服务名称

    ```cmd
    > cd c:\wamp\base\mariadb\bin
    > mysql_install_db.exe --datadir=c:/wamp/web/data --password=123456 --config=c:/wamp/base/mariadb/my.ini --service=mariadb
    ```

-   --config 指令

    该指令是拷贝指定配置文件到 data 目录下，即：

    安装服务上增加的是： "--defaults-file=C:\wamp\web\data\my.ini"

### 可移除文件

data 目录下移除文件列表如下：

-   ${hostname}.err

    错误日志，由 my.ini 重新指定

-   test 目录

    一个测试用的数据库，部署环境建议移除掉

    新版本：初始化时已经不存在

-   my.ini

    如果不是 --defaults-file 指定配置文件，可以移除

    新版本：是 --defaults-file 指定文件，不可移除

### 必备文件

data 目录下移除文件列表如下：

-   子目录 mysql
    MariaDB 自带库
    专门用于管理 MariaDB 的数据库

-   子目录 performance_schema
    MariaDB 自带库
    用于收集数据库服务器性能参数

-   子目录 sys
    MariaDB 自带库

-   aria_log.%
    Aria 存储引擎的日志文件

-   aria_log_control
    Aria 存储引擎的日志控制文件

-   ib_logfile1/ib_logfile2
    InnoDB 的 重做日志文件

    ```text
    - 重做日志文件其实就是 innodb 存储引擎产生的日志，默认在 innodb_data_home_dir 下面有两个文件 ib_logfile0 和 ib_logfile1
    - 原理: innodb 存储引擎，先将操作写入 重做日志文件 中，再进行数据库操作。
    - 作用: 当发生故障 innodb 存储引擎就会使用 重做日志文件 进行恢复，保证数据库的完整性
    ```

-   ib_buffer_pool
    InnoDB 存取内存热数据的文件

    ```text
    - 关闭 MariaDB 时: 把内存中的热数据保存在 ib_buffer_pool 文件中
    - 启动 MariaDB 后: ib_buffer_pool 文件内容自动加载到 Buffer_Pool 缓冲池里
    ```

-   ibdata1
    InnoDB 的共享表空间

    ```text
    - ibdata1 文件是 innodb 的共享表空间文件，一般存储下表数据：
        - 数据字典（也就是 InnoDB 表的元数据）
        - 变更缓冲区
        - 双写缓冲区
        - 撤销日志
        - 所有使用 InnoDB 引擎的数据库的表数据（开启独立表空间后，不再存储）
    ```

    查看是否开启独立表空间指令

    ```cmd
    mysql > show variables like 'innodb_file_per_table';
    ```

-   multi-master.info
    多源复制相关文件，包含所有正在使用的主连接

-   bin-log%
    二进制日志文件（自动生成）

-   bin-log.index
    二进制日志文件索引（自动生成）

-   multi-master.info
    多源复制相关文件，包含所有正在使用的主连接

### 存储引擎

MariaDB 有 2 个重要的存储引擎

1. innodb
   MariaDB 默认存储引擎

2. Aria
   MariaDB 强制启动的存储引擎，用于替代 MySQL 的 MyISAM 存储引擎

查询 MariaDB 所有存储引擎：

```cmd
mysql > show engines;
```

## 指定 pid 文件

1. pid 可以在 my.ini 单独指定：

    ```ini
    [mysqld]
    pid-file    = c:/wamp/base/conf/mariadb.pid
    ```

    默认情况下: pid 文件会在 data 目录自动生成

### 注意事项

-   确保 c:/wamp/base/conf/目录存在

    ```text
    - 由于权限的问题，mariadb不能新建目录
    - 确保目录存在，启动 MariaDB 时，就会自动生成 mariadb.pid 文件
    ```

-   客户端不存在 pid-file 参数

    ```text
    - MariaDB 客户端不存在 pid-file 这个参数
    - [client]、[client-mariadb]、[client-server] 这些客户端选项组下不应该出现 pid-file 选项
    - 如果客户端选项组出现 pid-file 会出现一些问题
    ```

## 数据库转移

MariaDB 数据库如果使用 InnoDB 索引，在转移时，建议以 sql 导出

-   原因：数据库的索引信息统一存在在 InnoDB 里，如果直接拷贝 InnoDB 数据量太大
-   正确方式：建议使用数据库管理工具，将需要的数据库导出为 sql 文件，再用相同的数据库管理工具导入 sql 文件

| 数据库管理工具推荐 |
| ------------------ |
| phpMyAdmin         |
| adminer            |
| navcat             |

## 安裝 MariaDB 管理工具

MariaDB 有 2 个非常有名的 web 端管理工具

| DB 管理系统 | 网址                        |
| ----------- | --------------------------- |
| adminer     | https://www.adminer.org/    |
| phpmyadmin  | https://www.phpmyadmin.net/ |

附录： [phpMyAdmin 中文文档](https://docs.phpmyadmin.net/zh_CN/latest/)

## 配置 MariaDB 管理工具

MariaDB 管理工具在 httpd 里的配置请查阅 [httpd 操作篇](./httpd.md)

### 配置 phpmyadmin

phpMyAdmin 是 MySQL/MariaDB 最著名的管理系统，由 PHP 语言编写。

phpMyAdmin 可以使用 composer 管理安装，我们是直接从官网下载

解压后需要对 phpmyadmin 做一些简单的配置，具体如下：

1. config.default.php

    libraries/config.default.php 是 phpmyadmin 的自带的配置文件，

    如果项目根目录下没有 config.inc.php 默认此文件为配置文件

2. config.inc.php

    在 pma 根目录下新建 config.inc.php 文件，具体内容如下：

    ```php
    <?php
    declare(strict_types=1);

    $cfg['blowfish_secret'] = 'VPLjNXjLGt2TvXacmukPVJNNAdNJYrvyVWy2NBtUx8v3mvExnXJFxvDnQx2BRQ5ddbSGv2DPxwerWsmg';
    $i = 0;
    $i++;

    $cfg['Servers'][$i]['auth_type'] = 'cookie';
    $cfg['Servers'][$i]['host'] = 'localhost';
    $cfg['Servers'][$i]['compress'] = false;
    $cfg['Servers'][$i]['AllowNoPassword'] = false;

    $cfg['UploadDir'] = '';
    $cfg['SaveDir'] = '';

    $cfg['DefaultLang'] = 'zh_CN';
    $cfg['ThemeDefault'] = 'original';
    ```

3. $cfg['blowfish_secret'] 参数说明

    $cfg['blowfish_secret'] 参数是随机字符串，支持如下字符：

    | 类型 | 内容                           |
    | ---- | ------------------------------ |
    | 数值 | 0-9                            |
    | 大写 | A-Z                            |
    | 小写 | a-z                            |
    | 特殊 | \_`~!@#$%^&\*()-=+\|'";:.,<>/? |

### 配置 adminer

adminer 是 PHP 语言编写，支持多种数据库系统，由于其出色的执行速度使得其大受程序员欢迎！

adminer 不需要任何配置
