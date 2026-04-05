# SKILL: Design System

## Tailwind Config Extension
```ts
// tailwind.config.ts
extend: {
  colors: {
    brand: {
      bg:      '#0A0A08',
      esp:     '#141410',
      sur:     '#1C1C17',
      green:   '#9CB406',
      cream:   '#F2EFE6',
      warm:    '#ABABAB',
      gray:    '#8A8A7A',
      muted:   '#787868',
    }
  },
  fontFamily: {
    playfair:  ['"Playfair Display"', 'Georgia', 'serif'],
    cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
    inter:     ['Inter', 'system-ui', 'sans-serif'],
  },
  animation: {
    marquee:  'marquee 28s linear infinite',
    compass:  'spin 12s linear infinite',
    needle:   'spinR 8s linear infinite',
    chipIn:   'chipIn 0.6s cubic-bezier(0.16,1,0.3,1) both',
    navIn:    'navIn 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
    pgIn:     'pgIn 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
  },
  keyframes: {
    marquee:  { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-33.333%)' } },
    spin:     { to:   { transform: 'rotate(360deg)' } },
    spinR:    { to:   { transform: 'rotate(-360deg)' } },
    chipIn:   { from: { opacity: '0', transform: 'translateX(18px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
    navIn:    { from: { transform: 'translateY(-100%)' }, to: { transform: 'translateY(0)' } },
    pgIn:     { from: { opacity: '0', transform: 'translateY(8px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
    cpulse:   { '0%,100%': { opacity: '0.4' }, '50%': { opacity: '1' } },
    pulse:    { '0%,100%': { opacity: '0.5', transform: 'scale(1)' }, '50%': { opacity: '1', transform: 'scale(1.7)' } },
  }
}
```

## CSS Variables (globals.css)
```css
:root {
  --bg:        #0A0A08;
  --esp:       #141410;
  --sur:       #1C1C17;
  --green:     #9CB406;
  --cream:     #F2EFE6;
  --warm:      #ABABAB;
  --gray:      #8A8A7A;
  --muted:     #787868;
  --border:    rgba(242, 239, 230, 0.07);
  --gborder:   rgba(156, 180, 6, 0.3);
}
```

## Font Usage Rules
- `font-playfair` — section headlines ONLY (upright, never italic for green words)
- `font-cormorant italic` — green accent/emphasis words ONLY
- `font-inter` — everything else: body, UI, nav, labels, forms

## Scanlines Pattern
```css
.scanlines {
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 3px,
    rgba(156, 180, 6, 0.011) 3px,
    rgba(156, 180, 6, 0.011) 4px
  );
}
```

## Border Convention
All borders are `0.5px`. Use `border-[0.5px]` in Tailwind or `border-width: 0.5px` in CSS.

## Easing
```
spring:  cubic-bezier(0.16, 1, 0.3, 1)
```
