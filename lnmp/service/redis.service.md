# redis 系统单元文件

路径：/usr/lib/systemd/system/redis.service

```ini
[Unit]
Description=redis-6.2.6
After=network.target

[Service]
Type=forking
PIDFile=/server/run/redis/redis.pid
ExecStart=/server/redis/bin/redis-server /server/redis/redis.conf
ExecStop=/server/redis/bin/redis-cli shutdown
Restart=on-abort
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```
