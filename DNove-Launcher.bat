@echo off
setlocal enabledelayedexpansion
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

if defined FOUND_EXE (
  echo [OK] 找到 DNove：
  echo      %FOUND_EXE%
  echo.
  start "DNove" "%FOUND_EXE%"
  exit /b 0
)

echo [提示] 未找到 DNove 主程序 %EXE_NAME%。
echo.
echo 你可以执行以下步骤：
echo  1. 先安装发行包中的安装程序（如 DNove_*.msi 或 *.exe）
echo  2. 或把此启动器与 DNove.exe 放在同一个目录下
echo.
pause
exit /b 1
