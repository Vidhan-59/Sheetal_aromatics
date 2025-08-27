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
}

export function ProductCategoryCard({
  title,
  description,
  href,
  icon: Icon,
  productCount,
  imageQuery,
}: ProductCategoryCardProps) {
  return (
    <Link href={href} className="group block">
      <Card className="h-full transition-all duration-200 hover:shadow-md hover:scale-[1.02] performance-optimized">
        <div className="aspect-video relative overflow-hidden rounded-t-lg">
          <img
            src={`/placeholder.svg?height=200&width=300&query=${encodeURIComponent(imageQuery)}`}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-white/90 text-foreground">
              {productCount} Products
            </Badge>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-muted">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
