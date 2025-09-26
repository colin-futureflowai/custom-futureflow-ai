# Favicon Setup voor FutureFlowAI

## Benodigde bestanden

### Optie 1: Modern (SVG + PNG)
```
/public/
├── favicon.svg           # Hoofdfavicon (vector)
├── icon-192.png          # Android/Chrome
├── icon-512.png          # PWA
└── apple-icon.png        # Apple devices (180x180)
```

### Optie 2: Complete set
```
/public/
├── favicon.ico           # Legacy browsers
├── favicon-16x16.png     # Kleine favicon
├── favicon-32x32.png     # Standaard favicon
├── apple-touch-icon.png  # iOS (180x180)
├── icon-192.png          # Android
└── icon-512.png          # PWA
```

## Implementatie in app/layout.tsx

```typescript
export const metadata: Metadata = {
  title: "Gewoon Beginnen met AI - FutureFlowAI",
  description: "Praktische gids voor ondernemers",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' }
    ],
    apple: '/apple-touch-icon.png',
    other: [
      { rel: 'icon', url: '/icon-192.png', sizes: '192x192' },
      { rel: 'icon', url: '/icon-512.png', sizes: '512x512' }
    ]
  },
}
```

## SVG Voorbeeld voor FutureFlowAI groene ster

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <path fill="#32a029" d="M16 2 L20 12 L30 12 L22 18 L25 28 L16 22 L7 28 L10 18 L2 12 L12 12 Z"/>
</svg>
```

## Tools om favicon te maken

### Online tools:
1. **Favicon.io** - Upload logo, genereert alle formaten
2. **RealFaviconGenerator** - Complete set met alle platforms
3. **Favicon.cc** - Voor ICO bestanden

### Met Photoshop/Illustrator:
1. Open het logo
2. Verwijder achtergrond
3. Behoud alleen groene elementen
4. Exporteer als:
   - SVG (beste kwaliteit)
   - PNG 512x512 (schaal later naar beneden)

## Stappen om te implementeren:

1. **Maak de favicon bestanden**
   - Gebruik een tool of design software
   - Zorg voor transparante achtergrond
   - Gebruik FutureFlowAI groen (#32a029)

2. **Plaats in /public folder**
   ```bash
   /public/favicon.svg
   /public/favicon.png
   ```

3. **Update metadata in layout.tsx**
   - Verwijs naar de nieuwe bestanden
   - Test in verschillende browsers

4. **Test de favicon**
   - Chrome: F12 > Application > Manifest
   - Safari: Check bookmark icon
   - Mobile: Add to homescreen