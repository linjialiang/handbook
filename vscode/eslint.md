# eslint 快速入门

eslint 现代前端必须掌握

vscode 上讲 eslint 就必须带上 prettier

本节会同时讲解 eslint 和 prettier 这两个插件

## 概念

这里尽可能从多维度来解释 eslint 和 prettier 是什么

### npm 包概念

eslint 和 prettier 其本质不是 vscode 插件而是 npm 包

-   eslint 是检测代码的工具，它的目标是提供一个插件化的 javascript 代码检测工具
-   prettier 是格式化代码的工具，支持前端所有主流语言的格式化，并且对 eslint 友好

### vscode 插件概念

eslint 和 prettier 这两款 npm 包使用非常广泛

为了让开发者使用更加便捷这两款 npm 包，主要的编辑器、IDE 都适配对应的插件

-   eslint 插件：是 vscode 对 `eslint包` 功能的实现
-   prettier 插件：是 vscode 对 `prettier包` 功能的实现

### 功能

eslint 功能

-   eslint 用于 js 报错提示
-   eslint 用于 js 错误修复
-   eslint 用于 js 类源码格式化

prettier 功能

-   prettier 是专业的前端代码格式化工具
-   prettier 通过插件可以支持 PHP 等其它语言的格式化
-   值得注意的是 prettier 格式化 PHP 代码还不够稳定

### 简单的概念

eslint

-   代码写错，我给你报错提示
-   代码写的不规范，我给你经警告提示
-   我还能对写错的代码和不规范的代码做自动修复
-   能修复，说明我能格式化代码，但是我没有 prettier 专业
-   支持：JavaScript TypeScript Vue JSON

prettier

-   支持，使用快捷键，格式化代码
-   支持，保存，自动格式化代码
-   支持，格式化各种前端文件
-   支持样式：CSS、LESS、SCSS
-   支持前端框架：JSX、Vue
-   支持 js：JavaScript、JSON
-   支持 js 超集：TypeScript
-   支持 HTML
-   支持 Markdown
-   支持 YAML
-   以插件的方式支持 PHP
-   还支持一些本人并不熟悉的语言，需要的话大家去官方查看

## 明确两者依存关系

在实现上，eslint 和 prettier 没有任何联系，都是独立的 npm 包

在功能上，eslint 和 prettier 必须协调一致，否则很可能会导致糟糕情况发生

## 确定规则

规则上，以 prettier 为主，eslint 要去配合 prettier，原因如下：

1. prettier 用于代码格式化，prettier 代表着代码输出是否让人满意，以 prettier 为主合理
2. prettier 支持多种类型文件的格式化，而 eslint 仅针对 js 及其衍子代，以 prettier 为主有助于整个项目的格式统一
3. prettier 与 eslint 相比，prettier 的配置规则及其简单，所以先配置 prettier 更加合理

### prettier 说明

vscode 下的 prettier 插件基本上实现了开箱即用

代码风格可能需要做一些简单配置

## eslint 配置

vscode 的 eslint 插件要经过一系列的配置才能正常使用，不同的项目配置也会跟着不同

### 基础环境配置

这是 eslint 通用的一些配置信息

#### 安装 npm 并更新到最新版

windows 下 npm 跟 nodejs 捆绑，安装 nodejs 即可

安装完 nodejs 后，npm 会直接加入到环境变量中，更新到最新版也很方便：

```bash
 # npm包强烈推荐使用全局安装
$ npm i npm@latest -g
```

npm 路径原理：

-   安装 nodejs 时 npm 作为 nodejs 的一部分，安装在 nodejs 目录下面
-   npm 安装在全局，是针对当前用户，安装的一个 nodejs 模块，所以存放于当前用户的 nodejs 模块路径下
-   npm 安装在项目，是针对当前项目，安装的一个 nodejs 模块，所以存放于当前项目的 nodejs 模块路径下

npm 路径案例：

```bash
# nodejs 捆绑的 npm 路径
C:\\Program Files\\nodejs\\node_modules\\npm

# 使用npm全局安装的npm包路径类似
C:\\Users\\linji\\AppData\\Roaming\\npm\\node_modules\\npm

# 也可以在项目里安装npm包，除非老项目不支持全局版本
项目根目录\\node_modules\\npm
```

> npm 已经很成熟，我这里不建议大家使用其它包管理器

#### 全局 npm 包

有些 npm 包是所有项目通用的，我们应该使用全局安装

```bash
# 安装nodejs时默认集成了 npx，如果没有就需要手动安装下
$ npm i npx@latest -g

# nrm 可以切换 npm 的镜像源
$ npm i nrm@latest -g
```

一些常用扩展包也可以使用全局安装，除占用了一些资源外，对项目没有太大影响：

```bash
# 这些包我选择在项目里安装，这样灵活一些

# eslint 核心包，主要功能-验证和修复代码
$ npm i eslint -g

# prettier 核心包，主要功能-代码格式化
$ npm i prettier -g

# typescript 支持
$ npm i typescript@latest -g

# ts-node 直接运行ts文件，不需要转js
$ npm i ts-node@latest -g
```

#### 项目 npm 包

npm 包安装在全局更省资源，在项目上安装更加灵活

通常前端项目的脚手架都会自动安装自己需要的 npm 包

这里建议：除了命令行的 npm 包以外，其它 npm 包都使用项目安装

```bash
# eslint 基础包， -D 将模块写入 package.json 的 devDependencies 字段，打包不会编译进去
$ npm i eslint@latest -D

# -S 将模块写入 package.json 的 dependencies 字段，打包会一起编译进去
$ npm i packName -S

# --save-exact，该npm包将被固定不再做任何小版本升级
$ npm i packName -S --save-exact
```

### 项目配置

不同项目 eslint 的配置也不尽相同，下面我们来看下具体配置

#### 通用配置

```bash
# 在项目中,初始化 package.json 文件
$ npm init -y

# 在项目中，安装 eslint 基础包
$ npm i eslint@latest -D
```

#### 纯 js 的小项目

无框架、无 typescript 的初始化

```bash
$ npx eslint --init
√ How would you like to use ESLint? · problems
√ What type of modules does your project use? · esm
√ Which framework does your project use? · none
√ Does your project use TypeScript? · No / Yes
√ Where does your code run? · browser
√ What format do you want your config file to be in? · YAML
```

修改项目根目录 .eslintrc.yaml 文件：

```yaml
# .eslintrc.yaml
env:
    browser: true
    es6: true
extends: eslint:recommended
parserOptions:
    ecmaVersion: latest
    sourceType: module
rules:
    indent:
        - error
        - 2
    quotes:
        - error
        - single
```

#### typescript 项目

typescript 项目添加了两个 npm 包

1. eslint 扩展: @typescript-eslint/recommended
2. 解析器: @typescript-eslint/parser

```bash
$ npx eslint --init
√ How would you like to use ESLint? · problems
√ What type of modules does your project use? · esm
√ Which framework does your project use? · none
√ Does your project use TypeScript? · No / Yes
√ Where does your code run? · browser
√ What format do you want your config file to be in? · YAML
The config that you've selected requires the following dependencies:

@typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest
```

修改项目根目录 .eslintrc.yaml 文件：

```yaml
# .eslintrc.yaml
env:
    browser: true
    es6: true
extends:
    - eslint:recommended
    - plugin:@typescript-eslint/recommended
parserOptions:
    ecmaVersion: latest
rules:
    indent:
        - error
        - 2
    quotes:
        - error
        - single
```

## vue3 项目

vue3 会重点讲解

### 快速构建 vue3 项目

```bash
# 使用 vite 快速构建 vue3 项目
  # 使用vue模板
  $ npm init vite@latest vue3-study -- --template vue
  # 使用vue+ts模板
  $ npm init vite@latest vue3-study -- --template vue-ts

$ cd vue3-study
$ npm i

# 用 vscode 打开项目
$ code .
```

### 安装 eslint

安装 eslint 及其插件

vue3 项目，不需要初始化 eslint，我们手动配置

```bash
# vue3 项目必备包
$ npm i -D eslint eslint-plugin-vue

# typescript 项目必备包
$ npm i -D @typescript-eslint/parser @typescript-eslint/eslint-plugin

# 使用 prettier 格式化源码，必备包
$ npm i -D eslint-config-prettier eslint-plugin-prettier

# 项目中可能需要的npm包
$ npm i -D prettier typescript
```

-   eslint : EsLint 的核心代码
-   eslint-plugin-vue : Vue 使用 Eslint 的插件
-   @typescript-eslint/parser : ESLint 的解析器，用于解析 typescript，从而检查和规范 Typescript 代码
-   @typescript-eslint/eslint-plugin : 这是一个 ESLint 插件，包含了各类定义好的检测 Typescript 代码的规范
-   eslint-config-prettier : 关闭 eslint 核心及其重要插件中可能与 prettier 冲突的规则
-   eslint-plugin-prettier : prettier 使用 Eslint 的插件

### 配置 eslint

配置前，我们需要在 vue3 项目更目录下创建 .eslintrc.yaml 文件

-   vue3 项目配置文件基本版内容：

    ```yaml
    # .eslintrc.yaml
    env:
        vue/setup-compiler-macros: true
    extends:
        - "eslint:recommended"
        - "plugin:vue/vue3-recommended"
        - "plugin:prettier/recommended"
    parser: "vue-eslint-parser"
    parserOptions:
        ecmaFeatures:
            jsx: true
        ecmaVersion: latest
        sourceType: module
    ```

-   vue3 项目配置文件 ts 版内容：

    ```yaml
    # .eslintrc.yaml
    env:
        vue/setup-compiler-macros: true
    extends:
        - "eslint:recommended"
        - "plugin:@typescript-eslint/recommended"
        - "plugin:vue/vue3-recommended"
        - "plugin:prettier/recommended"
    parser: "vue-eslint-parser"
    parserOptions:
        parser: "@typescript-eslint/parser"
        ecmaFeatures:
            jsx: true
        ecmaVersion: latest
    ```

> 提示: eslint-plugin-prettier 插件会使用 prettier 格式化配置选项作为 eslint 的验证规则

#### 配置 prettier

在项目根目录创建 .prettierrc.yaml 文件

如果代码风格符合 eslint，通常不需要额外配置 prettier

```yaml
# .prettierrc.yaml
# 这是 vue3 的代码风格，跟 prettier 默认风格不一致
singleQuote: true
jsxSingleQuote: true
```

> 提示 1： .prettierrc.yaml 配置选项修改后，prettier 立即生效，eslint 需重启 vscode 后才能生效提示 2：在 `settings.json` 里配置的 prettier 选项，eslint 无法加载，需要在项目根目录下的 `.prettierrc.yaml` 文件才有效

## 万能方案

如果不知道具体如何配置，就用这个万能方案吧

所有的项目采用 vue3+ts 的方案，这样简单粗暴，除了占用空间和开发性能问题外，没有其它毛病

-   全局安装 npm 包

```bash
$ npm i nrm -g
```

-   项目中安装的 npm 包

```bash
$ npm i eslint eslint-plugin-vue -D
$ npm i @typescript-eslint/parser @typescript-eslint/eslint-plugin -D
$ npm i eslint-config-prettier eslint-plugin-prettier -D
```

-   .eslintrc.yaml 文件

    ```yaml
    env:
        vue/setup-compiler-macros: true
    extends:
        - "eslint:recommended"
        - "plugin:@typescript-eslint/recommended"
        - "plugin:vue/vue3-recommended"
        - "plugin:prettier/recommended"
    parser: "vue-eslint-parser"
    parserOptions:
        parser: "@typescript-eslint/parser"
        ecmaFeatures:
            jsx: true
        ecmaVersion: latest
        sourceType: module
    ```

-   .prettierrc.yaml 文件

    ```yaml
    singleQuote: true
    jsxSingleQuote: true
    ```

## 新手最佳实践

对于新人来讲，配置简单是非常重要的

对于代码规范来讲，符合编码界标准是很重要的

-   针对 UmiJS 系列项目，推荐使用 [fabric](https://github.com/umijs/fabric)

    1. 几乎零配置
    2. 是 UmiJS 同一团队的作品

-   针对其它项目，推荐使用 [eslint-config-alloy](https://github.com/AlloyTeam/eslint-config-alloy)

    1. 几乎零配置
    2. 使用率全球第三，腾讯旗下项目

## 主要参考地址

-   [ESLint 中文文档](https://eslint.bootcss.com/)
-   [TypeScript ESLint](https://typescript-eslint.io/)
-   [eslint-plugin-vue](https://eslint.vuejs.org/)
-   [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)
-   [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)
-   [eslint 规则-中文网](https://eslint.bootcss.com/docs/rules/)
-   [eslint 规则-官方](https://eslint.org/docs/rules/)
-   [prettier 选项](https://prettier.io/docs/en/options.html)
