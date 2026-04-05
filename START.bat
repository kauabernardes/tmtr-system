@echo off
chcp 65001 > nul
color 0B

echo.
echo  ======================================================
echo               SISTEMA TMTR 2026 - OPERACAO
echo  ======================================================
echo.

echo  Iniciando o servidor backend...
echo        - O painel sera aberto no seu navegador!
echo.

start http://localhost:3000

echo  ======================================================
echo   SISTEMA ONLINE E RODANDO! 
echo   (Mantenha esta janela aberta para o torneio rodar)
echo  ======================================================

call npm run start:prod > nul 2>&1

pause