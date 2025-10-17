@echo off
echo ========================================
echo Setting up JAVA_HOME Environment Variable
echo ========================================
echo.

REM Find Java installation
echo Searching for Java JDK installation...
echo.

if exist "C:\Program Files\Java\jdk-17" (
    set "JAVA_PATH=C:\Program Files\Java\jdk-17"
    goto :found
)

if exist "C:\Program Files\Java\jdk-17.0.1" (
    set "JAVA_PATH=C:\Program Files\Java\jdk-17.0.1"
    goto :found
)

if exist "C:\Program Files\Java\jdk-17.0.2" (
    set "JAVA_PATH=C:\Program Files\Java\jdk-17.0.2"
    goto :found
)

if exist "C:\Program Files\Java\jdk-17.0.3" (
    set "JAVA_PATH=C:\Program Files\Java\jdk-17.0.3"
    goto :found
)

if exist "C:\Program Files\Java\jdk-17.0.4" (
    set "JAVA_PATH=C:\Program Files\Java\jdk-17.0.4"
    goto :found
)

if exist "C:\Program Files\Java\jdk-17.0.5" (
    set "JAVA_PATH=C:\Program Files\Java\jdk-17.0.5"
    goto :found
)

if exist "C:\Program Files\Java\jdk-17.0.6" (
    set "JAVA_PATH=C:\Program Files\Java\jdk-17.0.6"
    goto :found
)

if exist "C:\Program Files\Java\jdk-17.0.7" (
    set "JAVA_PATH=C:\Program Files\Java\jdk-17.0.7"
    goto :found
)

if exist "C:\Program Files\Java\jdk-17.0.8" (
    set "JAVA_PATH=C:\Program Files\Java\jdk-17.0.8"
    goto :found
)

if exist "C:\Program Files\Java\jdk-17.0.9" (
    set "JAVA_PATH=C:\Program Files\Java\jdk-17.0.9"
    goto :found
)

if exist "C:\Program Files\Java\jdk-17.0.10" (
    set "JAVA_PATH=C:\Program Files\Java\jdk-17.0.10"
    goto :found
)

if exist "C:\Program Files\Eclipse Adoptium\jdk-17.0.1.12-hotspot" (
    set "JAVA_PATH=C:\Program Files\Eclipse Adoptium\jdk-17.0.1.12-hotspot"
    goto :found
)

if exist "C:\Program Files\Eclipse Adoptium\jdk-17.0.2.8-hotspot" (
    set "JAVA_PATH=C:\Program Files\Eclipse Adoptium\jdk-17.0.2.8-hotspot"
    goto :found
)

if exist "C:\Program Files\Eclipse Adoptium\jdk-17.0.3.7-hotspot" (
    set "JAVA_PATH=C:\Program Files\Eclipse Adoptium\jdk-17.0.3.7-hotspot"
    goto :found
)

if exist "C:\Program Files\Eclipse Adoptium\jdk-17.0.4.8-hotspot" (
    set "JAVA_PATH=C:\Program Files\Eclipse Adoptium\jdk-17.0.4.8-hotspot"
    goto :found
)

if exist "C:\Program Files\Eclipse Adoptium\jdk-17.0.5.8-hotspot" (
    set "JAVA_PATH=C:\Program Files\Eclipse Adoptium\jdk-17.0.5.8-hotspot"
    goto :found
)

if exist "C:\Program Files\Eclipse Adoptium\jdk-17.0.6.10-hotspot" (
    set "JAVA_PATH=C:\Program Files\Eclipse Adoptium\jdk-17.0.6.10-hotspot"
    goto :found
)

if exist "C:\Program Files\Eclipse Adoptium\jdk-17.0.7.7-hotspot" (
    set "JAVA_PATH=C:\Program Files\Eclipse Adoptium\jdk-17.0.7.7-hotspot"
    goto :found
)

if exist "C:\Program Files\Eclipse Adoptium\jdk-17.0.8.7-hotspot" (
    set "JAVA_PATH=C:\Program Files\Eclipse Adoptium\jdk-17.0.8.7-hotspot"
    goto :found
)

if exist "C:\Program Files\Eclipse Adoptium\jdk-17.0.9.9-hotspot" (
    set "JAVA_PATH=C:\Program Files\Eclipse Adoptium\jdk-17.0.9.9-hotspot"
    goto :found
)

if exist "C:\Program Files\Eclipse Adoptium\jdk-17.0.10.7-hotspot" (
    set "JAVA_PATH=C:\Program Files\Eclipse Adoptium\jdk-17.0.10.7-hotspot"
    goto :found
)

echo [ERROR] Java JDK 17 not found!
echo.
echo Please install Java JDK 17 first:
echo - Oracle JDK: https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html
echo - Eclipse Temurin: https://adoptium.net/temurin/releases/?version=17
echo.
pause
exit /b 1

:found
echo [SUCCESS] Found Java at: %JAVA_PATH%
echo.
echo Setting JAVA_HOME environment variable...
echo.

REM Set JAVA_HOME for system
setx JAVA_HOME "%JAVA_PATH%" /M >nul 2>&1

if %errorlevel% equ 0 (
    echo [SUCCESS] JAVA_HOME set to: %JAVA_PATH%
) else (
    echo [ERROR] Failed to set JAVA_HOME. Please run this script as Administrator!
    echo.
    echo Right-click on this file and select "Run as administrator"
    echo.
    pause
    exit /b 1
)

REM Add to PATH
echo Adding Java to PATH...
setx PATH "%PATH%;%JAVA_PATH%\bin" /M >nul 2>&1

if %errorlevel% equ 0 (
    echo [SUCCESS] Added Java to PATH
) else (
    echo [WARNING] Could not add to PATH automatically
)

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo IMPORTANT: Close and reopen your Command Prompt/Terminal
echo.
echo To verify, run: java -version
echo.
pause
