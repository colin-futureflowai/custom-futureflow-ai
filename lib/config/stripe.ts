/**
 * Stripe configuration
 * Automatically switches between test and live based on environment
 */

const isDevelopment = process.env.NODE_ENV === 'development'

export const stripeConfig = {
  // API Keys
  secretKey: isDevelopment
    ? process.env.TEST_STRIPE_SECRET_KEY!
    : process.env.STRIPE_SECRET_KEY!,

  publishableKey: isDevelopment
    ? process.env.TEST_NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
    : process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,

  // Product & Price IDs
  productId: isDevelopment
    ? process.env.TEST_STRIPE_PRODUCT_ID!
    : 'prod_T6jFTvv9DWqyBx', // Live product ID

  priceId: isDevelopment
    ? 'price_1SAWfoCW4Z5hR3AWmpc4gh7W' // Test price ID
    : 'price_1SAVnTCjh2scZSeWRGHiqpOl', // Live price ID

  // URLs
  successUrl: `${process.env.NEXT_PUBLIC_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
  cancelUrl: `${process.env.NEXT_PUBLIC_DOMAIN}/landing`,

  // Settings
  locale: 'nl' as const,
  currency: 'eur' as const,
  paymentMethods: ['card', 'ideal'] as const,

  // Mode
  mode: isDevelopment ? 'test' : 'live' as const,
}

export type StripeConfig = typeof stripeConfig