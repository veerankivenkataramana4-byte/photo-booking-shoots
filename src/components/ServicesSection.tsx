import React, { useState } from 'react';
import { PHOTOGRAPHY_SERVICES, VIDEOGRAPHY_SERVICES } from '../data/initialData';
import { useBooking } from '../context/BookingContext';
import { Camera, Film, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'photography' | 'videography'>('photography');
  const { openBookingModal } = useBooking();

  const services = activeTab === 'photography' ? PHOTOGRAPHY_SERVICES : VIDEOGRAPHY_SERVICES;

  return (
    <section id="services-section" className="py-16 lg:py-24 bg-[#0a0c10] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#d4af37] uppercase">
            <span>Production Craft & Technical Mastery</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Photography & Videography Services
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            From high-fashion prime lenses to 10-bit cinema camera bodies and 4K aerial drones, explore our
            curated production capabilities with transparent deliverables and fast turnarounds.
          </p>

          {/* Interactive Toggle for Photography vs Videography */}
          <div className="inline-flex p-1.5 rounded-xl bg-[#11141c] border border-slate-800 mt-4">
            <button
              onClick={() => setActiveTab('photography')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'photography'
                  ? 'bg-[#d4af37] text-black shadow-lg shadow-amber-950/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>Photography Services</span>
            </button>
            <button
              onClick={() => setActiveTab('videography')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'videography'
                  ? 'bg-[#d4af37] text-black shadow-lg shadow-amber-950/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Film className="w-4 h-4" />
              <span>Cinematography & Video</span>
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {services.map((svc) => (
            <div
              key={svc.id}
              className="rounded-2xl bg-[#0e1117] border border-slate-800 hover:border-[#d4af37]/60 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-black/70 flex flex-col justify-between"
            >
              <div>
                {/* Media Image */}
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img
                    src={svc.sampleImage}
                    alt={svc.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e1117] via-black/30 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                    <span className="text-[11px] font-mono text-slate-300 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>{svc.duration}</span>
                    </span>
                    <span className="font-cinzel text-base font-bold text-[#d4af37] tabular-nums">
                      From ₹{svc.startingPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <h3 className="font-cinzel text-lg font-bold text-white">{svc.name}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{svc.description}</p>

                  {/* Deliverables List */}
                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                      Included Deliverables:
                    </div>
                    {svc.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => openBookingModal(undefined, svc.name)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-black bg-[#d4af37] hover:bg-[#e5c07b] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-amber-950/30"
                >
                  <span>Book {svc.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
