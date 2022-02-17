# 虚拟网络

使用 vbox 做为开发环境前，必须掌握 `虚拟网络` 知识体系，下面以 vbox 为主，对虚拟网络做了详细说明

## 虚拟网络概述

vbox 支持 6 种虚拟网络模式：

### 1、NAT

-   英文： NAT
-   中文： 网络地址转换模式(NAT)
-   手册： Network Address Translation (NAT)

| 联网状态   | 状态     |
| ---------- | -------- |
| 虚拟->宿主 | 成功     |
| 虚拟<-宿主 | 端口转发 |
| 虚拟-虚拟  | 失败     |
| 虚拟->外网 | 成功     |
| 虚拟<-外网 | 端口转发 |

### 2、NAT 网络

-   英文： NAT Network
-   中文： NAT 网络
-   手册： Network Address Translation Service

| 联网状态   | 状态     |
| ---------- | -------- |
| 虚拟->宿主 | 成功     |
| 虚拟<-宿主 | 端口转发 |
| 虚拟-虚拟  | 成功     |
| 虚拟->外网 | 成功     |
| 虚拟<-外网 | 端口转发 |

### 3、桥接

-   英文： Bridged Adapter
-   中文： 桥接网卡
-   手册： Bridged networking

| 联网状态   | 状态 |
| ---------- | ---- |
| 虚拟->宿主 | 成功 |
| 虚拟<-宿主 | 成功 |
| 虚拟-虚拟  | 成功 |
| 虚拟->外网 | 成功 |
| 虚拟<-外网 | 成功 |

> 提示：vbox 主要用于开发环境，在有网络的情况下，我们就直接使用桥接模式即可，不必考虑安全性问题！

### 4、内部网络

-   英文： Internal Network
-   中文： 内部网络
-   手册： Internal networking

| 联网状态   | 状态 |
| ---------- | ---- |
| 虚拟->宿主 | 失败 |
| 虚拟<-宿主 | 失败 |
| 虚拟-虚拟  | 成功 |
| 虚拟->外网 | 失败 |
| 虚拟<-外网 | 失败 |

### 5、Host-Only

-   英文： Host-only
-   中文： 仅主机(Host-Only)网络
-   手册： Adapter Host-only networking

| 联网状态   | 状态     |
| ---------- | -------- |
| 虚拟->宿主 | 成功     |
| 虚拟<-宿主 | 成功     |
| 虚拟-虚拟  | 成功     |
| 虚拟->外网 | 网络共享 |
| 虚拟<-外网 | 失败     |

### 6、通用驱动

-   英文： Generic Driver
-   中文： 通用驱动
-   手册： Generic networking

## 一、NAT 模式

中文叫 `网络地址转换`

虚拟机允许访问外网和宿主

宿主、外网，如果想要访问虚拟机，需要虚拟机开放对应端口

### 虚拟机对外访问

实现虚拟机对外访问

```text
- 访问宿主（我的电脑）
- 访问外网（宿主需联网）
```

1. 虚拟机的 ip 地址设置为自动获取（默认情况，通常就是这个）：

    ```sh
    $ cp /etc/network/interfaces{,.bak}
    $ vi /etc/network/interfaces
    ```

    ```interfaces
    source /etc/network/interfaces.d/*

    auto lo
    iface lo inet loopback

    allow-hotplug enp0s3
    iface enp0s3 inet dhcp
    ```

    - 问：为什么是自动获取，而不是静态网络？

    - 答：因为 `网络地址转换` 模式下，不需要静态网络，连接 ssh 也是通过端口转发

2. 配置虚拟网络

    ![虚拟机允许访问外网和宿主](./img/virtual_network/001.png)

3. 重启虚拟机后，实现虚拟机对外访问

    ![虚拟机访问外网](./img/virtual_network/002.png)

    ![虚拟机访问宿主](./img/virtual_network/003.png)

### 外部访问虚拟机

```text
- 宿主访问虚拟机
- 外网访问虚拟机（这里以局域网为例）
```

1. 满足上述 `虚拟机对外访问` 的所有条件

2. 配置虚拟网络

    ![虚拟机允许访问外网和宿主](./img/virtual_network/004.png)

    ![端口转发](./img/virtual_network/006.png)

3. 重启虚拟机后，实现外部对虚拟机的访问

    ![宿主12322端口转发虚拟机22端口](./img/virtual_network/005.png)

    ![局域网12322端口转发虚拟机22端口](./img/virtual_network/007.png)

    ![外部访问虚拟机成功](./img/virtual_network/008.png)

## 二、`NAT网络` 模式

英文名是 `NAT Network`，与 NAT 模式最大区别是，支持虚拟机之间的互联

### 创建 `NAT网络`

`NAT网络` 模式，必须先在全局菜单创建 `NAT网络`

![创建NAT网络](./img/virtual_network/009.png)

![创建了多个NAT网络](./img/virtual_network/010.png)

### 虚拟机之间互通

条件：虚拟机使用同一个 NAT 网络

![虚拟机之间互通](./img/virtual_network/013.png)

### 虚拟机访问外部

这部分跟 `网络地址转换` 基本相同，这里不上图

```text
- 虚拟机->宿主
- 虚拟机->外网
```

### 外部访问虚拟机

这块建议配置成静态 ip 地址，支持 3 种访问方式：

```text
- 虚拟机->宿主
- 虚拟机->外网
- 虚拟机A->虚拟机B
```

vbox 有 4 张网卡可供选择，这里以第二张网卡为例：

![第2张网卡启用NAT网络](./img/virtual_network/014.png)

-   第 1 张虚拟网卡识别为：`enp0s3`
-   第 2 张虚拟网卡识别为：`enp0s8`
-   其它虚拟网卡识别码，自己去查看

#### 配置静态地址

```sh
$ vi /etc/network/interfaces
```

-   虚拟机 A：docker

    ```sh
    source /etc/network/interfaces.d/*

    auto lo
    iface lo inet loopback

    allow-hotplug enp0s8
    iface enp0s8 inet static
        address 10.0.2.101
        netmask 255.255.255.0
        gateway 10.0.2.1
    ```

-   虚拟机 B：demo

    ```sh
    source /etc/network/interfaces.d/*

    auto lo
    iface lo inet loopback

    allow-hotplug enp0s8
    iface enp0s8 inet static
        address 10.0.2.102
        netmask 255.255.255.0
        gateway 10.0.2.1
    ```

#### NAT 网络设置端口转发

![NAT网络设置端口转发](./img/virtual_network/015.png)

#### 外部连接虚拟机

![外部连接虚拟机](./img/virtual_network/016.png)

#### 虚拟机互联

![虚拟机互联](./img/virtual_network/017.png)

## 三、桥接模式

桥接接近配置真实服务器，而且学习成本很低，开发环境推荐使用

![桥接模式类似服务器配置](./img/virtual_network/018.png)

![桥接模式类似服务器配置](./img/virtual_network/019.png)

> 注意事项：

1. 桥接模式，需要保证宿主机能联网（路由器局域网也可以）
2. 如果网络不同(路由器不通)，所有的连接都将失效

## 四、内部网络模式

内网模式只能虚拟机之间互通，内部网络对虚拟机非常友好，具体如下：

-   ip 网段不受任何约束，虚拟主机可随意设置 IP 地址，只要符合 IP 规则即可
-   只要在同一个网段，虚拟机之间就能相互建立链接

![内部网络模式对虚拟主机友好](./img/virtual_network/020.png)

## 五、Host-Only

仅主机网络模式依赖宿主环境，外网(或局域网)对虚拟主机影响不大

仅主机网络模式，需要 vbox 全局新建一个虚拟网络，该虚拟网络是一个完整的局域网

### 创建虚拟网络

![内部网络模式对虚拟主机友好](./img/virtual_network/021.png)

![内部网络模式对虚拟主机友好](./img/virtual_network/022.png)

### 默认情况

![仅主机网络模式默认支持](./img/virtual_network/023.png)

### 支持网络

通过宿主机可联网(局域网)的网卡，开启共享网络，来获得访问外网(局域网)的支持

-   如果是局域网，则获得访问局域网的支持

-   如果是宽带、光纤，则获得访问外部网络的支持

![开启共享网络](./img/virtual_network/024.png)

![开启共享网络自动修改ip](./img/virtual_network/025.png)

![改回正常IP](./img/virtual_network/026.png)

到此，vbox 的虚拟网络模式告一段落！
