import React from 'react';
import { HERO_IMAGE } from '../data/initialData';
import { useBooking } from '../context/BookingContext';
import { Sparkles, ArrowRight, ShieldCheck, Video, Award } from 'lucide-react';

interface HeroProps {
  onExploreServices: () => void;
  onExplorePackages: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreServices, onExplorePackages }) => {
  const { openBookingModal } = useBooking();

  return (
    <div className="relative overflow-hidden bg-[#08090b] pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-[#d4af37]/10 via-[#d4af37]/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Screen Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-6 space-y-6">
            {/* Clean unboxed kicker with separator */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-[#d4af37] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>India’s Premier Visual Production Pre-Booking Platform</span>
            </div>

            <h1 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] text-balance">
              Capture Every Moment,{' '}
              <span className="gold-gradient-text block mt-1">Create Memories Forever.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              Pre-book top-tier photographers, cinematographers, and drone directors for weddings,
              milestone celebrations, and corporate galas. Guaranteed date locking, transparent package
              pricing, and cinema-grade storytelling.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => openBookingModal()}
                className="px-6 py-3.5 text-sm font-bold text-black bg-gradient-to-r from-[#d4af37] via-[#e5c07b] to-[#c5a059] rounded-xl hover:shadow-xl hover:shadow-[#d4af37]/25 transition-all transform active:scale-95 flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Book Your Shoot</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreServices}
                className="px-6 py-3.5 text-sm font-semibold text-slate-200 hover:text-white bg-[#12151c] hover:bg-[#181d26] border border-slate-700/80 hover:border-[#d4af37]/60 rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer"
              >
                Explore Services & Gear
              </button>
            </div>

            {/* Quiet trust markers */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                <span>Zero Double Booking Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-[#d4af37]" />
                <span>4K Cinema & Aerial Drones</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#d4af37]" />
                <span>Magazine-Grade Retouching</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Media */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl group">
              <img
                src={HERO_IMAGE}
                alt="Cinematic luxury wedding photography in royal ballroom"
                className="w-full h-[400px] sm:h-[480px] lg:h-[520px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

              {/* Floating Caption Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#090b0e]/85 backdrop-blur-md border border-slate-800/80 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-mono text-[#d4af37] uppercase tracking-wider">
                    Featured Masterpiece
                  </div>
                  <div className="text-sm font-semibold text-white">The Royal Ballroom Waltz · Udaipur</div>
                  <div className="text-xs text-slate-400 mt-0.5">Shot on Sony FX3 Cinema Line · 85mm f/1.4</div>
                </div>
                <button
                  onClick={onExplorePackages}
                  className="px-3 py-1.5 text-xs font-medium text-black bg-[#d4af37] hover:bg-[#e5c07b] rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  View Packages
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column KPI Metric Strip below hero split */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-xl bg-[#0d0f14] border border-slate-800/60">
            <div className="font-cinzel text-2xl sm:text-3xl font-bold text-white tabular-nums">
              14,500<span className="text-[#d4af37]">+</span>
            </div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">
              Moments Captured
            </div>
          </div>
          <div className="p-4 rounded-xl bg-[#0d0f14] border border-slate-800/60">
            <div className="font-cinzel text-2xl sm:text-3xl font-bold text-white tabular-nums">
              120<span className="text-[#d4af37]">+</span>
            </div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">
              Vetted Specialists
            </div>
          </div>
          <div className="p-4 rounded-xl bg-[#0d0f14] border border-slate-800/60">
            <div className="font-cinzel text-2xl sm:text-3xl font-bold text-white tabular-nums">
              99.8<span className="text-[#d4af37]">%</span>
            </div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">
              On-Time Crew Arrival
            </div>
          </div>
          <div className="p-4 rounded-xl bg-[#0d0f14] border border-slate-800/60">
            <div className="font-cinzel text-2xl sm:text-3xl font-bold text-white tabular-nums">
              4.96<span className="text-[#d4af37]">/5</span>
            </div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">
              Verified Client Rating
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
