# MariaDB 篇

LNMP 第二个要安装的是 MariaDB ，事实上 MariaDB 官方文档非常糟糕，幸好 MairaDB 对常见 Linux 发行版都能及时的做了预编译

MariaDB 的预编译完全足够 phper 使用，具体安装方法如下：

## 添加 MariaDB 镜像

预编译版本使用使用 apt 来安装 MariaDB

### 生成镜像信息

点击 [获取 MariaDB 镜像](https://downloads.mariadb.org/mariadb/repositories) ，通过 4 步选择，生成最符合你的 MariaDB 镜像信息

1. 选择 Linux 发行版

    | 英文 | Choose a Distro |
    | ---- | --------------- |
    | 选择 | Debian          |

2. 选择发行版版本号

    | 英文 | Choose a Release     |
    | ---- | -------------------- |
    | 选择 | Debian 11 "bullseye" |

3. 选择 MariaDB 版本号

    | 英文 | Choose a Version |
    | ---- | ---------------- |
    | 选择 | 10.6 [Stable]    |

4. 选择 MariaDB 镜像

    清华大学通常是最快的，大家按具体情况选择

    | 英文 | Choose a Mirror |
    | ---- | --------------- |
    | 选择 | 清华大学        |

    > 提示：本次测试环境使用的是腾讯云服务器，所以 MariaDB 镜像选择的是腾讯软件源

### 具体操作

1. 外网导入 MariaDB 密钥

    ```bash
    $ apt install software-properties-common dirmngr -y
    $ curl -LsSO https://mariadb.org/mariadb_release_signing_key.asc
    $ chmod -c 644 mariadb_release_signing_key.asc
    $ mv -vi mariadb_release_signing_key.asc /etc/apt/trusted.gpg.d/
    ```

2. 内网导入 MariaDB 密钥

    MariaDB 镜像的公共密钥是唯一的，简单说就是全球服务器用的都是一样的，因此将下载好的 [MariaDB 密钥](./mariadb/mariadb_release_signing_key.asc.md) 文件拷贝到 /etc/apt/trusted.gpg.d/ 目录下即可

    具体操作如下：

    ```bash
    $ apt install software-properties-common dirmngr
    $ vim /etc/apt/trusted.gpg.d/mariadb_release_signing_key.asc
    # 插入 MariaDB 密钥内容 ...
    $ chmod -c 644 /etc/apt/trusted.gpg.d/mariadb_release_signing_key.asc
    ```

3. 为 MariaDB 创建自定义源文件

    ```bash
    $ touch /etc/apt/sources.list.d/mariadb.list
    $ vim /etc/apt/sources.list.d/mariadb.list
    ```

    清华外网 mariadb.list 源码(https 可以改成 http)：

    ```ini
    # MariaDB 10.6 repository list - created 2021-09-25 14:11 UTC
    # http://downloads.mariadb.org/mariadb/repositories/
    deb [arch=amd64,arm64,ppc64el] https://mirrors.tuna.tsinghua.edu.cn/mariadb/repo/10.6/debian bullseye main
    deb-src https://mirrors.tuna.tsinghua.edu.cn/mariadb/repo/10.6/debian bullseye main
    ```

    腾讯云内网 mariadb.list 源码：

    ```ini
    # MariaDB 10.6 repository list - created 2021-09-25 14:11 UTC
    # http://downloads.mariadb.org/mariadb/repositories/
    deb [arch=amd64,arm64,ppc64el] http://mirrors.tencentyun.com/mariadb/repo/10.6/debian bullseye main
    deb-src http://mirrors.tencentyun.com/mariadb/repo/10.6/debian bullseye main
    ```

4. 更新 Debian 源

    新加入的 MariaDB 镜像，必须更新后才能生效

    ```bash
    $ apt update
    ```

## 安装 MariaDB

上一步完成以后，接下来安装 MariaDB 只需 1 条指令

```bash
$ apt install mariadb-server -y
```

## 系统单元管理

系统单元管理 就是 Systemd Unit 管理，是一个相对复杂的指令集，这里不做过多的讲解，下面是针对 MariaDB 的内容：

### 安装信息解读

安装 MariaDB 区间出现了 3 段有意思的内容

1. 提示 MariaDB 配置文件路径

    ```text
    正在设置 mariadb-common (1:10.6.4+maria~bullseye) ...
    update-alternatives: 错误: 无 my.cnf 的候选项
    update-alternatives: 使用 /etc/mysql/mariadb.cnf 来在自动模式中提供 /etc/mysql/my.cnf (my.cnf)
    ```

2. rsync 系统单元管理

    ```text
    正在设置 rsync (3.2.3-4) ...
    Created symlink /etc/systemd/system/multi-user.target.wants/rsync.service → /lib/systemd/system/rsync.service.
    ```

    - 将 rsync 加入到系统单元的 multi-user.target 组
    - 创建硬链接到 system 目录，以支持开机启动

    > 提示：rsync 是 linux 系统下的数据镜像备份工具，是 MariaDB 的依赖项，会自动安装， 通常 phper 不需要了解

3. MariaDB 系统单元管理

    ```text
    正在设置 mariadb-server-10.6 (1:10.6.4+maria~bullseye) ...
    Created symlink /etc/systemd/system/multi-user.target.wants/mariadb.service → /lib/systemd/system/mariadb.service.
    mariadb-extra.socket is a disabled or a static unit, not starting it.
    mariadb-extra.socket is a disabled or a static unit, not starting it.
    ```

    - 将 mariadb 加入到系统单元的 multi-user.target 组
    - 创建硬链接到 system 目录，以支持开机启动

    > 提示：使用 systemctl daemon-reload 重载 Systemd 配置，即可使用 Systemd 来控制 MariaDB

### MariaDB 系统单元文件

安装好 MariaDB 以后，自动创建的 [系统单元文件](./service/mariadb.service.md)

MariaDB 操作指令：

1. 启动： systemctl start mariadb
2. 关闭： systemctl stop mariadb
3. 重启： systemctl restart mariadb
4. 状态： systemctl status mariadb

## 配置 MariaDB

修改配置文件，让 MariaDB 更加容易管理和操作，具体如下：

### 配置文件路径

1. MariaDB 主配置文件

    MariaDB 服务器端的主配置文件只有 1 个，路径为：/etc/mysql/my.cnf

    /etc/mysql/my.cnf 是 /etc/alternatives/my.cnf 的软链接

    /etc/alternatives/my.cnf 又是 /etc/mysql/mariadb.cnf 的软链接

    > 提示：所以修改和备份主配置文件，都应该在 /etc/mysql/mariadb.cnf 文件上下工夫

2. MariaDB 子配置文件

    以下两个目录中的所有 `.cnf` 格式文件，为 MariaDB 的子配置文件

    ```text
    !includedir /etc/mysql/conf.d/
    !includedir /etc/mysql/mariadb.conf.d/
    ```

3. MariaDB 修改配置文件

    我们主要修改 [50-server.cnf](./mariadb/50-server.cnf) 配置文件简单修改 [mariadb.cnf]配置文件

### MariaDB 选项组说明

点击查询 [选项组详情](https://mariadb.com/kb/en/configuring-mariadb-with-option-files/)

1. [client-server]

    MariaDB 客户端和服务器端都能读取的选项，这对于套接字和端口等选项很有用，如：

    ```ini
    [client-server]
    port = 3306
    socket = /server/run/mariadb/mariadb.sock
    ```

### 查看各选项组配置情况

查看 MariaDB 服务器端选项组配置情况：

```bash
$ mariadbd --help --verbose
$ mysqld --help --verbose
```

查看 MariaDB 客户端选项组配置情况：

```bash
$ mariadb --help --verbose
$ mysql --help --verbose
```

### 停止 MariaDB 服务

操作前，请先停止 MariaDB 服务

```bash
$ service mariadb stop
# 或者
$ systemctl stop mariadb
```

### 修改配置文件

1. 主配置文件

    路径： /etc/mysql/mariadb.cnf

    参考： [mariadb.cnf](./mariadb/mariadb.cnf.md)

    说明： 按需修改，本次没有修改

2. MariaDB 服务端子配置文件

    路径： /etc/mysql/mariadb.conf.d/50-server.cnf

    参考： [50-server.cnf](./mariadb/50-server.cnf.md)

    说明： 本次做了修改

3. 先备份再修改

    ```bash
    $ cp /etc/mysql/mariadb.cnf{,.bak}
    $ cp /etc/mysql/mariadb.conf.d/50-server.cnf{,.bak}
    ```

### 配置文件参考说明

1. MariaDB [配置文件](https://mariadb.com/kb/en/configuring-mariadb-with-option-files/) 官方说明
2. MariaDB 配置文件 [日志选项](https://mariadb.com/kb/en/server-monitoring-logs/) 官方说明
3. MariaDB 配置文件 [服务器端选项](https://mariadb.com/kb/en/mysqld-options/) 官方说明
4. MariaDB 配置文件 [系统变量选项](https://mariadb.com/kb/en/server-system-variables/) 官方说明
5. MariaDB 配置文件 [客户端选项](https://mariadb.com/kb/en/clients-utilities/) 官方说明

## 初始化 data 目录

MariaDB 使用 mysql_install_db 来初始化 data 目录数据

详情请查看 [mysql_install_db](https://mariadb.com/kb/en/mysql_install_db/) 官方说明

### 创建必要目录

创建必要目录，并

1. MariaDB 数据库存放目录

    ```bash
    $ mkdir -p /server/data /server/logs/mariadb /server/run/mariadb
    ```

2. 设置用户权限为 MariaDB 用户

    ```bash
    $ chown mysql /server/data/ /server/logs/mariadb/ /server/run/mariadb/
    ```

### 执行 mysql_install_db

```bash
$ mysql_install_db --user=mysql \
--auth-root-authentication-method=socket \
--auth-root-socket-user=mysql \
--datadir=/server/data \
--skip-test-db
```

### 允许客户端远程连接

默认情况下 MariaDB 只能通过 shell 终端或本地客户端管理数据，为了方便管理我们需要开启远程管理（开启远程是有风险的）

1. 修改 MariaDB 配置文件里的 bind_address 参数即可：

    bind_address 只有 2 个参数值：

    ```text
    - 参数值：0.0.0.0
    - 说明：MariaDB 对所有 IP 客户端开放
    ```

    ```text
    - 参数值：127.0.0.1
    - 说明：MariaDB 只对本地客户端开放
    ```

    > 注意：bind_address 无论怎么设置，shell 终端都可以登陆 MariaDB，两者无关！

2. 创建允许本地客户端登陆的超级管理员用户

    ```bash
    $ service mariadb start
    $ mysql
    MariaDB [(none)]> create user emad@localhost identified by '123';
    MariaDB [(none)]> grant all privileges on *.* to emad@localhost WITH GRANT OPTION;
    MariaDB [(none)]> flush privileges;
    ```

    > 说明：默认 root@localhost 只允许 linux 的 root 用户登陆

3. 创建允许远程客户端登陆的超级管理员用户

    ```bash
    $ service mariadb start
    $ mysql
    MariaDB [(none)]> create user emad@'192.168.%.%' identified by '123';
    MariaDB [(none)]> grant all privileges on *.* to 'emad'@'192.168.%.%' WITH GRANT OPTION;
    MariaDB [(none)]> flush privileges;
    ```

4. 修改用户密码

    ```bash
    $ mysql
    MariaDB [(none)]> ALTER USER emad@localhost IDENTIFIED BY '321';
    MariaDB [(none)]> flush privileges;
    ```

5. 删除用户

    ```bash
    $ mysql
    MariaDB [(none)]> DROP USER emad@localhost;
    ```

6. 授予超级管理员权限

    ```bash
    $ mysql
    MariaDB [(none)]> GRANT ALL PRIVILEGES ON  *.* to emad@localhost WITH GRANT OPTION;
    ```

7. 用户重命名

    支持多个用户同时重命名

    ```bash
    $ mysql
    MariaDB [(none)]> RENAME USER 'emad'@'192.168.%.%' TO 'admin'@'192.168.10.%', 'emad'@'localhost' TO 'admin'@'127.0.0.%';
    ```
