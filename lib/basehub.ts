import { basehub } from 'basehub'
import { Variant } from './ab-testing'

// Get BaseHub token - use the token without quotes
const BASEHUB_TOKEN = process.env.BASEHUB_TOKEN?.replace(/['"]/g, '') || 'bshb_pk_cgtt3nc8bysfkiad3gzd1ax8ynr1leh0z1fqxag1jn0oi9673l99n4h8ihzgw1uz'

// Create a function to get a client for a specific branch
export function getBasehubClient(branch?: Variant) {
  return basehub({
    token: BASEHUB_TOKEN,
    draft: true, // Always use draft for now to see latest changes
    ...(branch && { ref: branch }) // Add ref parameter if branch is specified
  })
}

// Default client for backward compatibility
export const basehubClient = getBasehubClient()

// Type for our landing page content (new structure)
export interface LandingPageManagerContent {
  landingPagesManager?: {
    aiBoekLanding?: {
      pageSlug: string
      defaultVariant: string
      controlVersion: {
        mainTitle: string
        subtitle: string
        ctaText: string
        pageSlug?: string
      }
      urgencyVersion: {
        mainTitle: string
        subtitle: string
        ctaText: string
        pageSlug?: string
      }
      socialVersion: {
        mainTitle: string
        subtitle: string
        ctaText: string
        pageSlug?: string
      }
      sharedContent: {
        videoUrl?: string
        originalPrice: number
        discountPrice: number
        bookTitle: string
        author: string
        contentSections?: {
          sectionTitle: string
          contentDescription: string
          part1: {
            title: string
            description: string
          }
          part2: {
            title: string
            description: string
          }
          part3: {
            title: string
            description: string
          }
          part4: {
            title: string
            description: string
          }
          bonusText?: string
        }
      }
    }
    workshopLanding?: {
      pageSlug: string
      defaultVariant: string
      controlVersion: {
        mainTitle: string
        subtitle: string
        ctaText: string
        pageSlug?: string
      }
      urgencyVersion: {
        mainTitle: string
        subtitle: string
        ctaText: string
        pageSlug?: string
      }
      socialVersion: {
        mainTitle: string
        subtitle: string
        ctaText: string
        pageSlug?: string
      }
      sharedContent: {
        videoUrl?: string
        originalPrice: number
        discountPrice: number
        workshopTitle: string
        trainer: string
        contentSections?: {
          sectionTitle: string
          contentDescription: string
          part1: {
            title: string
            description: string
          }
          part2: {
            title: string
            description: string
          }
          part3: {
            title: string
            description: string
          }
          part4: {
            title: string
            description: string
          }
          bonusText?: string
        }
      }
    }
    consultingLanding?: {
      pageSlug: string
      defaultVariant: string
      controlVersion: {
        mainTitle: string
        subtitle: string
        ctaText: string
        pageSlug?: string
      }
      urgencyVersion: {
        mainTitle: string
        subtitle: string
        ctaText: string
        pageSlug?: string
      }
      socialVersion: {
        mainTitle: string
        subtitle: string
        ctaText: string
        pageSlug?: string
      }
      sharedContent: {
        videoUrl?: string
        originalPrice: number
        discountPrice: number
        serviceTitle: string
        consultant: string
        contentSections?: {
          sectionTitle: string
          contentDescription: string
          part1: {
            title: string
            description: string
          }
          part2: {
            title: string
            description: string
          }
          part3: {
            title: string
            description: string
          }
          part4: {
            title: string
            description: string
          }
          bonusText?: string
        }
      }
    }
  }
}

// Type for our landing page content (old structure - keep for compatibility)
export interface LandingPageContent {
  landingPage: {
    heroSection: {
      mainTitle: string
      subtitle: string
      ctaText: string
      videoUrl?: string
      uspPoints?: {
        json: {
          content: any[]
        }
      }
    }
    pricing: {
      originalPrice: number
      discountPrice: number
      discountPercentage: number
      currency: string
      preorderDeadline?: string
    }
    bookDetails: {
      bookTitle: string
      author: string
      description?: {
        json: {
          content: any[]
        }
      }
      pageCount: number
      publishYear: number
    }
    pageConfig?: {
      customSlug: string
      activeVariant: string
    }
  }
}

// Fetch landing page manager content from BaseHub (new structure)
export async function getLandingPageManager(): Promise<LandingPageManagerContent | null> {
  try {
    const client = getBasehubClient()
    const data = await client.query({
      landingPagesManager: {
        aiBoekLanding: {
          pageSlug: true,
          defaultVariant: true,
          controlVersion: {
            mainTitle: true,
            subtitle: true,
            ctaText: true,
            pageSlug: true,
          },
          urgencyVersion: {
            mainTitle: true,
            subtitle: true,
            ctaText: true,
            pageSlug: true,
          },
          socialVersion: {
            mainTitle: true,
            subtitle: true,
            ctaText: true,
            pageSlug: true,
          },
          sharedContent: {
            videoUrl: true,
            originalPrice: true,
            discountPrice: true,
            bookTitle: true,
            author: true,
            contentSections: {
              sectionTitle: true,
              contentDescription: true,
              part1: {
                title: true,
                description: true,
              },
              part2: {
                title: true,
                description: true,
              },
              part3: {
                title: true,
                description: true,
              },
              part4: {
                title: true,
                description: true,
              },
              bonusText: true,
            }
          }
        },
        workshopLanding: {
          pageSlug: true,
          defaultVariant: true,
          controlVersion: {
            mainTitle: true,
            subtitle: true,
            ctaText: true,
            pageSlug: true,
          },
          urgencyVersion: {
            mainTitle: true,
            subtitle: true,
            ctaText: true,
            pageSlug: true,
          },
          socialVersion: {
            mainTitle: true,
            subtitle: true,
            ctaText: true,
            pageSlug: true,
          },
          sharedContent: {
            videoUrl: true,
            originalPrice: true,
            discountPrice: true,
            workshopTitle: true,
            trainer: true,
            contentSections: {
              sectionTitle: true,
              contentDescription: true,
              part1: {
                title: true,
                description: true,
              },
              part2: {
                title: true,
                description: true,
              },
              part3: {
                title: true,
                description: true,
              },
              part4: {
                title: true,
                description: true,
              },
              bonusText: true,
            }
          }
        },
        consultingLanding: {
          pageSlug: true,
          defaultVariant: true,
          controlVersion: {
            mainTitle: true,
            subtitle: true,
            ctaText: true,
            pageSlug: true,
          },
          urgencyVersion: {
            mainTitle: true,
            subtitle: true,
            ctaText: true,
            pageSlug: true,
          },
          socialVersion: {
            mainTitle: true,
            subtitle: true,
            ctaText: true,
            pageSlug: true,
          },
          sharedContent: {
            videoUrl: true,
            originalPrice: true,
            discountPrice: true,
            serviceTitle: true,
            consultant: true,
            contentSections: {
              sectionTitle: true,
              contentDescription: true,
              part1: {
                title: true,
                description: true,
              },
              part2: {
                title: true,
                description: true,
              },
              part3: {
                title: true,
                description: true,
              },
              part4: {
                title: true,
                description: true,
              },
              bonusText: true,
            }
          }
        }
      }
    })

    return data as LandingPageManagerContent
  } catch (error) {
    console.error('Failed to fetch Landing Page Manager:', error)
    return null
  }
}

// Fetch landing page content from BaseHub (old structure - keep for compatibility)
export async function getLandingPageContent(branch?: Variant): Promise<LandingPageContent | null> {
  try {
    const client = getBasehubClient(branch)
    const data = await client.query({
      landingPage: {
        heroSection: {
          mainTitle: true,
          subtitle: true,
          ctaText: true,
          videoUrl: true,
          uspPoints: {
            json: {
              content: true,
            }
          }
        },
        pricing: {
          originalPrice: true,
          discountPrice: true,
          discountPercentage: true,
          currency: true,
          preorderDeadline: true,
        },
        bookDetails: {
          bookTitle: true,
          author: true,
          description: {
            json: {
              content: true,
            }
          },
          pageCount: true,
          publishYear: true,
        },
        pageConfig: {
          customSlug: true,
          activeVariant: true,
        }
      }
    })

    return data as LandingPageContent
  } catch (error) {
    console.error('Failed to fetch BaseHub content:', error)
    return null
  }
}