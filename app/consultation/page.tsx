import { CalendarBooking } from '@/components/ui/calendar-booking'
import Link from 'next/link'

export default function ConsultationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <img
                src="/images/FutureFlowAI Logo.webp"
                alt="FutureFlowAI"
                className="h-8 w-auto"
              />
            </Link>
            <Link
              href="/"
              className="text-[#32a029] hover:text-[#2a8524] font-medium"
            >
              Terug naar home
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="py-16 bg-gradient-to-r from-[#32a029]/10 to-[#F79E1E]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#3D3D3D] mb-4">
            Plan een Gratis Kennismakingsgesprek
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ontdek hoe FutureFlowAI uw bedrijf kan transformeren met AI-oplossingen op maat
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Benefits */}
            <div>
              <h2 className="text-2xl font-bold text-[#3D3D3D] mb-6">
                Wat kunt u verwachten?
              </h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#32a029]/10 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#32a029]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg mb-2">Persoonlijk Advies</h3>
                    <p className="text-gray-600">
                      Een 30-minuten gesprek met onze AI-specialist over uw specifieke situatie en mogelijkheden
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#32a029]/10 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#32a029]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg mb-2">Quick Scan</h3>
                    <p className="text-gray-600">
                      We identificeren direct waar AI het grootste verschil kan maken in uw bedrijf
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#32a029]/10 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#32a029]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg mb-2">Concreet Stappenplan</h3>
                    <p className="text-gray-600">
                      U krijgt een helder overzicht van de stappen die u kunt nemen om AI te implementeren
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#32a029]/10 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#32a029]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg mb-2">Geen Verplichtingen</h3>
                    <p className="text-gray-600">
                      Volledig vrijblijvend gesprek zonder verkoopdruk. U beslist wat de beste volgende stap is
                    </p>
                  </div>
                </div>
              </div>

              {/* Testimonial */}
              <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                <p className="text-gray-700 italic mb-4">
                  "Het kennismakingsgesprek met FutureFlowAI was een eye-opener. In 30 minuten hadden we een duidelijk beeld van hoe AI ons bedrijf kon helpen. Nu, 6 maanden later, besparen we 20 uur per week!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#32a029] rounded-full flex items-center justify-center text-white font-bold">
                    JB
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold">Jan Bakker</p>
                    <p className="text-sm text-gray-600">CEO, TechStart BV</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Calendar */}
            <div>
              <CalendarBooking />
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#3D3D3D] mb-12">
            Veelgestelde Vragen
          </h2>

          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">Wat kost het kennismakingsgesprek?</h3>
              <p className="text-gray-600">
                Het kennismakingsgesprek is volledig gratis en vrijblijvend. Er zijn geen verborgen kosten.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">Hoe lang duurt het gesprek?</h3>
              <p className="text-gray-600">
                Het gesprek duurt 30 minuten. We respecteren uw tijd en zorgen voor een efficiënt maar waardevol gesprek.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">Moet ik me voorbereiden?</h3>
              <p className="text-gray-600">
                Geen specifieke voorbereiding nodig! Het helpt wel als u nadenkt over uitdagingen in uw bedrijf waar AI mogelijk kan helpen.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">Wat gebeurt er na het gesprek?</h3>
              <p className="text-gray-600">
                U ontvangt een samenvatting van het gesprek en eventueel een voorstel voor vervolgstappen. U beslist zelf of en hoe u verder wilt.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white py-8 border-t">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-600">
            � 2024 FutureFlowAI - Alle rechten voorbehouden
          </p>
        </div>
      </div>
    </div>
  )
}