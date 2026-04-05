'use client'

import { useState, useEffect } from 'react'
import { useScrolled, useActiveSection } from '@/lib/hooks'

const NAV_LINKS = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Charter', id: 'charter' },
  { label: 'Fleet', id: 'fleet' },
]

function LogoMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path
        d="M4 20 L14 6 L24 20"
        stroke="#9CB406"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M8 20 L20 20"
        stroke="#9CB406"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Nav() {
  const scrolled = useScrolled(60)
  const activeId = useActiveSection(['home', 'charter', 'fleet', 'destinations', 'about', 'management', 'contact'])
  const [mounted, setMounted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  // Close drawer on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    if (id === 'about') {
      window.scrollTo({ top: window.innerHeight * 2.5, behavior: 'smooth' })
      return
    }
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 72
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
  }

  return (
    <>
      <nav
        aria-label="Main navigation"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '72px',
          zIndex: 200,
          display: 'flex',
          alignItems: 'center',
          padding: '0 40px',
          background: scrolled ? 'rgba(10,10,8,0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '0.5px solid rgba(242,239,230,0.06)' : 'none',
          transition: 'background 400ms ease, backdrop-filter 400ms ease, border-color 400ms ease',
          animation: mounted ? 'navIn 0.7s cubic-bezier(0.16,1,0.3,1) forwards' : 'none',
          transform: mounted ? undefined : 'translateY(-100%)',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo('home')}
          aria-label="Upper Jets — return to top"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: 0,
            marginRight: 'auto',
            textDecoration: 'none',
          }}
        >
          <LogoMark />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1px' }}>
            <span style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '14px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#F2EFE6', lineHeight: 1 }}>
              Upper Jets
            </span>
            <span style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '8px', fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(171,171,171,0.55)', lineHeight: 1 }}>
              Private Aviation
            </span>
          </div>
        </button>

        {/* Desktop Nav links */}
        <div className="nav-desktop-links">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`nav-link ${activeId === link.id ? 'active' : ''}`}
              aria-current={activeId === link.id ? 'page' : undefined}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '13px',
                fontWeight: 400,
                letterSpacing: '0.03em',
                color: activeId === link.id ? '#F2EFE6' : 'rgba(171,171,171,0.75)',
                padding: '4px 0',
                transition: 'color 250ms ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#F2EFE6')}
              onMouseLeave={e => (e.currentTarget.style.color = activeId === link.id ? '#F2EFE6' : 'rgba(171,171,171,0.75)')}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Hamburger button — mobile only */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(v => !v)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{
            display: 'block', width: '22px', height: '1.5px', background: '#F2EFE6',
            transition: 'transform 250ms ease, opacity 250ms ease',
            transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
          }} />
          <span style={{
            display: 'block', width: '22px', height: '1.5px', background: '#F2EFE6',
            transition: 'opacity 250ms ease',
            opacity: menuOpen ? 0 : 1,
          }} />
          <span style={{
            display: 'block', width: '22px', height: '1.5px', background: '#F2EFE6',
            transition: 'transform 250ms ease, opacity 250ms ease',
            transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
          }} />
        </button>
      </nav>

      {/* Mobile drawer backdrop */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 198,
            background: 'rgba(10,10,8,0.7)',
            backdropFilter: 'blur(4px)',
          }}
        />
      )}

      {/* Mobile drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '280px',
          zIndex: 199,
          background: 'rgba(20,20,16,0.98)',
          backdropFilter: 'blur(20px)',
          borderLeft: '0.5px solid rgba(242,239,230,0.07)',
          padding: '88px 32px 40px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 350ms cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {NAV_LINKS.map((link) => (
          <button
            key={link.id}
            onClick={() => scrollTo(link.id)}
            aria-current={activeId === link.id ? 'page' : undefined}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '15px',
              fontWeight: activeId === link.id ? 500 : 400,
              letterSpacing: '0.02em',
              color: activeId === link.id ? '#F2EFE6' : 'rgba(171,171,171,0.75)',
              padding: '12px 0',
              textAlign: 'left',
              borderBottom: '0.5px solid rgba(242,239,230,0.06)',
              transition: 'color 200ms',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#F2EFE6')}
            onMouseLeave={e => (e.currentTarget.style.color = activeId === link.id ? '#F2EFE6' : 'rgba(171,171,171,0.75)')}
          >
            {link.label}
          </button>
        ))}

      </div>
    </>
  )
}
