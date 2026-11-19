# 07 · Decisions and open items

## Decisions (and why)

| Decision | Reason / who |
|---|---|
| No R&H / HR monogram anywhere: the nav has no logo, just the links, centred (RSVP alone at the top right on phones). The full names "Riya & Hemang" are fine where they already appear | The couple looked at every logo option (19 Nov 2026) and decided against initials |
| Separate Sangeet-only site, built from a copy of the main site (18 Nov 2026) | Some guests are invited to the Sangeet only; the main site reveals the wedding |
| Nothing anywhere hints at the wedding, served code comments included | Guests can view source; an accidental mention would be awkward |
| Repo is public (created private, switched; Hemang chose to keep it public on 18 Nov 2026) | Hemang's call. The docs discuss the guest split but are never deployed; the served files stay wedding-free |
| Hero unchanged; story cut to 4 chapters / 18 photos | Task: keep the hero and story "if they fit, or trim"; a Sangeet invite needs a lighter story. The garba chapter ties it to dancing, and chapter one's title ties the concert to music |
| Proposal chapter rewritten without "for our wedding" | Wedding rule |
| "come dance with…" instead of "welcome to the story of…" | The couple asked for "nice and cute", Sangeet-y; the hero name still finishes the sentence. Easy to revert in `UI.intro` / `ACCENT.intro` |
| RSVP = Google Form links in a new tab; no on-site form; train/stay questions dropped | Task from the main session; the main site switched to the same form |
| Single invite card instead of the two-event grid | Only one event |
| RSVP card photo = dandiya sticks, not the main site's stationery photo | The stationery has readable "WEDDING PARTY / SAVE THE DATE" text |
| Detail cards: Sangeet, RSVP, #RiyaSangHemang (no Travel, Wedding or "More to come") | The others point to the wedding |
| Sangeet touches: fairy lights, rising notes, music-note confetti, equalizer, handwritten Caveat lines, notes on tap; accents `--marigold` / `--rose` on the calm palette | "Cute and Sangeet-y: music, dance, lights, colour", without losing the calm, not-cheesy look |
| Trimmed like the short invite (one 3-photo chapter, no vision line, no footer, FAQ down to 4, all detail cards kept); made on branch `short`, **approved and merged into `main`** on 18 Nov 2026 | Hemang: "trimmed down everything as it was too much information… let's do the same for Sangeet". The full version is kept as local branch `full` (`e1e8ed3`) |
| No new facts invented (dress code, food, schedule) | Only the couple's facts; the playful lines are tone, not promises |
| Two links (19 Nov 2026): `/` with RSVP, `/riya` with no RSVP at all | Hemang: Riya's friends won't be coming but she wants to send them the invite, so her link has no RSVP button. Same page, same wording otherwise; the path switches it (docs/02) |
| Riya's link gives **Riya's family as the contacts** (19 Nov 2026): Dharmesh Raval (her dad, +91 99988 70158) and Kunj Raval (her brother, +91 70169 06401), in the Sangeet pop-up and the FAQ link. The short wedding invite got the same `/riya` link | Hemang: Riya sends this link to her guests, "so we don't want their guests to reach out to us, and vice versa" |
| Sangeet-only RSVP form: one form, **English only**, 3 questions (name; coming?; how many, 1–10, asked only on *Yes*). The top gives the date, time, full address and a Google Maps link; the date and venue are repeated under the "coming?" question and in the thank-you | Hemang: "would you be attending? how many of you?", it's in Mumbai so nothing else is needed, and it's for his friends. 19 Nov 2026: "we don't need the Sangeet RSVP form in Gujarati, just plain English… give some context on the dates and the location". One form keeps one link for all 3 site languages and all answers in one place. Made by `tools/forms/CreateSangeetRsvpForm.gs` in Hemang's Google account |

## Open items

- [x] **Put the Sangeet-only Google Form on the site** (19 Nov 2026). Hemang made it with `tools/forms/CreateSangeetRsvpForm.gs`: `https://docs.google.com/forms/d/e/1FAIpQLScjt8fXO3nJDbcQimEJqLpDoN4Sx8DFivjK2zVznNaiuzPm1w/viewform`. Checked: it opens without a sign-in, English only, no wedding words. It's in `RSVP_FORM` (app.js `v=6`) and the 3 fallback hrefs in index.html; test-sangeet's `formSharedWithMainSite` is `false`.
- [ ] **Riya's link (`/riya`) wording**: it's the same invite text as the main link ("so come dance with us…", "We cannot wait to dance with you."). Fine if her friends just get the invite; change it only if Riya wants a softer version for people who won't be there.
- [x] **Deploy** (19 Nov 2026): https://heya-sangeet.vercel.app, a second Vercel project linked to GitHub (docs/06). The first deploy's `/riya` was a 404 (the rewrite pointed at `/index.html`); fixed to `/`.
- [ ] **Couple to approve the new copy** (docs/03 table and the short story paragraph).
- [ ] **Gujarati proofreading** by a native speaker (all `gu`, `ACCENT`).
- [ ] **Real iPhone test** in Safari (opening animation, the lights, the pop-up).
- [ ] **Sangeet photos from Hemang**: if he sends real Sangeet photos, they could replace the stock event photo (stock stays on cards/banners).
- [ ] **Keep in sync with the main site** by hand: bug fixes in shared code (hero, story, placeFocus, harness) must be copied over. Before copying content, check it for wedding mentions.
