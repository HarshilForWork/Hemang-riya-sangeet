# CONTEXT — Sangeet-only site (start here)

A second, **Sangeet-only** invite for Riya & Hemang, for guests invited to the Sangeet but **not** the wedding. Static HTML/CSS/JS, no build step, copied from the main site (`site/`, repo `HarshilForWork/Hemang-riya`, commit `d359100`) on 18 Nov 2026. Repo: `HarshilForWork/Hemang-riya-sangeet` (**private**, branch `main`, remote `git@github-personal:…`, commit as `HarshilForwork` via the repo's local git config, as on the main site). To deploy, import it as a second Vercel project: framework preset **Other**, no build command, output directory = repo root.

```bash
cd sangeet-site && python3 -m http.server 5181      # then open http://localhost:5181/?lang=en  (or gu / mix)
```

The code works exactly like the main site. Read the main site's `CONTEXT.md` and `docs/02–05` for the architecture, photo rules and test harness. This file only lists what is different.

## The one rule that matters most here

**Nothing may mention the wedding**: no word "wedding", Nadiad, the 27 January date, the venue, trains, travel or stay. This applies to every language, every pop-up and FAQ answer, and also to the **served code and comments** (`index.html`, `app.js`, `styles.css`), because guests can view source. It also applies to **text inside photos** (the main site's RSVP stock photo said "WEDDING PARTY", so it was swapped). `tools/test/test-sangeet.js` checks all the text. Check new photos by eye.

## Event details

- **Sangeet**: Friday, 22 January 2027, 6:00 PM onwards
- **Venue**: Bhanushali Wadi, Basveshewar Maharaj Marg, Nerul East, Sector 19A, Nerul, Navi Mumbai, Maharashtra 400706 (map in the Sangeet pop-up)
- **Contacts**: Hemang +91 97693 33516 and Harsh +91 83698 94213 (`CONTACTS`, same as the main site)
- **Countdown**: `COUNTDOWN_TARGET` = 22 Jan 2027 18:00 IST, "until the sangeet"
- **RSVP**: every RSVP button is a link to the Google Form in `RSVP_FORM` (top of `app.js`) and opens in a new tab. On start, `app.js` copies that URL onto every `a[data-rsvp]`, so the URL only needs changing in one place. There is no on-site form. It is currently **the same form as the main site**, so the couple may want a separate Sangeet form.

## What changed from the main site

| Area | Main site | Sangeet site |
|---|---|---|
| Welcome screen | "welcome to the story of…" | "come dance with…" (+ "scroll to begin"), fairy lights, floating music notes |
| Nav | Sangeet · Wedding · FAQ · RSVP | Sangeet · FAQ · RSVP (RSVP is a link to the form) |
| Hero | photos 37 + 68/52/54/5 | unchanged |
| Story | 5 chapters, 30 photos, 13 hashtags | 4 chapters, 18 photos, 9 hashtags: *it all started with music* (1, 69, 3, 4) · *our firsts* (41, 6, 8, 45, 61) · *adventures & garba nights* (7, 47, 16, 57, 58) · *the question* (32, 36, 26, 38, without wedding wording) |
| Countdown | "january 22 & 27, 2027", until the wedding | "so come dance with us…", "january 22, 2027", until the sangeet; confetti now includes music notes; fairy lights on top |
| Events | two cards (Sangeet, Wedding) | one invite card: tilted print-style photo (`assets/stock/event-sangeet.jpg`), handwritten "an evening of music & dance" and "bring your dancing shoes!", an equalizer next to the time, RSVP + "Map & contacts" buttons |
| RSVP | Google Form (was an on-site form with travel/stay questions) | Google Form links only; the train, travel and stay questions are gone |
| Detail cards | Sangeet, Wedding, Travel & Stay, RSVP, hashtag, More to come | Sangeet (map + contacts + RSVP), RSVP (link out, ↗ icon, dandiya stock photo), #RiyaSangHemang |
| Vision line | "Two very different people…" | "One evening, two families, and a dance floor that won't stay empty for long." |
| FAQ | 7 incl. wedding, trains, other events | 6: when/where, RSVP, finding the venue, dancing, dietary needs, hashtag |
| Footer | "from a concert in Toronto to a mandap in Nadiad." | "it all began at a concert, so of course there'll be music." + fairy lights |
| Tap anywhere | hearts | music notes and hearts in festive colours |

New styles are at the end of `styles.css` ("SANGEET TOUCHES"). The calm palette is unchanged, with three accents added: `--marigold`, `--rose`, `--glow`. Animations stop when the device asks for reduced motion. `buildLights()` in `app.js` draws the garlands into any `[data-lights]` element.

## Files and assets

- `assets/rh/`: only the 23 couple photos this page uses (the `PHOTOS` table is trimmed to match).
- `assets/stock/`: `sangeet.jpg` (tabla, Sangeet card + pop-up), `event-sangeet.jpg` (dance party, event card), `dandiya.jpg` (RSVP card; the main site's `more-dandiya.jpg`, Unsplash 1606293927185-20fad5f0a93e), `hashtag.jpg`. All are Unsplash License stock photos, sourced as in the main site's docs/04. The wedding, travel, rsvp-stationery and "more" photos were left out on purpose.
- `.vercelignore` keeps `tools/`, `*.md` and `.claude/` out of a deployment. `vercel.json` and `robots.txt` (noindex) are unchanged.
- `?v=N` cache-busting restarted at `styles.css?v=1`, `app.js?v=2`. Bump on every change.

## Tests

The harness and tests come from the main site (`tools/test/`, see main docs/05), adapted for this page:

```bash
node tools/test/cdp-test.mjs "http://localhost:5181/?lang=en" 390 664 1 tools/test/test-sangeet.js   # no wedding text, RSVP links, countdown, lights
node tools/test/cdp-test.mjs "http://localhost:5181/?lang=en" 390 664 1 tools/test/test-audit.js     # 18 story photos, faces, stock art, languages
node tools/test/cdp-test.mjs "http://localhost:5181/?lang=en" 390 664 1 tools/test/test-story.js     # expect 18 photos, 9 hashtags, 4 chapters
node tools/test/cdp-test.mjs "http://localhost:5181/?lang=en" 390 664 1 tools/test/test-hero.js
node tools/test/cdp-test.mjs "http://localhost:5181/?lang=en" 390 664 1 tools/test/test-welcome.js
SHOT=/tmp/x.jpg node tools/test/cdp-test.mjs "http://localhost:5181/?lang=en&shot=events" 390 664 1 tools/test/shot.js   # screenshot a section
```

`test-rsvp.js` was dropped because there is no on-site form. Results on 18 Nov 2026, at 390×664 and 1440×900: everything clean, except Mix mode at 390×664, where `chapterTextOverlapsPile` shows the same graze as on the main site (a known open item there, not new).

## Open items

- [ ] **A separate Google Form for the Sangeet?** Right now it uses the main site's form, which may ask about the wedding. If guests who aren't invited to the wedding open it, they'll see that. Set `RSVP_FORM` once there's a Sangeet-only form.
- [ ] Couple to approve the new playful copy (welcome line, chapter titles/bodies, vision line, FAQ "Will there be dancing?", footer).
- [ ] Gujarati proofreading by a native speaker. All Sangeet copy is new and was machine-written.
- [ ] Hosting: import the GitHub repo as a second Vercel project (repo exists; not deployed yet).
- [ ] If the main site's code gets fixes later, apply them here by hand (this is a copy, not shared code).
