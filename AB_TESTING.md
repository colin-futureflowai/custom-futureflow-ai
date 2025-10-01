# A/B Testing Systeem - BaseHub Integratie

## Overzicht
De website heeft een geavanceerd A/B testing mechanisme dat bezoekers automatisch en willekeurig verdeelt over drie verschillende landingspagina varianten. Alle varianten worden beheerd via BaseHub CMS onder "Gewoon beginnen met AI - Landing".

## Hoe Het Werkt

### 1. Hoofdpagina (https://gewoonbeginnenmetai.futureflowai.nl/)
Wanneer een bezoeker op de hoofdpagina komt:
- Wordt automatisch een variant toegewezen (33.33% kans per variant)
- De keuze wordt 24 uur opgeslagen voor consistentie
- Bezoeker wordt doorgestuurd naar de geselecteerde variant
- Slugs worden dynamisch uit BaseHub gehaald

### 2. De Drie Varianten (BaseHub Managed)
- **Control Version**: Standaard versie met neutrale boodschap
- **Urgency Version**: Focus op urgentie en schaarste
- **Social Version**: Focus op social proof en testimonials

Alle content voor deze varianten wordt beheerd in BaseHub onder:
`Gewoon beginnen met AI - Landing > [Control/Urgency/Social] Version`

### 3. Tracking
Het systeem houdt bij:
- Welke variant elke bezoeker krijgt
- Timestamp van toewijzing
- User agent en referrer informatie
- Analytics events voor Google Analytics (indien geïnstalleerd)

## Voor Advertenties

### Gebruik Deze URL voor Ads:
```
https://gewoonbeginnenmetai.futureflowai.nl/
```

Deze hoofdURL zorgt ervoor dat:
- Alle advertentie-traffic automatisch verdeeld wordt
- Je kunt testen welke aanpak het beste werkt
- Bezoekers krijgen een consistente ervaring (zelfde variant bij terugkeer binnen 24 uur)

### Google/Facebook Ads Setup:
1. Gebruik de hoofdURL als landing page
2. Voeg UTM parameters toe voor tracking:
   ```
   https://gewoonbeginnenmetai.futureflowai.nl/?utm_source=google&utm_medium=cpc&utm_campaign=ai-book
   ```
3. De A/B test werkt automatisch met alle UTM parameters

## Dashboard (Development Only)

In development mode kun je de resultaten bekijken op:
```
http://localhost:3000/ab-dashboard
```

Dit toont:
- Aantal toewijzingen per variant
- Percentage verdeling
- Real-time updates

## Technische Details

### Gewichtsverdeling
Momenteel gelijke verdeling (1:1:1). Dit kan aangepast worden in `/app/page.tsx`:

```typescript
const LANDING_VARIANTS = [
  { path: '/preorder', name: 'Pre-order', weight: 2 },  // 50% traffic
  { path: '/workshop', name: 'Workshop', weight: 1 },   // 25% traffic
  { path: '/consulting', name: 'Consulting', weight: 1 } // 25% traffic
]
```

### Cookie Persistentie
- Variant wordt opgeslagen in `localStorage`
- 24 uur geldigheid voor consistente ervaring
- Automatisch nieuwe toewijzing na 24 uur

### Analytics Integratie
Het systeem stuurt automatisch events naar:
- Google Analytics (indien gtag geïnstalleerd)
- Interne API voor tracking

## Best Practices

### Voor Maximale Testresultaten:
1. **Minimale Testduur**: 2 weken
2. **Minimaal Verkeer**: 1000 bezoekers per variant
3. **Meet Conversies**: Stel conversion tracking in voor elke variant
4. **Analyseer Resultaten**: Check bounce rate, tijd op pagina, conversie rate

### Conversie Tracking:
Voeg toe aan elke succesvolle checkout:
```javascript
gtag('event', 'purchase', {
  variant: localStorage.getItem('ab_variant'),
  value: 27,
  currency: 'EUR'
})
```

## Toekomstige Verbeteringen

### Mogelijke Uitbreidingen:
- Server-side A/B testing (sneller, geen flicker)
- Multivariate testing (meerdere elementen tegelijk)
- Personalisatie op basis van bron/device
- Automatische winner selectie
- Integration met analytics platforms

## Troubleshooting

### Bezoeker Ziet Altijd Zelfde Variant:
- Clear localStorage in browser
- Of wacht 24 uur voor nieuwe toewijzing

### Test Lokaal:
1. Open hoofdpagina in incognito/private window
2. Check welke variant je krijgt
3. Sluit window en herhaal voor nieuwe toewijzing

### Check Verdeling:
In development: Ga naar `/ab-dashboard` voor real-time statistieken

## Belangrijke URLs

- **Productie (A/B Test Entry)**: https://gewoonbeginnenmetai.futureflowai.nl/
- **Dashboard (Dev Only)**: http://localhost:3000/ab-dashboard

### Direct Links naar Varianten (voor test doeleinden)
De exacte URLs worden bepaald door de slugs in BaseHub. Typisch zijn dit:
- **Control Version**: https://gewoonbeginnenmetai.futureflowai.nl/[control-slug]
- **Urgency Version**: https://gewoonbeginnenmetai.futureflowai.nl/[urgency-slug]
- **Social Version**: https://gewoonbeginnenmetai.futureflowai.nl/[social-slug]

## BaseHub Content Management

### Waar vind je de content:
1. Log in op BaseHub
2. Ga naar "Gewoon beginnen met AI - Landing"
3. Je ziet drie secties:
   - Control Version
   - Urgency Version
   - Social Version

### Wat kun je aanpassen per variant:
- **Main Title**: Hoofdtitel van de pagina
- **Subtitle**: Ondertitel
- **CTA Text**: Call-to-action knop tekst
- **Page Slug**: De URL slug voor deze variant

### Shared Content (gedeeld tussen alle varianten):
- Video URL
- Prijzen (origineel en korting)
- Boek details
- Why section
- Success stories
- FAQ items
- En meer...

## Contact
Voor vragen of aanpassingen aan de A/B test, neem contact op met het development team.