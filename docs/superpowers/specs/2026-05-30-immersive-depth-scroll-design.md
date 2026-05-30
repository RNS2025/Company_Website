# Immersive Depth-Scroll Homepage — Design Spec

_Date: 2026-05-30 · Status: approved (pending spec review)_

## Summary

Replace the RNS APPS marketing site with a single-page **"dolly-zoom" depth-scroll
experience**: scrolling dollies a virtual camera deeper through 8 glowing glass
"gate" portals floating in a starfield void. This is a faithful port of the Claude
Design handoff bundle (`8rx-dIPkn4CASMdZhuRFZQ`, "Immersive Depth Scroll") into the
existing Astro 6 + Tailwind codebase.

The 8 stations become the entire marketing site; the standalone marketing pages
(`om-os`, `kontakt`, `projekter`, `projekter/[slug]`) are retired. Legal/utility
pages remain.

## Goals

- Pixel-faithful recreation of the prototype's visual output and motion.
- Run natively in Astro: bundled CSS/JS, self-hosted fonts, project's icon system,
  no third-party CDNs.
- Preserve existing SEO infrastructure (meta, OG/Twitter, JSON-LD, analytics, sitemap).
- No broken links or orphaned routes after the marketing pages are retired.

## Non-Goals

- Porting the design-time **Tweaks panel** (`tweaks-app.jsx`, `tweaks-panel.jsx`).
  It is a React-via-CDN editing UI, not production code. The engine reads
  `window.RNS_CONFIG` and falls back to built-in defaults without it.
- Rebuilding the experience as decomposed Astro components / Tailwind utilities
  (approach explicitly chosen as "faithful port", not "rebuild in components").
- Redesigning the retained legal pages.

## Source bundle (reference)

Extracted to a working copy from the handoff tarball (`Website-handoff.tar.gz`):

- `website/project/index.html` — 8-station markup
- `website/project/styles.css` — bespoke design system (~14 KB)
- `website/project/app.js` — zoom engine + canvas warp-starfield (~8 KB)
- `website/project/assets/{logo,logo_small,smash_logo}.svg`
- `website/chats/chat1.md`, `website/project/scratchpad.md` — intent/context

### The 8 stations (Danish copy, from the bundle)

0. **Intro** — "Enkel Proces. / Effektive Applikationer." + 2 CTAs
1. **Studiet** — "Vi Forvandler Idéer Til Software." + 3 capability pills
2. **Leverer** — "Hvad Vi Leverer" — 5 service cards (Mobile Apps, Hjemmesider,
   Systemer & Data, Design, Support)
3. **Proces** — "Vores Proces" — 6 steps (01 Idé → 06 Samarbejde)
4. **Projekter** — "Udvalgte Projekter" — SMASH Klub-app (PWA) + SMASH Betalingssystem (iPad POS)
5. **Partnere** — "To Partnere. Én Passion." — Luu Ninh (LN) + Jens Olsen (JO)
6. **Løfte** — "Svar Inden for 24 Timer." — 3 value props
7. **Kontakt** — "Klar til at Starte Dit Næste Projekt?" + CTAs + contact@rnsapps.dk

### Brand tokens (from the design system)

- Background/void `#2A2A2A` / deeper `#1a1816`; gradient `#FF6941 → #F2865F` (135°),
  text-gradient adds `#FFB088`.
- Text `#EAE9E9` / `#fff` / slate scale; success `#4ade80`.
- Glass surfaces (translucent charcoal + orange-tinted borders), colored orange shadows/glow.
- Font: Saira (300–900). Radii 8/12/20/full. Easing `cubic-bezier(.16,1,.3,1)`.
- Gradient applied only to payoff words.

## Architecture

### Engine behavior (`app.js`, ported verbatim in logic)

- Camera `cur` lerps toward `target = scrollY / STATION` (STATION = `innerHeight * 1.25`),
  clamped `0..N-1`.
- Per layer `i`: `rel = cur - i`; `scale = 2^(rel * speed)`; opacity fades in approaching,
  holds when framed, fades out passing; blur grows with `|rel|`; `zIndex` grows with `rel`;
  `pointer-events` enabled only when framed.
- **Scroll-driven synchronous render** (correct even when rAF is throttled) plus an rAF
  lerp for smoothing, with a settle-snap after scrolling stops.
- Canvas warp-starfield: perspective-projected stars streak with camera velocity;
  DPR capped at 1.5; star count clamped 50–420.
- Depth-nav dots, bottom progress bar, intro-only scroll hint, `[data-goto]` anchors,
  brand→top, resize relayout.
- Config object `window.RNS_CONFIG` (speed, smooth, starDensity, glow, stars) with
  defaults — drives the experience with no Tweaks panel present.

### File changes

**New**
- `src/layouts/ImmersiveLayout.astro` — minimal layout for the home page. Keeps the
  full `<head>` (title, description, canonical, OG/Twitter, JSON-LD org schema,
  `Analytics`, theme-color, favicon) but **omits** `Header`, `Footer`, and
  `ClientRouter`. The page supplies its own fixed chrome (topbar, depth-nav, progress,
  credit). `<body>` background/text classes match the design void.
- `src/styles/immersive.css` — port of `styles.css`. Imported **only** by
  `index.astro` so its generic class names (`.card`, `.grid`, `.btn`, `.title`, …)
  don't leak site-wide. The Google-Fonts `@import` is removed in favor of
  `@fontsource/saira` weight imports.
- `public/logo.svg`, `public/logo_small.svg` — from the bundle (gradient RNS marks).
- Redirect stubs for retired URLs (see Routing).

**Rewritten**
- `src/pages/index.astro` — 8-station markup using `ImmersiveLayout`; imports
  `immersive.css`; contains the bundled engine `<script>`.

**Modified**
- `src/components/ui/Icon.astro` — extend `iconMap` with `mail`, `eye` (and any other
  station icons not already mapped). Used so the design's icons render as inline
  `lucide-astro` SVGs (with an `.ic` class for sizing) instead of CDN `data-lucide`.
- `src/components/Header.astro`, `src/components/Footer.astro` — trim links to the
  retired pages (om-os/kontakt/projekter); point logo/home to `/`, keep legal links.
  These are used only by the retained legal/utility pages.

**Deleted**
- `src/pages/om-os.astro`
- `src/pages/kontakt.astro`
- `src/pages/projekter.astro`
- `src/pages/projekter/[slug].astro` (and the empty `projekter/` dir)

**Retained (unchanged)**
- `src/layouts/Layout.astro` — still wraps the legal/utility pages (Header/Footer/ClientRouter).
- `src/pages/privatlivsvilkår.astro`
- `src/pages/data-sletning.astro`
- `src/pages/smash-padelcenter/data-sletning.astro`
- `src/pages/install.astro`

### Icons

Replace `<i data-lucide="x" class="ic">` with `<Icon name="x" class="ic" />`
(`lucide-astro`). The `.ic` class in `immersive.css` controls sizing (overriding
lucide's default size where needed). Removes the Lucide UMD CDN script and the
React/Babel CDN scripts that powered the Tweaks panel.

### Assets

- RNS marks: `public/logo.svg`, `public/logo_small.svg`; referenced as `/logo.svg` etc.
- SMASH project logo: use the **real** `src/assets/logos/smash.png` (project asset)
  rather than the bundle's text-placeholder `smash_logo.svg`, imported via Astro's
  asset pipeline. (Reversible — placeholder available if preferred.)
- Existing `public/logo.png` / `logo_small.png` remain for favicon/OG.

### Routing (retired URLs)

To avoid 404s on inbound links / search index for `/om-os`, `/kontakt`, `/projekter`
on static GitHub Pages, add lightweight redirect stubs to `/`. Implementation: Astro
page files that emit a `<meta http-equiv="refresh" content="0; url=/">` + canonical to
`/` (and `noindex`). This keeps the URLs alive while consolidating to the homepage.
(If undesired, drop the stubs and let them 404.)

## Accessibility & resilience

- Honor `prefers-reduced-motion` (already in the design CSS: disables ambient/hint
  animation). Engine still snaps to correct frames without rAF.
- Mobile/touch: design media query at ≤860px hides the depth-nav and stacks grids;
  scroll-driven engine responds to touch scroll.
- All 8 stations' text is present in the static HTML (crawlable). **Optional extra**
  (not blocking): a `<noscript>` stacked, statically-readable fallback, since with JS
  disabled the fixed layers overlap.

## Risks / trade-offs

- **SEO:** retired marketing URLs change to redirect stubs; some link equity may shift.
  Mitigated by stubs + the consolidated content living on `/`.
- **Performance:** continuous canvas + transformed glass panels are GPU-heavy; the
  prototype already mitigates (DPR cap, star clamp, no backdrop-filter on scaled gates,
  synchronous fallback). Verify on a mid-range device.
- **Class-name collisions:** mitigated by importing `immersive.css` only on the home page.

## Acceptance criteria

- `npm run build` succeeds; `npm run dev` serves `/` with the 8-station dolly-zoom and
  no console errors.
- Visual parity with the prototype across the 8 stations (chrome, gates, gradient,
  starfield, depth-nav, progress, scroll hint).
- Depth-nav, `[data-goto]` CTAs, and brand→top all navigate to the correct station.
- No CDN scripts; icons render via `lucide-astro`; fonts self-hosted.
- Retained legal/utility pages still render with working nav (no links to deleted pages).
- Old marketing URLs redirect to `/` (or cleanly 404 if stubs are dropped).
- Reduced-motion and ≤860px behaviors verified.

## Out of scope / follow-ups

- Wiring "Skriv Til Os" to the `Web3Forms` contact form instead of `mailto:`.
- Real partner photos / project screenshots.
- Removing now-orphaned components/data (`sections/*`, `data/*`) — optional later cleanup.
