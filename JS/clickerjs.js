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

// Fonction pour mettre à jour l'affichage du compteur
function updateCounterDisplay() {
  counterDisplay.textContent = counter + ' $';
}

// Fonction pour mettre à jour l'affichage des clics automatiques par seconde
function updateAutoClickDisplay() {
  autoClickValueDisplay.textContent = `Clics automatiques : ${autoClickValue} $ par seconde`;
}

// Fonction pour gérer les clics manuels
incrementBtn.addEventListener('click', () => {
  counter += incrementValue;
  updateCounterDisplay();
});

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
      // Mise à jour du texte avec le nom du bouton et l'effet
      upgrade.textContent = `Bouton ${upgrade.id.charAt(upgrade.id.length - 1)}: +${upgrade.id === 'upgrade1' ? '1' : upgrade.id === 'upgrade2' ? '5' : '10'} $ par clic (${cost} $)`;
    } else {
      alert("Pas assez d'argent pour acheter cette amélioration !");
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

// Fonction pour mettre à jour l'auto-clicker avec la nouvelle valeur par seconde
function startAutoClicker() {
  // Si un intervalle existe déjà, on l'annule pour en recréer un avec les nouvelles valeurs
  if (autoClickerInterval) {
    clearInterval(autoClickerInterval);
  }

  // Si autoClickValue > 0, on calcule l'intervalle en millisecondes entre chaque incrément
  if (autoClickValue > 0) {
    const intervalTime = 1000 / autoClickValue; // Temps entre chaque clic automatique

    autoClickerInterval = setInterval(() => {
      counter += 1; // On incrémente de 1 à chaque "clic"
      updateCounterDisplay();
    }, intervalTime); // On ajuste le temps entre chaque clic en fonction de autoClickValue
  }
}

// Gestion des clickers automatiques
autoClickers.forEach((autoClicker) => {
  autoClicker.addEventListener('click', () => {
    let cost = parseInt(autoClicker.getAttribute('data-cost'));
    if (counter >= cost) {
      counter -= cost; // Déduire le coût de l'auto-clicker
      updateCounterDisplay();

      // Augmenter la valeur d'incrémentation automatique par seconde
      if (autoClicker.id === 'autoClicker1') {
        autoClickValue += 1;
      } else if (autoClicker.id === 'autoClicker2') {
        autoClickValue += 5;
      } else if (autoClicker.id === 'autoClicker3') {
        autoClickValue += 10;
      }

      // Mettre à jour l'affichage des clics automatiques
      updateAutoClickDisplay();

      // Redémarrer l'auto-clicker avec les nouvelles valeurs
      startAutoClicker();

      // Augmenter le coût de l'amélioration automatique après achat
      cost = Math.ceil(cost * 1.5);
      autoClicker.setAttribute('data-cost', cost);
      autoClicker.textContent = `+${autoClicker.id === 'autoClicker1' ? '1' : autoClicker.id === 'autoClicker2' ? '5' : '10'} $ par seconde (${cost} $)`;
    } else {
      alert("Pas assez d'argent pour acheter cette amélioration automatique !");
    }
  });
});

// Démarrer l'auto-clicker au démarrage
startAutoClicker();
