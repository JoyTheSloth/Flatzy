import React, { useState } from 'react';
import type { Property, TenantType, InquiryFormData } from '../types/property';
import { 
  X, 
  Sparkles, 
  Send, 
  MessageSquare, 
  Phone, 
  Calendar, 
  User, 
  Mail, 
  CheckCircle2, 
  Building2, 
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProperty?: Property | null;
  onSuccessExploreMore: () => void;
  defaultReelUrl?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  selectedProperty,
  onSuccessExploreMore,
  defaultReelUrl = '',
}) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    propertyId: selectedProperty?.id || '',
    propertyTitle: selectedProperty?.title || '',
    fullName: '',
    phone: '',
    email: '',
    preferredMoveInDate: 'Within 7 Days',
    tenantType: 'Bachelor',
    preferredLocation: selectedProperty?.location || 'New Town',
    message: '',
    sourceReelUrl: defaultReelUrl,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate instant backend submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FFC800', '#FF5722', '#0B132B', '#10B981']
        });
      } catch (err) {
        // Safe fallback if canvas not available
      }
    }, 600);
  };

  const handleWhatsAppDirect = () => {
    const text = selectedProperty 
      ? `Hi Flatzy team! I am interested in flat: ${selectedProperty.title} (${selectedProperty.brokerReferenceId}) in ${selectedProperty.location}. My name is ${formData.fullName || 'a renter'}. Please connect me with the broker.`
      : `Hi Flatzy! I am looking for a rental flat in Kolkata. My name is ${formData.fullName || 'a renter'}. Can you help connect me?`;
    window.open(`https://wa.me/919830000000?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-slate-200 my-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* State 1: Submitted Success State */}
        {isSubmitted ? (
          <div className="p-6 sm:p-10 text-center space-y-6">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center text-4xl shadow-soft">
              🏠
            </div>

            <div className="space-y-2">
              <span className="inline-block px-3 py-1 rounded-full bg-flatzy-yellow text-flatzy-navy text-xs font-black uppercase tracking-wider">
                Inquiry Dispatched
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-flatzy-navy font-poppins">
                You're one step closer. 🏠
              </h2>
              <p className="text-slate-600 text-sm max-w-sm mx-auto leading-relaxed pt-1">
                We've received your inquiry. Our team will connect your details with the relevant broker and notify you immediately via WhatsApp/call.
              </p>
            </div>

            {selectedProperty && (
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-left space-y-1">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Target Property
                </div>
                <div className="font-bold text-slate-900 text-sm truncate">
                  {selectedProperty.title}
                </div>
                <div className="text-xs text-slate-600">
                  {selectedProperty.subLocation} • ₹{selectedProperty.monthlyRent.toLocaleString('en-IN')}/mo
                </div>
              </div>
            )}

            <div className="space-y-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  onSuccessExploreMore();
                }}
                className="w-full py-3.5 rounded-full bg-flatzy-yellow hover:bg-flatzy-yellowDark text-flatzy-navy font-black text-sm shadow-soft hover:shadow-yellow-glow transition-all"
              >
                Explore More Flats
              </button>

              <button
                onClick={handleWhatsAppDirect}
                className="w-full py-3 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs border border-emerald-200 transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Want instant response? Ping Flatzy on WhatsApp</span>
              </button>
            </div>
          </div>
        ) : (
          /* State 2: Inquiry Form */
          <div>
            {/* Modal Header */}
            <div className="bg-slate-50 p-6 border-b border-slate-100">
              <h2 className="text-xl sm:text-2xl font-black text-flatzy-navy font-poppins">
                {selectedProperty ? 'Interested in this flat?' : 'Tell us what you want.'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Tell us a little about yourself and we'll connect you with the relevant broker.
              </p>

              {/* Selected Property preview if present */}
              {selectedProperty && (
                <div className="mt-3.5 p-3 rounded-2xl bg-white border border-slate-200/80 flex items-center gap-3">
                  <img
                    src={selectedProperty.featuredImage}
                    alt={selectedProperty.title}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {selectedProperty.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 truncate">
                      {selectedProperty.subLocation} • ₹{selectedProperty.monthlyRent.toLocaleString('en-IN')}/mo
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              
              {/* Name and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                    Full Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Anirban Mukherjee"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-flatzy-yellow font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                    Phone Number (WhatsApp) *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="98300 12345"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-flatzy-yellow font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Email and Move In Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@email.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-flatzy-yellow font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                    Preferred Move-in Date
                  </label>
                  <select
                    value={formData.preferredMoveInDate}
                    onChange={(e) => setFormData({ ...formData, preferredMoveInDate: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-flatzy-yellow font-medium cursor-pointer"
                  >
                    <option value="Immediate">Immediate (Within 48h)</option>
                    <option value="Within 7 Days">Within 7 Days</option>
                    <option value="Within 15 Days">Within 15 Days</option>
                    <option value="Next Month">Next Month</option>
                  </select>
                </div>
              </div>

              {/* Tenant Type */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                  I am a...
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                  {(['Student', 'Bachelor', 'Working Professionals', 'Couple', 'Family'] as TenantType[]).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, tenantType: type })}
                      className={`py-2 px-1 rounded-xl text-[11px] font-bold text-center border transition-all truncate ${
                        formData.tenantType === type
                          ? 'bg-flatzy-yellow text-flatzy-navy border-flatzy-yellowDark shadow-sm'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {type.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                  Message / Special requirements (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Need near Sector V bus route, bachelor friendly, pet friendly..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-flatzy-yellow font-medium"
                />
              </div>

              {/* Notice */}
              <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero spam guarantee. We only connect you with the broker managing this flat.</span>
              </div>

              {/* Actions */}
              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-full bg-flatzy-yellow hover:bg-flatzy-yellowDark text-flatzy-navy font-black text-sm tracking-wide shadow-soft hover:shadow-yellow-glow transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Sending your inquiry...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Inquiry</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 pt-1">
                  <span className="text-xs text-slate-400">or</span>
                  <button
                    type="button"
                    onClick={handleWhatsAppDirect}
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Talk on WhatsApp instead</span>
                  </button>
                </div>
              </div>

            </form>
          </div>
        )}
      </div>
    </div>
  );
};
