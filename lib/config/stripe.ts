/**
 * Stripe configuration
 * Automatically switches between test and live based on environment
 */

const isDevelopment = process.env.NODE_ENV === 'development'
const isProduction = process.env.NODE_ENV === 'production'

// Use environment variables for all keys
export const stripeConfig = {
  // API Keys - Production ready
  secretKey: process.env.STRIPE_SECRET_KEY || '',

  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',

  // Product & Price IDs - Should be set via environment variables
  productId: process.env.STRIPE_PRODUCT_ID || 'prod_T6kAkhn34VNhQR',

  priceId: process.env.STRIPE_PRICE_ID || process.env.NEXT_PUBLIC_STRIPE_PRICE_ID || 'price_1SCNCwCjh2scZSeWZ6RGollE',

  // URLs - Using NEXT_PUBLIC_BASE_URL for production
  // IMPORTANT: Set NEXT_PUBLIC_BASE_URL in Vercel environment variables with your custom domain
  // Example: NEXT_PUBLIC_BASE_URL=https://yourdomain.com
  successUrl: `${process.env.NEXT_PUBLIC_BASE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')}/success?session_id={CHECKOUT_SESSION_ID}&preorder=true`,
  cancelUrl: `${process.env.NEXT_PUBLIC_BASE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')}/recovery/discount?session_id={CHECKOUT_SESSION_ID}&abandoned=true`,

  // Settings
  locale: 'nl' as const,
  currency: 'eur' as const,
  paymentMethods: ['card', 'ideal'] as const,

  // Mode is determined by the keys you provide (test keys = test mode, live keys = live mode)
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
}

export type StripeConfig = typeof stripeConfig