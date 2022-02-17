# html 文件缓存模板

主要在静态网站中使用，并且需要发布页面很少修改

路径 : `/server/nginx/conf/custom/cache_html`

```conf
# ~* 不区分大小写
location ~* \.(?:htm|html)$
{
    # 设置缓存上面定义的后缀文件缓存到浏览器的生存时间
    expires         30d;    # 缓存30天
    log_not_found   off;    # 关闭错误日志
    break;
}
```
