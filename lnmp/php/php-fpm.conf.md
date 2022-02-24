# php-fpm 主配置文件

路径： /server/php/etc/php-fpm.conf

数量： 有且仅有，1 个

需求： 主进程配置文件必须存在

默认： 默认未创建

模板： /server/php/etc/php-fpm.conf.default

## php-fpm 案例

php-fpm 主配置文件的文件名必须是 `php-fpm.conf`

```ini
pid = /server/run/php/php-fpm.pid
error_log = /server/logs/php/php-fpm.log
include=/server/php/etc/php-fpm.d/*.conf
```
