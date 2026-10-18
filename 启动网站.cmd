@echo off
chcp 65001 >nul
cd /d "%~dp0"
node --version >nul 2>&1
if errorlevel 1 (
  echo 未检测到 Node.js，请先安装 Node.js 后再试。
  pause
  exit /b 1
)
npm start
if errorlevel 1 pause
