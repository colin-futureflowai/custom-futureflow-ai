"use client"

import { Canvas } from "@react-three/fiber"
import { TrackballControls, Environment } from "@react-three/drei"
import { Suspense, useRef, useEffect, useState, useCallback } from "react"
import { DutchAIBook } from "./dutch-ai-book"

export default function LandingBookPreview() {
  const controlsRef = useRef<any>()
  const [windowWidth, setWindowWidth] = useState(0)
  const resizeTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const handleResize = () => {
      // Debounce resize events for better performance
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }
      resizeTimeoutRef.current = setTimeout(() => {
        setWindowWidth(window.innerWidth)
      }, 150)
    }

    // Set initial width immediately
    setWindowWidth(window.innerWidth)

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }
    }
  }, [])

  // Calculate responsive scale based on window width
  const getScale = (): [number, number, number] => {
    if (windowWidth < 480) return [2.8, 2.8, 2.8] // Extra small mobile
    if (windowWidth < 640) return [3.2, 3.2, 3.2] // Small mobile
    if (windowWidth < 768) return [3.8, 3.8, 3.8] // Large mobile
    if (windowWidth < 1024) return [4.5, 4.5, 4.5] // Tablet
    return [5, 5, 5] // Desktop
  }

  const getPosition = (): [number, number, number] => {
    if (windowWidth < 480) return [-1.5, -1.5, -1.5]
    if (windowWidth < 640) return [-2, -2, -2]
    if (windowWidth < 768) return [-2.5, -2.5, -2.5]
    return [-3, -3, -3]
  }

  const getCameraPosition = (): [number, number, number] => {
    if (windowWidth < 480) return [-3.0, -2.2, 0.25]
    if (windowWidth < 640) return [-3.5, -2.5, 0.3]
    if (windowWidth < 768) return [-3.8, -2.7, 0.35]
    return [-4.2, -2.9, 0.4]
  }

  const getCameraFov = () => {
    if (windowWidth < 480) return 40
    if (windowWidth < 768) return 35
    return 30
  }

  // Book parameters - responsive based on screen size
  const params = {
    scale: getScale(),
    position: getPosition(),
    rotation: [1.2, 0, 0] as [number, number, number],
    cameraPosition: getCameraPosition(),
    cameraFov: getCameraFov()
  }

  // Get device pixel ratio optimized for mobile
  const getDpr = (): [number, number] => {
    // Lower DPR for mobile devices to improve performance
    if (windowWidth < 768) return [1, 1.5]
    return [1, 2]
  }

  // Only render when we have a window width
  if (windowWidth === 0) return null

  return (
    <div className="w-full h-full">
      <Canvas
        key={`canvas-${Math.floor(windowWidth / 100) * 100}`} // Reduce re-renders
        className="w-full h-full"
        camera={{
          position: params.cameraPosition,
          fov: params.cameraFov
        }}
        dpr={getDpr()}
        legacy={true}
        performance={{ min: 0.5 }} // Performance optimization for mobile
      >
        <Suspense fallback={null}>
          {/* Lighting setup from example */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <directionalLight position={[-5, 8, 10]} intensity={0.8} color="#fffacd" />

          {/* Environment for reflections */}
          <Environment preset="sunset" />

          {/* The Dutch AI book */}
          <group
            scale={params.scale}
            position={params.position}
            rotation={params.rotation}
          >
            <DutchAIBook
              autoRotate={false}
              rotationSpeed={0}
            />
          </group>

          {/* Interactive controls optimized for touch */}
          <TrackballControls
            ref={controlsRef}
            noPan={true}
            noZoom={true}
            staticMoving={false}
            dynamicDampingFactor={0.05}
            rotateSpeed={windowWidth < 768 ? 2.0 : 1.5} // Faster rotation on mobile for better touch response
            target={params.position}
            minDistance={5}
            maxDistance={20}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}