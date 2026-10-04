import React, { useState } from 'react';
import { X, Volume2, ShieldAlert, MapPin, Gauge, Ruler, Weight, Clock, Dna, ExternalLink, Activity, Radio } from 'lucide-react';
import type { Dinosaur } from '../data/dinosaurs';
import { DinosaurVisual } from './DinosaurVisual';
import { soundManager } from '../utils/audioSynthesizer';

interface DinosaurDetailModalProps {
  dinosaur: Dinosaur | null;
  onClose: () => void;
  onNavigateToMapZone?: (zoneId: string) => void;
}

export const DinosaurDetailModal: React.FC<DinosaurDetailModalProps> = ({
  dinosaur,
  onClose,
  onNavigateToMapZone,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  if (!dinosaur) return null;

  const handlePlayRoar = () => {
    setIsPlayingAudio(true);
    soundManager.playSpeciesSound(dinosaur.id, dinosaur.roarFrequencyHz || 85);
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 1800);
  };

  const threatColor =
    dinosaur.threatLevel >= 5
      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
      : dinosaur.threatLevel >= 4
      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
      : dinosaur.threatLevel >= 3
      ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40'
      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl bg-[#081b12] border border-[#1b4b30] shadow-2xl text-slate-100 p-6 md:p-8"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-black/40 hover:bg-black/80 text-slate-400 hover:text-white transition-colors border border-white/10"
          aria-label="ปิดหน้าต่าง"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Telemetry */}
        <div className="flex flex-wrap items-center gap-2 mb-4 text-xs font-mono text-emerald-400/90">
          <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/60">
            {dinosaur.assetCode}
          </span>
          <span className="text-slate-500">|</span>
          <span className="italic">{dinosaur.scientificName}</span>
          <span className="text-slate-500">|</span>
          <span className={`px-2 py-0.5 rounded border font-semibold ${threatColor}`}>
            {dinosaur.threatLabelTh}
          </span>
        </div>

        {/* Title and Audio Trigger */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-tech font-bold text-amber-300">
              {dinosaur.nameTh}
            </h2>
            <p className="text-sm font-mono text-slate-400 mt-0.5">{dinosaur.nameEn}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePlayRoar}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg border text-sm font-tech transition-all cursor-pointer ${
                isPlayingAudio
                  ? 'bg-amber-500 text-slate-950 font-bold border-amber-300 ring-2 ring-amber-400/50 scale-105 shadow-lg shadow-amber-500/30'
                  : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border-amber-500/40'
              }`}
            >
              <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-bounce text-slate-950' : 'text-amber-400 animate-pulse'}`} />
              <span>{isPlayingAudio ? 'กำลังส่งเสียงคำราม...' : 'ฟังเสียงร้อง/คำราม (Play Sound)'}</span>
              {/* Animated Audio Equalizer Bars */}
              {isPlayingAudio && (
                <div className="flex items-end gap-0.5 h-4 ml-1">
                  <span className="w-1 bg-slate-950 rounded-full animate-[ping_0.6s_ease-in-out_infinite]" style={{ height: '80%' }} />
                  <span className="w-1 bg-slate-950 rounded-full animate-[ping_0.4s_ease-in-out_infinite]" style={{ height: '100%' }} />
                  <span className="w-1 bg-slate-950 rounded-full animate-[ping_0.8s_ease-in-out_infinite]" style={{ height: '60%' }} />
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Specialized Sound Characteristics Callout */}
        {dinosaur.soundDescriptionTh && (
          <div className="mb-6 p-3 rounded-lg bg-[#040e09] border border-amber-500/30 flex items-start gap-2.5 text-xs text-slate-200">
            <Radio className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 animate-pulse" />
            <div>
              <span className="font-tech font-bold text-amber-300">ลักษณะเสียงชีวภาพ: </span>
              <span className="text-slate-300">{dinosaur.soundDescriptionTh}</span>
              <span className="ml-2 font-mono text-[11px] text-emerald-400">
                (คลื่นความถี่หลัก: {dinosaur.roarFrequencyHz || 85} Hz)
              </span>
            </div>
          </div>
        )}

        {/* Split Visual and Quick Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          <div className="lg:col-span-7 h-64 sm:h-80">
            <DinosaurVisual dinosaur={dinosaur} className="w-full h-full shadow-inner" showOverlay={false} />
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between gap-3 bg-[#05140d] p-5 rounded-lg border border-[#143d26]">
            <div className="text-xs font-mono text-emerald-400/80 border-b border-[#143d26] pb-2 uppercase tracking-wider">
              สเปกชีวภาพ (Biological Metrics)
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-start gap-2">
                <Ruler className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-400 font-mono">ความยาว</div>
                  <div className="font-semibold text-slate-200">{dinosaur.lengthMeters} เมตร</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Weight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-400 font-mono">น้ำหนัก</div>
                  <div className="font-semibold text-slate-200">{dinosaur.weightTons} ตัน</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Gauge className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-400 font-mono">ความเร็วสูงสุด</div>
                  <div className="font-semibold text-slate-200">{dinosaur.speedKmh} กม./ชม.</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-400 font-mono">ความสูง</div>
                  <div className="font-semibold text-slate-200">{dinosaur.heightMeters} เมตร</div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#143d26]">
              <div className="text-xs text-slate-400 font-mono mb-1">การจัดหมวดหมู่ & อาหาร</div>
              <div className="text-xs text-emerald-300 mb-1">{dinosaur.categoryTh}</div>
              <div className="text-xs text-slate-300">{dinosaur.dietTh}</div>
            </div>

            <div className="pt-3 border-t border-[#143d26]">
              <div className="text-xs text-slate-400 font-mono mb-1">โซนจัดแสดงบนเกาะ</div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-amber-300 font-medium flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  {dinosaur.zoneNameTh}
                </span>
                {onNavigateToMapZone && (
                  <button
                    onClick={() => {
                      onClose();
                      onNavigateToMapZone(dinosaur.zoneId);
                    }}
                    className="text-[11px] text-emerald-400 hover:text-emerald-300 underline flex items-center gap-1 font-mono cursor-pointer"
                  >
                    <span>ดูบนแผนที่</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Thai Description Sections */}
        <div className="space-y-5 text-sm leading-relaxed text-slate-200">
          <div className="bg-[#05140d] p-4 rounded-lg border border-[#143d26]">
            <h4 className="font-tech text-base font-semibold text-amber-300 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              ภาพรวมและประวัติศาสตร์
            </h4>
            <p className="text-slate-300">{dinosaur.descriptionTh}</p>
            <div className="mt-2 text-xs font-mono text-emerald-400/90">
              ยุคทางธรณีวิทยา: {dinosaur.period}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#05140d] p-4 rounded-lg border border-[#143d26]">
              <h4 className="font-tech text-sm font-semibold text-emerald-400 mb-1.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                ลักษณะเด่นทางสรีรวิทยา
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">{dinosaur.featuresTh}</p>
            </div>

            <div className="bg-[#05140d] p-4 rounded-lg border border-[#143d26]">
              <h4 className="font-tech text-sm font-semibold text-amber-400 mb-1.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                พฤติกรรมและการล่า/ป้องกันตัว
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">{dinosaur.behaviorTh}</p>
            </div>
          </div>

          <div className="bg-[#05140d] p-4 rounded-lg border border-[#143d26] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-mono text-slate-400">แหล่งค้นพบฟอสซิล: </span>
              <span className="text-slate-200">{dinosaur.fossilLocationTh}</span>
            </div>
            {dinosaur.dnaComposition && (
              <div className="flex items-center gap-1.5 text-amber-300">
                <Dna className="w-4 h-4 text-amber-400" />
                <span>การผสมดีเอ็นเอ: {dinosaur.dnaComposition}</span>
              </div>
            )}
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="mt-8 pt-4 border-t border-[#143d26] flex items-center justify-between">
          <div className="text-[11px] font-mono text-slate-500">
            INGEN BIOTECH REPOSITORY // CLASSIFIED INTEL
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 text-sm font-tech transition-colors border border-emerald-700/60 cursor-pointer"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};
