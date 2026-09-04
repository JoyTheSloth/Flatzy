import React, { useState, useMemo } from 'react';
import type { Property, FilterState, LocationName, BudgetRange } from '../types/property';
import { PROPERTIES_DATA } from '../data/properties';
import { PropertyCard } from '../components/PropertyCard';
import { FilterPanel } from '../components/FilterPanel';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  ArrowUpDown, 
  Sparkles, 
  MapPin, 
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

interface ExplorePageProps {
  initialFilters?: Partial<FilterState>;
  savedPropertyIds: string[];
  onToggleSave: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onOpenInquiryModal: (property?: Property) => void;
}

export const ExplorePage: React.FC<ExplorePageProps> = ({
  initialFilters = {},
  savedPropertyIds,
  onToggleSave,
  onSelectProperty,
  onOpenInquiryModal,
}) => {
  const defaultFilters: FilterState = {
    searchQuery: '',
    locations: [],
    budgetRange: 'all',
    bedrooms: [],
    furnishing: [],
    tenantType: [],
    propertyTypes: [],
    amenities: [],
    sortBy: 'recommended',
    ...initialFilters,
  };

  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync if initialFilters changes
  React.useEffect(() => {
    if (initialFilters.locations && initialFilters.locations.length > 0) {
      setFilters(prev => ({ ...prev, locations: initialFilters.locations || [] }));
    }
    if (initialFilters.budgetRange) {
      setFilters(prev => ({ ...prev, budgetRange: initialFilters.budgetRange || 'all' }));
    }
  }, [initialFilters]);

  // Reactive filtering logic
  const filteredProperties = useMemo(() => {
    return PROPERTIES_DATA.filter((prop) => {
      // Search query
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchesQuery = 
          prop.title.toLowerCase().includes(q) ||
          prop.location.toLowerCase().includes(q) ||
          prop.subLocation.toLowerCase().includes(q) ||
          prop.description.toLowerCase().includes(q) ||
          prop.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesQuery) return false;
      }

      // Location
      if (filters.locations.length > 0) {
        if (!filters.locations.includes(prop.location)) return false;
      }

      // Budget Range
      if (filters.budgetRange !== 'all') {
        const rent = prop.monthlyRent;
        if (filters.budgetRange === 'under10' && rent >= 10000) return false;
        if (filters.budgetRange === '10to15' && (rent < 10000 || rent > 15000)) return false;
        if (filters.budgetRange === '15to20' && (rent < 15000 || rent > 20000)) return false;
        if (filters.budgetRange === '20to30' && (rent < 20000 || rent > 30000)) return false;
        if (filters.budgetRange === 'above30' && rent <= 30000) return false;
      }

      // Bedrooms / Unit Configuration (1 RK, 1 BHK, 2 BHK, 3 BHK)
      if (filters.bedrooms.length > 0) {
        const matchesBhk = filters.bedrooms.some(b => {
          if (b === '1 RK') {
            return prop.propertyType === '1 RK' || prop.propertyType === 'Studio Flat' || prop.title.toLowerCase().includes('1 rk') || prop.title.toLowerCase().includes('studio');
          }
          if (b === '1 BHK') {
            return prop.bedrooms === 1 && prop.propertyType !== '1 RK' && !prop.title.toLowerCase().includes('1 rk');
          }
          if (b === '2 BHK') return prop.bedrooms === 2;
          if (b === '3 BHK') return prop.bedrooms >= 3;
          return false;
        });
        if (!matchesBhk) return false;
      }

      // Furnishing
      if (filters.furnishing.length > 0) {
        if (!filters.furnishing.includes(prop.furnishing)) return false;
      }

      // Tenant Type
      if (filters.tenantType.length > 0) {
        const matchesTenant = filters.tenantType.some(t => prop.suitableFor.includes(t));
        if (!matchesTenant) return false;
      }

      // Amenities
      if (filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every(a => 
          prop.amenities.some(propA => propA.toLowerCase().includes(a.toLowerCase()))
        );
        if (!hasAllAmenities) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'rent_low') return a.monthlyRent - b.monthlyRent;
      if (filters.sortBy === 'rent_high') return b.monthlyRent - a.monthlyRent;
      if (filters.sortBy === 'newest') return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
      // recommended default
      return (b.viewsCount || 0) - (a.viewsCount || 0);
    });
  }, [filters]);

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      locations: [],
      budgetRange: 'all',
      bedrooms: [],
      furnishing: [],
      tenantType: [],
      propertyTypes: [],
      amenities: [],
      sortBy: 'recommended',
    });
  };

  const activeFiltersCount = 
    (filters.locations.length > 0 ? 1 : 0) +
    (filters.budgetRange !== 'all' ? 1 : 0) +
    (filters.bedrooms.length > 0 ? 1 : 0) +
    (filters.furnishing.length > 0 ? 1 : 0) +
    (filters.tenantType.length > 0 ? 1 : 0) +
    (filters.amenities.length > 0 ? 1 : 0) +
    (filters.searchQuery ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Top Page Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-flatzy-coral">
              Live Kolkata Marketplace
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-flatzy-navy font-poppins">
              Find your next flat
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Browse available verified rentals in Kolkata. Send an inquiry to connect with the broker.
            </p>
          </div>

          <button
            onClick={() => onOpenInquiryModal()}
            className="px-6 py-3 rounded-full bg-flatzy-yellow hover:bg-flatzy-yellowDark text-flatzy-navy font-extrabold text-xs sm:text-sm shadow-soft transition-all"
          >
            Can't find what you need? Inquire
          </button>
        </div>

        {/* Search Bar & Sort Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
          
          {/* Main Search Bar */}
          <div className="relative flex-1 flex items-center bg-white rounded-2xl px-4 py-3 border border-slate-200 shadow-soft focus-within:border-flatzy-yellow transition-colors">
            <Search className="w-5 h-5 text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
              placeholder="Search by location, landmark, or apartment (e.g. Shapoorji, Eco Park, Sector V)..."
              className="w-full bg-transparent text-sm text-flatzy-navy placeholder:text-slate-400 focus:outline-none font-medium"
            />
            {filters.searchQuery && (
              <button
                onClick={() => setFilters({ ...filters, searchQuery: '' })}
                className="text-xs text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Mobile Filter Drawer Button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white border border-slate-200 shadow-soft text-flatzy-navy text-xs font-bold"
          >
            <SlidersHorizontal className="w-4 h-4 text-flatzy-yellow" />
            <span>Filters ({activeFiltersCount})</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 bg-white rounded-2xl px-4 py-2.5 border border-slate-200 shadow-soft shrink-0">
            <ArrowUpDown className="w-4 h-4 text-slate-400" />
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:inline">
              Sort:
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
              className="bg-transparent text-xs font-bold text-flatzy-navy focus:outline-none cursor-pointer"
            >
              <option value="recommended">Recommended</option>
              <option value="rent_low">Lowest Rent</option>
              <option value="rent_high">Highest Rent</option>
              <option value="newest">Newest</option>
            </select>
          </div>

        </div>

        {/* Active Filters Pill Bar */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs font-bold text-slate-400 mr-1">Active Filters:</span>
            
            {filters.locations.map((loc) => (
              <span
                key={loc}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-flatzy-yellow/20 text-flatzy-navy border border-flatzy-yellow text-xs font-bold"
              >
                <span>{loc}</span>
                <button
                  onClick={() => setFilters({ ...filters, locations: filters.locations.filter(l => l !== loc) })}
                  className="hover:text-rose-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}

            {filters.budgetRange !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                <span>Budget: {filters.budgetRange}</span>
                <button onClick={() => setFilters({ ...filters, budgetRange: 'all' })}>
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {filters.bedrooms.map((b) => (
              <span
                key={b}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold"
              >
                <span>{b}</span>
                <button onClick={() => setFilters({ ...filters, bedrooms: filters.bedrooms.filter(x => x !== b) })}>
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}

            <button
              onClick={handleResetFilters}
              className="text-xs font-bold text-flatzy-coral hover:underline ml-2"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Main Marketplace Layout: Sidebar + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Desktop Filter Sidebar (3 cols) */}
        <div className="hidden lg:block lg:col-span-3 sticky top-24">
          <FilterPanel
            filters={filters}
            onChange={setFilters}
            onReset={handleResetFilters}
            totalResults={filteredProperties.length}
          />
        </div>

        {/* Property Grid (9 cols on desktop) */}
        <div className="lg:col-span-9 space-y-6">
          
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>
              Showing <strong className="text-slate-900 font-bold">{filteredProperties.length}</strong> rental flats in Kolkata
            </span>
            <span className="hidden sm:inline-block">
              Updated within 24 hours
            </span>
          </div>

          {filteredProperties.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-soft space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-amber-50 text-flatzy-yellowDark flex items-center justify-center text-3xl">
                🔍
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-black text-flatzy-navy font-poppins">
                  No flats found matching these filters
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                  Try relaxing your budget, clearing selected amenities, or selecting another nearby location like Shapoorji or New Town.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 rounded-full bg-flatzy-yellow text-flatzy-navy font-black text-xs uppercase tracking-wider shadow-sm"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isSaved={savedPropertyIds.includes(property.id)}
                  onToggleSave={onToggleSave}
                  onSelectProperty={onSelectProperty}
                />
              ))}
            </div>
          )}

        </div>

      </div>

      {/* Mobile Filter Drawer Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm lg:hidden flex justify-end">
          <div className="w-full max-w-sm bg-white h-full overflow-y-auto p-5 space-y-4 animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-flatzy-navy">
                Filter Flats
              </h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1.5 rounded-full bg-slate-100 text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <FilterPanel
              filters={filters}
              onChange={setFilters}
              onReset={handleResetFilters}
              totalResults={filteredProperties.length}
            />

            <div className="sticky bottom-0 pt-3 pb-2 bg-white">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 rounded-full bg-flatzy-yellow text-flatzy-navy font-black text-xs uppercase tracking-wider shadow-soft"
              >
                Apply Filters ({filteredProperties.length})
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
