"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ProductSearch } from "@/components/product-search"
import { ProductCategoryCard } from "@/components/product-category-card"
import Link from "next/link"
import { Beaker, Leaf, Shield, ArrowRight } from "lucide-react"

function ProductsContent() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("search") || ""

  const productCategories = [
    {
      title: "Aromatic Chemicals",
      description: "Premium quality aromatic compounds for various industries",
      icon: Beaker,
      href: "/products/aromatic-chemicals",
      productCount: 15,
      imagePath: "/images/aromatic-chemicals.jpg",
    },
    {
      title: "Essential Oils",
      description: "Pure and natural essential oils from finest sources",
      icon: Leaf,
      href: "/products/essential-oils",
      productCount: 12,
      imagePath: "/images/essential-oils.jpg",
    },
    {
      title: "Ayurvedic Herbs",
      description: "Traditional herbs for wellness and pharmaceutical use",
      icon: Leaf,
      href: "/products/ayurvedic-herbs",
      productCount: 16,
      imagePath: "/images/ayurvedic-herbs.jpg",
    },
    {
      title: "Ayurvedic Powders",
      description: "Finely processed herbal powders for various applications",
      icon: Leaf,
      href: "/products/ayurvedic-powders",
      productCount: 13,
      imagePath: "/images/ayurvedic-powders.jpg",
    },
    {
      title: "Metals",
      description: "High purity metals for industrial applications",
      icon: Shield,
      href: "/products/metals",
      productCount: 2,
      imagePath: "/images/metals.jpg",
    },
    {
      title: "Pharma Intermediates",
      description: "Quality intermediates for pharmaceutical manufacturing",
      icon: Beaker,
      href: "/products/pharma-intermediates",
      productCount: 8,
      imagePath: "/images/pharma-intermediates.jpg",
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary/95 to-primary text-primary-foreground py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-foreground/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-serif font-bold leading-tight">Our Products</h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto font-light">
              Comprehensive range of high-quality products across multiple categories
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      {searchQuery ? (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Product Search</h2>
            <ProductSearch initialQuery={searchQuery} />
          </div>
        </section>
      ) : (
        <>
          {/* Search Section */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-center">Find Your Products</h2>
                <ProductSearch />
              </div>
            </div>
          </section>

          {/* Product Categories */}
          <section className="py-20 md:py-28 bg-background">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Our Product Categories</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Comprehensive range of high-quality products across multiple categories
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {productCategories.map((category, index) => (
                  <ProductCategoryCard
                    key={index}
                    title={category.title}
                    description={category.description}
                    href={category.href}
                    icon={category.icon}
                    productCount={category.productCount}
                    imageQuery={category.title}
                    imagePath={category.imagePath}
                  />
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      <Footer />
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsContent />
    </Suspense>
  )
}
