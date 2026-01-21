@echo off
setlocal

REM Generate WAR from Angular build using the PowerShell packager.
REM - Skips npm install, builds the project, and zips via Compress-Archive.
REM - Pass additional flags (e.g., -ContextPath "/framesec/") as arguments.

set SCRIPT_DIR=%~dp0
powershell -NoProfile -ExecutionPolicy Bypass -File "%SCRIPT_DIR%package-angular-to-war.ps1" -NoNpmInstall -Zip -Force %*

if errorlevel 1 (
	echo WAR packaging failed. See output above.
	exit /b 1
)

echo WAR created successfully.
exit /b 0