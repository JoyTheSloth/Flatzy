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
  Home,
  Plus,
  PlusCircle,
  Video,
  ChevronRight,
  Lock,
  Briefcase
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string, extra?: any) => void;
  savedCount: number;
  onOpenSavedDrawer: () => void;
  onOpenInquiryModal: () => void;
  onOpenRoleModal?: () => void;
  onOpenListProperty?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  savedCount,
  onOpenSavedDrawer,
  onOpenInquiryModal,
  onOpenRoleModal,
  onOpenListProperty,
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

  // Short labels specifically for the desktop nav pill — avoids wrapping
  const navItems = [
    { id: 'home',         label: t('nav.home'),        shortLabel: 'Home',         icon: Home },
    { id: 'explore',      label: t('nav.explore'),     shortLabel: 'Explore',      icon: Compass },
    { id: 'list-flats',   label: t('nav.listFlats'),   shortLabel: 'List Flats',   icon: PlusCircle },
    { id: 'locations',    label: t('nav.locations'),   shortLabel: 'Locations',    icon: MapPin },
    { id: 'how-it-works', label: t('nav.howItWorks'),  shortLabel: 'How it Works', icon: HelpCircle },
    { id: 'about',        label: t('nav.about'),       shortLabel: 'About',        icon: Info },
    { id: 'contact',      label: t('nav.contact'),     shortLabel: 'Contact',      icon: PhoneCall },
  ];

  // Mobile drawer only shows secondary discovery pages (Excludes items already in the bottom dock: Home, Explore, List Flats, Saved, Enquire)
  const mobileDrawerItems = [
    { 
      id: 'locations', 
      label: t('nav.locations'), 
      desc: 'New Town, Salt Lake, Sector V & Rajarhat',
      icon: MapPin 
    },
    { 
      id: 'brokers', 
      label: 'Verified Brokers', 
      desc: 'Top neighborhood real estate specialists',
      icon: Briefcase 
    },
    { 
      id: 'how-it-works', 
      label: t('nav.howItWorks'), 
      desc: 'Our zero-brokerage rental guarantee',
      icon: HelpCircle 
    },
    { 
      id: 'about', 
      label: t('nav.about'), 
      desc: 'Our Kolkata team & anti-spam promise',
      icon: Info 
    },
    { 
      id: 'contact', 
      label: t('nav.contact'), 
      desc: 'Call, WhatsApp & Office details',
      icon: PhoneCall 
    },
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
          : 'bg-white/85 backdrop-blur-sm border-b border-slate-100 py-3'
      }`}
    >
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 flex items-center justify-between gap-3 lg:gap-4">
        
        {/* Left: Brand Logo - Anchored to far left sideways */}
        <div className="flex items-center shrink-0">
          <FlatzyLogo onClick={() => onNavigate('home')} size="sm" />
        </div>

        {/* Center: Desktop Navigation - Dedicated breathing room on both sides */}
        <div className="hidden lg:flex flex-1 justify-center min-w-0">
          <nav className="flex items-center gap-0.5 bg-slate-50/90 p-1 rounded-full border border-slate-200/70 shadow-2xs shrink-0">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-white text-flatzy-navy font-bold shadow-xs border border-slate-200/80'
                      : 'text-slate-600 hover:text-flatzy-navy hover:bg-white/60'
                  }`}
                >
                  {item.shortLabel}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Action buttons - Harmonized h-9 sizes and generous spacing */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          
          {/* Language Toggle: EN / বাংলা (locked to h-9) */}
          <LanguageToggle />

          {/* Instagram quick icon (locked to h-9 w-9) */}
          <a
            href="https://instagram.com/flatzykolkata"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden xl:inline-flex items-center justify-center w-9 h-9 rounded-full bg-slate-50 hover:bg-pink-50 text-slate-500 hover:text-pink-600 border border-slate-200/80 hover:border-pink-200/80 transition-all hover:scale-105"
            title="Follow @flatzykolkata on Instagram"
          >
            <Instagram className="w-4 h-4 text-pink-600" />
          </a>

          {/* Saved Flats Heart Button (locked to h-9 w-9) */}
          <button
            onClick={onOpenSavedDrawer}
            aria-label="View saved flats"
            className="relative w-9 h-9 rounded-full bg-slate-50 hover:bg-rose-50 text-slate-600 hover:text-rose-500 border border-slate-200/80 hover:border-rose-200/80 transition-all flex items-center justify-center hover:scale-105"
            title="Saved flats"
          >
            <Heart className={`w-4 h-4 ${savedCount > 0 ? 'fill-flatzy-coral text-flatzy-coral' : 'text-slate-600'}`} />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-flatzy-coral text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs animate-pulse">
                {savedCount}
              </span>
            )}
          </button>

          {/* Subtle vertical hairline divider */}
          <div className="hidden lg:block h-5 w-px bg-slate-200/80 mx-0.5" />

          {/* Role selection trigger: Rent/Broker — xl only, no wrapping */}
          {onOpenRoleModal && (
            <button
              onClick={onOpenRoleModal}
              className="hidden xl:inline-flex items-center justify-center h-9 px-3.5 rounded-full text-xs font-bold text-slate-700 bg-slate-100/90 hover:bg-slate-200/80 border border-slate-200 transition-all active:scale-95 whitespace-nowrap shadow-2xs"
              title="Post property or switch to broker mode"
            >
              <span>Rent/Broker</span>
            </button>
          )}

          {/* List Property Free Landlord CTA */}
          {onOpenListProperty && (
            <button
              onClick={onOpenListProperty}
              className="hidden md:inline-flex items-center justify-center gap-1.5 h-9 px-3.5 rounded-full text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300/80 transition-all active:scale-95 whitespace-nowrap shadow-2xs"
              title="List flat in 2 minutes with zero brokerage"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-600" />
              <span>List Flat (Free)</span>
            </button>
          )}

          {/* Primary CTA button: Enquire Flat (exact h-9 matching Rent / Broker) */}
          <button
            onClick={onOpenInquiryModal}
            className="hidden sm:inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-full bg-flatzy-yellow hover:bg-flatzy-yellowDark text-flatzy-navy font-bold text-xs shadow-soft hover:shadow-yellow-glow transition-all duration-200 active:scale-95 group shrink-0 whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 transition-transform group-hover:rotate-12 text-flatzy-navy" />
            <span>{t('nav.findMyFlat')}</span>
          </button>

          {/* Mobile/Tablet Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 rounded-xl text-flatzy-navy hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu (Curated, non-redundant secondary pages) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200/80 bg-white/98 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-3 duration-200 shadow-xl max-h-[calc(100vh-4.5rem)] overflow-y-auto">
          
          <div className="flex items-center justify-between px-2 pt-1 pb-1">
            <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-400">
              More Pages & Exploration
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
              Kolkata, WB
            </span>
          </div>

          {/* Clean List of Non-Duplicated Secondary Pages */}
          <div className="space-y-1.5">
            {mobileDrawerItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl text-left transition-all ${
                    isActive
                      ? 'bg-flatzy-yellow text-flatzy-navy font-bold shadow-xs'
                      : 'bg-slate-50/80 hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${isActive ? 'bg-white text-flatzy-navy' : 'bg-white text-slate-600 border border-slate-200/70 shadow-2xs'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold leading-tight">{item.label}</div>
                      <div className="text-[10px] text-slate-500 font-normal leading-tight mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-flatzy-navy' : 'text-slate-400'}`} />
                </button>
              );
            })}
          </div>

          {/* Partner & Staff Quick Links */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            {onOpenRoleModal && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRoleModal();
                }}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-900 text-left font-bold text-xs transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Briefcase className="w-4 h-4 text-amber-700" />
                  <span>Are you a Broker or Property Owner?</span>
                </div>
                <ChevronRight className="w-4 h-4 text-amber-600" />
              </button>
            )}

            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://instagram.com/flatzykolkata"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-pink-50 text-slate-700 hover:text-pink-700 text-xs font-semibold border border-slate-200 transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-600" />
                <span>Instagram @flatzykolkata</span>
              </a>
            </div>
          </div>

        </div>
      )}
    </header>
  );
};
