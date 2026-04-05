'use client'

import { useState, useEffect } from 'react'

export function FloatCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2400)
    return () => clearTimeout(timer)
  }, [])

  const scrollToContact = () => {
    const el = document.getElementById('contact')
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 72
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 199,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '6px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 600ms cubic-bezier(0.16,1,0.3,1), transform 600ms cubic-bezier(0.16,1,0.3,1)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <button
        className="btn-primary"
        onClick={scrollToContact}
        style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '12px',
          fontWeight: 500,
          letterSpacing: '0.05em',
          background: '#9CB406',
          color: '#0A0A08',
          border: 'none',
          padding: '11px 22px',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          transition: 'transform 250ms ease',
          boxShadow: '0 4px 20px rgba(156,180,6,0.25)',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
      >
        Request a Quote
      </button>
      <span
        style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '10px',
          color: 'rgba(120,120,104,0.8)',
          letterSpacing: '0.05em',
        }}
      >
        Instant Quotes
      </span>
    </div>
  )
}
