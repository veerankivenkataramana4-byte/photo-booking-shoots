import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { Camera, Calendar, User, ShieldCheck, LogOut, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  openAuthModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab, openAuthModal }) => {
  const { user, logout, loginDemoAdmin } = useAuth();
  const { openBookingModal, bookings } = useBooking();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const customerBookingsCount = bookings.filter(
    (b) => user && (b.customerEmail === user.email || b.userId === user.id)
  ).length;

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#08090b]/90 backdrop-blur-md border-b border-[#222630]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left focus:outline-none shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4af37] via-[#b8972e] to-[#7a5e12] flex items-center justify-center shadow-lg shadow-amber-950/30">
            <Camera className="w-5 h-5 text-black" />
          </div>
          <div className="leading-tight">
            <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-wider text-white">
              SHOOT<span className="text-[#d4af37]">BOOK</span>
            </span>
            <div className="text-[10px] tracking-widest text-slate-400 font-sans uppercase">
              Every Moment, Perfectly Captured
            </div>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => handleNavClick('home')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#d4af37] ${
              currentTab === 'home' ? 'text-[#d4af37] font-semibold' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('categories')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#d4af37] ${
              currentTab === 'categories' ? 'text-[#d4af37] font-semibold' : ''
            }`}
          >
            Events
          </button>
          <button
            onClick={() => handleNavClick('services')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#d4af37] ${
              currentTab === 'services' ? 'text-[#d4af37] font-semibold' : ''
            }`}
          >
            Services
          </button>
          <button
            onClick={() => handleNavClick('packages')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#d4af37] ${
              currentTab === 'packages' ? 'text-[#d4af37] font-semibold' : ''
            }`}
          >
            Packages
          </button>
          <button
            onClick={() => handleNavClick('portfolio')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#d4af37] ${
              currentTab === 'portfolio' ? 'text-[#d4af37] font-semibold' : ''
            }`}
          >
            Portfolio
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#d4af37] ${
              currentTab === 'about' ? 'text-[#d4af37] font-semibold' : ''
            }`}
          >
            About
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#d4af37] ${
              currentTab === 'contact' ? 'text-[#d4af37] font-semibold' : ''
            }`}
          >
            Contact
          </button>
          {user && (
            <button
              onClick={() => handleNavClick(user.role === 'admin' ? 'admin' : 'my-bookings')}
              className={`relative flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-[#d4af37] ${
                currentTab === 'my-bookings' || currentTab === 'admin' ? 'text-[#d4af37] font-semibold' : ''
              }`}
            >
              {user.role === 'admin' ? (
                <>
                  <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                  <span>Admin Panel</span>
                </>
              ) : (
                <>
                  <Calendar className="w-4 h-4" />
                  <span>My Bookings</span>
                  {customerBookingsCount > 0 && (
                    <span className="w-5 h-5 text-[11px] rounded-full bg-[#d4af37] text-black font-bold flex items-center justify-center ml-1">
                      {customerBookingsCount}
                    </span>
                  )}
                </>
              )}
            </button>
          )}
        </nav>

        {/* Zone 3: Primary Action & Profile */}
        <div className="flex items-center gap-3 shrink-0">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-700 hover:border-slate-500 bg-[#12151b] text-xs text-slate-200 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[#d4af37] font-bold text-[10px]">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="max-w-[100px] truncate hidden sm:inline">{user.name.split(' ')[0]}</span>
                {user.role === 'admin' && (
                  <span className="text-[10px] text-[#d4af37] font-mono">ADM</span>
                )}
              </button>

              {profileDropdownOpen && (
                <div
                  onMouseLeave={() => setProfileDropdownOpen(false)}
                  className="absolute right-0 mt-2 w-56 rounded-xl bg-[#12151c] border border-slate-800 shadow-2xl py-2 z-50 text-xs"
                >
                  <div className="px-4 py-2 border-b border-slate-800/80">
                    <p className="font-semibold text-white truncate">{user.name}</p>
                    <p className="text-slate-400 truncate">{user.email}</p>
                    <span className="inline-block mt-1 text-[10px] uppercase font-mono text-[#d4af37]">
                      {user.role} Account
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      handleNavClick('my-bookings');
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-slate-800/60 text-slate-300 hover:text-white flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-[#d4af37]" />
                    <span>My Bookings ({customerBookingsCount})</span>
                  </button>
                  {user.role === 'admin' ? (
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        handleNavClick('admin');
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-800/60 text-slate-300 hover:text-white flex items-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                      <span>Admin Control Center</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        loginDemoAdmin();
                        handleNavClick('admin');
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-800/60 text-amber-300 hover:text-amber-200 flex items-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Switch to Demo Admin</span>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      logout();
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-rose-950/30 text-rose-400 flex items-center gap-2 border-t border-slate-800/60"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={openAuthModal}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white border border-slate-800 hover:border-slate-600 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <User className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Login</span>
            </button>
          )}

          {/* Primary CTA */}
          <button
            onClick={() => openBookingModal()}
            className="px-4 py-2 text-xs font-semibold text-black bg-gradient-to-r from-[#d4af37] via-[#e5c07b] to-[#c5a059] rounded-lg hover:shadow-lg hover:shadow-[#d4af37]/20 transition-all transform active:scale-95 whitespace-nowrap shrink-0"
          >
            Book Your Shoot
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0d0f13] border-b border-slate-800 px-4 pt-3 pb-6 space-y-2">
          <button
            onClick={() => handleNavClick('home')}
            className="block w-full text-left py-2 px-3 rounded-lg text-slate-200 hover:bg-slate-800/50"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('categories')}
            className="block w-full text-left py-2 px-3 rounded-lg text-slate-200 hover:bg-slate-800/50"
          >
            Explore Events
          </button>
          <button
            onClick={() => handleNavClick('services')}
            className="block w-full text-left py-2 px-3 rounded-lg text-slate-200 hover:bg-slate-800/50"
          >
            Photography & Videography
          </button>
          <button
            onClick={() => handleNavClick('packages')}
            className="block w-full text-left py-2 px-3 rounded-lg text-slate-200 hover:bg-slate-800/50"
          >
            Packages & Pricing
          </button>
          <button
            onClick={() => handleNavClick('portfolio')}
            className="block w-full text-left py-2 px-3 rounded-lg text-slate-200 hover:bg-slate-800/50"
          >
            Portfolio Gallery
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className="block w-full text-left py-2 px-3 rounded-lg text-slate-200 hover:bg-slate-800/50"
          >
            About Studio
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className="block w-full text-left py-2 px-3 rounded-lg text-slate-200 hover:bg-slate-800/50"
          >
            Contact
          </button>
          <button
            onClick={() => handleNavClick('my-bookings')}
            className="block w-full text-left py-2 px-3 rounded-lg text-[#d4af37] hover:bg-slate-800/50"
          >
            My Bookings ({customerBookingsCount})
          </button>
          <button
            onClick={() => handleNavClick('admin')}
            className="block w-full text-left py-2 px-3 rounded-lg text-amber-400 hover:bg-slate-800/50"
          >
            Admin Dashboard
          </button>
        </div>
      )}
    </header>
  );
};
