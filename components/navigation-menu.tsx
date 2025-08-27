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
                "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                pathname === "/" && "bg-accent/50",
              )}
            >
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className={cn(pathname.startsWith("/products") && "bg-accent/50")}>
            Products
          </NavigationMenuTrigger>
          <NavigationMenuContent className="z-50 bg-white rounded-md shadow-lg border border-gray-300">
            <div className="grid w-[600px] grid-cols-2 gap-3 p-4 text-gray-800">
              <div className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/products"
                  >
                    <Beaker className="h-6 w-6" />
                    <div className="mb-2 mt-4 text-lg font-medium">All Products</div>
                    <p className="text-sm leading-tight text-gray-600">
                      Browse our complete range of premium chemicals and natural products
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
                  className="text-gray-800"
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
                "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                pathname === "/about" && "bg-accent/50",
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
                "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                pathname === "/contact" && "bg-accent/50",
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
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className,
        )}
        {...props}
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4" />}
          <div className="text-sm font-medium leading-none">{title}</div>
        </div>
        <p className="line-clamp-2 text-sm leading-snug text-gray-600">{children}</p>
      </a>
    </NavigationMenuLink>
  )
})
ListItem.displayName = "ListItem"
