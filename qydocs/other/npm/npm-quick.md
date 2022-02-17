# 快速入门 npm

不同项目作者使用的 npm 管理工具也不尽相同，常见的 npm 包管理工具主要有 3 种：`npm` `yarn` `pnpm`

本小节快速入门 npm

## 概念

npm 是一个命令行软件，用来在用户的电脑上安装和管理 Node 模块

## 安装

windows 上和 linux 上 npm 安装方式不同

- windows 上安装

  windows 上，安装 Node 的时候，会默认一起安装 npm，通常不是最新版

  ```sh
  # 安装最新版的npm模块
  $ npm i npm@latest -g
  ```

  > 提示：nodejs 捆绑的 npm 无法做任何改动，我们全局安装的 npm 模块，操作上跟其它模块一样

- debian 上安装

  ```sh
  $ apt install nodejs npm
  ```

## 初始化

项目需要使用 node 模块的方式开发，就必须先通过 npm 初始化

```sh
$ npm init
# 使用默认
$ npm init -y
```

## 设置环境变量

设置环境变量主要用处就是为 npm init 设置了默认值

```sh
$ npm set init-author-name linjialiang
$ npm set init-author-email linjialiang@163.com
$ npm set init-author-url http://qydocs.y746.com
$ npm set init-license MIT
```

## 发布 npm 模块

发布一个 npm 模块很简单

### 注册用户

- 未注册，通过命令行，注册一个 npmjs.com 用户

  ```sh
  $ npm adduser
  Username: 用户名
  Password: 用户密码
  Email: 用户邮箱
  ```

- 已注册，则使用登录指令：

  ```sh
  $ npm login
  ```

### 发布命令

登录用户后，则可以使用以下指令发布：

```sh
$ npm publish
```

发布测试版

```sh
$ npm publish --tag v0.0.1-beta.1
```

### 发布须知

国内很多时候会用淘宝镜像，这样会导致模块无法提交到 npmjs.com

通常推荐使用 nrm 来一键切换

```sh
# 使用淘宝镜像
$ nrm use taobao
# 使用 npm 仓库地址
$ nrm use npm
```

全局安装 nrm

```sh
$ npm i nrm -g
```

## 安装模块

安装 npm 模块十分方便

```sh
# 使用淘宝镜像
$ nrm use taobao

# 安装一个包
# npm i packageName
```

### 安装指定版本

- 大版本: 4.x.x
- 小版本: 4.17.x

```sh
# 安装最新版
$ npm i packageName
$ npm i packageName@latest

# 指定确定的版本
$ npm i packageName@4.17.4

# 指定版本范围
$ npm i sax@">=4.15.0 <4.18.0"

# 指定大版本
$ npm i packageName@^4.0.0

# 指定小版本
$ npm i packageName@~4.17.0
```

- 建议 1：开发依赖包，指定大版本，获得新功能
- 建议 2：项目运行依赖包，指定小版本，更稳定

### 为模块打上不同标签

1. -S : 项目运行必备
2. -D : 仅开发使用
3. --save-exact : 模块版本不再升级
4. -g : 全局安装模块
5. -f : 强制重新安装模块

```sh
# 将 nrm 模块，全局安装
# 全局安装，加上--save、--save-exact、--save-dev都是无效的
$ npm i nrm -g

# 将模块写入 package.json 的 dependencies 字段
$ npm i packageName -S

# 将模块写入 package.json 的 devDependencies 字段
$ npm i packageName -D

# 该模块版本不再升级
$ npm i packageName -S --save-exact
$ npm i packageName -D --save-exact

# 不管模块是否已安装，都强制重新安装
$ npm i packageName -f
# 强制重新安装全部模块
$ rm -rf node_modules
$ npm i
```

## 更新模块

```sh
# 更新全局模块
$ npm update packageName -g

# 更新当前项目的某个模块
$ npm update packageName

# 批量更新 dependencies 字段模块
$ npm update

# 批量更新 dependencies + devDependencies 字段模块
$ npm update --dev
```

## 卸载模块

```sh
# 卸载全局模块
$ npm uninstall packageName -g

# 卸载项目模块，并从项目 package.json 中移除
$ npm uninstall packageName
```

## npx 使用

这里只讲 npx 最常用的 1 个功能

### 安装 npx

新版 nodejs 自带 npx 功能

假如你的电脑上没有 npx ，可以 npm 模块的方式安装：

```sh
$ npm i npx -g
```

### 使用 npx

npx 让项目内部安装的模块用起来更方便

这也是 npx 最重要的功能

```sh
# 非npx，在项目的根目录下执行
$ node-modules/.bin/eslint -v

# npx 可以在项目任意目录执行
$ npx eslint -v
```
