# nginx 配置文件

php 独立版的 nginx 配置文件参考

路径 : `/server/nginx/conf/nginx.conf`

```ini
worker_processes auto;

worker_shutdown_timeout 30s;
worker_rlimit_core 50M;
working_directory /tmp/;

worker_rlimit_nofile 10240;

events
{
    worker_connections 10240;
    worker_aio_requests 1024;
}

http
{
    include mime.types;
    default_type application/octet-stream;

    charset utf-8;

    autoindex off;
    autoindex_exact_size on;
    autoindex_localtime on;

    # 启用 gzip 压缩，自定义配置文件
    include custom/gzip;
    sendfile on;

    # 在响应头中隐藏 Nginx 版本号
    server_tokens off;
    # 隐藏fastcgi的头信息，如：php-fpm
    fastcgi_hide_header X-Powered-By;
    # 隐藏反向代理服务器头信息，如：httpd
    proxy_hide_header X-Powered-By;

    # nginx 启用 TLSv1.3 加密传输协议
    ssl_protocols TLSv1.3;

    # 预防web攻击
    # 预防点击劫持，页面只能被本站页面嵌入到iframe或者frame中
    add_header X-Frame-Options SAMEORIGIN always;
    # 检测到反射的跨站点脚本（XSS）攻击时阻止页面加载
    add_header X-XSS-Protection "1; mode=block" always;
    # 防止基于 MIME 类型混淆的攻击
    add_header X-Content-Type-Options nosniff always;

    # === http 区块设定加载请求限制，需要server区块配合 === #
    # 限制请求：针对相同客户端ip（这条最重要，其它的看实际情况添加）
    #  - 默认，每秒可处理5条请求，生成1个标识为 with_ip ，容量为 10M 的内存区域，用来存储访问的频次信息
    limit_req_zone $binary_remote_addr zone=with_ip:10m rate=5r/s;

    # 限制请求：针对相同客户端ip、相同访问文件路径
    #  - 默认，每秒可处理 1 条请求，生成1个标识为 with_ip_request ，容量为 5M 的内存区域，用来存储访问的频次信息
    limit_req_zone $binary_remote_addr $uri zone=with_ip_request:5m rate=1r/s;

    # 限制请求：针对相同客户端ip、相同访问文件路径、相同请求参数
    #  - 默认，每秒可处理 1 条请求，生成1个标识为 with_ip_request_param ，容量为 5M 的内存区域，用来存储访问的频次信息
    limit_req_zone $binary_remote_addr $request_uri zone=with_ip_request_param:5m rate=1r/s;

    include custom/default.nginx;
    include /server/sites/*.nginx;
}
```
