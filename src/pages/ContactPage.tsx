import React, { useState } from 'react';
import { MessageSquare, Instagram, Phone, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';

import { submitLeadToGoogleSheet } from '../services/leadService';
import { getWhatsAppUrl, FLATZY_WHATSAPP_NUMBER } from '../config/contact';

interface ContactPageProps {
  onNavigate: (tab: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: 'New Town',
    budget: '₹15,000 - ₹20,000',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await submitLeadToGoogleSheet({
      fullName: formData.name,
      phone: formData.phone,
      location: formData.location,
      budget: formData.budget,
      tenantCategory: 'Direct Contact Form',
      role: 'Renter',
      source: 'Contact Us Page',
      brokerNote: formData.message,
    });

    setIsSubmitting(false);
    setIsSubmitted(true);

    handleWhatsApp();

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FFC800', '#FF5722', '#0B132B', '#10B981']
      });
    } catch (err) {}
  };

  const handleWhatsApp = () => {
    const text = `🏠 *CONTACT INQUIRY — FLATZY KOLKATA*\n━━━━━━━━━━━━━━━━━━━━━━\n👤 *Name:* ${formData.name || 'Visitor'}\n📱 *Phone:* ${formData.phone || 'N/A'}\n📍 *Location:* ${formData.location}\n💰 *Budget:* ${formData.budget}\n${formData.message ? `📝 *Message:* ${formData.message}\n` : ''}━━━━━━━━━━━━━━━━━━━━━━\nPlease connect me with verified flat options!`;
    window.open(getWhatsAppUrl(text), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative overflow-hidden">
      {/* Scenic Cityscape Background Image */}
      <div 
        className="absolute top-0 left-0 right-0 h-[600px] sm:h-[700px] bg-top bg-cover bg-no-repeat pointer-events-none opacity-35 sm:opacity-45"
        style={{ backgroundImage: "url('/city-bg.png')" }}
      />
      <div className="absolute top-0 left-0 right-0 h-[600px] sm:h-[700px] bg-gradient-to-b from-white/20 via-transparent to-[#FAF9F6] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10 animate-in fade-in duration-300">
        
        {/* Minimal Header */}
        <div className="text-center space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-flatzy-yellowDark">
            {t('contact.badge')}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-flatzy-navy font-poppins">
            {t('contact.title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            {t('contact.subtitle')}
          </p>
        </div>

      {/* Two Quick Action Buttons: WhatsApp & Instagram */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={handleWhatsApp}
          className="flex items-center justify-between p-5 rounded-3xl bg-emerald-50 hover:bg-emerald-100/90 border border-emerald-200 text-left transition-all group shadow-xs"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-xs">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                Instant Chat
              </div>
              <div className="text-base font-black text-slate-900">
                WhatsApp Flatzy
              </div>
              <div className="text-[11px] text-slate-500">
                Fastest response
              </div>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
            Chat →
          </span>
        </button>

        <a
          href="https://instagram.com/flatzykolkata"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-5 rounded-3xl bg-pink-50 hover:bg-pink-100/90 border border-pink-200 text-left transition-all group shadow-xs"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 text-white flex items-center justify-center shadow-xs">
              <Instagram className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-pink-800 uppercase tracking-wider">
                DM Reels
              </div>
              <div className="text-base font-black text-slate-900">
                @flatzykolkata
              </div>
              <div className="text-[11px] text-slate-500">
                Send reels & flat tours
              </div>
            </div>
          </div>
          <span className="text-xs font-bold text-pink-700 group-hover:translate-x-1 transition-transform">
            Open →
          </span>
        </a>
      </div>

      {/* Clean, Minimal 3-Field Requirement Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft">
        {isSubmitted ? (
          <div className="text-center py-8 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="text-4xl">🏠</div>
            <h3 className="text-2xl font-black text-flatzy-navy font-poppins">
              You're one step closer. 🏠
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
              We received your details for <strong>{formData.location}</strong>. Our team will connect you directly with the broker.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('explore')}
                className="px-6 py-2.5 rounded-full bg-flatzy-yellow text-flatzy-navy font-bold text-xs uppercase tracking-wider shadow-sm"
              >
                Browse More Flats
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-left pb-2">
              <h3 className="text-lg font-black text-flatzy-navy font-poppins">
                Tell us what you're looking for
              </h3>
              <p className="text-xs text-slate-500">
                Drop your basics and we'll route you to the right broker.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Joydeep"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-flatzy-yellow font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                  Phone (WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="98300 12345"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-flatzy-yellow font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                  Location
                </label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-flatzy-yellow font-medium cursor-pointer"
                >
                  <option value="New Town">New Town</option>
                  <option value="Shapoorji">Shapoorji</option>
                  <option value="Rajarhat">Rajarhat</option>
                  <option value="Salt Lake">Salt Lake</option>
                  <option value="Sector V">Sector V</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                  Budget
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-flatzy-yellow font-medium cursor-pointer"
                >
                  <option value="Under ₹10,000">Under ₹10,000</option>
                  <option value="₹10,000 - ₹15,000">₹10,000 – ₹15,000</option>
                  <option value="₹15,000 - ₹20,000">₹15,000 – ₹20,000</option>
                  <option value="₹20,000 - ₹30,000">₹20,000 – ₹30,000</option>
                  <option value="₹30,000+">₹30,000+</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-full bg-flatzy-yellow hover:bg-flatzy-yellowDark text-flatzy-navy font-black text-xs uppercase tracking-wider shadow-soft transition-all"
            >
              {isSubmitting ? 'Connecting...' : t('contact.submitBtn')}
            </button>
          </form>
        )}
      </div>

      </div>
    </div>
  );
};
