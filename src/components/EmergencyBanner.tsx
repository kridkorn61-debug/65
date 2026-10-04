import React from 'react';
import { AlertTriangle, Bell, ShieldAlert, ArrowRight, Volume2 } from 'lucide-react';
import { soundManager } from '../utils/audioSynthesizer';

interface EmergencyBannerProps {
  conditionRed: boolean;
  onDismiss: () => void;
  onNavigateToSafety: () => void;
}

export const EmergencyBanner: React.FC<EmergencyBannerProps> = ({
  conditionRed,
  onDismiss,
  onNavigateToSafety,
}) => {
  if (!conditionRed) return null;

  const handleSiren = () => {
    soundManager.playAlertSiren();
  };

  return (
    <div className="w-full bg-rose-950/90 border-b border-rose-600/70 text-rose-100 px-4 py-2.5 shadow-lg relative z-30 animate-in slide-in-from-top duration-300">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="p-1 rounded bg-rose-600 animate-pulse text-white">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <span className="font-tech font-bold tracking-wider text-rose-200 uppercase">
              ประกาศเตือนภัยฉุกเฉิน (ASSET CONTAINMENT ALERT - CODE RED):
            </span>{' '}
            <span className="text-rose-100">
              พบการเคลื่อนไหวผิดปกติของตัวอย่างทดลองใน Sector 11 กรุณาไปยังหลุมหลบภัยที่ใกล้ที่สุด
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleSiren}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-rose-900/80 hover:bg-rose-800 text-rose-200 border border-rose-500/50 text-[11px] font-tech transition-colors cursor-pointer"
          >
            <Volume2 className="w-3.5 h-3.5 text-rose-300 animate-bounce" />
            <span>ทดสอบสัญญาณไซเรน</span>
          </button>
          <button
            onClick={onNavigateToSafety}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-rose-500 hover:bg-rose-600 text-white font-tech font-semibold text-[11px] transition-colors cursor-pointer"
          >
            <span>ดูแผนที่หลุมหลบภัย</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onDismiss}
            className="px-2 py-1 text-rose-300 hover:text-white text-[11px] underline cursor-pointer"
          >
            ปิดการเตือน
          </button>
        </div>
      </div>
    </div>
  );
};
