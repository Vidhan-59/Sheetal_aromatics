'use client'

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { 
  Leaf, Award, Globe, Shield, Users, ArrowRight, CheckCircle, Sparkles, 
  BarChart3, Droplet, RefreshCw, Heart, Wind, Zap
} from "lucide-react"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const productCategories = [
    {
      title: "Ashwagandha",
      description: "Adaptogenic herb for stress & wellness",
      icon: Heart,
      href: "/products/ayurvedic-herbs",
      color: "from-green-50 to-emerald-50",
    },
    {
      title: "Brahmi",
      description: "Cognitive enhancer & memory support",
      icon: Zap,
      href: "/products/ayurvedic-herbs",
      color: "from-blue-50 to-cyan-50",
    },
    {
      title: "Amla",
      description: "Vitamin C powerhouse for immunity",
      icon: Droplet,
      href: "/products/ayurvedic-herbs",
      color: "from-orange-50 to-yellow-50",
    },
    {
      title: "Shatavari",
      description: "Women's wellness & rejuvenation",
      icon: Leaf,
      href: "/products/ayurvedic-herbs",
      color: "from-pink-50 to-rose-50",
    },
    {
      title: "Harad",
      description: "Digestive health & balance",
      icon: RefreshCw,
      href: "/products/ayurvedic-herbs",
      color: "from-amber-50 to-orange-50",
    },
    {
      title: "Garcinia Cambogia",
      description: "Natural weight management support",
      icon: Wind,
      href: "/products/ayurvedic-herbs",
      color: "from-lime-50 to-green-50",
    },
  ]

  const whyChooseUs = [
    {
      icon: Award,
      title: "20+ Years Heritage",
      description: "Established expertise in premium herbs and aromatics since 2005",
      detail: "Trust built on decades of dedication"
    },
    {
      icon: Leaf,
      title: "100% Authentic",
      description: "Pure, unadulterated herbs sourced directly from trusted farms",
      detail: "Premium quality assured"
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Exported to 50+ countries with consistent excellence",
      detail: "International standards"
    },
    {
      icon: Shield,
      title: "Quality Tested",
      description: "Rigorous lab testing and quality control at every step",
      detail: "Certified & verified"
    },
  ]

  const benefits = [
    {
      title: "Natural Wellness",
      description: "Ancient Ayurvedic wisdom combined with modern quality standards",
      icon: Heart,
    },
    {
      title: "Sustainable Sourcing",
      description: "Ethically sourced from sustainable farms supporting communities",
      icon: Leaf,
    },
    {
      title: "Scientific Validation",
      description: "Research-backed formulations with proven health benefits",
      icon: Zap,
    },
    {
      title: "Purity Guarantee",
      description: "No fillers, additives, or chemical processing",
      icon: Shield,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background via-secondary/30 to-background py-20 md:py-28">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 animate-slide-in-down">
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm font-semibold text-primary">Premium Ayurvedic Wellness</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground leading-tight animate-slide-in-up stagger-item-1">
              Wellness Through <span className="text-primary">Ancient Wisdom</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light animate-slide-in-up stagger-item-2">
              Discover the transformative power of premium Ayurvedic herbs and natural products. Sourced with care, tested for purity, trusted by thousands worldwide.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-slide-in-up stagger-item-3">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300" asChild>
                <Link href="/products">
                  Explore Products <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary/30 text-foreground hover:bg-primary/5" asChild>
                <Link href="/about">Learn Our Story</Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-8 md:pt-12">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">20+</div>
                <p className="text-sm text-muted-foreground">Years Heritage</p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">50+</div>
                <p className="text-sm text-muted-foreground">Countries Served</p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">500+</div>
                <p className="text-sm text-muted-foreground">Products Available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Product Categories</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our complete range of premium Ayurvedic and specialty products
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {productCategories.map((product, index) => (
              <Link key={index} href={product.href} className="group">
                <div className="flex flex-col items-center justify-center p-4 md:p-6 rounded-lg border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 h-full">
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <product.icon className="h-6 w-6 md:h-7 md:w-7 text-primary" />
                  </div>
                  <h3 className="text-sm md:text-base font-semibold text-foreground text-center group-hover:text-primary transition-colors duration-300">{product.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-28 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Why Choose Our Herbs</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the difference of authentic, premium-quality Ayurvedic wellness
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-border/50 premium-shadow hover:premium-shadow transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                        <benefit.icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold text-foreground mb-2">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Our Commitment to Excellence</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Four pillars that define our mission
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <Card key={index} className="text-center border-border/50 hover:border-primary/30 transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                    <item.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 font-serif">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                  <p className="text-xs font-semibold text-accent">{item.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-28 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">About Sheetal Aromatics</h2>
            </div>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Since 2005, Sheetal Aromatics has been at the forefront of bringing authentic Ayurvedic wellness to the world. 
                Under the leadership of Mr. Shailesh Shah and Mr. Vidhan Shah, we have cultivated a legacy of trust, quality, and excellence.
              </p>
              <p>
                We believe that wellness is not a luxury—it&apos;s a right. Our mission is to make premium Ayurvedic herbs and natural products 
                accessible to everyone, everywhere. Every product we offer is a testament to our commitment to your health and well-being.
              </p>
              <p>
                With a presence in over 50 countries and partnerships with leading wellness brands globally, we continue to grow our impact 
                while maintaining the highest standards of quality and authenticity.
              </p>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                <Link href="/about">Read Full Story</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary/30" asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-serif font-bold">Start Your Wellness Journey Today</h2>
            <p className="text-lg opacity-90 leading-relaxed">
              Join thousands of satisfied customers who have discovered the transformative power of premium Ayurvedic wellness. 
              Experience the difference with Sheetal Aromatics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90" asChild>
                <Link href="/products">Shop Now</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10" 
                asChild
              >
                <Link href="/contact">Request Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
