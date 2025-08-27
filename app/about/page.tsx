import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Award, Globe, Shield, Users, Target, Heart, Factory, Truck, CheckCircle, Star } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: "Quality First",
      description: "We maintain the highest quality standards in all our products and processes",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Serving customers worldwide with reliable export and local market presence",
    },
    {
      icon: Users,
      title: "Customer Focus",
      description: "Building long-term relationships through exceptional service and support",
    },
    {
      icon: Target,
      title: "Innovation",
      description: "Continuously improving our products and processes to meet evolving needs",
    },
    {
      icon: Heart,
      title: "Integrity",
      description: "Conducting business with honesty, transparency, and ethical practices",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Striving for excellence in everything we do, from sourcing to delivery",
    },
  ]

  const achievements = [
    { icon: Factory, title: "State-of-the-art Facility", description: "Modern manufacturing and storage facilities" },
    { icon: Truck, title: "Reliable Logistics", description: "Efficient supply chain and delivery network" },
    { icon: CheckCircle, title: "Quality Certified", description: "Comprehensive quality management systems" },
    { icon: Star, title: "Customer Satisfaction", description: "98% customer retention rate" },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-accent text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-serif">About Sheetal Aromatics</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Two decades of excellence in aromatic chemicals, essential oils, and ayurvedic products. Your trusted
              partner in quality and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-8 font-serif text-primary">Our Story</h2>
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Established in 2005, Sheetal Aromatics began as a vision to provide premium quality aromatic
                    chemicals and natural products to industries worldwide. Under the dedicated leadership of Mr.
                    Shailesh Shah and Mr. Vidhan Shah, we have grown from a small enterprise to a trusted global
                    supplier.
                  </p>
                  <p>
                    Our journey has been marked by continuous growth, innovation, and an unwavering commitment to
                    quality. Today, we serve customers across multiple continents, maintaining the same values of
                    integrity and excellence that founded our company.
                  </p>
                  <p>
                    With over two decades of experience, we have built strong relationships with suppliers and customers
                    alike, ensuring consistent quality and reliable service that sets us apart in the industry.
                  </p>
                </div>
                <div className="mt-8">
                  <Button size="lg" asChild>
                    <Link href="/contact">Partner with Us</Link>
                  </Button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-8 rounded-2xl border border-primary/10">
                <h3 className="text-3xl font-bold mb-8 text-center text-primary">Company Highlights</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-3xl font-bold text-primary mb-2">2005</div>
                    <div className="text-sm text-muted-foreground">Established</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-3xl font-bold text-primary mb-2">20+</div>
                    <div className="text-sm text-muted-foreground">Years Experience</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-3xl font-bold text-primary mb-2">6</div>
                    <div className="text-sm text-muted-foreground">Product Categories</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-3xl font-bold text-primary mb-2">50+</div>
                    <div className="text-sm text-muted-foreground">Countries Served</div>
                  </div>
                </div>
                <div className="mt-6 text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-4xl font-bold text-primary mb-2">500+</div>
                  <div className="text-sm text-muted-foreground">Products Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-serif text-primary">Why Choose Us</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our commitment to excellence is reflected in every aspect of our business
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                >
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <achievement.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 font-serif">Our Leadership</h2>
            <p className="text-lg text-muted-foreground mb-12">
              Guided by experienced leaders with a passion for excellence
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Mr. Shailesh Shah</h3>
                  <p className="text-primary font-medium mb-4">Co-Owner & Director</p>
                  <p className="text-muted-foreground">
                    Visionary leader with extensive experience in chemical trading and international business
                    development.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Mr. Vidhan Shah</h3>
                  <p className="text-primary font-medium mb-4">Co-Owner & Director</p>
                  <p className="text-muted-foreground">
                    Strategic thinker focused on quality assurance, operations excellence, and customer satisfaction.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-serif">Our Values</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The principles that guide our business and define our commitment to excellence
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 font-serif">Ready to Work Together?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Experience the Sheetal Aromatics difference. Contact us today to discuss your requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-primary bg-transparent"
              asChild
            >
              <Link href="/products">View Products</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
