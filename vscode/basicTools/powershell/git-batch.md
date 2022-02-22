# Git 项目批量操作

windows 下使用 powershell 脚本实现 Git 项目批量操作

::: tip 版本要求
建议 powershell 版本 `>=7.x`
:::

## 场景一

网上有 12 个开源文档仓库，要实现本地镜像拷贝，并且需要更换主题，具体操作原理如下：

1. 12 个开源文档仓库，已经拉取到本地，要求在构建镜像文档时获取到的数据是最新的
2. 本地已经建好 12 个对应的文档仓库镜像，主题已经修改，要求在构建静态文档时，能获取到最新的数据
3. 开源文档仓库的 docs 目录为开源文档源码全部内容
4. 文档镜像仓库的 docs 目录也是文档源码全部内容，所以只要「开源文档仓库的 docs 目录」内容覆盖进来就可保持数据最新
5. 文档镜像仓库需要通过 pnpm 工具构建成静态站点文件，存放在 dist 目录
6. 将 12 个镜像文档构建成功的静态站点文件，依次拷贝到 site 目录下
7. 对 12 个本地镜像仓库做 git 提交
8. 对 site 静态站点仓库做 git 提交

> 具体操作流程如下：

::: details 涉及项目数据保持与远程仓库同步，代码段：
<<< @/public/ps1/git-batch/wangdocs/01-pull.powershell
:::

::: details 删除本地仓库中会被覆盖的文件和目录，代码段：
<<< @/public/ps1/git-batch/wangdocs/02-delete.powershell
:::

::: details 拷贝网上开源文档仓库数据到镜像文档仓库，代码段：
<<< @/public/ps1/git-batch/wangdocs/03-copy.powershell
:::

::: details 在镜像文档仓库中构建站点静态文件，代码段：
<<< @/public/ps1/git-batch/wangdocs/04-build.powershell
:::

::: details 将构建好的站点静态文件移动到站点仓库中，代码段：
<<< @/public/ps1/git-batch/wangdocs/05-site.powershell
:::

::: tip 服务器站点配置文件
::: details

```nginx
server
{
    listen 80;
    server_name wangdocs.e8so.com;
    root /server/www/wangdocs;
    index index.html;
    if ($request_method !~* GET|POST)
    {
        return 403;
    }
    access_log      off;
    log_not_found   off;
    include custom/cache;
    include custom/cache_html;
    include custom/no_access;
}
```

:::

::: tip 局域网站点配置文件
::: details

```nginx
server
{
    listen 80;
    server_name wangdocs.com;
    root /server/www/wangdocs;
    index index.html;
}
```

:::

## 场景二

对 10 个不同类型的开源文档仓库，进行静态站点本地构建，具体操作原理如下：

1. 10 个开源文档仓库，拉取到本地，要求在构建镜像文档时获取到的数据是最新的
2. 1 个本地静态站点包，拉取到本地
3. 每个开源文档仓库的构建方式不同，需要挨个判断
4. 将 10 个文档构建成功的静态站点文件，依次拷贝到 site 目录下
5. 对 site 静态站点仓库做 git 提交

> 具体操作流程如下：

::: details 涉及项目拉取，代码段：
<<< @/public/ps1/git-batch/docs/01-clone.powershell
:::

::: details 删除地静态站点包仓库中会被覆盖的文件和目录，代码段：
<<< @/public/ps1/git-batch/docs/02-delete.powershell
:::

::: details 构建开源文档，代码段：
<<< @/public/ps1/git-batch/docs/03-build.powershell
:::

::: details 本地保持跟远程仓库同步，代码段：
<<< @/public/ps1/git-batch/docs/00-pull.powershell
:::

::: tip 服务器站点配置文件
::: details
<<< @/public/nginx/docs-server.nginx
:::

::: tip 局域网站点配置文件
::: details
<<< @/public/nginx/docs-local.nginx
:::

-   vxe-table-docs 修改

    ::: details packages.json 增加两条执行脚本：

    ```json
    {
        "scripts": {
            "build:a2": "npm run build:v3 && npm run build:v4 && gulp build_docs_a2",
            "deploy:a2": "npm run update:v3 && npm run update:v4 && npm run build:a2"
        }
    }
    ```

    :::

    ::: details gulpfile.js 增加两个方法：

    ```js
    gulp.task(
        "copy_docs_index_a2",
        gulp.parallel("copy_v3_docs", () => {
            return gulp
                .src("v4/dist/v4/index.html")
                .pipe(
                    rename({
                        basename: "404",
                    })
                )
                .pipe(gulp.dest("v4/dist/v4"));
        })
    );

    gulp.task(
        "build_docs_a2",
        gulp.series(
            "build_v4_docs",
            "copy_docs_index_a2",
            "move_docs_latest",
            () => {
                return gulp.src(["v4/dist/**"]).pipe(gulp.dest("docs"));
            }
        )
    );
    ```

    :::

## 附录：qydocs 站点配置

::: tip 服务器站点配置文件
::: details

```nginx
server
{
    listen 80;
    server_name qydocs.e8so.com;
    root /server/www/qydocs;
    index index.html;
    if ($request_method !~* GET|POST)
    {
        return 403;
    }
    access_log      off;
    log_not_found   off;
    include custom/cache;
    include custom/cache_html;
    include custom/no_access;
}
```

:::

::: tip 局域网站点配置文件
::: details

```nginx
server
{
    listen 80;
    server_name qydocs.com;
    root /server/www/qydocs;
    index index.html;
}
```

:::
