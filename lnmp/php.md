# PHP 篇

PHP 是处理 php 脚本的解释器

构建时，需要指定 MariaDB 的 socket 路径，所以在 MariaDB 后安装。

## 扩展库说明

PHP 扩展库按加载时间可分为：`动态库(共享扩展)` 和 `静态库`

### 动态库

动态库是在程序运行时链接的，动态库在编译时不会放到连接的目标程序中，即可执行文件无法单独运行

动态库扩展名一般为：

| 系统 | 扩展名  |
| ---- | ------- |
| win  | `*.dll` |
| unix | `*.so`  |

### 静态库

静态库是在程序编译时链接的，静态库在编译时会直接整合到目标程序中，编译成功的可执行文件可独立运行

动态库扩展名一般为：

| 系统 | 扩展名  |
| ---- | ------- |
| win  | `*.lib` |
| unix | `*.a`   |

### 动态库和静态库区别

静态编译：静态库将需要的依赖在构建是已经从系统“拷贝”到程序中，执行时就不需要调用系统的库，这会让程序变得更大

动态编译：动态库构建了 1 个连接文件(`*.so`) ，用于连接程序和系统对应库的文件，执行时需要调用系统的库以及该库对应的依赖项

-   性能：静态库优于动态库，服务器硬件配置较差的，应该倾向于静态库
-   体积：静态库体积大于动态库
-   升级：静态库升级需要重新构建 PHP，动态库升级只需要重新生成连接文件(`*.so`)即可
-   稳定：静态库更加稳定，对于动态库来讲，如果系统对应库升级，与动态库对应的构建版本不一致，可能会遇到兼容性问题

### 扩展库构建类型选择

-   使用频繁的扩展库，推荐使用静态编译
-   更新频繁的扩展库，建议使用动态编译
-   非官方认可扩展库，建议使用动态编译

[官方认可扩展库列表](https://www.php.net/manual/zh/extensions.membership.php) 里的扩展，如有必要均可用静态库的方式构建，安全性和稳定性都由官方验证过

## 静态编译 PECL 扩展

本次对 3 个 PECL 扩展，进行静态编译

-   [redis-5.3.4](https://pecl.php.net/package/redis)
-   [swoole-4.8.0](https://pecl.php.net/package/swoole)
-   [yaml-2.2.1](https://pecl.php.net/package/yaml)

### 移动 PECL 扩展

将 PECL 扩展移动到 php 的 ext 目录下

```bash
$ cd /package/lnmp/ext_static/
$ mv redis-5.3.4 /package/lnmp/php-8.0.12/ext/redis
$ mv swoole-4.8.0 /package/lnmp/php-8.0.12/ext/swoole
$ mv yaml-2.2.1 /package/lnmp/php-8.0.12/ext/yaml
# imagick 有用到也建议静态构建
$ mv imagick-3.5.1 /package/lnmp/php-8.0.12/ext/imagick
```

### 重新生成 configure

引入新的扩展后，需要强制 PHP 重新生成配置脚本 `configure`

-   生成配置脚本依赖 autoconf

    ```bash
    $ apt install autoconf -y
    ```

-   强制生成 configure

    ```bash
    $ cd /package/lnmp/php-8.0.12/
    $ mv configure{,.original}
    $ ./buildconf --force
    ```

## 构建 PHP

### 创建构建目录

```bash
mkdir /package/lnmp/php-8.0.12/build_php
```

### pkg-config 相关

构建 php 时，自己编译的依赖包需要手动加入到 pkg-config 中

使用 export 是临时加入环境变量中，但会永久记录在编译后的可执行文件信息里

#### 原理

1. 检测路径是否已经加入到 PKG_CONFIG_PATH 环境变量中，避免多次加入，从而造成混沦

    ```bash
    $ echo $PKG_CONFIG_PATH
    ```

2. 将路径加入到 PKG_CONFIG_PATH 环境变量中

    加入单条：

    ```bash
    $ export PKG_CONFIG_PATH=/path/to/pkgconfig1:$PKG_CONFIG_PATH
    ```

    加入 2 条：

    ```bash
    $ export PKG_CONFIG_PATH=/path/to/pkgconfig1:/path/to/pkgconfig2:$PKG_CONFIG_PATH
    ```

3. 检测是否加入成功

    ```bash
    $ pkg-config --list-all
    ```

#### 指令

```bash
$ export PKG_CONFIG_PATH=/server/sqlite3/lib/pkgconfig:$PKG_CONFIG_PATH
```

### 安装必要依赖

```bash
$ apt install libxml2-dev
$ apt install libpng-dev libwebp-dev libjpeg-dev libxpm-dev libfreetype-dev
$ apt install libonig-dev
$ apt install libcurl4-openssl-dev
$ apt install libssl-dev
$ apt install libyaml-dev
```

-   libonig-dev

    对应提示：No package 'oniguruma' found

### 安装指令

redis、imagick、swoole、yaml 这里使用最简单的指令

更多指令请使用 `./congfigure -h | grep redis` 查看

```bash
$ cd /package/lnmp/php-8.0.12/build_php/
$ ../configure --prefix=/server/php \
--enable-fpm \
--with-fpm-user=phpfpm \
--with-fpm-group=phpfpm \
--disable-short-tags \
--with-openssl \
--with-pcre-jit \
--with-zlib \
--with-curl \
--enable-exif \
--enable-ftp \
--enable-gd \
--with-webp \
--with-jpeg \
--with-xpm \
--with-freetype \
--enable-mbstring \
--enable-mysqlnd \
--with-mysql-sock=/run/mysqld/mysqld.sock \
--with-mysqli=mysqlnd \
--with-pdo-mysql=mysqlnd \
--enable-sockets \
--enable-redis \
--enable-swoole \
--with-yaml
```

如果 imagick 需要静态编译，则增加如下一条信息：

```bash
--with-imagick=/server/ImageMagick \
```

### 编译并安装

```bash
$ make
$ make test
$ maek install
```

至此， php 安装完成

## 配置 php.ini

php.ini 是 php 的配置文件，具体信息请查看 [官方手册](https://www.php.net/manual/zh/ini.php)

### 配置文件模板

php 编译完成后，在源码包根目录下会生成两个 php.ini 模版文件

-   开发环境推荐

    php.ini-development

-   部署环境推荐

    php.ini-production

### 配置文件路径

下面两个指令，可以快速获取到配置文件存放路径

-   使用 php-config 程序

    ```bash
    $ /server/php/bin/php --ini
    ```

-   使用 php 程序

    ```bash
    $ /server/php/bin/php-config --ini-path
    ```

推荐：使用 php 程序查询，会更加简洁

### 拷贝配置文件

当前环境为部署环境，所以拷贝 php.ini-production

```bash
$ cp -p -r /package/lnmp/php-8.0.12/php.ini-production /server/php/lib/php.ini
```

### 检测配置文件

使用 php 程序，快速检测配置文件使用加载成功

```bash
$ /server/php/bin/php --ini
```

### 开启 OPcache

OPcache 只能编译为共享扩展

-   开启方式

    在 php.ini 第 960 行，将 `;` 去掉

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

> 警告：开发环境，不要开启 opcache，这会导致数据被缓存，无法获取最新数据

## 配置 php-fpm

nginx 本身只能处理静态页面，如果要处理 php 脚本，就必须借助类似 php-fpm 的服务

### 配置文件

php-fpm 配置文件分：主进程配置文件和工作池进程配置文件

#### 主进程

主进程(master)配置文件，是针对整个 php-fpm 通用配置

路径： /server/php/etc/php-fpm.conf

数量： 有且仅有，1 个

需求： 主进程配置文件必须存在

默认： 默认未创建

模板： /server/php/etc/php-fpm.conf.default

#### 工作池进程

工作池进程(pool)配置文件，是针对单个工作进程的配置文件

路径： `/server/php/etc/php-fpm.d/*.conf`

数量： 允许多个

需求： 至少需要 1 个工作吃进程配置文件

默认： 默认未创建

模板： /server/php/etc/php-fpm.d/www.conf.default

#### 配置文件案例

-   主配置文件案例：

    [php-fpm.conf](./php/php-fpm.conf.md)

-   工作池进程配置文件案例：

    [sites.conf](./php/sites.conf.md)

## 参数说明

这里仅简单了解下，关于更多参数说明，请查看 php-tutorial

### 工作进程配置参数

-   [default]

    子进程名，通常与子进程配置文件命名相同

-   listen

    php-fpm 工作池进程对应的监听地址，可选端口或者 socket 文件

    ```ini
    listen = /server/run/php/default.sock
    ```

-   user/group

    子进程用户/用户组，默认为 nobody

    ```ini
    user    = phpfpm
    group   = phpfpm
    ```

-   listen.owner/listen.group

    子进程监听用户/监听用户组，默认为 nobody

    监听用户建议设置为 nginx 用户

    ```ini
    listen.owner    = nginx
    listen.group    = nginx
    ```

-   listen.allowed_clients

    监听允许访问的客户端 ip，默认仅允许本地访问

    ```ini
    listen.allowed_clients  = 127.0.0.1
    ```

-   listen.mode

    监听权限，仅支持监听对象是 unix 套接字

    如果使用 tcp 的端口方式访问，注释掉即可

    ```ini
    listen.mode = 0660
    ```

## Systemd 管理

php-fpm 自带了一套比较完善的进程管理指令，编译完成后还会在构建目录下生成 Unit 文件

### 加入 Systemd

1. 创建 php-fpm 单元文件

    ```bash
    $ vim /usr/lib/systemd/system/php-fpm.service
    ```

    内容查看 [php-fpm.service](./service/php-fpm.service.md)

2. 加入开机启动

    ```bash
    $ systemctl enable php-fpm
    ```

3. 重新加载 Systemd 配置文件

    ```bash
    $ systemctl daemon-reload
    ```

## php-fpm 注意事项

### 工作进程

1 个 unix-socket，对应 1 个 php-fpm 工作进程

### 配置文件

1 个 php-fpm 工作进程配置文件对应 1 个 unix-socket

多个配置文件，不允许指向同一个 unix-socket，会出现冲突

每个配置文件：

-   必须设置单独的 socket 文件路径，如：tp6.sock、default.sock
-   可以设置自己的用户，如：www、nginx、phpfpm、nobody

## 动态(共享)扩展

有年限的服务器，内部网站复杂，如果新人刚刚过来，确实不宜重新构建，如果缺少扩展，最好以动态方式安装

这里以安装 imagick 为例

### 依赖库

imagick 扩展需要 ImageMagick 库支持，下面是构建指令

```bash
$ cd /package/lnmp/ImageMagick-7.1.0-13/
$ nohup ./configure --prefix=/server/ImageMagick/ &
$ nohup make -j2 &
$ make check
$ make install
```

> 提示：静态编译 Imagick 扩展到 PHP，同样需要先安装 ImageMagick 包

```bash
# 使用 nohup + 指令 + & 程序将在后台执行
# 需要使用 ps 指令来查看是否执行完毕
$ ps -ef|grep -E "id号|PID" |grep -v grep

```

### 使用 phpize

推荐大家使用，phpize 编译共享 PECL 扩展库

> phpize 指令

-   获取帮助

    ```bash
    $ /server/php/bin/phpize --help
    ```

-   获取版本

    ```bash
    $ /server/php/bin/phpize --version
    $ /server/php/bin/phpize -v
    ```

-   清除 phpize 产生的临时文件

    ```bash
    $ /server/php/bin/phpize --clean
    ```

### 编译动态扩展

php 核心扩展、内置扩展、捆绑扩展、pecl 扩展，它们的安装方式都大同小异

```bash
$ cd /package/lnmp/ext_dynamic/imagick-3.5.1/
$ /server/php/bin/phpize
$ ./configure --with-php-config=/server/php/bin/php-config \
--with-imagick=/server/ImageMagick
$ make
$ make test
$ make install
```

### 开启 imagick

imagick 作为共享扩展需要在 php.ini 文件里启用

-   开启方式

    在 php.ini 第 960 行左右，添加一行内容

    ```ini
    extension=imagick
    ```

-   重新加载 php-fpm

    ```bash
    $ service php-fpm reload
    ```

> 到此，共享扩展安装完成

## Composer

警告：服务器下建议不要安装 git composer npm 等开发辅助工具

如果由需要，在开发环境处理好，然后拷贝进服务器即可

Composer 是一个 PHP 依赖管理工具

### 安装

官方安装方式

```bash
$ cd /server/php/bin
$ ./php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
# 验证需要去官方获取最新数据
$ ./php -r "if (hash_file('sha384', 'composer-setup.php') === '906a84df04cea2aa72f40b5f787e49f22d4c2f19492ac310e8cba5b96ac8b64115ac402c8cd292b8a03482574915d1a8') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
$ ./php composer-setup.php
$ ./php -r "unlink('composer-setup.php');"
```

网速不佳，也可以直接用阿里云镜像 [下载 composer](https://mirrors.aliyun.com/composer/composer.phar)

### 全量镜像

全局配置阿里云 Composer 全量镜像

```bash
$ /server/php/bin/php /server/php/bin/composer.phar config -g repo.packagist composer https://mirrors.aliyun.com/composer/
```

取消阿里云 Composer 全量镜像配置

```bash
$ /server/php/bin/php /server/php/bin/composer.phar config -g --unset repos.packagist
```

### nginx 站点

-   1 个站点

    不同目录或文件类型，可以指向不同的 unix-socket

-   多个站点

    允许指向同一个 unix-socket，这是推荐的用法

## 数据库管理工具

将 /package/lnmp/default/ 目录下的 adminer、phpMyAdmin、phpRedisAdmin 加入到默认站点

```bash
$ cd /package/lnmp/default/
$ mv adminer-xxx.php /server/default/adminer.php
$ mv phpMyAdmin-xxx.php /server/default/pma
$ mv phpRedisAdmin-xxx.php /server/default/pra
```

### adminer

adminer 支持 MariaDB、sqlite3

使用 pdo 链接

不需要做任何配置

### phpMyAdmin

phpMyAdmin 支持 MariaDB

使用 mysqli 链接

需要简单配置下：

1. 新建配置文件

    在 pma 根目录下新建 config.inc.php 文件

    ```bash
    $ cd /server/default/pma/
    $ touch config.inc.php
    ```

2. 配置文件内容

    ```php
    <?php
    declare(strict_types=1);

    $cfg['blowfish_secret'] = 'pma的密文，建议设置大于32为的随机字符串，这样更加安全';
    $i = 0;
    $i++;

    $cfg['Servers'][$i]['auth_type'] = 'cookie';
    $cfg['Servers'][$i]['host'] = 'localhost';
    $cfg['Servers'][$i]['compress'] = false;
    $cfg['Servers'][$i]['AllowNoPassword'] = false;

    $cfg['UploadDir'] = '';
    $cfg['SaveDir'] = '';
    $cfg['TempDir']  = '/tmp/';

    $cfg['DefaultLang'] = 'zh_CN';
    $cfg['ThemeDefault'] = 'original';
    ```

    其中，pma 的密文 `$cfg['blowfish_secret']` 参数需要重新设置

3. pma 密文

    $cfg['blowfish_secret'] 参数用于设置 pma 密文，支持如下字符类型组合：

    - 数值: `0-9`
    - 大写字母: `A-Z`
    - 小写字母: `a-z`
    - ascii 特殊字符: `\~!@#$%^&*()_+-=[]{}\|;:'"/?.>,<`

### phpRedisAdmin

phpRedisAdmin 需要使用 composer 安装依赖后，才能正常使用

```bash
$ cd /server/default/pra
$ /server/php/bin/php /server/php/bin/composer.phar update
```
