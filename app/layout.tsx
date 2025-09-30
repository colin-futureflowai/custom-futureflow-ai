import type React from "react"
import type { Metadata } from "next"
import ClientLayout from "./client-layout"
import "./globals.css"
import "./fonts.css"

export const metadata: Metadata = {
  title: "Gewoon Beginnen met AI - FutureFlowAI",
  description: "Praktische gids voor ondernemers die willen starten met AI zonder technische kennis",
  icons: {
    icon: [
      { url: '/images/favicon.png', type: 'image/png' },
      { url: '/images/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/favicon.png', sizes: '16x16', type: 'image/png' }
    ],
    apple: '/images/favicon.png',
    other: [
      {
        rel: 'icon',
        url: '/images/favicon.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        rel: 'icon',
        url: '/images/favicon.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/br-sonoma-font-family-1758593106-0/BRSonoma-Medium-BF654c45266edd1.otf" as="font" type="font/otf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/br-sonoma-font-family-1758593106-0/BRSonoma-SemiBold-BF654c45268c340.otf" as="font" type="font/otf" crossOrigin="anonymous" />
        <link rel="preload" href="/images/x-101-front-cover.jpeg" as="image" />
        <link rel="preload" href="/images/x-101-back-cover.jpeg" as="image" />
        <link rel="preload" href="/images/dutch-ai-front-cover.jpeg" as="image" />
        <link rel="preload" href="/images/dutch-ai-back-cover.jpeg" as="image" />
        <style dangerouslySetInnerHTML={{ __html: `
html {
  font-family: 'BR Sonoma', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-sans: 'BR Sonoma', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-mono: 'Courier New', monospace;
}
body {
  transition: background-color 1s ease;
  font-family: 'BR Sonoma', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 500;
}
        ` }} />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
