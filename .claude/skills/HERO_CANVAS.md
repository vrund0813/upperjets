# SKILL: Hero Canvas Frame Scrubbing

## Overview
105 JPEG frames at 15fps drive the hero animation via scroll progress.
Files: `/public/Heromotion/ezgif-frame-001.jpg` → `ezgif-frame-105.jpg`

## Frame Math
```ts
const TOTAL_FRAMES = 105
const frameIndex = Math.round(progress * (TOTAL_FRAMES - 1))  // 0-indexed
const framePath = `/Heromotion/ezgif-frame-${String(frameIndex + 1).padStart(3, '0')}.jpg`
```

## Canvas Implementation
```tsx
'use client'
import { useEffect, useRef, useCallback } from 'react'

const TOTAL = 105
const PRELOAD_COUNT = 25

export function HeroCanvas({ progress }: { progress: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const framesRef = useRef<HTMLImageElement[]>(Array(TOTAL).fill(null))
  const loadedRef = useRef<boolean[]>(Array(TOTAL).fill(false))
  const rafRef = useRef<number>()

  const getPath = (i: number) =>
    `/Heromotion/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`

  // Load a single frame
  const loadFrame = useCallback((i: number) => {
    if (loadedRef.current[i]) return
    const img = new Image()
    img.onload = () => { loadedRef.current[i] = true }
    img.src = getPath(i)
    framesRef.current[i] = img
  }, [])

  // On mount: preload first 25 immediately, rest lazily
  useEffect(() => {
    for (let i = 0; i < PRELOAD_COUNT; i++) loadFrame(i)
    let i = PRELOAD_COUNT
    const tick = () => {
      if (i < TOTAL) { loadFrame(i); i++ }
      if (i < TOTAL) requestIdleCallback(tick)
    }
    requestIdleCallback(tick)
  }, [loadFrame])

  // Draw frame on canvas
  const draw = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const idx = Math.round(progress * (TOTAL - 1))
    const img = framesRef.current[idx]
    if (!img || !loadedRef.current[idx]) return
    // Cover-fill canvas
    const { width: cw, height: ch } = canvas
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
    const sw = img.naturalWidth * scale
    const sh = img.naturalHeight * scale
    ctx.clearRect(0, 0, cw, ch)
    ctx.drawImage(img, (cw - sw) / 2, (ch - sh) / 2, sw, sh)
  }, [progress])

  // Redraw on progress change
  useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(draw)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [draw])

  // Resize canvas to viewport
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ro = new ResizeObserver(() => {
      canvas.width = canvas.offsetWidth * devicePixelRatio
      canvas.height = canvas.offsetHeight * devicePixelRatio
      const ctx = canvas.getContext('2d')
      ctx?.scale(devicePixelRatio, devicePixelRatio)
      draw()
    })
    ro.observe(canvas)
    return () => ro.disconnect()
  }, [draw])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  )
}
```

## useScrollProgress Hook
```tsx
import { useState, useEffect, useRef } from 'react'

export function useScrollProgress(zoneRef: React.RefObject<HTMLElement>) {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const update = () => {
      if (!zoneRef.current) return
      const { top, height } = zoneRef.current.getBoundingClientRect()
      const denom = height - window.innerHeight
      setProgress(denom > 0 ? Math.max(0, Math.min(1, -top / denom)) : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [zoneRef])
  return progress
}
```

## Scroll Lock (prevent upward scroll past top)
```tsx
useEffect(() => {
  const prevent = (e: WheelEvent) => {
    if (window.scrollY <= 0 && e.deltaY < 0) e.preventDefault()
  }
  window.addEventListener('wheel', prevent, { passive: false })
  return () => window.removeEventListener('wheel', prevent)
}, [])
```

## Phase Values
```ts
const extOpacity = Math.max(0, 1 - progress * 2.2)
const intOpacity = progress > 0.4 ? Math.min(1, (progress - 0.4) * 3.5) : 0
const bridge     = Math.sin(Math.min(progress / 0.4, 1) * Math.PI) * 0.9
const extText    = Math.max(0, 1 - progress * 5)
const compassOp  = Math.max(0, 1 - progress * 8)
const aboutOp    = progress > 0.58 ? Math.min(1, (progress - 0.58) * 6) : 0
const aboutY     = Math.max(0, (1 - aboutOp) * 30)
```
