# SKILL: Animations & Interactions

## Scroll Reveal Pattern
```tsx
'use client'
import { useEffect, useRef } from 'react'

export function ScrollReveal({ children, delay = 0, className = '' }: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('revealed') },
      { threshold: 0.06 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={`scroll-reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
```

CSS:
```css
.scroll-reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 700ms cubic-bezier(0.16,1,0.3,1),
              transform 700ms cubic-bezier(0.16,1,0.3,1);
}
.scroll-reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}
```

## Nav Underline Sweep
```css
.nav-link {
  position: relative;
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 0.5px;
  background: #9CB406;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 350ms cubic-bezier(0.16,1,0.3,1);
}
.nav-link:hover::after,
.nav-link.active::after {
  transform: scaleX(1);
  transform-origin: left;
}
```

## CTA Button Shimmer
```css
.btn-primary {
  position: relative;
  overflow: hidden;
  transition: opacity 250ms, transform 250ms;
}
.btn-primary::before {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 100%; height: 100%;
  background: rgba(255,255,255,0.15);
  transform: skewX(-20deg);
  transition: left 450ms cubic-bezier(0.16,1,0.3,1);
}
.btn-primary:hover::before { left: 120%; }
.btn-primary:hover { opacity: 0.9; transform: translateY(-2px); }
```

## Management Card 3D Tilt
```css
.mgmt-card {
  perspective: 1000px;
}
.mgmt-inner {
  transition: transform 600ms cubic-bezier(0.16,1,0.3,1);
}
.mgmt-card:hover .mgmt-inner {
  transform: rotateY(8deg) scale(1.02);
}
```

## Value Card Left Bar
```css
.value-card {
  position: relative;
  overflow: hidden;
  transition: background 300ms;
}
.value-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 2px; height: 0;
  background: #9CB406;
  transition: height 400ms cubic-bezier(0.16,1,0.3,1);
}
.value-card:hover::before { height: 100%; }
.value-card:hover { background: #1C1C17; }
```

## Pillar Row Indent
```css
.pillar-row {
  transition: background 250ms, padding-left 250ms;
}
.pillar-row:hover {
  background: #1C1C17;
  padding-left: 22px;
}
```

## Fleet Card Photo Cycling (React)
```tsx
function FleetCard({ f, scrollTo }: { f: FleetCard, scrollTo: (id: string) => void }) {
  const [idx, setIdx] = useState(0)
  const [fading, setFading] = useState(false)
  const interval = useRef<NodeJS.Timeout>()

  const startCycle = () => {
    interval.current = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setIdx(i => (i + 1) % f.photos.length)
        setFading(false)
      }, 180)
    }, 900)
  }
  const stopCycle = () => {
    clearInterval(interval.current)
    setFading(true)
    setTimeout(() => { setIdx(0); setFading(false) }, 180)
  }

  return (
    <div onMouseEnter={startCycle} onMouseLeave={stopCycle}>
      <img
        src={f.photos[idx]}
        style={{ opacity: fading ? 0 : 1, transition: 'opacity 180ms ease' }}
        alt={f.name}
      />
      {/* dot indicators */}
      <div className="flex gap-1">
        {f.photos.map((_, i) => (
          <div key={i} style={{
            width: 4, height: 4, borderRadius: '50%',
            background: i === idx ? '#9CB406' : 'rgba(242,239,230,0.22)',
            transition: 'background 200ms'
          }} />
        ))}
      </div>
    </div>
  )
}
```
