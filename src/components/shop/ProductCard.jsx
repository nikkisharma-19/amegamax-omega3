import React, { useState } from 'react';
import { Star, ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';
import { PRODUCTS } from '../../data/products';

export const ProductCard = ({ product = PRODUCTS[0] }) => {
  const { addToCart } = useCart();
  const { openCheckout, showToast } = useUI();

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const selectedVariant = product.variants[selectedVariantIndex];

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product, selectedVariant, 1);
    showToast(`Added ${selectedVariant.size} to cart!`, 'success');

    setTimeout(() => {
      setIsAdding(false);
      openCheckout();
    }, 300);
  };

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative">
      <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-10 pointer-events-none">
        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-rose-100 text-[#7A0000]">
          {product.badge}
        </span>
        <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-amber-400 text-slate-900 shadow-xs ml-auto">
          SAVE {selectedVariant.discount}%
        </span>
      </div>

      <div className="relative pt-8 pb-4 w-full h-64 flex items-center justify-center overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="max-h-full max-w-full object-contain transform hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="space-y-3 pt-2">
        <div className="flex items-center space-x-1.5 text-xs text-slate-500">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current" />
            ))}
          </div>
          <span className="font-bold text-slate-700">{product.rating}</span>
          <span className="text-[11px] text-slate-400">({product.reviewCount} reviews)</span>
        </div>

        <div>
          <h3 className="font-bold text-slate-900 text-lg">
            {product.name}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
            {product.subtitle}
          </p>
        </div>

        {/* Variants */}
        <div className="grid grid-cols-2 gap-2">
          {product.variants.slice(0, 2).map((v, i) => (
            <button
              key={v.id}
              onClick={() => setSelectedVariantIndex(i)}
              className={`p-2 rounded-xl text-xs font-bold text-left border transition-all ${
                selectedVariantIndex === i
                  ? 'border-[#7A0000] bg-rose-50 text-[#7A0000]'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <p>{v.size}</p>
              <p className="text-xs font-black">₹{v.finalTotal.toFixed(2)}</p>
            </button>
          ))}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-[#8A0000] to-[#6A0000] text-white font-black text-sm shadow-md transition-all flex items-center justify-center space-x-2"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>{isAdding ? 'Processing...' : `Order Now - ₹${selectedVariant.finalTotal.toFixed(2)}`}</span>
        </button>
      </div>
    </div>
  );
};
