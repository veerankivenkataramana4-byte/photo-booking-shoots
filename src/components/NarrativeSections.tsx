import React, { useState } from 'react';
import { TESTIMONIALS, FAQS } from '../data/initialData';
import {
  ShieldCheck,
  CalendarCheck,
  Zap,
  Camera,
  Layers,
  Award,
  ChevronDown,
  Star,
  Quote,
  Sparkles
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const highlights = [
    {
      icon: CalendarCheck,
      title: 'Zero Double-Booking Guarantee',
      desc: 'Our real-time crew assignment engine ensures the dedicated photographer or cinematographer you reserve is 100% committed exclusively to your event slot.'
    },
    {
      icon: Camera,
      title: 'Flagship Cinema & Stills Gear',
      desc: 'Shot exclusively on full-frame Sony FX3, Canon R5 C, Hasselblad medium formats, G-Master prime lenses, and DGCA-compliant 4K aerial drones.'
    },
    {
      icon: Zap,
      title: 'Express 48-Hour Sneak Peeks',
      desc: 'Relive your milestone while the excitement is fresh. Get curated magazine-edited highlights and Instagram reels delivered within 24 to 48 hours.'
    },
    {
      icon: ShieldCheck,
      title: 'Triple-Redundant Backup Protocol',
      desc: 'Dual SD/CFexpress card recording on-site, encrypted cloud synchronization, and offline redundant storage ensure your priceless memories are bulletproof.'
    },
    {
      icon: Layers,
      title: 'Transparent Upfront Pricing',
      desc: 'Clear itemized packages with no surprise extra charges on shoot day. Flexible add-ons allow you to expand hours, crew, or albums as needed.'
    },
    {
      icon: Award,
      title: 'Vetted Master Storytellers',
      desc: 'Every team member undergoes rigorous creative portfolio evaluation, technical mastery assessments, and formal etiquette training.'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#08090b] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="text-xs font-semibold tracking-widest text-[#d4af37] uppercase flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The ShootBook Standard</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Why Discerning Clients Choose Us
          </h2>
          <p className="text-slate-400 text-sm">
            We combine high-art cinematography with enterprise-grade reliability and seamless booking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="p-7 rounded-2xl bg-[#0d0f14] border border-slate-800 hover:border-[#d4af37]/60 transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-[#141822] text-[#d4af37] flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-[#d4af37] group-hover:text-black transition-all">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="font-cinzel text-lg font-bold text-white group-hover:text-[#d4af37] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Select Event & Vision',
      desc: 'Choose your event category, whether you need photography, videography, or both, and explore specialized shoot styles.'
    },
    {
      number: '02',
      title: 'Check Date & Customize',
      desc: 'Pick your event date and start time. Our scheduler checks live crew availability and lets you add drones, albums, or extra hours.'
    },
    {
      number: '03',
      title: 'Reserve with Advance Deposit',
      desc: 'Lock in your date instantly via our secure test payment gateway or submit a customized request. Receive immediate booking confirmation ID.'
    },
    {
      number: '04',
      title: 'Shoot Day & Cloud Delivery',
      desc: 'Our lead director arrives early with full production gear. Receive sneak peek highlights within 48 hours and master high-res deliverables online.'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#0a0c10] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="text-xs font-semibold tracking-widest text-[#d4af37] uppercase">
            Four Effortless Steps
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-tight">
            How ShootBook Works
          </h2>
          <p className="text-slate-400 text-sm">
            From the initial click to your heirloom leather album, we make pre-booking effortless.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((st, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#0d0f14] border border-slate-800 relative space-y-3"
            >
              <div className="font-cinzel text-3xl font-extrabold text-[#d4af37]/40">
                {st.number}
              </div>
              <h3 className="font-cinzel text-base font-bold text-white">{st.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-[#08090b] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="text-xs font-semibold tracking-widest text-[#d4af37] uppercase">
            Client Voices
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Treasured by Families & Brands
          </h2>
          <p className="text-slate-400 text-sm">
            Read authentic reviews from clients who trusted ShootBook for their once-in-a-lifetime events.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-7 rounded-2xl bg-[#0d0f14] border border-slate-800 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-[#d4af37]">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <div className="font-cinzel text-sm font-bold text-white">{t.name}</div>
                <div className="text-[11px] text-[#d4af37] mt-0.5">{t.event}</div>
                <div className="text-[10px] text-slate-500">{t.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 lg:py-24 bg-[#0a0c10] border-t border-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <div className="text-xs font-semibold tracking-widest text-[#d4af37] uppercase">
            Got Questions?
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-sm">
            Everything you need to know about our pre-booking policies, gear, and deliverables.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-[#0d0f14] border border-slate-800 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 text-sm font-semibold text-white hover:text-[#d4af37] transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#d4af37] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
