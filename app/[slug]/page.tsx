import { getLandingPageManager } from '@/lib/basehub'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import LandingPageClient from './landing-page-client'

// Define all possible slugs for static generation
export async function generateStaticParams() {
  const landingData = await getLandingPageManager()
  const slugs: string[] = []

  // Collect all slugs from AI Boek Landing
  if (landingData?.landingPagesManager?.aiBoekLanding) {
    const landing = landingData.landingPagesManager.aiBoekLanding
    if (landing.controlVersion?.pageSlug) slugs.push(landing.controlVersion.pageSlug)
    if (landing.urgencyVersion?.pageSlug) slugs.push(landing.urgencyVersion.pageSlug)
    if (landing.socialVersion?.pageSlug) slugs.push(landing.socialVersion.pageSlug)
  }

  // Collect all slugs from Workshop Landing
  if (landingData?.landingPagesManager?.workshopLanding) {
    const landing = landingData.landingPagesManager.workshopLanding
    if (landing.controlVersion?.pageSlug) slugs.push(landing.controlVersion.pageSlug)
    if (landing.urgencyVersion?.pageSlug) slugs.push(landing.urgencyVersion.pageSlug)
    if (landing.socialVersion?.pageSlug) slugs.push(landing.socialVersion.pageSlug)
  }

  // Collect all slugs from Consulting Landing
  if (landingData?.landingPagesManager?.consultingLanding) {
    const landing = landingData.landingPagesManager.consultingLanding
    if (landing.controlVersion?.pageSlug) slugs.push(landing.controlVersion.pageSlug)
    if (landing.urgencyVersion?.pageSlug) slugs.push(landing.urgencyVersion.pageSlug)
    if (landing.socialVersion?.pageSlug) slugs.push(landing.socialVersion.pageSlug)
  }

  return slugs.map((slug) => ({
    slug: slug
  }))
}

interface PageProps {
  params: { slug: string }
}

export default async function DynamicLandingPage({ params }: PageProps) {
  const { slug } = params
  const landingData = await getLandingPageManager()

  if (!landingData?.landingPagesManager) {
    return notFound()
  }

  // Find which landing page and variant this slug belongs to
  let pageData: any = null
  let landingType: 'aiBoek' | 'workshop' | 'consulting' | null = null
  let variantType: 'control' | 'urgency' | 'social' | null = null

  // Check AI Boek Landing
  const aiBoek = landingData.landingPagesManager.aiBoekLanding
  if (aiBoek) {
    if (aiBoek.controlVersion?.pageSlug === slug) {
      pageData = aiBoek
      landingType = 'aiBoek'
      variantType = 'control'
    } else if (aiBoek.urgencyVersion?.pageSlug === slug) {
      pageData = aiBoek
      landingType = 'aiBoek'
      variantType = 'urgency'
    } else if (aiBoek.socialVersion?.pageSlug === slug) {
      pageData = aiBoek
      landingType = 'aiBoek'
      variantType = 'social'
    }
  }

  // Check Workshop Landing
  if (!pageData) {
    const workshop = landingData.landingPagesManager.workshopLanding
    if (workshop) {
      if (workshop.controlVersion?.pageSlug === slug) {
        pageData = workshop
        landingType = 'workshop'
        variantType = 'control'
      } else if (workshop.urgencyVersion?.pageSlug === slug) {
        pageData = workshop
        landingType = 'workshop'
        variantType = 'urgency'
      } else if (workshop.socialVersion?.pageSlug === slug) {
        pageData = workshop
        landingType = 'workshop'
        variantType = 'social'
      }
    }
  }

  // Check Consulting Landing
  if (!pageData) {
    const consulting = landingData.landingPagesManager.consultingLanding
    if (consulting) {
      if (consulting.controlVersion?.pageSlug === slug) {
        pageData = consulting
        landingType = 'consulting'
        variantType = 'control'
      } else if (consulting.urgencyVersion?.pageSlug === slug) {
        pageData = consulting
        landingType = 'consulting'
        variantType = 'urgency'
      } else if (consulting.socialVersion?.pageSlug === slug) {
        pageData = consulting
        landingType = 'consulting'
        variantType = 'social'
      }
    }
  }

  if (!pageData || !landingType || !variantType) {
    return notFound()
  }

  return <LandingPageClient
    pageData={pageData}
    selectedVariant={variantType}
    landingType={landingType}
  />
}