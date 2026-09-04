import type { FlatReelVideo } from '../types/property';

export const INITIAL_REELS_DATA: FlatReelVideo[] = [
  {
    id: 'reel-1',
    title: 'Shapoorji Sukhobristhi 2 BHK Full Walkthrough',
    caption: 'Step inside this fully furnished 2 BHK flat in Shapoorji Sukhobristhi, Action Area III. Includes modular kitchen, living lounge, AC bedrooms, and scenic balcony view. Ideal for students & IT folks!',
    thumbnail: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    propertyId: 'prop-1',
    location: 'New Town',
    subLocation: 'Action Area III (Shapoorji)',
    bhk: '2 BHK',
    monthlyRent: 16500,
    furnishing: 'Fully Furnished',
    views: '4.8k',
    likes: '342',
    duration: '0:45',
    tag: 'Student & Bachelor Special',
    verified: true
  },
  {
    id: 'reel-2',
    title: 'Webel Tech Park 2 BHK Tour — 3 Mins to Sector V Metro',
    caption: 'Zero commute living! 2 BHK modern tech apartment right in Sector V with 300 Mbps fiber setup, study work desks, and full modular furnishing.',
    thumbnail: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80',
    propertyId: 'prop-9',
    location: 'Sector V',
    subLocation: 'Near College More & RDB Boulevard',
    bhk: '2 BHK',
    monthlyRent: 22000,
    furnishing: 'Fully Furnished',
    views: '7.1k',
    likes: '518',
    duration: '0:38',
    tag: 'Walk to IT Hub',
    verified: true
  },
  {
    id: 'reel-3',
    title: 'Salt Lake Sector 1 Independent Floor with Balcony Garden',
    caption: 'Serene tree-lined living next to City Centre 1 Salt Lake. 2 BHK with private open balcony, huge master bedroom, and peaceful residential vibe.',
    thumbnail: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    propertyId: 'prop-7',
    location: 'Salt Lake',
    subLocation: 'Sector I (Near City Centre 1)',
    bhk: '2 BHK',
    monthlyRent: 18500,
    furnishing: 'Semi-Furnished',
    views: '3.9k',
    likes: '290',
    duration: '0:32',
    tag: 'Independent Floor',
    verified: true
  },
  {
    id: 'reel-4',
    title: 'Eco Park Lake View 2 BHK High-Rise Condo',
    caption: 'Wake up to the panoramic Kolkata skyline and Eco Park waters. 2 BHK gated community flat with club access, gym, swimming pool, and dedicated security.',
    thumbnail: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    propertyId: 'prop-4',
    location: 'New Town',
    subLocation: 'Action Area II (Eco Park)',
    bhk: '2 BHK',
    monthlyRent: 28000,
    furnishing: 'Fully Furnished',
    views: '6.4k',
    likes: '480',
    duration: '0:52',
    tag: 'Lake & Skyline View',
    verified: true
  },
  {
    id: 'reel-5',
    title: 'Karunamoyee 1 RK Studio Flat — 5 Mins to Metro',
    caption: 'Compact, ultra-affordable 1 RK studio flat with private attached bathroom and kitchenette. Walk to Karunamoyee Central Bus Station & Metro.',
    thumbnail: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    propertyId: 'prop-7',
    location: 'Salt Lake',
    subLocation: 'Sector II (Karunamoyee)',
    bhk: '1 RK',
    monthlyRent: 11000,
    furnishing: 'Furnished Studio',
    views: '5.6k',
    likes: '412',
    duration: '0:29',
    tag: 'Affordable 1 RK',
    verified: true
  },
  {
    id: 'reel-6',
    title: 'Hiland Woods 3 BHK Luxury Gated Society Tour',
    caption: 'Spacious 3 BHK apartment in New Town with double balconies, clubhouse amenities, power backup, and modern kitchen. Perfect for growing families.',
    thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    propertyId: 'prop-2',
    location: 'New Town',
    subLocation: 'Action Area II',
    bhk: '3 BHK',
    monthlyRent: 24000,
    furnishing: 'Semi-Furnished',
    views: '3.2k',
    likes: '225',
    duration: '0:48',
    tag: 'Family Society',
    verified: true
  }
];

const LOCAL_STORAGE_KEY = 'flatzy_custom_reels_v1';

export const getStoredReels = (): FlatReelVideo[] => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return INITIAL_REELS_DATA;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_REELS_DATA;
  } catch {
    return INITIAL_REELS_DATA;
  }
};

export const saveCustomReel = (newReel: FlatReelVideo): FlatReelVideo[] => {
  try {
    const current = getStoredReels();
    const updated = [newReel, ...current];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [newReel, ...INITIAL_REELS_DATA];
  }
};
