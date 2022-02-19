# TypeScript React

这是 `内置规则` + `TypeScript` + `React` 的验证规则

## 安装

```bash
$ npm install --save-dev eslint typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react eslint-config-alloy
```

## 配置

```yaml
# .eslintrc.yaml
extends:
  - 'alloy',
  - 'alloy/react',
  - 'alloy/typescript',
env:
  browser: true
  jest: true
  mocha: true
```
