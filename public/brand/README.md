# Lead Thirteen — Brand Assets

All assets live at `/public/brand/` and are served by the deploy at:

- `/brand/wordmark.svg` — wordmark only, transparent bg (1200×240). Use on any background.
- `/brand/wordmark-dark.svg` — wordmark on midnight background (1200×240). Use as a banner or letterhead.
- `/brand/profile-square.svg` — 1024×1024 LinkedIn / social profile photo (square, dark, centered wordmark with hairline + champagne dot).
- `/brand/banner-linkedin.svg` — 1584×396 LinkedIn banner with "cold email, hand-written." headline + brand purple orb.
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

## Converting SVG → PNG for upload

LinkedIn / X / Instagram accept PNG/JPG. To convert:

1. **Mac Preview:** Open the SVG → File → Export → Format: PNG → choose 1024×1024 (or higher).
2. **Figma / Illustrator:** Drag the SVG in, export as PNG at 2x or 3x.
3. **Free online:** [cloudconvert.com](https://cloudconvert.com/svg-to-png), upload SVG, set size, download PNG.
4. **CLI:** If you `brew install librsvg`, then `rsvg-convert -w 1024 -h 1024 profile-square.svg > profile-square.png`.

For LinkedIn:
- **Profile photo:** use `profile-square.svg` → export as 400×400 or 800×800 PNG.
- **Banner:** use `banner-linkedin.svg` → export as 1584×396 PNG.
