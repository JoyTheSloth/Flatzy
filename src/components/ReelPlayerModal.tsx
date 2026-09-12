import React, { useState, useEffect, useRef } from 'react';
import type { FlatReelVideo, Property } from '../types/property';
import { PROPERTIES_DATA } from '../data/properties';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ChevronUp, 
  ChevronDown, 
  Volume2, 
  VolumeX, 
  Heart, 
  Share2, 
  Play, 
  Pause, 
  Check, 
  Sparkles, 
  MessageSquare, 
  ExternalLink,
  MapPin,
  ShieldCheck
} from 'lucide-react';
import { getWhatsAppUrl } from '../config/contact';

interface ReelPlayerModalProps {
  reels: FlatReelVideo[];
  initialIndex: number;
  onClose: () => void;
  onSelectProperty: (property: Property) => void;
  onOpenInquiryModal: (property?: Property) => void;
}

export const ReelPlayerModal: React.FC<ReelPlayerModalProps> = ({
  reels,
  initialIndex,
  onClose,
  onSelectProperty,
  onOpenInquiryModal,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});
  const [copied, setCopied] = useState(false);
  const [showHeartBurst, setShowHeartBurst] = useState(false);
  const [tapFeedback, setTapFeedback] = useState<'prev' | 'next' | null>(null);
  const [progress, setProgress] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressTimerRef = useRef<any>(null);
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);

  const activeReel = reels[currentIndex];
  const linkedProperty = PROPERTIES_DATA.find((p) => p.id === activeReel?.propertyId) || PROPERTIES_DATA[0];

  useEffect(() => {
    if (activeReel && likeCounts[activeReel.id] === undefined) {
      const num = parseInt(activeReel.likes.replace(/[^0-9]/g, '')) || 350;
      setLikeCounts((prev) => ({ ...prev, [activeReel.id]: num }));
    }
  }, [activeReel]);

  useEffect(() => {
    setProgress(0);
    setIsPlaying(true);
  }, [currentIndex]);

  useEffect(() => {
    if (!isPlaying) {
      clearInterval(progressTimerRef.current);
      return;
    }

    progressTimerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 1;
      });
    }, 300);

    return () => clearInterval(progressTimerRef.current);
  }, [isPlaying, currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') handlePrev();
      if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      }
      if (e.key === 'm' || e.key === 'M') {
        setIsMuted((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, reels.length]);

  const handleNext = () => {
    setTapFeedback('next');
    setTimeout(() => setTapFeedback(null), 300);
    if (currentIndex < reels.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    setTapFeedback('prev');
    setTimeout(() => setTapFeedback(null), 300);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(reels.length - 1);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeReel) return;
    const isNowLiked = !liked[activeReel.id];
    setLiked((prev) => ({ ...prev, [activeReel.id]: isNowLiked }));
    setLikeCounts((prev) => ({
      ...prev,
      [activeReel.id]: (prev[activeReel.id] || 350) + (isNowLiked ? 1 : -1),
    }));
    if (isNowLiked) {
      setShowHeartBurst(true);
      setTimeout(() => setShowHeartBurst(false), 800);
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeReel) return;
    if (!liked[activeReel.id]) {
      toggleLike(e);
    } else {
      setShowHeartBurst(true);
      setTimeout(() => setShowHeartBurst(false), 800);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Horizontal swipe (swipe left = next, swipe right = prev)
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) handleNext();
      else handlePrev();
    } 
    // Vertical swipe (swipe up = next, swipe down = prev)
    else if (Math.abs(deltaY) > 50) {
      if (deltaY < 0) handleNext();
      else handlePrev();
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = window.location.origin + window.location.pathname + '#reels';
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!activeReel) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 select-none animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Toast Notification for Link Copy */}
      {copied && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-60 bg-emerald-600 text-white px-4 py-2 rounded-full font-bold text-xs shadow-2xl flex items-center gap-1.5 animate-in slide-in-from-top-4">
          <Check className="w-4 h-4 text-white stroke-[3]" />
          <span>Link copied to clipboard!</span>
        </div>
      )}

      {/* Floating Desktop Close Pill */}
      <button
        onClick={onClose}
        aria-label="Close modal"
        className="hidden md:flex absolute top-5 right-6 z-50 items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold backdrop-blur-md border border-white/10 transition-all hover:scale-105 active:scale-95"
      >
        <span>Close</span>
        <kbd className="px-1 py-0.2 text-[10px] bg-white/20 rounded font-mono">ESC</kbd>
        <X className="w-3.5 h-3.5 ml-0.5" />
      </button>

      {/* Desktop Previous Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        aria-label="Previous flat tour"
        className="hidden lg:flex absolute left-6 xl:left-16 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-white/10 hover:bg-flatzy-yellow hover:text-flatzy-navy text-white items-center justify-center backdrop-blur-md border border-white/10 transition-all hover:scale-110 active:scale-95 shadow-xl group"
      >
        <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-0.5" />
      </button>

      {/* Desktop Next Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        aria-label="Next flat tour"
        className="hidden lg:flex absolute right-6 xl:right-16 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-white/10 hover:bg-flatzy-yellow hover:text-flatzy-navy text-white items-center justify-center backdrop-blur-md border border-white/10 transition-all hover:scale-110 active:scale-95 shadow-xl group"
      >
        <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5" />
      </button>

      {/* Center Phone Shell */}
      <div 
        className="relative w-full max-w-[380px] h-[85vh] max-h-[660px] bg-black rounded-[28px] sm:rounded-[34px] overflow-hidden shadow-[0_0_50px_-10px_rgba(255,200,0,0.3)] border border-white/20 select-none flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Story Progress Bar */}
        <div className="absolute top-2.5 left-3 right-3 z-40 flex items-center gap-1 pointer-events-none">
          {reels.map((_, idx) => (
            <div 
              key={idx} 
              className="flex-1 h-1 bg-white/25 rounded-full overflow-hidden backdrop-blur-md"
            >
              <div 
                className={`h-full transition-all duration-200 ${
                  idx < currentIndex ? 'w-full bg-white' : idx === currentIndex ? 'bg-flatzy-yellow' : 'w-0'
                }`}
                style={{ width: idx === currentIndex ? `${progress}%` : undefined }}
              />
            </div>
          ))}
        </div>

        {/* Video / Poster Background Layer */}
        <div className="absolute inset-0 overflow-hidden bg-black pointer-events-none">
          {activeReel.videoUrl ? (
            <video
              ref={videoRef}
              src={activeReel.videoUrl}
              poster={activeReel.thumbnail}
              autoPlay
              loop
              playsInline
              muted={isMuted}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="relative w-full h-full overflow-hidden">
              <img
                src={activeReel.thumbnail}
                alt={activeReel.title}
                className={`w-full h-full object-cover transition-transform duration-1000 ease-out ${isPlaying ? 'scale-105' : 'scale-100'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/90" />
            </div>
          )}

          {/* Double-Tap Heart Burst */}
          {showHeartBurst && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
              <div className="animate-in zoom-in-50 duration-300 transform scale-125">
                <Heart className="w-20 h-20 text-rose-500 fill-rose-500 drop-shadow-[0_0_15px_rgba(244,63,94,0.8)]" />
              </div>
            </div>
          )}
        </div>

        {/* Interactive Click Zones: Left Half = Previous, Right Half = Next */}
        <div className="absolute inset-0 z-10 flex">
          {/* Left Zone (Back / Previous) */}
          <div
            onClick={handlePrev}
            onDoubleClick={handleDoubleClick}
            title="Click to go back (Previous Flat)"
            className="w-1/2 h-full cursor-pointer relative group flex items-center justify-start pl-3"
          >
            {/* Subtle hover chevron hint */}
            <div className="w-8 h-8 rounded-full bg-black/40 text-white/80 items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex">
              <ChevronLeft className="w-5 h-5" />
            </div>
          </div>

          {/* Right Zone (Front / Next) */}
          <div
            onClick={handleNext}
            onDoubleClick={handleDoubleClick}
            title="Click to go front (Next Flat)"
            className="w-1/2 h-full cursor-pointer relative group flex items-center justify-end pr-3"
          >
            {/* Subtle hover chevron hint */}
            <div className="w-8 h-8 rounded-full bg-black/40 text-white/80 items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex">
              <ChevronRight className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Dynamic Tap Ripple Flash Indicator */}
        {tapFeedback === 'prev' && (
          <div className="absolute left-6 top-1/2 -translate-y-1/2 z-25 pointer-events-none animate-in fade-in zoom-in-75 duration-200">
            <div className="w-12 h-12 rounded-full bg-black/60 text-white flex items-center justify-center shadow-lg backdrop-blur-md">
              <ChevronLeft className="w-7 h-7" />
            </div>
          </div>
        )}
        {tapFeedback === 'next' && (
          <div className="absolute right-6 top-1/2 -translate-y-1/2 z-25 pointer-events-none animate-in fade-in zoom-in-75 duration-200">
            <div className="w-12 h-12 rounded-full bg-black/60 text-white flex items-center justify-center shadow-lg backdrop-blur-md">
              <ChevronRight className="w-7 h-7" />
            </div>
          </div>
        )}

        {/* Top Header Bar inside Frame */}
        <div className="relative z-30 flex items-center justify-between pt-5 px-3.5 pb-2 bg-gradient-to-b from-black/75 via-black/25 to-transparent pointer-events-auto">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white font-bold text-[10px]">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>Verified Tour</span>
            </div>
            <span className="text-white/80 font-bold text-[10px] bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-md">
              {currentIndex + 1} / {reels.length}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Play/Pause Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              className="w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md border border-white/10 transition-colors"
            >
              {isPlaying ? <Pause className="w-3 h-3 fill-white" /> : <Play className="w-3 h-3 fill-white ml-0.5" />}
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleMute}
              aria-label={isMuted ? 'Turn Sound On' : 'Mute Sound'}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 hover:bg-black/80 text-white text-[10px] font-bold backdrop-blur-md border border-white/10 transition-colors"
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3 h-3 text-slate-300" />
                  <span>Muted</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">Sound</span>
                </>
              )}
            </button>

            {/* Mobile Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              aria-label="Close reel"
              className="w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md border border-white/10 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Floating Actions (Positioned safely above bottom info) */}
        <div className="absolute right-2.5 bottom-32 z-30 flex flex-col items-center gap-2.5 pointer-events-auto">
          {/* Previous Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous reel"
            className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white flex items-center justify-center active:scale-90 hover:bg-flatzy-yellow hover:text-flatzy-navy transition-all shadow-md"
          >
            <ChevronUp className="w-4 h-4" />
          </button>

          {/* Like Button */}
          <div className="flex flex-col items-center">
            <button
              onClick={toggleLike}
              className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white active:scale-90 transition-transform shadow-md"
            >
              <Heart
                className={`w-5 h-5 transition-all ${
                  liked[activeReel.id] 
                    ? 'text-rose-500 fill-rose-500 scale-110' 
                    : 'text-white'
                }`}
              />
            </button>
            <span className="text-[10px] font-extrabold text-white mt-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              {likeCounts[activeReel.id] || activeReel.likes}
            </span>
          </div>

          {/* Share Button */}
          <div className="flex flex-col items-center">
            <button
              onClick={handleShare}
              className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white active:scale-90 hover:bg-black/80 transition-all shadow-md"
            >
              <Share2 className="w-4 h-4 text-white" />
            </button>
            <span className="text-[9px] font-bold text-white/90 mt-0.5 drop-shadow">Share</span>
          </div>

          {/* Next Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next reel"
            className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white flex items-center justify-center active:scale-90 hover:bg-flatzy-yellow hover:text-flatzy-navy transition-all shadow-md"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Clean, Non-Crowded Bottom Overlay */}
        <div className="relative z-30 p-3.5 bg-gradient-to-t from-black via-black/85 to-transparent space-y-2 text-left pointer-events-auto">
          
          {/* Row 1: Location Tag & Rent */}
          <div className="flex items-center justify-between gap-2 pr-12">
            <div className="flex items-center gap-1 text-[11px] text-slate-200">
              <MapPin className="w-3.5 h-3.5 text-flatzy-yellow shrink-0" />
              <span className="font-semibold truncate">{activeReel.location}</span>
              <span className="text-white/60">•</span>
              <span className="font-bold text-white">{activeReel.bhk}</span>
            </div>

            <div className="text-sm font-black text-flatzy-yellow shrink-0">
              ₹{activeReel.monthlyRent.toLocaleString('en-IN')}<span className="text-[10px] font-normal text-white/75">/mo</span>
            </div>
          </div>

          {/* Row 2: Property Title */}
          <div className="pr-12">
            <h3 className="text-xs sm:text-sm font-bold text-white font-poppins leading-snug line-clamp-1 drop-shadow-sm">
              {activeReel.title}
            </h3>
          </div>

          {/* Row 3: Action Buttons (Compact, Side-by-Side) */}
          <div className="grid grid-cols-12 gap-1.5 pt-0.5">
            {/* Primary: Enquire Flat */}
            <button
              onClick={() => {
                onClose();
                onOpenInquiryModal(linkedProperty);
              }}
              className="col-span-6 py-2 px-2.5 rounded-xl bg-flatzy-yellow hover:bg-flatzy-yellowDark text-flatzy-navy font-black text-[11px] uppercase tracking-wider flex items-center justify-center gap-1 shadow-soft transition-transform active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Enquire Flat</span>
            </button>

            {/* WhatsApp Direct Chat */}
            <a
              href={getWhatsAppUrl(`Hi Flatzy! I am watching the video tour for ${activeReel.title} (₹${activeReel.monthlyRent}/mo). Please connect me.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="col-span-3 py-2 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center justify-center gap-1 transition-colors shadow-xs"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5 shrink-0" />
              <span>Chat</span>
            </a>

            {/* View Specs */}
            <button
              onClick={() => {
                onClose();
                onSelectProperty(linkedProperty);
              }}
              className="col-span-3 py-2 px-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-[11px] flex items-center justify-center gap-1 backdrop-blur-md transition-colors"
              title="View Flat Specs"
            >
              <span>Specs</span>
              <ExternalLink className="w-3 h-3 shrink-0" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
