# 06 · Deployment

## GitHub

- Repo: **`HarshilForWork/Hemang-riya-sangeet`**, branch `main`. **Public** by Hemang's choice (18 Nov 2026; it was created private). These docs mention the wedding and the guest split. That's accepted, since they're never deployed (`.vercelignore`), but never link the repo from the site. To make it private later: `gh repo edit HarshilForWork/Hemang-riya-sangeet --visibility private --accept-visibility-change-consequences` (Vercel deploys private repos too).
- Sibling sites: the full site (`site/`, `HarshilForWork/Hemang-riya`, hemang-riya.vercel.app) and the short invite (`lite-site/`, `HarshilForWork/riya-hemang-invite`, private, riya-hemang-invite.vercel.app). They are separate copies, so a fix in one doesn't reach the others.
- Remote goes through Hemang's personal SSH key via the `github-personal` host alias (in `~/.ssh/config` on his Mac):
  ```bash
  git remote -v   # origin  git@github-personal:HarshilForWork/Hemang-riya-sangeet.git
  ```
- **Commit identity**: the repo's local config is Hemang's personal GitHub identity (`HarshilForwork`). The global git config on that Mac is his **work** identity, which must not be used. Check before committing:
  ```bash
  git config user.name    # HarshilForwork
  ```
- `gh` is logged in with two accounts; the active one should be `HarshilForWork` (`gh auth status`).
- Commit messages end with a `Co-Authored-By:` line when written with Claude.
- The local copy currently lives in a scratch folder of a Claude session (next to the main site's `site/`). If that session is deleted the folder goes too, so GitHub is the source of truth. Clone it somewhere permanent for further work.

## Vercel

Live at **https://heya-sangeet.vercel.app** (Riya's link: **https://heya-sangeet.vercel.app/riya**). Hemang imported the repo into Vercel from his other laptop on 19 Nov 2026. The project is linked to GitHub, so **every push to `main` deploys by itself**: don't pull and re-deploy by hand, and don't use the `vercel` CLI, which would upload whatever files that laptop has (an old copy could bring back the main site's wedding form).

`vercel.json` (copied from the main site): assets cached for a day with a week's stale-while-revalidate, `X-Robots-Tag: noindex, nofollow`, `nosniff`, a referrer policy and clean URLs. It also rewrites **`/riya`** to **`/`** (Riya's link, no RSVP; docs/02). The destination must be `/`, not `/index.html`: with `cleanUrls`, Vercel redirects `/index.html` to `/`, and a rewrite that lands on a redirect is a 404 (that's what the first deploy did, 19 Nov 2026). `tools/serve.py` can't catch this, so after changing `vercel.json` check `https://heya-sangeet.vercel.app/riya` live: the page, with no RSVP button, and `/riya/` redirecting to `/riya`. `.vercelignore` keeps `docs/`, `tools/`, `*.md` and `.claude/` out of the deployment, so the docs never reach the live site (they are readable on GitHub, since the repo is public).

## Releasing a change

1. Edit, then bump `?v=N` for `styles.css` / `app.js` in index.html.
2. Test at phone and desktop (docs/05), **including `test-sangeet.js` on both `/` and `/riya`**.
3. Commit and push to `main`.
4. Check the live version: `curl -s https://heya-sangeet.vercel.app/ | grep -o 'app.js?v=[0-9]*'`, and run `test-sangeet.js` against `https://heya-sangeet.vercel.app/?lang=en` and `/riya?lang=en`.
