import React from 'react';
import type { Property, LocationName, BudgetRange } from '../types/property';
import { PROPERTIES_DATA } from '../data/properties';
import { PropertyCard } from '../components/PropertyCard';
import { useLanguage } from '../context/LanguageContext';
import { 
  Sparkles, 
  ArrowRight, 
  Compass, 
  MapPin, 
  CheckCircle2, 
  Instagram, 
  Flame, 
  Building, 
  Key, 
  ChevronRight,
  Users,
  Heart,
  Video,
  Film
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (tab: string, extra?: any) => void;
  savedPropertyIds: string[];
  onToggleSave: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onOpenInquiryModal: (property?: Property) => void;
  onApplyQuickFilter: (loc?: LocationName, budget?: BudgetRange) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  savedPropertyIds,
  onToggleSave,
  onSelectProperty,
  onOpenInquiryModal,
  onApplyQuickFilter,
}) => {
  const { t, language } = useLanguage();

  // Show just the top 3 handpicked flats on the landing page for clarity
  const handpickedFlats = PROPERTIES_DATA.filter((p) => p.isFeatured).slice(0, 3);

  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Scenic Cityscape Background for Home Page */}
      <div 
        className="absolute top-0 left-0 right-0 h-[780px] sm:h-[950px] bg-top bg-cover bg-no-repeat pointer-events-none opacity-25 sm:opacity-35"
        style={{ backgroundImage: "url('/city-bg.png')" }}
      />
      {/* Smooth downward fade to page surface */}
      <div className="absolute top-0 left-0 right-0 h-[780px] sm:h-[950px] bg-gradient-to-b from-white/20 via-transparent to-[#FAF9F6] pointer-events-none" />
      {/* Horizontal softening so background buildings don't clash with text on the left or foreground buildings on the right */}
      <div className="absolute top-0 left-0 right-0 h-[780px] sm:h-[950px] bg-gradient-to-r from-[#FAF9F6]/90 via-transparent to-[#FAF9F6]/75 pointer-events-none" />

      <div className="relative z-10 space-y-16 sm:space-y-24 pb-16 animate-in fade-in duration-300">
        
        {/* ========================================================================= */}
        {/* SECTION 1: HERO & QUICK DISCOVERY SEARCH */}
        {/* ========================================================================= */}
        <section className="relative pt-10 sm:pt-16 lg:pt-20 xl:pt-24 overflow-hidden">
          {/* Soft ambient background glow */}
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl h-72 bg-gradient-to-r from-flatzy-yellow/20 via-amber-100/30 to-orange-100/20 rounded-[80px] blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center lg:items-end">
            
            {/* Left Column: Headline & Messaging */}
            <div className="lg:col-span-6 xl:col-span-6 space-y-5 text-left z-10 lg:pb-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-flatzy-yellow/25 border border-flatzy-yellow/50 text-flatzy-navy text-xs font-bold shadow-xs">
                <span className="w-2 h-2 rounded-full bg-flatzy-navy animate-pulse" />
                <span>{t('hero.badge')}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-flatzy-navy font-poppins leading-[1.12]">
                {t('hero.title1')} <br className="hidden sm:inline" />
                <span>{t('hero.title2')}{' '}</span>
                <span className="relative inline-block whitespace-nowrap mt-1">
                  <span className="relative z-10">{t('hero.titleHighlight')}</span>
                  <svg 
                    className="absolute -bottom-1 sm:-bottom-1.5 left-0 w-full h-2.5 sm:h-3.5 text-flatzy-yellow pointer-events-none" 
                    viewBox="0 0 100 12" 
                    fill="none" 
                    preserveAspectRatio="none"
                  >
                    <path 
                      d="M3 8 C 30 2, 70 2, 97 7" 
                      stroke="currentColor" 
                      strokeWidth="5" 
                      strokeLinecap="round" 
                    />
                  </svg>
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-lg">
                {t('hero.subtitle')}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('explore')}
                  className="px-7 py-3.5 rounded-full bg-flatzy-yellow hover:bg-flatzy-yellowDark text-flatzy-navy font-extrabold text-xs sm:text-sm shadow-soft hover:shadow-yellow-glow transition-all active:scale-95 flex items-center gap-2 group"
                >
                  <Compass className="w-4 h-4" />
                  <span>{t('hero.exploreCta')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onNavigate('how-it-works')}
                  className="px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm border border-slate-200/90 shadow-soft transition-all"
                >
                  {t('hero.howItWorksCta')}
                </button>
              </div>

            </div>

            {/* Right Column: Visual Showcase directly on the Hero background */}
            <div className="lg:col-span-6 xl:col-span-6 relative flex justify-center lg:justify-end items-end">
              {/* Warm ambient aura matching the hero's palette */}
              <div className="absolute w-80 sm:w-[500px] h-80 sm:h-[500px] bg-gradient-to-tr from-flatzy-yellow/25 via-amber-100/35 to-orange-100/20 rounded-full blur-3xl -z-10 pointer-events-none" />

              <div className="relative w-full max-w-lg lg:max-w-xl xl:max-w-2xl select-none transform transition-transform duration-500 hover:scale-[1.02]">
                <img
                  src="/hero-buildings.png"
                  alt="Modern Kolkata High-Rise Flats"
                  className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.18)]"
                  style={{
                    maskImage: 'linear-gradient(to bottom, black 82%, transparent 99%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 82%, transparent 99%)',
                  }}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: HANDPICKED FLATS (Concise, clean 3 cards) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-flatzy-yellowDark flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-flatzy-coral" />
              <span>{t('handpicked.badge')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-flatzy-navy font-poppins mt-1">
              {t('handpicked.title')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {t('handpicked.subtitle')}
            </p>
          </div>

          <button
            onClick={() => onNavigate('explore')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-flatzy-navy font-bold text-xs transition-colors self-start sm:self-auto"
          >
            <span>{t('handpicked.viewAll')} ({PROPERTIES_DATA.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3 Focused Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {handpickedFlats.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              isSaved={savedPropertyIds.includes(property.id)}
              onToggleSave={onToggleSave}
              onSelectProperty={onSelectProperty}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => onNavigate('explore')}
            className="px-8 py-3.5 rounded-full bg-white hover:bg-slate-50 text-flatzy-navy font-bold text-xs uppercase tracking-wider border border-slate-200 shadow-soft hover:shadow-md transition-all inline-flex items-center gap-2"
          >
            <Compass className="w-4 h-4 text-flatzy-yellowDark" />
            <span>{t('handpicked.catalogBtn')} ({PROPERTIES_DATA.length})</span>
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: TWO WAYS TO DISCOVER (Divided Cards) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-1">
          <span className="text-xs font-black uppercase tracking-wider text-flatzy-yellowDark">
            {t('twoways.badge')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-flatzy-navy font-poppins">
            {t('twoways.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card A: By Neighborhood */}
          <div 
            onClick={() => onNavigate('locations')}
            className="group relative overflow-hidden bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft hover:shadow-soft-lg hover:border-flatzy-yellow transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            {/* Blended Background Watermark Icon & Radial Light */}
            <div className="absolute -right-6 -bottom-6 w-48 h-48 sm:w-56 sm:h-56 text-amber-500/10 group-hover:text-flatzy-yellow/20 pointer-events-none transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12 select-none">
              <MapPin className="w-full h-full stroke-[1.2]" />
            </div>
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-amber-100/40 via-transparent to-transparent rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-3 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/60 text-flatzy-navy flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <MapPin className="w-6 h-6 text-flatzy-yellowDark" />
              </div>
              <h3 className="text-xl font-black text-flatzy-navy font-poppins">
                {t('twoways.locTitle')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm">
                {t('twoways.locDesc')}
              </p>
            </div>

            <div className="pt-6 flex items-center gap-1.5 text-xs font-bold text-flatzy-navy group-hover:text-flatzy-coral transition-colors relative z-10">
              <span>{t('twoways.locCta')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card B: By Flat Video Tours & Reels */}
          <div 
            onClick={() => onNavigate('reels')}
            className="group relative overflow-hidden bg-gradient-to-br from-slate-900 via-flatzy-navy to-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-soft hover:shadow-navy-glow transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            {/* Blended Background Watermark Icon & Radial Glow */}
            <div className="absolute -right-6 -bottom-6 w-48 h-48 sm:w-56 sm:h-56 text-flatzy-yellow/10 group-hover:text-flatzy-yellow/20 pointer-events-none transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 select-none">
              <Video className="w-full h-full stroke-[1.2]" />
            </div>
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-amber-500/20 via-flatzy-yellow/10 to-transparent rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-3 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-flatzy-yellow/20 border border-flatzy-yellow/30 text-flatzy-yellow flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <Film className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-white font-poppins">
                {t('twoways.reelTitle')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm">
                {t('twoways.reelDesc')}
              </p>
            </div>

            <div className="pt-6 flex items-center gap-1.5 text-xs font-bold text-flatzy-yellow group-hover:text-white transition-colors relative z-10">
              <span>{t('twoways.reelCta')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: HOW FLATZY WORKS (Clean & Minimal 3-Step) */}
      {/* ========================================================================= */}
      <section className="bg-slate-100/60 py-12 sm:py-16 border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-1.5">
            <span className="text-xs font-black uppercase tracking-wider text-flatzy-coral">
              {t('steps.badge')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-flatzy-navy font-poppins">
              {t('steps.title')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {t('steps.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-2.5">
              <div className="text-2xl font-black text-flatzy-yellow">01</div>
              <h4 className="font-extrabold text-base text-flatzy-navy">{t('steps.s1Title')}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t('steps.s1Desc')}
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-2.5">
              <div className="text-2xl font-black text-flatzy-yellow">02</div>
              <h4 className="font-extrabold text-base text-flatzy-navy">{t('steps.s2Title')}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t('steps.s2Desc')}
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-2.5">
              <div className="text-2xl font-black text-emerald-500">03</div>
              <h4 className="font-extrabold text-base text-flatzy-navy">{t('steps.s3Title')}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t('steps.s3Desc')}
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => onNavigate('how-it-works')}
              className="text-xs font-bold text-flatzy-navy hover:text-flatzy-coral transition-colors inline-flex items-center gap-1"
            >
              <span>{t('steps.seeFaqs')}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: FINAL CLEAN CTA BANNER WITH FIND YOUR FLAT BG */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-flatzy-yellow p-8 sm:p-12 md:p-16 text-flatzy-navy shadow-soft border border-amber-300/60">
          {/* Custom Find Your Flat Panoramic Cityscape Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center sm:bg-bottom pointer-events-none"
            style={{ backgroundImage: "url('/find-your-flat-bg.png')" }}
          />
          {/* Subtle warm overlay ensuring 100% text contrast and readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-flatzy-yellow/50 via-flatzy-yellow/20 to-flatzy-yellow/50 pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4 sm:space-y-5">
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-black font-poppins text-flatzy-navy leading-tight tracking-tight drop-shadow-xs">
              {t('cta.title')}
            </h3>
            <p className="text-xs sm:text-sm md:text-base font-semibold max-w-lg mx-auto text-flatzy-navy/90 leading-relaxed drop-shadow-xs">
              {t('cta.subtitle')}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <button
                onClick={() => onOpenInquiryModal()}
                className="px-8 py-3.5 rounded-full bg-flatzy-navy hover:bg-slate-900 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all active:scale-95"
              >
                {t('cta.btn')}
              </button>
              <button
                onClick={() => onNavigate('explore')}
                className="px-8 py-3.5 rounded-full bg-white hover:bg-slate-50 text-flatzy-navy font-black text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all active:scale-95 border border-slate-200/60"
              >
                {t('cta.browse')}
              </button>
            </div>
          </div>
        </div>
      </section>

      </div>
    </div>
  );
};
