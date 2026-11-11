import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { BookingStatus, PackageTier } from '../types';
import {
  ShieldCheck,
  DollarSign,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  Edit2,
  Save,
  Search,
  SlidersHorizontal,
  Sparkles
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    bookings,
    categories,
    packages,
    teamMembers,
    updateBookingStatus,
    assignTeamMember,
    updateCategoryPrice,
    updatePackageMultiplier
  } = useBooking();
  const { user } = useAuth();

  const [activeAdminTab, setActiveAdminTab] = useState<'bookings' | 'pricing' | 'team'>('bookings');
  const [bookingSearch, setBookingSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Pricing editor state
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [newCategoryPrice, setNewCategoryPrice] = useState<number>(0);

  // Package multiplier editor state
  const [editingTier, setEditingTier] = useState<PackageTier | null>(null);
  const [newMultiplier, setNewMultiplier] = useState<number>(1);

  // Revenue analytics
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
  const advanceCollected = bookings.reduce((sum, b) => sum + (b.advancePaid || 0), 0);
  const activeShootsCount = bookings.filter((b) => ['Confirmed', 'In Progress'].includes(b.status)).length;
  const pendingRequestsCount = bookings.filter((b) => b.status === 'Pending').length;

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    const query = bookingSearch.toLowerCase().trim();
    const matchesSearch =
      !query ||
      b.bookingCode.toLowerCase().includes(query) ||
      b.customerName.toLowerCase().includes(query) ||
      b.eventCategory.toLowerCase().includes(query) ||
      b.eventLocation.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  const handleSavePrice = (catId: string) => {
    if (newCategoryPrice > 0) {
      updateCategoryPrice(catId, newCategoryPrice);
      setEditingCategoryId(null);
    }
  };

  const handleSaveMultiplier = (tier: PackageTier) => {
    if (newMultiplier > 0) {
      updatePackageMultiplier(tier, newMultiplier);
      setEditingTier(null);
    }
  };

  return (
    <div className="py-10 lg:py-14 bg-[#08090b] min-h-[90vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#d4af37] uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Studio Master Control Center</span>
            </div>
            <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Admin & Operations Dashboard
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Manage live client reservations, assign cinematography crews, and calibrate package prices.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono bg-[#121620] border border-slate-800 rounded-xl px-4 py-2 self-start sm:self-auto">
            <span className="text-slate-400">Authenticated:</span>
            <span className="text-[#d4af37] font-semibold">{user?.email || 'admin@shootbook.com'}</span>
          </div>
        </div>

        {/* 4 KPI Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#0e1117] border border-slate-800 space-y-2">
            <div className="text-xs text-slate-400 flex items-center justify-between">
              <span>Total Pipeline Volume</span>
              <DollarSign className="w-4 h-4 text-[#d4af37]" />
            </div>
            <div className="font-cinzel text-2xl sm:text-3xl font-bold text-white tabular-nums">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-emerald-400 font-mono">
              ₹{advanceCollected.toLocaleString('en-IN')} collected
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0e1117] border border-slate-800 space-y-2">
            <div className="text-xs text-slate-400 flex items-center justify-between">
              <span>Total Reservations</span>
              <Calendar className="w-4 h-4 text-[#d4af37]" />
            </div>
            <div className="font-cinzel text-2xl sm:text-3xl font-bold text-white tabular-nums">
              {bookings.length}
            </div>
            <div className="text-[11px] text-slate-400">Across 14 categories</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0e1117] border border-slate-800 space-y-2">
            <div className="text-xs text-slate-400 flex items-center justify-between">
              <span>Active Shoots</span>
              <Clock className="w-4 h-4 text-blue-400" />
            </div>
            <div className="font-cinzel text-2xl sm:text-3xl font-bold text-blue-300 tabular-nums">
              {activeShootsCount}
            </div>
            <div className="text-[11px] text-slate-400">Confirmed or on-site</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0e1117] border border-slate-800 space-y-2">
            <div className="text-xs text-slate-400 flex items-center justify-between">
              <span>Pending Reviews</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="font-cinzel text-2xl sm:text-3xl font-bold text-amber-300 tabular-nums">
              {pendingRequestsCount}
            </div>
            <div className="text-[11px] text-slate-400">Awaiting coordinator review</div>
          </div>
        </div>

        {/* Tab switcher: Bookings Management vs Pricing Manager vs Team Rosters */}
        <div className="flex border-b border-slate-800 gap-6 text-sm">
          <button
            onClick={() => setActiveAdminTab('bookings')}
            className={`pb-3 font-semibold transition-all cursor-pointer ${
              activeAdminTab === 'bookings'
                ? 'text-[#d4af37] border-b-2 border-[#d4af37]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Reservation Management ({bookings.length})
          </button>
          <button
            onClick={() => setActiveAdminTab('pricing')}
            className={`pb-3 font-semibold transition-all cursor-pointer ${
              activeAdminTab === 'pricing'
                ? 'text-[#d4af37] border-b-2 border-[#d4af37]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Package & Price Calibration
          </button>
          <button
            onClick={() => setActiveAdminTab('team')}
            className={`pb-3 font-semibold transition-all cursor-pointer ${
              activeAdminTab === 'team'
                ? 'text-[#d4af37] border-b-2 border-[#d4af37]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Cinematographer Roster & Allocation
          </button>
        </div>

        {/* TAB 1: RESERVATIONS TABLE & STATUS EDITING */}
        {activeAdminTab === 'bookings' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter by Code, Name, Event..."
                  value={bookingSearch}
                  onChange={(e) => setBookingSearch(e.target.value)}
                  className="w-full bg-[#101319] border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                {['All', 'Pending', 'Confirmed', 'Payment Pending', 'In Progress', 'Completed', 'Cancelled'].map(
                  (st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer ${
                        statusFilter === st
                          ? 'bg-[#d4af37] text-black font-semibold'
                          : 'bg-[#101319] text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {st}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Table */}
            <div className="rounded-2xl border border-slate-800 bg-[#0d0f14] overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#121620] text-slate-400 border-b border-slate-800 uppercase text-[10px] tracking-wider font-mono">
                  <tr>
                    <th className="p-4">ID & Date</th>
                    <th className="p-4">Client</th>
                    <th className="p-4">Event & Package</th>
                    <th className="p-4">Revenue</th>
                    <th className="p-4">Assigned Crew</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-4 whitespace-nowrap">
                        <div className="font-mono font-bold text-[#d4af37]">{b.bookingCode}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {b.eventDate} ({b.eventTime})
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="font-semibold text-white">{b.customerName}</div>
                        <div className="text-[11px] text-slate-400">{b.customerPhone}</div>
                        <div className="text-[10px] text-slate-500 truncate max-w-[150px]">
                          {b.customerEmail}
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="font-medium text-white">{b.eventCategory}</div>
                        <div className="text-[11px] text-[#d4af37]">{b.packageName}</div>
                        <div className="text-[10px] text-slate-400 truncate max-w-[180px]">
                          {b.eventLocation}
                        </div>
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        <div className="font-cinzel font-bold text-white tabular-nums">
                          ₹{b.totalPrice.toLocaleString('en-IN')}
                        </div>
                        <div className="text-[10px] text-emerald-400">
                          ₹{b.advancePaid.toLocaleString('en-IN')} advance
                        </div>
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        <select
                          value={b.assignedTeamMember || ''}
                          onChange={(e) => assignTeamMember(b.id, e.target.value)}
                          className="bg-[#151a24] border border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-[#d4af37]"
                        >
                          <option value="">Unassigned</option>
                          {teamMembers.map((tm) => (
                            <option key={tm.id} value={tm.name}>
                              {tm.name} ({tm.status})
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        <select
                          value={b.status}
                          onChange={(e) => updateBookingStatus(b.id, e.target.value as BookingStatus)}
                          className={`rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-none border ${
                            b.status === 'Confirmed'
                              ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                              : b.status === 'In Progress'
                              ? 'bg-blue-950 text-blue-300 border-blue-800'
                              : b.status === 'Completed'
                              ? 'bg-purple-950 text-purple-300 border-purple-800'
                              : b.status === 'Cancelled'
                              ? 'bg-rose-950 text-rose-300 border-rose-800'
                              : 'bg-slate-800 text-slate-300 border-slate-700'
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Payment Pending">Payment Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        <button
                          onClick={() => {
                            const details = `Booking: ${b.bookingCode}\nCustomer: ${b.customerName} (${b.customerPhone})\nEvent: ${b.eventCategory} on ${b.eventDate} at ${b.eventTime}\nVenue: ${b.eventLocation}\nSpecial Req: ${b.specialRequirements || 'None'}\nTotal: ₹${b.totalPrice}`;
                            alert(details);
                          }}
                          className="text-[11px] text-[#d4af37] hover:underline"
                        >
                          View Brief
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: PRICING & PACKAGE MULTIPLIER CALIBRATION */}
        {activeAdminTab === 'pricing' && (
          <div className="space-y-8">
            {/* Category Starting Prices Editor */}
            <div className="p-6 rounded-2xl bg-[#0d0f14] border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h3 className="font-cinzel text-xl font-bold text-white">
                    Category Base Starting Prices (INR)
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Live dynamic updates. Changes modify the instant calculator across the website.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((cat) => {
                  const isEditing = editingCategoryId === cat.id;

                  return (
                    <div
                      key={cat.id}
                      className="p-4 rounded-xl bg-[#121620] border border-slate-800 space-y-2 flex flex-col justify-between"
                    >
                      <div>
                        <div className="text-[10px] text-[#d4af37] uppercase font-mono">{cat.group}</div>
                        <h4 className="font-semibold text-white text-sm">{cat.name}</h4>
                      </div>

                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                        {isEditing ? (
                          <div className="flex items-center gap-2 w-full">
                            <span className="text-xs text-slate-400">₹</span>
                            <input
                              type="number"
                              value={newCategoryPrice}
                              onChange={(e) => setNewCategoryPrice(Number(e.target.value))}
                              className="w-28 bg-[#090b0e] border border-[#d4af37] rounded px-2 py-1 text-xs text-white"
                            />
                            <button
                              onClick={() => handleSavePrice(cat.id)}
                              className="p-1.5 rounded bg-[#d4af37] text-black hover:bg-[#e5c07b]"
                            >
                              <Save className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <span className="font-cinzel text-base font-bold text-[#d4af37] tabular-nums">
                              ₹{cat.startingPrice.toLocaleString('en-IN')}
                            </span>
                            <button
                              onClick={() => {
                                setEditingCategoryId(cat.id);
                                setNewCategoryPrice(cat.startingPrice);
                              }}
                              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white border border-slate-700 px-2.5 py-1 rounded-lg"
                            >
                              <Edit2 className="w-3 h-3" />
                              <span>Edit</span>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Package Tier Multipliers */}
            <div className="p-6 rounded-2xl bg-[#0d0f14] border border-slate-800 space-y-4">
              <h3 className="font-cinzel text-xl font-bold text-white">
                Package Tier Multipliers
              </h3>
              <p className="text-xs text-slate-400">
                Calibrates how standard and premium tiers are computed relative to the category starting price.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(['basic', 'standard', 'premium'] as PackageTier[]).map((tier) => {
                  const pkg = packages[tier];
                  const isEditing = editingTier === tier;

                  return (
                    <div
                      key={tier}
                      className="p-5 rounded-xl bg-[#121620] border border-slate-800 space-y-3"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-cinzel text-base font-bold text-white uppercase">{tier} Tier</span>
                        <span className="text-xs text-[#d4af37] font-mono">{pkg.duration}</span>
                      </div>

                      <div className="text-xs text-slate-400">{pkg.description}</div>

                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                        {isEditing ? (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-400">Multiplier:</span>
                            <input
                              type="number"
                              step="0.05"
                              value={newMultiplier}
                              onChange={(e) => setNewMultiplier(Number(e.target.value))}
                              className="w-20 bg-[#090b0e] border border-[#d4af37] rounded px-2 py-1 text-xs text-white"
                            />
                            <button
                              onClick={() => handleSaveMultiplier(tier)}
                              className="p-1.5 rounded bg-[#d4af37] text-black hover:bg-[#e5c07b]"
                            >
                              <Save className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <span className="font-mono text-xs text-slate-300">
                              Multiplier: <strong className="text-[#d4af37]">{pkg.multiplier}x</strong>
                            </span>
                            <button
                              onClick={() => {
                                setEditingTier(tier);
                                setNewMultiplier(pkg.multiplier);
                              }}
                              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white border border-slate-700 px-2 py-1 rounded"
                            >
                              <Edit2 className="w-3 h-3" />
                              <span>Adjust</span>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CINEMATOGRAPHER ROSTER */}
        {activeAdminTab === 'team' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((tm) => (
              <div
                key={tm.id}
                className="p-6 rounded-2xl bg-[#0d0f14] border border-slate-800 space-y-4 shadow-xl"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-cinzel text-lg font-bold text-white">{tm.name}</h3>
                    <div className="text-xs text-[#d4af37] mt-0.5">{tm.role}</div>
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      tm.status === 'Available'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}
                  >
                    {tm.status}
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">{tm.specialty}</p>

                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800 text-center">
                  <div className="p-2 rounded-lg bg-[#141822]">
                    <div className="font-mono text-sm font-bold text-white">{tm.experienceYears} yrs</div>
                    <div className="text-[10px] text-slate-400">Experience</div>
                  </div>
                  <div className="p-2 rounded-lg bg-[#141822]">
                    <div className="font-mono text-sm font-bold text-white">{tm.assignedBookingsCount}</div>
                    <div className="text-[10px] text-slate-400">Shoots Done</div>
                  </div>
                  <div className="p-2 rounded-lg bg-[#141822]">
                    <div className="font-mono text-sm font-bold text-[#d4af37]">★ {tm.rating}</div>
                    <div className="text-[10px] text-slate-400">Rating</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
