import React from 'react';
import { ArrowRight, Instagram, MessageSquare, Sparkles, CheckCircle2, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HowItWorksPageProps {
  onNavigate: (tab: string) => void;
  onOpenInquiryModal: () => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({
  onNavigate,
  onOpenInquiryModal,
}) => {
  const { t } = useLanguage();
  const [activeFaq, setActiveFaq] = React.useState<number | null>(null);

  const steps = [
    {
      num: '01',
      emoji: '📱',
      title: t('hiw.step1Title'),
      desc: t('hiw.step1Desc'),
    },
    {
      num: '02',
      emoji: '💬',
      title: t('hiw.step2Title'),
      desc: t('hiw.step2Desc'),
    },
    {
      num: '03',
      emoji: '🔑',
      title: t('hiw.step3Title'),
      desc: t('hiw.step3Desc'),
    },
  ];

  const faqs = [
    {
      q: 'Does Flatzy charge renters any discovery fee?',
      a: 'Zero. Browsing and submitting inquiries on Flatzy is completely free for renters.'
    },
    {
      q: 'How does sending an Instagram Reel work?',
      a: 'Forward the reel to @flatzykolkata on Instagram. We look up the exact building, verify pricing, and connect you with the broker.'
    },
    {
      q: 'Are bachelors and students welcome?',
      a: 'Yes. Every listing is tagged clearly so you know upfront if bachelors or students are welcome.'
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Scenic Cityscape Background Image */}
      <div 
        className="absolute top-0 left-0 right-0 h-[650px] sm:h-[800px] bg-top bg-cover bg-no-repeat pointer-events-none opacity-35 sm:opacity-45"
        style={{ backgroundImage: "url('/city-bg.png')" }}
      />
      <div className="absolute top-0 left-0 right-0 h-[650px] sm:h-[800px] bg-gradient-to-b from-white/20 via-transparent to-[#FAF9F6] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-12 animate-in fade-in duration-300">
        
        {/* Minimal Header */}
        <div className="text-center space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-flatzy-coral">
            {t('hiw.badge')}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-flatzy-navy font-poppins">
            {t('hiw.title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            {t('hiw.subtitle')}
          </p>
        </div>

      {/* 3 Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {steps.map((step) => (
          <div
            key={step.num}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-soft space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-flatzy-yellow font-poppins">
                  {step.num}
                </span>
                <span className="text-2xl">{step.emoji}</span>
              </div>
              <h3 className="text-lg font-black text-flatzy-navy font-poppins">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Minimal Visual Flow Strip */}
      <div className="bg-flatzy-navy text-white rounded-3xl p-5 sm:p-6 shadow-soft">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-bold text-center">
          <span className="px-3 py-1.5 rounded-full bg-white/10">📱 Reel or Web</span>
          <span className="text-flatzy-yellow">→</span>
          <span className="px-3.5 py-1.5 rounded-full bg-flatzy-yellow text-flatzy-navy font-black">⚡ Flatzy Match</span>
          <span className="text-flatzy-yellow">→</span>
          <span className="px-3 py-1.5 rounded-full bg-white/10">🤝 Verified Broker</span>
          <span className="text-flatzy-yellow">→</span>
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-500 text-white font-black">🏠 Move In</span>
        </div>
      </div>

      {/* 3 Minimal FAQs */}
      <div className="space-y-3 max-w-2xl mx-auto">
        <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 text-center mb-2">
          Quick Answers
        </h4>
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs"
          >
            <button
              onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
              className="w-full p-4 text-left font-bold text-xs sm:text-sm text-flatzy-navy flex items-center justify-between gap-3"
            >
              <span>{faq.q}</span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === idx ? 'rotate-180 text-flatzy-yellow' : ''}`} />
            </button>
            {activeFaq === idx && (
              <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2.5">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Clean Bottom CTAs */}
      <div className="text-center pt-2 flex flex-wrap justify-center gap-3">
        <button
          onClick={() => onNavigate('explore')}
          className="px-8 py-3.5 rounded-full bg-flatzy-yellow hover:bg-flatzy-yellowDark text-flatzy-navy font-black text-xs uppercase tracking-wider shadow-soft transition-all"
        >
          Explore Flats
        </button>
        <button
          onClick={onOpenInquiryModal}
          className="px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 text-flatzy-navy font-bold text-xs border border-slate-200 shadow-soft transition-all"
        >
          Submit Quick Inquiry
        </button>
      </div>
      </div>
    </div>
  );
};
