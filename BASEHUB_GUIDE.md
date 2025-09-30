# BaseHub Configuration Guide

## Current Status ✅
BaseHub is fully configured and working! All content is editable through the BaseHub dashboard.

## How to Edit Content

### 1. Login to BaseHub
Go to https://basehub.com and login with your credentials.

### 2. Navigate to Your Repository
Select your repository: `FutureFlowAI`

### 3. Content Structure

The content is organized as follows:

```
📁 Landing Pages Manager
├── 📄 AI Boek Landing
│   ├── Control Version (standard messaging)
│   ├── Urgency Version (time-sensitive messaging)
│   ├── Social Version (social proof focused)
│   └── Shared Content (prices, book details, sections)
├── 📄 Workshop Landing
│   ├── Control Version
│   ├── Urgency Version
│   ├── Social Version
│   └── Shared Content
└── 📄 Consulting Landing
    ├── Control Version
    ├── Urgency Version
    ├── Social Version
    └── Shared Content
```

## Working Landing Pages

### AI Book Landing Pages (✅ ACTIVE)
- **Standard**: https://yoursite.com/ai-boek
- **Urgency**: https://yoursite.com/ai-boek-urgency
- **Social**: https://yoursite.com/ai-boek-social

All these pages are working and pulling content from BaseHub!

## What You Can Edit

### For Each Landing Page Variant:
- **Main Title** - The main headline
- **Subtitle** - Supporting text under the headline
- **CTA Text** - Button text for call-to-action
- **Page Slug** - The URL path for the page

### Shared Content (applies to all variants):
- **Book/Workshop/Service Title**
- **Author/Trainer/Consultant Name**
- **Original Price** - Normal price
- **Discount Price** - Special offer price
- **Content Sections**:
  - Section Title
  - Section Description
  - Part 1-4 (Title & Description for each)
  - Bonus Text

## How to Make Changes

1. **Go to BaseHub Dashboard**
2. **Navigate to**: Landing Pages Manager → AI Boek Landing (or Workshop/Consulting)
3. **Click on the field you want to edit**
4. **Make your changes**
5. **Save the changes** (they will be immediately visible on the website in draft mode)
6. **Commit changes** to make them live in production

## Current Content Examples

### AI Book - Control Version
- **Title**: "Gewoon Beginnen met AI - Elke Ondernemer Kan AI Leren"
- **Subtitle**: "Van twijfel naar toepassing in 11 praktische hoofdstukken"
- **CTA**: "Pre-order Nu - €27 (€47)"

### AI Book - Urgency Version
- **Title**: "⏰ Laatste Kans: AI Boek Pre-order Sluit Binnenkort!"
- **Subtitle**: "De komende twee jaar bepalen uw positie"
- **CTA**: "Claim Nu Uw Exemplaar - Nog Maar 48 Uur!"

### AI Book - Social Version
- **Title**: "Al 150+ Ondernemers Gingen U Voor Met AI"
- **Subtitle**: "Sluit u aan bij ondernemers die al succesvol AI hebben geïmplementeerd"
- **CTA**: "Word Ook AI-Ready - Pre-order Nu"

## Important Notes

1. **BaseHub Timeouts**: Sometimes BaseHub might timeout when updating. If this happens:
   - Wait a few minutes and try again
   - Use smaller updates (one field at a time)
   - Check if changes are already saved in draft mode

2. **Draft vs Production**:
   - Changes are immediately visible in draft mode
   - You need to commit changes to make them live in production
   - The site currently uses draft mode by default

3. **Adding New Content**:
   - Workshop and Consulting landing pages need content added
   - Use the same structure as AI Book landing pages
   - Set appropriate page slugs for each variant

## Next Steps

To complete the BaseHub setup:

1. **Add Workshop Landing Content**:
   - Set page slugs (e.g., "ai-workshop", "ai-workshop-urgency", "ai-workshop-social")
   - Add workshop-specific content
   - Set prices and details

2. **Add Consulting Landing Content**:
   - Set page slugs (e.g., "ai-consulting", "ai-consulting-urgency", "ai-consulting-social")
   - Add consulting-specific content
   - Set prices and details

3. **Future Enhancements**:
   - Add testimonials section
   - Add FAQ content management
   - Add author/trainer bio section
   - Add dynamic countdown timers

## Technical Details

- **BaseHub Token**: Configured in environment variables
- **Query Location**: `/lib/basehub.ts`
- **Page Router**: `/app/[slug]/page.tsx`
- **Client Component**: `/app/[slug]/landing-page-client.tsx`

All pages dynamically fetch content from BaseHub and render it with the appropriate styling and components.