# Plán stavby: Osobní prezentace – Aleš Hendrych

> **Pro Claude Code:** Prováděj plán **jeden Task po druhém**. Po každém Tasku ukaž výsledek,
> vysvětli, co jsi udělal, udělej commit a **počkej na pokyn** k dalšímu Tasku.
> Kroky jsou zaškrtávací (`- [ ]`) – po dokončení je odškrtni.

**Cíl:** Jednostránkový, velmi vizuální web s osobní prezentací (weby + META Ads), zveřejněný na GitHub Pages.

**Architektura:** Jeden `index.html` se sekcemi, stylování Tailwind třídami přímo v HTML, vlastní
barvy/fonty přes `@theme`. Veškerý JS v `js/main.js` rozdělený do malých funkcí `init…()`, které se
volají po načtení stránky. Animace řízené data-atributy v HTML.

**Technologie:** HTML, Tailwind CSS v4 (Play CDN), vanilla JavaScript, Google Fonts.

**Specifikace:** `docs/specs/2026-11-07-osobni-prezentace-design.md` – čti ji spolu s tímto plánem.

## Globální pravidla

- Tailwind: `<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>`, theme v `<style type="text/tailwindcss">`
- Fonty: Plus Jakarta Sans (nadpisy), Inter (text), s `latin-ext`
- `<html lang="cs">`, texty česky, **vykání**, tón „parťák do byznysu“, bez IT žargonu
- Mobile-first; bez vodorovného scrollování; kontrola na 375 / 768 / 1440 px
- Žádné animační knihovny – CSS + `IntersectionObserver`
- Obsah viditelný i bez JS; `prefers-reduced-motion` vypíná animace
- Commity česky, rozkazovací způsob, jeden Task = jeden commit
- **Push na GitHub jen po potvrzení uživatele**

## Jak se kontroluje („test“) u statického webu

Místo automatických testů kontrolujeme v prohlížeči:
1. Spusť lokální server: `python3 -m http.server 8000` a otevři `http://localhost:8000`
2. Vývojářské nástroje (Cmd+Option+I) → **Console**: žádné červené chyby
3. Režim zobrazení zařízení (Cmd+Shift+M) → šířky **375, 768, 1440 px**
4. Kontrolní body uvedené u každého Tasku

## Na co si dát pozor (Review Focus)

1. **Vypnutý JavaScript** → veškerý obsah musí být vidět (reveal skrývá prvky jen když `<html>` má třídu `js`). Ověřit v Tasku 1 a 10.
2. **Sticky navigace překrývá nadpisy** po kliknutí na odkaz → `scroll-margin-top` na sekcích. Ověřit v Tasku 2.
3. **Mobilní menu** → po kliknutí na odkaz se zavře, zavře se i klávesou Esc, `aria-expanded` odpovídá stavu. Ověřit v Tasku 2.
4. **Formulář** → pole jen z mezer = prázdné; neplatný e-mail ukáže chybu u pole; opakované kliknutí na Odeslat nezpůsobí chybu. Ověřit v Tasku 9.
5. **Úzký displej 320 px a dlouhá česká slova v nadpisech** → nic nepřetéká do strany. Ověřit v Tasku 11.

## Rozhraní (názvy, které se používají napříč Tasky)

**Theme proměnné (Task 1):** `--color-primary-50…900` (indigo), `--color-accent-400/500/600` (korál),
`--font-display` (Plus Jakarta Sans), `--font-sans` (Inter) → třídy `bg-primary-600`, `text-accent-500`, `font-display`…

**Data-atributy:**
- `data-reveal` – prvek najede při scrollu; `data-reveal-delay="100"` – zpoždění v ms
- `data-counter="40"` + volitelně `data-counter-suffix="+"` – animované počítadlo
- `data-year` – sem se vloží aktuální rok

**Funkce v `js/main.js`** (každá se volá z `DOMContentLoaded`):
`initNav()`, `initReveal()`, `initCounters()`, `initFaq()`, `initContactForm()`, `setYear()`

**ID sekcí:** `uvod`, `proc`, `sluzby`, `spoluprace`, `reference`, `faq`, `o-mne`, `kontakt`

---

### Task 1: Kostra stránky

**Soubory:** vytvořit `index.html`, `js/main.js`, `css/custom.css`, `images/favicon.svg`, `images/foto-placeholder.svg`

- [x] `index.html`: `<head>` s meta (charset, viewport, title, description, Open Graph title/description), favicon, Google Fonts, Tailwind CDN, `@theme` s proměnnými z bloku Rozhraní, odkaz na `css/custom.css`, `js/main.js` s `defer`
- [x] Inline skript v `<head>`: `document.documentElement.classList.add('js')`
- [x] `<body>`: `header`, `main` s prázdnými `<section>` se všemi ID (jen nadpis h2), `footer` s `<span data-year>`
- [x] `favicon.svg`: iniciály „AH“ v primární barvě; `foto-placeholder.svg`: neutrální silueta / gradient
- [x] `main.js`: kostra s prázdnými `init…()` funkcemi, `setYear()` hotová
- [x] **Kontrola:** stránka se načte, žádné chyby v Console, nadpisy v Plus Jakarta Sans, „ř ů ě“ se zobrazují správně, v patičce je 2026
- [x] **Commit:** `Založ kostru stránky s Tailwindem a fonty`

### Task 2: Navigace

**Soubory:** `index.html` (header), `js/main.js` (`initNav`)

- [x] Desktop: jméno vlevo, odkazy na sekce, tlačítko „Nezávazná konzultace“ (akcent) → `#kontakt`
- [x] Sticky; po odscrollování > 20 px třída se `bg-white/80 backdrop-blur` a stínem
- [x] Mobil (< `md`): hamburger tlačítko s `aria-expanded` a `aria-controls`, plynulé vysunutí menu, zavření po kliku na odkaz a klávesou Esc
- [x] `html { scroll-behavior: smooth }` (jen bez reduced-motion) a `scroll-margin-top` na sekcích
- [x] **Kontrola:** body 2 a 3 z Review Focus; menu ovladatelné klávesnicí (Tab, Enter)
- [x] **Commit:** `Přidej navigaci s mobilním menu`

### Task 3: Hero

**Soubory:** `index.html` (`#uvod`), `css/custom.css` (bloby, vznášení)

- [x] `h1` „Postavím vám web a přivedu na něj zákazníky.“ – velikost přes `clamp()` (cca 2.5rem mobil → 5.5rem desktop)
- [x] Podtitulek, 2 tlačítka (primární akcent → `#kontakt`, sekundární → `#reference`)
- [x] Fotka v zaobleném rámu + 2–3 plovoucí štítky („+120 % poptávek“, „Web do 3 týdnů“)
- [x] Pozadí: 2–3 rozmazané bloby (indigo, fialová, korál), keyframes pomalý pohyb; štítky jemné vznášení
- [x] **Kontrola:** na 375 px je fotka pod textem a nic nepřetéká; působí to „wow“
- [x] **Commit:** `Přidej hero sekci s animovaným pozadím`

### Task 4: Problém → řešení + Služby

**Soubory:** `index.html` (`#proc`, `#sluzby`), `js/main.js` (`initCounters`)

- [ ] `#proc`: 3 karty s problémy + blok s odpovědí (texty dle specifikace, lidský tón)
- [ ] `#sluzby`: nadpis „vše od jednoho člověka“, bento grid (2 velké dlaždice: Weby, Reklama; 2 menší: Průběžná péče, Měření výsledků), inline SVG ikony, CSS mini-ilustrace (náznak webu, sloupcový graf)
- [ ] Pás počítadel: `data-counter="40" data-counter-suffix="+"` (weby), 2 mil. Kč (reklama), 8 let
- [ ] `initCounters()`: při vstupu do viewportu napočítá 0 → cíl za ~1,5 s (jen jednou); při reduced-motion rovnou cílová hodnota; bez JS je v HTML vidět cílová hodnota
- [ ] **Kontrola:** bento se na mobilu skládá pod sebe; počítadla běží jen jednou
- [ ] **Commit:** `Přidej sekce Problém a Služby s počítadly`

### Task 5: Jak spolupracujeme

**Soubory:** `index.html` (`#spoluprace`)

- [ ] 4 kroky: Konzultace → Návrh → Spuštění → Průběžná péče; číslo, název, 1–2 věty
- [ ] Spojovací linka: svisle na mobilu, vodorovně od `lg`
- [ ] **Kontrola:** čitelné na všech šířkách
- [ ] **Commit:** `Přidej sekci Jak spolupracujeme`

### Task 6: Reference

**Soubory:** `index.html` (`#reference`)

- [ ] Komentář `<!-- DOČASNÉ: smyšlené reference, nahradit skutečnými -->`
- [ ] 3 ukázky: rámeček prohlížeče (2×) / telefonu (1×) s abstraktním náhledem webu v CSS, typ firmy, popis, výsledek; jemný náklon, hover narovná a zvedne
- [ ] 2–3 citace klientů (smyšlená jména, typ firmy)
- [ ] **Kontrola:** žádné reálné firmy; hover plynulý
- [ ] **Commit:** `Přidej sekci Reference`

### Task 7: FAQ

**Soubory:** `index.html` (`#faq`), `js/main.js` (`initFaq`)

- [ ] 5 otázek ze specifikace; tlačítka s `aria-expanded` + panely s odpověďmi
- [ ] `initFaq()`: přepíná otevření s plynulou animací výšky; bez JS jsou odpovědi vidět
- [ ] **Kontrola:** ovládání klávesnicí, šipka/ikona se otáčí
- [ ] **Commit:** `Přidej FAQ s rozbalovacími odpověďmi`

### Task 8: O mně

**Soubory:** `index.html` (`#o-mne`)

- [ ] Fotka (placeholder) + 3–4 lidské věty o Alešovi a přístupu „parťáka“
- [ ] **Commit:** `Přidej sekci O mně`

### Task 9: Kontakt + formulář

**Soubory:** `index.html` (`#kontakt`), `js/main.js` (`initContactForm`)

- [ ] Tmavé pozadí; vlevo výzva + `tel:` a `mailto:` (placeholder údaje), vpravo formulář: jméno*, e-mail*, telefon, zpráva*; `label` u všech polí; `novalidate` na formuláři
- [ ] `initContactForm()`: při odeslání `preventDefault`; ořízne mezery; povinná pole neprázdná; e-mail odpovídá `^[^\s@]+@[^\s@]+\.[^\s@]+$`; chyba se zobrazí pod polem (`aria-invalid`, `aria-describedby`); při úspěchu formulář nahradí hláška „Děkujeme, ozvu se vám do 24 hodin.“
- [ ] Komentář `// TODO: napojit na Formspree nebo jinou službu`
- [ ] Patička: jméno, telefon, e-mail, IČO (placeholder), © `<span data-year>`
- [ ] **Kontrola:** bod 4 z Review Focus; nic se neodesílá (záložka Network)
- [ ] **Commit:** `Přidej kontaktní sekci s formulářem a patičku`

### Task 10: Animace při scrollování

**Soubory:** `index.html` (doplnit `data-reveal`), `css/custom.css`, `js/main.js` (`initReveal`)

- [ ] CSS: `.js [data-reveal]` skryté (průhlednost 0, posun 24 px dolů), `.is-visible` plně viditelné, přechod ~0,7 s
- [ ] `initReveal()`: `IntersectionObserver` přidá `is-visible` a přestane prvek sledovat; respektuje `data-reveal-delay`
- [ ] `@media (prefers-reduced-motion: reduce)`: vše viditelné, bez animací (reveal, bloby, štítky, smooth scroll)
- [ ] Doplnit `data-reveal` na nadpisy sekcí a karty (postupné zpoždění 0/100/200 ms)
- [ ] **Kontrola:** bod 1 z Review Focus (vypnout JS v DevTools → vše vidět); reduced-motion emulace v DevTools → žádný pohyb
- [ ] **Commit:** `Přidej plynulé animace při scrollování`

### Task 11: Závěrečná kontrola + README

**Soubory:** `README.md`, opravy kdekoli

- [ ] Projít web na 320 / 375 / 768 / 1440 px (bod 5 Review Focus)
- [ ] Lighthouse v Chrome DevTools (Accessibility, Best Practices, SEO) – opravit nálezy
- [ ] Console bez chyb
- [ ] `README.md`: co projekt je, jak ho spustit lokálně, seznam dočasného obsahu (tabulka ze specifikace)
- [ ] **Commit:** `Doplň README a oprav nálezy z kontroly`

### Task 12: Zveřejnění na GitHubu

- [ ] **Zeptat se uživatele na souhlas** s vytvořením veřejného repozitáře a pushem
- [ ] `gh repo create github-testing --public --source=. --push`
- [ ] Zapnout GitHub Pages: `gh api repos/{owner}/github-testing/pages -X POST -f "source[branch]=main" -f "source[path]=/"`
- [ ] Počkat 1–2 minuty, ověřit `https://<uživatel>.github.io/github-testing/` (CSS, JS, obrázky se načítají – relativní cesty)
- [ ] Vysvětlit uživateli: repozitář, push, GitHub Pages, jak se web aktualizuje (commit + push = nová verze online)
