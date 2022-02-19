# 主目录列表
$mainDirList = "mirror"

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


# 脚本所在目录绝对路径
$scriptDirPath = Split-Path -Parent $MyInvocation.MyCommand.Definition

# 进入脚本所在目录
Set-Location $scriptDirPath

# for ($j = 0; $j -lt $mainDirList.Count; $j++) {
# $mainDirPath = $mainDirList[$j]
$mainDirPath = $mainDirList

# 打印内容
Write-Output "=== $mainDirPath ==="
Set-Location $mainDirPath

for ($i = 0; $i -lt $subdirectorys.Count; $i++) {
  $path = $subdirectorys[$i]

  Write-Output "--- $path ---"
  if ($i -ne 0) {
    Set-Location "../$path"
  }
  else {
    Set-Location $path
  }

  # pnpm install
  # pnpm update
  pnpm build
}
Set-Location $scriptDirPath
# }
