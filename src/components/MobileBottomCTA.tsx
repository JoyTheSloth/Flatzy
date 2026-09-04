import React from 'react';
import { Home, Compass, Film, Heart, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface MobileBottomCTAProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  onOpenInquiryModal: () => void;
  savedCount: number;
  onOpenSavedDrawer: () => void;
  onExploreClick?: () => void; // for backwards compatibility
}

export const MobileBottomCTA: React.FC<MobileBottomCTAProps> = ({
  currentTab,
  onNavigate,
  onOpenInquiryModal,
  savedCount,
  onOpenSavedDrawer,
}) => {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  const navTabs = [
    {
      id: 'home',
      label: isBn ? 'হোম' : 'Home',
      icon: Home,
      action: () => {
        onNavigate('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      isActive: currentTab === 'home',
    },
    {
      id: 'explore',
      label: isBn ? 'ফ্ল্যাট' : 'Explore',
      icon: Compass,
      action: () => {
        onNavigate('explore');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      isActive: currentTab === 'explore',
    },
    {
      id: 'reels',
      label: isBn ? 'রিলস' : 'Reels',
      icon: Film,
      action: () => {
        onNavigate('reels');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      isActive: currentTab === 'reels',
      hasBadge: true,
    },
    {
      id: 'saved',
      label: isBn ? 'সেভড' : 'Saved',
      icon: Heart,
      action: onOpenSavedDrawer,
      isActive: false,
      count: savedCount,
    },
    {
      id: 'enquire',
      label: isBn ? 'ইনকোয়ারি' : 'Enquire',
      icon: Sparkles,
      action: onOpenInquiryModal,
      isPrimary: true,
    },
  ];

  return (
    <nav 
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 px-2 pt-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-4px_25px_rgba(0,0,0,0.08)]"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navTabs.map((tab) => {
          const Icon = tab.icon;

          if (tab.isPrimary) {
            return (
              <button
                key={tab.id}
                onClick={tab.action}
                aria-label="Enquire Flat"
                className="flex flex-col items-center justify-center -mt-3 px-3.5 py-1.5 rounded-2xl bg-flatzy-yellow hover:bg-flatzy-yellowDark text-flatzy-navy font-black shadow-md active:scale-95 transition-all group"
              >
                <div className="w-7 h-7 rounded-full bg-flatzy-navy/10 flex items-center justify-center transition-transform group-hover:rotate-12">
                  <Icon className="w-4 h-4 text-flatzy-navy stroke-[2.5]" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider mt-0.5 leading-none">
                  {tab.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={tab.action}
              aria-label={tab.label}
              className={`flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all relative ${
                tab.isActive
                  ? 'text-flatzy-navy font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    tab.isActive ? 'scale-110 stroke-[2.5]' : 'stroke-[1.8]'
                  }`}
                />

                {/* Reels Active Badge */}
                {tab.hasBadge && (
                  <span className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
                )}

                {/* Saved Count Badge */}
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 bg-rose-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white shadow-xs">
                    {tab.count}
                  </span>
                )}
              </div>

              <span
                className={`text-[10px] tracking-tight mt-1 leading-none ${
                  tab.isActive ? 'font-black text-flatzy-navy' : 'font-medium text-slate-500'
                }`}
              >
                {tab.label}
              </span>

              {/* Active Tab Underline Pill */}
              {tab.isActive && (
                <span className="w-3 h-1 bg-flatzy-yellow rounded-full mt-1 animate-in zoom-in-50 duration-200" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
