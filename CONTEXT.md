# CONTEXT — start here

This is the entry point for anyone, including a new Claude session, picking up the **Sangeet-only invite** for Riya & Hemang. Read it first, then the doc for whatever you're working on.

## What this is

A single static page (HTML/CSS/JS, no build step) inviting guests to the **Sangeet only**: Friday 22 January 2027, 6 PM onwards, Bhanushali Wadi, Nerul, Navi Mumbai. Some guests are invited to the Sangeet but **not** the wedding, so this is a separate site from the main one.

- Repo: `HarshilForWork/Hemang-riya-sangeet`, branch `main`. It is **public** on GitHub (created private, switched to public on 18 Nov 2026). The docs and commit messages mention the wedding. They are never deployed (`.vercelignore`), but anyone who finds the repo can read them, so the couple may want it private again (Vercel deploys private repos too).
- Live: not deployed yet (plan: a second Vercel project; see docs/06)
- Built from: the main site at commit `d359100`, 18 Nov 2026. The code is a copy, not shared.
- Languages: English, Gujarati, Mix (`?lang=en|gu|mix`)

### The three sibling sites

They are separate copies of the same code; a fix in one doesn't reach the others.

| Folder | Repo | Live | For |
|---|---|---|---|
| `site/` | `HarshilForWork/Hemang-riya` | hemang-riya.vercel.app | everyone invited to both events (full story) |
| `lite-site/` | `HarshilForWork/riya-hemang-invite` | riya-hemang-invite.vercel.app | the short invite, both events, less to read |
| `sangeet-site/` (this) | `HarshilForWork/Hemang-riya-sangeet` | not yet | **Sangeet-only** guests |

## Documentation map

| Doc | Read it when you need… |
|---|---|
| [docs/01-project-overview.md](docs/01-project-overview.md) | Why this site exists, the event, the couple's tastes, what's on the page |
| [docs/02-architecture.md](docs/02-architecture.md) | How the code works, RSVP links, the Sangeet touches (lights, notes, equalizer) |
| [docs/03-content-guide.md](docs/03-content-guide.md) | Changing any text, the current copy in both languages, the 4-chapter story |
| [docs/04-photos.md](docs/04-photos.md) | Which photo is used where, the stock photos, the photo rules |
| [docs/05-testing.md](docs/05-testing.md) | The headless-Chrome harness, the wedding-leak test, last results |
| [docs/06-deployment.md](docs/06-deployment.md) | Git identity and SSH alias, setting up Vercel, releasing |
| [docs/07-decisions-and-open-items.md](docs/07-decisions-and-open-items.md) | Why things are the way they are, and what's still to do |

## Rules that matter most

1. **Never reveal the wedding on the site.** No mention of it, its city, date, venue, trains, travel or stay, in any language, pop-up, FAQ, photo (including text inside stock photos) or served file (`index.html`, `app.js`, `styles.css`, code comments included). Run `tools/test/test-sangeet.js` after every change and look at new images by eye.
2. **Never crop either face** in the couple's photos, at any screen size. **No dates on photos.** Cards, banners and the event photo use stock photos (docs/04).
3. **Test at phone size too** (390×664 and 1440×900 at least), not just desktop (docs/05).
4. **Every visible text has English and Gujarati.** The Gujarati here is machine-written and needs proofreading.
5. **Bump `?v=N`** on `styles.css` / `app.js` in index.html whenever you change them.
6. **Commit as `HarshilForwork`** (repo-local config), never the global work identity. Push via `git@github-personal:…`.
7. Every RSVP button opens the Google Form in `RSVP_FORM` (top of app.js) in a new tab. There is no on-site form.
8. Bug fixes in shared code don't arrive here automatically; copy them by hand and re-check for wedding mentions.

## Quick commands

```bash
python3 -m http.server 5181          # from the repo root → http://localhost:5181/?lang=en
node tools/test/cdp-test.mjs "http://localhost:5181/?lang=en" 390 664 1 tools/test/test-sangeet.js
node tools/test/cdp-test.mjs "http://localhost:5181/?lang=en" 390 664 1 tools/test/test-audit.js
node tools/test/cdp-test.mjs "http://localhost:5181/?lang=en" 390 664 1 tools/test/test-story.js
node tools/test/cdp-test.mjs "http://localhost:5181/?lang=en" 1440 900 0 tools/test/test-hero.js
```

## What's different from the main site (summary)

| | Main site | This site |
|---|---|---|
| Welcome | "welcome to the story of…" | "come dance with…", fairy lights, floating notes |
| Story | 5 chapters, 30 photos | 4 chapters, 18 photos, 9 hashtags |
| Countdown | Jan 22 & 27, until the wedding | Jan 22, until the sangeet; music-note confetti |
| Events | Sangeet + Wedding | one invite card with equalizer, "bring your dancing shoes!" |
| Cards | 6 (incl. Wedding, Travel & Stay, More to come) | 3: Sangeet (map + contacts), RSVP (link), hashtag |
| FAQ / footer | wedding, trains, Nadiad | Sangeet-only; "it all began at a concert, so of course there'll be music." |

Full list: docs/07 and docs/03.

## Current status (18 Nov 2026)

Built and tested: all clean at phone and desktop, except the Mix-mode story graze on short phones, which is the same as on the main site. Pushed to GitHub (public), **not deployed**. Waiting on: a Sangeet-only Google Form (it currently shares the main form), a decision on repo visibility, the couple's approval of the new copy, Gujarati proofreading, Vercel setup, a real iPhone test. Details in docs/07.
