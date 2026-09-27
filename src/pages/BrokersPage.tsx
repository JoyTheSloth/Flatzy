import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Star, 
  MapPin, 
  Phone, 
  Building, 
  ArrowRight, 
  CheckCircle2, 
  Briefcase, 
  Award, 
  MessageSquare,
  Sparkles,
  Users,
  ChevronRight,
  PlusCircle
} from 'lucide-react';
import { BROKERS_DATA, type Broker } from '../data/brokersData';
import { getWhatsAppUrl } from '../config/contact';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { useLanguage } from '../context/LanguageContext';

interface BrokersPageProps {
  onNavigate: (tab: string) => void;
  onSelectBroker?: (broker: Broker) => void;
}

export const BrokersPage: React.FC<BrokersPageProps> = ({ onNavigate, onSelectBroker }) => {
  const { t } = useLanguage();
  const handleOpenBroker = (broker: Broker) => {
    if (onSelectBroker) {
      onSelectBroker(broker);
    } else {
      window.location.hash = `broker/${broker.id}`;
      onNavigate('broker-detail');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 animate-in fade-in duration-300">
      
      {/* Top Hero Banner with Blended Generated Illustration */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FFFDF7] via-amber-50/80 to-orange-50/60 p-6 sm:p-10 md:p-12 border border-amber-200/80 shadow-soft">
        
        {/* Blended Background Illustration on Right Side */}
        <div className="absolute right-0 top-0 bottom-0 w-full sm:w-7/12 md:w-1/2 lg:w-[52%] pointer-events-none overflow-hidden select-none">
          <img
            src="/kolkata-brokers-banner.jpg"
            alt="Top Kolkata Rental Brokers and Advisors"
            className="w-full h-full object-cover object-center opacity-35 sm:opacity-80 md:opacity-90 mix-blend-multiply"
          />
          {/* Multi-directional gradient feathering for seamless blend into card */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFFDF7] via-[#FFFDF7]/80 sm:via-[#FFFDF7]/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FFFDF7]/80 via-transparent to-[#FFFDF7]/40" />
        </div>

        {/* Ambient Warm Glow */}
        <div className="absolute -top-16 -left-16 w-56 h-56 bg-flatzy-yellow/20 rounded-full blur-3xl pointer-events-none" />
        
        {/* Text Content */}
        <div className="relative z-10 max-w-lg lg:max-w-xl text-left space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-flatzy-navy text-xs font-bold border border-amber-200/80 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('brokers.badge')}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-flatzy-navy font-poppins tracking-tight leading-tight">
            {t('brokers.title')} <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-flatzy-coral via-amber-600 to-amber-500 bg-clip-text text-transparent">
              {t('brokers.titleHighlight')}
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-md lg:max-w-lg">
            {t('brokers.desc')}
          </p>
        </div>
      </div>

      {/* Broker Cards Showcase */}
      <div className="max-w-4xl lg:max-w-5xl mx-auto w-full">
        {BROKERS_DATA.map((broker) => (
          <div
            key={broker.id}
            onClick={() => handleOpenBroker(broker)}
            className="group relative bg-white rounded-2xl md:rounded-3xl border border-slate-200/90 shadow-soft hover:shadow-soft-xl transition-all duration-300 overflow-hidden text-left flex flex-col md:flex-row cursor-pointer"
          >
            {/* Left Column (Desktop Identity Panel / Mobile Compact Header) */}
            <div className="md:w-72 lg:w-80 p-3 sm:p-5 md:p-8 pb-1 sm:pb-3 md:pb-8 bg-gradient-to-b from-slate-50/90 via-slate-50/50 to-amber-50/20 md:border-r border-slate-200/80 flex flex-col justify-between shrink-0 md:space-y-5">
              
              <div className="flex flex-row md:flex-col items-center md:items-center text-left md:text-center gap-2.5 sm:gap-3.5 w-full group/profile">
                {/* Avatar with verified ring */}
                <div className="relative shrink-0">
                  <img
                    src={broker.avatar}
                    alt={broker.name}
                    className="w-14 h-14 sm:w-16 sm:h-16 md:w-36 md:h-36 rounded-xl sm:rounded-2xl md:rounded-3xl object-cover object-top ring-2 md:ring-4 ring-white shadow-soft group-hover/profile:scale-[1.03] transition-transform duration-300"
                  />
                  <div className="absolute -bottom-1 -right-1 p-0.5 md:p-1.5 rounded-full bg-emerald-500 text-white shadow-xs ring-2 ring-white" title="Identity Verified">
                    <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4" />
                  </div>
                </div>

                {/* Name & Blue Tick + Agency + Rating */}
                <div className="flex-1 min-w-0 space-y-0.5 md:space-y-3.5">
                  <div className="space-y-0 md:space-y-1">
                    <div className="flex items-center justify-between md:justify-center gap-1.5 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-base sm:text-lg md:text-2xl font-black text-slate-900 font-poppins group-hover:text-emerald-700 transition-colors">
                          {broker.name}
                        </h3>
                        <img
                          src="/verified-badge.png"
                          alt="Verified"
                          className="w-4 h-4 md:w-5 md:h-5 shrink-0 object-contain"
                          title="Verified Broker"
                        />
                      </div>

                      {/* Pill on the right side of the card name */}
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 sm:py-1 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white text-[10px] sm:text-[11px] font-black shadow-xs tracking-tight shrink-0">
                        <span>🔥 {t('brokers.trendingBroker')}</span>
                      </span>
                    </div>

                    <p className="text-[11px] md:text-xs text-slate-500 font-semibold flex items-center justify-start md:justify-center gap-1">
                      <Building className="w-3 h-3 md:w-3.5 md:h-3.5 text-slate-400 shrink-0" />
                      <span>{broker.agencyName}</span>
                    </p>
                  </div>

                  {/* Rating & Deals Pill */}
                  <div className="inline-flex items-center gap-1 md:gap-2 px-2 py-0.5 md:px-3 md:py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-[10px] md:text-xs font-black shadow-2xs">
                    <div className="flex items-center gap-0.5">
                      <Star className="w-3 h-3 md:w-3.5 md:h-3.5 fill-amber-400 text-amber-400" />
                      <span>{broker.rating}</span>
                    </div>
                    <span className="text-amber-400 font-normal">•</span>
                    <span className="text-slate-600 font-bold">{broker.dealsCount} {t('brokers.deals')}</span>
                    <span className="text-amber-500 font-normal">•</span>
                    <span className="text-emerald-700 font-black">{t('brokers.topRated')}</span>
                  </div>
                </div>
              </div>

              {/* Quick WhatsApp button on desktop sidebar only */}
              <div className="hidden md:block w-full pt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const msg = `Hi ${broker.name}! I found your profile on Flatzy (${broker.agencyName}). Can you assist with flats in ${broker.primaryLocation}?`;
                    window.open(getWhatsAppUrl(msg), '_blank');
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs shadow-xs hover:shadow-soft transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>{t('brokers.chatWhatsApp')}</span>
                </button>
              </div>

            </div>

            {/* Right Column (Desktop Details, Metrics & Actions) */}
            <div className="flex-1 px-3 pb-3 pt-1 sm:px-5 sm:pb-5 sm:pt-2 md:p-8 flex flex-col justify-between space-y-2.5 md:space-y-6">
              
              <div className="space-y-2 md:space-y-5">
                {/* Desktop-only Status Row */}
                <div className="hidden md:flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-slate-100">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{t('brokers.activeOnGround')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[11px] font-black shadow-xs">
                      🔥 {t('brokers.trendingBroker')}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-bold">
                      🏆 {t('brokers.bestRated')} (4.9)
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                      <span>⚡ &lt;15 mins</span>
                    </span>
                  </div>
                </div>

                {/* 3-Stat Quick Metrics Bar */}
                <div className="grid grid-cols-3 gap-1 md:gap-2 p-1.5 sm:p-2.5 md:p-4 rounded-xl md:rounded-2xl bg-slate-50 border border-slate-200/70 text-center">
                  <div className="p-0.5 sm:p-1 md:p-1.5">
                    <div className="text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-slate-400">{t('brokers.territory')}</div>
                    <div className="text-xs md:text-sm font-black text-slate-800 truncate mt-0.5">Kolkata</div>
                  </div>
                  <div className="p-0.5 sm:p-1 md:p-1.5 border-x border-slate-200/80">
                    <div className="text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-slate-400">{t('brokers.experience')}</div>
                    <div className="text-xs md:text-sm font-black text-slate-800 truncate mt-0.5">{broker.yearsExperience} {t('brokers.years')}</div>
                  </div>
                  <div className="p-0.5 sm:p-1 md:p-1.5">
                    <div className="text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-slate-400">{t('brokers.availableFlats')}</div>
                    <div className="text-xs md:text-sm font-black text-emerald-600 truncate mt-0.5">{broker.activeListingsCount || 18}</div>
                  </div>
                </div>

                {/* Key Coverage Areas */}
                <div className="space-y-1 md:space-y-2">
                  <div className="text-[9px] sm:text-[10px] md:text-[11px] uppercase font-bold text-slate-400 tracking-wider flex items-center justify-between">
                    <span>{t('brokers.coverageHubs')}</span>
                    <span className="text-[9px] sm:text-[10px] md:text-[11px] text-slate-400 lowercase font-medium">Kolkata</span>
                  </div>
                  <div className="flex flex-wrap gap-1 md:gap-2">
                    {broker.operatingAreas.slice(0, 3).map((area, i) => (
                      <span 
                        key={i} 
                        className="px-2 py-0.5 md:px-3 md:py-1.5 rounded-lg md:rounded-xl bg-slate-100/90 text-slate-800 text-[10px] sm:text-[11px] md:text-xs font-semibold border border-slate-200/60 shadow-2xs hover:border-slate-300 transition-colors"
                      >
                        📍 {area.split('(')[0].trim()}
                      </span>
                    ))}
                    {broker.operatingAreas.length > 3 && (
                      <span className="md:hidden text-[10px] text-slate-400 font-semibold self-center">
                        +{broker.operatingAreas.length - 3} more
                      </span>
                    )}
                    {broker.operatingAreas.slice(3).map((area, i) => (
                      <span 
                        key={i + 3} 
                        className="hidden md:inline-flex px-3 py-1.5 rounded-xl bg-slate-100/90 text-slate-800 text-xs font-semibold border border-slate-200/60 shadow-2xs hover:border-slate-300 transition-colors"
                      >
                        📍 {area.split('(')[0].trim()}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Action Buttons Row (Side-by-side on mobile, spacious on desktop) */}
              <div className="pt-2 md:pt-4 border-t border-slate-100 flex flex-row items-center gap-2 md:gap-3">
                <button
                  onClick={() => handleOpenBroker(broker)}
                  className="flex-1 py-2 sm:py-2.5 md:py-3.5 px-3 md:px-5 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white font-bold text-xs md:text-sm shadow-soft hover:shadow-soft-lg transition-all flex items-center justify-center gap-1.5 md:gap-2 group-hover:bg-slate-950 cursor-pointer"
                >
                  <span>{t('brokers.viewProfile')}</span>
                  <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-flatzy-yellow group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const msg = `Hi ${broker.name}! I found your profile on Flatzy (${broker.agencyName}). Can you assist with flats in ${broker.primaryLocation}?`;
                    window.open(getWhatsAppUrl(msg), '_blank');
                  }}
                  className="py-2 sm:py-2.5 md:py-3.5 px-3 sm:px-4 md:px-5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs md:text-sm shadow-soft hover:shadow-soft-lg transition-all flex items-center justify-center gap-1.5 md:gap-2 active:scale-95 shrink-0"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span>WhatsApp</span>
                </button>
              </div>

            </div>

          </div>
        ))}
      </div>

      {/* Bottom Partner Callout */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-soft text-center space-y-4 max-w-3xl mx-auto">
        <div className="w-12 h-12 rounded-2xl bg-flatzy-yellow/20 text-flatzy-navy mx-auto flex items-center justify-center">
          <Briefcase className="w-6 h-6 text-flatzy-navy" />
        </div>
        <div className="space-y-1.5">
          <h2 className="text-xl sm:text-2xl font-black text-flatzy-navy font-poppins">
            {t('brokers.partnerTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
            Get listed on Kolkata’s fastest growing rental discovery platform. Reach pre-verified tech professionals and families with zero upfront fees.
          </p>
        </div>
        <button
          onClick={() => {
            const msg = 'Hi I want to be a part of flatzy broker';
            const url = getWhatsAppUrl(msg);
            try {
              window.open(url, '_blank', 'noopener,noreferrer');
            } catch {
              window.location.href = url;
            }
          }}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black text-xs uppercase tracking-wider shadow-soft hover:shadow-soft-lg transition-all active:scale-95"
        >
          <WhatsAppIcon className="w-4 h-4" />
          <span>+ Onboard as Broker</span>
        </button>
      </div>

    </div>
  );
};
