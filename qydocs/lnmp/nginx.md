# Nginx 篇

Nginx 是现如今性能最强劲的 Web 服务器及反向代理服务器

## 构建前

### 查看构建参数

查看当前版本全部构建参数

```sh
$ cd /package/lnmp/nginx-1.20.2
$ ./configure --help
```

### 模块依赖环境

```sh
$ apt install make g++ libgeoip-dev pkg-config -y
```

查看 geoip 是否存在 pkg-config 列表中

```sh
$ pkg-config --list-all
```

## 构建指令

```sh
$ mkdir /package/lnmp/nginx-1.20.2/build_nginx
$ cd /package/lnmp/nginx-1.20.2
# 构建指令内容如下...
```

### 本次构建指令

```sh
$ ./configure --prefix=/server/nginx \
--builddir=/package/lnmp/nginx-1.20.2/build_nginx \
--user=nginx \
--group=nginx \
--error-log-path=/server/logs/nginx/error.log \
--http-log-path=/server/logs/nginx/access.log \
--pid-path=/server/run/nginx/nginx.pid \
# 核心功能模块
--with-threads \
--with-file-aio \
# 启用http功能模块
--with-http_ssl_module \
--with-http_v2_module \
--with-http_realip_module \
--with-http_geoip_module \
--with-http_gunzip_module \
--with-http_gzip_static_module \
--with-http_secure_link_module \
--with-http_degradation_module \
--with-http_stub_status_module \
# 禁用http功能模块
--without-http_upstream_hash_module \
--without-http_upstream_ip_hash_module \
--without-http_upstream_least_conn_module \
--without-http_upstream_random_module \
--without-http_upstream_keepalive_module \
--without-http_upstream_zone_module \
# 外库路径
--with-pcre=/package/lnmp/pcre-8.45 \
--with-pcre-jit \
--with-zlib=/package/lnmp/zlib-1.2.11 \
--with-openssl=/package/lnmp/openssl-1.1.1m
```

### 允许构建的全部指令

```sh
$ ./configure --prefix=/server/nginx \
--builddir=/package/lnmp/nginx-1.20.2/build_nginx \
--user=nginx \
--group=nginx \
--error-log-path=/server/logs/nginx/error.log \
--http-log-path=/server/logs/nginx/access.log \
--pid-path=/server/run/nginx/nginx.pid \
# 核心功能模块
--with-threads \
--with-file-aio \
# 启用http功能模块
--with-http_ssl_module \
--with-http_v2_module \
--with-http_realip_module \
--with-http_addition_module \
--with-http_xslt_module \
--with-http_image_filter_module \
--with-http_geoip_module \
--with-http_sub_module \
--with-http_dav_module \
--with-http_flv_module \
--with-http_mp4_module \
--with-http_gunzip_module \
--with-http_gzip_static_module \
--with-http_auth_request_module \
--with-http_random_index_module \
--with-http_secure_link_module \
--with-http_degradation_module \
--with-http_slice_module \
--with-http_stub_status_module \
# 启用邮箱服务
--with-mail \
--with-mail_ssl_module \
# 启用负载均衡服务
--with-stream \
--with-stream_ssl_module \
--with-stream_realip_module \
--with-stream_geoip_module \
--with-stream_ssl_preread_module \
# 外库路径
--with-pcre=/package/lnmp/pcre-8.45 \
--with-pcre-jit \
--with-zlib=/package/lnmp/zlib-1.2.11 \
--with-openssl=/package/lnmp/openssl-1.1.1m \
# 开启调试，生产环境下建议禁用
--with-debug
```

亲测：nginx-1.20.2 在 `Debian 11` 下，能完成上面两套指令的构建

### 开始编译安装

```sh
# 4核以上可以使用 make -j4 编译
$ make -j2
# 不挂起，后台执行
$ nohup make -j2 &
# 安装
$ make install
```

### 测试

使用 curl 检测是否成功

```sh
$ /server/nginx/sbin/nginx
$ curl -I 127.0.0.1
```

成功信号：

```sh
HTTP/1.1 200 OK
Server: nginx/1.20.1
Date: Wed, 15 Sep 2021 12:39:28 GMT
Content-Type: text/html
Content-Length: 612
Last-Modified: Wed, 15 Sep 2021 12:38:19 GMT
Connection: keep-alive
ETag: "6141e93b-264"
Accept-Ranges: bytes
```

失败信号：

```sh
curl: (7) Failed to connect to 127.0.0.1 port 80: 拒绝连接
```

到此，nginx 构建结束！

## 记录一次升级

Nginx 平滑升级，具体操作如下：

### 构建指令：

```sh
$ mkdir /package/lnmp/nginx-1.20.2/build_nginx
$ cd /package/lnmp/nginx-1.20.2
$ ./configure --prefix=/server/nginx \
# 构建指令参考前面的「本次构建指令」...
```

### 开始编译

升级只编译，不安装

```sh
$ make
```

备份旧的二进制文件

```sh
$ mv /server/nginx/sbin/nginx{,.v1.20.1-01}
```

拷贝新的二进制文件

```sh
$ cp -p -r /package/lnmp/nginx-1.20.2/bulid_nginx/nginx /server/nginx/sbin/
```

### 平滑升级

nginx 平滑升级步骤如下：

1. 查看旧版 nginx 的 pid

    通过 ps 指令查看

    ```sh
    $ ps -ef|grep -E "nginx|PID" |grep -v grep
    $ ps aux|grep -E "nginx|PID" |grep -v grep
    ```

    通过 pid 文件查看

    ```sh
    $ cat /server/run/nginx/nginx.pid
    ```

2. 使用 kill -USR2 <pid> 启用新的 nginx 可执行文件

    ```sh
    $ kill -USR2 `cat /server/run/nginx/nginx.pid`
    ```

3. 使用 kill -WINCH <pid> 来关闭旧的进程

    指令实现：当进程没有访问者时，系统自动关闭当前进程

    ```sh
    $ kill -WINCH old_nginx_pid
    ```

## 配置 nginx

nginx 的配置原理，在这里不做过多讲解，直接给参考文件：

1. nginx.conf

    ```text
    描述：nginx 主配置文件
    数量：1个
    路径：/server/nginx/conf/nginx.conf
    操作：替换
    ```

    - [php 多版本](./nginx/php-multiple/nginx.conf.md)
    - [php 独立版](./nginx/php-single/nginx.conf.md)

2. [fastcgi_params_tp6](./nginx/fastcgi_params_tp6.md)

    ```text
    描述：tp6 站点的 fastcgi 模版
    数量：按需新建，允许多个，命名需要区分
    路径：/server/nginx/conf/custom/fastcgi_params_tp6
    操作：新增，通过 include 加载
    ```

3. [cache](./nginx/cache.md)

    ```text
    描述：静态资源文件缓存模板
    数量：按需新建，允许多个，命名需要区分
    路径：/server/nginx/conf/custom/cache
    操作：新增，通过 include 加载
    ```

4. [cache_html](./nginx/cache_html.md)

    ```text
    描述：html文件缓存模板
    数量：按需新建，允许多个，命名需要区分
    路径：/server/nginx/conf/custom/cache_html
    操作：新增，通过 include 加载
    ```

5. [gzip](./nginx/gzip.md)

    ```text
    描述：静态文件启用压缩
    数量：按需新建，允许多个，命名需要区分
    路径：/server/nginx/conf/custom/gzip
    操作：新增，通过 include 加载
    ```

6. [limit_req_server](./nginx/limit_req_server.md)

    按需写入对应站点的 `server` 获取 `location` 区块内

    ```text
    描述：对应站点，设置每秒限制请求数量
    路径：没有单独文件
    ```

7. [no_cache](./nginx/no_cache.md)

    ```text
    描述：站点或目录禁用缓存
    数量：按需新建，允许多个，命名需要区分
    路径：/server/nginx/conf/custom/no_cache
    操作：新增
    ```

8. [no_access](./nginx/no_access.md)

    ```text
    描述：指定目录或文件禁止访问
    数量：按需新建，允许多个，命名需要区分
    路径：/server/nginx/conf/custom/no_access
    操作：新增
    ```

9. [cross_domain](./nginx/cross_domain.md)

    按需写入对应站点的 `location / {}` 区块内

    ```text
    描述：nginx 实现跨域请求的配置案例
    路径：没有单独文件
    ```

10. [sites-statics.nginx](./nginx/sites-statics.nginx.md)

    ```text
    描述：静态站点配置模版
    数量：按需新建，允许多个，命名需要区分
    路径：/server/sites/*.nginx
    操作：新增
    ```

11. sites-tp.nginx

    ```text
    描述：tp6 站点配置
    数量：按需新建，允许多个
    路径：/server/sites/*.nginx
    操作：新增
    ```

    - [php 独立版](./nginx/php-single/sites-tp.nginx.md)
    - [php 多版本](./nginx/php-multiple/sites-tp.nginx.md)

12. nginx 默认站点

    ```text
    描述：nginx 默认站点，通常是指定用户访问
    数量：通常只有1个路径，多个php版本，通过不同域名针对不同phpfpm版本做转发
    路径：/server/nginx/conf/custom/default(.*).nginx
    操作：新增
    ```

    - [php 独立版](./nginx/php-single/default.nginx.md)
    - [php 多版本](./nginx/php-multiple/default.nginx.md)

## 管理 nginx

nginx 常用管理指令

| 操作         | 指令                               |
| ------------ | ---------------------------------- |
| 启动         | /server/nginx/sbin/nginx           |
| 正常关闭     | /server/nginx/sbin/nginx -s quit   |
| 快速关闭     | /server/nginx/sbin/nginx -s stop   |
| 重新载入     | /server/nginx/sbin/nginx -s reload |
| 重新打开日志 | /server/nginx/sbin/nginx -s reopen |
| 检测配置文件 | /server/nginx/sbin/nginx -t        |
| 显示帮助信息 | /server/nginx/sbin/nginx -h        |
| 列出配置信息 | /server/nginx/sbin/nginx -T        |

指定配置文件,启动 Nginx

```sh
$ /server/nginx/sbin/nginx -c /server/nginx/conf/nginx.conf
```

检测指定的 Nginx 配置文件

```sh
$ /server/nginx/sbin/nginx -t -c /server/nginx/conf/nginx.conf
```

强制停止 Nginx 进程

```sh
$ pkill -9 nginx
```

## Systemd 单元(Unit)

用 Systemd 来管理守护进程更方便，建议为 Nginx 添加 Systemd 单元（Unit）

### 具体操作

将 [nginx.service](./service/nginx.service.md) 拷贝/usr/lib/systemd/system 目录

```sh
$ mv nginx.service /usr/lib/systemd/system/
```

使用类似如下指令加入开机启动

```sh
$ systemctl enable nginx
```

重新加载 Systemd 配置文件

```sh
$ systemctl daemon-reload
```

### nginx 单元（Unit）管理

```sh
# 立即激活单元
$ systemctl start nginx.service

# 立即停止单元
$ systemctl stop nginx.service

# 重新加载配置
$ systemctl reload nginx.service
```

## nginx 用户身份认证

ngx_http_auth_basic_module 模块使用 `HTTP Basic Authentication (HTTP 基本身份验证)` 协议，允许通过验证用户名和密码来限制对资源的访问

功能上仅区分了登录用户和非登录用户的访问差异，没有其它权限认证的高级功能

> 说明：高级的权限认证功能，通常由高级语言+数据库来实现，如：PHP+MariaDB

### 配置指令

ngx_http_auth_basic_module 模块，在配置上只有 2 条指令：

#### auth_basic

该指令，用于控制 nginx 是否开启 `HTTP 基本身份验证` 功能

```text
- 语法 : auth_basic string | off;
- 默认 : auth_basic off；
- 区块 : http 、 server 、 location 、 limit_except
```

语法分析：

-   off : 表示关闭 `HTTP 基本身份验证` 功能，这是默认值
-   string : 任意字符串，表示开启 `HTTP 基本身份验证` 功能，并且字符串会作为登录提示信息出现

区块说明：

-   通常不会在 http 区块上开启 `HTTP 基本身份验证` 功能，除非服务器上所有网站都仅供内部访问
-   server 和 location 区块是最常使用的
-   当然 `HTTP 基本身份验证` 功能，只有非常简单的站点需要使用它，比如：纯静态资源站或者其它没有认证系统的网站

> 提示： auth_basic 同一区块，仅一个生效，后面覆盖前面

#### auth_basic_user_file

该指令，用于指定保存用户名和密码的文件

```text
- 语法 : auth_basic_user_file file;
- 默认 : —
- 区块 : http 、 server 、 location 、 limit_except
```

指定保存用户名和密码的文件，格式如下：

```text
＃ 备注说明
用户名 1:加密密码 1
用户名 2:加密密码 2:用户2说明
用户名 3:加密密码 3
```

区块说明：

-   基本跟 auth_basic 指令一致

> 提示： auth_basic_user_file 同一区块，仅一个生效，后面覆盖前面

### 生成加密密码

主要使用以下加密类型生成密码：

1.  `crypt()` : 标准 Unix 密码算法
2.  `MD5-based password algorithm (apr1)` : 基于 MD5 的密码算法，Apache 变体

> 提示：`apr1` 加密类型是 nginx 支持的加密方式中最安全的

对生成密码的工具没有特殊要求，只要加密方式正确，nginx 就可以正确验证

事实上，nginx 是通过 `--with-openssl=xxx` 自己编译的 openssl 外库来验证的

本次我们就直接使用 openssl passwd 来演示生成加密密码，具体如下：

-   创建必要文件：

    ```sh
    # 创建目录
    $ mkdir /server/default/nginx_auth
    # 创建两个站点的认证文件，文件名与站点名相似
    $ touch /server/default/nginx_auth/{public,qydocs,wangdocs}
    ```

-   默认站点创建用户：

    ```sh
    # 用户1 emad 密码 123
    $ echo -n 'emad:' >>  /server/default/nginx_auth/public
    $ openssl passwd -apr1 123 >> /server/default/nginx_auth/public
    ```

-   qydocs 站点创建用户：

    ```sh
    # 用户1 emad 密码 123
    $ echo -n 'emad:' >>  /server/default/nginx_auth/qydocs
    $ openssl passwd -apr1 123 >> /server/default/nginx_auth/qydocs

    # 用户2 qydocs 密码 qydocs123456
    $ echo -n 'qydocs:' >>  /server/default/nginx_auth/qydocs
    $ openssl passwd -apr1 qydocs123456 >> /server/default/nginx_auth/qydocs
    ```

-   wangdocs 站点创建用户：

    ```sh
    # 用户1 emad 密码 123
    $ echo -n 'emad:' >>  /server/default/nginx_auth/wangdocs
    $ openssl passwd -apr1 123 >> /server/default/nginx_auth/wangdocs

    # 用户2 wangdocs 密码 wangdocs123456
    $ echo -n 'wangdocs:' >>  /server/default/nginx_auth/wangdocs
    $ openssl passwd -apr1 wangdocs123456 >> /server/default/nginx_auth/wangdocs
    ```

### 站点配置

nginx 虚拟主机配置 `HTTP 基本身份验证` 案例

-   默认站点

    ```sh
    server
    {
        ...
        # 整个站点启用身份验证
        auth_basic           "default site";
        auth_basic_user_file /server/default/nginx_auth/public;
    }
    ```

-   qydcos 站点

    ```sh
    server
    {
        ...
        # 整个站点启用身份验证
        location /
        {
            ...
            auth_basic           "qydocs 站点";
            auth_basic_user_file /server/default/nginx_auth/qydocs;
            ...
        }

        # /other/ 目录下禁用身份验证
        location ^~ /other/
        {
            auth_basic  false;
        }
        ...
    }
    ```

-   wangdocs 站点

    ```sh
    server
    {
        ...
        # 指定目录下启用身份验证
        location ~ ^/(?:css|html|javascript)/
        {
            ...
            auth_basic           "wangdocs 站点";
            auth_basic_user_file /server/default/nginx_auth/wangdocs;
            ...
        }
        ...
    }
    ```

### 附录：sh 相关指令说明：

-   `echo -n` : 不换行输出
-   `>>` : 追加输出重定向
-   `>` : 覆盖输出重定向
