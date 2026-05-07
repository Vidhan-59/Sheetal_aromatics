"use client"

import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

interface QuoteButtonProps {
  productName: string
  casNumber?: string
}

export function QuoteButton({ productName, casNumber }: QuoteButtonProps) {
  const handleGetQuote = () => {
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
    <Button 
      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-all duration-300" 
      onClick={handleGetQuote}
    >
      <Mail className="mr-2 h-4 w-4" />
      Request Quote
    </Button>
  )
}
