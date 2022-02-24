# redis 篇

[redis](https://redis.io/download) 是当下最热门的键值对(Key-Value)存储数据库，下面是 Debian11 下构建 Redis 的详细流程

## 安装依赖

测试编译结果会用到 tcl

```bash
$ apt install tcl -y
```

## 构建安装

Redis 构建相对简单

### 构建指令

```bash
$ cd /package/lnmp/redis-6.2.6/
$ make clean
$ make
```

检测编译情况

```bash
$ make test
# 当出现高亮信息 \o/ All tests passed without errors! 证明测试通过
```

安装并指定安装目录

```bash
$ make install PREFIX=/server/redis
```

### 可执行文件

Redis 安装后，很简洁，只有 3 个可执行文件

1. redis-benchmark

    用于 Redis 压力测试工具

2. redis-server

    启动 Reids 数据库

3. redis-cli

    Redis 命令工具

## 配置文件

redis 源码包中自带了 1 个配置文件，我们就直接拿来，按需修改即可

### 拷贝配置文件

```bash
$ cp -p -r /package/lnmp/redis-6.2.6/redis.conf /server/redis/redis.conf
```

### 修改配置文件

测试环境一共对配置文件修改了 2 处

1. 允许 redis 后台启动

    默认情况下，redis 是前台启动的，实际运用中我们都会选择后台启动

    ```ini
    daemonize yes
    ```

2. 修改 pid 文件路径

    pid 文件统一放置 /server/run 下面，便于管理

    ```ini
    pidfile /server/run/redis/redis.pid
    ```

## 配置 redis 单元

推荐统一使用 systemd 管理各种服务

点击查看 [redis.service](./service/redis.service.md) 参考配置

下面是具体操作：

```bash
$ touch redis.service
$ vim redis.service
$ mv redis.service /usr/lib/systemd/system/
$ systemctl enable redis
$ systemctl daemon-reload
```

### Redis 单元管理

```bash
# 立即激活单元
$ systemctl start redis.service

# 立即停止单元
$ systemctl stop redis.service

# 重新启动
$ systemctl restart redis.service
```

## 查看启动状态

```bash
$ ps -ef|grep -E "redis|PID" |grep -v grep
$ ps aux|grep -E "redis|PID" |grep -v grep
```
