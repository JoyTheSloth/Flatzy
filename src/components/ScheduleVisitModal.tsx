import React, { useState, useEffect } from 'react';
import { 
  X, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Calendar,
  Building,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { Property } from '../types/property';
import { PROPERTIES_DATA } from '../data/properties';
import { getWhatsAppUrl } from '../config/contact';
import { WhatsAppIcon } from './WhatsAppIcon';

interface ScheduleVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetProperty?: Property | null;
}

export const ScheduleVisitModal: React.FC<ScheduleVisitModalProps> = ({
  isOpen,
  onClose,
  targetProperty,
}) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    targetProperty || PROPERTIES_DATA[0]
  );

  useEffect(() => {
    if (targetProperty) {
      setSelectedProperty(targetProperty);
    } else if (!selectedProperty && PROPERTIES_DATA.length > 0) {
      setSelectedProperty(PROPERTIES_DATA[0]);
    }
  }, [targetProperty]);

  if (!isOpen) return null;

  const currentProperty = selectedProperty || PROPERTIES_DATA[0];

  const handleSendHiWhatsApp = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#25D366', '#128C7E', '#FFC800', '#FF5722']
      });
    } catch (e) {}

    const text = `Hi Flatzy! I would like to schedule a visit for ${currentProperty?.title || 'the flat'} (${currentProperty?.brokerReferenceId || ''}) at ${currentProperty?.subLocation || ''}. Please book my schedule accordingly.`;
    window.open(getWhatsAppUrl(text), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-flatzy-navy via-slate-900 to-emerald-950 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Calendar className="w-4 h-4" />
            <span>Instant Site Visit Booking</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black font-poppins text-white leading-tight">
            Schedule a Flat Visit
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Zero form filling • Fast on-ground coordination on WhatsApp
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          
          {/* Selected Property Card */}
          {currentProperty && (
            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
              <img
                src={currentProperty.featuredImage || currentProperty.images[0]}
                alt={currentProperty.title}
                className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200"
              />
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 inline-block mb-1">
                  Ref: {currentProperty.brokerReferenceId}
                </span>
                <h4 className="text-xs font-black text-slate-900 truncate">
                  {currentProperty.title}
                </h4>
                <div className="flex items-center gap-1 text-[11px] text-slate-500 truncate mt-0.5">
                  <MapPin className="w-3 h-3 text-flatzy-coral shrink-0" />
                  <span className="truncate">{currentProperty.subLocation}</span>
                </div>
              </div>
            </div>
          )}

          {/* User Instruction Highlight: Send Hi on WhatsApp */}
          <div className="p-4 rounded-2xl bg-emerald-50/80 border-2 border-emerald-300/80 space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm">
                <WhatsAppIcon className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-black text-emerald-950 font-poppins">
                Send "Hi" on WhatsApp & Book Visit
              </h3>
            </div>

            <p className="text-xs text-emerald-900 leading-relaxed font-medium">
              No need to fill out tedious forms! Just tap the button below to message us directly on WhatsApp. Our verified broker will confirm your preferred date and time slot right away.
            </p>

            <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-200 text-[11px] font-mono text-emerald-800 flex items-start gap-2">
              <span className="font-bold text-[#25D366] shrink-0">Preview:</span>
              <span className="italic leading-snug">
                "Hi Flatzy! I would like to schedule a visit for {currentProperty?.title}... Please book my schedule accordingly."
              </span>
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="pt-1">
            <button
              onClick={handleSendHiWhatsApp}
              className="w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black text-sm uppercase tracking-wider shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center justify-center gap-2.5 active:scale-98 group"
            >
              <WhatsAppIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Send "Hi" on WhatsApp & Book Schedule</span>
            </button>
          </div>

          {/* Guarantees / Highlights */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
            <div className="p-2 rounded-xl bg-slate-50">
              <Clock className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
              <div className="text-[10px] font-bold text-slate-700">Instant Reply</div>
              <div className="text-[9px] text-slate-400">Within 5 mins</div>
            </div>

            <div className="p-2 rounded-xl bg-slate-50">
              <Building className="w-4 h-4 text-flatzy-navy mx-auto mb-1" />
              <div className="text-[10px] font-bold text-slate-700">In-Person & Video</div>
              <div className="text-[9px] text-slate-400">Your choice</div>
            </div>

            <div className="p-2 rounded-xl bg-slate-50">
              <ShieldCheck className="w-4 h-4 text-amber-500 mx-auto mb-1" />
              <div className="text-[10px] font-bold text-slate-700">100% Free</div>
              <div className="text-[9px] text-slate-400">Zero visit charges</div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1 font-semibold text-emerald-700">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Verified Flatzy Broker Support
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
