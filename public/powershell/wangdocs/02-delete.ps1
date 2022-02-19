#region 关键代码：强迫以管理员权限运行
$currentWi = [Security.Principal.WindowsIdentity]::GetCurrent()
$currentWp = [Security.Principal.WindowsPrincipal]$currentWi

if ( -not $currentWp.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
  $boundPara = ($MyInvocation.BoundParameters.Keys | ForEach-Object {
      '-{0} {1}' -f $_ , $MyInvocation.BoundParameters[$_] } ) -join ' '
  $currentFile = (Resolve-Path  $MyInvocation.InvocationName).Path

  $fullPara = $boundPara + ' ' + $args -join ' '
  Start-Process pwsh -ArgumentList "$currentFile $fullPara" -verb runas
  return
}
#endregion

#region 测试脚本片段
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

# 要移除的目录列表
# $removeDirList = "node_modules", "docs", "dist"
$removeDirList = "docs", "dist"

# 脚本所在目录绝对路径
$scriptDirPath = Split-Path -Parent $MyInvocation.MyCommand.Definition

# 进入脚本所在目录
Set-Location $scriptDirPath

# 进入站点目录
Set-Location $siteDir

for ($x = 0; $x -lt $siteSubdirectorys.Count; $x++) {
  Remove-Item "./" + $siteSubdirectorys[$x] -force -recurse
}

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

  for ($p = 0; $p -lt $removeDirList.Count; $p++) {
    $removeDir = $removeDirList[$p]
    if ($path -ne "typescript-tutorial") {
      Remove-Item "./$removeDir" -force -recurse
    }
    else {
      if ($removeDir -ne "docs") {
        Remove-Item "./$removeDir" -force -recurse
      }
    }
  }
}
Set-Location $scriptDirPath
# }

($args -join ' ')
Write-Host  '执行完毕,按回车键退出...'
Read-Host
#endregion
