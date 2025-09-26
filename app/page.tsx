import { getLandingPageManager } from '@/lib/basehub'
import LandingPageClient from './[slug]/landing-page-client'
import { notFound } from 'next/navigation'

export default async function Home() {
  // Fetch the AI book landing page data
  const landingData = await getLandingPageManager()

  if (!landingData?.landingPagesManager?.aiBoekLanding) {
    return notFound()
  }

  const aiBoekData = landingData.landingPagesManager.aiBoekLanding

  // Use the control version for the homepage
  return <LandingPageClient
    pageData={aiBoekData}
    selectedVariant="control"
    landingType="aiBoek"
  />
}