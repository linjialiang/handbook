# NPM 脚本功能

npm 不仅可以用于模块管理，还可以用于执行脚本

package.json 文件有一个 scripts 字段，可以用于指定脚本命令，供 npm 直接调用

## 举例

举例来说，你执行 ESLint 的安装命令

```bash
$ npm i eslint -D
```

运行上面的命令以后，会产生两个结果:

-   首先，ESLint 被安装到当前目录的 node_modules 子目录
-   其次，node_modules/.bin 目录会生成一个符号链接 node_modules/.bin/eslint，指向 ESLint 模块的可执行脚本
-   然后，你就可以在 package.json 的 script 属性里面，不带路径的引用 eslint 这个脚本

```bash
{
  "name": "Test Project",
  "devDependencies": {
    "eslint": "^1.10.3"
  },
  "scripts": {
    "lint": "eslint ."
  }
}
```

我们运行 `npm run lint` 的时候，它会自动执行 `./node_modules/.bin/eslint .`
