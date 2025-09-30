# Site Structure Documentation

## Overview
This document tracks the complete page structure, routing system, and BaseHub CMS integration for the FutureFlowAI website and "Gewoon Beginnen met AI" e-book landing pages.

**Last Updated**: 2025-09-30
**Primary Domain**: futureflowai.com
**CMS**: BaseHub (Headless CMS)

---

## 📁 Page Structure

### 🏠 Main Pages

| Route | File | Purpose | Status |
|-------|------|---------|--------|
| `/` | `app/page.tsx` | Main landing page for e-book pre-order | ✅ Active |
| `/[slug]` | `app/[slug]/page.tsx` | Dynamic router for BaseHub content | ✅ Active |
| `/ab-test` | `app/ab-test/page.tsx` | A/B testing interface | ✅ Active |
| `/ai-workshop` | `app/ai-workshop/page.tsx` | AI Workshop marketing page | ✅ Active |
| `/ai-consulting` | `app/ai-consulting/page.tsx` | AI Consulting services page | ✅ Active |

### 🛒 Checkout Flow

| Route | File | Purpose | Status |
|-------|------|---------|--------|
| `/success` | `app/success/page.tsx` | Order confirmation page | ✅ Active |
| `/consultation` | `app/consultation/page.tsx` | Free consultation booking (Cal.com) | ✅ Active |
| `/recovery/discount` | `app/recovery/discount/page.tsx` | Cart recovery - Discount variant | ✅ Active |
| `/recovery/pioneer` | - | Cart recovery - Pioneer variant | 🔄 Planned |
| `/recovery/final-step` | - | Cart recovery - Final step variant | 🔄 Planned |

### 🔌 API Routes

| Route | File | Purpose | Status |
|-------|------|---------|--------|
| `/api/checkout` | `app/api/checkout/route.ts` | Stripe checkout session creation | ✅ Active |

---

## 🎯 Dynamic Landing Pages (BaseHub Integration)

### Content Structure in BaseHub

```
landingPagesManager/
├── aiBoekLanding/           # E-book landing pages
│   ├── controlVersion/      # Standard messaging
│   ├── urgencyVersion/      # Time-sensitive messaging
│   └── socialVersion/       # Social proof focused
├── workshopLanding/         # Workshop pages
│   ├── controlVersion/
│   ├── urgencyVersion/
│   └── socialVersion/
└── consultingLanding/       # Consulting pages
    ├── controlVersion/
    ├── urgencyVersion/
    └── socialVersion/
```

### Generated Routes from BaseHub

#### AI Boek (E-book) Landing Pages
| Variant | URL Slug | Messaging Focus | Status |
|---------|----------|-----------------|--------|
| Control | `/ai-boek` | Standard benefits | ✅ Configured |
| Urgency | `/ai-boek-urgency` | Limited time offer | ✅ Configured |
| Social | `/ai-boek-social` | Testimonials & social proof | ✅ Configured |

#### Workshop Landing Pages
| Variant | URL Slug | Messaging Focus | Status |
|---------|----------|-----------------|--------|
| Control | TBD | Standard workshop info | 📝 Content needed |
| Urgency | TBD | Limited seats | 📝 Content needed |
| Social | TBD | Success stories | 📝 Content needed |

#### Consulting Landing Pages
| Variant | URL Slug | Messaging Focus | Status |
|---------|----------|-----------------|--------|
| Control | TBD | Service overview | 📝 Content needed |
| Urgency | TBD | Limited availability | 📝 Content needed |
| Social | TBD | Client results | 📝 Content needed |

---

## 🔄 Data Flow Architecture

```mermaid
graph TD
    A[BaseHub CMS] -->|Content API| B[getLandingPageManager]
    B --> C[generateStaticParams]
    C --> D[Dynamic Route Generation]
    D --> E[/slug/page.tsx]
    E --> F[LandingPageClient Component]
    F --> G[Rendered Landing Page]

    H[Content Editors] -->|Update Content| A
    I[Analytics] -->|Track Performance| G
```

---

## 🎨 Component Structure

### Landing Page Components
- `DynamicHero` - Hero section with video/3D book
- `Book3DShowcase` - Interactive 3D book preview
- `CheckoutButton` - Stripe integration
- `CalendarBooking` - Cal.com consultation booking
- `TestimonialCarousel` - Social proof (planned)
- `CountdownTimer` - Urgency element

### Shared Components
- Navigation (in HeroSection)
- Footer
- Trust badges
- CTA buttons

---

## 🔗 Third-Party Integrations

| Service | Purpose | Implementation | Status |
|---------|---------|----------------|--------|
| BaseHub | Content Management | API via `basehub` package | ✅ Active |
| Stripe | Payment Processing | Checkout API | ⚠️ Price ID config needed |
| Cal.com | Appointment Booking | Embedded widget | ✅ Active |
| Vercel | Hosting & Deployment | Next.js deployment | ✅ Active |

---

## 🚀 Deployment Configuration

### Environment Variables Required
```env
BASEHUB_TOKEN=bshb_pk_[token]
STRIPE_SECRET_KEY=sk_[test/live]_[key]
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_[test/live]_[key]
STRIPE_PRICE_ID=price_[id]
STRIPE_PRODUCT_ID=prod_[id]
NEXT_PUBLIC_BASE_URL=https://futureflowai.com
```

### Branch Strategy
- `main` - Production
- `develop` - Staging
- Feature branches for new landing pages

---

## 📊 A/B Testing Strategy

### Current Tests
1. **Landing Page Messaging** - Control vs Urgency vs Social
2. **Cart Recovery** - Discount vs Pioneer vs Final Step (planned)

### Tracking Metrics
- Conversion rate per variant
- Time on page
- CTA click rate
- Cart abandonment recovery rate

---

## 🔧 Development Guidelines

### Adding New Landing Pages
1. Create content structure in BaseHub
2. Add slugs to BaseHub content
3. Slugs automatically generate routes via `[slug]/page.tsx`
4. Test all variants locally
5. Deploy and track performance

### Updating This Document
- Update after adding new pages
- Update when BaseHub structure changes
- Update when new integrations are added
- Review weekly during active development

---

## 📝 Todo / Roadmap

### High Priority
- [ ] Fix Stripe price ID configuration
- [ ] Create `/recovery/pioneer` page
- [ ] Create `/recovery/final-step` page
- [ ] Add testimonial carousel component

### Medium Priority
- [ ] Configure workshop landing content in BaseHub
- [ ] Configure consulting landing content in BaseHub
- [ ] Implement analytics tracking
- [ ] Add email capture for abandoned carts

### Low Priority
- [ ] Add multi-language support
- [ ] Implement progressive web app features
- [ ] Add blog section
- [ ] Create affiliate program pages

---

## 📚 Related Documentation

- `CLAUDE.md` - AI assistant instructions
- `LandingsPaginaBeschrijving.md` - Landing page requirements
- `Brandbook.md` - Brand guidelines
- `LOGBOOK.md` - Development session tracking