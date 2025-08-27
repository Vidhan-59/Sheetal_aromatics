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
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <CompanyLogo size="md" className="mb-4 [&_h1]:text-white [&_p]:text-gray-400" />
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Leading supplier of aromatic chemicals, essential oils, and ayurvedic products. Trusted by clients
              worldwide for quality, reliability, and exceptional service since 2005.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-accent" />
                <span className="text-sm text-gray-300">20+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-accent" />
                <span className="text-sm text-gray-300">Global Export</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-400">
                <span className="font-medium">Owners:</span> Mr. Shailesh Shah & Mr. Vidhan Shah
              </p>
              <p className="text-sm text-gray-400">
                <span className="font-medium">Established:</span> 2005
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-lg">Product Categories</h4>
            <div className="space-y-3">
              {productCategories.map((category) => (
                <Link
                  key={category.href}
                  href={category.href}
                  className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200"
                >
                  {category.name}
                </Link>
              ))}
            </div>

            <div className="mt-6">
              <h5 className="font-medium mb-2 text-accent">Quick Links</h5>
              <div className="space-y-2">
                {quickLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-sm text-gray-400 hover:text-gray-200 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-lg">Contact Information</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 font-medium">Office Address</p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Survey No. 189/1, Subplot No. 1,
                    <br />
                    Natraj Industrial Estate,
                    <br />
                    Vasna-Iyawa, Tal. Sanand,
                    <br />
                    Dist. Ahmedabad - 382170, Gujarat
                  </p>
                  <div className="mt-2 space-y-1">
                    <p className="text-xs text-gray-500">GST: 24ABEFS0254K1Z9</p>
                    <p className="text-xs text-gray-500">IEC: 0805014608</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 font-medium">Phone Numbers</p>
                  <p className="text-gray-400 text-sm">+91 9824169906 (Shailesh Shah)</p>
                  <p className="text-gray-400 text-sm">+91 9426005911 (Vidhan Shah)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 font-medium">Email</p>
                  <a
                    href="mailto:sheetalaromatics@gmail.com"
                    className="text-gray-400 text-sm hover:text-accent transition-colors"
                  >
                    sheetalaromatics@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 font-medium">Business Hours</p>
                  <p className="text-gray-400 text-sm">Mon - Sat: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-400 text-sm">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">© 2025 Sheetal Aromatics. All rights reserved.</p>
              <p className="text-gray-500 text-xs mt-1">
                Established 2005 | Trusted Chemical Supplier | Export Quality Products
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Service</span>
              <span>•</span>
              <span>Quality Assurance</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
