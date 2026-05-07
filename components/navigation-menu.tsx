"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Beaker, Leaf, Shield } from "lucide-react"

const productCategories = [
  {
    title: "Aromatic Chemicals",
    href: "/products/aromatic-chemicals",
    description: "Premium quality aromatic compounds for various industries",
    icon: Beaker,
  },
  {
    title: "Essential Oils",
    href: "/products/essential-oils",
    description: "Pure and natural essential oils from finest sources",
    icon: Leaf,
  },
  {
    title: "Ayurvedic Herbs",
    href: "/products/ayurvedic-herbs",
    description: "Traditional herbs for wellness and pharmaceutical use",
    icon: Leaf,
  },
  {
    title: "Ayurvedic Powders",
    href: "/products/ayurvedic-powders",
    description: "Finely processed herbal powders for various applications",
    icon: Leaf,
  },
  {
    title: "Metals",
    href: "/products/metals",
    description: "High purity metals for industrial applications",
    icon: Shield,
  },
  {
    title: "Pharma Intermediates",
    href: "/products/pharma-intermediates",
    description: "Quality intermediates for pharmaceutical manufacturing",
    icon: Beaker,
  },
]

export function MainNavigationMenu() {
  const pathname = usePathname()

  return (
    <NavigationMenu className="flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                "group inline-flex h-10 w-max items-center justify-center rounded-lg bg-transparent px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                pathname === "/" && "text-primary bg-primary/10",
              )}
            >
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className={cn("transition-all duration-200", pathname.startsWith("/products") && "text-primary bg-primary/10")}>
            Products
          </NavigationMenuTrigger>
          <NavigationMenuContent className="z-50 bg-card rounded-xl shadow-2xl border border-border/50 premium-shadow min-w-[600px]">
            <div className="grid grid-cols-2 gap-3 p-6 text-foreground">
              <div className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-lg bg-gradient-to-b from-primary/10 to-primary/5 p-6 no-underline outline-none focus:shadow-md hover:bg-gradient-to-b hover:from-primary/15 hover:to-primary/10 transition-all duration-300"
                    href="/products"
                  >
                    <Beaker className="h-6 w-6 text-primary" />
                    <div className="mb-2 mt-4 text-lg font-semibold text-foreground">All Products</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Browse our complete range of premium herbs and natural products
                    </p>
                  </Link>
                </NavigationMenuLink>
              </div>
              {productCategories.slice(0, 5).map((category) => (
                <ListItem
                  key={category.href}
                  title={category.title}
                  href={category.href}
                  icon={category.icon}
                  className="text-foreground"
                >
                  {category.description}
                </ListItem>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/about" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                "group inline-flex h-10 w-max items-center justify-center rounded-lg bg-transparent px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                pathname === "/about" && "text-primary bg-primary/10",
              )}
            >
              About Us
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/contact" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                "group inline-flex h-10 w-max items-center justify-center rounded-lg bg-transparent px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                pathname === "/contact" && "text-primary bg-primary/10",
              )}
            >
              Contact
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ComponentType<any> }
>(({ className, title, children, icon: Icon, ...props }, ref) => {
  return (
    <NavigationMenuLink asChild>
      <a
        ref={ref}
        className={cn(
          "block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-primary/5 hover:text-primary focus:bg-primary/5 focus:text-primary",
          className,
        )}
        {...props}
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4 text-primary" />}
          <div className="text-sm font-semibold leading-none">{title}</div>
        </div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
      </a>
    </NavigationMenuLink>
  )
})
ListItem.displayName = "ListItem"
