import React from 'react';
import { FlatzyLogo } from './FlatzyLogo';
import { 
  Instagram, 
  MessageSquare, 
  Mail, 
  MapPin, 
  ArrowUpRight, 
  Heart, 
  Sparkles,
  ArrowRight,
  Compass
} from 'lucide-react';
import type { LocationName } from '../types/property';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onNavigate: (tab: string, extra?: any) => void;
  onSelectLocation: (loc: LocationName) => void;
  onOpenInquiryModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onNavigate, 
  onSelectLocation,
  onOpenInquiryModal 
}) => {
  const { t } = useLanguage();

  const hubs: { name: LocationName; desc: string }[] = [
    { name: 'New Town', desc: 'AA 1, 2, 3 High-Rises' },
    { name: 'Sector V', desc: 'Tech Hub & IT Offices' },
    { name: 'Salt Lake', desc: 'Quiet Green Blocks' },
    { name: 'Shapoorji', desc: 'Student & Budget Hub' },
    { name: 'Rajarhat', desc: 'Airport Corridor' },
  ];

  return (
    <footer className="relative bg-[#0B132B] text-white pt-12 pb-10 border-t border-slate-800/80 overflow-hidden">
      
      {/* Ambient background glow & subtle city backdrop */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-64 bg-gradient-to-b from-flatzy-yellow/5 via-transparent to-transparent pointer-events-none -z-10" />
      <div 
        className="absolute bottom-0 left-0 right-0 h-48 bg-cover bg-bottom opacity-5 pointer-events-none -z-10"
        style={{ backgroundImage: "url('/city-bg.png')" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* ========================================================================= */}
        {/* MAIN 4-COLUMN FOOTER CONTENT */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-10 border-b border-slate-800/70">
          
          {/* Col 1: Brand & Social Channels (lg: 4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <FlatzyLogo variant="dark" onClick={() => onNavigate('home')} size="lg" />
            
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-sm">
              {t('footer.desc')}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <a
                href="https://instagram.com/flatzykolkata"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-900/40 to-pink-900/40 hover:from-purple-900/60 hover:to-pink-900/60 border border-pink-500/30 text-pink-300 text-xs font-semibold shadow-xs hover:scale-105 transition-all"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-400" />
                <span>@flatzykolkata</span>
                <ArrowUpRight className="w-3 h-3 text-pink-400" />
              </a>

              <a
                href="https://wa.me/919830000000?text=Hi%20Flatzy!%20I%20am%20looking%20for%20a%20rental%20flat%20in%20Kolkata"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold shadow-xs hover:scale-105 transition-all"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp Flatzy</span>
              </a>
            </div>

            <div className="pt-1 text-xs text-slate-400 space-y-1.5">
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-flatzy-yellow" />
                <a href="mailto:hello@flatzykolkata.com" className="hover:text-white transition-colors">
                  hello@flatzykolkata.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-flatzy-yellow" />
                <span>Salt Lake & New Town, Kolkata 700156</span>
              </p>
            </div>
          </div>

          {/* Col 2: Quick Links (lg: 2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs uppercase tracking-wider font-extrabold text-flatzy-yellow">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li>
                <button 
                  onClick={() => onNavigate('explore')} 
                  className="hover:text-flatzy-yellow transition-colors flex items-center gap-1.5 group"
                >
                  <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-flatzy-yellow group-hover:translate-x-0.5 transition-all" />
                  <span>{t('nav.explore')}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('locations')} 
                  className="hover:text-flatzy-yellow transition-colors flex items-center gap-1.5 group"
                >
                  <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-flatzy-yellow group-hover:translate-x-0.5 transition-all" />
                  <span>{t('nav.locations')}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('reels')} 
                  className="hover:text-flatzy-yellow transition-colors flex items-center gap-1.5 group"
                >
                  <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-flatzy-yellow group-hover:translate-x-0.5 transition-all" />
                  <span>{t('nav.reels')}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('how-it-works')} 
                  className="hover:text-flatzy-yellow transition-colors flex items-center gap-1.5 group"
                >
                  <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-flatzy-yellow group-hover:translate-x-0.5 transition-all" />
                  <span>{t('nav.howItWorks')}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('about')} 
                  className="hover:text-flatzy-yellow transition-colors flex items-center gap-1.5 group"
                >
                  <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-flatzy-yellow group-hover:translate-x-0.5 transition-all" />
                  <span>{t('nav.about')}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('contact')} 
                  className="hover:text-flatzy-yellow transition-colors flex items-center gap-1.5 group"
                >
                  <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-flatzy-yellow group-hover:translate-x-0.5 transition-all" />
                  <span>{t('nav.contact')}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Hubs (lg: 3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs uppercase tracking-wider font-extrabold text-flatzy-yellow">
              {t('footer.topHubs')}
            </h4>
            <div className="space-y-2">
              {hubs.map((hub) => (
                <button
                  key={hub.name}
                  onClick={() => {
                    onSelectLocation(hub.name);
                    onNavigate('explore');
                  }}
                  className="w-full flex items-center justify-between p-2 rounded-xl bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800/80 text-left transition-all group"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-200 group-hover:text-flatzy-yellow transition-colors">
                      {hub.name}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {hub.desc}
                    </div>
                  </div>
                  <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-flatzy-yellow group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>
          </div>

          {/* Col 4: Custom Search / Help Card (lg: 3 cols) */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl p-5 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800/90 shadow-xl space-y-3">
              <div className="flex items-center gap-2 text-flatzy-yellow">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-bold tracking-wide uppercase">
                  {t('footer.needHelp')}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {t('footer.helpDesc')}
              </p>

              <button
                onClick={() => onOpenInquiryModal ? onOpenInquiryModal() : onNavigate('contact')}
                className="w-full py-2.5 px-4 rounded-xl bg-flatzy-yellow hover:bg-flatzy-yellowDark text-flatzy-navy font-extrabold text-xs tracking-wide shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 group"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>{t('footer.inquireBtn')}</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <p className="text-[10px] text-slate-400 text-center">
                100% Free for Renters • Zero Spam
              </p>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* BOTTOM COPYRIGHT & LEGAL BAR */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © 2026 <span className="text-white font-semibold">Flatzy Kolkata</span>. {t('footer.rights')}
          </p>

          <p className="flex items-center gap-1.5 text-slate-400 text-center sm:text-right">
            <span>{t('footer.crafted')}</span>
            <Heart className="w-3.5 h-3.5 text-flatzy-coral fill-flatzy-coral inline-block" />
          </p>
        </div>

      </div>
    </footer>
  );
};
