# Upper Jets — Production Website

## Before You Start

### Add your assets
Place these files before running Phase 1:

```
public/
  Heromotion/
    ezgif-frame-001.jpg   ← your 105 frames go here
    ezgif-frame-002.jpg
    ...
    ezgif-frame-105.jpg
  images/
    exterior.jpg          ← UpperJets-16.jpg renamed
    interior.jpg          ← UpperJets-02.jpg renamed
```

---

## Build Phases

Open this folder in VS Code. Open Claude Code. Start a new session for each phase.

### Phase 1 — Foundation
Copy and paste the entire contents of `prompts/phase-1-foundation.md` into Claude Code.

**What gets built:** Next.js setup, Tailwind design tokens, base UI components, fonts, CSS animations, Netlify config files.

### Phase 2 — Hero + Nav
Start a NEW Claude Code session. Copy `prompts/phase-2-hero.md`.

**What gets built:** Canvas frame scrubbing hero, compass indicator, nav with active tracking, trust bar marquee, float CTA.

### Phase 3 — Sections
Start a NEW Claude Code session. Copy `prompts/phase-3-sections.md`.

**What gets built:** Charter, Fleet (with photo cycling + modal), Destinations, Management, Contact form (Netlify), Footer.

### Phase 4 — Polish
Start a NEW Claude Code session. Copy `prompts/phase-4-polish.md`.

**What gets built:** SEO metadata, mobile responsiveness, accessibility, performance optimisation, Netlify forms verification, final build.

---

## Tech Stack
- Next.js 14 App Router + TypeScript
- Tailwind CSS
- Framer Motion
- React Hook Form + Zod
- Lucide React
- Netlify (hosting + forms)

## Design
- Headlines: Playfair Display
- Green italic words: Cormorant Garamond italic
- Body/UI: Inter
- Primary accent: #9CB406
- Background: #0A0A08

## Contact (after deployment)
Wire Netlify form notifications:  
Netlify Dashboard → Forms → charter-quote → Notifications → Add email → sales@upperjets.com
