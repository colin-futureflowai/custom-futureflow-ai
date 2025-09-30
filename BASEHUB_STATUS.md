# BaseHub Status - Wat is WEL en NIET aanpasbaar

## ✅ WEL Aanpasbaar in BaseHub

### Hero Sectie
- ✅ Main Title (hoofdtitel)
- ✅ Subtitle (ondertitel)
- ✅ CTA Text (button tekst)
- ✅ Page Slug (URL pad)

### Prijzen
- ✅ Original Price (normale prijs)
- ✅ Discount Price (kortingsprijs)

### Boek/Workshop/Consulting Details
- ✅ Book Title / Workshop Title / Service Title
- ✅ Author / Trainer / Consultant naam
- ⚠️ Page Count (aantal pagina's) - **TOEGEVOEGD maar BaseHub moet nog worden bijgewerkt**
- ⚠️ Publish Year (publicatiejaar) - **TOEGEVOEGD maar BaseHub moet nog worden bijgewerkt**

### Content Secties (Wat krijg je?)
- ✅ Section Title
- ✅ Content Description
- ✅ Part 1 - Title & Description
- ✅ Part 2 - Title & Description
- ✅ Part 3 - Title & Description
- ✅ Part 4 - Title & Description
- ✅ Bonus Text

## ❌ NIET Aanpasbaar in BaseHub (Hardcoded)

### Video
- ❌ Video URL (altijd "/video.mp4")

### "Waarom Dit Boek?" Sectie
- ❌ Quote teksten (bijv. "AI kan intimiderend lijken...")
- ❌ 4 benefit boxes met titels en beschrijvingen
- ❌ "Focus op mensen versterken" tekst

### Success Story Sectie
- ❌ Titel van succesverhaal
- ❌ Statistieken (3m → 3w, 4x, etc.)
- ❌ Quote ("Dit zijn de resultaten...")

### Pre-order Sectie
- ❌ Extra benefits (3 checkmarks met beschrijvingen)
- ❌ Garantie teksten
- ❌ Urgentie boodschap ("⏰ Let op: De komende twee jaar...")

### FAQ Sectie
- ❌ Alle vragen en antwoorden (4 stuks)
- ❌ "Heb ik technische kennis nodig?"
- ❌ "Wanneer ontvang ik het e-book?"
- ❌ "Is dit ook geschikt voor mijn sector?"
- ❌ "Wat als ik niet tevreden ben?"

### Footer
- ❌ FutureFlowAI beschrijving
- ❌ Privacy Policy, Algemene Voorwaarden, Contact links

### Navigatie
- ❌ Menu items (Home, Inhoud, Waarom, Pre-order)

### Overige Hardcoded Elementen
- ❌ Countdown timer logica
- ❌ Discount percentage berekening (wel gebaseerd op prijzen)
- ❌ "Veilig betalen via iDEAL" tekst
- ❌ Emoji's en iconen
- ❌ CSS kleuren en styling

## 📋 TODO - Om ALLES aanpasbaar te maken

1. **BaseHub Structure moet uitgebreid worden met**:
   - [ ] pageCount en publishYear fields (code is al aangepast)
   - [ ] Quote teksten voor "Waarom" sectie
   - [ ] Success Story content (titel, stats, quote)
   - [ ] FAQ vragen en antwoorden (array)
   - [ ] Benefit boxes voor "Waarom" sectie (array)
   - [ ] Pre-order benefits (array)
   - [ ] Footer content
   - [ ] Garantie teksten

2. **Code aanpassingen nodig voor**:
   - [ ] FAQ sectie dynamisch maken
   - [ ] Success Story sectie dynamisch maken
   - [ ] "Waarom Dit Boek?" quotes en benefits dynamisch maken
   - [ ] Pre-order benefits dynamisch maken
   - [ ] Footer content dynamisch maken

## Huidige Status
- Ongeveer **40%** van de content is aanpasbaar in BaseHub
- De belangrijkste elementen (titels, prijzen, hoofdcontent) zijn WEL aanpasbaar
- Detail content (FAQ, testimonials, quotes) is NIET aanpasbaar

## Aanbeveling
Voor volledig beheer via BaseHub moeten we:
1. BaseHub schema uitbreiden met alle ontbrekende velden
2. Code aanpassen om deze velden te gebruiken
3. Standaard content toevoegen aan BaseHub

Dit is ongeveer 2-3 uur werk om volledig te implementeren.