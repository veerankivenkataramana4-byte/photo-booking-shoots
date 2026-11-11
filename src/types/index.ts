export type ShootServiceType = 'photography' | 'videography' | 'both';

export type PackageTier = 'basic' | 'standard' | 'premium';

export type BookingStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Payment Pending'
  | 'In Progress'
  | 'Completed'
  | 'Cancelled';

export interface EventCategory {
  id: string;
  name: string;
  tagline: string;
  group: 'Wedding Events' | 'Birthday & Celebration' | 'Corporate Events' | 'Personal Photoshoots' | 'Other Events';
  shootTypes: string[];
  startingPrice: number;
  image: string;
  popular?: boolean;
}

export interface ServiceDetail {
  id: string;
  name: string;
  type: 'photography' | 'videography';
  description: string;
  startingPrice: number;
  duration: string;
  deliverables: string[];
  sampleImage: string;
}

export interface PackageDetail {
  tier: PackageTier;
  title: string;
  description: string;
  teamSize: string;
  duration: string;
  coverage: string;
  deliverables: string[];
  multiplier: number; // base price * multiplier
  isPopular?: boolean;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: 'team' | 'equipment' | 'delivery' | 'addon';
}

export interface Booking {
  id: string;
  bookingCode: string; // e.g. SB-2026-4921
  createdAt: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventCategory: string;
  shootType: string;
  serviceType: ShootServiceType;
  packageTier: PackageTier;
  packageName: string;
  eventDate: string;
  eventTime: string;
  eventDurationHours: number;
  eventLocation: string;
  guestCount?: number;
  specialRequirements?: string;
  selectedAddOns: string[];
  basePrice: number;
  addOnsPrice: number;
  taxAmount: number;
  discountAmount: number;
  totalPrice: number;
  advancePaid: number;
  paymentMethod?: 'razorpay_upi' | 'razorpay_card' | 'razorpay_netbanking' | 'pay_on_confirmation';
  paymentStatus: 'Paid' | 'Advance Paid' | 'Unpaid';
  status: BookingStatus;
  assignedTeamMember?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  city?: string;
  avatar?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  client: string;
  location: string;
  image: string;
  aspect: 'landscape' | 'portrait' | 'square';
  camera: string;
  lens: string;
  settings: string;
  featured?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  experienceYears: number;
  assignedBookingsCount: number;
  status: 'Available' | 'On Shoot' | 'Booked';
  rating: number;
}
