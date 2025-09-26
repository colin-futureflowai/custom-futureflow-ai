/**
 * Content Provider Component
 * This will manage content fetching and caching
 * Ready for Basehub integration
 */

"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import type { LandingPageContent } from './types'
import { getContent } from './mock-data'
import { logger } from '@/lib/utils/logger'

interface ContentContextType {
  content: LandingPageContent | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

const ContentContext = createContext<ContentContextType | undefined>(undefined)

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<LandingPageContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchContent = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getContent()
      setContent(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load content')
      logger.error('Content loading error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContent()
  }, [])

  return (
    <ContentContext.Provider
      value={{
        content,
        loading,
        error,
        refetch: fetchContent
      }}
    >
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  const context = useContext(ContentContext)
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider')
  }
  return context
}