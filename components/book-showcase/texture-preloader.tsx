"use client"

import { booksData } from "./books-data"

class TexturePreloaderClass {
  private static instance: TexturePreloaderClass
  private preloadedImages: Map<string, HTMLImageElement> = new Map()

  static getInstance(): TexturePreloaderClass {
    if (!TexturePreloaderClass.instance) {
      TexturePreloaderClass.instance = new TexturePreloaderClass()
    }
    return TexturePreloaderClass.instance
  }

  async preloadImage(src: string): Promise<HTMLImageElement> {
    // Check if already preloaded
    if (this.preloadedImages.has(src)) {
      return this.preloadedImages.get(src)!
    }

    // Create and load new image
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = "anonymous"

      img.onload = () => {
        this.preloadedImages.set(src, img)
        resolve(img)
      }

      img.onerror = () => {
        reject(new Error(`Failed to load image: ${src}`))
      }

      img.src = src
    })
  }

  async preloadAllBookTextures(): Promise<void> {
    const allTextures: string[] = []

    booksData.forEach((book) => {
      allTextures.push(book.coverUrl, book.backUrl, book.spineUrl)
    })

    await Promise.all(
      allTextures.map(src => this.preloadImage(src).catch(err => {
        console.warn(`Failed to preload texture: ${src}`, err)
      }))
    )
  }

  getPreloadedImage(src: string): HTMLImageElement | null {
    return this.preloadedImages.get(src) || null
  }
}

// Export singleton instance
export const TexturePreloader = TexturePreloaderClass

// Legacy component for compatibility
export function TexturePreloaderComponent() {
  // This component doesn't need to do anything since preloading
  // is now handled by the singleton class
  return null
}