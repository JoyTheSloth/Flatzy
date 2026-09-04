import React from 'react';
import type { FilterState, LocationName, BudgetRange, FurnishingType, TenantType } from '../types/property';
import { 
  RotateCcw, 
  SlidersHorizontal, 
  MapPin, 
  IndianRupee, 
  Bed, 
  Home, 
  Sparkles,
  Users,
  User,
  Check
} from 'lucide-react';

interface FilterPanelProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  totalResults: number;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onChange,
  onReset,
  totalResults,
}) => {
  const locationsList: LocationName[] = ['New Town', 'Shapoorji', 'Rajarhat', 'Salt Lake', 'Sector V'];
  const budgetOptions: { id: BudgetRange; label: string }[] = [
    { id: 'all', label: 'All Budgets' },
    { id: 'under10', label: 'Under ₹10,000' },
    { id: '10to15', label: '₹10K – ₹15K' },
    { id: '15to20', label: '₹15K – ₹20K' },
    { id: '20to30', label: '₹20K – ₹30K' },
    { id: 'above30', label: '₹30,000+' },
  ];
  const bhkOptions: { id: string; label: string; humanCount: number }[] = [
    { id: '1 RK', label: '1 RK', humanCount: 1 },
    { id: '1 BHK', label: '1 BHK', humanCount: 1 },
    { id: '2 BHK', label: '2 BHK', humanCount: 2 },
    { id: '3 BHK', label: '3 BHK', humanCount: 3 },
  ];
  const furnishingOptions: FurnishingType[] = ['Fully Furnished', 'Semi Furnished', 'Unfurnished'];
  const tenantOptions: TenantType[] = ['Student', 'Bachelor', 'Working Professionals', 'Couple', 'Family'];
  const amenitiesList = [
    'Split Air Conditioners',
    'High-Speed Wi-Fi Ready',
    'Dual Lifts & Power Backup',
    '24/7 Gated Security',
    'Swimming Pool & Gymnasium',
    'Modular Kitchen',
    'Balcony with Open View',
    'Visitor Parking'
  ];

  const toggleLocation = (loc: LocationName) => {
    const exists = filters.locations.includes(loc);
    const updated = exists 
      ? filters.locations.filter((l) => l !== loc)
      : [...filters.locations, loc];
    onChange({ ...filters, locations: updated });
  };

  const toggleBhk = (bhk: string) => {
    const exists = filters.bedrooms.includes(bhk);
    const updated = exists
      ? filters.bedrooms.filter((b) => b !== bhk)
      : [...filters.bedrooms, bhk];
    onChange({ ...filters, bedrooms: updated });
  };

  const toggleFurnishing = (furn: FurnishingType) => {
    const exists = filters.furnishing.includes(furn);
    const updated = exists
      ? filters.furnishing.filter((f) => f !== furn)
      : [...filters.furnishing, furn];
    onChange({ ...filters, furnishing: updated });
  };

  const toggleTenant = (tenant: TenantType) => {
    const exists = filters.tenantType.includes(tenant);
    const updated = exists
      ? filters.tenantType.filter((t) => t !== tenant)
      : [...filters.tenantType, tenant];
    onChange({ ...filters, tenantType: updated });
  };

  const toggleAmenity = (amenity: string) => {
    const exists = filters.amenities.includes(amenity);
    const updated = exists
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity];
    onChange({ ...filters, amenities: updated });
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-soft space-y-6">
      
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-flatzy-yellow" />
          <h3 className="font-extrabold text-sm uppercase tracking-wider text-flatzy-navy">
            Filters ({totalResults} flats)
          </h3>
        </div>

        <button
          onClick={onReset}
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-flatzy-coral transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* 1. Location */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-flatzy-yellow" />
          <span>Location</span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          {locationsList.map((loc) => {
            const isSelected = filters.locations.includes(loc);
            return (
              <button
                key={loc}
                onClick={() => toggleLocation(loc)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-flatzy-navy text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
                }`}
              >
                {loc}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Budget Range */}
      <div className="space-y-2.5 pt-4 border-t border-slate-100">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
          <IndianRupee className="w-3.5 h-3.5 text-flatzy-yellow" />
          <span>Monthly Budget</span>
        </label>
        <div className="space-y-1.5">
          {budgetOptions.map((b) => (
            <label
              key={b.id}
              className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer hover:text-flatzy-navy"
            >
              <input
                type="radio"
                name="budgetRadio"
                checked={filters.budgetRange === b.id}
                onChange={() => onChange({ ...filters, budgetRange: b.id })}
                className="w-4 h-4 text-flatzy-yellow focus:ring-flatzy-yellow rounded-full accent-flatzy-yellow"
              />
              <span>{b.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 3. Bedrooms / Unit Configuration with Human Icons */}
      <div className="space-y-2.5 pt-4 border-t border-slate-100">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Bed className="w-3.5 h-3.5 text-flatzy-yellow" />
            <span>Configuration</span>
          </span>
          <span className="text-[10px] font-semibold text-slate-400">By capacity</span>
        </label>
        <div className="grid grid-cols-4 gap-1.5">
          {bhkOptions.map((opt) => {
            const isSelected = filters.bedrooms.includes(opt.id);
            return (
              <button
                key={opt.id}
                onClick={() => toggleBhk(opt.id)}
                className={`py-2 px-1 rounded-2xl flex flex-col items-center justify-center gap-1 border transition-all ${
                  isSelected
                    ? 'bg-flatzy-yellow border-flatzy-yellowDark text-flatzy-navy shadow-sm ring-1 ring-flatzy-yellow/50 scale-[1.02]'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {/* Human Icons corresponding to unit capacity */}
                <div className="flex items-center justify-center -space-x-1 h-3.5">
                  {Array.from({ length: opt.humanCount }).map((_, idx) => (
                    <User
                      key={idx}
                      className={`w-3.5 h-3.5 ${
                        isSelected 
                          ? 'text-flatzy-navy fill-flatzy-navy/40' 
                          : 'text-slate-400 fill-slate-200'
                      }`}
                    />
                  ))}
                </div>

                <span className="text-xs font-black font-poppins leading-none">
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Furnishing */}
      <div className="space-y-2.5 pt-4 border-t border-slate-100">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
          <Home className="w-3.5 h-3.5 text-flatzy-yellow" />
          <span>Furnishing</span>
        </label>
        <div className="space-y-1.5">
          {furnishingOptions.map((furn) => {
            const isSelected = filters.furnishing.includes(furn);
            return (
              <label
                key={furn}
                className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer hover:text-flatzy-navy"
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleFurnishing(furn)}
                  className="w-4 h-4 rounded text-flatzy-navy focus:ring-flatzy-yellow accent-flatzy-navy"
                />
                <span>{furn}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 5. Tenant Type */}
      <div className="space-y-2.5 pt-4 border-t border-slate-100">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-flatzy-yellow" />
          <span>Tenant Preference</span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          {tenantOptions.map((tenant) => {
            const isSelected = filters.tenantType.includes(tenant);
            return (
              <button
                key={tenant}
                onClick={() => toggleTenant(tenant)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-flatzy-yellow text-flatzy-navy font-bold shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tenant}
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. Key Amenities */}
      <div className="space-y-2.5 pt-4 border-t border-slate-100">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-flatzy-yellow" />
          <span>Amenities</span>
        </label>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {amenitiesList.map((amenity) => {
            const isSelected = filters.amenities.includes(amenity);
            return (
              <label
                key={amenity}
                className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer hover:text-flatzy-navy"
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleAmenity(amenity)}
                  className="w-3.5 h-3.5 rounded text-flatzy-navy focus:ring-flatzy-yellow accent-flatzy-navy"
                />
                <span className="truncate">{amenity}</span>
              </label>
            );
          })}
        </div>
      </div>

    </div>
  );
};
