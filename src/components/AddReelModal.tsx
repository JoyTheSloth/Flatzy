import React, { useState } from 'react';
import type { FlatReelVideo } from '../types/property';
import { PROPERTIES_DATA } from '../data/properties';
import { saveCustomReel } from '../data/reelsData';
import { X, Upload, Video, Sparkles, Check, Film, Plus } from 'lucide-react';

interface AddReelModalProps {
  onClose: () => void;
  onReelAdded: (newReel: FlatReelVideo) => void;
}

export const AddReelModal: React.FC<AddReelModalProps> = ({
  onClose,
  onReelAdded,
}) => {
  const [selectedPropId, setSelectedPropId] = useState(PROPERTIES_DATA[0].id);
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState(PROPERTIES_DATA[0].location);
  const [bhk, setBhk] = useState(PROPERTIES_DATA[0].bedrooms ? `${PROPERTIES_DATA[0].bedrooms} BHK` : '2 BHK');
  const [monthlyRent, setMonthlyRent] = useState(PROPERTIES_DATA[0].monthlyRent.toString());
  const [duration, setDuration] = useState('0:35');
  const [tag, setTag] = useState('Verified Walkthrough');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [previewThumbnail, setPreviewThumbnail] = useState(PROPERTIES_DATA[0].featuredImage);
  const [isSuccess, setIsSuccess] = useState(false);

  // When property selection changes, auto-populate details
  const handlePropertyChange = (propId: string) => {
    setSelectedPropId(propId);
    const prop = PROPERTIES_DATA.find((p) => p.id === propId);
    if (prop) {
      setTitle(`${prop.location} ${prop.bedrooms || 2} BHK Flat Tour`);
      setLocation(prop.location);
      setBhk(prop.bedrooms ? `${prop.bedrooms} BHK` : '2 BHK');
      setMonthlyRent(prop.monthlyRent.toString());
      setPreviewThumbnail(prop.featuredImage);
      setCaption(`Complete video walkthrough of ${prop.title}. Features ${prop.furnishing}, prime Kolkata connectivity, and verified availability.`);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setVideoFile(file);
      const objectUrl = URL.createObjectURL(file);
      setVideoUrl(objectUrl);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalTitle = title.trim() || `${location} Flat Video Tour`;
    const finalRent = parseInt(monthlyRent) || 18000;

    const newReel: FlatReelVideo = {
      id: `custom-reel-${Date.now()}`,
      title: finalTitle,
      caption: caption.trim() || `Verified video tour of ${finalTitle}.`,
      videoUrl: videoUrl.trim() || undefined,
      thumbnail: previewThumbnail || PROPERTIES_DATA[0].featuredImage,
      propertyId: selectedPropId,
      location,
      bhk,
      monthlyRent: finalRent,
      furnishing: 'Fully Furnished',
      views: '1',
      likes: '1',
      duration: duration.trim() || '0:30',
      tag: tag.trim() || 'New Tour',
      verified: true,
    };

    saveCustomReel(newReel);
    setIsSuccess(true);
    setTimeout(() => {
      onReelAdded(newReel);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-12 text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-slate-900 font-poppins">
              Video Tour Added to Gallery!
            </h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              Your new flat tour is now live in the Flatzy Reel Gallery and ready to watch.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-flatzy-yellow/30 text-flatzy-navy text-xs font-black uppercase tracking-wider mb-2">
                <Film className="w-3.5 h-3.5" />
                <span>Add Video Tour</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-poppins">
                Add Flat Tour to Gallery
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Upload or link a video walkthrough of any flat to display in the live gallery.
              </p>
            </div>

            {/* Link to Existing Flatzy Property */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Link to Property</label>
              <select
                value={selectedPropId}
                onChange={(e) => handlePropertyChange(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-white focus:outline-none focus:border-flatzy-yellow"
              >
                {PROPERTIES_DATA.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title} — {p.location} (₹{p.monthlyRent.toLocaleString('en-IN')}/mo)
                  </option>
                ))}
              </select>
            </div>

            {/* Video File / URL */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Video Source (MP4 / WebM)</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <label className="border-2 border-dashed border-slate-300 hover:border-flatzy-yellow rounded-2xl p-3.5 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-50 hover:bg-amber-50/40 text-center">
                  <Upload className="w-5 h-5 text-slate-500 mb-1" />
                  <span className="text-xs font-bold text-slate-700">
                    {videoFile ? videoFile.name : 'Choose Video File'}
                  </span>
                  <span className="text-[10px] text-slate-400">Click to upload from device</span>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>

                <div className="flex flex-col justify-center">
                  <input
                    type="url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="Or paste video URL (MP4)..."
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-flatzy-yellow"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 pl-1">e.g. hosted MP4 or CDN clip</span>
                </div>
              </div>
            </div>

            {/* Video Title & Tag */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Video Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Shapoorji 1 BHK Walkthrough"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-flatzy-yellow"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Tour Tag / Badge</label>
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  placeholder="e.g. Balcony View, Full Tour"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-flatzy-yellow"
                />
              </div>
            </div>

            {/* Rent & Duration */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Monthly Rent (₹)</label>
                <input
                  type="number"
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-flatzy-yellow"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Duration (mm:ss)</label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="0:45"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-flatzy-yellow"
                />
              </div>
            </div>

            {/* Caption */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Tour Description / Caption</label>
              <textarea
                rows={2}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="What should viewers notice? (e.g. modular kitchen, high ceiling, breezy balcony)..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-flatzy-yellow resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-flatzy-yellow hover:bg-flatzy-yellowDark text-flatzy-navy font-black text-xs uppercase tracking-wider transition-all shadow-soft flex items-center justify-center gap-2 active:scale-98"
            >
              <Plus className="w-4 h-4" />
              <span>Publish Video Tour to Gallery</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
