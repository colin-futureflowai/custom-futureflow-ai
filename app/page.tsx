import { getLandingPageManager } from '@/lib/basehub'
import ABTestRedirect from './components/ab-test-redirect'

export default async function HomePage() {
  // Fetch the landing page data from BaseHub
  const landingData = await getLandingPageManager()

  // Get the AI book landing variants
  const aiBoekLanding = landingData?.landingPagesManager?.aiBoekLanding

  if (!aiBoekLanding) {
    // Fallback to a default page if no data is found
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#3D3D3D] mb-4">
            Gewoon Beginnen met AI
          </h1>
          <p className="text-gray-600">Pagina wordt geladen...</p>
        </div>
      </div>
    )
  }

  // Extract the slugs from BaseHub
  const variants = [
    {
      path: `/${aiBoekLanding.controlVersion?.pageSlug || 'control'}`,
      name: 'Control Version',
      weight: 1
    },
    {
      path: `/${aiBoekLanding.urgencyVersion?.pageSlug || 'urgency'}`,
      name: 'Urgency Version',
      weight: 1
    },
    {
      path: `/${aiBoekLanding.socialVersion?.pageSlug || 'social'}`,
      name: 'Social Proof Version',
      weight: 1
    }
  ]

  // Pass the variants to the client component
  return <ABTestRedirect variants={variants} />
}