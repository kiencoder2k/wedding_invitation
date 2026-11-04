# RSVP + sổ lưu bút → Google Sheets setup

One script stores both RSVPs (tab `RSVP`) and guestbook wishes (tab `Wishes`).

## 1. Create the sheet
Use an existing Google Sheet (or create one at https://sheets.new).

## 2. Add the script
- Extensions → Apps Script
- Delete the default code, paste the contents of `Code.gs`, save (Ctrl/Cmd+S).

## 3. Deploy
- Deploy → New deployment → Select type: Web app
- Description: RSVP receiver
- Execute as: **Me**
- Who has access: **Anyone**
- Click Deploy, approve the permissions prompt (Google will warn it's unverified —
  click Advanced → Go to project). This grants the script access to your Google
  Sheets spreadsheets, which is required to write rows.
- Copy the web app URL (looks like
  `https://script.google.com/macros/s/AKfycb.../exec`).

## 4. Connect the site
- Paste the URL into `src/config/common.ts` → `SCRIPT_URL` (used by both the RSVP form and the guestbook).
- Rebuild/redeploy the site.

## 5. Test
- Submit the RSVP form on the site → check the `RSVP` tab for a new row:
  Timestamp | Name | Attending | Guests | Answers (JSON).
- You don't need to create the `RSVP` tab yourself — the script creates it with
  headers on the first submission.
- Accept case: Attending=yes, Guests filled, Answers = JSON array of
  `{"question":"<label>","answer":"Có"|"Không"|""}` (unanswered questions keep the
  question with an empty answer string).
- Decline case: Attending=no, Guests empty, Answers still a JSON array (typically
  empty answers; any answered questions are kept).

## Guestbook
- Sending a wish appends a row to the `Wishes` tab: Timestamp | Name | Wish.
- On load the site calls `<URL>?action=wishes` and shows the latest 300, newest first.
- To hide a wish, delete its row in the sheet.

## Updating the script later
After editing Code.gs in the Apps Script editor, you must deploy a **new version**
(Deploy → Manage deployments → Edit (pencil) → New version) or the old code keeps running.
