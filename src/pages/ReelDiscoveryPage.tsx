import React from 'react';
import type { Property } from '../types/property';
import { ReelGallerySection } from '../components/ReelGallerySection';
import { 
  Sparkles, 
  MessageSquare, 
  Compass, 
  ShieldCheck, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';
import { getWhatsAppUrl } from '../config/contact';
import { useLanguage } from '../context/LanguageContext';

interface ReelDiscoveryPageProps {
  onSelectProperty: (property: Property) => void;
  onOpenInquiryModal: (property?: Property) => void;
  onNavigate: (tab: string) => void;
}

export const ReelDiscoveryPage: React.FC<ReelDiscoveryPageProps> = ({
  onSelectProperty,
  onOpenInquiryModal,
  onNavigate,
}) => {
  const { t } = useLanguage();

  return (
    <div className="relative overflow-hidden">
      {/* Scenic Cityscape Background Image */}
      <div 
        className="absolute top-0 left-0 right-0 h-[650px] sm:h-[800px] bg-top bg-cover bg-no-repeat pointer-events-none opacity-30 sm:opacity-40"
        style={{ backgroundImage: "url('/city-bg.png')" }}
      />
      <div className="absolute top-0 left-0 right-0 h-[650px] sm:h-[800px] bg-gradient-to-b from-white/20 via-transparent to-[#FAF9F6] pointer-events-none" />

      <div className="relative z-10 space-y-8 pb-16 animate-in fade-in duration-300">
        
        {/* Main Flat Video Tour & Reel Gallery */}
        <ReelGallerySection
          onSelectProperty={onSelectProperty}
          onOpenInquiryModal={onOpenInquiryModal}
        />

        {/* Value Pillars: Why Video Tours */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-br from-white via-amber-50/25 to-slate-50 p-6 sm:p-10 border border-slate-200 shadow-soft overflow-hidden">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Left Column: Benefits */}
              <div className="lg:col-span-7 space-y-5">
                <div className="space-y-2 text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-flatzy-yellow/30 text-flatzy-navy text-xs font-black uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-flatzy-navy" />
                    <span>{t('reels.whyVideo')}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-flatzy-navy font-poppins">
                    {t('reels.tourFromPhone')} <br className="hidden sm:inline" />
                    {t('reels.zeroSurprise')}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {t('reels.whyDesc')}
                  </p>
                </div>

                {/* 3 Value Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                  <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-1.5 hover:border-amber-300 transition-colors">
                    <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-black text-sm mb-2">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div className="font-extrabold text-xs text-flatzy-navy">{t('reels.realFootage')}</div>
                    <p className="text-[11px] text-slate-500 leading-tight">
                      {t('reels.realFootageDesc')}
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-1.5 hover:border-emerald-300 transition-colors">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-sm mb-2">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div className="font-extrabold text-xs text-flatzy-navy">{t('reels.saveTime')}</div>
                    <p className="text-[11px] text-slate-500 leading-tight">
                      {t('reels.saveTimeDesc')}
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-1.5 hover:border-flatzy-yellow transition-colors">
                    <div className="w-8 h-8 rounded-xl bg-flatzy-yellow text-flatzy-navy flex items-center justify-center font-black text-sm mb-2">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div className="font-extrabold text-xs text-flatzy-navy">{t('reels.instantInquiry')}</div>
                    <p className="text-[11px] text-slate-500 leading-tight">
                      {t('reels.instantInquiryDesc')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Direct Help Concierge */}
              <div className="lg:col-span-5 bg-flatzy-navy text-white rounded-3xl p-6 sm:p-7 space-y-4 shadow-soft text-left">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-flatzy-yellow">
                    {t('reels.conciergeBadge')}
                  </span>
                  <h3 className="text-lg font-black font-poppins text-white">
                    {t('reels.customTourTitle')}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {t('reels.customTourDesc')}
                  </p>
                </div>

                <div className="space-y-2.5 pt-1">
                  <a
                    href={getWhatsAppUrl("Hi Flatzy! Can you share or shoot a video tour for a flat in Kolkata?")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{t('reels.whatsappTeam')}</span>
                  </a>

                  <button
                    onClick={() => onNavigate('explore')}
                    className="w-full py-2.5 px-4 rounded-2xl bg-white/10 hover:bg-white/20 text-slate-200 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Compass className="w-3.5 h-3.5 text-flatzy-yellow" />
                    <span>{t('reels.browseAll')}</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
