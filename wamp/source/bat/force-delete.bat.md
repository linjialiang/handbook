# wamp 强删脚本

路径：C:\wamp\force-delete.bat

```bat
@echo off
mode con cols=120 lines=40
>NUL 2>&1 REG.exe query "HKU\S-1-5-19" || (
    ECHO SET UAC = CreateObject^("Shell.Application"^) > "%TEMP%\Getadmin.vbs"
    ECHO UAC.ShellExecute "%~f0", "%1", "", "runas", 1 >> "%TEMP%\Getadmin.vbs"
    "%TEMP%\Getadmin.vbs"
    DEL /f /q "%TEMP%\Getadmin.vbs" 2>NUL
    Exit /b
)
:HomeMenu
Cls
@ echo.
@ echo.　　           【卸载相关系统服务】
@ echo.
@ echo.             =======================
@ echo.
@ echo.             阿帕奇       → 请输入1
@ echo.
@ echo.             mariadb      → 请输入2
@ echo.
@ echo.             Redis        → 请输入3
@ echo.
@ echo.             组合         → 请输入5
@ echo.
@ echo.             退出         → 请输入0
@ echo.
set /p export=      输入数字按回车：
if /i "%export%"=="1" set ServiceName=httpd
if /i "%export%"=="1" Goto Uninstall
if /i "%export%"=="2" set ServiceName=mariadb
if /i "%export%"=="2" Goto Uninstall
if /i "%export%"=="3" set ServiceName=Redis
if /i "%export%"=="3" Goto Uninstall
if /i "%export%"=="5" Goto Group
if /i "%export%"=="0" exit
@ echo.
@ echo              选择无效，请重新输入
ping -n 2 127.1>nul
Goto HomeMenu
:Uninstall
Cls
@ echo.
@ echo              强删%ServiceName%中...
sc delete %ServiceName%
@ echo              强删成功！即将进入主菜单...
ping -n 2 127.1>nul
Goto HomeMenu
:Group
Cls
@ set ServiceName=httpd
@ echo.
@ echo              强删%ServiceName%中...
sc delete %ServiceName%
@ echo              强删成功！即将进入主菜单...
ping -n 2 127.1>nul
Cls
@ set ServiceName=mariadb
@ echo.
@ echo              强删%ServiceName%中...
sc delete %ServiceName%
ping -n 2 127.1>nul
@ echo              强删成功！即将进入主菜单...
ping -n 2 127.1>nul
Cls
@ set ServiceName=Redis
@ echo.
@ echo              强删%ServiceName%中...
sc delete %ServiceName%
ping -n 2 127.1>nul
@ echo              强删成功！即将进入主菜单...
ping -n 2 127.1>nul
Goto HomeMenu
```
