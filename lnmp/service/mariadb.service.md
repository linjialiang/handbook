# MariaDB 系统单元文件

此配置文件信息为 MariaDB 自动生成的系统单元文件，如非必要，请勿修改

```ini
[Unit]
Description=MariaDB 10.6.4 database server
Documentation=man:mariadbd(8)
Documentation=https://mariadb.com/kb/en/library/systemd/
After=network.target
[Install]
WantedBy=multi-user.target
[Service]
Type=notify
PrivateNetwork=false
User=mysql
Group=mysql
CapabilityBoundingSet=CAP_IPC_LOCK CAP_DAC_OVERRIDE CAP_AUDIT_WRITE
PrivateDevices=false
ProtectSystem=full
ProtectHome=true
PermissionsStartOnly=true
ExecStartPre=/usr/bin/install -m 755 -o mysql -g root -d /var/run/mysqld
ExecStartPre=/bin/sh -c "systemctl unset-environment _WSREP_START_POSITION"
ExecStartPre=/bin/sh -c "[ ! -e /usr/bin/galera_recovery ] && VAR= || \
 VAR=`cd /usr/bin/..; /usr/bin/galera_recovery`; [ $? -eq 0 ] \
 && systemctl set-environment _WSREP_START_POSITION=$VAR || exit 1"
ExecStart=/usr/sbin/mariadbd $MYSQLD_OPTS $_WSREP_NEW_CLUSTER $_WSREP_START_POSITION
ExecStartPost=/bin/sh -c "systemctl unset-environment _WSREP_START_POSITION"
ExecStartPost=/etc/mysql/debian-start
KillSignal=SIGTERM
SendSIGKILL=no
Restart=on-abort
RestartSec=5s
UMask=007
PrivateTmp=false
TimeoutStartSec=900
TimeoutStopSec=900
LimitNOFILE=32768
LimitMEMLOCK=524288
```
