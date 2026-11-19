# Sangeet RSVP form: how to make it

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

## Later

- **The links again:** run **`showSangeetFormLinks`**.
- **Head count:** run **`countSangeetRsvps`**. It lists who's coming and how many people in total, and who isn't coming.
- **Answers as a spreadsheet:** open the form → **Responses** → **Link to Sheets**.
- **Changing the wording:** edit it directly in Google Forms (open the edit link). The head count still works.
- **Stop taking RSVPs:** in the form, **Responses** → turn off *Accepting responses*.
- Buttons like *Next* and *Submit* show in each guest's own phone language. The script can't change them.
