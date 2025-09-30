# BaseHub Complete Schema Documentation

## Overview
This document provides the complete schema for BaseHub fields that need to be created to make all landing page content editable (except video).

## Current Structure in BaseHub

```
📁 Landing Pages Manager
├── 📄 AI Boek Landing
│   ├── Control Version
│   ├── Urgency Version
│   ├── Social Version
│   └── Shared Content (NEEDS EXPANSION)
├── 📄 Workshop Landing
│   └── (Same structure as AI Boek)
└── 📄 Consulting Landing
    └── (Same structure as AI Boek)
```

## Fields to Add to Shared Content

### Book/Service Details (NEW FIELDS)
```yaml
pageCount:
  type: number
  label: "Aantal Pagina's"
  default: 200
  description: "Het aantal pagina's van het boek"

publishYear:
  type: number
  label: "Publicatiejaar"
  default: 2024
  description: "Het jaar van publicatie"
```

### Why Section (NEW BLOCK)
```yaml
whyQuote:
  type: text
  label: "Waarom Quote"
  default: "AI kan intimiderend lijken, maar dat komt vooral omdat we het niet begrijpen. Dit boek maakt AI toegankelijk voor elke ondernemer."
  description: "Hoofdquote voor de Waarom sectie"

whyBenefits:
  type: array
  label: "Waarom Voordelen"
  items:
    title:
      type: text
      label: "Titel"
    description:
      type: text
      label: "Beschrijving"
  default:
    - title: "Geen technische kennis nodig"
      description: "Speciaal geschreven voor ondernemers zonder IT-achtergrond"
    - title: "Direct toepasbaar"
      description: "Praktische voorbeelden die u morgen kunt gebruiken"
    - title: "Bewezen methodes"
      description: "Gebaseerd op 2+ jaar ervaring met 150+ ondernemers"
    - title: "Focus op mensen versterken"
      description: "AI als hulpmiddel, niet als vervanging"
```

### Success Story (NEW BLOCK)
```yaml
successStory:
  type: object
  label: "Succesverhaal"
  fields:
    title:
      type: text
      label: "Titel"
      default: "Van Overweldigd naar Overtuigd"
    stat1Value:
      type: text
      label: "Statistiek 1 Waarde"
      default: "3w"
    stat1Label:
      type: text
      label: "Statistiek 1 Label"
      default: "Van 3 maanden handmatig naar 3 weken met AI"
    stat2Value:
      type: text
      label: "Statistiek 2 Waarde"
      default: "4x"
    stat2Label:
      type: text
      label: "Statistiek 2 Label"
      default: "Meer tijd voor strategisch werk"
    stat3Value:
      type: text
      label: "Statistiek 3 Waarde"
      default: "€15K"
    stat3Label:
      type: text
      label: "Statistiek 3 Label"
      default: "Bespaard in het eerste jaar"
    quote:
      type: text
      label: "Quote"
      default: "Dit zijn de resultaten die ondernemers behalen na het lezen van dit boek en het toepassen van de praktische voorbeelden."
```

### Pre-order Benefits (NEW BLOCK)
```yaml
preorderBenefits:
  type: array
  label: "Pre-order Voordelen"
  items:
    title:
      type: text
      label: "Titel"
    description:
      type: text
      label: "Beschrijving"
  default:
    - title: "✅ Extra hoofdstuk"
      description: "Exclusief bonushoofdstuk over AI-trends voor 2025"
    - title: "✅ Werkbladen"
      description: "Praktische templates om direct mee aan de slag te gaan"
    - title: "✅ Updates"
      description: "6 maanden gratis updates bij nieuwe AI-ontwikkelingen"
```

### FAQ Section (NEW BLOCK)
```yaml
faqItems:
  type: array
  label: "Veelgestelde Vragen"
  items:
    question:
      type: text
      label: "Vraag"
    answer:
      type: text
      label: "Antwoord"
  default:
    - question: "Heb ik technische kennis nodig?"
      answer: "Nee, absoluut niet. Dit boek is speciaal geschreven voor ondernemers zonder technische achtergrond..."
    - question: "Wanneer ontvang ik het e-book?"
      answer: "Direct na betaling ontvangt u de downloadlink in uw mailbox..."
    - question: "Is dit ook geschikt voor mijn sector?"
      answer: "Ja! De voorbeelden en strategieën zijn toepasbaar in elke sector..."
    - question: "Wat als ik niet tevreden ben?"
      answer: "U heeft 30 dagen geld-terug-garantie..."
```

### Footer Content (NEW FIELDS)
```yaml
footerText:
  type: text
  label: "Footer Tekst"
  default: "FutureFlowAI - Uw partner in AI-transformatie"
  description: "Tekst in de footer"

guaranteeText:
  type: text
  label: "Garantie Tekst"
  default: "30 dagen geld-terug-garantie"
  description: "Garantie boodschap"

urgencyText:
  type: text
  label: "Urgentie Tekst"
  default: "⏰ Let op: De komende twee jaar bepalen wie voorop loopt en wie achter blijft. Ondernemers die nu AI omarmen, hebben straks een onoverbrugbare voorsprong."
  description: "Urgentie boodschap voor conversie"
```

### Content Sections (ALREADY EXISTS - VERIFY)
The contentSections block should already exist with:
- sectionTitle
- contentDescription
- part1 (title, description)
- part2 (title, description)
- part3 (title, description)
- part4 (title, description)
- bonusText

## Implementation Steps

### 1. Login to BaseHub
Navigate to https://basehub.com and access your repository.

### 2. Navigate to Structure
Go to: Landing Pages Manager → AI Boek Landing → Shared Content

### 3. Add New Fields
Add each field/block as specified above with the correct types and default values.

### 4. Repeat for Other Landing Pages
Apply the same structure to:
- Workshop Landing → Shared Content
- Consulting Landing → Shared Content

### 5. Save and Commit
Save all changes and commit them in BaseHub.

## Code Integration Status

✅ **Frontend Code Ready**: All TypeScript interfaces and React components are already updated to use these fields.

✅ **Default Values Implemented**: The code includes all default values, so the site works even before BaseHub fields are created.

✅ **Backwards Compatible**: Existing content won't break when new fields are added.

## Fields Summary

### Total New Fields to Add: 11
1. `pageCount` (number)
2. `publishYear` (number)
3. `whyQuote` (text)
4. `whyBenefits` (array of objects)
5. `successStory` (object with 7 sub-fields)
6. `preorderBenefits` (array of objects)
7. `faqItems` (array of objects)
8. `footerText` (text)
9. `guaranteeText` (text)
10. `urgencyText` (text)
11. `contentSections` (verify it exists with all sub-fields)

### Fields to Keep
- `videoUrl` (hardcoded as "/video.mp4" for now)
- All existing fields (prices, titles, etc.)

### Fields to Remove (if they exist)
- Any fields from old "landingPage" document
- Any fields from old "futureFlowAIWebsite" document

## Verification Checklist

After adding fields in BaseHub:

- [ ] All fields appear in BaseHub dashboard
- [ ] Default values are set correctly
- [ ] Field types match specification (text, number, array, object)
- [ ] Fields are in Shared Content (not in version-specific sections)
- [ ] Changes are committed in BaseHub
- [ ] Website reflects new content when edited in BaseHub

## Notes

- **Video**: Remains hardcoded as "/video.mp4" per user request
- **Variant Versions**: Control, Urgency, and Social versions only need mainTitle, subtitle, ctaText, pageSlug
- **Shared Content**: All other content is shared between variants to avoid duplication
- **Language**: All labels and defaults are in Dutch

## Support

If BaseHub continues to have timeout issues:
1. Try updating fields in smaller batches
2. Use BaseHub's support if API issues persist
3. The code will continue to work with default values until BaseHub is updated