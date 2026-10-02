/* eslint-disable @next/next/no-img-element -- pre-sized WebP renditions with a hand-written srcset; the
   Next image optimiser is disabled for this site (see next.config.mjs). */
import { cn } from "@/lib/utils"

/**
 * Company photography and video used outside the product catalogue.
 * Each image has a 1600px and an 800px WebP rendition in public/images/site/.
 */
export const siteImages = {
  warehouse: {
    src: "/images/site/warehouse",
    alt: "Chemical drums and IBC containers palletised and wrapped for export, with shipping containers at the dock",
  },
  botanicals: {
    src: "/images/site/botanicals",
    alt: "Essential oils in amber and clear bottles with eucalyptus, lemongrass, cloves, mint and sandalwood on a lab bench",
  },
  "qc-lab": {
    src: "/images/site/qc-lab",
    alt: "Analysts testing samples in a quality-control laboratory",
  },
  plant: {
    src: "/images/site/plant",
    alt: "Stainless-steel process vessels and control panel in a chemical production facility",
  },
} as const

export type SiteImageName = keyof typeof siteImages

export function SiteImage({
  name,
  sizes = "100vw",
  priority = false,
  className,
}: {
  name: SiteImageName
  sizes?: string
  priority?: boolean
  className?: string
}) {
  const image = siteImages[name]
  return (
    <img
      src={`${image.src}-800.webp`}
      srcSet={`${image.src}-800.webp 800w, ${image.src}.webp 1600w`}
      sizes={sizes}
      width={1600}
      height={893}
      alt={image.alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
      className={cn("h-full w-full object-cover", className)}
    />
  )
}

/** Muted, looping background clip of the quality-control lab. */
export function QualityLabVideo({ className }: { className?: string }) {
  return (
    <video
      className={cn("h-full w-full object-cover", className)}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/media/quality-lab-poster.webp"
      aria-label="Laboratory analysts weighing and testing samples"
    >
      <source src="/media/quality-lab.mp4" type="video/mp4" />
    </video>
  )
}
