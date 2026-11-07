# CLAUDE.md – pravidla projektu

Jednostránkový web – osobní prezentace Aleše Rydla (weby + reklama na Facebooku a Instagramu).
Podrobná specifikace: `docs/specs/2026-11-07-osobni-prezentace-design.md` – **vždy z ní vycházej**.
Pokud se něco se specifikací nekryje, zeptej se, nedomýšlej.

## Technologie

- **HTML + Tailwind CSS (Play CDN v4) + vanilla JavaScript** – žádné frameworky, žádný build, žádné npm balíčky
- Tailwind: `<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>`,
  vlastní barvy a fonty v `<style type="text/tailwindcss">` přes `@theme`
- Fonty z Google Fonts: Plus Jakarta Sans (nadpisy), Inter (text), s `latin-ext`
- Animace jen CSS transitions/keyframes + `IntersectionObserver` – žádné animační knihovny
- Hosting: GitHub Pages z větve `main`, kořen repozitáře

## Struktura souborů

```
index.html       – celá stránka
js/main.js       – veškerý JavaScript
css/custom.css   – jen to, co nejde rozumně v Tailwindu (keyframes, bloby)
images/          – obrázky
docs/specs/      – specifikace
```

## Pravidla kódu

- **Čeština**: obsah webu (`<html lang="cs">`), komentáře v kódu, commity
- **Mobile-first**: základní styly pro mobil, větší obrazovky přes `sm:` / `md:` / `lg:` / `xl:`;
  na mobilu nikdy vodorovné scrollování; testovat 375 / 768 / 1440 px
- Sémantické HTML, jeden `h1`, `alt` u obrázků, `label` u polí, ovládání klávesnicí, viditelný focus
- Respektovat `prefers-reduced-motion`; obsah musí být viditelný i bez JavaScriptu
- Tón textů: lidský, bez technického žargonu, vykání
- Kód má být přehledný a srozumitelný pro začátečníka – raději jednodušší řešení než chytré

## Pravidla spolupráce

Uživatel je začátečník a učí se Git, GitHub a tvorbu webů.

1. **Před větší změnou plán ke schválení.** Větší změna = nová sekce, více souborů, změna struktury
   nebo cokoli mimo specifikaci. Napiš krátký plán a počkej na souhlas. Drobné opravy můžeš udělat rovnou.
2. **Po každém dokončeném kroku commit s českým popisem.** Krátký, výstižný popis v rozkazovacím
   způsobu, např. `Přidej sekci Služby s bento gridem`. Jeden commit = jeden logický krok.
3. **Push jen po výslovném potvrzení.** Nikdy nepushuj na GitHub sám od sebe – vždy se nejdřív zeptej.
4. **Vše stručně vysvětluj.** Po každém kroku v pár větách řekni, co jsi udělal a proč,
   a vysvětli použité Git příkazy a pojmy jednoduše, bez žargonu.
