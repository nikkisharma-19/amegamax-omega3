/**
 * Amega Max - Razorpay Payment Configuration
 * 
 * TO ENABLE REAL PAYMENTS:
 * 1. Sign up on https://razorpay.com (Free)
 * 2. Complete KYC (Bank Account + PAN)
 * 3. Go to: Settings -> API Keys -> Generate Key
 * 4. Replace the keyId below with your live key (e.g., 'rzp_live_xxxxxxxxxxxxxx')
 *    or set VITE_RAZORPAY_KEY_ID in your .env or Vercel Environment Variables.
 */

export const RAZORPAY_CONFIG = {
  keyId: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_51PLACEHOLDER_KEY',
  merchantName: 'Amega Max',
  description: 'Amega Max Omega-3 Super Strength',
  currency: 'INR',
  themeColor: '#7A0000',
  logo: '/logo.png',
  supportPhone: '+91 94133 04333',
  supportEmail: 'orders@amegamax.in'
};
