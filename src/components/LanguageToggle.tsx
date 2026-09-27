import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  className?: string;
  isCompact?: boolean;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  className = '',
  isCompact = false,
}) => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      aria-label={`Switch to ${language === 'en' ? 'Bengali' : 'English'}`}
      className={`inline-flex items-center gap-1.5 h-9 px-3 rounded-full border transition-all duration-200 select-none shadow-2xs active:scale-95 ${
        language === 'bn'
          ? 'bg-amber-500/10 border-amber-300/80 text-flatzy-navy font-bold'
          : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200/80 text-slate-700 font-semibold'
      } ${className}`}
      title={language === 'en' ? 'বাংলা ভাষায় দেখুন' : 'Switch to English'}
    >
      <Globe className="w-3.5 h-3.5 text-flatzy-yellowDark shrink-0" />
      <div className="flex items-center gap-1 text-xs">
        <span className={language === 'en' ? 'font-black text-flatzy-navy' : 'text-slate-400 font-medium'}>
          EN
        </span>
        <span className="text-slate-300">/</span>
        <span className={language === 'bn' ? 'font-black text-amber-900' : 'text-slate-400 font-medium'}>
          বাংলা
        </span>
      </div>
    </button>
  );
};
