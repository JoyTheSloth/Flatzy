import React from 'react';
import type { Property } from '../types/property';
import { 
  X, 
  Trash2, 
  Heart, 
  MapPin, 
  Sparkles, 
  MessageSquare, 
  Compass, 
  ExternalLink,
  ShieldCheck,
  Send,
  Tag
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getWhatsAppUrl } from '../config/contact';

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
  const { language } = useLanguage();
  const isBn = language === 'bn';

  if (!isOpen) return null;

  const totalMonthlyRent = savedProperties.reduce((acc, p) => acc + p.monthlyRent, 0);
  const totalDeposit = savedProperties.reduce((acc, p) => acc + (p.securityDeposit || p.monthlyRent * 2), 0);

  const handleWhatsAppSingle = (property: Property) => {
    const text = `Hi Flatzy! I am interested in visiting this flat saved in my Flatzy wishlist:\n\n*${property.title}*\nRef ID: ${property.brokerReferenceId}\nLocation: ${property.subLocation}, ${property.location}\nRent: ₹${property.monthlyRent.toLocaleString('en-IN')}/month\nDeposit: ₹${(property.securityDeposit || property.monthlyRent * 2).toLocaleString('en-IN')}\n\nPlease share the verified broker contact and schedule a visit!`;
    window.open(getWhatsAppUrl(text), '_blank', 'noopener,noreferrer');
  };

  const handleWhatsAppAll = () => {
    if (savedProperties.length === 0) return;
    const summary = savedProperties
      .map((p, i) => `${i + 1}. *${p.title}* (${p.brokerReferenceId}) - ₹${p.monthlyRent.toLocaleString('en-IN')}/mo at ${p.subLocation}`)
      .join('\n');
    const text = `Hi Flatzy Kolkata! I have shortlisted these ${savedProperties.length} flats on my Flatzy wishlist:\n\n${summary}\n\nCombined Monthly Rent: ₹${totalMonthlyRent.toLocaleString('en-IN')}/mo\n\nCan you connect me with the brokers to schedule visits together?`;
    window.open(getWhatsAppUrl(text), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/65 backdrop-blur-sm flex flex-col justify-end sm:justify-stretch animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0" 
        onClick={onClose} 
        aria-hidden="true"
      />
      
      {/* Drawer Container (Native bottom sheet on mobile, slide-over drawer on tablet/desktop) */}
      <div className="relative z-10 w-full sm:max-w-md sm:ml-auto h-[92vh] sm:h-full bg-slate-50 flex flex-col rounded-t-[28px] sm:rounded-none shadow-2xl sm:border-l border-slate-200 animate-in slide-in-from-bottom sm:slide-in-from-right duration-300 overflow-hidden">
        
        {/* Mobile Pull Handle Indicator */}
        <div className="sm:hidden pt-3 pb-1 bg-white flex justify-center cursor-pointer select-none" onClick={onClose}>
          <div className="w-12 h-1.5 bg-slate-300 rounded-full" />
        </div>

        {/* Drawer Header */}
        <div className="px-4 py-3 sm:p-4 bg-white border-b border-slate-100 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-rose-50 border border-rose-200/70 flex items-center justify-center text-rose-500 shadow-xs">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-rose-500 text-rose-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-sm sm:text-base text-flatzy-navy font-poppins">
                  {isBn ? 'সংরক্ষিত ফ্ল্যাট' : 'Saved Flats'}
                </h3>
                <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-flatzy-yellow text-flatzy-navy">
                  {savedProperties.length}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                {isBn ? 'সহজে তুলনা ও এক ক্লিকে বুকিং' : 'Quick compare & 1-tap inquiries'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {savedProperties.length > 0 && onClearAll && (
              <button
                onClick={onClearAll}
                className="text-[11px] font-bold text-slate-400 hover:text-rose-600 px-2.5 py-1 rounded-full hover:bg-slate-100 transition-colors active:scale-95"
              >
                {isBn ? 'সব মুছুন' : 'Clear all'}
              </button>
            )}
            <button
              onClick={onClose}
              aria-label="Close drawer"
              className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Property List Content Area */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 scrollbar-thin">
          {savedProperties.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 my-auto">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-rose-50 border border-rose-200/80 flex items-center justify-center text-rose-500 shadow-sm">
                <Heart className="w-8 h-8 sm:w-10 sm:h-10 fill-rose-100 text-rose-500 stroke-[1.5]" />
              </div>
              
              <div className="space-y-1 max-w-xs">
                <h4 className="font-extrabold text-slate-900 text-base sm:text-lg">
                  {isBn ? 'আপনার পছন্দের তালিকা খালি' : 'No Saved Flats Yet'}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {isBn
                    ? 'কলকাতার যেকোনো ফ্ল্যাটে হার্ট আইকন ট্যাপ করে সেভ করুন এবং ব্রোকারদের সাথে সরাসরি যোগাযোগ করুন।'
                    : 'Tap the heart icon on any flat card to build your personalized shortlist for quick visits & direct inquiries!'}
                </p>
              </div>

              {/* Quick Action to Explore */}
              <div className="pt-2 w-full max-w-xs space-y-2.5">
                <button
                  onClick={() => {
                    onClose();
                    if (onNavigate) onNavigate('explore');
                  }}
                  className="w-full py-3 rounded-2xl bg-flatzy-yellow hover:bg-flatzy-yellowDark text-flatzy-navy font-black text-xs uppercase tracking-wider shadow-soft transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <Compass className="w-4 h-4" />
                  <span>{isBn ? 'ফ্ল্যাট খুঁজুন' : 'Explore Kolkata Flats'}</span>
                </button>

                {/* Popular Locality Shortcuts */}
                <div className="pt-1 flex flex-wrap justify-center gap-1.5">
                  {['New Town', 'Salt Lake', 'Shapoorji', 'Sector V'].map((loc) => (
                    <button
                      key={loc}
                      onClick={() => {
                        onClose();
                        if (onNavigate) onNavigate('explore');
                      }}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-600 hover:border-flatzy-yellow hover:text-flatzy-navy transition-all"
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            savedProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-2xl p-3 sm:p-3.5 border border-slate-200/90 shadow-xs hover:shadow-soft transition-all flex flex-col gap-2.5"
              >
                {/* Top Half: Compact Thumbnail & Property Details */}
                <div className="flex gap-3 items-start">
                  {/* Property Image with BHK Overlay */}
                  <div
                    onClick={() => {
                      onSelectProperty(property);
                      onClose();
                    }}
                    className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-xl overflow-hidden shrink-0 cursor-pointer border border-slate-100 bg-slate-100 group"
                  >
                    <img
                      src={property.featuredImage}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute bottom-1 left-1 bg-black/75 backdrop-blur-xs text-white font-extrabold text-[9px] px-1.5 py-0.5 rounded shadow-xs">
                      {property.bedrooms ? `${property.bedrooms} BHK` : '1 RK'}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <div className="text-sm sm:text-base font-black text-flatzy-navy font-poppins">
                        ₹{property.monthlyRent.toLocaleString('en-IN')}
                        <span className="text-[10px] font-normal text-slate-500">/mo</span>
                      </div>
                      <button
                        onClick={() => onRemoveSaved(property.id)}
                        aria-label="Remove saved property"
                        className="text-slate-300 hover:text-rose-500 p-1 rounded-lg hover:bg-rose-50 transition-colors active:scale-90"
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
                      className="text-xs font-bold text-slate-900 truncate cursor-pointer hover:text-flatzy-navy mt-0.5 leading-snug"
                    >
                      {property.title}
                    </h4>

                    <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
                      <MapPin className="w-3 h-3 text-flatzy-yellow shrink-0" />
                      <span className="truncate font-medium">{property.subLocation || property.location}</span>
                    </div>

                    {/* Metadata tags */}
                    <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                        {property.furnishing}
                      </span>
                      <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        <ShieldCheck className="w-2.5 h-2.5 text-emerald-600" />
                        <span>0% Brokerage</span>
                      </span>
                      <span className="text-[9px] font-mono text-slate-400">
                        #{property.brokerReferenceId}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Half: Single-Tap Quick Action Buttons */}
                <div className="grid grid-cols-12 gap-1.5 pt-2 border-t border-slate-100">
                  {/* Inquire */}
                  <button
                    onClick={() => {
                      onOpenInquiryModal(property);
                      onClose();
                    }}
                    className="col-span-5 py-2 px-2 rounded-xl bg-flatzy-yellow hover:bg-flatzy-yellowDark text-flatzy-navy font-black text-[11px] uppercase tracking-wider transition-transform flex items-center justify-center gap-1 shadow-2xs active:scale-95"
                  >
                    <Sparkles className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{isBn ? 'ইনকোয়ারি' : 'Enquire'}</span>
                  </button>

                  {/* WhatsApp Chat */}
                  <button
                    onClick={() => handleWhatsAppSingle(property)}
                    className="col-span-4 py-2 px-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-[11px] border border-emerald-200 transition-colors flex items-center justify-center gap-1 active:scale-95"
                    title="Chat on WhatsApp"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>WhatsApp</span>
                  </button>

                  {/* View Details */}
                  <button
                    onClick={() => {
                      onSelectProperty(property);
                      onClose();
                    }}
                    className="col-span-3 py-2 px-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold transition-colors flex items-center justify-center gap-1 active:scale-95"
                    title="View details"
                  >
                    <span>View</span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </button>
                </div>

              </div>
            ))
          )}
        </div>

        {/* Drawer Bottom Summary & Inquire Action Bar */}
        {savedProperties.length > 0 && (
          <div className="p-3 sm:p-4 border-t border-slate-200 bg-white space-y-2.5 shadow-lg pb-[max(1rem,env(safe-area-inset-bottom))]">
            {/* Rent & Deposit Combined Breakdown */}
            <div className="flex items-center justify-between text-xs px-1">
              <div>
                <span className="text-[11px] text-slate-500 font-medium block">
                  {isBn ? 'মোট সম্ভাব্য ভাড়া:' : 'Combined Rent:'}
                </span>
                <span className="text-sm sm:text-base font-black text-flatzy-navy font-poppins">
                  ₹{totalMonthlyRent.toLocaleString('en-IN')}<span className="text-[10px] font-normal text-slate-500">/mo</span>
                </span>
              </div>

              <div className="text-right">
                <span className="text-[11px] text-slate-500 font-medium block">
                  {isBn ? 'আনুমানিক ডিপোজিট:' : 'Est. Deposit:'}
                </span>
                <span className="text-xs font-bold text-slate-700">
                  ₹{totalDeposit.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Action Buttons: Batch Form Inquiry & Batch WhatsApp */}
            <div className="grid grid-cols-12 gap-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenInquiryModal();
                }}
                className="col-span-9 py-3 sm:py-3.5 rounded-2xl bg-flatzy-navy hover:bg-slate-900 text-white font-black text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-flatzy-yellow" />
                <span className="truncate">
                  {isBn ? 'সব ফ্ল্যাটের জন্য ইনকোয়ারি' : `Inquire All (${savedProperties.length})`}
                </span>
              </button>

              <button
                onClick={handleWhatsAppAll}
                className="col-span-3 py-3 sm:py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-1"
                title="Send all saved flats to Flatzy on WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="text-[11px]">Chat</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
