# dark horse ai — brand spec

**Wordmark:** the drawn `dark horse ai` logotype — Fraunces italic 600 converted to raw SVG outlines
(facet-diamond tittle on the i, brass "ai" on its own plinth bar, hand-set spacing).
**It is never re-typed.** Use the SVGs, always. No font dependency in the files.
**Mark:** the piece — chess knight on its classic flat base, one color, no eye, no interior cut.

## Type
- Display (headlines only): **Fraunces** italic 600 (Google Fonts). Typed Fraunces is for headlines,
  never for the wordmark.
- Body: Inter.

## Colour
- Ink `#0F0D0A` (home ground) · Bone `#ECE7DD`
- Brass `#C6A15B` on dark grounds / `#96763A` on light grounds
- Dun `#97907F` (muted tags/eyebrows)

## Assets in this repo
Source SVGs (canonical copies live in `aios/outputs/darkhorse-brand/logo/`):
- `wordmark-{dark,light}.svg` — the logotype alone (dark = bone on dark grounds, light = ink on light grounds)
- `lockup-{dark,light}.svg` — piece + logotype
- `piece-classic-{dark,light}.svg` — the mark alone
- `piece-tile.svg` — mark on ink rounded square (favicon/avatar master)
- `piece-seal.svg` — encircled mark

Rendered PNGs:
- `../../favicon-256.png`, `../../apple-touch-icon.png`, `../../favicon.svg` — from piece-tile
- `../../og-image.png` (1200x630) — lockup on ink + tag line
- `banner-linkedin.png` (1584x396) — lockup on ink + USP line
- `profile-square.png` (1024) — piece-tile

## Regenerate
Open a render-*.html in Chrome headless with
`--force-device-scale-factor=2 --window-size=W,H --screenshot`, then `sips -z` to target size.
Never find-replace binaries; always re-render from the render-*.html sources.
