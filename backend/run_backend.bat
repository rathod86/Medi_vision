@echo off
rem Set JAVA_HOME to JDK 17
set "JAVA_HOME=C:\Program Files\Microsoft\jdk-17.0.14.7-hotspot"
rem Add Java bin to PATH
set "PATH=%JAVA_HOME%\bin;%PATH%"
rem Change directory to project root
cd /d "%~dp0"
call mvnw.cmd spring-boot:run
