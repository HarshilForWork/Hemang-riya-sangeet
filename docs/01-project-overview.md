# 01 · Project overview

## What this is and why it exists

Riya & Hemang have two celebrations: the **Sangeet** (Navi Mumbai) and the **wedding**. Some guests are invited to the Sangeet but **not** to the wedding. The main site (`HarshilForWork/Hemang-riya`, https://hemang-riya.vercel.app) covers both, so these guests get this separate, Sangeet-only invite instead.

**Hard rule:** nothing on this site may reveal the wedding. That means no mention of it, its city, its date, its venue, trains, travel or stay, in any language, pop-up, FAQ, photo or served file (code comments included, since guests can view source). See docs/05 for the test that checks this.

## The couple (for tone and story)

- **Riya**: Gujarati, from Nadiad (don't name the city on this site), in Canada for about 7 years.
- **Hemang**: Kutchi Gujarati, from Mumbai. He is building the sites, and the story text is in his voice ("I got down on one knee…").
- They met at a **concert** in Toronto (no photos). Their second date was the Christmas tree lighting at the Distillery District: first hot chocolate, first photo together. The concert is why this site leans into music ("it all started with music").
- What they like: calm, **not cheesy**, Instagram-print polaroids with handwritten hashtags, **no dates on photos**, **never crop a face**. For this site they asked for "nice and cute" and Sangeet-y (music, dance, lights, colour, a playful tone).

## The event

| | |
|---|---|
| Event | Sangeet (સંગીત સંધ્યા) |
| Date | Friday, 22 January 2027 |
| Time | 6:00 PM onwards |
| Venue | Bhanushali Wadi, Nerul |
| Address | Basveshewar Maharaj Marg, Nerul East, Sector 19A, Nerul, Navi Mumbai, Maharashtra 400706 |
| Contacts | Hemang +91 97693 33516 · Harsh +91 83698 94213 |
| RSVP | Google Form (`RSVP_FORM` in app.js), opens in a new tab |
| Hashtag | #RiyaSangHemang |

## What's on the page (top to bottom)

1. **Welcome screen**: "come dance with…" + "scroll to begin" on the dark warm colour, with a garland of fairy lights and music notes floating up. A scroll, swipe, ↓ key or tap opens the site, and the hero's big "Riya & Hemang" finishes the sentence.
2. **Hero**: photo 37 (Toronto streetcar) shrinking into a collage with 68, 52, 54 and 5. This is the same as the main site.
3. "a few moments that led us here…" leading into **our love story**: one short chapter, "our story, the short version", with 3 photos as Instagram prints (1 "Where it all began", 57 #FirstNavratri, 32 #SheSaidYes).
4. **Countdown**: "so come dance with us…", "january 22, 2027", days/hours/minutes/seconds "until the sangeet". Confetti with music notes, fairy lights along the top.
5. **The invite card**: a stock dance-party photo in a tilted white print frame, then "The Sangeet", handwritten "an evening of music & dance", the date, the time with a bouncing equalizer, venue, address (links to Google Maps), "bring your dancing shoes!", and **RSVP now** + **Map & contacts** buttons.
6. **RSVP** callout: "a quick google form, takes a minute" + RSVP now.
7. **Details**: three cards. Sangeet (pop-up with when/where, map, contacts, RSVP), RSVP (link to the form), #RiyaSangHemang (pop-up).
8. **FAQ** (4 questions) and "We cannot wait to dance with you.", which is where the page ends (no big centre line, no footer section; trimmed like the short invite).

Floating: language button (EN / ગુજ / Mix), menu bar (Sangeet · FAQ · RSVP; no logo or initials), music notes and hearts when you tap empty space.

## Languages

English, Gujarati and Mix (English with Gujarati lines under the headings), the same system as the main site. Share links: `?lang=gu`, `?lang=mix`. All Gujarati on this site was machine-written and **needs a native speaker's proofread**.
