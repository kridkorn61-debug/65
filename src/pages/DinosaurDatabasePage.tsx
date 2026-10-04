import React, { useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  Volume2,
  ArrowUpDown,
  Dna,
  ShieldAlert,
  Ruler,
  Weight,
  Gauge,
  Eye,
  GitCompare,
  X,
} from 'lucide-react';
import { DINOSAURS_DATA, type Dinosaur } from '../data/dinosaurs';
import { DinosaurVisual } from '../components/DinosaurVisual';
import { DinosaurDetailModal } from '../components/DinosaurDetailModal';
import { soundManager } from '../utils/audioSynthesizer';

interface DinosaurDatabasePageProps {
  onNavigateToMapZone?: (zoneId: string) => void;
}

export const DinosaurDatabasePage: React.FC<DinosaurDatabasePageProps> = ({
  onNavigateToMapZone,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [threatFilter, setThreatFilter] = useState<number | 'all'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'length' | 'weight' | 'threat' | 'speed'>('threat');
  const [selectedDinoForModal, setSelectedDinoForModal] = useState<Dinosaur | null>(null);

  // Comparison State
  const [compareDino1, setCompareDino1] = useState<Dinosaur | null>(DINOSAURS_DATA[0]); // T-Rex
  const [compareDino2, setCompareDino2] = useState<Dinosaur | null>(DINOSAURS_DATA[7]); // Indominus Rex
  const [showCompareModal, setShowCompareModal] = useState(false);

  const categories = [
    { id: 'all', label: 'ทั้งหมด (13 สายพันธุ์)' },
    { id: 'carnivore', label: 'สัตว์กินเนื้อ (Carnivores)' },
    { id: 'herbivore', label: 'สัตว์กินพืช (Herbivores)' },
    { id: 'hybrid', label: 'ลูกผสม (Hybrids)' },
    { id: 'pterosaur', label: 'สัตว์ปีกดึกดำบรรพ์ (Pterosaurs)' },
    { id: 'marine', label: 'สัตว์เลื้อยคลานทะเล (Marine)' },
  ];

  const filteredDinosaurs = DINOSAURS_DATA.filter((dino) => {
    const matchesCategory =
      selectedCategory === 'all' || dino.category === selectedCategory;
    const matchesThreat =
      threatFilter === 'all' || dino.threatLevel === threatFilter;
    const matchesSearch =
      dino.nameTh.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dino.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dino.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dino.assetCode.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesThreat && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'length') return b.lengthMeters - a.lengthMeters;
    if (sortBy === 'weight') return b.weightTons - a.weightTons;
    if (sortBy === 'threat') return b.threatLevel - a.threatLevel;
    if (sortBy === 'speed') return b.speedKmh - a.speedKmh;
    return a.nameTh.localeCompare(b.nameTh, 'th');
  });

  const [playingDinoId, setPlayingDinoId] = useState<string | null>(null);

  const handlePlayRoar = (e: React.MouseEvent, dino: Dinosaur) => {
    e.stopPropagation();
    setPlayingDinoId(dino.id);
    soundManager.playSpeciesSound(dino.id, dino.roarFrequencyHz || 85);
    setTimeout(() => {
      setPlayingDinoId((prev) => (prev === dino.id ? null : prev));
    }, 1800);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#143d26] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <Dna className="w-3.5 h-3.5 text-emerald-400" />
            <span>INGEN GENETIC REPOSITORY // SPECIES ENCYCLOPEDIA</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-tech font-bold text-white mt-1">
            ฐานข้อมูลไดโนเสาร์และสิ่งมีชีวิตดึกดำบรรพ์
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            สารานุกรม 13 สายพันธุ์ที่ได้รับการฟื้นคืนชีพโดย InGen พร้อมข้อมูลพฤติกรรม สรีระ และระดับความอันตราย
          </p>
        </div>

        {/* Comparison Tool Button */}
        <button
          onClick={() => {
            soundManager.playTerminalClick();
            setShowCompareModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-tech font-semibold transition-colors cursor-pointer self-start sm:self-auto"
        >
          <GitCompare className="w-4 h-4 text-amber-400" />
          <span>เครื่องมือเปรียบเทียบไดโนเสาร์ (Comparison Tool)</span>
        </button>
      </div>

      {/* Filter and Control Ribbon */}
      <div className="space-y-3 bg-[#06150e] p-4 rounded-xl border border-[#143d26]">
        {/* Row 1: Search and Sort */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="ค้นหาตามชื่อภาษาไทย ภาษาอังกฤษ รหัสแอสเซ็ต เช่น T-Rex, ไทรเซอราทอปส์, ING-TRX..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#040e09] border border-[#153e28] text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="md:col-span-4 flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400 shrink-0">เรียงตาม:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="w-full py-2 px-3 rounded-lg bg-[#040e09] border border-[#153e28] text-xs text-slate-200 focus:outline-none focus:border-amber-400 font-tech"
            >
              <option value="threat">ระดับอันตราย (สูงไปต่ำ)</option>
              <option value="length">ความยาวลำตัว (ยาวไปสั้น)</option>
              <option value="weight">น้ำหนักตัว (หนักไปเบา)</option>
              <option value="speed">ความเร็วการวิ่ง (เร็วไปช้า)</option>
              <option value="name">ชื่อตามตัวอักษรไทย</option>
            </select>
          </div>
        </div>

        {/* Row 2: Category Tabs & Threat Filter */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 pt-2 border-t border-[#143d26]">
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none w-full lg:w-auto">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  soundManager.playTerminalClick();
                  setSelectedCategory(c.id);
                }}
                className={`px-3 py-1.5 rounded text-xs font-tech font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === c.id
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-[#092216] text-slate-300 hover:text-white border border-[#153e28]'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Threat Level Filter Buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[11px] font-mono text-slate-400">ระดับอันตราย:</span>
            <button
              onClick={() => setThreatFilter('all')}
              className={`px-2 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                threatFilter === 'all'
                  ? 'bg-slate-200 text-slate-950 font-bold'
                  : 'bg-[#040e09] text-slate-400 border border-[#153e28]'
              }`}
            >
              ทั้งหมด
            </button>
            {[1, 2, 3, 4, 5].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setThreatFilter(lvl)}
                className={`px-2 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                  threatFilter === lvl
                    ? lvl >= 5
                      ? 'bg-rose-600 text-white font-bold'
                      : lvl >= 4
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-emerald-600 text-white font-bold'
                    : 'bg-[#040e09] text-slate-400 border border-[#153e28]'
                }`}
              >
                Lv.{lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* InGen Bio-Acoustic Roar Soundboard */}
      <div className="rounded-xl bg-[#06150e] border border-amber-500/30 p-4 sm:p-5 space-y-3 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#143d26] pb-3">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
            <h2 className="text-sm sm:text-base font-tech font-bold text-white">
              แผงทดสอบคลื่นเสียงชีวภาพ 13 สายพันธุ์ (InGen Bio-Acoustic Soundboard)
            </h2>
          </div>
          <span className="text-[11px] font-mono text-emerald-400">
            ระบบเสียงสังเคราะห์ Web Audio API ความถี่ 45–520 Hz
          </span>
        </div>

        <p className="text-xs text-slate-300">
          คลิกที่ปุ่มชื่อไดโนเสาร์เพื่อทดสอบเสียงคำราม เสียงหวูด และเสียงสื่อสารของแต่ละสายพันธุ์ได้ทันที:
        </p>

        {/* 13 Dinosaur Sound Buttons */}
        <div className="flex flex-wrap gap-2 pt-1">
          {DINOSAURS_DATA.map((dino) => {
            const isPlaying = playingDinoId === dino.id;
            return (
              <button
                key={dino.id}
                onClick={(e) => handlePlayRoar(e, dino)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-tech transition-all cursor-pointer ${
                  isPlaying
                    ? 'bg-amber-500 text-slate-950 font-bold border border-amber-300 shadow-md ring-2 ring-amber-400/50 scale-105'
                    : 'bg-[#040e09] hover:bg-[#0a2719] text-slate-200 border border-[#153e28] hover:border-amber-500/50'
                }`}
                title={`ฟังเสียง: ${dino.nameTh}`}
              >
                <Volume2 className={`w-3.5 h-3.5 ${isPlaying ? 'animate-bounce text-slate-950' : 'text-amber-400'}`} />
                <span>{dino.nameTh.split(' (')[0]}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${isPlaying ? 'bg-slate-900 text-amber-300' : 'bg-black/50 text-emerald-400'}`}>
                  {dino.roarFrequencyHz || 85} Hz
                </span>
                {isPlaying && (
                  <span className="flex items-end gap-0.5 h-3">
                    <span className="w-0.5 bg-slate-950 rounded-full animate-[ping_0.5s_ease-in-out_infinite]" style={{ height: '70%' }} />
                    <span className="w-0.5 bg-slate-950 rounded-full animate-[ping_0.3s_ease-in-out_infinite]" style={{ height: '100%' }} />
                    <span className="w-0.5 bg-slate-950 rounded-full animate-[ping_0.7s_ease-in-out_infinite]" style={{ height: '50%' }} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dinosaur Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDinosaurs.map((dino) => {
          const threatBadgeColor =
            dino.threatLevel >= 5
              ? 'bg-rose-950/80 text-rose-300 border-rose-600/60'
              : dino.threatLevel >= 4
              ? 'bg-amber-950/80 text-amber-300 border-amber-600/60'
              : dino.threatLevel >= 3
              ? 'bg-yellow-950/80 text-yellow-300 border-yellow-600/60'
              : 'bg-emerald-950/80 text-emerald-300 border-emerald-600/60';

          return (
            <div
              key={dino.id}
              onClick={() => {
                soundManager.playTerminalClick();
                setSelectedDinoForModal(dino);
              }}
              className="group rounded-xl bg-[#06150e] border border-[#143d26] hover:border-amber-500/60 transition-all duration-300 hover:-translate-y-1 p-5 flex flex-col justify-between cursor-pointer shadow-lg"
            >
              <div className="space-y-4">
                {/* Visual Image/Silhouette Box */}
                <div className="h-48 w-full overflow-hidden rounded-lg">
                  <DinosaurVisual dinosaur={dino} className="w-full h-full" />
                </div>

                {/* Header Information */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                    <span className="text-slate-400">{dino.assetCode}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${threatBadgeColor}`}>
                      อันตรายระดับ {dino.threatLevel}
                    </span>
                  </div>

                  <h3 className="text-xl font-tech font-bold text-amber-300 group-hover:text-amber-200 transition-colors">
                    {dino.nameTh}
                  </h3>
                  <div className="text-xs font-mono text-slate-400 italic">
                    {dino.nameEn} · {dino.scientificName}
                  </div>
                </div>

                {/* Thai Short Summary */}
                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {dino.descriptionTh}
                </p>

                {/* Biological Metrics Ribbon */}
                <div className="grid grid-cols-3 gap-2 p-2.5 rounded-lg bg-[#040e09] border border-[#153e28] text-center text-xs">
                  <div>
                    <div className="text-[10px] text-slate-400 font-mono">ความยาว</div>
                    <div className="font-semibold text-slate-200 mt-0.5">{dino.lengthMeters} ม.</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-mono">น้ำหนัก</div>
                    <div className="font-semibold text-slate-200 mt-0.5">{dino.weightTons} ตัน</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-mono">ความเร็ว</div>
                    <div className="font-semibold text-emerald-400 mt-0.5">{dino.speedKmh} กม./ชม.</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons in Card Footer */}
              <div className="mt-5 pt-3 border-t border-[#143d26] flex items-center justify-between">
                <button
                  onClick={(e) => handlePlayRoar(e, dino)}
                  className={`flex items-center gap-1.5 text-xs font-tech px-2.5 py-1.5 rounded transition-all cursor-pointer ${
                    playingDinoId === dino.id
                      ? 'bg-amber-500 text-slate-950 font-bold border-amber-300 ring-2 ring-amber-400/40 shadow-md scale-105'
                      : 'bg-[#092216] hover:bg-[#0e3523] text-amber-400 hover:text-amber-300 border border-[#1e5837]'
                  }`}
                  title="ฟังเสียงคำรามจำลอง"
                >
                  <Volume2 className={`w-3.5 h-3.5 ${playingDinoId === dino.id ? 'animate-bounce text-slate-950' : 'text-amber-400'}`} />
                  <span>{playingDinoId === dino.id ? 'กำลังส่งเสียง...' : 'เสียงคำราม'}</span>
                  {playingDinoId === dino.id && (
                    <span className="flex items-end gap-0.5 h-3">
                      <span className="w-0.5 bg-slate-950 rounded-full animate-[ping_0.5s_ease-in-out_infinite]" style={{ height: '70%' }} />
                      <span className="w-0.5 bg-slate-950 rounded-full animate-[ping_0.3s_ease-in-out_infinite]" style={{ height: '100%' }} />
                      <span className="w-0.5 bg-slate-950 rounded-full animate-[ping_0.7s_ease-in-out_infinite]" style={{ height: '50%' }} />
                    </span>
                  )}
                </button>

                <span className="flex items-center gap-1 text-xs font-tech text-slate-300 group-hover:text-emerald-300 transition-colors">
                  <span>ข้อมูลฉบับเต็ม</span>
                  <Eye className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {filteredDinosaurs.length === 0 && (
        <div className="text-center py-16 bg-[#06150e] rounded-xl border border-[#143d26] space-y-2">
          <p className="text-sm font-tech text-slate-300">
            ไม่พบสายพันธุ์ไดโนเสาร์ที่ตรงกับเงื่อนไขการค้นหา
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setThreatFilter('all');
            }}
            className="text-xs font-tech text-amber-400 underline hover:text-amber-300"
          >
            ล้างตัวกรองทั้งหมด
          </button>
        </div>
      )}

      {/* Comparison Modal Tool */}
      {showCompareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl bg-[#081b12] border border-[#1b4b30] shadow-2xl p-6 text-slate-100 space-y-6">
            <div className="flex items-center justify-between border-b border-[#143d26] pb-3">
              <div className="flex items-center gap-2">
                <GitCompare className="w-5 h-5 text-amber-400" />
                <h3 className="text-xl font-tech font-bold text-amber-300">
                  เครื่องมือเปรียบเทียบขนาดและชีววิทยา (Dino Comparison Tool)
                </h3>
              </div>
              <button
                onClick={() => setShowCompareModal(false)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Select 2 Dinosaurs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-emerald-400 mb-1">
                  เลือกไดโนเสาร์ตัวที่ 1:
                </label>
                <select
                  value={compareDino1?.id || ''}
                  onChange={(e) => {
                    const match = DINOSAURS_DATA.find((d) => d.id === e.target.value);
                    if (match) setCompareDino1(match);
                  }}
                  className="w-full py-2 px-3 rounded bg-[#040e09] border border-[#143d26] text-xs font-tech text-slate-100"
                >
                  {DINOSAURS_DATA.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.nameTh} ({d.nameEn})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-amber-400 mb-1">
                  เลือกไดโนเสาร์ตัวที่ 2:
                </label>
                <select
                  value={compareDino2?.id || ''}
                  onChange={(e) => {
                    const match = DINOSAURS_DATA.find((d) => d.id === e.target.value);
                    if (match) setCompareDino2(match);
                  }}
                  className="w-full py-2 px-3 rounded bg-[#040e09] border border-[#143d26] text-xs font-tech text-slate-100"
                >
                  {DINOSAURS_DATA.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.nameTh} ({d.nameEn})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Comparison Visual Cards */}
            {compareDino1 && compareDino2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-[#05140d] border border-emerald-500/30 text-center space-y-2">
                    <h4 className="font-tech font-bold text-emerald-400 text-base">
                      {compareDino1.nameTh}
                    </h4>
                    <p className="text-xs text-slate-400 font-mono">{compareDino1.categoryTh}</p>
                    <div className="h-40 sm:h-48 w-full overflow-hidden rounded-lg">
                      <DinosaurVisual dinosaur={compareDino1} className="w-full h-full" showOverlay={false} />
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-[#05140d] border border-amber-500/30 text-center space-y-2">
                    <h4 className="font-tech font-bold text-amber-400 text-base">
                      {compareDino2.nameTh}
                    </h4>
                    <p className="text-xs text-slate-400 font-mono">{compareDino2.categoryTh}</p>
                    <div className="h-40 sm:h-48 w-full overflow-hidden rounded-lg">
                      <DinosaurVisual dinosaur={compareDino2} className="w-full h-full" showOverlay={false} />
                    </div>
                  </div>
                </div>

                {/* Dual Comparison Bars */}
                <div className="space-y-4 bg-[#05140d] p-4 rounded-lg border border-[#143d26] text-xs">
                  {/* Metric: Length */}
                  <div>
                    <div className="flex justify-between font-mono mb-1 text-slate-300">
                      <span className="text-emerald-400 font-semibold">{compareDino1.lengthMeters} ม.</span>
                      <span className="text-slate-400 uppercase">ความยาวลำตัว (Length)</span>
                      <span className="text-amber-400 font-semibold">{compareDino2.lengthMeters} ม.</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 h-3 bg-black/40 rounded overflow-hidden p-0.5">
                      <div
                        className="bg-emerald-500 rounded-sm ml-auto"
                        style={{ width: `${Math.min(100, (compareDino1.lengthMeters / 25) * 100)}%` }}
                      />
                      <div
                        className="bg-amber-400 rounded-sm"
                        style={{ width: `${Math.min(100, (compareDino2.lengthMeters / 25) * 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Metric: Weight */}
                  <div>
                    <div className="flex justify-between font-mono mb-1 text-slate-300">
                      <span className="text-emerald-400 font-semibold">{compareDino1.weightTons} ตัน</span>
                      <span className="text-slate-400 uppercase">น้ำหนักตัว (Weight)</span>
                      <span className="text-amber-400 font-semibold">{compareDino2.weightTons} ตัน</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 h-3 bg-black/40 rounded overflow-hidden p-0.5">
                      <div
                        className="bg-emerald-500 rounded-sm ml-auto"
                        style={{ width: `${Math.min(100, (compareDino1.weightTons / 40) * 100)}%` }}
                      />
                      <div
                        className="bg-amber-400 rounded-sm"
                        style={{ width: `${Math.min(100, (compareDino2.weightTons / 40) * 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Metric: Speed */}
                  <div>
                    <div className="flex justify-between font-mono mb-1 text-slate-300">
                      <span className="text-emerald-400 font-semibold">{compareDino1.speedKmh} กม./ชม.</span>
                      <span className="text-slate-400 uppercase">ความเร็วสูงสุด (Speed)</span>
                      <span className="text-amber-400 font-semibold">{compareDino2.speedKmh} กม./ชม.</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 h-3 bg-black/40 rounded overflow-hidden p-0.5">
                      <div
                        className="bg-emerald-500 rounded-sm ml-auto"
                        style={{ width: `${Math.min(100, (compareDino1.speedKmh / 70) * 100)}%` }}
                      />
                      <div
                        className="bg-amber-400 rounded-sm"
                        style={{ width: `${Math.min(100, (compareDino2.speedKmh / 70) * 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Metric: Threat Level */}
                  <div>
                    <div className="flex justify-between font-mono mb-1 text-slate-300">
                      <span className="text-emerald-400 font-semibold">ระดับ {compareDino1.threatLevel} / 5</span>
                      <span className="text-slate-400 uppercase">ระดับความอันตราย (Threat)</span>
                      <span className="text-amber-400 font-semibold">ระดับ {compareDino2.threatLevel} / 5</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 h-3 bg-black/40 rounded overflow-hidden p-0.5">
                      <div
                        className="bg-rose-500 rounded-sm ml-auto"
                        style={{ width: `${(compareDino1.threatLevel / 5) * 100}%` }}
                      />
                      <div
                        className="bg-rose-500 rounded-sm"
                        style={{ width: `${(compareDino2.threatLevel / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end pt-3 border-t border-[#143d26]">
              <button
                onClick={() => setShowCompareModal(false)}
                className="px-4 py-2 rounded bg-emerald-800 hover:bg-emerald-700 text-xs font-tech font-semibold text-white"
              >
                ปิดเครื่องมือเปรียบเทียบ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dinosaur Detail Modal */}
      <DinosaurDetailModal
        dinosaur={selectedDinoForModal}
        onClose={() => setSelectedDinoForModal(null)}
        onNavigateToMapZone={onNavigateToMapZone}
      />
    </div>
  );
};
