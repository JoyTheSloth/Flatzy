import type { CommunityListing, Property, LocationName, PropertyType, FurnishingType, TenantType } from '../types/property';
import { submitLeadToGoogleSheet } from './leadService';

const STORAGE_KEY = 'flatzy_community_listings';

// Sample initial pending listing so the Admin Approval dashboard is immediately demonstrable!
const SEED_COMMUNITY_LISTINGS: CommunityListing[] = [
  {
    id: 'comm-1',
    slug: '2-bhk-salt-lake-sector-2-broker-verified',
    title: '2 BHK Green Facing Flat near Central Park',
    location: 'Salt Lake',
    subLocation: 'Sector II, Near Karunamoyee',
    address: 'BJ Block, Sector II, Salt Lake, Kolkata 700091',
    monthlyRent: 20000,
    securityDeposit: 40000,
    maintenanceCharges: 1000,
    bedrooms: 2,
    bathrooms: 2,
    balconies: 1,
    superBuiltupAreaSqFt: 920,
    carpetAreaSqFt: 780,
    floor: '2nd of 4 Floors',
    propertyType: 'Apartment',
    furnishing: 'Semi Furnished',
    availableFrom: 'Immediate',
    amenities: [
      'Split Air Conditioners',
      'Dual Lifts & Power Backup',
      '24/7 Gated Security',
      'Balcony with Open View',
      'Modular Kitchen'
    ],
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    description: 'Direct owner listing! Bright, cross-ventilated 2 BHK flat within 5 mins walk of Karunamoyee Central Bus & Metro Station. Calm, green neighborhood with zero waterlogging.',
    whyYouWillLoveIt: [
      'Walking distance to Central Park and Green Line Metro',
      'Low maintenance and friendly building association',
      'No restrictive gate hours for working professionals'
    ],
    suitableFor: ['Working Professionals', 'Bachelor', 'Family'],
    tags: ['Owner Listed', 'Green View', 'Metro Proximity'],
    commuteHighlight: '🚇 5 mins walk to Karunamoyee Metro (Green Line)',
    transitTags: ['Green Line Metro', 'Sector V IT Hub'],
    coordinates: { lat: 22.585, lng: 88.42 },
    nearbyLandmarks: [
      { name: 'Karunamoyee Metro', distance: '400 m', type: 'transit' },
      { name: 'Central Park', distance: '600 m', type: 'lifestyle' }
    ],
    brokerReferenceId: 'COM-KOL-501',
    isFeatured: true,
    viewsCount: 142,
    createdDate: new Date().toISOString().split('T')[0],
    approvalStatus: 'pending',
    submittedByRole: 'Owner',
    submitterName: 'Sourav Ganguly',
    submitterPhone: '98310 98765',
    rawPastedText: '2bhk semi furnished flat in BJ block sector 2 salt lake near karunamoyee metro. rent 20k deposit 40k. ac lift power backup available immediately. bachelors and family allowed.'
  }
];

export function getCommunityListings(): CommunityListing[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_COMMUNITY_LISTINGS));
      return SEED_COMMUNITY_LISTINGS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return SEED_COMMUNITY_LISTINGS;
  }
}

export function saveCommunityListing(listing: CommunityListing): void {
  try {
    const current = getCommunityListings();
    const updated = [listing, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Also submit lead / listing notification to Google Sheet
    submitLeadToGoogleSheet({
      fullName: listing.submitterName,
      phone: listing.submitterPhone,
      role: listing.submittedByRole,
      source: `Community Post (${listing.submittedByRole}) - Status: ${listing.approvalStatus}`,
      propertyTitle: listing.title,
      propertyId: listing.id,
      location: `${listing.subLocation}, ${listing.location}`,
      lookingForBhk: `${listing.bedrooms} BHK`,
      propertyRent: listing.monthlyRent,
      propertyDeposit: listing.securityDeposit,
      furnishingStatus: listing.furnishing,
      amenities: listing.amenities,
      photoUrls: listing.images,
      brokerNote: `Raw text: ${listing.rawPastedText || 'N/A'}`
    });
  } catch (e) {
    console.error('Failed to save community listing', e);
  }
}

export function updateListingApprovalStatus(id: string, status: 'approved' | 'rejected' | 'pending'): CommunityListing[] {
  try {
    const current = getCommunityListings();
    const updated = current.map(item => item.id === id ? { ...item, approvalStatus: status } : item);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to update listing status', e);
    return [];
  }
}

export function deleteCommunityListing(id: string): CommunityListing[] {
  try {
    const current = getCommunityListings();
    const updated = current.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to delete listing', e);
    return [];
  }
}

/**
 * Intelligent Smart Parser (Extracts structured flat details from messy WhatsApp forwards)
 * Also integrates with Groq AI if VITE_GROQ_API_KEY is provided in .env
 */
export async function parseRawTextWithAI(rawText: string): Promise<Partial<Property>> {
  const groqKey = import.meta.env.VITE_GROQ_API_KEY;

  if (groqKey && rawText.length > 10) {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${groqKey}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'system',
              content: `You are an AI for a Kolkata flat rental platform called Flatzy. 
Parse the user's raw text or WhatsApp forward into a JSON object matching this exact schema:
{
  "title": string,
  "location": "New Town" | "Rajarhat" | "Salt Lake" | "Sector V" | "Shapoorji",
  "subLocation": string,
  "monthlyRent": number,
  "securityDeposit": number,
  "bedrooms": number,
  "bathrooms": number,
  "propertyType": "Apartment" | "Gated Community" | "Studio Flat" | "1 RK" | "Independent Floor" | "Co-Living Suite",
  "furnishing": "Fully Furnished" | "Semi Furnished" | "Unfurnished",
  "amenities": string[],
  "suitableFor": ("Bachelor" | "Family" | "Student" | "Couple")[],
  "commuteHighlight": string,
  "description": string
}
Return ONLY valid JSON. If a value is unknown, make a reasonable estimate for Kolkata.`
            },
            {
              role: 'user',
              content: rawText
            }
          ],
          response_format: { type: 'json_object' },
          temperature: 0.2
        })
      });

      if (response.ok) {
        const data = await response.json();
        const parsed = JSON.parse(data.choices[0].message.content);
        return parsed;
      }
    } catch (err) {
      console.warn('Groq API call failed or timed out, falling back to smart local extractor:', err);
    }
  }

  // Smart local extractor (works 100% offline & instantly without external keys)
  return parseRawTextLocally(rawText);
}

export function parseRawTextLocally(text: string): Partial<Property> {
  const lower = text.toLowerCase();

  // BHK
  let bedrooms = 2;
  if (/1\s*rk|studio/i.test(lower)) bedrooms = 1;
  else if (/1\s*bhk/i.test(lower)) bedrooms = 1;
  else if (/3\s*bhk/i.test(lower)) bedrooms = 3;
  else if (/4\s*bhk/i.test(lower)) bedrooms = 4;

  // Rent
  let monthlyRent = 18000;
  const rentMatch = lower.match(/(?:rent|price|rs\.?|₹|\/mo)\s*[:=-]?\s*(\d{1,2}(?:,\d{3})+|\d{4,6}|\d{1,2}k)/i) 
    || lower.match(/(\d{1,2})k(?:\s*rent)?/i);
  if (rentMatch) {
    const rawVal = rentMatch[1].replace(/,/g, '').toLowerCase();
    if (rawVal.endsWith('k')) {
      monthlyRent = parseFloat(rawVal.replace('k', '')) * 1000;
    } else {
      const num = parseInt(rawVal);
      if (num > 3000 && num < 200000) monthlyRent = num;
    }
  }

  // Deposit (usually 2 months)
  const depositMatch = lower.match(/(?:deposit|security|dep)\s*[:=-]?\s*(\d{1,2}(?:,\d{3})+|\d{4,6}|\d{1,2}k)/i);
  let securityDeposit = monthlyRent * 2;
  if (depositMatch) {
    const rawDep = depositMatch[1].replace(/,/g, '').toLowerCase();
    if (rawDep.endsWith('k')) {
      securityDeposit = parseFloat(rawDep.replace('k', '')) * 1000;
    } else {
      const num = parseInt(rawDep);
      if (num > 3000) securityDeposit = num;
    }
  }

  // Location
  let location: LocationName = 'New Town';
  let subLocation = 'Action Area I';

  if (/salt\s*lake/i.test(lower)) {
    location = 'Salt Lake';
    if (/sector\s*1|sec\s*1|bd\s*block|cf\s*block|city\s*centre/i.test(lower)) subLocation = 'Sector I, near City Centre 1';
    else if (/sector\s*2|sec\s*2|karunamoyee|central\s*park/i.test(lower)) subLocation = 'Sector II, Near Karunamoyee';
    else if (/sector\s*3|sec\s*3|stadium/i.test(lower)) subLocation = 'Sector III, Near Stadium';
    else subLocation = 'Salt Lake City';
  } else if (/sector\s*v|sector\s*5|college\s*more|godrej/i.test(lower)) {
    location = 'Sector V';
    subLocation = 'Near College More & Tech Park';
  } else if (/shapoorji|sukhobristhi|action\s*area\s*3|aa3|aa-3/i.test(lower)) {
    location = 'Shapoorji';
    subLocation = 'Sukhobristhi, Action Area III';
  } else if (/rajarhat|chinar\s*park|city\s*centre\s*2|cc2|kalipark/i.test(lower)) {
    location = 'Rajarhat';
    subLocation = /chinar/i.test(lower) ? 'Chinar Park' : 'Near City Centre 2';
  } else if (/action\s*area\s*2|aa2|aa-2|eco\s*park|ecospace/i.test(lower)) {
    location = 'New Town';
    subLocation = 'Action Area II, Near Eco Park';
  } else if (/action\s*area\s*1|aa1|aa-1|axis\s*mall/i.test(lower)) {
    location = 'New Town';
    subLocation = 'Action Area I, Near Axis Mall';
  }

  // Furnishing
  let furnishing: FurnishingType = 'Semi Furnished';
  if (/fully\s*furn/i.test(lower)) furnishing = 'Fully Furnished';
  else if (/unfurn/i.test(lower)) furnishing = 'Unfurnished';

  // Amenities
  const amenities: string[] = [];
  if (/ac|air\s*condition/i.test(lower)) amenities.push('Split Air Conditioners');
  if (/lift|elevator/i.test(lower)) amenities.push('Dual Lifts & Power Backup');
  if (/security|guard|cctv/i.test(lower)) amenities.push('24/7 Gated Security');
  if (/parking/i.test(lower)) amenities.push('Visitor Parking');
  if (/wifi|internet/i.test(lower)) amenities.push('High-Speed Wi-Fi Ready');
  if (/kitchen|modular/i.test(lower)) amenities.push('Modular Kitchen');
  if (/balcony/i.test(lower)) amenities.push('Balcony with Open View');
  if (/pool|gym/i.test(lower)) amenities.push('Swimming Pool & Gymnasium');
  if (amenities.length === 0) amenities.push('Dual Lifts & Power Backup', '24/7 Gated Security');

  // Suitable for
  const suitableFor: TenantType[] = ['Working Professionals'];
  if (/bachelor|boy|girl/i.test(lower)) suitableFor.push('Bachelor');
  if (/family/i.test(lower)) suitableFor.push('Family');
  if (/student|college/i.test(lower)) suitableFor.push('Student');
  if (/couple/i.test(lower)) suitableFor.push('Couple');

  // Commute Highlight
  let commuteHighlight = `⚡ Convenient transit access in ${location}`;
  if (location === 'Sector V') commuteHighlight = '🚇 3 mins walk to Sector V Metro (Green Line)';
  else if (location === 'Salt Lake') commuteHighlight = '🚇 5 mins to Green Line Metro Station';
  else if (location === 'Shapoorji') commuteHighlight = '⚡ 5 mins to TCS Gitanjali & Candor Tech';
  else if (location === 'New Town') commuteHighlight = '💼 6 mins to Ecospace / DLF Tech Parks';

  // Title
  const title = `${bedrooms} BHK ${furnishing} in ${subLocation}`;

  return {
    title,
    location,
    subLocation,
    monthlyRent,
    securityDeposit,
    bedrooms,
    bathrooms: bedrooms > 1 ? 2 : 1,
    balconies: 1,
    superBuiltupAreaSqFt: bedrooms * 450,
    floor: '3rd of 8 Floors',
    propertyType: /gated|complex/i.test(lower) ? 'Gated Community' : 'Apartment',
    furnishing,
    availableFrom: /immediate|ready/i.test(lower) ? 'Immediate' : 'Within 7 Days',
    amenities,
    suitableFor,
    commuteHighlight,
    description: text.trim().slice(0, 300) || `Spacious and sunlit ${bedrooms} BHK flat located in ${subLocation}, ${location}. Perfect for ${suitableFor.join(' or ')}.`,
    tags: ['Community Verified', `${bedrooms} BHK`, furnishing]
  };
}
