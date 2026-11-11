import React, { useState, useMemo } from 'react';
import { useBooking } from '../context/BookingContext';
import { Search, SlidersHorizontal, ArrowUpRight, Sparkles } from 'lucide-react';

interface EventCategoriesSectionProps {
  onSelectCategory?: (categoryName: string) => void;
}

export const EventCategoriesSection: React.FC<EventCategoriesSectionProps> = ({ onSelectCategory }) => {
  const { categories, openBookingModal } = useBooking();
  const [activeGroup, setActiveGroup] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc'>('recommended');

  const groups = ['All', 'Wedding Events', 'Birthday & Celebration', 'Corporate Events', 'Personal Photoshoots', 'Other Events'];

  const filteredCategories = useMemo(() => {
    return categories
      .filter((cat) => {
        const matchesGroup = activeGroup === 'All' || cat.group === activeGroup;
        const query = searchQuery.toLowerCase().trim();
        const matchesQuery =
          !query ||
          cat.name.toLowerCase().includes(query) ||
          cat.tagline.toLowerCase().includes(query) ||
          cat.shootTypes.some((t) => t.toLowerCase().includes(query));
        return matchesGroup && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.startingPrice - b.startingPrice;
        if (sortBy === 'price-desc') return b.startingPrice - a.startingPrice;
        return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
      });
  }, [categories, activeGroup, searchQuery, sortBy]);

  const handleBook = (catName: string, shootType?: string) => {
    if (onSelectCategory) {
      onSelectCategory(catName);
    }
    openBookingModal(catName, shootType);
  };

  return (
    <section id="categories-section" className="py-16 lg:py-24 bg-[#08090b] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-800/80">
          <div>
            <div className="text-xs font-semibold tracking-widest text-[#d4af37] uppercase flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tailored Visual Experiences</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Explore Event Categories
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-xl">
              Choose from specialized crews equipped with industry-leading prime lenses, medium-format sensors, and cinema drones.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search wedding, drone, baby..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#101318] border border-slate-800 focus:border-[#d4af37] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Filter Bar & Sort Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6">
          {/* Segmented Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {groups.map((group) => (
              <button
                key={group}
                onClick={() => setActiveGroup(group)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  activeGroup === group
                    ? 'bg-[#d4af37] text-black font-semibold shadow-md shadow-amber-950/40'
                    : 'bg-[#101319] text-slate-400 hover:text-slate-200 hover:bg-[#161a22] border border-slate-800'
                }`}
              >
                {group}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 text-xs text-slate-400 self-end sm:self-auto shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#101319] border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-[#d4af37]"
            >
              <option value="recommended">Featured & Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pt-4">
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              className="group rounded-2xl bg-[#0d0f14] border border-slate-800 hover:border-[#d4af37]/60 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/60 flex flex-col justify-between"
            >
              <div>
                {/* Media Image container */}
                <div className="relative h-52 overflow-hidden bg-slate-900">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f14] via-black/30 to-transparent" />

                  {/* Clean unboxed text kicker */}
                  <div className="absolute top-4 left-4 text-[11px] font-medium text-amber-300 drop-shadow">
                    {cat.group}
                  </div>

                  {cat.popular && (
                    <div className="absolute top-4 right-4 text-[11px] font-semibold text-black bg-[#d4af37] px-2 py-0.5 rounded shadow">
                      Popular
                    </div>
                  )}

                  {/* Price overlay at bottom of image */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-baseline justify-between text-white">
                    <span className="text-xs text-slate-300">Starting from</span>
                    <span className="font-cinzel text-lg font-bold text-[#d4af37] tabular-nums">
                      ₹{cat.startingPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-5 space-y-3">
                  <h3 className="font-cinzel text-lg font-bold text-white group-hover:text-[#d4af37] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {cat.tagline}
                  </p>

                  {/* Shoot Types */}
                  <div className="pt-2 border-t border-slate-800/80">
                    <div className="text-[11px] font-medium text-slate-400 mb-2">Coverage Options:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.shootTypes.slice(0, 4).map((type) => (
                        <span
                          key={type}
                          className="text-[11px] text-slate-300 bg-[#141820] border border-slate-800/80 rounded px-2 py-0.5"
                        >
                          {type}
                        </span>
                      ))}
                      {cat.shootTypes.length > 4 && (
                        <span className="text-[11px] text-slate-500 self-center">
                          +{cat.shootTypes.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action footer */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => handleBook(cat.name, cat.shootTypes[0])}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-200 group-hover:text-black bg-[#151922] group-hover:bg-[#d4af37] border border-slate-700/60 group-hover:border-transparent transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Book This Shoot</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="py-16 text-center rounded-2xl bg-[#0d0f14] border border-slate-800 mt-6">
            <p className="text-slate-400 text-sm">No event category matches your search filter.</p>
            <button
              onClick={() => {
                setActiveGroup('All');
                setSearchQuery('');
              }}
              className="mt-3 text-xs text-[#d4af37] hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
