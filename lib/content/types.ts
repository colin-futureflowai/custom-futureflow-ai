/**
 * Content Types for Basehub CMS Integration
 * These types will be used when we integrate with Basehub
 */

export interface HeroSection {
  title: string
  subtitle: string
  ctaText: string
  videoUrl: string
  backgroundImage?: string
}

export interface PricingSection {
  originalPrice: number
  discountPrice: number
  discountPercentage: number
  currency: string
  ctaText: string
}

export interface BookChapter {
  partNumber: number
  partTitle: string
  description: string
  chapters?: string[]
}

export interface Testimonial {
  id: string
  name: string
  company?: string
  quote: string
  rating?: number
}

export interface SuccessStory {
  title: string
  metrics: {
    label: string
    value: string
    description: string
  }[]
  quote: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
}

export interface LandingPageContent {
  // Hero Section
  hero: HeroSection

  // Pricing
  pricing: PricingSection

  // Book Details
  book: {
    title: string
    author: string
    description: string
    chapters: BookChapter[]
    whyThisBook: string[]
    targetAudience: string[]
  }

  // Social Proof
  testimonials: Testimonial[]
  successStory: SuccessStory

  // FAQs
  faqs: FAQ[]

  // Footer
  footer: {
    companyName: string
    companyTagline: string
    links: {
      privacy: string
      terms: string
      contact: string
    }
  }

  // SEO
  seo: {
    title: string
    description: string
    keywords: string[]
    ogImage?: string
  }
}

// A/B Testing Support
export interface ABTestVariant {
  id: string
  name: string
  content: Partial<LandingPageContent>
}

export interface ABTest {
  id: string
  name: string
  description: string
  status: 'active' | 'paused' | 'completed'
  variants: ABTestVariant[]
}

// Content API Response Types
export interface ContentResponse<T> {
  data: T
  error?: string
  lastUpdated?: string
}