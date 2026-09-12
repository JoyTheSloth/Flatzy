export interface LeadSubmission {
  fullName: string;
  phone: string;
  role?: 'Renter' | 'Broker' | 'Owner';
  companyName?: string;
  lookingForBhk?: string;
  budget?: string;
  location?: string;
  shiftingDate?: string;
  tenantCategory?: string;
  brokerAreas?: string;
  brokerPropertyType?: string;
  brokerNote?: string;
  source?: string;
  submittedAt?: string;
}

// You can set VITE_GOOGLE_SHEET_URL in your .env file or paste the deployed Web App URL below:
export const GOOGLE_SHEET_WEB_APP_URL = 
  import.meta.env.VITE_GOOGLE_SHEET_URL || 'https://script.google.com/macros/s/AKfycbwzQ971x6FJyTRdqSYx7tN7-ZcOP-_yeqNCMSw2YrFK2zNnbFJfcjVEci92Ro_izolOnA/exec';

/**
 * Submits lead data to Google Sheets via Google Apps Script Web App.
 * Uses mode: 'no-cors' so that Google's redirect response completes without CORS issues.
 */
export async function submitLeadToGoogleSheet(lead: LeadSubmission): Promise<{ success: boolean; error?: string }> {
  const payload = {
    ...lead,
    submittedAt: lead.submittedAt || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    source: lead.source || 'Website Welcome Modal',
  };

  // 1. Always store locally in browser as a reliable backup
  try {
    const existingLeads = JSON.parse(localStorage.getItem('flatzy_leads') || '[]');
    existingLeads.unshift(payload);
    localStorage.setItem('flatzy_leads', JSON.stringify(existingLeads.slice(0, 50)));
  } catch (err) {
    console.warn('Could not save to localStorage', err);
  }

  // 2. If Google Sheet Web App URL is configured, POST the data
  if (GOOGLE_SHEET_WEB_APP_URL) {
    try {
      await fetch(GOOGLE_SHEET_WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors', // essential for Google Apps Script redirects
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      return { success: true };
    } catch (err: any) {
      console.error('Failed to submit to Google Sheet:', err);
      // Still return success to user so they can reach WhatsApp, but log error
      return { success: false, error: err?.message };
    }
  } else {
    console.info('Google Sheet URL not configured yet. Lead stored locally in localStorage (flatzy_leads).');
    return { success: true };
  }
}
