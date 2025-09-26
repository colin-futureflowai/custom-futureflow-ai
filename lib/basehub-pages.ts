import { basehub } from 'basehub'
import { VARIANTS } from './ab-testing'

const BASEHUB_TOKEN = process.env.BASEHUB_TOKEN?.replace(/['"]/g, '') || 'bshb_pk_cgtt3nc8bysfkiad3gzd1ax8ynr1leh0z1fqxag1jn0oi9673l99n4h8ihzgw1uz'

export interface LandingPageInfo {
  slug: string
  branch: string
  title?: string
  description?: string
}

/**
 * Get all configured landing pages from BaseHub
 * This checks each branch's page config to build a list of available URLs
 */
export async function getAllLandingPages(): Promise<LandingPageInfo[]> {
  const pages: LandingPageInfo[] = []

  // Check each branch for its configuration
  for (const branch of Object.values(VARIANTS)) {
    try {
      const client = basehub({
        token: BASEHUB_TOKEN,
        draft: true,
        ref: branch
      })

      const data = await client.query({
        landingPage: {
          pageConfig: {
            customSlug: true,
            activeVariant: true,
          },
          heroSection: {
            mainTitle: true,
          }
        }
      })

      if (data.landingPage?.pageConfig?.customSlug) {
        pages.push({
          slug: data.landingPage.pageConfig.customSlug,
          branch: branch,
          title: data.landingPage.heroSection?.mainTitle,
          description: `Branch: ${branch}`
        })
      }
    } catch (error) {
      console.log(`Could not fetch config for branch ${branch}`)
    }
  }

  // Also add default landing page
  if (!pages.find(p => p.slug === 'landing')) {
    pages.push({
      slug: 'landing',
      branch: 'main',
      title: 'Default Landing Page',
      description: 'Main landing page with random variant assignment'
    })
  }

  return pages
}

/**
 * Find which branch/variant to use for a given slug
 */
export async function getVariantForSlug(slug: string): Promise<string | null> {
  const pages = await getAllLandingPages()
  const page = pages.find(p => p.slug === slug)
  return page?.branch || null
}