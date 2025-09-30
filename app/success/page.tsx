'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

// Success page content component
function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const isPreorder = searchParams.get('preorder') === 'true'
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    // Hide confetti after 5 seconds
    const timer = setTimeout(() => setShowConfetti(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="confetti-container">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  backgroundColor: ['#32a029', '#F79E1E', '#3D3D3D'][Math.floor(Math.random() * 3)]
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Success Message Section */}
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Success Icon */}
          <div className="mb-8 inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full animate-scale-in">
            <svg
              className="w-12 h-12 text-[#32a029]"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Thank You Message */}
          <h1 className="text-4xl sm:text-5xl font-bold text-[#3D3D3D] mb-4">
            Bedankt voor uw {isPreorder ? 'pre-order' : 'bestelling'}!
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            Uw order is succesvol verwerkt
          </p>

          {/* Order Details Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 max-w-2xl mx-auto">
            <div className="space-y-4 text-left">
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">Product:</span>
                <span className="font-semibold">Gewoon Beginnen met AI - E-book</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">Type:</span>
                <span className="font-semibold text-[#32a029]">Pre-order</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">Prijs:</span>
                <span className="font-semibold">€27 <span className="text-sm text-gray-500 line-through ml-2">€47</span></span>
              </div>
              {sessionId && (
                <div className="flex justify-between py-3">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-mono text-sm">{sessionId.slice(0, 20)}...</span>
                </div>
              )}
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-12 max-w-2xl mx-auto">
            <h3 className="font-semibold text-lg mb-3 text-blue-900">Wat gebeurt er nu?</h3>
            <ol className="text-left space-y-2 text-blue-800">
              <li className="flex">
                <span className="font-semibold mr-2">1.</span>
                <span>U ontvangt binnen 5 minuten een bevestigingsmail</span>
              </li>
              <li className="flex">
                <span className="font-semibold mr-2">2.</span>
                <span>We houden u op de hoogte van de voortgang</span>
              </li>
              <li className="flex">
                <span className="font-semibold mr-2">3.</span>
                <span>Zodra het boek klaar is, krijgt u direct toegang</span>
              </li>
              <li className="flex">
                <span className="font-semibold mr-2">4.</span>
                <span>U wordt uitgenodigd voor onze exclusieve AI community</span>
              </li>
            </ol>
          </div>
        </div>
      </div>

      {/* Calendar Booking Section */}
      <div className="bg-gray-50 py-16 border-t">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#3D3D3D] mb-4">
              Klaar voor de volgende stap?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nu u de eerste stap heeft gezet met dit boek, helpen wij u graag verder met
              AI-implementatie in uw bedrijf.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-[#32a029]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#32a029]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">AI Workshops</h3>
              <p className="text-sm text-gray-600">Voor uw hele team</p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-[#32a029]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#32a029]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Implementatie</h3>
              <p className="text-sm text-gray-600">Op maat gemaakt</p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-[#32a029]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#32a029]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-3-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">1-op-1 Begeleiding</h3>
              <p className="text-sm text-gray-600">Persoonlijke coaching</p>
            </div>
          </div>

          {/* CTA for Calendar */}
          <div className="text-center">
            <Link
              href="/consultation"
              className="inline-block bg-[#32a029] hover:bg-[#2a8524] text-white font-semibold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg"
            >
              Plan een gratis kennismakingsgesprek
            </Link>
            <p className="mt-4 text-sm text-gray-500">
              Geen verplichtingen • 30 minuten • Online of op locatie
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white py-8 border-t">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-600 mb-4">
            Heeft u vragen? Neem contact op via{' '}
            <a href="mailto:info@futureflowai.com" className="text-[#32a029] hover:underline">
              info@futureflowai.com
            </a>
          </p>
          <Link href="/" className="text-[#32a029] hover:underline">
            Terug naar homepage
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          animation: confetti-fall 3s linear infinite;
        }

        @keyframes scale-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}

// Main component with Suspense wrapper
export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#32a029] mx-auto mb-4"></div>
          <p className="text-gray-600">Laden...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}