import { Prisma, PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ log: process.env.NODE_ENV === 'development' ? ['error'] : [] })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

/** Prisma error codes that mean "the server wasn't reachable", not "the query was bad". */
const COLD_START_CODES = new Set(['P1001', 'P1002', 'P1008', 'P1017'])

function isColdStart(err: unknown): boolean {
  if (err instanceof Prisma.PrismaClientInitializationError) return true
  const code = (err as { code?: string })?.code
  return typeof code === 'string' && COLD_START_CODES.has(code)
}

/**
 * Neon suspends the compute after a period of inactivity, so the first query
 * after an idle stretch can fail while it wakes up. Retry those — and only
 * those — with a short backoff, so a returning visitor sees the page instead
 * of "Database error".
 */
export async function withDb<T>(run: () => Promise<T>, attempts = 3): Promise<T> {
  let lastErr: unknown
  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      return await run()
    } catch (err) {
      lastErr = err
      if (!isColdStart(err) || attempt === attempts - 1) throw err
      await new Promise(resolve => setTimeout(resolve, 400 * 2 ** attempt))
    }
  }
  throw lastErr
}
