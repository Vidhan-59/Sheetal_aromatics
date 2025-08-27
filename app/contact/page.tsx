"use client"

import type React from "react"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QuoteForm } from "@/components/quote-form"
import { Phone, Mail, MapPin, Clock, Send, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
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
        body: JSON.stringify({
          ...formData,
          products: "General Inquiry",
          quantity: "N/A",
          urgency: "standard",
        }),
      })

      const result = await response.json()

      if (response.ok) {
        toast({
          title: "Message Sent!",
          description: "Thank you for your inquiry! We will get back to you soon.",
        })
        setFormData({ name: "", email: "", phone: "", company: "", message: "" })
      } else {
        throw new Error(result.error || "Failed to send message")
      }
    } catch (error) {
      console.error("[v0] Contact form error:", error)
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or contact us directly.",
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

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-accent text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-serif">Contact Us</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Get in touch with our team for quotes, inquiries, or partnership opportunities
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Forms */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-8 font-serif">Get in Touch</h2>

              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Phone Numbers</h3>
                        <p className="text-muted-foreground">+91 9824169906</p>
                        <p className="text-muted-foreground">+91 9426005911</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Email Address</h3>
                        <p className="text-muted-foreground">sheetalaromatics@gmail.com</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Business Hours</h3>
                        <p className="text-muted-foreground">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                        <p className="text-muted-foreground">Sunday: Closed</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Office Address</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          Survey No. 189/1, Subplot No. 1,
                          <br />
                          Natraj Industrial Estate,
                          <br />
                          Vasna-Iyawa, Tal. Sanand,
                          <br />
                          Dist. Ahmedabad - 382170,
                          <br />
                          Gujarat, India
                        </p>
                        <div className="mt-3 space-y-1">
                          <p className="text-xs text-muted-foreground">
                            <span className="font-medium">GST No:</span> 24ABEFS0254K1Z9
                          </p>
                          <p className="text-xs text-muted-foreground">
                            <span className="font-medium">IEC No:</span> 0805014608
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 p-6 bg-accent/10 rounded-lg">
                <h3 className="font-semibold mb-2 text-accent">Export Inquiries Welcome</h3>
                <p className="text-muted-foreground">
                  We specialize in export quality products and welcome inquiries from international buyers. Contact us
                  for competitive pricing and reliable supply.
                </p>
              </div>
            </div>

            {/* Contact Forms with Tabs */}
            <div>
              <Tabs defaultValue="quote" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="quote">Request Quote</TabsTrigger>
                  <TabsTrigger value="contact">General Inquiry</TabsTrigger>
                </TabsList>

                <TabsContent value="quote" className="mt-6">
                  <QuoteForm />
                </TabsContent>

                <TabsContent value="contact" className="mt-6">
                  <Card>
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold mb-6 font-serif">Send us a Message</h2>

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

                        <div>
                          <Label htmlFor="message">Message *</Label>
                          <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={6}
                            placeholder="Please describe your requirements, quantities needed, or any questions you have..."
                            disabled={isSubmitting}
                          />
                        </div>

                        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                              Sending Message...
                            </>
                          ) : (
                            <>
                              <Send className="mr-2 h-5 w-5" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      {/* Why Contact Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 font-serif">Why Choose Sheetal Aromatics?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Quick Response</h3>
                <p className="text-muted-foreground">We respond to all inquiries within 24 hours</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Global Shipping</h3>
                <p className="text-muted-foreground">Reliable delivery worldwide with proper documentation</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Expert Support</h3>
                <p className="text-muted-foreground">Technical guidance and product recommendations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
