# php-fpm 工作池进程配置文件

路径： `/server/php/etc/php-fpm.d/*.conf`

数量： 允许多个

需求： 至少需要 1 个工作吃进程配置文件

默认： 默认未创建

模板： /server/php/etc/php-fpm.d/www.conf.default

## php-fpm 案例

php-fpm 工作池进程配置文件的文件名可以随意指定

为了增加可维护性，建议跟对应 nginx 站点名称一致

### 默认站点案例

-   nginx 默认站点路径

    /server/default

-   php-fpm 文件名

    /server/php/etc/php-fpm.d/default.conf

-   php-fpm 对应配置信息

    ```bash
    [default]
    user                    = phpfpm
    group                   = phpfpm

    listen                  = /server/run/php/default.sock
    listen.backlog          = -1
    listen.owner            = nginx
    listen.group            = nginx
    listen.mode             = 0660
    listen.allowed_clients  = 127.0.0.1

    pm                      = static
    pm.max_children         = 50
    pm.max_requests         = 1000
    ```

### tp6 站点案例

-   nginx 默认站点路径

    /server/www/tp6

-   php-fpm 文件名

    /server/php/etc/php-fpm.d/tp6.conf

-   php-fpm 对应配置信息

    ```bash
    [tp6]
    user                    = phpfpm
    group                   = phpfpm

    listen                  = /server/run/php/tp6.sock
    listen.backlog          = -1
    listen.owner            = nginx
    listen.group            = nginx
    listen.mode             = 0660
    listen.allowed_clients  = 127.0.0.1

    pm                      = static
    pm.max_children         = 50
    pm.max_requests         = 1000
    ```
