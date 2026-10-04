import React, { useState, useEffect } from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Search,
  Filter,
  MapPin,
  ShieldAlert,
  ShieldCheck,
  Compass,
  Radio,
  ExternalLink,
  Volume2,
  X,
  Users,
  Clock,
  Layers,
} from 'lucide-react';
import { PARK_ZONES_DATA, type ParkZone } from '../data/parkZones';
import { DINOSAURS_DATA, type Dinosaur } from '../data/dinosaurs';
import { DinosaurDetailModal } from '../components/DinosaurDetailModal';
import { soundManager } from '../utils/audioSynthesizer';

interface InteractiveMapPageProps {
  initialZoneId?: string | null;
  onSelectDinoFromMap?: (dinoId: string) => void;
}

export const InteractiveMapPage: React.FC<InteractiveMapPageProps> = ({
  initialZoneId,
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [selectedZone, setSelectedZone] = useState<ParkZone | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'paddock' | 'attraction' | 'restricted' | 'facility'>('all');
  const [selectedDinoForModal, setSelectedDinoForModal] = useState<Dinosaur | null>(null);

  const mapBgImage = '/assets/images/jw_tactical_map_isla_nublar_1791074479959.jpg';

  // Handle incoming initialZoneId prop
  useEffect(() => {
    if (initialZoneId) {
      const match = PARK_ZONES_DATA.find((z) => z.id === initialZoneId);
      if (match) {
        setSelectedZone(match);
        setZoomLevel(1.3);
      }
    }
  }, [initialZoneId]);

  const handleZoom = (delta: number) => {
    soundManager.playTerminalClick();
    setZoomLevel((prev) => Math.min(2.2, Math.max(0.8, prev + delta)));
  };

  const handleReset = () => {
    soundManager.playTerminalClick();
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleSelectZone = (zone: ParkZone) => {
    soundManager.playSonarPing();
    setSelectedZone(zone);
  };

  const filteredZones = PARK_ZONES_DATA.filter((zone) => {
    const matchesCategory = categoryFilter === 'all' || zone.category === categoryFilter;
    const matchesSearch =
      zone.nameTh.toLowerCase().includes(searchQuery.toLowerCase()) ||
      zone.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      zone.taglineTh.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Page Title & Status Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#143d26] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
            <span>INGEN CARTOGRAPHY DEPT // SATELLITE TELEMETRY LINK ACTIVE</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-tech font-bold text-white mt-1">
            แผนที่ดาวเทียมเกาะอิสลานูบลาร์ (Isla Nublar Tactical Map)
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            สำรวจตำแหน่งกรงควบคุมสัตว์ดึกดำบรรพ์ อารีน่าทางทะเล โดมกรงนก และเส้นทางเดินรถโมโนเรล
          </p>
        </div>

        {/* Live Island Coordinates */}
        <div className="bg-[#06150e] p-3 rounded-lg border border-[#143d26] flex items-center gap-3 text-xs font-mono">
          <Compass className="w-4 h-4 text-amber-400" />
          <div>
            <div className="text-slate-400 text-[10px]">พิกัดดาวเทียม INGEN-SAT 4</div>
            <div className="text-amber-300 font-semibold">08°31'12"N, 83°43'12"W</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 bg-[#06150e] p-3 rounded-xl border border-[#143d26]">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="ค้นหาโซน กรง หรือสถานที่ เช่น T-Rex, ลากูน, ไจโรสเฟียร์..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#040e09] border border-[#153e28] text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Category Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
          <button
            onClick={() => {
              soundManager.playTerminalClick();
              setCategoryFilter('all');
            }}
            className={`px-3 py-1.5 rounded text-xs font-tech font-medium whitespace-nowrap transition-colors cursor-pointer ${
              categoryFilter === 'all'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-[#092216] text-slate-300 hover:text-white border border-[#153e28]'
            }`}
          >
            ทั้งหมด ({PARK_ZONES_DATA.length})
          </button>
          <button
            onClick={() => {
              soundManager.playTerminalClick();
              setCategoryFilter('paddock');
            }}
            className={`px-3 py-1.5 rounded text-xs font-tech font-medium whitespace-nowrap transition-colors cursor-pointer ${
              categoryFilter === 'paddock'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-[#092216] text-slate-300 hover:text-white border border-[#153e28]'
            }`}
          >
            กรงควบคุมสัตว์
          </button>
          <button
            onClick={() => {
              soundManager.playTerminalClick();
              setCategoryFilter('attraction');
            }}
            className={`px-3 py-1.5 rounded text-xs font-tech font-medium whitespace-nowrap transition-colors cursor-pointer ${
              categoryFilter === 'attraction'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-[#092216] text-slate-300 hover:text-white border border-[#153e28]'
            }`}
          >
            เครื่องเล่น & อารีน่า
          </button>
          <button
            onClick={() => {
              soundManager.playTerminalClick();
              setCategoryFilter('facility');
            }}
            className={`px-3 py-1.5 rounded text-xs font-tech font-medium whitespace-nowrap transition-colors cursor-pointer ${
              categoryFilter === 'facility'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-[#092216] text-slate-300 hover:text-white border border-[#153e28]'
            }`}
          >
            ศูนย์การเรียนรู้ & แล็บ
          </button>
          <button
            onClick={() => {
              soundManager.playTerminalClick();
              setCategoryFilter('restricted');
            }}
            className={`px-3 py-1.5 rounded text-xs font-tech font-medium whitespace-nowrap transition-colors cursor-pointer ${
              categoryFilter === 'restricted'
                ? 'bg-rose-600 text-white font-bold'
                : 'bg-[#092216] text-rose-300 hover:text-white border border-rose-900/60'
            }`}
          >
            เขตหวงห้าม
          </button>
        </div>
      </div>

      {/* Main Map Canvas and Sidebar Inspector Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[580px]">
        {/* Interactive Map Canvas Container (Col 8) */}
        <div className="lg:col-span-8 relative rounded-xl overflow-hidden bg-[#020905] border border-[#18452b] h-[520px] sm:h-[620px] shadow-2xl flex items-center justify-center select-none group">
          {/* Zoom & Pan Stage */}
          <div
            className="w-full h-full relative transition-transform duration-300 ease-out origin-center"
            style={{
              transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`,
            }}
          >
            {/* Satellite Background */}
            <img
              src={mapBgImage}
              alt="Isla Nublar Satellite Tactical Map"
              className="w-full h-full object-cover object-center pointer-events-none opacity-90"
              referrerPolicy="no-referrer"
            />

            {/* Tactical Grid Overlay */}
            <div className="absolute inset-0 bg-radar-grid opacity-35 pointer-events-none" />

            {/* Rotating Radar Sweep Line from Center */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
              <div className="w-[500px] h-[500px] rounded-full border border-emerald-500/20 relative animate-radar">
                <div className="absolute top-1/2 left-1/2 w-[250px] h-[1px] bg-gradient-to-r from-emerald-400 to-transparent origin-left" />
              </div>
            </div>

            {/* Monorail Circuit Line (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path
                d="M 62 78 L 58 64 L 53 70 L 42 55 L 30 45 L 50 35 L 58 64"
                fill="none"
                stroke="#d4af37"
                strokeWidth="0.4"
                strokeDasharray="1.2,1.2"
                opacity="0.7"
              />
            </svg>

            {/* Interactive Hotspot Waypoints */}
            {filteredZones.map((zone) => {
              const isSelected = selectedZone?.id === zone.id;
              const isRestricted = zone.category === 'restricted';
              return (
                <div
                  key={zone.id}
                  style={{
                    left: `${zone.mapCoords.x}%`,
                    top: `${zone.mapCoords.y}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
                  onClick={() => handleSelectZone(zone)}
                >
                  {/* Ping Animation Ring */}
                  <div
                    className={`absolute -inset-2 rounded-full animate-beacon pointer-events-none ${
                      isRestricted ? 'bg-rose-500/30' : 'bg-amber-400/30'
                    }`}
                  />

                  {/* Hotspot Button */}
                  <div
                    className={`relative px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-lg transition-transform duration-200 hover:scale-110 ${
                      isSelected
                        ? 'bg-amber-400 text-slate-950 font-bold ring-2 ring-amber-300 scale-110'
                        : isRestricted
                        ? 'bg-rose-950/90 text-rose-200 border border-rose-500'
                        : 'bg-[#040e09]/90 text-slate-100 border border-[#1e5837] hover:border-amber-400'
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        isRestricted ? 'bg-rose-400 animate-ping' : 'bg-amber-400'
                      }`}
                    />
                    <span className="text-[10px] sm:text-xs font-tech whitespace-nowrap">
                      {zone.nameTh.split('(')[0]}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Map HUD Controls (Top Left) */}
          <div className="absolute top-4 left-4 z-30 flex items-center gap-1 bg-[#040e09]/85 backdrop-blur-md p-1.5 rounded-lg border border-[#143d26] text-slate-300">
            <button
              onClick={() => handleZoom(0.2)}
              className="p-1.5 hover:text-white hover:bg-emerald-950/80 rounded transition-colors cursor-pointer"
              title="ขยายแผนที่ (Zoom In)"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleZoom(-0.2)}
              className="p-1.5 hover:text-white hover:bg-emerald-950/80 rounded transition-colors cursor-pointer"
              title="ย่อแผนที่ (Zoom Out)"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleReset}
              className="p-1.5 hover:text-white hover:bg-emerald-950/80 rounded transition-colors cursor-pointer"
              title="รีเซ็ตมุมมอง (Reset View)"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <div className="px-2 text-[10px] font-mono text-emerald-400 border-l border-[#143d26]">
              {Math.round(zoomLevel * 100)}%
            </div>
          </div>

          {/* Compass Rose & Telemetry (Bottom Left) */}
          <div className="absolute bottom-4 left-4 z-30 bg-[#040e09]/85 backdrop-blur-md px-3 py-2 rounded-lg border border-[#143d26] text-[10px] font-mono text-slate-400 space-y-0.5">
            <div className="text-emerald-400 font-semibold">GRID SECTOR: 08-B // ISLA NUBLAR</div>
            <div>MONORAIL TRANSIT: ACTIVE</div>
          </div>

          {/* Legend (Bottom Right) */}
          <div className="absolute bottom-4 right-4 z-30 hidden sm:flex items-center gap-3 bg-[#040e09]/85 backdrop-blur-md px-3 py-2 rounded-lg border border-[#143d26] text-[10px] font-tech text-slate-300">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>โซนท่องเที่ยว</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>เขตหวงห้าม (Restricted)</span>
            </div>
          </div>
        </div>

        {/* Selected Zone Side Inspector (Col 4) */}
        <div className="lg:col-span-4 bg-[#06150e] rounded-xl border border-[#143d26] p-5 flex flex-col justify-between overflow-y-auto max-h-[620px] shadow-xl">
          {selectedZone ? (
            <div className="space-y-5">
              {/* Header */}
              <div className="flex items-start justify-between gap-3 border-b border-[#143d26] pb-3">
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400">
                    <span className="px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-800">
                      {selectedZone.categoryTh}
                    </span>
                    <span>·</span>
                    <span
                      className={`font-semibold ${
                        selectedZone.threatStatus === 'restricted'
                          ? 'text-rose-400'
                          : 'text-emerald-400'
                      }`}
                    >
                      {selectedZone.threatStatusTh}
                    </span>
                  </div>
                  <h3 className="text-xl font-tech font-bold text-amber-300 mt-1">
                    {selectedZone.nameTh}
                  </h3>
                  <p className="text-xs font-mono text-slate-400">{selectedZone.nameEn}</p>
                </div>
                <button
                  onClick={() => setSelectedZone(null)}
                  className="p-1 rounded text-slate-400 hover:text-white hover:bg-black/40"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Zone Photo in Inspector */}
              {selectedZone.image && (
                <div className="relative h-36 w-full rounded-lg overflow-hidden border border-[#143d26]">
                  <img
                    src={selectedZone.image}
                    alt={selectedZone.nameTh}
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06150e] via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 text-[10px] font-mono text-emerald-300 bg-black/60 px-1.5 py-0.5 rounded border border-white/10">
                    INGEN SURVEILLANCE FEED: {selectedZone.id.toUpperCase()}
                  </div>
                </div>
              )}

              {/* Tagline */}
              <div className="p-2.5 rounded-lg bg-[#040e09] border border-[#153e28] text-xs text-amber-200/90 font-medium">
                "{selectedZone.taglineTh}"
              </div>

              {/* Description */}
              <p className="text-xs leading-relaxed text-slate-300">
                {selectedZone.descriptionTh}
              </p>

              {/* Operational Specs */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded bg-[#040e09] border border-[#153e28]">
                  <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>เวลาเปิดทำการ</span>
                  </div>
                  <div className="font-semibold text-slate-200 mt-0.5 text-[11px]">
                    {selectedZone.openHoursTh}
                  </div>
                </div>

                <div className="p-2 rounded bg-[#040e09] border border-[#153e28]">
                  <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400">
                    <Users className="w-3 h-3 text-amber-400" />
                    <span>ความจุนักท่องเที่ยว</span>
                  </div>
                  <div className="font-semibold text-slate-200 mt-0.5 text-[11px]">
                    {selectedZone.capacityGuests.toLocaleString()} คน
                  </div>
                </div>
              </div>

              {/* Facility Specs Box */}
              <div className="space-y-1.5 p-3 rounded-lg bg-[#040e09] border border-[#153e28] text-xs">
                <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
                  สเปกสิ่งปลูกสร้าง (ENGINEERING SPECS)
                </div>
                {selectedZone.facilitySpecs.fenceVoltage && (
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-500">ระบบรั้วกั้น:</span>
                    <span className="font-mono text-amber-300">
                      {selectedZone.facilitySpecs.fenceVoltage}
                    </span>
                  </div>
                )}
                {selectedZone.facilitySpecs.viewingGlassThickness && (
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-500">ความหนากระจกชมวิว:</span>
                    <span className="font-mono text-emerald-300">
                      {selectedZone.facilitySpecs.viewingGlassThickness}
                    </span>
                  </div>
                )}
                {selectedZone.facilitySpecs.submersibleDepth && (
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-500">ความลึกอารีน่า:</span>
                    <span className="font-mono text-cyan-300">
                      {selectedZone.facilitySpecs.submersibleDepth}
                    </span>
                  </div>
                )}
                {selectedZone.facilitySpecs.areaSize && (
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-500">ขนาดพื้นที่:</span>
                    <span className="font-mono text-slate-300">
                      {selectedZone.facilitySpecs.areaSize}
                    </span>
                  </div>
                )}
              </div>

              {/* Highlights */}
              <div className="space-y-1.5">
                <div className="text-xs font-tech font-bold text-slate-200">
                  จุดเด่น & กิจกรรมในโซนนี้
                </div>
                <ul className="space-y-1 text-xs text-slate-300">
                  {selectedZone.highlightsTh.map((h, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-400 shrink-0">▸</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Featured Dinosaurs in this Zone */}
              {selectedZone.featuredSpeciesIds.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-[#143d26]">
                  <div className="text-xs font-tech font-bold text-amber-300 flex items-center justify-between">
                    <span>สิ่งมีชีวิตที่อาศัยในโซนนี้</span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {selectedZone.featuredSpeciesIds.length} สายพันธุ์
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {selectedZone.featuredSpeciesIds.map((dinoId) => {
                      const dino = DINOSAURS_DATA.find((d) => d.id === dinoId);
                      if (!dino) return null;
                      return (
                        <div
                          key={dino.id}
                          onClick={() => {
                            soundManager.playTerminalClick();
                            setSelectedDinoForModal(dino);
                          }}
                          className="flex items-center justify-between p-2 rounded bg-[#040e09] hover:bg-[#0c2a1b] border border-[#143d26] transition-colors cursor-pointer group"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-black/60 text-slate-300">
                              {dino.assetCode}
                            </span>
                            <span className="text-xs font-tech font-semibold text-slate-200 group-hover:text-amber-300">
                              {dino.nameTh}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                soundManager.playSpeciesSound(dino.id, dino.roarFrequencyHz || 85);
                              }}
                              className="p-1 rounded bg-[#092216] hover:bg-amber-500 hover:text-slate-950 text-amber-400 transition-colors"
                              title="ฟังเสียงคำราม"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                            <ExternalLink className="w-3.5 h-3.5 text-emerald-400 group-hover:text-amber-300" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#040e09] border border-[#143d26] flex items-center justify-center text-emerald-400">
                <MapPin className="w-6 h-6 animate-bounce" />
              </div>
              <div>
                <h4 className="font-tech font-bold text-slate-200 text-sm">
                  คลิกที่จุดพินบนแผนที่เพื่อดูข้อมูลโซน
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  เลือกโซน เช่น T-Rex Kingdom, ลากูนโมซาซอร์ หรือ กรงนกยักษ์ เพื่อเปิดแผงข้อมูลและสเปกสิ่งปลูกสร้าง
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Dinosaur Detail Modal */}
      <DinosaurDetailModal
        dinosaur={selectedDinoForModal}
        onClose={() => setSelectedDinoForModal(null)}
      />
    </div>
  );
};
