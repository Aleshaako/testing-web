# Specifikace: Osobní prezentace – Aleš Hendrych (web + META Ads)

Datum: 2026-11-07
Stav: návrh ke schválení

## 1. Cíl a kontext

Jednostránkový web, který prezentuje Aleše jako freelancera, jenž firmám
**postaví web a přivede na něj zákazníky z reklamy na Facebooku a Instagramu**.

Web má dva cíle zároveň:
1. **Získávat nové poptávky** – návštěvník se má ozvat (telefon, e-mail, formulář).
2. **Být důvěryhodnou vizitkou** – odkaz, který Aleš pošle rozjednanému klientovi.

Web je zároveň **ukázkou Alešovy práce**: musí být velmi vizuální a působivý,
aby z něj bylo jasné, že Aleš umí dělat krásné a funkční weby.

Jde také o **výukový projekt** – Aleš se na něm učí pracovat s Claude Code,
Gitem a GitHubem. Kód má být přehledný a srozumitelný.

### Cílová skupina
Malé a střední firmy i živnostníci (servisy, obchody, řemeslníci, služby).
Netechnicky zaměření lidé, kteří chtějí výsledky (poptávky, zákazníky),
ne technologie.

### Hlavní sdělení
Web i zákazníci z reklamy od jednoho člověka. Klient nemusí koordinovat
webaře a reklamní agenturu zvlášť.

### Tón komunikace
- Lidský, srozumitelný, přátelský – **„parťák do byznysu“, ne „IT guy“**
- Žádný technický žargon (místo „responzivní“ → „funguje skvěle i na mobilu“)
- Mluvíme o přínosech pro klienta (víc poptávek, méně starostí, jistota)
- Tykání/vykání: **vykání** návštěvníkovi, ale neformální a vřelé

## 2. Technické řešení

- **HTML + Tailwind CSS + JavaScript (vanilla, bez frameworků)**
- Tailwind přes **Play CDN** (v4): `<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>`
  - Vlastní barvy a fonty definovat v `<style type="text/tailwindcss">` pomocí `@theme`
  - Poznámka: CDN je pro testování; přechod na build (Tailwind CLI) je plánovaný
    jako samostatný pozdější krok – neřešit teď
- Fonty: Google Fonts – **Plus Jakarta Sans** (nadpisy), **Inter** (text), obě s `latin-ext` (čeština)
- Hosting: **GitHub Pages** z větve `main`, kořen repozitáře
- Jazyk webu: **čeština**, `<html lang="cs">`
- Žádné externí knihovny pro animace – použít CSS transitions + `IntersectionObserver`

### Struktura souborů
```
index.html          – celá stránka
js/main.js          – animace při scrollu, menu, počítadla, FAQ, formulář
css/custom.css      – jen to, co nejde rozumně v Tailwindu (keyframes, blob animace)
images/             – obrázky (zatím jen placeholder fotky)
README.md           – popis projektu
```

## 3. Sekce stránky (v tomto pořadí)

Každá sekce má `id` pro navigaci z menu.

1. **Navigace** (`header`)
   - Vlevo jméno/logo „Aleš Hendrych“, vpravo odkazy na sekce + tlačítko „Nezávazná konzultace“
   - Sticky; po odscrollování dostane bílé poloprůhledné pozadí s rozostřením (backdrop-blur) a jemný stín
   - Mobil: hamburger menu s plynulým vysunutím

2. **Hero** (`#uvod`)
   - Velký nadpis, např. „Postavím vám web a přivedu na něj zákazníky.“
   - Podtitulek: 1–2 věty o tom, že vše zajistí jeden člověk
   - Dvě tlačítka: „Domluvit konzultaci“ (primární, akcentová barva) → `#kontakt`, „Ukázky práce“ (sekundární) → `#reference`
   - Vpravo fotka (placeholder) v zaobleném rámu + 2–3 plovoucí štítky (např. „+120 % poptávek“, „Web do 3 týdnů“) s jemnou vznášivou animací
   - Pozadí: rozmazané barevné „bloby“ (indigo/korál) s pomalou animací pohybu

3. **Problém → řešení** (`#proc`)
   - 3 typické problémy majitelů firem (např. „Web máme, ale nikdo se neozve“, „Reklamu jsme zkoušeli, nefungovala“, „Nevím, komu zavolat“)
   - Pod tím Alešova odpověď – jak to řeší propojení webu a reklamy

4. **Služby** (`#sluzby`)
   - Nadpis zdůrazňující „vše od jednoho člověka“
   - Bento grid (různě velké dlaždice): Weby na WordPressu, Reklama na Facebooku a Instagramu, + 1–2 menší dlaždice (např. „Průběžná péče“, „Měření výsledků“)
   - Každá dlaždice: ikona (inline SVG), krátký popis přínosu, mini-ilustrace v CSS (náznak webu / grafu)
   - Pás s animovanými počítadly (smyšlená čísla), např. „40+ webů“, „2 mil. Kč spravovaných v reklamě“, „8 let zkušeností“

5. **Jak spolupracujeme** (`#spoluprace`)
   - 4 kroky: Konzultace → Návrh → Spuštění → Průběžná péče
   - Číslované, propojené linkou (na mobilu svisle, na desktopu vodorovně)

6. **Reference** (`#reference`)
   - 3 **smyšlené** ukázky (typ firmy, krátký popis, výsledek – např. „+85 % poptávek za 3 měsíce“)
   - Náhledy v rámečku prohlížeče / telefonu s jemným náklonem a hover efektem
   - Náhledy webů jsou **abstraktní, vytvořené v CSS** (bloky, pruhy, barvy) – žádné cizí screenshoty
   - 2–3 smyšlené citace klientů (jméno + typ firmy, bez reálných firem)
   - V kódu označit komentářem `<!-- DOČASNÉ: smyšlené reference, nahradit skutečnými -->`

7. **FAQ** (`#faq`)
   - 5 smyšlených otázek s odpověďmi, např.:
     - Kolik stojí web?
     - Jak dlouho trvá, než web spustíme?
     - Potřebuji k reklamě i nový web?
     - Kolik musím investovat do reklamy?
     - Budu si moct web upravovat sám?
   - Akordeon (rozbalovací) s plynulou animací výšky; ovladatelný i klávesnicí (`<details>/<summary>` nebo tlačítka s `aria-expanded`)

8. **O mně** (`#o-mne`)
   - Fotka (placeholder) + pár lidských vět: kdo je Aleš, proč to dělá, jak pracuje
   - Důraz na přístup „parťáka“

9. **Kontakt** (`#kontakt`)
   - Tmavé pozadí (vizuální „finále“ stránky)
   - Vlevo: výzva + klikací telefon (`tel:`), e-mail (`mailto:`) – zatím placeholder údaje
   - Vpravo formulář: jméno, e-mail, telefon (nepovinný), zpráva, tlačítko „Odeslat“
   - **Formulář není napojený** („mrtvý form“): JS zachytí odeslání, provede validaci (povinná pole, formát e-mailu), zobrazí chybové hlášky u polí a po úspěchu hlášku „Děkujeme, ozvu se vám do 24 hodin.“ Nic se nikam neodesílá.
   - V kódu komentář `// TODO: napojit na Formspree nebo jinou službu`

10. **Patička** (`footer`)
    - Jméno, kontakty, IČO (placeholder), © aktuální rok (doplnit JS)

## 4. Vizuální design

### Barvy (definovat jako Tailwind theme proměnné)
- Pozadí: bílá + velmi světle šedá pro střídání sekcí
- Text: téměř černá (např. slate-900), sekundární text šedá
- **Primární: sytá indigová / tmavě modrá** – důvěra, profesionalita
- **Akcent: teplá korálová / oranžová** – jen tlačítka a důležité detaily
- Jemné gradienty (indigo → fialová → korál) v hero a detailech

### Typografie
- Nadpisy: Plus Jakarta Sans, tučné, velké; hero nadpis opravdu výrazný (na desktopu cca 4.5–6rem)
- Text: Inter, základ 16–18px, vzdušné řádkování
- Plynulé škálování velikostí (`clamp()`) mezi mobilem a desktopem

### Celkový dojem
- Čistý, profesionální, moderní, hodně prostoru
- **Velmi vizuální a působivý** – web je ukázkou Alešovy práce
- Zaoblené rohy (velké radiusy na kartách), měkké stíny
- Konzistentní rozestupy mezi sekcemi

## 5. Animace a interakce

- **Scroll reveal:** prvky jemně najedou zespodu a zprůhlední se do plné viditelnosti při vstupu do viewportu (`IntersectionObserver`); karty v mřížce postupně s krátkým zpožděním
- **Počítadla:** čísla se rozběhnou od 0 při doscrollování (jednou)
- **Hover:** karty se nadzvednou + výraznější stín; tlačítka změní barvu / lehce se zvětší
- **Hero bloby:** pomalý nekonečný pohyb (CSS keyframes)
- **Plovoucí štítky v hero:** jemné vznášení
- **Smooth scroll** na kotvy z menu (s odsazením kvůli sticky navigaci – `scroll-margin-top`)
- **Přístupnost:** při `prefers-reduced-motion: reduce` se všechny animace vypnou a obsah je rovnou viditelný
- Obsah musí být viditelný i bez JavaScriptu (skrytí pro animaci přidávat až JS-em)

## 6. Responzivita

- Mobile-first
- Breakpointy podle Tailwindu (sm / md / lg / xl)
- Otestovat šířky: 375px (mobil), 768px (tablet), 1440px (desktop)
- Na mobilu žádné vodorovné scrollování

## 7. Přístupnost a kvalita

- Sémantické HTML (`header`, `nav`, `main`, `section`, `footer`), jeden `h1`
- Dostatečný kontrast textu (WCAG AA)
- Všechny interaktivní prvky ovladatelné klávesnicí, viditelný focus
- Obrázky s `alt`, formulářová pole s `label`
- Meta tagy: `title`, `description`, Open Graph (název, popis), favicon (jednoduchý SVG s iniciálami)

## 8. Placeholder obsah (nahradit později)

| Co | Stav |
|---|---|
| Fotka Aleše | placeholder |
| Telefon, e-mail, IČO | placeholder |
| Reference a citace | smyšlené |
| Čísla v počítadlech | smyšlená |
| FAQ | smyšlené |
| Formulář | nenapojený |

## 9. Hotovo znamená

- Web se korektně zobrazuje na mobilu, tabletu i desktopu
- Všechny odkazy v menu fungují, animace jsou plynulé, reduced-motion respektováno
- Formulář validuje a zobrazí poděkování
- Žádné chyby v konzoli prohlížeče
- Kód je commitnutý v Gitu a web je zveřejněný na GitHub Pages

## 10. Mimo rozsah (teď neřešit)

- Napojení formuláře
- Vlastní doména
- Přechod Tailwindu z CDN na build
- Více jazyků, blog, další podstránky
- Analytika / cookies lišta
