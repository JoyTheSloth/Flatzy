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
  CheckCircle2,
  Train
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ExplorePageProps {
  properties?: Property[];
  initialFilters?: Partial<FilterState>;
  savedPropertyIds: string[];
  onToggleSave: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onOpenInquiryModal: (property?: Property) => void;
  onOpenScheduleVisit?: (property: Property) => void;
}

export const ExplorePage: React.FC<ExplorePageProps> = ({
  properties,
  initialFilters = {},
  savedPropertyIds,
  onToggleSave,
  onSelectProperty,
  onOpenInquiryModal,
  onOpenScheduleVisit,
}) => {
  const { t } = useLanguage();
  const baseProperties = properties && properties.length > 0 ? properties : PROPERTIES_DATA;
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
    return baseProperties.filter((prop) => {
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

      // Transit & IT Hubs Commute Filter
      if (filters.transitHubs && filters.transitHubs.length > 0) {
        const matchesTransit = filters.transitHubs.some(hub => 
          (prop.transitTags && prop.transitTags.includes(hub)) ||
          (prop.commuteHighlight && prop.commuteHighlight.toLowerCase().includes(hub.toLowerCase()))
        );
        if (!matchesTransit) return false;
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
      transitHubs: [],
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
    ((filters.transitHubs?.length || 0) > 0 ? 1 : 0) +
    (filters.searchQuery ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6">
      
      {/* Top Page Header */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-[10px] sm:text-xs font-black uppercase tracking-wider mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              {t('explore.badge')}
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-flatzy-navy font-poppins tracking-tight">
              {t('explore.title')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {t('explore.subtitle')}
            </p>
          </div>

          {/* Compact Inquiry CTA Button on Header */}
          <button
            onClick={() => onOpenInquiryModal()}
            className="shrink-0 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full bg-flatzy-yellow hover:bg-flatzy-yellowDark text-flatzy-navy font-black text-xs sm:text-sm shadow-xs hover:shadow-soft transition-all active:scale-95 flex items-center gap-1.5"
            title="Custom flat inquiry"
          >
            <Sparkles className="w-3.5 h-3.5 text-flatzy-navy" />
            <span className="hidden sm:inline">{t('explore.cantFind')}</span>
            <span>{t('explore.inquire')}</span>
          </button>
        </div>

        {/* Unified Search, Filter & Sort Controls (Single Clean Line) */}
        <div className="flex items-center gap-2 pt-1">
          
          {/* Main Search Bar */}
          <div className="relative flex-1 flex items-center bg-white rounded-2xl px-3.5 py-2.5 sm:py-3 border border-slate-200/90 shadow-xs focus-within:border-flatzy-navy focus-within:ring-2 focus-within:ring-flatzy-navy/10 transition-all">
            <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
              placeholder={t('explore.searchPlaceholder')}
              className="w-full bg-transparent text-xs sm:text-sm text-flatzy-navy placeholder:text-slate-400 focus:outline-none font-medium"
            />
            {filters.searchQuery && (
              <button
                onClick={() => setFilters({ ...filters, searchQuery: '' })}
                className="p-1 text-slate-400 hover:text-slate-700 shrink-0"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Mobile Filter Drawer Button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className={`lg:hidden shrink-0 flex items-center justify-center gap-1.5 px-3 py-2.5 sm:py-3 rounded-2xl border transition-all text-xs font-bold shadow-xs active:scale-95 ${
              activeFiltersCount > 0
                ? 'bg-flatzy-navy text-white border-flatzy-navy'
                : 'bg-white text-slate-700 border-slate-200/90 hover:border-slate-300'
            }`}
            title="Open filters"
          >
            <SlidersHorizontal className={`w-4 h-4 ${activeFiltersCount > 0 ? 'text-flatzy-yellow' : 'text-slate-600'}`} />
            <span className="hidden sm:inline">{t('explore.filters')}</span>
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-flatzy-yellow text-flatzy-navy text-[10px] font-black flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Sort Dropdown Pill */}
          <div className="relative shrink-0 flex items-center bg-white rounded-2xl px-2.5 sm:px-3 py-2.5 sm:py-3 border border-slate-200/90 shadow-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 mr-1.5 shrink-0" />
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
              className="bg-transparent text-xs font-bold text-flatzy-navy focus:outline-none cursor-pointer pr-1"
            >
              <option value="recommended">{t('explore.sortRecommended')}</option>
              <option value="rent_low">{t('explore.sortRentLow')}</option>
              <option value="rent_high">{t('explore.sortRentHigh')}</option>
              <option value="newest">{t('explore.sortNewest')}</option>
            </select>
          </div>

        </div>

        {/* Quick Filter Horizontal Chips Strip (Zero Scrollbar Line) */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
          {[
            { id: 'all', label: 'All Flats', isLoc: true, value: '' },
            { id: 'shapoorji', label: '📍 Shapoorji', isLoc: true, value: 'Shapoorji' },
            { id: 'newtown', label: '📍 New Town', isLoc: true, value: 'New Town' },
            { id: '2bhk', label: '🏠 2 BHK', isBhk: true, value: '2 BHK' },
            { id: '3bhk', label: '✨ 3 BHK', isBhk: true, value: '3 BHK' },
            { id: 'ac', label: '❄️ AC Installed', isAmenity: true, value: 'AC' },
            { id: 'metro', label: '🚇 Near Metro', isTransit: true, value: 'Green Line Metro' },
            { id: 'tech', label: '💼 Sector V Tech Hub', isTransit: true, value: 'Sector V IT Hub' }
          ].map((chip) => {
            let isSelected = false;
            if (chip.id === 'all') {
              isSelected = filters.locations.length === 0 && filters.bedrooms.length === 0 && (!filters.transitHubs || filters.transitHubs.length === 0) && filters.amenities.length === 0;
            } else if (chip.isLoc) {
              isSelected = filters.locations.includes(chip.value as any);
            } else if (chip.isBhk) {
              isSelected = filters.bedrooms.includes(chip.value);
            } else if (chip.isAmenity) {
              isSelected = filters.amenities.some(a => a.toLowerCase().includes('ac'));
            } else if (chip.isTransit) {
              isSelected = (filters.transitHubs || []).includes(chip.value);
            }

            return (
              <button
                key={chip.id}
                onClick={() => {
                  if (chip.id === 'all') {
                    handleResetFilters();
                  } else if (chip.isLoc) {
                    const current = filters.locations;
                    const exists = current.includes(chip.value as any);
                    setFilters({
                      ...filters,
                      locations: exists ? current.filter(l => l !== chip.value) : [...current, chip.value as any]
                    });
                  } else if (chip.isBhk) {
                    const current = filters.bedrooms;
                    const exists = current.includes(chip.value);
                    setFilters({
                      ...filters,
                      bedrooms: exists ? current.filter(b => b !== chip.value) : [...current, chip.value]
                    });
                  } else if (chip.isAmenity) {
                    const exists = filters.amenities.includes('AC');
                    setFilters({
                      ...filters,
                      amenities: exists ? filters.amenities.filter(a => a !== 'AC') : [...filters.amenities, 'AC']
                    });
                  } else if (chip.isTransit) {
                    const current = filters.transitHubs || [];
                    const exists = current.includes(chip.value);
                    setFilters({
                      ...filters,
                      transitHubs: exists ? current.filter(h => h !== chip.value) : [...current, chip.value]
                    });
                  }
                }}
                className={`shrink-0 px-3 py-1.5 rounded-full font-bold text-xs transition-all border ${
                  isSelected
                    ? 'bg-flatzy-navy text-white border-flatzy-navy shadow-xs scale-102'
                    : 'bg-white text-slate-700 border-slate-200/90 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>

        {/* Active Filters Pill Bar */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs font-bold text-slate-400 mr-1">Active Filters:</span>
            
            {filters.transitHubs?.map((hub) => (
              <span
                key={hub}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold"
              >
                <span>🚇 {hub}</span>
                <button
                  onClick={() => setFilters({ ...filters, transitHubs: filters.transitHubs?.filter(h => h !== hub) })}
                  className="hover:text-rose-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
            
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
              {t('explore.showing')} <strong className="text-slate-900 font-bold">{filteredProperties.length}</strong> {t('explore.rentalFlats')}
            </span>
            <span className="hidden sm:inline-block">
              {t('explore.updated')}
            </span>
          </div>

          {filteredProperties.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-soft space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-amber-50 text-flatzy-yellowDark flex items-center justify-center text-3xl">
                🔍
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-black text-flatzy-navy font-poppins">
                  {t('explore.noFlatsTitle')}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                  {t('explore.noFlatsDesc')}
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 rounded-full bg-flatzy-yellow text-flatzy-navy font-black text-xs uppercase tracking-wider shadow-sm"
                >
                  {t('explore.resetAll')}
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
                  onScheduleVisit={onOpenScheduleVisit}
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
                {t('explore.filterFlats')}
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
