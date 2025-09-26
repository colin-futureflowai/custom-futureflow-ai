import { NextRequest } from 'next/server'

// Available variants
export const VARIANTS = {
  CONTROL: 'main',
  URGENT: 'variant-urgent',
  SOCIAL: 'variant-social'
} as const

export type Variant = typeof VARIANTS[keyof typeof VARIANTS]

// Cookie name for storing user's variant
const VARIANT_COOKIE = 'ab_variant'
const VARIANT_COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 days

// Get weights for each variant (can be adjusted for traffic distribution)
const VARIANT_WEIGHTS = {
  [VARIANTS.CONTROL]: 34,   // 34% traffic
  [VARIANTS.URGENT]: 33,    // 33% traffic
  [VARIANTS.SOCIAL]: 33     // 33% traffic
}

/**
 * Get a random variant based on weights
 */
function getRandomVariant(): Variant {
  const totalWeight = Object.values(VARIANT_WEIGHTS).reduce((sum, weight) => sum + weight, 0)
  const random = Math.random() * totalWeight

  let cumulativeWeight = 0
  for (const [variant, weight] of Object.entries(VARIANT_WEIGHTS)) {
    cumulativeWeight += weight
    if (random < cumulativeWeight) {
      return variant as Variant
    }
  }

  return VARIANTS.CONTROL
}

/**
 * Get the variant from URL parameters
 */
export function getVariantFromURL(request: NextRequest): Variant | null {
  const searchParams = request.nextUrl.searchParams
  const variant = searchParams.get('variant')

  if (variant && Object.values(VARIANTS).includes(variant as Variant)) {
    return variant as Variant
  }

  return null
}

/**
 * Get a random variant for client-side use
 */
export { getRandomVariant }

/**
 * Cookie configuration for A/B testing
 */
export { VARIANT_COOKIE, VARIANT_COOKIE_MAX_AGE }

/**
 * Track a conversion event for analytics
 */
export function trackConversion(variant: Variant, eventType: string = 'conversion') {
  // This is where you'd send data to your analytics service
  // For now, we'll just console.log in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[A/B Test] Conversion tracked:`, {
      variant,
      eventType,
      timestamp: new Date().toISOString()
    })
  }

  // TODO: Implement actual analytics tracking
  // Example: Google Analytics, Mixpanel, Amplitude, etc.
  // gtag('event', eventType, {
  //   event_category: 'ab_test',
  //   event_label: variant,
  //   value: 1
  // })
}

/**
 * Get variant-specific content modifications
 * This can be used to apply variant-specific changes to content
 */
export function getVariantModifications(variant: Variant) {
  switch (variant) {
    case VARIANTS.URGENT:
      return {
        showCountdown: true,
        urgencyMessage: '⏰ Beperkte tijd! Pre-order sluit over:',
        stockMessage: 'Nog maar 23 exemplaren beschikbaar!',
        ctaEmphasis: 'NU BESTELLEN'
      }

    case VARIANTS.SOCIAL:
      return {
        showTestimonials: true,
        userCount: '150+ ondernemers gingen je voor',
        trustBadges: ['30-dagen garantie', 'Veilig betalen', '4.9/5 sterren'],
        socialProof: 'Join 150+ succesvolle ondernemers'
      }

    case VARIANTS.CONTROL:
    default:
      return {
        // Default experience, no modifications
      }
  }
}