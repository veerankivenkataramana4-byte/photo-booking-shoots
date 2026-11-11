import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import {
  MapPin,
  Phone,
  Mail,
  Send,
  Camera,
  Film,
  Sparkles
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <div className="py-16 lg:py-24 bg-[#08090b] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Story */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="text-xs font-semibold tracking-widest text-[#d4af37] uppercase flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The ShootBook Philosophy</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Cinematic Art Meets Operational Precision
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            ShootBook was established by a collective of award-winning cinematographers and candid
            photographers who grew tired of the uncertainty, hidden costs, and double-booking risks
            inherent in traditional event services.
          </p>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Today, ShootBook operates a verified network of 120+ vetted specialists across India.
            Every shoot is backed by algorithmic schedule locking, cinema-grade camera rigs, and
            strict delivery SLAs so our clients can immerse themselves in their milestone moments.
          </p>
        </div>

        {/* Studio Equipment Arsenal */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#0d0f14] border border-slate-800 space-y-8">
          <div className="text-center space-y-2">
            <h3 className="font-cinzel text-2xl font-bold text-white">Our Production Gear Arsenal</h3>
            <p className="text-xs text-slate-400">
              We shoot strictly on calibrated cinema bodies, prime glass, and studio lighting setups.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="p-5 rounded-xl bg-[#121620] border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#19202e] text-[#d4af37] flex items-center justify-center">
                <Camera className="w-5 h-5" />
              </div>
              <h4 className="font-cinzel text-base font-bold text-white">Stills & Medium Format</h4>
              <ul className="space-y-1.5 text-slate-400">
                <li>• Hasselblad X2D 100C (100MP Medium Format)</li>
                <li>• Sony Alpha 1 & Canon EOS R5</li>
                <li>• Sony G-Master & Canon L-Series Prime Lenses</li>
                <li>• Profoto B10X Studio Strobes & Softboxes</li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-[#121620] border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#19202e] text-[#d4af37] flex items-center justify-center">
                <Film className="w-5 h-5" />
              </div>
              <h4 className="font-cinzel text-base font-bold text-white">Cinema Line Motion</h4>
              <ul className="space-y-1.5 text-slate-400">
                <li>• Sony FX6 & FX3 Full-Frame Cinema Cameras</li>
                <li>• 10-bit 4:2:2 S-Log3 with Custom Film LUTs</li>
                <li>• DJI RS 3 Pro 3-Axis Gimbal Stabilizers</li>
                <li>• Sennheiser AVX & Rode Wireless Pro Audio</li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-[#121620] border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#19202e] text-[#d4af37] flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-cinzel text-base font-bold text-white">Aerial & Heirlooms</h4>
              <ul className="space-y-1.5 text-slate-400">
                <li>• DJI Inspire 3 & Mavic 3 Pro Cine</li>
                <li>• DGCA Compliant & Insured Commercial Pilots</li>
                <li>• Italian Handcrafted Velvet Flush-Mount Albums</li>
                <li>• Archival 100-Year Fuji Crystal Photographic Prints</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ContactSection: React.FC = () => {
  const { showToast } = useBooking();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    showToast('Your inquiry has been received. Our senior studio director will contact you within 2 hours.', 'success');
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <div className="py-16 lg:py-24 bg-[#0a0c10] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact info & Studio addresses */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="text-xs font-semibold tracking-widest text-[#d4af37] uppercase mb-1">
                Direct Studio Concierge
              </div>
              <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Connect With Our Team
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                Have bespoke questions about destination travel, celebrity protocol, or customized multi-day coverage?
                Our directors are available for private consultations.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-[#0d0f14] border border-slate-800 flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">Mumbai Studio (Flagship)</div>
                  <div className="text-slate-400 mt-0.5">
                    Suite 402, Signature One, Linking Road, Bandra West, Mumbai 400050
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0d0f14] border border-slate-800 flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">Bangalore Experience Centre</div>
                  <div className="text-slate-400 mt-0.5">
                    14 Indiranagar 100ft Road, Stage 2, Bangalore 560038
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0d0f14] border border-slate-800 flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">New Delhi Heritage Suite</div>
                  <div className="text-slate-400 mt-0.5">
                    Mehrauli-Gurgaon Road, Sultanpur, New Delhi 110030
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <div className="flex items-center gap-2 text-slate-300">
                  <Phone className="w-4 h-4 text-[#d4af37]" />
                  <span>+91 99000 11223</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Mail className="w-4 h-4 text-[#d4af37]" />
                  <span>concierge@shootbook.in</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#0d0f14] border border-slate-800 shadow-2xl">
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white mb-2">
                Send a Bespoke Shoot Inquiry
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Tell us about your event vision, dates, and creative aspirations.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Radhika Sharma"
                      className="w-full bg-[#121620] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. radhika@example.com"
                      className="w-full bg-[#121620] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">Phone / WhatsApp Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98450 00000"
                    className="w-full bg-[#121620] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">Event Vision & Logistics</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your dates, venue city, guest scale, and whether you require drone or cinema reels..."
                    className="w-full bg-[#121620] border border-slate-700 rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-xs font-bold text-black bg-[#d4af37] hover:bg-[#e5c07b] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-950/40"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Inquiry to Studio Director</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
