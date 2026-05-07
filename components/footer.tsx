import Link from "next/link"
import { Phone, Mail, Clock, Award, Globe, MapPin } from "lucide-react"
import { CompanyLogo } from "@/components/company-logo"

export default function Footer() {
  const productCategories = [
    { name: "Aromatic Chemicals", href: "/products/aromatic-chemicals" },
    { name: "Essential Oils", href: "/products/essential-oils" },
    { name: "Ayurvedic Herbs", href: "/products/ayurvedic-herbs" },
    { name: "Pharma Intermediates", href: "/products/pharma-intermediates" },
  ]

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Products", href: "/products" },
  ]

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2">
            <CompanyLogo size="md" className="mb-6 [&_h1]:text-primary-foreground [&_p]:text-primary-foreground/80" />
            <p className="text-primary-foreground/90 mb-8 max-w-md leading-relaxed font-light">
              Premium Ayurvedic wellness since 2005. Trusted by thousands worldwide for authentic herbs, 
              exceptional quality, and genuine care for your wellbeing.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-accent" />
                <span className="text-sm text-primary-foreground/90">20+ Years Heritage</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-accent" />
                <span className="text-sm text-primary-foreground/90">50+ Countries</span>
              </div>
            </div>

            <div className="space-y-3 text-sm text-primary-foreground/80">
              <p>
                <span className="font-semibold text-primary-foreground">Leadership:</span> Mr. Shailesh Shah & Mr. Vidhan Shah
              </p>
              <p>
                <span className="font-semibold text-primary-foreground">Founded:</span> 2005
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-lg">Our Products</h4>
            <div className="space-y-3">
              {productCategories.map((category) => (
                <Link
                  key={category.href}
                  href={category.href}
                  className="block text-primary-foreground/80 hover:text-primary-foreground hover:translate-x-1 transition-all duration-200"
                >
                  {category.name}
                </Link>
              ))}
            </div>

            <div className="mt-8">
              <h5 className="font-semibold mb-4 text-accent">Quick Links</h5>
              <div className="space-y-3">
                {quickLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-lg">Contact Us</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-primary-foreground font-semibold mb-1">Office Address</p>
                  <p className="text-primary-foreground/80 text-sm leading-relaxed">
                    Survey No. 189/1, Subplot No. 1,
                    <br />
                    Natraj Industrial Estate,
                    <br />
                    Vasna-Iyawa, Tal. Sanand,
                    <br />
                    Dist. Ahmedabad - 382170, Gujarat
                  </p>
                  <div className="mt-3 space-y-1">
                    <p className="text-xs text-primary-foreground/70">GST: 24ABEFS0254K1Z9</p>
                    <p className="text-xs text-primary-foreground/70">IEC: 0805014608</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-primary-foreground font-semibold mb-1">Phone</p>
                  <p className="text-primary-foreground/80 text-sm">+91 9824169906</p>
                  <p className="text-primary-foreground/80 text-sm">+91 9426005911</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-primary-foreground font-semibold mb-1">Email</p>
                  <a
                    href="mailto:sheetalaromatics@gmail.com"
                    className="text-primary-foreground/80 text-sm hover:text-accent transition-colors"
                  >
                    sheetalaromatics@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-primary-foreground font-semibold mb-1">Business Hours</p>
                  <p className="text-primary-foreground/80 text-sm">Mon - Sat: 9:00 AM - 6:00 PM</p>
                  <p className="text-primary-foreground/80 text-sm">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <p className="text-primary-foreground/80 text-sm">© 2025 Sheetal Aromatics. All rights reserved.</p>
              <p className="text-primary-foreground/60 text-xs mt-2">
                Premium Ayurvedic Heritage Since 2005 | Global Export | Quality Assured
              </p>
            </div>

            <div className="flex items-center gap-6 text-xs text-primary-foreground/70">
              <a href="#" className="hover:text-primary-foreground transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-primary-foreground transition-colors">Terms of Service</a>
              <span>•</span>
              <a href="#" className="hover:text-primary-foreground transition-colors">Quality Standards</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
