# fabric

fabric 提供了严格但是不严苛的 lint 规则集，包含 eslint，stylelint，prettier 三种工具，可以显著的提升代码质量，规范代码风格。

- UmiJS 系列项目: 强烈推荐使用 fabric 因为是同一个团队开发的，而且 fabric 配置超级简单
- 非 UmiJS 系列项目: 可以在 fabric 中 eslint-config-alloy 选择一个，当然也可以自己配置

## 安装 fabric

```sh
# npm 安装
$ npm i @umijs/fabric -D

# yarn 安装
$ yarn add @umijs/fabric -D
```

## 配置文件

在项目根目录创建对应的文件，拷贝内容即可：

- .eslintrc.js

  ```js
  module.exports = {
    extends: [require.resolve('@umijs/fabric/dist/eslint')],

    // in antd-design-pro
    globals: {
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
      page: true,
    },

    rules: {
      // your rules
    },
  };
  ```

- .stylelintrc.js

  ```js
  module.exports = {
    extends: [require.resolve('@umijs/fabric/dist/stylelint')],
    rules: {
      // your rules
    },
  };
  ```

- .prettierrc.js

  ```js
  const fabric = require('@umijs/fabric');

  module.exports = {
    ...fabric.prettier,
  };
  ```

fabric [官方项目地址](https://github.com/umijs/fabric)
