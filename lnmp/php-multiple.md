# PHP 多版本篇

很多老项目，通常都需要指定 PHP 的低版本才能正常运行

不管时部署环境还是开发环境都有这方面的需求，所以本次增加了 php 多版本的安装教程

## 测试版本

本次我们主要选择 2 款 php 来测试：

-   [php 5.6](https://www.php.net/distributions/php-5.6.40.tar.gz) : 经典版本，很多老项目的运行环境
-   [php 8.1](https://www.php.net/distributions/php-8.1.0.tar.gz) : 最新稳定版本

> 提示：php7.x 到 php 8.x 在安装上不会有太大的区别

## 安装前的准备

下面这些是安装 php 前我们需要先完成的工作

### 安装静态编译

将 PECL 扩展拷贝到 php 的 ext 目录下

```bash
# 拷贝到 php 8.1 源码的扩展目录
$ cp -p -r redis-5.3.4 /package/lnmp/php-8.1.0/ext/redis
$ cp -p -r yaml-2.2.2 /package/lnmp/php-8.1.0/ext/yaml
$ cp -p -r imagick-3.6.0 /package/lnmp/php-8.1.0/ext/imagick

# 拷贝到 php 5.6 源码的扩展目录
$ cp -p -r redis-5.3.4 /package/lnmp/php-5.6.40/ext/redis
$ cp -p -r yaml-2.2.2 /package/lnmp/php-5.6.40/ext/yaml
$ cp -p -r imagick-3.6.0 /package/lnmp/php-5.6.40/ext/imagick
```

### 重新生成 configure

引入新的扩展后，需要强制 PHP 重新生成配置脚本 `configure`

-   安装 autoconf

    ```bash
    $ apt install autoconf -y
    ```

-   强制生成 configure

    ```bash
    # php 8.1
    $ cd /package/lnmp/php-8.1.0/
    $ mv configure{,.original}
    $ ./buildconf --force
    ```

    ```bash
    # php 5.6
    $ cd /package/lnmp/php-5.6.40/
    $ mv configure{,.original}
    $ ./buildconf --force
    ```

### 安装 ImageMagick

ImageMagick 是 php_imagick 的依赖库，通常更新版本能提高 php_imagick 的执行效率

为了更高效，本次采用编译安装 ImageMagick 的最新稳定版

```bash
$ cd /package/lnmp/ImageMagick-7.1.0-17/
$ ./configure --prefix=/server/ImageMagick/
$ nohup make -j2 &
$ make check
$ make install
```

## 安装 php

php 8.1 和 php 5.6 版本差距太大，安装上也有所区别

### 安装 php 8.1

#### 添加 pkg-config

构建 php 时，自己编译的依赖包需要手动加入到 pkg-config 中

使用 export 是临时加入环境变量中，但会永久记录在编译后的可执行文件信息里

```bash
$ export PKG_CONFIG_PATH=/server/sqlite3/lib/pkgconfig:$PKG_CONFIG_PATH
```

-   检测是否加入成功

    ```bash
    $ pkg-config --list-all
    ```

#### 安装必要依赖：

```bash
$ apt install libxml2-dev -y
$ apt install libcurl4-openssl-dev libssl-dev -y
$ apt install zlib1g-dev -y
$ apt install libpng-dev libwebp-dev libjpeg-dev libxpm-dev libfreetype-dev -y
$ apt install libonig-dev -y
$ apt install libyaml-dev -y
```

#### 安装指令

```bash
$ mkdir /server/php/8.1
$ mkdir /package/lnmp/php-8.1.0/build_php/
$ cd /package/lnmp/php-8.1.0/build_php/
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

### 编译并安装

```bash
$ nohup make -j2 &
$ make test
$ make install
```

### 安装 php 5.6

#### 添加 pkg-config

构建 php 时，自己编译的依赖包需要手动加入到 pkg-config 中

使用 export 是临时加入环境变量中，但会永久记录在编译后的可执行文件信息里

```bash
$ export PKG_CONFIG_PATH=/server/sqlite3/lib/pkgconfig:$PKG_CONFIG_PATH
```

-   检测是否加入成功

    ```bash
    $ pkg-config --list-all
    ```

#### 安装必要依赖：

1. curl

    php 5.6 无法自动识别 debian 11 自带的 curl

    这里直接从 [curl 官方](https://curl.se/download.html) 下载最新版

    ```bash
    # 解压即可，不需要编译
    $ cd /package/lnmp/
    $ tar -xjf curl-7.80.0.tar.bz2
    ```

    php 编译选项增加：

    ```bash
    --with-curl=/package/lnmp/curl-7.80.0/include/curl
    ```

2. freetype

    php 5.6 无法自动识别 debian 11 自带的 freetype

    亲测 [freetype-2.7.1](https://download.savannah.gnu.org/releases/freetype/freetype-2.7.tar.bz2) 可以完成 php5.6 编译，而 [freetype-2.11.1] 报错，其它版本大家也可以自己测试下

    [freetype 下载 1](https://download.savannah.gnu.org/releases/freetype/)

    [freetype 下载 2](https://sourceforge.net/projects/freetype/files/freetype2/)

    ```bash
    $ cd /package/lnmp/
    $ tar -xjf freetype-2.7.1.tar.bz2
    $ cd freetype-2.7.1
    $ mkdir /server/freetype
    $ ./configure --prefix=/server/freetype/
    $ nohup make -j2 &
    $ make install
    ```

3. openssl

    php 5.6 无法自动识别 debian 11 自带的 openssl

    本次编译 [openssl-1.0](https://www.openssl.org/source/old/)，其它版本自行测试

    ```bash
    $ cd /package/lnmp/
    $ tar -xzf openssl-1.0.2u.tar.gz
    $ cd openssl-1.0.2u
    $ mkdir /server/openssl-1.0
    $ ./config --prefix=/server/openssl-1.0/
    $ nohup make -j2 &
    $ make install
    ```

4. debian 自带

    ```bash
    $ apt install libvpx-dev -y
    ```

#### 安装指令

redis 和 yaml 没有安装成功，原因我估计是由于扩展包版本太新，只要降低 redis 和 yaml 扩展包版本即可

由于时间关系，这里不再做费力的测试

```bash
$ mkdir /server/php/5.6
$ mkdir /package/lnmp/php-5.6.40/build_php/
$ cd /package/lnmp/php-5.6.40/build_php/
$ ../configure --prefix=/server/php/5.6 \
--enable-fpm \
--with-fpm-user=phpfpm \
--with-fpm-group=phpfpm \
--disable-short-tags \
--with-openssl=/server/openssl-1.0/ \
--with-zlib \
--with-curl=/package/lnmp/curl-7.80.0/ \
--enable-exif \
--enable-ftp \
--with-gd \
--with-vpx-dir \
--with-jpeg-dir \
--with-png-dir \
--with-zlib-dir \
--with-xpm-dir \
--with-freetype-dir=/server/freetype/ \
--enable-mbstring \
--enable-mysqlnd \
--with-mysql-sock=/run/mysqld/mysqld.sock \
--with-mysqli=mysqlnd \
--with-pdo-mysql=mysqlnd \
--enable-sockets \
--with-imagick=/server/ImageMagick
```

#### 编译并安装

```bash
$ nohup make -j2 &
$ make test
$ make install
```

## 安装成功

这次体验非常糟糕，后续内容可以查看下个多版本测试：php8.0 + php8.1
