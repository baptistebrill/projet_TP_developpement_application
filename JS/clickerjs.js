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

// Fonction pour gérer les clics manuels
function incrementCounter() {
  counter += incrementValue;
  updateCounterDisplay();
}

// Mise à jour des clics pour vérifier les états des boutons
incrementBtn.removeEventListener('click', incrementCounter); // Supprimer tout ancien écouteur pour éviter les doublons
incrementBtn.addEventListener('click', incrementCounter); // Ajouter l'écouteur d'événement

// Fonction pour gérer les améliorations de clic manuel
upgrades.forEach((upgrade) => {
  upgrade.addEventListener('click', () => {
    let cost = parseInt(upgrade.getAttribute('data-cost'));
    if (counter >= cost) {
      counter -= cost; // Déduire le coût de l'amélioration
      updateCounterDisplay();

      // Augmenter la valeur d'incrémentation en fonction de l'amélioration
      if (upgrade.id === 'upgrade1') {
        incrementValue += 1;
      } else if (upgrade.id === 'upgrade2') {
        incrementValue += 5;
      } else if (upgrade.id === 'upgrade3') {
        incrementValue += 10;
      }

      // Augmenter le coût de l'amélioration après achat
      cost = Math.ceil(cost * 1.5);
      upgrade.setAttribute('data-cost', cost);
      upgrade.textContent = `Bouton ${upgrade.id.charAt(upgrade.id.length - 1)}: +${upgrade.id === 'upgrade1' ? '1' : upgrade.id === 'upgrade2' ? '5' : '10'} $ par clic (${cost} $)`;
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

      if (autoClicker.id === 'autoClicker1') {
        autoClickValue += 1;
      } else if (autoClicker.id === 'autoClicker2') {
        autoClickValue += 5;
      } else if (autoClicker.id === 'autoClicker3') {
        autoClickValue += 10;
      }

      updateAutoClickDisplay();
      startAutoClicker(); // Relancer l'auto-clicker avec la nouvelle valeur

      cost = Math.ceil(cost * 1.5);
      autoClicker.setAttribute('data-cost', cost);
      autoClicker.textContent = `+${autoClicker.id === 'autoClicker1' ? '1' : autoClicker.id === 'autoClicker2' ? '5' : '10'} $ par seconde (${cost} $)`;
    } else {
      alert("Vous n'avez pas assez d'argent pour acheter cette amélioration automatique !");
    }
  });
});

// Fonction de formatage étendue pour les puissances de 10 jusqu'à 10^36
function formatNumber(value) {
  const suffixes = [
    "", " mille", " million", " milliard", " billion", " billiard", 
    " trillion", " trilliard", " quadrillion", " quadrilliard", 
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
      upgrade.textContent = `Bouton ${upgrade.id.charAt(upgrade.id.length - 1)}: +${upgrade.id === 'upgrade1' ? '1' : upgrade.id === 'upgrade2' ? '5' : '10'} $ par clic (${formatNumber(cost)} $)`;
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

// Démarrer l'auto-clicker au démarrage
startAutoClicker();

// Vérifier l'état des boutons lors du chargement initial de la page
checkButtonStates();
