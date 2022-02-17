# vue

这是 `内置规则` + `vue3` 的验证规则

## 安装

```sh
$ npm install --save-dev eslint @babel/eslint-parser vue-eslint-parser eslint-plugin-vue eslint-config-alloy
```

## 配置

```yaml
# .eslintrc.yaml
extends:
  - 'alloy'
  - 'alloy/vue'
env:
  browser: true
  jest: true
  mocha: true
```
