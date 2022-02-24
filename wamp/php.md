# php 操作篇

WAMP 下对 PHP 的配置相对简单，下面我们就开始吧

## 关于 php 配置文件

php 根目录下有 2 个配置文件模板，我们复制其中 1 个并重命名为 php.ini 即可！

-   开发环境示例模板： php.ini-development
-   部署环境示例模板： php.ini-production

WAMP 通常是开发环境，我们这里参考的是 php.ini-development，点击[查看完整案例](./source/php.ini.md)

## 绑定到 httpd

将 php 解释器做为模块绑定到 httpd，在 [httpd 操作篇](./httpd.md) 中已经详细讲解过

## 关于 php 模块

Win 下的 php 通常都是使用官方构建的二进制包，所以除了内置扩展外，其它扩展需要通过 php.ini 文件加载

### php 模块路径

Win 默认情况下认为 php 在 C 盘根目录下，所以默认存放模块目录别识别为 c:\php\etc

显然这是不对的，我们需要自己在 php.ini 文件中设置正确的模块路径

```ini
# 732 行，添加
extension_dir = "c:\wamp\base\php\etc"
```

### php 载入模块

php 采用相对于 extension_dir 设置的路径载入模块，所以必须在 extension_dir 之后才能生效，部分模块需要依赖项支持

| 格式   | 指令                         |
| ------ | ---------------------------- |
| 格式 1 | extension=php_moduleNmae.dll |
| 格式 2 | extension=moduleNmae         |

### php 常用模块

-   php_curl.dll

    ```text
    - 类型： 二进制包自带模块
    - 作用： 让 php 能够连接通讯各种服务器、使用各种协议
    - 依赖： 依赖 php_openssl.dll 模块
    ```

-   php_gd2.dll

    ```text
    - 类型： 二进制包自带模块
    - 作用： 图像处理
    - 依赖： 无
    ```

-   php_mbstring.dll

    ```text
    - 类型： 二进制包自带模块
    - 作用： 支持多字节
    - 依赖： 无
    ```

-   php_mysqli.dll

    ```text
    - 类型： 二进制包自带模块
    - 作用： 对 mysql 的 mysqli 语法支持
    - 依赖： 无
    ```

-   php_pdo_mysql.dll

    ```text
    - 类型： 二进制包自带模块
    - 作用： 对 mysql 支持 pdo 语法支持
    - 依赖： 无
    ```

-   php_sqlite3.dll

    ```text
    - 类型： 二进制包自带模块
    - 作用： 对 sqlite3 支持
    - 依赖： httpd需要加载到php自带的 libsqlite3.dll
    ```

-   php_pdo_sqlite3.dll

    ```text
    - 类型： 二进制包自带模块
    - 作用： 对 sqlite3 支持 pdo 语法支持
    - 依赖： httpd需要加载到php自带的 libsqlite3.dll
    ```

-   php_openssl.dll

    ```text
    - 类型： 二进制包自带模块
    - 作用： 对 openssl 支持
    - 依赖： 需正确设置 openssl.cafile 的ca文件
    ```

-   php_imagick.dll

    ```text
    - 类型： https://windows.php.net/downloads/pecl/releases/ 下载模块
    - 作用： 比gd2更好的处理图形操作
    - 依赖： https://windows.php.net/downloads/pecl/deps/ 下载对应版本的ImageMagick
    ```

-   php_redis.dll

    ```text
    - 类型： https://windows.php.net/downloads/pecl/releases/ 下载模块
    - 作用： 让php链接redis数据库
    - 依赖： 无
    - 备注： windows下的redis数据库是社区版，官方未支持windows系统
    ```

### php 错误提示

php.ini 通过对 display_errors 的设置控制是否对 php 语法错误进行提示，默认开启错误提示

-   开启错误提示： display_errors=On
-   关闭错误提示： display_errors=Off

### php 错误提示级别

php 通过 error_reporting 的设置控制错误提示级别，格式如下：

-   在 php.ini 配置文件内定义：

    ```ini
    error_reporting=错误级别别名
    ```

-   在 php 脚本文件内定义

    ```ini
    error_reporting(错误级别别名与位运算符组合);
    ```

### 错误级别

[错误级别一览表](http://php.net/manual/zh/errorfunc.constants.php)

可以使用 [php 位运算符规则](http://php.net/manual/zh/language.operators.bitwise.php) 来组合这些值或者屏蔽某些类型的错误

在 php.ini 配置文件里，只支持 `| ~ ! ^ &` 这 5 个位运算符

1.  php.ini 版

    说明：错误达到指定的错误级别才会提示错误报告，下面是案例：

    ```ini
    # 报告所有php错误
    error_reporting = E_ALL

    # 报告所有php错误，但是忽略：1）运行时通知；2）PHP对代码的修改建议
    E_ALL & ~E_DEPRECATED & ~E_STRICT
    ```

    > 注意：只能一个设置生效，所以 php.ini 文件里不要出现多个

2.  php 脚本文件版

    运用场景：一般是某个 php 脚本文件执行时遇到问题，针对当前文件开启调试功能，下面是案例：

    ```php
    // 关闭错误报告
    error_reporting(0);

    // 报告 runtime 错误
    error_reporting(E_ERROR | E_WARNING | E_PARSE);

    // 报告所有错误
    error_reporting(E_ALL);

    // 等同 error_reporting(E_ALL);
    ini_set("error_reporting", E_ALL);

    // 报告 E_NOTICE 之外的所有错误
    error_reporting(E_ALL & ~E_NOTICE);
    ```

    允许覆盖 php.ini 对应配置，只能 1 个设置生效，并且需要放在最靠近 `<?php` 的位置！

## `php.ini` 文件其它配置附录

文件上传相关配置列表：

-   file_uploads

    | 参数 | 说明               |
    | ---- | ------------------ |
    | On   | 允许 HTTP 文件上传 |
    | Off  | 禁止 HTTP 文件上传 |

    指令如下：

    ```ini
    file_uploads = On
    ```

-   upload_tmp_dir

    HTTP 上载文件的临时目录，默认将使用系统默认临时文件目录，指令如下：

    ```ini
    upload_tmp_dir = c:\wamp\tmp
    ```

-   upload_max_filesize

    上传文件允许的最大值，指令如下：

    ```ini
    # 上传文件最大允许为 2M
    upload_max_filesize = 2M
    ```

-   max_file_uploads

    单次请求上传文件的最大数量，指令如下：

    ```ini
    # 单次请求最多上传 20 个文件
    max_file_uploads = 20
    ```

-   post_max_size

    PHP 允许接收的 POST 数据最大值

    ```ini
    # POST 数据，php最多接收 8M
    post_max_size = 8M
    ```

php 执行脚本相关

-   max_execution_time

    每个脚本的最大执行时间，以秒为单位

    ```ini
    # 每个脚本最多执行30秒
    max_execution_time = 30
    ```

-   max_input_time

    每个脚本可能花费解析请求数据的最长时间，以秒为单位

    ```ini
    # 每个脚本最多花费60秒时间，解析请求数据
    max_input_time = 60
    ```

-   memory_limit

    脚本可能消耗的最大内存数量

    ```ini
    # 脚本最多消耗128M内存
    memory_limit = 128M
    ```

## CA 证书

openssl 模块需要依赖 CA 证书，才能更好的工作

1. 下载 CA 证书文件

    该 CA 证书文件是从 Mozilla 提取的

    - 下载地址：https://curl.se/ca/cacert.pem
    - 详细说明：https://curl.se/docs/caextract.html

2. CA 证书存放目录

    将 cacert.pem 证书文件，拷贝到 base/conf 目录下

3. 配置 openssl 的 CA 证书

    在 php.ini 最下方加上如下内容：

    ```ini
    [openssl]
    openssl.cafile="C:\wamp\base\conf\cacert.pem"
    ```

提示： 使用 openssl 模块安装 composer 时就需要依赖 CA 证书

## 安装 php_imagick.dll 模块

php_imagick.dll 用于替代 gd2，安装需要下载两个软件包：

-   imagick 模块包

    让 php 支持 imagick

    下载地址：[php_imagick](https://windows.php.net/downloads/pecl/releases/)

-   ImageMagick 依赖库

    php 的 imagick 模块依赖于 ImageMagick

    下载地址：[ImageMagick](https://windows.php.net/downloads/pecl/deps/)

-   版本选择

    imagick 模块的构建是依赖的 ImageMagick 版本必须要与我们下载的依赖库相互兼容

    通常在 php 官网下载最新的 php_imagick 模块；并在 php 官网下载最新的 ImageMagick 依赖库，都是兼容的

    在 php_imagick 根目录下的 ChangeLog 文件里，也可以看到大致的依赖库版本号

### 具体操作步骤如下：

1.  从 php_imagick 模块包里找到 php_imagick.dll，并拷贝到 php 的扩展目录
2.  php.ini 配置文件下开启 imagick 模块：

    ```ini
    extension=imagick
    ```

3.  将 ImageMagick 依赖库库解压到 C:\wamp\base\ImageMagick
4.  将 C:\wamp\base\ImageMagick\bin 加入到 win 系统环境变量 PATH 中

重要说明：C:\wamp\base\ImageMagick\bin 必须加入的 win 系统环境变量 PATH 中，因为 httpd 无法获取到用户环境变量！

## 配置 php_sqlite3 模块

php_sqlite3 是 php 内置模块，不需要其他依赖，但是 httpd 需要先加载 `libsqlite3.dll`

1. httpd 加载 sqlite3

    ```ini
    # httpd.conf
    <IfModule php_module>
        ...
        LoadFile "${WAMP_ROOT}/base/php/libsqlite3.dll"
        ...
    </IfModule>
    ```

2. 开启 PHP 扩展

    ```ini
    # php.ini
    extension=pdo_sqlite
    extension=sqlite3
    ```

## 安装 composer

windows 安装 composer 简易说明：

### 安装依赖：

-   PHP 版本： >= 5.3.2+
-   PHP 开启 openssl 模块
-   php.ini 下正确配置了 openssl 的 CA 证书（openssl.cafile）

### 安装步骤：

1. 首先将 PHP 根目录（c:\wamp\base\php）加入环境变量 PATH 中

    ```text
    如果没加入系统环境变量中，安装时就需要指定 php 可执行文件的全路径
    ```

2. 下载 composer 安装脚本

    可以是任意目录，建议进入 php 根目录

    ```cmd
    > cd c:\\wamp\\php
    > php.exe -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
    ```

3. 检测文件是否被篡改

    ```cmd
    > php -r "if (hash_file('sha384', 'composer-setup.php') === '756890a4488ce9024fc62c56153228907f1545c228516cbf63f885e036d37e9a59d27d63f46af1d4d07ee0f76181c7d3') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
    ```

    提示：composer-setup.php 文件官方会更新，所以 hash 值需要去[官网查看](https://getcomposer.org/download/)

4. 执行 composer 安装脚本：

    ```cmd
    > php.exe composer-setup.php
    ```

    执行脚本选项说明：

    ```text
    - 指定目标目录: php composer-setup.php --install-dir=bin
    - 指定文件名: php composer-setup.php --filename=composer
    - 指定特定版本: php composer-setup.php --version=2.1.6
    ```

5. `compser.phar` 安装成功，移除安装脚本：

    ```cmd
    > php.exe -r "unlink('composer-setup.php');"
    ```

6. 移动 composer.phar 文件到 php 根目录下

    ```text
    如果使用 git bash，需要拷贝一份，并重命名为：composer
    ```

7. 配置 bat 文件，方便 cmd 下操作：

    ```cmd
    > echo @php "%~dp0composer.phar" %*>composer.bat
    ```

### 切换 composer 镜像

我们建议更换成阿里云镜像，具体常用指令如下：

1. 全局更换 composer 镜像源

    ```cmd
    > composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/
    ```

2. 全局移除 composer 镜像源

    ```cmd
    > composer config -g --unset repos.packagist
    ```

3. 项目更换 composer 镜像源：

    ```cmd
    > composer config repo.packagist composer https://mirrors.aliyun.com/composer/
    ```

4. 项目移除 composer 镜像源

    ```cmd
    > composer config --unset repos.packagist
    ```

5. 全局恢复 composer 官方镜像：

    ```cmd
    > composer config -g repo.packagist composer https://packagist.org
    ```

6. 清除 composer 缓存

    ```cmd
    > composer clear
    ```

7. 更新项目

    ```cmd
    > composer update
    ```

8. 更新项目指定包

    ```cmd
    > composer update packageName
    ```

9. 更新项目 composer.lock 文件的源地址

    ```cmd
    > composer update --lock
    ```

10. 执行诊断命令：

    ```cmd
    > composer diagnose
    ```

11. 调试

    ```cmd
    > composer -vvv require alibabacloud/sdk
    ```

12. 更新 Composer 版本

    ```cmd
    > composer self-update
    ```
