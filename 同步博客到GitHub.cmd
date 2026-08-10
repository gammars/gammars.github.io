@echo off
setlocal
title Sync Blog to GitHub

"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\sync-blog.ps1" %*
set "SYNC_EXIT_CODE=%ERRORLEVEL%"

echo.
if "%SYNC_EXIT_CODE%"=="0" (
  echo Blog sync completed.
) else (
  echo Sync failed. See the error message above.
)
echo.
if /I "%~1"=="-CheckOnly" goto finish
pause
:finish
endlocal ^& exit /b %SYNC_EXIT_CODE%
