# Branch Strategy & Deployment Setup

## Branch Structure

### `main` Branch - Production
- **Purpose**: Live production environment
- **URL**: https://gewoonbeginnenmetai.futureflowai.nl/
- **Deployment**: Automatic via Vercel on push
- **Protection**: Direct pushes disabled (only via PR)

### `development` Branch - Development/Staging
- **Purpose**: Development and testing environment
- **URL**: Will be available at development preview URL
- **Deployment**: Automatic via Vercel on push
- **Usage**: All new features and changes

## Workflow

1. **Development**
   - All new work happens on `development` branch
   - Test thoroughly in development environment

2. **Release to Production**
   - Create PR from `development` → `main`
   - Review and test changes
   - Merge to deploy to production

## Vercel Configuration

### Production Domain (main branch)
- Domain: gewoonbeginnenmetai.futureflowai.nl
- Branch: main
- Environment: Production

### Development Domain (development branch)
- Domain: development-gewoonbeginnenmetai.futureflowai.nl (or Vercel preview URL)
- Branch: development
- Environment: Preview/Development

## Environment Variables

Make sure to configure different environment variables for each environment in Vercel:

### Production (main)
- Use live Stripe keys
- Production BaseHub token
- Production analytics

### Development (development)
- Use test Stripe keys
- Development BaseHub token
- Development/staging analytics

## Commands

```bash
# Switch to development branch
git checkout development

# Create feature branch from development
git checkout -b feature/new-feature

# Merge feature to development
git checkout development
git merge feature/new-feature

# Deploy to production (via PR)
# Create PR from development to main on GitHub
```

## Current Status
- ✅ `main` branch - Production ready
- ✅ `development` branch - Created and ready for development