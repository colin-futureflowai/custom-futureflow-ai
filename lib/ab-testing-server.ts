import { cookies } from 'next/headers'
import {
  VARIANTS,
  Variant,
  getRandomVariant,
  VARIANT_COOKIE
} from './ab-testing'

/**
 * Get the current variant for a user (server-side)
 * Only reads from cookie, doesn't set (to avoid Next.js restrictions)
 * Returns random variant if no cookie exists
 */
export async function getUserVariant(): Promise<Variant> {
  // Check existing cookie
  const cookieStore = cookies()
  const existingVariant = cookieStore.get(VARIANT_COOKIE)?.value

  if (existingVariant && Object.values(VARIANTS).includes(existingVariant as Variant)) {
    return existingVariant as Variant
  }

  // Return random variant if no cookie
  // Note: We can't set the cookie here due to Next.js restrictions
  // The cookie will be set via middleware or client-side
  return getRandomVariant()
}