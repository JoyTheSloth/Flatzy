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
    return (
      <div 
        onClick={onClick}
        className={`inline-flex items-center gap-2 cursor-pointer transition-transform hover:scale-105 select-none ${className}`}
      >
        <img 
          src="/flatzy-logo.jpg" 
          alt="Flatzy Kolkata" 
          className={`rounded-2xl object-cover shadow-sm ${
            size === 'sm' ? 'w-9 h-9' : size === 'md' ? 'w-11 h-11' : size === 'lg' ? 'w-14 h-14' : 'w-20 h-20'
          }`}
        />
        <div className="flex flex-col -space-y-0.5 text-left">
          <div className="flex items-center">
            <span className="font-extrabold tracking-tight text-flatzy-navy text-xl sm:text-2xl font-poppins">
              Flatzy
            </span>
          </div>
          <span className="text-[11px] font-medium text-slate-500 tracking-tight hidden sm:inline-block">
            Skip the hassle.
          </span>
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
