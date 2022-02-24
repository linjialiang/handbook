# php8.1 系统单元文件

路径： /usr/lib/systemd/system/phpfpm-8.1.service

官方案例： /package/lnmp/php-8.1.1/build_php/sapi/fpm/php-fpm.service

## 自定义范例

```ini
# /usr/lib/systemd/system/phpfpm-8.1.service
[Unit]
Description=The PHP 8.1 FastCGI Process Manager
Wants=mariadb.service
Wants=nginx.service
Wants=redis.service
After=network.target

[Service]
Type=simple
PIDFile=/server/run/php/phpfpm-8.1.pid
ExecStart=/server/php/8.1/sbin/php-fpm --nodaemonize --fpm-config /server/php/8.1/etc/php-fpm.conf
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

## 官方提供参考

```ini
# It's not recommended to modify this file in-place, because it
# will be overwritten during upgrades.  If you want to customize,
# the best way is to use the "systemctl edit" command.

[Unit]
Description=The PHP FastCGI Process Manager
After=network.target

[Service]
Type=simple
PIDFile=/server/php/8.1/var/run/php-fpm.pid
ExecStart=/server/php/8.1/sbin/php-fpm --nodaemonize --fpm-config /server/php/8.1/etc/php-fpm.conf
ExecReload=/bin/kill -USR2 $MAINPID

# Set up a new file system namespace and mounts private /tmp and /var/tmp directories
# so this service cannot access the global directories and other processes cannot
# access this service's directories.
PrivateTmp=true

# Mounts the /usr, /boot, and /etc directories read-only for processes invoked by this unit.
ProtectSystem=full

# Sets up a new /dev namespace for the executed processes and only adds API pseudo devices
# such as /dev/null, /dev/zero or /dev/random (as well as the pseudo TTY subsystem) to it,
# but no physical devices such as /dev/sda.
PrivateDevices=true

# Explicit module loading will be denied. This allows to turn off module load and unload
# operations on modular kernels. It is recommended to turn this on for most services that
# do not need special file systems or extra kernel modules to work.
ProtectKernelModules=true

# Kernel variables accessible through /proc/sys, /sys, /proc/sysrq-trigger, /proc/latency_stats,
# /proc/acpi, /proc/timer_stats, /proc/fs and /proc/irq will be made read-only to all processes
# of the unit. Usually, tunable kernel variables should only be written at boot-time, with the
# sysctl.d(5) mechanism. Almost no services need to write to these at runtime; it is hence
# recommended to turn this on for most services.
ProtectKernelTunables=true

# The Linux Control Groups (cgroups(7)) hierarchies accessible through /sys/fs/cgroup will be
# made read-only to all processes of the unit. Except for container managers no services should
# require write access to the control groups hierarchies; it is hence recommended to turn this on
# for most services
ProtectControlGroups=true

# Any attempts to enable realtime scheduling in a process of the unit are refused.
RestrictRealtime=true

# Restricts the set of socket address families accessible to the processes of this unit.
# Protects against vulnerabilities such as CVE-2016-8655
RestrictAddressFamilies=AF_INET AF_INET6 AF_NETLINK AF_UNIX

# Takes away the ability to create or manage any kind of namespace
RestrictNamespaces=true

[Install]
WantedBy=multi-user.target
```
