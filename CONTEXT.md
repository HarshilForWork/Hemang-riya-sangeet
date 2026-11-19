# CONTEXT — start here

> **`main` is the trimmed version** (Hemang approved it on 18 Nov 2026), cut the way the short invite (`lite-site/`) was:
> one story chapter with 3 photos, no big centre line, no footer, 4 FAQs. The page is about 11 phone screens instead of 21.
> The earlier, fuller Sangeet version (4-chapter story, 18 photos, vision line, footer, 6 FAQs) is commit `e1e8ed3`,
> kept as the local branch `full` (not pushed). Where these docs mention the "full version" or branch `full`, they mean that one.

This is the entry point for anyone, including a new Claude session, picking up the **Sangeet-only invite** for Riya & Hemang. Read it first, then the doc for whatever you're working on.

## What this is

A single static page (HTML/CSS/JS, no build step) inviting guests to the **Sangeet only**: Friday 22 January 2027, 6 PM onwards, Bhanushali Wadi, Nerul, Navi Mumbai. Some guests are invited to the Sangeet but **not** the wedding, so this is a separate site from the main one.

- Repo: `HarshilForWork/Hemang-riya-sangeet`, branch `main`. **Public**, by Hemang's choice (18 Nov 2026). The repo docs mention the wedding, which is fine because they never reach the live site (`.vercelignore`). Still: **the served files must stay wedding-free**, and don't link the GitHub repo from the site.
- Live: not deployed yet (plan: a second Vercel project; see docs/06)
- Built from: the main site at commit `d359100`, 18 Nov 2026. The code is a copy, not shared.
- Languages: English, Gujarati, Mix (`?lang=en|gu|mix`)
- **Two links, one page** (19 Nov 2026): `/` is for Hemang's guests and has RSVP; **`/riya`** is for Riya's friends who get the invite but won't be RSVPing, and has **no RSVP anywhere**. `vercel.json` rewrites `/riya` to the same index.html and `app.js` (`NO_RSVP`) takes the RSVP pieces out (docs/02).

### The three sibling sites

They are separate copies of the same code; a fix in one doesn't reach the others.

| Folder | Repo | Live | For |
|---|---|---|---|
| `site/` | `HarshilForWork/Hemang-riya` | hemang-riya.vercel.app | everyone invited to both events (full story) |
| `lite-site/` | `HarshilForWork/riya-hemang-invite` | riya-hemang-invite.vercel.app | the short invite, both events, less to read |
| `sangeet-site/` (this) | `HarshilForWork/Hemang-riya-sangeet` (public) | not yet | **Sangeet-only** guests |

## Documentation map

| Doc | Read it when you need… |
|---|---|
| [docs/01-project-overview.md](docs/01-project-overview.md) | Why this site exists, the event, the couple's tastes, what's on the page |
| [docs/02-architecture.md](docs/02-architecture.md) | How the code works, RSVP links, the Sangeet touches (lights, notes, equalizer) |
| [docs/03-content-guide.md](docs/03-content-guide.md) | Changing any text, the current copy in both languages, the one-chapter story |
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
7. Every RSVP button opens the Google Form in `RSVP_FORM` (top of app.js) in a new tab. There is no on-site form. **On `/riya` there is no RSVP at all**: anything new that asks for an RSVP must be hidden there too. The form is Sangeet-only (`tools/forms/`), with nothing about any other event.
8. Bug fixes in shared code don't arrive here automatically; copy them by hand and re-check for wedding mentions.

## Quick commands

```bash
python tools/serve.py 5181           # → http://localhost:5181/?lang=en and Riya's link http://localhost:5181/riya?lang=en
node tools/test/cdp-test.mjs "http://localhost:5181/?lang=en" 390 664 1 tools/test/test-sangeet.js
node tools/test/cdp-test.mjs "http://localhost:5181/riya?lang=en" 390 664 1 tools/test/test-sangeet.js
node tools/test/cdp-test.mjs "http://localhost:5181/?lang=en" 390 664 1 tools/test/test-audit.js
node tools/test/cdp-test.mjs "http://localhost:5181/?lang=en" 390 664 1 tools/test/test-story.js
node tools/test/cdp-test.mjs "http://localhost:5181/?lang=en" 1440 900 0 tools/test/test-hero.js
```

## What's different from the main site (summary)

| | Main site | This site |
|---|---|---|
| Welcome | "welcome to the story of…" | "come dance with…", fairy lights, floating notes |
| Story | 5 chapters, 30 photos | 1 short chapter, 3 photos (1, 57 #FirstNavratri, 32 #SheSaidYes) |
| Countdown | Jan 22 & 27, until the wedding | Jan 22, until the sangeet; music-note confetti |
| Events | Sangeet + Wedding | one invite card with equalizer, "bring your dancing shoes!" |
| Cards | 6 (incl. Wedding, Travel & Stay, More to come) | 3: Sangeet (map + contacts), RSVP (link), hashtag (2 on `/riya`: no RSVP) |
| Vision line, footer | yes | removed; the page ends with the FAQ's "We cannot wait to dance with you." |
| FAQ | 7, incl. wedding, trains | 4: when/where, RSVP, finding the venue, hashtag (3 on `/riya`: no RSVP) |

Full list: docs/07 and docs/03.

## Current status (19 Nov 2026)

Built, trimmed (Hemang approved the short version) and tested: all clean at phone and desktop in EN, GU and Mix, on both `/` and `/riya`. **Not deployed**. The Sangeet-only RSVP form script is ready in `tools/forms/`; waiting for Hemang to run it and send the link. **Don't deploy until `RSVP_FORM` is swapped**: it still points to the main site's form, which asks about the wedding. Also waiting on: the couple's approval of the new copy, Gujarati proofreading, Vercel setup, a real iPhone test. Details in docs/07.
