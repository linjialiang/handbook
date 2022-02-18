# eslint-config-alloy

[AlloyTeam ESLint](https://github.com/AlloyTeam/eslint-config-alloy) 规则不仅是一套先进的适用于 React/Vue/Typescript 项目的 ESLint 配置规范，而且也是你配置个性化 ESLint 规则的最佳参考

该规则是中国人维护的，中文比较全面，使用率高于 google 的大家放心用

## 快速开始

eslint-config-alloy 官方对以下技术栈的项目做了适配：

1. 内置规则
2. React
3. Vue - 对 ts+vue 不是很友好
4. TypeScript
5. [TypeScript React](#typescript-react)

作为 PHP 开发者，我主要使用前端来开发后台，所以我认为直接使用框架集成工具会更加高效

国内最成熟的项目集成框架通常都是 react 项目，其中首推 [UmiJS](https://umijs.org/) 系列，umijs 集成了自己的 lint 项目

下面我们主要讲解 React，其它看官方说明即可

## TypeScript React

### 安装 eslint

项目下安装 eslint 及其 eslint 插件

-   npm 安装方式

    ```bash
    # ts-node 和 prettier 非项目必须
    $ npm i -D ts-node prettier
    $ npm i -D typescript
    $ npm i -D eslint
    $ npm i -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
    $ npm i -D eslint-plugin-react
    $ npm i -D eslint-config-alloy
    ```

-   yarl 安装方式

    ```bash
    $ yarl add -D ts-node prettier    # ts-node 和 prettier 非项目必须
    $ yarl add -D typescript
    $ yarl add -D eslint
    $ yarl add -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
    $ yarl add -D eslint-plugin-react
    $ yarl add -D eslint-config-alloy
    ```

-   pnpm 安装方式

    ```bash
    $ pnpm add -D ts-node prettier    # ts-node 和 prettier 非项目必须
    $ pnpm add -D typescript
    $ pnpm add -D eslint
    $ pnpm add -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
    $ pnpm add -D eslint-plugin-react
    $ pnpm add -D eslint-config-alloy
    ```

### 规则内容

```yaml
# .eslintrc.yaml
extends:
    - "alloy"
    - "alloy/react"
    - "alloy/typescript"
env:
    - browser: true
# rules:
```

## 在 VSCode 中使用

### 验证更多文件

在 vscode 中，ESLint 当前默认支持的文件格式：

1. .js
2. .jsx
3. .ts
4. .tsx
5. .html
6. .vue
7. .md

如果无法验证，则需要在用户配置文件里做如下配置：

```json
# settings.json
{
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "vue",
    "typescript",
    "typescriptreact"
  ]
}
```

### 保存时自动修复 ESLint 错误

如果想要开启「保存时自动修复」的功能，你需要配置 .vscode/settings.json：

```json
{
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    }
}
```

如果 .vue、.ts 和 .tsx 文件不支持自动修复，则需要配置成：

```json
{
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        {
            "language": "vue",
            "autoFix": true
        },
        {
            "language": "typescript",
            "autoFix": true
        },
        {
            "language": "typescriptreact",
            "autoFix": true
        }
    ]
}
```

## 结合 Prettier

下面给出一个 AlloyTeam 使用的 .prettierrc.js 配置，仅供参考：

```js
// .prettierrc.js
module.exports = {
    // 一行最多 120 字符
    printWidth: 120,
    // 使用 2 个空格缩进
    tabWidth: 2,
    // 不使用缩进符，而使用空格
    useTabs: false,
    // 行尾需要有分号
    semi: true,
    // 使用单引号
    singleQuote: true,
    // 对象的 key 仅在必要时用引号
    quoteProps: "as-needed",
    // jsx 不使用单引号，而使用双引号
    jsxSingleQuote: false,
    // 末尾需要有逗号
    trailingComma: "all",
    // 大括号内的首尾需要空格
    bracketSpacing: true,
    // jsx 标签的反尖括号需要换行
    bracketSameLine: false,
    // 箭头函数，只有一个参数的时候，也需要括号
    arrowParens: "always",
    // 每个文件格式化的范围是文件的全部内容
    rangeStart: 0,
    rangeEnd: Infinity,
    // 不需要写文件开头的 @prettier
    requirePragma: false,
    // 不需要自动在文件开头插入 @prettier
    insertPragma: false,
    // 使用默认的折行标准
    proseWrap: "preserve",
    // 根据显示样式决定 html 要不要折行
    htmlWhitespaceSensitivity: "css",
    // vue 文件中的 script 和 style 内不用缩进
    vueIndentScriptAndStyle: false,
    // 换行符使用 lf
    endOfLine: "lf",
    // 格式化内嵌代码
    embeddedLanguageFormatting: "auto",
};
```

VSCode 的一个最佳实践就是通过配置 .vscode/settings.json 来支持自动修复 Prettier 和 ESLint 错误：

```json
{
    "files.eol": "\n",
    "editor.tabSize": 2,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    // 通常不需要eslint.validate配置，新版eslint插件已经模板支持，以下文件格式
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "vue",
        "typescript",
        "typescriptreact"
    ],
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    }
}
```
