@echo off
cd /d "%~dp0"
set /p commit_msg=Ingresa el mensaje de commit: 
git add .
git commit -m "%commit_msg%"
git push origin main
pause
