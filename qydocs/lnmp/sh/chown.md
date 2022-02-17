# 目录用户授权

该脚本主要针对 MariaDB 目录用户授权

由于 MariaDB 采用 apt 的方式安装，所以 MariaDB 的用户是安装过程中自动生成的

```sh
#!/bin/bash

func_chown_mysql(){
    chown mysql:mysql $1
}

func_chown_nginx(){
    chown nginx:nginx $1
}

func_chown_phpfpm(){
    chown phpfpm:phpfpm $1
}

func_chown_www(){
    chown www:www $1
}

chown_mysql_array=(
    "/server/data"
    "/server/run/mariadb"
    "/server/logs/mariadb"
);

chown_nginx_array=(
    "/server/run/nginx"
    "/server/logs/nginx"
);

chown_phpfpm_array=(
    "/server/run/php"
    "/server/logs/php"
);

chown_www_array=(
    "/server/www"
);

echo "-----开始设置 mysql 用户权限目录-----"
for((i=0;i<${#chown_mysql_array[*]};i++));
do
   echo ${chown_mysql_array[i]}
   func_chown_mysql ${chown_mysql_array[i]}
done
echo "-----mysql 用户权限目录设置结束-----"

echo "-----开始设置nginx用户权限目录-----"
for((i=0;i<${#chown_nginx_array[*]};i++));
do
   echo ${chown_nginx_array[i]}
   func_chown_nginx ${chown_nginx_array[i]}
done
echo "-----nginx用户权限目录设置结束-----"

echo "-----开始设置 phpfpm 用户权限目录-----"
for((i=0;i<${#chown_phpfpm_array[*]};i++));
do
   echo ${chown_phpfpm_array[i]}
   func_chown_phpfpm ${chown_phpfpm_array[i]}
done
echo "-----phpfpm 用户权限目录设置结束-----"

echo "-----开始设置 www 用户权限目录-----"
for((i=0;i<${#chown_www_array[*]};i++));
do
   echo ${chown_www_array[i]}
   func_chown_www ${chown_www_array[i]}
done
echo "-----www 用户权限目录设置结束-----"
```
