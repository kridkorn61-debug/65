import React, { useState } from 'react';
import { Compass, Dna, ShieldAlert, Sparkles, ArrowRight, Activity, Users, Zap, CheckCircle2, ChevronRight, Eye, Volume2 } from 'lucide-react';
import type { PageId } from '../components/Navbar';
import { DINOSAURS_DATA, type Dinosaur } from '../data/dinosaurs';
import { DinosaurVisual } from '../components/DinosaurVisual';
import { DinosaurDetailModal } from '../components/DinosaurDetailModal';
import { JurassicWorldLogo } from '../components/JurassicWorldLogo';
import { soundManager } from '../utils/audioSynthesizer';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onNavigateToMapZone?: (zoneId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onNavigateToMapZone }) => {
  const [selectedDino, setSelectedDino] = useState<Dinosaur | null>(null);
  const [playingDinoId, setPlayingDinoId] = useState<string | null>(null);

  const handlePlayRoar = (e: React.MouseEvent, dino: Dinosaur) => {
    e.stopPropagation();
    setPlayingDinoId(dino.id);
    soundManager.playSpeciesSound(dino.id, dino.roarFrequencyHz || 85);
    setTimeout(() => {
      setPlayingDinoId((prev) => (prev === dino.id ? null : prev));
    }, 1800);
  };

  const heroImage = '/assets/images/jw_hero_jurassic_gate_1791074467515.jpg';
  const amberImage = '/assets/images/jw_amber_mosquito_dna_1791074492855.jpg';

  // Highlight 4 iconic dinosaurs for homepage spotlight
  const featuredDinos = DINOSAURS_DATA.filter((d) =>
    ['t-rex', 'velociraptor', 'mosasaurus', 'indominus-rex'].includes(d.id)
  );

  const stats = [
    { label: 'สิ่งมีชีวิตที่ฟื้นคืนชีพ', value: '13', unit: 'สายพันธุ์หลัก', icon: Dna },
    { label: 'โซนท่องเที่ยว & วิจัย', value: '10', unit: 'โซนรอบเกาะ', icon: Compass },
    { label: 'ความเสถียรระบบรั้วไฟฟ้า', value: '99.98', unit: '% Nominal', icon: Zap },
    { label: 'ความจุนักท่องเที่ยวรายวัน', value: '25,000', unit: 'คน / วัน', icon: Users },
  ];

  return (
    <div className="w-full space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative w-full min-h-[580px] lg:h-[640px] flex items-center overflow-hidden border-b border-[#143d26]">
        {/* Background Image with Cinematic Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Jurassic World Main Gates"
            className="w-full h-full object-cover object-center brightness-75 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#040e09] via-[#040e09]/70 to-[#040e09]/40" />
          <div className="absolute inset-0 bg-radar-grid opacity-20 pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 w-full">
          <div className="max-w-3xl space-y-6">
            {/* High-tech Kicker */}
            <div className="flex items-center gap-2 text-xs font-mono text-amber-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="px-2 py-0.5 rounded bg-black/60 border border-amber-500/30">
                INGEN FACILITY // ISLA NUBLAR RESEARCH HUB
              </span>
              <span className="hidden sm:inline text-slate-400">·</span>
              <span className="hidden sm:inline text-slate-300">ศูนย์วิจัยและคู่มือนำเที่ยวอย่างเป็นทางการ</span>
            </div>

            {/* Official Jurassic World Brand Emblem */}
            <div className="flex items-center gap-4 py-1">
              <JurassicWorldLogo
                size="xl"
                subtitle="INGEN RESEARCH & EDUCATIONAL PARK GUIDE // ISLA NUBLAR"
              />
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-tech font-bold text-white tracking-tight leading-tight">
              ศูนย์วิจัยพันธุศาสตร์ & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-emerald-400">
                คู่มือนำเที่ยว Jurassic World
              </span>
            </h1>

            {/* Sub-description */}
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl font-normal">
              ยินดีต้อนรับสู่ศูนย์กลางการเรียนรู้และการผจญภัยยุคจูราสสิคเต็มรูปแบบ ที่ซึ่งอดีตไม่ได้เป็นเพียงความทรงจำ และอนาคตกำลังรอให้คุณมาสัมผัส 
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  soundManager.playTerminalClick();
                  onNavigate('map');
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-tech font-bold text-sm tracking-wide transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-slate-950" />
                <span>สำรวจแผนที่เกาะอิสลานูบลาร์</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playTerminalClick();
                  onNavigate('dinosaurs');
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#092216]/90 hover:bg-[#0e3523] border border-[#1e5837] text-slate-100 font-tech font-semibold text-sm tracking-wide transition-all cursor-pointer"
              >
                <Dna className="w-4 h-4 text-emerald-400" />
                <span>เปิดฐานข้อมูลไดโนเสาร์</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Ticker */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-xl bg-[#06150e] border border-[#143d26]">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="p-3 border-l-2 border-amber-500/60 pl-4 space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <Icon className="w-3.5 h-3.5 text-amber-400" />
                  <span>{s.label}</span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-tech font-bold text-white tabular-nums">
                    {s.value}
                  </span>
                  <span className="text-xs font-mono text-emerald-400">{s.unit}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Dinosaurs Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#143d26] pb-4">
          <div>
            <div className="text-xs font-mono text-amber-400 uppercase tracking-wider">
              สายพันธุ์เด่นประจำพาร์ค (FEATURED ASSETS)
            </div>
            <h2 className="text-2xl sm:text-3xl font-tech font-bold text-slate-100 mt-1">
              สิ่งมีชีวิตดึกดำบรรพ์ไฮไลต์
            </h2>
          </div>
          <button
            onClick={() => onNavigate('dinosaurs')}
            className="flex items-center gap-1.5 text-xs font-tech text-amber-400 hover:text-amber-300 font-semibold cursor-pointer group"
          >
            <span>ดูครบทั้ง 13 สายพันธุ์</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredDinos.map((dino) => (
            <div
              key={dino.id}
              onClick={() => {
                soundManager.playTerminalClick();
                setSelectedDino(dino);
              }}
              className="group relative rounded-xl bg-[#06150e] border border-[#143d26] hover:border-amber-500/60 p-4 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="h-44 w-full overflow-hidden rounded-lg">
                  <DinosaurVisual dinosaur={dino} className="w-full h-full" />
                </div>
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                    <span>{dino.assetCode}</span>
                    <span className="text-emerald-400 font-semibold">{dino.categoryTh.split(' ')[0]}</span>
                  </div>
                  <h3 className="text-lg font-tech font-bold text-amber-300 group-hover:text-amber-200 transition-colors">
                    {dino.nameTh}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 mt-1 leading-relaxed">
                    {dino.descriptionTh}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#143d26] flex items-center justify-between text-xs font-tech">
                <button
                  onClick={(e) => handlePlayRoar(e, dino)}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs transition-all cursor-pointer ${
                    playingDinoId === dino.id
                      ? 'bg-amber-500 text-slate-950 font-bold border border-amber-300'
                      : 'bg-[#092216] hover:bg-[#0e3523] text-amber-400 border border-[#1e5837]'
                  }`}
                  title="ฟังเสียงคำราม"
                >
                  <Volume2 className={`w-3.5 h-3.5 ${playingDinoId === dino.id ? 'animate-bounce text-slate-950' : 'text-amber-400'}`} />
                  <span>{playingDinoId === dino.id ? 'คำราม...' : 'ฟังเสียง'}</span>
                </button>

                <span className="flex items-center gap-1 text-emerald-400 font-mono text-[11px] group-hover:text-amber-300 transition-colors">
                  <Eye className="w-3.5 h-3.5" />
                  <span>สเปก</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Genetics Lab Amber Discovery Feature */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-2xl bg-gradient-to-r from-[#061810] via-[#082015] to-[#040e09] border border-[#18452b] p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>INGEN HAMMOND CREATION LAB // DNA RECOVERY</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-tech font-bold text-white leading-snug">
              การคืนชีพจากอำพันล้านปี: <br />
              <span className="text-amber-300">จากยุงโบราณสู่ไดโนเสาร์มีชีวิต</span>
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              ย้อนเวลากว่า 65 ล้านปี ยุงดึกดำบรรพ์ที่ดูดเลือดไดโนเสาร์ได้ถูกกักขังไว้ในยางไม้จนกลายเป็นก้อนอำพันบริสุทธิ์ นักวิทยาศาสตร์ของ InGen ได้ทำการเจาะสกัดตัวอย่างเลือด สกัดดีเอ็นเอที่สมบูรณ์ และเติมเต็มรหัสพันธุกรรมที่สูญหายด้วยยีนของกบลูกศรพิษเขตร้อน
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="flex items-start gap-2 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>การสกัด DNA ด้วยหัวเจาะเพชรระดับไมครอน</span>
              </div>
              <div className="flex items-start gap-2 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>การต่อลำดับเบสด้วย Supercomputer InGen</span>
              </div>
              <div className="flex items-start gap-2 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>การฟักไข่ในตู้อบปรับแรงดันบรรยากาศโบราณ</span>
              </div>
              <div className="flex items-start gap-2 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>โปรแกรมควบคุมประชากร (ไร้การผสมพันธุ์ตามธรรมชาติ)</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  soundManager.playTerminalClick();
                  onNavigate('genetics');
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-700/80 hover:bg-emerald-600 text-white font-tech font-semibold text-sm transition-colors cursor-pointer"
              >
                <span>ทดลองจำลองการสังเคราะห์ DNA ในแล็บ</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative h-72 sm:h-80 rounded-xl overflow-hidden border border-amber-500/40 shadow-2xl">
            <img
              src={amberImage}
              alt="Prehistoric Mosquito trapped in Amber"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040e09]/80 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 text-xs font-mono text-amber-300/90 bg-black/60 backdrop-blur-sm p-2 rounded border border-amber-500/20">
              ตัวอย่างฟอสซิลอำพัน INGEN-AMB-84 #DOMINICAN_REPUBLIC
            </div>
          </div>
        </div>
      </section>

      {/* 4 Feature Hub Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
            ระบบนำทางศูนย์วิจัย & พาร์ค
          </div>
          <h2 className="text-2xl sm:text-3xl font-tech font-bold text-white mt-1">
            เข้าถึงข้อมูลสำคัญของเกาะอิสลานูบลาร์
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => onNavigate('map')}
            className="text-left p-6 rounded-xl bg-[#06150e] border border-[#143d26] hover:border-amber-500/60 transition-all duration-200 hover:-translate-y-1 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-base font-tech font-bold text-slate-100 group-hover:text-amber-300">
              แผนที่อินเทอร์แอคทีฟ
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              ซูมและสำรวจตำแหน่งกรงทีเร็กซ์ ลากูน กรงนกยักษ์ และสถานีรถไฟโมโนเรลทั่วเกาะ
            </p>
          </button>

          <button
            onClick={() => onNavigate('zones')}
            className="text-left p-6 rounded-xl bg-[#06150e] border border-[#143d26] hover:border-amber-500/60 transition-all duration-200 hover:-translate-y-1 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-tech font-bold text-slate-100 group-hover:text-amber-300">
              โซนท่องเที่ยว & เครื่องเล่น
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              คู่มือเครื่องเล่น ลูกบอลไจโรสเฟียร์ เรือสำรวจครีเทเชียส และโรงแรมริมลากูน
            </p>
          </button>

          <button
            onClick={() => onNavigate('safety')}
            className="text-left p-6 rounded-xl bg-[#06150e] border border-[#143d26] hover:border-amber-500/60 transition-all duration-200 hover:-translate-y-1 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-950 border border-emerald-800 flex items-center justify-center text-rose-400 mb-4 group-hover:scale-110 transition-transform">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="text-base font-tech font-bold text-slate-100 group-hover:text-amber-300">
              มาตรการความปลอดภัย ACU
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              ขั้นตอนปฏิบัติตนเมื่อเกิดภาวะฉุกเฉิน ตำแหน่งหลุมหลบภัย และสัญญาณไซเรน
            </p>
          </button>

          <button
            onClick={() => onNavigate('contact')}
            className="text-left p-6 rounded-xl bg-[#06150e] border border-[#143d26] hover:border-amber-500/60 transition-all duration-200 hover:-translate-y-1 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-950 border border-emerald-800 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-base font-tech font-bold text-slate-100 group-hover:text-amber-300">
              จองตั๋ว & บริการนักท่องเที่ยว
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              แพ็กเกจบัตรผ่าน ตารางเรือข้ามฟากจากคอสตาริกา และคำถามที่พบบ่อย (FAQ)
            </p>
          </button>
        </div>
      </section>

      {/* Dinosaur Detail Modal */}
      <DinosaurDetailModal
        dinosaur={selectedDino}
        onClose={() => setSelectedDino(null)}
        onNavigateToMapZone={onNavigateToMapZone}
      />
    </div>
  );
};
