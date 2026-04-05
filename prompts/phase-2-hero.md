# PHASE 2 — Hero, Navigation & Trust Bar

Read `.claude/CLAUDE.md`, `.claude/skills/HERO_CANVAS.md`, and `.claude/skills/ANIMATIONS.md` before starting.
Assume Phase 1 is complete and `npm run dev` runs clean.

## Your task
Build the hero scroll experience, navigation, trust bar marquee, and floating CTA. These are the most complex and visually critical parts of the site.

---

## 1. useScrollProgress hook
In `src/lib/hooks.ts`, implement:
```ts
export function useScrollProgress(ref: React.RefObject<HTMLElement>): number
```
Returns 0→1 as the element scrolls through the viewport. See HERO_CANVAS.md for implementation.

---

## 2. HeroCanvas component
Create `src/components/animations/HeroCanvas.tsx`

Full implementation in `.claude/skills/HERO_CANVAS.md`. Key requirements:
- Loads 105 frames from `/Heromotion/ezgif-frame-001.jpg` to `ezgif-frame-105.jpg`
- Preloads first 25 on mount, rest lazily via `requestIdleCallback`
- Renders to HTML5 Canvas, cover-fills the viewport
- Redraws on every scroll frame via `requestAnimationFrame`
- Handles devicePixelRatio for sharp rendering
- ResizeObserver resizes canvas to match viewport

---

## 3. CompassIndicator component
Create `src/components/animations/CompassIndicator.tsx`

3-layer SVG:
- Outer ring (50×50): rotates clockwise 12s, 8 tick marks at 45° intervals, subtle green
- Progress arc: stroke-dashoffset fills as scroll begins (feeds from `progress` prop)
- Inner needle: counter-rotates 8s, green north line, grey south line, green center dot

Props: `{ progress: number, opacity: number }`

Label below: "SCROLL TO ENTER" in Inter uppercase, cpulse animation

Fades out when `progress > 0.1` (`opacity: max(0, 1 - progress * 8)`)

---

## 4. Hero component
Create `src/components/sections/Hero.tsx`

**Outer zone:** `height: 400vh, position: relative`  
**Sticky inner:** `position: sticky, top: 0, height: 100vh, overflow: hidden`

The canvas fills the sticky inner frame. Overlays are positioned absolutely on top.

**Scroll lock:** Prevent upward scroll past top (see HERO_CANVAS.md)

**Phase calculations:**
```ts
const extOpacity = Math.max(0, 1 - progress * 2.2)
const intOpacity = progress > 0.4 ? Math.min(1, (progress - 0.4) * 3.5) : 0
const bridge     = Math.sin(Math.min(progress / 0.4, 1) * Math.PI) * 0.9
const extText    = Math.max(0, 1 - progress * 5)
const compassOp  = Math.max(0, 1 - progress * 8)
const aboutOp    = progress > 0.58 ? Math.min(1, (progress - 0.58) * 6) : 0
const aboutY     = Math.max(0, (1 - aboutOp) * 30)
```

Note: The canvas handles the visual (frame scrubbing). The bridge overlay and overlays sit on top.

**Overlays (all position: absolute, zIndex layered):**
1. Dark bridge div: `background: rgba(10,10,8,{bridge})` — zIndex 5
2. Scanlines: zIndex 6
3. Radial vignette: zIndex 6
4. Bottom gradient (bottom 50% → opaque): zIndex 6
5. Top gradient (top 25% → opaque): zIndex 6
6. Progress bar: bottom, 1.5px green, width = `${progress * 100}%`: zIndex 12
7. Status label top-right: "Dispatch available 24/7" at extText opacity
8. Cabin status top-right: "— Cabin Interior" at aboutOp opacity
9. Corner brackets TL and BR: green border, fade with extText

**Exterior text block** (bottom left, fades with extText):
- Tag: "Part 135 Operator · Florida"
- Headline: "Let us fly you" + green italic Cormorant "higher."
- Sub: "With customized private aviation services to fit your needs"
- CTA buttons: "Request a Quote" (primary) + "View our fleet" (ghost text)
- Trust chips right column (raised 76px from bottom, no overlap with CTAs):
  - ARGUS Gold / 24/7 Dispatch / FAA Part 135
  - Each: circle icon + title + subtitle + checkmark
  - Stagger animation delays: 1.2s, 1.35s, 1.5s
- Coordinates: Courier New monospace bottom-right

**About overlay** (fades in at aboutOp, translateY from aboutY → 0):
- Position: absolute, covers full sticky frame, padding 80px 40px 28px
- Display: flex, flexDirection: column, justifyContent: center
- Max-width container 1100px centered

  Top 2-col grid (alignItems: center):
  - LEFT: Tag "Who we are" + headline "Built to make private aviation" + italic green "accessible." + 2 paragraphs
  - RIGHT: 2×2 stats grid centered: 30+/ARGUS/Part 135/4 with labels (centered with flexbox)

  Bottom full-width:
  - Tag "Our values" + 4 value cards grid (repeat 4 cols)
  - Each card: number + title + description + left green bar on hover

**Compass:** positioned bottom-center, opacity = compassOp

---

## 5. Navigation
Create `src/components/layout/Nav.tsx`

**Behavior:**
- Fixed top, height 72px, zIndex 200
- Transparent on load → `rgba(10,10,8,0.96)` + `backdrop-filter: blur(20px)` when `scrollY > 60`
- `navIn` slide-down animation on mount
- Logo left (SVG logomark + "UPPER JETS" + "PRIVATE AVIATION" subline)
- Links: Home · About · Charter · Fleet
- CTA button right: "Get a Quote" → green, shimmer hover

**Scroll to sections:**
```ts
const scrollTo = (id: string) => {
  if (id === 'home') { window.scrollTo({ top: 0, behavior: 'smooth' }); return }
  if (id === 'about') { window.scrollTo({ top: window.innerHeight * 2.5, behavior: 'smooth' }); return }
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 72
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
}
```

**Active section:** `useActiveSection(['home','charter','fleet','destinations','about','management','contact'])`

**Nav link hover:** `.nav-link` CSS class with `::after` sweep (see ANIMATIONS.md)

---

## 6. Trust Bar
Create `src/components/sections/TrustBar.tsx`

CSS marquee — NOT JavaScript:
- Container: height 62px, overflow hidden, dark `#0D0D0B` bg, green top border
- Inner track: flex, width: max-content, `animation: marquee 28s linear infinite`
- Pause on hover: `onMouseEnter` → `animationPlayState: 'paused'`

Items duplicated ×3 for seamless loop:
```
ARGUS Gold · Safety certified
24/7 Dispatch · Always on  
FAA Part 135 · Licensed
4 Regions · US·MX·Car·SAm
```

Each item: circle icon + bold label + subtitle, separated by hairline dividers

Icons use lucide-react: Shield (ARGUS), Clock (24/7), FileText (FAA), MapPin (4 Regions)

---

## 7. FloatCTA
Create `src/components/layout/FloatCTA.tsx`

- Fixed bottom-right, zIndex 199
- Fades in 2.4s after mount (useEffect setTimeout)
- Green "Request a Quote" button with shimmer
- "24/7 Dispatch Available" sub-label in muted

---

## 8. Wire together in page.tsx
```tsx
// src/app/page.tsx
'use client'
export default function Home() {
  return (
    <>
      <Nav />
      <FloatCTA />
      <main className="pt-[72px]">
        <Hero />
        <TrustBar />
        {/* sections added in Phase 3 */}
      </main>
      <Footer />
    </>
  )
}
```

---

## Deliverable
- Hero scrolls smoothly — canvas renders frames, about overlay fades in over cabin
- Compass animates and fades on scroll start  
- Trust bar marquees continuously, pauses on hover
- Nav transparent → frosted on scroll, active section highlights
- Float CTA fades in after 2.4s
- All mobile responsive (hero text scales with clamp)
- `npm run build` passes (no TypeScript errors)
