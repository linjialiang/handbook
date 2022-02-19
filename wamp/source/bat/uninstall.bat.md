# wamp 卸载脚本

路径：C:\wamp\uninstall.bat

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
set ROOT=%~d0
set WAMPROOT=%~dp0
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
if /i "%export%"=="1" set HttpdName=httpd
if /i "%export%"=="1" Goto OnHttpd
if /i "%export%"=="2" set MariaDBName=mariadb
if /i "%export%"=="2" Goto OnMariaDB
if /i "%export%"=="3" set RedisName=Redis
if /i "%export%"=="3" Goto OnRedis
if /i "%export%"=="5" set HttpdName=httpd
if /i "%export%"=="5" set MariaDBName=mariadb
if /i "%export%"=="5" set RedisName=Redis
if /i "%export%"=="5" Goto OnGroup
if /i "%export%"=="0" exit
@ echo.
@ echo              选择无效，请重新输入
ping -n 2 127.1>nul
Goto HomeMenu
:OnHttpd
Cls
@ echo.
@ echo              将%HttpdName%从系统服务卸载...
@ %ROOT%
@ cd %WAMPROOT%base\httpd\bin\
@ net stop %HttpdName%
@ httpd.exe -k uninstall -n %HttpdName%
@ echo.
@ echo              卸载结束！即将进入返回主界面...
ping -n 2 127.1>nul
Goto HomeMenu
:OnMariaDB
Cls
@ echo.
@ echo              将%MariaDBName%从系统服务卸载...
@ %ROOT%
@ cd %WAMPROOT%base\mariadb\bin\
@ net stop %MariaDBName%
@ mysqld.exe --remove %MariaDBName% --defaults-file=%WAMPROOT%base\mariadb\my.ini
@ echo.
@ echo              卸载结束！即将进入返回主界面...
ping -n 2 127.1>nul
Goto HomeMenu
:OnRedis
Cls
@ echo.
@ echo              将%RedisName%从系统服务卸载...
@ %ROOT%
@ cd %WAMPROOT%base\Redis\
@ net stop %RedisName%
@ redis-server.exe --service-uninstall
@ echo.
@ echo              卸载结束！即将进入返回主界面...
ping -n 2 127.1>nul
Goto HomeMenu
:OnGroup
Cls
@ echo.
@ echo              将%HttpdName%从系统服务卸载...
@ %ROOT%
@ cd %WAMPROOT%base\httpd\bin\
@ net stop %HttpdName%
@ httpd.exe -k uninstall -n %HttpdName%
ping -n 2 127.1>nul
Cls
@ echo.
@ echo              将%MariaDBName%从系统服务卸载...
@ %ROOT%
@ cd %WAMPROOT%base\mariadb\bin\
@ net stop %MariaDBName%
@ mysqld.exe --remove %MariaDBName% --defaults-file=%WAMPROOT%base\mariadb\my.ini
ping -n 2 127.1>nul
Cls
@ echo.
@ echo              将%RedisName%从系统服务卸载...
@ %ROOT%
@ cd %WAMPROOT%base\Redis\
@ net stop %RedisName%
@ redis-server --service-uninstall
@ echo.
@ echo              卸载结束！即将进入返回主界面...
ping -n 2 127.1>nul
Goto HomeMenu
```
