# 子配置文件

子配置文件是我们创建的，路径随意指定，内容按需配置

-   路径：C:\wamp\base\conf\httpd.conf

## 参考配置:

```conf
LoadModule vhost_alias_module modules/mod_vhost_alias.so
LoadModule rewrite_module modules/mod_rewrite.so
LoadModule deflate_module modules/mod_deflate.so
LoadModule headers_module modules/mod_headers.so
LoadModule filter_module modules/mod_filter.so
LoadModule php_module ${WAMP_ROOT}/base/php/php8apache2_4.dll

<IfModule php_module>
    PHPINIDir "${WAMP_ROOT}/base/php"
    LoadFile "${WAMP_ROOT}/base/php/libssh2.dll"
    LoadFile "${WAMP_ROOT}/base/php/libcrypto-1_1-x64.dll"
    LoadFile "${WAMP_ROOT}/base/php/libssl-1_1-x64.dll"
    LoadFile "${WAMP_ROOT}/base/php/libsqlite3.dll"
</IfModule>

ServerName localhost
ServerAdmin linjialiang@y746.com

<Directory />
    AllowOverride none
    Require all denied
</Directory>

<Directory "${HTDOCS}">
    Options Indexes FollowSymLinks
    AllowOverride All
    Require all granted
</Directory>

<IfModule dir_module>
    DirectoryIndex index.html index.php
</IfModule>

<Files ".ht*">
    Require all denied
</Files>

LogLevel crit
ErrorLog "|${SRVROOT}/bin/rotatelogs.exe -t ${HTLOGS}/error/error_log.%Y-%m-%d-%H_%M_%S 5M 480"

<IfModule log_config_module>
    LogFormat "$V-%h %l %u %t \"%r\" %>s %b \"%{Referer}i\" \"%{User-Agent}i\"" combined
    LogFormat "$V-%h %l %u %t \"%r\" %>s %b" common
    LogFormat "%h-%v-%V %l %u %t \"%r\" %>s %b \"%{Referer}i\" \"%{User-Agent}i\"" newlogformat

    <IfModule logio_module>
      LogFormat "$V-%h %l %u %t \"%r\" %>s %b \"%{Referer}i\" \"%{User-Agent}i\" %I %O" combinedio
    </IfModule>

    SetEnvIf Request_URI "\.(ico|gif|jpg|png|bmp|swf|css|js)$" dontlog

    CustomLog "|${SRVROOT}/bin/rotatelogs.exe -t ${HTLOGS}/access/access_log.%Y-%m-%d 86400 480" newlogformat env=!dontlog
</IfModule>

<IfModule alias_module>
    ScriptAlias /cgi-bin/ "${SRVROOT}/cgi-bin/"
</IfModule>

<Directory "${SRVROOT}/cgi-bin">
    AllowOverride None
    Options None
    Require all granted
</Directory>

<IfModule mime_module>
    TypesConfig conf/mime.types

    AddType application/x-compress .Z
    AddType application/x-gzip .gz .tgz
    AddType application/x-httpd-php .php
</IfModule>

Alias /pma ${WAMP_ROOT}/base/default/pma
Alias /phpMyAdmin ${WAMP_ROOT}/base/default/pma
Alias /adminer ${WAMP_ROOT}/base/default/adminer.php
Alias /phpinfo ${WAMP_ROOT}/base/default/phpinfo.php
Alias /pra ${WAMP_ROOT}/base/default/pra
Alias /phpRedisAdmin ${WAMP_ROOT}/base/default/pra
DocumentRoot "${WAMP_ROOT}/base/default"
<Directory "${WAMP_ROOT}/base/default">
    Options FollowSymLinks
    AllowOverride none
    DirectoryIndex index.php
    <RequireAll>
        Require local
    </RequireAll>
</Directory>
<Directory ${WAMP_ROOT}/base/default/pma/libraries>
    Require all denied
</Directory>
<Directory ${WAMP_ROOT}/base/default/pma/setup/lib>
    Require all denied
</Directory>

<VirtualHost _default_:${HTTP_PORT}>
    DocumentRoot "${WAMP_ROOT}/base/default"
</VirtualHost>

<IfModule include_module>
    Include "${WAMP_ROOT}/base/conf/httpd-ssl.conf"
    Include "${WAMP_ROOT}/web/sites/*.conf"
</IfModule>

<IfModule deflate_module>
    SetOutputFilter DEFLATE

    SetEnvIfNoCase Request_URI .(?:gif|jpe?g|png)$ no-gzip dont-vary
    SetEnvIfNoCase Request_URI .(?:exe|t?gz|zip|bz2|sit|rar)$ no-gzip dont-vary
    SetEnvIfNoCase Request_URI .(?:pdf|mov|avi|mp3|mp4|rm)$ no-gzip dont-vary

    <IfModule filter_module>
        AddOutputFilterByType DEFLATE text/html text/css
        AddOutputFilterByType DEFLATE application/javascript application/x-httpd-php
    </IfModule>
</IfModule>

<IfModule headers_module>
    RequestHeader unset Proxy early

    RewriteCond "%{HTTP:Accept-encoding}" "gzip"
    RewriteCond "%{REQUEST_FILENAME}\.gz" -s
    RewriteRule "^(.*)\.(css|js|htm|html|php)"         "$1\.$2\.gz" [QSA]

    RewriteRule "\.css\.gz$" "-" [T=text/css,E=no-gzip:1]
    RewriteRule "\.htm\.gz$" "-" [T=text/html,E=no-gzip:1]
    RewriteRule "\.html\.gz$" "-" [T=text/html,E=no-gzip:1]
    RewriteRule "\.js\.gz$"  "-" [T=application/javascript,E=no-gzip:1]
    RewriteRule "\.php\.gz$" "-" [T=application/x-httpd-php,E=no-gzip:1]

    <FilesMatch "(\.js\.gz|\.css\.gz|\.htm\.gz|\.html\.gz|\.php\.gz)$">
      Header append Content-Encoding gzip
      Header append Vary Accept-Encoding
    </FilesMatch>
</IfModule>
```
