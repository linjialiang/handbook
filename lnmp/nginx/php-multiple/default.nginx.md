# nginx 默认站点

php 多版本环境，默认站点可以通过不同域名转发多个 phpfpm 版本

## php7.4 默认站点

php7.4 的默认站点

路径 : `/server/nginx/conf/custom/default_php7.4.nginx`

```ini
server
{
    listen 80;
    server_name php7.4.nginx.com;
    root /server/default;

    access_log /server/logs/nginx/default_php7.4.log;
    index index.php;

    # 站点仅允许温州电信ip段访问
    allow 192.168.10.0/24;
    deny all;

    # php-fpm 转发
    location ~ \.php
    {
        fastcgi_pass    unix:/server/run/php/phpfpm7.4-default.sock;
        # 根据文件名转发，完全不需要配置 fastcgi_index
        #fastcgi_index   index.php;
        include         fastcgi.conf;
    }
}
```

## php8.0 默认站点

php8.0 的默认站点

路径 : `/server/nginx/conf/custom/default_php8.0.nginx`

```ini
server
{
    listen 80;
    server_name php8.0.nginx.com;
    root /server/default;

    access_log /server/logs/nginx/default_php8.0.log;
    index index.php;

    # 站点仅允许温州电信ip段访问
    allow 192.168.10.0/24;
    deny all;

    # php-fpm 转发
    location ~ \.php
    {
        fastcgi_pass    unix:/server/run/php/phpfpm8.0-default.sock;
        # 根据文件名转发，完全不需要配置 fastcgi_index
        #fastcgi_index   index.php;
        include         fastcgi.conf;
    }
}
```

## php8.1 默认站点

php8.1 的默认站点

路径 : `/server/nginx/conf/custom/default_php8.1.nginx`

```ini
server
{
    listen 80;
    server_name php8.1.nginx.com;
    root /server/default;

    access_log /server/logs/nginx/default_php8.1.log;
    index index.php;

    # 站点仅允许温州电信ip段访问
    allow 192.168.0.0/16;
    deny all;

    # php-fpm 转发
    location ~ \.php
    {
        fastcgi_pass    unix:/server/run/php/phpfpm8.1-default.sock;
        # 根据文件名转发，完全不需要配置 fastcgi_index
        #fastcgi_index   index.php;
        include         fastcgi.conf;
    }
}
```
