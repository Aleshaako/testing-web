# Aleš Hendrych – osobní prezentace

Jednostránkový web, který představuje Aleše Hendrycha jako freelancera:
**postaví firmám web a přivede na něj zákazníky z reklamy na Facebooku a Instagramu.**

Web je zároveň výukový projekt – vznikal krok za krokem s Claude Code, Gitem a GitHubem.

## Technologie

- **HTML** – celá stránka je v souboru `index.html`
- **Tailwind CSS v4** přes CDN (bez instalace a sestavování)
- **JavaScript** bez knihoven – animace, menu, FAQ a kontrola formuláře v `js/main.js`
- Fonty **Plus Jakarta Sans** a **Inter** z Google Fonts

## Jak web spustit u sebe

1. Otevřete Terminál ve složce projektu.
2. Spusťte jednoduchý lokální server:
   ```bash
   python3 -m http.server 8000
   ```
3. V prohlížeči otevřete <http://localhost:8000>.
4. Server zastavíte v Terminálu klávesami `Ctrl + C`.

> Stačí i soubor `index.html` otevřít dvojklikem, ale přes lokální server se web chová stejně jako na internetu.

## Struktura projektu

```
index.html        – celá stránka
js/main.js        – veškerý JavaScript
css/custom.css    – animace, které nejdou udělat Tailwindem
images/           – fotky a ikony
docs/specs/       – specifikace webu
docs/plans/       – plán stavby po krocích
CLAUDE.md         – pravidla projektu pro Claude Code
```

## Dočasný obsah (nahradit před sdílením s klienty)

V kódu je označený komentářem `DOČASNÉ`.

| Co | Stav |
|---|---|
| Fotka Aleše (hero, O mně) | v hero fotka pracovního stolu, v O mně zástupná silueta |
| Text v sekci O mně | napsaný za Aleše, přepsat vlastními slovy |
| Telefon, e-mail, IČO | smyšlené (`+420 000 000 000`, `ahoj@example.com`, `00000000`) |
| Reference a citace klientů | smyšlené |
| Čísla v počítadlech (40+ webů, 2 mil. Kč, 8 let) | smyšlená |
| Otázky a odpovědi v FAQ (včetně cen) | smyšlené |
| Kontaktní formulář | není napojený, nic neodesílá |

## Plánované další kroky

- Napojit formulář (např. na Formspree)
- Přejít z Tailwind CDN na sestavení přes Tailwind CLI (rychlejší načítání)
- Vlastní doména

## Fotky

Všechny fotky jsou z [Unsplash](https://unsplash.com) a používají se podle [licence Unsplash](https://unsplash.com/license).
Děkujeme autorům:

| Soubor | Autor |
|---|---|
| `images/hero-pracovni-stul.webp` | [Olena Bohovyk](https://unsplash.com/photos/dIMJWLx1YbE) |
| `images/konzultace.webp` | [Headway](https://unsplash.com/photos/5QgIuuBxKwM) |
| `images/ref-kavarna.webp` | [ANNIE HATUANH](https://unsplash.com/photos/yy1k8ErfLYQ) |
| `images/ref-autoservis.webp` | [Mehmet Talha Onuk](https://unsplash.com/photos/8t6tk7LYLrE) |
| `images/ref-truhlarstvi.webp` | [HENG YIN](https://unsplash.com/photos/KKY0GrQPqVo) |
| `images/o-mne-stul.webp` | [ian dooley](https://unsplash.com/photos/DJ7bWa-Gwks) |
