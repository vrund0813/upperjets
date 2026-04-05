# PHASE 4 — Polish, SEO & Production

Read `.claude/CLAUDE.md` before starting.
Assume Phases 1–3 are complete. This phase makes the site production-ready.

## Your task
Final polish, SEO, performance optimisation, Netlify prep, and quality pass.

---

## 1. SEO & Metadata

Update `src/app/layout.tsx`:
```ts
export const metadata: Metadata = {
  title: 'Upper Jets | Private Aviation Charter',
  description: 'Florida-based FAA Part 135 operator. On-demand private charter across the Americas. ARGUS Gold certified. 24/7 dispatch.',
  keywords: ['private jet charter', 'FAA Part 135', 'ARGUS Gold', 'Florida aviation', 'charter broker'],
  openGraph: {
    title: 'Upper Jets | Private Aviation Charter',
    description: 'On-demand private aviation across the Americas. ARGUS Gold certified, FAA Part 135, 24/7 dispatch.',
    url: 'https://www.upperjets.com',
    siteName: 'Upper Jets',
    type: 'website',
    images: [{ url: '/images/exterior.jpg', width: 1200, height: 630, alt: 'Upper Jets aircraft on tarmac' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Upper Jets | Private Aviation Charter',
    description: 'On-demand private aviation across the Americas.',
    images: ['/images/exterior.jpg'],
  },
  robots: { index: true, follow: true },
  viewport: { width: 'device-width', initialScale: 1 },
}
```

---

## 2. Performance — Image Optimisation

Replace any `<img>` tags in non-canvas sections with Next.js `<Image>`:
- Charter section: interior + exterior photos
- Fleet cards: use `<Image>` with `fill` and `sizes`
- Fleet modal: same
- Management cards: N/A (no photos yet)

For fleet card photo cycling — since we're swapping src dynamically, keep as native `<img>` with priority preload for first photo.

Add to `<head>` in layout.tsx:
```tsx
<link rel="preload" as="image" href="/Heromotion/ezgif-frame-001.jpg"/>
<link rel="preload" as="image" href="/images/exterior.jpg"/>
<link rel="preload" as="image" href="/images/interior.jpg"/>
```

---

## 3. Performance — Hero Canvas

Add `fetchpriority="high"` preloading for first 5 frames:
```tsx
// In HeroCanvas, add to document head on mount
useEffect(() => {
  const links = Array.from({ length: 5 }, (_, i) => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = `/Heromotion/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`
    document.head.appendChild(link)
    return link
  })
  return () => links.forEach(l => l.remove())
}, [])
```

---

## 4. Mobile Responsiveness

Audit every section for mobile. Required breakpoints: sm (640px), md (768px), lg (1024px)

**Hero:**
- Headline: `text-[clamp(38px,8vw,74px)]`
- 2-col layout → single column at md
- Trust chips: stack vertically on mobile
- About overlay: single column on mobile

**Charter:** 2-col → 1-col at md

**Fleet:** 3-col → 2-col at md → 1-col at sm

**Destinations:** 2-col → 1-col at md

**Management:** 4-col → 2-col at md → 1-col at sm

**Contact form:** 2-col → 1-col at sm (all fields span full width)

**Nav:** Add hamburger menu at md:
- Hidden nav links at md, show hamburger icon
- Drawer slides from right, dark overlay
- All nav items in drawer, close on selection

**Footer:** 4-col → 2-col at md → 1-col at sm

---

## 5. Accessibility

- All images have meaningful `alt` text
- All interactive elements have visible focus states
- Form fields have proper `id` + `label` association (htmlFor)
- Nav landmark `<nav>` with aria-label
- Main `<main>` landmark
- Footer `<footer>` landmark
- Reduced motion: wrap scroll animations in `prefers-reduced-motion` check
```css
@media (prefers-reduced-motion: reduce) {
  .scroll-reveal { transition: none; }
  * { animation-duration: 0.01ms !important; }
}
```

---

## 6. Netlify Forms — Final Check

Verify `public/__forms.html` exists with all field names matching the React form.
Verify the React form POSTs to `/__forms.html` (not `/`).
Verify body is URL-encoded (not JSON).
Verify `form-name: 'charter-quote'` is in the POST body.

---

## 7. netlify.toml

Ensure `netlify.toml` at project root:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NODE_VERSION = "20"

[[headers]]
  for = "/Heromotion/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

---

## 8. Quality Pass — Visual Check

Go through every section and verify:

**Hero:**
- [ ] Canvas renders frame 1 on load
- [ ] Scrolling scrubs frames smoothly
- [ ] Exterior text fades out on scroll
- [ ] About overlay appears on cabin frames
- [ ] Compass fades out as scroll begins
- [ ] Progress bar fills green correctly
- [ ] Cannot scroll above page top

**Nav:**
- [ ] Transparent → frosted on scroll
- [ ] Active link highlights correctly
- [ ] Hover underline sweeps in/out
- [ ] All links scroll to correct sections
- [ ] "About" scrolls to cabin phase of hero

**Trust Bar:**
- [ ] Marquee loops seamlessly
- [ ] Pauses on hover
- [ ] 4 items only, no Wyvern

**Charter:**
- [ ] Pillar rows indent on hover
- [ ] Outline button hover turns green

**Fleet:**
- [ ] Photos cycle on hover
- [ ] Dot indicators update
- [ ] "Charter This" overlay appears on hover
- [ ] "View Full Fleet" opens modal
- [ ] Modal tabs work
- [ ] Modal closes and restores scroll

**Destinations:**
- [ ] 40 cities in chip grid
- [ ] Highlighted cities in green
- [ ] Chips lift on hover

**Management:**
- [ ] Cards tilt 3D on hover
- [ ] Orbit rings visible

**Contact:**
- [ ] All fields accept free typing (no cursor jump)
- [ ] Validation highlights required fields
- [ ] Submit shows spinner
- [ ] Success screen shows with first name

**Footer:**
- [ ] Instagram button links correctly
- [ ] ARGUS Gold + FAA Part 135 badges only (no Wyvern)
- [ ] sales@upperjets.com everywhere (no concierge@)

---

## 9. Final Build

```bash
npm run build
npm run lint
```

Fix all TypeScript errors and lint warnings.

---

## Deliverable
- `npm run build` passes cleanly
- `npm run lint` passes (0 warnings)
- All mobile breakpoints correct
- All accessibility requirements met
- All visual checks passing
- Ready for `netlify deploy --prod`
