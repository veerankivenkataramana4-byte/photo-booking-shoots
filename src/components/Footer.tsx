import React from 'react';
import { Camera, Instagram, Youtube, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#050608] border-t border-slate-900 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4af37] via-[#b8972e] to-[#7a5e12] flex items-center justify-center">
                <Camera className="w-5 h-5 text-black" />
              </div>
              <div className="leading-tight">
                <span className="font-cinzel text-2xl font-bold tracking-wider text-white">
                  SHOOT<span className="text-[#d4af37]">BOOK</span>
                </span>
                <div className="text-[10px] tracking-widest text-[#d4af37] uppercase font-mono">
                  Every Moment, Perfectly Captured
                </div>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              India's leading pre-booking studio network connecting families, creators, and enterprises
              with award-winning photographers, cinematographers, and drone directors.
            </p>

            <div className="flex items-center gap-3 pt-2 text-slate-300">
              <a
                href="#instagram"
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 rounded-lg bg-[#12151d] hover:bg-[#d4af37] hover:text-black flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#youtube"
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 rounded-lg bg-[#12151d] hover:bg-[#d4af37] hover:text-black flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="#linkedin"
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 rounded-lg bg-[#12151d] hover:bg-[#d4af37] hover:text-black flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Event Categories */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-sm font-bold text-white uppercase tracking-wider">
              Event Categories
            </h4>
            <ul className="space-y-2">
              {['Wedding Photography', 'Wedding Cinematography', 'Pre-wedding Shoots', 'Birthday Celebrations', 'Corporate Summits', 'Fashion Portfolios'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => onNavigate('categories')}
                    className="hover:text-[#d4af37] transition-colors text-left"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services & Packages */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-sm font-bold text-white uppercase tracking-wider">
              Production & Gear
            </h4>
            <ul className="space-y-2">
              {['Candid Photography', 'Drone Aerials', 'Sony FX3 Cinema Rigs', 'Flush-Mount Albums', 'Instagram Reels Edit', 'Package Calibrator'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => onNavigate('services')}
                    className="hover:text-[#d4af37] transition-colors text-left"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Studio Presence */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-sm font-bold text-white uppercase tracking-wider">
              Studio Locations
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                <span>Bandra West, Mumbai</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                <span>Indiranagar, Bangalore</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                <span>MG Road, New Delhi</span>
              </div>
              <div className="flex items-center gap-2 pt-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>+91 99000 11223</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>concierge@shootbook.in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} ShootBook Visual Studios Pvt. Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>GST Registered</span>
            <span aria-hidden="true">·</span>
            <span>Zero Double Booking Guarantee</span>
            <span aria-hidden="true">·</span>
            <span>Razorpay Secured</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
