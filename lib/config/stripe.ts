/**
 * Stripe configuration
 * Automatically switches between test and live based on environment
 */

const isDevelopment = process.env.NODE_ENV === 'development'
const isProduction = process.env.NODE_ENV === 'production'

// Get the base URL - prioritize custom domain, then use production-ready URL
function getBaseUrl() {
  // First priority: Custom domain set in Vercel
  if (process.env.NEXT_PUBLIC_BASE_URL && process.env.NEXT_PUBLIC_BASE_URL !== 'http://localhost:3000') {
    return process.env.NEXT_PUBLIC_BASE_URL
  }

  // Second priority: Production domain (if set)
  if (process.env.NEXT_PUBLIC_PRODUCTION_URL) {
    return process.env.NEXT_PUBLIC_PRODUCTION_URL
  }

  // Third priority: For Vercel deployments, try to detect if we're on a custom domain
  // VERCEL_URL includes the project ID, so we should avoid using it in production
  if (process.env.VERCEL && process.env.VERCEL_ENV === 'production') {
    // In production without a custom domain set, we need to handle this gracefully
    // This will use the actual domain the request comes from
    if (typeof window !== 'undefined') {
      return `${window.location.protocol}//${window.location.host}`
    }
    // Fallback for server-side - this should be replaced with NEXT_PUBLIC_BASE_URL
    console.warn('⚠️ NEXT_PUBLIC_BASE_URL not set in production! Please configure your custom domain.')
    return 'https://gewoonbeginnenmetai.futureflowai.nl' // Fallback to expected domain
  }

  // For preview deployments, use VERCEL_URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  // Local development
  return 'http://localhost:3000'
}

const baseUrl = getBaseUrl()

// Use environment variables for all keys
export const stripeConfig = {
  // API Keys - Production ready
  secretKey: process.env.STRIPE_SECRET_KEY || '',

  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',

  // Product & Price IDs - Should be set via environment variables
  productId: process.env.STRIPE_PRODUCT_ID || 'prod_T6kAkhn34VNhQR',

  priceId: process.env.STRIPE_PRICE_ID || process.env.NEXT_PUBLIC_STRIPE_PRICE_ID || '',

  // URLs - Using smart base URL detection
  // IMPORTANT: Set NEXT_PUBLIC_BASE_URL in Vercel environment variables with your custom domain
  // Example: NEXT_PUBLIC_BASE_URL=https://gewoonbeginnenmetai.nl
  successUrl: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&preorder=true`,
  cancelUrl: `${baseUrl}/recovery/discount?session_id={CHECKOUT_SESSION_ID}&abandoned=true`,

  // Settings
  locale: 'nl' as const,
  currency: 'eur' as const,
  paymentMethods: ['card', 'ideal'] as const,

  // Mode is determined by the keys you provide (test keys = test mode, live keys = live mode)
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
}

export type StripeConfig = typeof stripeConfig