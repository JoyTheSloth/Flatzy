import type { Property } from '../types/property';

export const PROPERTIES_DATA: Property[] = [
  {
    id: 'prop-1',
    slug: '2-bhk-shapoorji-sukhobristhi-action-area-3',
    title: '2 BHK Modern Furnished Apartment',
    location: 'Shapoorji',
    subLocation: 'Sukhobristhi Phase 2, Action Area III',
    address: 'Tower 42, Sukhobristhi Complex, Action Area III, New Town, Kolkata 700135',
    monthlyRent: 16500,
    securityDeposit: 33000,
    maintenanceCharges: 1200,
    bedrooms: 2,
    bathrooms: 2,
    balconies: 1,
    superBuiltupAreaSqFt: 820,
    carpetAreaSqFt: 690,
    floor: '6th of 14 Floors',
    propertyType: 'Gated Community',
    furnishing: 'Fully Furnished',
    availableFrom: 'Immediate',
    amenities: [
      'Split Air Conditioners',
      'High-Speed Wi-Fi Ready',
      'Dual Lifts & Power Backup',
      '24/7 Gated Security',
      'RO Water Purifier',
      'Double Beds with Mattresses',
      'Wardrobes & Study Desks',
      'Fully Equipped Kitchen',
      'Balcony with Open View',
      'Visitor Parking'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Freshly painted, sunlit 2 BHK apartment inside Kolkata’s most sought-after bachelor and student complex. Perfect for roommates or IT professionals working at TCS Gitanjali Park or Candor TechSpace. Features modern modular kitchen, AC in both bedrooms, ergonomic study tables, and a peaceful green balcony view.',
    whyYouWillLoveIt: [
      '5 minutes ride to TCS Gitanjali Park & Candor TechSpace',
      'Ample grocery stores, cafes, and tiffin options within 200m',
      'No unnecessary broker grilling or restrictive gate hours',
      'High-speed fiber connectivity already pre-installed'
    ],
    suitableFor: ['Student', 'Bachelor', 'Couple'],
    tags: ['Hot Deal', 'Bachelor Friendly', 'Walk to Market', 'Fully Furnished'],
    coordinates: { lat: 22.5697, lng: 88.4984 },
    nearbyLandmarks: [
      { name: 'Amity University Kolkata', distance: '1.2 km', type: 'college' },
      { name: 'TCS Gitanjali Park', distance: '1.8 km', type: 'workplace' },
      { name: 'Shapoorji Main Bazaar', distance: '300 m', type: 'lifestyle' },
      { name: 'Candor TechSpace Bus Stop', distance: '1.5 km', type: 'transit' }
    ],
    brokerReferenceId: 'FLZ-KOL-101',
    isFeatured: true,
    viewsCount: 642,
    createdDate: '2026-08-28'
  },
  {
    id: 'prop-2',
    slug: '1-rk-studio-shapoorji-budget-friendly',
    title: '1 RK Cozy Bachelor Studio with Balcony',
    location: 'Shapoorji',
    subLocation: 'Sukhobristhi Phase 1, Action Area III',
    address: 'Block E, Sukhobristhi, New Town, Kolkata 700135',
    monthlyRent: 9500,
    securityDeposit: 19000,
    maintenanceCharges: 800,
    bedrooms: 1,
    bathrooms: 1,
    balconies: 1,
    superBuiltupAreaSqFt: 460,
    carpetAreaSqFt: 380,
    floor: '3rd of 5 Floors',
    propertyType: '1 RK',
    furnishing: 'Semi Furnished',
    availableFrom: 'Immediate',
    amenities: [
      'Queen Bed & Wardrobe',
      'Kitchen Slab with Exhaust',
      'Geyser Installed',
      '24/7 Security Guard',
      'Dedicated Two-Wheeler Parking',
      'Quiet Sector Lane'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Clean, practical 1 BHK specifically tailored for students and single professionals who want privacy without high overheads. Includes essential furnishings, geyser, kitchen cabinets, and easy access to local tiffin services.',
    whyYouWillLoveIt: [
      'Under ₹10k monthly rent inside New Town Action Area 3',
      'Hassle-free landlord, completely bachelor friendly',
      'E-rickshaws available right outside the block'
    ],
    suitableFor: ['Student', 'Bachelor'],
    tags: ['Under ₹10K', 'Pocket Friendly', 'Student Pick'],
    coordinates: { lat: 22.5682, lng: 88.4965 },
    nearbyLandmarks: [
      { name: 'Aliah University', distance: '2.1 km', type: 'college' },
      { name: 'Shapoorji Auto Stand', distance: '150 m', type: 'transit' },
      { name: 'Spencers Daily', distance: '400 m', type: 'lifestyle' }
    ],
    brokerReferenceId: 'FLZ-KOL-102',
    isFeatured: false,
    viewsCount: 420,
    createdDate: '2026-09-01'
  },
  {
    id: 'prop-3',
    slug: '3-bhk-luxury-new-town-action-area-1',
    title: '3 BHK Premium High-Rise with Pool & Club',
    location: 'New Town',
    subLocation: 'Action Area I, Near Axis Mall',
    address: 'Rosedale Luxury Tower, Action Area I, New Town, Kolkata 700156',
    monthlyRent: 28000,
    securityDeposit: 56000,
    maintenanceCharges: 2500,
    bedrooms: 3,
    bathrooms: 3,
    balconies: 2,
    superBuiltupAreaSqFt: 1480,
    carpetAreaSqFt: 1220,
    floor: '11th of 22 Floors',
    propertyType: 'Gated Community',
    furnishing: 'Fully Furnished',
    availableFrom: 'Immediate',
    amenities: [
      'Swimming Pool & Gymnasium',
      'Clubhouse & Badminton Court',
      'Covered Car Parking',
      'Modular Kitchen with Chimney & Hob',
      'Inverter Power Backup',
      'Intercom & Video Door Phone',
      'Air Conditioners in All Rooms',
      'Walking Track & Landscaped Garden'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Stunning 3 BHK designer home offering sweeping panoramic skyline views of New Town. Features Italian marble flooring, premium woodwork, centralized clubhouse amenities, and high-tier security. Ideal for corporate executives, expat couples, and modern families.',
    whyYouWillLoveIt: [
      'Walk to Axis Mall, multiplex, and Novotel Hotel',
      'Top-notch society with pool, gym, and 100% power backup',
      'Direct connection to Major Arterial Road & Sector V'
    ],
    suitableFor: ['Working Professionals', 'Couple', 'Family'],
    tags: ['Luxury Pick', 'Pool & Gym', 'Panoramic Views', 'Family Approved'],
    coordinates: { lat: 22.5857, lng: 88.4632 },
    nearbyLandmarks: [
      { name: 'Axis Mall', distance: '400 m', type: 'lifestyle' },
      { name: 'Biswa Bangla Gate', distance: '1.4 km', type: 'lifestyle' },
      { name: 'Sector V IT Hub', distance: '2.5 km', type: 'workplace' },
      { name: 'Upcoming Metro Station', distance: '350 m', type: 'transit' }
    ],
    brokerReferenceId: 'FLZ-KOL-103',
    isFeatured: true,
    viewsCount: 890,
    createdDate: '2026-08-25'
  },
  {
    id: 'prop-4',
    slug: '2-bhk-new-town-action-area-2-eco-park',
    title: '2 BHK Airy Flat Overlooking Eco Park',
    location: 'New Town',
    subLocation: 'Action Area II, Near Eco Space',
    address: 'Uniworld City Heights, Action Area II, New Town, Kolkata 700161',
    monthlyRent: 21000,
    securityDeposit: 42000,
    maintenanceCharges: 1600,
    bedrooms: 2,
    bathrooms: 2,
    balconies: 1,
    superBuiltupAreaSqFt: 960,
    carpetAreaSqFt: 780,
    floor: '8th of 16 Floors',
    propertyType: 'Gated Community',
    furnishing: 'Fully Furnished',
    availableFrom: 'Within 15 Days',
    amenities: [
      'AC in Living & Master Bed',
      'Smart TV & High-Speed WiFi',
      'Refrigerator & Washing Machine',
      'Gated Campus with CCTV',
      'Elevator with Backup',
      'Reserved Car Parking'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Contemporary 2-bedroom home situated right next to Eco Space Business Park. Enjoy morning jogs along Eco Park lake. Beautifully furnished with plush sofa set, dining table, kitchen appliances, and ergonomic work stations.',
    whyYouWillLoveIt: [
      'Zero commute time to Eco Space, Ecocentre & DLF 2',
      'Unobstructed sunset views over the water bodies',
      'Friendly cooperative society with young professionals'
    ],
    suitableFor: ['Working Professionals', 'Couple', 'Bachelor'],
    tags: ['Near Eco Space', 'Green View', 'Fully Furnished', 'Corporate Favorite'],
    coordinates: { lat: 22.5971, lng: 88.4729 },
    nearbyLandmarks: [
      { name: 'Eco Space Business Park', distance: '600 m', type: 'workplace' },
      { name: 'Eco Park Gate 4', distance: '800 m', type: 'lifestyle' },
      { name: 'Mother’s Wax Museum', distance: '1.2 km', type: 'lifestyle' }
    ],
    brokerReferenceId: 'FLZ-KOL-104',
    isFeatured: true,
    viewsCount: 512,
    createdDate: '2026-08-30'
  },
  {
    id: 'prop-5',
    slug: '2-bhk-rajarhat-chinar-park-metro-link',
    title: '2 BHK Modern Flat near Chinar Park',
    location: 'Rajarhat',
    subLocation: 'Chinar Park, Near City Centre 2',
    address: 'Greenfield Elegance, Rajarhat Main Road, Kolkata 700136',
    monthlyRent: 17500,
    securityDeposit: 35000,
    maintenanceCharges: 1400,
    bedrooms: 2,
    bathrooms: 2,
    balconies: 1,
    superBuiltupAreaSqFt: 880,
    carpetAreaSqFt: 720,
    floor: '4th of 8 Floors',
    propertyType: 'Apartment',
    furnishing: 'Semi Furnished',
    availableFrom: 'Immediate',
    amenities: [
      'Lift with Automatic Rescue Device',
      'Covered Bike Parking',
      'Modular Kitchen Cabinets',
      'Wardrobes in Both Rooms',
      '24/7 Water Supply',
      'Intercom Facility'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Well-connected 2 BHK flat within 3 minutes walk of Chinar Park crossing. Surrounded by famous Kolkata eateries (Arsalan, Aminia, Oudh 1590), supermarkets, and round-the-clock transport to Airport and Salt Lake.',
    whyYouWillLoveIt: [
      'Foodie paradise: walking distance to Kolkata’s best biryani joints',
      '10 minutes straight drive to Kolkata International Airport',
      'Spacious airy rooms with marble flooring'
    ],
    suitableFor: ['Couple', 'Family', 'Working Professionals'],
    tags: ['Foodie Hub', 'Near Airport', 'Chinar Park'],
    coordinates: { lat: 22.6288, lng: 88.4489 },
    nearbyLandmarks: [
      { name: 'City Centre 2 Mall', distance: '900 m', type: 'lifestyle' },
      { name: 'Chinar Park Crossing', distance: '250 m', type: 'transit' },
      { name: 'Kolkata Airport (CCU)', distance: '4.2 km', type: 'transit' }
    ],
    brokerReferenceId: 'FLZ-KOL-105',
    isFeatured: false,
    viewsCount: 380,
    createdDate: '2026-09-02'
  },
  {
    id: 'prop-6',
    slug: '1-bhk-rajarhat-cozy-couple-pad',
    title: '1 BHK Cute Furnished Apartment',
    location: 'Rajarhat',
    subLocation: 'Kalipark, VIP Road Link',
    address: 'Silver Oak Residency, Kalipark, Rajarhat, Kolkata 700136',
    monthlyRent: 11500,
    securityDeposit: 23000,
    maintenanceCharges: 900,
    bedrooms: 1,
    bathrooms: 1,
    balconies: 1,
    superBuiltupAreaSqFt: 510,
    carpetAreaSqFt: 420,
    floor: '2nd of 5 Floors',
    propertyType: 'Apartment',
    furnishing: 'Fully Furnished',
    availableFrom: 'Immediate',
    amenities: [
      'AC in Bedroom',
      'Double Bed with Storage',
      'Sofa & Coffee Table',
      'Refrigerator & Induction',
      'Lift & Water Filtration'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Charming, pocket-friendly 1 BHK home fully equipped with all daily living essentials. Perfect for single professionals or couples relocating to Kolkata who want a quick plug-and-play move-in.',
    whyYouWillLoveIt: [
      'Move in with just your suitcase; everything is ready',
      'Close to Haldiram’s VIP road transit point',
      'Extremely safe and quiet residential neighborhood'
    ],
    suitableFor: ['Couple', 'Bachelor', 'Working Professionals'],
    tags: ['Plug & Play', 'Couple Friendly', 'Affordable Rent'],
    coordinates: { lat: 22.6241, lng: 88.4412 },
    nearbyLandmarks: [
      { name: 'Haldiram VIP Road', distance: '1.1 km', type: 'transit' },
      { name: 'Charnock Hospital', distance: '1.4 km', type: 'lifestyle' }
    ],
    brokerReferenceId: 'FLZ-KOL-106',
    isFeatured: false,
    viewsCount: 295,
    createdDate: '2026-09-03'
  },
  {
    id: 'prop-7',
    slug: '2-bhk-salt-lake-sector-1-independent-floor',
    title: '2 BHK Independent Sector Floor near City Centre 1',
    location: 'Salt Lake',
    subLocation: 'Sector I, BD Block',
    address: 'BD-142, Sector I, Bidhannagar, Kolkata 700064',
    monthlyRent: 23500,
    securityDeposit: 47000,
    maintenanceCharges: 500,
    bedrooms: 2,
    bathrooms: 2,
    balconies: 2,
    superBuiltupAreaSqFt: 1050,
    carpetAreaSqFt: 890,
    floor: '1st of 3 Floors (Independent)',
    propertyType: 'Independent Floor',
    furnishing: 'Semi Furnished',
    availableFrom: 'Immediate',
    amenities: [
      'Separate Private Entrance',
      'Wide Sector Balconies with Tree Canopy',
      'Modular Kitchen',
      'Dedicated Car Parking Space',
      '24 Hours Running Water',
      'Pet Friendly'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Experience classic Salt Lake serenity. This independent first-floor residence overlooks BD Block park. Generous rooms, high ceilings, abundant cross-ventilation, and pet-friendly surroundings. Only 5 mins from City Centre 1 mall and metro.',
    whyYouWillLoveIt: [
      'No apartment complex politics or excessive maintenance fees',
      '5 minutes walk to City Centre 1 and Central Park',
      'Pet-friendly landlord and tranquil green neighbourhood'
    ],
    suitableFor: ['Couple', 'Family', 'Working Professionals'],
    tags: ['Pet Friendly', 'Greenery', 'Salt Lake Sector 1', 'Independent Floor'],
    coordinates: { lat: 22.5898, lng: 88.4089 },
    nearbyLandmarks: [
      { name: 'City Centre 1 Salt Lake', distance: '500 m', type: 'lifestyle' },
      { name: 'Central Park Metro Station', distance: '750 m', type: 'transit' },
      { name: 'Bidhannagar College', distance: '1.2 km', type: 'college' }
    ],
    brokerReferenceId: 'FLZ-KOL-107',
    isFeatured: true,
    viewsCount: 710,
    createdDate: '2026-08-27'
  },
  {
    id: 'prop-8',
    slug: '3-bhk-salt-lake-sector-3-stadium-metro',
    title: '3 BHK Spacious Home near Salt Lake Stadium',
    location: 'Salt Lake',
    subLocation: 'Sector III, Near Stadium Metro',
    address: 'IB Block, Sector III, Salt Lake, Kolkata 700106',
    monthlyRent: 31000,
    securityDeposit: 62000,
    maintenanceCharges: 1800,
    bedrooms: 3,
    bathrooms: 3,
    balconies: 2,
    superBuiltupAreaSqFt: 1350,
    carpetAreaSqFt: 1140,
    floor: '3rd of 6 Floors',
    propertyType: 'Apartment',
    furnishing: 'Fully Furnished',
    availableFrom: 'Immediate',
    amenities: [
      'Air Conditioners in All 3 Bedrooms',
      'Lift with Generator Backup',
      'Covered Car Parking',
      'Modern Kitchen with Gas Pipeline',
      'Security Gate with Biometrics',
      'Large Living-Dining Hall'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1502005229762-ee1b2da97306?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1502005229762-ee1b2da97306?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Expansive 3-bedroom residence ideally situated near Salt Lake Stadium and EM Bypass junction. Seamless travel to Park Circus, South Kolkata, and Sector V. Fitted with premium furniture, smart storage, and expansive living lounge.',
    whyYouWillLoveIt: [
      'Quick access to EM Bypass and Hyatt Regency',
      'Walking distance to Stadium Metro station (Green Line)',
      'Large master suite with attached walk-in closet'
    ],
    suitableFor: ['Family', 'Working Professionals'],
    tags: ['Metro 2 Mins', 'Spacious 3 BHK', 'EM Bypass Access'],
    coordinates: { lat: 22.5714, lng: 88.4061 },
    nearbyLandmarks: [
      { name: 'Stadium Metro Station', distance: '300 m', type: 'transit' },
      { name: 'Salt Lake Stadium (VYBK)', distance: '400 m', type: 'lifestyle' },
      { name: 'Columbia Asia Hospital', distance: '900 m', type: 'lifestyle' }
    ],
    brokerReferenceId: 'FLZ-KOL-108',
    isFeatured: false,
    viewsCount: 460,
    createdDate: '2026-08-29'
  },
  {
    id: 'prop-9',
    slug: '2-bhk-sector-v-walk-to-techno-india',
    title: '2 BHK Smart Apartment next to Sector V Metro',
    location: 'Sector V',
    subLocation: 'Near College More & RDB Boulevard',
    address: 'Webel Tech Park Towers, Sector V, Salt Lake, Kolkata 700091',
    monthlyRent: 22000,
    securityDeposit: 44000,
    maintenanceCharges: 1800,
    bedrooms: 2,
    bathrooms: 2,
    balconies: 1,
    superBuiltupAreaSqFt: 920,
    carpetAreaSqFt: 760,
    floor: '9th of 18 Floors',
    propertyType: 'Apartment',
    furnishing: 'Fully Furnished',
    availableFrom: 'Immediate',
    amenities: [
      'Zero Commute to IT Hub',
      'High-Speed 300 Mbps Fiber Wifi',
      'Work Desks in Both Rooms',
      'Smart Door Lock',
      '24/7 Power Backup',
      'Clubhouse & Gym',
      'Rooftop Lounge'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Designed specifically for the modern tech professional or university student. Literally 3 minutes walk to College More and Sector V Metro. Say goodbye to auto queues and traffic jams. Tastefully decorated with Scandinavian furniture and dedicated work-from-home setups.',
    whyYouWillLoveIt: [
      'Walk to TCS, Cognizant, Wipro, and Techno India in 5 mins',
      'Surrounded by breweries, coffee shops, and late-night food joints',
      'Rooftop lounge overlooking Kolkata IT skyline'
    ],
    suitableFor: ['Working Professionals', 'Student', 'Bachelor'],
    tags: ['Tech Hub', 'Walk to Office', 'Sector V Metro', 'Best for IT'],
    coordinates: { lat: 22.5802, lng: 88.4331 },
    nearbyLandmarks: [
      { name: 'College More & Techno India', distance: '250 m', type: 'college' },
      { name: 'Sector V Metro Station', distance: '300 m', type: 'transit' },
      { name: 'RDB Boulevard & Cinepolis', distance: '400 m', type: 'lifestyle' },
      { name: 'Godrej Waterside', distance: '500 m', type: 'workplace' }
    ],
    brokerReferenceId: 'FLZ-KOL-109',
    isFeatured: true,
    viewsCount: 1120,
    createdDate: '2026-08-26'
  },
  {
    id: 'prop-10',
    slug: '1-bhk-sector-v-co-living-suite',
    title: '1 BHK Co-Living Suite with Daily Housekeeping',
    location: 'Sector V',
    subLocation: 'EP Block, Near Godrej Genesis',
    address: 'Hub5 Residences, Sector V, Salt Lake, Kolkata 700091',
    monthlyRent: 14500,
    securityDeposit: 20000,
    maintenanceCharges: 0,
    bedrooms: 1,
    bathrooms: 1,
    balconies: 1,
    superBuiltupAreaSqFt: 480,
    carpetAreaSqFt: 390,
    floor: '5th of 10 Floors',
    propertyType: 'Co-Living Suite',
    furnishing: 'Fully Furnished',
    availableFrom: 'Immediate',
    amenities: [
      'All Bills Included (Electricity & WiFi)',
      'Free Housekeeping 3x a week',
      'Common Gaming Zone & PS5',
      'Laundry Room with Washers/Dryers',
      'Cafe on Ground Floor',
      'Biometric Access & 24/7 Security'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Hassle-free modern co-living studio right in the heart of Sector V. Electricity, water, high-speed WiFi, and housekeeping all rolled into one single predictable monthly payment. No broker headaches, no restrictive house rules.',
    whyYouWillLoveIt: [
      'Zero maintenance bill surprises — all utilities bundled',
      'Vibrant Gen-Z community of designers, coders, and founders',
      'Flexible 3-month minimum stay options'
    ],
    suitableFor: ['Bachelor', 'Student', 'Working Professionals'],
    tags: ['Co-Living', 'Bills Included', 'Housekeeping', 'Zero Hassle'],
    coordinates: { lat: 22.5835, lng: 88.4378 },
    nearbyLandmarks: [
      { name: 'Godrej Genesis', distance: '200 m', type: 'workplace' },
      { name: 'SDF Building', distance: '600 m', type: 'workplace' },
      { name: 'Capgemini Tech Campus', distance: '800 m', type: 'workplace' }
    ],
    brokerReferenceId: 'FLZ-KOL-110',
    isFeatured: true,
    viewsCount: 780,
    createdDate: '2026-09-01'
  },
  {
    id: 'prop-11',
    slug: '2-bhk-new-town-action-area-3-near-tcs',
    title: '2 BHK Modern Corner Flat in New Town AA3',
    location: 'New Town',
    subLocation: 'Action Area III, Near Downtown Mall',
    address: 'Sunrise Symphony, Action Area III, New Town, Kolkata 700160',
    monthlyRent: 18500,
    securityDeposit: 37000,
    maintenanceCharges: 1500,
    bedrooms: 2,
    bathrooms: 2,
    balconies: 2,
    superBuiltupAreaSqFt: 980,
    carpetAreaSqFt: 810,
    floor: '7th of 12 Floors',
    propertyType: 'Gated Community',
    furnishing: 'Fully Furnished',
    availableFrom: 'Immediate',
    amenities: [
      'Corner Unit with Double Balconies',
      'Modular Kitchen with Gas Hob',
      'Gymnasium & Yoga Deck',
      'Covered Parking',
      '24/7 Security & CCTV',
      'Inverter Battery Backup'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Bright and breezy corner 2 BHK in Action Area III. Cross-ventilation keeps the apartment cool even during summer. Modern furniture, fully equipped modular kitchen, and private parking bay.',
    whyYouWillLoveIt: [
      'Corner flat with zero common wall noise',
      '5 minutes to St. Xavier’s University & Amity',
      'Cooperative management with quick maintenance response'
    ],
    suitableFor: ['Couple', 'Working Professionals', 'Student'],
    tags: ['Corner Unit', 'New Town AA3', 'Double Balcony'],
    coordinates: { lat: 22.5741, lng: 88.4892 },
    nearbyLandmarks: [
      { name: 'St. Xavier’s University', distance: '1.4 km', type: 'college' },
      { name: 'Downtown Mall', distance: '1.8 km', type: 'lifestyle' }
    ],
    brokerReferenceId: 'FLZ-KOL-111',
    isFeatured: false,
    viewsCount: 340,
    createdDate: '2026-08-31'
  },
  {
    id: 'prop-12',
    slug: '4-bhk-penthouse-salt-lake-sector-2',
    title: '4 BHK Duplex Penthouse with Terrace Garden',
    location: 'Salt Lake',
    subLocation: 'Sector II, Near Karunamoyee',
    address: 'Block CL, Sector II, Bidhannagar, Kolkata 700091',
    monthlyRent: 42000,
    securityDeposit: 84000,
    maintenanceCharges: 3000,
    bedrooms: 4,
    bathrooms: 4,
    balconies: 3,
    superBuiltupAreaSqFt: 2200,
    carpetAreaSqFt: 1850,
    floor: '4th & 5th Floor (Duplex)',
    propertyType: 'Independent Floor',
    furnishing: 'Fully Furnished',
    availableFrom: 'Within 7 Days',
    amenities: [
      'Private 400 sqft Rooftop Terrace Garden',
      'Dedicated Lift Access',
      '2 Covered Car Parking Bays',
      'Imported Furniture & Modular Kitchen',
      'Solar Powered Water Heaters',
      'Servant Quarter with Bathroom'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Rare luxury duplex penthouse in Salt Lake Sector II. Boasts a private landscaped rooftop terrace garden, master bathroom with jacuzzi tub, designer Italian kitchen, and serene quietude.',
    whyYouWillLoveIt: [
      'Private garden terrace under Kolkata stars',
      'Walking distance to Karunamoyee Central Bus Station & Metro',
      'Extremely spacious living for large families or shared executive living'
    ],
    suitableFor: ['Family', 'Working Professionals'],
    tags: ['Duplex Penthouse', 'Terrace Garden', 'Luxury Class'],
    coordinates: { lat: 22.5842, lng: 88.4215 },
    nearbyLandmarks: [
      { name: 'Karunamoyee Metro', distance: '400 m', type: 'transit' },
      { name: 'Salt Lake Central Park', distance: '600 m', type: 'lifestyle' }
    ],
    brokerReferenceId: 'FLZ-KOL-112',
    isFeatured: true,
    viewsCount: 940,
    createdDate: '2026-08-20'
  }
];

export const INSTAGRAM_REELS_DATA = [
  {
    id: 'reel-1',
    reelId: 'C7xk8M_Shapoorji',
    thumbnail: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80',
    caption: 'Student flat in Shapoorji Sukhobristhi under ₹17K! Fully furnished, no broker headache 🔥 #FlatzyKolkata #ShapoorjiFlats #KolkataRentals',
    propertyId: 'prop-1',
    likes: '4.8k',
    views: '62k',
    duration: '0:28',
    badge: 'Trending in New Town'
  },
  {
    id: 'reel-2',
    reelId: 'C8mP2_SectorV',
    thumbnail: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=600&q=80',
    caption: 'Walk to TCS & Techno India in 3 mins 🚀 Sector V 2 BHK flat tour. Check amenities & rent! #Flatzy #SectorV #SaltLakeRent',
    propertyId: 'prop-9',
    likes: '7.2k',
    views: '94k',
    duration: '0:34',
    badge: 'Viral on Reels'
  },
  {
    id: 'reel-3',
    reelId: 'C9qT4_SaltLake',
    thumbnail: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
    caption: 'Salt Lake Sector 1 independent floor next to City Centre 1 with private green balcony 🌿 #FlatzyKolkata #SaltLakeFlats',
    propertyId: 'prop-7',
    likes: '3.9k',
    views: '48k',
    duration: '0:25',
    badge: 'Popular with Couples'
  },
  {
    id: 'reel-4',
    reelId: 'D1wR7_EcoPark',
    thumbnail: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80',
    caption: 'Wake up to Eco Park view! 2 BHK luxury condo in New Town Action Area II ✨ #KolkataRealEstate #Flatzy #EcoPark',
    propertyId: 'prop-4',
    likes: '5.6k',
    views: '71k',
    duration: '0:31',
    badge: 'Must Watch'
  }
];
