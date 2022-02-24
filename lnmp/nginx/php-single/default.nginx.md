# 默认站点

nginx 的默认站点

路径 : `/server/nginx/conf/custom/default.nginx`

```ini
server
{
    listen 80;
    server_name localhost;
    root /server/default;

    access_log /server/logs/nginx/localhost.log;
    index index.html index.htm index.php;

    # 站点仅允许温州电信ip段访问
    allow 39.186.0.0/16;
    allow 60.181.0.0/16;
    deny all;

    # php-fpm 转发
    location ~ \.php
    {
        fastcgi_pass    unix:/server/run/php/default.sock;
        # 根据文件名转发，完全不需要配置 fastcgi_index
        # fastcgi_index   index.php;
        include         fastcgi.conf;
    }
}
```
