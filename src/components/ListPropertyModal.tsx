import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Home, 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Camera,
  Users
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { getWhatsAppUrl } from '../config/contact';
import { WhatsAppIcon } from './WhatsAppIcon';

interface ListPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ListPropertyModal: React.FC<ListPropertyModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [bhk, setBhk] = useState<string>('2 BHK');
  const [listingFor, setListingFor] = useState<'Rent' | 'Sale' | 'Both'>('Rent');
  const [locationName, setLocationName] = useState<string>('New Town');
  const [societyName, setSocietyName] = useState<string>('');
  const [expectedPrice, setExpectedPrice] = useState<string>('');

  if (!isOpen) return null;

  const handleShareOnWhatsApp = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#25D366', '#128C7E', '#FFC800', '#FF5722']
      });
    } catch (e) {}

    let priceText = expectedPrice 
      ? `• Expected ${listingFor}: ₹${expectedPrice}\n` 
      : `• Expected ${listingFor}: Negotiable\n`;

    const msg = 
      `*NEW PROPERTY LISTING — ONBOARD VIA WHATSAPP*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `• *For:* ${listingFor}\n` +
      `• *Type:* ${bhk}\n` +
      `• *Location:* ${locationName}\n` +
      (societyName ? `• *Society/Complex:* ${societyName}\n` : '') +
      priceText +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `Hi Flatzy team! I want to list my flat on Flatzy Kolkata. I am forwarding flat photos and details here for onboarding.`;

    window.open(getWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-gradient-to-r from-flatzy-navy via-slate-900 to-emerald-950 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-flatzy-yellow" />
            <span>Fast Landlord & Broker Onboarding</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black font-poppins text-white leading-tight">
            List Your Flat on Flatzy
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Share details on WhatsApp • Fast verification & verified tenant reach
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          
          {/* Highlight Card: WhatsApp Onboarding */}
          <div className="p-4 rounded-2xl bg-emerald-50/80 border-2 border-emerald-300/80 space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm">
                <WhatsAppIcon className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-black text-emerald-950 font-poppins">
                Share Details & Onboard via WhatsApp
              </h3>
            </div>

            <p className="text-xs text-emerald-900 leading-relaxed font-medium">
              No need to fill endless forms! Forward your flat photos, society name, and expected price directly to our WhatsApp team. We review, curate, and feature your flat within hours.
            </p>
          </div>

          {/* Quick Optional Details Grid */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-700 uppercase tracking-wider">
                Quick Flat Summary (Optional)
              </span>
              <span className="text-[10px] text-slate-400 font-semibold">Pre-fills WhatsApp message</span>
            </div>

            {/* Listing For Tabs */}
            <div className="grid grid-cols-3 gap-2">
              {(['Rent', 'Sale', 'Both'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setListingFor(tab)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                    listingFor === tab
                      ? 'bg-flatzy-navy text-white border-flatzy-navy shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {tab === 'Both' ? 'Rent & Sale' : `For ${tab}`}
                </button>
              ))}
            </div>

            {/* BHK & Location Row */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Configuration
                </label>
                <select
                  value={bhk}
                  onChange={(e) => setBhk(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-flatzy-yellow cursor-pointer"
                >
                  <option value="1 RK / Studio">1 RK / Studio</option>
                  <option value="1 BHK">1 BHK</option>
                  <option value="2 BHK">2 BHK</option>
                  <option value="3 BHK">3 BHK</option>
                  <option value="4+ BHK">4+ BHK / Penthouse</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Location / Zone
                </label>
                <select
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-flatzy-yellow cursor-pointer"
                >
                  <option value="New Town">New Town</option>
                  <option value="Shapoorji">Shapoorji</option>
                  <option value="Rajarhat">Rajarhat</option>
                  <option value="Sector V">Sector V</option>
                  <option value="Salt Lake">Salt Lake</option>
                  <option value="Kolkata (Other)">Kolkata (Other)</option>
                </select>
              </div>
            </div>

            {/* Society Name & Price Row */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Society / Complex
                </label>
                <input
                  type="text"
                  value={societyName}
                  onChange={(e) => setSocietyName(e.target.value)}
                  placeholder="e.g. PS One 10 / Sukhobrishti"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-flatzy-yellow"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Expected Price
                </label>
                <input
                  type="text"
                  value={expectedPrice}
                  onChange={(e) => setExpectedPrice(e.target.value)}
                  placeholder={listingFor === 'Sale' ? 'e.g. 85 Lacs / 1.4 Cr' : 'e.g. 21,000 / 55,000'}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-flatzy-yellow"
                />
              </div>
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="pt-2">
            <button
              onClick={handleShareOnWhatsApp}
              className="w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black text-sm uppercase tracking-wider shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center justify-center gap-2.5 active:scale-98 group"
            >
              <WhatsAppIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Share Details on WhatsApp • Onboard</span>
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
            <div className="p-2 rounded-xl bg-slate-50">
              <ShieldCheck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
              <div className="text-[10px] font-bold text-slate-700">100% Free</div>
              <div className="text-[9px] text-slate-400">Zero listing fee</div>
            </div>

            <div className="p-2 rounded-xl bg-slate-50">
              <Users className="w-4 h-4 text-flatzy-navy mx-auto mb-1" />
              <div className="text-[10px] font-bold text-slate-700">Verified Tenants</div>
              <div className="text-[9px] text-slate-400">IT professionals</div>
            </div>

            <div className="p-2 rounded-xl bg-slate-50">
              <Camera className="w-4 h-4 text-amber-500 mx-auto mb-1" />
              <div className="text-[10px] font-bold text-slate-700">Forward Photos</div>
              <div className="text-[9px] text-slate-400">Direct on chat</div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1 font-semibold text-emerald-700">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Official Flatzy Onboarding Helpline
          </span>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 font-bold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
