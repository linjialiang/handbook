# php-fpm 工作池进程配置文件

php8.0 的 php-fpm 主配置文件路径由 php-fpm 主进程指定

当前路径 : `/server/php/8.0/etc/php-fpm.d/*.conf`

## 配置文件命名规范

php-fpm 工作池进程配置文件名可自由设置，但是我们也最好遵循一些规则：

一、针对单独站点 : 跟 nignx 站点配置文件命名一致

二、根据站点性质 :

1. ThinkPHP6 站点，命名带 tp6；
2. php 站点，命名带 php；

> 提示：命名最重要的是，让我们后期可以很好的管理

## 配置文件范例

下面是一些针对不同站点的配置范例：

### 默认站点

针对 nginx 默认站点的配置

```bash
# /server/php/8.0/etc/php-fpm.d/default.conf
[default]
user                    = phpfpm
group                   = phpfpm

listen                  = /server/run/php/phpfpm8.0-default.sock
listen.backlog          = -1
listen.owner            = nginx
listen.group            = nginx
listen.mode             = 0660
listen.allowed_clients  = 127.0.0.1

pm                      = static
pm.max_children         = 50
pm.max_requests         = 1000
```

### tp6 站点

针对 ThinkPHP6 框架站点的配置

```bash
# /server/php/8.0/etc/php-fpm.d/tp6.conf
[tp6]
user                    = phpfpm
group                   = phpfpm

listen                  = /server/run/php/phpfpm8.0-tp6.sock
listen.backlog          = -1
listen.owner            = nginx
listen.group            = nginx
listen.mode             = 0660
listen.allowed_clients  = 127.0.0.1

pm                      = static
pm.max_children         = 50
pm.max_requests         = 1000
```
