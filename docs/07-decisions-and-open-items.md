# 07 · Decisions and open items

## Decisions (and why)

| Decision | Reason / who |
|---|---|
| Separate Sangeet-only site, built from a copy of the main site (18 Nov 2026) | Some guests are invited to the Sangeet only; the main site reveals the wedding |
| Nothing anywhere hints at the wedding, served code comments included | Guests can view source; an accidental mention would be awkward |
| Repo is private | Docs and commit history discuss the guest split |
| Hero unchanged; story cut to 4 chapters / 18 photos | Task: keep the hero and story "if they fit, or trim"; a Sangeet invite needs a lighter story. The garba chapter ties it to dancing, and chapter one's title ties the concert to music |
| Proposal chapter rewritten without "for our wedding" | Wedding rule |
| "come dance with…" instead of "welcome to the story of…" | The couple asked for "nice and cute", Sangeet-y; the hero name still finishes the sentence. Easy to revert in `UI.intro` / `ACCENT.intro` |
| RSVP = Google Form links in a new tab; no on-site form; train/stay questions dropped | Task from the main session; the main site switched to the same form |
| Single invite card instead of the two-event grid | Only one event |
| RSVP card photo = dandiya sticks, not the main site's stationery photo | The stationery has readable "WEDDING PARTY / SAVE THE DATE" text |
| Detail cards: Sangeet, RSVP, #RiyaSangHemang (no Travel, Wedding or "More to come") | The others point to the wedding |
| Sangeet touches: fairy lights, rising notes, music-note confetti, equalizer, handwritten Caveat lines, notes on tap; accents `--marigold` / `--rose` on the calm palette | "Cute and Sangeet-y: music, dance, lights, colour", without losing the calm, not-cheesy look |
| No new facts invented (dress code, food, schedule) | Only the couple's facts; the playful lines are tone, not promises |

## Open items

- [ ] **A separate Google Form for the Sangeet.** `RSVP_FORM` currently points to the same form as the main site. If that form asks about the wedding, Sangeet-only guests will see it. Once there's a Sangeet-only form, change `RSVP_FORM` (and the fallback hrefs in index.html).
- [ ] **Deploy**: import the repo as a second Vercel project (docs/06).
- [ ] **Couple to approve the new copy** (docs/03 table, chapter titles 1/3, chapter 3/4 bodies, FAQ "Will there be dancing?").
- [ ] **Gujarati proofreading** by a native speaker (all `gu`, `ACCENT`).
- [ ] **Mix mode on short phones (390×664)**: chapter text grazes the pile. Same as the main site; fix both together if fixed.
- [ ] **Real iPhone test** in Safari (opening animation, the lights, the pop-up).
- [ ] **Sangeet photos from Hemang**: if he sends real Sangeet photos, they could replace the stock event photo (stock stays on cards/banners).
- [ ] **Keep in sync with the main site** by hand: bug fixes in shared code (hero, story, placeFocus, harness) must be copied over. Before copying content, check it for wedding mentions.
