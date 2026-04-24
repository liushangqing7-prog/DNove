@echo off
setlocal
chcp 65001 >nul

title DNove 启动器

echo ==========================================
echo              DNove 启动器
echo ==========================================

set "EXE_NAME=DNove.exe"
set "FOUND_EXE="

set "CANDIDATE_1=%~dp0%EXE_NAME%"
set "CANDIDATE_2=%LOCALAPPDATA%\Programs\DNove\%EXE_NAME%"
set "CANDIDATE_3=%ProgramFiles%\DNove\%EXE_NAME%"
set "CANDIDATE_4=%ProgramFiles(x86)%\DNove\%EXE_NAME%"

if exist "%CANDIDATE_1%" set "FOUND_EXE=%CANDIDATE_1%"
if not defined FOUND_EXE if exist "%CANDIDATE_2%" set "FOUND_EXE=%CANDIDATE_2%"
if not defined FOUND_EXE if exist "%CANDIDATE_3%" set "FOUND_EXE=%CANDIDATE_3%"
if not defined FOUND_EXE if exist "%CANDIDATE_4%" set "FOUND_EXE=%CANDIDATE_4%"

if defined FOUND_EXE goto run

echo [提示] 未自动找到 DNove 主程序 %EXE_NAME%。
echo.
echo 你可以直接输入 EXE 完整路径，或输入包含 EXE 的文件夹路径。
echo 例如：
echo   C:\Users\你的用户名\Desktop\DNove.exe
echo   C:\Users\你的用户名\Desktop
set /p USER_PATH=请输入路径后按回车（直接回车可退出）：

if "%USER_PATH%"=="" (
  echo 已取消。
  pause
  exit /b 1
)

if exist "%USER_PATH%\%EXE_NAME%" (
  set "FOUND_EXE=%USER_PATH%\%EXE_NAME%"
  goto run
)

if exist "%USER_PATH%" (
  for %%I in ("%USER_PATH%") do (
    if /I "%%~xI"==".exe" set "FOUND_EXE=%%~fI"
  )
)

if not defined FOUND_EXE (
  echo.
  echo [错误] 路径无效，或未找到 %EXE_NAME%。
  echo 请确认路径正确后重试。
  pause
  exit /b 1
)

:run
echo [OK] 启动 DNove：
echo      %FOUND_EXE%
echo.
start "DNove" "%FOUND_EXE%"
exit /b 0
