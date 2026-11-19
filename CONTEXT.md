# CONTEXT — start here

> **`main` is the trimmed version** (Hemang approved it on 18 Nov 2026), cut the way the short invite (`lite-site/`) was:
> one story chapter with 3 photos, no big centre line, no footer, 4 FAQs. The page is about 11 phone screens instead of 21.
> The earlier, fuller Sangeet version (4-chapter story, 18 photos, vision line, footer, 6 FAQs) is commit `e1e8ed3`,
> kept as the local branch `full` (not pushed). Where these docs mention the "full version" or branch `full`, they mean that one.

This is the entry point for anyone, including a new Claude session, picking up the **Sangeet-only invite** for Riya & Hemang. Read it first, then the doc for whatever you're working on.

## What this is

A single static page (HTML/CSS/JS, no build step) inviting guests to the **Sangeet only**: Friday 22 January 2027, 6 PM onwards, Bhanushali Wadi, Nerul, Navi Mumbai. Some guests are invited to the Sangeet but **not** the wedding, so this is a separate site from the main one.

- Repo: `HarshilForWork/Hemang-riya-sangeet`, branch `main`. **Public**, by Hemang's choice (18 Nov 2026). The repo docs mention the wedding, which is fine because they never reach the live site (`.vercelignore`). Still: **the served files must stay wedding-free**, and don't link the GitHub repo from the site.
- Live: **https://heya-sangeet.vercel.app** and Riya's link **https://heya-sangeet.vercel.app/riya** (Vercel project linked to GitHub, set up 19 Nov 2026: every push to `main` deploys; docs/06)
- Built from: the main site at commit `d359100`, 18 Nov 2026. The code is a copy, not shared.
- Languages: English, Gujarati, Mix (`?lang=en|gu|mix`)
- **Two links, one page** (19 Nov 2026): `/` is for Hemang's guests and has RSVP; **`/riya`** is for Riya's friends who get the invite but won't be RSVPing, and has **no RSVP anywhere**; its contacts are **Riya's family** (Dharmesh Raval, her dad, and Kunj Raval, her brother) instead of Hemang and Harsh. `vercel.json` rewrites `/riya` to the same index.html and `app.js` (`NO_RSVP`) takes the RSVP pieces out and swaps the contacts (docs/02).

## Who gets which link (three sites, five links)

The couple sends each group of guests **one** link. There are **three separate copies** of the code; each is its own git repo with its own `CONTEXT.md`. This one is the Sangeet site (rows 4 and 5).

| Guests | Link to send | What they see | RSVP | Repo · folder |
|---|---|---|---|---|
| **Close guests**, invited to both events | https://hemang-riya.vercel.app | The whole story (5 chapters, 30 photos), Sangeet + Wedding, Travel & Stay | The couple's main Google Form (asks about the wedding) | `HarshilForWork/Hemang-riya` (public) · `site/` |
| **Most guests**, invited to both events | https://riya-hemang-invite.vercel.app | The same look and both events (Travel & Stay too), much less to read: one-chapter story, 3 FAQs | The same main Google Form | `HarshilForWork/riya-hemang-invite` (private) · `lite-site/` |
| **Riya's guests**, invited to both events | **https://riya-hemang-invite.vercel.app/riya** | The same short invite, but the contacts (the FAQ's "Reach out to…" link and the RSVP answer) are Riya's family: Dharmesh Raval (her dad) and Kunj Raval (her brother) | The same main Google Form (its description and thank-you still name Hemang and Harsh) | Same repo and page; the path switches the contacts |
| **Sangeet-only guests** (Hemang's friends) | https://heya-sangeet.vercel.app | Only the Sangeet (Fri 22 Jan 2027, Nerul, Navi Mumbai). **Never the wedding** | Its own Sangeet-only Google Form, in English: name, coming?, how many (made 19 Nov 2026 from the script in `tools/forms/`) | `HarshilForWork/Hemang-riya-sangeet` (public) · `sangeet-site/` |
| **Riya's friends** who won't come but should still get the invite | **https://heya-sangeet.vercel.app/riya** | The same Sangeet page, with Riya's family as the contacts (Dharmesh and Kunj Raval) | **None**: no RSVP button, section, card or FAQ | Same repo and page; the path switches RSVP off and the contacts |

- **Contacts** (19 Nov 2026): the `/` links give Hemang (+91 97693 33516) and Harsh (+91 83698 94213). Both `/riya` links (rows 3 and 5) give Riya's family instead, Dharmesh Raval (her dad, +91 99988 70158) and Kunj Raval (her brother, +91 70169 06401), so her guests reach her family and Hemang's guests reach his. Out of respect her dad is always written **Mr. Dharmesh Kumar Raval** (શ્રી ધર્મેશકુમાર રાવલ) on the sites, and the FAQ link reads "Reach out to Mr. Dharmesh Kumar Raval and Kunj" (Hemang, 19 Nov 2026).
- **Never send a Sangeet-only guest (rows 4–5) any of the first three links**: they show the wedding. Never put wedding details on this site.
- The copies don't share code. A fix or content change (RSVP link, contacts, photos, wording, bug fixes) reaches only the site you change. Ask which sites it applies to, then update, test and push each one.
- Folders: on Hemang's Mac the repos sit side by side as `site/`, `lite-site/`, `sangeet-site/` (the docs use these names); on the Windows laptop they are `Hemang-riya/`, `riya-hemang-invite/`, `Hemang-riya-sangeet/`.

### Working on another laptop

1. Clone all three side by side, with the Mac folder names: `git clone https://github.com/HarshilForWork/Hemang-riya.git site`, `git clone https://github.com/HarshilForWork/riya-hemang-invite.git lite-site`, `git clone https://github.com/HarshilForWork/Hemang-riya-sangeet.git sangeet-site` (or use the SSH alias `github-personal` where it's set up). The short invite is private, so sign in to GitHub as HarshilForWork.
2. In each repo, set the commit identity locally (never the global work identity): `git config user.name HarshilForwork` and `git config user.email "$(git log -1 --format=%ae)"` (the same email as the earlier commits).
3. Run `git pull` before starting: the sites have been edited from more than one laptop (19 Nov 2026).
4. Preview this site with `python tools/serve.py 5181` (plain `http.server` can't serve `/riya`). The test harness finds Chrome on macOS, Windows and Linux; set `CHROME=/path/to/chrome` if it's somewhere else.
5. The main RSVP form's Apps Script (`rsvp-form/CreateRsvpForms.gs`) is **not in any repo**; it sits next to the sites on the Windows laptop. This site's form script is in `tools/forms/`.
6. **Releasing**: push to `main` and Vercel deploys by itself; don't re-deploy by hand or with the `vercel` CLI. After a push, run `test-sangeet.js` against the live `/` and `/riya` (docs/06).

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
6. **Commit as `HarshilForwork`** (repo-local config), never the global work identity. Push via `git@github-personal:…` on Hemang's Mac, or HTTPS (`https://github.com/HarshilForWork/…`) where that alias isn't set up.
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

Built, trimmed (Hemang approved the short version) and tested: all clean at phone and desktop in EN, GU and Mix, on both `/` and `/riya`. **Live** at https://heya-sangeet.vercel.app and `/riya` (19 Nov 2026), and every RSVP button on `/` opens the Sangeet-only form. Still waiting on: the couple's approval of the new copy, Gujarati proofreading, a real iPhone test. Details in docs/07.
