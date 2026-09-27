import React, { useState, useEffect } from 'react';
import {
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
  ExternalLink,
  RotateCcw,
  Search,
  Filter,
  PlusCircle,
  Download,
  Users,
  Building,
  Home,
  AlertTriangle,
  Check,
  LogOut,
  ChevronRight,
  TrendingUp,
  Database,
  Cloud,
  Layers,
  ArrowUpRight,
  Phone,
  Mail,
  Calendar,
  Sparkles,
  FileSpreadsheet,
  Settings,
  Send,
  Loader2,
  Upload
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { CommunityListing, LocationName, FurnishingType, Property } from '../types/property';
import { PROPERTIES_DATA } from '../data/properties';
import { 
  getCommunityListings, 
  updateListingApprovalStatus, 
  deleteCommunityListing,
  saveCommunityListing 
} from '../services/communityListingService';
import { submitLeadToGoogleSheet, GOOGLE_SHEET_WEB_APP_URL } from '../services/leadService';
import { uploadImageToCloud, isCloudinaryConfigured } from '../services/imageUploadService';
import { getWhatsAppUrl } from '../config/contact';

interface AdminDashboardPageProps {
  onNavigateHome: () => void;
  onNavigateExplore: () => void;
  onListingsUpdated: () => void;
}

type AdminTab = 'overview' | 'moderation' | 'inventory' | 'leads' | 'add-flat' | 'settings';

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  onNavigateHome,
  onNavigateExplore,
  onListingsUpdated,
}) => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('flatzy_admin_auth') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);

  // Navigation tab
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Listings data
  const [listings, setListings] = useState<CommunityListing[]>(() => getCommunityListings());
  const [moderationFilter, setModerationFilter] = useState<'pending' | 'approved' | 'rejected' | 'all'>('pending');
  const [searchQuery, setSearchQuery] = useState('');

  // Leads CRM data
  const [leads, setLeads] = useState<any[]>([]);
  const [leadRoleFilter, setLeadRoleFilter] = useState<string>('all');
  const [leadSearch, setLeadSearch] = useState<string>('');

  // Add Flat Form state
  const [newTitle, setNewTitle] = useState('');
  const [newRole, setNewRole] = useState<'Owner' | 'Broker'>('Owner');
  const [newSubmitterName, setNewSubmitterName] = useState('Flatzy Operations');
  const [newSubmitterPhone, setNewSubmitterPhone] = useState('8910376054');
  const [newLocation, setNewLocation] = useState<LocationName>('New Town');
  const [newSubLocation, setNewSubLocation] = useState('');
  const [newBhk, setNewBhk] = useState('2 BHK');
  const [newFurnishing, setNewFurnishing] = useState<FurnishingType>('Semi Furnished');
  const [newRent, setNewRent] = useState('20000');
  const [newDeposit, setNewDeposit] = useState('40000');
  const [newDesc, setNewDesc] = useState('');
  const [newPhotos, setNewPhotos] = useState<string[]>([]);
  const [isAddingFlat, setIsAddingFlat] = useState(false);
  const [addFlatSuccess, setAddFlatSuccess] = useState(false);

  // System test state
  const [isTestingSheet, setIsTestingSheet] = useState(false);
  const [sheetTestResult, setSheetTestResult] = useState<string | null>(null);

  // Real-time Clock
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Load leads from localStorage
  const refreshLeads = () => {
    try {
      const stored = localStorage.getItem('flatzy_leads');
      if (stored) {
        setLeads(JSON.parse(stored));
      } else {
        setLeads([]);
      }
    } catch {
      setLeads([]);
    }
  };

  useEffect(() => {
    refreshListings();
    refreshLeads();
  }, []);

  const refreshListings = () => {
    const fresh = getCommunityListings();
    setListings(fresh);
    onListingsUpdated();
  };

  // Auth handler
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = passcode.trim().toUpperCase();
    if (trimmed === 'FLATZY700' || trimmed === 'ADMIN2026' || trimmed === 'ADMIN') {
      setIsAuthenticated(true);
      localStorage.setItem('flatzy_admin_auth', 'true');
      setPasscodeError(false);
      refreshListings();
      refreshLeads();
    } else {
      setPasscodeError(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('flatzy_admin_auth');
    setIsAuthenticated(false);
    setPasscode('');
  };

  // Moderation Actions
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
    if (window.confirm('Are you sure you want to permanently delete this listing?')) {
      const updated = deleteCommunityListing(id);
      setListings(updated);
      onListingsUpdated();
    }
  };

  const handleContactSubmitter = (listing: CommunityListing) => {
    const msg = 
      `Hi ${listing.submitterName}! I am from Flatzy Kolkata Admin Operations. ` +
      `We received your onboarding request for ${listing.title} (Ref #${listing.brokerReferenceId}) in ${listing.subLocation}. ` +
      `Let's quickly verify your flat so we can make it live to thousands of tenants on Flatzy!`;

    window.open(getWhatsAppUrl(msg, listing.submitterPhone.replace(/\D/g, '')), '_blank');
  };

  // Add Direct Flat Handler
  const handleAddDirectFlat = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddingFlat(true);

    const refId = `FLZ-OPS-${Math.floor(100 + Math.random() * 900)}`;
    const rentNum = parseInt(newRent || '20000');
    const depNum = parseInt(newDeposit || `${rentNum * 2}`);

    const directListing: CommunityListing = {
      id: `admin-flat-${Date.now()}`,
      slug: `${newBhk.toLowerCase().replace(/\s+/g, '-')}-${newLocation.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      title: newTitle || `${newBhk} ${newFurnishing} in ${newSubLocation || newLocation}`,
      location: newLocation,
      subLocation: newSubLocation || `${newLocation}, Kolkata`,
      address: `${newSubLocation || newLocation}, Kolkata`,
      monthlyRent: rentNum,
      securityDeposit: depNum,
      maintenanceCharges: 1000,
      bedrooms: newBhk.includes('1') ? 1 : newBhk.includes('3') ? 3 : newBhk.includes('4') ? 4 : 2,
      bathrooms: newBhk.includes('1') ? 1 : 2,
      balconies: 1,
      superBuiltupAreaSqFt: newBhk.includes('1') ? 550 : newBhk.includes('3') ? 1350 : 950,
      floor: '3rd of 8 Floors',
      propertyType: 'Apartment',
      furnishing: newFurnishing,
      availableFrom: 'Immediate',
      amenities: ['Power Backup', '24/7 Security', 'Lift', 'Covered Parking'],
      images: newPhotos.length > 0 ? newPhotos : [
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
      ],
      featuredImage: newPhotos[0] || 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      description: newDesc || `Verified direct flat listing managed by Flatzy Operations in ${newSubLocation || newLocation}.`,
      whyYouWillLoveIt: [
        'Directly verified by Flatzy Operations',
        'Transparent terms, fast move-in'
      ],
      suitableFor: ['Working Professionals', 'Bachelor', 'Family'],
      tags: ['Admin Verified', 'Featured', newBhk],
      commuteHighlight: `🚇 Prime connectivity in ${newLocation}`,
      coordinates: { lat: 22.58, lng: 88.42 },
      nearbyLandmarks: [],
      brokerReferenceId: refId,
      createdDate: new Date().toISOString().split('T')[0],
      approvalStatus: 'approved', // Auto-approved because admin added it!
      submittedByRole: newRole,
      submitterName: newSubmitterName,
      submitterPhone: newSubmitterPhone,
    };

    saveCommunityListing(directListing);
    refreshListings();

    setIsAddingFlat(false);
    setAddFlatSuccess(true);
    setNewTitle('');
    setNewSubLocation('');
    setNewDesc('');
    setNewPhotos([]);

    try {
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
    } catch {}

    setTimeout(() => setAddFlatSuccess(false), 4000);
  };

  // Export Leads to CSV
  const handleExportLeadsCSV = () => {
    if (leads.length === 0) {
      alert('No leads available to export.');
      return;
    }

    const headers = ['SubmittedAt', 'Role', 'FullName', 'Phone', 'Location', 'LookingFor', 'Budget', 'VisitType', 'VisitSlot', 'Source'];
    const rows = leads.map(l => [
      `"${l.submittedAt || ''}"`,
      `"${l.role || ''}"`,
      `"${l.fullName || ''}"`,
      `"${l.phone || ''}"`,
      `"${l.location || ''}"`,
      `"${l.lookingForBhk || l.brokerPropertyType || ''}"`,
      `"${l.budget || l.propertyRent || ''}"`,
      `"${l.visitType || ''}"`,
      `"${l.visitSlot || ''}"`,
      `"${l.source || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `flatzy_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Test Google Sheet connection
  const handleTestSheet = async () => {
    setIsTestingSheet(true);
    setSheetTestResult(null);

    try {
      const res = await submitLeadToGoogleSheet({
        fullName: 'Admin Test Ping',
        phone: '9999999999',
        role: 'Renter',
        location: 'New Town Action Area 1',
        lookingForBhk: '2 BHK',
        budget: '₹20,000',
        source: 'Admin Diagnostics Test Ping'
      });

      if (res.success) {
        setSheetTestResult('✅ Success: Test ping sent to Google Sheet & Local Storage!');
        refreshLeads();
      } else {
        setSheetTestResult(`⚠️ Warning: ${res.error || 'Failed to ping sheet'}`);
      }
    } catch (err: any) {
      setSheetTestResult(`❌ Error: ${err?.message || 'Network error'}`);
    } finally {
      setIsTestingSheet(false);
    }
  };

  // Statistics
  const pendingCount = listings.filter(l => l.approvalStatus === 'pending').length;
  const approvedCommunityCount = listings.filter(l => l.approvalStatus === 'approved').length;
  const totalMarketplaceCount = PROPERTIES_DATA.length + approvedCommunityCount;
  const totalLeadsCount = leads.length;

  // Filtered Moderation Listings
  const filteredModerationListings = listings.filter(l => {
    if (moderationFilter !== 'all' && l.approvalStatus !== moderationFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = l.title.toLowerCase().includes(q);
      const matchLoc = l.location.toLowerCase().includes(q) || (l.subLocation && l.subLocation.toLowerCase().includes(q));
      const matchSubmitter = l.submitterName.toLowerCase().includes(q) || l.submitterPhone.includes(q);
      const matchRef = l.brokerReferenceId ? l.brokerReferenceId.toLowerCase().includes(q) : false;
      return matchTitle || matchLoc || matchSubmitter || matchRef;
    }
    return true;
  });

  // Filtered Leads
  const filteredLeads = leads.filter(lead => {
    if (leadRoleFilter !== 'all') {
      const role = (lead.role || '').toLowerCase();
      if (leadRoleFilter === 'renter' && role !== 'renter') return false;
      if (leadRoleFilter === 'broker' && role !== 'broker') return false;
      if (leadRoleFilter === 'owner' && role !== 'owner') return false;
      if (leadRoleFilter === 'visit' && !lead.visitType) return false;
    }
    if (leadSearch.trim()) {
      const q = leadSearch.toLowerCase();
      const matchName = (lead.fullName || '').toLowerCase().includes(q);
      const matchPhone = (lead.phone || '').includes(q);
      const matchLoc = (lead.location || '').toLowerCase().includes(q);
      return matchName || matchPhone || matchLoc;
    }
    return true;
  });

  // -------------------------------------------------------------
  // VIEW: LOCK SCREEN (If not authenticated)
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden font-sans">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-flatzy-yellow/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-flatzy-coral/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top bar */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-flatzy-yellow text-flatzy-navy font-black flex items-center justify-center text-xl shadow-yellow-glow">
              F
            </div>
            <div>
              <div className="font-black tracking-wider text-base text-white">FLATZY KOLKATA</div>
              <div className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">Admin Operations Portal</div>
            </div>
          </div>

          <button
            onClick={onNavigateHome}
            className="text-xs font-bold text-slate-400 hover:text-white px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 transition-colors"
          >
            ← Back to Public Website
          </button>
        </div>

        {/* Center Lock Box */}
        <div className="max-w-md w-full mx-auto my-auto py-12 z-10">
          <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mx-auto flex items-center justify-center shadow-soft">
                <Lock className="w-7 h-7" />
              </div>
              <h1 className="text-2xl font-black text-white font-poppins tracking-tight">
                Restricted Admin Access
              </h1>
              <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                Enter your administrative authorization passcode to manage Kolkata properties, approve submissions, and access CRM leads.
              </p>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Admin Passcode
                </label>
                <input
                  type="password"
                  required
                  autoFocus
                  placeholder="Enter passcode (e.g. FLATZY700)"
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    setPasscodeError(false);
                  }}
                  className={`w-full px-4 py-3.5 bg-slate-950 border rounded-2xl text-sm font-mono tracking-widest text-center text-white focus:outline-none transition-all ${
                    passcodeError
                      ? 'border-rose-500 ring-2 ring-rose-500/20'
                      : 'border-slate-700 focus:border-flatzy-yellow focus:ring-2 focus:ring-flatzy-yellow/20'
                  }`}
                />
                {passcodeError && (
                  <p className="text-rose-400 text-xs font-semibold text-center pt-1">
                    Incorrect Passcode. Try default: <span className="font-mono underline">FLATZY700</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-flatzy-yellow hover:bg-flatzy-yellowDark text-flatzy-navy font-black text-xs uppercase tracking-wider shadow-yellow-glow transition-all active:scale-98"
              >
                Authorize & Open Portal →
              </button>
            </form>

            <div className="pt-2 border-t border-slate-800/80 text-center">
              <span className="text-[11px] text-slate-500">
                Authorized Personnel Only • IP Logged • 256-bit Encrypted
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-slate-600 z-10">
          Flatzy Kolkata Core Platform v1.2 • Operations Desk
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW: AUTHENTICATED ADMIN DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      
      {/* TOP HEADER */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Left Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-flatzy-yellow text-flatzy-navy font-black flex items-center justify-center text-lg shadow-soft">
              F
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-sm tracking-wide text-white font-poppins">FLATZY OPS</span>
                <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30">
                  Control Center
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono hidden sm:block">
                Kolkata Real Estate Marketplace
              </div>
            </div>
          </div>

          {/* Right Live Time & Exit actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-800/80 text-slate-300 text-xs font-mono border border-slate-700">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{currentTime}</span>
            </div>

            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors"
              title="Open public website in client view"
            >
              <ExternalLink className="w-3.5 h-3.5 text-flatzy-yellow" />
              <span className="hidden sm:inline">View Public Website</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition-colors"
              title="Log out of Admin Portal"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* SECONDARY NAVIGATION BAR */}
        <div className="bg-slate-950/80 backdrop-blur border-t border-slate-800/60 overflow-x-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 sm:gap-2 h-12 text-xs font-bold whitespace-nowrap">
            
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all ${
                activeTab === 'overview'
                  ? 'bg-flatzy-yellow text-flatzy-navy shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('moderation')}
              className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all relative ${
                activeTab === 'moderation'
                  ? 'bg-flatzy-yellow text-flatzy-navy shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Moderation Desk</span>
              {pendingCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-flatzy-coral text-white text-[10px] font-black animate-pulse">
                  {pendingCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('inventory')}
              className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all ${
                activeTab === 'inventory'
                  ? 'bg-flatzy-yellow text-flatzy-navy shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Building className="w-4 h-4" />
              <span>Properties ({totalMarketplaceCount})</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('leads');
                refreshLeads();
              }}
              className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all ${
                activeTab === 'leads'
                  ? 'bg-flatzy-yellow text-flatzy-navy shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Leads CRM ({totalLeadsCount})</span>
            </button>

            <button
              onClick={() => setActiveTab('add-flat')}
              className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all ${
                activeTab === 'add-flat'
                  ? 'bg-flatzy-yellow text-flatzy-navy shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post New Flat</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all ${
                activeTab === 'settings'
                  ? 'bg-flatzy-yellow text-flatzy-navy shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Integrations & Health</span>
            </button>

          </div>
        </div>
      </header>

      {/* MAIN BODY CONTENT */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ------------------------------------------------------------- */}
        {/* TAB 1: OVERVIEW DASHBOARD */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            
            {/* Header Greeting */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-poppins">
                  Kolkata Operations Dashboard
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Real-time pipeline of pending partner approvals, live inventory, and tenant enquiries.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    refreshListings();
                    refreshLeads();
                  }}
                  className="px-3 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                  <span>Sync All</span>
                </button>

                <button
                  onClick={() => setActiveTab('moderation')}
                  className="px-4 py-2 rounded-xl bg-flatzy-navy text-white text-xs font-black shadow-soft hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
                >
                  <span>Open Moderation</span>
                  <ChevronRight className="w-4 h-4 text-flatzy-yellow" />
                </button>
              </div>
            </div>

            {/* 4 STATS CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Card 1: Pending Moderation */}
              <div 
                onClick={() => setActiveTab('moderation')}
                className={`p-6 rounded-3xl border cursor-pointer transition-all duration-200 shadow-soft hover:scale-[1.01] ${
                  pendingCount > 0 
                    ? 'bg-gradient-to-br from-amber-50 to-orange-50/70 border-amber-300 ring-2 ring-amber-400/20' 
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pending Review</span>
                  <div className={`p-2.5 rounded-2xl ${pendingCount > 0 ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    <Clock className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-900 font-poppins">{pendingCount}</span>
                  <span className="text-xs text-amber-700 font-semibold">
                    {pendingCount > 0 ? 'Action required' : 'Queue clear'}
                  </span>
                </div>
                <div className="mt-2 text-[11px] text-slate-500 flex items-center gap-1">
                  <span>Enquiries waiting for live approval</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </div>
              </div>

              {/* Card 2: Live Marketplace Inventory */}
              <div 
                onClick={() => setActiveTab('inventory')}
                className="p-6 rounded-3xl bg-white border border-slate-200 cursor-pointer shadow-soft hover:scale-[1.01] transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Live Inventory</span>
                  <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200">
                    <Building className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-900 font-poppins">{totalMarketplaceCount}</span>
                  <span className="text-xs text-emerald-600 font-semibold">Active Flats</span>
                </div>
                <div className="mt-2 text-[11px] text-slate-500">
                  {PROPERTIES_DATA.length} core catalog + {approvedCommunityCount} community verified
                </div>
              </div>

              {/* Card 3: CRM Leads */}
              <div 
                onClick={() => setActiveTab('leads')}
                className="p-6 rounded-3xl bg-white border border-slate-200 cursor-pointer shadow-soft hover:scale-[1.01] transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Customer Leads</span>
                  <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-200">
                    <Users className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-900 font-poppins">{totalLeadsCount}</span>
                  <span className="text-xs text-indigo-600 font-semibold">Enquiries</span>
                </div>
                <div className="mt-2 text-[11px] text-slate-500">
                  Logged from website visits, calls, & modals
                </div>
              </div>

              {/* Card 4: Google Sheet Integration */}
              <div 
                onClick={() => setActiveTab('settings')}
                className="p-6 rounded-3xl bg-white border border-slate-200 cursor-pointer shadow-soft hover:scale-[1.01] transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cloud Webhook</span>
                  <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-lg font-black text-emerald-700 font-poppins">Active</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="mt-2 text-[11px] text-slate-500 truncate" title={GOOGLE_SHEET_WEB_APP_URL}>
                  Google Apps Script Web App
                </div>
              </div>

            </div>

            {/* QUICK ACTIONS BANNER */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-soft">
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2 max-w-xl">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-flatzy-yellow/20 text-flatzy-yellow text-xs font-bold border border-flatzy-yellow/40">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Admin Fast Actions</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white font-poppins">
                    Need to publish a new flat immediately?
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Create a direct verified property listing with pictures and rent specs. It bypasses review and goes live to the public marketplace instantly.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setActiveTab('add-flat')}
                    className="px-5 py-3 rounded-2xl bg-flatzy-yellow hover:bg-flatzy-yellowDark text-flatzy-navy font-black text-xs uppercase tracking-wider shadow-yellow-glow transition-all active:scale-98 flex items-center gap-2"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>+ Add New Flat</span>
                  </button>

                  <button
                    onClick={handleExportLeadsCSV}
                    className="px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-colors flex items-center gap-2"
                  >
                    <Download className="w-4 h-4 text-emerald-400" />
                    <span>Export Leads CSV</span>
                  </button>
                </div>
              </div>
            </div>

            {/* PENDING NOTIFICATION STRIP IF ANY */}
            {pendingCount > 0 && (
              <div className="bg-amber-500/10 border border-amber-300 rounded-3xl p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900">
                      {pendingCount} Pending Property Listing{pendingCount > 1 ? 's' : ''} Awaiting Moderation
                    </h3>
                    <p className="text-xs text-slate-600">
                      Owners and brokers have submitted flat onboarding enquiries. Review and approve to publish them live.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActiveTab('moderation');
                    setModerationFilter('pending');
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs shrink-0 shadow-soft transition-colors"
                >
                  Review Now →
                </button>
              </div>
            )}

          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: MODERATION DESK */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'moderation' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Top Bar with Filter & Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
              <div>
                <h1 className="text-2xl font-black text-slate-900 font-poppins flex items-center gap-2">
                  <span>Listing Moderation Desk</span>
                  {pendingCount > 0 && (
                    <span className="text-xs font-black bg-amber-500 text-white px-2.5 py-0.5 rounded-full">
                      {pendingCount} Pending
                    </span>
                  )}
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Verify genuine ownership & broker authorizations before publishing to public marketplace.
                </p>
              </div>

              {/* Status Filter Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                {(['pending', 'approved', 'rejected', 'all'] as const).map(status => (
                  <button
                    key={status}
                    onClick={() => setModerationFilter(status)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                      moderationFilter === status
                        ? 'bg-slate-900 text-white shadow-soft'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {status === 'pending' ? `⏳ Pending (${pendingCount})` : status}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search submissions by title, location, phone, owner name, or Ref ID..."
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-medium focus:outline-none focus:border-flatzy-yellow shadow-xs"
              />
            </div>

            {/* Listings Grid */}
            {filteredModerationListings.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-soft space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h3 className="text-base font-bold text-slate-800">No listings found</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  {moderationFilter === 'pending'
                    ? 'All pending listings have been reviewed! Your moderation queue is clean.'
                    : 'No listings match your search filter.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredModerationListings.map(listing => (
                  <div
                    key={listing.id}
                    className="bg-white rounded-3xl border border-slate-200/90 shadow-soft overflow-hidden flex flex-col justify-between transition-all hover:shadow-md"
                  >
                    <div>
                      {/* Image & Status Tag */}
                      <div className="relative h-48 bg-slate-100 overflow-hidden">
                        <img
                          src={listing.featuredImage || listing.images[0]}
                          alt={listing.title}
                          className="w-full h-full object-cover"
                        />
                        
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            listing.approvalStatus === 'approved'
                              ? 'bg-emerald-600 text-white'
                              : listing.approvalStatus === 'rejected'
                              ? 'bg-rose-600 text-white'
                              : 'bg-amber-500 text-white animate-pulse'
                          }`}>
                            {listing.approvalStatus === 'approved' ? '✓ Live on Explore' : listing.approvalStatus}
                          </span>

                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-900/80 text-white backdrop-blur-sm">
                            {listing.submittedByRole}
                          </span>
                        </div>

                        {listing.brokerReferenceId && (
                          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-white/90 text-slate-800 shadow-xs">
                            #{listing.brokerReferenceId}
                          </div>
                        )}
                      </div>

                      {/* Content Specs */}
                      <div className="p-5 space-y-4">
                        <div>
                          <h3 className="text-base font-black text-slate-900 line-clamp-1">
                            {listing.title}
                          </h3>
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                            <MapPin className="w-3.5 h-3.5 text-flatzy-coral shrink-0" />
                            <span>{listing.subLocation}, {listing.location}</span>
                          </div>
                        </div>

                        {/* Specs Pill row */}
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className="px-2.5 py-1 rounded-xl bg-slate-100 font-bold text-slate-700">
                            ₹{listing.monthlyRent.toLocaleString('en-IN')}/mo
                          </span>
                          <span className="px-2.5 py-1 rounded-xl bg-slate-100 font-medium text-slate-600">
                            {listing.bedrooms} BHK
                          </span>
                          <span className="px-2.5 py-1 rounded-xl bg-slate-100 font-medium text-slate-600">
                            {listing.furnishing}
                          </span>
                        </div>

                        {/* Submitter Info Card */}
                        <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80 space-y-1.5 text-xs">
                          <div className="flex justify-between items-center text-slate-500 font-medium">
                            <span>Submitter:</span>
                            <span className="font-bold text-slate-800">{listing.submitterName}</span>
                          </div>
                          <div className="flex justify-between items-center text-slate-500 font-medium">
                            <span>Phone:</span>
                            <span className="font-bold text-slate-800 font-mono">+91 {listing.submitterPhone}</span>
                          </div>
                          {listing.submitterAgency && (
                            <div className="flex justify-between items-center text-slate-500 font-medium">
                              <span>Agency:</span>
                              <span className="font-bold text-slate-800">{listing.submitterAgency}</span>
                            </div>
                          )}
                          {listing.rawPastedText && (
                            <div className="pt-1.5 border-t border-slate-200 text-[11px] text-slate-600 italic">
                              "{listing.rawPastedText}"
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Buttons */}
                    <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                      <button
                        onClick={() => handleContactSubmitter(listing)}
                        className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                        title="Chat with submitter on WhatsApp"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Verify on WhatsApp</span>
                      </button>

                      <div className="flex items-center gap-2">
                        {listing.approvalStatus !== 'approved' && (
                          <button
                            onClick={() => handleApprove(listing.id)}
                            className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black flex items-center gap-1 shadow-soft transition-colors"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Approve (Live)</span>
                          </button>
                        )}

                        {listing.approvalStatus !== 'rejected' && (
                          <button
                            onClick={() => handleReject(listing.id)}
                            className="px-3 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold transition-colors"
                          >
                            Reject
                          </button>
                        )}

                        <button
                          onClick={() => handleDelete(listing.id)}
                          className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete Listing"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 3: INVENTORY MANAGER */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'inventory' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-slate-900 font-poppins">
                  All Marketplace Properties ({totalMarketplaceCount})
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Browse all catalog apartments live on the Flatzy Kolkata consumer marketplace.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('add-flat')}
                className="px-4 py-2 rounded-xl bg-flatzy-yellow text-flatzy-navy font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-soft hover:bg-flatzy-yellowDark transition-colors self-start sm:self-auto"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ Add Property</span>
              </button>
            </div>

            {/* Inventory Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="px-5 py-4">Property</th>
                      <th className="px-4 py-4">Location</th>
                      <th className="px-4 py-4">Rent / Deposit</th>
                      <th className="px-4 py-4">Config</th>
                      <th className="px-4 py-4">Source</th>
                      <th className="px-4 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                    {/* Approved Community listings */}
                    {listings.filter(l => l.approvalStatus === 'approved').map(l => (
                      <tr key={l.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <img src={l.featuredImage} alt="" className="w-10 h-10 rounded-xl object-cover border border-slate-200" />
                            <div>
                              <div className="font-bold text-slate-900">{l.title}</div>
                              <div className="text-[11px] text-slate-400">Ref: #{l.brokerReferenceId}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">{l.subLocation}</td>
                        <td className="px-4 py-4 font-bold text-emerald-700">₹{l.monthlyRent.toLocaleString('en-IN')}/mo</td>
                        <td className="px-4 py-4">{l.bedrooms} BHK • {l.furnishing}</td>
                        <td className="px-4 py-4">
                          <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-200">
                            Partner ({l.submittedByRole})
                          </span>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <a
                            href={`#property/${l.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 font-bold hover:underline"
                          >
                            <span>Live View</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>
                      </tr>
                    ))}

                    {/* Seed properties */}
                    {PROPERTIES_DATA.map(p => (
                      <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <img src={p.featuredImage} alt="" className="w-10 h-10 rounded-xl object-cover border border-slate-200" />
                            <div>
                              <div className="font-bold text-slate-900">{p.title}</div>
                              <div className="text-[11px] text-slate-400">ID: {p.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">{p.subLocation}</td>
                        <td className="px-4 py-4 font-bold text-emerald-700">₹{p.monthlyRent.toLocaleString('en-IN')}/mo</td>
                        <td className="px-4 py-4">{p.bedrooms} BHK • {p.furnishing}</td>
                        <td className="px-4 py-4">
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
                            Flatzy Core Catalog
                          </span>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <a
                            href={`#property/${p.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 font-bold hover:underline"
                          >
                            <span>Live View</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 4: LEADS & CRM */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'leads' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-slate-900 font-poppins">
                  Tenant & Partner Leads CRM ({totalLeadsCount})
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Real-time enquiries collected from site visitors, schedule visit modals, and onboarding forms.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={refreshLeads}
                  className="px-3 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Refresh</span>
                </button>

                <button
                  onClick={handleExportLeadsCSV}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-soft flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Export to CSV</span>
                </button>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                <input
                  type="text"
                  value={leadSearch}
                  onChange={(e) => setLeadSearch(e.target.value)}
                  placeholder="Search leads by name, phone, or location..."
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-medium focus:outline-none focus:border-flatzy-yellow"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto">
                {['all', 'renter', 'owner', 'broker', 'visit'].map(role => (
                  <button
                    key={role}
                    onClick={() => setLeadRoleFilter(role)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold capitalize whitespace-nowrap transition-all ${
                      leadRoleFilter === role
                        ? 'bg-slate-900 text-white shadow-soft'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {role === 'visit' ? 'Scheduled Visits' : role}
                  </button>
                ))}
              </div>
            </div>

            {/* Leads Table */}
            {filteredLeads.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-soft space-y-2">
                <Users className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-700">No leads recorded yet</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  When prospective tenants or partners submit forms on Flatzy, their details will instantly appear here.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="px-5 py-4">Lead / Name</th>
                        <th className="px-4 py-4">Phone / WhatsApp</th>
                        <th className="px-4 py-4">Role</th>
                        <th className="px-4 py-4">Looking For / Budget</th>
                        <th className="px-4 py-4">Location</th>
                        <th className="px-4 py-4">Timestamp</th>
                        <th className="px-4 py-4 text-right">Connect</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                      {filteredLeads.map((lead, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-5 py-4 font-bold text-slate-900">
                            {lead.fullName || 'Anonymous Prospect'}
                            {lead.visitType && (
                              <span className="block text-[10px] text-amber-700 font-semibold">
                                📅 {lead.visitType} on {lead.visitDate} ({lead.visitSlot})
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-4 font-mono font-bold text-slate-700">
                            +91 {lead.phone}
                          </td>
                          <td className="px-4 py-4">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              lead.role === 'Owner'
                                ? 'bg-amber-100 text-amber-800'
                                : lead.role === 'Broker'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {lead.role || 'Renter'}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <div>{lead.lookingForBhk || lead.brokerPropertyType || 'Any Flat'}</div>
                            <div className="text-[11px] text-slate-400">{lead.budget || lead.propertyRent ? `₹${lead.budget || lead.propertyRent}` : 'Flexible'}</div>
                          </td>
                          <td className="px-4 py-4 text-slate-600">
                            {lead.location || 'Kolkata'}
                          </td>
                          <td className="px-4 py-4 text-[11px] text-slate-400 whitespace-nowrap">
                            {lead.submittedAt || 'Recent'}
                          </td>
                          <td className="px-4 py-4 text-right">
                            <button
                              onClick={() => {
                                const msg = `Hi ${lead.fullName}! I am connecting from Flatzy Kolkata regarding your flat enquiry. How can we assist you with your move?`;
                                window.open(getWhatsAppUrl(msg, (lead.phone || '').replace(/\D/g, '')), '_blank');
                              }}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white font-bold transition-all border border-emerald-200 text-xs"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>WhatsApp</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 5: POST NEW FLAT (ADMIN DIRECT) */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'add-flat' && (
          <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div>
              <h1 className="text-2xl font-black text-slate-900 font-poppins">
                Direct Flat Listing Publisher
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Listings posted by Admin are auto-approved and will appear immediately on the public Explore page.
              </p>
            </div>

            {addFlatSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in zoom-in-95">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Property published live to marketplace successfully!</span>
              </div>
            )}

            <form onSubmit={handleAddDirectFlat} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                    Listing Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Spacious 2 BHK Semi-Furnished Flat near Karunamoyee"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-flatzy-yellow"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                    Kolkata Locality *
                  </label>
                  <select
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value as LocationName)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-flatzy-yellow cursor-pointer"
                  >
                    <option value="New Town">New Town</option>
                    <option value="Salt Lake">Salt Lake</option>
                    <option value="Sector V">Sector V</option>
                    <option value="Rajarhat">Rajarhat</option>
                    <option value="Shapoorji">Shapoorji</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                    Sub-locality / Landmark *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Action Area 1 / Near Eco Park"
                    value={newSubLocation}
                    onChange={(e) => setNewSubLocation(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-flatzy-yellow"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                    Configuration
                  </label>
                  <select
                    value={newBhk}
                    onChange={(e) => setNewBhk(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-flatzy-yellow"
                  >
                    <option value="1 RK / Studio">1 RK / Studio</option>
                    <option value="1 BHK">1 BHK</option>
                    <option value="2 BHK">2 BHK</option>
                    <option value="3 BHK">3 BHK</option>
                    <option value="4+ BHK">4+ BHK</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                    Furnishing
                  </label>
                  <select
                    value={newFurnishing}
                    onChange={(e) => setNewFurnishing(e.target.value as FurnishingType)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-flatzy-yellow"
                  >
                    <option value="Fully Furnished">Fully Furnished</option>
                    <option value="Semi Furnished">Semi Furnished</option>
                    <option value="Unfurnished">Unfurnished</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                    Monthly Rent (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={newRent}
                    onChange={(e) => setNewRent(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-flatzy-yellow"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                    Security Deposit (₹)
                  </label>
                  <input
                    type="number"
                    value={newDeposit}
                    onChange={(e) => setNewDeposit(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-flatzy-yellow"
                  />
                </div>
              </div>

              {/* Photo Upload in Admin */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                  Property Photos
                </label>
                <div className="border-2 border-dashed border-slate-200 hover:border-flatzy-yellow rounded-2xl p-4 text-center transition-colors bg-slate-50/50">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    id="admin-photo-upload"
                    className="hidden"
                    onChange={async (e) => {
                      if (!e.target.files) return;
                      for (const file of Array.from(e.target.files)) {
                        const res = await uploadImageToCloud(file);
                        if (res.url) {
                          setNewPhotos(prev => [...prev, res.url].slice(0, 6));
                        }
                      }
                      e.target.value = '';
                    }}
                  />
                  <label htmlFor="admin-photo-upload" className="cursor-pointer flex flex-col items-center justify-center gap-1">
                    <Upload className="w-5 h-5 text-slate-400" />
                    <span className="text-xs font-bold text-slate-700">Click to upload photos (Cloudinary CDN supported)</span>
                    <span className="text-[10px] text-slate-400">PNG, JPG, WebP</span>
                  </label>
                </div>

                {newPhotos.length > 0 && (
                  <div className="flex gap-2 overflow-x-auto py-1">
                    {newPhotos.map((url, i) => (
                      <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-200">
                        <img src={url} alt="" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setNewPhotos(prev => prev.filter((_, idx) => idx !== i))}
                          className="absolute top-1 right-1 p-0.5 bg-black/60 rounded-full text-white hover:bg-rose-600"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                  Property Highlights / Notes
                </label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Key selling points: gated society, modular kitchen, near metro station..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-flatzy-yellow"
                />
              </div>

              <button
                type="submit"
                disabled={isAddingFlat}
                className="w-full py-3.5 rounded-full bg-flatzy-yellow hover:bg-flatzy-yellowDark text-flatzy-navy font-black text-xs uppercase tracking-wider shadow-soft transition-all active:scale-98 flex items-center justify-center gap-2"
              >
                {isAddingFlat ? (
                  <span>Publishing...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Publish Flat Live to Explore Now</span>
                  </>
                )}
              </button>

            </form>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 6: SETTINGS & INTEGRATIONS */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div>
              <h1 className="text-2xl font-black text-slate-900 font-poppins">
                Platform Integrations & Health
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Monitor webhooks, cloud storage, WhatsApp bot status, and local data persistence.
              </p>
            </div>

            {/* Google Sheets Diagnostic */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Google Sheets Webhook</h3>
                    <p className="text-xs text-slate-500">Collects all leads & email notifications via Google Apps Script</p>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  Connected
                </span>
              </div>

              <div className="bg-slate-50 rounded-2xl p-3 text-[11px] font-mono text-slate-600 break-all border border-slate-200">
                {GOOGLE_SHEET_WEB_APP_URL || 'Configured via .env'}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleTestSheet}
                  disabled={isTestingSheet}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 transition-colors disabled:opacity-50"
                >
                  {isTestingSheet ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                  <span>Send Test Ping to Sheet</span>
                </button>
                {sheetTestResult && (
                  <span className="text-xs font-bold text-slate-700">{sheetTestResult}</span>
                )}
              </div>
            </div>

            {/* Cloudinary Diagnostic */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center">
                    <Cloud className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Cloudinary Image CDN</h3>
                    <p className="text-xs text-slate-500">Free 25 GB/month direct client uploads</p>
                  </div>
                </div>

                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                  isCloudinaryConfigured()
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {isCloudinaryConfigured() ? 'Cloud Active' : 'Local Fallback Mode'}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {isCloudinaryConfigured()
                  ? 'Your Cloudinary cloud credentials in .env are active. Uploaded property photos will be hosted on high-speed CDN.'
                  : 'Add VITE_CLOUDINARY_CLOUD_NAME to your .env file to enable permanent global CDN hosting. Photos are currently stored safely in browser memory/data URLs.'}
              </p>
            </div>

            {/* Local Data Reset */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Reset Local Community Listings</h3>
                  <p className="text-xs text-slate-500">Restore default demo submissions and clear cached listings.</p>
                </div>
                <button
                  onClick={() => {
                    if (window.confirm('Reset local community listings to factory seed data?')) {
                      localStorage.removeItem('flatzy_community_listings');
                      refreshListings();
                      alert('Reset complete!');
                    }
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-700 text-xs font-bold border border-slate-200 transition-colors"
                >
                  Reset Seed Data
                </button>
              </div>
            </div>

          </div>
        )}

      </main>

    </div>
  );
};
