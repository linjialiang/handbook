# 主目录列表
$mainDirList = "mirror", "source"

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

# 将 source 子目录下的 docs 依次拷贝到 mirrors 对应的子目录下
for ($n = 0; $n -lt $subdirectorys.Count; $n++) {
  $sourcePath = "$scriptDirPath/" + $mainDirList[1] + "/" + $subdirectorys[$n]
  $mirrorPath = "$scriptDirPath/" + $mainDirList[0] + "/" + $subdirectorys[$n]

  Write-Output "--- 拷贝 " + $subdirectorys[$n] + " ---"
  Write-Output "--- $sourcePath ---"
  Write-Output "--- $mirrorPath ---"
  Copy-Item -Path "$sourcePath/docs" -Destination $mirrorPath -Recurse -Force -Passthru
}

# git commit
Write-Output "=== git commit ==="
Set-Location $scriptDirPath + "/" + $mainDirList['0']
for ($i = 0; $i -lt $subdirectorys.Count; $i++) {
  $path = $subdirectorys[$i]
  if ($i -ne 0) {
    Set-Location "../$path"
  }
  else {
    Set-Location $path
  }
  git add .
  git commit -m 'update'
  git push gitee-linjialiang
  git push coding-linjialiang
}

Set-Location $scriptDirPath
