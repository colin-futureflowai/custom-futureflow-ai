# CustomFutureFlowAI - Deployment Guide

## 🚀 GitHub Repository Setup

### Create a New GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Repository name: `custom-futureflow-ai`
3. Description: "FutureFlowAI Landing Pages with 3D Book Showcase and BaseHub CMS"
4. Make it **Private** (or Public if you prefer)
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

### Connect Your Local Repository to GitHub

After creating the repository, run these commands in your terminal:

```bash
# Add the new remote origin (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/custom-futureflow-ai.git

# Push the code to GitHub
git branch -M main
git push -u origin main
```

## 🔧 Vercel Deployment

### Prerequisites

1. A [Vercel account](https://vercel.com/signup) (free tier is fine)
2. GitHub repository created and pushed (from steps above)

### Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your GitHub repository `custom-futureflow-ai`
4. Configure your project:

#### Environment Variables (REQUIRED)

Add these environment variables in Vercel:

```
BASEHUB_TOKEN=bshb_pk_cgtt3nc8bysfkiad3gzd1ax8ynr1leh0z1fqxag1jn0oi9673l99n4h8ihzgw1uz
STRIPE_SECRET_KEY=your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
NEXT_PUBLIC_BASE_URL=https://your-vercel-domain.vercel.app
```

#### Build Settings

- **Framework Preset**: Next.js (auto-detected)
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

5. Click "Deploy"

### Post-Deployment Setup

After deployment:

1. **Update environment variable**:
   - `NEXT_PUBLIC_BASE_URL` → Update to your actual Vercel URL

2. **Configure custom domain** (optional):
   - Go to Settings → Domains
   - Add your custom domain (e.g., `futureflowai.nl`)

3. **Set up Stripe webhook** (for production):
   - In Stripe Dashboard → Webhooks
   - Add endpoint: `https://your-domain.vercel.app/api/webhook`
   - Select events: `checkout.session.completed`

## 📝 Important URLs

After deployment, your site will be available at:

- **Homepage**: `https://your-app.vercel.app/`
- **AI Book Landing**: `https://your-app.vercel.app/ai-boek`
- **Workshop Landing**: `https://your-app.vercel.app/ai-workshop`
- **Consulting Landing**: `https://your-app.vercel.app/ai-consulting`
- **A/B Test Manager**: `https://your-app.vercel.app/ab-test`

## 🔄 Continuous Deployment

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Your commit message"
git push origin main
```

## 🎨 BaseHub CMS Access

To edit content:
1. Go to [BaseHub](https://basehub.com)
2. Login with your account
3. Select your repository
4. Edit content in the visual editor
5. Changes appear instantly in draft mode

## 🐛 Troubleshooting

### Common Issues

1. **3D Book not loading**:
   - Check browser console for WebGL errors
   - Ensure `/public/models/book_red.glb` exists

2. **BaseHub content not updating**:
   - Check BASEHUB_TOKEN is set correctly
   - Try clearing Vercel cache: Settings → Functions → Purge Cache

3. **Stripe checkout not working**:
   - Verify Stripe keys are correct
   - Check webhook configuration
   - Ensure NEXT_PUBLIC_BASE_URL is set

### Support

- **BaseHub Issues**: Check [BaseHub Docs](https://basehub.com/docs)
- **Vercel Issues**: Check [Vercel Docs](https://vercel.com/docs)
- **Project Issues**: Create an issue in your GitHub repository

## 📊 Performance Monitoring

Vercel provides built-in analytics:
- Go to your project → Analytics tab
- Monitor Core Web Vitals
- Track visitor insights

## 🔐 Security Notes

- Keep your `.env.local` file local (never commit it)
- Rotate API keys regularly
- Use Vercel's environment variable UI for sensitive data
- Enable 2FA on GitHub and Vercel accounts

---

Built with ❤️ by FutureFlowAI | Powered by Next.js, BaseHub, and Vercel