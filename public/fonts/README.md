# BR Sonoma Font Installation

## How to add BR Sonoma font files

BR Sonoma is a commercial font that needs to be purchased and licensed. Once you have the font files, follow these steps:

### 1. Required Font Files
Place the following font files in this `/public/fonts/` directory:

- `BR-Sonoma-Regular.woff2` and `BR-Sonoma-Regular.woff` (Weight: 400)
- `BR-Sonoma-Medium.woff2` and `BR-Sonoma-Medium.woff` (Weight: 500)
- `BR-Sonoma-Semibold.woff2` and `BR-Sonoma-Semibold.woff` (Weight: 600)
- `BR-Sonoma-Bold.woff2` and `BR-Sonoma-Bold.woff` (Weight: 700)

### 2. Activate Font-Face Declarations
Once you have added the font files, uncomment the `@font-face` declarations in `/app/landing/fonts.css`

### 3. Font Formats
- `.woff2` - Modern, compressed format (primary)
- `.woff` - Fallback for older browsers

### 4. Where to Purchase BR Sonoma
BR Sonoma can be purchased from:
- TypeType Foundry
- MyFonts
- Or your preferred font distributor

### 5. Current Fallback
Until the BR Sonoma files are added, the site uses a professional fallback font stack that provides a similar clean, modern appearance.

## License Note
Make sure you have the appropriate license for web usage of BR Sonoma before deploying to production.