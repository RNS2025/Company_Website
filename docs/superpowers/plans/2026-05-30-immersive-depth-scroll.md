# Immersive Depth-Scroll Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the RNS APPS marketing site with a single-page "dolly-zoom" depth-scroll experience (8 glass-portal stations in a starfield void), faithfully ported from the Claude Design handoff into the Astro 6 + Tailwind codebase.

**Architecture:** A dedicated minimal layout (`ImmersiveLayout.astro`) supplies the full SEO `<head>` but omits the standard Header/Footer/ClientRouter; `index.astro` renders the 8 stations and imports the ported design-system CSS + the canvas/zoom engine as a bundled client module. Standalone marketing pages are retired and their URLs redirected to `/`.

**Tech Stack:** Astro 6, Tailwind 3, `@fontsource/saira`, `lucide-astro`. No third-party CDN scripts; no React Tweaks panel.

**Spec:** `docs/superpowers/specs/2026-05-30-immersive-depth-scroll-design.md`

**Branch:** `feature/immersive-depth-scroll` (already created; spec already committed).

**Verification approach:** This project has **no unit-test runner** (package.json scripts are `dev`/`build`/`preview`/`deploy`). Forcing a test framework is out of scope (YAGNI). Each task is therefore verified by: (a) `npm run build` succeeding, (b) targeted `grep` assertions on the produced files, and (c) `npm run dev` visual review against the prototype. Treat the grep/build checks as the automated gate and the visual review as the acceptance gate.

---

## File Structure

| File | Responsibility | Action |
|------|----------------|--------|
| `src/layouts/ImmersiveLayout.astro` | Minimal HTML shell + full SEO head for the home page (no Header/Footer/ClientRouter) | Create |
| `src/styles/immersive.css` | Ported design-system CSS (brand tokens, gates, chrome, grids) | Create (cp + edit) |
| `src/scripts/immersive-engine.js` | Canvas warp-starfield + dolly-zoom camera engine | Create (cp verbatim) |
| `src/pages/index.astro` | The 8-station markup; wires layout + css + engine + icons | Rewrite |
| `src/components/ui/Icon.astro` | lucide-astro wrapper; add `mail`, `eye` | Modify |
| `public/logo.svg`, `public/logo_small.svg` | RNS gradient marks used by the topbar/brand | Create (cp) |
| `astro.config.mjs` | Add static redirects for retired URLs | Modify |
| `src/components/Header.astro`, `src/components/Footer.astro` | Trim links to deleted pages | Modify |
| `src/pages/om-os.astro`, `kontakt.astro`, `projekter.astro`, `projekter/[slug].astro` | Retired marketing pages | Delete |

Retained unchanged: `src/layouts/Layout.astro` (wraps legal pages), `privatlivsvilkår.astro`, `data-sletning.astro`, `smash-padelcenter/data-sletning.astro`, `install.astro`.

---

## Task 1: Stage the handoff bundle & confirm toolchain

**Files:** none in repo (works in `/tmp`).

- [ ] **Step 1: Ensure dependencies are installed**

Run:
```bash
cd /home/jeols/repos/Company_Website
[ -d node_modules ] || npm install
```
Expected: `node_modules` exists (no error).

- [ ] **Step 2: Fetch and extract the design bundle**

Run:
```bash
rm -rf /tmp/rns-handoff && mkdir -p /tmp/rns-handoff
curl -sSL "https://api.anthropic.com/v1/design/h/8rx-dIPkn4CASMdZhuRFZQ" -o /tmp/rns-handoff/handoff.tar.gz
tar xzf /tmp/rns-handoff/handoff.tar.gz -C /tmp/rns-handoff
ls /tmp/rns-handoff/website/project/
```
Expected output includes: `app.js  assets  index.html  styles.css` (plus scratchpad/tweaks files we will ignore).

- [ ] **Step 3: Sanity-check the source files are the expected ones**

Run:
```bash
grep -c "RNS APPS — zoom engine" /tmp/rns-handoff/website/project/app.js
grep -c "RNS APPS — 3D Zoom-Scroll Site" /tmp/rns-handoff/website/project/styles.css
```
Expected: `1` and `1`.

No commit (staging only).

---

## Task 2: Copy logo assets into `public/`

**Files:**
- Create: `public/logo.svg`, `public/logo_small.svg`

- [ ] **Step 1: Copy the RNS gradient marks**

Run:
```bash
cp /tmp/rns-handoff/website/project/assets/logo.svg public/logo.svg
cp /tmp/rns-handoff/website/project/assets/logo_small.svg public/logo_small.svg
```

- [ ] **Step 2: Verify they exist and are SVG**

Run:
```bash
head -1 public/logo.svg public/logo_small.svg
```
Expected: each begins with `<svg xmlns="http://www.w3.org/2000/svg" ...`.

- [ ] **Step 3: Commit**

```bash
git add public/logo.svg public/logo_small.svg
git commit -m "feat: add RNS gradient logo SVGs for immersive homepage"
```

---

## Task 3: Create `src/styles/immersive.css`

**Files:**
- Create: `src/styles/immersive.css`

- [ ] **Step 1: Copy the design-system CSS into the project**

Run:
```bash
cp /tmp/rns-handoff/website/project/styles.css src/styles/immersive.css
```

- [ ] **Step 2: Remove the Google Fonts `@import` (fonts are self-hosted via @fontsource)**

Run:
```bash
sed -i "/fonts.googleapis.com/d" src/styles/immersive.css
```

- [ ] **Step 3: Verify the @import is gone and tokens remain**

Run:
```bash
grep -c "fonts.googleapis.com" src/styles/immersive.css   # expect 0
grep -c -- "--primary-500:#FF6941" src/styles/immersive.css # expect 1
```
Expected: `0` then `1`.

- [ ] **Step 4: Append the accent-icon helper class**

Append this to the end of `src/styles/immersive.css` (needed so the three capability-pill icons in station 1 stay orange instead of the pill's default green check color):

```css

/* accent-colored inline icon (overrides .pill .ic green default) */
.ic--accent{color:var(--primary-500);}
.pill .ic--accent{color:var(--primary-500);}
```

- [ ] **Step 5: Commit**

```bash
git add src/styles/immersive.css
git commit -m "feat: port immersive design-system stylesheet"
```

---

## Task 4: Create `src/scripts/immersive-engine.js`

**Files:**
- Create: `src/scripts/immersive-engine.js`

- [ ] **Step 1: Copy the engine verbatim**

Run:
```bash
mkdir -p src/scripts
cp /tmp/rns-handoff/website/project/app.js src/scripts/immersive-engine.js
```

- [ ] **Step 2: Verify key behaviors are present**

Run:
```bash
grep -c "window.RNS_CONFIG" src/scripts/immersive-engine.js   # expect >=1
grep -c "data-goto" src/scripts/immersive-engine.js           # expect >=1
grep -c "requestAnimationFrame" src/scripts/immersive-engine.js # expect >=1
```
Expected: each `>= 1` (non-zero).

- [ ] **Step 3: Commit**

```bash
git add src/scripts/immersive-engine.js
git commit -m "feat: port dolly-zoom + starfield engine"
```

---

## Task 5: Extend `Icon.astro` with `mail` and `eye`

**Files:**
- Modify: `src/components/ui/Icon.astro`

- [ ] **Step 1: Add the two missing entries to `iconMap`**

In `src/components/ui/Icon.astro`, find the line:
```js
    'star': 'Star'
```
Replace it with:
```js
    'star': 'Star',
    'mail': 'Mail',
    'eye': 'Eye'
```

- [ ] **Step 2: Verify**

Run:
```bash
grep -c "'mail': 'Mail'" src/components/ui/Icon.astro   # expect 1
grep -c "'eye': 'Eye'" src/components/ui/Icon.astro      # expect 1
```
Expected: `1` and `1`.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/Icon.astro
git commit -m "feat: map mail and eye lucide icons"
```

---

## Task 6: Create `src/layouts/ImmersiveLayout.astro`

**Files:**
- Create: `src/layouts/ImmersiveLayout.astro`

- [ ] **Step 1: Create the file with this exact content**

```astro
---
import Analytics from "../components/analytics.astro";
import "@fontsource/saira/300.css";
import "@fontsource/saira/400.css";
import "@fontsource/saira/500.css";
import "@fontsource/saira/600.css";
import "@fontsource/saira/700.css";
import "@fontsource/saira/800.css";
import "@fontsource/saira/900.css";

interface Props {
  title: string;
  description?: string;
  image?: string;
}

const {
  title,
  description = "Skræddersyede webløsninger, mobile apps og systemer bygget med moderne teknologier og ren kode.",
  image = "/logo.png",
} = Astro.props;

const canonicalURL = new URL(Astro.url.pathname, Astro.site);
const socialImage = new URL(image, Astro.site);

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "RNS APPS",
  url: "https://www.rns-apps.dk",
  logo: "https://www.rns-apps.dk/logo.png",
  description:
    "Professionel softwareudvikling - skræddersyede webløsninger, mobile apps og systemer",
  founder: [
    { "@type": "Person", name: "Luu Ninh" },
    { "@type": "Person", name: "Jens Olsen" },
  ],
  sameAs: [
    "https://www.linkedin.com/in/luu-ninh-669851307/",
    "https://www.linkedin.com/in/jens-olsen-19b2aa222/",
  ],
};
---

<!doctype html>
<html lang="da">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="generator" content={Astro.generator} />

    <title>{title} | RNS APPS</title>
    <meta name="title" content={`${title} | RNS APPS`} />
    <meta name="description" content={description} />

    <link rel="canonical" href={canonicalURL} />

    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonicalURL} />
    <meta property="og:title" content={`${title} | RNS APPS`} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={socialImage} />
    <meta property="og:site_name" content="RNS APPS" />
    <meta property="og:locale" content="da_DK" />

    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content={canonicalURL} />
    <meta property="twitter:title" content={`${title} | RNS APPS`} />
    <meta property="twitter:description" content={description} />
    <meta property="twitter:image" content={socialImage} />

    <link rel="icon" type="image/png" href="/logo_small.png" />
    <link rel="apple-touch-icon" href="/logo.png" />
    <meta name="theme-color" content="#2A2A2A" />

    <script type="application/ld+json" set:html={JSON.stringify(organizationSchema)} />

    <Analytics />

    <link rel="preload" href="/logo.svg" as="image" />
  </head>
  <body>
    <slot />
  </body>
</html>
```

- [ ] **Step 2: Verify it omits Header/Footer/ClientRouter (intentional)**

Run:
```bash
grep -Ec "Header|Footer|ClientRouter" src/layouts/ImmersiveLayout.astro
```
Expected: `0`.

- [ ] **Step 3: Commit**

```bash
git add src/layouts/ImmersiveLayout.astro
git commit -m "feat: add minimal ImmersiveLayout for the homepage"
```

---

## Task 7: Rewrite `src/pages/index.astro` (the 8 stations)

**Files:**
- Rewrite: `src/pages/index.astro`

This is a faithful port of the prototype `index.html` `<body>`, with three substitutions vs. the prototype: (1) `<i data-lucide="X" class="ic">` → `<Icon name="X" class="ic" />`; (2) logo/asset `src` paths point at `/logo.svg` and the real SMASH image; (3) all CDN `<script>` tags and the Tweaks panel mounts are dropped in favor of the bundled engine import.

- [ ] **Step 1: Replace the entire file with this exact content**

```astro
---
import ImmersiveLayout from "../layouts/ImmersiveLayout.astro";
import Icon from "../components/ui/Icon.astro";
import smashLogo from "../assets/logos/smash.png";
import "../styles/immersive.css";
---

<ImmersiveLayout
  title="Forside"
  description="Skræddersyede webløsninger, mobile apps og systemer bygget med moderne teknologier og ren kode."
>
  <!-- travel void -->
  <div class="void"></div>
  <canvas id="stars"></canvas>
  <div class="ambient"></div>

  <!-- fixed chrome -->
  <header class="topbar">
    <button class="brand" aria-label="Til toppen">
      <img src="/logo.svg" alt="RNS APPS" />
      <span class="brand__txt"><b>RNS APPS</b><span>Software Studie</span></span>
    </button>
    <div class="topbar__r">
      <a class="topbar__mail" href="mailto:contact@rnsapps.dk"><Icon name="mail" class="ic" /><span>contact@rnsapps.dk</span></a>
      <a class="btn btn--primary" href="#" data-goto="7" style="padding:11px 24px;font-size:var(--t-small)"><Icon name="message-circle" class="ic" />Start Et Projekt</a>
    </div>
  </header>

  <nav class="depthnav" aria-label="Sektioner">
    <button class="dnav" aria-label="Intro"><span class="dnav__lbl">Intro</span><span class="dnav__dot"></span></button>
    <button class="dnav" aria-label="Studiet"><span class="dnav__lbl">Studiet</span><span class="dnav__dot"></span></button>
    <button class="dnav" aria-label="Leverer"><span class="dnav__lbl">Leverer</span><span class="dnav__dot"></span></button>
    <button class="dnav" aria-label="Proces"><span class="dnav__lbl">Proces</span><span class="dnav__dot"></span></button>
    <button class="dnav" aria-label="Projekter"><span class="dnav__lbl">Projekter</span><span class="dnav__dot"></span></button>
    <button class="dnav" aria-label="Partnere"><span class="dnav__lbl">Partnere</span><span class="dnav__dot"></span></button>
    <button class="dnav" aria-label="Løfte"><span class="dnav__lbl">Løfte</span><span class="dnav__dot"></span></button>
    <button class="dnav" aria-label="Kontakt"><span class="dnav__lbl">Kontakt</span><span class="dnav__dot"></span></button>
  </nav>

  <div class="progress"></div>
  <div class="credit">© 2026 RNS-Apps ApS · Danmark</div>

  <div class="scrollhint">
    <span>Scroll for at dykke ned</span>
    <Icon name="chevron-down" class="ic" />
  </div>

  <!-- ============ THE TRAVEL SCENE ============ -->
  <div class="scene">
    <!-- 0 — INTRO -->
    <section class="layer" data-screen-label="Intro">
      <div class="gate center" style="max-width:min(980px,90vw)">
        <span class="gate__bar"></span>
        <span class="eyebrow" style="justify-content:center">RNS APPS · Danmark</span>
        <h1 class="display">Enkel Proces.<br /><span class="grad">Effektive Applikationer.</span></h1>
        <p class="lead measure" style="margin:clamp(20px,2.2vw,30px) auto 0">Skræddersyede webløsninger, mobile apps og systemer bygget med moderne teknologier og ren kode.</p>
        <div class="cta-row" style="justify-content:center;margin-top:clamp(26px,3vw,40px)">
          <a class="btn btn--primary" href="#" data-goto="4"><Icon name="eye" class="ic" />Se Vores Arbejde</a>
          <a class="btn btn--outline" href="#" data-goto="7"><Icon name="message-circle" class="ic" />Start Et Projekt</a>
        </div>
      </div>
    </section>

    <!-- 1 — MISSION -->
    <section class="layer" data-screen-label="Studiet">
      <div class="gate" style="max-width:min(980px,90vw)">
        <span class="gate__bar"></span>
        <span class="eyebrow">Studiet</span>
        <h2 class="title">Vi Forvandler Idéer<br />Til <span class="grad">Software.</span></h2>
        <p class="lead measure" style="margin-top:clamp(20px,2vw,28px)">Et lille dansk studie drevet af to partnere. Vi bygger skræddersyede web- og mobilløsninger med moderne teknologi, ren kode og en proces, der er nem at være kunde i.</p>
        <div class="cta-row" style="margin-top:clamp(24px,2.4vw,34px)">
          <span class="pill"><Icon name="globe" class="ic ic--accent" />Webløsninger</span>
          <span class="pill"><Icon name="smartphone" class="ic ic--accent" />Mobile Apps</span>
          <span class="pill"><Icon name="database" class="ic ic--accent" />Systemer & Integrationer</span>
        </div>
      </div>
    </section>

    <!-- 2 — LEVERER -->
    <section class="layer" data-screen-label="Leverer">
      <div class="gate">
        <span class="gate__bar"></span>
        <div class="center" style="margin-bottom:clamp(26px,2.6vw,38px)">
          <span class="eyebrow" style="justify-content:center">Ydelser</span>
          <h2 class="h2">Hvad Vi <span class="grad">Leverer</span></h2>
          <p class="lead" style="margin-top:12px">Komplet softwareudvikling — fra idé til lancering og videre.</p>
        </div>
        <div class="grid grid-5">
          <div class="card svc"><div class="tile"><Icon name="smartphone" class="ic" /></div><h3 class="h3">Mobile Apps</h3><p class="body">Apps til telefon og tablet — på både iPhone og Android.</p></div>
          <div class="card svc"><div class="tile"><Icon name="globe" class="ic" /></div><h3 class="h3">Hjemmesider</h3><p class="body">Hurtige, flotte sites der ser godt ud på alle skærme.</p></div>
          <div class="card svc"><div class="tile"><Icon name="database" class="ic" /></div><h3 class="h3">Systemer & Data</h3><p class="body">Kraftfulde systemer der håndterer dine data sikkert.</p></div>
          <div class="card svc"><div class="tile"><Icon name="palette" class="ic" /></div><h3 class="h3">Design</h3><p class="body">Brugervenligt design tilpasset dit brand.</p></div>
          <div class="card svc"><div class="tile"><Icon name="shield" class="ic" /></div><h3 class="h3">Support</h3><p class="body">Opdateringer, fejlrettelser og nye features.</p></div>
        </div>
      </div>
    </section>

    <!-- 3 — PROCES -->
    <section class="layer" data-screen-label="Proces">
      <div class="gate">
        <span class="gate__bar"></span>
        <div class="center" style="margin-bottom:clamp(26px,2.6vw,38px)">
          <span class="eyebrow" style="justify-content:center">Sådan Arbejder Vi</span>
          <h2 class="h2">Vores <span class="grad">Proces</span></h2>
          <p class="lead" style="margin-top:12px">Fra første tanke til færdigt resultat — vi holder dig i hånden hele vejen.</p>
        </div>
        <div class="grid grid-3">
          <div class="card step"><div class="between"><span class="step__n">01</span><span class="step__tile"><Icon name="lightbulb" class="ic" /></span></div><div class="step__t">Idé & Planlægning</div><div class="step__d">Vi lytter, kortlægger dine ønsker og lægger en klar plan.</div></div>
          <div class="card step"><div class="between"><span class="step__n">02</span><span class="step__tile"><Icon name="pencil" class="ic" /></span></div><div class="step__t">Design</div><div class="step__d">Vi tegner løsningen — flot at se på og nem at bruge.</div></div>
          <div class="card step"><div class="between"><span class="step__n">03</span><span class="step__tile"><Icon name="code" class="ic" /></span></div><div class="step__t">Opbygning</div><div class="step__d">Vi bygger teknikken: hurtig, sikker og fremtidssikret.</div></div>
          <div class="card step"><div class="between"><span class="step__n">04</span><span class="step__tile"><Icon name="test-tube" class="ic" /></span></div><div class="step__t">Kvalitetstjek</div><div class="step__d">Vi tester alt grundigt for fejl og topper hastigheden.</div></div>
          <div class="card step"><div class="between"><span class="step__n">05</span><span class="step__tile"><Icon name="rocket" class="ic" /></span></div><div class="step__t">Lancering</div><div class="step__d">Vi går live og sørger for en sikker opsætning af drift.</div></div>
          <div class="card step"><div class="between"><span class="step__n">06</span><span class="step__tile"><Icon name="trending-up" class="ic" /></span></div><div class="step__t">Samarbejde</div><div class="step__d">Vi hjælper videre med opdateringer og nye funktioner.</div></div>
        </div>
      </div>
    </section>

    <!-- 4 — PROJEKTER -->
    <section class="layer" data-screen-label="Projekter">
      <div class="gate">
        <span class="gate__bar"></span>
        <div class="center" style="margin-bottom:clamp(24px,2.4vw,34px)">
          <span class="eyebrow" style="justify-content:center">Udvalgt Arbejde</span>
          <h2 class="h2">Udvalgte <span class="grad">Projekter</span></h2>
        </div>
        <div class="grid grid-2">
          <div class="card proj">
            <div class="proj__top">
              <div class="proj__logo"><img src={smashLogo.src} alt="SMASH" /></div>
              <div><div class="proj__tag">PWA · Klub-app</div><h3 class="h3">SMASH Padelcenter — Klub-app</h3></div>
            </div>
            <p class="body">En progressiv web-app til medlemmer: booking, hold og klubliv samlet ét sted — installerbar direkte fra browseren.</p>
            <div class="proj__feat"><span class="pill"><Icon name="check" class="ic" />Offline-klar</span><span class="pill"><Icon name="check" class="ic" />Booking</span><span class="pill"><Icon name="check" class="ic" />Realtid</span></div>
          </div>
          <div class="card proj">
            <div class="proj__top">
              <div class="proj__logo"><img src={smashLogo.src} alt="SMASH" /></div>
              <div><div class="proj__tag">iPad · POS</div><h3 class="h3">SMASH Betalingssystem</h3></div>
            </div>
            <p class="body">Et betalingssystem til iPad i centret. Hurtigt kassesalg med integreret betaling og reduceret ventetid for gæsterne.</p>
            <div class="proj__feat"><span class="pill"><Icon name="check" class="ic" />Betalingsintegration</span><span class="pill"><Icon name="check" class="ic" />Hurtigt salg</span><span class="pill"><Icon name="check" class="ic" />iPad POS</span></div>
          </div>
        </div>
      </div>
    </section>

    <!-- 5 — PARTNERE -->
    <section class="layer" data-screen-label="Partnere">
      <div class="gate">
        <span class="gate__bar"></span>
        <div class="center" style="margin-bottom:clamp(24px,2.4vw,34px)">
          <span class="eyebrow" style="justify-content:center">Holdet</span>
          <h2 class="h2">To Partnere. <span class="grad">Én Passion.</span></h2>
          <p class="lead" style="margin-top:12px">Du taler altid direkte med dem, der bygger din løsning.</p>
        </div>
        <div class="grid grid-2">
          <div class="card partner">
            <div class="mono">LN</div>
            <div class="stack-sm">
              <div><div class="partner__role">Partner · Udvikling</div><div class="partner__name">Luu Ninh</div></div>
              <p class="body">Bygger robuste web- og systemløsninger med fokus på ren kode og pålidelig drift.</p>
            </div>
          </div>
          <div class="card partner">
            <div class="mono">JO</div>
            <div class="stack-sm">
              <div><div class="partner__role">Partner · Udvikling & Design</div><div class="partner__name">Jens Olsen</div></div>
              <p class="body">Forener brugervenligt design med solid teknik, så løsningen både er flot og virker.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 6 — LØFTE -->
    <section class="layer" data-screen-label="Løfte">
      <div class="gate center" style="max-width:min(960px,90vw)">
        <span class="gate__bar"></span>
        <span class="eyebrow" style="justify-content:center">Vores Løfte</span>
        <h2 class="title">Svar Inden for<br /><span class="grad">24 Timer.</span></h2>
        <p class="lead measure" style="margin:clamp(18px,2vw,26px) auto 0">Et lille studie med stor omhu. Ingen lange ventetider, ingen mellemled — bare en fast kontaktperson og kode du kan stole på.</p>
        <div class="grid grid-3" style="margin-top:clamp(26px,2.8vw,38px);text-align:left">
          <div class="card svc"><div class="tile"><Icon name="zap" class="ic" /></div><h3 class="h3">Hurtigt Svar</h3><p class="body">Vi vender normalt tilbage inden for et døgn.</p></div>
          <div class="card svc"><div class="tile"><Icon name="shield" class="ic" /></div><h3 class="h3">Ren & Sikker Kode</h3><p class="body">Moderne teknologi, bygget til at holde.</p></div>
          <div class="card svc"><div class="tile"><Icon name="users" class="ic" /></div><h3 class="h3">Fast Kontaktperson</h3><p class="body">Du taler altid med dem, der bygger løsningen.</p></div>
        </div>
      </div>
    </section>

    <!-- 7 — KONTAKT -->
    <section class="layer" data-screen-label="Kontakt">
      <div class="gate center" style="max-width:min(900px,90vw)">
        <span class="gate__bar"></span>
        <span class="eyebrow" style="justify-content:center">Kontakt</span>
        <h2 class="title">Klar til at Starte<br /><span class="grad">Dit Næste Projekt?</span></h2>
        <p class="lead measure" style="margin:clamp(18px,2vw,26px) auto 0">Fortæl os om din idé, og lad os sammen skabe noget fantastisk. Vi svarer normalt inden for 24 timer.</p>
        <div class="cta-row" style="justify-content:center;margin-top:clamp(26px,3vw,38px)">
          <a class="btn btn--primary" href="mailto:contact@rnsapps.dk"><Icon name="send" class="ic" />Skriv Til Os</a>
          <a class="btn btn--outline" href="#" data-goto="2"><Icon name="arrow-right" class="ic" />Se Hvad Vi Laver</a>
        </div>
        <a class="topbar__mail" href="mailto:contact@rnsapps.dk" style="justify-content:center;margin-top:24px;font-size:var(--t-body)"><Icon name="mail" class="ic" />contact@rnsapps.dk</a>
      </div>
    </section>
  </div>

  <!-- scroll length -->
  <div id="spacer"></div>

  <script>
    import "../scripts/immersive-engine.js";
  </script>
</ImmersiveLayout>
```

- [ ] **Step 2: Verify the page has 8 stations, no CDN scripts, and no leftover `data-lucide`**

Run:
```bash
grep -c 'class="layer"' src/pages/index.astro     # expect 8
grep -c "data-lucide" src/pages/index.astro        # expect 0
grep -c "unpkg.com" src/pages/index.astro          # expect 0
grep -c "tweaks" src/pages/index.astro             # expect 0
grep -c 'import "../scripts/immersive-engine.js"' src/pages/index.astro  # expect 1
```
Expected: `8`, `0`, `0`, `0`, `1`.

- [ ] **Step 3: Build the site**

Run: `npm run build`
Expected: build completes with `Complete!` / no errors; `dist/index.html` is produced. If the build complains that `src/assets/logos/smash.png` is missing, confirm the path with `ls src/assets/logos/` and adjust the import in step 1 to the actual filename.

- [ ] **Step 4: Verify station content survived into the built HTML**

Run:
```bash
grep -c "Effektive Applikationer" dist/index.html   # expect >=1
grep -c "Udvalgte" dist/index.html                   # expect >=1
grep -c "24 Timer" dist/index.html                   # expect >=1
```
Expected: each `>= 1`.

- [ ] **Step 5: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: rebuild homepage as immersive depth-scroll experience"
```

---

## Task 8: Retire marketing pages & add redirects

**Files:**
- Delete: `src/pages/om-os.astro`, `src/pages/kontakt.astro`, `src/pages/projekter.astro`, `src/pages/projekter/[slug].astro`
- Modify: `astro.config.mjs`

- [ ] **Step 1: Delete the standalone marketing pages**

Run:
```bash
git rm src/pages/om-os.astro src/pages/kontakt.astro src/pages/projekter.astro "src/pages/projekter/[slug].astro"
rmdir src/pages/projekter 2>/dev/null || true
```

- [ ] **Step 2: Add static redirects to `astro.config.mjs`**

In `astro.config.mjs`, find:
```js
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
});
```
Replace it with:
```js
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
  redirects: {
    "/om-os/": "/",
    "/kontakt/": "/",
    "/projekter/": "/",
  },
});
```

(Note: old per-project URLs like `/projekter/<slug>/` are intentionally dropped and will 404; only the section indexes are redirected, per spec.)

- [ ] **Step 3: Rebuild and verify the redirects are emitted and the pages are gone**

Run:
```bash
npm run build
ls dist/om-os/index.html dist/kontakt/index.html dist/projekter/index.html
grep -l 'http-equiv="refresh"' dist/om-os/index.html dist/kontakt/index.html dist/projekter/index.html
```
Expected: the three `index.html` files exist and each contains a `refresh` meta pointing at `/`. (Astro generates redirect HTML for static `redirects`.)

- [ ] **Step 4: Commit**

```bash
git add astro.config.mjs
git commit -m "feat: retire marketing pages, redirect old URLs to home"
```

---

## Task 9: Trim dead links from Header & Footer

**Files:**
- Modify: `src/components/Header.astro`, `src/components/Footer.astro`

These components are now used only by the retained legal/utility pages (`privatlivsvilkår`, `data-sletning`, `install`, `smash-padelcenter/data-sletning`). They must not link to the deleted routes.

- [ ] **Step 1: Locate the dead links**

Run:
```bash
grep -n "om-os\|/kontakt\|/projekter" src/components/Header.astro src/components/Footer.astro
```
Expected: a list of `<a href="/om-os/">`, `/kontakt/`, `/projekter/` (and possibly `/projekter/<slug>/`) anchor/nav entries with their line numbers.

- [ ] **Step 2: Edit Header.astro**

For each navigation entry found in `src/components/Header.astro` that links to `/om-os/`, `/kontakt/`, or `/projekter/` (including the mobile-menu duplicate, if present): **remove that entire nav `<a>`/`<li>` item.** Keep the brand/logo link (ensure it points to `/`) and any link to `/privatlivsvilkår/`. Do not remove surrounding structural markup (the `<nav>`, list container, hamburger toggle).

- [ ] **Step 3: Edit Footer.astro**

Apply the same removal in `src/components/Footer.astro`: delete the `<a>` items pointing to `/om-os/`, `/kontakt/`, `/projekter/`. Keep the contact email (`mailto:contact@rnsapps.dk`), the `/privatlivsvilkår/` link, the home (`/`) link, and the copyright line.

- [ ] **Step 4: Verify no dead links remain**

Run:
```bash
grep -c "om-os\|/kontakt\|/projekter" src/components/Header.astro src/components/Footer.astro
```
Expected: `0` for both files (format `path:0`).

- [ ] **Step 5: Rebuild to confirm legal pages still compile**

Run: `npm run build`
Expected: build succeeds with no errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/Header.astro src/components/Footer.astro
git commit -m "fix: remove nav links to retired marketing pages"
```

---

## Task 10: Full-site verification & visual review

**Files:** none (verification only).

- [ ] **Step 1: Clean build**

Run: `rm -rf dist && npm run build`
Expected: succeeds; `dist/index.html`, the three redirect pages, and the retained legal pages all present:
```bash
ls dist/index.html dist/privatlivsvilkår/index.html dist/data-sletning/index.html dist/install/index.html
```

- [ ] **Step 2: No stray CDN / React / Tweaks references in the built homepage**

Run:
```bash
grep -Ec "unpkg.com|babel|react-dom|tweaks" dist/index.html
```
Expected: `0`.

- [ ] **Step 3: Start the dev server and visually review**

Run: `npm run dev` (then open the printed localhost URL).
Confirm against the prototype:
- Intro station renders centered with the orange-gradient "Effektive Applikationer." and a visible starfield + ambient glow.
- Scrolling dollies the camera through each gate; the next station grows from the distance and blurs in/out.
- Right-side depth-nav dots highlight the active station and jump on click; bottom progress bar fills; the "Scroll for at dykke ned" hint hides after the intro.
- Both CTAs (`data-goto`) and the brand→top click navigate correctly.
- All icons render (mail, eye, service tiles, process steps, check pills, send/arrow); station-1 capability pills are orange, project check pills are green.
- ≤860px: depth-nav hidden, grids stack, partner cards center.
- With `prefers-reduced-motion` enabled, the ambient/hint animation stops and stations still settle correctly.
- Visit `/privatlivsvilkår/` and confirm the header/footer render with no broken links.

- [ ] **Step 4: Final cleanup commit (if any tweaks were needed during review)**

```bash
git add -A
git commit -m "chore: immersive homepage visual-review fixes" || echo "nothing to commit"
```

---

## Self-Review (completed by plan author)

**Spec coverage:**
- Faithful port of index.html/styles.css/app.js → Tasks 3, 4, 7. ✓
- ImmersiveLayout (head SEO, no Header/Footer/ClientRouter) → Task 6. ✓
- Exclude Tweaks panel / no CDN → Tasks 4, 7 (engine import only), verified Tasks 7/10. ✓
- lucide-astro icons + `.ic` sizing + `mail`/`eye` → Tasks 5, 7. ✓
- Self-hosted Saira 300–900 → Task 6. ✓
- Assets (logo SVGs, real SMASH logo) → Tasks 2, 7. ✓
- Retire om-os/kontakt/projekter/[slug] → Task 8. ✓
- Redirect stubs for old URLs → Task 8. ✓
- Trim Header/Footer links → Task 9. ✓
- a11y/reduced-motion/mobile → verified Task 10. ✓
- Acceptance criteria (build, parity, nav, no CDN) → Tasks 7, 8, 9, 10. ✓
- Out-of-scope items (Web3Forms wiring, photos, orphaned component cleanup, `<noscript>`) → correctly NOT included.

**Placeholder scan:** No TBD/TODO; every code step contains full content; the one "read-then-edit" task (Header/Footer) is keyed to concrete hrefs because the exact existing markup is component-specific. ✓

**Type/name consistency:** `immersive.css`, `src/scripts/immersive-engine.js`, `ImmersiveLayout.astro`, `Icon` (`name`/`class`), `smashLogo.src`, redirect keys, and the `data-goto`/`.layer`/`#spacer`/`#stars` hooks the engine queries all match across tasks. ✓
