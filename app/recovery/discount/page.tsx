'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import CheckoutButton from '@/components/ui/checkout-button'
import { stripeConfig } from '@/lib/config/stripe'

function RecoveryDiscountContent() {
  const searchParams = useSearchParams()
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 })
  const [isUrgent, setIsUrgent] = useState(false)

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    // Set urgent state when less than 2 hours
    if (timeLeft.hours < 2) {
      setIsUrgent(true)
    }

    return () => clearInterval(timer)
  }, [timeLeft.hours])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Urgent Banner */}
      <div className={`${isUrgent ? 'bg-red-500' : 'bg-[#F79E1E]'} text-white py-3 text-center animate-pulse`}>
        <p className="font-semibold">
          ⏰ Uw pre-order korting vervalt over {timeLeft.hours}u {timeLeft.minutes}m {timeLeft.seconds}s
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Warning Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#F79E1E]/10 rounded-full mb-6">
            <svg className="w-10 h-10 text-[#F79E1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-[#3D3D3D] mb-4">
            Wacht! U bent nog op tijd voor de pre-order korting!
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Profiteer nu nog van <span className="font-bold text-[#32a029]">€20 korting</span> voordat het te laat is
          </p>
        </div>

        {/* Price Comparison */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-2xl border-2 border-[#32a029] shadow-xl p-8 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#32a029] text-white px-4 py-1 rounded-full text-sm font-bold">
              NU BESCHIKBAAR
            </div>
            <h3 className="text-2xl font-bold text-center mb-4">Pre-order Prijs</h3>
            <div className="text-center">
              <p className="text-5xl font-bold text-[#32a029]">€27</p>
              <p className="text-gray-500 mt-2">Bespaar €20</p>
            </div>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-[#32a029] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Complete e-book
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-[#32a029] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Bonus templates
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-[#32a029] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Toegang tot community
              </li>
            </ul>
          </div>

          <div className="bg-gray-100 rounded-2xl border-2 border-gray-300 p-8 relative opacity-75">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gray-500 text-white px-4 py-1 rounded-full text-sm">
              STRAKS
            </div>
            <h3 className="text-2xl font-bold text-center mb-4 text-gray-600">Normale Prijs</h3>
            <div className="text-center">
              <p className="text-5xl font-bold text-gray-500">€47</p>
              <p className="text-gray-400 mt-2">Volledige prijs</p>
            </div>
            <ul className="mt-6 space-y-3 text-gray-500">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Complete e-book
              </li>
              <li className="flex items-center line-through">
                <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Geen bonus templates
              </li>
              <li className="flex items-center line-through">
                <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Geen early access
              </li>
            </ul>
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-center mb-8">
            Wat anderen zeggen over FutureFlowAI
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-gray-50 rounded-xl">
              <p className="text-gray-700 italic mb-4">
                "FutureFlowAI heeft ons bedrijf getransformeerd. We besparen nu 40% tijd op repetitieve taken dankzij AI-automatisering."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-[#32a029] rounded-full flex items-center justify-center text-white font-bold">
                  MB
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Mark de Boer</p>
                  <p className="text-sm text-gray-600">CEO, InnovateTech</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-xl">
              <p className="text-gray-700 italic mb-4">
                "De praktische aanpak van FutureFlowAI maakte AI toegankelijk voor ons team zonder technische achtergrond."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-[#32a029] rounded-full flex items-center justify-center text-white font-bold">
                  SV
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Sophie Vermeer</p>
                  <p className="text-sm text-gray-600">Marketing Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-[#32a029]/10 to-[#F79E1E]/10 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-[#3D3D3D] mb-4">
            Laatste kans voor €20 korting!
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Deze pre-order aanbieding is exclusief en tijdelijk
          </p>

          <CheckoutButton
            priceId={stripeConfig.priceId}
            className="text-xl py-5 px-12"
            variant="primary"
          >
            Ja, ik wil €20 besparen! →
          </CheckoutButton>

          <p className="mt-6 text-sm text-gray-500">
             30 dagen geld-terug garantie "  Direct toegang bij lancering "  Geen risico
          </p>
        </div>

        {/* Trust Text */}
        <div className="flex justify-center items-center gap-8 mt-12 text-gray-500 text-sm">
          <span>✓ Veilig betalen</span>
          <span>✓ Direct toegang</span>
          <span>✓ 30 dagen garantie</span>
        </div>
      </div>
    </div>
  )
}

export default function RecoveryDiscountPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#32a029] mx-auto mb-4"></div>
          <p className="text-gray-600">Laden...</p>
        </div>
      </div>
    }>
      <RecoveryDiscountContent />
    </Suspense>
  )
}