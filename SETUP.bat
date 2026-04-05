@echo off
chcp 65001 > nul
color 0B

echo.
echo  ======================================================
echo               SISTEMA TMTR 2026 - INSTALAÇÃO
echo  ======================================================
echo.

echo  [1/2] Baixando dependencias...

call npm i --silent --no-audit --no-fund > nul 2>&1
echo        - OK! Dependencias prontas.
echo.

echo  [2/2] Construindo serviço...
echo.

call npm run build > nul 2>&1

echo  ======================================================
echo   SISTEMA DO TMTR INSTALADO
echo   (Execute o arquivo START.bat para acessar o sistema)
echo  ======================================================

pause