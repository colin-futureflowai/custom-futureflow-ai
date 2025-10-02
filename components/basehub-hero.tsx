'use client'

import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'

interface BaseHubHeroProps {
  title: string
  subtitle: string
  ctaText: string
  videoUrl?: string
  uspPoints?: string[]
  originalPrice?: number
  discountPrice?: number
  discountPercentage?: number
}

export function BaseHubHero({
  title,
  subtitle,
  ctaText,
  videoUrl,
  uspPoints = [],
  originalPrice = 47,
  discountPrice = 27,
  discountPercentage = 43,
}: BaseHubHeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col w-full max-w-[100vw]">
      {/* Topbar */}
      <div className="w-full bg-[#488441] text-white text-sm">
        <div className="w-full max-w-[100vw] px-[5%] py-2 text-center font-normal">
          Zien wat je zelf beter kunt doen? Doe de gratis AI-check <a href="/ai-check" className="underline">hier</a>.
        </div>
      </div>

      {/* Header */}
      <nav className="w-full bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="w-full max-w-[100vw] px-[5%] py-6">
          <div className="flex items-center justify-between">
            {/* Logo smaller */}
            <div className="text-xl font-bold">
              FutureFlow<span className="text-green-600">AI</span>
            </div>
            {/* Keep contact button; remove nav items for landing */}
            <div className="flex items-center">
              <Link href="/vrijblijvend-gesprek-inplannen" className="inline-flex items-center px-4 py-2 rounded-full border border-gray-200 text-[#3D3D3D] hover:bg-gray-50 font-medium">
                Contact opnemen
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-green-50 to-white overflow-hidden pt-20">

      <div className="w-full max-w-[100vw] px-[5%] py-16 z-10">
        <div className="w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left column - Text content */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                  {title}
                </h1>
                <p className="text-xl md:text-2xl text-gray-600">
                  {subtitle}
                </p>
              </div>

              {/* USP Points */}
              {uspPoints.length > 0 && (
                <ul className="space-y-3">
                  {uspPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* CTA Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Link href="/success" className="inline-block">
                    <Button
                      size="lg"
                      className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg"
                    >
                      {ctaText}
                    </Button>
                  </Link>
                  {originalPrice && discountPrice && (
                    <div className="flex flex-col">
                      <span className="text-gray-500 line-through">€{originalPrice}</span>
                      <span className="text-2xl font-bold text-green-600">€{discountPrice}</span>
                    </div>
                  )}
                </div>
                {discountPercentage && (
                  <p className="text-sm text-orange-600 font-semibold">
                    🔥 Bespaar {discountPercentage}% tijdens pre-order periode
                  </p>
                )}
              </div>
            </div>

            {/* Right column - Video or Image */}
            <div className="relative">
              {videoUrl ? (
                <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : (
                <div className="aspect-video rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                  <div className="text-white text-center p-8">
                    <h3 className="text-3xl font-bold mb-4">Gewoon Beginnen met AI</h3>
                    <p className="text-xl opacity-90">Jouw gids naar AI-succes</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}