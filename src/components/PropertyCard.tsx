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
  Share2
} from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  isSaved: boolean;
  onToggleSave: (propertyId: string) => void;
  onSelectProperty: (property: Property) => void;
  onQuickInquire?: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isSaved,
  onToggleSave,
  onSelectProperty,
  onQuickInquire,
}) => {
  const [imageIndex, setImageIndex] = useState(0);

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
      {/* Property Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <img
          src={property.images[imageIndex] || property.featuredImage}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Gradient overlay at top and bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex flex-wrap gap-1.5 pointer-events-auto">
            <span className="px-2.5 py-1 rounded-full bg-flatzy-yellow text-flatzy-navy text-[11px] font-bold shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>{property.availableFrom}</span>
            </span>

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

        {/* Bottom image stats */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white pointer-events-none">
          <div className="flex items-center gap-1.5 text-xs font-semibold drop-shadow">
            <MapPin className="w-3.5 h-3.5 text-flatzy-yellow" />
            <span className="truncate max-w-[200px]">{property.subLocation}</span>
          </div>

          {/* Image count pills if multiple */}
          {property.images.length > 1 && (
            <div className="pointer-events-auto flex gap-1">
              {property.images.slice(0, 4).map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setImageIndex(i);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    imageIndex === i ? 'bg-flatzy-yellow w-4' : 'bg-white/60 hover:bg-white'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Price and BHK */}
          <div className="flex items-baseline justify-between gap-2">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-flatzy-navy font-poppins tracking-tight">
                {formatCurrency(property.monthlyRent)}
              </span>
              <span className="text-xs font-medium text-slate-500">
                /month
              </span>
            </div>

            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
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

          {/* Feature Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
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
          <span className="text-[11px] font-medium text-slate-400">
            ID: {property.brokerReferenceId}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectProperty(property);
            }}
            className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-flatzy-yellow hover:bg-flatzy-yellowDark text-flatzy-navy text-xs font-bold transition-colors group-hover:translate-x-0.5"
          >
            <span>View Flat</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
