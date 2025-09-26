export interface BookData {
  title: string
  author: string
  description: string
  coverUrl: string
  backUrl: string
  spineUrl: string
}

export const booksData: BookData[] = [
  {
    title: "X-101: The Future of Technology",
    author: "Dr. Sarah Mitchell",
    description: "Exploring the next frontier of human-machine collaboration",
    coverUrl: "/images/x101-front.jpg",
    backUrl: "/images/x101-back.jpg",
    spineUrl: "/images/x101-spine.jpg",
  },
  {
    title: "Gewoon Beginnen met AI",
    author: "FutureFlowAI",
    description: "De praktische gids voor ondernemers zonder technische kennis",
    coverUrl: "/images/dutch-ai-front-cover.jpeg",
    backUrl: "/images/dutch-ai-back-cover.jpeg",
    spineUrl: "/images/dutch-ai-front-cover.jpeg", // Use front as spine for now
  },
  {
    title: "The Art of Code",
    author: "Marcus Chen",
    description: "Beautiful programming patterns and practices",
    coverUrl: "/images/art-of-code-front.jpg",
    backUrl: "/images/art-of-code-back.jpg",
    spineUrl: "/images/art-of-code-spine.jpg",
  },
  {
    title: "Digital Dreams",
    author: "Elena Rodriguez",
    description: "Stories from the intersection of humanity and AI",
    coverUrl: "/images/digital-dreams-front.jpg",
    backUrl: "/images/digital-dreams-back.jpg",
    spineUrl: "/images/digital-dreams-spine.jpg",
  },
  {
    title: "Beyond the Algorithm",
    author: "Prof. James Walker",
    description: "Understanding AI ethics in the modern world",
    coverUrl: "/images/beyond-algorithm-front.jpg",
    backUrl: "/images/beyond-algorithm-back.jpg",
    spineUrl: "/images/beyond-algorithm-spine.jpg",
  },
]