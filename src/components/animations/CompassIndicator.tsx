'use client'

interface CompassIndicatorProps {
  progress: number
  opacity: number
}

export function CompassIndicator({ progress, opacity }: CompassIndicatorProps) {
  const circumference = 2 * Math.PI * 20
  const dashOffset = circumference * (1 - progress)

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        opacity,
        transition: 'opacity 300ms ease',
        pointerEvents: 'none',
      }}
    >
      {/* SVG Compass */}
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        {/* Outer ring — rotates clockwise 12s */}
        <g style={{ animation: 'spin 12s linear infinite', transformOrigin: '32px 32px' }}>
          <circle
            cx="32"
            cy="32"
            r="30"
            stroke="rgba(156,180,6,0.25)"
            strokeWidth="0.5"
          />
          {/* 8 tick marks at 45° intervals */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180
            const cos = Math.cos(angle - Math.PI / 2)
            const sin = Math.sin(angle - Math.PI / 2)
            const x1 = 32 + 27 * cos
            const y1 = 32 + 27 * sin
            const x2 = 32 + 30 * cos
            const y2 = 32 + 30 * sin
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(156,180,6,0.5)"
                strokeWidth="1"
              />
            )
          })}
        </g>

        {/* Progress arc */}
        <circle
          cx="32"
          cy="32"
          r="20"
          stroke="rgba(156,180,6,0.4)"
          strokeWidth="1"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform="rotate(-90 32 32)"
        />

        {/* Inner needle — counter-rotates 8s */}
        <g style={{ animation: 'spinR 8s linear infinite', transformOrigin: '32px 32px' }}>
          {/* North — green */}
          <line x1="32" y1="32" x2="32" y2="18" stroke="#9CB406" strokeWidth="1.5" strokeLinecap="round" />
          {/* South — gray */}
          <line x1="32" y1="32" x2="32" y2="44" stroke="rgba(170,170,170,0.4)" strokeWidth="1" strokeLinecap="round" />
          {/* Center dot */}
          <circle cx="32" cy="32" r="2" fill="#9CB406" />
        </g>
      </svg>

      {/* Label */}
      <span
        style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '9px',
          fontWeight: 500,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(242,239,230,0.5)',
          animation: 'cpulse 2s ease-in-out infinite',
        }}
      >
        Scroll to enter
      </span>
    </div>
  )
}
