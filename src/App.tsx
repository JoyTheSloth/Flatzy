import React, { useState, useEffect } from 'react';
import type { Property, LocationName, BudgetRange, FilterState } from './types/property';
import { PROPERTIES_DATA } from './data/properties';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { RoleSelectionModal } from './components/RoleSelectionModal';
import { SavedFlatsDrawer } from './components/SavedFlatsDrawer';
import { MobileBottomCTA } from './components/MobileBottomCTA';

import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { LocationsPage } from './pages/LocationsPage';
import { ReelDiscoveryPage } from './pages/ReelDiscoveryPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('flatzy_saved_flats');
      return stored ? JSON.parse(stored) : ['prop-1', 'prop-9'];
    } catch {
      return ['prop-1', 'prop-9'];
    }
  });

  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryTargetProperty, setInquiryTargetProperty] = useState<Property | null>(null);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(true);

  // Quick filter presets for Explore page
  const [exploreFilterPreset, setExploreFilterPreset] = useState<Partial<FilterState>>({});

  // Persist saved flats to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('flatzy_saved_flats', JSON.stringify(savedPropertyIds));
    } catch {}
  }, [savedPropertyIds]);

  // Scroll to top whenever tab or property changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab, selectedProperty]);

  // Handle hash routing for browser navigation support
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash || hash === 'home') {
        setCurrentTab('home');
        setSelectedProperty(null);
      } else if (hash.startsWith('property/')) {
        const propIdOrSlug = hash.replace('property/', '');
        const found = PROPERTIES_DATA.find(p => p.slug === propIdOrSlug || p.id === propIdOrSlug);
        if (found) {
          setSelectedProperty(found);
          setCurrentTab('property-detail');
        }
      } else if (['explore', 'locations', 'reels', 'how-it-works', 'about', 'contact'].includes(hash)) {
        setCurrentTab(hash);
        setSelectedProperty(null);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (tab: string, extra?: any) => {
    setCurrentTab(tab);
    if (tab !== 'property-detail') {
      setSelectedProperty(null);
      window.location.hash = tab;
    }
  };

  const handleToggleSave = (propertyId: string) => {
    setSavedPropertyIds(prev => 
      prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property);
    setCurrentTab('property-detail');
    window.location.hash = `property/${property.slug}`;
  };

  const handleOpenInquiryModal = (property?: Property) => {
    setInquiryTargetProperty(property || null);
    setIsRoleModalOpen(true);
  };

  const handleApplyQuickFilter = (loc?: LocationName, budget?: BudgetRange) => {
    setExploreFilterPreset({
      locations: loc ? [loc] : [],
      budgetRange: budget || 'all',
    });
    navigateTo('explore');
  };

  const savedPropertiesList = PROPERTIES_DATA.filter(p => savedPropertyIds.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col bg-flatzy-cream text-flatzy-navy selection:bg-flatzy-yellow selection:text-flatzy-navy font-poppins pb-24 md:pb-0">
      
      {/* Top Main Navbar */}
      <Navbar
        currentTab={currentTab}
        onNavigate={navigateTo}
        savedCount={savedPropertyIds.length}
        onOpenSavedDrawer={() => setIsSavedDrawerOpen(true)}
        onOpenInquiryModal={() => handleOpenInquiryModal(selectedProperty || undefined)}
        onOpenRoleModal={() => setIsRoleModalOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            savedPropertyIds={savedPropertyIds}
            onToggleSave={handleToggleSave}
            onSelectProperty={handleSelectProperty}
            onOpenInquiryModal={handleOpenInquiryModal}
            onApplyQuickFilter={handleApplyQuickFilter}
          />
        )}

        {currentTab === 'explore' && (
          <ExplorePage
            initialFilters={exploreFilterPreset}
            savedPropertyIds={savedPropertyIds}
            onToggleSave={handleToggleSave}
            onSelectProperty={handleSelectProperty}
            onOpenInquiryModal={handleOpenInquiryModal}
          />
        )}

        {currentTab === 'property-detail' && selectedProperty && (
          <PropertyDetailPage
            property={selectedProperty}
            onBack={() => navigateTo('explore')}
            isSaved={savedPropertyIds.includes(selectedProperty.id)}
            onToggleSave={handleToggleSave}
            onOpenInquiryModal={handleOpenInquiryModal}
            onSelectProperty={handleSelectProperty}
          />
        )}

        {currentTab === 'locations' && (
          <LocationsPage
            onSelectLocation={(loc) => handleApplyQuickFilter(loc)}
            onOpenInquiryModal={() => handleOpenInquiryModal()}
          />
        )}

        {currentTab === 'reels' && (
          <ReelDiscoveryPage
            onSelectProperty={handleSelectProperty}
            onOpenInquiryModal={handleOpenInquiryModal}
            onNavigate={navigateTo}
          />
        )}

        {currentTab === 'how-it-works' && (
          <HowItWorksPage
            onNavigate={navigateTo}
            onOpenInquiryModal={() => handleOpenInquiryModal()}
          />
        )}

        {currentTab === 'about' && (
          <AboutPage
            onNavigate={navigateTo}
            onOpenInquiryModal={() => handleOpenInquiryModal()}
          />
        )}

        {currentTab === 'contact' && (
          <ContactPage
            onNavigate={navigateTo}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={navigateTo}
        onSelectLocation={(loc) => handleApplyQuickFilter(loc)}
        onOpenInquiryModal={() => handleOpenInquiryModal()}
      />

      {/* Unified Inquiry & Role Selection Modal (Renter/Buyer vs Broker) */}
      <RoleSelectionModal
        isOpen={isRoleModalOpen}
        targetProperty={inquiryTargetProperty}
        onClose={() => {
          setIsRoleModalOpen(false);
          setInquiryTargetProperty(null);
        }}
        onApplyFilters={(loc, budget) => {
          setIsRoleModalOpen(false);
          setInquiryTargetProperty(null);
          handleApplyQuickFilter(loc, budget);
        }}
      />

      {/* Saved / Bookmarked Flats Drawer */}
      <SavedFlatsDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedProperties={savedPropertiesList}
        onRemoveSaved={handleToggleSave}
        onClearAll={() => setSavedPropertyIds([])}
        onSelectProperty={handleSelectProperty}
        onOpenInquiryModal={handleOpenInquiryModal}
        onNavigate={navigateTo}
      />

      {/* Mobile App Bottom Navigation Bar */}
      <MobileBottomCTA
        currentTab={currentTab}
        onNavigate={navigateTo}
        onOpenInquiryModal={() => handleOpenInquiryModal(selectedProperty || undefined)}
        savedCount={savedPropertyIds.length}
        onOpenSavedDrawer={() => setIsSavedDrawerOpen(true)}
      />

    </div>
  );
}

export default App;
