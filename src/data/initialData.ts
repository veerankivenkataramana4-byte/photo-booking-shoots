import {
  EventCategory,
  ServiceDetail,
  PackageDetail,
  AddOn,
  PortfolioItem,
  TeamMember,
  Booking
} from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_cinematic_wedding_1794374962660.jpg';
export const WEDDING_IMAGE = '/src/assets/images/category_wedding_ceremony_1794374963665.jpg';
export const BIRTHDAY_IMAGE = '/src/assets/images/category_birthday_celebration_1794374964735.jpg';
export const CORPORATE_IMAGE = '/src/assets/images/category_corporate_conference_1794374965572.jpg';
export const FASHION_IMAGE = '/src/assets/images/category_fashion_editorial_1794374964429.jpg';

export const INITIAL_CATEGORIES: EventCategory[] = [
  {
    id: 'wedding-photography',
    name: 'Wedding Photography',
    tagline: 'Timeless romance, opulent traditions, and candid celebrations',
    group: 'Wedding Events',
    shootTypes: [
      'Wedding Photography',
      'Candid Photography',
      'Traditional Photography',
      'Pre-wedding Photoshoots',
      'Engagement Photography',
      'Reception Photography'
    ],
    startingPrice: 24999,
    image: WEDDING_IMAGE,
    popular: true
  },
  {
    id: 'wedding-cinematography',
    name: 'Wedding Cinematography',
    tagline: 'Documentary feature films, drone aerials, and 4K story reels',
    group: 'Wedding Events',
    shootTypes: [
      'Wedding Cinematography',
      'Wedding Highlights & Teaser',
      'Drone Wedding Films',
      'Full Traditional Video Coverage',
      'Couple Love Story Film'
    ],
    startingPrice: 34999,
    image: HERO_IMAGE,
    popular: true
  },
  {
    id: 'pre-wedding-shoot',
    name: 'Pre-wedding Photoshoot',
    tagline: 'Scenic outdoor locations, couture styling, and intimate frames',
    group: 'Wedding Events',
    shootTypes: [
      'Destination Pre-wedding',
      'Studio Couple Shoot',
      'Heritage Palace Shoot',
      'Beach & Sunset Romance',
      'Modern Architectural'
    ],
    startingPrice: 9999,
    image: WEDDING_IMAGE,
    popular: true
  },
  {
    id: 'engagement-shoot',
    name: 'Engagement Shoot',
    tagline: 'The official beginning of your lifelong togetherness',
    group: 'Wedding Events',
    shootTypes: ['Ring Ceremony', 'Cocktail & Sangeet', 'Roka Ceremony', 'Family Portraits'],
    startingPrice: 7999,
    image: HERO_IMAGE
  },
  {
    id: 'birthday-photography',
    name: 'Birthday & Milestone Celebrations',
    tagline: 'Lively party captures, cake cutting joy, and family warmth',
    group: 'Birthday & Celebration',
    shootTypes: [
      'Kids 1st Birthday',
      'Milestone 18th / 50th / 60th',
      'Theme Decor & Portraits',
      'Cake Smash Shoot',
      'Anniversary Celebration',
      'Naming Ceremony'
    ],
    startingPrice: 3999,
    image: BIRTHDAY_IMAGE,
    popular: true
  },
  {
    id: 'anniversary-shoot',
    name: 'Anniversary Shoot',
    tagline: 'Cherishing years of love with timeless couple portraiture',
    group: 'Birthday & Celebration',
    shootTypes: ['Silver Jubilee', 'Golden Jubilee', 'Intimate Dinner Shoot', 'Family Renewal of Vows'],
    startingPrice: 4999,
    image: BIRTHDAY_IMAGE
  },
  {
    id: 'corporate-events',
    name: 'Corporate & Conferences',
    tagline: 'Executive summits, keynote addresses, and high-impact brand galas',
    group: 'Corporate Events',
    shootTypes: [
      'Conferences & Keynotes',
      'Corporate Headshots & Portfolios',
      'Product Launch Events',
      'Award Ceremonies & Gala Dinners',
      'Office Culture & Team Shoots',
      'Promotional Brand Videos'
    ],
    startingPrice: 7999,
    image: CORPORATE_IMAGE,
    popular: true
  },
  {
    id: 'fashion-portfolio',
    name: 'Fashion & Model Portfolio',
    tagline: 'Runway aesthetic, editorial lighting, and magazine-tier styling',
    group: 'Personal Photoshoots',
    shootTypes: [
      'Model Agency Portfolio',
      'High-Fashion Editorial',
      'Lookbook & Apparel Showcase',
      'Fitness & Athleisure',
      'Designer Couture Shoot'
    ],
    startingPrice: 6999,
    image: FASHION_IMAGE,
    popular: true
  },
  {
    id: 'maternity-shoot',
    name: 'Maternity Photography',
    tagline: 'Graceful silhouettes celebrating the wondrous journey of motherhood',
    group: 'Personal Photoshoots',
    shootTypes: [
      'Outdoor Golden Hour Maternity',
      'Minimalist Studio Silhouettes',
      'Couple Maternity Journey',
      'Milk Bath & Floral Concept'
    ],
    startingPrice: 5999,
    image: FASHION_IMAGE
  },
  {
    id: 'baby-photography',
    name: 'Newborn & Baby Photoshoot',
    tagline: 'Gentle, safe, and heart-melting newborn concepts and family snuggles',
    group: 'Personal Photoshoots',
    shootTypes: ['Newborn Under 15 Days', 'Sitting Baby 6-9 Months', 'Toddler Fun', 'Family Snuggles'],
    startingPrice: 4999,
    image: BIRTHDAY_IMAGE
  },
  {
    id: 'family-photoshoot',
    name: 'Family Photoshoot',
    tagline: 'Generations united in joyful heirloom portraits',
    group: 'Personal Photoshoots',
    shootTypes: ['Outdoor Park Session', 'Cozy In-Home Lifestyle', 'Generational Grandparent Shoot', 'Studio Heirlooms'],
    startingPrice: 3999,
    image: BIRTHDAY_IMAGE
  },
  {
    id: 'product-photography',
    name: 'Product & Commercial Photography',
    tagline: 'Crisp e-commerce white background, lifestyle setups, and macro details',
    group: 'Other Events',
    shootTypes: ['E-commerce Studio Flatlay', 'Hero Lifestyle Setup', 'Jewelry & Macro', 'Cosmetics & Texture'],
    startingPrice: 2999,
    image: CORPORATE_IMAGE
  },
  {
    id: 'graduation-shoot',
    name: 'Graduation & Convocation',
    tagline: 'Proud milestone frames, robe portraits, and campus memories',
    group: 'Other Events',
    shootTypes: ['Solo Convocation Cap & Gown', 'Campus Friends Group', 'Family Degree Celebration'],
    startingPrice: 3499,
    image: CORPORATE_IMAGE
  },
  {
    id: 'college-events',
    name: 'College Festivals & Cultural Events',
    tagline: 'Electrifying youth energy, dance performances, and concert coverage',
    group: 'Other Events',
    shootTypes: ['Annual College Fest', 'Music Band Concerts', 'Inter-College Sports Tournament', 'Dance Dramatics'],
    startingPrice: 5999,
    image: CORPORATE_IMAGE
  }
];

export const PHOTOGRAPHY_SERVICES: ServiceDetail[] = [
  {
    id: 'p-traditional',
    name: 'Traditional Photography',
    type: 'photography',
    description: 'Crisp, perfectly illuminated group portraits and ritual documentation ensuring every guest and family member is recorded with immaculate poise.',
    startingPrice: 4999,
    duration: '4 to 8 Hours',
    deliverables: ['150+ Edited High-Res Photos', 'All Raw Images in Cloud Drive', 'Formal Family Groupings', 'Color Corrected Gallery'],
    sampleImage: WEDDING_IMAGE
  },
  {
    id: 'p-candid',
    name: 'Candid Photography',
    type: 'photography',
    description: 'Unposed, spontaneous, and emotionally honest moments captured through ultra-fast prime lenses with natural ambient lighting.',
    startingPrice: 7999,
    duration: '5 to 10 Hours',
    deliverables: ['120+ Fine Art Retouched Frames', 'Storytelling Sequence', 'Private Password-Protected Gallery', 'High-Speed Cloud Delivery'],
    sampleImage: HERO_IMAGE
  },
  {
    id: 'p-portrait',
    name: 'Portrait & Studio Photography',
    type: 'photography',
    description: 'Artistic directional lighting, Profoto strobes, and subtle skin micro-retouching for executives, creators, and models.',
    startingPrice: 3999,
    duration: '2 to 4 Hours',
    deliverables: ['25 Master Retouched Portraits', 'Multi-Background Setup', 'Print-Ready Formats (300 DPI)', 'Commercial Rights'],
    sampleImage: FASHION_IMAGE
  },
  {
    id: 'p-drone',
    name: 'Drone Aerial Photography',
    type: 'photography',
    description: 'Breathtaking 48MP high-altitude perspectives capturing grand venues, sprawling estate layouts, and dramatic guest formations.',
    startingPrice: 5999,
    duration: '2 to 4 Hours (Subject to Weather/DGCA)',
    deliverables: ['40 Aerial Stills', 'Panoramic 360-Degree Views', 'Licensed DGCA Compliant Pilots', 'Raw DNG Files Included'],
    sampleImage: WEDDING_IMAGE
  },
  {
    id: 'p-product',
    name: 'Commercial Product Photography',
    type: 'photography',
    description: 'Sharp focus-stacked imagery highlighting textures, reflective metallics, and premium packaging for digital catalogs.',
    startingPrice: 2999,
    duration: '3 to 6 Hours',
    deliverables: ['Pure White Amazon/Shopify Standards', 'Creative Lifestyle Contexts', 'Shadow & Reflection Treatment', 'Transparent PNGs'],
    sampleImage: CORPORATE_IMAGE
  },
  {
    id: 'p-fashion',
    name: 'Fashion & Lookbook Photography',
    type: 'photography',
    description: 'High-energy editorial direction showcasing garments, silhouettes, and jewelry with avant-garde color grading.',
    startingPrice: 6999,
    duration: '4 to 8 Hours',
    deliverables: ['60 Editorial Frames', 'On-Site Tethered Viewing Monitor', 'Beauty Frequency Separation Retouching', 'Social Media Cuts'],
    sampleImage: FASHION_IMAGE
  }
];

export const VIDEOGRAPHY_SERVICES: ServiceDetail[] = [
  {
    id: 'v-cinematic',
    name: 'Cinematic Videography & Wedding Films',
    type: 'videography',
    description: 'Hollywood cinema camera rigs (Sony FX3/FX6) shooting 10-bit S-Log3 with custom color grading, orchestral sound design, and emotional voiceovers.',
    startingPrice: 18999,
    duration: 'Full Day Coverage',
    deliverables: ['4-6 Minute Cinematic Highlight Film', 'Full Event Documentary Cut (45-90 min)', '4K UHD Digital Delivery', 'Licensed Soundtrack'],
    sampleImage: HERO_IMAGE
  },
  {
    id: 'v-traditional',
    name: 'Traditional Event Videography',
    type: 'videography',
    description: 'Continuous uninterrupted tripod and gimbal recording of full ceremonies, speeches, rituals, and guest interactions.',
    startingPrice: 7999,
    duration: '5 to 8 Hours',
    deliverables: ['Full Event Master Video', 'Chapter Marker Navigation', 'Dual Audio Feed Recording', 'Full HD Pen Drive Delivery'],
    sampleImage: WEDDING_IMAGE
  },
  {
    id: 'v-drone',
    name: 'Drone 4K Cinematography',
    type: 'videography',
    description: 'Smooth gimbal-stabilized aerial tracking shots of grand entries, fireworks, outdoor ceremonies, and scenic surroundings.',
    startingPrice: 7499,
    duration: '2 to 4 Hours Flight Time',
    deliverables: ['Cinematic Aerial B-Roll Sequences', 'Color Graded 4K Footage', 'Dual Controller Operation', 'Compliant Geo-Fencing'],
    sampleImage: WEDDING_IMAGE
  },
  {
    id: 'v-reels',
    name: 'Instagram Reels & Short-Form Video',
    type: 'videography',
    description: 'Dedicated vertical 9:16 mobile videographer delivering trending, fast-cut, music-synced reels within 24 to 48 hours for immediate social buzz.',
    startingPrice: 4499,
    duration: '4 to 6 Hours',
    deliverables: ['4x Polished 9:16 Vertical Reels', 'Same-Day / 24-Hr Delivery Option', 'Trending Audio Sync', 'Captions & Motion Graphics'],
    sampleImage: BIRTHDAY_IMAGE
  },
  {
    id: 'v-commercial',
    name: 'Promotional & Corporate Videos',
    type: 'videography',
    description: 'Dynamic company profile films, customer testimonials, executive soundbites, and product launch sizzle reels.',
    startingPrice: 9999,
    duration: 'Half to Full Day',
    deliverables: ['2-Minute Main Brand Video', 'Wireless Lavalier Audio Recording', 'Teleprompter Setup on Demand', 'Subtitled Web Exports'],
    sampleImage: CORPORATE_IMAGE
  }
];

export const DEFAULT_PACKAGES: Record<string, PackageDetail> = {
  basic: {
    tier: 'basic',
    title: 'Basic Package',
    description: 'Essential professional coverage designed for intimate events and focused requirements.',
    teamSize: '1 Professional Photographer or Videographer',
    duration: 'Up to 4 Hours Coverage',
    coverage: 'Key ceremony highlights, important moments, and family portraits',
    deliverables: [
      '1 Lead Specialist on-site',
      '100+ Color-Corrected High-Resolution Photos',
      'Basic Digital Retouching',
      'Secured Cloud Gallery (6 months storage)',
      'Digital Delivery in 5-7 Days'
    ],
    multiplier: 1.0
  },
  standard: {
    tier: 'standard',
    title: 'Standard Package',
    description: 'Comprehensive coverage with dual perspectives, creative candid captures, and extended hours.',
    teamSize: '2-Person Professional Team (Lead + Candid/B-Roll)',
    duration: 'Up to 8 Hours Extended Coverage',
    coverage: 'Complete event timeline, guest arrivals, rituals, candid expressions, and decor details',
    deliverables: [
      '2 Dedicated Professionals on-site',
      '250+ Color-Graded & Retouched High-Res Photos',
      '3-5 Minute Cinematic Highlight Video (if video selected)',
      '1x Vertical Social Media Reel',
      'Online Private Client Gallery (1 Year storage)',
      'Fast-track Delivery in 3-5 Days'
    ],
    multiplier: 1.65,
    isPopular: true
  },
  premium: {
    tier: 'premium',
    title: 'Premium Package',
    description: 'The pinnacle of luxury visual storytelling with multi-angle cinema cameras, drone aerials, and bespoke albums.',
    teamSize: '3 to 4-Person Master Crew (Director, Candid, Cinema & Drone)',
    duration: 'Full Day Complete Event Coverage (Up to 12 Hours)',
    coverage: 'All-inclusive pre-event prep, golden hour portraits, grand entry, multi-cam rituals, and after-party',
    deliverables: [
      'Full Master Production Crew with Cinema Lenses',
      '500+ Magazine Retouched High-Res Photos',
      'Drone Aerial 4K Cinematography Included',
      '5-8 Minute Master Cinematic Film & Full Documentary Cut',
      '3x Instagram Reels Delivered within 48 Hours',
      'Deluxe 30-Page Hardcover Heirlooms Flush-Mount Album',
      'Lifetime Cloud Backup & VIP Dedicated Project Coordinator'
    ],
    multiplier: 2.45
  }
};

export const AVAILABLE_ADDONS: AddOn[] = [
  {
    id: 'addon-extra-photographer',
    name: 'Extra Candid Photographer',
    description: 'Second dedicated shooter dedicated exclusively to guest reactions and candid smiles',
    price: 4000,
    unit: 'per event',
    category: 'team'
  },
  {
    id: 'addon-extra-videographer',
    name: 'Extra Cinematographer',
    description: 'Gimbal specialist capturing dynamic slow-motion movement and multi-angle sequences',
    price: 5500,
    unit: 'per event',
    category: 'team'
  },
  {
    id: 'addon-drone',
    name: 'Drone 4K Aerial Coverage',
    description: 'Licensed aerial pilot capturing sweeping venue establishing shots and outdoor entries',
    price: 6000,
    unit: 'per shoot',
    category: 'equipment'
  },
  {
    id: 'addon-extra-hours',
    name: 'Additional Event Coverage',
    description: 'Keep the team on-site for extended rituals, sangeet dancing, or late-night celebrations',
    price: 2500,
    unit: 'per extra hour',
    category: 'delivery'
  },
  {
    id: 'addon-same-day',
    name: 'Same-Day Sneak Peek Delivery',
    description: 'Receive 25 curated, magazine-edited photos within 6 hours of event completion for immediate sharing',
    price: 3500,
    unit: 'express rush',
    category: 'delivery'
  },
  {
    id: 'addon-album',
    name: 'Handcrafted Flush-Mount Album',
    description: '30-page genuine leatherette or velvet hardcover album printed on Fuji Lustre archival photographic paper',
    price: 4500,
    unit: 'per 12x18 album',
    category: 'addon'
  },
  {
    id: 'addon-extra-photos',
    name: '50 Additional Edited Photographs',
    description: 'Extended editorial skin frequency retouching and color correction for 50 more chosen shots',
    price: 2000,
    unit: 'pack of 50',
    category: 'addon'
  },
  {
    id: 'addon-teaser',
    name: 'Cinematic 60-Second Teaser',
    description: 'High-tempo music-matched preview cut ready for WhatsApp invitations and story announcements',
    price: 3500,
    unit: 'per video',
    category: 'delivery'
  },
  {
    id: 'addon-reels-pack',
    name: '3x Social Media Reels Pack',
    description: 'Trending vertical 9:16 cuts with sound-sync beat transitions crafted specifically for Instagram',
    price: 4000,
    unit: '3 vertical videos',
    category: 'addon'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'tm-1',
    name: 'Arjun Sharma',
    role: 'Lead Cinematographer & Director',
    specialty: 'Royal Weddings, Cinematic Storytelling & Color Grading',
    experienceYears: 9,
    assignedBookingsCount: 142,
    status: 'Available',
    rating: 4.95
  },
  {
    id: 'tm-2',
    name: 'Priya Nair',
    role: 'Senior Candid Photographer',
    specialty: 'Emotional Expressions, Micro-Moments & Ritual Portraits',
    experienceYears: 7,
    assignedBookingsCount: 118,
    status: 'Available',
    rating: 4.98
  },
  {
    id: 'tm-3',
    name: 'Vikramaditya Roy',
    role: 'Editorial & Fashion Specialist',
    specialty: 'High-Fashion Studio, Couture Maternity & Glamour Lighting',
    experienceYears: 8,
    assignedBookingsCount: 96,
    status: 'On Shoot',
    rating: 4.92
  },
  {
    id: 'tm-4',
    name: 'Farhan Zaidi',
    role: 'DGCA Certified Drone Cinematographer',
    specialty: '4K Aerial Top-Downs, Architectural Symmetry & Fireworks',
    experienceYears: 5,
    assignedBookingsCount: 84,
    status: 'Available',
    rating: 4.94
  },
  {
    id: 'tm-5',
    name: 'Sneha Deshmukh',
    role: 'Kids & Family Candid Storyteller',
    specialty: '1st Birthdays, Cake Smash, Gentle Newborn Portraits',
    experienceYears: 6,
    assignedBookingsCount: 130,
    status: 'Available',
    rating: 4.97
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'pf-1',
    title: 'The Palace Sangeet & Varmala',
    category: 'Wedding',
    client: 'Aditi & Rohan Singhania',
    location: 'Taj Falaknuma Palace, Hyderabad',
    image: WEDDING_IMAGE,
    aspect: 'landscape',
    camera: 'Sony Alpha 1 & Sony FX3',
    lens: 'Sony FE 50mm f/1.2 GM',
    settings: '1/400s · f/1.4 · ISO 800',
    featured: true
  },
  {
    id: 'pf-2',
    title: 'Golden Hour Ballroom Waltz',
    category: 'Wedding',
    client: 'Kavya & Siddharth',
    location: 'The Leela Palace, Udaipur',
    image: HERO_IMAGE,
    aspect: 'landscape',
    camera: 'Canon EOS R5 C',
    lens: 'Canon RF 85mm f/1.2 L USM',
    settings: '1/500s · f/1.4 · ISO 400',
    featured: true
  },
  {
    id: 'pf-3',
    title: 'Champagne & Starlight 40th Soirée',
    category: 'Birthday',
    client: 'Sarah & Vikram Mehta',
    location: 'Four Seasons, Mumbai',
    image: BIRTHDAY_IMAGE,
    aspect: 'square',
    camera: 'Sony A7 IV',
    lens: 'Sigma 24-70mm f/2.8 Art',
    settings: '1/250s · f/2.8 · ISO 1600',
    featured: true
  },
  {
    id: 'pf-4',
    title: 'Global Tech Keynote & Future Summit',
    category: 'Corporate',
    client: 'Nexus Global Technologies',
    location: 'Jio World Convention Centre, Mumbai',
    image: CORPORATE_IMAGE,
    aspect: 'landscape',
    camera: 'Sony FX6 Cinema Line',
    lens: 'Sony FE 70-200mm f/2.8 GM OSS II',
    settings: '1/320s · f/2.8 · ISO 1250',
    featured: true
  },
  {
    id: 'pf-5',
    title: 'Architectural Haute Couture Editorial',
    category: 'Fashion',
    client: 'Vogue India × Tarun Tahiliani',
    location: 'Brutalist Pavilion, New Delhi',
    image: FASHION_IMAGE,
    aspect: 'portrait',
    camera: 'Hasselblad X2D 100C',
    lens: 'XCD 55mm f/2.5 V',
    settings: '1/200s · f/4.0 · ISO 100',
    featured: true
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk-101',
    bookingCode: 'SB-2026-9042',
    createdAt: '2026-11-08T10:15:00Z',
    userId: 'cust-1',
    customerName: 'Ananya Mehra',
    customerEmail: 'ananya.mehra@example.com',
    customerPhone: '+91 98201 45892',
    eventCategory: 'Wedding Photography',
    shootType: 'Candid Photography',
    serviceType: 'both',
    packageTier: 'premium',
    packageName: 'Premium Package',
    eventDate: '2026-12-15',
    eventTime: '17:00',
    eventDurationHours: 10,
    eventLocation: 'The Oberoi Amarvilas, Agra',
    guestCount: 350,
    specialRequirements: 'Grand entrance drone shot and focus on elderly grandparent candid portraits.',
    selectedAddOns: ['addon-drone', 'addon-album', 'addon-reels-pack'],
    basePrice: 61247,
    addOnsPrice: 14500,
    taxAmount: 13634,
    discountAmount: 4000,
    totalPrice: 85381,
    advancePaid: 25000,
    paymentMethod: 'razorpay_upi',
    paymentStatus: 'Advance Paid',
    status: 'Confirmed',
    assignedTeamMember: 'Arjun Sharma'
  },
  {
    id: 'bk-102',
    bookingCode: 'SB-2026-8819',
    createdAt: '2026-11-09T14:30:00Z',
    userId: 'cust-2',
    customerName: 'Vikramaditya Roy',
    customerEmail: 'vikram.roy@example.com',
    customerPhone: '+91 97112 88390',
    eventCategory: 'Corporate & Conferences',
    shootType: 'Conferences & Keynotes',
    serviceType: 'both',
    packageTier: 'standard',
    packageName: 'Standard Package',
    eventDate: '2026-11-28',
    eventTime: '09:00',
    eventDurationHours: 8,
    eventLocation: 'Grand Hyatt, Mumbai',
    guestCount: 500,
    specialRequirements: 'Same-day 2-minute recap reel for press release by 8 PM.',
    selectedAddOns: ['addon-same-day', 'addon-teaser'],
    basePrice: 13198,
    addOnsPrice: 7000,
    taxAmount: 3635,
    discountAmount: 0,
    totalPrice: 23833,
    advancePaid: 23833,
    paymentMethod: 'razorpay_card',
    paymentStatus: 'Paid',
    status: 'In Progress',
    assignedTeamMember: 'Priya Nair'
  },
  {
    id: 'bk-103',
    bookingCode: 'SB-2026-7241',
    createdAt: '2026-11-10T11:20:00Z',
    userId: 'cust-demo',
    customerName: 'Rohit Verma',
    customerEmail: 'veerankivenkataramana4@gmail.com',
    customerPhone: '+91 98450 12345',
    eventCategory: 'Birthday & Milestone Celebrations',
    shootType: 'Kids 1st Birthday',
    serviceType: 'photography',
    packageTier: 'standard',
    packageName: 'Standard Package',
    eventDate: '2026-11-20',
    eventTime: '16:00',
    eventDurationHours: 4,
    eventLocation: 'Palm Greens Club, Bangalore',
    guestCount: 75,
    specialRequirements: 'Candid smiles during cake cutting and balloon decorations.',
    selectedAddOns: ['addon-same-day'],
    basePrice: 6598,
    addOnsPrice: 3500,
    taxAmount: 1817,
    discountAmount: 500,
    totalPrice: 11415,
    advancePaid: 5000,
    paymentMethod: 'razorpay_upi',
    paymentStatus: 'Advance Paid',
    status: 'Confirmed',
    assignedTeamMember: 'Sneha Deshmukh'
  }
];

export const TESTIMONIALS = [
  {
    id: 't-1',
    name: 'Meera & Siddharth Kapoor',
    event: 'Udaipur Destination Wedding',
    rating: 5,
    comment:
      'ShootBook completely eliminated the stress of finding verified cinematographers. Arjun and his crew were invisible yet captured the most poignant tears and laughter. The 4K wedding teaser had our entire family weeping with joy within 48 hours.',
    location: 'Udaipur, Rajasthan'
  },
  {
    id: 't-2',
    name: 'Devika Singhania',
    event: 'Milestone 50th Birthday Gala',
    rating: 5,
    comment:
      'The booking process was crystal clear with zero hidden costs. The same-day sneak peek photos were delivered to our WhatsApp by midnight. The image quality and color grading were true masterclass.',
    location: 'South Mumbai'
  },
  {
    id: 't-3',
    name: 'Karan Thapar',
    event: 'Annual Fintech Summit (800+ Delegates)',
    rating: 5,
    comment:
      'For our flagship 2-day conference at Jio World Centre, ShootBook provided dual-camera crews, wireless audio feeds, and an immediate social sizzle reel. Flawless corporate professionalism and prompt GST invoicing.',
    location: 'BKC, Mumbai'
  }
];

export const FAQS = [
  {
    question: 'How early should I pre-book my photographer or cinematographer?',
    answer:
      'For peak wedding dates (November through February), we recommend booking 2 to 6 months in advance. For birthdays, corporate events, and personal portraits, booking 1 to 3 weeks in advance is typically sufficient. Our real-time calendar checks team availability instantly.'
  },
  {
    question: 'How does ShootBook prevent double bookings?',
    answer:
      'Our intelligent scheduling engine tracks specific crew members, specialized gear (like 4K cinema cameras and drones), and event time windows. If a team member or slot is reserved, that slot is locked to guarantee your assigned team is 100% committed exclusively to your event.'
  },
  {
    question: 'What is the advance payment policy?',
    answer:
      'You can either pay an advance deposit (typically 25%-30% or custom amount) via our integrated Razorpay gateway (UPI, Credit/Debit Card, NetBanking) to instantly lock your date, or submit a booking inquiry request to have our studio coordinator verify special logistics first.'
  },
  {
    question: 'When and how do we receive our final edited photos and films?',
    answer:
      'All high-resolution files are delivered through a private, password-protected cloud gallery. Sneak peek highlights are delivered in 24-48 hours (or same-day with the add-on), full edited photo sets in 5 to 7 days, and cinematic documentary films in 2 to 3 weeks.'
  },
  {
    question: 'Can I customize the package or change the hours later?',
    answer:
      'Yes! Through your ShootBook client dashboard, you can request additional hours, add drone coverage, upgrade your album, or modify requirements up to 48 hours before the shoot date.'
  }
];
