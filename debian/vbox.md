# vbox 篇

vbox 全称 [Oracle VM VirtualBox](https://www.virtualbox.org/) ，是一款开源虚拟机软件

vbox 之所以作为手册的开篇，是因为 Debian 大多数操作都是在虚拟机上完成

关于虚拟机的相关知识点，由本篇统一提供，后续不再额外说明，强烈推荐先掌握本篇

## 下载

可以去 [vbox 官网下载页面](https://www.virtualbox.org/wiki/Downloads) 下载最新的 vbox

vbox 有两个包是必装的

### vbox 基础包

下载通道: [VirtualBox-6.1.26-145957-Win.exe](https://download.virtualbox.org/virtualbox/6.1.26/VirtualBox-6.1.26-145957-Win.exe)

### vbox 扩展包

下载通道： [Oracle_VM_VirtualBox_Extension_Pack-6.1.26.vbox-extpack](https://download.virtualbox.org/virtualbox/6.1.26/Oracle_VM_VirtualBox_Extension_Pack-6.1.26.vbox-extpack)

## 安装

vbox 安装非常简单

### 安装 vbox 基础包

-   操作：双击安装包，一直点击下一步，直到安装成功

### 导入 vbox 扩展包

-   前提：vbox 基础包需要先安装完成

-   操作：双击 vbox 扩展包，按提示完成扩展导入

## 全局配置

vbox 全局配置比较简单

### 打开配置选项

以下两部即可打开 vbox 的全局配置选项

1. 打开 vbox 界面
2. 右上角菜单栏，选中 `管理` -> `全局设定`

### 修改虚拟电脑路径

1. 左侧菜单选中 `常规`
2. 右侧菜单选中 `默认虚拟电脑位置` -> `其它`
3. 选好路径，点击右下角的 `ok` 设置完成

### 更新扩展

更新 vbox 基础包，并不会同步更新扩展包

#### 移除旧扩展

1. 左侧菜单选中 `扩展`
2. 中间内容选中 `旧的扩展名`
3. 点击右侧 `红色打叉` 按钮，移除旧扩展

#### 新增扩展

1. 左侧菜单选中 `扩展`
2. 点击右侧 `绿色打勾` 按钮
3. 选择最新扩展，按确定安装

### NAT 网络

`NAT 网络` 在 [虚拟网络](./virtual_network.md) 章节详细说明，这里暂时略过

## 虚拟电脑

这里以 Debian11 为例

### 新建虚拟电脑

1. 顶部菜单栏： `控制` -> `新建`
2. 弹窗右下脚菜单： 开启 `专家模式`，输入信息：

    第一个弹窗

    ```text
    - 名称: lnmp
    - 文件夹: 默认
    - 类型: linux
    - 版本: Debian (64-bit)
    - 内存: 4096Mb
    - 虚拟硬盘: 现在创建虚拟硬盘
    ```

    第二个弹窗

    ```text
    - 文件位置: 默认
    - 文件大小: 50G
    - 虚拟硬盘文件类型: 默认
    - 存储在物理盘上：固定大小
    ```

3. 点击创建

### 设置安装盘

将 Debian11 的 dvd 光盘加入到虚拟电脑通道

1. 左侧虚拟电脑列表中，选中虚拟电脑并 `右键` -> `设置`
2. 弹窗左侧菜单 `存储` -> `存储介质` -> `控制器IDE` -> `点击边上的+按钮`
3. 弹窗： `介质` -> `注册` -> `选择光盘` -> `确定` -> `双击出现的光盘信息`
4. 到此：Debian11 安装盘设置成功

## 安装虚拟电脑系统

虚拟电脑安装 Debian 11 系统的内容请查看 [安装操作系统](./os_install.md)
