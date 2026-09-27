import React from 'react';

interface FlatzyLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'badge' | 'transparent' | 'dark';
  onClick?: () => void;
}

export const FlatzyLogo: React.FC<FlatzyLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'badge',
  onClick,
}) => {
  const sizeClasses = {
    sm: 'h-9 text-base',
    md: 'h-11 text-lg',
    lg: 'h-14 text-2xl',
    xl: 'h-20 text-3xl',
  };

  if (variant === 'badge') {
    const isSm = size === 'sm';
    return (
      <div 
        onClick={onClick}
        className={`inline-flex items-center gap-2 sm:gap-2.5 cursor-pointer transition-transform hover:scale-[1.02] select-none shrink-0 ${className}`}
      >
        <img 
          src="/flatzy-logo.jpg" 
          alt="Flatzy Kolkata" 
          className={`rounded-full object-cover shadow-2xs shrink-0 ring-1 ring-slate-900/10 ${
            isSm 
              ? 'w-8 h-8 sm:w-8.5 sm:h-8.5' 
              : size === 'md' 
              ? 'w-11 h-11' 
              : size === 'lg' 
              ? 'w-14 h-14' 
              : 'w-20 h-20'
          }`}
        />
        <div className="flex flex-col justify-center text-left">
          <span className={`font-black tracking-tight text-flatzy-navy font-poppins leading-none whitespace-nowrap ${
            isSm ? 'text-base sm:text-lg' : 'text-xl sm:text-2xl'
          }`}>
            Flatzy
          </span>
          {!isSm && (
            <span className="text-[11px] font-medium text-slate-400 tracking-tight whitespace-nowrap leading-none mt-1">
              Skip the hassle.
            </span>
          )}
        </div>
      </div>
    );
  }

  // Dark variant for dark backgrounds/footer
  if (variant === 'dark') {
    return (
      <div 
        onClick={onClick}
        className={`inline-flex items-center gap-3 cursor-pointer transition-transform hover:scale-105 select-none ${className}`}
      >
        <div className="w-11 h-11 rounded-2xl bg-flatzy-yellow flex items-center justify-center p-1 shadow-yellow-glow">
          <img 
            src="/flatzy-logo.jpg" 
            alt="Flatzy" 
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        <div className="flex flex-col -space-y-0.5 text-left">
          <div className="flex items-center">
            <span className="font-black tracking-tight text-white text-2xl font-poppins">
              Flatzy
            </span>
          </div>
          <span className="text-[11px] font-medium text-slate-400 tracking-tight">
            Find your flat. Skip the hassle.
          </span>
        </div>
      </div>
    );
  }

  // Transparent variant
  return (
    <div 
      onClick={onClick}
      className={`inline-flex items-center gap-2 cursor-pointer transition-transform hover:scale-105 select-none ${className}`}
    >
      <img 
        src="/flatzy-logo.jpg" 
        alt="Flatzy Kolkata" 
        className={`${sizeClasses[size]} w-auto object-contain rounded-xl`}
      />
    </div>
  );
};
