import Link from "next/link"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/site-config"

/**
 * Sheetal Aromatics brand mark — the two interlocking hexagons from the
 * company artwork, redrawn as vector geometry (flat-top regular hexagons,
 * brand violet #6C6CFF, with the thin bond stub to the right of the upper
 * hexagon). Colours are intentionally hard-coded: this is the brand mark and
 * must not shift with the interface theme.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 132 118"
      className={cn("h-full w-auto", className)}
      aria-hidden="true"
      focusable="false"
    >
      <g fill="#6C6CFF">
        <polygon points="72,35 54.5,65.31 19.5,65.31 2,35 19.5,4.69 54.5,4.69" />
        <polygon points="126,79 108.5,109.31 73.5,109.31 56,79 73.5,48.69 108.5,48.69" />
      </g>
      <line x1="75" y1="21" x2="75" y2="44" stroke="#CCCCCC" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

type LogoSize = "sm" | "md" | "lg"

const sizes: Record<LogoSize, { word: string; mark: string; tagline: string; gap: string }> = {
  sm: { word: "text-[15px] leading-[1.02]", mark: "h-8", tagline: "text-[9px]", gap: "gap-2.5" },
  md: { word: "text-[19px] leading-[1.02]", mark: "h-10", tagline: "text-[10px]", gap: "gap-3" },
  lg: { word: "text-[26px] leading-[1.02]", mark: "h-14", tagline: "text-[13px]", gap: "gap-4" },
}

interface LogoProps {
  size?: LogoSize
  showTagline?: boolean
  /** Renders the wordmark in white for use on dark panels. */
  inverted?: boolean
  /** Renders a plain block instead of a link (for use inside another link). */
  asLink?: boolean
  className?: string
}

/**
 * Full lockup, laid out as in the original artwork: two-line wordmark on the
 * left, hexagon mark to its right, descriptor beneath.
 */
export function Logo({
  size = "md",
  showTagline = true,
  inverted = false,
  asLink = true,
  className,
}: LogoProps) {
  const s = sizes[size]

  const content = (
    <span className={cn("flex flex-col", className)}>
      <span className={cn("flex items-center", s.gap)}>
        <span
          className={cn(
            "font-logo font-black italic tracking-tight",
            s.word,
            inverted ? "text-white" : "text-[#CC3300]",
          )}
        >
          <span className="block">SHEETAL</span>
          <span className="block pl-[0.35em]">AROMATICS</span>
        </span>
        <LogoMark className={s.mark} />
      </span>
      {showTagline && (
        <span
          className={cn(
            "mt-1.5 font-medium tracking-wide",
            s.tagline,
            inverted ? "text-white/60" : "text-muted-foreground",
          )}
        >
          {siteConfig.tagline}
        </span>
      )}
    </span>
  )

  if (!asLink) return content

  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — home`}
      className="inline-flex rounded-sm transition-opacity hover:opacity-90"
    >
      {content}
    </Link>
  )
}
