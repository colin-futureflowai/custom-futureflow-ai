import { getLandingPageManager } from '@/lib/basehub'
import { cookies } from 'next/headers'
import WorkshopLandingClient from './workshop-landing-client'

export default async function WorkshopLandingPage() {
  // Fetch the landing page manager data
  const landingData = await getLandingPageManager()

  // Get the user's selected variant from cookies
  const cookieStore = cookies()
  const selectedVariant = cookieStore.get('ab_variant_workshop')?.value || landingData?.landingPagesManager?.workshopLanding?.defaultVariant || 'control'

  if (!landingData?.landingPagesManager?.workshopLanding) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Loading landing page data...</h1>
        <p className="text-gray-600">Please configure the landing page in BaseHub</p>
      </div>
    </div>
  }

  const pageData = landingData.landingPagesManager.workshopLanding

  return <WorkshopLandingClient pageData={pageData} selectedVariant={selectedVariant} />
}