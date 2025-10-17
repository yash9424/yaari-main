@echo off
echo ========================================
echo Building Yaari Android APK
echo ========================================
echo.
echo Please use Android Studio to build the APK:
echo.
echo 1. In Android Studio menu: Build ^> Build Bundle(s) / APK(s) ^> Build APK(s)
echo.
echo 2. Or use the Build menu and select "Build APK(s)"
echo.
echo 3. APK will be created at:
echo    android\app\build\outputs\apk\debug\app-debug.apk
echo.
echo Opening Android Studio...
cd /d "%~dp0"
call npx cap open android
pause
