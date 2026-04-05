'use client'

import { CONTENT } from '@/data/content'

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
  else window.scrollTo({ top: 0, behavior: 'smooth' })
}

function scrollToAbout() {
  window.scrollTo({ top: window.innerHeight * 2.5, behavior: 'smooth' })
}

/* Instagram SVG icon */
function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function Footer() {
  const { company, footer } = CONTENT

  return (
    <footer
      style={{
        background: '#0A0A08',
        borderTop: '0.5px solid rgba(242,239,230,0.07)',
        padding: '64px 40px 0',
      }}
    >
      <div
        className="footer-grid"
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        {/* Col 1 — Brand */}
        <div>
          <div
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#F2EFE6',
              marginBottom: '6px',
            }}
          >
            Upper Jets
          </div>
          <div
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#9CB406',
              marginBottom: '16px',
            }}
          >
            {company.tagline}
          </div>
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '12.5px',
              color: '#787868',
              lineHeight: 1.7,
              maxWidth: '260px',
              marginBottom: '24px',
            }}
          >
            {footer.description}
          </p>

          {/* Instagram button */}
          <a
            href={company.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Upper Jets on Instagram"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              border: '0.5px solid rgba(242,239,230,0.12)',
              borderRadius: '3px',
              padding: '9px 14px',
              fontFamily: 'var(--font-inter)',
              fontSize: '12px',
              fontWeight: 500,
              color: '#ABABAB',
              textDecoration: 'none',
              transition: 'border-color 250ms, color 250ms, background 250ms',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.borderColor = 'rgba(156,180,6,0.4)'
              el.style.color = '#9CB406'
              el.style.background = 'rgba(156,180,6,0.04)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.borderColor = 'rgba(242,239,230,0.12)'
              el.style.color = '#ABABAB'
              el.style.background = 'transparent'
            }}
          >
            <InstagramIcon />
            {footer.instagramLabel}
          </a>
        </div>

        {/* Col 2 — Navigation */}
        <FooterCol title="Navigation">
          <FooterLink onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Home
          </FooterLink>
          <FooterLink onClick={scrollToAbout}>About</FooterLink>
          <FooterLink onClick={() => scrollToSection('charter')}>Charter</FooterLink>
          <FooterLink onClick={() => scrollToSection('fleet')}>Fleet</FooterLink>
          <FooterLink onClick={() => scrollToSection('destinations')}>Destinations</FooterLink>
          <FooterLink onClick={() => scrollToSection('management')}>Leadership</FooterLink>
        </FooterCol>

        {/* Col 3 — Coverage */}
        <FooterCol title="Coverage">
          <FooterText>United States</FooterText>
          <FooterText>Mexico</FooterText>
          <FooterText>Caribbean</FooterText>
          <FooterText>South America</FooterText>
          <FooterText style={{ marginTop: '8px', fontSize: '11px', color: '#787868' }}>
            {company.coordinates}
          </FooterText>
        </FooterCol>

        {/* Col 4 — Contact */}
        <FooterCol title="Contact">
          <a
            href={`tel:${company.phone.replace(/[\s()]/g, '')}`}
            style={footerLinkStyle}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#9CB406')}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#ABABAB')}
          >
            {company.phone}
          </a>
          <a
            href={`mailto:${company.email}`}
            style={footerLinkStyle}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#9CB406')}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#ABABAB')}
          >
            {company.email}
          </a>
          <FooterText style={{ marginTop: '4px' }}>{company.base}</FooterText>
          <FooterText>{company.airports}</FooterText>
          <button
            onClick={() => scrollToSection('contact')}
            style={{
              marginTop: '16px',
              fontFamily: 'var(--font-inter)',
              fontSize: '12px',
              fontWeight: 600,
              color: '#9CB406',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0',
              letterSpacing: '0.04em',
              transition: 'opacity 200ms',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.opacity = '0.7')}
            onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.opacity = '1')}
          >
            Request a quote →
          </button>
        </FooterCol>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: '0.5px solid rgba(242,239,230,0.07)',
          padding: '20px 0',
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '11px',
            color: '#787868',
            margin: 0,
          }}
        >
          {footer.copyright}
        </p>

        <div style={{ display: 'flex', gap: '10px' }}>
          {company.certifications.map(cert => (
            <span
              key={cert}
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                color: '#9CB406',
                border: '0.5px solid rgba(156,180,6,0.25)',
                padding: '4px 10px',
                borderRadius: '2px',
              }}
            >
              {cert}
            </span>
          ))}
        </div>
      </div>
    </footer>
  )
}

/* ─── Helpers ─── */
const footerLinkStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-inter)',
  fontSize: '13px',
  color: '#ABABAB',
  textDecoration: 'none',
  marginBottom: '8px',
  transition: 'color 200ms',
}

function FooterCol({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <div
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '9px',
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#787868',
          marginBottom: '18px',
        }}
      >
        {title}
      </div>
      {children}
    </div>
  )
}

function FooterLink({
  onClick,
  children,
}: {
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'block',
        fontFamily: 'var(--font-inter)',
        fontSize: '13px',
        color: '#ABABAB',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '0',
        marginBottom: '8px',
        textAlign: 'left',
        transition: 'color 200ms',
      }}
      onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.color = '#F2EFE6')}
      onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.color = '#ABABAB')}
    >
      {children}
    </button>
  )
}

function FooterText({
  children,
  style,
}: {
  children: React.ReactNode
  style?: React.CSSProperties
}) {
  return (
    <div
      style={{
        fontFamily: 'var(--font-inter)',
        fontSize: '13px',
        color: '#8A8A7A',
        marginBottom: '8px',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
