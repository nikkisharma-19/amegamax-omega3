import React from 'react';
import { CartProvider } from './context/CartContext';
import { UIProvider, useUI } from './context/UIContext';
import { HeaderBanner } from './components/common/HeaderBanner';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { SearchModal } from './components/common/SearchModal';
import { AuthModal } from './components/common/AuthModal';
import { Toast } from './components/common/Toast';

import { HeroSlider } from './components/home/HeroSlider';
import { CategoryTiles } from './components/home/CategoryTiles';
import { ProductCarousel } from './components/home/ProductCarousel';
import { BrandUsps } from './components/home/BrandUsps';
import { NutritionQuizBanner } from './components/home/NutritionQuizBanner';
import { BlogSection } from './components/home/BlogSection';

import { ProductGrid } from './components/shop/ProductGrid';
import { ProductDetailModal } from './components/shop/ProductDetailModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { NutritionQuizModal } from './components/quiz/NutritionQuizModal';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { OrderSuccessModal } from './components/checkout/OrderSuccessModal';
import { TrackOrderModal } from './components/pages/TrackOrderModal';
import { AboutUsModal } from './components/pages/AboutUsModal';
import { FaqSection } from './components/pages/FaqSection';
import { WhatsAppButton } from './components/common/WhatsAppButton';

const MainLayout = () => {
  const { activeTab } = useUI();

  return (
    <div className="min-h-screen flex flex-col bg-[#fafbfd]">
      {/* Top Sliding Promo Ticker */}
      <HeaderBanner />

      {/* Main Sticky Navbar */}
      <Navbar />

      {/* Main View Switching */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            {/* 1. Hero Section with Animated Bottle & Cap Presentation */}
            <HeroSlider />

            {/* 2. Editorial Highlight Strip */}
            <div className="py-8 bg-white text-center border-b border-slate-100">
              <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight flex items-center justify-center flex-wrap gap-2">
                  <span>Triple Strength Pure Marine Lipid Care •</span>
                  <span className="text-[#7A0000] underline decoration-amber-400 decoration-wavy">Amega Max Omega-3</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                  1000mg Molecularly Distilled Deep-Sea Fish Oil with 360mg EPA & 240mg DHA | Zero Mercury | Zero Fishy Burps
                </p>
              </div>
            </div>

            {/* 3. Why Daily Omega-3 / Health Pillars */}
            <CategoryTiles />

            {/* 4. Flagship Product Showcase & Quantity Offer Selector */}
            <ProductCarousel />

            {/* 5. Personalized Dosage Calculator Quiz Banner */}
            <NutritionQuizBanner />

            {/* 6. Brand Quality & Purity Science */}
            <BrandUsps />

            {/* 7. Educational Knowledge Hub */}
            <BlogSection />
          </>
        )}

        {activeTab === 'shop' && <ProductGrid />}
        {activeTab === 'about' && <AboutUsModal />}
        {activeTab === 'faq' && <FaqSection />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Direct Animated WhatsApp Button */}
      <WhatsAppButton />

      {/* Interactive Global Modals */}
      <ProductDetailModal />
      <CartDrawer />
      <SearchModal />
      <AuthModal />
      <NutritionQuizModal />
      <CheckoutModal />
      <OrderSuccessModal />
      <TrackOrderModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <UIProvider>
      <CartProvider>
        <MainLayout />
      </CartProvider>
    </UIProvider>
  );
}
