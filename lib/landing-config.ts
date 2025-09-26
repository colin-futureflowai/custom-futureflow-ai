import { Variant } from './ab-testing'

/**
 * Configuration for custom landing page URLs
 * Edit this file to change which URLs map to which BaseHub branches
 *
 * Examples for Google Ads campaigns:
 * - /ai-boek → main branch
 * - /laatste-kans → variant-urgent branch
 * - /bestseller → variant-social branch
 */

export interface LandingPageConfig {
  slug: string          // The URL path (e.g., 'ai-boek')
  variant: Variant      // Which BaseHub branch to use
  description: string   // For your reference
}

export const LANDING_PAGE_CONFIGS: LandingPageConfig[] = [
  // Default landing page
  {
    slug: 'landing',
    variant: 'main',
    description: 'Default landing page'
  },

  // Custom URL examples - EDIT THESE!
  {
    slug: 'ai-boek',
    variant: 'main',
    description: 'Main variant - Google Ads Campaign A'
  },
  {
    slug: 'laatste-kans',
    variant: 'variant-urgent',
    description: 'Urgency variant - Limited time offer campaign'
  },
  {
    slug: 'bestseller',
    variant: 'variant-social',
    description: 'Social proof variant - Testimonials campaign'
  },

  // Add more custom URLs here:
  // {
  //   slug: 'pre-order',
  //   variant: 'variant-urgent',
  //   description: 'Pre-order campaign'
  // },
  // {
  //   slug: 'nieuw-boek',
  //   variant: 'main',
  //   description: 'New book launch'
  // },
]

/**
 * Find the configuration for a given slug
 */
export function findConfigBySlug(slug: string): LandingPageConfig | undefined {
  return LANDING_PAGE_CONFIGS.find(config => config.slug === slug)
}

/**
 * Get all configured slugs
 */
export function getAllSlugs(): string[] {
  return LANDING_PAGE_CONFIGS.map(config => config.slug)
}

/**
 * Check if a slug is configured
 */
export function isSlugConfigured(slug: string): boolean {
  return LANDING_PAGE_CONFIGS.some(config => config.slug === slug)
}