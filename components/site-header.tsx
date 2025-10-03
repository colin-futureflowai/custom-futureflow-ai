"use client"

import Link from "next/link"

export default function SiteHeader() {

  return (
    <header className="w-full bg-white border-b border-gray-100">
      {/* Announcement bar */}

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
          <Link href="https://www.futureflowai.nl/vrijblijvend-gesprek-inplannen" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 rounded-full border border-gray-200 text-[#3D3D3D] hover:bg-gray-50 font-medium">
            Contact
          </Link>
        </div>
      </div>

    </header>
  )
}
