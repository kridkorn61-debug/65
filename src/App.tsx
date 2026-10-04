/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, type PageId } from './components/Navbar';
import { EmergencyBanner } from './components/EmergencyBanner';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { InteractiveMapPage } from './pages/InteractiveMapPage';
import { DinosaurDatabasePage } from './pages/DinosaurDatabasePage';
import { ParkZonesPage } from './pages/ParkZonesPage';
import { GeneticsLabPage } from './pages/GeneticsLabPage';
import { SafetyProtocolsPage } from './pages/SafetyProtocolsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { soundManager } from './utils/audioSynthesizer';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [conditionRed, setConditionRed] = useState<boolean>(false);
  const [selectedMapZoneId, setSelectedMapZoneId] = useState<string | null>(null);

  // Scroll to top whenever the page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleToggleCondition = () => {
    const nextCondition = !conditionRed;
    setConditionRed(nextCondition);
    if (nextCondition) {
      soundManager.playAlertSiren();
    } else {
      soundManager.playTerminalClick();
    }
  };

  const handleNavigateToMapZone = (zoneId: string) => {
    setSelectedMapZoneId(zoneId);
    setCurrentPage('map');
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-500 ${
        conditionRed ? 'bg-[#080203]' : 'bg-[#040e09]'
      }`}
    >
      {/* Red Alert Ambient Glow Overlay */}
      {conditionRed && (
        <div className="fixed inset-0 pointer-events-none z-50 ring-4 ring-inset ring-rose-600/40 animate-pulse" />
      )}

      {/* Sticky Responsive Navbar */}
      <Navbar
        currentPage={currentPage}
        onPageChange={(page) => {
          setSelectedMapZoneId(null);
          setCurrentPage(page);
        }}
        conditionRed={conditionRed}
        onToggleCondition={handleToggleCondition}
      />

      {/* Global Emergency Alert Banner */}
      <EmergencyBanner
        conditionRed={conditionRed}
        onDismiss={() => setConditionRed(false)}
        onNavigateToSafety={() => setCurrentPage('safety')}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full relative">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={(page) => {
              setSelectedMapZoneId(null);
              setCurrentPage(page);
            }}
            onNavigateToMapZone={handleNavigateToMapZone}
          />
        )}

        {currentPage === 'map' && (
          <InteractiveMapPage initialZoneId={selectedMapZoneId} />
        )}

        {currentPage === 'dinosaurs' && (
          <DinosaurDatabasePage onNavigateToMapZone={handleNavigateToMapZone} />
        )}

        {currentPage === 'zones' && (
          <ParkZonesPage onNavigateToMapZone={handleNavigateToMapZone} />
        )}

        {currentPage === 'genetics' && <GeneticsLabPage />}

        {currentPage === 'safety' && (
          <SafetyProtocolsPage
            conditionRed={conditionRed}
            onToggleCondition={handleToggleCondition}
            onNavigateToMapZone={handleNavigateToMapZone}
          />
        )}

        {currentPage === 'about' && <AboutPage />}

        {currentPage === 'contact' && <ContactPage />}
      </main>

      {/* Official InGen Footer */}
      <Footer
        onPageChange={(page) => {
          setSelectedMapZoneId(null);
          setCurrentPage(page);
        }}
      />
    </div>
  );
}
