import React, { useState } from 'react';
import { PORTFOLIO_ITEMS } from '../data/initialData';
import { PortfolioItem } from '../types';
import { useBooking } from '../context/BookingContext';
import { Eye, MapPin, Camera, X, ArrowRight, Sparkles } from 'lucide-react';

export const PortfolioGallery: React.FC = () => {
  const { openBookingModal } = useBooking();
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);

  const categories = ['All', 'Wedding', 'Birthday', 'Corporate', 'Fashion'];

  const filteredItems = selectedFilter === 'All'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === selectedFilter);

  return (
    <section id="portfolio-section" className="py-16 lg:py-24 bg-[#0a0c10] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-800/80">
          <div>
            <div className="text-xs font-semibold tracking-widest text-[#d4af37] uppercase flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Visual Archive & Masterworks</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Our Visual Portfolio
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Authentic emotion, master lighting, and bespoke color grading across India’s most celebrated events.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedFilter === cat
                    ? 'bg-[#d4af37] text-black shadow-md shadow-amber-950/40'
                    : 'bg-[#12151c] text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Masonry / Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
          {filteredItems.map((item, index) => {
            const isWide = index === 0 || index === 3;
            return (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                className={`group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-[#d4af37]/70 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-black ${
                  isWide ? 'lg:col-span-2 h-[380px] sm:h-[420px]' : 'col-span-1 h-[380px] sm:h-[420px]'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:via-black/20 transition-all" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-black bg-[#d4af37] px-2.5 py-0.5 rounded shadow">
                    {item.category}
                  </span>
                  <span className="text-xs text-white/90 drop-shadow flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#d4af37]" />
                    <span className="truncate max-w-[200px]">{item.location}</span>
                  </span>
                </div>

                {/* Bottom Overlay with title and EXIF */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#090b0e]/80 backdrop-blur-md border border-slate-800/80 transition-all duration-300">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-cinzel text-base sm:text-lg font-bold text-white group-hover:text-[#d4af37] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-300 mt-0.5">Client: {item.client}</p>
                      <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 mt-1">
                        <Camera className="w-3 h-3 text-[#d4af37]" />
                        <span>{item.camera}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.settings}</span>
                      </div>
                    </div>

                    <div className="w-9 h-9 rounded-full bg-[#161a22] group-hover:bg-[#d4af37] text-slate-300 group-hover:text-black flex items-center justify-center shrink-0 transition-colors shadow">
                      <Eye className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200">
          <button
            onClick={() => setActiveItem(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-slate-900/80 text-white hover:bg-[#d4af37] hover:text-black transition-colors z-50 cursor-pointer"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-5xl w-full max-h-[90vh] flex flex-col lg:flex-row bg-[#0d0f14] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            {/* Image viewer */}
            <div className="lg:w-2/3 relative bg-black flex items-center justify-center min-h-[300px]">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="max-h-[60vh] lg:max-h-[85vh] w-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Details sidebar */}
            <div className="lg:w-1/3 p-6 sm:p-8 flex flex-col justify-between space-y-6 overflow-y-auto">
              <div className="space-y-4">
                <div className="inline-block text-[11px] font-semibold text-black bg-[#d4af37] px-3 py-1 rounded">
                  {activeItem.category} Production
                </div>

                <h3 className="font-cinzel text-2xl font-bold text-white">{activeItem.title}</h3>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Client:</span>
                    <span className="font-medium text-white">{activeItem.client}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Location:</span>
                    <span className="font-medium text-white">{activeItem.location}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Camera Rig:</span>
                    <span className="font-medium text-[#d4af37] font-mono">{activeItem.camera}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Optics:</span>
                    <span className="font-medium text-white font-mono">{activeItem.lens}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Exposure:</span>
                    <span className="font-medium text-white font-mono">{activeItem.settings}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <button
                  onClick={() => {
                    const catName = activeItem.category.includes('Wedding')
                      ? 'Wedding Photography'
                      : activeItem.category.includes('Corporate')
                      ? 'Corporate & Conferences'
                      : 'Birthday & Milestone Celebrations';
                    setActiveItem(null);
                    openBookingModal(catName);
                  }}
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold text-black bg-[#d4af37] hover:bg-[#e5c07b] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-950/40"
                >
                  <span>Book This Style of Shoot</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
