# libpam-mysql 配置文件

路径： /etc/pam-mysql.conf

```conf
users.host              = localhost
users.database          = 数据库名
users.db_user           = 数据库用户
users.db_passwd         = 数据库用户密码
users.table             = 数据库表名
users.user_column       = 数据库表中用户字段
users.password_column   = 数据库表中密码字段
users.password_crypt    = 2
```
