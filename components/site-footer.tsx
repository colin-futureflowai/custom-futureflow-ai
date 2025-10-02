"use client"

import Link from "next/link"
import { Instagram, Linkedin } from "lucide-react"

export default function SiteFooter() {
  return (
    <footer className="bg-white border-t border-gray-100 footer4_component">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="py-12 md:py-16">
          {/* Top wrapper: logo, link list, socials */}
          <div className="pb-10 md:pb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6">
              {/* Logo */}
              <Link href="/" aria-label="Home" className="justify-self-center md:justify-self-start">
                <img loading="eager" src="/images/FutureFlowAI Logo.webp" alt="Logo van FutureFlowAI" className="h-7 w-auto" />
              </Link>

              {/* Link list */}
              <nav className="grid grid-cols-3 gap-4 text-center text-black text-sm">
                <Link href="/" aria-label="Home" className="hover:text-[#32a029]">Home</Link>
                <Link href="/#Hoe-werkt-het" aria-label="Hoe werkt het?" className="hover:text-[#32a029]">Hoe werkt het?</Link>
                <Link href="/#succesverhalen" aria-label="Succesverhalen" className="hover:text-[#32a029]">Succesverhalen</Link>
              </nav>

              {/* Social list */}
              <div className="flex items-center justify-center md:justify-end gap-4">
                <Link href="https://www.instagram.com/colinduivenvoorden/" target="_blank" className="text-[#32a029]" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link href="https://nl.linkedin.com/in/colinduivenvoorden" target="_blank" className="text-[#32a029]" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100" />

          {/* Bottom wrapper: credit + legal links */}
          <div className="pt-6 md:pt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 text-sm text-black">
              <div className="order-2 md:order-1 text-center md:text-left">© 2025 FutureFlowAI.nl. Alle rechten toebehoren.</div>
              <Link href="#" className="order-1 md:order-2 justify-self-center hover:text-[#32a029]">Algemene Voorwaarden</Link>
              <Link href="#" className="order-3 md:order-3 justify-self-center md:justify-self-start hover:text-[#32a029]">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
