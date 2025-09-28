# Vercel Deployment Guide

## Prerequisites
✅ Vercel CLI installed
✅ GitHub repository pushed
✅ Production environment variables ready

## Step 1: Login to Vercel
Run in terminal:
```bash
vercel login
```
Follow the prompts to authenticate with your email or GitHub.

## Step 2: Link Your Project
Run in terminal:
```bash
vercel link
```
- Choose "Link to existing project" if you already created it on Vercel dashboard
- Or choose "Create new project" to set it up from CLI

## Step 3: Set Environment Variables
You need to set these production variables in Vercel:

### Required Variables:
```
BASEHUB_TOKEN=your_basehub_token
STRIPE_SECRET_KEY=sk_live_xxx (production key)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx (production key)
NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
STRIPE_PRICE_ID=price_xxx (production price ID)
NEXT_PUBLIC_STRIPE_PRICE_ID=price_xxx (same as above)
STRIPE_WEBHOOK_SECRET=whsec_xxx (from Stripe webhook settings)
```

### To set via CLI:
```bash
vercel env add BASEHUB_TOKEN production
vercel env add STRIPE_SECRET_KEY production
# etc...
```

### Or via Dashboard:
1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable for "Production" environment

## Step 4: Deploy to Production
```bash
vercel --prod
```

## Step 5: Configure Stripe Webhooks (Important!)
After deployment, you need to set up Stripe webhooks:

1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://your-domain.vercel.app/api/webhooks/stripe`
3. Select events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
4. Copy the webhook secret and add it as `STRIPE_WEBHOOK_SECRET` in Vercel

## Automatic Deployments
After initial setup, Vercel will automatically deploy:
- Every push to `main` branch → Production
- Pull requests → Preview deployments

## Domain Configuration (Optional)
To add a custom domain:
1. Go to project Settings → Domains
2. Add your domain (e.g., `futureflowai.nl`)
3. Follow DNS configuration instructions

## Troubleshooting

### Build Errors
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify environment variables are set

### Stripe Not Working
- Verify you're using production keys (starting with `sk_live_` and `pk_live_`)
- Check webhook configuration
- Ensure `NEXT_PUBLIC_BASE_URL` matches your actual domain

### BaseHub Content Not Loading
- Verify `BASEHUB_TOKEN` is set correctly
- Check if token has read permissions

## Testing Production
After deployment:
1. Visit your site: `https://your-project.vercel.app`
2. Test Stripe checkout with a test card (if still in test mode)
3. Verify BaseHub content loads correctly
4. Check mobile responsiveness

## Monitoring
- View analytics: Vercel Dashboard → Analytics
- Check function logs: Vercel Dashboard → Functions
- Monitor errors: Vercel Dashboard → Logs