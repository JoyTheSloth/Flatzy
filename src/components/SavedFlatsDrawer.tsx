import React from 'react';
import type { Property } from '../types/property';
import { 
  X, 
  Trash2, 
  Heart, 
  ArrowRight, 
  MapPin, 
  Sparkles,
  BedDouble,
  MessageSquare,
  Compass,
  CheckCircle2
} from 'lucide-react';

interface SavedFlatsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedProperties: Property[];
  onRemoveSaved: (id: string) => void;
  onClearAll?: () => void;
  onSelectProperty: (property: Property) => void;
  onOpenInquiryModal: (property?: Property) => void;
  onNavigate?: (tab: string) => void;
}

export const SavedFlatsDrawer: React.FC<SavedFlatsDrawerProps> = ({
  isOpen,
  onClose,
  savedProperties,
  onRemoveSaved,
  onClearAll,
  onSelectProperty,
  onOpenInquiryModal,
  onNavigate,
}) => {
  if (!isOpen) return null;

  const totalMonthlyRent = savedProperties.reduce((acc, p) => acc + p.monthlyRent, 0);

  const handleWhatsApp = (property: Property) => {
    const text = `Hi Flatzy! I am interested in this flat saved from my Flatzy wishlist: ${property.title} (${property.brokerReferenceId}) at ${property.subLocation} for ₹${property.monthlyRent.toLocaleString('en-IN')}/mo. Can you connect me with the broker?`;
    window.open(`https://wa.me/919830000000?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-300">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-flatzy-coral/10 text-flatzy-coral shadow-xs">
                <Heart className="w-5 h-5 fill-flatzy-coral text-flatzy-coral" />
              </div>
              <div>
                <h3 className="font-black text-base text-flatzy-navy font-poppins">
                  Wishlist & Saved Flats
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {savedProperties.length} {savedProperties.length === 1 ? 'flat' : 'flats'} ready to inquire
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {savedProperties.length > 0 && onClearAll && (
                <button
                  onClick={onClearAll}
                  className="text-[11px] font-bold text-slate-400 hover:text-rose-600 px-2.5 py-1 rounded-full hover:bg-slate-200/60 transition-colors"
                  title="Clear all saved flats"
                >
                  Clear all
                </button>
              )}
              <button
                onClick={onClose}
                aria-label="Close drawer"
                className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Property List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin">
            {savedProperties.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-5">
                <div className="w-20 h-20 rounded-3xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-flatzy-coral">
                  <Heart className="w-10 h-10 stroke-1 fill-amber-100 text-flatzy-coral" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-extrabold text-slate-900 text-base">Your Wishlist is Empty</h4>
                  <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                    Click the <Heart className="w-3.5 h-3.5 inline text-flatzy-coral fill-flatzy-coral" /> heart icon on any flat card to bookmark it for quick comparisons and direct broker visits!
                  </p>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    if (onNavigate) onNavigate('explore');
                  }}
                  className="px-6 py-2.5 rounded-full bg-flatzy-yellow hover:bg-flatzy-yellowDark text-flatzy-navy font-bold text-xs shadow-soft transition-all flex items-center gap-2"
                >
                  <Compass className="w-4 h-4" />
                  <span>Explore Kolkata Flats</span>
                </button>
              </div>
            ) : (
              savedProperties.map((property) => (
                <div
                  key={property.id}
                  className="group relative bg-white hover:bg-slate-50/80 rounded-2xl p-3.5 border border-slate-200 shadow-xs hover:shadow-soft transition-all flex flex-col gap-3"
                >
                  <div className="flex gap-3 items-start">
                    <img
                      src={property.featuredImage}
                      alt={property.title}
                      className="w-20 h-20 rounded-xl object-cover shrink-0 cursor-pointer border border-slate-100"
                      onClick={() => {
                        onSelectProperty(property);
                        onClose();
                      }}
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-sm font-black text-flatzy-navy font-poppins">
                          ₹{property.monthlyRent.toLocaleString('en-IN')}<span className="text-[10px] font-normal text-slate-500">/mo</span>
                        </span>
                        <button
                          onClick={() => onRemoveSaved(property.id)}
                          aria-label="Remove saved property"
                          className="text-slate-400 hover:text-rose-500 p-1 transition-colors"
                          title="Remove from saved"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4
                        onClick={() => {
                          onSelectProperty(property);
                          onClose();
                        }}
                        className="text-xs font-bold text-slate-800 truncate cursor-pointer hover:text-flatzy-navy mt-0.5"
                      >
                        {property.title}
                      </h4>

                      <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{property.subLocation} ({property.location})</span>
                      </div>

                      <div className="text-[10px] font-semibold text-slate-400 mt-0.5">
                        {property.bedrooms} BHK • {property.furnishing}
                      </div>
                    </div>
                  </div>

                  {/* Actions row inside card */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => {
                        onOpenInquiryModal(property);
                        onClose();
                      }}
                      className="flex-1 py-1.5 px-3 rounded-xl bg-flatzy-yellow hover:bg-flatzy-yellowDark text-flatzy-navy font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 shadow-2xs active:scale-95"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Enquire Flat</span>
                    </button>

                    <button
                      onClick={() => handleWhatsApp(property)}
                      className="p-1.5 px-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs border border-emerald-200 transition-colors flex items-center gap-1"
                      title="WhatsApp connection"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-[11px]">Chat</span>
                    </button>

                    <button
                      onClick={() => {
                        onSelectProperty(property);
                        onClose();
                      }}
                      className="p-1.5 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                      title="View Details"
                    >
                      <span>Details →</span>
                    </button>
                  </div>

                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {savedProperties.length > 0 && (
            <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                <span>Total Combined Rent:</span>
                <span className="text-sm font-black text-flatzy-navy font-poppins">
                  ₹{totalMonthlyRent.toLocaleString('en-IN')}/mo
                </span>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenInquiryModal();
                }}
                className="w-full py-3.5 rounded-full bg-flatzy-navy hover:bg-slate-900 text-white font-black text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-flatzy-yellow" />
                <span>Inquire for All Saved Flats</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
