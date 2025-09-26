"use client"

import { useGLTF } from "@react-three/drei"
import { useRef, useEffect, useState } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"

interface DutchAIBookProps {
  autoRotate?: boolean
  rotationSpeed?: number
}

export function DutchAIBook({
  autoRotate = false,
  rotationSpeed = 0
}: DutchAIBookProps) {
  const { scene } = useGLTF("/models/book_red.glb")
  const bookRef = useRef<THREE.Group>(null)
  const [bookScene, setBookScene] = useState<THREE.Object3D | null>(null)
  const [isReady, setIsReady] = useState(false)

  // Clone scene to avoid modifying the original
  useEffect(() => {
    if (scene) {
      const cloned = scene.clone()
      setBookScene(cloned)
      console.log("Book scene cloned")
    }
  }, [scene])

  // Apply textures
  useEffect(() => {
    if (!bookScene) return

    const loader = new THREE.TextureLoader()
    let frontTexture: THREE.Texture | null = null
    let backTexture: THREE.Texture | null = null
    let object2Mesh: THREE.Mesh | null = null

    // Find the correct mesh for the book cover
    const sketchfabModel = bookScene.getObjectByName("Sketchfab_model")
    if (sketchfabModel) {
      const geode = sketchfabModel.getObjectByName("Geode")
      if (geode) {
        const object2 = geode.getObjectByName("Object_2")
        if (object2 && object2 instanceof THREE.Mesh) {
          object2Mesh = object2
          console.log("Found Object_2 mesh for book cover")
        }
      }
    }

    // If hierarchy doesn't match, find first suitable mesh
    if (!object2Mesh) {
      bookScene.traverse((child) => {
        if (child instanceof THREE.Mesh && !object2Mesh) {
          object2Mesh = child as THREE.Mesh
          console.log(`Using fallback mesh: ${child.name}`)
        }
      })
    }

    if (!object2Mesh) {
      console.error("No suitable mesh found for textures")
      return
    }

    const applyTextures = () => {
      if (!frontTexture || !backTexture || !object2Mesh) return

      // Create a canvas to combine both textures
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Make canvas wide enough for both covers
      canvas.width = 2048
      canvas.height = 1024

      // Save the context state
      ctx.save()

      // Draw front cover on left half - rotated 90 degrees clockwise
      ctx.translate(512, 512) // Move to center of left half
      ctx.rotate(Math.PI / 2) // Rotate 90 degrees clockwise
      ctx.drawImage(frontTexture.image, -512, -512, 1024, 1024)

      // Restore for back cover
      ctx.restore()
      ctx.save()

      // Draw back cover on right half - rotated 90 degrees clockwise
      ctx.translate(1536, 512) // Move to center of right half
      ctx.rotate(Math.PI / 2) // Rotate 90 degrees clockwise
      ctx.drawImage(backTexture.image, -512, -512, 1024, 1024)

      ctx.restore()

      // Create combined texture
      const combinedTexture = new THREE.CanvasTexture(canvas)
      combinedTexture.flipY = false // Don't flip Y to fix upside down issue
      combinedTexture.colorSpace = THREE.SRGBColorSpace
      combinedTexture.wrapS = THREE.ClampToEdgeWrapping
      combinedTexture.wrapT = THREE.ClampToEdgeWrapping
      combinedTexture.minFilter = THREE.LinearFilter
      combinedTexture.magFilter = THREE.LinearFilter
      combinedTexture.needsUpdate = true

      // Generate UV coordinates for both covers
      const geometry = object2Mesh.geometry
      geometry.computeVertexNormals()
      geometry.computeBoundingBox()

      const positions = geometry.attributes.position
      const normals = geometry.attributes.normal
      const bbox = geometry.boundingBox!

      // Find Z range
      let maxZ = -Infinity
      let minZ = Infinity
      for (let i = 0; i < positions.count; i++) {
        const z = positions.getZ(i)
        maxZ = Math.max(maxZ, z)
        minZ = Math.min(minZ, z)
      }

      const width = bbox.max.x - bbox.min.x
      const height = bbox.max.y - bbox.min.y
      const zMid = (maxZ + minZ) / 2

      // Create new UV coordinates
      const uvArray = new Float32Array(positions.count * 2)

      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i)
        const y = positions.getY(i)
        const z = positions.getZ(i)
        const nz = normals.getZ(i)

        let u = 0, v = 0

        // Front cover (positive Z normal)
        if (nz > 0.5) {
          // Texture is rotated 90 degrees, so swap U and V
          u = (y - bbox.min.y) / height * 0.5 // Use Y for U (left half)
          v = (x - bbox.min.x) / width // Use X for V (not inverted to fix mirroring)
        }
        // Back cover (negative Z normal)
        else if (nz < -0.5) {
          // Texture is rotated 90 degrees, so swap U and V
          u = 0.5 + (y - bbox.min.y) / height * 0.5 // Use Y for U (right half)
          v = 1 - (x - bbox.min.x) / width // Use X for V (inverted for back)
        }
        // Spine or other parts
        else {
          u = 0.5
          v = 0.5
        }

        uvArray[i * 2] = u
        uvArray[i * 2 + 1] = v
      }

      geometry.setAttribute('uv', new THREE.BufferAttribute(uvArray, 2))
      geometry.attributes.uv.needsUpdate = true

      // Apply material with combined texture
      const material = new THREE.MeshStandardMaterial({
        map: combinedTexture,
        roughness: 0.4,
        metalness: 0.05,
        side: THREE.DoubleSide
      })

      object2Mesh.material = material
      console.log("Textures applied successfully")
      setIsReady(true)
    }

    // Load front cover
    loader.load(
      "/images/dutch-ai-front-cover.jpeg",
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace
        frontTexture = texture
        console.log("Front cover loaded")
        applyTextures()
      },
      undefined,
      (err) => console.error("Failed to load front cover:", err)
    )

    // Load back cover
    loader.load(
      "/images/dutch-ai-back-cover.jpeg",
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace
        backTexture = texture
        console.log("Back cover loaded")
        applyTextures()
      },
      undefined,
      (err) => console.error("Failed to load back cover:", err)
    )

    // Apply white material to pages
    bookScene.traverse((child) => {
      if (child instanceof THREE.Mesh && child !== object2Mesh) {
        if (child.name.toLowerCase().includes("page") || child.name.includes("Object_3")) {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(0xffffff),
            roughness: 0.9,
            metalness: 0
          })
        }
        // Enable shadows
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [bookScene])

  // Auto rotation (disabled by default)
  useFrame((state, delta) => {
    if (bookRef.current && autoRotate && isReady) {
      bookRef.current.rotation.y += delta * rotationSpeed
    }
  })

  if (!bookScene) {
    return null
  }

  return (
    <group ref={bookRef}>
      <primitive object={bookScene} />
    </group>
  )
}

// Preload the model
useGLTF.preload("/models/book_red.glb")