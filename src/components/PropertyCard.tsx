import React, { useState } from 'react';
import type { Property } from '../types/property';
import { 
  Heart, 
  MapPin, 
  BedDouble, 
  Bath, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles,
  ArrowRight,
  Eye,
  Share2,
  Calendar,
  Train,
  Maximize2
} from 'lucide-react';
import { PictureViewModal } from './PictureViewModal';
import { useLanguage } from '../context/LanguageContext';

interface PropertyCardProps {
  property: Property;
  isSaved: boolean;
  onToggleSave: (propertyId: string) => void;
  onSelectProperty: (property: Property) => void;
  onQuickInquire?: (property: Property) => void;
  onScheduleVisit?: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isSaved,
  onToggleSave,
  onSelectProperty,
  onQuickInquire,
  onScheduleVisit,
}) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [isPictureViewOpen, setIsPictureViewOpen] = useState(false);
  const { t } = useLanguage();

  const formatCurrency = (val: number) => {
    return '₹' + val.toLocaleString('en-IN');
  };

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleSave(property.id);
  };

  return (
    <div 
      onClick={() => onSelectProperty(property)}
      className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-soft hover:shadow-soft-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Property Image Container - Clicking opens Full Picture View */}
      <div 
        onClick={(e) => {
          e.stopPropagation();
          setIsPictureViewOpen(true);
        }}
        className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 cursor-pointer group/img"
        title="Click to view full pictures"
      >
        <img
          src={property.images[imageIndex] || property.featuredImage}
          alt={property.title}
          className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Gradient overlay at top and bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex flex-wrap gap-1.5 pointer-events-auto">
            {property.listingType === 'both' ? (
              <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-purple-700 to-indigo-600 text-white text-[11px] font-black shadow-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-flatzy-yellow" />
                <span>{t('card.rentSale')}</span>
              </span>
            ) : property.listingType === 'sale' ? (
              <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-rose-600 to-amber-600 text-white text-[11px] font-black shadow-sm flex items-center gap-1">
                <span>🔥 {t('card.forSale')}</span>
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full bg-flatzy-yellow text-flatzy-navy text-[11px] font-bold shadow-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>{property.availableFrom}</span>
              </span>
            )}

            <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-flatzy-navy text-[11px] font-semibold shadow-sm">
              {property.furnishing}
            </span>
          </div>

          {/* Heart Save Button */}
          <button
            onClick={handleHeartClick}
            aria-label={isSaved ? 'Remove from saved' : 'Save flat'}
            className={`pointer-events-auto p-2 rounded-full transition-transform duration-200 active:scale-75 shadow-md ${
              isSaved 
                ? 'bg-flatzy-coral text-white' 
                : 'bg-white/85 backdrop-blur-md text-slate-700 hover:text-flatzy-coral hover:bg-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Bottom image stats & Picture View expand button */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white pointer-events-none">
          <div className="flex items-center gap-1.5 text-xs font-semibold drop-shadow">
            <MapPin className="w-3.5 h-3.5 text-flatzy-yellow" />
            <span className="truncate max-w-[180px]">{property.subLocation}</span>
          </div>

          {/* Enlarge / Full Picture View Tag */}
          <div className="pointer-events-auto flex items-center gap-1.5">
            <span className="px-2.5 py-1 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md text-white text-[11px] font-bold flex items-center gap-1 shadow-sm transition-all group-hover/img:scale-105">
              <Maximize2 className="w-3 h-3 text-flatzy-yellow" />
              <span>{property.images.length} Photos</span>
            </span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Price and BHK */}
          <div className="flex items-start justify-between gap-2">
            <div>
              {property.listingType === 'sale' && property.salePrice ? (
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-rose-600 font-poppins tracking-tight">
                      ₹{property.salePrice >= 10000000 ? `${(property.salePrice / 10000000).toFixed(2)} Cr` : `${(property.salePrice / 100000).toFixed(0)} Lacs`}
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      (Sale Price)
                    </span>
                  </div>
                  <div className="text-[11px] font-bold text-emerald-700 mt-0.5">
                    Limited Offer • Ready to Move
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-flatzy-navy font-poppins tracking-tight">
                      {formatCurrency(property.monthlyRent)}
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      {t('card.perMonth')} {property.salePrice ? '(Rent)' : ''}
                    </span>
                  </div>
                  {property.salePrice && (
                    <div className="text-xs font-extrabold text-purple-700 mt-0.5 flex items-center gap-1">
                      <span>Sale: ₹{(property.salePrice / 10000000).toFixed(1)} Cr</span>
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded">{t('card.negotiable')}</span>
                    </div>
                  )}
                </>
              )}
            </div>

            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 shrink-0">
              {property.location}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-base text-slate-900 line-clamp-1 mt-1.5 group-hover:text-flatzy-navy group-hover:underline underline-offset-2">
            {property.title}
          </h3>

          {/* Key Specs Pill Row */}
          <div className="flex items-center gap-3 text-xs font-medium text-slate-600 mt-2.5 pt-2.5 border-t border-slate-100">
            <div className="flex items-center gap-1">
              <BedDouble className="w-3.5 h-3.5 text-slate-400" />
              <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
            </div>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5 text-slate-400" />
              <span>{property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
            </div>
            <span className="text-slate-300">•</span>
            <span className="truncate">{property.propertyType}</span>
          </div>

          {/* Commute Highlight Pill */}
          {property.commuteHighlight && (
            <div className="mt-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200/70 text-[11px] font-semibold">
              <Train className="w-3 h-3 text-emerald-600 shrink-0" />
              <span className="truncate">{property.commuteHighlight}</span>
            </div>
          )}

          {/* Feature Tags */}
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {property.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-50 text-slate-600 border border-slate-200/60"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <span className="text-[11px] font-medium text-slate-400 truncate max-w-[80px]">
            #{property.brokerReferenceId}
          </span>

          <div className="flex items-center gap-1.5">
            {onScheduleVisit && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onScheduleVisit(property);
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 text-xs font-bold transition-all border border-slate-200/70 hover:border-emerald-300"
                title="Schedule a free site visit"
              >
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                <span>Visit</span>
              </button>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectProperty(property);
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-flatzy-yellow hover:bg-flatzy-yellowDark text-flatzy-navy text-xs font-bold transition-colors group-hover:translate-x-0.5 shadow-xs"
            >
              <span>{t('card.viewDetails')}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Full Picture View Modal */}
      <PictureViewModal
        isOpen={isPictureViewOpen}
        images={property.images}
        initialIndex={imageIndex}
        title={property.title}
        subLocation={`${property.subLocation}, ${property.location}`}
        onClose={() => setIsPictureViewOpen(false)}
      />
    </div>
  );
};
