import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { EventCategoriesSection } from './components/EventCategoriesSection';
import { ServicesSection } from './components/ServicesSection';
import { PackagesSection } from './components/PackagesSection';
import { PortfolioGallery } from './components/PortfolioGallery';
import {
  WhyChooseUs,
  HowItWorks,
  TestimonialsSection,
  FaqSection
} from './components/NarrativeSections';
import { AboutSection, ContactSection } from './components/AboutAndContact';
import { BookingModal } from './components/BookingModal';
import { AuthModal } from './components/AuthModal';
import { MyBookingsView } from './components/MyBookingsView';
import { AdminDashboard } from './components/AdminDashboard';
import { ToastContainer } from './components/Toast';
import { Footer } from './components/Footer';

function MainApp() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#08090b] text-[#f3f4f6] font-sans selection:bg-[#d4af37] selection:text-black">
      {/* Top Bar Contract Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        openAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Main Content routing based on currentTab */}
      <main>
        {currentTab === 'home' && (
          <>
            <Hero
              onExploreServices={() => setCurrentTab('services')}
              onExplorePackages={() => setCurrentTab('packages')}
            />
            <EventCategoriesSection />
            <ServicesSection />
            <PackagesSection />
            <PortfolioGallery />
            <WhyChooseUs />
            <HowItWorks />
            <TestimonialsSection />
            <FaqSection />
          </>
        )}

        {currentTab === 'categories' && (
          <div className="pt-4">
            <EventCategoriesSection />
            <PackagesSection />
          </div>
        )}

        {currentTab === 'services' && (
          <div className="pt-4">
            <ServicesSection />
            <PackagesSection />
          </div>
        )}

        {currentTab === 'packages' && (
          <div className="pt-4">
            <PackagesSection />
            <FaqSection />
          </div>
        )}

        {currentTab === 'portfolio' && (
          <div className="pt-4">
            <PortfolioGallery />
          </div>
        )}

        {currentTab === 'about' && (
          <div className="pt-4">
            <AboutSection />
            <WhyChooseUs />
          </div>
        )}

        {currentTab === 'contact' && (
          <div className="pt-4">
            <ContactSection />
            <FaqSection />
          </div>
        )}

        {currentTab === 'my-bookings' && (
          <MyBookingsView />
        )}

        {currentTab === 'admin' && (
          <AdminDashboard />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={(tab) => setCurrentTab(tab)} />

      {/* 9-Step Booking Modal */}
      <BookingModal onGoToMyBookings={() => setCurrentTab('my-bookings')} />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <MainApp />
      </BookingProvider>
    </AuthProvider>
  );
}
