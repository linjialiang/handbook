# 虚拟主机配置文件模板

虚拟主机配置文件是我们创建的，路径随意指定，内容按需配置，数量不限

-   路径：`C:\wamp\web\sites\*.conf`

## 参考配置:

```ini
<VirtualHost *:${HTTP_PORT}>
    DocumentRoot "${HTDOCS}/www_test_com"
    ServerName www.test1.com
    ServerAlias www.test1.com test1.com www.test2.com test2.com
    ErrorDocument 404 /error.html

    ErrorLog "${HTLOGS}/error/test.log"
    CustomLog "${HTLOGS}/access/test.log" common

    RewriteEngine on
    RewriteCond %{HTTP_HOST} ^(www\.|m\.)?test1.com$ [NC]
    RewriteRule ^(.*)$ https://%{HTTP_HOST}$1 [R=301,L]
    RewriteCond %{HTTP_HOST} ^(www\.|m\.)?test2.com$ [NC]
    RewriteRule ^(.*)$ https://%{HTTP_HOST}$1 [R=301,L]
</VirtualHost>

<VirtualHost *:${HTTPS_PORT}>
    DocumentRoot ${HTDOCS}/www_test_com
    ServerName www.test1.com
    ServerAlias www.test1.com test1.com www.test2.com test2.com
    ErrorDocument 404 /error.html

    ErrorLog "${HTLOGS}/ssl_error/error.log"
    CustomLog "${HTLOGS}/ssl_access/access.log" common

    SSLEngine on
    SSLCertificateFile "${WAMP_ROOT}/base/conf/keys/server.crt"
    SSLCertificateKeyFile "${WAMP_ROOT}/base/conf/keys/server.key"

    RewriteEngine on
    RewriteCond %{HTTP_HOST} ^test1.com$ [NC]
    RewriteRule ^(.*)$ https://www.%{HTTP_HOST}$1 [R=301,L]
    RewriteCond %{HTTP_HOST} ^test2.com$ [NC]
    RewriteRule ^(.*)$ https://www.%{HTTP_HOST}$1 [R=301,L]
</VirtualHost>
```
