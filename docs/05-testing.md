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
python tools/serve.py 5181                      # in another terminal (plain http.server can't serve /riya)
node tools/test/cdp-test.mjs "http://localhost:5181/?lang=en" 390 664 1 tools/test/test-sangeet.js
node tools/test/cdp-test.mjs "http://localhost:5181/riya?lang=en" 390 664 1 tools/test/test-sangeet.js
```

**Test both links**: `/` (with RSVP) and `/riya` (Riya's link, no RSVP). The other tests run on either.

`cdp-test.mjs <url> <width> <height> <mobile 0|1> <test.js>` starts headless Google Chrome with a throwaway profile, emulates the screen (and touch on mobile), runs the test in the page and prints JSON. Set `SHOT=/path/x.jpg` to save a screenshot afterwards. Nothing to install (uses Node's built-in WebSocket). It also works on the live URL.

## Tests

| Test | Checks | Expected |
|---|---|---|
| `test-sangeet.js` (new) | **No wedding leaks**: forbidden words (wedding/marriage/mandap/Nadiad/venue/27 Jan/travel/train/stay, plus Gujarati લગ્ન, નડિયાદ, ૨૭ not part of ૨૦૨૭, …) in `index.html`, `app.js`, `styles.css`, the page text in EN/GU/Mix, every FAQ answer and every pop-up. **RSVP**: every RSVP link → the Google Form, `target=_blank`, `noopener`; no `data-overlay="rsvp"`; no `<form>`; the Sangeet pop-up has the RSVP link, 2 contacts and a map. Countdown days match 22 Jan 2027 18:00 IST. Fairy lights, intro notes, equalizer present; one event; 3 detail cards. It reads the form URL from `RSVP_FORM` in app.js, and `formSharedWithMainSite` flags the main site's (wedding) form. **On `/riya`** it also looks for any RSVP word or form link (`rsvp`, `હાજરી`, Google Forms) on the page and in every pop-up, in all 3 languages. | `/`: `leaks: []`, `rsvpLinks: 4`, `rsvpLinksWrong: []`, `faqQuestions: 4`, `formSharedWithMainSite: false`, `countdownOk: true`, `pageWiderThanScreen: false`. `/riya`: `leaks: []`, `rsvpMentions: []`, `rsvpLinks: 0`, `rsvpSection: false`, `faqQuestions: 3`, `sangeetPopup.rsvpLink: false` with 2 contacts and a map, 2 detail cards |
| `test-sangeet.js`, contacts (19 Nov 2026) | in EN, GU and Mix: the Sangeet pop-up's contacts and the FAQ link, and that neither link shows the other family's names or numbers anywhere (page, pop-up, links) | `/riya`: Mr. Dharmesh Kumar Raval, Kunj Raval, FAQ link → `tel:+919998870158`; `/`: Hemang, Harsh → `tel:+919769333516`; `wrongContacts: []` |
| `test-audit.js` | story photos (3; 18 in the full version) load and aren't cropped, faces visible in every box, cards/banners use stock art (Sangeet + hashtag pop-ups), all 3 languages render, no sideways scroll | `storyPhotos: 3`, empty `facesCut`, `bannerEmpty`, `bannerCouplePhotos` |
| `test-story.js` | frames whole, landed frames on screen, hashtags on the bottom edge, no text on photos, no dates, no caption overflow, chapter text clear of the pile | `storyPhotos: 3`, `hashtags: 2`, `chapters: 1` (full version: 18 / 9 / 4) |
| `test-length.js` | page height in screens, and each section's height | about 11.6 at 390×664, 8.9 at 1440×900; `/riya` 10.3 at 390×664 (full version: 21.2 / 19.8) |
| `test-hero.js` | the opening animation never jumps under iPhone-style resize storms; no grid overlaps on phones; faces never cut | `photoGrewWhileScrollingDown: 0`, `nameReappeared: 0`, `facesCut: []` (desktop `gridOverlaps` are the intended collage) |
| `test-welcome.js` | welcome text "come dance with…", and a wheel, swipe, ↓ key and tap each open the site | all `true` |
| `shot.js` | not a test: scrolls to a section for a screenshot. `?shot=intro|hero|story|countdown|events|rsvp|details|faq|footer|popup|popup2` | |

The main site's `test-rsvp.js` was removed (no on-site form).

**test-audit sometimes fails with `Cannot read properties of null (reading 'click')`** (about 1 run in 5 on `/riya?lang=gu` at 390×664, before and after the contacts change): it clicks a detail card while the language switch is still rebuilding the grid. Run it again; a clean run is valid.

**The text test can't see words inside images.** Look at any new photo yourself (docs/04).

**test-sangeet skips the live countdown digits** when it reads the page (19 Nov 2026). Without that, "27 minutes left" (or 27 days, on 26 Dec) shows as ૨૭ in Gujarati and was flagged as the wedding date. Checked both ways: with the countdown forced to 27 days 3 h 27 min 27 s there are no leaks, and a planted "૨૭ જાન્યુઆરી" is still caught in EN, GU and Mix.

## Last results (two links, 19 Nov 2026, Windows)

Both `/` and `/riya` clean at 390×664 and 1440×900: test-sangeet (no leaks; `/` has 4 RSVP links, all correct; `/riya` has 0 RSVP links and no RSVP words in EN, GU, Mix or any pop-up), test-audit (3 photos, no faces cut; `/riya` also in GU), test-story (`/riya` also in Mix: clean), test-hero at 1440×900, `pageErrors: []` everywhere. After the Sangeet-only form went in (app.js `v=6`): test-sangeet clean on `/` and `/riya` at 390×664 and 1440×900 and in GU, all 4 RSVP links on `/` open the new form, `formSharedWithMainSite: false`; test-audit clean on both. On Windows the harness sometimes prints its result and then fails to delete Chrome's temporary profile (`EPERM`); the result printed before the error is valid.

After the contacts change (app.js `v=7`, 19 Nov 2026): test-sangeet clean on `/riya` (390×664 EN, 1440×900 GU) and `/` (390×664 EN, 1440×900 GU): no leaks, `/riya` shows Dharmesh and Kunj Raval in EN, GU and Mix with no Hemang or Harsh numbers, `/` unchanged; test-audit clean on `/riya` EN and GU (after a re-run, see above); test-hero clean at 1440×900. Screenshots of the `/riya` pop-up (GU 390, EN 1440) and FAQ link checked by eye.

After the name change to "Mr. Dharmesh Kumar Raval" (app.js `v=8`, 19 Nov 2026): test-sangeet clean on `/riya` (390×664 EN, 1440×900 GU) and `/` (390×664 EN), `wrongContacts: []`; the longer name wraps to two lines in the pop-up card at 390 (fine) and fits in Gujarati; FAQ link checked at 390 and 1440.

## Earlier results (18 Nov 2026)

Everything is clean at 390×664 and 1440×900 in EN, GU and Mix: test-sangeet (no leaks, 4 RSVP links), test-audit (3 story photos, no faces cut), test-story, test-hero, test-welcome. **Mix at 390×664 is clean too** (the shorter paragraph clears the pile). Page length on a phone is 11.4 screens (21.2 before).

## Earlier results for the full version (branch `full`, 18 Nov 2026)

Every test is clean, with `pageErrors: []` everywhere. Story clean in EN and GU at both sizes. **Mix at 390×664** reports `chapterTextOverlapsPile`, which is the same graze as on the main site (a known open item there: the two-language chapter text is tall on short phones). Measured overlaps match the main site, so it isn't a regression.

## Pitfalls

- The site uses `scroll-behavior: smooth`, so tests must scroll with `behavior: "instant"`.
- Python's http.server caches nothing, but browsers do: bump `?v=N` after edits.
- http.server sometimes drops a connection under many requests; re-run if a resource is missing.
- In this environment, shell heredocs (`<<EOF`) can trip Claude Code's safety check. Write scripts to a file and run that.
- The Claude app's browser pane throttles animation when it's in the background. Use the headless harness for anything animated.
