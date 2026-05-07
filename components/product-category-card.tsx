import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"

interface ProductCategoryCardProps {
  title: string
  description: string
  href: string
  icon: LucideIcon
  productCount: number
  imageQuery: string
  imagePath?: string
}

export function ProductCategoryCard({
  title,
  description,
  href,
  icon: Icon,
  productCount,
  imageQuery,
  imagePath,
}: ProductCategoryCardProps) {
  return (
    <Link href={href} className="group block h-full">
      <Card className="h-full transition-all duration-300 hover:shadow-xl hover:border-primary/30 premium-shadow lift-on-hover overflow-hidden">
        <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-secondary/30 to-secondary/10">
          <img
            src={imagePath || `/placeholder.svg?height=200&width=300&query=${encodeURIComponent(imageQuery)}`}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-4 right-4 transform transition-all duration-300 group-hover:scale-110">
            <Badge variant="secondary" className="bg-primary text-primary-foreground shadow-lg font-semibold">
              {productCount} Items
            </Badge>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 flex-shrink-0">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{description}</p>
              <div className="mt-4 flex items-center text-primary font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Explore
                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
