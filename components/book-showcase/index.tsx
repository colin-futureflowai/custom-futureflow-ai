"use client"

import { useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Float } from "@react-three/drei"
import { Book3DModel } from "./book-3d-model"
import { BookControls } from "./book-controls"
import { BookInfo } from "./book-info"
import { booksData } from "./books-data"
import { TexturePreloader } from "./texture-preloader"

export default function BookShowcase() {
  const [currentBookIndex, setCurrentBookIndex] = useState(1) // Start with Dutch AI book
  const [autoRotate, setAutoRotate] = useState(true)

  const nextBook = () => {
    setCurrentBookIndex((prev) => (prev + 1) % booksData.length)
  }

  const prevBook = () => {
    setCurrentBookIndex((prev) => (prev - 1 + booksData.length) % booksData.length)
  }

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <TexturePreloader />

      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 45 }}
          shadows
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1.5}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <Float
            speed={2}
            rotationIntensity={autoRotate ? 0.5 : 0}
            floatIntensity={0.2}
          >
            <Book3DModel
              bookIndex={currentBookIndex}
              autoRotate={autoRotate}
              rotationSpeed={0.5}
              onPointerDown={() => setAutoRotate(false)}
              onPointerUp={() => setAutoRotate(true)}
            />
          </Float>
          <Environment preset="studio" />
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={4}
            maxDistance={12}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2.2}
          />
        </Canvas>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-white/90 via-white/70 to-transparent">
        <BookInfo book={booksData[currentBookIndex]} />
        <BookControls
          onNext={nextBook}
          onPrev={prevBook}
          autoRotate={autoRotate}
          onToggleRotation={() => setAutoRotate(!autoRotate)}
          currentIndex={currentBookIndex}
          total={booksData.length}
        />
      </div>
    </div>
  )
}