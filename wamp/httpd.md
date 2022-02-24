# httpd 操作篇

httpd 是当前最流行的 web 服务器软件之一，当下全球排行第二，已经被 nginx 超过

## httpd 配置文件

httpd 配置文件分为 `根配置文件` 和 `自定义配置文件`

> 根配置文件

| 属性     | 说明                               |
| -------- | ---------------------------------- |
| 路径     | C:/wamp/base/httpd/conf/httpd.conf |
| 数量     | 有且仅有 1 个                      |
| 生成方式 | 由官方源码编译成二进制包时指定     |

> 自定义配置文件

| 属性 | 说明                         |
| ---- | ---------------------------- |
| 路径 | 由开发者自行指定路径         |
| 数量 | 不限，如：站点虚拟机配置文件 |
| 依赖 | 依赖 mod_include.so 扩展     |

httpd 配置文件常用知识点都在这里了，下面开始讲解

## 设置变量

httpd 配置文件中经常使用路径或端口，我们可以为它们设置变量：

| 变量属性 | 内容                   |
| -------- | ---------------------- |
| 格式     | `Define 变量名 变量值` |
| 使用     | `${变量名}`            |

-   wamp 包中，httpd 变量列表及其作用说明：

    | 变量名称 | wamp 根目录                |
    | -------- | -------------------------- |
    | 定义变量 | Define WAMP_ROOT "c:/wamp" |
    | 输出变量 | ${WAMP_ROOT}               |

    | 变量名称 | httpd 根目录                             |
    | -------- | ---------------------------------------- |
    | 定义变量 | Define SRVROOT "${WAMP_ROOT}/base/httpd" |
    | 输出变量 | ${SRVROOT}                               |
    | 默认值   | Define SRVROOT "c:/Apache24"             |

    | 变量名称 | 站点根目录                           |
    | -------- | ------------------------------------ |
    | 定义变量 | Define HTDOCS "${WAMP_ROOT}/web/www" |
    | 输出变量 | ${HTDOCS}                            |

    | 变量名称 | 站点日志根目录                              |
    | -------- | ------------------------------------------- |
    | 定义变量 | Define HTLOGS "${WAMP_ROOT}/web/logs/httpd" |
    | 输出变量 | ${HTLOGS}                                   |

    | 变量名称 | http 协议端口         |
    | -------- | --------------------- |
    | 定义变量 | Define HTTP_PORT "80" |
    | 输出变量 | ${HTTP_PORT}          |

    | 变量名称 | https 协议端口          |
    | -------- | ----------------------- |
    | 定义变量 | Define HTTPS_PORT "443" |
    | 输出变量 | ${HTTPS_PORT}           |

提示：尽量少定义变量，这会增加 httpd 的负荷！

## 增加自定义配置文件

| 概述                                                  |
| ----------------------------------------------------- |
| 在父级配置文件中，通过 Include 语句加载自定义配置文件 |
| Include 语句依赖于 mod_include.so 扩展                |
| Include 的值支持相对路径和绝对路径                    |

-   根配置文件中，载入子配置文件：

    ```apacheconf
    <IfModule include_module>
        Include "${WAMP_ROOT}/base/conf/httpd.conf"
    </IfModule>
    ```

-   子配置文件中，载入 ssl 配置文件以及虚拟主机配置文件

    ```apacheconf
    <IfModule include_module>
        Include "${WAMP_ROOT}/base/conf/httpd-ssl.conf"
        Include "${WAMP_ROOT}/web/sites/*.conf"
    </IfModule>
    ```

## 清理多余配置项目

httpd 自带的根配置文件有很多注释说明以及多余配置，我们可以将其移除，具体如下：

-   移除所有注释内容
-   除了载入 mod_include.so 模块外，其余配置都可以在自定义配置文件里配置

| 项目配置文件列表                           |
| ------------------------------------------ |
| [根配置文件](./source/httpd-root.md)       |
| [子配置文件](./source/httpd-sub.md)        |
| [ssl 配置文件](./source/httpd-ssl.md)      |
| [虚拟主机配置文件模板](./source/vhosts.md) |

下面我们开始讲解 httpd 配置文件中我们可能需要改变的内容

## 加载必要模块

我们搭建的 wamp 环境额外增加如下插件，这些插件默认不开启，需自己启用，加载模块具体格式：

```apacheconf
LoadModule 模块标识符 模块路径
```

1. 虚拟主机模块

    ```apacheconf
    LoadModule vhost_alias_module modules/mod_vhost_alias.so
    ```

2. 伪静态模块

    ```apacheconf
    LoadModule rewrite_module modules/mod_rewrite.so
    ```

3. 文件缓存模块

    ```apacheconf
    LoadModule headers_module modules/mod_headers.so
    ```

4. 压缩传输模块

    传输速度加快，服务器负荷增加，配合文件缓存模块效果更佳

    ```apacheconf
    LoadModule deflate_module modules/mod_deflate.so
    ```

5. 过滤器模块

    可以实现，只允许部分格式的文件，进行压缩传输

    ```apacheconf
    LoadModule filter_module modules/mod_filter.so
    ```

6. ssl 模块

    ```apacheconf
    LoadModule ssl_module modules/mod_ssl.so
    ```

7. 共享对象缓存

    主要是根 ssl 模块结合使用，提高 https 访问效率

    ```apacheconf
    LoadModule socache_shmcb_module modules/mod_socache_shmcb.so
    ```

## 加载 php 处理模块

在 wamp 里 php 通常以 httpd 模块的形式被加载，具体加载步骤如下：

1. 加载 httpd 自带的 php8 模块

    建议以绝对路径的方式加载 dll 形式的模块

    ```apacheconf
    LoadModule php_module ${WAMP_ROOT}/base/php/php8apache2_4.dll
    ```

2. 获取 php 模块必备配置信息

    ```apacheconf
    <IfModule php_module>
        PHPINIDir "${WAMP_ROOT}/base/php"
        # 下面的 loadFIle 语句是为了解决 php 的 curl、openssl模块的问题
        LoadFile  "${WAMP_ROOT}/base/php/libssh2.dll"
        LoadFile  "${WAMP_ROOT}/base/php/libcrypto-1_1-x64.dll"
        LoadFile  "${WAMP_ROOT}/base/php/libssl-1_1-x64.dll"
    </IfModule>
    ```

## httpd 缺省设置

这些值会为稍后在文件中定义的任何虚拟主机容器提供缺省值。

1. 设置全局邮箱地址

    多站点模式下，没有指定邮箱地址的虚拟主机都会指向该邮箱

    ```apacheconf
    ServerAdmin qy@y746.com
    ```

2. 设置全局主机名

    多站点模式下，没有指定主机名的虚拟主机都会指向该主机名

    ```apacheconf
    ServerName localhost
    ```

    > 提示：这会造成一个问题，就是访问 localhost 的时候，可能是某个虚拟主机的路径

3. 设置全局目录

    多站点模式下，没有指定 DocumentRoot 的虚拟主机都会指向该路径

    ```apacheconf
    DocumentRoot "${WAMP_ROOT}/base/default"
    ```

4. 设置访问权限

    整个服务器文件系统，拒绝用户访问

    ```apacheconf
    <Directory />
        AllowOverride None
        Require all denied
    </Directory>
    ```

    httpd 全局目录访问权限，允许用户访问文件

    ```apacheconf
    <Directory "${WAMP_ROOT}/base/default">
        Options FollowSymLinks
        AllowOverride None
        DirectoryIndex index.php
        <RequireAll>
            Require local
        </RequireAll>
    </Directory>
    ```

    虚拟主机根目录访问权限，允许用户访问文件以及索引

    ```apacheconf
    <Directory "${HTDOCS}">
        Options FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    ```

5. 设置监听端口

    新版本在没有设置监听端口时，httpd 将无法启动

    可以通过多个 Listn 语句，来添加多个监听端口

    ```apacheconf
    Listen ${HTTP_PORT}
    Listen ${HTTPS_PORT}
    ```

## 单站点模式

如果服务器只有一个站点的话，不需要加载虚拟主机模块， 使用全局目录作为站点根目录

## 多站点模式

多站点需要加载虚拟主机模块，来创建多个虚拟主机

1. 设置虚拟主机缺省站点

    如果未通过 `_default_` 设置缺省站点，第 1 个虚拟站点会默认升级为缺省站点，具体定义如下：

    ```apacheconf
    # http 协议的缺省站点
    <VirtualHost _default_:${HTTP_PORT}>
        DocumentRoot "${WAMP_ROOT}/base/default"
    </VirtualHost>
    # https 协议的缺省站点
    <VirtualHost _default_:${HTTPS_PORT}>
        DocumentRoot "${WAMP_ROOT}/base/default"
    </VirtualHost>
    ```

    缺省站点作用：解析到服务器的域名，如果没有配置虚拟主机，会自动跳转到虚拟主机的缺省站点

## 常用指令说明

日程开发掌握这些指令就能完成 95%的工作

### Options

Options 指令控制特定目录中可用的服务器功能，具体属性值如下：

| 属性值                 | 描述                           |
| ---------------------- | ------------------------------ |
| None                   | 不会启用任何其他功能           |
| Indexes                | 允许索引目录列表               |
| FollowSymLinks         | 允许打开文件，这是默认设置     |
| ~All~                  | ~除 MultiViews 以外的所有选项~ |
| ~ExecCGI~              | ~允许执行 CGI 脚本~            |
| ~Includes~             | ~允许服务器端包含~             |
| ~IncludesNOEXEC~       | ~允许部分服务器端包含~         |
| ~MultiViews~           | ~允许多视图~                   |
| ~SymLinksIfOwnerMatch~ | ~仅允许打开文件~               |

开发环境案例：

```apacheconf
<Directory "${HTDOCS}">
    Options FollowSymLinks Indexes
</Directory>
```

部署环境案例：

```apacheconf
<Directory "${HTDOCS}">
    Options FollowSymLinks
</Directory>
```

### AllowOverride

控制站点是否支持 `.htaccess` 文件，主要属性值如下：

| 属性值     | 描述                                 |
| ---------- | ------------------------------------ |
| None       | 忽略 `.htaccess` 文件伪指令          |
| All        | `.htaccess` 允许使用任何支持的伪指令 |
| AuthConfig | `.htaccess` 允许使用授权指令         |
| FileInfo   | `.htaccess` 允许使用控制文档类型指令 |
| Indexes    | `.htaccess` 允许使用控制索引的指令   |
| Limit      | `.htaccess` 允许使用控制访问的指令   |

开发环境案例：

```apacheconf
<Directory "${HTDOCS}">
    AllowOverride All
</Directory>
```

部署环境案例：

```apacheconf
<Directory "${HTDOCS}">
    AllowOverride None
</Directory>
```

### Require

Require 含容器和指令两块内容，具体内容我们放到授权里详细讲解

## 授权

一个授权工作可以由多个授权容器和一系列授权指令组合完成，最终得出是 true 还是 false

### 授权容器

mod_authz_core 模块包含 3 种授权容器，授权容器返回 3 种状态，具体如下：

> 授权容器状态值:

| 状态值 | 说明         |
| ------ | ------------ |
| true   | 授权验证成功 |
| false  | 授权验证失败 |
| none   | 授权验证无效 |

1. `<RequireAll>` 容器

    返回 true ，需要同时满足以下 2 个条件：

    ```text
    1. 该授权容器里的指令，不能出现验证不通过的
    2. 该授权容器里的指令，至少有1个指令验证通过
    ```

    返回 none，需要满足以下 2 个条件：

    ```text
    1. 该授权容器里的指令，既没有验证不通过的
    2. 该授权容器里的指令，也没有验证通过的
    ```

    其它情况下，始终返回 false

2. `<RequireAny>` 容器

    返回 true ，需要满足以下条件：

    ```text
    - 该授权容器里的指令，只要有1个指令验证通过
    ```

    返回 none，需要满足以下 2 个条件：

    ```text
    1. 该授权容器里的指令，既没有验证不通过的
    2. 该授权容器里的指令，也没有验证通过的
    ```

    其它情况下，始终返回 false

3. `<RequireNone>` 容器

    返回 true ，需要满足的条件：

    ```text
    - 该授权容器永远无法返回 true
    ```

    返回 none，需要满足以下条件：

    ```text
    - 该授权容器里的指令，不能出现验证通过的
    ```

    其它情况下，始终返回 false

### 授权语句

httpd 常用授权指令包含如下：

1. Require all

    | 描述     | 指令                |
    | -------- | ------------------- |
    | 全部允许 | Require all granted |
    | 全部拒绝 | Require all denied  |

2. Require method

    设置允许的 http 请求

    ```apacheconf
    # 仅允许 HEAD GET POST OPTIONS 请求方法
    Require method GET POST OPTIONS
    ```

    ```apacheconf
    <RequireAny>
        # 允许 HEAD GET POST OPTIONS 请求方法
        Require method GET POST OPTIONS
        # 其他请求方法都需要有效用户
        Require valid-user
    </RequireAny>
    ```

3. Require expr

    允许以正则表达式授权，日常很少使用

> 下面列举一些常用授权指令：

```apacheconf
Require all granted
    无条件允许访问
Require all denied
    无条件拒绝访问
Require env env-var [env-var] ...
    仅当设置了给定的环境变量之一时才允许访问
Require method http-method [http-method] ...
    仅允许对给定的 HTTP 方法进行访问
Require expr expression
    如果表达式的计算结果为真，则允许访问。
Require user userid [userid] ...
    只有指定用户才能访问资源
Require group group-name [group-name] ...
    只有指定用户组中的用户才能访问资源
Require valid-user
    所有有效用户都可以访问该资源
Require ip 10 172.20 192.168.2
    指定 IP 地址范围内的客户端可以访问该资源
Require forward-dns dynamic.example.org
    从地址为 dynamic.example.org 的 DNS 中，解析出的客户端 IP 将被授予访问权限
```

## 默认读取文件

mod_dir 模块使用 DirectoryIndex 参数控制浏览器访问默认文件，具体设置如下：

```apacheconf
<IfModule dir_module>
    DirectoryIndex index.html index.php
</IfModule>
```

配置多个默认文件，会从左往右索引文件，直到找到为止

无法找到页面将无法显示或输出目录索引列表

## 阻止客户端查看特殊文件

httpd 可以让某些固定格式的文件不被浏览者访问，如：会禁用 `.htaccess` 和 `.htpasswd` 文件被 Web 客户端查看

1. Files 支持简单的文件匹配

    ```apacheconf
    <Files ".ht*">
        Require all denied
    </Files>
    ```

2. FilesMatch 支持正则匹配

    ```apacheconf
    <FilesMatch ".+\.(gif|jpe?g|png)$">
        Require all denied
    </FilesMatch>
    ```

## 关联 php 文件的扩展名

默认情况下 mime_module 不支持 php 文件，我们需要新增对 php 脚本文件的支持：

1. 将 .php 格式设为 php 脚本文件，httpd 会自动提交给 php 模块处理

    ```apacheconf
    <IfModule mime_module>
        AddType application/x-httpd-php .php
    </IfModule>
    ```

2. 将 .php .py .asp .jsp 格式都设为 php 脚本文件，这些格式都会自动提交给 php 模块处理

    ```apacheconf
    <IfModule mime_module>
        AddType application/x-httpd-php .php .py .asp .jsp
    </IfModule>
    ```

## 设置别名

别名的作用，是让所有虚拟主机上在访问某个地址时，访问的都是同一个目录，用于通用的内容再合适不过

```apacheconf
Alias /pma ${WAMP_ROOT}/base/default/pma
Alias /phpmyadmin ${WAMP_ROOT}/base/default/pma
Alias /adminer ${WAMP_ROOT}/base/default/adminer.php
Alias /phpinfo ${WAMP_ROOT}/base/default/phpinfo.php
<Directory ${WAMP_ROOT}/base/default/pma/libraries>
    Require all denied
</Directory>
<Directory ${WAMP_ROOT}/base/default/pma/setup/lib>
    Require all denied
</Directory>
```

## 文件压缩传输

文件压缩传输配合缓存案例如下：

```apacheconf
<IfModule deflate_module>
    SetOutputFilter DEFLATE

    SetEnvIfNoCase Request_URI .(?:gif|jpe?g|png)$ no-gzip dont-vary
    SetEnvIfNoCase Request_URI .(?:exe|t?gz|zip|bz2|sit|rar)$ no-gzip dont-vary
    SetEnvIfNoCase Request_URI .(?:pdf|mov|avi|mp3|mp4|rm)$ no-gzip dont-vary

    # 仅满足条件的文件开启压缩传输
    <IfModule filter_module>
        AddOutputFilterByType DEFLATE text/html text/css
        AddOutputFilterByType DEFLATE application/javascript application/x-httpd-php
    </IfModule>
</IfModule>

<IfModule headers_module>
    RequestHeader unset Proxy early

    # ====== start 压缩文件缓存处理
    RewriteCond "%{HTTP:Accept-encoding}" "gzip"
    RewriteCond "%{REQUEST_FILENAME}\.gz" -s
    RewriteRule "^(.*)\.(css|js|htm|html|php)"         "$1\.$2\.gz" [QSA]

    RewriteRule "\.css\.gz$" "-" [T=text/css,E=no-gzip:1]
    RewriteRule "\.htm\.gz$" "-" [T=text/html,E=no-gzip:1]
    RewriteRule "\.html\.gz$" "-" [T=text/html,E=no-gzip:1]
    RewriteRule "\.js\.gz$"  "-" [T=application/javascript,E=no-gzip:1]
    RewriteRule "\.php\.gz$" "-" [T=application/x-httpd-php,E=no-gzip:1]
    # 这类文件直接开启gzip响应头
    <FilesMatch "(\.js\.gz|\.css\.gz|\.htm\.gz|\.html\.gz|\.php\.gz)$">
      Header append Content-Encoding gzip
      Header append Vary Accept-Encoding
    </FilesMatch>
    # ====== end 压缩文件缓存处理
</IfModule>
```

## 配置 ssl 自签证书

自签证书有 3 个组织或个人

| 序号 | 内容    |
| ---- | ------- |
| 1    | CA 机构 |
| 2    | 服务端  |
| 3    | 客户端  |

生成证书需要在指定目录处理，便于加载 openssl 配置文件

-   进入目录：c:\wamp\base\conf\keys

### 生成 CA 机构的数据

CA 机构是给服务端和客户端颁发证书的，其本质也是密钥对

1. 生成 CA 机构的私钥

    ```cmd
    > openssl genrsa -out ca.key 1024
    ```

2. 生成 CA 机构的证书签名请求管理

    ```cmd
    > openssl req -new -key ca.key -out ca.csr -config ../openssl.cnf -days 36500
    ```

3. 生成 CA 机构的证书数据管理

    ```cmd
    > openssl x509 -req -in ca.csr -signkey ca.key -out ca.crt  -days 36500
    ```

### 生成服务端的数据

服务端存放网站数据，只有服务端被认证为安全可靠，用户信息才有保障

1. 生成服务端私钥

    ```cmd
    > openssl genrsa -out server.key 1024
    ```

2. 生成服务端公钥

    ```cmd
    > openssl rsa -in server.key -pubout -out server.pem
    ```

3. 服务端向 CA 机构申请签名证书

    ```cmd
    > openssl req -new -key server.key -out server.csr -config ../openssl.cnf -days 36500
    ```

4. CA 机构为服务端颁发安全证书

    ```cmd
    > openssl x509 -req -CA ca.crt -CAkey ca.key -CAcreateserial -in server.csr -out server.crt -days 36500
    ```

### 生成客户端的数据

有时候服务端也需要确保客户端是安全可靠的，比如支付、登录管理后台等

1. 生成客户端私钥

    ```cmd
    > openssl genrsa -out client.key 1024
    ```

2. 生成客户端公钥

    ```cmd
    > openssl rsa -in client.key -pubout -out client.pem
    ```

3. 客户端向 CA 机构申请签名证书

    ```cmd
    > openssl req -new -key client.key -out client.csr -config ../openssl.cnf -days 36500
    ```

4. CA 机构为客户端颁发安全证书

    ```cmd
    > openssl x509 -req -CA ca.crt -CAkey ca.key -CAcreateserial -in client.csr -out client.crt -days 36500
    ```

### ssl 版虚拟主机

1. 单向验证 —— 验证服务端

    客户端需要确认服务端安全可靠

    ```apacheconf
    <VirtualHost *:${HTTPS_PORT}>
        SSLEngine on
        SSLCertificateFile "${WAMP_ROOT}/base/conf/keys/server.crt"
        SSLCertificateKeyFile "${WAMP_ROOT}/base/conf/keys/server.key"
    </VirtualHost>
    ```

2. 单向验证 —— 验证客户端

    服务端需要确认客户端安全可靠

3. 双向验证

    客户端需要确认服务端安全可靠

    服务端需要确认客户端安全可靠

## 日志

httpd 日志主要用到的是访问日志和错误日志

### 错误日志

错误日志用于记录服务器将遇到的任何错误记录，最主要的 2 个指令如下：

1. ErrorLog

    指定错误日志记录文件名，如果文件路径不是绝对路径，则假定它相对于 httpd 根目录

2. LogLevel

    LogLevel 指令用于调整错误日志中记录的消息的详细程度，具体如下：

    | 级别   | 说明                   |
    | ------ | ---------------------- |
    | emerg  | 紧紧急(系统无法使用)   |
    | alert  | 必须立即采取行动       |
    | crit   | 致命情况               |
    | error  | 错误情况               |
    | warn   | 警告情况               |
    | notice | 一般重要情况           |
    | info   | 普通信息               |
    | debug  | 调试信息               |
    | trace1 | Trace messages         |
    | trace2 | Trace messages         |
    | trace3 | Trace messages         |
    | trace4 | Trace messages         |
    | trace5 | Trace messages         |
    | trace6 | Trace messages         |
    | trace7 | 跟踪消息，转储大量数据 |
    | trace8 | 跟踪消息，转储大量数据 |

通常我们使用分割是方式来记录错误日志：

```apacheconf
LogLevel crit
ErrorLog "|${SRVROOT}/bin/rotatelogs.exe -t ${HTLOGS}/error/error_log.%Y-%m-%d-%H_%M_%S 5M 480"
```

### 访问日志

mod_log_config 模块提供了 Client 端请求的灵活日志记录，此模块提供了三个指令：

| 指令        | 说明                   |
| ----------- | ---------------------- |
| TransferLog | 创建日志文件           |
| LogFormat   | 设置自定义格式         |
| CustomLog   | 一步定义日志文件和格式 |

通常我们使用分割是方式来记录访问日志：

```apacheconf
<IfModule log_config_module>
    LogFormat "$V-%h %l %u %t \"%r\" %>s %b \"%{Referer}i\" \"%{User-Agent}i\"" combined
    LogFormat "$V-%h %l %u %t \"%r\" %>s %b" common
    LogFormat "%h-%v-%V %l %u %t \"%r\" %>s %b \"%{Referer}i\" \"%{User-Agent}i\"" newlogformat

    <IfModule logio_module>
    LogFormat "$V-%h %l %u %t \"%r\" %>s %b \"%{Referer}i\" \"%{User-Agent}i\" %I %O" combinedio
    </IfModule>

    SetEnvIf Request_URI "\.(ico|gif|jpg|png|bmp|swf|css|js)$" dontlog

    CustomLog "|${SRVROOT}/bin/rotatelogs.exe -t ${HTLOGS}/access/access_log.%Y-%m-%d 86400 480" newlogformat env=!dontlog
</IfModule>
```
