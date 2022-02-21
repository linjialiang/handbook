# 子目录列表
$subdirectorys =
"vxe-table-docs",
"vue3-router",
"vue3-doc",
"vitepress",
"vite-docs-cn",
"pure-admin-doc",
"pinia",
"element-plus",
"vue-devtools",
"axios-docs"

# 脚本所在目录
$dirParent = Split-Path -Parent $MyInvocation.MyCommand.Definition

Set-Location $dirParent
for ($i = 0; $i -lt $subdirectorys.Count; $i++) {
  $path = $subdirectorys[$i]
  Write-Output "===== $path ====="
  if ($i -ne 0) {
    Set-Location "../$path"
  }
  else {
    Set-Location $path
  }
  git pull
}
Set-Location ../
