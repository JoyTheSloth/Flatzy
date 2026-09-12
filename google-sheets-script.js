/**
 * GOOGLE APPS SCRIPT FOR FLATZY KOLKATA
 * 
 * INSTRUCTIONS:
 * 1. Open Google Sheets (https://sheets.new)
 * 2. In Row 1, add these headers in columns A through K:
 *    A1: Timestamp
 *    B1: Role (Renter / Broker / Owner)
 *    C1: Name
 *    D1: Phone
 *    E1: Company / Agency
 *    F1: Looking For / Inventory Types
 *    G1: Budget / Price
 *    H1: Location / Operating Areas
 *    I1: Shifting Date / Availability
 *    J1: Category / Notes
 *    K1: Source
 * 
 * 3. Click Extensions > Apps Script
 * 4. Delete any code in Code.gs, paste this entire file, and click Save (Ctrl+S)
 * 5. Click "Deploy" > "New deployment"
 * 6. Click the gear icon (Select type) > Choose "Web app"
 * 7. Set:
 *    - Description: Flatzy Kolkata Leads
 *    - Execute as: Me
 *    - Who has access: Anyone  <-- (VERY IMPORTANT!)
 * 8. Click "Deploy", authorize permissions, and copy the "Web app URL"
 * 9. Paste that URL into your .env file as VITE_GOOGLE_SHEET_URL=https://script.google.com/...
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Append row
    sheet.appendRow([
      data.submittedAt || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      data.role || 'Renter',
      data.fullName || '',
      data.phone || '',
      data.companyName || '',
      data.lookingForBhk || data.brokerPropertyType || '',
      data.budget || '',
      data.location || data.brokerAreas || '',
      data.shiftingDate || '',
      data.tenantCategory || data.brokerNote || '',
      data.source || 'Website Welcome Modal'
    ]);

    return ContentService.createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ result: 'error', error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handles GET for simple health check
function doGet(e) {
  return ContentService.createTextOutput("Flatzy Kolkata Google Sheets Webhook is Active! 🏠");
}
