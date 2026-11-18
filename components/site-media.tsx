/* eslint-disable @next/next/no-img-element -- pre-sized WebP renditions with a hand-written srcset; the
   Next image optimiser is disabled for this site (see next.config.mjs). */
import { cn } from "@/lib/utils"
import { InViewMotion, LazyVideo } from "@/components/motion"

/**
 * Representative photography and video used outside the product catalogue.
 * These are stock or illustrative images, not photographs of the company's own
 * premises, so they are labelled "Representative image" wherever they illustrate
 * content (pass `representative`). Replace with the company's own photos when
 * available. Each image has a 1600px and an 800px WebP rendition in public/images/site/.
 */
export const siteImages = {
  warehouse: {
    src: "/images/site/warehouse",
    small: true,
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
    small: true,
    alt: "Stainless-steel process vessels and control panel in a chemical production facility",
  },
  /** AI-generated ambient background for the home hero; not a photograph of the company's site. */
  "plant-exterior": {
    src: "/images/site/plant-exterior",
    alt: "Illustrative view of a chemical processing plant at dusk",
    /** Also has a 480px rendition: on phones it sits faded under a dark wash, so it is fetched tiny. */
    small: true,
  },
} as const satisfies Record<string, { src: string; alt: string; small?: boolean }>

export type SiteImageName = keyof typeof siteImages

export function SiteImage({
  name,
  sizes = "100vw",
  priority = false,
  kenBurns = false,
  representative = false,
  className,
}: {
  name: SiteImageName
  sizes?: string
  priority?: boolean
  /** Slow ambient zoom/pan while on screen (disabled for reduced motion). */
  kenBurns?: boolean
  /** Shows a "Representative image" label; the parent must be `relative`. */
  representative?: boolean
  className?: string
}) {
  const image: { src: string; alt: string; small?: boolean } = siteImages[name]
  const img = (
    <img
      src={`${image.src}-800.webp`}
      srcSet={`${image.small ? `${image.src}-480.webp 480w, ` : ""}${image.src}-800.webp 800w, ${image.src}.webp 1600w`}
      sizes={sizes}
      width={1600}
      height={893}
      alt={image.alt}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? undefined : "async"}
      fetchPriority={priority ? "high" : undefined}
      className={cn("h-full w-full object-cover", kenBurns && "ken-burns", className)}
    />
  )
  const media = kenBurns ? <InViewMotion className="h-full w-full overflow-hidden">{img}</InViewMotion> : img
  if (!representative) return media
  return (
    <>
      {media}
      <span className="pointer-events-none absolute bottom-2 left-2 rounded-sm bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white">
        Representative image
      </span>
    </>
  )
}

/** Muted, looping background clip of the quality-control lab; loads only when scrolled near. */
export function QualityLabVideo({ className }: { className?: string }) {
  return (
    <LazyVideo
      src="/media/quality-lab.mp4"
      poster="/media/quality-lab-poster.webp"
      label="Representative video: laboratory analysts weighing and testing samples"
      className={className}
    />
  )
}
