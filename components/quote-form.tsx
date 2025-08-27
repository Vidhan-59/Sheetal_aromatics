"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, Loader2, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface QuoteFormData {
  name: string
  email: string
  phone: string
  company: string
  products: string
  quantity: string
  urgency: string
  message: string
}

export function QuoteForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<QuoteFormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    products: "",
    quantity: "",
    urgency: "standard",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/send-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
        toast({
          title: "Quote Request Sent!",
          description: result.message,
        })
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          products: "",
          quantity: "",
          urgency: "standard",
          message: "",
        })
      } else {
        throw new Error(result.error || "Failed to send quote request")
      }
    } catch (error) {
      console.error("[v0] Quote form error:", error)
      toast({
        title: "Error",
        description: "Failed to send quote request. Please try again or contact us directly.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      urgency: value,
    })
  }

  if (isSubmitted) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Quote Request Sent!</h3>
          <p className="text-muted-foreground mb-4">
            Thank you for your interest in our products. We will review your requirements and get back to you within 24
            hours.
          </p>
          <Button onClick={() => setIsSubmitted(false)} variant="outline">
            Send Another Quote Request
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-serif">Request a Quote</CardTitle>
        <p className="text-muted-foreground">
          Get competitive pricing for our premium chemical and herbal products. Fill out the form below and we'll
          respond within 24 hours.
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your full name"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 XXXXXXXXXX"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Your company name"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="products">Products of Interest</Label>
              <Input
                id="products"
                name="products"
                value={formData.products}
                onChange={handleChange}
                placeholder="e.g., Benzyl Acetate, Essential Oils"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <Label htmlFor="quantity">Quantity Required</Label>
              <Input
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="e.g., 100 kg, 500 liters"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="urgency">Urgency Level</Label>
            <Select value={formData.urgency} onValueChange={handleSelectChange} disabled={isSubmitting}>
              <SelectTrigger>
                <SelectValue placeholder="Select urgency level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard (7-14 days)</SelectItem>
                <SelectItem value="urgent">Urgent (3-7 days)</SelectItem>
                <SelectItem value="immediate">Immediate (1-3 days)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="message">Additional Requirements *</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              placeholder="Please describe your specific requirements, quality standards, packaging preferences, delivery location, or any other details..."
              disabled={isSubmitting}
            />
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Sending Quote Request...
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                Send Quote Request
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            By submitting this form, you agree to be contacted by Sheetal Aromatics regarding your quote request. We
            respect your privacy and will not share your information with third parties.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
