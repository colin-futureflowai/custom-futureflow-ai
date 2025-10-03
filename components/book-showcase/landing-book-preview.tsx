"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { TrackballControls, Environment } from "@react-three/drei"
import { Suspense, useRef, useEffect, useState, useCallback } from "react"
import { DutchAIBook } from "./dutch-ai-book"

// Child component so useFrame runs inside the <Canvas> tree
function PulsingBook({
  scale,
  position,
  baseRotationX,
}: {
  scale: [number, number, number]
  position: [number, number, number]
  baseRotationX: number
}) {
  const groupRef = useRef<any>(null)
  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    groupRef.current.rotation.x = baseRotationX + Math.cos(t * 0.6) * 0.02
    groupRef.current.rotation.y = Math.sin(t * 0.6) * 0.06
  })
  return (
    <group ref={groupRef} scale={scale} position={position} rotation={[baseRotationX, 0, 0]}>
      <DutchAIBook autoRotate={false} rotationSpeed={0} />
    </group>
  )
}

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
    // Increase mobile scale by ~1.5x
    if (windowWidth < 480) return [4.2, 4.2, 4.2] // Extra small mobile
    if (windowWidth < 640) return [4.8, 4.8, 4.8] // Small mobile
    if (windowWidth < 768) return [5.7, 5.7, 5.7] // Large mobile
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

  const baseX = params.rotation[0]

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
          {/* Subtle pulsing rotation using useFrame */}
          {/** Update the rotation around Y with a small oscillation **/}
          {/** We keep this outside of R3F tree; useFrame below will mutate groupRef rotation **/}

          {/* Lighting setup from example */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <directionalLight position={[-5, 8, 10]} intensity={0.8} color="#fffacd" />

          {/* Environment for reflections */}
          <Environment preset="sunset" />

          {/* The Dutch AI book with subtle pulsing animation */}
          <PulsingBook scale={params.scale} position={params.position} baseRotationX={baseX} />

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