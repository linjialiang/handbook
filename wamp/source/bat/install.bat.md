# wamp 安装脚本

路径：C:\wamp\install.bat

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
@ echo.　　           【安装相关系统服务】
@ echo.
@ echo.             =======================
@ echo.
@ echo.             阿帕奇       → 请输入1
@ echo.
@ echo.             MariaDB      → 请输入2
@ echo.
@ echo.             Redis        → 请输入3
@ echo.
@ echo.             组合         → 请输入5
@ echo.
@ echo.             退出         → 请输入0
@ echo.
set /p export=      输入数字按回车：
if /i "%export%"=="1" set HttpdName=httpd
if /i "%export%"=="1" Goto WinHttpd
if /i "%export%"=="2" set MariaDBName=mariadb
if /i "%export%"=="2" Goto WinMariaDB
if /i "%export%"=="3" set RedisName=Redis
if /i "%export%"=="3" Goto WinRedis
if /i "%export%"=="5" set HttpdName=httpd
if /i "%export%"=="5" set MariaDBName=mariadb
if /i "%export%"=="5" set RedisName=Redis
if /i "%export%"=="5" Goto WinGroup
if /i "%export%"=="0" exit
@ echo.
@ echo              选择无效，请重新输入
ping -n 2 127.1>nul
Goto HomeMenu
:WinHttpd
if /i "%PROCESSOR_ARCHITECTURE%"=="amd64" Goto OnHttpd
@ echo.
@ echo              不是64位Windows系统，无法安装...
@ echo.
@ echo              请更换系统!
ping -n 2 127.1>nul
Goto HomeMenu
:WinMariaDB
if /i "%PROCESSOR_ARCHITECTURE%"=="amd64" Goto OnMariaDB
@ echo.
@ echo              不是64位Windows系统，无法安装...
@ echo.
@ echo              请更换系统!
ping -n 2 127.1>nul
Goto HomeMenu
:WinRedis
if /i "%PROCESSOR_ARCHITECTURE%"=="amd64" Goto OnRedis
@ echo.
@ echo              不是64位Windows系统，无法安装...
@ echo.
@ echo              请更换系统!
ping -n 2 127.1>nul
Goto HomeMenu
:WinGroup
if /i "%PROCESSOR_ARCHITECTURE%"=="amd64" Goto OnGroup
@ echo.
@ echo              不是64位Windows系统，无法安装...
@ echo.
@ echo              请更换系统!
ping -n 2 127.1>nul
Goto HomeMenu
:OnHttpd
Cls
@ echo.
@ echo              将%HttpdName%安装到系统服务...
@ %ROOT%
@ cd %WAMPROOT%base\httpd\bin\
@ httpd.exe -k install -n %HttpdName%
ping -n 2 127.1>nul
Cls
@ echo.
@ echo              设为手动启动...
@ sc config %HttpdName% start=demand
@ echo.
@ echo              安装结束！即将返回主界面...
ping -n 2 127.1>nul
Goto HomeMenu
:OnMariaDB
Cls
@ echo.
@ echo              将%MariaDBName%安装到系统服务...
@ %ROOT%
@ cd %WAMPROOT%base\mariadb\bin\
@ mysql_install_db.exe --datadir=%WAMPROOT%web\data --password=123456 --config=%WAMPROOT%base\mariadb\my.ini --service=%MariaDBName%
ping -n 2 127.1>nul
Cls
@ echo.
@ echo              设为手动启动...
@ sc config %MariaDBName% start=demand
@ echo.
@ echo              安装结束！即将返回主界面...
ping -n 2 127.1>nul
Goto HomeMenu
:OnRedis
Cls
@ echo.
@ echo              将%RedisName%安装到系统服务...
@ %ROOT%
@ cd %WAMPROOT%base\Redis\
@ redis-server.exe --service-install redis.windows-service.conf --loglevel verbose
ping -n 2 127.1>nul
Cls
@ echo.
@ echo              设为手动启动...
@ sc config %RedisName% start=demand
@ echo.
@ echo              安装结束！即将返回主界面...
ping -n 2 127.1>nul
Goto HomeMenu
:OnGroup
Cls
@ echo.
@ echo              将%HttpdName%安装到系统服务...
@ %ROOT%
@ cd %WAMPROOT%base\httpd\bin\
@ httpd.exe -k install -n %HttpdName%
ping -n 2 127.1>nul
Cls
@ echo.
@ echo              将%MariaDBName%安装到系统服务...
@ %ROOT%
@ cd %WAMPROOT%base\mariadb\bin\
@ mysql_install_db.exe --datadir=%WAMPROOT%web\data --password=123456 --config=%WAMPROOT%base\mariadb\my.ini --service=%MariaDBName%
ping -n 2 127.1>nul
Cls
@ echo.
@ echo              将%RedisName%安装到系统服务...
@ %ROOT%
@ cd %WAMPROOT%base\Redis\
@ redis-server.exe --service-install redis.windows-service.conf --loglevel verbose
ping -n 2 127.1>nul
Cls
@ echo.
@ echo              设为手动启动...
@ sc config %HttpdName% start=demand
@ sc config %MariaDBName% start=demand
@ sc config %RedisName% start=demand
ping -n 2 127.1>nul
@ echo.
@ echo              安装结束！即将返回主界面...
ping -n 2 127.1>nul
Goto HomeMenu
```
