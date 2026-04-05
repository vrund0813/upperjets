'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Tag } from '@/components/ui/Tag'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { FLEET, type FleetAircraft } from '@/data/fleet'
import { CONTENT } from '@/data/content'

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

/* ─────────────────────────────── FleetCard ─── */
function FleetCard({
  aircraft,
  onCharter,
}: {
  aircraft: FleetAircraft
  onCharter: () => void
}) {
  const [idx, setIdx] = useState(0)
  const [fading, setFading] = useState(false)
  const [hovered, setHovered] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const nextIdxRef = useRef(1)

  const clearCycle = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const handleMouseEnter = useCallback(() => {
    setHovered(true)
    if (aircraft.photos.length <= 1) return
    nextIdxRef.current = 1
    intervalRef.current = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setIdx(nextIdxRef.current)
        nextIdxRef.current =
          (nextIdxRef.current + 1) % aircraft.photos.length
        setFading(false)
      }, 300)
    }, 2400)
  }, [aircraft.photos.length])

  const handleMouseLeave = useCallback(() => {
    setHovered(false)
    clearCycle()
    setFading(true)
    setTimeout(() => {
      setIdx(0)
      nextIdxRef.current = 1
      setFading(false)
    }, 180)
  }, [clearCycle])

  useEffect(() => () => clearCycle(), [clearCycle])

  return (
    <div
      style={{
        position: 'relative',
        background: '#141410',
        border: '0.5px solid rgba(156,180,6,0.15)',
        borderRadius: '4px',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Photo */}
      <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
        <Image
          src={aircraft.photos[idx]}
          alt={aircraft.name}
          fill
          style={{
            objectFit: 'cover',
            objectPosition: aircraft.photoPosition,
            opacity: fading ? 0 : 1,
            transition: 'opacity 180ms ease, transform 350ms cubic-bezier(0.16,1,0.3,1)',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
          }}
          sizes="(max-width: 768px) 100vw, 380px"
        />

        {/* Category badge */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            background: 'rgba(10,10,8,0.8)',
            backdropFilter: 'blur(8px)',
            border: '0.5px solid rgba(156,180,6,0.3)',
            padding: '4px 10px',
            borderRadius: '2px',
            fontFamily: 'var(--font-inter)',
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#9CB406',
          }}
        >
          {aircraft.tag}
        </div>

        {/* Photo dots */}
        {aircraft.photos.length > 1 && (
          <div
            style={{
              position: 'absolute',
              bottom: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '5px',
            }}
          >
            {aircraft.photos.map((_, i) => (
              <div
                key={i}
                style={{
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  background: i === idx ? '#9CB406' : 'rgba(242,239,230,0.3)',
                  transition: 'background 200ms',
                }}
              />
            ))}
          </div>
        )}

        {/* Charter This overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(10,10,8,0.55)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 250ms cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <button
            onClick={onCharter}
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              color: '#F2EFE6',
              background: 'transparent',
              border: '0.5px solid rgba(242,239,230,0.6)',
              padding: '10px 20px',
              cursor: 'pointer',
              borderRadius: '2px',
              transition: 'border-color 200ms, color 200ms',
            }}
          >
            Charter This →
          </button>
        </div>
      </div>

      {/* Card info */}
      <div style={{ padding: '20px' }}>
        <div
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '15px',
            fontWeight: 600,
            letterSpacing: '0.02em',
            color: '#F2EFE6',
            marginBottom: '12px',
          }}
        >
          {aircraft.name}
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
          }}
        >
          {aircraft.specs.slice(0, 4).map(spec => (
            <div key={spec.label}>
              <div
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '9px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#787868',
                  marginBottom: '2px',
                }}
              >
                {spec.label}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: '#ABABAB',
                }}
              >
                {spec.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────── FleetModal ─── */
function FleetModal({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState(0)
  const [photoIdx, setPhotoIdx] = useState(0)
  const [photoFading, setPhotoFading] = useState(false)
  const photoIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const nextPhotoRef = useRef(1)
  const aircraft = FLEET[activeTab]

  const clearPhotoCycle = useCallback(() => {
    if (photoIntervalRef.current) {
      clearInterval(photoIntervalRef.current)
      photoIntervalRef.current = null
    }
  }, [])

  const handlePhotoEnter = useCallback(() => {
    if (aircraft.photos.length <= 1) return
    nextPhotoRef.current = 1
    photoIntervalRef.current = setInterval(() => {
      setPhotoFading(true)
      setTimeout(() => {
        setPhotoIdx(nextPhotoRef.current)
        nextPhotoRef.current = (nextPhotoRef.current + 1) % aircraft.photos.length
        setPhotoFading(false)
      }, 300)
    }, 2400)
  }, [aircraft.photos.length])

  const handlePhotoLeave = useCallback(() => {
    clearPhotoCycle()
    setPhotoFading(true)
    setTimeout(() => {
      setPhotoIdx(0)
      nextPhotoRef.current = 1
      setPhotoFading(false)
    }, 300)
  }, [clearPhotoCycle])

  // Reset photo index and cycle when tab changes
  useEffect(() => {
    clearPhotoCycle()
    setPhotoIdx(0)
    nextPhotoRef.current = 1
  }, [activeTab, clearPhotoCycle])

  useEffect(() => () => clearPhotoCycle(), [clearPhotoCycle])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 500,
        background: '#0A0A08',
        overflowY: 'auto',
        animation: 'modalIn 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
      }}
    >
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Top bar */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          background: 'rgba(10,10,8,0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '0.5px solid rgba(242,239,230,0.07)',
          padding: '0 40px',
          display: 'flex',
          alignItems: 'center',
          gap: '40px',
          height: '64px',
        }}
      >
        <button
          onClick={onClose}
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '13px',
            color: '#ABABAB',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            flexShrink: 0,
            transition: 'color 200ms',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.color = '#F2EFE6')}
          onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.color = '#ABABAB')}
        >
          ← Back to site
        </button>

        {/* Tab bar */}
        <div style={{ display: 'flex', gap: '0' }}>
          {FLEET.map((a, i) => (
            <button
              key={a.name}
              onClick={() => setActiveTab(i)}
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '13px',
                fontWeight: activeTab === i ? 500 : 400,
                color: activeTab === i ? '#F2EFE6' : '#8A8A7A',
                background: 'none',
                border: 'none',
                borderBottom: activeTab === i
                  ? '1.5px solid #9CB406'
                  : '1.5px solid transparent',
                padding: '0 20px',
                height: '64px',
                cursor: 'pointer',
                transition: 'color 200ms, border-color 200ms',
              }}
            >
              {a.name}
            </button>
          ))}
        </div>
      </div>

      {/* Body */}
      <div
        className="fleet-modal-grid"
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '48px 40px 80px',
        }}
      >
        {/* Left: large photo */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '420px',
              borderRadius: '3px',
              overflow: 'hidden',
              cursor: 'pointer',
            }}
            onMouseEnter={handlePhotoEnter}
            onMouseLeave={handlePhotoLeave}
          >
            <Image
              src={aircraft.photos[photoIdx]}
              alt={aircraft.name}
              fill
              style={{
                objectFit: 'cover',
                objectPosition: aircraft.photoPosition,
                opacity: photoFading ? 0 : 1,
                transition: 'opacity 300ms ease',
              }}
              sizes="(max-width: 768px) 100vw, 500px"
            />
            <div
              style={{
                position: 'absolute',
                top: '14px',
                left: '14px',
                background: 'rgba(10,10,8,0.8)',
                backdropFilter: 'blur(8px)',
                border: '0.5px solid rgba(156,180,6,0.3)',
                padding: '5px 12px',
                borderRadius: '2px',
                fontFamily: 'var(--font-inter)',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#9CB406',
              }}
            >
              {aircraft.category}
            </div>
            {/* Photo dots */}
            {aircraft.photos.length > 1 && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: '6px',
                }}
              >
                {aircraft.photos.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      background: i === photoIdx ? '#9CB406' : 'rgba(242,239,230,0.3)',
                      transition: 'background 200ms',
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: specs */}
        <div>
          <div style={{ marginBottom: '8px' }}>
            <Tag>{aircraft.tag}</Tag>
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: '36px',
              fontWeight: 400,
              color: '#F2EFE6',
              margin: '12px 0 16px',
            }}
          >
            {aircraft.name}
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '14px',
              color: '#ABABAB',
              lineHeight: 1.8,
              marginBottom: '28px',
            }}
          >
            {aircraft.description}
          </p>

          {/* Specs 3×2 grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1px',
              background: 'rgba(242,239,230,0.07)',
              border: '0.5px solid rgba(242,239,230,0.07)',
              borderRadius: '3px',
              overflow: 'hidden',
              marginBottom: '28px',
            }}
          >
            {aircraft.specs.map(spec => (
              <div
                key={spec.label}
                style={{
                  padding: '16px 14px',
                  background: '#141410',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '9px',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#787868',
                    marginBottom: '5px',
                  }}
                >
                  {spec.label}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#F2EFE6',
                  }}
                >
                  {spec.value}
                </div>
              </div>
            ))}
          </div>

          <Button
            variant="primary"
            onClick={() => {
              onClose()
              setTimeout(() => scrollToSection('contact'), 300)
            }}
          >
            Charter This Aircraft
          </Button>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────── Fleet Section ─── */
export function Fleet() {
  const [modalOpen, setModalOpen] = useState(false)
  const { fleet } = CONTENT

  return (
    <>
      <section
        id="fleet"
        style={{
          background: '#0A0A08',
          padding: '72px 40px',
          borderTop: '0.5px solid rgba(242,239,230,0.07)',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {/* Header */}
          <ScrollReveal>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                marginBottom: '40px',
                flexWrap: 'wrap',
                gap: '20px',
              }}
            >
              <div>
                <div style={{ marginBottom: '12px' }}>
                  <Tag>{fleet.tag}</Tag>
                </div>
                <h2
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    fontSize: 'clamp(28px, 3.2vw, 44px)',
                    fontWeight: 400,
                    lineHeight: 1.15,
                    color: '#F2EFE6',
                    margin: 0,
                  }}
                >
                  {fleet.headline}{' '}
                  <em
                    style={{
                      fontFamily: 'var(--font-cormorant)',
                      fontStyle: 'italic',
                      color: '#9CB406',
                      fontWeight: 400,
                    }}
                  >
                    {fleet.headlineAccent}
                  </em>
                </h2>
              </div>

              <Button variant="outline" onClick={() => setModalOpen(true)}>
                {fleet.viewAll} →
              </Button>
            </div>
          </ScrollReveal>

          {/* Fleet cards: 1.5fr 1fr 1fr */}
          <div className="fleet-grid">
            {FLEET.map(aircraft => (
              <FleetCard
                key={aircraft.name}
                aircraft={aircraft}
                onCharter={() => scrollToSection('contact')}
              />
            ))}
          </div>
        </div>
      </section>

      {modalOpen && <FleetModal onClose={() => setModalOpen(false)} />}
    </>
  )
}
