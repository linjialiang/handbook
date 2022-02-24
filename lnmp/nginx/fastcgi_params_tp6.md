# tp6 的 fastcgi_params 配置

fastcgi_params_tp6 在 nginx 的默认 fastcgi_params 基础上做了一些添加

路径 : `/server/nginx/conf/custom/fastcgi_params_tp6`

```ini
# 如果URI以斜线结尾，文件名将追加到URI后面，这个值将存储在变量 $fastcgi_script_name 中
# 根据文件名转发，则不需要配置 fastcgi_index
# fastcgi_index   index.php;

# 据说 ThinkPHP 和 Laravel 部分功能依赖于 path_info
fastcgi_param   PATH_INFO           $fastcgi_path_info;

# 当前执行程序的绝对路径 + 文件名
fastcgi_param   SCRIPT_FILENAME     $realpath_root$fastcgi_script_name;

# 当前执行程序的绝对路径 + path_info
fastcgi_param   PATH_TRANSLATED     $realpath_root$fastcgi_path_info;

# 其它参数由 nginx 自带的 fastcgi_params 文件导入
include         fastcgi_params;
```
