/*
// Proxy pour les données sensibles du jeu
document.addEventListener('DOMContentLoaded', () => {
  const counterDisplay = document.getElementById('counter');
  
  const gameData = new Proxy(
    {
      counter: 0,
      incrementValue: 1,
      autoClickValue: 0,
      upgrades: [], // Liste des améliorations
      autoClickers: [], // Liste des auto-clickers
      musicEnabled: false, // État de la musique
    },
    {
      get(target, prop) {
        if (prop in target) {
          console.log(`Lecture de "${prop}" : ${target[prop]}`);
          return target[prop];
        }
        console.warn(`La propriété "${prop}" n'existe pas.`);
        return undefined;
      },
      set(target, prop, value) {
        if (typeof value !== 'number' && typeof value !== 'boolean') {
          console.error(`Valeur invalide pour "${prop}" : ${value}`);
          return false;
        }
        console.log(`Modification autorisée de "${prop}" : ${value}`);
        target[prop] = value;
        return true;
      },
    }
  );
  
  // Proxy pour sécuriser toutes les fonctions du jeu
  const gameFunctions = new Proxy(
    {
      // Fonction : Met à jour l'affichage du compteur
      updateCounterDisplay() {
        counterDisplay.textContent = `${gameData.counter} $`;
        console.log(`Affichage mis à jour : ${gameData.counter}`);
      },
  
      // Fonction : Incrémente le compteur
      incrementCounter() {
        gameData.counter += gameData.incrementValue;
        this.updateCounterDisplay();
        console.log('Compteur incrémenté.');
      },
  
      // Fonction : Réinitialise le jeu
      resetGame() {
        gameData.counter = 0;
        gameData.incrementValue = 1;
        gameData.autoClickValue = 0;
        this.updateCounterDisplay();
        console.log('Jeu réinitialisé.');
      },
  
      // Fonction : Sauvegarde la progression
      saveProgression() {
        const progression = {
          counter: gameData.counter,
          incrementValue: gameData.incrementValue,
          autoClickValue: gameData.autoClickValue,
          upgrades: gameData.upgrades,
          autoClickers: gameData.autoClickers,
          musicEnabled: gameData.musicEnabled,
        };
  
        fetch('/save-progress', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(progression),
        })
          .then(response => response.text())
          .then(data => {
            console.log('Sauvegarde réussie :', data);
          })
          .catch(error => {
            console.error('Erreur lors de la sauvegarde :', error);
          });
      },
  
      // Fonction : Charge la progression
      loadProgression() {
        fetch('/load-progress')
          .then(response => response.json())
          .then(progression => {
            gameData.counter = progression.counter || 0;
            gameData.incrementValue = progression.incrementValue || 1;
            gameData.autoClickValue = progression.autoClickValue || 0;
            gameData.upgrades = progression.upgrades || [];
            gameData.autoClickers = progression.autoClickers || [];
            gameData.musicEnabled = progression.musicEnabled || false;
  
            this.updateCounterDisplay();
            console.log('Progression chargée.');
          })
          .catch(error => {
            console.error('Erreur lors du chargement de la progression :', error);
          });
      },
  
      // Fonction : Active ou désactive la musique
      toggleMusic() {
        const music = document.getElementById('backgroundMusic');
        if (gameData.musicEnabled) {
          music.pause();
          gameData.musicEnabled = false;
          console.log('Musique arrêtée.');
        } else {
          music.play().catch(err => console.error('Erreur musique :', err));
          gameData.musicEnabled = true;
          console.log('Musique démarrée.');
        }
      },
  
      // Fonction : Gère les améliorations
      buyUpgrade(upgradeId, cost, incrementIncrease) {
        if (gameData.counter >= cost) {
          gameData.counter -= cost;
          gameData.incrementValue += incrementIncrease;
          this.updateCounterDisplay();
          console.log(`Amélioration "${upgradeId}" achetée : +${incrementIncrease} $ par clic.`);
        } else {
          console.error(`Pas assez d'argent pour l'amélioration "${upgradeId}".`);
        }
      },
  
      // Fonction : Gère les auto-clickers
      buyAutoClicker(autoClickerId, cost, autoClickIncrease) {
        if (gameData.counter >= cost) {
          gameData.counter -= cost;
          gameData.autoClickValue += autoClickIncrease;
          this.updateCounterDisplay();
          console.log(`Auto-clicker "${autoClickerId}" acheté : +${autoClickIncrease} $ par seconde.`);
        } else {
          console.error(`Pas assez d'argent pour l'auto-clicker "${autoClickerId}".`);
        }
      },
  
      // Fonction : Démarre les auto-clickers
      startAutoClickers() {
        setInterval(() => {
          gameData.counter += gameData.autoClickValue;
          this.updateCounterDisplay();
        }, 1000);
        console.log('Auto-clickers démarrés.');
      },
    },
    {
      get(target, prop) {
        if (typeof target[prop] === 'function') {
          console.log(`Appel de la fonction "${prop}"`);
          return target[prop].bind(target); // Retourne la fonction liée
        }
        console.warn(`"${prop}" n'est pas une fonction.`);
        return undefined;
      },
      set() {
        console.error('Modification directe des fonctions interdite.');
        return false;
      },
    }
  );
  
  // Gestion des événements DOM
  document.addEventListener('DOMContentLoaded', () => {
    incrementBtn.addEventListener('click', gameFunctions.incrementCounter);
    //resetBtn.addEventListener('click', gameFunctions.resetGame);
  
    // Ajouter des gestionnaires pour les boutons d'améliorations
    document.querySelectorAll('.upgrade').forEach(upgrade => {
      upgrade.addEventListener('click', () => {
        const cost = parseInt(upgrade.getAttribute('data-cost'));
        const incrementIncrease = parseInt(upgrade.getAttribute('data-increment'));
        const upgradeId = upgrade.id;
        gameFunctions.buyUpgrade(upgradeId, cost, incrementIncrease);
      });
    });
  
    // Ajouter des gestionnaires pour les auto-clickers
    document.querySelectorAll('.auto-clicker').forEach(autoClicker => {
      autoClicker.addEventListener('click', () => {
        const cost = parseInt(autoClicker.getAttribute('data-cost'));
        const autoClickIncrease = parseInt(autoClicker.getAttribute('data-increment'));
        const autoClickerId = autoClicker.id;
        gameFunctions.buyAutoClicker(autoClickerId, cost, autoClickIncrease);
      });
    });
  
    // Charger la progression au démarrage
    gameFunctions.loadProgression();
  
    // Démarrer les auto-clickers
    gameFunctions.startAutoClickers();
  
    // Sauvegarde automatique toutes les 5 minutes
    setInterval(gameFunctions.saveProgression, 5 * 60 * 1000);
  });

});
*/


let counter = 0;
let incrementValue = 1;
let autoClickValue = 0; // Valeur générée automatiquement par seconde
let autoClickerInterval = null; // Intervalle de clic automatique
let isMusicPlaying = false; // État de la musique

// Sélection des éléments
const counterDisplay = document.getElementById('counter');
const autoClickValueDisplay = document.getElementById('autoClickValueDisplay');
const incrementBtn = document.getElementById('incrementBtn');
const upgrades = document.querySelectorAll('.upgrade');
const autoClickers = document.querySelectorAll('.auto-clicker');
const musicToggleBtn = document.getElementById('musicToggleBtn');
const music = document.getElementById('backgroundMusic');
const fond_ecran = document.getElementById('fond');
const hard_reset = document.getElementById('reset');

// Liste des logos selon le montant d'argent atteint
const logos = {
  1000: 'Logo_sphimx_soiréeCasino.png',
  1000000: 'Logo_sphimx_pixel.png',
  1000000000: 'Logo_sphimx_20ans.png',
};

// Fonction pour mettre à jour l'affichage du compteur
function updateCounterDisplay() {
  counterDisplay.textContent = counter + ' $';
  checkButtonStates(); // Vérifier les états des boutons après chaque mise à jour du compteur
  updateLogo(); // Mettre à jour l'image du logo si nécessaire
}

// Fonction pour mettre à jour l'image du logo
function updateLogo() {
  // Parcours des clés de l'objet logos pour changer l'image à la bonne valeur
  const logoKeys = Object.keys(logos).map(Number).sort((a, b) => b - a); // Trier du plus grand au plus petit

  for (let key of logoKeys) {
    if (counter >= key) {
      incrementBtn.src = logos[key]; // Changer l'image du bouton
      break; // Quitte la boucle dès qu'un seuil est atteint
    }
  }
}

// Fonction pour sauvegarder la progression sur le serveur
function saveProgression() {
  const progression = {
    counter: counter,
    incrementValue: incrementValue,
    autoClickValue: autoClickValue,
    upgradeCosts: Array.from(upgrades).map(upgrade => ({
      id: upgrade.id,
      cost: parseInt(upgrade.getAttribute('data-cost'))
    })),
    autoClickerCosts: Array.from(autoClickers).map(autoClicker => ({
      id: autoClicker.id,
      cost: parseInt(autoClicker.getAttribute('data-cost'))
    }))
  };

  fetch('/save-progress', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(progression),
  })
  .then(response => response.text())
  .then(data => {
    console.log('Sauvegarde réussie :', data);
  })
  .catch(error => {
    console.error('Erreur lors de la sauvegarde :', error);
  });
}

// Fonction pour charger la progression depuis le serveur
function loadProgression() {
  fetch('/load-progress')
    .then(response => response.json())
    .then(progression => {
      counter = progression.counter || 0;
      incrementValue = progression.incrementValue || 1;
      autoClickValue = progression.autoClickValue || 0;
      startAutoClicker()
      updateAutoClickDisplay()
	  BackgroundChange()
	  

      // Charger les coûts des améliorations
      if (progression.upgradeCosts) {
        progression.upgradeCosts.forEach(upgradeData => {
          const upgrade = document.getElementById(upgradeData.id);
          if (upgrade) {
            upgrade.setAttribute('data-cost', upgradeData.cost);
            upgrade.textContent = `+${upgrade.id === 'upgrade1' ? '1' : upgrade.id === 'upgrade2' ? '5' : '10'} $ par clic (${formatNumber(upgradeData.cost)} $)`;
          }
        });
      }

      // Charger les coûts des auto-clickers
      if (progression.autoClickerCosts) {
        progression.autoClickerCosts.forEach(autoClickerData => {
          const autoClicker = document.getElementById(autoClickerData.id);
          if (autoClicker) {
            autoClicker.setAttribute('data-cost', autoClickerData.cost);
            autoClicker.textContent = `+${autoClicker.id === 'autoClicker1' ? '1' : autoClicker.id === 'autoClicker2' ? '5' : '10'} $ par seconde (${formatNumber(autoClickerData.cost)} $)`;
          }
        });
      }

      updateCounterDisplay();
      updateAutoClickDisplay();
      console.log('Progression chargée :', progression);
    })
    .catch(error => {
      console.error('Erreur lors du chargement :', error);
    });
}

// Fonction pour vérifier si les boutons doivent être activés ou désactivés
function checkButtonStates() {
  upgrades.forEach((upgrade) => {
    let cost = parseInt(upgrade.getAttribute('data-cost'));
    if (counter >= cost) {
      upgrade.classList.remove('disabled'); // Retirer la classe désactivée
      upgrade.disabled = false; // Activer le bouton
    } else {
      upgrade.classList.add('disabled'); // Ajouter la classe désactivée
      upgrade.disabled = true; // Désactiver le bouton
    }
  });

  autoClickers.forEach((autoClicker) => {
    let cost = parseInt(autoClicker.getAttribute('data-cost'));
    if (counter >= cost) {
      autoClicker.classList.remove('disabled'); // Retirer la classe désactivée
      autoClicker.disabled = false; // Activer le bouton
    } else {
      autoClicker.classList.add('disabled'); // Ajouter la classe désactivée
      autoClicker.disabled = true; // Désactiver le bouton
    }
  });
}

//Fonction pour gérer le changement d'écran
function BackgroundChange(){
	if (document.body.classList.contains('mode-jour')) {
        document.body.classList.remove('mode-jour');
        document.body.classList.add('mode-nuit');
		fond.src = 'Soleil.PNG';
    } else {
        document.body.classList.remove('mode-nuit');
        document.body.classList.add('mode-jour');
		fond.src = 'Lune.PNG';
	}
}
fond_ecran.addEventListener('click', BackgroundChange);


// Fonction pour gérer les clics manuels
function incrementCounter() {
  counter += incrementValue;
  updateCounterDisplay();
}

// Mise à jour des clics pour vérifier les états des boutons
incrementBtn.removeEventListener('click', incrementCounter); // Supprimer tout ancien écouteur pour éviter les doublons
incrementBtn.addEventListener('click', incrementCounter); // Ajouter l'écouteur d'événement

/*
function HardReset(){
	const userConfirmed = confirm("Êtes-vous sûr de vouloir tout recommencer à zero ?"); // Demande la confirmation à l'utilisateur pour recommencer

	if (userConfirmed) {
		console.log("L'utilisateur a confirmé.");
		fetch('/Reset'); // Supprime le dossier sauvegarde et ce qu'il contient et recrée le dossier sauvegarde
			.then(() => {
                loadProgression(); // Recharge le jeu
                document.body.style.backgroundImage = "url('mode_jour.PNG')"; // Réapplique le fond
            })
	} else {
		console.log("L'utilisateur a annulé."); //Ne fais rien sinon
	
}
hard_reset.addEventListener('click', HardReset);
*/

//amélioration de clic manuel
upgrades.forEach((upgrade) => {
  upgrade.addEventListener('click', () => {
    let cost = parseInt(upgrade.getAttribute('data-cost'));
    if (counter >= cost) {
      counter -= cost;
      updateCounterDisplay();

      // Augmenter la valeur d'incrémentation
      if (upgrade.id === 'upgrade1') incrementValue += 1;
      else if (upgrade.id === 'upgrade2') incrementValue += 5;
      else if (upgrade.id === 'upgrade3') incrementValue += 10;

      // Mettre à jour le coût avec format simplifié
      cost = Math.ceil(cost * 1.5);
      upgrade.setAttribute('data-cost', cost);
      upgrade.textContent = `+${upgrade.id.charAt(upgrade.id.length - 1)}: +${upgrade.id === 'upgrade1' ? '1' : upgrade.id === 'upgrade2' ? '5' : '10'} $ par clic (${formatNumber(cost)} $)`;

      // Vérifier les états des boutons après l'achat
      checkButtonStates();
    } else {
      alert("Vous n'avez pas assez d'argent pour acheter cette amélioration !");
    }
  });
});


// Fonction pour démarrer ou arrêter la musique
function toggleMusic() {
  if (isMusicPlaying) {
    music.pause(); // Arrête la musique
    musicToggleBtn.src = 'speaker_off.jpg'; // Change l'image pour le haut-parleur barré
  } else {
    music.play().catch((error) => {
      console.log('Erreur lors du démarrage de la musique :', error);
    });
    musicToggleBtn.src = 'speaker_on.jpg'; // Change l'image pour le haut-parleur activé
  }
  isMusicPlaying = !isMusicPlaying; // Inverse l'état
}

// Événement pour cliquer sur le bouton de musique
musicToggleBtn.addEventListener('click', toggleMusic);

// Fonction pour démarrer l'auto-clicker avec la nouvelle valeur par seconde
function startAutoClicker() {
  if (autoClickerInterval) {
    clearInterval(autoClickerInterval); // Annule l'intervalle précédent
  }

  if (autoClickValue > 0) {
    const intervalTime = 1000 / autoClickValue; // Temps entre chaque "incrémentation automatique"

    autoClickerInterval = setInterval(() => {
      counter += 1; // Incrémente de 1 à chaque intervalle
      updateCounterDisplay();
    }, intervalTime); // Ajuste l'intervalle de temps pour chaque incrément
  }
}

// Gestion des clickers automatiques
autoClickers.forEach((autoClicker) => {
  autoClicker.addEventListener('click', () => {
    let cost = parseInt(autoClicker.getAttribute('data-cost'));
    if (counter >= cost) {
      counter -= cost;
      updateCounterDisplay();

      // Augmenter la valeur d'incrémentation automatique
      if (autoClicker.id === 'autoClicker1') autoClickValue += 1;
      else if (autoClicker.id === 'autoClicker2') autoClickValue += 5;
      else if (autoClicker.id === 'autoClicker3') autoClickValue += 10;

      updateAutoClickDisplay();
      startAutoClicker();

      // Mettre à jour le coût avec format simplifié
      cost = Math.ceil(cost * 1.5);
      autoClicker.setAttribute('data-cost', cost);
      autoClicker.textContent = `+${autoClicker.id === 'autoClicker1' ? '1' : autoClicker.id === 'autoClicker2' ? '5' : '10'} $ par seconde (${formatNumber(cost)} $)`;

      // Vérifier les états des boutons après l'achat
      checkButtonStates();
    } else {
      alert("Vous n'avez pas assez d'argent pour acheter cette amélioration automatique !");
    }
  });
});


// Fonction de formatage étendue pour les puissances de 10 jusqu'à 10^36
function formatNumber(value) {
  const suffixes = [
    "", " k", " m", " M", " b", " B", 
    " t", " T", " quadrillion", " quadrilliard", 
    " quintillion", " quintilliard", " sextillion", " sextilliard",
    " septillion", " septilliard", " octillion", " octilliard", 
    " nonillion", " nonilliard", " décillion"
  ];
  
  let magnitude = Math.floor(Math.log10(value) / 3); // Trouver la puissance de 10
  if (magnitude >= suffixes.length) magnitude = suffixes.length - 1; // Limite au maximum
  
  const scaledValue = value / Math.pow(10, magnitude * 3);
  return scaledValue.toFixed(1) + suffixes[magnitude];
}

// Utiliser `formatNumber` pour le compteur
function updateCounterDisplay() {
  counterDisplay.textContent = formatNumber(counter) + " $";
  checkButtonStates();
  updateLogo();
}

// Utiliser `formatNumber` pour les prix d'améliorations et d'auto-clics
upgrades.forEach((upgrade) => {
  upgrade.addEventListener('click', () => {
    let cost = parseInt(upgrade.getAttribute('data-cost'));
    if (counter >= cost) {
      counter -= cost;
      updateCounterDisplay();

      // Augmenter la valeur d'incrémentation
      if (upgrade.id === 'upgrade1') incrementValue += 1;
      else if (upgrade.id === 'upgrade2') incrementValue += 5;
      else if (upgrade.id === 'upgrade3') incrementValue += 10;

      // Mettre à jour le coût avec format simplifié
      cost = Math.ceil(cost * 1.5);
      upgrade.setAttribute('data-cost', cost);
      upgrade.textContent = `+${upgrade.id.charAt(upgrade.id.length - 1)}: +${upgrade.id === 'upgrade1' ? '1' : upgrade.id === 'upgrade2' ? '5' : '10'} $ par clic (${formatNumber(cost)} $)`;
    }
  });
});

// Utiliser `formatNumber` pour afficher les prix dans les auto-clickers
autoClickers.forEach((autoClicker) => {
  autoClicker.addEventListener('click', () => {
    let cost = parseInt(autoClicker.getAttribute('data-cost'));
    if (counter >= cost) {
      counter -= cost;
      updateCounterDisplay();

      if (autoClicker.id === 'autoClicker1') autoClickValue += 1;
      else if (autoClicker.id === 'autoClicker2') autoClickValue += 5;
      else if (autoClicker.id === 'autoClicker3') autoClickValue += 10;

      updateAutoClickDisplay();
      startAutoClicker();

      // Mettre à jour le coût avec format simplifié
      cost = Math.ceil(cost * 1.5);
      autoClicker.setAttribute('data-cost', cost);
      autoClicker.textContent = `+${autoClicker.id === 'autoClicker1' ? '1' : autoClicker.id === 'autoClicker2' ? '5' : '10'} $ par seconde (${formatNumber(cost)} $)`;
    }
  });
});


// Mettre à jour l'affichage des clics automatiques
function updateAutoClickDisplay() {
  autoClickValueDisplay.textContent = `Clics automatiques : ${autoClickValue} $ par seconde`;
}


// Sauvegarde avant la fermeture de la page
window.addEventListener('beforeunload', (event) => {
  saveProgression();
  event.returnValue = ''; // Nécessaire pour déclencher la fenêtre de confirmation de fermeture
});

// Charger la progression au démarrage
loadProgression();

window.addEventListener('beforeunload', () => {
  fetch('/shutdown', { method: 'POST' })
    .then(() => console.log('Le serveur a reçu la commande de fermeture.'))
    .catch((error) => console.error('Erreur lors de l\'envoi de la commande de fermeture :', error));
});

