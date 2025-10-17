@echo off
echo ========================================
echo Building Production Yaari Android APK
echo ========================================
echo.

cd "yarri app"

echo Step 1: Building Next.js for production...
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Build failed
    pause
    exit /b 1
)

echo.
echo Step 2: Exporting static files...
call npx next export
if %errorlevel% neq 0 (
    echo [ERROR] Export failed
    pause
    exit /b 1
)

echo.
echo Step 3: Syncing with Android...
call npx cap sync android

echo.
echo Step 4: Building APK...
cd android
cmd /c "set JAVA_HOME=C:\Program Files\Java\jdk-17&& gradlew.bat clean assembleDebug"

echo.
echo ========================================
echo APK Location:
echo android\app\build\outputs\apk\debug\app-debug.apk
echo ========================================
pause
