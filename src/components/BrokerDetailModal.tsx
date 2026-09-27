import React from 'react';
import { 
  X, 
  Star, 
  MapPin, 
  ShieldCheck, 
  Building, 
  Award, 
  Clock, 
  CheckCircle2, 
  Briefcase,
  Quote
} from 'lucide-react';
import type { Broker } from '../data/brokersData';
import { getWhatsAppUrl } from '../config/contact';
import { WhatsAppIcon } from './WhatsAppIcon';

interface BrokerDetailModalProps {
  broker: Broker | null;
  onClose: () => void;
}

export const BrokerDetailModal: React.FC<BrokerDetailModalProps> = ({ broker, onClose }) => {
  if (!broker) return null;

  const handleWhatsApp = () => {
    const msg = `Hi ${broker.name}! I found your profile on Flatzy Kolkata (${broker.agencyName}). I am looking for a flat in ${broker.primaryLocation}. Can you share available options?`;
    window.open(getWhatsAppUrl(msg, broker.whatsapp), '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-6 animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header Card with Pattern and Prominent Photo */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-6 sm:p-8 shrink-0">
          {/* Subtle Architectural Pattern & Ambient Glows */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-60" />
          <div className="absolute -top-16 -left-16 w-56 h-56 bg-flatzy-yellow/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-all shadow-md active:scale-95"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-center gap-6 text-center sm:text-left">
            {/* Prominent Profile Picture Filling Vertical Space */}
            <div className="relative shrink-0">
              <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-3xl overflow-hidden ring-4 ring-white/25 shadow-2xl bg-slate-800">
                <img
                  src={broker.avatar}
                  alt={broker.name}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 p-2 rounded-full bg-emerald-500 text-white ring-4 ring-slate-900 shadow-soft" title="Flatzy Verified Partner">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>

            <div className="space-y-2.5 flex-1 min-w-0">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-flatzy-yellow/20 text-flatzy-yellow text-xs font-bold border border-flatzy-yellow/30">
                <ShieldCheck className="w-3.5 h-3.5 text-flatzy-yellow" />
                <span>Verified Broker</span>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h2 className="text-2xl sm:text-3xl font-black text-white font-poppins">
                  {broker.name}
                </h2>
                <img
                  src="/verified-badge.png"
                  alt="Verified"
                  className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 object-contain"
                  title="Verified Broker"
                />
              </div>
              
              <div className="text-xs sm:text-sm text-slate-300 font-semibold flex items-center justify-center sm:justify-start gap-1.5">
                <Building className="w-4 h-4 text-flatzy-coral" />
                <span>{broker.agencyName}</span>
              </div>

              {/* Quick Stats Pill Row */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 text-xs">
                <span className="px-2.5 py-1 rounded-xl bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                  <span>{broker.rating} Rating</span>
                </span>

                <span className="px-2.5 py-1 rounded-xl bg-white/10 text-slate-200 font-semibold border border-white/10">
                  {broker.dealsCount}+ Deals Closed
                </span>

                <span className="px-2.5 py-1 rounded-xl bg-white/10 text-slate-200 font-semibold border border-white/10">
                  {broker.yearsExperience}+ Yrs Experience
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1 font-sans text-xs sm:text-sm">
          
          {/* Direct WhatsApp Connect Action (No phone or copy) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-0.5 text-center sm:text-left">
              <div className="text-sm font-black text-slate-900 flex items-center justify-center sm:justify-start gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Instant Direct Line Available</span>
              </div>
              <p className="text-xs text-slate-600">
                Chat directly with {broker.name} for flat availability, instant video walkthroughs, and visit scheduling.
              </p>
            </div>

            <button
              onClick={handleWhatsApp}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs sm:text-sm font-black uppercase tracking-wider shadow-soft hover:shadow-soft-lg transition-all flex items-center justify-center gap-2 active:scale-95 shrink-0"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Connect in WhatsApp</span>
            </button>
          </div>

          {/* About Bio */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              About the Advisor
            </h3>
            <p className="text-slate-600 leading-relaxed font-normal">
              {broker.about}
            </p>
          </div>

          {/* Operating Locations */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-flatzy-coral" />
              <span>Primary Operating Areas in Kolkata</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {broker.operatingAreas.map((area, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200/80"
                >
                  📍 {area}
                </span>
              ))}
            </div>
          </div>

          {/* Specialization Tags */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5 text-indigo-500" />
              <span>Rental Specializations</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {broker.specialization.map((spec, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200"
                >
                  ✓ {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Verified Tenant Reviews & Feedback */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-900 font-poppins flex items-center gap-1.5">
                <span>Verified Tenant Feedback</span>
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  {broker.reviews.length} Reviews
                </span>
              </h3>
              <div className="flex items-center gap-1 text-xs font-bold text-amber-600">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{broker.rating} out of 5.0</span>
              </div>
            </div>

            <div className="space-y-3">
              {broker.reviews.map((rev) => (
                <div 
                  key={rev.id} 
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-bold text-slate-900 text-xs sm:text-sm">
                        {rev.author}
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium">
                        {rev.role} • <span className="text-emerald-700 font-semibold">{rev.flatRented}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5 text-amber-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3.5 h-3.5 ${i < Math.floor(rev.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} 
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 italic leading-relaxed">
                    "{rev.comment}"
                  </p>

                  <div className="text-[10px] text-slate-400 text-right">
                    {rev.date}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500 hidden sm:block">
            Verified Flatzy Partner • Zero Advance Fee Guarantee
          </div>
          <button
            onClick={handleWhatsApp}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black text-xs uppercase tracking-wider shadow-soft transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>Connect in WhatsApp with {broker.name.split(' ')[0]}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
