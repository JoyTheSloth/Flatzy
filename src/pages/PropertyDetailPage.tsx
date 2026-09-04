import React, { useState } from 'react';
import type { Property, TenantType } from '../types/property';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  MapPin, 
  BedDouble, 
  Bath, 
  Home, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  MessageSquare, 
  Send,
  Building,
  Check,
  Compass,
  Train,
  School,
  Briefcase,
  X,
  Copy,
  Mail
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PropertyDetailPageProps {
  property: Property;
  onBack: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onOpenInquiryModal: (property: Property) => void;
  onSelectProperty: (property: Property) => void;
}

export const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({
  property,
  onBack,
  isSaved,
  onToggleSave,
  onOpenInquiryModal,
  onSelectProperty,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [wishlistToast, setWishlistToast] = useState<string | null>(null);

  // Embedded form state inside the CTA panel
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [moveIn, setMoveIn] = useState('Within 7 Days');
  const [tenantType, setTenantType] = useState<TenantType>('Bachelor');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatCurrency = (val: number) => '₹' + val.toLocaleString('en-IN');

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleShareToWhatsApp = () => {
    const text = `Take a look at this rental flat on Flatzy Kolkata: ${property.title} in ${property.subLocation} (${property.location}) for ${formatCurrency(property.monthlyRent)}/mo: ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleShareToMail = () => {
    const subject = `Rental Flat in Kolkata: ${property.title}`;
    const body = `Found this flat on Flatzy Kolkata:\n\n${property.title}\nRent: ${formatCurrency(property.monthlyRent)}/month\nLocation: ${property.subLocation}, ${property.location}\n\nCheck it out here: ${window.location.href}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleToggleWishlist = () => {
    onToggleSave(property.id);
    const nextSaved = !isSaved;
    setWishlistToast(nextSaved ? 'Saved to your Wishlist! ❤️' : 'Removed from Wishlist');

    if (nextSaved) {
      try {
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.2 },
          colors: ['#FF5722', '#FFC800', '#10B981']
        });
      } catch (err) {}
    }

    setTimeout(() => setWishlistToast(null), 2500);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#FFC800', '#FF5722', '#0B132B', '#10B981']
        });
      } catch (e) {}
    }, 600);
  };

  const handleWhatsApp = () => {
    const text = `Hi Flatzy! I am interested in flat: ${property.title} (${property.brokerReferenceId}) at ${property.subLocation} (${property.location}) for ${formatCurrency(property.monthlyRent)}/mo. My name is ${fullName || 'a renter'}. Please connect me with the broker.`;
    window.open(`https://wa.me/919830000000?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 animate-in fade-in duration-300 relative">
      
      {/* Wishlist Toast Notification */}
      {wishlistToast && (
        <div className="fixed top-20 right-6 z-50 bg-flatzy-navy text-white px-4 py-2.5 rounded-2xl shadow-xl border border-slate-700 text-xs font-bold flex items-center gap-2 animate-in slide-in-from-top-4 duration-300">
          <Heart className="w-4 h-4 text-flatzy-coral fill-flatzy-coral" />
          <span>{wishlistToast}</span>
        </div>
      )}

      {/* Top Navigation & Action Bar */}
      <div className="flex items-center justify-between gap-4 pb-2 border-b border-slate-200/70">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 font-bold text-slate-700 hover:text-flatzy-navy transition-colors px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to listings</span>
          </button>
          <span className="hidden sm:inline text-slate-300">/</span>
          <span className="hidden sm:inline text-slate-500">{property.location}</span>
          <span className="hidden sm:inline text-slate-300">/</span>
          <span className="hidden sm:inline text-flatzy-navy font-bold truncate max-w-[200px]">{property.subLocation}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 shadow-xs transition-colors text-xs font-semibold"
            title="Share listing"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>

          <button
            onClick={handleToggleWishlist}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border shadow-xs transition-all text-xs font-semibold ${
              isSaved
                ? 'bg-flatzy-coral border-flatzy-coral text-white'
                : 'bg-white border-slate-200 text-slate-700 hover:text-flatzy-coral'
            }`}
            title={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />
            <span>{isSaved ? 'Saved' : 'Wishlist'}</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* AMAZON-STYLE SPLIT LAYOUT: LEFT GALLERY + RIGHT DETAILS */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        
        {/* ----------------------------------------------------------------------- */}
        {/* LEFT COLUMN: AMAZON-STYLE PHOTO GALLERY (Sticky on desktop) */}
        {/* ----------------------------------------------------------------------- */}
        <div className="lg:col-span-5 xl:col-span-6 lg:sticky lg:top-24 space-y-4">
          
          <div className="flex flex-col-reverse sm:flex-row gap-3 items-start">
            
            {/* Amazon Vertical Thumbnails Strip (horizontal on mobile) */}
            {property.images.length > 1 && (
              <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto w-full sm:w-20 shrink-0 max-h-[500px] pb-1 sm:pb-0 pr-1 scrollbar-thin">
                {property.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImageIndex(i)}
                    onMouseEnter={() => setSelectedImageIndex(i)}
                    className={`relative w-16 sm:w-20 aspect-square rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      selectedImageIndex === i 
                        ? 'border-flatzy-yellow ring-2 ring-flatzy-yellow/40 shadow-sm scale-102' 
                        : 'border-slate-200 hover:border-slate-300 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`${property.title} thumbnail ${i + 1}`} 
                      className="w-full h-full object-cover" 
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main Stage Image */}
            <div className="relative flex-1 aspect-[4/3] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 shadow-soft-lg group">
              <img
                src={property.images[selectedImageIndex] || property.featuredImage}
                alt={property.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Status Badges Overlay */}
              <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-flatzy-yellow text-flatzy-navy text-xs font-black uppercase tracking-wider shadow-md">
                  {property.availableFrom}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-flatzy-navy text-xs font-bold shadow-md">
                  {property.furnishing}
                </span>
              </div>

              {/* Photo counter */}
              <div className="absolute bottom-3.5 right-3.5 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold">
                {selectedImageIndex + 1} / {property.images.length} Photos
              </div>
            </div>

          </div>

          {/* Quick Broker / Verification Trust Badge */}
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-700 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Verified Listing ({property.brokerReferenceId})</span>
            </div>
            <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-bold text-[11px] border border-emerald-200/60 shrink-0">
              ● Active Vacancy
            </span>
          </div>

          {/* Quick WhatsApp Link directly under gallery on desktop */}
          <button
            onClick={handleWhatsApp}
            className="w-full py-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200 shadow-xs transition-all flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <span>Chat on WhatsApp regarding this flat</span>
          </button>

        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* RIGHT COLUMN: ALL PROPERTY DETAILS, SPECS, HIGHLIGHTS & ACTIONS */}
        {/* ----------------------------------------------------------------------- */}
        <div className="lg:col-span-7 xl:col-span-6 space-y-8">
          
          {/* Main Title & Address */}
          <div className="space-y-3 pb-6 border-b border-slate-200/80">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700">
                {property.propertyType}
              </span>
              <span>•</span>
              <span className="text-flatzy-navy font-black">
                ID: {property.brokerReferenceId}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-flatzy-navy font-poppins leading-tight">
              {property.title}
            </h1>

            <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
              <MapPin className="w-4 h-4 text-flatzy-yellow shrink-0" />
              <span>{property.address}</span>
            </div>

            {/* Rent & Deposit Hero Box */}
            <div className="p-5 rounded-2xl bg-amber-50/80 border border-flatzy-yellow/50 flex flex-wrap items-baseline justify-between gap-4 mt-4 shadow-xs">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Monthly Rent
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-3xl sm:text-4xl font-black text-flatzy-navy font-poppins">
                    {formatCurrency(property.monthlyRent)}
                  </span>
                  <span className="text-xs font-semibold text-slate-600">/month</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Security Deposit
                </span>
                <span className="text-lg sm:text-xl font-bold text-slate-800 font-poppins">
                  {formatCurrency(property.securityDeposit)}
                </span>
                {property.maintenanceCharges !== undefined && (
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    + {formatCurrency(property.maintenanceCharges)} maintenance
                  </div>
                )}
              </div>
            </div>

            {/* Fast Action Buttons at first glance */}
            <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => onOpenInquiryModal(property)}
                className="w-full py-3.5 rounded-full bg-flatzy-yellow hover:bg-flatzy-yellowDark text-flatzy-navy font-black text-xs uppercase tracking-wider shadow-md hover:shadow-yellow-glow transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Enquire Flat</span>
              </button>

              <button
                onClick={handleWhatsApp}
                className="w-full py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Quick WhatsApp Ping</span>
              </button>
            </div>
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs text-center space-y-1">
              <BedDouble className="w-5 h-5 text-flatzy-navy mx-auto" />
              <div className="text-[11px] text-slate-500 font-medium">Bedrooms</div>
              <div className="text-base font-extrabold text-flatzy-navy">{property.bedrooms} BHK</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs text-center space-y-1">
              <Bath className="w-5 h-5 text-flatzy-navy mx-auto" />
              <div className="text-[11px] text-slate-500 font-medium">Bathrooms</div>
              <div className="text-base font-extrabold text-flatzy-navy">{property.bathrooms} Baths</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs text-center space-y-1">
              <Home className="w-5 h-5 text-flatzy-navy mx-auto" />
              <div className="text-[11px] text-slate-500 font-medium">Built-up Area</div>
              <div className="text-base font-extrabold text-flatzy-navy">{property.superBuiltupAreaSqFt} sq ft</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs text-center space-y-1">
              <Building className="w-5 h-5 text-flatzy-navy mx-auto" />
              <div className="text-[11px] text-slate-500 font-medium">Floor Level</div>
              <div className="text-base font-extrabold text-flatzy-navy">{property.floor.split(' ')[0]}</div>
            </div>
          </div>

          {/* Suitable For Tags */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Ideal For
            </h3>
            <div className="flex flex-wrap gap-2">
              {property.suitableFor.map((tenant) => (
                <span
                  key={tenant}
                  className="px-3 py-1 rounded-full bg-slate-100 text-flatzy-navy text-xs font-bold border border-slate-200/80"
                >
                  ✓ {tenant}
                </span>
              ))}
            </div>
          </div>

          {/* SECTION 1: OVERVIEW */}
          <div className="space-y-3">
            <h3 className="text-base sm:text-lg font-black text-flatzy-navy font-poppins uppercase tracking-wider">
              Overview
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {property.description}
            </p>

            {/* Why you will love it bullets */}
            {property.whyYouWillLoveIt && property.whyYouWillLoveIt.length > 0 && (
              <div className="mt-4 p-5 rounded-2xl bg-amber-50/40 border border-amber-200/60 space-y-2.5">
                <h4 className="text-xs font-black uppercase tracking-wider text-flatzy-navy flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-flatzy-yellowDark" />
                  <span>Why you'll love this flat</span>
                </h4>
                <ul className="space-y-2">
                  {property.whyYouWillLoveIt.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* SECTION 2: AMENITIES */}
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-black text-flatzy-navy font-poppins uppercase tracking-wider">
              Amenities & Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {property.amenities.map((amenity, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-white border border-slate-200/80 flex items-center gap-2.5 text-xs font-semibold text-slate-800"
                >
                  <div className="w-2 h-2 rounded-full bg-flatzy-yellow shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 3: NEARBY PLACES */}
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-black text-flatzy-navy font-poppins uppercase tracking-wider">
              Nearby Places & Connectivity
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {property.nearbyLandmarks.map((landmark, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    {landmark.type === 'transit' && <Train className="w-4 h-4 text-blue-600" />}
                    {landmark.type === 'college' && <School className="w-4 h-4 text-amber-600" />}
                    {landmark.type === 'workplace' && <Briefcase className="w-4 h-4 text-purple-600" />}
                    {landmark.type === 'lifestyle' && <Compass className="w-4 h-4 text-emerald-600" />}
                    <span>{landmark.name}</span>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-white text-slate-600 border border-slate-200">
                    {landmark.distance}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 4: RENTAL DETAILS */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 text-xs text-slate-600 space-y-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-flatzy-navy">
              Rental Terms & Agreement
            </h3>
            <p>• Standard 11-month registered rental agreement with renewal option.</p>
            <p>• Security deposit refundable upon vacating as per standard Kolkata tenancy guidelines.</p>
            <p>• Electricity & Wi-Fi bills are billed separately as per actual sub-meter reading.</p>
          </div>

          {/* SECTION 5: EMBEDDED INQUIRY FORM CARD */}
          <div id="inquiry-form-section" className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-flatzy-yellow/60 shadow-soft-lg space-y-6">
            
            {isSubmitted ? (
              <div className="text-center py-8 space-y-5 animate-in zoom-in-95 duration-200">
                <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center text-4xl">
                  🏠
                </div>

                <div className="space-y-2">
                  <span className="inline-block px-3 py-1 rounded-full bg-flatzy-yellow text-flatzy-navy text-xs font-black uppercase tracking-wider">
                    Inquiry Confirmed
                  </span>
                  <h3 className="text-2xl font-black text-flatzy-navy font-poppins">
                    You're one step closer. 🏠
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
                    We've received your inquiry for <strong>{property.title}</strong>. Our team will connect your details with the relevant broker immediately.
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={onBack}
                    className="w-full py-3.5 rounded-full bg-flatzy-yellow hover:bg-flatzy-yellowDark text-flatzy-navy font-black text-xs uppercase tracking-wider shadow-soft transition-all"
                  >
                    Explore More Flats
                  </button>

                  <button
                    onClick={handleWhatsApp}
                    className="w-full py-2.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs border border-emerald-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <span>Ping on WhatsApp for Faster Reply</span>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="space-y-1.5 pb-4 border-b border-slate-100">
                  <span className="text-[11px] font-black uppercase tracking-wider text-flatzy-coral flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Direct Broker Connect</span>
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-flatzy-navy font-poppins">
                    Schedule a Visit or Inquiry
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Tell us your preferred move-in timeline and we'll introduce you directly to the verified broker.
                  </p>
                </div>

                <form onSubmit={handleInquirySubmit} className="pt-4 space-y-3.5">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Sayan Mukherjee"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-flatzy-yellow font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 98300 12345"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-flatzy-yellow font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-flatzy-yellow font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
                        Move-in Date
                      </label>
                      <select
                        value={moveIn}
                        onChange={(e) => setMoveIn(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-flatzy-yellow font-medium cursor-pointer"
                      >
                        <option value="Immediate">Immediate</option>
                        <option value="Within 7 Days">7 Days</option>
                        <option value="Within 15 Days">15 Days</option>
                        <option value="Next Month">Next Month</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
                        Tenant Type
                      </label>
                      <select
                        value={tenantType}
                        onChange={(e) => setTenantType(e.target.value as TenantType)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-flatzy-yellow font-medium cursor-pointer"
                      >
                        <option value="Student">Student</option>
                        <option value="Bachelor">Bachelor</option>
                        <option value="Working Professionals">Professional</option>
                        <option value="Couple">Couple</option>
                        <option value="Family">Family</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                      Message (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Can I schedule a visit this Saturday afternoon?"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-flatzy-yellow font-medium"
                    />
                  </div>

                  <div className="pt-2 space-y-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-full bg-flatzy-yellow hover:bg-flatzy-yellowDark text-flatzy-navy font-black text-xs uppercase tracking-wider shadow-soft hover:shadow-yellow-glow transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <span>Connecting...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Inquiry</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsApp}
                      className="w-full py-2.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs border border-emerald-200 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Instant WhatsApp Connection</span>
                    </button>
                  </div>

                  <div className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>No spam. Only the verified broker for {property.brokerReferenceId}.</span>
                  </div>
                </form>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* SHARE DIALOG BOX (MODAL) */}
      {/* ========================================================================= */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="absolute inset-0" 
            onClick={() => setIsShareModalOpen(false)} 
          />
          <div className="relative z-10 w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200 space-y-5">
            {/* Modal Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-flatzy-navy">
                <div className="p-2 rounded-xl bg-flatzy-yellow/20 text-flatzy-navy">
                  <Share2 className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-black font-poppins">Share this Flat</h3>
              </div>
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Property Snippet Preview */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
              <img
                src={property.featuredImage}
                alt={property.title}
                className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200"
              />
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-slate-900 truncate">
                  {property.title}
                </h4>
                <p className="text-[11px] text-slate-500 truncate">
                  {property.subLocation} • {property.bedrooms} BHK
                </p>
                <p className="text-xs font-black text-flatzy-navy font-poppins mt-0.5">
                  {formatCurrency(property.monthlyRent)}/mo
                </p>
              </div>
            </div>

            {/* Copy Link Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                Direct Link
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={window.location.href}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-700 font-mono truncate focus:outline-none select-all"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2.5 rounded-xl bg-flatzy-yellow hover:bg-flatzy-yellowDark text-flatzy-navy font-extrabold text-xs shrink-0 transition-all flex items-center gap-1.5 shadow-xs active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-700" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>
              {copied && (
                <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 animate-in fade-in">
                  <Check className="w-3.5 h-3.5" />
                  <span>Link copied to clipboard!</span>
                </p>
              )}
            </div>

            {/* Direct Social Channels */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Share via
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleShareToWhatsApp}
                  className="py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp</span>
                </button>

                <button
                  onClick={handleShareToMail}
                  className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <Mail className="w-4 h-4 text-slate-600" />
                  <span>Email</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
