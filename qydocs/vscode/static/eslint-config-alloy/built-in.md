# 内置规则

这是 eslint-config-alloy 内置的规则，属于最小单元

## 安装

```bash
$ npm i -D eslint @babel/eslint-parser eslint-config-alloy
```

## 配置

```yaml
# .eslintrc.yaml
extends:
    - "alloy"
env:
    browser: true
    jest: true
    mocha: true
```
