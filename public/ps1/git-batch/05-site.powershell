# 主目录列表
$mainDirList = "mirror"

# 静态站点根目录
$siteDir = "site"

# 子目录列表
$subdirectorys =
"bash-tutorial",
"clang-tutorial",
"css-tutorial",
"es6-tutorial",
"git-tutorial",
"html-tutorial",
"javascript-tutorial",
"node-tutorial",
"react-tutorial",
"ssh-tutorial",
"webapi-tutorial",
"typescript-tutorial"

# 与子目录对应的静态站点目录
$siteSubdirectorys =
"bash",
"clang",
"css",
"es6",
"git",
"html",
"javascript",
"node",
"react",
"ssh",
"webapi",
"typescript"

# 脚本所在目录绝对路径
$scriptDirPath = Split-Path -Parent $MyInvocation.MyCommand.Definition

# 进入脚本所在目录
Set-Location $scriptDirPath

# 新建站点根目录
New-Item -Path $siteDir -ItemType Directory

# 进入 mirror 目录
Set-Location $mainDirList

for ($i = 0; $i -lt $subdirectorys.Count; $i++) {
  $path = $subdirectorys[$i]
  $siteSubDir = $siteSubdirectorys[$i]
  Write-Output "=== $path ==="
  Write-Output "=== $siteSubDir ==="
  if ($i -ne 0) {
    Set-Location "../$path"
  }
  else {
    Set-Location $path
  }

  # 为目录 dist 重命名
  Rename-Item -Path "dist" $siteSubDir
  # 拷贝目录
  Move-Item -Path $siteSubDir -Destination "../../site" -PassThru
}

Set-Location $scriptDirPath
Set-Location $siteDir

# git commit
git add .
git commit -m 'update'
git push gitee-linjialiang
git push coding-linjialiang

Set-Location $scriptDirPath
