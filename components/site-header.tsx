"use client"

import Link from "next/link"

export default function SiteHeader() {

  return (
    <header className="w-full bg-white border-b border-gray-100">
      {/* Announcement bar */}
      <div className="w-full bg-[#488441] text-white text-sm">
        <div className="w-full max-w-[100vw] px-[5%] py-2 text-center font-extralight">
          <span>Zien wat je zelf beter kunt doen? Doe de gratis AI-check </span>
          <Link href="/ai-check" className="underline">hier</Link>
          <span>.</span>
        </div>
      </div>

      {/* Main nav */}
      <div className="w-full max-w-[100vw] px-[5%] py-4 md:py-5 lg:py-6 grid grid-cols-2 md:grid-cols-3 items-center">
        {/* Left placeholder (only on md+) to keep logo centered */}
        <div className="hidden md:block" />

        {/* Center: Logo */}
        <Link href="/" className="justify-self-start md:justify-self-center flex items-center gap-2">
          <img src="/images/FutureFlowAI Logo.webp" alt="Logo van FutureFlowAI" className="h-5 w-auto" />
        </Link>

        {/* Right: Keep only contact CTA, visible on all viewports */}
        <div className="flex items-center justify-end">
          <Link href="/vrijblijvend-gesprek-inplannen" className="inline-flex items-center px-4 py-2 rounded-full border border-gray-200 text-[#3D3D3D] hover:bg-gray-50 font-medium">
            Contact
          </Link>
        </div>
      </div>

    </header>
  )
}
