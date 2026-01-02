@echo off
set "PATH=C:\Program Files\Elixir\bin;%PATH%"
echo Running Tests...
cd backend
call mix test
pause
