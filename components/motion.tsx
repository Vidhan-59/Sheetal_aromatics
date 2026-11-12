"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { cn } from "@/lib/utils"

/**
 * Runs the CSS animations inside it (e.g. `.ken-burns`) only while it is on
 * screen, so slow ambient motion never costs anything out of view.
 */
export function InViewMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      el.dataset.motion = entry.isIntersecting ? "running" : "paused"
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} data-motion="paused" className={className}>
      {children}
    </div>
  )
}

/**
 * Gentle vertical parallax for a background layer. The child should be taller
 * than its frame (the layer is oversized by `overflow` on each side) so the
 * movement never reveals an edge. Transform-only; skipped for reduced motion.
 */
export function Parallax({
  children,
  speed = 0.12,
  className,
}: {
  children: ReactNode
  /** Fraction of scroll distance the layer moves; small values read as depth. */
  speed?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let frame = 0
    const update = () => {
      frame = 0
      const parent = el.parentElement
      if (!parent) return
      const rect = parent.getBoundingClientRect()
      if (rect.bottom < 0 || rect.top > window.innerHeight) return
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * -speed
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      cancelAnimationFrame(frame)
    }
  }, [speed])

  return (
    <div ref={ref} className={cn("absolute inset-x-0 -top-[12%] -bottom-[12%] will-change-transform", className)}>
      {children}
    </div>
  )
}

/**
 * Muted background video that downloads and plays only once it nears the
 * viewport, and pauses when it leaves. A plain `autoPlay` video starts
 * downloading on page load even far below the fold. Visitors who prefer reduced
 * motion get the poster image only.
 */
export function LazyVideo({
  src,
  poster,
  label,
  className,
}: {
  src: string
  poster: string
  label: string
  className?: string
}) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.src) video.src = src
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { rootMargin: "200px 0px" },
    )
    io.observe(video)
    return () => io.disconnect()
  }, [src])

  return (
    <video
      ref={ref}
      className={cn("h-full w-full object-cover", className)}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      aria-label={label}
    />
  )
}
