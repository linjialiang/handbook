# react

这是 `内置规则` + `react` 的验证规则

## 安装

```bash
$ npm install --save-dev eslint @babel/eslint-parser @babel/preset-react@latest eslint-plugin-react eslint-config-alloy
```

## 配置

```yaml
# .eslintrc.yaml
extends:
    - "alloy"
    - "alloy/react"
env:
    browser: true
    jest: true
    mocha: true
```
