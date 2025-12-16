/**
 * Simple in-memory rate limiter
 * For production, use Redis or a dedicated rate limiting service
 */

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number; // milliseconds
}

const DEFAULT_CONFIG: RateLimitConfig = {
  maxRequests: 60, // 60 requests
  windowMs: 60 * 1000, // per minute
};

/**
 * Rate limit middleware
 * @param identifier - Unique identifier (user ID, IP, etc.)
 * @param config - Rate limit configuration
 * @returns Object with isAllowed boolean and remaining requests
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig = DEFAULT_CONFIG
): { isAllowed: boolean; remaining: number; retryAfter?: number } {
  const now = Date.now();
  const key = `ratelimit:${identifier}`;

  if (!store[key]) {
    store[key] = {
      count: 1,
      resetTime: now + config.windowMs,
    };
    return {
      isAllowed: true,
      remaining: config.maxRequests - 1,
    };
  }

  const record = store[key];

  // Check if window has expired
  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + config.windowMs;
    return {
      isAllowed: true,
      remaining: config.maxRequests - 1,
    };
  }

  // Check if limit exceeded
  if (record.count >= config.maxRequests) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    return {
      isAllowed: false,
      remaining: 0,
      retryAfter,
    };
  }

  // Increment and allow
  record.count++;
  return {
    isAllowed: true,
    remaining: config.maxRequests - record.count,
  };
}

/**
 * Clean up expired rate limit entries
 * Run periodically to prevent memory buildup
 */
export function cleanupRateLimitStore(): void {
  const now = Date.now();
  const keysToDelete: string[] = [];

  for (const [key, value] of Object.entries(store)) {
    if (now > value.resetTime + 60000) {
      // Delete entries older than 1 minute after window
      keysToDelete.push(key);
    }
  }

  keysToDelete.forEach(key => {
    delete store[key];
  });

  console.log(`✅ Cleaned up ${keysToDelete.length} rate limit entries`);
}

// Cleanup every 5 minutes
setInterval(cleanupRateLimitStore, 5 * 60 * 1000);
