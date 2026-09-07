import React, { createContext, useContext, useState } from 'react';

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'shop' | 'about' | 'faq' | 'consultation'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState(null); // { name, phone, email }
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [lastOrderDetails, setLastOrderDetails] = useState(null);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [selectedBlogForReader, setSelectedBlogForReader] = useState(null);
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const navigateToShop = (category = 'all') => {
    setSelectedCategory(category);
    setActiveTab('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openProductDetail = (product) => {
    setSelectedProductForDetail(product);
  };

  const closeProductDetail = () => {
    setSelectedProductForDetail(null);
  };

  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
  };

  const openOrderSuccess = (order) => {
    setLastOrderDetails(order);
    setIsOrderSuccessOpen(true);
  };

  const closeOrderSuccess = () => {
    setIsOrderSuccessOpen(false);
  };

  return (
    <UIContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedCategory,
        setSelectedCategory,
        navigateToShop,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        isCartOpen,
        setIsCartOpen,
        isAuthOpen,
        setIsAuthOpen,
        user,
        setUser,
        isQuizOpen,
        setIsQuizOpen,
        selectedProductForDetail,
        openProductDetail,
        closeProductDetail,
        isCheckoutOpen,
        openCheckout,
        closeCheckout,
        lastOrderDetails,
        isOrderSuccessOpen,
        openOrderSuccess,
        closeOrderSuccess,
        isTrackOrderOpen,
        setIsTrackOrderOpen,
        selectedBlogForReader,
        setSelectedBlogForReader,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) throw new Error('useUI must be used within a UIProvider');
  return context;
};
