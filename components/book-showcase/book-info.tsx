"use client"

interface BookInfoProps {
  book: {
    title: string
    author: string
    description: string
  }
}

export function BookInfo({ book }: BookInfoProps) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h2>
      <p className="text-lg text-gray-600 mb-1">by {book.author}</p>
      <p className="text-sm text-gray-500">{book.description}</p>
    </div>
  )
}