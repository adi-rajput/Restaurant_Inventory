@echo off
setlocal EnableDelayedExpansion
echo ------------------------------------------------------------------
echo           Restaurant Inventory Backend Setup
echo ------------------------------------------------------------------

REM Try to find mix automatically first
set "PATH=C:\Program Files\Elixir\bin;%PATH%"
where mix >nul 2>nul
if %errorlevel% equ 0 goto CHECK_ERLANG

:ASK_ELIXIR
echo.
echo [!] 'mix' (Elixir) command not found.
echo Please locate your Elixir 'bin' folder.
echo (Example: C:\Program Files\Elixir\bin)
echo.
set /p "ELIXIR_USER_PATH=>> Paste Elixir bin path: "
set "ELIXIR_USER_PATH=!ELIXIR_USER_PATH:"=!"
set "PATH=!ELIXIR_USER_PATH!;%PATH%"

where mix >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Still cannot find 'mix'. Please try again.
    goto ASK_ELIXIR
)

:CHECK_ERLANG
where erl >nul 2>nul
if %errorlevel% equ 0 goto START_SETUP

:ASK_ERLANG
echo.
echo [!] 'erl' (Erlang) command not found.
echo Elixir requires Erlang to run.
echo Please locate your Erlang 'bin' folder.
echo (Example: C:\Program Files\Erlang OTP\bin)
echo.
set /p "ERLANG_USER_PATH=>> Paste Erlang bin path: "
set "ERLANG_USER_PATH=!ERLANG_USER_PATH:"=!"
set "PATH=!ERLANG_USER_PATH!;%PATH%"

where erl >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Still cannot find 'erl'. Please try again.
    goto ASK_ERLANG
)

:START_SETUP
cd backend

echo.
echo [1/3] Updating Dependencies...
call mix deps.get >nul 2>&1

echo.
echo [2/3] Setting up Database...
call mix ecto.setup
if %errorlevel% equ 0 goto START_SERVER

:ASK_DB_PASS
echo.
echo [!] Database Password Authentication Failed.
echo The user 'postgres' requires a password (default 'password' failed).
echo.
set /p "DB_PASSWORD=>> Enter your PostgreSQL password: "

echo.
echo Retrying database setup with new password...
call mix ecto.setup
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Still failed. Please verify your password and try again.
    goto ASK_DB_PASS
)

:START_SERVER
echo.
echo [3/3] Starting Phoenix Server...
echo (Press Ctrl+C to stop)
call mix phx.server

pause
