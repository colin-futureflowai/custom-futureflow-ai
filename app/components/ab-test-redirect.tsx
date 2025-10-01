'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Variant {
  path: string
  name: string
  weight: number
}

interface ABTestRedirectProps {
  variants: Variant[]
}

// Extend window interface for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

export default function ABTestRedirect({ variants }: ABTestRedirectProps) {
  const router = useRouter()
  const [isRedirecting, setIsRedirecting] = useState(true)
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null)

  useEffect(() => {
    // Check if user already has a variant assigned (for consistent experience)
    const storedVariant = localStorage.getItem('ab_variant')
    const storedTimestamp = localStorage.getItem('ab_timestamp')

    // Check if stored variant is still valid (24 hours)
    const isValidStoredVariant = storedVariant && storedTimestamp &&
      (Date.now() - parseInt(storedTimestamp)) < (24 * 60 * 60 * 1000)

    let variant: string

    if (isValidStoredVariant && variants.find(v => v.path === storedVariant)) {
      // Use stored variant for consistency
      variant = storedVariant
    } else {
      // Select random variant with weighted distribution
      const totalWeight = variants.reduce((sum, v) => sum + v.weight, 0)
      let random = Math.random() * totalWeight

      variant = variants[0].path // fallback

      for (const v of variants) {
        random -= v.weight
        if (random <= 0) {
          variant = v.path
          break
        }
      }

      // Store the selected variant
      localStorage.setItem('ab_variant', variant)
      localStorage.setItem('ab_timestamp', Date.now().toString())
    }

    // Track the selection in GTM
    if (typeof window !== 'undefined') {
      // Import GTMService dynamically to avoid SSR issues
      import('@/lib/services/gtm.service').then(({ default: GTMService }) => {
        GTMService.trackABTestAssignment(variant)
      })
    }

    // Also track via API
    fetch('/api/ab-test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        variant: variant,
        event: 'assignment',
        data: {
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          referrer: document.referrer
        }
      })
    }).catch(err => console.error('Failed to track A/B test:', err))

    setSelectedVariant(variant)

    // Redirect after a brief moment to show loading state
    setTimeout(() => {
      router.push(variant)
    }, 500)
  }, [router, variants])

  const selectedVariantName = variants.find(v => v.path === selectedVariant)?.name

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
      <div className="text-center">
        {/* Loading Animation */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#32a029]/10 rounded-full animate-pulse">
            <svg
              className="w-10 h-10 text-[#32a029]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
        </div>

        {/* Loading Text */}
        <h1 className="text-2xl font-bold text-[#3D3D3D] mb-4">
          Gewoon Beginnen met AI
        </h1>

        <p className="text-gray-600 mb-2">
          {isRedirecting ? 'Even geduld...' : 'Klaar om te beginnen!'}
        </p>

        {/* Loading Spinner */}
        <div className="mt-6">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#32a029]"></div>
        </div>

        {/* Debug info (only in development) */}
        {process.env.NODE_ENV === 'development' && selectedVariant && (
          <div className="mt-8 p-4 bg-gray-100 rounded-lg text-sm text-gray-600">
            <p>A/B Test Variant: {selectedVariantName}</p>
            <p className="text-xs mt-1">Path: {selectedVariant}</p>
            <div className="mt-2">
              <button
                onClick={() => {
                  localStorage.removeItem('ab_variant')
                  localStorage.removeItem('ab_timestamp')
                  window.location.reload()
                }}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-xs"
              >
                Reset A/B Test
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}