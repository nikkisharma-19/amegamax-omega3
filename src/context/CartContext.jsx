import React, { createContext, useContext, useState, useEffect } from 'react';
import { COUPONS, GIFT_TIERS } from '../data/promotions';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const localData = localStorage.getItem('amegamax_cart');
      return localData ? JSON.parse(localData) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      const localCoupon = localStorage.getItem('amegamax_coupon');
      return localCoupon ? JSON.parse(localCoupon) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    localStorage.setItem('amegamax_cart', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem('amegamax_coupon', JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem('amegamax_coupon');
    }
  }, [appliedCoupon]);

  const addToCart = (product, variant, quantity = 1) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.variant.id === variant.id
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [{ product, variant, quantity }];
      }
    });
  };

  const removeFromCart = (variantId) => {
    setItems((prevItems) => prevItems.filter((item) => item.variant.id !== variantId));
  };

  const updateQuantity = (variantId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(variantId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.variant.id === variantId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (COUPONS[cleanCode]) {
      setAppliedCoupon(COUPONS[cleanCode]);
      return { success: true, message: `Coupon "${cleanCode}" applied successfully!` };
    }
    return { success: false, message: 'Invalid coupon code. Try AMEGAMAX20 or FREESHIP' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Exact Business Logic Calculations
  // Total bottle units across selected variants
  const totalBottles = items.reduce((sum, item) => {
    const bottlesPerPack = item.variant?.bottles || 1;
    return sum + (bottlesPerPack * item.quantity);
  }, 0);

  const basePricePerBottle = 649;
  const originalSubtotal = totalBottles * basePricePerBottle;

  // Discount rule: 1 bottle -> 25%, 2+ bottles -> 40%
  const discountPercent = totalBottles >= 2 ? 40 : totalBottles === 1 ? 25 : 0;
  const mrpSavings = (originalSubtotal * discountPercent) / 100;
  const subtotal = originalSubtotal - mrpSavings;

  // Shipping rule: 1 bottle -> ₹49, 2+ bottles -> FREE (₹0)
  const isFreeShipping = totalBottles >= 2 || (appliedCoupon && appliedCoupon.code === 'FREESHIP');
  const shippingFee = totalBottles === 0 ? 0 : isFreeShipping ? 0 : 49;

  let couponDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      couponDiscount = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
    } else if (appliedCoupon.discountAmount) {
      couponDiscount = appliedCoupon.discountAmount;
    }
  }

  const grandTotal = Math.max(0, subtotal - couponDiscount + shippingFee);
  const totalItemsCount = totalBottles;

  // Gift tier threshold checks
  const tier1Met = totalBottles >= 1;
  const tier2Met = totalBottles >= 2;
  const amountForTier2 = Math.max(0, 2 - totalBottles);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        subtotal,
        originalSubtotal,
        mrpSavings,
        discountPercent,
        totalBottles,
        couponDiscount,
        shippingFee,
        isFreeShipping,
        grandTotal,
        totalItemsCount,
        tier1Met,
        tier2Met,
        amountForTier2
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
