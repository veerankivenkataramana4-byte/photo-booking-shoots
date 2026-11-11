import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Booking,
  BookingStatus,
  EventCategory,
  PackageDetail,
  PackageTier,
  AddOn,
  TeamMember
} from '../types';
import {
  INITIAL_BOOKINGS,
  INITIAL_CATEGORIES,
  DEFAULT_PACKAGES,
  AVAILABLE_ADDONS,
  TEAM_MEMBERS
} from '../data/initialData';

interface ToastData {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface BookingContextType {
  bookings: Booking[];
  categories: EventCategory[];
  packages: Record<string, PackageDetail>;
  addOns: AddOn[];
  teamMembers: TeamMember[];
  isBookingModalOpen: boolean;
  preselectedData: {
    category?: string;
    shootType?: string;
    packageTier?: PackageTier;
  };
  openBookingModal: (category?: string, shootType?: string, packageTier?: PackageTier) => void;
  closeBookingModal: () => void;
  createBooking: (newBookingData: Omit<Booking, 'id' | 'bookingCode' | 'createdAt'>) => Booking;
  checkDateAvailability: (date: string, time: string, durationHours: number) => {
    available: boolean;
    reason?: string;
    conflictingBookingsCount: number;
    recommendedAlternativeTime?: string;
  };
  updateBookingStatus: (bookingId: string, status: BookingStatus) => void;
  assignTeamMember: (bookingId: string, teamMemberName: string) => void;
  updateCategoryPrice: (categoryId: string, newPrice: number) => void;
  updatePackageMultiplier: (tier: PackageTier, newMultiplier: number) => void;
  toasts: ToastData[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const stored = localStorage.getItem('shootbook_bookings_list');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return INITIAL_BOOKINGS;
  });

  const [categories, setCategories] = useState<EventCategory[]>(() => {
    try {
      const stored = localStorage.getItem('shootbook_categories');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return INITIAL_CATEGORIES;
  });

  const [packages, setPackages] = useState<Record<string, PackageDetail>>(() => {
    try {
      const stored = localStorage.getItem('shootbook_packages');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return DEFAULT_PACKAGES;
  });

  const [addOns] = useState<AddOn[]>(AVAILABLE_ADDONS);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(TEAM_MEMBERS);

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [preselectedData, setPreselectedData] = useState<{
    category?: string;
    shootType?: string;
    packageTier?: PackageTier;
  }>({});

  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    localStorage.setItem('shootbook_bookings_list', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('shootbook_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('shootbook_packages', JSON.stringify(packages));
  }, [packages]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const openBookingModal = (category?: string, shootType?: string, packageTier?: PackageTier) => {
    setPreselectedData({
      category: category || categories[0]?.name,
      shootType: shootType || categories[0]?.shootTypes[0],
      packageTier: packageTier || 'standard'
    });
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  // Availability checking algorithm: checks overlapping date, start time, and duration
  const checkDateAvailability = (date: string, time: string, durationHours: number) => {
    if (!date) return { available: true, conflictingBookingsCount: 0 };

    const requestedStartHour = parseInt(time.split(':')[0] || '10', 10);
    const requestedEndHour = requestedStartHour + durationHours;

    // Filter active bookings on the same date (excluding Cancelled)
    const activeSameDayBookings = bookings.filter(
      (b) => b.eventDate === date && b.status !== 'Cancelled'
    );

    let conflicts = 0;
    activeSameDayBookings.forEach((b) => {
      const existingStart = parseInt(b.eventTime.split(':')[0] || '10', 10);
      const existingEnd = existingStart + b.eventDurationHours;

      // Overlap check
      if (requestedStartHour < existingEnd && requestedEndHour > existingStart) {
        conflicts += 1;
      }
    });

    // We have 5 studio crews. If >= 4 are booked in this window, slot is restricted
    if (conflicts >= 4) {
      return {
        available: false,
        conflictingBookingsCount: conflicts,
        reason: `High peak demand on ${date}. All senior crews are fully reserved between ${requestedStartHour}:00 and ${requestedEndHour}:00.`,
        recommendedAlternativeTime: `${Math.min(requestedEndHour + 1, 19)}:00`
      };
    }

    return {
      available: true,
      conflictingBookingsCount: conflicts
    };
  };

  const createBooking = (newBookingData: Omit<Booking, 'id' | 'bookingCode' | 'createdAt'>): Booking => {
    const randomCode = `SB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: Booking = {
      ...newBookingData,
      id: `bk-${Date.now()}`,
      bookingCode: randomCode,
      createdAt: new Date().toISOString()
    };

    setBookings((prev) => [newBooking, ...prev]);
    showToast(`Booking ${randomCode} confirmed! A confirmation receipt has been generated.`, 'success');
    return newBooking;
  };

  const updateBookingStatus = (bookingId: string, status: BookingStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status } : b))
    );
    showToast(`Booking status updated to "${status}".`, 'info');
  };

  const assignTeamMember = (bookingId: string, teamMemberName: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, assignedTeamMember: teamMemberName } : b))
    );
    setTeamMembers((prev) =>
      prev.map((tm) =>
        tm.name === teamMemberName
          ? { ...tm, assignedBookingsCount: tm.assignedBookingsCount + 1 }
          : tm
      )
    );
    showToast(`${teamMemberName} assigned to the shoot.`, 'success');
  };

  const updateCategoryPrice = (categoryId: string, newPrice: number) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === categoryId ? { ...c, startingPrice: newPrice } : c))
    );
    showToast('Starting price updated successfully in database.', 'success');
  };

  const updatePackageMultiplier = (tier: PackageTier, newMultiplier: number) => {
    setPackages((prev) => ({
      ...prev,
      [tier]: {
        ...prev[tier],
        multiplier: newMultiplier
      }
    }));
    showToast(`Updated multiplier for ${tier.toUpperCase()} package.`, 'success');
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        categories,
        packages,
        addOns,
        teamMembers,
        isBookingModalOpen,
        preselectedData,
        openBookingModal,
        closeBookingModal,
        createBooking,
        checkDateAvailability,
        updateBookingStatus,
        assignTeamMember,
        updateCategoryPrice,
        updatePackageMultiplier,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) throw new Error('useBooking must be used within a BookingProvider');
  return context;
};
