# MariaDB 服务端子配置文件

路径： /etc/mysql/mariadb.conf.d/50-server.cnf

```ini
[server]

[mysqld]
pid_file                   = /server/run/mariadb/mariadb.pid
basedir                    = /usr
datadir                    = /server/data
tmpdir                     = /tmp
lc_messages_dir            = /server/logs/mariadb
lc_messages                = zh_CN
skip_external_locking
bind_address               = 127.0.0.1
max_connections            = 100
connect_timeout            = 5
wait_timeout               = 600
max_allowed_packet         = 16M
thread_cache_size          = 128
sort_buffer_size           = 4M
bulk_insert_buffer_size    = 16M
tmp_table_size             = 32M
max_heap_table_size        = 32M
myisam_recover_options     = BACKUP
key_buffer_size            = 128M
table_open_cache           = 400
myisam_sort_buffer_size    = 512M
concurrent_insert          = 2
read_buffer_size           = 2M
read_rnd_buffer_size       = 1M
query_cache_limit          = 128K
query_cache_size           = 64M

general_log                = 0
general_log_file           = /server/logs/mariadb/general.log

log_warnings               = 0
log_error                  = /server/logs/mariadb/error.log

slow_query_log             = 0
slow_query_log_file        = /server/logs/mariadb/slow.log
long_query_time            = 10
log_slow_verbosity         = query_plan,innodb,explain

binlog_format=mixed
log_bin                    = /server/logs/mariadb/bin_log
log_bin_index              = /server/logs/mariadb/bin_log.index
expire_logs_days           = 30
max_binlog_size            = 100M

default_storage_engine     = InnoDB
innodb_buffer_pool_size    = 256M
innodb_log_buffer_size     = 8M
innodb_file_per_table      = 1
innodb_open_files          = 400
innodb_io_capacity         = 400
innodb_flush_method        = O_DIRECT

local_infile               = 0
skip_symbolic_links        = yes
character_set_server  	   = utf8mb4
collation_server      	   = utf8mb4_general_ci

[embedded]

[mariadb]

[mariadb-10.6]
```

## 加速远程连接

远程客户端链接 mysql 服务器如果遇到需要几十秒才能链接成功，通常是缺少 `skip_name_resolve` 的缘故

```ini
[mysqld]
skip_name_resolve
```

skip_name_resolve 功能说明：

-   不解析主机名，所有主机名都是 IP 或 localhost
-   可有效为远程客户端链接 mysql 服务器提速
