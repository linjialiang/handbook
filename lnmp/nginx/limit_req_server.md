# server 区块执行限制

路径 : `/server/nginx/conf/custom/limit_req_server`

```ini
# === server 区块执行限制，需要配合 http 区块 === #

# 针对ip地址相同的请求：
# 每秒最多处理请求数：10 条(rate+burst)，
# 设置为nodelay，则每秒可以瞬时处理的请求数为：10 条(rate+burst)
# 每秒请求超过10条(rate+burst)后，直接返回503
limit_req zone=with_ip burst=5 nodelay;

# 针对ip地址相同，访问文件路径相同的请求：
# 每秒最多处理请求数：6 条(rate+burst)，
# 每秒前 3 条(rate+delay)请求可以瞬时处理，后3条请求设置定时器，延时处理，
# 每秒请求超过6条(rate+burst)后，直接返回503
limit_req zone=with_ip_request burst=5 delay=2;

# 通常非静态网站，缓存交给后端语言自己处理
location ~ \.(?:php)(?:.+)
{
    # 针对ip地址相同，访问文件路径相同，访问参数相同的请求：
    # 每秒最多处理 6 条(rate+burst)请求，
    # delay留空，则每秒前 1 条(rate)请求可以瞬时处理，后5条(burst)请求设置定时器，延时处理，
    # 每秒超过6 条(rate+burst)请求后，直接返回503
    limit_req zone=with_ip_request_param burst=5;
}
```

> 提示：最重要的是： `zone=with_ip` 对应 http 里的 `$binary_remote_addr` ，直接限制同 ip 地址的访问频率
