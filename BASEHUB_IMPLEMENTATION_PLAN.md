# 📋 Basehub CMS Integration & A/B Testing Implementation Plan

## 🎯 Doelstellingen
1. **Content Management**: Alle teksten, prijzen, en media beheerbaar via Basehub
2. **A/B Testing**: Makkelijk verschillende versies testen zonder code aanpassingen
3. **Analytics**: Google Analytics 4 + Facebook Pixel + Conversion tracking
4. **Performance**: Snelle laadtijden behouden ondanks externe data

## 📊 Fase 1: Basehub Setup & Content Structuur

### 1.1 Basehub Schema Design
```typescript
// Content Types voor Basehub

interface LandingPageContent {
  // Hero Section
  hero: {
    title: string
    subtitle: string
    ctaText: string
    videoUrl: string
    backgroundImage?: string
  }

  // Pricing
  pricing: {
    originalPrice: number
    discountPrice: number
    discountPercentage: number
    currency: string
  }

  // Book Details
  book: {
    title: string
    author: string
    chapters: Chapter[]
    testimonials: Testimonial[]
  }

  // A/B Test Variants
  variants?: {
    A: Partial<LandingPageContent>
    B: Partial<LandingPageContent>
  }
}
```

### 1.2 Implementatie Stappen
1. **Basehub Account Setup**
   - Create project in Basehub
   - Design schema voor landing page content
   - Setup API tokens

2. **Next.js Integration**
   ```bash
   npm install basehub @basehub/next-plugin
   ```

3. **Environment Variables**
   ```env
   BASEHUB_TOKEN=your_token
   BASEHUB_DRAFT_TOKEN=your_draft_token
   ```

## 🔄 Fase 2: A/B Testing Architecture

### 2.1 Cookie-Based Variant Selection
```typescript
// lib/ab-testing.ts
export function getVariant(testId: string): 'A' | 'B' {
  // Check existing cookie
  const existingVariant = cookies().get(`ab_${testId}`)
  if (existingVariant) return existingVariant

  // Random assignment
  const variant = Math.random() > 0.5 ? 'A' : 'B'
  cookies().set(`ab_${testId}`, variant, { maxAge: 30 * 24 * 60 * 60 })

  return variant
}
```

### 2.2 Content Switching Component
```tsx
// components/ab-content.tsx
export function ABContent({ testId, contentA, contentB }) {
  const variant = getVariant(testId)

  useEffect(() => {
    // Track variant view
    gtag('event', 'ab_test_view', {
      test_id: testId,
      variant: variant
    })
  }, [])

  return variant === 'A' ? contentA : contentB
}
```

### 2.3 Testbare Elementen
- **Headlines**: Verschillende kopregels testen
- **CTA Buttons**: Tekst, kleur, positie
- **Prijsweergave**: €27 vs "43% korting"
- **Video vs Afbeelding**: Hero section media
- **Social Proof**: Testimonials positie/aantal

## 📈 Fase 3: Analytics & Tracking

### 3.1 Google Analytics 4 Setup
```typescript
// app/layout.tsx
import Script from 'next/script'

export default function RootLayout() {
  return (
    <>
      {/* Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  )
}
```

### 3.2 Event Tracking
```typescript
// lib/analytics.ts
export const trackEvent = {
  // Conversion Events
  preOrder: (price: number) => {
    gtag('event', 'purchase', {
      currency: 'EUR',
      value: price,
      items: [{
        item_id: 'gewoon-beginnen-ai',
        item_name: 'Gewoon Beginnen met AI',
        price: price,
        quantity: 1
      }]
    })
  },

  // Engagement Events
  videoPlay: () => {
    gtag('event', 'video_start', {
      video_title: 'Promo Video'
    })
  },

  // A/B Test Events
  variantConversion: (testId: string, variant: string) => {
    gtag('event', 'ab_test_conversion', {
      test_id: testId,
      variant: variant
    })
  }
}
```

### 3.3 Facebook Pixel
```typescript
// components/facebook-pixel.tsx
export function FacebookPixel() {
  return (
    <Script id="facebook-pixel" strategy="afterInteractive">
      {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${FB_PIXEL_ID}');
        fbq('track', 'PageView');
      `}
    </Script>
  )
}
```

## 🚀 Fase 4: Implementatie Roadmap

### Week 1-2: Basis Design Voltooien ✅
- Landing page design finaliseren
- 3D boek component optimaliseren
- Basis conversie flow testen

### Week 3: Basehub Integratie
1. **Dag 1-2**: Basehub account & schema setup
2. **Dag 3-4**: API integratie in Next.js
3. **Dag 5**: Content migratie van hardcoded naar CMS

### Week 4: A/B Testing Framework
1. **Dag 1-2**: Cookie-based variant selection
2. **Dag 3**: A/B testing components bouwen
3. **Dag 4-5**: Test scenarios implementeren

### Week 5: Analytics & Tracking
1. **Dag 1**: Google Analytics 4 setup
2. **Dag 2**: Facebook Pixel implementatie
3. **Dag 3**: Event tracking toevoegen
4. **Dag 4-5**: Testing & verificatie

### Week 6: Optimalisatie & Launch
1. **Dag 1-2**: Performance optimalisatie
2. **Dag 3**: A/B test configuratie
3. **Dag 4**: Final testing
4. **Dag 5**: Launch!

## 💡 Best Practices

### Content Management
- **Versionering**: Gebruik Basehub drafts voor preview
- **Fallbacks**: Altijd default content als CMS faalt
- **Caching**: Gebruik ISR (Incremental Static Regeneration)

### A/B Testing
- **Sample Size**: Minimum 1000 bezoekers per variant
- **Test Duration**: Minimum 2 weken per test
- **Single Variable**: Test één element tegelijk

### Analytics
- **Privacy**: GDPR-compliant cookie banner
- **Data Layer**: Structured data voor alle events
- **Custom Dimensions**: A/B test variant als dimension

## 🛠️ Technische Requirements

### Dependencies
```json
{
  "dependencies": {
    "basehub": "^latest",
    "@basehub/next-plugin": "^latest",
    "js-cookie": "^3.0.5",
    "react-ga4": "^latest"
  }
}
```

### Environment Variables
```env
# Basehub
BASEHUB_TOKEN=
BASEHUB_DRAFT_TOKEN=

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_FB_PIXEL_ID=

# A/B Testing
NEXT_PUBLIC_AB_TEST_ENABLED=true
```

## 📝 Voorbeeld Basehub Query

```typescript
// lib/basehub-client.ts
import { basehub } from 'basehub'

export const getLandingPageContent = async (variant?: 'A' | 'B') => {
  const data = await basehub().query({
    landingPage: {
      hero: {
        title: true,
        subtitle: true,
        ctaText: true,
        videoUrl: true
      },
      pricing: {
        originalPrice: true,
        discountPrice: true
      },
      variants: variant ? {
        [variant]: {
          hero: {
            title: true,
            ctaText: true
          }
        }
      } : false
    }
  })

  return variant && data.landingPage.variants?.[variant]
    ? { ...data.landingPage, ...data.landingPage.variants[variant] }
    : data.landingPage
}
```

## ✅ Success Metrics

### Conversion Metrics
- **Primary**: Pre-order conversion rate (target: >3%)
- **Secondary**: Email signup rate (target: >10%)
- **Engagement**: Video completion rate (target: >50%)

### Technical Metrics
- **Core Web Vitals**: LCP <2.5s, FID <100ms, CLS <0.1
- **Bounce Rate**: <40%
- **Session Duration**: >2 minutes

## 🎯 Voordelen van deze aanpak

1. **Flexibiliteit**: Content aanpassen zonder deployment
2. **Data-Driven**: Beslissingen gebaseerd op echte data
3. **Schaalbaarheid**: Makkelijk nieuwe testen toevoegen
4. **Performance**: Static generation met dynamic content
5. **SEO**: SSG/ISR voor optimale SEO scores

## 📚 Resources

- [Basehub Docs](https://basehub.com/docs)
- [Next.js ISR](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)
- [Google Analytics 4](https://developers.google.com/analytics/devguides/collection/ga4)
- [Facebook Pixel](https://developers.facebook.com/docs/facebook-pixel)

---

**Note**: Dit plan is modulair opgezet. Je kunt beginnen met basis Basehub integratie en later A/B testing en analytics toevoegen wanneer de basis landing page perfect is.