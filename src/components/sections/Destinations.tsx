'use client'

import { Tag } from '@/components/ui/Tag'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { CONTENT } from '@/data/content'
import { REGIONS, DESTINATIONS, HIGHLIGHTED_DESTINATIONS } from '@/data/destinations'

export function Destinations() {
  const { destinations } = CONTENT

  return (
    <section
      id="destinations"
      style={{
        background: '#141410',
        padding: '72px 40px',
        borderTop: '0.5px solid rgba(242,239,230,0.07)',
      }}
    >
      <div
        className="dest-grid"
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        {/* Left column */}
        <div>
          <ScrollReveal>
            <div style={{ marginBottom: '20px' }}>
              <Tag>{destinations.tag}</Tag>
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: 'clamp(28px, 3.2vw, 44px)',
                fontWeight: 400,
                lineHeight: 1.15,
                color: '#F2EFE6',
                marginBottom: '20px',
                marginTop: 0,
              }}
            >
              {destinations.headline}{' '}
              <em
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontStyle: 'italic',
                  color: '#9CB406',
                  fontWeight: 400,
                }}
              >
                {destinations.headlineAccent}
              </em>
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '14.5px',
                color: '#ABABAB',
                lineHeight: 1.9,
                marginBottom: '32px',
                maxWidth: '380px',
              }}
            >
              {destinations.body}
            </p>
          </ScrollReveal>

          {/* Region rows */}
          <ScrollReveal delay={80}>
            <div
              style={{
                border: '0.5px solid rgba(242,239,230,0.07)',
                borderRadius: '4px',
                overflow: 'hidden',
              }}
            >
              {REGIONS.map((region, i) => (
                <RegionRow
                  key={region.name}
                  region={region}
                  last={i === REGIONS.length - 1}
                />
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Right column — destination chips */}
        <ScrollReveal delay={180}>
          <div style={{ marginBottom: '20px' }}>
            <Tag>{destinations.popularTag}</Tag>
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginTop: '16px',
            }}
          >
            {DESTINATIONS.map(dest => {
              const highlighted = HIGHLIGHTED_DESTINATIONS.has(dest)
              return (
                <DestChip key={dest} name={dest} highlighted={highlighted} />
              )
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

function RegionRow({
  region,
  last,
}: {
  region: { name: string; cities: string }
  last: boolean
}) {
  return (
    <div
      className="pillar-row"
      style={{
        padding: '16px 20px',
        borderBottom: last ? 'none' : '0.5px solid rgba(242,239,230,0.07)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        background: 'transparent',
        transition:
          'padding-left 250ms cubic-bezier(0.16,1,0.3,1), background 250ms cubic-bezier(0.16,1,0.3,1)',
        cursor: 'default',
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
          fontFamily: 'var(--font-inter)',
          fontSize: '13px',
          fontWeight: 600,
          color: '#F2EFE6',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}
      >
        {region.name}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '12px',
          color: '#8A8A7A',
          textAlign: 'right',
          flexShrink: 0,
          maxWidth: '55%',
        }}
      >
        {region.cities}
      </span>
    </div>
  )
}

function DestChip({ name, highlighted }: { name: string; highlighted: boolean }) {
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '6px 14px',
        border: highlighted
          ? '0.5px solid rgba(156,180,6,0.3)'
          : '0.5px solid rgba(242,239,230,0.07)',
        borderRadius: '2px',
        fontFamily: 'var(--font-inter)',
        fontSize: '12px',
        fontWeight: highlighted ? 500 : 400,
        color: highlighted ? '#9CB406' : '#8A8A7A',
        cursor: 'default',
        transition:
          'transform 250ms cubic-bezier(0.16,1,0.3,1), border-color 250ms, color 250ms',
        userSelect: 'none',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLSpanElement
        el.style.transform = 'translateY(-2px)'
        el.style.borderColor = 'rgba(156,180,6,0.5)'
        el.style.color = '#F2EFE6'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLSpanElement
        el.style.transform = 'translateY(0)'
        el.style.borderColor = highlighted
          ? 'rgba(156,180,6,0.3)'
          : 'rgba(242,239,230,0.07)'
        el.style.color = highlighted ? '#9CB406' : '#8A8A7A'
      }}
    >
      {name}
    </span>
  )
}
