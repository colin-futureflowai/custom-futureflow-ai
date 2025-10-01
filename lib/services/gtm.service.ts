/**
 * Google Tag Manager Service
 * Handles all GTM events and conversions
 */

// Extend window interface for dataLayer
declare global {
  interface Window {
    dataLayer?: any[]
  }
}

export class GTMService {
  /**
   * Push event to Google Tag Manager dataLayer
   */
  static pushEvent(event: string, data?: Record<string, any>) {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event,
        ...data
      })

      // Log in development
      if (process.env.NODE_ENV === 'development') {
        console.log('[GTM Event]', event, data)
      }
    }
  }

  /**
   * Track page view
   */
  static trackPageView(url: string, title?: string) {
    this.pushEvent('page_view', {
      page_path: url,
      page_title: title || document.title,
      page_location: window.location.href
    })
  }

  /**
   * Track e-commerce purchase (conversion)
   */
  static trackPurchase(data: {
    transactionId: string
    value: number
    currency?: string
    variant?: string
  }) {
    // Track for Google Ads conversion
    this.pushEvent('conversion', {
      send_to: 'AW-17072775739',
      value: data.value,
      currency: data.currency || 'EUR',
      transaction_id: data.transactionId
    })

    // Also track as enhanced e-commerce event
    this.pushEvent('purchase', {
      ecommerce: {
        transaction_id: data.transactionId,
        value: data.value,
        currency: data.currency || 'EUR',
        items: [{
          item_id: 'AI_BOOK',
          item_name: 'Gewoon Beginnen met AI E-book',
          price: data.value,
          quantity: 1,
          item_category: 'E-book'
        }],
        // Include A/B test variant if available
        ...(data.variant && { variant: data.variant })
      }
    })
  }

  /**
   * Track checkout initiation
   */
  static trackBeginCheckout(value: number, variant?: string) {
    this.pushEvent('begin_checkout', {
      value: value,
      currency: 'EUR',
      items: [{
        item_id: 'AI_BOOK',
        item_name: 'Gewoon Beginnen met AI E-book',
        price: value,
        quantity: 1,
        item_category: 'E-book'
      }],
      ...(variant && { variant })
    })
  }

  /**
   * Track add to cart (when checkout button is clicked)
   */
  static trackAddToCart(value: number, variant?: string) {
    this.pushEvent('add_to_cart', {
      value: value,
      currency: 'EUR',
      items: [{
        item_id: 'AI_BOOK',
        item_name: 'Gewoon Beginnen met AI E-book',
        price: value,
        quantity: 1,
        item_category: 'E-book'
      }],
      ...(variant && { variant })
    })
  }

  /**
   * Track A/B test assignment
   */
  static trackABTestAssignment(variant: string) {
    this.pushEvent('ab_test_assignment', {
      experiment_name: 'landing_page_variants',
      variant_name: variant,
      timestamp: new Date().toISOString()
    })
  }

  /**
   * Track form submission
   */
  static trackFormSubmit(formName: string, data?: Record<string, any>) {
    this.pushEvent('form_submit', {
      form_name: formName,
      ...data
    })
  }

  /**
   * Track video interaction
   */
  static trackVideo(action: 'play' | 'pause' | 'complete', videoTitle?: string) {
    this.pushEvent('video_' + action, {
      video_title: videoTitle || 'Promo Video',
      video_url: window.location.href
    })
  }

  /**
   * Track scroll depth
   */
  static trackScrollDepth(percentage: number) {
    this.pushEvent('scroll', {
      percent_scrolled: percentage
    })
  }
}

// Export as default
export default GTMService