// Hlavní JavaScript stránky.
// Každá část webu má vlastní funkci init…(), všechny se spustí po načtení stránky.

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initReveal();
  initCounters();
  initFaq();
  initContactForm();
  setYear();
});

// Navigace: změna pozadí při scrollu, mobilní menu
function initNav() {
  const header = document.querySelector('[data-header]');
  const button = document.querySelector('[data-menu-button]');
  const menu = document.getElementById(button.getAttribute('aria-controls'));

  // Po odscrollování o víc než 20 px dostane navigace pozadí a stín
  const updateHeader = () => {
    header.toggleAttribute('data-scrolled', window.scrollY > 20);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  // Otevře nebo zavře mobilní menu
  const setMenuOpen = (open) => {
    button.setAttribute('aria-expanded', open);
    button.setAttribute('aria-label', open ? 'Zavřít menu' : 'Otevřít menu');
    menu.toggleAttribute('data-open', open);
  };
  const isMenuOpen = () => button.getAttribute('aria-expanded') === 'true';

  button.addEventListener('click', () => setMenuOpen(!isMenuOpen()));

  // Po kliknutí na odkaz se menu zavře
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  // Klávesa Esc menu zavře a vrátí fokus na tlačítko
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isMenuOpen()) {
      setMenuOpen(false);
      button.focus();
    }
  });
}

// Plynulé najetí prvků při scrollování (Task 10)
function initReveal() {}

// Animovaná počítadla: při doscrollování napočítají od 0 do cílové hodnoty (jen jednou).
// Cílová hodnota je v atributu data-counter, přípona (např. „+“) v data-counter-suffix.
function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Bez animací necháme v HTML rovnou cílovou hodnotu
  if (reduceMotion || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target); // počítadlo se spustí jen jednou
      animateCounter(entry.target);
    });
  }, { threshold: 0.5 });

  counters.forEach((counter) => {
    counter.textContent = '0' + (counter.dataset.counterSuffix || '');
    observer.observe(counter);
  });
}

// Plynule napočítá jedno počítadlo od 0 do cíle za 1,5 sekundy
function animateCounter(counter) {
  const target = Number(counter.dataset.counter);
  const suffix = counter.dataset.counterSuffix || '';
  const duration = 1500;
  const start = performance.now();

  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // na konci zpomalí
    counter.textContent = Math.round(target * eased) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// Rozbalovací otázky v FAQ (Task 7)
function initFaq() {}

// Kontrola a odeslání kontaktního formuláře (Task 9)
function initContactForm() {}

// Vloží aktuální rok do všech prvků s atributem data-year
function setYear() {
  const year = new Date().getFullYear();
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = year;
  });
}
