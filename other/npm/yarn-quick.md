# 快速入门 yarn

不同项目作者使用的 npm 管理工具也不尽相同，常见的 npm 包管理工具主要有 3 种：`npm` `yarn` `pnpm`

本小节快速入门 yarn

## 概念

Yarn 是 Facebook 联合其他大公司推出的模块管理器

相比过去的 npm 有很大优势，随着 npm 的升级迭代，npm 已经非常接近 yarn

总体上，yarn 还是优于 npm，所以有些项目、框架甚至公司还是会要求使用 yarn

我开始用 node 开发项目时，npm 已经很成熟了，就很少使用 yarn ，所以这里的内容会非常少

## 安装 yarn

使用 npm 包管理器安装全局 yarn 模块：

```bash
$ npm i yarn -g
```

使用 npm 包管理器更新全局 yarn

```bash
$ npm update yarn -g
```

## 初始化项目

```bash
$ yarn init
```

## 安装项目依赖

```bash
$ yarn
$ yarn install
```

## 添加依赖项

```bash
$ yarn add [package]
$ yarn add [package]@[version]
$ yarn add [package]@[tag]

# 加入devDependencies字段
$ yarn add [package]@[tag] --dev

# 固定版本
$ yarn add [package] --exact
```

## 更新依赖项

```bash
# 批量更新依赖项，重新生成yarn.lock文件
$ yarn upgrade

# 将模块升级到latest版本，然后改写package.json
$ yarn upgrade [package]
# 更新时指定版本范围或标签
$ yarn upgrade [package]@[1.0.2]
$ yarn upgrade [package]@next
```

## 移除依赖项

```bash
$ yarn remove [package]
```
