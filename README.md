# FutureFlowAI Website & Landing Pages

## 🎯 Project Overzicht

Dit project bevat de complete website voor FutureFlowAI met:
- 3D boek showcase
- Dynamische landing pages via BaseHub CMS
- A/B testing functionaliteit
- Stripe integratie voor betalingen

## 🚀 Quick Start

```bash
# Installeer dependencies
npm install

# Start development server
npm run dev

# Open in browser
http://localhost:3000
```

## 📚 Wat We Aanbieden

### 1. 📖 AI Boek - "Gewoon Beginnen met AI"
- **Pagina**: `/ai-boek`
- **Prijs**: €27 (normaal €47)
- **Doelgroep**: Ondernemers zonder technische kennis
- **A/B Varianten**:
  - Control: Standaard versie
  - Urgency: Focus op schaarste en tijdsdruk
  - Social: Focus op social proof (150+ ondernemers)

### 2. 🎓 AI Workshop
- **Pagina**: `/ai-workshop`
- **Prijs**: €297 (normaal €397)
- **Doelgroep**: Ondernemers die hands-on willen leren
- **A/B Varianten**:
  - Control: Standaard versie
  - Urgency: Laatste plekken beschikbaar
  - Social: 20+ bedrijven volgden deze workshop

### 3. 💼 AI Consulting
- **Pagina**: `/ai-consulting`
- **Prijs**: €1997 (normaal €2500)
- **Doelgroep**: Bedrijven die persoonlijke begeleiding willen
- **A/B Varianten**:
  - Control: Standaard versie
  - Urgency: Concurrenten zijn al begonnen
  - Social: 50+ bedrijven transformeerden met ons

## 🛠 Technische Stack

- **Framework**: Next.js 14.2.16
- **CMS**: BaseHub (headless CMS)
- **3D Graphics**: Three.js / React Three Fiber
- **Styling**: Tailwind CSS
- **Payments**: Stripe
- **Language**: TypeScript

## 📂 Project Structuur

```
/app
  ├── /[slug]           # Dynamische landing pages
  ├── /ai-boek          # Direct link naar boek landing
  ├── /ai-workshop      # Direct link naar workshop landing
  ├── /ai-consulting    # Direct link naar consulting landing
  ├── /ab-test          # A/B test manager
  ├── /landing          # Legacy landing page
  └── page.tsx          # Homepage met 3D boek

/components
  ├── /book-showcase    # 3D boek componenten
  ├── /ui               # UI componenten
  └── basehub-hero.tsx  # BaseHub hero component

/lib
  ├── basehub.ts        # BaseHub client & queries
  ├── ab-testing.ts     # A/B testing utilities
  └── /services         # Stripe integratie
```

## 🔧 Environment Variables

Maak een `.env.local` bestand aan met:

```env
# BaseHub CMS
BASEHUB_TOKEN=your_basehub_token_here

# Stripe (voor betalingen)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key_here
STRIPE_SECRET_KEY=your_stripe_secret_here
```

## 📊 BaseHub CMS Structuur

### Landing Pages Manager
Bevat alle landing page content voor de 3 diensten:
- **AI Boek Landing**: Content voor het e-book
- **Workshop Landing**: Content voor workshops
- **Consulting Landing**: Content voor consulting diensten

Elke landing heeft:
- Control versie (standaard)
- Urgency versie (schaarste/tijdsdruk)
- Social versie (social proof)

### FutureFlowAI Website
Bevat content voor de hoofdwebsite:
- Hero Section
- About Section
- Book Section
- Services Section
- Contact Section

## 🧪 A/B Testing

Het systeem ondersteunt automatische A/B testing:

1. **Automatische toewijzing**: Bezoekers worden random toegewezen aan een variant
2. **Cookie-based tracking**: 30 dagen persistentie
3. **Manual override**: Test specifieke variant met `?variant=urgency`
4. **Test Manager**: Bekijk alle varianten op `/ab-test`

### Test URLs
```
# Boek varianten
/ai-boek            # Random variant
/ai-boek?variant=control
/ai-boek?variant=urgency
/ai-boek?variant=social

# Workshop varianten
/ai-workshop?variant=control
/ai-workshop?variant=urgency
/ai-workshop?variant=social

# Consulting varianten
/ai-consulting?variant=control
/ai-consulting?variant=urgency
/ai-consulting?variant=social
```

## 🎨 3D Boek Showcase

De homepage toont een interactief 3D boek met:
- Rotatie animatie
- Touch/mouse interactie
- Nederlandse AI boek covers
- Responsive design

## 💳 Stripe Integratie

Betalingen worden afgehandeld via Stripe:
- Pre-configured checkout voor elk product
- Automatische prijsberekening
- Nederlandse betaalmethoden ondersteund

## 📝 Content Beheer

Alle content wordt beheerd via BaseHub CMS:
1. Login op BaseHub
2. Navigeer naar de juiste landing page
3. Pas content aan in draft mode
4. Commit changes wanneer klaar

## 🚦 Development Commands

```bash
# Development server
npm run dev

# Build voor productie
npm run build

# Start productie server
npm start

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 📈 Analytics & Tracking

Het project is voorbereid voor:
- Google Analytics integratie
- Conversion tracking per variant
- A/B test resultaten analyse

## 🔗 Belangrijke Links

- **Live Site**: [Coming Soon]
- **BaseHub CMS**: [BaseHub Dashboard](https://basehub.com)
- **Stripe Dashboard**: [Stripe Dashboard](https://dashboard.stripe.com)

## 📄 Deployment

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/colin-futureflowais-projects/v0-book-rendering-design)

Dit project is automatisch gesynchroniseerd met Vercel voor deployment.

## 👥 Team

- **FutureFlowAI** - AI Consultancy & Training
- **Contact**: info@futureflowai.nl

## 📄 Licentie

© 2024 FutureFlowAI. Alle rechten voorbehouden.

---

*Dit project maakt AI toegankelijk voor elke ondernemer, zonder technische kennis.*