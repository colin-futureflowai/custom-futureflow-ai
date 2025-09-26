"use client"

import { useState, useEffect } from 'react'
import dynamic from "next/dynamic"
import { HeroSection } from "@/components/ui/dynamic-hero"
import CheckoutButton from "@/components/ui/checkout-button"
import { stripeService } from "@/lib/services/stripe.service"
import { logger } from "@/lib/utils/logger"

const LandingBookPreview = dynamic(
  () => import("@/components/book-showcase/landing-book-preview"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center text-[#3D3D3D]/50">
        Loading 3D Book...
      </div>
    ),
  }
)

interface LandingPageClientProps {
  pageData: any
  selectedVariant: 'control' | 'urgency' | 'social'
  landingType: 'aiBoek' | 'workshop' | 'consulting'
}

export default function LandingPageClient({ pageData, selectedVariant, landingType }: LandingPageClientProps) {
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

  // Get content from pageData - use defaults for original /landing design
  const heroTitle = heroContent?.mainTitle || "Gewoon Beginnen met AI"
  const heroSubtitle = heroContent?.subtitle || "Elke Ondernemer Kan AI Leren"
  const ctaText = heroContent?.ctaText || "Pre-order Nu - €27"

  // Keep video hard coded - always use local video file
  const videoUrl = "/video.mp4"

  // Use shared content or defaults
  const bookTitle = pageData.sharedContent?.bookTitle || pageData.sharedContent?.workshopTitle || pageData.sharedContent?.serviceTitle || "Gewoon Beginnen met AI"
  const author = pageData.sharedContent?.author || pageData.sharedContent?.trainer || pageData.sharedContent?.consultant || "FutureFlowAI"
  const pageCount = 200
  const publishYear = 2024

  const originalPrice = pageData.sharedContent?.originalPrice || 47
  const discountPrice = pageData.sharedContent?.discountPrice || 27
  const discountPercentage = Math.round(((originalPrice - discountPrice) / originalPrice) * 100)

  // Get content sections from BaseHub
  const contentSections = pageData.sharedContent?.contentSections
  const sectionTitle = contentSections?.sectionTitle || "Wat krijg je?"
  const contentDescription = contentSections?.contentDescription || "11 Hoofdstukken verdeeld over 4 delen:"
  const part1 = contentSections?.part1 || { title: "Deel 1: Kennismaken met AI", description: "Begrijp wat AI is en wat het voor u kan betekenen" }
  const part2 = contentSections?.part2 || { title: "Deel 2: De Juiste Mindset", description: "Ontwikkel de juiste houding tegenover AI" }
  const part3 = contentSections?.part3 || { title: "Deel 3: Gewoon Doen", description: "Praktische stappen om vandaag nog te beginnen" }
  const part4 = contentSections?.part4 || { title: "Deel 4: De Volgende Stap", description: "Schaal op en integreer AI in uw hele organisatie" }
  const bonusText = contentSections?.bonusText || "Praktische bijlagen inclusief checklists en top 10 vragen"

  // Get content-specific text based on landing type (keeping for other uses)
  let contentType = "hoofdstukken"
  let whyTitle = "Waarom Dit Boek?"
  let ctaTitle = "Pre-order Nu Met Korting"
  let guaranteeText = "30 dagen geld-terug-garantie"

  if (landingType === 'workshop') {
    contentType = "modules"
    whyTitle = "Waarom Deze Workshop?"
    ctaTitle = "Reserveer Nu Met Korting"
    guaranteeText = "100% tevredenheidsgarantie"
  } else if (landingType === 'consulting') {
    contentType = "fasen"
    whyTitle = "Waarom Onze Consulting?"
    ctaTitle = "Start Nu Met Korting"
    guaranteeText = "Resultaat gegarandeerd"
  }

  return (
    <div className="landing-page min-h-screen bg-[#F9FAFB]" data-variant={selectedVariant} style={{ fontFamily: "'BR Sonoma', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif" }}>
      {/* Hero Section with Dynamic Arrow - Original Design with BaseHub Content */}
      <HeroSection
        heading={heroTitle}
        tagline={heroSubtitle}
        buttonText={ctaText}
        onButtonClick={handleCTAClick}
        videoUrl={videoUrl}
        imageUrl="" // No separate image, will use video first frame
        originalPrice={originalPrice}
        navItems={[
          { id: 'home', label: 'Home', href: '#' },
          { id: 'waarom', label: whyTitle.split(' ')[1] + ' ' + whyTitle.split(' ')[2] + '?', href: '#waarom-sectie' },
          { id: 'inhoud', label: 'Inhoud', href: '#inhoud-sectie' },
          { id: 'preorder', label: landingType === 'workshop' ? 'Reserveer' : landingType === 'consulting' ? 'Start' : 'Pre-order', href: '#preorder-section' },
        ]}
      />

      {/* Content Section - With 3D Book for AI Book, Centered for others */}
      <section id="inhoud-sectie" className="py-16 lg:py-24 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={landingType === 'aiBoek' ? "grid lg:grid-cols-2 gap-8 lg:gap-12 items-center" : "max-w-4xl mx-auto"}>
            {/* 3D Book Preview - Only for AI Book */}
            {landingType === 'aiBoek' && (
              <div className="w-full h-[400px] sm:h-[500px] lg:h-[600px] order-2 lg:order-1">
                <LandingBookPreview />
              </div>
            )}

            {/* What You Get Content */}
            <div className={landingType === 'aiBoek' ? "order-1 lg:order-2" : ""}>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#3D3D3D] mb-8">
                Wat Krijg Je?
              </h2>

              <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
                <h3 className="text-xl lg:text-2xl font-semibold text-[#32a029] mb-6">
                  {contentDescription}
                </h3>

                <div className="space-y-5">
                  <div className="border-l-4 border-[#32a029] pl-4">
                    <h4 className="font-semibold text-[#3D3D3D] mb-1">
                      {part1.title}
                    </h4>
                    <p className="text-[#3D3D3D]/70 text-sm">
                      {part1.description}
                    </p>
                  </div>

                  <div className="border-l-4 border-[#32a029] pl-4">
                    <h4 className="font-semibold text-[#3D3D3D] mb-1">
                      {part2.title}
                    </h4>
                    <p className="text-[#3D3D3D]/70 text-sm">
                      {part2.description}
                    </p>
                  </div>

                  <div className="border-l-4 border-[#32a029] pl-4">
                    <h4 className="font-semibold text-[#3D3D3D] mb-1">
                      {part3.title}
                    </h4>
                    <p className="text-[#3D3D3D]/70 text-sm">
                      {part3.description}
                    </p>
                  </div>

                  <div className="border-l-4 border-[#32a029] pl-4">
                    <h4 className="font-semibold text-[#3D3D3D] mb-1">
                      {part4.title}
                    </h4>
                    <p className="text-[#3D3D3D]/70 text-sm">
                      {part4.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-[#32a029]/10 rounded-lg">
                  <p className="text-[#3D3D3D] font-medium text-sm">
                    📎 Bonus: {bonusText}
                  </p>
                </div>

                {/* Details from pageData */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-[#3D3D3D]/60">
                    <strong>{landingType === 'workshop' ? 'Workshop:' : landingType === 'consulting' ? 'Service:' : 'Boek:'}</strong> {bookTitle}<br/>
                    <strong>{landingType === 'workshop' ? 'Trainer:' : landingType === 'consulting' ? 'Consultant:' : 'Auteur:'}</strong> {author}<br/>
                    {landingType === 'aiBoek' && (
                      <>
                        <strong>Pagina's:</strong> {pageCount}<br/>
                        <strong>Publicatie:</strong> {publishYear}
                      </>
                    )}
                    {landingType === 'workshop' && (
                      <>
                        <strong>Duur:</strong> 1 dag intensief<br/>
                        <strong>Locatie:</strong> Online + fysiek mogelijk
                      </>
                    )}
                    {landingType === 'consulting' && (
                      <>
                        <strong>Duur:</strong> 3-6 maanden traject<br/>
                        <strong>Type:</strong> Persoonlijke begeleiding
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Book/Workshop/Service Section */}
      <section id="waarom-sectie" className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-[#3D3D3D] mb-12">
            {whyTitle}
          </h2>

          <div className="space-y-8">
            <blockquote className="text-xl text-[#3D3D3D]/80 italic border-l-4 border-[#32a029] pl-6">
              {landingType === 'workshop' ?
                '"Theorie is leuk, maar praktijk is waar het om gaat. In deze workshop gaan we direct aan de slag met AI in uw bedrijf."' :
                landingType === 'consulting' ?
                '"Elke organisatie is uniek. Daarom bieden wij geen standaardoplossingen, maar maatwerk dat past bij uw specifieke situatie."' :
                '"AI kan intimiderend lijken, maar dat komt vooral omdat we het niet begrijpen. Zodra je de basis door hebt, valt het mee. Echt waar."'
              }
            </blockquote>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#F9FAFB] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-[#3D3D3D] mb-3">
                  ✓ {landingType === 'workshop' ? 'Hands-on ervaring' : landingType === 'consulting' ? 'Persoonlijke begeleiding' : 'U hoeft geen techneut te zijn'}
                </h3>
                <p className="text-[#3D3D3D]/70">
                  {landingType === 'workshop' ?
                    'Geen saaie presentaties, maar praktische oefeningen met AI-tools die u direct kunt gebruiken.' :
                    landingType === 'consulting' ?
                    'Één-op-één begeleiding door ervaren AI-specialisten die uw bedrijf echt begrijpen.' :
                    'Denk aan autorijden - u hoeft niet te weten hoe een motor werkt om veilig van A naar B te rijden.'
                  }
                </p>
              </div>

              <div className="bg-[#F9FAFB] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-[#3D3D3D] mb-3">
                  ✓ {landingType === 'workshop' ? 'Kleine groepen' : landingType === 'consulting' ? 'Bewezen methodiek' : 'Praktische gids door ondernemer voor ondernemers'}
                </h3>
                <p className="text-[#3D3D3D]/70">
                  {landingType === 'workshop' ?
                    'Maximum 12 deelnemers per workshop voor persoonlijke aandacht en directe feedback.' :
                    landingType === 'consulting' ?
                    'Onze aanpak heeft al 50+ bedrijven geholpen met succesvolle AI-implementatie.' :
                    'Geen theoretisch geneuzel, maar concrete voorbeelden uit de Nederlandse praktijk.'
                  }
                </p>
              </div>

              <div className="bg-[#F9FAFB] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-[#3D3D3D] mb-3">
                  ✓ {landingType === 'workshop' ? 'Direct toepasbaar' : landingType === 'consulting' ? 'Meetbare resultaten' : 'Van verlamming naar actie'}
                </h3>
                <p className="text-[#3D3D3D]/70">
                  {landingType === 'workshop' ?
                    'Ga na de workshop direct aan de slag met een concreet implementatieplan.' :
                    landingType === 'consulting' ?
                    'We focussen op concrete, meetbare verbeteringen in uw bedrijfsprocessen.' :
                    'Stop met twijfelen en begin vandaag nog met AI in uw bedrijf.'
                  }
                </p>
              </div>

              <div className="bg-[#F9FAFB] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-[#3D3D3D] mb-3">
                  ✓ Focus op mensen versterken
                </h3>
                <p className="text-[#3D3D3D]/70">
                  Het gaat niet om mensen vervangen. Het gaat om mensen versterken.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Story Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-[#3D3D3D] mb-12">
            Succesverhaal uit {landingType === 'workshop' ? 'de workshop' : landingType === 'consulting' ? 'onze consulting' : 'het boek'}
          </h2>

          <div className="bg-gradient-to-br from-[#32a029]/5 to-[#32a029]/10 rounded-2xl p-8 lg:p-12">
            <h3 className="text-2xl font-semibold text-[#3D3D3D] mb-6">
              {landingType === 'workshop' ?
                'Deelnemer transformeert bedrijf na workshop' :
                landingType === 'consulting' ?
                'Klant behaalt 300% ROI binnen 6 maanden' :
                'E-learning bedrijf transformeert met AI'
              }
            </h3>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#32a029] mb-2">
                  {landingType === 'workshop' ? '2 weken' : landingType === 'consulting' ? '300%' : '3m → 3w'}
                </div>
                <div className="text-[#3D3D3D]/70">
                  {landingType === 'workshop' ?
                    'Van workshop naar eerste AI-implementatie' :
                    landingType === 'consulting' ?
                    'ROI binnen 6 maanden' :
                    'Van 3 maanden naar 3 weken ontwikkeltijd'
                  }
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#32a029] mb-2">
                  {landingType === 'workshop' ? '40%' : landingType === 'consulting' ? '50%' : '4x'}
                </div>
                <div className="text-[#3D3D3D]/70">
                  {landingType === 'workshop' ?
                    'Tijdsbesparing op repetitieve taken' :
                    landingType === 'consulting' ?
                    'Reductie operationele kosten' :
                    'Meer cursussen zonder extra personeel'
                  }
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#32a029] mb-2">↑</div>
                <div className="text-[#3D3D3D]/70">
                  {landingType === 'workshop' ?
                    'Hogere werknemerstevredenheid' :
                    landingType === 'consulting' ?
                    'Verbeterde klanttevredenheid' :
                    'Hogere kwaliteit door AI-ondersteuning'
                  }
                </div>
              </div>
            </div>

            <p className="text-[#3D3D3D]/80 italic">
              "Dit zijn de resultaten die mogelijk zijn als je AI op de juiste manier inzet in je organisatie."
            </p>
          </div>
        </div>
      </section>

      {/* Pre-order Section with BaseHub Pricing */}
      <section id="preorder-section" className="py-16 lg:py-24 bg-gradient-to-br from-[#32a029]/10 to-[#32a029]/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-center text-[#3D3D3D] mb-8">
              {ctaTitle}
            </h2>

            <div className="text-center mb-8">
              <div className="inline-block">
                <p className="text-[#3D3D3D]/60 line-through text-xl">Normale prijs: €{originalPrice}</p>
                <p className="text-5xl font-bold text-[#32a029] mt-2">€{discountPrice}</p>
                <p className="text-[#F97316] font-semibold text-lg mt-2">{discountPercentage}% {landingType === 'workshop' ? 'Early Bird' : landingType === 'consulting' ? 'Introductie' : 'Pre-order'} Korting!</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <span className="text-[#32a029] text-xl">✓</span>
                <div>
                  <p className="font-semibold text-[#3D3D3D]">
                    {landingType === 'workshop' ?
                      'Direct na bevestiging toegang tot online materiaal' :
                      landingType === 'consulting' ?
                      'Intake gesprek binnen 48 uur' :
                      'Direct na lancering in uw inbox'
                    }
                  </p>
                  <p className="text-[#3D3D3D]/70 text-sm">
                    {landingType === 'workshop' ?
                      'Pre-workshop materiaal om optimaal voorbereid te zijn' :
                      landingType === 'consulting' ?
                      'We starten direct met uw AI-assessment' :
                      'E-book wordt automatisch naar u gemaild'
                    }
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-[#32a029] text-xl">✓</span>
                <div>
                  <p className="font-semibold text-[#3D3D3D]">
                    {landingType === 'workshop' ?
                      'Gratis 1-op-1 follow-up sessie' :
                      landingType === 'consulting' ?
                      '6 maanden implementatiebegeleiding' :
                      'Gratis toegang tot online Q&A sessie'
                    }
                  </p>
                  <p className="text-[#3D3D3D]/70 text-sm">
                    {landingType === 'workshop' ?
                      '30 minuten persoonlijke begeleiding na de workshop' :
                      landingType === 'consulting' ?
                      'Doorlopende ondersteuning bij de implementatie' :
                      'Stel uw vragen direct aan de auteur'
                    }
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-[#32a029] text-xl">✓</span>
                <div>
                  <p className="font-semibold text-[#3D3D3D]">{guaranteeText}</p>
                  <p className="text-[#3D3D3D]/70 text-sm">
                    {landingType === 'workshop' ?
                      'Niet tevreden? Geld terug, geen vragen gesteld' :
                      landingType === 'consulting' ?
                      'Geen resultaat? Dan werken we door tot u tevreden bent' :
                      'Niet tevreden? Geld terug, geen vragen'
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <CheckoutButton variant="secondary">
                {landingType === 'workshop' ?
                  'Ja, Reserveer Mijn Plek!' :
                  landingType === 'consulting' ?
                  'Ja, Start Mijn AI-Traject!' :
                  'Ja, Ik Wil Pre-orderen!'
                } →
              </CheckoutButton>
              <p className="text-[#3D3D3D]/60 text-sm mt-4">
                🔒 Veilig betalen via iDEAL, creditcard of PayPal
              </p>
            </div>

            <div className="mt-8 p-4 bg-[#F97316]/10 rounded-lg border border-[#F97316]/20">
              <p className="text-center text-[#3D3D3D]">
                <span className="font-semibold">⏰ Let op:</span> De komende twee jaar bepalen welke bedrijven voorop blijven lopen met AI
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-[#3D3D3D] mb-12">
            Veelgestelde Vragen
          </h2>

          <div className="space-y-6">
            <div className="bg-[#F9FAFB] rounded-lg p-6">
              <h3 className="font-semibold text-[#3D3D3D] mb-2">
                Heb ik technische kennis nodig?
              </h3>
              <p className="text-[#3D3D3D]/70">
                {landingType === 'workshop' ?
                  'Nee, de workshop is speciaal ontworpen voor niet-technische ondernemers. Alle concepten worden in begrijpelijke taal uitgelegd.' :
                  landingType === 'consulting' ?
                  'Nee, onze consultants zorgen voor alle technische aspecten. U focust op de strategische keuzes.' :
                  'Nee, het boek is speciaal geschreven voor niet-technische ondernemers. Alle concepten worden in begrijpelijke taal uitgelegd.'
                }
              </p>
            </div>

            <div className="bg-[#F9FAFB] rounded-lg p-6">
              <h3 className="font-semibold text-[#3D3D3D] mb-2">
                {landingType === 'workshop' ? 'Wanneer is de workshop?' : landingType === 'consulting' ? 'Hoe lang duurt het traject?' : 'Wanneer ontvang ik het e-book?'}
              </h3>
              <p className="text-[#3D3D3D]/70">
                {landingType === 'workshop' ?
                  'We organiseren elke maand een workshop. Na aanmelding ontvangt u alle data en kunt u uw voorkeur doorgeven.' :
                  landingType === 'consulting' ?
                  'Gemiddeld 3-6 maanden, afhankelijk van de complexiteit van uw organisatie en gewenste implementatiesnelheid.' :
                  'Direct na de officiële lancering ontvangt u het e-book automatisch per email. Pre-order kopers zijn de eersten die het boek ontvangen.'
                }
              </p>
            </div>

            <div className="bg-[#F9FAFB] rounded-lg p-6">
              <h3 className="font-semibold text-[#3D3D3D] mb-2">
                Is dit ook geschikt voor mijn sector?
              </h3>
              <p className="text-[#3D3D3D]/70">
                {landingType === 'workshop' ?
                  'Ja, we hebben ervaring met diverse branches. Van retail tot dienstverlening, van productie tot e-learning. De workshop wordt aangepast aan de aanwezige sectoren.' :
                  landingType === 'consulting' ?
                  'Ja, we hebben al in 15+ verschillende sectoren gewerkt. Onze aanpak is sectoronafhankelijk maar wordt wel specifiek toegepast op uw branche.' :
                  'Ja, het boek bevat voorbeelden uit diverse branches. Van retail tot dienstverlening, van productie tot e-learning.'
                }
              </p>
            </div>

            <div className="bg-[#F9FAFB] rounded-lg p-6">
              <h3 className="font-semibold text-[#3D3D3D] mb-2">
                Wat als ik niet tevreden ben?
              </h3>
              <p className="text-[#3D3D3D]/70">
                {landingType === 'workshop' ?
                  'Geen probleem! U heeft een volledige tevredenheidsgarantie. Niet tevreden na de workshop? Dan krijgt u uw geld terug.' :
                  landingType === 'consulting' ?
                  'We werken resultaatgericht. Niet tevreden? Dan werken we door tot u wel tevreden bent, zonder extra kosten.' :
                  'Geen probleem! U heeft 30 dagen geld-terug-garantie. Niet tevreden? Dan krijgt u uw geld terug zonder gedoe.'
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#3D3D3D] text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              FutureFlow<span className="text-[#32a029]">AI</span>
            </h3>
            <p className="text-white/70 mb-8">
              Wij zetten ons in om repetitieve taken binnen 2 weken te automatiseren zonder uw huidige systemen te vervangen.
            </p>
            <div className="flex justify-center gap-8 text-sm">
              <a href="#" className="hover:text-[#32a029] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#32a029] transition-colors">Algemene Voorwaarden</a>
              <a href="#" className="hover:text-[#32a029] transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}