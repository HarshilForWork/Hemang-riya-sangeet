# 02 · Architecture

A static site: `index.html` + `styles.css` + `app.js` + photos in `assets/`. No framework, no build step, no dependencies. Vercel serves the folder as-is. The code is a copy of the main site's (commit `d359100`), with Sangeet-only content and a few additions. Shared code is **not** linked: fix a bug in one site and you have to copy the fix to the other by hand.

## Files

```
index.html          page skeleton; every text element has data-i18n="key" (filled from app.js)
styles.css          all styling; phone rules under @media (max-width: 767px); Gujarati under html[lang="gu"];
                    Sangeet additions in the last block, "SANGEET TOUCHES"
app.js              one IIFE: content constants at the top, then behaviour, then applyLang() starts everything
assets/rh/N.jpg     the couple's photos (23), named by their number in the original folder (docs/04)
assets/stock/       stock photos for the event card, detail cards and pop-up banners (docs/04)
vercel.json         caching for /assets, noindex + security headers
robots.txt          Disallow all
.vercelignore       keeps docs/, tools/, *.md and .claude/ out of the deployment
tools/photos/       photo straightening + face detection scripts (macOS)
tools/test/         headless-Chrome harness and test scripts (docs/05)
```

## app.js, top to bottom

| Block | What it holds |
|---|---|
| Content constants | `RSVP_FORM` (Google Form URL), `UI` (page text, en/gu), `ACCENT` (Gujarati lines for Mix), `PHOTOS` (size + face box per photo), `STORY`, `ROTATIONS`, `CONTACTS`, `CARDS`, `OVERLAYS`, `FAQ`, `COUNTDOWN_TARGET` |
| Viewport probes | `VH()` = 100svh, `VHL()` = 100lvh (never use `window.innerHeight`; see the main site's docs/07) |
| Photo placement | `placeFocus(img, n, boxW, boxH)`, `applyFocus(root)`: face-aware cover with a blurred fill, never cutting a face |
| Language state | `lang` (`en`/`gu`/`mix`), `tl()`, `mix()`, `T(key)`, `num()` (Gujarati digits) |
| Intro | `splitIntro()`, `enter()`, plus wheel/swipe/key/tap listeners |
| Hero | `measureName()`, `phoneLayout()`, `layoutGallery()`, `renderHero(target)`. **Never reset `heroP`** |
| Words / Story | `splitWords()`, `renderWords()`, `buildStory()`, `layoutStory()`, `renderStory()` |
| Main loop | `frame()` on scroll + rAF; the resize handler re-lays out only when the width or a stable height changes |
| Reveal, countdown | IntersectionObserver for `[data-reveal]`; `tick()` counts down to `COUNTDOWN_TARGET` |
| **Sangeet sparkle** | `FESTIVE` colours, `NOTE_GLYPHS`, `BULBS`; `buildLights()` draws fairy-light garlands into every `[data-lights]` element (rebuilt when its width changes); the floating notes in `#introNotes` |
| Confetti | canvas in the countdown section: dots, strips and ♪/♫ notes in `FESTIVE` colours |
| Details grid | `CARD_ART`, `ART_POS`, `artMedia()`, `buildGrid()`. A card with `href` renders as an `<a>` (new tab, ↗ icon); the others are buttons opening `OVERLAYS[id]` |
| FAQ | `buildFaq()` |
| Pop-up sheet | `openSheet(id)`, `closeSheet()`, `renderSheet()`: banner, title, description, sections, map (`o.map`), contacts + RSVP link (`o.contacts`) |
| Click on `[data-overlay]` | opens the pop-up; `data-overlay="rsvp"` or an unknown id opens the Google Form instead (a safety net) |
| Lightbox, language switcher `applyLang()`, click notes | |
| Start | sets every `a[data-rsvp]` href to `RSVP_FORM` (new tab), then `applyLang()` |

`applyLang()` is the single re-render entry point: it fills `[data-i18n]` and `[data-accent]`, re-splits the animated texts, rebuilds the story, grid and FAQ, re-renders an open pop-up and re-measures the hero name.

## RSVP

There is **no on-site form**. RSVP controls are plain links (`<a data-rsvp href=…form… target="_blank" rel="noopener">`): the nav button, the invite card, the RSVP callout, the RSVP detail card (`CARDS[].href`) and the button in the Sangeet pop-up. To change the form, edit `RSVP_FORM` in app.js. The hrefs in index.html are only a no-JS fallback (update them too if you can).

## Sangeet touches (CSS, end of styles.css)

- `.lights` / `.lights--dark` (dark backgrounds): the wire is an SVG path, the bulbs are `<i>`s with `--c` (colour) and `--r` (tilt), and they twinkle with a `twinkle` animation. Used on the welcome screen, the top of the countdown section and the footer frame.
- `.intro__notes span`: notes rising up the welcome screen (`noteUp`).
- `.ev--solo`: the single invite card (photo and text side by side on desktop, stacked and centred on phones); `.ev__tagline`, `.ev__shoes` are in Caveat (Hind Vadodara in Gujarati).
- `.eq`: the five-bar equalizer next to the time.
- Accent colours `--marigold`, `--rose`, `--glow` sit on top of the calm main palette (cream #fbf6ec-ish, ink, brown #8a5a2b, dark warm #2a2421).
- With `prefers-reduced-motion`, the lights, notes and equalizer stop.

## Caching

`index.html` loads `styles.css?v=N` and `app.js?v=N` (now `v=1` and `v=2`). Bump N whenever either file changes.
