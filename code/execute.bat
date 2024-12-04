@echo off

:: Déplacez-vous dans le répertoire où se trouve le script batch
cd /d "%~dp0"

:: Vérifiez si Node.js est installé
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Erreur : Node.js n'est pas installé. Veuillez l'installer pour continuer.
    pause
    exit /b
)

:: Lancer le serveur.js
echo Lancement de serveur.js...
node serveur.js

:: Vérifier si le serveur s'est arrêté avec une erreur
if %ERRORLEVEL% neq 0 (
    echo Erreur lors de l'exécution de serveur.js.
) else (
    echo Le serveur s'est arrêté normalement.
)

pause