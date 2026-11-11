import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { Check, Star, Plus, ShieldCheck, ArrowRight } from 'lucide-react';
import { PackageTier } from '../types';

export const PackagesSection: React.FC = () => {
  const { packages, categories, addOns, openBookingModal } = useBooking();
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>(
    categories[0]?.name || 'Wedding Photography'
  );
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const selectedCategory =
    categories.find((c) => c.name === selectedCategoryName) || categories[0];
  const basePrice = selectedCategory?.startingPrice || 24999;

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const calculatePackagePrice = (tier: PackageTier) => {
    const pkg = packages[tier];
    const multiplier = pkg ? pkg.multiplier : 1;
    return Math.round(basePrice * multiplier);
  };

  const handleBookPackage = (tier: PackageTier) => {
    openBookingModal(selectedCategoryName, undefined, tier);
  };

  return (
    <section id="packages-section" className="py-16 lg:py-24 bg-[#08090b] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#d4af37] uppercase">
            <span>Transparent Investment</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Curated Packages & Add-ons
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Select your event type to preview dynamically calibrated package pricing. Every package includes
            professional color grading, backup equipment, and secured digital delivery.
          </p>

          {/* Interactive Event Selector Dropdown / Pills */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-slate-400 mr-2">Select Event Category:</span>
            <select
              value={selectedCategoryName}
              onChange={(e) => setSelectedCategoryName(e.target.value)}
              className="bg-[#12151c] text-slate-200 border border-slate-700 rounded-xl px-4 py-2 text-xs font-medium focus:outline-none focus:border-[#d4af37]"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name} (Base: ₹{cat.startingPrice.toLocaleString('en-IN')})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 3 Packages Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12 items-stretch">
          {(['basic', 'standard', 'premium'] as PackageTier[]).map((tier) => {
            const pkg = packages[tier];
            const price = calculatePackagePrice(tier);
            const isStandard = tier === 'standard';

            return (
              <div
                key={tier}
                className={`relative rounded-2xl flex flex-col justify-between transition-all duration-300 ${
                  isStandard
                    ? 'bg-[#10131a] border-2 border-[#d4af37] shadow-2xl shadow-amber-950/30 scale-100 lg:-translate-y-2'
                    : 'bg-[#0d0f14] border border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Popular ribbon for standard */}
                {isStandard && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#d4af37] to-[#e5c07b] text-black text-[11px] font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow">
                    Most Popular Choice
                  </div>
                )}

                <div className="p-7 sm:p-8 space-y-6">
                  {/* Title & Tagline */}
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-widest text-[#d4af37]">
                      {tier} Tier
                    </div>
                    <h3 className="font-cinzel text-2xl font-bold text-white mt-1">{pkg.title}</h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">{pkg.description}</p>
                  </div>

                  {/* Price */}
                  <div className="pt-4 border-t border-slate-800/80">
                    <div className="flex items-baseline gap-2">
                      <span className="font-cinzel text-3xl sm:text-4xl font-bold text-white tabular-nums">
                        ₹{price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-slate-400">+ 18% GST</span>
                    </div>
                    <div className="text-[11px] text-[#d4af37] mt-1 font-mono">
                      {pkg.duration} · {pkg.teamSize}
                    </div>
                  </div>

                  {/* Deliverables List */}
                  <div className="space-y-3 pt-4 border-t border-slate-800/80">
                    <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Included in this package:
                    </div>
                    {pkg.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Button */}
                <div className="p-7 sm:p-8 pt-0">
                  <button
                    onClick={() => handleBookPackage(tier)}
                    className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      isStandard
                        ? 'bg-gradient-to-r from-[#d4af37] via-[#e5c07b] to-[#c5a059] text-black hover:shadow-xl hover:shadow-[#d4af37]/30'
                        : 'bg-[#181d26] text-white hover:bg-[#d4af37] hover:text-black border border-slate-700/80'
                    }`}
                  >
                    <span>Choose {pkg.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bespoke Add-ons Section */}
        <div className="mt-16 pt-12 border-t border-slate-800/80">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-semibold tracking-widest text-[#d4af37] uppercase">
                Optional Enhancements
              </div>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white mt-1">
                Bespoke Production Add-Ons
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Customize your shoot with specialized gear, extra crew members, or expedited deliveries.
              </p>
            </div>
            <div className="text-xs text-slate-400">
              Selected in preview: <span className="text-[#d4af37] font-bold">{selectedAddons.length} add-ons</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {addOns.map((addon) => {
              const isSelected = selectedAddons.includes(addon.id);
              return (
                <div
                  key={addon.id}
                  onClick={() => toggleAddon(addon.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                    isSelected
                      ? 'bg-[#121620] border-[#d4af37] shadow-lg shadow-amber-950/20'
                      : 'bg-[#0d0f14] border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">{addon.name}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{addon.description}</p>
                    <div className="text-xs font-cinzel font-bold text-[#d4af37] pt-1 tabular-nums">
                      +₹{addon.price.toLocaleString('en-IN')}{' '}
                      <span className="text-[10px] text-slate-500 font-sans">({addon.unit})</span>
                    </div>
                  </div>

                  <button
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-[#d4af37] text-black'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {isSelected ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
