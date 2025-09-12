@echo off
echo Testing H-TV API Server...
echo.

echo Checking Python installation...
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Python found, starting server...
    python api_server.py
) else (
    echo ✗ Python not found, trying py launcher...
    py --version >nul 2>&1
    if %errorlevel% equ 0 (
        echo ✓ Python found via py launcher, starting server...
        py api_server.py
    ) else (
        echo ❌ Python not installed or not in PATH
        echo Please install Python 3.9+ from python.org
        echo or install from Microsoft Store
    )
)

pause
