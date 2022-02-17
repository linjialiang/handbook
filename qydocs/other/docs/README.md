# 开源文档生成指南

## vite 官方中文文档

### 拉取项目

```sh
$ git clone https://e.coding.net/madnesslin/vue3/vite-docs-cn.git
$ cd vite-docs-cn
$ yarn install
```

### 文档打包

- 使用 `build` 指令生成静态站点

  ```sh
  $ yarn build
  ```

- 打包路径： `.vitepress\dist`

## vue3 官方中文文档

### 拉取项目

```sh
$ git clone https://e.coding.net/madnesslin/vue3/docs-zh-cn.git vue3
$ cd vue3
$ pnpm install
```

### 文档打包

- 使用 `build` 指令生成静态站点

  ```sh
  $ pnpm build
  ```

- 打包路径： `.vitepress\dist`

## vue3-router 官方文档

vue3-router 文档和源码在同一个仓库

### 拉取项目

```sh
$ git clone https://e.coding.net/madnesslin/vue3/router.git
$ cd router
$ yarn install
```

### 文档打包

- 使用 `docs:build` 指令生成静态站点

  ```sh
  $ yarn docs:build
  ```

- 打包路径： `docs\.vitepress\dist`

## pinia 官方文档

pinia 文档和源码在同一个仓库，并且只有英文文档

### 拉取项目

```sh
$ git clone https://e.coding.net/madnesslin/vue3/pinia.git
$ cd router
$ yarn install
```

### 文档打包

- 首次使用需 `build` 指令生成必要资源

  ```sh
  $ yarn build
  ```

- 使用 `docs:api` 指令生成 api 静态资源

  ```sh
  $ yarn docs:api
  ```

- 使用 `docs:build` 指令生成静态站点

  ```sh
  $ yarn docs:build
  ```

- 打包路径： `docs\.vitepress\dist`

## vitepress 官方文档

vitepress 文档和源码在同一个仓库，并且只有英文文档

### 拉取项目

```sh
$ git clone https://e.coding.net/madnesslin/vue3/vitepress.git
$ cd vitepress
$ pnpm install
```

### 文档打包

- 使用 `docs-build` 指令生成 api 静态资源

  ```sh
  $ pnpm docs-build
  ```

- 打包路径： `docs\.vitepress\dist`

## elment-plus 官方文档

elment-plus 文档和源码在同一个仓库，并且中文包需要手动下载

### 拉取项目

```sh
$ git clone https://e.coding.net/madnesslin/pure-admin/element-plus.git
$ cd element-plus
$ pnpm install
```

### 添加中文翻译包

elment-plus 添加中文翻译文档需如下 3 步：

1. 下载中文翻译包：https://crowdin.com/project/element-plus/zh-CN
2. 解压 `Element Plus (zh-CN).zip`
3. 将 `.vitepress` 和 `zh-CN` 拷贝到 element-plus 项目的 `docs` 目录下

### 文档打包

- 首次使用需要通过 `docs:dev` 指令生成必要资源

  ```sh
  $ pnpm run docs:dev
  ```

- 使用 `docs:build` 指令生成静态站点

  ```sh
  $ pnpm run docs:build
  ```

- 打包路径： `docs\.vitepress\dist`

## pure-admin-doc 官方文档

### 拉取项目

```sh
$ git clone https://e.coding.net/madnesslin/pure-admin/pure-admin-doc.git
$ cd pure-admin-doc
$ pnpm install
```

### 文档打包

- 首次使用需要通过 `bootstrap` 指令生成必要资源

  ```sh
  $ pnpm run bootstrap
  ```

- 使用 `build` 指令生成静态站点

  ```sh
  $ pnpm run build
  ```

- 打包路径： `docs\.vuepress\dist`

## vue devtools 官方文档

vue 的 devtools 文档和源码在同一个仓库，并且只有英文文档

### 拉取项目

```sh
$ git clone https://e.coding.net/madnesslin/vue3/devtools.git vue-devtools
$ cd vue-devtools
$ yarn install
```

> 提示：下载可能会报错，一般来讲没有太大关系，继续下一步看看能否打包文档

### 文档打包

- 使用 `build` 指令生成静态站点

  ```sh
  $ yarn docs:build
  ```

- 打包路径： `docs\.vitepress\dist`

## axios 官方文档

### 拉取项目

```sh
$ git clone https://e.coding.net/madnesslin/vue3/axios-docs.git
$ cd axios-docs
$ yarn install
```

### 文档打包

- 使用 `build` 指令生成静态站点

  ```sh
  $ npm run build
  ```

- 打包路径： `docs\.vitepress\dist`

### 修改 nginx 配置文件

axios 生成的 html 文件链接不带后缀，所以 nginx 需要做重定向

完整配置如下：

```sh
server
{
    listen 80;
    server_name axios.docs.com;
    root /server/www/docs/axios;

    access_log      off;
    log_not_found   off;

    index index.html;

    location ~ /(zh|en)/docs/.+$
    {
        try_files $uri $uri.html;
    }

    include custom/no_access;
}
```

## vxe-table 官方文档

vxe-table 文档 v4 版本对应 vue3

### 拉取项目

```sh
$ git clone https://e.coding.net/madnesslin/vue3/vxe-table-docs.git
$ cd vxe-table-docs
$ npm install

# 拉取v3 v4版本的依赖
$ npm run build:v3 && npm run build:v4 && npx gulp build_docs
```

> 提示：v1 v2 依赖无法正常下载，v3 依赖必须下载，gulp 为项目级指令只能使用 npx

### 修改 gulpfile.js 文件

由于我们只拉取了 v3 v4 版本的依赖，v1-v2 版本无法正常构建，所以 gulpfile.js 中 v1-v2 相关内容需要移除

修改后的 gulpfile.js 文件内容：

```js
# gulpfile.js 文件修改后的内容：
const gulp = require('gulp');
const del = require('del');
const rename = require('gulp-rename');

gulp.task('move_docs_static', () => {
  return gulp.src(['v4/dist/static/**']).pipe(gulp.dest('v4/dist/v4/static'));
});

gulp.task('move_docs_root', () => {
  return gulp
    .src(['v4/dist/favicon.ico', 'v4/dist/index.html', 'v4/dist/issues.html', 'v4/dist/logo.png'])
    .pipe(gulp.dest('v4/dist/v4'));
});

gulp.task('clear_docs_temp', () => {
  return del(['docs'], { force: true });
});

gulp.task(
  'move_docs_latest',
  gulp.series('clear_docs_temp', () => {
    return gulp.src(['v4/dist/v3/index.html', 'v4/dist/v4/404.html']).pipe(gulp.dest('v4/dist'));
  }),
);

gulp.task('build_v4_docs', gulp.parallel('move_docs_static', 'move_docs_root'));

// gulp.task('copy_v1_docs', () => {
//   return gulp.src('v4/dist/v1/index.html')
//     .pipe(rename({
//       basename: '404'
//     }))
//     .pipe(gulp.dest('v4/dist/v1'))
// })

// gulp.task('copy_v2_docs', () => {
//   return gulp.src('v4/dist/v2/index.html')
//     .pipe(rename({
//       basename: '404'
//     }))
//     .pipe(gulp.dest('v4/dist/v2'))
// })

gulp.task('copy_v3_docs', () => {
  return gulp
    .src('v4/dist/v3/index.html')
    .pipe(
      rename({
        basename: '404',
      }),
    )
    .pipe(gulp.dest('v4/dist/v3'));
});

gulp.task(
  'copy_docs_index',
  // gulp.parallel('copy_v1_docs', 'copy_v2_docs', 'copy_v3_docs', () => {
  gulp.parallel('copy_v3_docs', () => {
    return gulp
      .src('v4/dist/v4/index.html')
      .pipe(
        rename({
          basename: '404',
        }),
      )
      .pipe(gulp.dest('v4/dist/v4'));
  }),
);

gulp.task(
  'build_docs',
  gulp.series('build_v4_docs', 'copy_docs_index', 'move_docs_latest', () => {
    return gulp.src(['v4/dist/**']).pipe(gulp.dest('docs'));
  }),
);
```

### 文档打包

- 使用 `build` 指令生成静态站点

  ```sh
  $ npm run build:v3 && npm run build:v4 && gulp build_docs
  ```

- 打包路径： `v4\dist`

## 配置文件参考

- [局域网本地站点配置](../images/docs/docs-local.nginx)
- [服务器站点配置](../images/docs/docs-server.nginx)
- [本地 hosts 文件](../images/docs/hosts)
