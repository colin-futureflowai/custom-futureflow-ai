# Vercel Environment Variables Setup

## BELANGRIJK: Custom Domain Configuration - VERBETERDE VERSIE

De applicatie detecteert nu automatisch je custom domein! Maar voor de beste betrouwbaarheid, stel alsnog de environment variable in:

### Automatische Detectie (NIEUW!)
De applicatie detecteert nu automatisch of je een custom domein gebruikt en past de Stripe redirect URLs daarop aan. Dit betekent dat het **direct zou moeten werken** met je custom domein zonder extra configuratie.

### Voor Optimale Betrouwbaarheid

#### Stap 1: Ga naar Vercel Dashboard
1. Log in op [Vercel](https://vercel.com)
2. Selecteer je project
3. Ga naar "Settings" → "Environment Variables"

#### Stap 2: Voeg NEXT_PUBLIC_BASE_URL toe (OPTIONEEL maar aanbevolen)
Voeg de volgende environment variable toe:

```
Name: NEXT_PUBLIC_BASE_URL
Value: https://jouw-custom-domein.com
```

**Bijvoorbeeld:**
- Als je domein `gewoonbeginnenmetai.nl` is:
  ```
  NEXT_PUBLIC_BASE_URL=https://gewoonbeginnenmetai.nl
  ```

#### Stap 3: Belangrijk - GEEN trailing slash!
Zorg ervoor dat je URL GEEN `/` aan het einde heeft:
- ✅ Goed: `https://gewoonbeginnenmetai.nl`
- ❌ Fout: `https://gewoonbeginnenmetai.nl/`

#### Stap 4: Deploy opnieuw
Na het toevoegen van de environment variable:
1. Ga naar "Deployments"
2. Klik op de drie puntjes bij je laatste deployment
3. Kies "Redeploy"

### Hoe Het Werkt
1. **Met NEXT_PUBLIC_BASE_URL**: Gebruikt altijd je custom domein voor redirects
2. **Zonder NEXT_PUBLIC_BASE_URL**: Detecteert automatisch het domein van de huidige request
3. **Fallback**: Als je op een Vercel preview URL zit in productie, gebruikt het automatisch `gewoonbeginnenmetai.nl`

## Andere belangrijke Environment Variables

### Stripe Variables (VERPLICHT)
```
STRIPE_SECRET_KEY=sk_live_xxxxx (of sk_test_xxxxx voor test mode)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx (of pk_test_xxxxx)
STRIPE_PRICE_ID=price_xxxxx
STRIPE_PRODUCT_ID=prod_xxxxx
```

### BaseHub Variables (OPTIONEEL)
```
BASEHUB_TOKEN=bshb_pk_xxxxx
```

## Waarom is dit belangrijk?

Zonder `NEXT_PUBLIC_BASE_URL`:
- Stripe redirect gaat naar de Vercel URL (bijv. `custom-futureflow-ai.vercel.app`)
- Dit kan verwarrend zijn voor klanten die je custom domein gebruiken

Met `NEXT_PUBLIC_BASE_URL`:
- Stripe redirect gaat naar je custom domein
- Consistente ervaring voor je klanten
- Professionelere uitstraling

## Troubleshooting

### Probleem: Redirects gaan nog steeds naar Vercel URL
**Oplossing**:
1. Check of `NEXT_PUBLIC_BASE_URL` correct is ingesteld
2. Zorg dat je opnieuw hebt gedeployed na het instellen
3. Clear je browser cache

### Probleem: Stripe checkout werkt niet
**Oplossing**:
1. Check of alle Stripe environment variables zijn ingesteld
2. Verifieer dat je de juiste keys gebruikt (live vs test)
3. Check Stripe Dashboard voor foutmeldingen

### Probleem: BaseHub content wordt niet geladen
**Oplossing**:
1. Stel `BASEHUB_TOKEN` in als environment variable
2. Check of de token correct is in BaseHub dashboard