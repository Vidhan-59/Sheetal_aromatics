"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet"
import { Menu, Phone, Mail, Search } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { CompanyLogo } from "@/components/company-logo"
import { MainNavigationMenu } from "@/components/navigation-menu"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  const mobileNavItems = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <header className="bg-background/98 backdrop-blur-sm supports-[backdrop-filter]:bg-background/95 sticky top-0 z-50 border-b border-border/40 premium-shadow transition-all duration-300">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="hidden md:flex items-center justify-between py-3 text-xs text-muted-foreground border-b border-border/30">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 hover:text-primary transition-colors duration-200">
              <Phone className="h-3.5 w-3.5" />
              <span>+91 9824169906 / +91 9426005911</span>
            </div>
            <div className="flex items-center gap-2 hover:text-primary transition-colors duration-200">
              <Mail className="h-3.5 w-3.5" />
              <span>sheetalaromatics@gmail.com</span>
            </div>
          </div>
          <div className="text-accent font-semibold">Premium Heritage Since 2005</div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-4 gap-8">
          <CompanyLogo size="md" />

          <div className="hidden lg:flex items-center gap-4 flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative flex-1 search-enhanced">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 bg-muted/40 border-border/50 focus:bg-background transition-all duration-300 rounded-lg text-sm"
              />
            </form>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <MainNavigationMenu />
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-md transition-all duration-200 rounded-lg px-6">
              <Link href="/contact">Get Quote</Link>
            </Button>
            <div className="hidden md:flex">
              <ThemeToggle />
            </div>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="transition-all duration-200">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader className="sr-only">
                  <SheetTitle>Navigation Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 mt-6">
                  <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 transition-all duration-200"
                    />
                  </form>

                  <nav className="flex flex-col gap-4">
                    {mobileNavItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="text-foreground hover:text-primary transition-colors duration-200 font-medium text-lg py-2 px-2 rounded-md hover:bg-muted/50"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>

                  <Button asChild className="w-fit bg-accent hover:bg-accent/90 transition-all duration-200">
                    <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                      Get Quote
                    </Link>
                  </Button>

                  <div className="pt-4 border-t">
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span className="break-all">+91 9824169906</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span className="break-all">sheetalaromatics@gmail.com</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
