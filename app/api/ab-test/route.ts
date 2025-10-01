import { NextRequest, NextResponse } from 'next/server'

// Store A/B test results (in production, use a database or analytics service)
const testResults: Record<string, number> = {
  '/preorder': 0,
  '/workshop': 0,
  '/consulting': 0
}

export async function POST(request: NextRequest) {
  try {
    const { variant, event, data } = await request.json()

    // Log the A/B test event
    console.log(`[A/B Test] Event: ${event}, Variant: ${variant}`, data)

    // Track assignment
    if (event === 'assignment') {
      testResults[variant] = (testResults[variant] || 0) + 1
    }

    // You can add more tracking here:
    // - Conversion tracking
    // - Time on page
    // - Bounce rate
    // - etc.

    return NextResponse.json({
      success: true,
      message: 'Event tracked',
      currentResults: process.env.NODE_ENV === 'development' ? testResults : undefined
    })
  } catch (error) {
    console.error('[A/B Test] Tracking error:', error)
    return NextResponse.json(
      { error: 'Failed to track event' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { error: 'Not available in production' },
      { status: 403 }
    )
  }

  return NextResponse.json({
    results: testResults,
    totalAssignments: Object.values(testResults).reduce((a, b) => a + b, 0)
  })
}