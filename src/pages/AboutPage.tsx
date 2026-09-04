import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Instagram, 
  CheckCircle2, 
  MapPin, 
  Zap, 
  Heart,
  MessageSquare,
  Compass,
  Users,
  Building
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AboutPageProps {
  onNavigate: (tab: string) => void;
  onOpenInquiryModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
  onOpenInquiryModal,
}) => {
  const { t } = useLanguage();
  const pillars = [
    {
      icon: Zap,
      color: 'bg-amber-100 text-amber-800',
      title: 'Less Searching. More Moving In.',
      description: 'Traditional portals have thousands of ghost listings from 2023. Flatzy verifies active vacancy and connects you directly with the property contact.'
    },
    {
      icon: Instagram,
      color: 'bg-pink-100 text-pink-700',
      title: 'Instagram-Native Discovery',
      description: 'We know people discover real homes through video tours. Forward any Kolkata Reel to @flatzykolkata, and we find the building and price for you.'
    },
    {
      icon: Users,
      color: 'bg-emerald-100 text-emerald-800',
      title: 'Zero Moral Policing',
      description: 'Students, bachelors, working couples, or families — every listing is tagged upfront so you never face gatekeeper rejection.'
    }
  ];

  const localities = [
    { name: 'Shapoorji', label: 'Student & Tech Pad' },
    { name: 'Sector V', label: 'Walk to IT Offices' },
    { name: 'New Town', label: 'Modern High-Rises' },
    { name: 'Salt Lake', label: 'Quiet Green Sectors' },
    { name: 'Rajarhat', label: 'Airport & VIP Corridor' }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Scenic Cityscape Background Image */}
      <div 
        className="absolute top-0 left-0 right-0 h-[650px] sm:h-[800px] bg-top bg-cover bg-no-repeat pointer-events-none opacity-35 sm:opacity-45"
        style={{ backgroundImage: "url('/city-bg.png')" }}
      />
      <div className="absolute top-0 left-0 right-0 h-[650px] sm:h-[800px] bg-gradient-to-b from-white/20 via-transparent to-[#FAF9F6] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-16 animate-in fade-in duration-300">
        
        {/* ========================================================================= */}
        {/* TOP HERO STORY SECTION (Centralized) */}
        {/* ========================================================================= */}
        <div className="max-w-3xl mx-auto text-center space-y-6">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-flatzy-yellow/25 border border-flatzy-yellow/50 text-flatzy-navy text-xs font-bold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-flatzy-yellowDark" />
          <span>{t('about.badge')}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-flatzy-navy font-poppins leading-[1.15]">
          {t('about.title')}
        </h1>

        <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
          <p>
            Finding a rental home often means opening multiple websites, scrolling through endless outdated listings, messaging random contacts, and calling broker after broker.
          </p>
          <p>
            <strong className="text-flatzy-navy font-black">Flatzy is built to simplify that journey.</strong> Whether you discover a flat through our Instagram Reels or search directly on our website, we help you get from:
          </p>

          {/* Quote Pill Highlight - Centered */}
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-flatzy-yellow/60 text-flatzy-navy flex flex-col sm:flex-row sm:items-center justify-center gap-3 sm:gap-4 shadow-xs max-w-xl mx-auto">
            <span className="text-sm font-bold text-slate-600 italic">{t('about.quote1')}</span>
            <span className="text-flatzy-yellowDark font-black text-lg hidden sm:inline">➔</span>
            <span className="text-sm font-extrabold text-flatzy-navy">{t('about.quote2')}</span>
            <span className="text-[11px] font-black uppercase px-2.5 py-0.5 rounded-md bg-flatzy-yellow text-flatzy-navy self-center">
              Skip the hassle
            </span>
          </div>

          <p className="text-xs text-slate-500 pt-1">
            No endless phone interrogation, no fake prices, and no middleman confusion.
          </p>
        </div>

        {/* Quick Action Buttons - Centered */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('explore')}
            className="px-7 py-3.5 rounded-full bg-flatzy-yellow hover:bg-flatzy-yellowDark text-flatzy-navy font-black text-xs sm:text-sm uppercase tracking-wider shadow-soft hover:shadow-yellow-glow transition-all flex items-center gap-2"
          >
            <Compass className="w-4 h-4" />
            <span>{t('about.btnExplore')}</span>
          </button>

          <a
            href="https://instagram.com/flatzykolkata"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-full bg-white hover:bg-pink-50 text-slate-700 hover:text-pink-700 font-bold text-xs sm:text-sm border border-slate-200/90 shadow-soft transition-all flex items-center gap-2"
          >
            <Instagram className="w-4 h-4 text-pink-600" />
            <span>@flatzykolkata</span>
          </a>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3 CORE PILLARS SECTION */}
      {/* ========================================================================= */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-flatzy-yellowDark">
            Why We Are Different
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-flatzy-navy font-poppins">
            Built from scratch for how people search today
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className={`w-12 h-12 rounded-2xl ${pillar.color} flex items-center justify-center font-bold shadow-xs`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-flatzy-navy font-poppins">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-flatzy-navy">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Flatzy Guarantee</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* KOLKATA LOCAL FOCUS STRIP */}
      {/* ========================================================================= */}
      <div className="bg-slate-100/80 rounded-3xl p-6 sm:p-10 border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-flatzy-coral flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Hyper-Local Kolkata</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-flatzy-navy font-poppins mt-0.5">
              Active Hubs Across Kolkata East
            </h3>
          </div>

          <button
            onClick={() => onNavigate('locations')}
            className="text-xs font-bold text-flatzy-navy hover:text-flatzy-coral flex items-center gap-1 transition-colors self-start sm:self-auto"
          >
            <span>See neighborhood rent guides</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {localities.map((loc) => (
            <div
              key={loc.name}
              onClick={() => onNavigate('locations')}
              className="bg-white rounded-2xl p-3.5 border border-slate-200/80 hover:border-flatzy-yellow transition-all cursor-pointer space-y-1 shadow-2xs"
            >
              <div className="text-xs font-black text-flatzy-navy">{loc.name}</div>
              <div className="text-[11px] text-slate-500 truncate">{loc.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM ACTION CARD */}
      {/* ========================================================================= */}
      <div className="relative rounded-3xl overflow-hidden bg-flatzy-yellow p-8 sm:p-12 text-center text-flatzy-navy shadow-soft space-y-4 border border-amber-300/60">
        {/* Custom Find Your Flat Panoramic Cityscape Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center sm:bg-bottom pointer-events-none"
          style={{ backgroundImage: "url('/find-your-flat-bg.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-flatzy-yellow/50 via-flatzy-yellow/20 to-flatzy-yellow/50 pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black font-poppins">
            Ready to find your flat without the headache?
          </h3>
          <p className="text-xs sm:text-sm md:text-base font-semibold max-w-md mx-auto text-flatzy-navy/90">
            Browse verified Kolkata listings or reach out directly to our team on WhatsApp.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('explore')}
              className="px-8 py-3.5 rounded-full bg-flatzy-navy hover:bg-slate-900 text-white font-black text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all"
            >
              Browse Kolkata Flats
            </button>

            <a
              href="https://wa.me/919830000000?text=Hi%20Flatzy!%20I%20am%20looking%20for%20a%20flat%20in%20Kolkata."
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 text-flatzy-navy font-bold text-xs shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2 border border-slate-200/60"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};
