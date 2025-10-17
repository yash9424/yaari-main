@echo off
echo ========================================
echo Running Yaari Android App
echo ========================================
echo.

echo Step 1: Starting Next.js dev server on port 3001...
start "Yaari Dev Server" cmd /k "cd /d "%~dp0" && npm run dev"

timeout /t 5 /nobreak >nul

echo.
echo Step 2: Opening Android Studio...
call npx cap open android

echo.
echo ========================================
echo Instructions:
echo ========================================
echo 1. Wait for dev server to start (check the other window)
echo 2. In Android Studio, wait for Gradle sync
echo 3. Click Run button or Build APK
echo 4. App will connect to https://acsgroup.cloud
echo.
echo To stop: Close the "Yaari Dev Server" window
echo.
pause
