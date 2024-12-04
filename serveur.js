
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const lockFilePath = path.join(__dirname, 'server.lock');

// Utilisation du middleware pour lire les données JSON des requêtes POST
app.use(express.json());

// Définir le port
const PORT = 2500;

// Dossier de sauvegarde
const saveDir = path.join(__dirname, 'saves');

if (fs.existsSync(lockFilePath)) {
  console.error('Une instance du serveur est déjà en cours d\'exécution.');
  process.exit(1);
}

// Créer le fichier de verrouillage
fs.writeFileSync(lockFilePath, '');

// Créer le dossier s'il n'existe pas
if (!fs.existsSync(saveDir)) {
  fs.mkdirSync(saveDir);
}

// Servir les fichiers statiques (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Route pour servir la page HTML principale
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'cliker.html'));
});

// Route pour charger la sauvegarde la plus récente
app.get('/load-progress', (req, res) => {
  fs.readdir(saveDir, (err, files) => {
    if (err) {
      console.error('Erreur lors de la lecture des fichiers de sauvegarde :', err);
      return res.status(500).send('Erreur lors du chargement de la sauvegarde.');
    }

    // Trier les fichiers par date de création (les fichiers sont nommés avec un timestamp)
    const sortedFiles = files.sort((a, b) => {
      return fs.statSync(path.join(saveDir, b)).mtime.getTime() - 
             fs.statSync(path.join(saveDir, a)).mtime.getTime();
    });

    // Charger le fichier de sauvegarde le plus récent
    if (sortedFiles.length > 0) {
      const latestSave = path.join(saveDir, sortedFiles[0]);
      fs.readFile(latestSave, 'utf8', (err, data) => {
        if (err) {
          console.error('Erreur lors du chargement de la progression :', err);
          return res.status(500).send('Erreur lors du chargement de la progression.');
        }
        res.json(JSON.parse(data));
      });
    } else {
      // Si aucune sauvegarde n'existe, renvoyer une progression vide
      res.json({
        counter: 0,
        incrementValue: 1,
        autoClickValue: 0,
      });
    }
  });
});

app.get('/Reset', (req, res) => {
	fs.rmSync(saveDir, { recursive: true, force: true });
	fs.mkdirSync(saveDir);
});	

// Route pour sauvegarder la progression dans un fichier avec un timestamp
app.post('/save-progress', (req, res) => {
  const progression = req.body;
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const saveFile = path.join(saveDir, `save-${timestamp}.json`);

  // Sauvegarder la progression dans un fichier JSON
  fs.writeFile(saveFile, JSON.stringify(progression), (err) => {
    if (err) {
      console.error('Erreur lors de la sauvegarde de la progression :', err);
	  console.log(`Progression sauvegardée avec succès.`);
      return res.status(500).send('Erreur lors de la sauvegarde de la progression.');
    }
    res.send('Progression sauvegardée avec succès.');
	console.log(`Progression sauvegardée avec succès.`);
  });
});
const { exec } = require('child_process');
// Démarrer le serveur
const server = app.listen(PORT, () => {
  // Ouvrir automatiquement la page dans le navigateur
  exec(`start http://localhost:${PORT}`, (err) => {
    if (err) {
      console.error('Erreur lors de l\'ouverture automatique de la page :', err);
    }
  });
});

process.on('exit', () => {
  if (fs.existsSync(lockFilePath)) {
    fs.unlinkSync(lockFilePath);
  }
});

process.on('SIGINT', () => {
  process.exit();
});

process.on('SIGTERM', () => {
  process.exit();
});


app.post('/shutdown', (req, res) => {
  console.log('Arrêt du serveur...');
  res.send('Le serveur va se fermer.');
  server.close(() => {
    console.log('Le serveur est fermé.');
    process.exit(0); // Quitter le processus Node.js
  });
});