"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Filter, X, Mail, Loader2 } from "lucide-react"
import { searchProducts, type Product } from "@/lib/products-data"

interface ProductSearchProps {
  initialQuery?: string
  onResultsChange?: (results: Product[]) => void
}

export function ProductSearch({ initialQuery = "", onResultsChange }: ProductSearchProps) {
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<Product[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  const categories = [
    "Aromatic Chemicals",
    "Essential Oils",
    "Ayurvedic Herbs",
    "Ayurvedic Powders",
    "Metals",
    "Pharma Intermediates",
  ]

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (query || selectedCategories.length > 0) {
        performSearch(query)
      } else {
        setResults([])
        onResultsChange?.([])
      }
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [query, selectedCategories])

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery)
    }
  }, [initialQuery])

  const performSearch = async (searchQuery: string) => {
    setIsSearching(true)
    setError(null)

    try {
      await new Promise((resolve) => setTimeout(resolve, 150)) // Reduced delay for faster response

      let searchResults = searchProducts(searchQuery)

      if (selectedCategories.length > 0) {
        searchResults = searchResults.filter((product) => selectedCategories.includes(product.category))
      }

      setResults(searchResults)
      onResultsChange?.(searchResults)
    } catch (err) {
      setError("Failed to search products. Please try again.")
      console.error("Search error:", err)
    } finally {
      setIsSearching(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    performSearch(query)
  }

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const clearSearch = () => {
    setQuery("")
    setSelectedCategories([])
    setResults([])
    setError(null)
    onResultsChange?.([])
  }

  const handleQuoteRequest = (product: Product) => {
    const subject = `Quote Request for ${product.name}`
    const body = `Dear Sheetal Aromatics Team,

I would like to request a quote for the following product:

Product Name: ${product.name}
Category: ${product.category}
${product.casNumber ? `CAS Number: ${product.casNumber}` : ""}
${product.molecularFormula ? `Molecular Formula: ${product.molecularFormula}` : ""}

Please provide pricing and availability information.

Thank you.`

    window.location.href = `mailto:sheetalaromatics@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <CardContent className="p-4 md:p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <Skeleton className="h-16 w-full" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>
              <Skeleton className="h-8 w-full" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 sm:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by product name, CAS number, molecular formula..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-4 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            disabled={isSearching}
          />
          {isSearching && (
            <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
          )}
        </div>
        {(query || selectedCategories.length > 0) && (
          <Button type="button" variant="outline" onClick={clearSearch} className="shrink-0 bg-transparent">
            <X className="h-4 w-4 mr-2" />
            Clear
          </Button>
        )}
      </form>

      {/* Category Filter */}
      <div className="space-y-3">
        <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter by category:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategories.includes(category) ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/10 transition-all duration-200 justify-center py-2 px-3 text-xs sm:text-sm"
              onClick={() => toggleCategory(category)}
            >
              <span className="truncate">{category}</span>
              {selectedCategories.includes(category) && <X className="h-3 w-3 ml-1 shrink-0" />}
            </Badge>
          ))}
        </div>
      </div>

      {/* Active Filters Display */}
      {selectedCategories.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium text-muted-foreground">Active filters:</span>
          {selectedCategories.map((category) => (
            <Badge key={category} variant="secondary" className="gap-1">
              <span className="truncate max-w-[120px]">{category}</span>
              <X
                className="h-3 w-3 cursor-pointer hover:text-destructive shrink-0"
                onClick={() => toggleCategory(category)}
              />
            </Badge>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-4">
          <p className="text-destructive text-sm">{error}</p>
          <Button variant="outline" size="sm" onClick={() => performSearch(query)} className="mt-2">
            Try Again
          </Button>
        </div>
      )}

      {/* Loading State */}
      {isSearching && <LoadingSkeleton />}

      {/* Search Results */}
      {!isSearching && results.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            Search Results ({results.length} {results.length === 1 ? "product" : "products"} found)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {results.map((product) => (
              <Card
                key={product.id}
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group overflow-hidden"
              >
                <CardContent className="p-4 md:p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-base md:text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h4>
                      <Badge variant="secondary" className="text-xs mb-2">
                        {product.category}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{product.description}</p>

                    <div className="space-y-2 text-xs">
                      {product.casNumber && (
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                          <span className="font-medium text-muted-foreground">CAS Number:</span>
                          <span className="font-mono text-foreground break-all">{product.casNumber}</span>
                        </div>
                      )}

                      {product.molecularFormula && (
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                          <span className="font-medium text-muted-foreground">Formula:</span>
                          <span className="font-mono text-foreground">{product.molecularFormula}</span>
                        </div>
                      )}

                      {product.purity && (
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                          <span className="font-medium text-muted-foreground">Purity:</span>
                          <span className="text-foreground">{product.purity}</span>
                        </div>
                      )}

                      {product.physicalForm && (
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                          <span className="font-medium text-muted-foreground">Form:</span>
                          <span className="text-foreground">{product.physicalForm}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {product.applications.slice(0, 2).map((app, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {app}
                        </Badge>
                      ))}
                      {product.applications.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{product.applications.length - 2} more
                        </Badge>
                      )}
                    </div>

                    <Button
                      onClick={() => handleQuoteRequest(product)}
                      className="w-full mt-4 transition-all duration-200 hover:shadow-md"
                      size="sm"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Get Quote
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* No Results State */}
      {!isSearching && query && results.length === 0 && !error && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No products found matching your search criteria.</p>
          <p className="text-sm text-muted-foreground mt-2">Try different keywords or browse our product categories.</p>
        </div>
      )}
    </div>
  )
}
