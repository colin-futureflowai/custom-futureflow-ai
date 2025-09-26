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

    // Validate price ID
    if (!priceId) {
      return NextResponse.json(
        { error: 'Price ID is required' },
        { status: 400 }
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
    logger.error(`[Stripe] Checkout error:`, error)

    // Better error messages for common issues
    let errorMessage = 'Failed to create checkout session'

    if (error.type === 'StripeInvalidRequestError') {
      if (error.param === 'line_items[0][price]') {
        errorMessage = 'Invalid price ID. Please check your configuration.'
      }
    }

    return NextResponse.json(
      {
        error: error.message || errorMessage,
      },
      { status: error.statusCode || 500 }
    )
  }
}