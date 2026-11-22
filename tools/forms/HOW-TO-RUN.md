# Sangeet RSVP form: how to make it

> **Done.** Made 19 Nov 2026 and made again without the hashtag on 22 Nov 2026. The form on the site now: `https://docs.google.com/forms/d/e/1FAIpQLScd3PIf18YT-ljhGqS6Zry0fNpumRfnwrU03nFZvrlPevr2yQ/viewform`
> (short link https://forms.gle/Kt9K8MQUgCYoJEky6)
> (already in `RSVP_FORM`). Don't run the script again unless you want a second, separate form.

`CreateSangeetRsvpForm.gs` makes **one** Google Form for the Sangeet, in English. At the top it gives the date and time (Friday, 22 January 2027, 6:00 PM onwards), the venue's full address and a Google Maps link, and Hemang and Harsh's numbers. It asks:

1. **Your name**
2. **Will you be at the Sangeet?** (the date and venue are repeated under the question) *Yes* goes on to question 3; *No* submits straight away.
3. **How many of you are coming, including you?** (1–10)

After submitting, guests see a thank-you with the date and venue again.

It says nothing about any other event, travel or stay, and it must stay that way (CONTEXT.md rule 1).

## Make the form (once)

1. Use your **personal Gmail**, the same account as the other RSVP forms.
2. Go to **script.google.com** → **New project**. Use a new project, not the one with the other RSVP forms.
3. Delete the sample code, paste in all of `CreateSangeetRsvpForm.gs`, and click **Save**.
4. In the function dropdown next to **Debug**, choose **`createSangeetRsvpForm`** and click **Run**.
5. Google asks for permission: *Review permissions* → your account → *Allow*. If you see "Google hasn't verified this app", click **Advanced** → **Go to (project name)**.
6. When it says "Execution completed", the log shows three links. Send the **public link** (it ends in `/viewform`) so it can go on the website.
7. Open the public link in an **incognito/private window** and fill it in once with *Yes* and once with *No*. Then delete those test answers: in the form, **Responses** → ⋮ → **Delete all responses**.

## Take the hashtag off a form (22 Nov 2026)

The sites have no #RiyaSangHemang any more, so the form shouldn't either. The script no longer puts it in. **Already done:** on 22 Nov 2026 Hemang made a new form without it (the link at the top), and the site uses that one. The steps below are only for taking it off an older form **without** making a new one (same link, every answer kept):

1. Go to **script.google.com** and open the project that **made the Sangeet form** (not the one with the wedding RSVP forms).
2. Select all the code, delete it, paste in the new `CreateSangeetRsvpForm.gs`, and click **Save**.
3. Choose **`removeHashtagFromSangeetForm`** next to **Debug** and click **Run**.
4. The log says "Description: hashtag removed." and "Thank-you message: hashtag removed.", then the number of answers (all kept) and the same public link.

If that project is gone (the log says "No Sangeet form in this project yet"), do **not** run `createSangeetRsvpForm`, because it would make a second form with a new link. Edit the form by hand instead:
open it in **Google Forms** → click the description at the top and delete the last line, `#RiyaSangHemang` (and the empty line above it) →
**Settings** → **Presentation** → **Confirmation message** → **Edit** → delete ` #RiyaSangHemang` at the end → **Save**.

## Later

- **The links again:** run **`showSangeetFormLinks`**.
- **Head count:** run **`countSangeetRsvps`**. It lists who's coming and how many people in total, and who isn't coming.
- **Answers as a spreadsheet:** open the form → **Responses** → **Link to Sheets**.
- **Changing the wording:** edit it directly in Google Forms (open the edit link). The head count still works.
- **Stop taking RSVPs:** in the form, **Responses** → turn off *Accepting responses*.
- Buttons like *Next* and *Submit* show in each guest's own phone language. The script can't change them.
