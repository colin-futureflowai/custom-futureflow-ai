# CLAUDE.md - Project Guide for "Gewoon Beginnen met AI" Landing Page

## Project Overview
Building a conversion-focused landing page for the pre-order of the e-book "Gewoon Beginnen met AI" by FutureFlowAI. This is a practical guide for entrepreneurs who want to start with AI without technical knowledge.

## Key Project Files
- `LOGBOOK.md` - **SESSION TRACKING: Always read and update this file**
- `SITE_STRUCTURE.md` - **IMPORTANT: Update this when adding pages or changing BaseHub structure**
- `LandingsPaginaBeschrijving.md` - Complete landing page requirements and structure
- `Brandbook.md` - FutureFlowAI brand guidelines
- `components/book-showcase/` - 3D book component to be integrated

## Brand Identity

### Colors (FutureFlowAI Brand)
```css
--brand-primary: #32a029;     /* Green - AI accent, CTAs */
--brand-dark-gray: #3D3D3D;   /* Primary text */
--brand-white: #FFFFFF;       /* Backgrounds */
--brand-black: #000000;       /* Deep contrast */

/* Landing Page Specific */
--landing-blue: #2563EB;      /* Professional blue */
--landing-green: #10B981;     /* Trust green */
--landing-orange: #F97316;    /* CTA accent */
--landing-bg: #F9FAFB;        /* Light gray background */
```

### Typography
- Primary: BR Sonoma (FutureFlowAI brand font)
- Fallback: Modern sans-serif
- Tone: Friendly, accessible, professional but not distant

### Communication Style
- Slightly informal, accessible yet professional
- Warm and personal approach
- Simple and understandable, avoid complexity
- Build trust through transparency

## Component Integration Strategy

### 1. 3D Book Component Usage
The existing book showcase should be adapted for the landing page:
- Remove navigation buttons (only single book display)
- Customize book data for "Gewoon Beginnen met AI"
- Keep interactive rotation
- Optimize for hero section placement
- Add Dutch AI book covers (already in `/public/images/`)

### 2. Page Structure Components Needed

```typescript
// Hero Section
- VideoPlayer component (for promo video)
- Book3DPreview (adapted from book-showcase)
- CTAButton with countdown timer
- TrustIndicator

// Content Sections
- WhyThisBook
- WhatYouGet (chapters overview)
- TargetAudience
- SuccessStory
- AuthorSection
- PreorderSection with pricing
- FAQ
- Footer
```

## Development Priorities

### Phase 1: Foundation ✅
- [x] Fix 3D book component errors
- [x] Ensure React 18 compatibility
- [ ] Create landing page base structure

### Phase 2: Hero Section
- [ ] Adapt book-showcase for single book display
- [ ] Integrate promo video
- [ ] Create CTA with countdown
- [ ] Add trust indicators

### Phase 3: Content Sections
- [ ] Implement all content sections
- [ ] Add quotes from the book
- [ ] Create FAQ component
- [ ] Build pre-order form

### Phase 4: Conversion Optimization
- [ ] Add urgency elements
- [ ] Implement exit-intent popup
- [ ] Add sticky mobile CTA
- [ ] A/B testing setup

### Phase 5: Polish & Launch
- [ ] Performance optimization
- [ ] Analytics integration
- [ ] Payment integration
- [ ] Final testing

## Key Messages to Include

### Headlines
- **Main**: "Gewoon Beginnen met AI - Elke Ondernemer Kan AI Leren"
- **Sub**: "Van twijfel naar toepassing in 11 praktische hoofdstukken"

### Trust Elements
- "Al 150+ ondernemers gingen je voor"
- "Sinds 2022 actief in AI-implementatie"
- "30 dagen geld-terug-garantie"

### Urgency
- "Beperkte pre-order periode"
- "De komende twee jaar bepalen uw positie"
- Pre-order price: €27 (normal €47)

### Key Quotes from Book
1. "AI kan intimiderend lijken, maar dat komt vooral omdat we het niet begrijpen."
2. "Het gaat niet om mensen vervangen. Het gaat om mensen versterken."
3. "U hoeft geen programmeur te worden."

## Technical Considerations

### Performance
- Lazy load images and 3D models
- Optimize video streaming
- Target < 3 second load time
- Mobile-first approach

### SEO
- Meta tags for book pre-order
- Structured data for product
- Dutch language optimization

### Analytics Events to Track
- Video plays
- 3D book interactions
- Scroll depth
- CTA clicks
- Form submissions
- Pre-order completions

## File Structure for Landing Page

```
app/
├── landing/
│   ├── page.tsx                    # Main landing page
│   └── components/
│       ├── hero-section.tsx
│       ├── book-3d-preview.tsx     # Adapted from book-showcase
│       ├── video-player.tsx
│       ├── cta-button.tsx
│       ├── why-this-book.tsx
│       ├── what-you-get.tsx
│       ├── target-audience.tsx
│       ├── success-story.tsx
│       ├── author-section.tsx
│       ├── preorder-section.tsx
│       └── faq.tsx
```

## Current 3D Book Component Status
✅ Working without errors
✅ Dutch AI book textures available
✅ Interactive rotation functional
✅ Responsive design

## Next Steps
1. Create `/app/landing` directory structure
2. Extract and adapt book-showcase for single book display
3. Remove unnecessary navigation and debug features
4. Implement hero section with video integration
5. Build remaining content sections

## Commands for Development
```bash
# Run development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint
```

## Notes
- The 3D book component is now stable with React 18
- Use the Dutch AI book (index 1) from booksData
- Video file should be added to `/public/videos/`
- Consider using Vercel for deployment (Next.js native)
- Payment integration will need separate setup (Stripe/Mollie)

## Important Maintenance Tasks

### SITE_STRUCTURE.md Updates Required When:
1. **Adding new pages** - Update the page structure section
2. **Adding new BaseHub content** - Update the dynamic landing pages section
3. **Changing URL slugs** - Update the generated routes table
4. **Adding integrations** - Update the third-party integrations section
5. **Modifying checkout flow** - Update the checkout flow section
6. **Creating new components** - Update the component structure section

### Always Check and Update:
- Page status (✅ Active, 📝 Content needed, 🔄 Planned)
- Last updated date at the top of SITE_STRUCTURE.md
- Todo/Roadmap section for completed tasks
- Environment variables if new services are added

## Resources
- Book content: Available in project files
- Brand assets: Follow Brandbook.md guidelines
- 3D Models: Already configured in `/public/models/`
- Book covers: Available in `/public/images/dutch-ai-*.jpeg`
- Site structure: See SITE_STRUCTURE.md for complete overview