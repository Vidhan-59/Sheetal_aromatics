import Header from "@/components/header"
import Footer from "@/components/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Beaker, Leaf, Award, Globe, Shield, Users, ArrowRight, CheckCircle, FlaskConical } from "lucide-react"

export default function HomePage() {
  const productCategories = [
    {
      title: "Aromatic Chemicals",
      description: "Premium quality aromatic compounds for various industries",
      icon: Beaker,
      href: "/products/aromatic-chemicals",
      productCount: 15,
    },
    {
      title: "Essential Oils",
      description: "Pure and natural essential oils from finest sources",
      icon: Leaf,
      href: "/products/essential-oils",
      productCount: 12,
    },
    {
      title: "Ayurvedic Herbs",
      description: "Traditional herbs for wellness and pharmaceutical use",
      icon: Leaf,
      href: "/products/ayurvedic-herbs",
      productCount: 16,
    },
    {
      title: "Ayurvedic Powders",
      description: "Finely processed herbal powders for various applications",
      icon: Leaf,
      href: "/products/ayurvedic-powders",
      productCount: 13,
    },
    {
      title: "Metals",
      description: "High purity metals for industrial applications",
      icon: Shield,
      href: "/products/metals",
      productCount: 2,
    },
    {
      title: "Pharma Intermediates",
      description: "Quality intermediates for pharmaceutical manufacturing",
      icon: FlaskConical,
      href: "/products/pharma-intermediates",
      productCount: 8,
    },
  ]

  const whyChooseUs = [
    {
      icon: Award,
      title: "20+ Years Experience",
      description: "Established in 2005, we bring decades of expertise in chemical supply",
    },
    {
      icon: Globe,
      title: "Export Excellence",
      description: "Strong presence in both export and local markets with global reach",
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Rigorous quality control and testing for all our products",
    },
    {
      icon: Users,
      title: "Customer Satisfaction",
      description: "Trusted by clients worldwide for reliability and exceptional service",
    },
  ]

  const certifications = ["Export Documentation", "Pharmaceutical Grade", "Quality Assurance", "Global Standards"]

  return (
    <div className="min-h-screen fade-in">
      <Header />
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-background to-muted py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif leading-tight text-foreground">
              Leaders in Aromatic Chemicals, Essential Oils & Ayurvedic Products
            </h1>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Award className="h-6 w-6 text-primary" />
              <p className="text-xl md:text-2xl text-muted-foreground font-medium">Since 2005</p>
            </div>
            <p className="text-lg md:text-xl mb-8 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Trusted in both Export and Local Markets. Your reliable partner for premium quality chemicals and natural
              products with 20+ years of excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="shadow-lg performance-optimized" asChild>
                <Link href="/products">
                  View Products <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="shadow-lg performance-optimized bg-transparent" asChild>
                <Link href="/contact">Get Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-6 bg-muted/50 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span className="font-medium text-foreground">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-foreground">About Sheetal Aromatics</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Established in 2005, Sheetal Aromatics has grown to become a trusted global supplier of aromatic
              chemicals, essential oils, and ayurvedic products. Under the leadership of Mr. Shailesh Shah and Mr.
              Vidhan Shah, we have built a reputation for excellence in both export and domestic markets.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">20+</div>
                <p className="text-muted-foreground font-medium">Years of Experience</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <p className="text-muted-foreground font-medium">Products Available</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <p className="text-muted-foreground font-medium">Countries Served</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif text-foreground">Our Product Categories</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive range of high-quality products across multiple categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productCategories.map((category, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <category.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{category.productCount} products</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{category.description}</p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                  >
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

      {/* Why Choose Us */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif text-foreground">
              Why Choose Sheetal Aromatics?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your trusted partner for quality, reliability, and excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <Card key={index} className="text-center hover:shadow-md transition-shadow performance-optimized">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">Ready to Partner with Us?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Get in touch today for premium quality products and exceptional service
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild className="performance-optimized">
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary performance-optimized bg-transparent"
              asChild
            >
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
