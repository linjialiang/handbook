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
<<< @/public/ps1/git-batch/01-pull.powershell
:::

::: details 删除本地仓库中会被覆盖的文件和目录，代码段：
<<< @/public/ps1/git-batch/02-delete.powershell
:::

::: details 拷贝网上开源文档仓库数据到镜像文档仓库，代码段：
<<< @/public/ps1/git-batch/03-copy.powershell
:::

::: details 在镜像文档仓库中构建站点静态文件，代码段：
<<< @/public/ps1/git-batch/04-build.powershell
:::

::: details 将构建好的站点静态文件移动到站点仓库中，代码段：
<<< @/public/ps1/git-batch/05-site.powershell
:::
