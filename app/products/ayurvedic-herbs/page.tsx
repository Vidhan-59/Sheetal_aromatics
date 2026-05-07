"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Leaf, Mail } from "lucide-react"
import { getProductsByCategory } from "@/lib/products-data"

export default function AyurvedicHerbsPage() {
  const products = getProductsByCategory("Ayurvedic Herbs")

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
      <section className="bg-gradient-to-br from-primary via-primary/95 to-primary text-primary-foreground py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-foreground/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="outline"
              className="text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10 mb-8 bg-transparent transition-all duration-300"
              asChild
            >
              <Link href="/products">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Link>
            </Button>
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-primary-foreground/10 rounded-xl flex items-center justify-center">
                <Leaf className="h-10 w-10 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-5xl md:text-6xl font-bold font-serif leading-tight">Ayurvedic Herbs</h1>
                <p className="text-xl text-primary-foreground/80 mt-2">Premium Wellness Heritage</p>
              </div>
            </div>
            <p className="text-lg text-primary-foreground/90 max-w-2xl leading-relaxed font-light">
              Authentic, premium-grade Ayurvedic herbs sourced from trusted suppliers. Perfect for pharmaceutical, 
              nutraceutical, wellness, and traditional medicine applications.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <p className="text-muted-foreground text-center">
              Featuring {products.length} premium Ayurvedic herbs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {products.map((product, index) => (
              <Card 
                key={index} 
                className="h-full hover:shadow-xl transition-all duration-300 hover:border-primary/30 premium-shadow lift-on-hover border-border/50 overflow-hidden"
              >
                <CardContent className="p-6 md:p-8 flex flex-col h-full">
                  <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                    <Leaf className="h-7 w-7 text-primary" />
                  </div>

                  <h3 className="text-xl font-semibold mb-3 text-center text-foreground font-serif">{product.name}</h3>

                  <div className="space-y-3 mb-6 text-sm flex-grow">
                    <div className="bg-secondary/30 p-4 rounded-lg border border-border/30">
                      <p className="text-muted-foreground text-xs font-semibold mb-2 uppercase tracking-wide">About</p>
                      <p className="text-foreground leading-relaxed">{product.description}</p>
                    </div>

                    {product.casNumber && (
                      <div className="flex justify-between items-center py-2 border-b border-border/30">
                        <span className="text-muted-foreground text-xs font-medium">CAS #</span>
                        <span className="font-mono text-sm text-primary font-semibold">{product.casNumber}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground text-xs font-medium">GRADE</span>
                      <span className="text-primary font-semibold text-sm">{product.purity || "Premium Grade"}</span>
                    </div>

                    {product.physicalForm && (
                      <div className="flex justify-between items-center py-2 border-b border-border/30">
                        <span className="text-muted-foreground text-xs font-medium">FORM</span>
                        <span className="capitalize text-sm font-medium">{product.physicalForm}</span>
                      </div>
                    )}
                  </div>

                  {product.applications && product.applications.length > 0 && (
                    <div className="mb-6">
                      <p className="text-xs text-muted-foreground font-semibold mb-3 uppercase tracking-wide">Uses</p>
                      <div className="flex flex-wrap gap-2">
                        {product.applications.slice(0, 3).map((app, idx) => (
                          <span key={idx} className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full font-medium">
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-all duration-300" 
                    onClick={() => handleGetQuote(product.name, product.casNumber)}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Request Quote
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
