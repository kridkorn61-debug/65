import React, { useState } from 'react';
import {
  Compass,
  MapPin,
  Clock,
  Users,
  Shield,
  Zap,
  Coffee,
  Train,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Info,
} from 'lucide-react';
import { PARK_ZONES_DATA, type ParkZone } from '../data/parkZones';
import { soundManager } from '../utils/audioSynthesizer';

interface ParkZonesPageProps {
  onNavigateToMapZone: (zoneId: string) => void;
}

export const ParkZonesPage: React.FC<ParkZonesPageProps> = ({ onNavigateToMapZone }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeZoneModal, setActiveZoneModal] = useState<ParkZone | null>(null);

  const categories = [
    { id: 'all', label: 'โซนทั้งหมด' },
    { id: 'attraction', label: 'เครื่องเล่น & อารีน่า' },
    { id: 'paddock', label: 'กรงจัดแสดงนักล่า' },
    { id: 'facility', label: 'ศูนย์การเรียนรู้ & แล็บ' },
    { id: 'hospitality', label: 'บริการ & โรงแรม' },
    { id: 'restricted', label: 'เขตหวงห้ามความมั่นคงสูง' },
  ];

  const filteredZones = PARK_ZONES_DATA.filter((zone) => {
    if (selectedCategory === 'all') return true;
    return zone.category === selectedCategory;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Header */}
      <div className="border-b border-[#143d26] pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
          <Compass className="w-3.5 h-3.5 text-emerald-400" />
          <span>ISLA NUBLAR MASTER PLAN // ATTRACTIONS & RESORTS</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-tech font-bold text-white mt-1">
          โซนท่องเที่ยว สิ่งอำนวยความสะดวก & เครื่องเล่น
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
          คู่มือแนะนำสถานที่ท่องเที่ยวทั่วเกาะอิสลานูบลาร์ ตั้งแต่ถนนคนเดิน Main Street สวนน้ำลากูน หุบเขาไจโรสเฟียร์ ไปจนถึงศูนย์นวัตกรรมและโรงแรมหรูระดับ 5 ดาว
        </p>
      </div>

      {/* Island Transit System Highlight: Monorail */}
      <div className="rounded-xl bg-[#06150e] border border-[#143d26] p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-tech text-amber-400 font-semibold uppercase">
            <Train className="w-4 h-4 text-amber-400" />
            <span>ระบบขนส่งมวลชนบนเกาะ (ISLAND MONORAIL)</span>
          </div>
          <h3 className="text-lg font-tech font-bold text-white">
            รถไฟรางเดี่ยวโมโนเรลปรับอากาศความเร็วสูง
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            เชื่อมต่อทุกโซนบนเกาะจากท่าเรือเฟอร์รี่สู่กรงทีเร็กซ์และลากูน ออกทุก 5 นาที มีระบบบรรยาย 12 ภาษา
          </p>
        </div>

        <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-[#040e09] border border-[#153e28]">
            <div className="text-[10px] font-mono text-slate-400">สถานี 1</div>
            <div className="font-tech font-bold text-slate-200 mt-0.5">Ferry Port Hub</div>
            <div className="text-[10px] text-emerald-400">ท่าเทียบเรือ</div>
          </div>
          <div className="p-3 rounded-lg bg-[#040e09] border border-[#153e28]">
            <div className="text-[10px] font-mono text-slate-400">สถานี 2</div>
            <div className="font-tech font-bold text-slate-200 mt-0.5">Main Street Central</div>
            <div className="text-[10px] text-emerald-400">ลากูน & นวัตกรรม</div>
          </div>
          <div className="p-3 rounded-lg bg-[#040e09] border border-[#153e28]">
            <div className="text-[10px] font-mono text-slate-400">สถานี 3</div>
            <div className="font-tech font-bold text-slate-200 mt-0.5">Gyrosphere Safari</div>
            <div className="text-[10px] text-emerald-400">ทุ่งกินพืช</div>
          </div>
          <div className="p-3 rounded-lg bg-[#040e09] border border-[#153e28]">
            <div className="text-[10px] font-mono text-slate-400">สถานี 4</div>
            <div className="font-tech font-bold text-slate-200 mt-0.5">T-Rex Kingdom Log</div>
            <div className="text-[10px] text-emerald-400">Paddock 9</div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#143d26]">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              soundManager.playTerminalClick();
              setSelectedCategory(c.id);
            }}
            className={`px-4 py-2 rounded-lg text-xs font-tech font-medium whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === c.id
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-[#06150e] text-slate-300 hover:text-white border border-[#153e28]'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Zone Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredZones.map((zone) => {
          const isRestricted = zone.category === 'restricted';
          return (
            <div
              key={zone.id}
              className={`group rounded-xl bg-[#06150e] border p-5 sm:p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 shadow-lg ${
                isRestricted
                  ? 'border-rose-900/60 hover:border-rose-500'
                  : 'border-[#143d26] hover:border-amber-500/50'
              }`}
            >
              <div className="space-y-4">
                {/* Zone Photo Header */}
                {zone.image && (
                  <div className="relative h-48 sm:h-56 w-full rounded-lg overflow-hidden border border-[#143d26]">
                    <img
                      src={zone.image}
                      alt={zone.nameTh}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06150e] via-transparent to-black/20" />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase tracking-wider backdrop-blur-md ${
                          isRestricted
                            ? 'bg-rose-950/90 text-rose-300 border-rose-800'
                            : 'bg-black/70 text-emerald-300 border-emerald-800'
                        }`}
                      >
                        {zone.categoryTh}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-slate-300">
                      <span className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded border border-white/10 text-[11px]">
                        <Clock className="w-3 h-3 text-amber-400" />
                        {zone.openHoursTh.split('(')[0]}
                      </span>
                      <span className="bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded border border-white/10 text-[11px] text-amber-300">
                        ความจุ {zone.capacityGuests.toLocaleString()} คน
                      </span>
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-tech font-bold text-amber-300 group-hover:text-amber-200 transition-colors">
                    {zone.nameTh}
                  </h3>
                  <div className="text-xs font-mono text-slate-400">{zone.nameEn}</div>
                </div>

                <div className="p-2.5 rounded-lg bg-[#040e09] border border-[#153e28] text-xs font-medium text-amber-200/90">
                  "{zone.taglineTh}"
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {zone.descriptionTh}
                </p>

                {/* Highlights */}
                <div className="space-y-1">
                  <div className="text-[11px] font-tech font-semibold text-slate-300 uppercase">
                    จุดเด่นน่าสนใจ:
                  </div>
                  <ul className="text-xs text-slate-400 space-y-1">
                    {zone.highlightsTh.slice(0, 3).map((h, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Safety Guidelines */}
                <div className="p-3 rounded-lg bg-[#040e09] border border-amber-500/20 text-xs space-y-1">
                  <div className="text-[10px] font-mono text-amber-300 font-semibold flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    <span>ข้อควรปฏิบัติด้านความปลอดภัย</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-normal">
                    {zone.safetyGuidelinesTh[0]}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-[#143d26] flex items-center justify-between">
                <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                  <Users className="w-3.5 h-3.5 text-emerald-400" />
                  <span>ความจุ {zone.capacityGuests.toLocaleString()} คน</span>
                </span>

                <button
                  onClick={() => {
                    soundManager.playTerminalClick();
                    onNavigateToMapZone(zone.id);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 border border-emerald-700/80 text-emerald-200 text-xs font-tech font-semibold transition-colors cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>ดูตำแหน่งบนแผนที่</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
