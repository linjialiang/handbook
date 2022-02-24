# 静态资源文件缓存模板

大多数站点通用配置

路径 : `/server/nginx/conf/custom/cache`

```ini
# 静态资源缓存，~* 不区分大小写
location ~* \.(?:js|css|json|txt|xml|jpe?g|png|gif|ico)$
{
    # 设置缓存上面定义的后缀文件缓存到浏览器的生存时间
    expires         30d;    # 缓存30天
    access_log      off;    # 关闭访问日志
    log_not_found   off;    # 关闭错误日志
    break;
}

# favicon 图标缓存
location = /favicon.ico
{
    expires         30d;    # 缓存30天
    access_log      off;    # 关闭访问日志
    log_not_found   off;    # 关闭错误日志
    break;
}

# robots 文件通常不能缓存，蜘蛛一直在爬取
location = /robots.txt
{
    access_log      off;    # 关闭访问日志
    log_not_found   off;    # 关闭错误日志
}
```
