"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ProductSearch } from "@/components/product-search"
import Link from "next/link"
import { Beaker, Leaf, Shield, ArrowRight } from "lucide-react"

function ProductsContent() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("search") || ""

  const productCategories = [
    {
      title: "Aromatic Chemicals",
      description:
        "Premium quality aromatic compounds including Benzyl Acetate, Benzyl Alcohol, Phenyl Ethyl Isobutyrate, and more",
      icon: Beaker,
      href: "/products/aromatic-chemicals",
      productCount: "15+ Products",
    },
    {
      title: "Essential Oils",
      description:
        "Pure and natural essential oils including Lemongrass, Cinnamon, Clove, Eucalyptus, Peppermint, and more",
      icon: Leaf,
      href: "/products/essential-oils",
      productCount: "12+ Products",
    },
    {
      title: "Ayurvedic Herbs",
      description: "Traditional herbs including Ashwagandha, Amla, Harad, Baheda, Gokhru, Shatavari, and more",
      icon: Leaf,
      href: "/products/ayurvedic-herbs",
      productCount: "16+ Products",
    },
    {
      title: "Ayurvedic Powders",
      description:
        "Finely processed herbal powders including Ashwagandha Powder, Amla Powder, Triphala Powder, and more",
      icon: Leaf,
      href: "/products/ayurvedic-powders",
      productCount: "13+ Products",
    },
    {
      title: "Metals",
      description: "High purity metals including Selenium Metal Powder (99.9%) and Iodine (99.5%)",
      icon: Shield,
      href: "/products/metals",
      productCount: "2+ Products",
    },
    {
      title: "Pharma Intermediates",
      description:
        "Quality intermediates including Diphenyl Acetonitrile, Diphenyl Acetic Acid, and specialized compounds",
      icon: Beaker,
      href: "/products/pharma-intermediates",
      productCount: "8+ Products",
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-accent text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-serif">Our Products</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Comprehensive range of premium quality aromatic chemicals, essential oils, ayurvedic products, and
              pharmaceutical intermediates
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
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Product Categories</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {productCategories.map((category, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <category.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">{category.title}</h3>
                          <p className="text-sm text-accent font-medium">{category.productCount}</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-6 flex-grow">{category.description}</p>
                      <Button asChild className="w-full">
                        <Link href={category.href}>
                          View Products <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
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
