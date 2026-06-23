// Animation du gradient rotatif sur les button-card au survol
let animationFrameId = null;
let activeElement = null;
let rotationIndex = 135;

function animateElement() {
  if (activeElement) {
    rotationIndex = (rotationIndex + 1) % 360;
    activeElement.style.background = `linear-gradient(135deg, rgb(250, 250, 250), rgb(190, 190, 190)) padding-box, linear-gradient(${rotationIndex}deg, #00e5ff, #ff00d4) border-box`;
    animationFrameId = requestAnimationFrame(animateElement);
  }
}

// Fonction pour ajouter les event listeners
function addAnimationListeners(selector) {
  document.querySelectorAll(selector).forEach(element => {
    element.addEventListener('mouseenter', function() {
      activeElement = this;
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(animateElement);
      }
    });

    element.addEventListener('mouseleave', function() {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      activeElement = null;
      // Rétablir le gradient de gris par défaut
      this.style.background = `linear-gradient(135deg, rgb(250, 250, 250), rgb(190, 190, 190)) padding-box, linear-gradient(135deg, #00e5ff, #ff00d4) border-box`;
    });
  });
}

// Ajouter les animations aux button-card et skill-items
addAnimationListeners('.button-card');
addAnimationListeners('.skill-item');

// Expansion des project-cards (Prend la place de deux boxs côte à côte)
function expandProject(card) {
  const container = document.getElementById('projects-container');
  
  // Si cette carte est déjà ouverte, on ne fait rien
  if (card.classList.contains('expanded')) return;
  
  // Trouver s'il y a une AUTRE carte déjà ouverte
  const alreadyExpanded = container.querySelector('.project-card.expanded');
  if (alreadyExpanded) {
    // On lui retire la classe expanded pour la fermer
    alreadyExpanded.classList.remove('expanded');
  }
  
  // On ouvre la nouvelle carte
  card.classList.add('expanded');
}

function closeProject(event) {
  // Empêche le clic de se propager à la carte parente (ce qui la réouvrirait aussitôt)
  event.stopPropagation();
  
  const container = document.getElementById('projects-container');
  const expanded = container.querySelector('.project-card.expanded');
  if (expanded) {
    expanded.classList.remove('expanded');
  }
} 

// Intersection Observer pour afficher le nom dans la Navbar lorsque le grand nom disparaît
document.addEventListener('DOMContentLoaded', () => {
  const mainNameTrigger = document.getElementById('main-name-trigger');
  const navBrand = document.getElementById('nav-brand');
  const navCvLink = document.querySelector('.nav-cv-link');

  if (mainNameTrigger && navBrand && navCvLink) {
    const observerOptions = {
      root: null, // utilise le viewport global
      threshold: 0 // se déclenche dès que l'élément quitte l'écran à 100%
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Si entry.isIntersecting est faux, le grand nom n'est PLUS visible à l'écran
        if (!entry.isIntersecting) {
          navBrand.classList.add('visible');
          navCvLink.classList.add('visible');
        } else {
          navBrand.classList.remove('visible');
          navCvLink.classList.remove('visible');
        }
      });
    }, observerOptions);

    observer.observe(mainNameTrigger);
  }
});
