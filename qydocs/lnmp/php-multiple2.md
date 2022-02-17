# PHP 多版本篇

很多老项目，通常都需要指定 PHP 的低版本才能正常运行

不管时部署环境还是开发环境都有这方面的需求，所以本次增加了 php 多版本的安装教程

## 测试版本

本次我们主要选择 3 款 php 来测试：

-   [php 7.4](https://www.php.net/distributions/php-7.4.27.tar.bz2) : 较新版本
-   [php 8.0](https://www.php.net/distributions/php-8.0.14.tar.bz2) : 较新版本
-   [php 8.1](https://www.php.net/distributions/php-8.1.1.tar.bz2) : 最新版本

> 提示：php7.x 到 php 8.x 在安装上不会有太大的区别，5.6 体验实在糟糕，理论上已经不适合部署在新版服务器上了

## 安装前的准备

下面这些是安装 php 前我们需要先完成的工作

### 安装静态编译

将 PECL 扩展拷贝到 php 的 ext 目录下

```sh
# 拷贝到 php 8.1 源码的扩展目录
$ cp -p -r redis-5.3.5 /package/lnmp/php-8.1.1/ext/redis
$ cp -p -r yaml-2.2.2 /package/lnmp/php-8.1.1/ext/yaml
$ cp -p -r imagick-3.6.0 /package/lnmp/php-8.1.1/ext/imagick

# 拷贝到 php 8.0 源码的扩展目录
$ cp -p -r redis-5.3.5 /package/lnmp/php-8.0.14/ext/redis
$ cp -p -r yaml-2.2.2 /package/lnmp/php-8.0.14/ext/yaml
$ cp -p -r imagick-3.6.0 /package/lnmp/php-8.0.14/ext/imagick

# 拷贝到 php 7.4 源码的扩展目录
$ cp -p -r redis-5.3.5 /package/lnmp/php-7.4.27/ext/redis
$ cp -p -r yaml-2.2.2 /package/lnmp/php-7.4.27/ext/yaml
$ cp -p -r imagick-3.6.0 /package/lnmp/php-7.4.27/ext/imagick
```

### 重新生成 configure

引入新的扩展后，需要强制 PHP 重新生成配置脚本 `configure`

-   安装 autoconf

    ```sh
    $ apt install autoconf -y
    ```

-   强制生成 configure

    `7.4 ~ 8.1` 生成 configure 的方式一样，这里以 8.1 为例：

    ```sh
    # php 8.1
    $ cd /package/lnmp/php-8.1.1/
    $ mv configure{,.original}
    $ ./buildconf --force
    ```

### 安装 ImageMagick

ImageMagick 是 php_imagick 的依赖库，通常更新版本能提高 php_imagick 的执行效率

为了更高效，本次采用编译安装 ImageMagick 的最新稳定版

```sh
$ cd /package/lnmp/ImageMagick-7.1.0-19/
$ ./configure --prefix=/server/ImageMagick/
$ nohup make -j2 &
$ make check
$ make install
```

## 安装 php

php `7.4 ~ 8.1` 在安装上基本一致，依赖也一样

其它低版本可能需要处理下依赖，像 5.6 版本部分依赖，debian11 已经不支持，就需要找到指定的版本号，自行编译

### 添加 pkg-config

构建 php 时，自己编译的依赖包需要手动加入到 pkg-config 中

使用 export 是临时加入环境变量中，但会永久记录在编译后的可执行文件信息里

```sh
$ export PKG_CONFIG_PATH=/server/sqlite3/lib/pkgconfig:$PKG_CONFIG_PATH
```

-   检测是否加入成功

    ```sh
    $ pkg-config --list-all | grep sqlite3
    ```

### 安装必要依赖：

```sh
$ apt install libxml2-dev -y
$ apt install libcurl4-openssl-dev libssl-dev -y
$ apt install zlib1g-dev -y
$ apt install libpng-dev libwebp-dev libjpeg-dev libxpm-dev libfreetype-dev -y
$ apt install libonig-dev -y
$ apt install libyaml-dev -y
```

### 进入 php 构建目录

进入构建目录方式一致，这里以 php 8.1 为例：

```sh
$ mkdir /server/php/8.1
$ mkdir /package/lnmp/php-8.1.1/build_php/
$ cd /package/lnmp/php-8.1.1/build_php/
```

### 安装指令

安装指令基本相同，差别仅在于 `--prefix=` 赋值不一样

-   php8.1 : `--prefix=/server/php/8.1`
-   php8.0 : `--prefix=/server/php/8.0`
-   php7.4: `--prefix=/server/php/7.4`

```sh
$ ../configure --prefix=/server/php/8.1 \
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
--with-imagick=/server/ImageMagick \
--with-yaml
```

编译并安装

```sh
$ nohup make -j2 &
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

下面两个指令，可以快速获取到配置文件存放路径，这里以 php8.1 为例：

```sh
# 使用 php-config 程序
$ /server/php/8.1/bin/php --ini

# 使用 php 程序
$ /server/php/8.1/bin/php-config --ini-path
```

### 拷贝推荐文件

```sh
# php 8.1
$ cp -p -r /package/lnmp/php-8.1.1/php.ini-development /server/php/8.1/lib/php.ini

# php 8.0
$ cp -p -r /package/lnmp/php-8.0.14/php.ini-development /server/php/8.0/lib/php.ini

# php 7.4
$ cp -p -r /package/lnmp/php-7.4.27/php.ini-development /server/php/7.4/lib/php.ini
```

### 开启 OPcache 扩展

OPcache 只能编译为共享扩展，php `7.4 ~ 8.1` 配置上一致

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

-   [php 8.1 主配置文件参考](./php/8.1/php-fpm.conf.md)
-   [php 8.1 工作池进程配置文件参考](./php/8.1/sites.conf.md)
-   [php 8.0 主配置文件参考](./php/8.0/php-fpm.conf.md)
-   [php 8.0 工作池进程配置文件参考](./php/8.0/sites.conf.md)
-   [php 7.4 主配置文件参考](./php/7.4/php-fpm.conf.md)
-   [php 7.4 工作池进程配置文件参考](./php/7.4/sites.conf.md)

## Systemd 管理

php-fpm 自带了一套比较完善的进程管理指令，编译完成后还会在构建目录下生成 Unit 文件

在 php 多版本共存的环境，我们需要自己去为每个 php 版本配置 Unit 文件

-   [php 8.1 Unit 文件参考](./service/phpfpm-8.1.service.md)
-   [php 8.0 Unit 文件参考](./service/phpfpm-8.0.service.md)
-   [php 7.4 Unit 文件参考](./service/phpfpm-7.4.service.md)

### 创建单元文件

-   php 8.1

    ```sh
    $ vim /usr/lib/systemd/system/phpfpm-8.1.service
    # 输入 php 8.1 Unit 文件参考中的内容
    ```

-   php 8.0

    ```sh
    $ vim /usr/lib/systemd/system/phpfpm-8.0.service
    # 输入 php 8.0 Unit 文件参考中的内容
    ```

-   php 7.4

    ```sh
    $ vim /usr/lib/systemd/system/phpfpm-7.4.service
    # 输入 php 7.4 Unit 文件参考中的内容
    ```

### 单元文件加入开机启动

```sh
$ systemctl enable phpfpm-8.1
$ systemctl enable phpfpm-8.0
$ systemctl enable phpfpm-7.4
```

### 重新加载 Systemd 配置文件

```sh
$ systemctl daemon-reload
```

## 注意事项

下面是 php 一些注意事项

### pid 文件

每个 php 版本的 php-fpm 只有一个唯一的 pid，其对应的 pid 文件只在两个文件里出现：

1. php-fpm 主进程配置文件
2. php-fpm 针对 Systemd 的 Unit 文件

> 建议: 这两个文件的 pid 文件路径设置成一样的

### unix-socket 文件

unix-socket 是类 unix 系统中，用来通讯的通用接口，每个 unix-socket 文件都具有单独处理业务的能力

-   每个 php-fpm 工作进程，对应着单独的 unix-socket 文件
-   多个 php-fpm 工作进程，不允许指向同一个 unix-socket 文件
-   unix-socket 文件路径，由 php-fpm `工作池进程配置文件` 指定

> 注意：不同 php-fpm `工作池进程配置文件` 中指向的 unix-socket 文件，不能出现重合的，否则程序会出错

### php-fpm 用户权限

php-fpm 用户分为： `工作进程用户和用户组` 和 `工作进程监听用户和用户组` 两种

这两类用户均由 `工作池进程配置文件` 指定，而不是 `主进程配置文件` 指定

这意味着，php-fpm 中不同的 `工作池进程` 可以拥有不同的用户权限，这种机制极大的提高了站点的安全性

#### 工作进程用户

工作进程用户和用户组，指的是当前工作进程的用户

#### 工作进程监听用户

工作进程监听用户和用户组，对应着当前工作进程监听的程序的用户

## Composer

Composer 是一个 PHP 依赖管理工具

> 提示：使用 Composer 是，不要使用 root 用户登录，比如：用 www 用户登录就很不错

### 安装

通常我们只需要在主 PHP 版本上安装一个 composer 即可

如果你要为不同版本的 php 安装多个也可以，这里不做具体说明

这里采用阿里云镜像 [直接下载 composer](https://mirrors.aliyun.com/composer/composer.phar)

需要单独安装的，可以去[composer 官方查看安装说明](https://getcomposer.org/download/)

```sh
$ cd /server/php/8.1/bin
$ curl -O https://mirrors.aliyun.com/composer/composer.phar
# curl -o https://mirrors.aliyun.com/composer/composer.phar composer.phar
# wget https://mirrors.aliyun.com/composer/composer.phar
$ chmod +x composer.phar
$ ln -s composer.phar composer
```

> 提示：由于市面上很多老项目 composer 上对 php8.x 不够友好，所以建议在 php7.4 或更低版本上安装 composer

### 升级

升级 composer 也非常简单，建议使用国内全量镜像后再升级

```sh
$ su www
$ /server/php/8.1/bin/php /server/php/8.1/bin/composer -V
$ /server/php/8.1/bin/php /server/php/8.1/bin/composer self-update
```

### 全量镜像

国内首推阿里云 Composer 全量镜像

```sh
$ su www
# 使用阿里云 Composer 全量镜像
$ /server/php/8.1/bin/php /server/php/8.1/bin/composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/

# 取消使用阿里云 Composer 全量镜像
$ /server/php/8.1/bin/php /server/php/8.1/bin/composer config -g --unset repos.packagist
```

## 加入环境变量中

开发环境可以将 php 主版本的可执行文件加入到用户环境变量中，这样在操作上会便捷很多

由于 composer 不建议在 root 中使用，所以我们只在 www 用户下添加：

-   加入到 bash 环境变量中：

    ```conf
    # ~/.bashrc 文件底部增加
    export PATH=$PATH:/server/php/8.1/bin:PATH=$PATH:/server/php/8.1/sbin
    ```

-   加入到 zsh 环境变量中：

    ```conf
    # ~/.zshrc 文件底部增加
    export PATH=$PATH:/server/php/8.1/bin:PATH=$PATH:/server/php/8.1/sbin
    ```

## PHP 版数据库管理工具

将 adminer、phpMyAdmin、phpRedisAdmin 加入到默认站点

```sh
$ mv adminer-xxx.php /server/default/adminer.php
$ mv phpMyAdmin-xxx.php /server/default/pma
$ mv phpRedisAdmin-xxx.php /server/default/pra
```

### adminer

adminer 使用 pdo 链接数据库，支持管理多种数据库，不需要额外配置

adminer 无需配置

-   将服务器上 sql 文件导入到数据库

    ```text
    - sql文件路径：文件必须和 adminer.php 在同级目录下
    - sql文件名称：`adminer.sql` 或者 `adminer.sql.gz`
    ```

### phpMyAdmin

phpMyAdmin 使用 mysqli 链接，支持管理 MariaDB、MySQL

phpMyAdmin 需要配置：

1. 新建配置文件

    在 pma 根目录下新建 config.inc.php 文件

    ```sh
    $ cd /server/default/pma/
    $ touch config.inc.php
    ```

2. 配置文件内容

    ```php
    <?php

    declare(strict_types=1);

    $blowfishSecret = '默认pma的密文，建议设置大于32为的随机字符串，这样更加安全';

    if (strpos(PHP_VERSION, '8.0.') === 0) {
        $cfg['blowfish_secret'] = 'php8.0' . $blowfishSecret;
    } elseif (strpos(PHP_VERSION, '8.1.') === 0) {
        $cfg['blowfish_secret'] = 'php8.1' . $blowfishSecret;
    } elseif (strpos(PHP_VERSION, '7.4.') === 0) {
        $cfg['blowfish_secret'] = 'php7.4' . $blowfishSecret;
    } else {
        $cfg['blowfish_secret'] = $blowfishSecret;
    }

    $i = 0;
    $i++;

    $cfg['Servers'][$i]['auth_type']       = 'cookie';
    $cfg['Servers'][$i]['host']            = 'localhost';
    $cfg['Servers'][$i]['compress']        = false;
    $cfg['Servers'][$i]['AllowNoPassword'] = false;

    $cfg['UploadDir'] = '';
    $cfg['SaveDir']   = '';
    $cfg['TempDir']   = '/tmp/';

    $cfg['DefaultLang']  = 'zh_CN';
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

```sh
$ use www
$ cd /server/default/pra
$ composer update
```
