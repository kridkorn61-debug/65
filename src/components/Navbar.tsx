import React, { useState } from 'react';
import { Volume2, VolumeX, ShieldAlert, ShieldCheck, Menu, X, Compass } from 'lucide-react';
import { soundManager } from '../utils/audioSynthesizer';
import { JurassicWorldLogo } from './JurassicWorldLogo';

export type PageId =
  | 'home'
  | 'map'
  | 'dinosaurs'
  | 'zones'
  | 'genetics'
  | 'safety'
  | 'about'
  | 'contact';

interface NavbarProps {
  currentPage: PageId;
  onPageChange: (page: PageId) => void;
  conditionRed: boolean;
  onToggleCondition: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onPageChange,
  conditionRed,
  onToggleCondition,
}) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    soundManager.setSoundEnabled(nextState);
    if (nextState) {
      soundManager.playTerminalClick();
    }
  };

  const navLinks: { id: PageId; labelTh: string; labelEn: string }[] = [
    { id: 'home', labelTh: 'หน้าแรก', labelEn: 'Overview' },
    { id: 'map', labelTh: 'แผนที่เกาะ', labelEn: 'Isla Nublar' },
    { id: 'dinosaurs', labelTh: 'ฐานข้อมูลไดโนเสาร์', labelEn: 'Species DB' },
    { id: 'zones', labelTh: 'โซนท่องเที่ยว', labelEn: 'Park Zones' },
    { id: 'genetics', labelTh: 'แล็บพันธุศาสตร์', labelEn: 'Genetics Lab' },
    { id: 'safety', labelTh: 'แผนฉุกเฉิน', labelEn: 'Safety & ACU' },
    { id: 'about', labelTh: 'เกี่ยวกับ InGen', labelEn: 'About Park' },
    { id: 'contact', labelTh: 'ติดต่อ & บริการ', labelEn: 'Guest Services' },
  ];

  const handleNavClick = (page: PageId) => {
    soundManager.playTerminalClick();
    onPageChange(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#040e09]/95 backdrop-blur-md border-b border-[#143d26]">
      {/* Top Bar Contract: 3 zones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Official Logo + Wordmark */}
        <JurassicWorldLogo
          size="md"
          subtitle="INGEN PARK GUIDE"
          onClick={() => handleNavClick('home')}
        />

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-medium text-slate-300">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors whitespace-nowrap py-1 relative cursor-pointer font-tech ${
                  isActive
                    ? 'text-amber-300 font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.labelTh}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions (Condition Alert, Sound Toggle, Mobile Hamburger) */}
        <div className="flex items-center gap-2.5">
          {/* Threat condition button */}
          <button
            onClick={() => {
              soundManager.playTerminalClick();
              onToggleCondition();
            }}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-tech font-semibold tracking-wider transition-all cursor-pointer ${
              conditionRed
                ? 'bg-rose-600/30 text-rose-300 border border-rose-500 animate-pulse'
                : 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/80 hover:bg-emerald-900/60'
            }`}
            title="จำลองระดับการเตือนภัยฉุกเฉิน (Security Threat Level)"
          >
            {conditionRed ? (
              <>
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                <span>CONDITION RED</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>CONDITION GREEN</span>
              </>
            )}
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded border text-xs transition-colors cursor-pointer ${
              soundEnabled
                ? 'bg-[#092216] border-[#1b4b30] text-amber-400 hover:text-amber-300'
                : 'bg-black/40 border-white/10 text-slate-500 hover:text-slate-400'
            }`}
            title={soundEnabled ? 'ปิดเสียงเอฟเฟกต์' : 'เปิดเสียงเอฟเฟกต์'}
            aria-label="Sound Toggle"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Quick Map Button for Desktop */}
          <button
            onClick={() => handleNavClick('map')}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-tech font-medium transition-colors cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>เปิดแผนที่</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded bg-black/40 border border-[#143d26] text-slate-300 hover:text-white"
            aria-label="เมนูหลัก"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#143d26] bg-[#05140d] px-4 py-4 space-y-2">
          {/* Mobile Threat Indicator */}
          <div className="pb-3 border-b border-[#143d26] flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">สถานะความปลอดภัย:</span>
            <button
              onClick={onToggleCondition}
              className={`px-3 py-1 rounded text-xs font-tech font-semibold ${
                conditionRed
                  ? 'bg-rose-600/30 text-rose-300 border border-rose-500'
                  : 'bg-emerald-950/60 text-emerald-300 border border-emerald-800'
              }`}
            >
              {conditionRed ? 'CONDITION RED (ฉุกเฉิน)' : 'CONDITION GREEN (ปกติ)'}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left px-3 py-2 rounded text-xs font-tech transition-colors ${
                    isActive
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                      : 'text-slate-300 hover:bg-[#092216]'
                  }`}
                >
                  <div>{link.labelTh}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{link.labelEn}</div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
