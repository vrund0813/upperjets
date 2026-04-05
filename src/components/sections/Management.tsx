'use client'

import Image from 'next/image'
import { Tag } from '@/components/ui/Tag'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { CONTENT } from '@/data/content'
import { TEAM } from '@/data/team'

export function Management() {
  const { management } = CONTENT

  return (
    <section
      id="management"
      style={{
        background: '#0A0A08',
        padding: '72px 40px',
        borderTop: '0.5px solid rgba(242,239,230,0.07)',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <ScrollReveal>
          <div style={{ marginBottom: '12px' }}>
            <Tag>{management.tag}</Tag>
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(28px, 3.2vw, 44px)',
              fontWeight: 400,
              lineHeight: 1.15,
              color: '#F2EFE6',
              marginBottom: '48px',
              marginTop: '16px',
            }}
          >
            {management.headline}{' '}
            <em
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontStyle: 'italic',
                color: '#9CB406',
                fontWeight: 400,
              }}
            >
              {management.headlineAccent}
            </em>
          </h2>
        </ScrollReveal>

        {/* 4-column grid */}
        <div className="mgmt-grid">
          {TEAM.map((member, i) => (
            <ScrollReveal key={member.name + member.title} delay={i * 80}>
              <MgmtCard member={member} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function MgmtCard({
  member,
}: {
  member: { title: string; name: string; photo: string }
}) {
  return (
    <div className="mgmt-card" style={{ perspective: '1000px' }}>
      <div
        className="mgmt-inner"
        style={{
          borderRadius: '4px',
          overflow: 'hidden',
          border: '0.5px solid rgba(242,239,230,0.07)',
        }}
      >
        {/* Card top — photo */}
        <div
          style={{
            position: 'relative',
            height: '220px',
            overflow: 'hidden',
            background: '#1C1C17',
          }}
        >
          <Image
            src={member.photo}
            alt={member.name}
            fill
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
            sizes="(max-width: 768px) 50vw, 280px"
          />
          {/* Green gradient line at bottom */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: '20%',
              right: '20%',
              height: '1px',
              background:
                'linear-gradient(90deg, transparent, rgba(156,180,6,0.5), transparent)',
            }}
          />
        </div>

        {/* Card bottom */}
        <div
          style={{
            padding: '20px 20px 24px',
            background: '#141410',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '9px',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#9CB406',
              marginBottom: '6px',
            }}
          >
            {member.title}
          </div>
          <div
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '15px',
              fontWeight: 600,
              color: '#F2EFE6',
              marginBottom: '0',
            }}
          >
            {member.name}
          </div>
        </div>
      </div>
    </div>
  )
}
