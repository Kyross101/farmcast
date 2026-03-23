@echo off
echo ==========================================
echo   FarmCast - Auto Deploy to GitHub
echo ==========================================
echo.

cd /d "C:\Users\HP PROBOOK 450 G5\OneDrive\Desktop\farmcast"

echo [1/3] Adding all files...
git add .

echo [2/3] Committing...
set /p msg="Enter commit message (or press Enter for default): "
if "%msg%"=="" set msg=FarmCast update

git commit -m "%msg%"

echo [3/3] Pushing to GitHub...
git push origin main

echo.
echo ==========================================
echo   Done! Check Render dashboard to deploy.
echo ==========================================
pause
