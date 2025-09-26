"use client"

import React, { useEffect, useRef, useCallback, useState } from 'react'
import { logger } from '@/lib/utils/logger'

// Helper to parse 'rgb(r, g, b)' or 'rgba(r, g, b, a)' string to {r, g, b}
const parseRgbColor = (colorString: string | null): { r: number; g: number; b: number } | null => {
    if (!colorString) return null
    const match = colorString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/)
    if (match) {
        return {
            r: parseInt(match[1], 10),
            g: parseInt(match[2], 10),
            b: parseInt(match[3], 10),
        }
    }
    return null
}

// Play and Pause Icons
const PlayIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 5V19L19 12L8 5Z" />
    </svg>
)

const PauseIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 4H10V20H6V4Z" />
        <path d="M14 4H18V20H14V4Z" />
    </svg>
)

interface NavItem {
    id: string
    label: string
    href?: string
    target?: string
    onClick?: () => void
}

interface HeroSectionProps {
    heading?: string
    tagline?: string
    buttonText?: string
    onButtonClick?: () => void
    imageUrl?: string
    videoUrl?: string
    navItems?: NavItem[]
    showNav?: boolean
    customContent?: React.ReactNode
    originalPrice?: number
}

const defaultNavItems: NavItem[] = [
    { id: 'home', label: 'Home', href: '#' },
    { id: 'about', label: 'Over het boek', href: '#about-section' },
]

const rightNavItems: NavItem[] = [
    { id: 'pricing', label: 'Pre-order', href: '#preorder-section' },
    { id: 'contact', label: 'Contact', href: '#contact-section' },
]

const HeroSection: React.FC<HeroSectionProps> = ({
    heading = "Gewoon Beginnen met AI",
    tagline = "Elke Ondernemer Kan AI Leren",
    buttonText = "Pre-order Nu - €27",
    onButtonClick,
    imageUrl,
    videoUrl,
    navItems = defaultNavItems,
    showNav = true,
    customContent,
    originalPrice = 47,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const targetRef = useRef<HTMLButtonElement>(null)
    const mousePosRef = useRef({ x: null as number | null, y: null as number | null })
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
    const animationFrameIdRef = useRef<number | null>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const [showVideo, setShowVideo] = useState(false)

    const resolvedCanvasColorsRef = useRef({
        strokeStyle: { r: 50, g: 160, b: 41 }, // FutureFlowAI green (#32a029)
    })

    useEffect(() => {
        const tempElement = document.createElement('div')
        tempElement.style.display = 'none'
        document.body.appendChild(tempElement)

        const updateResolvedColors = () => {
            // Use FutureFlowAI green for the arrow
            resolvedCanvasColorsRef.current.strokeStyle = { r: 50, g: 160, b: 41 }
        }
        updateResolvedColors()

        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class' && mutation.target === document.documentElement) {
                    updateResolvedColors()
                    break
                }
            }
        })
        observer.observe(document.documentElement, { attributes: true })

        return () => {
            observer.disconnect()
            if (tempElement.parentNode) {
                tempElement.parentNode.removeChild(tempElement)
            }
        }
    }, [])

    const drawArrow = useCallback(() => {
        if (!canvasRef.current || !targetRef.current || !ctxRef.current) return

        const targetEl = targetRef.current
        const ctx = ctxRef.current
        const mouse = mousePosRef.current

        const x0 = mouse.x
        const y0 = mouse.y

        if (x0 === null || y0 === null) return

        const rect = targetEl.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2

        // Calculate scroll-based fade
        const scrollY = window.scrollY
        const windowHeight = window.innerHeight
        const heroSectionHeight = windowHeight * 0.9 // Assume hero is about 90% of viewport

        // Start fading at 20% scroll, completely fade by 80% of hero section
        let scrollFade = 1
        if (scrollY > heroSectionHeight * 0.2) {
            scrollFade = Math.max(0, 1 - ((scrollY - heroSectionHeight * 0.2) / (heroSectionHeight * 0.6)))
        }

        // If we've scrolled past the hero section, hide arrow completely
        if (scrollY > heroSectionHeight) {
            return
        }

        const a = Math.atan2(cy - y0!, cx - x0!)
        const x1 = cx - Math.cos(a) * (rect.width / 2 + 12)
        const y1 = cy - Math.sin(a) * (rect.height / 2 + 12)

        const midX = (x0! + x1) / 2
        const midY = (y0! + y1) / 2
        const offset = Math.min(200, Math.hypot(x1 - x0!, y1 - y0!) * 0.5)
        const t = Math.max(-1, Math.min(1, (y0! - y1) / 200))
        const controlX = midX
        const controlY = midY + offset * t

        const r = Math.sqrt((x1 - x0!)**2 + (y1 - y0!)**2)
        const distanceOpacity = Math.min(1.0, (r - Math.max(rect.width, rect.height) / 2) / 500)

        // Combine distance opacity with scroll fade
        const finalOpacity = distanceOpacity * scrollFade

        const arrowColor = resolvedCanvasColorsRef.current.strokeStyle
        ctx.strokeStyle = `rgba(${arrowColor.r}, ${arrowColor.g}, ${arrowColor.b}, ${finalOpacity})`
        ctx.lineWidth = 2.5 // Thicker arrow for better visibility

        // Draw curve
        ctx.save()
        ctx.beginPath()
        ctx.moveTo(x0!, y0!)
        ctx.quadraticCurveTo(controlX, controlY, x1, y1)
        ctx.setLineDash([12, 4]) // Longer dashes for professional look
        ctx.stroke()
        ctx.restore()

        // Draw arrowhead
        const angle = Math.atan2(y1 - controlY, x1 - controlX)
        const headLength = 12 // Larger arrowhead
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(
            x1 - headLength * Math.cos(angle - Math.PI / 6),
            y1 - headLength * Math.sin(angle - Math.PI / 6)
        )
        ctx.moveTo(x1, y1)
        ctx.lineTo(
            x1 - headLength * Math.cos(angle + Math.PI / 6),
            y1 - headLength * Math.sin(angle + Math.PI / 6)
        )
        ctx.stroke()
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas || !targetRef.current) return

        ctxRef.current = canvas.getContext("2d")
        const ctx = ctxRef.current

        const updateCanvasSize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        const handleMouseMove = (e: MouseEvent) => {
            mousePosRef.current = { x: e.clientX, y: e.clientY }
        }

        const handleScroll = () => {
            // Scroll event will trigger redraw through the animation loop
        }

        window.addEventListener("resize", updateCanvasSize)
        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("scroll", handleScroll)
        updateCanvasSize()

        const animateLoop = () => {
            if (ctx && canvas) {
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                drawArrow()
            }
            animationFrameIdRef.current = requestAnimationFrame(animateLoop)
        }

        animateLoop()

        return () => {
            window.removeEventListener("resize", updateCanvasSize)
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("scroll", handleScroll)
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current)
            }
        }
    }, [drawArrow])

    useEffect(() => {
        const videoElement = videoRef.current
        if (videoElement && videoUrl) {
            const handleVideoEnd = () => {
                setShowVideo(false)
                videoElement.currentTime = 0
            }

            if (showVideo) {
                videoElement.play().catch(error => {
                    logger.warn("HeroSection: Video autoplay blocked", error)
                    setShowVideo(false)
                })
                videoElement.addEventListener('ended', handleVideoEnd)
            } else {
                videoElement.pause()
            }

            return () => {
                videoElement.removeEventListener('ended', handleVideoEnd)
            }
        }
    }, [showVideo, videoUrl])

    const handlePlayButtonClick = () => {
        if (videoUrl && videoRef.current) {
            if (showVideo) {
                // Video is playing, pause it
                videoRef.current.pause()
                setShowVideo(false)
            } else {
                // Video is paused, play it
                videoRef.current.play().catch(error => {
                    logger.warn("HeroSection: Video play blocked", error)
                })
                setShowVideo(true)
            }
        }
    }

    const handleCTAClick = () => {
        if (onButtonClick) {
            onButtonClick()
        } else {
            // Default scroll to pre-order section
            document.getElementById('preorder-section')?.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <div className="bg-white text-gray-700 min-h-screen flex flex-col">
            {showNav && (
                <nav className="w-full bg-white border-b border-gray-100">
                    <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-3 sm:py-4">
                        <div className="grid grid-cols-3 items-center">
                            {/* Left navigation items */}
                            <div className="flex items-center justify-start gap-6 sm:gap-8">
                                {defaultNavItems.map((item) => {
                                    const commonProps = {
                                        className: "text-sm sm:text-base font-normal text-gray-700 hover:text-[#32a029] focus:outline-none focus:text-[#32a029] transition-all duration-200 ease-in-out whitespace-nowrap",
                                        onClick: item.onClick,
                                    }
                                    if (item.href) {
                                        return (
                                            <a key={item.id} href={item.href} target={item.target} rel={item.target === '_blank' ? 'noopener noreferrer' : undefined} {...commonProps}>
                                                {item.label}
                                            </a>
                                        )
                                    }
                                    return (
                                        <button key={item.id} type="button" {...commonProps}>
                                            {item.label}
                                        </button>
                                    )
                                })}
                            </div>

                            {/* Center logo */}
                            <div className="flex items-center justify-center">
                                <img
                                    src="/images/FutureFlowAI Logo.webp"
                                    alt="FutureFlowAI"
                                    className="h-5 sm:h-6 w-auto"
                                />
                            </div>

                            {/* Right navigation items */}
                            <div className="flex items-center justify-end gap-6 sm:gap-8">
                                {rightNavItems.map((item) => {
                                    const commonProps = {
                                        className: "text-sm sm:text-base font-normal text-gray-700 hover:text-[#32a029] focus:outline-none focus:text-[#32a029] transition-all duration-200 ease-in-out whitespace-nowrap",
                                        onClick: item.onClick,
                                    }
                                    if (item.href) {
                                        return (
                                            <a key={item.id} href={item.href} target={item.target} rel={item.target === '_blank' ? 'noopener noreferrer' : undefined} {...commonProps}>
                                                {item.label}
                                            </a>
                                        )
                                    }
                                    return (
                                        <button key={item.id} type="button" {...commonProps}>
                                            {item.label}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </nav>
            )}

            <main className="flex-grow flex flex-col items-center justify-center pt-12 sm:pt-16">
                <div className="flex flex-col items-center">
                    <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-center px-4 leading-tight">
                        {heading.split(' ').map((word, i) => (
                            <span key={i}>
                                {word === 'AI' ? (
                                    <span className="text-[#32a029]">AI</span>
                                ) : (
                                    word
                                )}
                                {i < heading.split(' ').length - 1 && ' '}
                            </span>
                        ))}
                    </h1>
                    <p className="mt-4 block text-[#3D3D3D]/80 text-center text-lg sm:text-xl px-4 max-w-2xl">
                        {tagline}
                    </p>
                    <p className="mt-2 text-[#3D3D3D]/60 text-center text-base px-4">
                        Van twijfel naar toepassing in 11 praktische hoofdstukken
                    </p>
                </div>

                {/* Video Section - Moved here between title and button */}
                <div className="mt-8 lg:mt-10 w-full max-w-screen-md mx-auto overflow-hidden px-4 sm:px-2">
                    {customContent ? (
                        <div className="bg-white rounded-2xl p-4">
                            {customContent}
                        </div>
                    ) : (
                        <div className="bg-white rounded-[2rem] p-[0.5rem]">
                            <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 rounded-[1.5rem] bg-white flex items-center justify-center overflow-hidden">
                                {imageUrl && (
                                    <img
                                        src={imageUrl}
                                        alt="Preview"
                                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                                            showVideo ? 'opacity-0 pointer-events-none' : 'opacity-100'
                                        }`}
                                    />
                                )}
                                {videoUrl && (
                                    <>
                                        <video
                                            ref={videoRef}
                                            src={videoUrl}
                                            playsInline
                                            preload="metadata"
                                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                                                showVideo ? 'opacity-100 z-10' : (!imageUrl ? 'opacity-100' : 'opacity-0 pointer-events-none')
                                            }`}
                                        />
                                        <button
                                            onClick={handlePlayButtonClick}
                                            className="absolute bottom-4 left-4 z-20 p-3 bg-[#32a029]/80 hover:bg-[#32a029] text-white backdrop-blur-sm rounded-full transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white shadow-lg"
                                            aria-label={showVideo ? "Pause video" : "Play video"}
                                        >
                                            {showVideo ? (
                                                <PauseIcon className="w-6 h-6" />
                                            ) : (
                                                <PlayIcon className="w-6 h-6" />
                                            )}
                                        </button>
                                    </>
                                )}
                                {!imageUrl && !videoUrl && !customContent && (
                                    <div className="text-[#3D3D3D]/50 italic text-lg">
                                        Video of 3D Boek Preview
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Pre-order Button - Now below video */}
                <div className="mt-8 flex flex-col items-center gap-4">
                    <button
                        ref={targetRef}
                        onClick={handleCTAClick}
                        className="py-3 px-8 rounded-xl bg-[#32a029] hover:bg-[#2a8524] text-white font-semibold text-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#32a029] focus:ring-offset-2 shadow-lg"
                    >
                        {buttonText}
                        {originalPrice && (
                            <span className="ml-2 text-sm line-through opacity-70">€{originalPrice}</span>
                        )}
                    </button>
                    <p className="text-[#32a029] font-medium">
                        ✓ Al 150+ ondernemers gingen je voor
                    </p>
                </div>
            </main>

            <div className="h-12 sm:h-16 md:h-20"></div>
            <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10"></canvas>
        </div>
    )
}

export { HeroSection }