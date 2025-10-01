import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripeConfig } from '@/lib/config/stripe'
import { logger } from '@/lib/utils/logger'

// Initialize Stripe with configured key
const stripe = new Stripe(stripeConfig.secretKey, {
  apiVersion: '2025-08-27.basil',
})

// Get the base URL dynamically from the request
function getBaseUrl(request: NextRequest): string {
  // First priority: Custom domain set in environment
  if (process.env.NEXT_PUBLIC_BASE_URL && process.env.NEXT_PUBLIC_BASE_URL !== 'http://localhost:3000') {
    return process.env.NEXT_PUBLIC_BASE_URL
  }

  // Second priority: Get from request headers (works with custom domains)
  const host = request.headers.get('host')
  const protocol = request.headers.get('x-forwarded-proto') || 'https'

  if (host) {
    // Check if this is a Vercel preview URL (contains project ID)
    const isVercelPreview = host.includes('.vercel.app') && (
      host.includes('-') && host.split('-').length > 2
    )

    // If it's a production deployment but still using Vercel URL, use fallback
    if (isVercelPreview && process.env.VERCEL_ENV === 'production') {
      // Use the expected production domain
      console.warn('⚠️ Production deployment without NEXT_PUBLIC_BASE_URL set! Using fallback domain.')
      return 'https://gewoonbeginnenmetai.nl'
    }

    // Otherwise use the actual host
    return `${protocol}://${host}`
  }

  // Fallback
  return 'http://localhost:3000'
}

export async function POST(request: NextRequest) {
  try {
    const { priceId } = await request.json()

    // Get dynamic base URL
    const baseUrl = getBaseUrl(request)

    // Log environment check
    console.log('[Stripe] Environment check:', {
      hasSecretKey: !!stripeConfig.secretKey,
      secretKeyPrefix: stripeConfig.secretKey?.substring(0, 7),
      priceId: priceId,
      nodeEnv: process.env.NODE_ENV,
      baseUrl: baseUrl,
      host: request.headers.get('host'),
      vercelEnv: process.env.VERCEL_ENV
    })

    // Validate price ID
    if (!priceId) {
      return NextResponse.json(
        { error: 'Price ID is required' },
        { status: 400 }
      )
    }

    // Check if secret key exists
    if (!stripeConfig.secretKey) {
      console.error('[Stripe] Secret key is missing!')
      return NextResponse.json(
        { error: 'Stripe configuration error - secret key missing' },
        { status: 500 }
      )
    }

    logger.info(`[Stripe] Creating checkout session for price:`, priceId)

    // Create Stripe checkout session with dynamic URLs
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: [...stripeConfig.paymentMethods] as Stripe.Checkout.SessionCreateParams.PaymentMethodType[],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&preorder=true`,
      cancel_url: `${baseUrl}/recovery/discount?session_id={CHECKOUT_SESSION_ID}&abandoned=true`,
      metadata: {
        product: 'Gewoon Beginnen met AI E-book',
        environment: process.env.NODE_ENV || 'production',
      },
      customer_email: undefined, // Stripe will ask for email
      locale: stripeConfig.locale,
    })

    logger.info(`[Stripe] Session created:`, session.id)

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    })
  } catch (error: any) {
    console.error(`[Stripe] Full error details:`, {
      message: error.message,
      type: error.type,
      statusCode: error.statusCode,
      param: error.param,
      code: error.code,
      raw: error.raw
    })

    logger.error(`[Stripe] Checkout error:`, error)

    // Better error messages for common issues
    let errorMessage = 'Failed to create checkout session'

    if (error.type === 'StripeInvalidRequestError') {
      if (error.param === 'line_items[0][price]') {
        errorMessage = 'Invalid price ID. Please check your configuration.'
      }
      if (error.code === 'api_key_invalid') {
        errorMessage = 'Invalid Stripe API key. Please check your environment variables.'
      }
    }

    return NextResponse.json(
      {
        error: error.message || errorMessage,
        details: process.env.NODE_ENV === 'development' ? {
          type: error.type,
          code: error.code,
          param: error.param
        } : undefined
      },
      { status: error.statusCode || 500 }
    )
  }
}