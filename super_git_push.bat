@echo off
echo ==============================================
echo   SCRIPT SUPER GIT PUSH INICIADO
echo ==============================================

set /p mensaje=Ingresa el mensaje de commit:

git status
git add .
git commit -m "%mensaje%"
git push origin main

pause
