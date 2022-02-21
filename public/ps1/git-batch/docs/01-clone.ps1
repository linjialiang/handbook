# 脚本所在目录绝对路径
$scriptDirPath = Split-Path -Parent $MyInvocation.MyCommand.Definition

# 进入脚本所在目录
Set-Location $scriptDirPath

# 拉取同步仓库
git clone https://e.coding.net/madnesslin/vue3/vite-docs-cn.git
git clone https://e.coding.net/madnesslin/vue3/docs-zh-cn.git vue3-doc
git clone https://e.coding.net/madnesslin/vue3/router.git vue3-router
git clone https://e.coding.net/madnesslin/vue3/pinia.git
git clone https://e.coding.net/madnesslin/vue3/devtools.git vue-devtools
git clone https://e.coding.net/madnesslin/vue3/vitepress.git
git clone https://e.coding.net/madnesslin/vue3/axios.git
git clone https://e.coding.net/madnesslin/vue3/vxe-table-docs.git
git clone https://e.coding.net/madnesslin/pure-admin/element-plus.git
git clone https://e.coding.net/madnesslin/pure-admin/pure-admin-doc.git
# 拉取站点参考
git clone https://gitee.com/linjialiang/docs.git site
Set-Location site
git remote rename origin gitee-linjialiang
git remote add coding-linjialiang https://e.coding.net/madnesslin/tutorial/docs.git
