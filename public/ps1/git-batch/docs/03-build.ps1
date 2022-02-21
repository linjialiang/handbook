# 子目录列表
$subdirectorys =
"vite-docs-cn",
"vue3-doc",
"vue3-router",
"pinia",
"vue-devtools",
"vitepress",
"axios-docs",
"pure-admin-doc",
"element-plus",
"vxe-table-docs"

# 站点根目录
$siteDir = "site"

# 脚本所在目录
$dirParent = Split-Path -Parent $MyInvocation.MyCommand.Definition
# 为静态站点仓库拉去最新数据
Set-Location $dirParent
Set-Location $siteDir
git pull

for ($i = 0; $i -lt $subdirectorys.Count; $i++) {
  $path = $subdirectorys[$i]
  Set-Location $dirParent
  Write-Output "===== $path ====="
  Set-Location $path
  git pull

  if ($path -eq "vite-docs-cn") {
    yarn install
    yarn build
    Set-Location ".vitepress"
    Rename-Item -Path "dist" $path
  }
  elseif ($path -eq "vue3-doc") {
    pnpm install
    pnpm build
    Set-Location ".vitepress"
    # 为目录 public 重命名
    Rename-Item -Path "dist" $path
  }
  elseif ($path -eq "vue3-router") {
    yarn install
    yarn docs:build
    Set-Location "docs\.vitepress"
    # 为目录 public 重命名
    Rename-Item -Path "dist" $path
  }
  elseif ($path -eq "pinia") {
    yarn install
    # 首次使用 docs:build 前需要先使用一次 test
    yarn docs:build
    yarn docs:api
    Set-Location "docs\.vitepress"
    Rename-Item -Path "dist" $path
  }
  elseif ($path -eq "vue-devtools") {
    yarn install
    yarn docs:build
    Set-Location "docs\.vitepress"
    Rename-Item -Path "dist" $path
  }
  elseif ($path -eq "vitepress") {
    pnpm install
    pnpm docs-build
    Set-Location ".vitepress"
    Rename-Item -Path "dist" $path
  }
  elseif ($path -eq "axios-docs") {
    yarn install
    yarn build
    # 为目录 public 重命名
    Rename-Item -Path "public" $path
  }
  elseif ($path -eq "pure-admin-doc") {
    pnpm install
    pnpm build
    Set-Location "docs\.vuepress"
    Rename-Item -Path "dist" $path
  }
  elseif ($path -eq "element-plus") {
    pnpm install
    # 首次使用 docs:build 前需要先使用一次 docs:dev
    pnpm docs:build
    Set-Location "docs\.vitepress"
    Rename-Item -Path "dist" $path
  }
  elseif ($path -eq "vxe-table-docs") {
    yarn install
    yarn build:v3
    yarn build:v4
    gulp build_docs
    Set-Location "docs\.vitepress"
    Rename-Item -Path "dist" $path
  }
  else{
    continue
  }

  # 拷贝目录
  Move-Item -Path $path -Destination "$dirParent\$siteDir" -PassThru
}
Set-Location $dirParent
Set-Location $siteDir

git add .
git commit -m 'update'
git push gitee-linjialiang
git push coding-linjialiang