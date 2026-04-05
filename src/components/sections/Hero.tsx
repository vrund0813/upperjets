'use client'

import { useRef, useEffect } from 'react'
import { Shield, Clock, FileText, CheckCircle } from 'lucide-react'
import { HeroCanvas } from '@/components/animations/HeroCanvas'
import { CompassIndicator } from '@/components/animations/CompassIndicator'
import { useScrollProgress } from '@/lib/hooks'
import { CONTENT } from '@/data/content'

const CHIPS = [
  { icon: Shield, title: 'ARGUS Gold', sub: 'Safety certified' },
  { icon: Clock, title: 'Instant Quotes', sub: 'Anytime' },
  { icon: FileText, title: 'FAA Part 135', sub: 'Licensed operator' },
]

export function Hero() {
  const zoneRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(zoneRef as React.RefObject<HTMLElement | null>)

  // Dark bridge: ramp up 0.20→0.35, hold dark 0.35→0.55, ramp down 0.55→0.70
  // Stays dark through the entire exterior→interior crossfade (0.30→0.65)
  const bridge =
    progress < 0.20 ? 0 :
    progress < 0.35 ? ((progress - 0.20) / 0.15) * 0.9 :
    progress < 0.55 ? 0.9 :
    progress < 0.70 ? (1 - (progress - 0.55) / 0.15) * 0.9 :
    0
  const extText = Math.max(0, 1 - progress * 5)
  const compassOp = Math.max(0, 1 - progress * 8)
  const aboutOp = progress > 0.58 ? Math.min(1, (progress - 0.58) * 6) : 0
  const aboutY = Math.max(0, (1 - aboutOp) * 30)

  // Scroll lock — prevent upward scroll past top
  useEffect(() => {
    const prevent = (e: WheelEvent) => {
      if (window.scrollY <= 0 && e.deltaY < 0) e.preventDefault()
    }
    window.addEventListener('wheel', prevent, { passive: false })
    return () => window.removeEventListener('wheel', prevent)
  }, [])

  return (
    <div ref={zoneRef} style={{ height: '280vh', position: 'relative' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* Canvas — frame scrubbing */}
        <HeroCanvas progress={progress} />

        {/* Dark bridge overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `rgba(10,10,8,${bridge})`,
            zIndex: 5,
            pointerEvents: 'none',
          }}
        />

        {/* Scanlines */}
        <div
          className="scanlines"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 6,
            pointerEvents: 'none',
            opacity: 0.4,
          }}
        />

        {/* Radial vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10,10,8,0.7) 100%)',
            zIndex: 6,
            pointerEvents: 'none',
          }}
        />

        {/* Bottom gradient */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '50%',
            background: 'linear-gradient(to bottom, transparent, rgba(10,10,8,0.95))',
            zIndex: 6,
            pointerEvents: 'none',
          }}
        />

        {/* Top gradient */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '25%',
            background: 'linear-gradient(to top, transparent, rgba(10,10,8,0.7))',
            zIndex: 6,
            pointerEvents: 'none',
          }}
        />

        {/* Progress bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: '1.5px',
            width: `${progress * 100}%`,
            background: '#9CB406',
            zIndex: 12,
            transition: 'width 50ms linear',
          }}
        />

        {/* Status label — top right */}
        <div
          style={{
            position: 'absolute',
            top: '88px',
            right: '40px',
            zIndex: 10,
            opacity: extText,
            transition: 'opacity 150ms ease',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#9CB406', animation: 'cpulse 2s ease-in-out infinite' }} />
          <span style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '11px', letterSpacing: '0.1em', color: 'rgba(242,239,230,0.6)', textTransform: 'uppercase' }}>
            N732RJ
          </span>
        </div>

        {/* Cabin status — top right */}
        <div
          style={{
            position: 'absolute',
            top: '88px',
            right: '40px',
            zIndex: 10,
            opacity: aboutOp,
            transition: 'opacity 150ms ease',
          }}
        >
          <span style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '11px', letterSpacing: '0.1em', color: 'rgba(242,239,230,0.5)', textTransform: 'uppercase' }}>
            — Cabin Interior
          </span>
        </div>

        {/* Corner bracket TL */}
        <div
          style={{
            position: 'absolute',
            top: '88px',
            left: '40px',
            width: '20px',
            height: '20px',
            borderTop: '0.5px solid rgba(156,180,6,0.5)',
            borderLeft: '0.5px solid rgba(156,180,6,0.5)',
            zIndex: 10,
            opacity: extText,
          }}
        />

        {/* Corner bracket BR */}
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            right: '40px',
            width: '20px',
            height: '20px',
            borderBottom: '0.5px solid rgba(156,180,6,0.5)',
            borderRight: '0.5px solid rgba(156,180,6,0.5)',
            zIndex: 10,
            opacity: extText,
          }}
        />

        {/* Exterior text block */}
        <div
          className="hero-ext-layout"
          style={{
            position: 'absolute',
            bottom: '130px',
            left: '40px',
            right: '40px',
            zIndex: 10,
            opacity: extText,
          }}
        >
          {/* Left — tag + headline + sub + CTAs */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Headline */}
            <h1 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(36px, 5.5vw, 72px)', fontWeight: 400, lineHeight: 1.08, color: '#F2EFE6', marginBottom: '16px' }}>
              {CONTENT.hero.headline}{' '}
              <em style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontStyle: 'italic', color: '#9CB406' }}>
                {CONTENT.hero.headlineAccent}
              </em>
            </h1>

            {/* Sub */}
            <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: 'clamp(13px, 1.4vw, 16px)', color: 'rgba(171,171,171,0.85)', marginBottom: '28px', maxWidth: '460px', lineHeight: 1.6 }}>
              {CONTENT.hero.subheadline}
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <button
                className="btn-primary"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '13px',
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  background: '#9CB406',
                  color: '#0A0A08',
                  border: 'none',
                  padding: '12px 28px',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {CONTENT.hero.ctaPrimary}
              </button>
              <button
                onClick={() => document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '13px',
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  background: 'transparent',
                  color: 'rgba(242,239,230,0.75)',
                  border: 'none',
                  padding: '12px 0',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'color 250ms ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#F2EFE6')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(242,239,230,0.75)')}
              >
                {CONTENT.hero.ctaSecondary} →
              </button>
            </div>
          </div>

          {/* Right — trust chips */}
          <div className="hero-trust-chips" style={{ display: 'flex', flexDirection: 'column', gap: '0px', flexShrink: 0 }}>
            {CHIPS.map((chip, i) => (
              <div
                key={chip.title}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'rgba(20,20,16,0.6)',
                  border: '0.5px solid rgba(242,239,230,0.08)',
                  backdropFilter: 'blur(8px)',
                  padding: '8px 14px',
                  minWidth: '200px',
                  animation: 'chipIn 0.6s cubic-bezier(0.16,1,0.3,1) both',
                  animationDelay: `${1.2 + i * 0.15}s`,
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: '0.5px solid rgba(156,180,6,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <chip.icon size={14} strokeWidth={1.5} color="#9CB406" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '12px', fontWeight: 600, color: '#F2EFE6', lineHeight: 1.2 }}>{chip.title}</div>
                  <div style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '10px', color: 'rgba(171,171,171,0.7)', lineHeight: 1.2, marginTop: '2px' }}>{chip.sub}</div>
                </div>
                <CheckCircle size={12} strokeWidth={1.5} color="rgba(156,180,6,0.6)" />
              </div>
            ))}
          </div>
        </div>

        {/* Coordinates — bottom right */}
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            left: '54px',
            zIndex: 10,
            opacity: extText * 0.5,
          }}
        >
          <span style={{ fontFamily: '"Courier New", monospace', fontSize: '10px', letterSpacing: '0.08em', color: 'rgba(242,239,230,0.45)' }}>
            {CONTENT.company.coordinates}
          </span>
        </div>

        {/* About overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 11,
            opacity: aboutOp,
            transform: `translateY(${aboutY}px)`,
            transition: 'transform 50ms linear',
            padding: 'clamp(60px, 8vh, 80px) 40px 28px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            pointerEvents: aboutOp > 0.1 ? 'auto' : 'none',
            overflowY: 'auto',
          }}
        >
          <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
            {/* Top 2-col grid */}
            <div className="about-2col">
              {/* Left */}
              <div>
                {/* Tag */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                  <div style={{ width: '20px', height: '0.5px', background: '#9CB406' }} />
                  <span style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9CB406' }}>
                    {CONTENT.about.tag}
                  </span>
                </div>

                {/* Headline */}
                <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 400, lineHeight: 1.1, color: '#F2EFE6', marginBottom: '24px' }}>
                  {CONTENT.about.headline}{' '}
                  <em style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontStyle: 'italic', color: '#9CB406' }}>
                    {CONTENT.about.headlineAccent}
                  </em>
                </h2>

                {/* Body */}
                <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: 'clamp(13px, 1.3vw, 15px)', color: 'rgba(242,239,230,0.85)', lineHeight: 1.7, marginBottom: '16px' }}>
                  {CONTENT.about.body1}
                </p>
                <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: 'clamp(13px, 1.3vw, 15px)', color: 'rgba(242,239,230,0.7)', lineHeight: 1.7 }}>
                  {CONTENT.about.body2}
                </p>
              </div>

              {/* Right — 2×2 stats grid */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', width: '100%', maxWidth: '320px' }}>
                  {CONTENT.about.stats.map((stat) => (
                    <div
                      key={stat.label}
                      style={{
                        background: 'rgba(28,28,23,0.6)',
                        border: '0.5px solid rgba(242,239,230,0.07)',
                        padding: '24px 20px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                      }}
                    >
                      <div style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(22px, 2.5vw, 32px)', fontWeight: 400, color: '#F2EFE6', lineHeight: 1 }}>
                        {stat.value}
                      </div>
                      <div style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '10px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9CB406', marginTop: '6px' }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Values section */}
            <div>
              {/* Values tag */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <div style={{ width: '20px', height: '0.5px', background: '#9CB406' }} />
                <span style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9CB406' }}>
                  {CONTENT.about.valuesTag}
                </span>
              </div>

              {/* 4 value cards */}
              <div className="values-4col">
                {CONTENT.about.values.map((v) => (
                  <div
                    key={v.number}
                    className="value-card"
                    style={{
                      background: 'rgba(20,20,16,0.6)',
                      border: '0.5px solid rgba(242,239,230,0.07)',
                      padding: '24px 20px',
                    }}
                  >
                    <div style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '16px', fontWeight: 400, color: '#F2EFE6', marginBottom: '8px' }}>
                      {v.title}
                    </div>
                    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '12px', color: 'rgba(171,171,171,0.65)', lineHeight: 1.6 }}>
                      {v.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Compass */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
          }}
        >
          <CompassIndicator progress={progress} opacity={compassOp} />
        </div>
      </div>
    </div>
  )
}
