# 禁用缓存

nginx 站点禁用缓存配置案例

路径 : `/server/nginx/conf/custom/no_cache`

```ini
# 禁用缓存
location ~* \.(?:js|css|json|txt|xml|jpe?g|png|gif|ico|html?)$
{
    # 禁止缓存，每次都从服务器请求
    add_header Cache-Control no-store always;
    break;
}
```
