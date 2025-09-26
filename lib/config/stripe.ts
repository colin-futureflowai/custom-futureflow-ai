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
  productId: process.env.STRIPE_PRODUCT_ID || 'prod_default',

  priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID || process.env.STRIPE_PRICE_ID || 'price_default',

  // URLs - Using NEXT_PUBLIC_BASE_URL for production
  successUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
  cancelUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/landing`,

  // Settings
  locale: 'nl' as const,
  currency: 'eur' as const,
  paymentMethods: ['card', 'ideal'] as const,

  // Mode is determined by the keys you provide (test keys = test mode, live keys = live mode)
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
}

export type StripeConfig = typeof stripeConfig