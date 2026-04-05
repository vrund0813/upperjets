'use client'

import { useEffect, useRef } from 'react'

// ─── Image crossfade + scroll-driven scale (active) ──────────────────────────
// Uses UpperJets-16.jpg (exterior) and UpperJets-02.jpg (interior).
// Both opacity AND scale are driven directly on DOM elements via refs — no CSS
// transitions, no React re-renders — for butter-smooth 60fps scroll animation.

export function HeroCanvas({ progress }: { progress: number }) {
  const extRef = useRef<HTMLImageElement>(null)
  const intRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const p = progress

    // Single crossfade parameter — guarantees extOp + intOp = 1 at all times.
    // Transition: p=0.30 (exterior fully visible) → p=0.65 (interior fully visible).
    // No opacity gap, no black flash.
    const t = Math.min(1, Math.max(0, (p - 0.30) / 0.35))
    const extOp = 1 - t
    const intOp = t

    // Scale: exterior zooms in slowly; interior pulls back from oversize to 1×
    const extScale = 1 + p * 0.35
    const intScale = Math.max(1, 1.4 - t * 0.4)

    if (extRef.current) {
      extRef.current.style.opacity = String(extOp)
      extRef.current.style.transform = `scale(${extScale})`
    }
    if (intRef.current) {
      intRef.current.style.opacity = String(intOp)
      intRef.current.style.transform = `scale(${intScale})`
    }
  }, [progress])

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {/* Exterior — UpperJets-16.jpg */}
      <img
        ref={extRef}
        src="/images/UpperJets-16.jpg"
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          transformOrigin: '52% 48%',
          filter: 'brightness(0.42) saturate(0.88)',
          willChange: 'transform, opacity',
        }}
      />
      {/* Interior — UpperJets-02.jpg */}
      <img
        ref={intRef}
        src="/images/UpperJets-02.jpg"
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 25%',
          opacity: 0,
          filter: 'brightness(0.42)',
          willChange: 'transform, opacity',
        }}
      />
    </div>
  )
}

// ─── Frame-scrubbing canvas (commented out — kept for future use) ─────────────
/*
const TOTAL = 105
const PRELOAD_COUNT = 25

export function HeroCanvas({ progress }: { progress: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const framesRef = useRef<HTMLImageElement[]>(Array(TOTAL).fill(null))
  const loadedRef = useRef<boolean[]>(Array(TOTAL).fill(false))
  const progressRef = useRef(progress)
  const rafRef = useRef<number>(0)
  const dprRef = useRef(1)

  const getPath = (i: number) =>
    `/Heromotion/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`

  const draw = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const idx = Math.round(progressRef.current * (TOTAL - 1))
    const img = framesRef.current[idx]
    if (!img || !loadedRef.current[idx]) return
    const cw = canvas.offsetWidth
    const ch = canvas.offsetHeight
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
    const sw = img.naturalWidth * scale
    const sh = img.naturalHeight * scale
    ctx.clearRect(0, 0, cw, ch)
    ctx.drawImage(img, (cw - sw) / 2, (ch - sh) / 2, sw, sh)
  }

  const scheduleFrame = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(draw)
  }

  useEffect(() => {
    progressRef.current = progress
    scheduleFrame()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress])

  useEffect(() => {
    const links = Array.from({ length: 5 }, (_, i) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.setAttribute('fetchpriority', 'high')
      link.href = getPath(i)
      document.head.appendChild(link)
      return link
    })
    return () => links.forEach(l => l.remove())
  }, [])

  useEffect(() => {
    const loadFrame = (i: number) => {
      if (loadedRef.current[i]) return
      const img = new Image()
      img.onload = () => {
        loadedRef.current[i] = true
        const needed = Math.round(progressRef.current * (TOTAL - 1))
        if (i === needed) scheduleFrame()
      }
      img.src = getPath(i)
      framesRef.current[i] = img
    }

    for (let i = 0; i < PRELOAD_COUNT; i++) loadFrame(i)
    let i = PRELOAD_COUNT
    const tick = () => {
      if (i < TOTAL) { loadFrame(i); i++ }
      if (i < TOTAL) requestIdleCallback(tick)
    }
    requestIdleCallback(tick)

    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ro = new ResizeObserver(() => {
      const dpr = window.devicePixelRatio || 1
      dprRef.current = dpr
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      }
      draw()
    })
    ro.observe(canvas)
    return () => ro.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  )
}
*/
