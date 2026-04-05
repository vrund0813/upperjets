'use client'

import styles from './LandingAnimation.module.css'

const ALTITUDE_TICKS = ['FL350', 'FL200', 'FL100', '3000', 'GND']

/* ─── Airport infrastructure SVG ───────────────────────
   Sits at bottom: 30% (tarmac line), extends upward.
   viewBox bottom (y=210) = tarmac. Buildings rise upward.
   ─────────────────────────────────────────────────── */
function Buildings() {
  return (
    <div className={styles.buildings}>
      <svg
        viewBox="0 0 520 210"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
        preserveAspectRatio="xMaxYMax meet"
      >
        {/* ── Left hangar with arched roof ── */}
        <path
          d="M12,148 Q90,118 168,148 L168,210 L12,210 Z"
          fill="rgba(11,11,9,0.94)" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"
        />
        {/* Hangar arch detail */}
        <path
          d="M12,148 Q90,118 168,148"
          fill="none" stroke="rgba(245,245,240,0.05)" strokeWidth="0.5"
        />
        {/* Hangar door center divide */}
        <line x1="90" y1="148" x2="90" y2="210" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
        {/* Hangar door gap detail */}
        <line x1="88" y1="148" x2="88" y2="210" stroke="rgba(255,255,255,0.025)" strokeWidth="0.3" />
        <line x1="92" y1="148" x2="92" y2="210" stroke="rgba(255,255,255,0.025)" strokeWidth="0.3" />
        {/* Hangar small windows */}
        <rect x="22"  y="154" width="7" height="5" rx="0.5" fill="rgba(185,201,67,0.06)" />
        <rect x="108" y="154" width="7" height="5" rx="0.5" fill="rgba(185,201,67,0.07)" />
        <rect x="140" y="154" width="7" height="5" rx="0.5" fill="rgba(185,201,67,0.05)" />

        {/* ── Second smaller hangar ── */}
        <path
          d="M178,156 Q228,138 278,156 L278,210 L178,210 Z"
          fill="rgba(10,10,8,0.92)" stroke="rgba(255,255,255,0.035)" strokeWidth="0.5"
        />
        <path d="M178,156 Q228,138 278,156" fill="none" stroke="rgba(245,245,240,0.045)" strokeWidth="0.4" />
        <line x1="228" y1="156" x2="228" y2="210" stroke="rgba(255,255,255,0.035)" strokeWidth="0.4" />
        <rect x="188" y="162" width="6" height="4" rx="0.5" fill="rgba(185,201,67,0.06)" />
        <rect x="252" y="162" width="6" height="4" rx="0.5" fill="rgba(185,201,67,0.05)" />

        {/* ── Main terminal building ── */}
        <rect
          x="290" y="138" width="230" height="72"
          fill="rgba(12,12,10,0.95)" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"
        />
        {/* Terminal roof line accent */}
        <line x1="290" y1="138" x2="520" y2="138" stroke="rgba(245,245,240,0.06)" strokeWidth="0.5" />
        {/* Terminal upper windows row */}
        {[308, 326, 344, 362, 380, 398, 416, 434, 452, 470, 488].map((x, i) => (
          <rect key={x} x={x} y={148} width="10" height="6" rx="1"
            fill={`rgba(185,201,67,${[0.10, 0.07, 0.12, 0.08, 0.09, 0.11, 0.07, 0.10, 0.08, 0.09, 0.06][i]})`} />
        ))}
        {/* Terminal lower windows row */}
        {[308, 344, 380, 416, 452, 488].map((x, i) => (
          <rect key={x} x={x} y={162} width="10" height="6" rx="1"
            fill={`rgba(185,201,67,${[0.06, 0.08, 0.05, 0.07, 0.06, 0.05][i]})`} />
        ))}
        {/* Terminal facade horizontal line */}
        <line x1="290" y1="175" x2="520" y2="175" stroke="rgba(255,255,255,0.025)" strokeWidth="0.3" />
        {/* Terminal brand accent stripe */}
        <line x1="290" y1="177" x2="520" y2="177" stroke="rgba(185,201,67,0.06)" strokeWidth="0.8" />

        {/* ── Control tower (rises above terminal) ── */}
        {/* Tower shaft */}
        <rect
          x="374" y="28" width="22" height="110"
          fill="rgba(10,10,8,0.97)" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"
        />
        {/* Tower cab (wider section at top) */}
        <path
          d="M356,16 L356,38 Q356,42 360,42 L410,42 Q414,42 414,38 L414,16 Z"
          fill="rgba(13,13,11,0.97)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"
        />
        {/* Tower cab base underline */}
        <line x1="356" y1="42" x2="414" y2="42" stroke="rgba(245,245,240,0.06)" strokeWidth="0.4" />
        {/* Tower cab windows */}
        <rect x="363" y="22" width="10" height="8" rx="1" fill="rgba(185,201,67,0.18)">
          <animate attributeName="opacity" values="0.8;1.0;0.8" dur="3.2s" repeatCount="indefinite" />
        </rect>
        <rect x="380" y="22" width="10" height="8" rx="1" fill="rgba(185,201,67,0.14)">
          <animate attributeName="opacity" values="1.0;0.7;1.0" dur="4.1s" repeatCount="indefinite" />
        </rect>
        <rect x="397" y="22" width="10" height="8" rx="1" fill="rgba(185,201,67,0.16)">
          <animate attributeName="opacity" values="0.9;1.0;0.9" dur="2.8s" repeatCount="indefinite" />
        </rect>
        {/* Antenna */}
        <line x1="385" y1="0" x2="385" y2="16" stroke="rgba(200,200,200,0.14)" strokeWidth="1" />
        {/* Aviation beacon — red blink */}
        <circle cx="385" cy="4" r="2.5" fill="#cc2020" opacity="0.6">
          <animate attributeName="opacity" values="0.15;0.85;0.15" dur="1.6s" repeatCount="indefinite" />
        </circle>

        {/* ── Background parked aircraft near terminal ── */}
        {/* Aircraft A — facing right */}
        <g transform="translate(186, 210) scale(0.62)" opacity="0.22">
          <ellipse cx="52" cy="-3" rx="50" ry="4.5" fill="rgba(190,190,185,0.7)" />
          <path d="M52,-3 L28,-18 Q26,-20 29,-19 L72,-7Z" fill="rgba(190,190,185,0.55)" />
          <path d="M52,-3 L28,12 Q26,14 29,13 L72,1Z"    fill="rgba(190,190,185,0.55)" />
          <path d="M8,-3 L5,-11 Q4,-13 6,-12 L14,-4Z"    fill="rgba(190,190,185,0.45)" />
        </g>
        {/* Aircraft B — facing left (mirrored) */}
        <g transform="translate(310, 210) scale(-0.48, 0.48)" opacity="0.16">
          <ellipse cx="52" cy="-3" rx="50" ry="4.5" fill="rgba(190,190,185,0.7)" />
          <path d="M52,-3 L28,-18 Q26,-20 29,-19 L72,-7Z" fill="rgba(190,190,185,0.55)" />
          <path d="M52,-3 L28,12 Q26,14 29,13 L72,1Z"    fill="rgba(190,190,185,0.55)" />
          <path d="M8,-3 L5,-11 Q4,-13 6,-12 L14,-4Z"    fill="rgba(190,190,185,0.45)" />
        </g>
      </svg>
    </div>
  )
}

/* ─── Mid-field parked aircraft ──────────────────────── */
function BgPlane({ className }: { className: string }) {
  return (
    <div className={className}>
      <svg viewBox="0 0 100 20" width="90" height="18" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="54" cy="9" rx="46" ry="4" fill="rgba(180,180,175,0.65)" />
        <path d="M54,9 L32,-2 Q30,-4 33,-3 L68,5Z"   fill="rgba(180,180,175,0.50)" />
        <path d="M54,9 L32,20 Q30,22 33,21 L68,13Z"  fill="rgba(180,180,175,0.50)" />
        <path d="M10,9 L7,2  Q6,0  8,1  L15,7Z"      fill="rgba(180,180,175,0.40)" />
      </svg>
    </div>
  )
}

/* ─── Car SVG ─────────────────────────────────────────── */
function CarSvg() {
  return (
    <svg className={styles.carSvg} viewBox="0 0 220 90" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cbody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(225,225,220,0.20)" />
          <stop offset="45%"  stopColor="rgba(170,170,165,0.11)" />
          <stop offset="100%" stopColor="rgba(55,55,60,0.08)" />
        </linearGradient>
        <linearGradient id="cglass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="rgba(185,201,67,0.18)" />
          <stop offset="100%" stopColor="rgba(90,140,200,0.10)" />
        </linearGradient>
      </defs>
      {/* Body */}
      <path d="M18,61 C18,47 24,43 38,41 L76,33 Q110,25 144,33 L182,41 C196,43 202,47 202,61 Z"
        fill="url(#cbody)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
      {/* Cabin */}
      <path d="M76,41 L90,21 Q110,13 130,21 L144,41 Z"
        fill="rgba(190,190,185,0.13)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.4" />
      {/* Front windshield */}
      <path d="M144,41 L178,45 L170,21 Q156,13 136,21 L130,21 Z" fill="url(#cglass)" opacity="0.75" />
      {/* Rear glass */}
      <path d="M76,41 L42,45 L50,21 Q66,13 84,21 L90,21 Z" fill="url(#cglass)" opacity="0.55" />
      {/* Accent stripe */}
      <path d="M40,52 L180,52" stroke="rgba(185,201,67,0.13)" strokeWidth="1.2" strokeLinecap="round" />
      {/* Roof specular */}
      <path d="M91,23 L104,17 Q110,14 116,17 L129,23 Q119,21 110,21 Q101,21 91,23 Z" fill="rgba(255,255,255,0.05)" />
      {/* Door line */}
      <line x1="110" y1="41" x2="110" y2="62" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
      {/* Front wheel */}
      <circle cx="166" cy="67" r="15" fill="rgba(22,22,25,0.96)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
      <circle cx="166" cy="67" r="5.5" fill="rgba(150,150,160,0.12)" stroke="rgba(255,255,255,0.09)" strokeWidth="0.4" />
      {/* Rear wheel */}
      <circle cx="54" cy="67" r="15" fill="rgba(22,22,25,0.96)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
      <circle cx="54" cy="67" r="5.5" fill="rgba(150,150,160,0.12)" stroke="rgba(255,255,255,0.09)" strokeWidth="0.4" />
      {/* Headlights */}
      <ellipse cx="198" cy="50" rx="3.5" ry="2" fill="rgba(255,250,220,0.16)" />
      <ellipse cx="196" cy="56" rx="3"   ry="1.5" fill="rgba(255,250,220,0.09)" />
      {/* Headlight glow */}
      <ellipse cx="203" cy="52" rx="6" ry="3" fill="rgba(255,250,220,0.05)" opacity="0.7">
        <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2.4s" repeatCount="indefinite" />
      </ellipse>
      {/* Taillights */}
      <ellipse cx="22" cy="50" rx="3" ry="2" fill="rgba(220,55,55,0.18)" />
      {/* Front bumper */}
      <path d="M196,50 Q210,53 208,63 L196,63 Z" fill="rgba(200,200,200,0.06)" />
      {/* Rear bumper */}
      <path d="M24,50 Q10,53 12,63 L24,63 Z" fill="rgba(200,200,200,0.05)" />
    </svg>
  )
}

/* ─── Jet SVG ─────────────────────────────────────────── */
function JetSvg() {
  return (
    <svg className={styles.jetSvg} viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="jf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(230,230,225,0.22)" />
          <stop offset="35%"  stopColor="rgba(200,200,195,0.14)" />
          <stop offset="100%" stopColor="rgba(80,80,90,0.10)" />
        </linearGradient>
        <linearGradient id="js" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.00)" />
          <stop offset="40%"  stopColor="rgba(255,255,255,0.10)" />
          <stop offset="60%"  stopColor="rgba(255,255,255,0.00)" />
        </linearGradient>
        <linearGradient id="jt" x1="0" y1="1" x2="0.3" y2="0">
          <stop offset="0%"   stopColor="rgba(185,201,67,0.10)" />
          <stop offset="100%" stopColor="rgba(185,201,67,0.36)" />
        </linearGradient>
        <linearGradient id="jw" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(200,200,200,0.12)" />
          <stop offset="100%" stopColor="rgba(120,120,130,0.06)" />
        </linearGradient>
        <linearGradient id="je" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="rgba(160,160,170,0.18)" />
          <stop offset="100%" stopColor="rgba(100,100,110,0.08)" />
        </linearGradient>
        <linearGradient id="jws" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="rgba(185,201,67,0.25)" />
          <stop offset="100%" stopColor="rgba(100,160,200,0.15)" />
        </linearGradient>
        <radialGradient id="jgs" cx="0.5" cy="0" r="0.8">
          <stop offset="0%"   stopColor="rgba(0,0,0,0.15)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>

      {/* Fuselage */}
      <path d="M42 72 C42 62,55 55,75 53 L310 48 Q340 47,358 52 L372 58 Q380 62,380 68 Q380 74,372 78 L358 84 Q340 89,310 88 L75 83 C55 81,42 78,42 72Z"
        fill="url(#jf)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
      <path d="M75 55 L310 50 Q340 49,358 53 L370 58 Q365 56,340 54 L310 53 L75 58Z"
        fill="url(#js)" opacity="0.7" />
      <path d="M80 78 L320 83 Q345 84,355 82" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
      <path d="M65 68 L360 63" fill="none" stroke="rgba(185,201,67,0.12)" strokeWidth="1.2" strokeLinecap="round" />

      {/* Windshield */}
      <path d="M358 56 Q365 54,374 60 L377 65 Q375 62,370 58 L362 55Z" fill="url(#jws)" opacity="0.9" />
      <path d="M353 57 L358 56 L362 55 L370 58 L365 59 L358 58Z" fill="url(#jws)" opacity="0.6" />
      <line x1="362" y1="55" x2="365" y2="59" stroke="rgba(255,255,255,0.08)" strokeWidth="0.4" />

      {/* Vertical stabilizer */}
      <path d="M52 53 L38 18 Q36 12,42 12 L68 16 Q72 17,72 21 L66 52Z"
        fill="url(#jt)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
      <path d="M50 45 L44 22 Q48 20,55 22 L58 42Z" fill="rgba(185,201,67,0.06)" />

      {/* Horizontal stabilizers */}
      <path d="M42 14 L18 6 Q14 5,16 8 L36 16Z" fill="rgba(200,200,200,0.10)" stroke="rgba(255,255,255,0.04)" strokeWidth="0.4" />
      <path d="M56 16 L72 10 Q76 9,74 12 L60 18Z" fill="rgba(200,200,200,0.08)" stroke="rgba(255,255,255,0.04)" strokeWidth="0.4" />

      {/* Wings */}
      <path d="M160 53 L115 20 Q112 16,118 17 L205 38 Q195 44,175 50Z"
        fill="url(#jw)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
      <path d="M115 20 L108 14 Q106 12,110 13 L117 18Z" fill="rgba(185,201,67,0.15)" />
      <line x1="145" y1="38" x2="120" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="0.4" />
      <line x1="170" y1="46" x2="135" y2="28" stroke="rgba(255,255,255,0.02)" strokeWidth="0.3" />
      <path d="M155 50 L175 49 L195 40 L185 42Z" fill="rgba(255,255,255,0.03)" />
      <path d="M160 83 L115 116 Q112 120,118 119 L205 98 Q195 92,175 86Z"
        fill="url(#jw)" opacity="0.7" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
      <path d="M115 116 L108 122 Q106 124,110 123 L117 118Z" fill="rgba(185,201,67,0.10)" />

      {/* Engines */}
      <path d="M72 52 L65 42 L58 42 L64 53Z" fill="rgba(180,180,185,0.08)" />
      <ellipse cx="58" cy="42" rx="16" ry="5" fill="url(#je)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.4" />
      <ellipse cx="74" cy="42" rx="2"  ry="5" fill="rgba(40,40,50,0.3)"  />
      <ellipse cx="42" cy="42" rx="2"  ry="4" fill="rgba(30,30,35,0.4)"  />
      <path d="M72 84 L65 94 L58 94 L64 83Z" fill="rgba(180,180,185,0.06)" />
      <ellipse cx="58" cy="94" rx="16" ry="5" fill="url(#je)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.4" />
      <ellipse cx="74" cy="94" rx="2"  ry="5" fill="rgba(40,40,50,0.25)" />
      <ellipse cx="42" cy="94" rx="2"  ry="4" fill="rgba(30,30,35,0.3)"  />

      {/* Cabin windows */}
      {[330, 320, 310, 300, 290, 280, 270, 260, 250, 240, 230].map((x, i) => (
        <rect key={x} x={x} y={61 + i * 0.4} width="4" height="2.5" rx="1"
          fill={`rgba(185,201,67,${(0.14 - i * 0.008).toFixed(3)})`} />
      ))}

      {/* Landing gear */}
      <g opacity="0.5">
        <line x1="340" y1="86" x2="340" y2="102" stroke="rgba(200,200,200,0.2)" strokeWidth="1" />
        <ellipse cx="340" cy="104" rx="3" ry="2" fill="rgba(50,50,55,0.4)" />
        <ellipse cx="340" cy="106" rx="6" ry="1.5" fill="url(#jgs)" />
      </g>
      <g opacity="0.4">
        <line x1="200" y1="92" x2="198" y2="108" stroke="rgba(200,200,200,0.18)" strokeWidth="1" />
        <line x1="192" y1="92" x2="190" y2="108" stroke="rgba(200,200,200,0.18)" strokeWidth="1" />
        <ellipse cx="198" cy="110" rx="4" ry="2.2" fill="rgba(50,50,55,0.35)" />
        <ellipse cx="190" cy="110" rx="4" ry="2.2" fill="rgba(50,50,55,0.35)" />
        <line x1="188" y1="108" x2="200" y2="108" stroke="rgba(200,200,200,0.12)" strokeWidth="0.6" />
      </g>

      {/* Nav lights */}
      <circle cx="378" cy="68" r="1.5" fill="#b9c943" opacity="0.7">
        <animate attributeName="opacity" values="0.4;0.9;0.4" dur="1.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="112" cy="17" r="1.2" fill="#fff" opacity="0.3">
        <animate attributeName="opacity" values="0;1;0" dur="1.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="40" cy="13" r="1.5" fill="#ff2020" opacity="0.5">
        <animate attributeName="opacity" values="0.2;0.9;0.2" dur="1s" repeatCount="indefinite" />
      </circle>
      <circle cx="200" cy="90" r="1" fill="#ff2020" opacity="0.3">
        <animate attributeName="opacity" values="0.1;0.7;0.1" dur="1s" begin="0.5s" repeatCount="indefinite" />
      </circle>
      <ellipse cx="365" cy="80" rx="8" ry="2" fill="rgba(255,250,230,0.08)" opacity="0.6">
        <animate attributeName="opacity" values="0.4;0.7;0.4" dur="2s" repeatCount="indefinite" />
      </ellipse>
    </svg>
  )
}

/* ─── Main component ──────────────────────────────────── */
export function LandingAnimation() {
  return (
    <div className={styles.animationBox}>
      {/* Scene — back to front */}
      <div className={styles.horizonGlow} />
      <Buildings />
      <div className={styles.tarmac} />
      <div className={styles.runwayLine} />
      <div className={styles.runwayCenterline} />

      {/* Effects */}
      <div className={styles.touchdownFlare} />

      {/* Car */}
      <div className={styles.carWrapper}>
        <CarSvg />
      </div>

      {/* Jet */}
      <div className={styles.jetWrapper}>
        <div className={styles.engineGlow} />
        <div className={styles.engineGlow2} />
        <JetSvg />
      </div>

      {/* HUD */}
      <div className={styles.altitudeTicks}>
        {ALTITUDE_TICKS.map(label => (
          <div key={label} className={styles.tick}>
            <div className={styles.tickLine} />
            <div className={styles.tickLabel}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
