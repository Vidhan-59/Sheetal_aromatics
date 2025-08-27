"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Shield, Mail } from "lucide-react"
import { getProductsByCategory } from "@/lib/products-data"

export default function MetalsPage() {
  const products = getProductsByCategory("Metals")

  const handleGetQuote = (productName: string, casNumber?: string) => {
    const subject = `Quote Request for ${productName}`
    const body = `Dear Sheetal Aromatics Team,

I would like to request a quote for the following product:

Product Name: ${productName}
${casNumber ? `CAS Number: ${casNumber}` : ""}

Please provide:
- Price per unit/kg
- Minimum order quantity
- Availability
- Delivery timeline

Thank you for your assistance.

Best regards,`

    const mailtoLink = `mailto:sheetalaromatics@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(mailtoLink, "_blank")
  }

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
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold font-serif">Metals</h1>
                <p className="text-xl text-blue-100">High Purity Grade</p>
              </div>
            </div>
            <p className="text-lg text-blue-100 max-w-2xl">
              Premium quality metals with exceptional purity levels for specialized industrial and pharmaceutical
              applications.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {products.map((product, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="w-20 h-20 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-6">
                    <Shield className="h-10 w-10 text-primary" />
                  </div>

                  <h3 className="text-xl font-semibold mb-4 text-center">{product.name}</h3>

                  <div className="space-y-3 mb-6 text-sm">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-muted-foreground text-xs mb-1">Description:</p>
                      <p className="text-sm leading-relaxed">{product.description}</p>
                    </div>

                    {product.casNumber && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">CAS Number:</span>
                        <span className="font-mono">{product.casNumber}</span>
                      </div>
                    )}

                    {product.molecularFormula && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Formula:</span>
                        <span className="font-mono">{product.molecularFormula}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Purity:</span>
                      <span className="text-2xl font-bold text-primary">{product.purity}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Form:</span>
                      <span className="capitalize">{product.physicalForm}</span>
                    </div>
                  </div>

                  {product.applications && product.applications.length > 0 && (
                    <div className="mb-6">
                      <p className="text-xs text-muted-foreground mb-2">Applications:</p>
                      <div className="flex flex-wrap gap-1">
                        {product.applications.map((app, idx) => (
                          <span key={idx} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button className="w-full" size="lg" onClick={() => handleGetQuote(product.name, product.casNumber)}>
                    <Mail className="mr-2 h-4 w-4" />
                    Get Quote
                  </Button>
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
