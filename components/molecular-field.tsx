"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

/**
 * Ambient background: slowly drifting aromatic (benzene) rings, faintly bonded
 * to their neighbours, with an occasional brass pulse travelling along a bond.
 * Echoes the two-hexagon brand mark and the aromatic chemistry the firm trades.
 *
 * Cheap by design: one canvas, capped device-pixel ratio, molecule count scaled
 * to the area, paused when off-screen or the tab is hidden, and a single static
 * frame for visitors who prefer reduced motion.
 */

interface Ring {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  angle: number
  spin: number
  /** Indices (0–5) of ring atoms carrying a short substituent chain. */
  tails: number[]
}

interface Pulse {
  a: number
  b: number
  t: number
}

const TONES = {
  dark: { ring: "203,164,103", web: "194,220,207", pulse: "214,178,112" },
  light: { ring: "18,67,47", web: "18,67,47", pulse: "166,122,46" },
} as const

export function MolecularField({
  tone = "dark",
  density = 1,
  className,
}: {
  tone?: keyof typeof TONES
  /** Multiplier on the number of rings. */
  density?: number
  className?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const colours = TONES[tone]
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let width = 0
    let height = 0
    let rings: Ring[] = []
    let pulses: Pulse[] = []
    let frame = 0
    let last = 0
    let nextPulse = 0
    let visible = true

    const rand = (min: number, max: number) => min + Math.random() * (max - min)

    function seed() {
      const count = Math.round(Math.min(30, Math.max(9, (width * height) / 36000)) * density)
      rings = Array.from({ length: count }, () => ({
        x: rand(0, width),
        y: rand(0, height),
        r: rand(13, 24),
        vx: rand(-6, 6),
        vy: rand(-4, 4),
        angle: rand(0, Math.PI),
        spin: rand(-0.06, 0.06),
        tails: Math.random() < 0.6 ? [Math.floor(rand(0, 6))].concat(Math.random() < 0.3 ? [Math.floor(rand(0, 6))] : []) : [],
      }))
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75)
      width = rect.width
      height = rect.height
      canvas!.width = Math.round(width * dpr)
      canvas!.height = Math.round(height * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
    }

    function vertex(ring: Ring, i: number) {
      const a = ring.angle + (i * Math.PI) / 3
      return [ring.x + Math.cos(a) * ring.r, ring.y + Math.sin(a) * ring.r] as const
    }

    function drawRing(ring: Ring) {
      ctx!.lineWidth = 1.2
      ctx!.strokeStyle = `rgba(${colours.ring},0.34)`
      ctx!.beginPath()
      for (let i = 0; i <= 6; i++) {
        const [x, y] = vertex(ring, i % 6)
        if (i === 0) ctx!.moveTo(x, y)
        else ctx!.lineTo(x, y)
      }
      ctx!.stroke()

      // Alternating inner double bonds (Kekulé form).
      ctx!.strokeStyle = `rgba(${colours.ring},0.2)`
      ctx!.beginPath()
      for (let i = 0; i < 6; i += 2) {
        const [x1, y1] = vertex(ring, i)
        const [x2, y2] = vertex(ring, i + 1)
        const k = 0.22
        ctx!.moveTo(x1 + (ring.x - x1) * k, y1 + (ring.y - y1) * k)
        ctx!.lineTo(x2 + (ring.x - x2) * k, y2 + (ring.y - y2) * k)
      }
      ctx!.stroke()

      // Short zig-zag substituents.
      ctx!.strokeStyle = `rgba(${colours.ring},0.28)`
      for (const i of ring.tails) {
        const a = ring.angle + (i * Math.PI) / 3
        const [x0, y0] = vertex(ring, i)
        const x1 = x0 + Math.cos(a) * ring.r
        const y1 = y0 + Math.sin(a) * ring.r
        const x2 = x1 + Math.cos(a + 0.9) * ring.r
        const y2 = y1 + Math.sin(a + 0.9) * ring.r
        ctx!.beginPath()
        ctx!.moveTo(x0, y0)
        ctx!.lineTo(x1, y1)
        ctx!.lineTo(x2, y2)
        ctx!.stroke()
      }
    }

    const LINK = 170

    function draw(time: number) {
      ctx!.clearRect(0, 0, width, height)

      // Faint web between neighbouring molecules.
      for (let i = 0; i < rings.length; i++) {
        for (let j = i + 1; j < rings.length; j++) {
          const dx = rings[i].x - rings[j].x
          const dy = rings[i].y - rings[j].y
          const d = Math.hypot(dx, dy)
          if (d < LINK) {
            ctx!.strokeStyle = `rgba(${colours.web},${(1 - d / LINK) * 0.1})`
            ctx!.lineWidth = 1
            ctx!.beginPath()
            ctx!.moveTo(rings[i].x, rings[i].y)
            ctx!.lineTo(rings[j].x, rings[j].y)
            ctx!.stroke()
          }
        }
      }

      for (const ring of rings) drawRing(ring)

      // Brass pulses travelling along a bond.
      for (const p of pulses) {
        const A = rings[p.a]
        const B = rings[p.b]
        if (!A || !B) continue
        const e = p.t < 0.5 ? 2 * p.t * p.t : 1 - Math.pow(-2 * p.t + 2, 2) / 2
        const x = A.x + (B.x - A.x) * e
        const y = A.y + (B.y - A.y) * e
        const fade = Math.sin(Math.PI * p.t)
        ctx!.fillStyle = `rgba(${colours.pulse},${0.16 * fade})`
        ctx!.beginPath()
        ctx!.arc(x, y, 9, 0, Math.PI * 2)
        ctx!.fill()
        ctx!.fillStyle = `rgba(${colours.pulse},${0.85 * fade})`
        ctx!.beginPath()
        ctx!.arc(x, y, 2.2, 0, Math.PI * 2)
        ctx!.fill()
      }
      void time
    }

    function step(time: number) {
      const dt = Math.min(0.05, last ? (time - last) / 1000 : 0)
      last = time
      for (const ring of rings) {
        ring.x += ring.vx * dt
        ring.y += ring.vy * dt
        ring.angle += ring.spin * dt
        const m = ring.r * 3
        if (ring.x < -m) ring.x = width + m
        if (ring.x > width + m) ring.x = -m
        if (ring.y < -m) ring.y = height + m
        if (ring.y > height + m) ring.y = -m
      }
      if (time > nextPulse) {
        nextPulse = time + rand(900, 1900)
        const a = Math.floor(rand(0, rings.length))
        let best = -1
        let bestD = Infinity
        rings.forEach((r, j) => {
          const d = Math.hypot(r.x - rings[a].x, r.y - rings[a].y)
          if (j !== a && d < LINK && d < bestD) {
            best = j
            bestD = d
          }
        })
        if (best >= 0) pulses.push({ a, b: best, t: 0 })
      }
      pulses = pulses.filter((p) => (p.t += dt / 1.4) < 1)
      draw(time)
      frame = visible ? requestAnimationFrame(step) : 0
    }

    function start() {
      if (!frame && visible && !reduced) {
        last = 0
        frame = requestAnimationFrame(step)
      }
    }
    function stop() {
      cancelAnimationFrame(frame)
      frame = 0
    }

    resize()
    if (reduced) draw(0)
    else start()

    const ro = new ResizeObserver(() => {
      resize()
      if (reduced) draw(0)
    })
    ro.observe(canvas)
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && document.visibilityState === "visible"
      if (visible) start()
      else stop()
    })
    io.observe(canvas)
    const onVisibility = () => {
      visible = document.visibilityState === "visible"
      if (visible) start()
      else stop()
    }
    document.addEventListener("visibilitychange", onVisibility)

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [tone, density])

  return <canvas ref={canvasRef} aria-hidden="true" className={cn("pointer-events-none absolute inset-0 h-full w-full", className)} />
}
