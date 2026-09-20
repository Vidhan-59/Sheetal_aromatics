import type React from "react"
import { cn } from "@/lib/utils"

export function Container({
  className,
  children,
  size = "default",
}: {
  className?: string
  children: React.ReactNode
  size?: "default" | "narrow" | "wide"
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        size === "narrow" && "max-w-3xl",
        size === "default" && "max-w-7xl",
        size === "wide" && "max-w-[1400px]",
        className,
      )}
    >
      {children}
    </div>
  )
}

export function Section({
  className,
  children,
  tone = "paper",
  id,
  spacing = "default",
}: {
  className?: string
  children: React.ReactNode
  tone?: "paper" | "muted" | "card" | "forest" | "none"
  id?: string
  spacing?: "default" | "tight" | "loose"
}) {
  return (
    <section
      id={id}
      className={cn(
        tone === "paper" && "bg-background",
        tone === "muted" && "bg-muted",
        tone === "card" && "bg-card",
        tone === "forest" && "bg-forest-900 text-forest-50",
        spacing === "tight" && "py-12 sm:py-16",
        spacing === "default" && "py-16 sm:py-20 lg:py-24",
        spacing === "loose" && "py-20 sm:py-28 lg:py-32",
        className,
      )}
    >
      {children}
    </section>
  )
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("eyebrow", className)}>
      <span aria-hidden="true" className="h-px w-6 bg-current" />
      {children}
    </p>
  )
}

interface SectionHeadingProps {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  /** Heading level — pages must keep exactly one h1. */
  as?: "h1" | "h2" | "h3"
  align?: "left" | "center"
  className?: string
  inverted?: boolean
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  as: Tag = "h2",
  align = "left",
  className,
  inverted = false,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow className={cn(align === "center" && "justify-center", inverted && "text-brass-400")}>{eyebrow}</Eyebrow>}
      <Tag
        className={cn(
          "mt-4 font-semibold tracking-tight",
          Tag === "h1" ? "text-4xl sm:text-5xl lg:text-[3.4rem] lg:leading-[1.05]" : "text-3xl sm:text-4xl",
          inverted ? "text-white" : "text-foreground",
        )}
      >
        {title}
      </Tag>
      {description && (
        <div className={cn("mt-5 text-base leading-relaxed sm:text-lg", inverted ? "text-forest-100/80" : "text-muted-foreground")}>
          {description}
        </div>
      )}
    </div>
  )
}

/** Small key/value pair used in specification tables and fact strips. */
export function DataRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-1 border-b border-border py-3 last:border-0 sm:grid-cols-[minmax(0,13rem)_1fr] sm:gap-6">
      <dt className="text-sm font-medium text-muted-foreground">{label}</dt>
      <dd className="text-sm text-foreground">{value}</dd>
    </div>
  )
}
