'use client'

import { Shield, Clock, FileText, MapPin } from 'lucide-react'

const ITEMS = [
  { icon: Shield, label: 'ARGUS Gold', sub: 'Safety certified' },
  { icon: Clock, label: 'Instant Quotes', sub: 'Anytime' },
  { icon: FileText, label: 'FAA Part 135', sub: 'Licensed' },
  { icon: MapPin, label: 'All Americas', sub: 'US·MX·CN' },
]

// Triplicated for seamless marquee loop
const ALL_ITEMS = [...ITEMS, ...ITEMS, ...ITEMS]

function TrustItem({ icon: Icon, label, sub }: { icon: typeof Shield; label: string; sub: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '0 36px',
        height: '62px',
        flexShrink: 0,
        whiteSpace: 'nowrap',
      }}
    >
      <div
        style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          border: '0.5px solid rgba(156,180,6,0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon size={13} strokeWidth={1.5} color="#9CB406" />
      </div>
      <div>
        <div
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '12px',
            fontWeight: 600,
            color: '#F2EFE6',
            lineHeight: 1.2,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '10px',
            color: 'rgba(120,120,104,1)',
            lineHeight: 1.2,
            marginTop: '2px',
          }}
        >
          {sub}
        </div>
      </div>
    </div>
  )
}

function Divider() {
  return (
    <div
      style={{
        width: '0.5px',
        height: '28px',
        background: 'rgba(242,239,230,0.07)',
        flexShrink: 0,
      }}
    />
  )
}

export function TrustBar() {
  return (
    <div
      style={{
        height: '62px',
        background: '#0D0D0B',
        borderTop: '0.5px solid rgba(156,180,6,0.2)',
        borderBottom: '0.5px solid rgba(242,239,230,0.05)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: 'max-content',
          animation: 'marquee 28s linear infinite',
        }}
      >
        {ALL_ITEMS.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
            <TrustItem icon={item.icon} label={item.label} sub={item.sub} />
            <Divider />
          </div>
        ))}
      </div>
    </div>
  )
}
