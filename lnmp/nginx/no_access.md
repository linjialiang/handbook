# 禁止访问

nginx 站点禁止访问的文件和目录

路径 : `/server/nginx/conf/custom/no_access`

```conf
# 禁止访问所有以 . 开始的文件和目录
location ~ /\.(?:.+)
{
    deny all;
}
```
