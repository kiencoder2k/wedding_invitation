/**
 * RSVP → Google Sheets
 *
 * Setup:
 * 1. Open your Google Sheet → Extensions → Apps Script
 * 2. Paste this file, save
 * 3. Deploy → New deployment → Web app
 *      - Execute as: Me
 *      - Who has access: Anyone
 * 4. Copy the web app URL into src/config/common.ts (rsvp.endpoint)
 */

const HEADERS = ['Timestamp', 'Name', 'Attending', 'Guests', 'Answers']

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  let sheet = ss.getSheetByName('RSVP')
  if (!sheet) sheet = ss.insertSheet('RSVP')
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS)
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold')
  }
  return sheet
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents)
    const name = String(data.name || '').trim()
    const attending = data.attending === 'no' ? 'no' : 'yes'
    const guests = attending === 'yes' ? String(data.guests || 1) : ''
    const answers = Array.isArray(data.answers) ? data.answers : []
    const answersJson = JSON.stringify(
      answers.map((a) => ({ question: String(a.question || ''), answer: String(a.answer || '') }))
    )

    getSheet_().appendRow([new Date(), name, attending, guests, answersJson])

    return json_({ ok: true })
  } catch (err) {
    return json_({ ok: false, error: String(err) })
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  )
}
