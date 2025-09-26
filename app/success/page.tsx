'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [customerEmail, setCustomerEmail] = useState('')

  useEffect(() => {
    // You can fetch session details here if needed
    // For now, we'll just show a success message
  }, [sessionId])

  return (
    <div className="min-h-screen bg-[#2E2E30] text-white flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-heading mb-4">Bedankt voor je bestelling!</h1>
          <p className="text-xl text-gray-300 mb-6">
            Je pre-order van "Gewoon Beginnen met AI" is succesvol verwerkt.
          </p>
          <p className="text-lg text-gray-400 mb-8">
            Je ontvangt binnen enkele minuten een bevestigingsmail met alle details.
            Het e-book wordt automatisch naar je toegestuurd zodra het beschikbaar is.
          </p>
          <div className="space-y-4">
            <Link
              href="/landing"
              className="inline-block px-8 py-3 bg-[#F79E1E] text-white font-medium rounded hover:bg-[#E68E0E] transition-colors"
            >
              Terug naar de landingspagina
            </Link>
          </div>
        </div>

        <div className="mt-12 p-6 bg-[#1E1E20] rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Wat gebeurt er nu?</h3>
          <ul className="text-left space-y-2 text-gray-300">
            <li className="flex items-start">
              <span className="text-[#F79E1E] mr-2">✓</span>
              <span>Je ontvangt een bevestigingsmail met je bestelgegevens</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F79E1E] mr-2">✓</span>
              <span>Zodra het e-book uitkomt, ontvang je automatisch de downloadlink</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F79E1E] mr-2">✓</span>
              <span>Je krijgt toegang tot exclusieve updates en bonus content</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#2E2E30] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl">Laden...</div>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}