import React, { useState } from 'react';
import type { Dinosaur } from '../data/dinosaurs';

interface DinosaurVisualProps {
  dinosaur: Dinosaur;
  className?: string;
  showOverlay?: boolean;
}

export const DinosaurVisual: React.FC<DinosaurVisualProps> = ({
  dinosaur,
  className = '',
  showOverlay = true,
}) => {
  const [imageError, setImageError] = useState(false);
  const [attemptedFallback, setAttemptedFallback] = useState(false);

  // Initial image source
  const [imgSrc, setImgSrc] = useState(dinosaur.image);

  const handleImageError = () => {
    if (!attemptedFallback && dinosaur.image) {
      setAttemptedFallback(true);
      // Try alternate path (with or without /src)
      if (dinosaur.image.startsWith('/assets/')) {
        setImgSrc('/src' + dinosaur.image);
      } else if (dinosaur.image.startsWith('/src/assets/')) {
        setImgSrc(dinosaur.image.replace('/src', ''));
      } else {
        setImageError(true);
      }
    } else {
      setImageError(true);
    }
  };

  // Fallback themed SVG silhouette paths depending on category/type
  const getSilhouette = () => {
    switch (dinosaur.id) {
      case 't-rex':
      case 'indominus-rex':
        return (
          <path
            d="M20 70 Q45 25 80 30 Q110 32 130 18 Q145 10 160 20 Q170 30 165 42 Q150 48 135 44 Q125 55 120 75 Q115 90 125 110 L115 115 Q105 95 100 80 Q75 88 55 105 L45 100 Q65 78 20 70 Z"
            fill="currentColor"
            opacity="0.85"
          />
        );
      case 'velociraptor':
      case 'gallimimus':
        return (
          <path
            d="M15 80 Q40 45 70 42 Q95 38 110 25 Q125 15 140 22 Q145 30 135 38 Q120 42 110 55 Q105 70 115 105 L108 108 Q98 80 90 68 Q70 72 45 92 L38 88 Q55 65 15 80 Z"
            fill="currentColor"
            opacity="0.85"
          />
        );
      case 'mosasaurus':
        return (
          <path
            d="M15 50 Q45 25 90 35 Q135 45 165 35 Q175 48 155 58 Q120 65 80 60 Q45 75 25 70 Q10 60 15 50 Z"
            fill="currentColor"
            opacity="0.85"
          />
        );
      case 'pteranodon':
      case 'dimorphodon':
        return (
          <path
            d="M10 30 Q50 45 85 50 Q110 25 140 10 Q160 35 125 60 Q95 65 60 70 Q25 65 10 30 Z"
            fill="currentColor"
            opacity="0.85"
          />
        );
      case 'apatosaurus':
        return (
          <path
            d="M10 75 Q40 60 70 65 Q85 45 100 20 Q110 8 125 12 Q125 25 115 45 Q105 65 115 90 L108 92 Q98 75 90 70 Q65 72 40 85 Z"
            fill="currentColor"
            opacity="0.85"
          />
        );
      case 'triceratops':
      case 'ankylosaurus':
      case 'stegosaurus':
      case 'pachycephalosaurus':
      case 'parasaurolophus':
      default:
        return (
          <path
            d="M20 70 Q45 40 85 45 Q115 42 135 30 Q150 35 145 52 Q130 65 115 70 Q108 92 115 108 L105 110 Q98 88 88 75 Q60 80 35 95 Z"
            fill="currentColor"
            opacity="0.85"
          />
        );
    }
  };

  const threatColor =
    dinosaur.threatLevel >= 5
      ? 'text-rose-500 border-rose-500/30'
      : dinosaur.threatLevel >= 4
      ? 'text-amber-500 border-amber-500/30'
      : dinosaur.threatLevel >= 3
      ? 'text-yellow-500 border-yellow-500/30'
      : 'text-emerald-500 border-emerald-500/30';

  const hasRealImage = dinosaur.image && !imageError;

  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-[#07170f] border border-[#143d26] select-none ${className}`}
    >
      {hasRealImage ? (
        <div className="relative w-full h-full">
          <img
            src={imgSrc}
            alt={dinosaur.nameTh}
            onError={handleImageError}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          {/* Subtle InGen camera feed overlay */}
          <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-white/10 text-[9px] font-mono text-emerald-400 pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>INGEN CAM // {dinosaur.assetCode}</span>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#092216] via-[#05140d] to-[#030b07] relative">
          {/* Tactical Grid Background */}
          <div className="absolute inset-0 bg-radar-grid opacity-30 pointer-events-none" />

          {/* Glowing Silhouette Badge */}
          <div className="relative w-40 h-28 flex items-center justify-center text-emerald-400/80 drop-shadow-[0_0_12px_rgba(16,185,129,0.3)]">
            <svg
              viewBox="0 0 180 120"
              className="w-full h-full transition-transform duration-300 group-hover:scale-110"
            >
              {getSilhouette()}
              {/* Skeleton Measurement Lines */}
              <circle cx="85" cy="55" r="3" fill="#d4af37" />
              <line x1="85" y1="55" x2="130" y2="35" stroke="#d4af37" strokeWidth="0.8" strokeDasharray="2,2" />
              <text x="132" y="36" fill="#d4af37" fontSize="6" fontFamily="monospace">DNA: {dinosaur.assetCode}</text>
            </svg>
          </div>

          <div className="text-center relative z-10 mt-2">
            <span className="text-[11px] font-mono tracking-wider text-amber-400/90 uppercase">
              {dinosaur.scientificName}
            </span>
          </div>
        </div>
      )}

      {showOverlay && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#040e09]/95 via-[#040e09]/60 to-transparent p-3 pointer-events-none flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/60 text-slate-300 border border-white/10">
              {dinosaur.assetCode}
            </span>
            <span className="text-[11px] font-tech text-emerald-400">
              {dinosaur.lengthMeters}ม. · {dinosaur.weightTons} ตัน
            </span>
          </div>
          <span className={`text-[10px] font-mono uppercase font-semibold ${threatColor}`}>
            ระดับ {dinosaur.threatLevel}
          </span>
        </div>
      )}
    </div>
  );
};
