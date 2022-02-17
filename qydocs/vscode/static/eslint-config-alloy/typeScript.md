# TypeScript

这是 `内置规则` + `TypeScript` 的验证规则

## 安装

```sh
$ npm install --save-dev eslint typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-alloy
```

## 配置

```yaml
# .eslintrc.yaml
extends:
  - 'alloy'
  - 'alloy/typescript'
env:
  browser: true
  jest: true
  mocha: true
```
