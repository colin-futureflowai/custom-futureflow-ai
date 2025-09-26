/**
 * Stripe Service
 * Handles all Stripe-related operations
 */

import { stripeConfig } from '@/lib/config/stripe'
import { logger } from '@/lib/utils/logger'

export interface CheckoutSession {
  sessionId: string
  url: string
}

export interface CheckoutError {
  error: string
  message?: string
}

class StripeService {
  /**
   * Create a checkout session
   */
  async createCheckoutSession(priceId?: string): Promise<CheckoutSession> {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: priceId || stripeConfig.priceId,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create checkout session')
      }

      const data = await response.json()
      return data as CheckoutSession
    } catch (error) {
      logger.error('Checkout error:', error)
      throw error
    }
  }

  /**
   * Redirect to Stripe checkout
   */
  async redirectToCheckout(priceId?: string): Promise<void> {
    try {
      const { url } = await this.createCheckoutSession(priceId)

      if (url) {
        window.location.href = url
      } else {
        throw new Error('No checkout URL received')
      }
    } catch (error) {
      logger.error('Redirect error:', error)
      throw error
    }
  }

  /**
   * Get the current mode (test or live)
   */
  getMode(): 'test' | 'live' {
    return stripeConfig.mode as 'test' | 'live'
  }

  /**
   * Check if we're in test mode
   */
  isTestMode(): boolean {
    return stripeConfig.mode === 'test'
  }
}

// Export singleton instance
export const stripeService = new StripeService()