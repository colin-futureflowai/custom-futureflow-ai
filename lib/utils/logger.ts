/**
 * Logger utility for controlled logging
 * Only logs in development mode unless explicitly enabled
 */

const isDevelopment = process.env.NODE_ENV === 'development'
const isDebugEnabled = process.env.NEXT_PUBLIC_DEBUG === 'true'

export const logger = {
  log: (...args: any[]) => {
    if (isDevelopment || isDebugEnabled) {
      console.log(...args)
    }
  },

  error: (...args: any[]) => {
    // Always log errors but sanitize in production
    if (isDevelopment || isDebugEnabled) {
      console.error(...args)
    } else {
      // In production, log sanitized errors without sensitive details
      console.error('An error occurred')
    }
  },

  warn: (...args: any[]) => {
    if (isDevelopment || isDebugEnabled) {
      console.warn(...args)
    }
  },

  debug: (...args: any[]) => {
    if (isDevelopment && isDebugEnabled) {
      console.debug(...args)
    }
  },

  info: (...args: any[]) => {
    if (isDevelopment || isDebugEnabled) {
      console.info(...args)
    }
  }
}