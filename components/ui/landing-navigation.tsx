"use client"

import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface NavItem {
  id: string
  label: string
  href: string
}

interface LandingNavigationProps {
  navItems: NavItem[]
  className?: string
}

export function LandingNavigation({ navItems, className }: LandingNavigationProps) {
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Check if page is scrolled for sticky nav styling
      setIsScrolled(window.scrollY > 20)

      // Find active section based on scroll position
      const sections = navItems.map(item => {
        // Skip the home link which is just '#'
        if (item.href === '#') {
          return null
        }
        const element = document.querySelector(item.href)
        if (element) {
          const rect = element.getBoundingClientRect()
          return {
            id: item.id,
            top: rect.top,
            bottom: rect.bottom
          }
        }
        return null
      }).filter(Boolean)

      // Find which section is currently in view
      const windowHeight = window.innerHeight
      const viewportCenter = windowHeight / 2

      for (const section of sections) {
        if (section && section.top <= viewportCenter && section.bottom >= viewportCenter) {
          setActiveSection(section.id)
          break
        }
      }

      // If at top of page, set to home
      if (window.scrollY < 100) {
        setActiveSection('home')
      }
    }

    // Initial check
    handleScroll()

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [navItems])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()

    // Close mobile menu
    setIsMobileMenuOpen(false)

    // Special handling for home
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    // Scroll to section
    const element = document.querySelector(href)
    if (element) {
      const offset = 80 // Account for fixed nav height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 hidden md:block transition-all duration-300",
        isScrolled ? "bg-white shadow-lg" : "bg-white/80 backdrop-blur-sm",
        className
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo / Brand */}
            <div className="flex-shrink-0">
              <a
                href="#"
                onClick={(e) => handleNavClick(e, '#')}
                className="text-lg font-bold text-[#32a029] hover:text-[#32a029]/80 transition-colors"
              >
                FutureFlowAI
              </a>
            </div>

            {/* Navigation Items */}
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    activeSection === item.id
                      ? "bg-[#32a029] text-white"
                      : "text-[#3D3D3D] hover:bg-[#32a029]/10 hover:text-[#32a029]"
                  )}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div>
              <a
                href="#preorder-section"
                onClick={(e) => handleNavClick(e, '#preorder-section')}
                className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-[#32a029] hover:bg-[#32a029]/90 transition-colors shadow-sm"
              >
                Pre-order Nu
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 md:hidden transition-all duration-300",
        isScrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-sm",
        className
      )}>
        <div className="px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => handleNavClick(e, '#')}
              className="text-lg font-bold text-[#32a029]"
            >
              FutureFlowAI
            </a>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-[#3D3D3D] hover:bg-gray-100 transition-colors"
              aria-label="Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="pb-4 border-t border-gray-200">
              <div className="pt-2 space-y-1">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={cn(
                      "block px-3 py-2 rounded-lg text-base font-medium transition-colors",
                      activeSection === item.id
                        ? "bg-[#32a029] text-white"
                        : "text-[#3D3D3D] hover:bg-[#32a029]/10 hover:text-[#32a029]"
                    )}
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="#preorder-section"
                  onClick={(e) => handleNavClick(e, '#preorder-section')}
                  className="block mt-2 px-3 py-2 text-center border border-transparent text-base font-medium rounded-lg text-white bg-[#32a029] hover:bg-[#32a029]/90 transition-colors"
                >
                  Pre-order Nu
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Progress Indicator */}
      <div className="fixed top-16 left-0 right-0 h-1 bg-gray-200 z-40">
        <div
          className="h-full bg-[#32a029] transition-all duration-300"
          style={{
            width: `${
              activeSection === 'home' ? 25 :
              activeSection === 'waarom' ? 50 :
              activeSection === 'inhoud' ? 75 :
              activeSection === 'preorder' ? 100 : 0
            }%`
          }}
        />
      </div>

      {/* Side Dots Navigation (Desktop Only) */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col space-y-3 z-40">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            onClick={(e) => handleNavClick(e, item.href)}
            className="group flex items-center justify-end"
            aria-label={item.label}
          >
            <span className={cn(
              "text-xs font-medium mr-2 transition-all duration-200",
              activeSection === item.id
                ? "opacity-100 translate-x-0 text-[#32a029]"
                : "opacity-0 translate-x-2 text-[#3D3D3D] group-hover:opacity-100 group-hover:translate-x-0"
            )}>
              {item.label}
            </span>
            <span className={cn(
              "block w-3 h-3 rounded-full border-2 transition-all duration-200",
              activeSection === item.id
                ? "bg-[#32a029] border-[#32a029] scale-125"
                : "bg-white border-gray-400 hover:border-[#32a029] hover:scale-110"
            )} />
          </a>
        ))}
      </div>

      {/* Spacer for fixed nav */}
      <div className="h-16" />
    </>
  )
}