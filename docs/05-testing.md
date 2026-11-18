# 05 · Testing

**Always test at phone size as well as desktop.** Almost every problem on these sites has been phone-only.

| Size | Why |
|---|---|
| 390 × 664 | iPhone in Safari with toolbars (smallest real visible area) |
| 375 × 812 | taller phone |
| 768 × 1024 | upright tablet (uses the phone hero layout) |
| 1440 × 900 | desktop |

## Running

```bash
python3 -m http.server 5181                     # from the repo root, in another terminal
node tools/test/cdp-test.mjs "http://localhost:5181/?lang=en" 390 664 1 tools/test/test-sangeet.js
```

`cdp-test.mjs <url> <width> <height> <mobile 0|1> <test.js>` starts headless Google Chrome with a throwaway profile, emulates the screen (and touch on mobile), runs the test in the page and prints JSON. Set `SHOT=/path/x.jpg` to save a screenshot afterwards. Nothing to install (uses Node's built-in WebSocket). It also works on the live URL.

## Tests

| Test | Checks | Expected |
|---|---|---|
| `test-sangeet.js` (new) | **No wedding leaks**: forbidden words (wedding/marriage/mandap/Nadiad/venue/27 Jan/travel/train/stay, plus Gujarati લગ્ન, નડિયાદ, ૨૭ not part of ૨૦૨૭, …) in `index.html`, `app.js`, `styles.css`, the page text in EN/GU/Mix, every FAQ answer and every pop-up. **RSVP**: every RSVP link → the Google Form, `target=_blank`, `noopener`; no `data-overlay="rsvp"`; no `<form>`; the Sangeet pop-up has the RSVP link, 2 contacts and a map. Countdown days match 22 Jan 2027 18:00 IST. Fairy lights, intro notes, equalizer present; one event; 3 detail cards. | `leaks: []`, `rsvpLinks: 4`, `rsvpLinksWrong: []`, `countdownOk: true`, `pageWiderThanScreen: false` |
| `test-audit.js` | story photos (3; 18 in the full version) load and aren't cropped, faces visible in every box, cards/banners use stock art (Sangeet + hashtag pop-ups), all 3 languages render, no sideways scroll | `storyPhotos: 3`, empty `facesCut`, `bannerEmpty`, `bannerCouplePhotos` |
| `test-story.js` | frames whole, landed frames on screen, hashtags on the bottom edge, no text on photos, no dates, no caption overflow, chapter text clear of the pile | `storyPhotos: 3`, `hashtags: 2`, `chapters: 1` (full version: 18 / 9 / 4) |
| `test-length.js` | page height in screens, and each section's height | about 11.4 at 390×664, 8.9 at 1440×900 (full version: 21.2 / 19.8) |
| `test-hero.js` | the opening animation never jumps under iPhone-style resize storms; no grid overlaps on phones; faces never cut | `photoGrewWhileScrollingDown: 0`, `nameReappeared: 0`, `facesCut: []` (desktop `gridOverlaps` are the intended collage) |
| `test-welcome.js` | welcome text "come dance with…", and a wheel, swipe, ↓ key and tap each open the site | all `true` |
| `shot.js` | not a test: scrolls to a section for a screenshot. `?shot=intro|hero|story|countdown|events|rsvp|details|faq|footer|popup|popup2` | |

The main site's `test-rsvp.js` was removed (no on-site form).

**The text test can't see words inside images.** Look at any new photo yourself (docs/04).

## Last results (current version, 18 Nov 2026)

Everything is clean at 390×664 and 1440×900 in EN, GU and Mix: test-sangeet (no leaks, 4 RSVP links), test-audit (3 story photos, no faces cut), test-story, test-hero, test-welcome. **Mix at 390×664 is clean too** (the shorter paragraph clears the pile). Page length on a phone is 11.4 screens (21.2 before).

## Earlier results for the full version (branch `full`, 18 Nov 2026)

Every test is clean, with `pageErrors: []` everywhere. Story clean in EN and GU at both sizes. **Mix at 390×664** reports `chapterTextOverlapsPile`, which is the same graze as on the main site (a known open item there: the two-language chapter text is tall on short phones). Measured overlaps match the main site, so it isn't a regression.

## Pitfalls

- The site uses `scroll-behavior: smooth`, so tests must scroll with `behavior: "instant"`.
- Python's http.server caches nothing, but browsers do: bump `?v=N` after edits.
- http.server sometimes drops a connection under many requests; re-run if a resource is missing.
- In this environment, shell heredocs (`<<EOF`) can trip Claude Code's safety check. Write scripts to a file and run that.
- The Claude app's browser pane throttles animation when it's in the background. Use the headless harness for anything animated.
