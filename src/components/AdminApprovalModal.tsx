import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  MessageSquare, 
  Trash2, 
  Lock, 
  Eye, 
  Clock, 
  MapPin, 
  IndianRupee, 
  Bed, 
  Key,
  ExternalLink,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { CommunityListing } from '../types/property';
import { 
  getCommunityListings, 
  updateListingApprovalStatus, 
  deleteCommunityListing 
} from '../services/communityListingService';
import { getWhatsAppUrl } from '../config/contact';

interface AdminApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onListingsUpdated: () => void;
}

export const AdminApprovalModal: React.FC<AdminApprovalModalProps> = ({
  isOpen,
  onClose,
  onListingsUpdated,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('flatzy_admin_auth') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);

  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [listings, setListings] = useState<CommunityListing[]>([]);

  useEffect(() => {
    if (isOpen) {
      setListings(getCommunityListings());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'FLATZY700' || passcode === 'ADMIN2026' || passcode === 'admin') {
      setIsAuthenticated(true);
      localStorage.setItem('flatzy_admin_auth', 'true');
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
    }
  };

  const handleApprove = (id: string) => {
    const updated = updateListingApprovalStatus(id, 'approved');
    setListings(updated);
    onListingsUpdated();

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10B981', '#FFC800', '#FF5722']
      });
    } catch {}
  };

  const handleReject = (id: string) => {
    const updated = updateListingApprovalStatus(id, 'rejected');
    setListings(updated);
    onListingsUpdated();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to permanently delete this listing?')) {
      const updated = deleteCommunityListing(id);
      setListings(updated);
      onListingsUpdated();
    }
  };

  const handleContactSubmitter = (listing: CommunityListing) => {
    const msg = 
      `Hi ${listing.submitterName}! I am from Flatzy Kolkata Admin Team. ` +
      `We received your listing for ${listing.title} (#${listing.brokerReferenceId}) in ${listing.subLocation}. ` +
      `We are reviewing it for approval. Are you available for a quick verification call?`;
    window.open(getWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
  };

  const pendingListings = listings.filter(l => l.approvalStatus === 'pending');
  const approvedListings = listings.filter(l => l.approvalStatus === 'approved');
  const rejectedListings = listings.filter(l => l.approvalStatus === 'rejected');

  const displayedListings = 
    activeTab === 'pending' ? pendingListings :
    activeTab === 'approved' ? approvedListings : rejectedListings;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-flatzy-yellow text-flatzy-navy flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black font-poppins flex items-center gap-2">
                <span>Flatzy Admin Approval Desk</span>
                <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  Moderation
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">
                Review and approve community broker & owner flat submissions
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {!isAuthenticated ? (
          /* Passcode Gate Screen */
          <div className="p-8 text-center space-y-6 max-w-sm mx-auto my-auto">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-flatzy-navy mx-auto flex items-center justify-center border border-amber-200 shadow-soft">
              <Lock className="w-7 h-7 text-flatzy-yellowDark" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-black text-flatzy-navy font-poppins">
                Admin Authentication
              </h3>
              <p className="text-xs text-slate-500">
                Enter your Flatzy Admin Passcode to access the approval queue.
              </p>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-3">
              <input
                type="password"
                required
                autoFocus
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode (e.g. FLATZY700)"
                className="w-full text-center tracking-widest text-base font-black px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-flatzy-yellow"
              />

              {passcodeError && (
                <p className="text-xs font-bold text-rose-600 animate-shake">
                  Incorrect passcode. Default is FLATZY700.
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-flatzy-yellow hover:bg-flatzy-yellowDark text-flatzy-navy font-black text-xs uppercase tracking-wider shadow-soft transition-all"
              >
                Unlock Admin Desk
              </button>
            </form>
          </div>
        ) : (
          /* Moderation Queue Screen */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Filter Tabs Bar */}
            <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setActiveTab('pending')}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === 'pending'
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Pending Approval ({pendingListings.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('approved')}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === 'approved'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Live Approved ({approvedListings.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('rejected')}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === 'rejected'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Rejected ({rejectedListings.length})</span>
                </button>
              </div>

              <button
                onClick={() => {
                  setIsAuthenticated(false);
                  localStorage.removeItem('flatzy_admin_auth');
                }}
                className="text-[11px] text-slate-400 hover:text-slate-700 underline"
              >
                Lock
              </button>
            </div>

            {/* Listings Scroll Area */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              {displayedListings.length === 0 ? (
                <div className="text-center py-12 space-y-2">
                  <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center text-xl">
                    📁
                  </div>
                  <h4 className="text-sm font-bold text-slate-700">No {activeTab} listings</h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    {activeTab === 'pending'
                      ? 'All community submissions have been reviewed! New submissions will appear here.'
                      : 'No listings currently in this category.'}
                  </p>
                </div>
              ) : (
                displayedListings.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-slate-200/90 shadow-soft p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-slate-300 transition-all"
                  >
                    {/* Left: Thumbnail & Details */}
                    <div className="flex items-start gap-3.5 min-w-0 flex-1">
                      <img
                        src={item.featuredImage || item.images[0]}
                        alt={item.title}
                        className="w-20 h-20 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                      <div className="min-w-0 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                            #{item.brokerReferenceId}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            item.submittedByRole === 'Owner'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-purple-100 text-purple-800'
                          }`}>
                            {item.submittedByRole} Listing
                          </span>
                          <span className="text-xs font-black text-emerald-700">
                            ₹{item.monthlyRent.toLocaleString('en-IN')}/mo
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-slate-900 truncate">
                          {item.title}
                        </h4>

                        <p className="text-xs text-slate-500 flex items-center gap-1 truncate">
                          <MapPin className="w-3.5 h-3.5 text-flatzy-yellow shrink-0" />
                          <span>{item.subLocation}, {item.location} • {item.bedrooms} BHK • {item.furnishing}</span>
                        </p>

                        <div className="text-[11px] text-slate-400 font-medium">
                          Submitted by: <strong className="text-slate-700">{item.submitterName}</strong> (+91 {item.submitterPhone})
                        </div>
                      </div>
                    </div>

                    {/* Right Action Buttons */}
                    <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      <button
                        onClick={() => handleContactSubmitter(item)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 transition-colors"
                        title="Chat with submitter on WhatsApp"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>

                      {item.approvalStatus !== 'approved' && (
                        <button
                          onClick={() => handleApprove(item.id)}
                          className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5"
                          title="Approve and push live to Explore page"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Approve (Live)</span>
                        </button>
                      )}

                      {item.approvalStatus !== 'rejected' && (
                        <button
                          onClick={() => handleReject(item.id)}
                          className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 font-bold text-xs transition-colors flex items-center gap-1"
                          title="Reject listing"
                        >
                          <XCircle className="w-4 h-4" />
                          <span>Reject</span>
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete listing permanently"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
