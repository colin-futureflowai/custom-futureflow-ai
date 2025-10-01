'use client'

import { useState } from 'react'
import { stripeService } from '@/lib/services/stripe.service'
import { logger } from '@/lib/utils/logger'
import GTMService from '@/lib/services/gtm.service'

interface CheckoutButtonProps {
  priceId?: string
  className?: string
  children?: React.ReactNode
  loadingText?: string
  disabled?: boolean
  onError?: (error: Error) => void
  onSuccess?: () => void
  variant?: 'primary' | 'secondary'
}

export default function CheckoutButton({
  priceId,
  className = '',
  children = 'Pre-order Nu voor €19',
  loadingText = 'Bezig met laden...',
  disabled = false,
  onError,
  onSuccess,
  variant = 'primary'
}: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCheckout = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Track checkout initiation in GTM
      const price = 27 // Pre-order price
      const abVariant = localStorage.getItem('ab_variant') || undefined

      GTMService.trackAddToCart(price, abVariant)
      GTMService.trackBeginCheckout(price, abVariant)

      // Call success callback before redirect
      onSuccess?.()

      // Redirect to checkout
      await stripeService.redirectToCheckout(priceId)
    } catch (err) {
      const error = err as Error
      const errorMessage = error.message || 'Er ging iets mis. Probeer het opnieuw.'

      setError(errorMessage)
      onError?.(error)

      // Show error in UI
      logger.error('Checkout failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const baseClasses = 'font-bold transition-all transform focus:outline-none focus:ring-2 focus:ring-offset-2'

  const variantClasses = {
    primary: 'bg-[#F79E1E] hover:bg-[#E68E0E] text-white hover:scale-105 focus:ring-[#F79E1E]',
    secondary: 'bg-[#32a029] hover:bg-[#2a8524] text-white hover:scale-105 focus:ring-[#32a029]'
  }

  const sizeClasses = variant === 'primary'
    ? 'text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-lg'
    : 'text-base sm:text-lg lg:text-xl py-3 sm:py-4 px-6 sm:px-8 lg:px-12 rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl'

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses} ${className}`

  // Show test mode indicator in development
  const isTestMode = stripeService.isTestMode()

  return (
    <div className="relative">
      <button
        onClick={handleCheckout}
        disabled={disabled || isLoading}
        className={`${buttonClasses} ${(disabled || isLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isLoading ? loadingText : children}
      </button>

      {error && (
        <p className="absolute top-full left-0 mt-2 text-red-500 text-sm">
          {error}
        </p>
      )}

      {isTestMode && (
        <p className="absolute -top-6 left-0 text-xs text-gray-500">
          🧪 Test mode actief
        </p>
      )}
    </div>
  )
}