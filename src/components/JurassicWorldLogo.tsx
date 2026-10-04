import React, { useState } from 'react';

interface JurassicWorldLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  subtitle?: string;
  className?: string;
  onClick?: () => void;
}

export const JurassicWorldLogo: React.FC<JurassicWorldLogoProps> = ({
  size = 'md',
  showWordmark = true,
  subtitle = 'INGEN RESEARCH & PARK GUIDE',
  className = '',
  onClick,
}) => {
  const [imageError, setImageError] = useState(false);
  const logoImageSrc = '/assets/images/jw_official_logo_1791078483532.jpg';

  const sizeDimensions = {
    sm: { img: 'w-8 h-8', text: 'text-sm sm:text-base', sub: 'text-[9px]' },
    md: { img: 'w-10 h-10', text: 'text-base sm:text-lg', sub: 'text-[10px]' },
    lg: { img: 'w-14 h-14', text: 'text-xl sm:text-2xl', sub: 'text-xs' },
    xl: { img: 'w-20 h-20 sm:w-24 sm:h-24', text: 'text-2xl sm:text-4xl', sub: 'text-xs sm:text-sm' },
  }[size];

  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 select-none ${onClick ? 'cursor-pointer group' : ''} ${className}`}
    >
      {/* Emblem / Badge Icon */}
      <div
        className={`relative ${sizeDimensions.img} shrink-0 rounded-full overflow-hidden border border-amber-500/50 p-0.5 bg-[#030e08] shadow-[0_0_15px_rgba(212,175,55,0.25)] group-hover:border-amber-400 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.45)] transition-all duration-300`}
      >
        {!imageError ? (
          <img
            src={logoImageSrc}
            alt="Jurassic World Official Logo"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
        ) : (
          /* High-precision SVG T-Rex Circular Medallion Fallback */
          <div className="w-full h-full rounded-full bg-gradient-to-br from-[#0c2217] via-[#05140d] to-[#020a06] flex items-center justify-center p-1 relative">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full text-amber-400 drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]"
              fill="currentColor"
            >
              {/* Circular Outer Rim */}
              <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.9" />
              <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />
              {/* T-Rex Skeleton Silhouette Silhouette */}
              <path
                d="M32 68 C38 52 44 48 50 48 C56 48 64 42 70 34 C74 28 82 28 84 34 C85 38 82 44 76 46 C74 47 72 52 70 56 C66 64 56 68 50 68 C44 68 38 72 32 68 Z M68 38 C70 38 72 36 72 35 C72 34 70 33 68 33 C66 33 65 34 65 35 C65 36 66 38 68 38 Z"
                fill="currentColor"
              />
              <path
                d="M48 55 C52 53 58 53 62 56 L64 62 C58 64 54 62 48 55 Z"
                fill="#05140d"
              />
            </svg>
          </div>
        )}
        {/* Subtle Ambient Ring Glow */}
        <div className="absolute inset-0 rounded-full ring-1 ring-amber-400/20 pointer-events-none" />
      </div>

      {/* Brand Typography Wordmark */}
      {showWordmark && (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span
              className={`font-tech font-bold tracking-widest text-slate-100 uppercase group-hover:text-amber-300 transition-colors whitespace-nowrap ${sizeDimensions.text}`}
            >
              JURASSIC WORLD
            </span>
          </div>
          {subtitle && (
            <span
              className={`font-mono text-emerald-400 tracking-wider uppercase font-medium whitespace-nowrap ${sizeDimensions.sub}`}
            >
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
