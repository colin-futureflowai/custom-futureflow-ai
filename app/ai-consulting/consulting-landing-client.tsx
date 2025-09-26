"use client"

import { useState } from 'react'
import dynamic from "next/dynamic"
import { HeroSection } from "@/components/ui/dynamic-hero"
import CheckoutButton from "@/components/ui/checkout-button"
import { stripeService } from "@/lib/services/stripe.service"
import { logger } from "@/lib/utils/logger"
import "../landing/fonts.css"

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
      {/* Variant Selector for Testing */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-100 border-b border-yellow-300 p-2">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
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

      {/* Hero Section with original design */}
      <HeroSection
        title={heroContent.mainTitle}
        subtitle={heroContent.subtitle}
        ctaText={heroContent.ctaText}
        onCTAClick={handleCTAClick}
        videoUrl={videoUrl}
        originalPrice={pageData.sharedContent.originalPrice}
        discountPrice={pageData.sharedContent.discountPrice}
      />

      {/* 3D Book Preview Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#3D3D3D] mb-4">
              Transformatie Roadmap
            </h2>
            <p className="text-xl text-gray-600">
              Visualiseer uw AI-transformatie traject met onze bewezen methodologie
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] rounded-3xl p-8 shadow-xl">
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
      <section className="py-20 px-4 bg-gradient-to-r from-[#32a029] to-[#28a020] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Klaar om te Beginnen met AI?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join 150+ ondernemers die al de stap hebben gezet
          </p>
          <div className="bg-white/10 backdrop-blur rounded-2xl p-8 max-w-md mx-auto">
            <div className="text-3xl font-bold mb-2">
              Introductie Aanbieding
            </div>
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="text-white/60 line-through text-2xl">€{pageData.sharedContent.originalPrice}</span>
              <span className="text-5xl font-bold">€{pageData.sharedContent.discountPrice}</span>
            </div>
            <CheckoutButton
              text={heroContent.ctaText}
              className="w-full bg-white text-[#32a029] hover:bg-gray-100 font-bold py-4 px-8 rounded-lg text-lg transition-all transform hover:scale-105"
            />
            <p className="text-sm text-white/80 mt-4">
              30 dagen geld-terug-garantie
            </p>
          </div>
        </div>
      </section>
    </>
  )
}