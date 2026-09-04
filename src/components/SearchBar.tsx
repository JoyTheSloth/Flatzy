import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  IndianRupee, 
  Home, 
  Users, 
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import type { LocationName, BudgetRange, PropertyType, FurnishingType, TenantType } from '../types/property';

interface SearchBarProps {
  onSearch: (filters: {
    location?: LocationName;
    budget?: BudgetRange;
    bedrooms?: string;
    furnishing?: FurnishingType;
    tenantType?: TenantType;
    query?: string;
  }) => void;
  className?: string;
  isCompact?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  className = '',
  isCompact = false,
}) => {
  const [selectedLocation, setSelectedLocation] = useState<LocationName | ''>('');
  const [selectedBudget, setSelectedBudget] = useState<BudgetRange>('all');
  const [selectedBhk, setSelectedBhk] = useState<string>('all');
  const [selectedFurnishing, setSelectedFurnishing] = useState<string>('all');
  const [selectedTenant, setSelectedTenant] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      location: selectedLocation || undefined,
      budget: selectedBudget,
      bedrooms: selectedBhk !== 'all' ? selectedBhk : undefined,
      furnishing: selectedFurnishing !== 'all' ? (selectedFurnishing as FurnishingType) : undefined,
      tenantType: selectedTenant !== 'all' ? (selectedTenant as TenantType) : undefined,
      query: searchQuery.trim() || undefined,
    });
  };

  if (isCompact) {
    return (
      <form 
        onSubmit={handleSearchSubmit}
        className={`flex items-center gap-2 bg-white p-2 rounded-full border border-slate-200 shadow-soft ${className}`}
      >
        <div className="flex items-center gap-2 pl-3 flex-1">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search New Town, Rajarhat, Salt Lake..."
            className="w-full bg-transparent text-sm text-flatzy-navy focus:outline-none placeholder:text-slate-400 font-medium"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-2.5 rounded-full bg-flatzy-yellow hover:bg-flatzy-yellowDark text-flatzy-navy font-bold text-xs shadow-sm transition-all"
        >
          Search
        </button>
      </form>
    );
  }

  return (
    <div className={`w-full bg-white rounded-3xl p-4 sm:p-6 shadow-soft-lg border border-slate-200/90 relative ${className}`}>
      
      {/* Title inside the search widget */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
        <div>
          <h3 className="text-base sm:text-lg font-extrabold text-flatzy-navy font-poppins flex items-center gap-2">
            <MapPin className="w-5 h-5 text-flatzy-yellow" />
            <span>Where do you want to live?</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Discover verified Kolkata rental listings with direct broker match
          </p>
        </div>

        <span className="hidden sm:inline-flex text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-flatzy-yellow/20 text-flatzy-navy">
          Kolkata Direct
        </span>
      </div>

      <form onSubmit={handleSearchSubmit} className="space-y-4">
        
        {/* Search Input Bar */}
        <div className="relative flex items-center bg-slate-50 rounded-2xl px-4 py-3 border border-slate-200/80 focus-within:border-flatzy-yellow focus-within:bg-white transition-all">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search New Town, Rajarhat, Salt Lake, Shapoorji, Sector V..."
            className="w-full bg-transparent text-sm sm:text-base text-flatzy-navy placeholder:text-slate-400 focus:outline-none font-medium"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-xs text-slate-400 hover:text-slate-700 px-2"
            >
              Clear
            </button>
          )}
        </div>

        {/* Quick Filter Selects Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
          
          {/* 1. Location */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Location
            </label>
            <div className="relative">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value as LocationName | '')}
                className="w-full appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-flatzy-navy focus:outline-none focus:border-flatzy-yellow cursor-pointer pr-8"
              >
                <option value="">All Locations</option>
                <option value="New Town">New Town</option>
                <option value="Shapoorji">Shapoorji</option>
                <option value="Rajarhat">Rajarhat</option>
                <option value="Salt Lake">Salt Lake</option>
                <option value="Sector V">Sector V</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* 2. Budget */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Budget
            </label>
            <div className="relative">
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value as BudgetRange)}
                className="w-full appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-flatzy-navy focus:outline-none focus:border-flatzy-yellow cursor-pointer pr-8"
              >
                <option value="all">Any Budget</option>
                <option value="under10">Under ₹10K</option>
                <option value="10to15">₹10K – ₹15K</option>
                <option value="15to20">₹15K – ₹20K</option>
                <option value="20to30">₹20K – ₹30K</option>
                <option value="above30">₹30K+</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* 3. BHK */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Bedrooms
            </label>
            <div className="relative">
              <select
                value={selectedBhk}
                onChange={(e) => setSelectedBhk(e.target.value)}
                className="w-full appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-flatzy-navy focus:outline-none focus:border-flatzy-yellow cursor-pointer pr-8"
              >
                <option value="all">Any Configuration</option>
                <option value="1 RK">1 RK (1 Person)</option>
                <option value="1 BHK">1 BHK (1 Person)</option>
                <option value="2 BHK">2 BHK (2 People)</option>
                <option value="3 BHK">3 BHK (3+ People)</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* 4. Furnishing */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Furnishing
            </label>
            <div className="relative">
              <select
                value={selectedFurnishing}
                onChange={(e) => setSelectedFurnishing(e.target.value)}
                className="w-full appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-flatzy-navy focus:outline-none focus:border-flatzy-yellow cursor-pointer pr-8"
              >
                <option value="all">Any Furnishing</option>
                <option value="Fully Furnished">Fully Furnished</option>
                <option value="Semi Furnished">Semi Furnished</option>
                <option value="Unfurnished">Unfurnished</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* 5. Tenant Type */}
          <div className="space-y-1 col-span-2 sm:col-span-1">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Tenant Type
            </label>
            <div className="relative">
              <select
                value={selectedTenant}
                onChange={(e) => setSelectedTenant(e.target.value)}
                className="w-full appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-flatzy-navy focus:outline-none focus:border-flatzy-yellow cursor-pointer pr-8"
              >
                <option value="all">Any Tenant</option>
                <option value="Student">Student</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Couple">Couple</option>
                <option value="Family">Family</option>
                <option value="Working Professionals">Working Professional</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Submit Action Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Over 120+ active Kolkata flats updated today</span>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-flatzy-yellow hover:bg-flatzy-yellowDark text-flatzy-navy font-black text-sm tracking-wide shadow-soft hover:shadow-yellow-glow transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Search Flats</span>
          </button>
        </div>

      </form>
    </div>
  );
};
