import React, { useState, useEffect } from 'react';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import {
  PackageTier,
  ShootServiceType,
  Booking
} from '../types';
import { RazorpayModal } from './RazorpayModal';
import {
  X,
  Check,
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Printer
} from 'lucide-react';

interface BookingModalProps {
  onGoToMyBookings?: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ onGoToMyBookings }) => {
  const {
    isBookingModalOpen,
    closeBookingModal,
    categories,
    packages,
    addOns,
    preselectedData,
    checkDateAvailability,
    createBooking
  } = useBooking();
  const { user } = useAuth();

  // Wizard state: 1 to 9
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form Fields
  const [selectedCategory, setSelectedCategory] = useState<string>(
    preselectedData.category || categories[0]?.name || 'Wedding Photography'
  );
  const [serviceType, setServiceType] = useState<ShootServiceType>('both');
  const [selectedShootType, setSelectedShootType] = useState<string>('');
  const [selectedPackageTier, setSelectedPackageTier] = useState<PackageTier>(
    preselectedData.packageTier || 'standard'
  );

  // Date & Time
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 7);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];

  const [eventDate, setEventDate] = useState<string>(defaultDateStr);
  const [eventTime, setEventTime] = useState<string>('16:00');
  const [eventDurationHours, setEventDurationHours] = useState<number>(8);

  // Customer & Location
  const [customerName, setCustomerName] = useState<string>(user?.name || '');
  const [customerEmail, setCustomerEmail] = useState<string>(user?.email || '');
  const [customerPhone, setCustomerPhone] = useState<string>(user?.phone || '+91 98765 43210');
  const [eventLocation, setEventLocation] = useState<string>('Grand Ballroom / Taj Mahal Palace, Mumbai');
  const [guestCount, setGuestCount] = useState<number>(150);
  const [specialRequirements, setSpecialRequirements] = useState<string>('');

  // Add-ons
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  // Confirmation output
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);
  const [isRazorpayOpen, setIsRazorpayOpen] = useState(false);

  // Sync preselected data when modal opens
  useEffect(() => {
    if (preselectedData.category) {
      setSelectedCategory(preselectedData.category);
    }
    if (preselectedData.shootType) {
      setSelectedShootType(preselectedData.shootType);
    }
    if (preselectedData.packageTier) {
      setSelectedPackageTier(preselectedData.packageTier);
    }
  }, [preselectedData, isBookingModalOpen]);

  useEffect(() => {
    if (user) {
      if (!customerName) setCustomerName(user.name);
      if (!customerEmail) setCustomerEmail(user.email);
      if (!customerPhone && user.phone) setCustomerPhone(user.phone);
    }
  }, [user]);

  // Selected Category Object
  const currentCatObj =
    categories.find((c) => c.name === selectedCategory) || categories[0];

  // Initialize shoot type if empty
  useEffect(() => {
    if (!selectedShootType && currentCatObj?.shootTypes[0]) {
      setSelectedShootType(currentCatObj.shootTypes[0]);
    }
  }, [currentCatObj, selectedShootType]);

  if (!isBookingModalOpen) return null;

  // Real-time Date availability check
  const availability = checkDateAvailability(eventDate, eventTime, eventDurationHours);

  // Calculations
  const basePrice = Math.round(
    (currentCatObj?.startingPrice || 24999) * (packages[selectedPackageTier]?.multiplier || 1.65)
  );

  const addOnsPrice = selectedAddOns.reduce((total, id) => {
    const item = addOns.find((a) => a.id === id);
    return total + (item ? item.price : 0);
  }, 0);

  const subtotal = basePrice + addOnsPrice;
  const taxAmount = Math.round(subtotal * 0.18);
  const discountAmount = selectedPackageTier === 'premium' ? 3000 : 0;
  const totalPrice = subtotal + taxAmount - discountAmount;
  const advanceAmount = Math.round(totalPrice * 0.3); // 30% advance deposit

  const toggleAddon = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const handleFinalizeBooking = (
    paymentStatus: 'Paid' | 'Advance Paid' | 'Unpaid',
    paymentMethod?: any
  ) => {
    const newBk = createBooking({
      userId: user?.id || 'guest',
      customerName: customerName || 'Valued Guest',
      customerEmail: customerEmail || 'guest@example.com',
      customerPhone: customerPhone || '+91 99999 00000',
      eventCategory: selectedCategory,
      shootType: selectedShootType || currentCatObj?.shootTypes[0] || 'Event Shoot',
      serviceType,
      packageTier: selectedPackageTier,
      packageName: packages[selectedPackageTier]?.title || 'Standard Package',
      eventDate,
      eventTime,
      eventDurationHours,
      eventLocation,
      guestCount,
      specialRequirements,
      selectedAddOns,
      basePrice,
      addOnsPrice,
      taxAmount,
      discountAmount,
      totalPrice,
      advancePaid: paymentStatus === 'Unpaid' ? 0 : advanceAmount,
      paymentMethod,
      paymentStatus,
      status: paymentStatus === 'Unpaid' ? 'Pending' : 'Confirmed'
    });

    setCreatedBooking(newBk);
    setCurrentStep(9);
  };

  const handleClose = () => {
    setCurrentStep(1);
    setCreatedBooking(null);
    closeBookingModal();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#0e1117] border border-slate-700/80 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl relative my-auto">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-[#121620]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#d4af37] text-black font-bold flex items-center justify-center text-xs">
              {currentStep < 9 ? `${currentStep}/8` : '✓'}
            </div>
            <div>
              <h3 className="font-cinzel text-base sm:text-lg font-bold text-white">
                {currentStep === 9
                  ? 'Booking Confirmed'
                  : `Step ${currentStep}: ${
                      [
                        '',
                        'Select Event Category',
                        'Choose Coverage & Shoot Type',
                        'Select Package Tier',
                        'Schedule Date & Time',
                        'Location & Contact Details',
                        'Enhance with Add-ons',
                        'Review Transparent Price Breakdown',
                        'Confirm & Reserve Shoot'
                      ][currentStep]
                    }`}
              </h3>
              <p className="text-[11px] text-slate-400">
                ShootBook Verified Crew Reservation System
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        {currentStep < 9 && (
          <div className="w-full bg-slate-800 h-1">
            <div
              className="bg-gradient-to-r from-[#d4af37] to-[#fce08c] h-1 transition-all duration-300"
              style={{ width: `${(currentStep / 8) * 100}%` }}
            />
          </div>
        )}

        {/* Step Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto space-y-6">
          {/* STEP 1: Select Event Category */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="text-xs text-slate-400">
                Choose the occasion or event you want professional visual coverage for:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedCategory === cat.name
                        ? 'bg-[#151a24] border-[#d4af37] shadow-lg shadow-amber-950/30'
                        : 'bg-[#10131a] border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-[10px] text-[#d4af37] font-semibold uppercase">
                      {cat.group}
                    </div>
                    <div className="font-cinzel text-sm font-bold text-white mt-1">{cat.name}</div>
                    <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">{cat.tagline}</div>
                    <div className="text-xs text-[#d4af37] font-semibold mt-2 tabular-nums">
                      Starts ₹{cat.startingPrice.toLocaleString('en-IN')}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Coverage & Shoot Type */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
                  Select Coverage Medium:
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'photography', label: 'Photography Only', desc: 'High-res stills & candids' },
                    { id: 'videography', label: 'Videography Only', desc: 'Cinematic 4K films & reels' },
                    { id: 'both', label: 'Both (Photo + Video)', desc: 'Full dual crew coverage' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setServiceType(item.id as ShootServiceType)}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                        serviceType === item.id
                          ? 'bg-[#151a24] border-[#d4af37] text-white'
                          : 'bg-[#10131a] border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="text-xs font-bold text-white">{item.label}</div>
                      <div className="text-[11px] text-slate-400 mt-1">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
                  Specific Shoot Specialization ({currentCatObj?.name}):
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {currentCatObj?.shootTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedShootType(type)}
                      className={`p-3 rounded-lg border text-left text-xs transition-colors cursor-pointer ${
                        selectedShootType === type
                          ? 'bg-[#19202d] border-[#d4af37] text-[#d4af37] font-semibold'
                          : 'bg-[#10131a] border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Choose Package */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="text-xs text-slate-400">
                Choose the package tier that aligns with your timeline, team size, and deliverables:
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(['basic', 'standard', 'premium'] as PackageTier[]).map((tier) => {
                  const pkg = packages[tier];
                  const tierPrice = Math.round(
                    (currentCatObj?.startingPrice || 24999) * pkg.multiplier
                  );
                  const isSelected = selectedPackageTier === tier;

                  return (
                    <div
                      key={tier}
                      onClick={() => setSelectedPackageTier(tier)}
                      className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#151b26] border-2 border-[#d4af37] shadow-xl shadow-amber-950/30'
                          : 'bg-[#10131a] border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-semibold uppercase text-[#d4af37]">
                            {tier}
                          </span>
                          {tier === 'standard' && (
                            <span className="text-[10px] bg-[#d4af37] text-black font-bold px-2 py-0.5 rounded">
                              POPULAR
                            </span>
                          )}
                        </div>
                        <h4 className="font-cinzel text-lg font-bold text-white">{pkg.title}</h4>
                        <div className="font-cinzel text-2xl font-bold text-white tabular-nums">
                          ₹{tierPrice.toLocaleString('en-IN')}
                        </div>
                        <div className="text-[11px] text-[#d4af37] font-mono">{pkg.teamSize}</div>
                        <div className="text-xs text-slate-400 leading-relaxed">{pkg.description}</div>

                        <div className="space-y-1.5 pt-3 border-t border-slate-800">
                          {pkg.deliverables.slice(0, 3).map((d, i) => (
                            <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                              <Check className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                              <span>{d}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 mt-4 border-t border-slate-800/80">
                        <button
                          className={`w-full py-2 rounded-lg text-xs font-semibold ${
                            isSelected
                              ? 'bg-[#d4af37] text-black'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {isSelected ? 'Selected Package' : 'Select'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Date, Time & Availability Check */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-slate-400 block mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Event Date</span>
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full bg-[#10131a] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Event Starting Time</span>
                  </label>
                  <input
                    type="time"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    className="w-full bg-[#10131a] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1.5">
                    Coverage Duration
                  </label>
                  <select
                    value={eventDurationHours}
                    onChange={(e) => setEventDurationHours(Number(e.target.value))}
                    className="w-full bg-[#10131a] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value={4}>4 Hours (Half Day)</option>
                    <option value={6}>6 Hours</option>
                    <option value={8}>8 Hours (Full Day)</option>
                    <option value={10}>10 Hours (Extended)</option>
                    <option value={12}>12 Hours (Complete Wedding Day)</option>
                  </select>
                </div>
              </div>

              {/* Live Availability Status Card */}
              <div
                className={`p-5 rounded-xl border flex items-start gap-3.5 ${
                  availability.available
                    ? 'bg-[#0f1912] border-emerald-500/40 text-emerald-200'
                    : 'bg-[#1f1010] border-rose-500/40 text-rose-200'
                }`}
              >
                {availability.available ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="text-sm font-semibold text-white">
                    {availability.available
                      ? 'Slot Available for Booking!'
                      : 'Slot Fully Reserved'}
                  </div>
                  <p className="text-xs mt-1 leading-relaxed text-slate-300">
                    {availability.available
                      ? `Our certified studio crews are available on ${eventDate} from ${eventTime} for ${eventDurationHours} hours. Once confirmed, this slot will be locked.`
                      : availability.reason}
                  </p>
                  {!availability.available && availability.recommendedAlternativeTime && (
                    <div className="mt-2 text-xs text-[#d4af37]">
                      Recommended Alternative Time: {availability.recommendedAlternativeTime} on the same day.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Location & Customer Contact Info */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Customer Full Name *</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Rohit Verma"
                    className="w-full bg-[#10131a] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="e.g. rohit@example.com"
                    className="w-full bg-[#10131a] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Mobile / WhatsApp Number *</label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. +91 98450 12345"
                    className="w-full bg-[#10131a] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Expected Guests</label>
                  <div className="relative">
                    <Users className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="number"
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      placeholder="150"
                      className="w-full bg-[#10131a] border border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">
                  Event Location / Venue Address *
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                    placeholder="e.g. The Taj Mahal Palace, Colaba, Mumbai"
                    className="w-full bg-[#10131a] border border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: Add-ons & Special Requirements */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
                  Select Optional Add-ons:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {addOns.map((addon) => {
                    const isSelected = selectedAddOns.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#161c28] border-[#d4af37]'
                            : 'bg-[#10131a] border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-semibold text-white">{addon.name}</div>
                          <div className="text-[11px] text-slate-400">{addon.description}</div>
                          <div className="text-xs text-[#d4af37] font-cinzel font-bold mt-1 tabular-nums">
                            +₹{addon.price.toLocaleString('en-IN')}
                          </div>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-[#d4af37] text-black' : 'border border-slate-700'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">
                  Special Requirements / Creative Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  value={specialRequirements}
                  onChange={(e) => setSpecialRequirements(e.target.value)}
                  placeholder="e.g. We want drone footage of the fireworks entry and candid portraits of grandparents."
                  className="w-full bg-[#10131a] border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>
          )}

          {/* STEP 7: Transparent Price Breakdown */}
          {currentStep === 7 && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-[#121620] border border-slate-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="font-cinzel text-lg font-bold text-white">Investment Summary</div>
                  <span className="text-xs font-mono text-[#d4af37]">{selectedPackageTier.toUpperCase()} TIER</span>
                </div>

                <div className="space-y-2.5 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span>
                      {selectedCategory} ({packages[selectedPackageTier]?.title})
                    </span>
                    <span className="font-mono tabular-nums">₹{basePrice.toLocaleString('en-IN')}</span>
                  </div>

                  {selectedAddOns.map((id) => {
                    const addon = addOns.find((a) => a.id === id);
                    if (!addon) return null;
                    return (
                      <div key={id} className="flex justify-between text-slate-400">
                        <span>+ {addon.name}</span>
                        <span className="font-mono tabular-nums">
                          ₹{addon.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                    );
                  })}

                  <div className="flex justify-between pt-2 border-t border-slate-800 text-slate-400">
                    <span>Subtotal</span>
                    <span className="font-mono tabular-nums">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex justify-between text-slate-400">
                    <span>Standard GST (18%)</span>
                    <span className="font-mono tabular-nums">₹{taxAmount.toLocaleString('en-IN')}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Premium Tier Seasonal Privilege</span>
                      <span className="font-mono tabular-nums">-₹{discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="flex justify-between pt-3 border-t border-slate-700 text-sm font-bold text-white">
                    <span>Total Estimated Investment</span>
                    <span className="font-cinzel text-xl text-[#d4af37] tabular-nums">
                      ₹{totalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#090c10] border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-200">Recommended 30% Advance Deposit:</div>
                    <div className="text-[11px] text-slate-400">Locks your date and reserves your assigned crew.</div>
                  </div>
                  <div className="font-cinzel text-base font-bold text-[#d4af37] tabular-nums">
                    ₹{advanceAmount.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 8: Confirm & Choose Payment Option */}
          {currentStep === 8 && (
            <div className="space-y-6">
              <div className="text-center max-w-md mx-auto space-y-2">
                <Sparkles className="w-8 h-8 text-[#d4af37] mx-auto" />
                <h4 className="font-cinzel text-xl font-bold text-white">
                  Confirm Your Shoot Reservation
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Lock your date instantly with an online advance deposit via Razorpay, or submit a
                  booking request to receive a callback from our senior coordinator.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {/* Option A: Razorpay Advance */}
                <div
                  onClick={() => setIsRazorpayOpen(true)}
                  className="p-5 rounded-2xl bg-[#141924] border-2 border-[#d4af37] hover:bg-[#181f2e] transition-all cursor-pointer flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold bg-[#d4af37] text-black px-2 py-0.5 rounded">
                      RECOMMENDED
                    </span>
                    <h5 className="font-cinzel text-base font-bold text-white">
                      Instant Advance Lock (₹{advanceAmount.toLocaleString('en-IN')})
                    </h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Instant date reservation via UPI, Cards, or NetBanking on Razorpay Test Gateway. Zero risk.
                    </p>
                  </div>
                  <button className="w-full py-2.5 rounded-xl text-xs font-bold text-black bg-[#d4af37] hover:bg-[#e5c07b]">
                    Pay Advance & Confirm Now
                  </button>
                </div>

                {/* Option B: Submit Request */}
                <div
                  onClick={() => handleFinalizeBooking('Unpaid')}
                  className="p-5 rounded-2xl bg-[#10131a] border border-slate-700 hover:border-slate-500 transition-all cursor-pointer flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                      PAY ON CONFIRMATION
                    </span>
                    <h5 className="font-cinzel text-base font-bold text-white">
                      Submit Booking Inquiry
                    </h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Submit your reservation request for review. You can complete the advance payment
                      after studio coordination.
                    </p>
                  </div>
                  <button className="w-full py-2.5 rounded-xl text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700">
                    Submit Reservation Request
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 9: Confirmation Screen with Booking Code & Receipt */}
          {currentStep === 9 && createdBooking && (
            <div className="text-center py-4 space-y-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#d4af37]">
                  Reservation Confirmed
                </span>
                <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white mt-1">
                  Your Shoot Has Been Reserved!
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  A confirmation email with calendar invites and receipt has been sent to{' '}
                  <span className="text-white font-medium">{createdBooking.customerEmail}</span>.
                </p>
              </div>

              {/* Booking Pass / Receipt Card */}
              <div className="max-w-md mx-auto p-6 rounded-2xl bg-[#121620] border border-slate-800 text-left space-y-4 shadow-xl">
                <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-mono">Unique Booking ID</div>
                    <div className="font-mono text-base font-bold text-[#d4af37]">
                      {createdBooking.bookingCode}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-2.5 py-1 rounded text-[11px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {createdBooking.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Event:</span>
                    <span className="font-semibold text-white">{createdBooking.eventCategory}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Date & Time:</span>
                    <span className="font-semibold text-white">
                      {createdBooking.eventDate} at {createdBooking.eventTime} ({createdBooking.eventDurationHours} hrs)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Venue:</span>
                    <span className="font-semibold text-white truncate max-w-[220px]">
                      {createdBooking.eventLocation}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Package:</span>
                    <span className="font-semibold text-[#d4af37]">{createdBooking.packageName}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-800">
                    <span className="text-slate-400">Total Investment:</span>
                    <span className="font-bold text-white">
                      ₹{createdBooking.totalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Advance Paid:</span>
                    <span className="font-bold text-emerald-400">
                      ₹{createdBooking.advancePaid.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex gap-2">
                  <button
                    onClick={() => window.print()}
                    className="flex-1 py-2 rounded-lg text-xs font-medium text-slate-300 bg-slate-800 hover:text-white flex items-center justify-center gap-1.5"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Receipt</span>
                  </button>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    handleClose();
                    if (onGoToMyBookings) onGoToMyBookings();
                  }}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-black bg-[#d4af37] hover:bg-[#e5c07b] cursor-pointer"
                >
                  View in My Bookings
                </button>
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white border border-slate-800"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls (Step navigation) */}
        {currentStep < 9 && (
          <div className="px-6 py-4 border-t border-slate-800 bg-[#121620] flex items-center justify-between">
            <button
              onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <div className="text-[11px] text-slate-500 font-mono hidden sm:block">
              ShootBook Pre-Booking Wizard
            </div>

            {currentStep < 8 ? (
              <button
                onClick={() => {
                  if (currentStep === 4 && !availability.available) {
                    return;
                  }
                  setCurrentStep((prev) => prev + 1);
                }}
                disabled={currentStep === 4 && !availability.available}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-[#d4af37] to-[#e5c07b] hover:shadow-lg hover:shadow-amber-950/30 flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : null}
          </div>
        )}
      </div>

      {/* Razorpay Gateway Modal */}
      {isRazorpayOpen && (
        <RazorpayModal
          amount={advanceAmount}
          bookingCode={`SB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`}
          customerName={customerName}
          customerEmail={customerEmail}
          onSuccess={(payId, method) => {
            setIsRazorpayOpen(false);
            handleFinalizeBooking('Advance Paid', method);
          }}
          onClose={() => setIsRazorpayOpen(false)}
        />
      )}
    </div>
  );
};
