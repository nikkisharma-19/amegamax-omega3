export const PRODUCTS = [
  {
    id: "amega-max-omega-3",
    slug: "amega-max-omega-3-super-strength",
    name: "Amega Max Omega-3 Super Strength",
    shortTitle: "Amega Max Omega-3",
    subtitle: "Triple Strength Molecularly Distilled Pure Fish Oil (1000mg | 180mg EPA + 120mg DHA) for Heart, Brain, Eye & Joint Health",
    category: "omega-3",
    target: "all",
    benefitGroup: "heart-brain-joint",
    badge: "100% Pure Molecularly Distilled",
    bonusOffer: "Buy 2 Bottles & Save 40% + FREE Shipping",
    rating: 4.8,
    reviewCount: 96,
    images: [
      "/medicines/omega-3.jpeg",
      "/medicines/omega-3 (1).jpeg",
      "/medicines/omega-3 banner.jpeg"
    ],
    basePrice: 649,
    variants: [
      {
        id: "amx-1",
        size: "1 Bottle (60 Softgels)",
        count: 60,
        bottles: 1,
        price: 486.75,
        originalPrice: 649,
        discount: 25,
        shippingFee: 49,
        finalTotal: 535.75,
        unitPrice: "₹8.11/softgel",
        sku: "AMX-OMG3-01",
        tag: "Standard Pack (25% OFF)"
      },
      {
        id: "amx-2",
        size: "2 Bottles (120 Softgels)",
        count: 120,
        bottles: 2,
        price: 778.80,
        originalPrice: 1298,
        discount: 40,
        shippingFee: 0,
        finalTotal: 778.80,
        unitPrice: "₹6.49/softgel",
        sku: "AMX-OMG3-02",
        isPopular: true,
        tag: "BEST VALUE (40% OFF + FREE SHIPPING)"
      },
      {
        id: "amx-3",
        size: "3 Bottles (180 Softgels)",
        count: 180,
        bottles: 3,
        price: 1168.20,
        originalPrice: 1947,
        discount: 40,
        shippingFee: 0,
        finalTotal: 1168.20,
        unitPrice: "₹6.49/softgel",
        sku: "AMX-OMG3-03",
        tag: "Family Pack (40% OFF + FREE SHIPPING)"
      }
    ],
    highlights: [
      "1000mg Ultra-Pure Deep-Sea Fish Oil Concentrate per serving",
      "Optimal 180mg EPA & 120mg DHA ratio for cellular vitality",
      "Advanced Molecular Distillation removes all mercury, heavy metals, and fishy odor",
      "Supports cardiovascular wellness, normal blood pressure & healthy cholesterol",
      "Lubricates joint cartilage to reduce morning stiffness & enhance mobility",
      "Enhances cognitive focus, memory retention and digital screen eye comfort",
      "Enteric-coated softgels with zero fishy aftertaste or acid reflux"
    ],
    keyNutrients: [
      { name: "Deep Sea Fish Oil Concentrate", amount: "1000 mg", rda: "N/A", role: "Ultra-pure marine lipid matrix" },
      { name: "EPA (Eicosapentaenoic Acid)", amount: "180 mg", rda: "Optimal", role: "Reduces arterial inflammation & promotes joint fluidity" },
      { name: "DHA (Docosahexaenoic Acid)", amount: "120 mg", rda: "Optimal", role: "Fundamental structural component of brain and retina" },
      { name: "Total Omega-3 Fatty Acids", amount: "300 mg", rda: "Optimal", role: "Bioactive polyunsaturated fatty acids" },
      { name: "Natural Vitamin E (d-alpha Tocopherol)", amount: "10 IU", rda: "100%", role: "Antioxidant ensuring oil freshness and stability" }
    ],
    howToUse: "Take 1 to 2 softgel capsules daily with a meal (preferably with breakfast or lunch) along with a glass of water. Store in a cool, dry place away from direct sunlight.",
    isBestseller: true,
    isNew: false
  }
];

export const CATEGORIES = [
  { id: "all", label: "All Offers", count: 1 },
  { id: "omega-3", label: "Omega-3 Super Strength", count: 1 }
];
