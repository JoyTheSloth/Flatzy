export type LocationName = 'New Town' | 'Rajarhat' | 'Shapoorji' | 'Salt Lake' | 'Sector V';

export type TenantType = 'Student' | 'Bachelor' | 'Couple' | 'Family';

export type FurnishingType = 'Fully Furnished' | 'Semi Furnished' | 'Unfurnished';

export type PropertyType = 'Apartment' | 'Gated Community' | 'Studio Flat' | '1 RK' | 'Independent Floor' | 'Co-Living Suite';

export type BudgetRange = 'all' | 'under10' | '10to15' | '15to20' | '20to30' | 'above30';

export interface Property {
  id: string;
  slug: string;
  title: string;
  location: LocationName;
  subLocation: string; // e.g. "Action Area I", "Chinar Park", "Sukhobristhi Complex", "Sector 1 near City Centre"
  address: string;
  monthlyRent: number;
  securityDeposit: number;
  maintenanceCharges?: number;
  bedrooms: number;
  bathrooms: number;
  balconies?: number;
  superBuiltupAreaSqFt: number;
  carpetAreaSqFt?: number;
  floor: string; // e.g. "4th of 12 Floors"
  propertyType: PropertyType;
  furnishing: FurnishingType;
  availableFrom: string; // e.g. "Ready to Move" or "Immediate"
  amenities: string[];
  images: string[];
  featuredImage: string;
  description: string;
  whyYouWillLoveIt: string[];
  suitableFor: TenantType[];
  tags: string[]; // e.g. "Hot Deal", "Walk to Techno India", "Near Sector V Metro", "No Lock-in"
  coordinates: {
    lat: number;
    lng: number;
  };
  nearbyLandmarks: {
    name: string;
    distance: string;
    type: 'college' | 'workplace' | 'transit' | 'lifestyle';
  }[];
  brokerReferenceId: string;
  isFeatured?: boolean;
  viewsCount?: number;
  createdDate: string;
}

export interface FilterState {
  searchQuery: string;
  locations: LocationName[];
  budgetRange: BudgetRange;
  minRent?: number;
  maxRent?: number;
  bedrooms: string[]; // e.g. ['1 RK', '1 BHK', '2 BHK', '3 BHK']
  furnishing: FurnishingType[];
  tenantType: TenantType[];
  propertyTypes: PropertyType[];
  amenities: string[];
  sortBy: 'recommended' | 'rent_low' | 'rent_high' | 'newest';
}

export interface LocationGuide {
  id: string;
  name: LocationName;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  heroImage: string;
  popularWith: string;
  avgRent1BHK: string;
  avgRent2BHK: string;
  avgRent3BHK: string;
  landmarks: string[];
  commuteHighlights: string[];
  propertyCount: number;
}

export interface InquiryFormData {
  propertyId?: string;
  propertyTitle?: string;
  fullName: string;
  phone: string;
  email: string;
  preferredMoveInDate: string;
  tenantType: TenantType;
  budget?: string;
  preferredLocation?: string;
  message?: string;
  sourceReelUrl?: string;
}

export interface InstagramReelItem {
  id: string;
  reelId: string;
  thumbnail: string;
  caption: string;
  propertyId: string;
  likes: string;
  views: string;
  duration: string;
  badge: string;
}

export interface FlatReelVideo {
  id: string;
  title: string;
  caption: string;
  videoUrl?: string;
  thumbnail: string;
  propertyId: string;
  location: string;
  subLocation?: string;
  bhk: string;
  monthlyRent: number;
  furnishing: string;
  views: string;
  likes: string;
  duration: string;
  tag: string;
  verified?: boolean;
}

