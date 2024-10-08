let counter = 0;
let incrementValue = 1;
let autoClickValue = 0; // Valeur générée automatiquement par seconde

// Sélection des éléments
const counterDisplay = document.getElementById('counter');
const autoClickValueDisplay = document.getElementById('autoClickValueDisplay'); // Sélection de l'affichage des clics automatiques
const incrementBtn = document.getElementById('incrementBtn');
const upgrades = document.querySelectorAll('.upgrade');
const autoClickers = document.querySelectorAll('.auto-clicker');

// Fonction pour mettre à jour l'affichage du compteur
function updateCounterDisplay() {
  counterDisplay.textContent = counter + ' $';
}

// Fonction pour mettre à jour l'affichage des clics automatiques par seconde
function updateAutoClickDisplay() {
  autoClickValueDisplay.textContent = `Clics automatiques : ${autoClickValue} $ par seconde`;
}

// Incrémentation lors du clic sur le bouton principal
incrementBtn.addEventListener('click', () => {
  counter += incrementValue;
  updateCounterDisplay();
});

// Gestion des améliorations de clic manuel
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
      upgrade.textContent = `+${upgrade.id === 'upgrade1' ? '1' : upgrade.id === 'upgrade2' ? '5' : '10'} $ par clic (${cost} $)`;
    } else {
      alert("Pas assez d'argent pour acheter cette amélioration !");
    }
  });
});

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

      // Augmenter le coût de l'amélioration automatique après achat
      cost = Math.ceil(cost * 1.5);
      autoClicker.setAttribute('data-cost', cost);
      autoClicker.textContent = `+${autoClicker.id === 'autoClicker1' ? '1' : autoClicker.id === 'autoClicker2' ? '5' : '10'} $ par seconde (${cost} $)`;
    } else {
      alert("Pas assez d'argent pour acheter cette amélioration automatique !");
    }
  });
});

// Fonction pour générer de l'argent automatiquement chaque seconde
setInterval(() => {
  counter += autoClickValue;
  updateCounterDisplay();
}, 1000); // Toutes les 1000 millisecondes (1 seconde)

// Mettre à jour l'affichage des clics automatiques au démarrage
updateAutoClickDisplay();
