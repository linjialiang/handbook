# 实用 Git

## 记住 Git 帐号密码

下面指令会在用户目录下生成文件，该文件用于记录 Git 用户名和密码

```sh
# 全局-针对当前用户
$ git config --global credential.helper store

# 当前项目
$ git config --local credential.helper store
```

如果 Git 用户名和密码有变动，需要使用下面的指令，然后重新输入

```sh
# 全局
$ git config --global --unset credential.helper -f

# 当前项目
$ git config --local --unset credential.helper -f
```
