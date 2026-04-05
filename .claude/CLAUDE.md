# UPPER JETS — Claude Code Master Context

> Read this entire file before writing a single line of code. Every decision is documented here. Do not deviate without explicit instruction.

---

## BUILD PROGRESS

| Phase | Status | Completed |
|-------|--------|-----------|
| Phase 1 — Foundation (Next.js scaffold, design tokens, data files, base components) | ✅ Complete | 2026-04-04 |
| Phase 2 — Hero, Navigation & Trust Bar | ✅ Complete | 2026-04-04 |
| Phase 3 — All Content Sections | ✅ Complete | 2026-04-04 |
| Phase 4 — Polish & Deployment | Pending | — |

---

## PROJECT OVERVIEW

**Client:** Upper Jets — Florida-based FAA Part 135 private aviation charter operator  
**Site type:** Single-page scroll experience (all sections on one page, no routing)  
**Primary audiences:** Charter brokers + HNW direct clients  
**Services:** On-demand charter (primary), aircraft management, sales, maintenance  
**Certifications:** ARGUS Gold, FAA Part 135 — **NO Wyvern anywhere on the site, ever**  
**Coverage:** US (48 states), Mexico, Caribbean, South America  
**Base:** Fort Lauderdale, FL  
**Contact:** sales@upperjets.com · +1 (954) 900 2149  

---

## TECH STACK

- **Framework:** Next.js 14 App Router (TypeScript strict)
- **Styling:** Tailwind CSS with custom design tokens
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod validation
- **Icons:** Lucide React
- **Deployment target:** Netlify
- **Forms backend:** Netlify Forms (SPA pattern — see SKILL: netlify-forms)
- **Font loading:** Google Fonts via next/font/google

---

## DESIGN SYSTEM

### Colors (CSS variables + Tailwind config)
```
--color-bg:        #0A0A08   deep black       → bg-brand-bg
--color-espresso:  #141410   section alt bg   → bg-brand-esp
--color-surface:   #1C1C17   card/hover       → bg-brand-sur
--color-green:     #9CB406   primary accent   → text-brand-green / bg-brand-green
--color-cream:     #F2EFE6   primary text     → text-brand-cream
--color-warm:      #ABABAB   secondary text   → text-brand-warm
--color-gray:      #8A8A7A   tertiary text    → text-brand-gray
--color-muted:     #787868   disabled/labels  → text-brand-muted
--color-border:    rgba(242,239,230,0.07)      → border-brand
--color-green-border: rgba(156,180,6,0.3)     → border-brand-green
```

### Typography — THREE fonts, each with a specific role
```
Playfair Display 400/700        → headlines, section titles (sr class)
Cormorant Garamond italic 400/500 → green accent/emphasis words only (ac class)
Inter 400/500/600               → ALL body text, UI, nav, labels, forms (sa class)
```

**RULE:** Every green italic word (higher, runway, accessible, done right, etc.) uses Cormorant Garamond italic. Never Playfair for green words.

### Spacing
- Section padding: `py-[72px] px-[40px]` desktop, responsive on mobile
- Max width: `max-w-[1100px] mx-auto`
- Nav height: `72px` fixed
- Trust bar height: `62px`
- All borders: `0.5px` hairlines

### Animation easing
- Default: `cubic-bezier(0.16, 1, 0.3, 1)` — spring feel
- Hover transitions: 250–350ms
- Scroll reveals: 700ms with stagger delays (80ms, 180ms, 280ms, 380ms)
- Nav underline sweep: 350ms
- Marquee: 28s linear infinite
- Fleet photo cycle: 900ms interval, 180ms crossfade

---

## PAGE ARCHITECTURE

Single page, all sections in order:

1. **Hero** — 400vh sticky scroll zone (frame scrubbing)
2. **Trust Bar** — CSS marquee (ARGUS Gold, 24/7 Dispatch, FAA Part 135, 4 Regions)
3. **Charter** — `id="charter"` On-demand charter section
4. **Fleet** — `id="fleet"` 3 aircraft cards with photo cycling + View Full Fleet modal
5. **Destinations** — `id="destinations"` Where we fly
6. **About anchor** — `id="about"` (the real about content is in the hero scroll overlay)
7. **Management** — `id="management"` 4 leadership cards
8. **Contact** — `id="contact"` Netlify form

---

## HERO — MOST CRITICAL SECTION

### Frame Scrubbing
- **105 frames** at 15fps = 7 seconds of video
- Files: `public/Heromotion/ezgif-frame-001.jpg` through `ezgif-frame-105.jpg`
- Frame index: `Math.round(progress * 104)` where progress is 0→1
- URL: `/Heromotion/ezgif-frame-${String(idx + 1).padStart(3, '0')}.jpg`
- Render: HTML5 Canvas `ctx.drawImage()` via `requestAnimationFrame`
- Preload: First 25 frames on mount, remaining 26-105 lazy in background
- Canvas: fills 100vw × 100vh, sized via ResizeObserver

### Scroll Progress
- Outer div: `height: 400vh, position: relative`
- Sticky inner: `position: sticky, top: 0, height: 100vh, overflow: hidden`
- Progress `p` = 0→1 as user scrolls through 400vh zone

### Phase Transitions (by scroll progress `p`)
```
p 0.00 → 0.55:  Exterior phase
  - Canvas shows frames 1→58 (approximately)
  - "Let us fly you higher" headline + chips + CTAs
  - Compass scroll indicator visible

p 0.30 → 0.60:  Dark bridge (sin curve crossfade)
  - rgba(10,10,8, sin(p/0.4 * π) * 0.9)

p 0.40 → 1.00:  Interior / cabin phase
  - Canvas shows frames 58→105
  - Exterior text fades out

p 0.58 → 1.00:  About overlay fades in on cabin background
  - "Who we are" tag
  - "Built to make private aviation accessible." headline
  - 2 paragraphs body text
  - 2×2 stats grid (centered in right column)
  - 4 value cards full width
  - NO mission statement quote
```

### Scroll Lock
Prevent scrolling above page top:
```js
window.addEventListener('wheel', e => {
  if (window.scrollY <= 0 && e.deltaY < 0) e.preventDefault()
}, { passive: false })
```

---

## TRUST BAR

Infinite CSS marquee. Items × 3 for seamless loop.
```
@keyframes marquee {
  from { transform: translateX(0) }
  to   { transform: translateX(-33.333%) }
}
animation: marquee 28s linear infinite;
```
Pauses on hover. 4 items only:
1. ARGUS Gold — Safety certified
2. 24/7 Dispatch — Always on
3. FAA Part 135 — Licensed
4. 4 Regions — US·MX·Car·SAm

---

## FLEET

### Card Photo Cycling
Each fleet card has a `photos[]` array. On mouse enter, setInterval every 900ms crossfades to next photo. Mouse leave resets to index 0.
```
photos crossfade: opacity 0 (180ms) → swap src → opacity 1 (180ms)
dot indicators at bottom of card show current photo
```

### Fleet Modal
Full-screen overlay triggered by "View Full Fleet" button.
- Tab bar: Learjet 60 XR | Challenger 350 | Gulfstream G450
- Left: large aircraft photo
- Right: specs 3×2 grid, description, Charter CTA
- "← Back to site" closes modal, restores scroll

---

## CONTACT FORM — NETLIFY SPA PATTERN

**Critical:** The form is rendered by React (client-side), so Netlify's build bot can't find it. Use the SPA workaround:

1. Create `public/__forms.html` with a static hidden form (Netlify scans this)
2. React form POSTs via `fetch()` to `/__forms.html` (NOT to `/`)
3. Body must be URL-encoded (NOT JSON)
4. Include `form-name` hidden input
5. Include honeypot field `bot-field`

**FormField component MUST be defined outside ContactForm** to prevent remounting on every keystroke (which causes cursor jumping).

Fields: From, To, Date, Trip Type (select), Passengers, Name, Email/Phone, Notes
Email: `sales@upperjets.com`

---

## NAVIGATION

Order: **Home · About · Charter · Fleet · Get a Quote**

- All items smooth scroll to section IDs
- "About" scrolls to `window.innerHeight * 2.5` (hero interior phase)
- Active section tracked via IntersectionObserver
- Hover: `::after` underline scaleX 0→1 (right origin), scaleX 1→0 on leave (left origin)
- Transparent on load → `rgba(10,10,8,0.96)` + `backdrop-filter: blur(20px)` at 60px scroll
- Logo + wordmark + "Private Aviation" subtitle on left

---

## INTERACTIONS CHECKLIST

| Element | Interaction |
|---------|-------------|
| Nav links | Underline sweep right→left in, left→right out |
| CTA buttons | Shimmer `::before` diagonal + translateY(-2px) |
| Outline buttons | Border → green + translateY(-2px) |
| Pillar rows | padding-left +6px on hover |
| Fleet cards | Image zoom + "Charter This" overlay + photo cycling |
| Fleet card dots | Show current photo index |
| Destination chips | translateY(-2px) + green border + white text |
| Management cards | rotateY(8deg) scale(1.02) — 3D tilt |
| Value cards | Left-edge 2px green bar slides up |
| Scroll reveals | opacity 0→1 + translateY 20px→0, IntersectionObserver |
| Float CTA | Fades in at 2.4s after load |
| Trust bar | Pause on hover |

---

## ASSETS

### Photos (place in /public/images/)
- `exterior.jpg` — UpperJets-16.jpg (tarmac, jet, hangar, low angle)
- `interior.jpg` — UpperJets-02.jpg (cream leather seats, Hermès blankets, dark walnut)

### Hero Frames (place in /public/Heromotion/)
- `ezgif-frame-001.jpg` through `ezgif-frame-105.jpg`
- Total: 105 frames at 15fps

### Logo
- Nav: `https://upperjets.com/wp-content/uploads/2018/09/logo_top.png`
- Or use the SVG logomark (U-shape + wing) defined in Logo component

---

## COMPASS SCROLL INDICATOR

3-layer SVG, appears at bottom center of hero, fades out at p > 0.1:

1. Outer ring: rotates clockwise 12s, 8 tick marks at 45° intervals
2. Progress arc: stroke-dashoffset fills as scroll begins
3. Inner needle: counter-rotates 8s, green north + grey south, center dot

Label: "SCROLL TO ENTER" pulsing animation

---

## NETLIFY DEPLOYMENT

### netlify.toml
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Forms
- `public/__forms.html` — static form for build bot detection
- POST to `/__forms.html` with `Content-Type: application/x-www-form-urlencoded`
- Honeypot: `netlify-honeypot="bot-field"` + hidden `<input name="bot-field"/>`

---

## CHANGES LOG

### Session 2026-04-04

#### `src/components/animations/HeroCanvas.tsx`
- **Replaced frame-scrubbing with static image crossfade.** Frame canvas code is commented out — do not delete.
- Uses `/images/UpperJets-16.jpg` (exterior) and `/images/UpperJets-02.jpg` (interior).
- Animation is driven entirely via `ref.current.style` — no CSS transitions, no React re-renders.
- **Crossfade fix:** single `t` parameter guarantees `extOp + intOp = 1` at all times (no black flash between images):
  ```js
  const t = Math.min(1, Math.max(0, (p - 0.30) / 0.35))
  const extOp = 1 - t   // exterior fades out
  const intOp = t        // interior fades in
  ```
- **Scale:** exterior `scale(1 + p * 0.35)` (gentle zoom in); interior `scale(1.4 → 1.0)` as it fades in.
- Exterior: `transformOrigin: '52% 48%'`, `filter: brightness(0.42) saturate(0.88)`, `willChange: 'transform, opacity'`
- Interior: `objectPosition: 'center 25%'`, `filter: brightness(0.42)`, `willChange: 'transform, opacity'`
- Container: `overflow: 'hidden'` (clips scale bleed).

#### `src/components/sections/Hero.tsx`
- Removed tag div containing "Part 135 Operator · Florida" — no longer shown.
- Status label (top right) changed from "Dispatch available 24/7" → **"N732RJ"** (tail number).
- Trust chips container: `bottom` moved from `76px` → `130px` to avoid overlap with Float CTA button.
- Trust chips: `gap` set to `0px` (no space between chips), `paddingBottom` removed.

#### `src/data/team.ts`
- Removed `bio` and `initials` fields from `TeamMember` interface and all 4 team entries.
- Interface now only has `{ title: string; name: string }`.

#### `src/components/sections/Management.tsx`
- Removed initials monogram circle (the SVG orbit + green circle with letter) from `MgmtCard`.
- Removed bio `<p>` paragraph from `MgmtCard`.
- `MgmtCard` prop type updated to `{ title: string; name: string }`.

#### `src/app/globals.css`
- `.hero-ext-layout`: changed `align-items` from `flex-end` → `center`.

### Session 2026-04-04 (Charter animation polish)

#### `src/components/animations/LandingAnimation.tsx`
- Removed both `BgPlane` components (`bgPlane1`, `bgPlane2`) — extra parked ghost planes no longer rendered.
- Removed corner accent divs (`cornerTL`, `cornerBR`) — no more "screen/monitor" frame feel.

#### `src/components/animations/LandingAnimation.module.css`
- Removed `border-top` from `.animationBox` — hard box edge gone.
- Added `::after` top-fade gradient (`#141410 → transparent`, 90px) — animation blends into the section background above it.
- **Car scale corrected:** `.carSvg` reduced from `220×90px` → `100×41px` so the car is proportional to the airport buildings (was ~76% of terminal width, now ~40%).
- **Car vertical position corrected:** `carCycle` `top` changed from `52%` → `64%` — wheels now rest on the runway line (was floating ~42px above it).
- **Car horizontal positions tightened:** stop position changed from `left:33%` → `left:8%`, keeping the car well to the left and clear of the jet.
- Removed `scale(0.85)` from all `carCycle` keyframes (car SVG is already sized correctly).
- **Jet landing position corrected:** touchdown `top` changed from `46%` → `54%`/`55%` — nose gear now lands on the runway line instead of floating above it.
- **Jet landing zone shifted right:** `right:20%` → `right:10%` at touchdown, giving ~68px of clear space between the car and the jet during the hold phase.
- **Jet climb/exit keyframes updated** to match new right-offset landing position.
- **Touchdown flare repositioned:** `left:68%` → `left:75%` to match the new jet landing zone.

---

## WHAT MUST NEVER APPEAR

- The word "Wyvern" anywhere
- Any reference to Wyvern Wingman
- "Three decades. One standard." as a standalone headline
- `concierge@upperjets.com` (use `sales@upperjets.com`)
- JSON body in form submission (must be URL-encoded)

---

## FILE STRUCTURE

```
src/
  app/
    layout.tsx          global layout, fonts, metadata
    page.tsx            single page entry point
    globals.css         CSS variables, base styles
  components/
    ui/
      Button.tsx
      Tag.tsx
      Icon.tsx
      Separator.tsx
    layout/
      Nav.tsx
      Footer.tsx
      FloatCTA.tsx
    sections/
      Hero.tsx           contains HeroCanvas + AboutOverlay
      TrustBar.tsx
      Charter.tsx
      Fleet.tsx          contains FleetCard + FleetModal
      Destinations.tsx
      Management.tsx
      Contact.tsx
    animations/
      CompassIndicator.tsx
      ScrollReveal.tsx
  lib/
    utils.ts
    hooks.ts            useScrollProgress, useActiveSection, useScrolled
  data/
    fleet.ts
    team.ts
    destinations.ts
    content.ts
  types/
    index.ts
  styles/
    globals.css
public/
  Heromotion/           105 frames — user adds these
  images/
    exterior.jpg        UpperJets-16.jpg — user adds
    interior.jpg        UpperJets-02.jpg — user adds
  __forms.html          Netlify Forms static detection
```
