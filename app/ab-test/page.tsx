import { cookies } from 'next/headers'
import Link from 'next/link'
import { VARIANTS } from '@/lib/ab-testing'
import { getAllLandingPages } from '@/lib/basehub-pages'

export default async function ABTestPage() {
  const cookieStore = cookies()
  const currentVariant = cookieStore.get('ab_variant')?.value || 'Not set'

  // Get all landing pages from BaseHub
  const landingPages = await getAllLandingPages()

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">A/B Test & URL Manager</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Current Status</h2>
          <p className="text-gray-700">
            Your current variant (for /landing): <span className="font-mono bg-gray-100 px-2 py-1 rounded">{currentVariant}</span>
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Landing Pages in BaseHub</h2>
          <p className="text-gray-600 mb-4">These URLs are managed in BaseHub. Edit the Page Config in each branch to add/modify URLs:</p>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {landingPages.map((page) => (
                  <tr key={page.slug}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="text-sm text-gray-900">/{page.slug}</code>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        page.branch === 'main' ? 'bg-green-100 text-green-800' :
                        page.branch === 'variant-urgent' ? 'bg-orange-100 text-orange-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {page.branch}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {page.title || page.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Link
                        href={`/${page.slug}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Visit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">How to manage URLs in BaseHub:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-blue-700">
              <li>Go to BaseHub dashboard</li>
              <li>Switch to the branch you want to configure (main, variant-urgent, or variant-social)</li>
              <li>Navigate to Landing Page → Page Config</li>
              <li>Edit the "Custom Slug" field to set the URL for this branch</li>
              <li>Save and the URL will be immediately available</li>
            </ol>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">BaseHub Branch Management</h2>
          <p className="text-gray-600 mb-4">Each branch can have its own custom URL:</p>

          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900">Example Setup:</h3>
              <ul className="mt-2 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>main branch:</strong>
                  <span className="ml-2">Custom Slug = "ai-boek" → yourdomain.com/ai-boek</span>
                </li>
                <li>
                  <strong>variant-urgent branch:</strong>
                  <span className="ml-2">Custom Slug = "laatste-kans" → yourdomain.com/laatste-kans</span>
                </li>
                <li>
                  <strong>variant-social branch:</strong>
                  <span className="ml-2">Custom Slug = "bestseller" → yourdomain.com/bestseller</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Test Variants with Random Assignment</h2>
          <p className="text-gray-600 mb-4">These links use random assignment (not recommended for Google Ads):</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href={`/landing?variant=${VARIANTS.CONTROL}`}
              className="border-2 border-gray-200 rounded-lg p-4 hover:border-green-500 transition-colors"
            >
              <h3 className="font-semibold mb-2">Control (Main)</h3>
              <p className="text-sm text-gray-600">
                Original version - baseline for comparison
              </p>
              <span className="text-xs text-gray-500">Branch: main</span>
            </Link>

            <Link
              href={`/landing?variant=${VARIANTS.URGENT}`}
              className="border-2 border-orange-200 rounded-lg p-4 hover:border-orange-500 transition-colors"
            >
              <h3 className="font-semibold mb-2 text-orange-700">Urgency Variant</h3>
              <p className="text-sm text-gray-600">
                Countdown timers, limited availability
              </p>
              <span className="text-xs text-gray-500">Branch: variant-urgent</span>
            </Link>

            <Link
              href={`/landing?variant=${VARIANTS.SOCIAL}`}
              className="border-2 border-blue-200 rounded-lg p-4 hover:border-blue-500 transition-colors"
            >
              <h3 className="font-semibold mb-2 text-blue-700">Social Proof Variant</h3>
              <p className="text-sm text-gray-600">
                Testimonials, user counts, success stories
              </p>
              <span className="text-xs text-gray-500">Branch: variant-social</span>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Go to BaseHub and edit "Page Config → Custom Slug" in each branch</li>
            <li>Each branch can have multiple custom URLs by editing the slug</li>
            <li>Set up Google Ads campaigns with your custom URLs</li>
            <li>Monitor performance in Google Ads dashboard</li>
            <li>Edit content for each branch to optimize conversions</li>
          </ul>
        </div>
      </div>
    </div>
  )
}