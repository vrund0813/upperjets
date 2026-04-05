# PHASE 3 — All Content Sections

Read `.claude/CLAUDE.md` and `.claude/skills/ANIMATIONS.md` before starting.
Assume Phases 1 and 2 are complete. All data is in `src/data/`.

## Your task
Build all remaining page sections in order. Import all copy from `src/data/content.ts`, all fleet data from `src/data/fleet.ts`, team from `src/data/team.ts`, destinations from `src/data/destinations.ts`.

---

## Section Order (after TrustBar)
1. Charter (`id="charter"`)
2. Fleet (`id="fleet"`)
3. Destinations (`id="destinations"`)
4. About anchor (`id="about"` — empty div, real content is in Hero overlay)
5. Management (`id="management"`)
6. Contact (`id="contact"`)

---

## 1. Charter Section
`src/components/sections/Charter.tsx`

2-column grid (1fr 1.1fr, gap 60px):

**Left column:**
- ScrollReveal > Tag "Primary service"
- Headline: "On-demand charter," + green italic "done right."
- Body paragraph (Inter 14.5px, warm color, lh 1.9)
- 4 pillar rows in a bordered container:
  - `.pillar-row` class — hover: padding-left increases 6px + background #1C1C17
  - Each row: serif number (green) + bold title + body text
- Outline button "Get a Charter Quote" → scrolls to contact

**Right column (ScrollReveal d1):**
- Interior photo `/images/interior.jpg` (400px tall, object-fit cover)
- Exterior photo `/images/exterior.jpg` overlapping bottom-left (154×118, border 3px bg)
- "ARGUS GOLD" certification badge top-right (green border, green label, cream value)

---

## 2. Fleet Section
`src/components/sections/Fleet.tsx` — includes FleetCard + FleetModal

**Section header** (flex, space-between, align flex-end):
- Tag "Our aircraft" + headline + green italic "performance."
- "View Full Fleet →" outline button — opens FleetModal on click

**FleetCard component** (defined in this file or separate):
See `ANIMATIONS.md` for photo cycling implementation.

Props: `{ aircraft: FleetAircraft, scrollTo: (id: string) => void }`

State: `idx` (current photo), `fading` (crossfade opacity)
- `onMouseEnter`: start 900ms interval, setFading→swap→unFade
- `onMouseLeave`: clear interval, reset to idx 0
- Photo dots at bottom of card (4px circles, green = active)

Hover overlay: "Charter This →" button fades in

Grid: `1.5fr 1fr 1fr` with 1px green border gap

**FleetModal component:**
Full-screen overlay (position: fixed, inset 0, zIndex 500)
- Slide-in animation `modalIn`
- Top bar: "← Back to site" button + tab bar (3 aircraft)
- Body: 2-col grid (photo left, specs right)
- Left: large aircraft photo with category badge
- Right: Tag + aircraft name (Playfair) + description + 3×2 specs grid + Charter CTA + exterior strip image
- Tab switching: animated border-bottom on active tab
- Restores scroll on unmount (`document.body.style.overflow = ''`)

State in parent (Page or Fleet section): `fleetOpen: boolean`

---

## 3. Destinations Section
`src/components/sections/Destinations.tsx`

2-column grid (1fr 1.4fr, gap 60px):

**Left column:**
- Tag + headline + green italic "runway."
- Body paragraph
- 4 region rows (bordered container):
  - `.pillar-row` hover behavior
  - Region name (bold uppercase) + cities text right-aligned

**Right column:**
- Tag "Popular destinations"
- Flex-wrap chip grid (40 destinations from `src/data/destinations.ts`)
- Highlighted chips (from `HIGHLIGHTED_DESTINATIONS` set): green text, green border
- Hover all chips: `translateY(-2px)` + green border + white text

---

## 4. Management Section
`src/components/sections/Management.tsx`

4-column grid (repeat 4, gap 20px), data from `src/data/team.ts`

Each card: `.mgmt-card` + `.mgmt-inner` for 3D tilt
- `perspective: 1000px` on outer
- `rotateY(8deg) scale(1.02)` on inner on hover

Card top: gradient bg (espresso → surface), orbit ring SVGs (14% opacity), monogram circle (green border, semi-transparent green bg), bottom green gradient line
Card bottom: role title (Inter uppercase green) + name (Playfair) + bio text

Decorative orbit SVGs (position absolute):
```tsx
<svg opacity={0.14} width={160} height={160}>
  <circle cx={80} cy={80} r={72} stroke="#9CB406" strokeWidth={0.5} fill="none"/>
  <circle cx={80} cy={80} r={58} stroke="#9CB406" strokeWidth={0.3} fill="none" strokeDasharray="4 8"/>
</svg>
```

---

## 5. Contact Section
`src/components/sections/Contact.tsx`

**CRITICAL: Read `.claude/skills/NETLIFY_FORMS.md` completely before building this.**

**FormField MUST be defined outside ContactForm** (use `memo()`) to prevent remounting on keystroke which causes cursor jumping.

```tsx
const FormField = memo(function FormField({
  id, label, req, half, type, ph, sel, area, form, errors, setValue
}: FormFieldProps) {
  // ...
})
```

Form fields: From*, To*, Date*, Trip Type (select), Passengers, Name*, Email or Phone*, Notes (textarea)

Validation with Zod:
```ts
const schema = z.object({
  from: z.string().min(1, 'Required'),
  to: z.string().min(1, 'Required'),
  date: z.string().min(1, 'Required'),
  type: z.string().optional(),
  pax: z.string().optional(),
  name: z.string().min(1, 'Required'),
  contact: z.string().min(1, 'Required'),
  notes: z.string().optional(),
  'bot-field': z.string().optional(),
})
```

Submission: POST to `/__forms.html` with URL-encoded body (not JSON). Show spinner, then success screen.

Success screen: checkmark circle + "Quote request received." + name + 60 min message + phone link

Below form: 3-col contact info block (Phone, Email, Base)

---

## 6. Footer
`src/components/layout/Footer.tsx`

4-column grid (1.2fr 1fr 1fr 1fr):

Col 1: Logo + tagline + description + Instagram button
- Instagram button: green IG icon SVG + "Follow on Instagram"
- Links to `https://www.instagram.com/upperjets`
- Hover: green border + green text + green bg tint

Cols 2-4: Navigation / Coverage / Contact link lists
- Navigation links call scrollTo for their section IDs

Bottom bar: copyright left + ARGUS Gold + FAA Part 135 badges right (green text, green border)

---

## 7. Wire all sections into page.tsx
```tsx
// Full page order
<Hero />
<TrustBar />
<Charter />
<Fleet />          {/* manages fleetOpen state internally */}
<Destinations />
<div id="about" /> {/* anchor only */}
<Management />
<Contact />
```

---

## Deliverable
- All 6 sections render correctly
- Fleet photo cycling works on hover
- Fleet modal opens, tabs work, close button works
- Contact form submits to Netlify (URL-encoded fetch)
- Form fields allow free typing (no cursor jumping)
- All scroll reveals work
- Pillar row and chip hover effects work
- `npm run build` passes with no TypeScript errors
