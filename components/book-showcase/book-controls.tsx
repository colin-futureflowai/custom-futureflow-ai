"use client"

import { ChevronLeft, ChevronRight, RotateCw } from "lucide-react"

interface BookControlsProps {
  onNext: () => void
  onPrev: () => void
  autoRotate: boolean
  onToggleRotation: () => void
  currentIndex: number
  total: number
}

export function BookControls({
  onNext,
  onPrev,
  autoRotate,
  onToggleRotation,
  currentIndex,
  total,
}: BookControlsProps) {
  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <button
        onClick={onPrev}
        className="p-3 bg-white/90 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-200"
        aria-label="Previous book"
      >
        <ChevronLeft className="w-6 h-6 text-gray-700" />
      </button>

      <button
        onClick={onToggleRotation}
        className={`p-3 bg-white/90 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 ${
          autoRotate ? "text-blue-600" : "text-gray-400"
        }`}
        aria-label="Toggle rotation"
      >
        <RotateCw className="w-6 h-6" />
      </button>

      <div className="px-4 py-2 bg-white/90 rounded-full shadow-lg">
        <span className="text-sm font-medium text-gray-700">
          {currentIndex + 1} / {total}
        </span>
      </div>

      <button
        onClick={onNext}
        className="p-3 bg-white/90 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-200"
        aria-label="Next book"
      >
        <ChevronRight className="w-6 h-6 text-gray-700" />
      </button>
    </div>
  )
}