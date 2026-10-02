"use client"

import { useState, useRef, useEffect } from "react"
import { Check, Copy, ExternalLink, Mail, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { gmailLink, mailtoLink, siteConfig } from "@/lib/site-config"
import { cn } from "@/lib/utils"

interface EmailEnquiryButtonProps {
  subject: string
  body?: string
  variant?: "default" | "outline" | "ghost" | "secondary"
  size?: "default" | "sm" | "lg"
  className?: string
  label?: string
  showChevron?: boolean
}

export function EmailEnquiryButton({
  subject,
  body,
  variant = "ghost",
  size = "lg",
  className,
  label = "Email",
  showChevron = true,
}: EmailEnquiryButtonProps) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const mailto = mailtoLink(subject, body)
  const gmail = gmailLink(subject, body)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open])

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(siteConfig.contact.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      // Fallback
    }
  }

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <Button
        type="button"
        variant={variant}
        size={size}
        onClick={() => setOpen((prev) => !prev)}
        className={cn("inline-flex items-center gap-2", className)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <Mail aria-hidden="true" className="h-4 w-4" />
        <span>{label}</span>
        {showChevron && <ChevronDown aria-hidden="true" className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />}
      </Button>

      {open && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute left-0 z-50 mt-2 w-72 origin-top-left rounded-lg border border-border bg-card p-2 shadow-xl ring-1 ring-black/5 animate-in fade-in-50 zoom-in-95 sm:w-80"
        >
          <div className="px-3 py-2 border-b border-border/60">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Contact via Email</p>
            <p className="mt-0.5 text-sm font-semibold text-foreground truncate">{siteConfig.contact.email}</p>
          </div>

          <div className="py-1">
            <a
              href={gmail}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-md px-3 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300">
                  <Mail className="h-3.5 w-3.5" />
                </span>
                <div>
                  <span className="font-medium block">Open in Gmail Web</span>
                  <span className="text-xs text-muted-foreground block">Prefilled in browser</span>
                </div>
              </div>
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
            </a>

            <a
              href={mailto}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-md px-3 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                  <Mail className="h-3.5 w-3.5" />
                </span>
                <div>
                  <span className="font-medium block">Default Mail App</span>
                  <span className="text-xs text-muted-foreground block">Outlook, Apple Mail, etc.</span>
                </div>
              </div>
            </a>

            <button
              type="button"
              onClick={handleCopy}
              className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm text-foreground hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-foreground">
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                </span>
                <div>
                  <span className="font-medium block">{copied ? "Email Copied!" : "Copy Email Address"}</span>
                  <span className="text-xs text-muted-foreground block">{siteConfig.contact.email}</span>
                </div>
              </div>
              {copied && <span className="text-xs font-medium text-emerald-600">Copied</span>}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
