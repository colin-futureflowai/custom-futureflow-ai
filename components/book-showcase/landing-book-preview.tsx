"use client"

import { Canvas } from "@react-three/fiber"
import { TrackballControls, Environment } from "@react-three/drei"
import { Suspense, useRef } from "react"
import { DutchAIBook } from "./dutch-ai-book"

export default function LandingBookPreview() {
  const controlsRef = useRef<any>()

  // Book parameters matching the example
  const params = {
    scale: [5, 5, 5],
    position: [-3, -3, -3],
    rotation: [1.2, 0, 0],
    cameraPosition: [-4.2, -2.9, 0.4],
    cameraFov: 30
  }

  return (
    <div className="w-full h-full">
      <Canvas
        className="w-full h-full"
        camera={{
          position: params.cameraPosition,
          fov: params.cameraFov
        }}
        dpr={[1, 2]}
        legacy={true}
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

          {/* Interactive controls */}
          <TrackballControls
            ref={controlsRef}
            noPan={true}
            noZoom={true}
            enableRotate={true}
            staticMoving={false}
            dynamicDampingFactor={0.05}
            rotateSpeed={1.5}
            target={params.position}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}