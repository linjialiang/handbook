# settings.json

微信开发者工具可以直接从 vscode 中导入插件

微信开发者工具的编辑器与 vscode 区别：

1. 不支持部分插件
2. 由于版本较低，部分内置功能也无法实现
3. 内置了一些 vscode 的外部插件

```json
{
  "terminal.external.windowsExec": "C:\\Program Files\\PowerShell\\7\\pwsh.exe",
  "terminal.integrated.shell.windows": "C:\\Program Files\\PowerShell\\7\\pwsh.exe",
  "terminal.integrated.automationShell.windows": "C:\\Program Files\\PowerShell\\7\\pwsh.exe",
  "terminal.integrated.fontFamily": "'JetBrains Mono', '思源黑体 CN', 'MesloLGM NF'",
  "terminal.integrated.fontSize": 16,
  "editor.fontLigatures": "'zero' on, 'calt' on, 'liga' on",
  "editor.insertSpaces": true,
  "editor.lineNumbers": "relative",
  "editor.tabSize": 2,
  "editor.fontFamily": "'JetBrains Mono', '思源黑体 CN'",
  "editor.fontSize": 16,
  "editor.lineHeight": 24,
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.organizeImports": true
  },
  "markdown.preview.fontFamily": "'JetBrains Mono', '思源黑体 CN'",
  "markdown.preview.fontSize": 16,
  "markdown.preview.lineHeight": 24,
  "html.format.enable": false,
  "json.format.enable": false,
  "javascript.format.enable": false,
  "typescript.format.enable": false,
  "yaml.format.enable": false,
  "files.autoGuessEncoding": true,
  "files.autoSave": "off",
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
  "workbench.iconTheme": "material-icon-theme",
  "material-icon-theme.activeIconPack": "react_redux",
  "workbench.colorTheme": "One Dark Pro",
  "oneDarkPro.bold": true,
  "oneDarkPro.vivid": true,
  "editor.wordWrap": "off",
  "editor.minimap.enabled": true,
  "workbench.editor.enablePreview": true,
  "workbench.editor.enablePreviewFromQuickOpen": true
}
```
