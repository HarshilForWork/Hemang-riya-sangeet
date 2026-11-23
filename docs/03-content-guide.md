# 03 · Content guide

All guest-facing text is in `app.js` near the top (and a little in `index.html` as the pre-JS fallback). Every entry has an English (`en`) and Gujarati (`gu`) version, so change both. After editing `app.js` or `styles.css`, bump `?v=N` in index.html. **Before saving any new text, check it doesn't hint at the wedding** (docs/01), then run `test-sangeet.js`.

## Where each piece of text lives

| What | Constant | Notes |
|---|---|---|
| Static page text (welcome, headings, date, venue, buttons, FAQ intro, footer…) | `UI.en` / `UI.gu` | Keys match `data-i18n="key"` in index.html |
| Gujarati lines in Mix mode | `ACCENT` | Keys match `data-accent="key"` |
| Story chapters, captions, hashtags | `STORY` | `photos` order = `caps` order = `tags` order |
| Detail cards | `CARDS` | `href` makes a card a link; card photo from `CARD_ART` |
| Pop-ups | `OVERLAYS` | `sections: [label, subtitle, body]`; `map` adds a map, `contacts: true` adds the contacts + RSVP |
| FAQ | `FAQ.en` / `FAQ.gu` | `[question, [paragraphs]]` |
| Contacts | `CONTACTS` | phone in `tel` (no spaces) and `display`. Two lists: Riya's family on `/riya` (Mr. Dharmesh Kumar Raval +91 99988 70158, Kunj Raval +91 70169 06401; always "Mr." and his full name, out of respect), Hemang and Harsh on `/`. The FAQ link's text is `UI.*.faqLink` (set again for `/riya` under `CONTACTS`) and it calls the first contact |
| RSVP form URL | `RSVP_FORM` | used by every RSVP button (the form itself: `tools/forms/`) |
| What Riya's link (`/riya`) leaves out | `NO_RSVP` in app.js; FAQ entries tagged `"rsvp"` | every RSVP button, the RSVP section and card, the pop-up's RSVP button, the RSVP FAQ (docs/02); it also swaps the contacts to Riya's family |
| Countdown | `COUNTDOWN_TARGET` | UTC: 22 Jan 2027 12:30 UTC = 6 PM IST |
| Meta description, page title | `<head>` of index.html | |

## Current copy (all new for this site, not yet approved by the couple)

| Place | English | Gujarati |
|---|---|---|
| Welcome | come dance with… / scroll to begin | આવો, ઝૂમીએ સાથે… / શરૂ કરવા સ્ક્રોલ કરો |
| Countdown | so come dance with us… · january 22, 2027 · until the sangeet | તો આવો, સાથે ઝૂમીએ… · ૨૨ જાન્યુઆરી, ૨૦૨૭ · સંગીત સંધ્યા સુધી |
| Invite card | an evening of music & dance · bring your dancing shoes! · Map & contacts | સંગીત અને નૃત્યની એક સાંજ · નાચવાની પૂરી તૈયારી સાથે આવજો! · નકશો અને સંપર્ક |
| RSVP | we'd love to have you with us (card: "We'd love to have you with us.") | આપની હાજરીથી અમને ખૂબ આનંદ થશે |
| Details sub | Everything you need for one very musical evening. | સંગીતભરી એક સાંજ માટે જરૂરી બધી માહિતી. |
| FAQ outro | We cannot wait to dance with you. | આપની સાથે ઝૂમવા અમે આતુર છીએ. |

The story intro ("a few moments that led us here…" → "our love story") is the main site's approved wording.

## Story: one short chapter (current)

(no heading): "We met at a concert in Toronto, so of course there's music in this story. A year of firsts later, our first garba included, he got down on one knee and she said yes." Photos: 1 "Where it all began" · 57 #FirstNavratri · 32 #SheSaidYes (2 hashtags). It's modelled on the short invite's chapter, with a music/garba twist, and keeps the paragraph short so it clears the photo pile in Mix mode on short phones.

## The earlier full story (branch `full`: 4 chapters, 18 photos, 9 hashtags)

A shorter cut of the main site's 5-chapter story. Captions and hashtags are the main site's approved ones; chapter titles and bodies were changed where noted.

1. *chapter one: it all started with music* (new title; body as on the main site): 1 caption · 69 #FirstHotChocolate · 3 · 4
2. *chapter two: our firsts, of so many dates* (as on the main site): 41 #FirstBigDate · 6 #FirstMovieDate · 8 #FirstValentines · 45 #FirstMuseumDate · 61 #FirstArtsyDate (40, 43, 44 left out)
3. *chapter three: adventures & garba nights* (new; body ends "Expect the same energy at the Sangeet!"): 7 Niagara Falls · 47 World Cup trophy sighting! · 16 Her birthday weekend in Mexico · 57 #FirstNavratri · 58 #GarbaNights
4. *chapter four: the question* (body: "A photoshoot — or so she thought…", with the main site's "for our wedding" removed, ending "Now we'd love to celebrate with you."): 32 The surprise · 36 She said yes · 26 Engaged · 38 #FirstDiwali

Rules: **no dates on photos**; a tagged photo's caption stays empty (`""`) in both languages; hashtags stay in Latin script in every language.

## FAQ (4)

When and where is the Sangeet? · How do I RSVP? (Google Form in a new tab, or call/text Hemang or Harsh) · How do I find the venue? (Sangeet card / Map & contacts) · Do you have a hashtag?

On Riya's link (`/riya`) the RSVP question is left out, so it has 3. A new FAQ entry about RSVPs needs the `"rsvp"` tag as its third item, in both `FAQ.en` and `FAQ.gu`, so it's left out there too.

Removed when trimmed (as on the short invite): "Will there be dancing?" and the dietary-needs question. The vision line and the footer quote are gone too.

Deliberately **not** included: anything about other events, travel or stay (they would point to the wedding).

## Adding something

- Anything new that asks guests to RSVP must be hidden on Riya's link too (docs/02), and `test-sangeet.js` on `/riya` must still report `rsvpMentions: []`.
- A new card or pop-up: add it to `OVERLAYS` (en + gu) and `CARDS`, plus a stock photo (no faces, **no readable text**) in `assets/stock/` and `CARD_ART`. Then add its id to the overlay loop in `tools/test/test-audit.js`.
- New Gujarati: the Rasa / Hind Vadodara fonts are already loaded. Caveat has no Gujarati letters, so handwritten lines switch to Hind Vadodara (see `html[lang="gu"] .ev__tagline`).
