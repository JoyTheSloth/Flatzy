import React from 'react';
import { LOCATIONS_DATA } from '../data/locations';
import type { LocationName } from '../types/property';
import { MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LocationsPageProps {
  onSelectLocation: (location: LocationName) => void;
  onOpenInquiryModal: () => void;
}

export const LocationsPage: React.FC<LocationsPageProps> = ({
  onSelectLocation,
  onOpenInquiryModal,
}) => {
  const { t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 animate-in fade-in duration-300">
      
      {/* Minimal Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-black uppercase tracking-wider text-flatzy-yellowDark">
          {t('locations.badge')}
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-flatzy-navy font-poppins">
          {t('locations.title')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          {t('locations.subtitle')}
        </p>
      </div>

      {/* Visual, Minimal Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {LOCATIONS_DATA.map((loc) => (
          <div
            key={loc.id}
            onClick={() => onSelectLocation(loc.name)}
            className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-soft hover:shadow-soft-lg hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            {/* Top Photo with badge */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
              <img
                src={loc.heroImage}
                alt={loc.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute top-3.5 left-3.5">
                <span className="px-3 py-1 rounded-full bg-flatzy-yellow text-flatzy-navy text-[11px] font-black uppercase tracking-wider shadow-sm">
                  {loc.propertyCount} Available Flats
                </span>
              </div>

              <div className="absolute bottom-3 left-4 right-4 text-white">
                <h3 className="text-2xl font-black font-poppins text-white">
                  {loc.name}
                </h3>
              </div>
            </div>

            {/* Snackable Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <p className="text-xs text-slate-600 font-medium line-clamp-2 leading-relaxed">
                  {loc.shortDescription}
                </p>

                {/* Snackable Quick Pills */}
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                    💰 {loc.avgRent2BHK} avg
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200/60">
                    🎯 {loc.popularWith.split(',')[0]}
                  </span>
                </div>
              </div>

              {/* Action */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-black text-flatzy-navy group-hover:text-flatzy-coral transition-colors flex items-center gap-1">
                  <span>{t('locations.explore')}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="text-[11px] font-semibold text-slate-400">
                  Updated today
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* 6th Card: Custom Locality Request */}
        <div 
          onClick={onOpenInquiryModal}
          className="group rounded-3xl p-6 border-2 border-dashed border-slate-300 hover:border-flatzy-yellow bg-slate-50/70 hover:bg-amber-50/40 transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-flatzy-yellow/20 flex items-center justify-center text-flatzy-navy">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-flatzy-navy font-poppins">
              {t('locations.customTitle')}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t('locations.customDesc')}
            </p>
          </div>

          <div className="pt-4 flex items-center gap-1 text-xs font-bold text-flatzy-navy group-hover:text-flatzy-coral">
            <span>{t('locations.customCta')}</span>
          </div>
        </div>

      </div>

    </div>
  );
};
