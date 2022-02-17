# vscode 快捷键

简单来讲，vscode 快捷键有三类：

## 内置快捷键

`内置快捷键` 指 vscode 本身自带的键盘映射

我这里依照 vscode 官方最新的 [键盘映射手册](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf) 对应翻译了 [键盘映射手册-中文版](../images/quick/keyboard-shortcuts-cn.pdf)，下面是预览内容：

![键盘映射手册-中文版](../images/quick/keyboard-shortcuts-cn.png)

## 自定义快捷键

vscode 允许用户按自己习惯自由映射快捷键，快捷键自定义快捷键案例：

### 配置文件

- 工作区路径: `.vscode/keybindings.json`
- 用户路径: `%homepath%/AppData/Roaming/Code/User/keybindings.json`
- 文件内容：[keybindings.json](../images/quick/keybindings.json)

> 警告：最终的 json 文件是没有注释信息的，记得删除注释

### 快捷键说明

|    指令依赖     |       快捷键        | 说明                                 |
| :-------------: | :-----------------: | :----------------------------------- |
|  内置指令映射   |    ctrl+k ctrl+,    | 激活侧边栏的资源管理器并快速定位文件 |
|  内置指令映射   | ctrl+k ctrl+shift+, | 折叠资源管理器文件夹                 |
|  内置指令映射   |    ctrl+shift+/     | 合并行                               |
| project-manager |  ctrl+shift+alt+p   | 项目从新窗口打开                     |
|  Better Align   |    ctrl+k ctrl+=    | 等号对齐                             |
|  Partial Diff   |   ctrl+k shift+d    | 选中内容 1                           |
|  Partial Diff   | ctrl+k shift+alt+d  | 选中内容 2 并与内容 1 比较           |

> 提示：如果对应的扩展未安装，请手动删除快捷键绑定

## 插件快捷键

vscode 有大量优秀的插件，有些插件会对常用指令做键盘映射

还有一些插件本身就是专门用来做键盘映射的，比如专门针对：`Vim` `Sublime` `Atom` 等编辑器习惯写的键盘映射插件

关于这部分内容，个人认为并非特别重要，暂不详讲
