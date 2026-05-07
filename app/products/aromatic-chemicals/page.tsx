import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { QuoteButton } from "@/components/quote-button"
import Link from "next/link"
import { ArrowLeft, Beaker } from "lucide-react"
import { getProductsByCategory, type Product } from "@/lib/products-data"

export default function AromaticChemicalsPage() {
  const products = getProductsByCategory("Aromatic Chemicals")

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-accent text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-primary mb-6 bg-transparent"
              asChild
            >
              <Link href="/products">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
              </Link>
            </Button>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                <Beaker className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold font-serif">Aromatic Chemicals</h1>
                <p className="text-xl text-blue-100">Premium Quality Compounds</p>
              </div>
            </div>
            <p className="text-lg text-blue-100 max-w-2xl">
              High-grade aromatic chemicals for various industrial applications. All products meet international quality
              standards.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Available Products</h2>
            <p className="text-muted-foreground">{products.length} products available</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Beaker className="h-6 w-6 text-primary" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {product.purity || "Premium Grade"}
                      </Badge>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{product.description}</p>
                    </div>

                    <div className="space-y-2 text-xs">
                      {product.casNumber && (
                        <div className="flex justify-between">
                          <span className="font-medium">CAS Number:</span>
                          <span className="font-mono">{product.casNumber}</span>
                        </div>
                      )}

                      {product.molecularFormula && (
                        <div className="flex justify-between">
                          <span className="font-medium">Formula:</span>
                          <span className="font-mono">{product.molecularFormula}</span>
                        </div>
                      )}

                      {product.physicalForm && (
                        <div className="flex justify-between">
                          <span className="font-medium">Form:</span>
                          <span>{product.physicalForm}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {product.applications.slice(0, 2).map((app, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {app}
                        </Badge>
                      ))}
                      {product.applications.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{product.applications.length - 2} more
                        </Badge>
                      )}
                    </div>

                    <QuoteButton productName={product.name} casNumber={product.casNumber} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
