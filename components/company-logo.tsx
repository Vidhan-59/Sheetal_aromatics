import Link from "next/link"

interface CompanyLogoProps {
  size?: "sm" | "md" | "lg"
  showTagline?: boolean
  className?: string
}

export function CompanyLogo({ size = "md", showTagline = true, className = "" }: CompanyLogoProps) {
  const sizeClasses = {
    sm: {
      container: "gap-2",
      logo: "w-8 h-8",
      logoText: "text-lg",
      title: "text-lg md:text-xl",
      tagline: "text-xs",
    },
    md: {
      container: "gap-3",
      logo: "w-12 h-12",
      logoText: "text-xl",
      title: "text-2xl md:text-3xl",
      tagline: "text-sm",
    },
    lg: {
      container: "gap-4",
      logo: "w-16 h-16",
      logoText: "text-2xl",
      title: "text-3xl md:text-4xl",
      tagline: "text-base",
    },
  }

  const classes = sizeClasses[size]

  return (
    <Link href="/" className={`flex items-center ${classes.container} ${className}`}>
      <div className={`${classes.logo} bg-primary rounded-lg flex items-center justify-center shadow-lg`}>
        <span className={`text-primary-foreground font-bold ${classes.logoText}`}>SA</span>
      </div>
      <div>
        <h1 className={`${classes.title} font-bold text-primary font-serif leading-tight`}>Sheetal Aromatics</h1>
        {showTagline && (
          <p className={`${classes.tagline} text-muted-foreground font-medium`}>Premium Chemicals Since 2005</p>
        )}
      </div>
    </Link>
  )
}
