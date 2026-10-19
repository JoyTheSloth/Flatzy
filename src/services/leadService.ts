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
  // Visit scheduling fields
  visitType?: 'In-Person' | 'Video Tour';
  visitDate?: string;
  visitSlot?: string;
  propertyTitle?: string;
  propertyId?: string;
  // Owner listing fields
  propertyRent?: number;
  propertyDeposit?: number;
  furnishingStatus?: string;
  amenities?: string[];
  photoUrls?: string[];
}

// Supabase Configuration
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://jpkmyrbzpdpgcvesyzbb.supabase.co';
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impwa215cmJ6cGRwZ2N2ZXN5emJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI0MjcxNTAsImV4cCI6MjEwODAwMzE1MH0.4Qc9H7KwQXVDmdHg4w9qPD8-ovoRKVJpgWQUqvu1_SA';

// You can set VITE_GOOGLE_SHEET_URL in your .env file or paste the deployed Web App URL below:
export const GOOGLE_SHEET_WEB_APP_URL = 
  import.meta.env.VITE_GOOGLE_SHEET_URL || 'https://script.google.com/macros/s/AKfycbwzQ971x6FJyTRdqSYx7tN7-ZcOP-_yeqNCMSw2YrFK2zNnbFJfcjVEci92Ro_izolOnA/exec';

/**
 * Inserts the lead directly into the Supabase 'inquiries' table used by FlatzyAdmin portal.
 */
async function submitLeadToSupabase(lead: LeadSubmission): Promise<{ success: boolean; error?: string }> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return { success: false, error: 'Supabase credentials missing' };
  }

  try {
    // Generate an ID if needed: e.g. "lead_1710924900000"
    const inquiryId = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const inquiryPayload = {
      id: inquiryId,
      name: lead.fullName || 'Anonymous Lead',
      phone: lead.phone || '',
      bhk: lead.lookingForBhk || 'Not specified',
      property: lead.propertyTitle || lead.brokerPropertyType || 'Flat',
      location: lead.location || lead.brokerAreas || 'Kolkata',
      furnishing: lead.furnishingStatus || 'Unspecified',
      budget: lead.budget ? (lead.budget.startsWith('₹') ? lead.budget : `₹${lead.budget}`) : 'Flexible',
      shifting_date: lead.shiftingDate || 'Immediate',
      tenant_type: lead.tenantCategory || (lead.role === 'Broker' ? 'Broker / Channel Partner' : lead.role === 'Owner' ? 'Owner / Landlord' : 'Family / Bachelor'),
      status: 'New',
      is_hot: false,
      is_closed: false,
      last_follow_up: 'Just now',
      created_at: new Date().toISOString()
    };

    const res = await fetch(`${SUPABASE_URL}/rest/v1/inquiries`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(inquiryPayload)
    });

    if (!res.ok) {
      const errText = await res.text();
      console.warn('Supabase lead insertion error:', res.status, errText);
      return { success: false, error: errText };
    }

    return { success: true };
  } catch (err: any) {
    console.error('Supabase network error during lead submission:', err);
    return { success: false, error: err?.message };
  }
}

/**
 * Submits lead data simultaneously to:
 * 1. Supabase 'inquiries' table (reflects in real-time in the FlatzyAdmin portal)
 * 2. Google Sheets via Google Apps Script Web App
 * 3. Browser localStorage backup
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

  // 2. Submit to Supabase (FlatzyAdmin Portal) in parallel
  const supabasePromise = submitLeadToSupabase(lead).catch((err) => {
    console.warn('Supabase sync background error:', err);
    return { success: false };
  });

  // 3. If Google Sheet Web App URL is configured, POST the data
  let sheetPromise: Promise<any> = Promise.resolve({ success: true });
  if (GOOGLE_SHEET_WEB_APP_URL) {
    sheetPromise = fetch(GOOGLE_SHEET_WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors', // essential for Google Apps Script redirects
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then(() => ({ success: true })).catch((err: any) => {
      console.error('Failed to submit to Google Sheet:', err);
      return { success: false, error: err?.message };
    });
  }

  // Await both destinations without blocking user experience
  const [supabaseRes, sheetRes] = await Promise.all([supabasePromise, sheetPromise]);

  return { 
    success: true, 
    error: supabaseRes.error || sheetRes.error 
  };
}

