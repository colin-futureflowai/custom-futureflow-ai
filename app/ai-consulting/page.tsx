import { getLandingPageManager } from '@/lib/basehub'
import { cookies } from 'next/headers'
import ConsultingLandingClient from './consulting-landing-client'

export default async function ConsultingLandingPage() {
  // Fetch the landing page manager data
  const landingData = await getLandingPageManager()

  // Get the user's selected variant from cookies
  const cookieStore = cookies()
  const selectedVariant = cookieStore.get('ab_variant_consulting')?.value || landingData?.landingPagesManager?.consultingLanding?.defaultVariant || 'control'

  if (!landingData?.landingPagesManager?.consultingLanding) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Loading landing page data...</h1>
        <p className="text-gray-600">Please configure the landing page in BaseHub</p>
      </div>
    </div>
  }

  const pageData = landingData.landingPagesManager.consultingLanding

  return <ConsultingLandingClient pageData={pageData} selectedVariant={selectedVariant} />
}