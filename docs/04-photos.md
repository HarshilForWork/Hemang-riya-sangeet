# 04 · Photos

## Rules (from the couple, non-negotiable)

1. **Never crop either face**, at any screen size. Story frames take the photo's own shape (`aspect-ratio` from `PHOTOS`). Every other box uses `placeFocus()` with the face box from `PHOTOS`, shrinking with a blurred fill if needed.
2. **No dates** on any photo.
3. Detail cards, pop-up banners and the event photo use **stock photos**, never the couple's photos.
4. **Stock photos: no faces on cards and banners, and no readable text that could reveal the wedding.** The main site's `rsvp.jpg` (stationery printed with "WEDDING PARTY", "SAVE THE DATE") was rejected here for that reason. Check every new image by eye; the text test can't read pixels.
5. Photos must be stored **upright** (EXIF rotation baked in) before measuring or face detection. See the main site's docs/04 and `tools/photos/`.
6. Keep the pre-wedding shoot photos out of the opening collage (only 37 is from the shoot, same as the main site).

## The couple's photos used here

Now **8 files**, hero 37, 68, 52, 54, 5 and story 1, 57, 32. `PHOTOS` was regenerated with `faces.swift` + `update_photos.py`, and the rows are identical to the main site's. The table below is the earlier full version (branch `full`, 23 files).

Numbers match the main site and the original folder on Hemang's Mac. The story behind each is in the main site's docs/04.

| Where | Photos |
|---|---|
| Hero | 37 (main), 68 (ring), 52 (Mexico), 54 (sunny patio), 5 (first big date) |
| Story ch.1 | 1, 69, 3, 4 |
| Story ch.2 | 41, 6, 8, 45, 61 |
| Story ch.3 | 7, 47, 16, 57, 58 |
| Story ch.4 | 32, 36, 26 (proposal shoot), 38 |

The `PHOTOS` table in app.js has exactly these 23 rows, copied unchanged from the main site. Photos the main site uses but this site doesn't (9, 12, 17, 18, 21, 33, 40, 43, 44, 46, 48, 51, 59, 60) weren't copied. If you add one, copy the file from the main repo's `assets/rh/` and its `PHOTOS` row too.

## Stock photos (`assets/stock/`)

All are from Unsplash under the Unsplash License (free, no credit needed), the same sources as the main site.

| File | Used for | What it shows | Notes |
|---|---|---|---|
| event-sangeet.jpg | invite card photo | Indian dance party under warm, swirling lights | strangers' faces visible (OK for the event photo, chosen on the main site; not used on cards/banners) |
| sangeet.jpg | Sangeet card + pop-up banner | hands playing a tabla | Unsplash 1633411988188-6e63354a9019 |
| dandiya.jpg | RSVP card | dandiya sticks with marigolds, portrait 600×900 | the main site's `more-dandiya.jpg`, Unsplash 1606293927185-20fad5f0a93e; `ART_POS` centres it |
| hashtag.jpg | #RiyaSangHemang card + banner | instant prints on a dark table | Unsplash 1771681617105-745758eae89b |

Deliberately not copied: wedding.jpg, event-wedding.jpg, travel.jpg, rsvp.jpg, more-*.jpg.

## Adding or replacing a photo

Follow the main site's docs/04 (upright → `faces.swift` → `update_photos.py`). Note that `update_photos.py` rewrites the whole `PHOTOS` block for every file in the folder, which is fine here because the folder holds only the used photos. Then run `test-audit.js` and `test-story.js` at phone and desktop size.
