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
 *    L1: Photo URLs
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

// Set your admin email address here to get instant notification alerts on enquiries:
var ADMIN_NOTIFY_EMAIL = "your-email@gmail.com"; // <-- Replace with your email address

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    var timestamp = data.submittedAt || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    var role = data.role || 'Renter';
    var name = data.fullName || '';
    var phone = data.phone || '';
    var company = data.companyName || '';
    var lookingFor = data.lookingForBhk || data.brokerPropertyType || '';
    var budget = data.budget || '';
    var location = data.location || data.brokerAreas || '';
    var shiftingDate = data.shiftingDate || '';
    var notes = data.tenantCategory || data.brokerNote || '';
    var source = data.source || 'Website Welcome Modal';
    var photos = Array.isArray(data.photoUrls) ? data.photoUrls.join(' , ') : (data.photoUrls || '');

    // Append row to sheet (Column A to L)
    sheet.appendRow([
      timestamp,
      role,
      name,
      phone,
      company,
      lookingFor,
      budget,
      location,
      shiftingDate,
      notes,
      source,
      photos
    ]);

    // Send email alert to admin if email is set
    if (ADMIN_NOTIFY_EMAIL && ADMIN_NOTIFY_EMAIL !== "your-email@gmail.com") {
      try {
        var isListingEnquiry = role.toLowerCase().indexOf('owner') !== -1 || role.toLowerCase().indexOf('broker') !== -1 || source.indexOf('List Flat') !== -1;
        var subject = isListingEnquiry 
          ? "🔔 Flatzy Alert: New " + role.toUpperCase() + " Listing Enquiry (" + name + " - " + location + ")"
          : "🏠 Flatzy Lead: New " + role + " - " + name + " (" + location + ")";

        var emailBody = "New enquiry submitted on Flatzy Kolkata:\n\n"
          + "Role: " + role + "\n"
          + "Name: " + name + "\n"
          + "WhatsApp/Phone: " + phone + "\n"
          + (company ? "Agency / Firm: " + company + "\n" : "")
          + "Property / BHK: " + lookingFor + "\n"
          + "Expected Rent / Budget: " + budget + "\n"
          + "Location: " + location + "\n"
          + "Notes / Details: " + notes + "\n"
          + "Source: " + source + "\n"
          + "Time: " + timestamp + "\n\n"
          + "Go to your Flatzy Admin Panel (#admin or passcode FLATZY700) to review and approve listings!";

        MailApp.sendEmail(ADMIN_NOTIFY_EMAIL, subject, emailBody);
      } catch (mailErr) {
        Logger.log("Mail error: " + mailErr.toString());
      }
    }

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
