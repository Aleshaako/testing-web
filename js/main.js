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

// Plynulé najetí prvků s atributem data-reveal, když je doscrollujete.
// data-reveal-delay="100" = zpoždění v milisekundách (karty v mřížce najíždějí postupně).
function initReveal() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Bez animací (nebo ve starém prohlížeči) necháme všechno rovnou vidět
  if (reduceMotion || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target); // každý prvek najede jen jednou
    });
  }, { rootMargin: '0px 0px -10% 0px' });

  document.querySelectorAll('[data-reveal]').forEach((element) => {
    element.style.animationDelay = (element.dataset.revealDelay || 0) + 'ms';
    observer.observe(element);
  });

  // Teprve teď prvky skryjeme (viz css/custom.css)
  document.documentElement.classList.add('reveal-ready');
}

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

// Rozbalovací otázky v FAQ. Bez JavaScriptu jsou odpovědi vidět (v HTML je aria-expanded="true"),
// tady je na začátku zavřeme a tlačítko pak otevírá a zavírá jednotlivé odpovědi.
function initFaq() {
  document.querySelectorAll('[data-faq-item]').forEach((item) => {
    const button = item.querySelector('button');

    const setOpen = (open) => {
      button.setAttribute('aria-expanded', open);
      item.toggleAttribute('data-open', open);
    };

    setOpen(false);
    button.addEventListener('click', () => {
      setOpen(button.getAttribute('aria-expanded') !== 'true');
    });
  });
}

// Kontrola kontaktního formuláře. Zatím se nic nikam neodesílá – po úspěšné kontrole
// se jen místo formuláře ukáže poděkování.
function initContactForm() {
  const form = document.querySelector('[data-contact-form]');
  const success = document.querySelector('[data-contact-success]');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Kontrolujeme jen pole, která mají chybovou hlášku (povinná pole)
  const fields = form.querySelectorAll('[data-error]');

  // Vrátí text chyby, nebo prázdný text, když je pole v pořádku.
  // trim() odstraní mezery na začátku a konci, takže pole jen z mezer se bere jako prázdné.
  const validate = (field) => {
    const value = field.value.trim();
    if (value === '') return field.dataset.error;
    if (field.type === 'email' && !emailPattern.test(value)) {
      return 'Zkontrolujte prosím e-mail, něco v něm chybí (např. jan@firma.cz).';
    }
    return '';
  };

  // Zobrazí nebo schová chybu pod polem a označí pole pro čtečky obrazovky
  const showError = (field, message) => {
    const error = document.getElementById(field.getAttribute('aria-describedby'));
    error.textContent = message;
    error.hidden = !message;
    if (message) {
      field.setAttribute('aria-invalid', 'true');
    } else {
      field.removeAttribute('aria-invalid');
    }
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    let firstInvalid = null;
    fields.forEach((field) => {
      const message = validate(field);
      showError(field, message);
      if (message && !firstInvalid) firstInvalid = field;
    });

    // Při chybě přesuneme kurzor do prvního špatně vyplněného pole
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    // TODO: napojit na Formspree nebo jinou službu
    form.hidden = true;
    success.hidden = false;
    success.focus();
  });

  // Když uživatel chybu opravuje, hláška zmizí hned při psaní
  fields.forEach((field) => {
    field.addEventListener('input', () => {
      if (field.hasAttribute('aria-invalid')) showError(field, validate(field));
    });
  });
}

// Vloží aktuální rok do všech prvků s atributem data-year
function setYear() {
  const year = new Date().getFullYear();
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = year;
  });
}
