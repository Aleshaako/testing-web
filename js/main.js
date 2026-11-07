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

// Navigace: změna pozadí při scrollu, mobilní menu (Task 2)
function initNav() {}

// Plynulé najetí prvků při scrollování (Task 10)
function initReveal() {}

// Animovaná počítadla v sekci Služby (Task 4)
function initCounters() {}

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
