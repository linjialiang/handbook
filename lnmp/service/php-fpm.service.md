# php-fpm 系统单元文件

路径： /usr/lib/systemd/system/php-fpm.service

官方案例： /package/lnmp/php-8.0.11/build_php/sapi/fpm/php-fpm.service

```conf
[Unit]
Description=The PHP FastCGI Process Manager
Wants=mariadb.service
Wants=nginx.service
Wants=redis.service
After=network.target

[Service]
Type=simple
PIDFile=/server/php/var/run/php-fpm.pid
ExecStart=/server/php/sbin/php-fpm --nodaemonize --fpm-config /server/php/etc/php-fpm.conf
ExecReload=/bin/kill -USR2 $MAINPID
PrivateTmp=true
ProtectSystem=full
PrivateDevices=true
ProtectKernelModules=true
ProtectKernelTunables=true
ProtectControlGroups=true
RestrictRealtime=true
RestrictAddressFamilies=AF_INET AF_INET6 AF_NETLINK AF_UNIX
RestrictNamespaces=true

[Install]
WantedBy=multi-user.target
```
