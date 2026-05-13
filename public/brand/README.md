# thirteen. — Brand Assets

All assets live at `/public/brand/` and are served by the deploy at:

- `/brand/wordmark.svg` — wordmark only, transparent bg (1200×240). Use on any background.
- `/brand/wordmark-dark.svg` — wordmark on midnight background (1200×240). Use as a banner or letterhead.
- `/brand/profile-square.svg` — 1024×1024 LinkedIn / social profile photo (square, dark, centered wordmark with hairline + champagne dot).
- `/brand/banner-linkedin.svg` — 1584×396 LinkedIn banner with "AI, engineered." headline + brand purple orb.
- `/brand/mark.svg` — 1024×1024 just the champagne dot mark (no wordmark).
- `/favicon.svg` — same mark sized for the browser tab.

## Colors

| Role | Hex |
|------|-----|
| Midnight (bg) | `#0c0a10` |
| Ivory (text) | `#f4f1ec` |
| Purple (brand primary) | `#9d6add` |
| Champagne (accent + dot) | `#c9a96e` |

## Type

- Display + wordmark: **Cormorant Garamond** italic 500
- Body / UI: **Inter** 400-700
- Mono accents: **JetBrains Mono** 400-500
- Signature: **Caveat**

## Ready-to-upload PNGs (retina, 2x)

These are pre-rendered at 2x scale so they stay crisp at native dimensions:

- `banner-linkedin.png` — 3168×792 (displays at 1584×396). Use as your LinkedIn banner.
- `profile-square.png` — 2048×2048 (displays at 1024×1024). Use as your LinkedIn profile photo.
- `wordmark-dark.png` — 2400×480 (displays at 1200×240). Wordmark on midnight bg for documents/decks.

To regenerate (after editing the layout in `scripts/render-brand-pngs.mjs`):

```bash
npm install --no-save puppeteer
node scripts/render-brand-pngs.mjs
```

Headless Chromium loads the Cormorant Garamond font from Google Fonts and screenshots at the chosen dimensions.
