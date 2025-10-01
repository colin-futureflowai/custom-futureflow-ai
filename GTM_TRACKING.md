# Google Tag Manager & Google Ads Tracking

## Overzicht
De website is nu volledig geïntegreerd met Google Tag Manager (GTM) en klaar voor Google Ads tracking en conversie optimalisatie.

## GTM Container ID
```
GTM-WQZ9GPGW
```

## Google Ads Account ID
```
AW-17072775739
```

## Geïmplementeerde Tracking

### 1. Basis Tracking
- **Page Views**: Alle pagina weergaven worden automatisch getracked
- **Scroll Depth**: Hoe ver bezoekers scrollen op de pagina
- **Session Duration**: Hoe lang bezoekers op de site blijven

### 2. E-commerce & Conversie Events

#### Begin Checkout
Wanneer een bezoeker op de "Pre-order" knop klikt:
```javascript
Event: 'begin_checkout'
Value: 27 EUR
Product: Gewoon Beginnen met AI E-book
Variant: [Control/Urgency/Social]
```

#### Add to Cart
Direct voordat de checkout begint:
```javascript
Event: 'add_to_cart'
Value: 27 EUR
Product: Gewoon Beginnen met AI E-book
```

#### Purchase/Conversion
Op de success pagina na betaling:
```javascript
Event: 'purchase'
Transaction ID: [Stripe Session ID]
Value: 27 EUR
Currency: EUR
Product: Gewoon Beginnen met AI E-book
Variant: [Control/Urgency/Social]
```

### 3. A/B Test Tracking

#### Variant Assignment
Bij toewijzing van een A/B test variant:
```javascript
Event: 'ab_test_assignment'
Experiment: 'landing_page_variants'
Variant: [Control/Urgency/Social]
Timestamp: ISO 8601
```

## Google Ads Conversion Setup

### Stap 1: Log in op Google Ads
1. Ga naar je Google Ads account
2. Klik op "Tools & Settings" → "Conversions"

### Stap 2: Maak een nieuwe conversie
1. Klik op het + icoon
2. Selecteer "Website"
3. Vul in:
   - **Conversie naam**: E-book Purchase
   - **Categorie**: Purchase/Sale
   - **Waarde**: 27 EUR (gebruik dezelfde waarde voor elke conversie)
   - **Telmethode**: Elke conversie

### Stap 3: Tag Setup
1. Selecteer "Use Google Tag Manager"
2. De conversie wordt automatisch gekoppeld aan je GTM container
3. Kopieer de Conversion ID en Conversion Label

### Stap 4: GTM Configuratie
1. Open Google Tag Manager
2. Maak een nieuwe Tag:
   - **Type**: Google Ads Conversion Tracking
   - **Conversion ID**: [Uit stap 3]
   - **Conversion Label**: [Uit stap 3]
   - **Trigger**: Custom Event "purchase"
3. Publiceer de container

## Enhanced E-commerce Setup

De website stuurt uitgebreide e-commerce data naar GTM:
- Product details (naam, prijs, categorie)
- Transaction details (ID, totaal, valuta)
- A/B test variant informatie
- User journey tracking

## Testing & Verificatie

### Test met GTM Preview Mode
1. Open Google Tag Manager
2. Klik op "Preview"
3. Navigeer naar je website
4. Test de volgende flow:
   - Homepage bezoek → A/B variant assignment event
   - Klik op Pre-order → begin_checkout + add_to_cart events
   - Complete aankoop → purchase event op success pagina

### Google Ads Conversion Test
1. Ga naar Google Ads → Tools → Conversions
2. Klik op je conversie
3. Check "Webpages" tab voor recent conversies
4. Verificatie kan tot 24 uur duren

## Debugging

### Check DataLayer in Console
```javascript
// In browser console
window.dataLayer

// Laatste event bekijken
window.dataLayer[window.dataLayer.length - 1]
```

### Common Issues

#### Conversies worden niet geregistreerd
- Check of GTM container is gepubliceerd
- Verificeer dat Conversion ID en Label correct zijn
- Wacht 24 uur voor volledige synchronisatie

#### A/B test variant wordt niet getracked
- Check localStorage voor 'ab_variant'
- Verificeer dat GTMService correct wordt geladen

## Rapportage

### Google Ads Reports
- **Conversions**: Totaal aantal e-book verkopen
- **Conversion Rate**: Percentage bezoekers dat koopt
- **Cost per Conversion**: Advertentiekosten per verkoop
- **ROAS**: Return on Ad Spend

### A/B Test Performance
Track in Google Ads welke landing page variant het beste converteert:
- Segment conversies per variant
- Vergelijk conversion rates
- Optimaliseer biedingen voor best presterende variant

## Optimalisatie Tips

1. **Smart Bidding**: Gebruik Target CPA of Target ROAS na 50+ conversies
2. **Audience Targeting**: Maak remarketing lijsten voor cart abandoners
3. **A/B Test Insights**: Pauzeer slecht presterende varianten na significante data
4. **Conversion Value**: Overweeg verschillende waardes voor verschillende producten

## Contact & Support
Voor hulp met tracking of optimalisatie, neem contact op met het development team.