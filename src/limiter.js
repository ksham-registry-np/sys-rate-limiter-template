/**
 * HSR LAYOUT API RATE LIMITER
 * 
 * Your goal: Implement a Sliding Window rate limiter to replace this Fixed Window one.
 */
class RateLimiter {
    constructor(limit, windowMs) {
        this.limit = limit;
        this.windowMs = windowMs;
        this.requests = new Map(); // userId -> { count, windowStart }
    }

    /**
     * returns true if allowed, false if limited
     */
    isAllowed(userId) {
        const now = Date.now();

        // VULNERABILITY: Fixed Window Logic
        // This only checks if we are within the same window from the 'firstRequest'.
        // It doesn't handle the sliding nature of the time window.
        if (!this.requests.has(userId)) {
            this.requests.set(userId, { count: 1, windowStart: now });
            return true;
        }

        const stats = this.requests.get(userId);

        // If we are still in the fixed window
        if (now - stats.windowStart < this.windowMs) {
            if (stats.count < this.limit) {
                stats.count++;
                return true;
            }
            return false;
        }

        // If window expired, reset counter (The "Fixed Window" Trap)
        this.requests.set(userId, { count: 1, windowStart: now });
        return true;
    }
}

module.exports = RateLimiter;
