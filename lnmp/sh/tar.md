# 解压 lnmp 安装包脚本

```bash
#!/bin/bash

echo "进入 lnmp 目录"

cd /package/lnmp/

for i in `ls *.tar.gz`;
do
    echo "gz解压" $i
    tar -xzf $i
done

for i in `ls *.tar.bz2`;
do
    echo "bz2解压" $i
    tar -xjf $i
done

echo "进入 default 目录"

cd /package/lnmp/default/

for i in `ls *.tar.gz`;
do
    echo "gz解压" $i
    tar -xzf $i
done

echo "进入 ext_static 目录"

cd /package/lnmp/ext_static/

for i in `ls *.tgz`;
do
    echo "tgz解压" $i
    tar -xzf $i
done
```
