import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import ClientLayout from "./client-layout"
import "./globals.css"

export const metadata: Metadata = {
  title: "Gewoon Beginnen met AI - FutureFlowAI",
  description: "Praktische gids voor ondernemers die willen starten met AI zonder technische kennis",
  generator: "v0.dev",
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
        <link rel="preload" href="/images/x-101-front-cover.jpeg" as="image" />
        <link rel="preload" href="/images/x-101-back-cover.jpeg" as="image" />
        <link rel="preload" href="/images/dutch-ai-front-cover.jpeg" as="image" />
        <link rel="preload" href="/images/dutch-ai-back-cover.jpeg" as="image" />
        <style dangerouslySetInnerHTML={{ __html: `
html {
  font-family: '${GeistSans.style.fontFamily}';
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
body {
  transition: background-color 1s ease;
}
        ` }} />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
