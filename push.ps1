# 脚本所在目录
$dirParent = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $dirParent

git add .
git commit -m 'update'
git push
git push coding-linjialiang
git push --tags
git push --tags coding-linjialiang
