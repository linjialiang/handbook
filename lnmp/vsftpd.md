# vsftpd 篇

vsftpd 是 Linux 中最安全、最稳定的 FTP 服务器

## 安装 vsftpd

vsftpd 推荐使用 apt 安装，这样更加稳定

```bash
$ apt install vsftpd -y
```

## 配置 vsftpd

vsftpd 主要有 3 个配置文件

### 主配置文件

路径: /etc/vsftpd.conf

点击查看详细内容 [vsftpd.conf](./vsftpd/vsftpd.conf.md)

### 监狱列表文件

作用：控制用户是否只能访问家目录，

路径：由 vsftpd 指定，当前路径为 /etc/vsftpd/chroot_list

当前作用：监狱列表文件下的用户不在家目录监狱内，其它用户全部处于家目录监狱中

### 用户列表文件

作用：用户哪些用户允许或不允许登录 vsftpd

路径：由 vsftpd 指定，当前路径为 /etc/vsftpd/user_list

当前作用：拒绝用户列表文件下的用户登陆

> 提示：虚拟用户登录，只需设置映射的系统用户

## PAM 模块

libpam-mysql 通过 MariaDB + pam 的方式 来实现对 vsftpd 认证

-   优势：使用虚拟用户登陆，最大的好处是，我们之后可以通过 web 后台来控制！

-   注意：需要在 pam 中暴露 mariadb 用户密码

### 安装 PAM 模块

```bash
$ apt install libpam-mysql -y
```

### 配置 libpam-mysql

libpam-mysql 配置文件位于 /etc/pam-mysql.conf

具体内容请查看 [pam-mysql.conf](./vsftpd/pam-mysql.conf.md)

-   警告：配置文件里，出现了数据库用户名及其登录密码，为了安全期间，需设置其它用户不可见

    ```bash
    $ chown root:root /etc/pam-mysql.conf
    $ chmod 640 /etc/pam-mysql.conf
    ```

### 创建 vsftpd 的 PAM 配置文件

路径 ：/etc/pam.d/vsftpd-guest

```bash
$ touch /etc/pam.d/vsftpd-guest
$ chmod 640 /etc/pam.d/vsftpd-guest
$ vim /etc/pam.d/vsftpd-guest
```

vsftpd-guest 内容如下：

```ini
auth required pam_mysql.so config_file=/etc/pam-mysql.conf
account required pam_mysql.so config_file=/etc/pam-mysql.conf
```

0.7RC1 版本之前，不支持指定配置文件，需改成：

```ini
auth required pam_mysql.so user=数据库用户名 passwd=数据库用户密码 host=127.0.0.1 db=数据库名 table=数据库表 usercolumn=用户字段 passwdcolumn=密码字段 crypt=2
account required pam_mysql.so user=数据库用户名 passwd=数据库用户密码 host=127.0.0.1 db=数据库名 table=数据库表 usercolumn=用户字段 passwdcolumn=密码字段 crypt=2
```

## 数据库管理

在 MariaDB 创建用于管理 pam 认证的数据库，并创建针对 vsftpd 认证的表

### 配置数据库信息

```bash
MariaDB [(none)]> CREATE DATABASE db_pam;
MariaDB [(none)]> CREATE TABLE db_pam.pam_vsftpd (
   -> id    int AUTO_INCREMENT  NOT NULL    PRIMARY KEY,
   -> ftp_user  varchar(255)    BINARY  NOT NULL,
   -> ftp_passwd    char(41)    BINARY  NOT NULL,
   -> ftp_dir   varchar(255)    BINARY
   -> );
MariaDB [(none)]> CREATE USER 'pam_vsftpd'@'localhost' IDENTIFIED BY '数据库用户密码';
MariaDB [(none)]> GRANT SELECT ON db_pam.pam_vsftpd TO 'pam_vsftpd'@'localhost';
MariaDB [(none)]> FLUSH PRIVILEGES;
```

### vsftpd 登录用户

创建 vsftpd 登录用户 www

```bash
MariaDB [(none)]> INSERT INTO db_pam.pam_vsftpd
   -> ( ftp_user, ftp_passwd )
   -> VALUES
   -> ( 'www', password('ftp登录用户密码') );
```

创建 vsftpd 登录用户 qyadmin

```bash
MariaDB [(none)]> INSERT INTO db_pam.pam_vsftpd
   -> ( ftp_user, ftp_passwd )
   -> VALUES
   -> ( 'qyadmin', password('ftp登录用户密码') );
```

表 db_pam.pam_vsftpd 的结构：

```bash
MariaDB [(none)]> DESCRIBE db_pam.pam_vsftpd;
+------------+--------------+------+-----+---------+----------------+
| Field      | Type         | Null | Key | Default | Extra          |
+------------+--------------+------+-----+---------+----------------+
| id         | int(11)      | NO   | PRI | NULL    | auto_increment |
| ftp_user   | varchar(255) | NO   |     | NULL    |                |
| ftp_passwd | char(41)     | NO   |     | NULL    |                |
| ftp_dir    | varchar(255) | YES  |     | NULL    |                |
+------------+--------------+------+-----+---------+----------------+
4 rows in set (0.001 sec)
```

表 db_pam.pam_vsftpd 的数据：

```bash
MariaDB [(none)]> select * from db_pam.pam_vsftpd;
+----+----------+-------------------------------------------+---------+
| id | ftp_user | ftp_passwd                                | ftp_dir |
+----+----------+-------------------------------------------+---------+
|  1 | www      | *6BB4837EB74329105EE4568DDA7DC67ED2CA2AD9 | NULL    |
|  2 | qyadmin  | *6BB4837EB74329105EE4568DDA7DC67ED2CA2AD9 | NULL    |
+----+----------+-------------------------------------------+---------+
2 rows in set (0.001 sec)
```

## 用户配置

### 创建映射用户

使用 pam 认证需要创建一个本地用户，用于虚拟用户授权

创建系统用户 www

```bash
$ useradd -c 'This Linux user is used to map VSFTPD virtual users' -u 2001 -s /usr/sbin/nologin -d /server/default -M -U www
```

修改 www 家目录权限

```bash
$ chmod 550 /server/www
```

### 配置虚拟用户

在 /server/vsftpd 目录下，创建与虚拟用户同名的配置文件，并自定义根目录地址，具体操作如下：

```bash
$ mkdir /server/vsftpd
```

-   创建虚拟用户 www 的单独配置文件

    ```bash
    $ vim /server/vsftpd/www
    ```

    www 文件内容：

    ```ini
    local_root=/server/www
    ```

-   控制目录权限不可写

    设置了 virtual_use_local_privs=yes 以后，虚拟用户的权限与本地用户完全相同，所以家目录不能有写的权限：

    ```bash
    $ chown www:www /server/www
    $ chmod a-w /server/www
    ```

到此 lnmp 内容基本完结

局域网或本地虚拟机推荐使用 samba 来替代 vsftpd

samba 不在 lnmp 规划里，期待下个作品
