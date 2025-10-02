"use client"

import { useState } from 'react'
import dynamic from "next/dynamic"
import { HeroSection } from "@/components/ui/dynamic-hero"
import CheckoutButton from "@/components/ui/checkout-button"
import { stripeService } from "@/lib/services/stripe.service"
import { logger } from "@/lib/utils/logger"
// Font import removed - fonts handled globally

const LandingBookPreview = dynamic(
  () => import("@/components/book-showcase/landing-book-preview"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center text-[#3D3D3D]/50">
        Loading 3D Experience...
      </div>
    ),
  }
)

interface ConsultingLandingClientProps {
  pageData: any
  selectedVariant: string
}

export default function ConsultingLandingClient({ pageData, selectedVariant }: ConsultingLandingClientProps) {
  const handleCTAClick = async () => {
    try {
      await stripeService.redirectToCheckout()
    } catch (error) {
      logger.error('Checkout error:', error)
    }
  }

  // Select the right content based on variant
  let heroContent
  switch (selectedVariant) {
    case 'urgency':
      heroContent = pageData.urgencyVersion
      break
    case 'social':
      heroContent = pageData.socialVersion
      break
    default:
      heroContent = pageData.controlVersion
  }

  // Keep video hard coded - always use local video file
  const videoUrl = "/video.mp4"

  return (
    <>
      {/* Variant Selector for Testing (env-gated) */}
      {process.env.NEXT_PUBLIC_SHOW_AB_BANNER === 'true' && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-100 border-b border-yellow-300 p-2">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between">
            <p className="text-xs">
              Testing Variant: <strong>{selectedVariant}</strong>
            </p>
            <div className="space-x-2 text-xs">
              <a href="?variant=control" className="text-blue-600 hover:underline">Control</a>
              <a href="?variant=urgency" className="text-orange-600 hover:underline">Urgency</a>
              <a href="?variant=social" className="text-green-600 hover:underline">Social</a>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section with original design */}
      <HeroSection
        heading={heroContent.mainTitle}
        tagline={heroContent.subtitle}
        buttonText={heroContent.ctaText}
        onButtonClick={handleCTAClick}
        videoUrl={videoUrl}
        originalPrice={pageData.sharedContent.originalPrice}
        showNav={false}
      />

      {/* 3D Book Preview Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#3D3D3D] mb-4">
              Transformatie Roadmap
            </h2>
            <p className="text-xl text-gray-600">
              Visualiseer uw AI-transformatie traject met onze bewezen methodologie
            </p>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <LandingBookPreview />
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="text-center">
              <div className="bg-[#32a029]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📖</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{pageData.sharedContent.serviceTitle}</h3>
              <p className="text-gray-600">Persoonlijke begeleiding</p>
            </div>
            <div className="text-center">
              <div className="bg-[#32a029]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Senior Consultants</h3>
              <p className="text-gray-600">{pageData.sharedContent.consultant}</p>
            </div>
            <div className="text-center">
              <div className="bg-[#32a029]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Maatwerk Oplossingen</h3>
              <p className="text-gray-600">Specifiek voor uw bedrijf</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4 text-[#3D3D3D]">Klaar om te beginnen met AI?</h2>
          <p className="text-lg md:text-xl mb-8 text-[#3D3D3D]/80">Join 150+ ondernemers die al de stap hebben gezet</p>
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm max-w-md mx-auto">
            <div className="text-2xl font-bold mb-2 text-[#3D3D3D]">Introductie-aanbieding</div>
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="text-[#3D3D3D]/60 line-through text-2xl">€{pageData.sharedContent.originalPrice}</span>
              <span className="text-4xl font-bold text-[#32a029]">€{pageData.sharedContent.discountPrice}</span>
            </div>
            <CheckoutButton className="w-full bg-[#32a029] hover:bg-[#2a8524] text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all">
              {heroContent.ctaText}
            </CheckoutButton>
            <p className="text-sm text-[#3D3D3D]/70 mt-4">30 dagen geld-terug-garantie</p>
          </div>
        </div>
      </section>
    </>
  )
}