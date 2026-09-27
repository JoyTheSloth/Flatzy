import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles } from 'lucide-react';

interface PictureViewModalProps {
  isOpen: boolean;
  images: string[];
  initialIndex?: number;
  title?: string;
  subLocation?: string;
  onClose: () => void;
}

export const PictureViewModal: React.FC<PictureViewModalProps> = ({
  isOpen,
  images,
  initialIndex = 0,
  title,
  subLocation,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length]);

  if (!isOpen || images.length === 0) return null;

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6 animate-in fade-in duration-200 select-none"
      onClick={onClose}
    >
      {/* Top Bar: Title, Counter & Close */}
      <div 
        className="w-full max-w-7xl mx-auto flex items-center justify-between gap-4 text-white z-20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-flatzy-yellow border border-white/15">
            {currentIndex + 1} / {images.length}
          </div>
          {title && (
            <div className="min-w-0 truncate">
              <h3 className="text-sm sm:text-base font-bold text-white truncate">{title}</h3>
              {subLocation && <p className="text-[11px] text-slate-400 truncate">{subLocation}</p>}
            </div>
          )}
        </div>

        {/* Top Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white transition-all border border-white/15 cursor-pointer shadow-lg"
            title="Close (Esc)"
            aria-label="Close picture view"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>

      {/* Main Image View Stage (Full 16:9 or native aspect ratio, fully uncropped) */}
      <div 
        className="relative flex-1 w-full max-w-6xl mx-auto my-2 sm:my-4 flex items-center justify-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Previous Button */}
        {images.length > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-1 sm:left-4 z-20 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/85 text-white backdrop-blur-md border border-white/15 shadow-xl transition-all hover:scale-105 active:scale-90 cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>
        )}

        {/* Full Image Display - Uncropped, High Definition */}
        <div className="w-full h-full flex items-center justify-center p-1 sm:p-2">
          <img
            key={currentIndex}
            src={images[currentIndex]}
            alt={title ? `${title} - picture ${currentIndex + 1}` : `Picture ${currentIndex + 1}`}
            className="max-h-[78vh] sm:max-h-[82vh] max-w-full object-contain rounded-xl sm:rounded-2xl shadow-2xl transition-all duration-300 animate-in zoom-in-95"
          />
        </div>

        {/* Next Button */}
        {images.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-1 sm:right-4 z-20 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/85 text-white backdrop-blur-md border border-white/15 shadow-xl transition-all hover:scale-105 active:scale-90 cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>
        )}
      </div>

      {/* Bottom Thumbnail Strip */}
      {images.length > 1 && (
        <div 
          className="w-full max-w-3xl mx-auto flex items-center justify-center gap-2 overflow-x-auto py-1 sm:py-2 scrollbar-none z-20"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                currentIndex === idx 
                  ? 'border-flatzy-yellow ring-2 ring-flatzy-yellow/50 scale-105 shadow-md' 
                  : 'border-white/20 opacity-60 hover:opacity-100 hover:border-white/60'
              }`}
            >
              <img 
                src={img} 
                alt={`Thumbnail ${idx + 1}`} 
                className="w-full h-full object-cover" 
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
