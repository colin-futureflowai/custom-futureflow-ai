'use client'

import { useEffect, useState } from 'react'

interface ABTestResults {
  results: Record<string, number>
  totalAssignments: number
}

export default function ABDashboard() {
  const [results, setResults] = useState<ABTestResults | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchResults()
    // Refresh every 5 seconds
    const interval = setInterval(fetchResults, 5000)
    return () => clearInterval(interval)
  }, [])

  const fetchResults = async () => {
    try {
      const response = await fetch('/api/ab-test')
      if (!response.ok) {
        throw new Error('Failed to fetch results')
      }
      const data = await response.json()
      setResults(data)
      setError(null)
    } catch (err) {
      setError('Failed to load A/B test results')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (process.env.NODE_ENV !== 'development') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            A/B Test Dashboard
          </h1>
          <p className="text-gray-600">
            This dashboard is only available in development mode.
          </p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#32a029] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading A/B test results...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchResults}
            className="mt-4 px-4 py-2 bg-[#32a029] text-white rounded hover:bg-[#2a8524]"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  const calculatePercentage = (value: number, total: number) => {
    if (total === 0) return '0'
    return ((value / total) * 100).toFixed(1)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-[#3D3D3D] mb-8">
          A/B Test Dashboard
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Test Configuration</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">Variant A</p>
              <p className="font-semibold">/preorder (Pre-order)</p>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">Variant B</p>
              <p className="font-semibold">/workshop (Workshop)</p>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">Variant C</p>
              <p className="font-semibold">/consulting (Consulting)</p>
            </div>
          </div>
        </div>

        {results && (
          <>
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Assignment Results</h2>
              <div className="mb-4">
                <p className="text-sm text-gray-600">Total Assignments</p>
                <p className="text-3xl font-bold text-[#32a029]">
                  {results.totalAssignments}
                </p>
              </div>

              <div className="space-y-4">
                {Object.entries(results.results).map(([variant, count]) => {
                  const percentage = calculatePercentage(count, results.totalAssignments)
                  return (
                    <div key={variant} className="border-b pb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{variant}</span>
                        <span className="text-sm text-gray-600">
                          {count} assignments ({percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-[#32a029] h-2.5 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Test Actions</h2>
              <div className="space-x-4">
                <button
                  onClick={() => {
                    localStorage.removeItem('ab_variant')
                    localStorage.removeItem('ab_timestamp')
                    alert('A/B test cache cleared! Refresh the homepage to get a new variant.')
                  }}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Clear Local Cache
                </button>
                <button
                  onClick={fetchResults}
                  className="px-4 py-2 bg-[#32a029] text-white rounded hover:bg-[#2a8524]"
                >
                  Refresh Results
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                Note: Results are stored in memory and will reset when the server restarts.
                In production, use a proper analytics service.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}