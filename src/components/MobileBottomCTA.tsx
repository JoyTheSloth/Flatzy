import React from 'react';
import { Sparkles, Compass, MessageSquare } from 'lucide-react';

interface MobileBottomCTAProps {
  onOpenInquiryModal: () => void;
  onExploreClick: () => void;
  savedCount: number;
  onOpenSavedDrawer: () => void;
}

export const MobileBottomCTA: React.FC<MobileBottomCTAProps> = ({
  onOpenInquiryModal,
  onExploreClick,
  savedCount,
  onOpenSavedDrawer,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-4 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-2xl flex items-center gap-2">
      <button
        onClick={onExploreClick}
        className="flex-1 py-2.5 px-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
      >
        <Compass className="w-4 h-4 text-slate-600" />
        <span>Browse</span>
      </button>

      <button
        onClick={onOpenInquiryModal}
        className="flex-[2] py-2.5 px-4 rounded-2xl bg-flatzy-yellow hover:bg-flatzy-yellowDark text-flatzy-navy font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-soft active:scale-95 transition-all"
      >
        <Sparkles className="w-4 h-4" />
        <span>Enquire Flat</span>
      </button>

      <a
        href="https://wa.me/919830000000?text=Hi%20Flatzy!%20I%20am%20looking%20for%20a%20flat%20in%20Kolkata"
        target="_blank"
        rel="noopener noreferrer"
        className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center"
        aria-label="WhatsApp Flatzy"
      >
        <MessageSquare className="w-4 h-4" />
      </a>
    </div>
  );
};
