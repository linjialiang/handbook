# php-fpm 主配置文件

php7.4 的 php-fpm 主配置文件路径 : `/server/php/7.4/etc/php-fpm.conf`

## 配置文件范例

配置文件范例比较简介，其它配置使用 php-fpm 默认即可

```ini
# 文件名必须是 php-fpm.conf
pid = /server/run/php/phpfpm-7.4.pid
error_log = /server/logs/php/phpfpm-7.4.log
include=/server/php/7.4/etc/php-fpm.d/*.conf
```
