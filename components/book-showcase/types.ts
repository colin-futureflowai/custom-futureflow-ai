import type * as THREE from "three"

export interface BookParams {
  scale?: [number, number, number]
  position?: [number, number, number]
  rotation?: [number, number, number]
  autoRotate?: boolean
  rotationSpeed?: number
  onDebugChange?: (params: any) => void
}

export interface MaterialProps {
  metalness?: number
  roughness?: number
  color?: string
  emissive?: string
  emissiveIntensity?: number
}

export interface BookData {
  id: number
  title: string
  author: string
  coverImage: string
  spineImage: string
  backImage: string
  description: string
  isbn: string
  publisher: string
  year: string
  price: string
  format: string
  pageCount: number
}

export interface TextureSet {
  cover: THREE.Texture
  spine: THREE.Texture
  back: THREE.Texture
}