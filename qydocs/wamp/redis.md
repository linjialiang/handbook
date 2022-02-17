# redis

redis 官网并未对 windows 进行支持

起先由微软公司团队负责维护，后来微软停止更新，现在由社区进行维护

redis 最新 windows 仓库地址: https://github.com/tporadowski/redis

## 安装 redis

redis 安装流程如下：

1. 下载最新文件包 [Redis-x64-5.0.14.zip](https://github.com/tporadowski/redis/releases/download/v5.0.14/Redis-x64-5.0.14.zip)

2. 将包内数据全部解压到 `wamp/base/Redis` 目录下

3. 将 `wamp/base/Redis` 加入环境变量 Path 中，便于管理

4. 将 redis-server 加入到系统服务

    wamp-v8.0.2 开始已经集成到脚本文件中，便于使用者管理

    ```sh
    # 安装服务1，以redis.windows-service.conf做为配置文件
    $ redis-server.exe --service-install redis.windows-service.conf --loglevel verbose
    # 安装服务2，以redis.windows.conf做为配置文件
    $ redis-server.exe --service-install redis.windows.conf --loglevel verbose
    ```

## 管理指令

-   启动 redis 服务: `redis-server --service-start`
-   停止 redis 服务: `redis-server --service-stop`
-   卸载 redis 服务: `redis-server --service-uninstall`
