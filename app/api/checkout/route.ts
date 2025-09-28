import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripeConfig } from '@/lib/config/stripe'
import { logger } from '@/lib/utils/logger'

// Initialize Stripe with configured key
const stripe = new Stripe(stripeConfig.secretKey, {
  apiVersion: '2025-08-27.basil',
})

export async function POST(request: NextRequest) {
  try {
    const { priceId } = await request.json()

    // Log environment check
    console.log('[Stripe] Environment check:', {
      hasSecretKey: !!stripeConfig.secretKey,
      secretKeyPrefix: stripeConfig.secretKey?.substring(0, 7),
      priceId: priceId,
      nodeEnv: process.env.NODE_ENV
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

    // Create Stripe checkout session with config
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: [...stripeConfig.paymentMethods] as Stripe.Checkout.SessionCreateParams.PaymentMethodType[],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: stripeConfig.successUrl,
      cancel_url: stripeConfig.cancelUrl,
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