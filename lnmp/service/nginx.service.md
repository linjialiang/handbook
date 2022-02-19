# Nginx 系统单元文件

路径：/usr/lib/systemd/system/nginx.service

```conf
[Unit]
Description=nginx-1.20.2
Wants=mariadb.service
Wants=phpfpm-8.1.service
After=network.target

[Service]
Type=forking
PIDFile=/server/run/nginx/nginx.pid
ExecStart=/server/nginx/sbin/nginx
ExecReload=/server/nginx/sbin/nginx -s reload
ExecStop=/server/nginx/sbin/nginx -s quit
Restart=on-abort

[Install]
WantedBy=multi-user.target
```
