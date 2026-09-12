import React, { useState } from 'react';
import { 
  X, 
  ArrowLeft, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Sparkles, 
  Building2, 
  User, 
  Phone, 
  MapPin, 
  Home, 
  Briefcase,
  Layers,
  ChevronRight,
  Calendar,
  Users,
  Coins,
  FileText,
  Tag
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';
import type { Property, LocationName, BudgetRange } from '../types/property';
import { submitLeadToGoogleSheet } from '../services/leadService';
import { FLATZY_WHATSAPP_NUMBER, getWhatsAppUrl } from '../config/contact';

export type RoleModalView = 'selection' | 'broker' | 'buyer' | 'success';

export interface BuyerRequirementData {
  fullName: string;
  phone: string;
  companyName: string;
  lookingForBhk: string;
  budget: string;
  location: string;
  shiftingDate: string;
  tenantCategory: 'Family' | 'Bachelor';
}

export interface BrokerRequirementData {
  fullName: string;
  phone: string;
  brokerType: 'Owner' | 'Broker';
  agencyName: string;
  operatingAreas: string[];
  propertyTypes: string[];
  notes: string;
}

interface RoleSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetProperty?: Property | null;
  onApplyFilters?: (location?: LocationName, budget?: BudgetRange) => void;
}

const KOLKATA_AREAS = [
  'New Town',
  'Rajarhat',
  'Salt Lake',
  'Sector V',
  'Shapoorji',
  'South Kolkata',
  'Other Kolkata Area'
];

const PROPERTY_TYPES = ['1 BHK', '2 BHK', '3 BHK', '4+ BHK', 'Studio / 1 RK', 'Commercial / Office'];

export const RoleSelectionModal: React.FC<RoleSelectionModalProps> = ({
  isOpen,
  onClose,
  targetProperty,
  onApplyFilters,
}) => {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const whatsappNumber = FLATZY_WHATSAPP_NUMBER;

  const [currentView, setCurrentView] = useState<RoleModalView>('selection');
  const [submissionType, setSubmissionType] = useState<'buyer' | 'broker'>('buyer');
  const [generatedMessageText, setGeneratedMessageText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Buyer / Renter Form State
  const [buyerData, setBuyerData] = useState<BuyerRequirementData>({
    fullName: '',
    phone: '',
    companyName: '',
    lookingForBhk: '2 BHK',
    budget: '₹15,000 - ₹20,000',
    location: 'New Town',
    shiftingDate: '',
    tenantCategory: 'Bachelor',
  });

  // Broker / Owner Form State
  const [brokerData, setBrokerData] = useState<BrokerRequirementData>({
    fullName: '',
    phone: '',
    brokerType: 'Broker',
    agencyName: '',
    operatingAreas: ['New Town', 'Rajarhat'],
    propertyTypes: ['2 BHK'],
    notes: '',
  });

  // Prefill property when opened with a target flat
  React.useEffect(() => {
    if (isOpen) {
      if (targetProperty) {
        setBuyerData(prev => ({
          ...prev,
          lookingForBhk: targetProperty.bhkType || prev.lookingForBhk,
          budget: `₹${targetProperty.monthlyRent.toLocaleString('en-IN')}/mo`,
          location: targetProperty.location || prev.location,
        }));
        setCurrentView('buyer');
      } else {
        setCurrentView('selection');
      }
    }
  }, [isOpen, targetProperty]);

  if (!isOpen) return null;

  const toggleOperatingArea = (area: string) => {
    setBrokerData(prev => {
      const exists = prev.operatingAreas.includes(area);
      const updated = exists 
        ? prev.operatingAreas.filter(a => a !== area)
        : [...prev.operatingAreas, area];
      return { ...prev, operatingAreas: updated.length > 0 ? updated : [area] };
    });
  };

  const togglePropertyType = (type: string) => {
    setBrokerData(prev => {
      const exists = prev.propertyTypes.includes(type);
      const updated = exists 
        ? prev.propertyTypes.filter(t => t !== type)
        : [...prev.propertyTypes, type];
      return { ...prev, propertyTypes: updated.length > 0 ? updated : [type] };
    });
  };

  // Safe formatting without unstable variation selectors for 100% reliable rendering
  const generateBuyerText = (data: BuyerRequirementData) => {
    return (
      `*${targetProperty ? 'FLAT INQUIRY' : 'FLAT REQUIREMENT'} — FLATZY KOLKATA*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      (targetProperty
        ? `• *Selected Flat:* ${targetProperty.title} (#${targetProperty.brokerReferenceId})\n` +
          `• *Rent:* ₹${targetProperty.monthlyRent.toLocaleString('en-IN')}/month\n` +
          `• *Location:* ${targetProperty.subLocation}, ${targetProperty.location}\n`
        : '') +
      `• *Name:* ${data.fullName || 'Prospective Tenant'}\n` +
      `• *WhatsApp:* +91 ${data.phone}\n` +
      (data.companyName ? `• *Company / College:* ${data.companyName}\n` : '') +
      (!targetProperty ? `• *Looking for:* ${data.lookingForBhk}\n` : '') +
      (!targetProperty ? `• *Budget:* ${data.budget}\n` : '') +
      (!targetProperty ? `• *Preferred Area:* ${data.location}\n` : '') +
      (data.shiftingDate ? `• *Expected Shifting:* ${data.shiftingDate}\n` : '') +
      `• *Tenant Category:* ${data.tenantCategory}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      (targetProperty
        ? `Please connect me with the verified broker to schedule a visit!`
        : `Please share available verified options matching my requirements!`)
    );
  };

  const generateBrokerText = (data: BrokerRequirementData) => {
    return (
      `*PROPERTY PARTNER LISTING — FLATZY KOLKATA*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `• *Partner Name:* ${data.fullName || 'Partner'}\n` +
      `• *WhatsApp:* +91 ${data.phone}\n` +
      `• *Role:* ${data.brokerType === 'Owner' ? 'Property Owner' : 'Real Estate Broker'}\n` +
      (data.agencyName ? `• *Agency / Building:* ${data.agencyName}\n` : '') +
      `• *Operating Areas:* ${data.operatingAreas.join(', ')}\n` +
      `• *Properties Available:* ${data.propertyTypes.join(', ')}\n` +
      (data.notes ? `• *Details / Notes:* ${data.notes}\n` : '') +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `Looking to list properties on Flatzy Kolkata!`
    );
  };

  const openWhatsAppUrl = (text: string) => {
    const url = getWhatsAppUrl(text);
    // Directly navigate or open - works reliably across mobile in-app browsers
    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      window.location.href = url;
    }
  };

  const handleBuyerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const compiledText = generateBuyerText(buyerData);
    setGeneratedMessageText(compiledText);
    setSubmissionType('buyer');

    // Automatically send to Google Sheets
    await submitLeadToGoogleSheet({
      fullName: buyerData.fullName,
      phone: buyerData.phone,
      companyName: buyerData.companyName,
      lookingForBhk: buyerData.lookingForBhk,
      budget: buyerData.budget,
      location: buyerData.location,
      shiftingDate: buyerData.shiftingDate,
      tenantCategory: buyerData.tenantCategory,
      role: 'Renter',
      source: 'Welcome Modal (Renter)'
    });

    setIsSubmitting(false);
    setCurrentView('success');

    // Trigger WhatsApp
    openWhatsAppUrl(compiledText);

    try {
      confetti({
        particleCount: 65,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FFC800', '#FF5722', '#0B132B', '#10B981']
      });
    } catch {}
  };

  const handleBrokerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const compiledText = generateBrokerText(brokerData);
    setGeneratedMessageText(compiledText);
    setSubmissionType('broker');

    // Automatically send to Google Sheets
    await submitLeadToGoogleSheet({
      fullName: brokerData.fullName,
      phone: brokerData.phone,
      companyName: brokerData.agencyName || (brokerData.brokerType === 'Owner' ? 'Property Owner' : 'Independent Broker'),
      lookingForBhk: brokerData.propertyTypes.join(', '),
      budget: 'Listing Partner',
      location: brokerData.operatingAreas.join(', '),
      shiftingDate: 'Immediate Listing',
      tenantCategory: brokerData.brokerType === 'Owner' ? 'Owner Listing' : 'Broker Network',
      role: brokerData.brokerType === 'Owner' ? 'Owner' : 'Broker',
      brokerAreas: brokerData.operatingAreas.join(', '),
      brokerPropertyType: brokerData.propertyTypes.join(', '),
      brokerNote: brokerData.notes,
      source: 'Welcome Modal (Partner Portal)'
    });

    setIsSubmitting(false);
    setCurrentView('success');

    // Trigger WhatsApp
    openWhatsAppUrl(compiledText);

    try {
      confetti({
        particleCount: 65,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FFC800', '#FF5722', '#0B132B', '#10B981']
      });
    } catch {}
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/65 backdrop-blur-xs flex flex-col justify-end sm:justify-center sm:items-center p-0 sm:p-4 animate-in fade-in duration-200">
      {/* Click outside to close */}
      <div 
        className="absolute inset-0" 
        onClick={onClose} 
        aria-hidden="true" 
      />

      {/* Modal Container */}
      <div 
        className="relative z-10 bg-white w-full sm:max-w-lg rounded-t-[28px] sm:rounded-3xl shadow-2xl border-t sm:border border-slate-200/80 max-h-[92vh] sm:max-h-[88vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-250"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Pull Handle */}
        <div 
          className="sm:hidden pt-2.5 pb-1 bg-slate-50 flex justify-center cursor-pointer select-none border-b border-slate-100" 
          onClick={onClose}
        >
          <div className="w-10 h-1 bg-slate-300 rounded-full" />
        </div>

        {/* Modal Top Bar */}
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            {currentView !== 'selection' && (
              <button
                type="button"
                onClick={() => {
                  if (currentView === 'success') {
                    onClose();
                  } else {
                    setCurrentView('selection');
                  }
                }}
                className="p-1 -ml-1 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-200/60 transition-colors"
                title="Back"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div className="flex items-center gap-1.5 text-xs font-black text-flatzy-navy">
              <Sparkles className="w-3.5 h-3.5 text-flatzy-yellow animate-pulse" />
              <span>Flatzy Kolkata</span>
            </div>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ---------------------------------------------------- */}
        {/* VIEW 1: INITIAL SELECTION SCREEN */}
        {/* ---------------------------------------------------- */}
        {currentView === 'selection' && (
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 scrollbar-thin">
            <div className="text-center space-y-1">
              <h2 className="text-xl sm:text-2xl font-black text-flatzy-navy tracking-tight font-poppins">
                {isBn ? 'স্বাগতম! আপনি কোনটি খুঁজছেন?' : 'Welcome! How can we help?'}
              </h2>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {isBn 
                  ? 'সরাসরি তথ্য পূরণ করুন ও হোয়াটসঅ্যাপে যোগাযোগ করুন' 
                  : 'Select an option to connect instantly on WhatsApp'}
              </p>
            </div>

            {/* The Two Cards with robust SVG icons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              
              {/* Card 1: Rent / Buy a Flat */}
              <div 
                onClick={() => setCurrentView('buyer')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setCurrentView('buyer')}
                className="group p-5 rounded-2xl border-2 border-amber-200 bg-amber-50/50 hover:bg-amber-100/60 hover:border-flatzy-yellow transition-all duration-200 cursor-pointer text-left flex flex-col justify-between shadow-xs hover:shadow-soft"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
                    <Home className="w-6 h-6 text-amber-700" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-flatzy-navy">
                      {isBn ? 'ফ্ল্যাট ভাড়া / কিনতে চাই' : 'Rent / Buy a Flat'}
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      {isBn ? 'কলকাতায় যাচাইকৃত ফ্ল্যাট খুঁজুন' : 'Find verified flats in New Town, Rajarhat & Salt Lake'}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-2.5 border-t border-amber-200/60 text-xs font-bold text-flatzy-navy flex items-center justify-between">
                  <span>{isBn ? 'তথ্য দিন →' : 'Enter details →'}</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                </div>
              </div>

              {/* Card 2: Broker or Owner */}
              <div 
                onClick={() => setCurrentView('broker')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setCurrentView('broker')}
                className="group p-5 rounded-2xl border-2 border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-flatzy-navy transition-all duration-200 cursor-pointer text-left flex flex-col justify-between shadow-xs hover:shadow-soft"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-200 text-flatzy-navy flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
                    <Briefcase className="w-6 h-6 text-flatzy-navy" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-flatzy-navy">
                      {isBn ? 'ব্রোকার বা ফ্ল্যাটের মালিক' : 'Broker or Owner'}
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      {isBn ? 'ফ্ল্যাট লিস্টিং ও পার্টনার পোর্টাল' : 'List your properties & connect with verified tenants'}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-2.5 border-t border-slate-200 text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span>{isBn ? 'লিস্টিং করুন →' : 'List flats →'}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </div>
              </div>

            </div>

            {/* Bottom Skip */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={onClose}
                className="text-xs font-medium text-slate-400 hover:text-slate-700 underline underline-offset-4"
              >
                {isBn ? 'ওয়েবসাইট ব্রাউজ করুন →' : 'Skip & explore website directly →'}
              </button>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* VIEW 2: BROKER / OWNER REGISTRATION FORM */}
        {/* ---------------------------------------------------- */}
        {currentView === 'broker' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 scrollbar-thin">
            <div className="text-center space-y-0.5">
              <h3 className="text-lg font-black text-flatzy-navy font-poppins flex items-center justify-center gap-1.5">
                <Briefcase className="w-4 h-4 text-flatzy-navy" />
                <span>{isBn ? 'পার্টনার ও লিস্টিং পোর্টাল' : 'Partner & Listing Portal'}</span>
              </h3>
              <p className="text-xs text-slate-500">
                {isBn ? 'ফ্ল্যাট লিস্ট করতে তথ্য দিন' : 'Share property details to connect directly on WhatsApp'}
              </p>
            </div>

            <form onSubmit={handleBrokerSubmit} className="space-y-3">
              
              {/* Partner Type Toggle */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-slate-500" />
                  <span>I am a *</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setBrokerData({ ...brokerData, brokerType: 'Owner' })}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                      brokerData.brokerType === 'Owner'
                        ? 'bg-flatzy-navy text-flatzy-yellow border-flatzy-navy shadow-xs font-black'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <Home className="w-3.5 h-3.5" />
                    <span>Property Owner</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setBrokerData({ ...brokerData, brokerType: 'Broker' })}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                      brokerData.brokerType === 'Broker'
                        ? 'bg-flatzy-navy text-flatzy-yellow border-flatzy-navy shadow-xs font-black'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Real Estate Broker</span>
                  </button>
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    <span>Your Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={brokerData.fullName}
                    onChange={(e) => setBrokerData({ ...brokerData, fullName: e.target.value })}
                    placeholder="e.g. Amit Sharma"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-flatzy-yellow focus:bg-white transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                    <span>WhatsApp Number *</span>
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-2.5 text-xs font-bold text-slate-400 pointer-events-none">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      value={brokerData.phone}
                      onChange={(e) => setBrokerData({ ...brokerData, phone: e.target.value })}
                      placeholder="98300 12345"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-flatzy-yellow focus:bg-white transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Agency Name or Building Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>{brokerData.brokerType === 'Owner' ? 'Apartment / Society Name' : 'Agency / Company Name'}</span>
                </label>
                <input
                  type="text"
                  value={brokerData.agencyName}
                  onChange={(e) => setBrokerData({ ...brokerData, agencyName: e.target.value })}
                  placeholder={brokerData.brokerType === 'Owner' ? 'e.g. Greenwood Elements, New Town' : 'e.g. Sharma Realty'}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-flatzy-yellow focus:bg-white transition-colors"
                />
              </div>

              {/* Operating Areas (Multi-select) */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>Operating Locations *</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-normal">Tap to select</span>
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {KOLKATA_AREAS.map((area) => {
                    const isSelected = brokerData.operatingAreas.includes(area);
                    return (
                      <button
                        key={area}
                        type="button"
                        onClick={() => toggleOperatingArea(area)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all ${
                          isSelected
                            ? 'bg-flatzy-yellow text-flatzy-navy border-flatzy-yellowDark shadow-xs font-black'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {area}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Property Types Available (Multi-select) */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-slate-500" />
                    <span>Flats Available to List *</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-normal">Tap to select</span>
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {PROPERTY_TYPES.map((type) => {
                    const isSelected = brokerData.propertyTypes.includes(type);
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => togglePropertyType(type)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all ${
                          isSelected
                            ? 'bg-flatzy-navy text-flatzy-yellow border-flatzy-navy shadow-xs font-black'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Notes / Current Vacancies */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>Property Details / Current Vacancies (Optional)</span>
                </label>
                <input
                  type="text"
                  value={brokerData.notes}
                  onChange={(e) => setBrokerData({ ...brokerData, notes: e.target.value })}
                  placeholder="e.g. 2 BHK semi-furnished in Action Area 1 available immediately"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-flatzy-yellow focus:bg-white transition-colors"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 sm:py-3 rounded-xl bg-flatzy-yellow hover:bg-flatzy-yellowDark text-flatzy-navy font-black text-xs sm:text-sm shadow-soft transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Registering listing...' : 'Submit & Connect on WhatsApp'}</span>
                </button>
                <p className="text-[11px] text-slate-400 text-center mt-1.5">
                  ⚡ Auto-saves your listing & opens WhatsApp
                </p>
              </div>

            </form>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* VIEW 3: BUYER / RENTER REQUIREMENT FORM */}
        {/* ---------------------------------------------------- */}
        {currentView === 'buyer' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 scrollbar-thin">
            <div className="text-center space-y-0.5">
              <h3 className="text-lg font-black text-flatzy-navy font-poppins flex items-center justify-center gap-1.5">
                <Home className="w-4 h-4 text-flatzy-navy" />
                <span>
                  {targetProperty 
                    ? (isBn ? 'ফ্ল্যাট ইনকোয়ারি' : 'Enquire About This Flat') 
                    : (isBn ? 'আপনার পছন্দ জানান' : 'Your Flat Requirements')}
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                {targetProperty 
                  ? `${targetProperty.subLocation}, ${targetProperty.location}` 
                  : (isBn ? 'মাত্র কয়েকটি সাধারণ তথ্য দিন' : 'Quick details to connect directly on WhatsApp')}
              </p>
            </div>

            {targetProperty && (
              <div className="p-2.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-center gap-2.5 text-left">
                <img 
                  src={targetProperty.featuredImage} 
                  alt={targetProperty.title} 
                  className="w-11 h-11 rounded-xl object-cover shrink-0 border border-amber-200" 
                />
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-xs text-slate-900 truncate">{targetProperty.title}</div>
                  <div className="text-[10px] text-slate-600">
                    {targetProperty.bhkType} • <span className="font-black text-flatzy-navy">₹{targetProperty.monthlyRent.toLocaleString('en-IN')}/mo</span>
                  </div>
                </div>
                <span className="text-[9px] font-mono text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200 shrink-0">
                  #{targetProperty.brokerReferenceId}
                </span>
              </div>
            )}

            <form onSubmit={handleBuyerSubmit} className="space-y-3">
              
              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    <span>Your Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={buyerData.fullName}
                    onChange={(e) => setBuyerData({ ...buyerData, fullName: e.target.value })}
                    placeholder="e.g. Rahul Sen"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-flatzy-yellow focus:bg-white transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                    <span>WhatsApp Number *</span>
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-2.5 text-xs font-bold text-slate-400 pointer-events-none">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      value={buyerData.phone}
                      onChange={(e) => setBuyerData({ ...buyerData, phone: e.target.value })}
                      placeholder="98300 12345"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-flatzy-yellow focus:bg-white transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Company / College Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Company or College Name</span>
                </label>
                <input
                  type="text"
                  value={buyerData.companyName}
                  onChange={(e) => setBuyerData({ ...buyerData, companyName: e.target.value })}
                  placeholder="e.g. TCS, Cognizant, Wipro, Amity, etc."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-flatzy-yellow focus:bg-white transition-colors"
                />
              </div>

              {/* Looking for (1 BHK / 2 BHK / 3 BHK) */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-slate-500" />
                  <span>Looking for *</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['1 BHK', '2 BHK', '3 BHK'].map((bhk) => (
                    <button
                      key={bhk}
                      type="button"
                      onClick={() => setBuyerData({ ...buyerData, lookingForBhk: bhk })}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1 ${
                        buyerData.lookingForBhk === bhk
                          ? 'bg-flatzy-yellow text-flatzy-navy border-flatzy-yellowDark shadow-xs font-black'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span>{bhk}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Location & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>Location *</span>
                  </label>
                  <select
                    value={buyerData.location}
                    onChange={(e) => setBuyerData({ ...buyerData, location: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-flatzy-yellow focus:bg-white transition-colors"
                  >
                    <option value="New Town">New Town</option>
                    <option value="Rajarhat">Rajarhat</option>
                    <option value="Salt Lake">Salt Lake</option>
                    <option value="Sector V">Sector V</option>
                    <option value="Shapoorji">Shapoorji</option>
                    <option value="South Kolkata">South Kolkata</option>
                    <option value="Other Area">Other Kolkata Area</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Coins className="w-3.5 h-3.5 text-slate-500" />
                    <span>Budget *</span>
                  </label>
                  <select
                    value={buyerData.budget}
                    onChange={(e) => setBuyerData({ ...buyerData, budget: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-flatzy-yellow focus:bg-white transition-colors"
                  >
                    <option value="Under ₹10,000">Under ₹10,000</option>
                    <option value="₹10,000 - ₹15,000">₹10,000 - ₹15,000</option>
                    <option value="₹15,000 - ₹20,000">₹15,000 - ₹20,000</option>
                    <option value="₹20,000 - ₹30,000">₹20,000 - ₹30,000</option>
                    <option value="₹30,000+">₹30,000+</option>
                  </select>
                </div>
              </div>

              {/* Shifting Date & Family or Bachelor */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>Expected Shifting Date</span>
                  </label>
                  <input
                    type="date"
                    value={buyerData.shiftingDate}
                    onChange={(e) => setBuyerData({ ...buyerData, shiftingDate: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-flatzy-yellow focus:bg-white transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-slate-500" />
                    <span>Family or Bachelor *</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setBuyerData({ ...buyerData, tenantCategory: 'Family' })}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                        buyerData.tenantCategory === 'Family'
                          ? 'bg-flatzy-navy text-flatzy-yellow border-flatzy-navy shadow-xs font-black'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>Family</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setBuyerData({ ...buyerData, tenantCategory: 'Bachelor' })}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                        buyerData.tenantCategory === 'Bachelor'
                          ? 'bg-flatzy-navy text-flatzy-yellow border-flatzy-navy shadow-xs font-black'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>Bachelor</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 sm:py-3 rounded-xl bg-flatzy-yellow hover:bg-flatzy-yellowDark text-flatzy-navy font-black text-xs sm:text-sm shadow-soft transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Saving requirements...' : 'Submit & Connect on WhatsApp'}</span>
                </button>
                <p className="text-[11px] text-slate-400 text-center mt-1.5">
                  ⚡ Auto-saves your requirements & opens WhatsApp
                </p>
              </div>

            </form>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* VIEW 4: CLEAN SUCCESS STATE WITH ONLY "CONNECT IN WHATSAPP" */}
        {/* ---------------------------------------------------- */}
        {currentView === 'success' && (
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 text-center space-y-4 my-auto scrollbar-thin">
            {/* Celebration Icon with robust SVG */}
            <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center shadow-soft">
              <CheckCircle2 className="w-9 h-9 text-emerald-600 animate-bounce" />
            </div>
            
            <div className="space-y-1">
              <h3 className="text-xl font-black text-flatzy-navy font-poppins">
                {isBn 
                  ? 'তথ্য সফলভাবে গৃহীত!' 
                  : submissionType === 'broker' 
                    ? 'Listing Submitted Successfully!' 
                    : 'Requirements Saved!'}
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                {submissionType === 'broker'
                  ? `Thanks ${brokerData.fullName || 'partner'}! Your details have been recorded.`
                  : `Thanks ${buyerData.fullName || 'there'}! Your requirements have been recorded.`}
              </p>
            </div>

            {/* Structured Message Summary Card (NO copy button) */}
            <div className="text-left bg-slate-900 text-slate-100 p-4 rounded-2xl border border-slate-800 shadow-inner">
              <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400 font-mono">
                <Sparkles className="w-3.5 h-3.5 text-flatzy-yellow" />
                <span>Generated WhatsApp Message</span>
              </div>
              <pre className="text-[11px] font-mono whitespace-pre-wrap leading-relaxed text-slate-200 select-all max-h-48 overflow-y-auto scrollbar-thin pr-1">
                {generatedMessageText}
              </pre>
            </div>

            {/* ONLY "Connect in WhatsApp" + simple Explore button */}
            <div className="space-y-2.5 max-w-sm mx-auto pt-1">
              <a
                href={getWhatsAppUrl(generatedMessageText)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-soft transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <MessageSquare className="w-5 h-5 fill-white/20" />
                <span>Connect in WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (submissionType === 'buyer' && onApplyFilters) {
                    const matchedLoc = (['New Town', 'Rajarhat', 'Salt Lake', 'Sector V', 'Shapoorji'].includes(buyerData.location) 
                      ? buyerData.location 
                      : undefined) as LocationName | undefined;
                    onApplyFilters(matchedLoc, undefined);
                  }
                }}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all flex items-center justify-center gap-1"
              >
                <span>Explore Flats</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default RoleSelectionModal;
