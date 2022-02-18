# tp6 配置文件

ThinkPHP 6.0 站点的 nginx 配置文件参考

路径 : `/server/sites/*.conf`

```bash
server
{
    listen 80;
    server_name example.com www.example.com;
    root /server/www/www_example_com/public;

    access_log /server/logs/nginx/www_example_com.log;
    index index.html index.htm index.php;

    # 设置站点仅至允许 GET、POST 请求
    if ($request_method !~* GET|POST|OPTIONS)
    {
        return 403;
    }

    # 静态资源启用缓存设置
    include custom/cache;       # 开发环境通常不启用
    include custom/cache_html;  # 开发环境通常不启用

    # 加载请求限制，server区域，需要结合http区块
    include custom/limit_req_server;  # 开发环境通常不启用

    # 统一入口
    location /
    {
        # 开启跨域请求处理，看自己的后端项目有否需要接受外部请求
        # 内容见 cross_domain.md 文档

        # 如果文件或目录不存在，则尝试使用tp入口解析，该方法可以隐藏入口文件
        if (!-e $request_filename)
        {
            rewrite ^(.*)$ /index.php?s=/$1 last;
            break;
        }
    }

    # 对所有存在 .php 的url地址做转发处理
    # 去掉 \.php$ 中的 $ 是为了不匹配行末，即可以匹配 .php/，以实现pathinfo
    location ~ \.php
    {
        # nginx 自动分割成 $fastcgi_script_name=$1 和 $fastcgi_path_info=$2
        fastcgi_split_path_info     ^(.+\.php)(.*)$;
        fastcgi_pass                unix:/server/run/php/phpfpm8.1-tp6.sock;
        #fastcgi_pass                unix:/server/run/php/phpfpm8.0-tp6.sock;
        #fastcgi_pass                unix:/server/run/php/phpfpm7.4-tp6.sock;

        include                     custom/fastcgi_params_tp6;
    }

    # 禁止访问的目录或文件
    include custom/no_access;
}
```
