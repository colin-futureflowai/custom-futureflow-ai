# Stripe Integration Setup

## Prerequisites
- Stripe account (https://stripe.com)
- Stripe product and price created in dashboard

## Setup Instructions

### 1. Environment Variables
Update the `.env.local` file with your actual Stripe keys:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
NEXT_PUBLIC_DOMAIN=http://localhost:3000
```

For production, use:
```env
NEXT_PUBLIC_DOMAIN=https://yourwebsite.nl
```

### 2. Get Your Stripe Price ID

1. Go to your Stripe Dashboard
2. Navigate to Products
3. Find your "Gewoon Beginnen met AI" product
4. Copy the Price ID (starts with `price_`)

### 3. Update Landing Page

In `/app/landing/page.tsx`, find the handleCheckout function and replace the priceId:

```typescript
const response = await fetch('/api/checkout', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    priceId: 'price_YOUR_ACTUAL_PRICE_ID', // <-- Replace this
  }),
})
```

### 4. Test the Integration

1. Run the development server:
```bash
npm run dev
```

2. Go to http://localhost:3000/landing
3. Click the "Pre-order Nu" button
4. You should be redirected to Stripe checkout

### 5. Test Card Numbers

For testing, use these Stripe test cards:
- Success: 4242 4242 4242 4242
- Requires authentication: 4000 0025 0000 3155
- Declined: 4000 0000 0000 9995

Use any future expiry date and any 3-digit CVC.

### 6. Webhook Setup (Optional - for order fulfillment)

If you want to automatically send the e-book after payment:

1. Create a webhook endpoint in Stripe Dashboard
2. Point it to: `https://yourdomain.nl/api/webhook`
3. Listen for `checkout.session.completed` events
4. Implement the webhook handler to send the e-book

### 7. Production Checklist

Before going live:
- [ ] Replace test keys with live keys in production
- [ ] Update NEXT_PUBLIC_DOMAIN to your actual domain
- [ ] Test the complete flow with a real payment
- [ ] Set up email notifications
- [ ] Configure success/cancel redirect URLs
- [ ] Enable Stripe fraud protection rules
- [ ] Set up webhook for order fulfillment

## Troubleshooting

### "Failed to create checkout session"
- Check that your Stripe keys are correct
- Verify the price ID exists in your Stripe account
- Ensure the API route is accessible

### Redirect not working
- Verify NEXT_PUBLIC_DOMAIN is set correctly
- Check that /success page exists

### Payment methods not showing
- For iDEAL (Dutch payments), ensure your Stripe account is configured for European payments
- Check that payment_method_types includes 'ideal' in the checkout session

## Support

For issues with:
- Stripe integration: https://stripe.com/docs
- Next.js: https://nextjs.org/docs
- This project: Contact FutureFlowAI support