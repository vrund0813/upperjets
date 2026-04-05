'use client'

import { Button } from '@/components/ui/Button'
import { Tag } from '@/components/ui/Tag'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { LandingAnimation } from '@/components/animations/LandingAnimation'
import { CONTENT } from '@/data/content'

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export function Charter() {
  const { charter } = CONTENT

  return (
    <section
      id="charter"
      style={{
        background: '#141410',
        padding: '72px 40px',
        borderTop: '0.5px solid rgba(242,239,230,0.07)',
      }}
    >
      <div
        className="charter-grid"
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        {/* Left column */}
        <div>
          <ScrollReveal>
            <div style={{ marginBottom: '20px' }}>
              <Tag>{charter.tag}</Tag>
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: 'clamp(28px, 3.2vw, 44px)',
                fontWeight: 400,
                lineHeight: 1.15,
                color: '#F2EFE6',
                marginBottom: '20px',
                marginTop: '0',
              }}
            >
              {charter.headline}{' '}
              <em
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontStyle: 'italic',
                  color: '#9CB406',
                  fontWeight: 400,
                }}
              >
                {charter.headlineAccent}
              </em>
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '14.5px',
                color: '#ABABAB',
                lineHeight: 1.9,
                maxWidth: '440px',
              }}
            >
              {charter.body}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            {/* Pillar rows */}
            <div
              style={{
                border: '0.5px solid rgba(242,239,230,0.07)',
                borderRadius: '4px',
                margin: '32px 0',
                overflow: 'hidden',
              }}
            >
              {charter.pillars.map((pillar, i) => (
                <PillarRow
                  key={pillar.number}
                  pillar={pillar}
                  last={i === charter.pillars.length - 1}
                />
              ))}
            </div>

            <Button variant="outline" onClick={() => scrollToSection('contact')}>
              {charter.cta}
            </Button>
          </ScrollReveal>
        </div>

        {/* Right column — landing animation */}
        <ScrollReveal delay={180}>
          <LandingAnimation />
        </ScrollReveal>
      </div>
    </section>
  )
}

interface Pillar {
  number: string
  title: string
  description: string
}

function PillarRow({ pillar, last }: { pillar: Pillar; last: boolean }) {
  return (
    <div
      className="pillar-row"
      style={{
        padding: '18px 20px',
        borderBottom: last ? 'none' : '0.5px solid rgba(242,239,230,0.07)',
        display: 'flex',
        gap: '16px',
        alignItems: 'flex-start',
        cursor: 'default',
        background: 'transparent',
        transition:
          'padding-left 250ms cubic-bezier(0.16,1,0.3,1), background 250ms cubic-bezier(0.16,1,0.3,1)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.background = '#1C1C17'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.background = 'transparent'
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-cormorant)',
          fontStyle: 'italic',
          fontSize: '15px',
          color: '#9CB406',
          minWidth: '24px',
          lineHeight: 1,
          paddingTop: '2px',
          flexShrink: 0,
        }}
      >
        {pillar.number}
      </span>
      <div>
        <div
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '13px',
            fontWeight: 600,
            color: '#F2EFE6',
            marginBottom: '4px',
            letterSpacing: '0.01em',
          }}
        >
          {pillar.title}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '13px',
            color: '#8A8A7A',
            lineHeight: 1.6,
          }}
        >
          {pillar.description}
        </div>
      </div>
    </div>
  )
}
