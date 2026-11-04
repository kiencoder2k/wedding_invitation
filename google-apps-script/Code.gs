/**
 * RSVP + guestbook → Google Sheets
 *
 * Setup:
 * 1. Open your Google Sheet → Extensions → Apps Script
 * 2. Paste this file, save
 * 3. Deploy → New deployment → Web app
 *      - Execute as: Me
 *      - Who has access: Anyone
 * 4. Copy the web app URL into src/config/common.ts (SCRIPT_URL)
 *
 * Endpoints:
 *   POST {name, attending, guests, answers}  → append to "RSVP"
 *   POST {type: "wish", name, wish}          → append to "Wishes"
 *   GET  ?action=wishes                      → {ok, wishes: [{name, wish, at}]}, newest first
 */

const RSVP_HEADERS = ['Timestamp', 'Name', 'Attending', 'Guests', 'Answers']
const WISH_HEADERS = ['Timestamp', 'Name', 'Wish']
const MAX_WISHES = 300

function getSheet_(name, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  let sheet = ss.getSheetByName(name)
  if (!sheet) sheet = ss.insertSheet(name)
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers)
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold')
  }
  return sheet
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents)
    if (data.type === 'wish') return addWish_(data)

    const name = String(data.name || '').trim()
    const attending = data.attending === 'no' ? 'no' : 'yes'
    const guests = attending === 'yes' ? String(data.guests || 1) : ''
    const answers = Array.isArray(data.answers) ? data.answers : []
    const answersJson = JSON.stringify(
      answers.map((a) => ({ question: String(a.question || ''), answer: String(a.answer || '') }))
    )

    getSheet_('RSVP', RSVP_HEADERS).appendRow([new Date(), name, attending, guests, answersJson])

    return json_({ ok: true })
  } catch (err) {
    return json_({ ok: false, error: String(err) })
  }
}

function doGet(e) {
  try {
    if (e.parameter.action !== 'wishes') return json_({ ok: false, error: 'unknown action' })
    const sheet = getSheet_('Wishes', WISH_HEADERS)
    const rows = sheet.getLastRow() - 1
    if (rows <= 0) return json_({ ok: true, wishes: [] })
    const count = Math.min(rows, MAX_WISHES)
    const values = sheet.getRange(sheet.getLastRow() - count + 1, 1, count, 3).getValues()
    const wishes = values
      .filter((r) => r[1] && r[2])
      .map((r) => ({
        at: r[0] instanceof Date ? r[0].toISOString() : null,
        name: String(r[1]),
        wish: String(r[2]),
      }))
      .reverse()
    return json_({ ok: true, wishes })
  } catch (err) {
    return json_({ ok: false, error: String(err) })
  }
}

function addWish_(data) {
  const name = String(data.name || '').trim().slice(0, 80)
  const wish = String(data.wish || '').trim().slice(0, 1000)
  if (!name || !wish) return json_({ ok: false, error: 'name and wish are required' })
  const at = new Date()
  getSheet_('Wishes', WISH_HEADERS).appendRow([at, plain_(name), plain_(wish)])
  return json_({ ok: true, at: at.toISOString() })
}

// Stops guest text like "=HYPERLINK(...)" from being stored as a formula
function plain_(text) {
  return /^[=+\-@]/.test(text) ? `'${text}` : text
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  )
}
