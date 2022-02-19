# settings.json

## 用户通用配置

兼容 fabric eslint-config-alloy 这两个规则集

```json
{
  "update.mode": "manual",
  "workbench.startupEditor": "none",
  "terminal.integrated.defaultProfile.windows": "PowerShell",
  "terminal.explorerKind": "external",
  "terminal.external.windowsExec": "C:\\Program Files\\PowerShell\\7\\pwsh.exe",
  "terminal.integrated.fontFamily": "'JetBrains Mono', '思源黑体 CN', 'MesloLGM NF'",
  "terminal.integrated.fontSize": 16,
  "editor.bracketPairColorization.enabled": true,
  "editor.guides.bracketPairs": "active",
  "editor.hover.above": true,
  "editor.fontLigatures": "'zero' on, 'calt' on, 'liga' on",
  "editor.insertSpaces": true,
  "editor.lineNumbers": "relative",
  "editor.tabSize": 2,
  "editor.fontFamily": "'JetBrains Mono', '思源黑体 CN'",
  "editor.fontSize": 16,
  "editor.lineHeight": 1.5,
  "editor.linkedEditing": true,
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,
  "editor.multiCursorModifier": "ctrlCmd",
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.organizeImports": true
  },
  "markdown.preview.fontFamily": "'JetBrains Mono', '思源黑体 CN'",
  "markdown.preview.fontSize": 16,
  "markdown.preview.lineHeight": 1.5,
  "markdown.preview.typographer": true,
  "html.format.enable": false,
  "json.format.enable": false,
  "javascript.format.enable": false,
  "typescript.format.enable": false,
  "yaml.format.enable": false,
  "files.autoGuessEncoding": true,
  "files.autoSave": "onFocusChange",
  "files.eol": "\n",
  "files.trimFinalNewlines": true,
  "files.insertFinalNewline": true,
  "files.trimTrailingWhitespace": true,
  "files.associations": {
    "*.wxml": "html",
    "*.wxss": "css"
  },
  "redhat.telemetry.enabled": false,
  "prettier.singleQuote": true,
  "prettier.trailingComma": "all",
  "prettier.printWidth": 100,
  "prettier.proseWrap": "never",
  "sync.gist": "your gistid",
  "workbench.iconTheme": "material-icon-theme",
  "material-icon-theme.activeIconPack": "react_redux",
  "workbench.colorTheme": "One Dark Pro",
  "oneDarkPro.bold": true,
  "oneDarkPro.vivid": true,
  "security.workspace.trust.untrustedFiles": "open"
}
```

## 自定义项目规则

在项目 `.vscode` 目录下新建 `settings.json` 文件，写上对应规则即可

- 如，将 tab 设置为 4 空格：

  ```json
  // .vscode/settings.json
  {
    "editor.tabSize": 4,
    "prettier.tabWidth": 4
  }
  ```

- 如，禁用自动格式化修改的内容

  ```json
  // .vscode/settings.json
  {
    "editor.formatOnSave": false
  }
  ```

- 如，禁用自动修复

  ```json
  // .vscode/settings.json
  {
    "editor.codeActionsOnSave": {
      "source.fixAll": false
    }
  }
  ```

- 如，禁用 php 自带功能

  ```json
  {
    "php.suggest.basic": false,
    "php.validate.enable": false
  }
  ```

- 如，增加语言的文件关联

  ```json
  {
    "files.associations": {
      "*.wxml": "html",
      "*.wxss": "css"
    }
  }
  ```

- 如，增加 eslint 激活文件验证

  ```json
  // vscode通常默认支持
  {
    "eslint.validate": ["javascript", "javascriptreact", "vue", "typescript", "typescriptreact"]
  }
  ```

  ```json
  // 除非禁用了自带的验证
  {
    "php.suggest.basic": false,
    "php.validate.enable": false,
    "css.validate": false,
    "less.validate": false,
    "scss.validate": false,
    "html.validate.styles": false,
    "html.validate.scripts": false,
    "javascript.validate.enable": false,
    "typescript.validate.enable": false
  }
  ```

- 如：增加 jsx、tsx 支持 html 自动补全

  ```json
  {
    "emmet.includeLanguages": {
      "javascript": "javascriptreact",
      "typescript": "typescriptreact"
    }
  }
  ```

- 如：在项目中修改终端打开的路径

  ```json
  {
    "terminal.integrated.cwd": "addons\\task_center"
  }
  ```

  > 说明：假如你的项目中有些模块单独开启了版本控制，这非常有用
