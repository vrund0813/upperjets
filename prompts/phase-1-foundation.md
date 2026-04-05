# PHASE 1 — Foundation & Design System

Read `.claude/CLAUDE.md` and `.claude/skills/DESIGN_SYSTEM.md` in full before starting.

## Your task
Set up the complete Next.js 14 project with all configuration, dependencies, design tokens, and base components. The goal is a running dev server with the design system in place.

## Steps

### 1. Initialize Next.js project
Run from the project root:
```
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-git
```

### 2. Install dependencies
```
npm install framer-motion lucide-react react-hook-form @hookform/resolvers zod clsx tailwind-merge
npm install -D @types/node
```

### 3. Configure Tailwind
Update `tailwind.config.ts` with ALL design tokens from `.claude/skills/DESIGN_SYSTEM.md`:
- Custom colors (brand-bg, brand-esp, brand-sur, brand-green, brand-cream, brand-warm, brand-gray, brand-muted)
- Custom font families (playfair, cormorant, inter)
- Custom animations (marquee, compass, needle, chipIn, navIn, pgIn, cpulse, pulse)
- Custom keyframes for all animations

### 4. Configure Next.js
Update `next.config.ts`:
- Add image domains for unsplash (for fleet placeholder photos)
- Enable standalone output for Netlify

### 5. Set up global CSS
Update `src/styles/globals.css` (and import in layout.tsx):
- CSS custom properties for all colors
- Base body styles: background #0A0A08, color #F2EFE6, font-family Inter
- Scroll reveal classes (.scroll-reveal, .scroll-reveal.revealed)
- Nav link underline sweep (.nav-link, .nav-link::after)
- CTA shimmer (.btn-primary, .btn-primary::before)
- Management card 3D (.mgmt-card, .mgmt-inner)
- Value card bar (.value-card::before)
- Pillar row (.pillar-row:hover)
- Scanlines (.scanlines)
- Custom scrollbar (3px, #9CB406 thumb)
- Selection highlight (#9CB406 bg, #0A0A08 text)
- All @keyframes from DESIGN_SYSTEM.md

### 6. Set up fonts in layout.tsx
```tsx
import { Playfair_Display, Inter, Cormorant_Garamond } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['italic'],
  variable: '--font-cormorant',
  display: 'swap',
})
```
Apply all three font variables to the root html element.

### 7. Create base UI components

**`src/components/ui/Button.tsx`**
- `variant: 'primary' | 'outline'`
- Primary: green bg, black text, shimmer on hover
- Outline: transparent, cream text, green border on hover
- Both: translateY(-2px) on hover

**`src/components/ui/Tag.tsx`**
- Green hairline + uppercase Inter 500 label

**`src/components/ui/Icon.tsx`**
- Thin wrapper for lucide-react with consistent sizing

**`src/components/ui/Separator.tsx`**
- 0.5px horizontal line rgba(242,239,230,0.07)

**`src/components/animations/ScrollReveal.tsx`**
- IntersectionObserver wrapper with stagger delay prop
- Uses .scroll-reveal CSS class

### 8. Set up lib files

**`src/lib/utils.ts`**
```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**`src/lib/hooks.ts`**
- `useScrollProgress(ref)` — from HERO_CANVAS.md skill
- `useScrolled(threshold = 60)` — returns boolean
- `useActiveSection(ids)` — IntersectionObserver tracking

### 9. Create layout.tsx
- Apply fonts
- Set metadata (title: "Upper Jets | Private Aviation Charter", description, etc.)
- Import globals.css
- Set html/body with font variables and base classes
- No nav/footer here — those are in the page

### 10. Create Netlify files
- `public/__forms.html` — from NETLIFY_FORMS.md skill
- `netlify.toml` — build config

### 11. Run dev server
```
npm run dev
```
Verify it starts clean at localhost:3000. Fix any TypeScript or config errors.

## Deliverable
- Clean `npm run dev` with no errors
- All design tokens in Tailwind config
- All base UI components created and typed
- Fonts loading correctly
- CSS animations defined
- Netlify files in place
