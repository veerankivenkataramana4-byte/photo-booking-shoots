import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { BookingStatus, Booking } from '../types';
import { RazorpayModal } from './RazorpayModal';
import {
  Calendar,
  Clock,
  MapPin,
  Camera,
  CheckCircle2,
  AlertCircle,
  FileText,
  User,
  CreditCard,
  XCircle,
  Sparkles
} from 'lucide-react';

export const MyBookingsView: React.FC = () => {
  const { bookings, updateBookingStatus, openBookingModal } = useBooking();
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedBookingForPayment, setSelectedBookingForPayment] = useState<Booking | null>(null);

  // Filter bookings for the current logged-in user or show all if demo
  const userBookings = bookings.filter((b) => {
    if (!user) return true;
    if (user.role === 'admin') return true;
    return (
      b.customerEmail.toLowerCase() === user.email.toLowerCase() ||
      b.userId === user.id ||
      user.email === 'rohit@example.com'
    );
  });

  const filteredBookings = userBookings.filter((b) => {
    if (statusFilter === 'All') return true;
    if (statusFilter === 'Upcoming') {
      return ['Pending', 'Confirmed', 'Payment Pending', 'In Progress'].includes(b.status);
    }
    return b.status === statusFilter;
  });

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-emerald-950/80 text-emerald-300 border border-emerald-800';
      case 'In Progress':
        return 'bg-blue-950/80 text-blue-300 border border-blue-800';
      case 'Completed':
        return 'bg-purple-950/80 text-purple-300 border border-purple-800';
      case 'Payment Pending':
        return 'bg-amber-950/80 text-amber-300 border border-amber-800';
      case 'Cancelled':
        return 'bg-rose-950/80 text-rose-300 border border-rose-800';
      case 'Pending':
      default:
        return 'bg-slate-800 text-slate-300 border border-slate-700';
    }
  };

  return (
    <div className="py-12 lg:py-16 bg-[#08090b] min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-800">
          <div>
            <div className="text-xs font-semibold tracking-widest text-[#d4af37] uppercase flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Client Portal & Productions</span>
            </div>
            <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-tight">
              My Shoot Bookings
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Track your shoot schedule, assigned master crew, deliverables, and payment receipts.
            </p>
          </div>

          <button
            onClick={() => openBookingModal()}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-black bg-[#d4af37] hover:bg-[#e5c07b] transition-all cursor-pointer shadow-md shadow-amber-950/40 self-start md:self-auto"
          >
            + Book Another Shoot
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 pt-6 pb-8 overflow-x-auto scrollbar-none">
          {['All', 'Upcoming', 'Confirmed', 'In Progress', 'Completed', 'Cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                statusFilter === st
                  ? 'bg-[#d4af37] text-black font-semibold'
                  : 'bg-[#101319] text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="py-20 text-center rounded-2xl bg-[#0d0f14] border border-slate-800 space-y-4">
            <Camera className="w-12 h-12 text-[#d4af37]/50 mx-auto" />
            <h3 className="font-cinzel text-xl font-bold text-white">No Bookings Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              You do not have any bookings under the "{statusFilter}" filter. Ready to capture your next memory?
            </p>
            <button
              onClick={() => openBookingModal()}
              className="px-5 py-2 rounded-xl text-xs font-bold text-black bg-[#d4af37] hover:bg-[#e5c07b]"
            >
              Book Your Shoot Now
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredBookings.map((bk) => (
              <div
                key={bk.id}
                className="p-6 sm:p-7 rounded-2xl bg-[#0d0f14] border border-slate-800 hover:border-slate-700 transition-all space-y-6 shadow-xl"
              >
                {/* Top Row: Code, Event & Status */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-[#d4af37]">
                        {bk.bookingCode}
                      </span>
                      <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded ${getStatusBadge(bk.status)}`}>
                        {bk.status}
                      </span>
                    </div>
                    <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white">
                      {bk.eventCategory} · <span className="text-slate-300 font-sans text-base">{bk.shootType}</span>
                    </h3>
                  </div>

                  <div className="text-right sm:self-center">
                    <div className="text-xs text-slate-400">Total Investment</div>
                    <div className="font-cinzel text-xl font-bold text-[#d4af37] tabular-nums">
                      ₹{bk.totalPrice.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-slate-300">
                  <div className="flex items-start gap-2.5">
                    <Calendar className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[11px] text-slate-400">Event Date & Time</div>
                      <div className="font-medium text-white">
                        {bk.eventDate} at {bk.eventTime}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {bk.eventDurationHours} Hours Coverage
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[11px] text-slate-400">Location</div>
                      <div className="font-medium text-white truncate max-w-[180px]">
                        {bk.eventLocation}
                      </div>
                      {bk.guestCount && (
                        <div className="text-[10px] text-slate-500">{bk.guestCount} Guests Expected</div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Camera className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[11px] text-slate-400">Selected Package</div>
                      <div className="font-medium text-[#d4af37]">{bk.packageName}</div>
                      <div className="text-[10px] text-slate-500 capitalize">{bk.serviceType} coverage</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <User className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[11px] text-slate-400">Assigned Studio Lead</div>
                      <div className="font-medium text-white">
                        {bk.assignedTeamMember || 'Assigning Senior Specialist...'}
                      </div>
                      <div className="text-[10px] text-emerald-400">
                        {bk.assignedTeamMember ? '✓ Crew Confirmed' : 'In Allocation'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Production Progress Timeline */}
                <div className="p-4 rounded-xl bg-[#11141c] border border-slate-800/80">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Production Timeline
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-center text-[11px]">
                    {[
                      { step: '1. Date Reserved', done: true },
                      {
                        step: '2. Crew Assigned',
                        done: ['Confirmed', 'In Progress', 'Completed'].includes(bk.status)
                      },
                      {
                        step: '3. Pre-Shoot Brief',
                        done: ['Confirmed', 'In Progress', 'Completed'].includes(bk.status)
                      },
                      {
                        step: '4. Shoot Execution',
                        done: ['In Progress', 'Completed'].includes(bk.status)
                      },
                      {
                        step: '5. Gallery Delivery',
                        done: bk.status === 'Completed'
                      }
                    ].map((st, i) => (
                      <div
                        key={i}
                        className={`p-2 rounded-lg border flex flex-col items-center gap-1 ${
                          st.done
                            ? 'bg-[#15201b] border-emerald-500/30 text-emerald-300'
                            : 'bg-[#0d0f14] border-slate-800 text-slate-500'
                        }`}
                      >
                        <CheckCircle2
                          className={`w-3.5 h-3.5 ${st.done ? 'text-emerald-400' : 'text-slate-600'}`}
                        />
                        <span>{st.step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Actions & Payment Status */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-slate-800/80">
                  <div className="flex items-center gap-4 text-xs">
                    <div>
                      <span className="text-slate-400">Payment Status: </span>
                      <span className="font-bold text-white">{bk.paymentStatus}</span>
                      <span className="text-slate-400 text-[11px] ml-1">
                        (₹{bk.advancePaid.toLocaleString('en-IN')} paid)
                      </span>
                    </div>
                    {bk.totalPrice > bk.advancePaid && (
                      <div className="text-amber-300">
                        Balance due on delivery: ₹{(bk.totalPrice - bk.advancePaid).toLocaleString('en-IN')}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {bk.paymentStatus === 'Unpaid' && (
                      <button
                        onClick={() => setSelectedBookingForPayment(bk)}
                        className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-black bg-[#d4af37] hover:bg-[#e5c07b] flex items-center gap-1.5 cursor-pointer"
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>Pay Advance Online</span>
                      </button>
                    )}

                    <button
                      onClick={() => window.print()}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-800 hover:text-white flex items-center gap-1.5 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>Invoice Receipt</span>
                    </button>

                    {['Pending', 'Confirmed', 'Payment Pending'].includes(bk.status) && (
                      <button
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to cancel booking ${bk.bookingCode}?`)) {
                            updateBookingStatus(bk.id, 'Cancelled');
                          }
                        }}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium text-rose-400 hover:bg-rose-950/30 flex items-center gap-1.5 cursor-pointer"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Cancel Booking</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Razorpay Modal for pending payment */}
      {selectedBookingForPayment && (
        <RazorpayModal
          amount={Math.round(selectedBookingForPayment.totalPrice * 0.3)}
          bookingCode={selectedBookingForPayment.bookingCode}
          customerName={selectedBookingForPayment.customerName}
          customerEmail={selectedBookingForPayment.customerEmail}
          onSuccess={(_payId, method) => {
            updateBookingStatus(selectedBookingForPayment.id, 'Confirmed');
            setSelectedBookingForPayment(null);
          }}
          onClose={() => setSelectedBookingForPayment(null)}
        />
      )}
    </div>
  );
};
