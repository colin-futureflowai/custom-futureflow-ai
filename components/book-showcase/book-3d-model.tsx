"use client"

import { useRef, useEffect, useState, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { useGLTF } from "@react-three/drei"
import { booksData } from "./books-data"
import { generateUVForBothCovers, debugAllObjectsUV, debugUVMapping } from "./uv-debugger-safe"
import { TexturePreloader } from "./texture-preloader"

interface Book3DModelProps {
  bookIndex: number
  autoRotate?: boolean
  rotationSpeed?: number
  onPointerDown?: () => void
  onPointerUp?: () => void
}

export function Book3DModel({
  bookIndex,
  autoRotate = false,
  rotationSpeed = 0.5,
  onPointerDown,
  onPointerUp
}: Book3DModelProps) {
  const meshRef = useRef<THREE.Group>(null)
  const [isDragging, setIsDragging] = useState(false)

  // Use the correct GLB model with UV mapping
  const { scene } = useGLTF("/models/book_red.glb")

  const [bookScene, setBookScene] = useState<THREE.Object3D | null>(null)
  const [object2Mesh, setObject2Mesh] = useState<THREE.Mesh | null>(null)
  const [uvGenerated, setUvGenerated] = useState(false)
  const [combinedTexture, setCombinedTexture] = useState<THREE.Texture | null>(null)

  const book = booksData[bookIndex]

  // Clone the scene to avoid modifying the original
  useEffect(() => {
    if (scene && !bookScene) {
      const clonedScene = scene.clone()
      setBookScene(clonedScene)
    }
  }, [scene, bookScene])

  // Setup UV mapping for the book model
  useEffect(() => {
    if (bookScene && !uvGenerated) {
      try {
        debugAllObjectsUV(bookScene)
      } catch (error) {
        console.log("Error during UV analysis:", error)
      }

      // Try to find the book cover mesh using the correct hierarchy
      const sketchfabModel = bookScene.getObjectByName("Sketchfab_model")
      if (sketchfabModel) {
        const geode = sketchfabModel.getObjectByName("Geode")
        if (geode) {
          const object2 = geode.getObjectByName("Object_2")
          if (object2 && (object2 as THREE.Mesh).material) {
            const mesh = object2 as THREE.Mesh
            console.log("Found Object_2 - book cover material")

            generateUVForBothCovers(mesh)
            setUvGenerated(true)
            debugUVMapping(mesh)

            setObject2Mesh(mesh)
          }
        }
      } else {
        // Fallback for simpler model structure
        bookScene.traverse((child) => {
          if (child instanceof THREE.Mesh && !object2Mesh) {
            console.log(`Using fallback mesh: ${child.name}`)
            generateUVForBothCovers(child)
            setUvGenerated(true)
            setObject2Mesh(child)
          }
        })
      }
    }
  }, [bookScene, uvGenerated, object2Mesh])

  // Create combined texture from front and back covers
  const createCombinedTexture = (frontTexture: THREE.Texture, backTexture: THREE.Texture) => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return null

    // Set canvas size to accommodate both textures side by side
    canvas.width = frontTexture.image.width * 2
    canvas.height = frontTexture.image.height

    // Draw front cover on left half
    ctx.drawImage(frontTexture.image, 0, 0, frontTexture.image.width, frontTexture.image.height)

    // Draw back cover on right half
    ctx.drawImage(backTexture.image, frontTexture.image.width, 0, backTexture.image.width, backTexture.image.height)

    // Create texture from combined canvas
    const combined = new THREE.CanvasTexture(canvas)
    combined.flipY = true
    combined.colorSpace = THREE.SRGBColorSpace
    combined.wrapS = THREE.ClampToEdgeWrapping
    combined.wrapT = THREE.ClampToEdgeWrapping
    combined.minFilter = THREE.LinearFilter
    combined.magFilter = THREE.LinearFilter
    combined.generateMipmaps = false
    combined.needsUpdate = true

    return combined
  }

  // Load textures with preloader fallback
  useEffect(() => {
    const loader = new THREE.TextureLoader()
    const preloader = TexturePreloader.getInstance()
    let frontTexture: THREE.Texture | null = null
    let backTexture: THREE.Texture | null = null

    const checkAndCombine = () => {
      if (frontTexture && backTexture) {
        const combined = createCombinedTexture(frontTexture, backTexture)
        if (combined) {
          setCombinedTexture(combined)
        }
      }
    }

    const loadTextureWithFallback = (
      path: string,
      onLoad: (texture: THREE.Texture) => void,
      onError: (error: any) => void
    ) => {
      // Try to use preloaded image first
      const preloadedImg = preloader.getPreloadedImage(path)
      if (preloadedImg) {
        const texture = new THREE.Texture(preloadedImg)
        texture.flipY = true
        texture.colorSpace = THREE.SRGBColorSpace
        texture.minFilter = THREE.LinearFilter
        texture.magFilter = THREE.LinearFilter
        texture.generateMipmaps = false
        texture.needsUpdate = true
        onLoad(texture)
        return
      }

      // Fallback to regular THREE.TextureLoader
      loader.load(path, onLoad, undefined, onError)
    }

    // Load front cover
    loadTextureWithFallback(
      book.coverUrl,
      (texture) => {
        texture.flipY = true
        texture.colorSpace = THREE.SRGBColorSpace
        texture.minFilter = THREE.LinearFilter
        texture.magFilter = THREE.LinearFilter
        texture.generateMipmaps = false
        frontTexture = texture
        checkAndCombine()
      },
      (error) => {
        console.error("Error loading front cover:", error)
      }
    )

    // Load back cover
    loadTextureWithFallback(
      book.backUrl,
      (texture) => {
        texture.flipY = true
        texture.colorSpace = THREE.SRGBColorSpace
        texture.minFilter = THREE.LinearFilter
        texture.magFilter = THREE.LinearFilter
        texture.generateMipmaps = false
        backTexture = texture
        checkAndCombine()
      },
      (error) => {
        console.error("Error loading back cover:", error)
      }
    )
  }, [book.coverUrl, book.backUrl])

  // Apply textures to the book mesh
  useEffect(() => {
    if (object2Mesh && combinedTexture && uvGenerated) {
      const material = new THREE.MeshStandardMaterial({
        map: combinedTexture,
        roughness: 0.4,
        metalness: 0.05,
        side: THREE.DoubleSide
      })

      // Apply polygon offset to prevent z-fighting
      material.polygonOffset = true
      material.polygonOffsetFactor = -1
      material.polygonOffsetUnits = -1

      object2Mesh.material = material
      console.log("Applied combined texture to book cover")
    }
  }, [object2Mesh, combinedTexture, uvGenerated])

  // Also apply textures to other parts if needed
  useEffect(() => {
    if (bookScene) {
      const loader = new THREE.TextureLoader()

      // Load spine texture
      loader.load(book.spineUrl, (spineTexture) => {
        spineTexture.minFilter = THREE.LinearFilter
        spineTexture.magFilter = THREE.LinearFilter
        spineTexture.generateMipmaps = false

        bookScene.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            // Apply spine texture to spine mesh if found
            if (child.name.toLowerCase().includes("spine")) {
              child.material = new THREE.MeshStandardMaterial({
                map: spineTexture,
                roughness: 0.4,
                metalness: 0.05,
              })
            }
            // Make pages white
            else if (child.name.toLowerCase().includes("page") && child !== object2Mesh) {
              child.material = new THREE.MeshStandardMaterial({
                color: new THREE.Color(0xffffff),
                roughness: 0.9,
                metalness: 0,
              })
            }

            // Enable shadows for all meshes
            child.castShadow = true
            child.receiveShadow = true
          }
        })
      })
    }
  }, [bookScene, book.spineUrl, object2Mesh])

  useFrame((state, delta) => {
    if (meshRef.current && autoRotate && !isDragging) {
      meshRef.current.rotation.y += delta * rotationSpeed
    }
  })

  if (!bookScene) return null

  return (
    <group
      ref={meshRef}
      scale={[2, 2, 2]}
      position={[0, 0, 0]}
      onPointerDown={() => {
        setIsDragging(true)
        onPointerDown?.()
      }}
      onPointerUp={() => {
        setIsDragging(false)
        onPointerUp?.()
      }}
      onPointerLeave={() => {
        setIsDragging(false)
        onPointerUp?.()
      }}
    >
      <primitive object={bookScene} />
    </group>
  )
}

useGLTF.preload("/models/book_red.glb")