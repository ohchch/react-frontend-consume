@echo off

REM 获取当前脚本的目录
set SCRIPT_DIR=%~dp0

REM 启动后端服务
echo 启动后端服务...
start cmd /k "cd /d %SCRIPT_DIR%\..\react-frontend-consume && mvnw spring-boot:run"

REM 启动前端服务
echo 启动前端服务...
cd /d %SCRIPT_DIR%
npm start
