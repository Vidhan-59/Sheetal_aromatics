import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { ArrowRight } from "lucide-react"

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
    <Card className="h-full transition-all duration-300 hover:shadow-xl hover:border-primary/30 border border-border/50 overflow-hidden">
      <CardContent className="p-6 md:p-8 flex flex-col h-full">
        {/* Icon and Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-foreground">{title}</h3>
            <p className="text-sm text-primary font-medium">{productCount} products</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
          {description}
        </p>

        {/* View Products Button */}
        <Link href={href} className="block">
          <Button 
            className="w-full bg-background border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            variant="outline"
          >
            View Products <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
