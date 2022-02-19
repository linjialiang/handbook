# ssl 配置文件

ssl 配置文件是 httpd 自带的，路径可改，内容可变

-   路径：C:\wamp\base\conf\httpd-ssl.conf

## 参考配置:

```conf
Define HTTPS_PORT "443"

Listen ${HTTPS_PORT}

LoadModule ssl_module modules/mod_ssl.so
LoadModule socache_shmcb_module modules/mod_socache_shmcb.so

<IfModule ssl_module>
    SSLRandomSeed startup builtin
    SSLRandomSeed connect builtin
</IfModule>

SSLCipherSuite HIGH:MEDIUM:!MD5:!RC4:!3DES
SSLProxyCipherSuite HIGH:MEDIUM:!MD5:!RC4:!3DES

SSLHonorCipherOrder on

SSLProtocol all -SSLv3
SSLProxyProtocol all -SSLv3

SSLPassPhraseDialog  builtin

<IfModule socache_shmcb_module>
    SSLSessionCache        "shmcb:${HTLOGS}/ssl_scache/ssl_scache(512000)"
    SSLSessionCacheTimeout  300
</IfModule>

<VirtualHost _default_:${HTTPS_PORT}>
    DocumentRoot "${WAMP_ROOT}/base/default"

    SSLEngine on
    SSLCertificateFile "${WAMP_ROOT}/base/conf/keys/server.crt"
    SSLCertificateKeyFile "${WAMP_ROOT}/base/conf/keys/server.key"
</VirtualHost>
```
