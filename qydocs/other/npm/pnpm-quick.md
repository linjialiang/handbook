# 快速入门 pnpm

不同项目作者使用的 npm 管理工具也不尽相同，常见的 npm 包管理工具主要有 3 种：`npm` `yarn` `pnpm`

本小节快速入门 pnpm

pnpm 并不是很熟悉，本章节后续会有大幅度改动

## 概念

pnpm 是一个命令行软件，用来在用户的电脑上安装和管理 Node 模块

相比于 npm yarn 来讲，pnpm 可以节约磁盘空间

## 安装 pnpm

```bash
# 通过 npm 安装
$ npm i -g pnpm

# 通过 npx 安装
$ npx i -g pnpm
```

## 升级 pnpm

```bash
$ pnpm add -g pnpm
$ pnpm up pnpm -g
```

## 安装依赖项

```bash
# 安装项目所有依赖
$ pnpm install
# 只安装 devDependencies 字段里的包
$ pnpm install -D

# 保存到 dependencies
$ pnpm add [package]

# 保存到 devDependencies
$ pnpm add -D [package]

# 安装指定标签
$ pnpm add [package]@[next]

# 安装指定版本 3.0.0
$ pnpm add [package]@[3.0.0]
```

## 更新依赖项

```bash
# 批量更新，遵循 package.json 指定的范围更新所有的依赖项
$ pnpm up

# 批量更新，更新所有依赖项到最新版本，会导致跨打版本升级
$ pnpm --latest

# 将 foo 更新到 v2 上的最新版本
$ pnpm [foo]@[2]

# 批量更新，更新 @babel 范围内的所有依赖项
$ pnpm "@babel/*"
```

## 删除依赖项

```bash
# 当在 `工作区` 中使用此命令时，将从每个工作区的包中移除相关依赖(或 多个依赖)
# 当不在工作区内使用时，将删除相关依赖项 (或多个依赖), 也包含子目录中对应的包
$ pnpm -r [package]

# 从全局删除一个依赖包
$ pnpm -r --global [package]

# 从全局删除一个依赖包
$ pnpm -r --global [package]

# 仅从 devDependencies 中删除相关依赖项
$ pnpm -r -P [package]

# 仅删除开发环境 devDependencies 中的依赖项
$ pnpm -r -D [package]
```
