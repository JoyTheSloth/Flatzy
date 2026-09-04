import React, { useState } from 'react';
import type { Property, FlatReelVideo } from '../types/property';
import { PROPERTIES_DATA } from '../data/properties';
import { getStoredReels } from '../data/reelsData';
import { ReelPlayerModal } from './ReelPlayerModal';
import { AddReelModal } from './AddReelModal';
import { 
  Play, 
  Sparkles, 
  Plus, 
  Eye, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Search,
  ExternalLink,
  Instagram,
  MessageSquare,
  Video,
  X
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ReelGallerySectionProps {
  onSelectProperty: (property: Property) => void;
  onOpenInquiryModal: (property?: Property) => void;
}

export const ReelGallerySection: React.FC<ReelGallerySectionProps> = ({
  onSelectProperty,
  onOpenInquiryModal,
}) => {
  const { t } = useLanguage();
  const [reels, setReels] = useState<FlatReelVideo[]>(getStoredReels);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePlayerIndex, setActivePlayerIndex] = useState<number | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Filter logic
  const filteredReels = reels.filter((reel) => {
    if (activeFilter === 'new-town' && !reel.location.toLowerCase().includes('new town')) return false;
    if (activeFilter === 'salt-lake' && !reel.location.toLowerCase().includes('salt lake')) return false;
    if (activeFilter === 'sector-v' && !reel.location.toLowerCase().includes('sector v')) return false;
    if (activeFilter === '1-bhk' && !['1 rk', '1 bhk'].some(b => reel.bhk.toLowerCase().includes(b))) return false;
    if (activeFilter === 'family' && !['2 bhk', '3 bhk', '4 bhk'].some(b => reel.bhk.toLowerCase().includes(b))) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = reel.title.toLowerCase().includes(q);
      const matchLoc = reel.location.toLowerCase().includes(q);
      const matchSubLoc = (reel.subLocation || '').toLowerCase().includes(q);
      const matchTag = reel.tag.toLowerCase().includes(q);
      const matchBhk = reel.bhk.toLowerCase().includes(q);
      return matchTitle || matchLoc || matchSubLoc || matchTag || matchBhk;
    }

    return true;
  });

  const handleReelAdded = (newReel: FlatReelVideo) => {
    setReels((prev) => [newReel, ...prev]);
  };

  const getLinkedProperty = (propertyId: string): Property => {
    return PROPERTIES_DATA.find((p) => p.id === propertyId) || PROPERTIES_DATA[0];
  };

  return (
    <section className="py-6 sm:py-10 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-flatzy-yellow/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Unified Hero Header Bar */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-flatzy-yellow/30 text-flatzy-navy text-xs font-black uppercase tracking-wider">
              <Video className="w-3.5 h-3.5" />
              <span>{t('reels.badge')}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-flatzy-navy font-poppins">
              {t('reels.title')}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t('reels.subtitle')}
            </p>
          </div>

          {/* Action Header Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex-1 sm:flex-none px-4 py-3 rounded-2xl bg-flatzy-navy hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-soft transition-all active:scale-95"
            >
              <Plus className="w-4 h-4 text-flatzy-yellow" />
              <span>Add Video Tour</span>
            </button>

            <a
              href="https://instagram.com/flatzykolkata"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-1.5"
            >
              <Instagram className="w-4 h-4" />
              <span className="hidden sm:inline">Instagram</span>
            </a>

            <a
              href="https://wa.me/919830000000?text=Hi%20Flatzy!%20I%20am%20looking%20for%20a%20flat%20video%20tour%20in%20Kolkata."
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Filter Pills & Search Box */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Filter Pills with Horizontal Scroll on Mobile */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 no-scrollbar sm:flex-wrap">
            {[
              { id: 'all', label: `All (${reels.length})` },
              { id: 'new-town', label: 'New Town' },
              { id: 'salt-lake', label: 'Salt Lake' },
              { id: 'sector-v', label: 'Sector V' },
              { id: '1-bhk', label: '1 RK / 1 BHK' },
              { id: 'family', label: '2-3 BHK' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                  activeFilter === f.id
                    ? 'bg-flatzy-yellow text-flatzy-navy shadow-sm'
                    : 'bg-white/90 hover:bg-white text-slate-600 border border-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search area, BHK, or tag..."
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-flatzy-yellow shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

        {/* Video Reel Cards Grid */}
        {filteredReels.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 p-8 space-y-3 shadow-soft">
            <Video className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-700 text-base">No video tours match your filter</h3>
            <p className="text-xs text-slate-500">Try clearing your search query or selecting "All".</p>
            <button
              onClick={() => {
                setActiveFilter('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {filteredReels.map((reel, index) => {
              const prop = getLinkedProperty(reel.propertyId);

              return (
                <div
                  key={reel.id}
                  className="group relative bg-slate-950 rounded-3xl overflow-hidden shadow-soft hover:shadow-soft-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between border border-slate-800"
                >
                  {/* Clickable Reel Container */}
                  <div 
                    onClick={() => setActivePlayerIndex(index)}
                    className="relative aspect-[9/14] w-full overflow-hidden cursor-pointer select-none"
                  >
                    {/* Video Poster Thumbnail */}
                    <img
                      src={reel.thumbnail}
                      alt={reel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    {/* Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/60 group-hover:from-black/95 transition-colors" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-extrabold text-flatzy-yellow">
                        <ShieldCheck className="w-3.5 h-3.5 text-flatzy-yellow" />
                        <span>Verified</span>
                      </span>

                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-semibold text-white/90">
                        <Clock className="w-3 h-3 text-slate-300" />
                        <span>{reel.duration}</span>
                      </span>
                    </div>

                    {/* Glowing Play Icon Center */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-flatzy-yellow/90 group-hover:bg-flatzy-yellow text-flatzy-navy flex items-center justify-center shadow-lg group-hover:shadow-yellow-glow transform group-hover:scale-110 transition-all duration-300">
                        <Play className="w-6 h-6 fill-flatzy-navy ml-0.5" />
                      </div>
                    </div>

                    {/* Grounded Info Overlay inside Card */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-10 space-y-2 text-left bg-gradient-to-t from-black via-black/80 to-transparent">
                      
                      {/* Location & BHK Pill */}
                      <div className="flex items-center justify-between text-xs">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-200">
                          <MapPin className="w-3 h-3 text-flatzy-yellow" />
                          <span>{reel.location}</span>
                        </span>
                        <span className="text-[10px] font-bold text-flatzy-yellow bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-md">
                          {reel.bhk}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-white text-sm leading-snug line-clamp-2 drop-shadow-sm group-hover:text-amber-200 transition-colors">
                        {reel.title}
                      </h3>

                      {/* Rent */}
                      <div className="flex items-center justify-between pt-0.5">
                        <div className="text-base font-black text-flatzy-yellow">
                          ₹{reel.monthlyRent.toLocaleString('en-IN')}<span className="text-[10px] font-normal text-white/80">/mo</span>
                        </div>
                        <span className="text-[10px] text-slate-300 flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>{reel.views}</span>
                        </span>
                      </div>

                      {/* Action Button Row */}
                      <div className="grid grid-cols-2 gap-1.5 pt-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActivePlayerIndex(index);
                          }}
                          className="py-2 px-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs flex items-center justify-center gap-1 backdrop-blur-md transition-colors"
                        >
                          <Play className="w-3 h-3 fill-white" />
                          <span>Watch</span>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenInquiryModal(prop);
                          }}
                          className="py-2 px-2.5 rounded-xl bg-flatzy-yellow hover:bg-flatzy-yellowDark text-flatzy-navy font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1 shadow-xs transition-transform active:scale-95"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>Enquire</span>
                        </button>
                      </div>

                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Full-Screen Interactive Reel Player Modal */}
      {activePlayerIndex !== null && (
        <ReelPlayerModal
          reels={filteredReels}
          initialIndex={activePlayerIndex}
          onClose={() => setActivePlayerIndex(null)}
          onSelectProperty={onSelectProperty}
          onOpenInquiryModal={onOpenInquiryModal}
        />
      )}

      {/* Add Reel Modal */}
      {isAddModalOpen && (
        <AddReelModal
          onClose={() => setIsAddModalOpen(false)}
          onReelAdded={handleReelAdded}
        />
      )}

    </section>
  );
};
