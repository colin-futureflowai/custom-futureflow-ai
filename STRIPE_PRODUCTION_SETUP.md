# Stripe Production Setup Guide

## 🔴 IMPORTANT: Production Checklist

This guide will help you set up Stripe for PRODUCTION (real payments).

## Step 1: Get Your Live Stripe Keys

1. **Login to Stripe Dashboard**
   - Go to https://dashboard.stripe.com
   - Make sure you're in **LIVE MODE** (not Test mode)
   - Look for the toggle in the top-right: should show "Live"

2. **Get Your API Keys**
   - Go to: https://dashboard.stripe.com/apikeys
   - Copy your **Live keys**:
     - `Publishable key` (starts with `pk_live_`)
     - `Secret key` (starts with `sk_live_`) - Click "Reveal live key"

## Step 2: Create Your Products in Stripe

1. **Go to Products**
   - https://dashboard.stripe.com/products
   - Click "Add product"

2. **Create AI Book Product**
   ```
   Name: Gewoon Beginnen met AI - E-book
   Description: Praktische gids voor ondernemers om te beginnen met AI
   Price: €27.00 (one-time)
   Currency: EUR
   ```

3. **Create Workshop Product** (if needed)
   ```
   Name: AI Workshop - Hands-on Training
   Description: 1-daagse praktische AI workshop
   Price: €297.00 (one-time)
   Currency: EUR
   ```

4. **Create Consulting Product** (if needed)
   ```
   Name: AI Consulting - Persoonlijke Begeleiding
   Description: 3-6 maanden AI implementatie traject
   Price: €1997.00 (one-time)
   Currency: EUR
   ```

5. **Copy the Price IDs**
   - After creating, click on each product
   - Find the Price ID (starts with `price_`)
   - Copy these IDs

## Step 3: Set Up Environment Variables in Vercel

Go to your Vercel project settings → Environment Variables

Add these variables:

```bash
# Stripe Live Keys
STRIPE_SECRET_KEY=sk_live_[your-secret-key]
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_[your-publishable-key]

# Product IDs (from Step 2)
STRIPE_PRODUCT_ID=prod_[your-product-id]
STRIPE_PRICE_ID=price_[your-price-id]

# Your production URL
NEXT_PUBLIC_BASE_URL=https://custom-futureflow-ai.vercel.app

# BaseHub Token (already set)
BASEHUB_TOKEN=bshb_pk_cgtt3nc8bysfkiad3gzd1ax8ynr1leh0z1fqxag1jn0oi9673l99n4h8ihzgw1uz
```

## Step 4: Set Up Webhooks (Optional but Recommended)

1. **Go to Webhooks**
   - https://dashboard.stripe.com/webhooks
   - Click "Add endpoint"

2. **Configure Endpoint**
   ```
   Endpoint URL: https://your-domain.vercel.app/api/webhook
   Events to send:
   - checkout.session.completed
   - payment_intent.succeeded
   - payment_intent.payment_failed
   ```

3. **Get Webhook Secret**
   - After creating, click on the webhook
   - Copy the "Signing secret" (starts with `whsec_`)
   - Add to Vercel: `STRIPE_WEBHOOK_SECRET=whsec_[your-secret]`

## Step 5: Test Your Production Setup

### Before Going Live:

1. **Create a test purchase**
   - Use a real credit card (you can refund it later)
   - Or use Stripe test card: `4242 4242 4242 4242`

2. **Verify in Stripe Dashboard**
   - Check https://dashboard.stripe.com/payments
   - Confirm payment appears

3. **Check Success Page**
   - Ensure redirect to `/success` works
   - Verify session details are shown

## Step 6: Enable Payment Methods

1. **Go to Payment Methods**
   - https://dashboard.stripe.com/settings/payment_methods

2. **Enable for Netherlands**:
   - ✅ Card payments
   - ✅ iDEAL (important for Dutch customers!)
   - ✅ Bancontact (Belgian customers)
   - ✅ SEPA Direct Debit (optional)

## Step 7: Configure Business Settings

1. **Business Details**
   - https://dashboard.stripe.com/settings/business
   - Add your business information
   - Upload logo

2. **Customer Emails**
   - https://dashboard.stripe.com/settings/emails
   - Enable email receipts
   - Customize email templates

3. **Tax Settings** (if applicable)
   - https://dashboard.stripe.com/settings/tax
   - Configure VAT/BTW settings

## 🚀 Launch Checklist

Before accepting real payments:

- [ ] Live API keys added to Vercel
- [ ] Products created in Stripe with correct prices
- [ ] Price IDs added to environment variables
- [ ] Payment methods enabled (Card + iDEAL)
- [ ] Test transaction completed successfully
- [ ] Success page working
- [ ] Email receipts configured
- [ ] Business details added to Stripe
- [ ] VAT/BTW settings configured (if needed)
- [ ] Webhook endpoint set up (optional)
- [ ] Terms & Privacy policy linked

## 🔥 Going Live

Once everything is set up:

1. **Deploy to Vercel**
   ```bash
   git push origin main
   ```

2. **Verify deployment**
   - Check https://custom-futureflow-ai.vercel.app
   - Test checkout flow

3. **Monitor First Transactions**
   - Watch https://dashboard.stripe.com/payments
   - Check for any failed payments
   - Review customer emails

## 💰 After Launch

1. **Daily Monitoring**
   - Check Stripe Dashboard daily
   - Monitor failed payments
   - Review disputes quickly

2. **Payouts**
   - Default: Daily payouts to your bank
   - Configure at: https://dashboard.stripe.com/settings/payouts

3. **Reporting**
   - Monthly reports: https://dashboard.stripe.com/reports
   - Export for bookkeeping

## ⚠️ Important Security Notes

1. **NEVER share your secret key** (`sk_live_...`)
2. **Only use live keys in production** environment
3. **Keep test and live environments separate**
4. **Enable 2FA on your Stripe account**
5. **Regularly review payment activity**

## 🆘 Troubleshooting

**Payment fails:**
- Check if card/payment method is enabled
- Verify customer's bank supports online payments
- Check for sufficient funds

**Webhook not working:**
- Verify endpoint URL is correct
- Check webhook secret is set
- Review webhook logs in Stripe

**Customer can't pay:**
- Ensure iDEAL is enabled for Dutch customers
- Check if customer's country is supported
- Verify price/product configuration

---

## Support Contacts

- **Stripe Support**: https://support.stripe.com
- **Stripe Status**: https://status.stripe.com
- **Documentation**: https://stripe.com/docs

Ready to accept payments! 🎉