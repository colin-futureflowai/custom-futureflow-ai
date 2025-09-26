import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { VARIANTS, VARIANT_COOKIE, VARIANT_COOKIE_MAX_AGE } from './lib/ab-testing'

export function middleware(request: NextRequest) {
  // Process landing page and dynamic slug requests
  const pathname = request.nextUrl.pathname

  // Handle new landing test page with per-page variant cookies
  if (pathname === '/landing-test') {
    const urlVariant = request.nextUrl.searchParams.get('variant')

    if (urlVariant && ['control', 'urgency', 'social'].includes(urlVariant)) {
      const response = NextResponse.next()

      // Set page-specific cookie
      response.cookies.set('ab_variant_ai_boek', urlVariant, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: VARIANT_COOKIE_MAX_AGE
      })

      return response
    }

    return NextResponse.next()
  }

  // Handle workshop landing page
  if (pathname === '/ai-workshop') {
    const urlVariant = request.nextUrl.searchParams.get('variant')

    if (urlVariant && ['control', 'urgency', 'social'].includes(urlVariant)) {
      const response = NextResponse.next()

      // Set page-specific cookie
      response.cookies.set('ab_variant_workshop', urlVariant, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: VARIANT_COOKIE_MAX_AGE
      })

      return response
    }

    return NextResponse.next()
  }

  // Handle consulting landing page
  if (pathname === '/ai-consulting') {
    const urlVariant = request.nextUrl.searchParams.get('variant')

    if (urlVariant && ['control', 'urgency', 'social'].includes(urlVariant)) {
      const response = NextResponse.next()

      // Set page-specific cookie
      response.cookies.set('ab_variant_consulting', urlVariant, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: VARIANT_COOKIE_MAX_AGE
      })

      return response
    }

    return NextResponse.next()
  }

  // Skip if not a landing page or potential dynamic slug
  if (!pathname.startsWith('/landing') &&
      !pathname.match(/^\/[a-z0-9-]+$/i) &&
      pathname !== '/') {
    return NextResponse.next()
  }

  // Skip known non-landing pages
  if (pathname === '/' ||
      pathname.startsWith('/api') ||
      pathname.startsWith('/_next') ||
      pathname === '/ab-test' ||
      pathname === '/success' ||
      pathname === '/basehub-test') {
    return NextResponse.next()
  }

  // Check if there's a variant in URL parameters
  const urlVariant = request.nextUrl.searchParams.get('variant')

  if (urlVariant && Object.values(VARIANTS).includes(urlVariant as any)) {
    // Create response
    const response = NextResponse.next()

    // Set cookie with the URL variant
    response.cookies.set(VARIANT_COOKIE, urlVariant, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: VARIANT_COOKIE_MAX_AGE
    })

    return response
  }

  // Check if user already has a variant cookie
  const existingVariant = request.cookies.get(VARIANT_COOKIE)?.value

  if (!existingVariant || !Object.values(VARIANTS).includes(existingVariant as any)) {
    // Assign random variant
    const variants = Object.values(VARIANTS)
    const randomVariant = variants[Math.floor(Math.random() * variants.length)]

    const response = NextResponse.next()
    response.cookies.set(VARIANT_COOKIE, randomVariant, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: VARIANT_COOKIE_MAX_AGE
    })

    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/landing',
    '/landing-test',
    '/ai-workshop',
    '/ai-consulting',
    '/((?!api|_next|ab-test|success|basehub-test|.*\\.).*)'
  ]
}