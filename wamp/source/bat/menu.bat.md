# wamp 管理菜单

路径：C:\wamp\menu.bat

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
@ echo.　　           【选择系统服务】
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
@ echo.             配置测试     → 请输入6
@ echo.
@ echo.             退出         → 请输入0
@ echo.
set /p export=      输入数字按回车：
if /i "%export%"=="1" set ServiceName=httpd
if /i "%export%"=="1" Goto SelectMenu
if /i "%export%"=="2" set ServiceName=mariadb
if /i "%export%"=="2" Goto SelectMenu
if /i "%export%"=="3" set ServiceName=Redis
if /i "%export%"=="3" Goto SelectMenu
if /i "%export%"=="5" set HttpdName=httpd
if /i "%export%"=="5" set MariaDBName=mariadb
if /i "%export%"=="5" set RedisName=Redis
if /i "%export%"=="5" Goto GroupSelectMenu
if /i "%export%"=="6" Goto TestHttpd
if /i "%export%"=="0" exit
@ echo.
@ echo              选择无效，请重新输入
ping -n 2 127.1>nul
Goto HomeMenu
:SelectMenu
Cls
@ echo.
@ echo.　　           【服务操作选项】
@ echo.
@ echo.             开启服务 → 请输入1
@ echo.
@ echo.             关闭服务 → 请输入2
@ echo.
@ echo.             重启服务 → 请输入3
@ echo.
@ echo.             开机服务 → 请输入4
@ echo.
@ echo.             回主菜单 → 请输入5
@ echo.
@ echo.             退    出 → 请输入0
@ echo.
set /p export=      输入数字按回车：
if /i "%export%"=="1" Goto StartService
if /i "%export%"=="2" Goto StopService
if /i "%export%"=="3" Goto RestartService
if /i "%export%"=="4" Goto SetService
if /i "%export%"=="5" Goto HomeMenu
if /i "%export%"=="0" exit
@ echo.
@ echo              选择无效，请重新输入
ping -n 2 127.1>nul
Goto SelectMenu
:TestHttpd
Cls
@ echo.
@ echo.             测试httpd配置文件中...
set ROOT=%~d0
set WAMPROOT=%~dp0
@ %ROOT%
@ cd %WAMPROOT%base\httpd\bin\
@ httpd.exe -t
@ echo.
@ echo.　　            【服务操作选项】
@ echo.
@ echo.             回主菜单       → 请输入1
@ echo.
@ echo.             退    出       → 请输入0
@ echo.
set /p export=      输入数字按回车：
if /i "%export%"=="1" Goto HomeMenu
if /i "%export%"=="0" exit
@ echo.
@ echo              选择无效，请重新输入
ping -n 2 127.1>nul
Goto HomeMenu
:StartService
Cls
@ echo.
@ echo.             开启%ServiceName%中...
net start %ServiceName%
ping -n 2 127.1>nul
Goto HomeMenu
:StopService
Cls
@ echo.
@ echo.             关闭%ServiceName%中...
net stop %ServiceName%
ping -n 2 127.1>nul
Goto HomeMenu
:RestartService
Cls
@ echo.
@ echo.             重启%ServiceName%中...
net stop %ServiceName%
net start %ServiceName%
ping -n 2 127.1>nul
Goto HomeMenu
:SetService
Cls
@ echo.
@ echo.　　         【开机服务选项】
@ echo.
@ echo.         自    动 → 请输入1
@ echo.
@ echo.         手    动 → 请输入2
@ echo.
@ echo.         禁    用 → 请输入3
@ echo.
@ echo.         返    回 → 请输入4
@ echo.
@ echo.         回主菜单 → 请输入5
@ echo.
@ echo.         退出脚本 → 请输入0
@ echo.
set /p export=      输入数字按回车：
if /i "%export%"=="1" set SetValue=auto
if /i "%export%"=="1" Goto RetuenSetService
if /i "%export%"=="2" set SetValue=demand
if /i "%export%"=="2" Goto RetuenSetService
if /i "%export%"=="3" set SetValue=disabled
if /i "%export%"=="3" Goto RetuenSetService
if /i "%export%"=="4" Goto SelectMenu
if /i "%export%"=="5" Goto HomeMenu
if /i "%export%"=="0" exit
@ echo.
@ echo              选择无效，请重新输入...
ping -n 2 127.1>nul
Goto SetService
:RetuenSetService
Cls
@ echo.
@ echo.             设置%ServiceName%为%SetValue%...
sc config %ServiceName% start=%SetValue%
ping -n 2 127.1>nul
Goto SelectMenu
:GroupSelectMenu
Cls
@ echo.
@ echo.　　           【服务操作选项】
@ echo.
@ echo.             开启服务 → 请输入1
@ echo.
@ echo.             关闭服务 → 请输入2
@ echo.
@ echo.             重启服务 → 请输入3
@ echo.
@ echo.             开机服务 → 请输入4
@ echo.
@ echo.             回主菜单 → 请输入5
@ echo.
@ echo.             退    出 → 请输入0
@ echo.
set /p export=      输入数字按回车：
if /i "%export%"=="1" Goto GroupStartService
if /i "%export%"=="2" Goto GroupStopService
if /i "%export%"=="3" Goto GroupRestartService
if /i "%export%"=="4" Goto GroupSetService
if /i "%export%"=="5" Goto HomeMenu
if /i "%export%"=="0" exit
@ echo.
@ echo              选择无效，请重新输入
ping -n 2 127.1>nul
Goto GroupSelectMenu
:GroupStartService
Cls
@ echo.
@ echo.             开启%HttpdName%中...
net start %HttpdName%
ping -n 2 127.1>nul
Cls
@ echo.
@ echo.             开启%MariaDBName%中...
net start %MariaDBName%
ping -n 2 127.1>nul
Cls
@ echo.
@ echo.             开启%RedisName%中...
net start %RedisName%
ping -n 2 127.1>nul
Goto HomeMenu
:GroupStopService
Cls
@ echo.
@ echo.             关闭%HttpdName%中...
net stop %HttpdName%
ping -n 2 127.1>nul
Cls
@ echo.
@ echo.             关闭%MariaDBName%中...
net stop %MariaDBName%
ping -n 2 127.1>nul
Cls
@ echo.
@ echo.             关闭%RedisName%中...
net stop %RedisName%
ping -n 2 127.1>nul
Goto HomeMenu
:GroupRestartService
Cls
@ echo.
@ echo.             重启%HttpdName%中...
net stop %HttpdName%
net start %HttpdName%
ping -n 2 127.1>nul
Cls
@ echo.
@ echo.             重启%MariaDBName%中...
net stop %MariaDBName%
net start %MariaDBName%
ping -n 2 127.1>nul
Cls
@ echo.
@ echo.             重启%RedisName%中...
net stop %RedisName%
net start %RedisName%
ping -n 2 127.1>nul
Goto HomeMenu
:GroupSetService
Cls
@ echo.
@ echo.　　         【开机服务选项】
@ echo.
@ echo.         自    动 → 请输入1
@ echo.
@ echo.         手    动 → 请输入2
@ echo.
@ echo.         禁    用 → 请输入3
@ echo.
@ echo.         返    回 → 请输入4
@ echo.
@ echo.         回主菜单 → 请输入5
@ echo.
@ echo.         退出脚本 → 请输入0
@ echo.
set /p export=      输入数字按回车：
if /i "%export%"=="1" set SetValue=auto
if /i "%export%"=="1" Goto GroupRetuenSetService
if /i "%export%"=="2" set SetValue=demand
if /i "%export%"=="2" Goto GroupRetuenSetService
if /i "%export%"=="3" set SetValue=disabled
if /i "%export%"=="3" Goto GroupRetuenSetService
if /i "%export%"=="4" Goto GroupSelectMenu
if /i "%export%"=="5" Goto HomeMenu
if /i "%export%"=="0" exit
@ echo.
@ echo              选择无效，请重新输入...
ping -n 2 127.1>nul
Goto GroupSetService
:GroupRetuenSetService
Cls
@ echo.
@ echo.             设置%HttpdName%为%SetValue%...
sc config %HttpdName% start=%SetValue%
ping -n 2 127.1>nul
Cls
@ echo.
@ echo.             设置%MariaDBName%为%SetValue%...
sc config %MariaDBName% start=%SetValue%
ping -n 2 127.1>nulCls
@ echo.
@ echo.             设置%RedisName%为%SetValue%...
sc config %RedisName% start=%SetValue%
ping -n 2 127.1>nul
Goto GroupSelectMenu
```
