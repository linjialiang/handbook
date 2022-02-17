# MariaDB 配置文件

路径：C:\wamp\web\data\my.ini

```ini
[client]
port                        = 3306
plugin-dir                  = c:/wamp/base/mariadb/lib/plugin

[mysqld]
port                        = 3306
datadir                     = c:/wamp/web/data
pid-file                    = c:/wamp/base/conf/mariadb.pid

general_log                 = 0
log_error                   = c:/wamp/web/logs/mariadb/err.log
log_warnings                = 0
slow_query_log              = 0

log_bin                     = c:/wamp/web/data/bin-log
log_bin_index               = c:/wamp/web/data/bin-log.index
binlog_format               = mixed
expire_logs_days            = 30
```
