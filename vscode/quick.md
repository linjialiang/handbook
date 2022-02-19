# vscode 快速入门

vscode 快速入门属于新手篇，学完本章节就能使用 vscode 编辑器来提供日常工作效率

本篇内容简述：

## vscode 基本概念

想要深入学习 vscode，非常有必要先统一界面的基本组成部分的称谓，这类似于语言或框架中基本语法的中文称谓

## vscode 快捷键

合理的快捷键可以显著提升我们的工作效率，vscode 的键盘映射功能非常强大，主要体现在以下几点：

- 内置了完善的快捷键
- 支持自定义快捷键
- 支持其它热门编辑器的专属快捷键

## 插件

下面这些是我常用的插件，大家可以参考安装，某些项目不需要的插件可以选择性禁用掉

### 基础插件

这是面向大多数项目的通用插件，是强化编辑器自身的插件

1. 符号对齐

   插件名: Better Align

2. 中文语言包

   插件名: Chinese (Simplified) (简体中文) Language Pack for Visual Studio Code

3. 路径补全

   插件名: Path Intellisense

4. 项目管理

   插件名: Project Manager

5. 代码格式化

   插件名: Prettier - Code formatter

6. vscode 配置同步

   插件名: Settings Sync

7. 书签类插件

   插件 1: Bookmarks（新手）插件 2: TODO Highlight（不推荐）插件 3: Todo Tree（高手）

8. 代码注释高亮

   插件名: Better Comments

9. 高亮缩进

   插件名: indent-rainbow

10. 代码比较

    插件名: Partial Diff

11. 选中高亮

    插件名: highlight-words

    > 提示：实际工作中，用处不大

12. YAML 语法支持

    插件名: YAML

    > 提示：需要再安装，别让 vscode 变得更卡

13. 括号高亮

    插件名: Bracket Pair Colorizer 2

    > 备注：现已不推荐使用，因为 vscode 内置能完美实现这些功能

    ```json
    // 两行代码，更加完美的实现 Bracket Pair Colorizer 2 功能
    {
      "editor.bracketPairColorization.enabled": true,
      "editor.guides.bracketPairs": "active"
    }
    ```

    > 最后：我们要感谢这些插件开发者，如果没有他们的作品，官方是不会去实现的

14. Git 历史记录

    插件名: Git History

    > 提示：我没有使用这个插件

15. git 忽略文件语法高亮

    插件名: gitignore

    > 提示：需要再安装，别让 vscode 变得更卡

16. .ENV 语法支持

    插件名: ENV

    > 提示：需要再安装，别让 vscode 变得更卡

17. 拼写检查

    插件名: Code Spell Checker

    > 提示：国人用着很烦

18. 文件大小

    插件名: filesize

    > 提示：需要再安装，别让 vscode 变得更卡

19. Firefox 调试工具

    插件名: Debugger for Firefox

    > 提示：需要再安装，别让 vscode 变得更卡

20. 文件头部自动生成

    插件名: koroFileHeader

    > 提示：需要再安装，别让 vscode 变得更卡

21. 正则实时测试

    插件名: Regex Previewer

    > 提示：我没有使用这个插件

22. 编辑器统一配置

    插件名: EditorConfig for VS Code

23. x86 汇编语言高亮

    插件名: x86 and x86_64 Assembly

    > 提示：需要再安装，别让 vscode 变得更卡

24. 十六进制文件预览与编辑

    插件名: hexdump for VSCode

    > 提示：需要再安装，别让 vscode 变得更卡

### 前端插件

1. 前端代码检测工具

   插件名: ESLint

2. 自动导入包

   插件名: Auto Import

   > 提示：需要再安装，别让 vscode 变得更卡

3. 显示包大小

   插件名: Import Cost

   > 提示：需要再安装，别让 vscode 变得更卡

4. 从浏览器打开

   插件名: Open-In-Browser

   > 提示：需要再安装，现在前端开发并不需要这个小玩意了

5. css 跳转

   插件名: CSS Peek

   > 提示：需要再安装，别让 vscode 变得更卡

6. css 模块补全

   插件名: CSS Peek

   > 提示：对使用了 css modules 的 jsx 标签的类名补全和跳转到定义位置

7. px 转 rem

   插件名: cssrem

8. html 模板

   插件名: HTML Boilerplate

   > 提示：需要再安装，别让 vscode 变得更卡

9. SVG 视图

   插件名: SVG Viewer

   > 提示：需要再安装，别让 vscode 变得更卡

### PHP 插件

1. PHP Intelephense

2. PHP DocBlocker

### Vue3 插件

1. TypeScript Vue Plugin (Volar)

2. Vue Language Features (Volar)

### React 插件

1. ES7 React/Redux/GraphQL/React-Native snippets

### 主题插件

1. Dracula Official（速度快一些）
2. Nord
3. One Dark Pro（速度慢一些）

### 图标插件

随意选一个，我现在用 `Material Icon Theme`

1. Material Icon Theme
2. vscode-icons

### 快捷键插件

快捷键插件只推荐 `VSCode Neovim`

技能要求：当你成为 vim 高手后再尝试，否则只会让 vscode 更糟糕

> 提示：使用 `VSCode Neovim` 后，你主要用的是 Neovim 插件，而不是 vscode 的插件

## 基本配置

[用户配置文件参考](./static/settings.json.md)

## 插件配置

[用户插件配置文件参考](./static/keybindings.json.md)

### project-manager 相关快捷键

快速打开项目经常用到，快捷键如下（更多快捷键自行`Ctrl+k Ctrl+s`查看）：

| 快捷键           | 描述                         |
| ---------------- | ---------------------------- |
| shift+alt+p      | 快速打开新项目，替换当前项目 |
| ctrl+shift+alt+p | 在新窗口中，快速打开新项目   |

自定义的快捷键信息

```json
[
  // 针对 project-manager 扩展的快捷键设置
  {
    "key": "ctrl+shift+alt+p",
    "command": "projectManager.listProjectsNewWindow"
  }
]
```

### Better Align 相关快捷键

| 快捷键        | 描述     |
| ------------- | -------- |
| ctrl+k ctrl+= | 符号对齐 |

自定义的快捷键信息:

```json
[
  // 针对 Better Align 扩展的快捷键设置
  {
    "key": "ctrl+k ctrl+oem_plus",
    "command": "wwm.aligncode"
  }
]
```

### highlight-words 相关快捷键

> 备注：词组高亮我并不常用，已经移除

| 快捷键         | 描述             |
| -------------- | ---------------- |
| ctrl+k g       | 选中文本高亮开关 |
| ctrl+k shift+g | 移除指定文本高亮 |
| ctrl+k space   | 移除全部文本高亮 |

自定义的快捷键信息:

```json
[
  // 针对 highlight-words 扩展相关快捷键设置
  {
    "key": "ctrl+k space",
    "command": "highlightwords.removeAllHighlights"
  },
  {
    "key": "ctrl+k g",
    "command": "highlightwords.addHighlight"
  },
  {
    "key": "ctrl+k shift+g",
    "command": "highlightwords.removeHighlight"
  }
]
```

### Partial Diff 相关快捷键

| 快捷键             | 描述                               |
| ------------------ | ---------------------------------- |
| ctrl+k shift+d     | 比较对象：选中内容（未选中为文件） |
| ctrl+k shift+alt+d | 当前对象：选中内容（未选中为文件） |

自定义的快捷键信息:

```json
[
  // 针对 Partial Diff 扩展相关快捷键设置
  {
    "key": "ctrl+k shift+d",
    "command": "extension.partialDiff.markSection1"
  },
  {
    "key": "ctrl+k shift+alt+d",
    "command": "extension.partialDiff.markSection2AndTakeDiff"
  }
]
```

### hexdump for VSCode 相关快捷键

常用快捷键如下（更多快捷键自行`Ctrl+k Ctrl+s`查看）：

| 快捷键        | 描述                     |
| ------------- | ------------------------ |
| ctrl+k ctrl+h | 文件以 16 进制方式打开   |
| shift+enter   | 编辑光标位置内容         |
| ctrl+g        | 跳转至 16 进制地址所在行 |

自定义的快捷键信息:

```json
[
  // 针对 hexdump for VSCode 扩展的快捷键设置
  {
    "key": "ctrl+k ctrl+h",
    "command": "hexdump.hexdumpFile"
  }
]
```

### Bookmarks 相关快捷键

书签常用快捷键如下：

| 快捷键             | 描述               |
| ------------------ | ------------------ |
| ctrl+alt+k         | 书签开关           |
| ctrl+alt+j         | 跳转至上一个书签   |
| ctrl+alt+l         | 跳转至下一个书签   |
| ctrl+k shift+alt+l | 当前文件的书签列表 |
| ctrl+k alt+l       | 整个项目的书签列表 |
| ctrl+k shift+alt+b | 清空当前文件的书签 |
| ctrl+k alt+b       | 清空整个项目的书签 |

自定义的快捷键信息:

```json
[
  // 针对 Bookmarks 扩展的快捷键设置
  {
    "key": "ctrl+k shift+alt+l",
    "command": "bookmarks.list"
  },
  {
    "key": "ctrl+k shift+alt+b",
    "command": "bookmarks.clear"
  },
  {
    "key": "ctrl+k alt+b",
    "command": "bookmarks.clearFromAllFiles"
  },
  {
    "key": "ctrl+k alt+l",
    "command": "bookmarks.listFromAllFiles"
  }
]
```

## 微信开发者工具

微信开发者工具的编辑器也是 vscode 的衍生版本

[settings.json 案例](./static/wechat/settings.json.md)

微信开发者工具修改快捷键方式

1. `Ctrl+k Ctrl+s` 调出快捷键管理界面
2. 搜索对应的指令，添加上快捷键
3. 指令可以参考，vscode 的 [快捷键配置文件](./static/keybindings.json.md)
