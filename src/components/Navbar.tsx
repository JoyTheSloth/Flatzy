import React, { useState, useEffect } from 'react';
import { FlatzyLogo } from './FlatzyLogo';
import { LanguageToggle } from './LanguageToggle';
import { useLanguage } from '../context/LanguageContext';
import { 
  Menu, 
  X, 
  Heart, 
  Sparkles, 
  Instagram, 
  Compass, 
  MapPin, 
  HelpCircle, 
  Info, 
  PhoneCall,
  Search,
  Home
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string, extra?: any) => void;
  savedCount: number;
  onOpenSavedDrawer: () => void;
  onOpenInquiryModal: () => void;
  onOpenRoleModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  savedCount,
  onOpenSavedDrawer,
  onOpenInquiryModal,
  onOpenRoleModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: t('nav.home'), icon: Home },
    { id: 'explore', label: t('nav.explore'), icon: Compass },
    { id: 'locations', label: t('nav.locations'), icon: MapPin },
    { id: 'reels', label: t('nav.reels'), icon: Instagram },
    { id: 'how-it-works', label: t('nav.howItWorks'), icon: HelpCircle },
    { id: 'about', label: t('nav.about'), icon: Info },
    { id: 'contact', label: t('nav.contact'), icon: PhoneCall },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-soft border-b border-slate-200/80 py-2.5' 
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-100 py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <FlatzyLogo onClick={() => onNavigate('home')} size="sm" />

        {/* Center: Desktop/Tablet Navigation - Sleek & Smaller Text */}
        <nav className="hidden md:flex items-center gap-0.5 lg:gap-1 bg-slate-50/80 p-1 rounded-full border border-slate-200/60">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-white text-flatzy-navy font-bold shadow-xs border border-slate-200/80'
                    : 'text-slate-600 hover:text-flatzy-navy hover:bg-white/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          
          {/* Language Toggle: EN / বাংলা */}
          <LanguageToggle />

          {/* Instagram quick pill */}
          <a
            href="https://instagram.com/flatzykolkata"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs font-semibold border border-pink-200/60 transition-colors"
          >
            <Instagram className="w-3.5 h-3.5 text-pink-600" />
            <span>@flatzykolkata</span>
          </a>

          {/* Saved Flats Heart Button */}
          <button
            onClick={onOpenSavedDrawer}
            aria-label="View saved flats"
            className="relative p-2 rounded-full bg-slate-100 hover:bg-slate-200/80 text-flatzy-navy transition-all duration-200 hover:scale-105"
            title="Saved flats"
          >
            <Heart className={`w-4 h-4 ${savedCount > 0 ? 'fill-flatzy-coral text-flatzy-coral' : 'text-slate-600'}`} />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-flatzy-coral text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm animate-pulse">
                {savedCount}
              </span>
            )}
          </button>

          {/* Role selection trigger: Rent/Buy or Broker */}
          {onOpenRoleModal && (
            <button
              onClick={onOpenRoleModal}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200/80 transition-colors"
              title="Switch role or submit requirement"
            >
              <span>Rent / Broker?</span>
            </button>
          )}

          {/* Primary CTA button: Enquire Flat (Desktop only - mobile uses bottom navbar) */}
          <button
            onClick={onOpenInquiryModal}
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-flatzy-yellow hover:bg-flatzy-yellowDark text-flatzy-navy font-bold text-xs shadow-soft hover:shadow-yellow-glow transition-all duration-200 active:scale-95 group"
          >
            <Sparkles className="w-3.5 h-3.5 transition-transform group-hover:rotate-12" />
            <span>{t('nav.findMyFlat')}</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 rounded-xl text-flatzy-navy hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200/80 bg-white/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
          <div className="py-2 flex items-center justify-between px-2">
            <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
              Kolkata Discovery
            </span>
            <LanguageToggle />
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-left font-semibold text-sm transition-all ${
                  isActive
                    ? 'bg-flatzy-yellow text-flatzy-navy font-bold shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-flatzy-navy' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100 space-y-2.5">
            {onOpenRoleModal && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRoleModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-slate-100 text-slate-800 font-bold text-xs border border-slate-200"
              >
                <span>🏡 Rent/Buy or 💼 Broker?</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiryModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-flatzy-yellow text-flatzy-navy font-bold text-sm shadow-soft"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t('nav.findMyFlat')}</span>
            </button>

            <a
              href="https://instagram.com/flatzykolkata"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-slate-100 hover:bg-pink-50 text-slate-700 hover:text-pink-700 text-xs font-semibold border border-slate-200 transition-colors"
            >
              <Instagram className="w-4 h-4 text-pink-600" />
              <span>Follow @flatzykolkata on Instagram</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
