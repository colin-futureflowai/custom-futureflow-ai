# Vercel Environment Variables Setup

## BELANGRIJK: Custom Domain Configuration

Om ervoor te zorgen dat Stripe redirects naar je custom domein werken (en niet naar de oude Vercel URL), moet je de volgende environment variable instellen in Vercel:

### Stap 1: Ga naar Vercel Dashboard
1. Log in op [Vercel](https://vercel.com)
2. Selecteer je project
3. Ga naar "Settings" → "Environment Variables"

### Stap 2: Voeg NEXT_PUBLIC_BASE_URL toe
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

### Stap 3: Belangrijk - GEEN trailing slash!
Zorg ervoor dat je URL GEEN `/` aan het einde heeft:
- ✅ Goed: `https://gewoonbeginnenmetai.nl`
- ❌ Fout: `https://gewoonbeginnenmetai.nl/`

### Stap 4: Deploy opnieuw
Na het toevoegen van de environment variable:
1. Ga naar "Deployments"
2. Klik op de drie puntjes bij je laatste deployment
3. Kies "Redeploy"

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