import type { NextRequest } from "next/server"
import { LRUCache } from "lru-cache"

/**
 * Defines the configuration for the RateLimiter class.
 */
interface RateLimitConfig {
  /** The time window in milliseconds (e.g., 60000 for 1 minute). */
  windowMs: number
  /** The maximum number of requests allowed per window for a single identifier. */
  maxRequests: number
}

/**
 * Defines the options for the `rateLimit` factory function.
 */
interface RateLimitOptions {
  /** The time interval in milliseconds. */
  interval: number
  /** The maximum number of unique tokens (e.g., IP addresses) to track. */
  uniqueTokens: number
}

/**
 * Defines the interface for a generic rate limiter.
 */
interface RateLimiter {
  /**
   * Checks if a request from a given token should be allowed.
   * @param token - A unique identifier for the requester (e.g., IP address).
   * @returns A promise that resolves to `true` if the request is rate-limited, `false` otherwise.
   */
  check: (token: string) => Promise<boolean>
}

/**
 * A class-based in-memory rate limiter.
 * This implementation uses a simple Map to track request counts.
 * Note: This file contains two different rate limiter implementations. This class is one of them.
 */
class RateLimiterClass {
  private requests: Map<string, { count: number; resetTime: number }> = new Map()

  /**
   * Checks if a request from a given identifier is allowed based on the configuration.
   * @param identifier - A unique string for the client (e.g., IP address or user ID).
   * @param config - The rate limit configuration to apply.
   * @returns `true` if the request is allowed, `false` otherwise.
   */
  isAllowed(identifier: string, config: RateLimitConfig): boolean {
    const now = Date.now()
    const windowStart = now - config.windowMs

    // Clean up old entries to prevent memory leaks
    this.cleanup(windowStart)

    const userRequests = this.requests.get(identifier)

    if (!userRequests || now > userRequests.resetTime) {
      this.requests.set(identifier, { count: 1, resetTime: now + config.windowMs })
      return true
    }

    if (userRequests.count >= config.maxRequests) {
      return false
    }

    userRequests.count++
    return true
  }

  /**
   * Cleans up stale entries from the requests map.
   * @param windowStart - The timestamp marking the beginning of the current window.
   * @private
   */
  private cleanup(windowStart: number) {
    for (const [key, value] of this.requests.entries()) {
      if (value.resetTime < windowStart) {
        this.requests.delete(key)
      }
    }
  }

  /**
   * Gets the number of remaining requests for a given identifier in the current window.
   * @param identifier - The client's unique identifier.
   * @param config - The rate limit configuration.
   * @returns The number of remaining requests.
   */
  getRemainingRequests(identifier: string, config: RateLimitConfig): number {
    const userRequests = this.requests.get(identifier)
    if (!userRequests || Date.now() > userRequests.resetTime) {
      return config.maxRequests
    }
    return Math.max(0, config.maxRequests - userRequests.count)
  }

  /**
   * Gets the timestamp when the rate limit will reset for a given identifier.
   * @param identifier - The client's unique identifier.
   * @returns The reset time as a Unix timestamp (in milliseconds), or null if not applicable.
   */
  getResetTime(identifier: string): number | null {
    const userRequests = this.requests.get(identifier)
    return userRequests?.resetTime || null
  }
}

/**
 * Creates a simple in-memory rate limiter using an LRU cache.
 * This is useful for protecting API endpoints from abuse.
 * @param options - Configuration for the rate limiter.
 * @returns A rate limiter object with a `check` method.
 */
export function rateLimit(options: RateLimitOptions): RateLimiter {
  const { interval, uniqueTokens } = options

  const cache = new LRUCache<string, number[]>({
    max: 500, // Max number of unique tokens to store
    ttl: interval, // Time to live for each entry, pruning old ones automatically
  })

  return {
    check: async (token: string): Promise<boolean> => {
      const now = Date.now()
      let requests = cache.get(token) || []

      // Filter out requests older than the interval
      requests = requests.filter((timestamp) => timestamp > now - interval)

      if (requests.length >= uniqueTokens) {
        // Rate limit exceeded
        return true
      }

      // Add current request timestamp
      requests.push(now)
      cache.set(token, requests)

      return false // Not rate-limited
    },
  }
}

/**
 * A singleton instance of the class-based rate limiter.
 */
export const rateLimiter = new RateLimiterClass()

/**
 * Creates a Next.js middleware function for rate limiting.
 * This uses the singleton `rateLimiter` instance.
 * @param config - The rate limit configuration to apply for this middleware.
 * @returns A function that can be used as middleware to check rate limits.
 */
export function createRateLimitMiddleware(config: RateLimitConfig) {
  return (request: NextRequest, identifier?: string) => {
    const id = identifier || request.ip || "anonymous"
    return rateLimiter.isAllowed(id, config)
  }
}

/**
 * A collection of predefined rate limit configurations for different parts of the application.
 */
export const rateLimitConfigs = {
  /** For authentication-related endpoints (e.g., login, password reset). */
  auth: { windowMs: 15 * 60 * 1000, maxRequests: 5 }, // 5 requests per 15 minutes
  /** For general API endpoints. */
  api: { windowMs: 60 * 1000, maxRequests: 100 }, // 100 requests per minute
  /** For file upload endpoints. */
  upload: { windowMs: 60 * 1000, maxRequests: 10 }, // 10 uploads per minute
}
