---
name: Koma Flow
colors:
  surface: '#f6faf8'
  surface-dim: '#d6dbd9'
  surface-bright: '#f6faf8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f5f2'
  surface-container: '#eaefed'
  surface-container-high: '#e5e9e7'
  surface-container-highest: '#dfe3e1'
  on-surface: '#181d1c'
  on-surface-variant: '#404944'
  inverse-surface: '#2c3130'
  inverse-on-surface: '#edf2f0'
  outline: '#707974'
  outline-variant: '#bfc9c3'
  surface-tint: '#2b6955'
  primary: '#004635'
  on-primary: '#ffffff'
  primary-container: '#1e5e4b'
  on-primary-container: '#96d5bd'
  inverse-primary: '#94d3bb'
  secondary: '#a23f1a'
  on-secondary: '#ffffff'
  secondary-container: '#fd8358'
  on-secondary-container: '#6f2000'
  tertiary: '#004635'
  on-tertiary: '#ffffff'
  tertiary-container: '#006049'
  on-tertiary-container: '#8ad8ba'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b0f0d7'
  primary-fixed-dim: '#94d3bb'
  on-primary-fixed: '#002117'
  on-primary-fixed-variant: '#0a513e'
  secondary-fixed: '#ffdbcf'
  secondary-fixed-dim: '#ffb59c'
  on-secondary-fixed: '#390c00'
  on-secondary-fixed-variant: '#812803'
  tertiary-fixed: '#a3f2d4'
  tertiary-fixed-dim: '#88d6b8'
  on-tertiary-fixed: '#002117'
  on-tertiary-fixed-variant: '#00513d'
  background: '#f6faf8'
  on-background: '#181d1c'
  surface-variant: '#dfe3e1'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: '0'
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
    letterSpacing: 0.005em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: '0'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: '0'
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.02em
  notation-mono:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.06em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  space-2xs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
  gutter-mobile: 1rem
  board-padding: 0.5rem
---

## Brand & Style
This design system establishes a Japandi-infused, digital-craft aesthetic tailored for learning and mastering Shogi. It deliberately eschews the heavy, varnished-wood, calligraphic austerity of traditional tabletop apps in favor of light-drenched spaces, tactile architectural shapes, and mindful clarity. 

The emotional tone balances Zen focus with cheerful modern encouragement:
- **Craftsmanship meets Modernity**: Shogi’s timeless tactical depth presented through crisp geometry, airy proportions, and soft-touch physical metaphors.
- **Unintimidating Mastery**: Complex kanji and strategic branches are translated into accessible visual diagrams, friendly progress loops, and intuitive tactile interactions.
- **Organic Serenity**: Breathing space, organic green-slate undertones, and warm paper textures evoke a sunny study table crafted from birch and washi.

## Colors
The palette balances mindful organic greens with energetic persimmon accents over a clean, warm tactile canvas.

- **Primary (`#1E5E4B`) & Primary Accent (`#2D7D64`)**: Grounded Forest Mint and Fresh Sage symbolize calculated growth, focus, and strategic intent. Used for active navigation, key tactical controls, and success progress indicators.
- **Primary Subdued (`#E8F3EE`)**: Soft Tinted Mint for board tile selection, highlight rings, and low-contrast lesson chips.
- **Secondary (`#E06D44`)**: Terracotta Persimmon replaces harsh red with a warm, energetic vermilion note. Used for high-priority calls to action, solved checkmate pulses, and critical threat alerts.
- **Surfaces & Canvases**:
  - Main Background: `#FBFBFA` (Crisp warm paper washi tone).
  - Elevated Surfaces: `#FFFFFF` (Pure pristine white).
  - Subdued Layers & Trays: `#F4F1EA` (Light Birch Wood tone).
- **Ink & Neutral Roles**:
  - Ink High Contrast: `#1C2120` (Sumi Ink).
  - Ink Muted: `#5F6B66` (Slate Stone).
  - Ghost Hairlines: `#E7E5DF` (Soft warm tatami border).
- **Game Semantics**:
  - Promotion / Capture alert: `#D9483B`
  - Sente (Self) player accent: `#1E5E4B`
  - Gote (Opponent) player accent: `#6B7C75`

## Typography
Typography is built around **Plus Jakarta Sans**, offering geometric clarity combined with subtle humanist warmth that pairs naturally with Japanese glyphs (such as Noto Sans JP or Hiragino Sans when rendering kanji piece characters).

- **Headlines**: Weighted, balanced, and slightly tight in tracking to maintain a clean editorial feel.
- **Body & Explanations**: Generous line heights (`1.5x`) ensure complex tsume-shogi step rules and tactic breakdowns are effortlessly readable on small mobile screens.
- **Notation & Coordinates**: Board indices (1–9, 一–九, or a–i) use `notation-mono` with upper-range medium-to-bold weights and expanded letter spacing for instant at-a-glance scanning under time pressure.

## Layout & Spacing
The layout relies on a strict mobile-first fluid approach anchored by an 8pt architectural rhythm, with 4pt micro-steps for tight tile-and-grid alignments.

- **Mobile Viewports (< 640px)**: 16px lateral page margins. The 9x9 Shogi board spans the full width minus outer margins (or edge-to-edge with 8px board border gutters) to maximize piece tap targets.
- **Tablet & Landscape (640px – 1024px)**: Dual-pane layout. The 9x9 board anchors the primary left canvas within an aspect-ratio-locked square container, while puzzle logs, captured pieces (komadai), and tutor commentary occupy the right rail.
- **Vertical Hierarchy**: Generous whitespace between lesson sections (24–32px) counterweights the dense information density of the 81-square game board.

## Elevation & Depth
Elevation is realized through warm tactile layers and translucent depth rather than dark drop shadows:

- **Level 0 (Floor)**: `#FBFBFA` flat background canvas.
- **Level 1 (Subdued Platters & Board Mats)**: `#F4F1EA` surfaces framed with a 1px hairlike outline of `#E7E5DF`.
- **Level 2 (Active Cards & Floating Containers)**: `#FFFFFF` surfaces with an ambient, warm dual-shadow:
  - `box-shadow: 0 2px 4px rgba(28, 33, 32, 0.02), 0 8px 24px rgba(28, 33, 32, 0.05);`
- **Level 3 (Tactile Pieces / Koma)**: Soft 3D bevel illusion using multi-stop linear gradients, a subtle bottom lip shadow (`0 2px 0 #D5CFBF`), and soft elevation on drag (`box-shadow: 0 12px 24px rgba(30, 94, 75, 0.18)`).
- **Floating Nav / Sheet Overlays**: Frosted backdrop blur (`backdrop-filter: blur(16px)`) over an 85% opacity `#FFFFFF` fill with a crisp top border (`#E7E5DF`).

## Shapes
A roundedness tier of **2 (Rounded)** introduces approachable softness while honoring the clean geometric craftsmanship of woodcraft:

- Standard controls, cards, and modal sheets carry an 8px to 16px radius (`rounded-lg` / `rounded-xl`).
- Micro elements like badges, turn indicators, and notation pills utilize soft organic pills.
- **The Koma (Piece) Shape**: An abstracted pentagonal cut with subtly softened vertices (1.5px radius) that preserves the iconic pointed Shogi shape while feeling smooth and digital-native.

## Components

### 1. The Shogi Board (9x9) & Grid Cells
- **Container**: Rounded birch wood canvas (`#F4F1EA`) framed in 1px `#E7E5DF`, corner radius 16px.
- **Grid Lines**: Thin, 1px `#DCD7CA` hairlines. Four star-point dots (hoshi) styled as 4px rounded dots in `#5F6B66`.
- **Cell States**:
  - *Default*: Transparent cell over birch tone.
  - *Selected Source*: `#E8F3EE` with a 2px inner border of `#1E5E4B`.
  - *Valid Move Target*: 8px soft mint dot (`#2D7D64` at 40% opacity) centered in the target cell; if target holds opponent piece, a subtle 2px rounded highlight frame in `#E06D44`.
  - *Last Move*: Gentle tinted wash of `#F0EFE6`.

### 2. Koma (Pieces)
- **Palette**: Ivory base (`#FCFCFA`) with sumi ink lettering (`#1C2120`) for unpromoted pieces. Promoted pieces shift character glyphs to vivid cinnabar coral (`#D9483B`).
- **Typography/Iconography**: Clean, modern semi-calligraphic kanji (single-kanji modern notation for clarity) paired with miniature directional movement arrows for beginners.
- **Tactile Drag State**: Scaling to 108%, ambient lift shadow, and gentle vibration haptic feedback.

### 3. Captured Piece Stand (Komadai)
- Styled as shallow rounded trays (`#F4F1EA`) above and below the board.
- Stacked counter badge: Small circular pill (`#1E5E4B` fill, `#FFFFFF` text) marking piece counts (e.g., "x2").

### 4. Buttons & CTAs
- **Primary CTA**: Terracotta (`#E06D44`) background, pure white bold text, 12px border radius, subtle warm glow on press.
- **Secondary / Action**: Deep Sage (`#1E5E4B`) or Mint Tint (`#E8F3EE` with `#1E5E4B` text).
- **Tertiary / Utility**: Ghost button with 1px border `#E7E5DF` and `#1C2120` sumi text.

### 5. Lesson & Puzzle Cards
- White surface (`#FFFFFF`) with 16px radius and Level 2 elevation.
- Contains difficulty rank (e.g., "1-Move Tsume", "Beginner 7-Kyu") as a pill tag (`#E8F3EE` / `#1E5E4B`).
- Mini preview board rendered at reduced scale with prominent progress circle (svg stroke using `#2D7D64`).

### 6. Interactive Floating Bottom Dock
- Floating pill-island pinned 16px above screen bottom.
- Background: 90% translucent white with 20px blur, rounded 32px, bordered by 1px `#E7E5DF`.
- Icon items feature subtle vertical movement indicators and gentle mint dot markers for active sections.