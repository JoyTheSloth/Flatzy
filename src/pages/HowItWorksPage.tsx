import React from 'react';
import { 
  ArrowRight, 
  Instagram, 
  MessageSquare, 
  Sparkles, 
  CheckCircle2, 
  ChevronDown,
  Home,
  Users,
  Key,
  Briefcase
} from 'lucide-react';
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
      icon: Home,
      iconBg: 'bg-amber-100 text-amber-700',
      title: t('hiw.step1Title'),
      desc: t('hiw.step1Desc'),
    },
    {
      num: '02',
      icon: MessageSquare,
      iconBg: 'bg-emerald-100 text-emerald-700',
      title: t('hiw.step2Title'),
      desc: t('hiw.step2Desc'),
    },
    {
      num: '03',
      icon: Users,
      iconBg: 'bg-blue-100 text-blue-700',
      title: t('hiw.step3Title'),
      desc: t('hiw.step3Desc'),
    },
  ];

  const faqs = [
    {
      q: 'How does the WhatsApp connection work?',
      a: 'When you submit your requirements, an automated message card is generated and sent to our official WhatsApp (+91 89103 76054). We verify availability and immediately connect you directly with the verified broker managing that property.'
    },
    {
      q: 'Does Flatzy charge renters any discovery fee?',
      a: 'Zero. Browsing verified flats and connecting with brokers through Flatzy is completely free for renters.'
    },
    {
      q: 'What if I am a Broker or Property Owner?',
      a: 'Tap on "Enquire" or "Rent / Broker?" and choose "Broker or Owner". Share your operating areas and property types to list your flats on Flatzy.'
    },
    {
      q: 'Are bachelors and students welcome in Kolkata?',
      a: 'Yes! Every listing is tagged clearly upfront so you know whether bachelors or students are welcome without awkward negotiations.'
    },
    {
      q: 'How does sending an Instagram Reel work?',
      a: 'Forward any Kolkata flat Reel to @flatzykolkata on Instagram. We look up the exact building, verify pricing, and connect you with the broker.'
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
        
        {/* Header */}
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
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-soft space-y-4 flex flex-col justify-between hover:shadow-soft-lg transition-shadow"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-black text-flatzy-yellow font-poppins">
                      {step.num}
                    </span>
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${step.iconBg} shadow-xs`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-lg font-black text-flatzy-navy font-poppins">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center gap-1 text-[11px] font-bold text-slate-400">
                  <span>Step {step.num}</span>
                  <span>•</span>
                  <span className="text-flatzy-navy">Zero cold calls</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Visual Flow Strip */}
        <div className="bg-flatzy-navy text-white rounded-3xl p-5 sm:p-6 shadow-soft">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-bold text-center">
            <span className="px-3.5 py-1.5 rounded-full bg-white/10 flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5 text-flatzy-yellow" />
              <span>1. Choose Flat or Role</span>
            </span>
            <span className="text-flatzy-yellow font-black">→</span>
            <span className="px-3.5 py-1.5 rounded-full bg-flatzy-yellow text-flatzy-navy font-black flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>2. Fill Details & Send in WhatsApp</span>
            </span>
            <span className="text-flatzy-yellow font-black">→</span>
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-500 text-white font-black flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              <span>3. We Connect You With Broker</span>
            </span>
          </div>
        </div>

        {/* FAQs */}
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

        {/* Bottom CTAs */}
        <div className="text-center pt-2 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => onNavigate('explore')}
            className="px-8 py-3.5 rounded-full bg-flatzy-yellow hover:bg-flatzy-yellowDark text-flatzy-navy font-black text-xs uppercase tracking-wider shadow-soft transition-all"
          >
            Explore Flats
          </button>
          <button
            onClick={onOpenInquiryModal}
            className="px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 text-flatzy-navy font-bold text-xs border border-slate-200 shadow-soft transition-all flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-flatzy-yellow" />
            <span>Submit Quick Inquiry</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default HowItWorksPage;
