const RateLimiter = require('../src/limiter');

describe('System Design: Sliding Window Rate Limiter', () => {
    jest.useFakeTimers();

    it('should allow requests within the limit', () => {
        const limiter = new RateLimiter(2, 1000);
        expect(limiter.isAllowed('user1')).toBe(true);
        expect(limiter.isAllowed('user1')).toBe(true);
        expect(limiter.isAllowed('user1')).toBe(false);
    });

    it('should handle sliding windows correctly across boundaries', () => {
        const limiter = new RateLimiter(5, 1000);

        // Burst 5 requests at T=0
        for (let i = 0; i < 5; i++) expect(limiter.isAllowed('user1')).toBe(true);
        expect(limiter.isAllowed('user1')).toBe(false);

        // Advance 600ms. Still within window.
        jest.advanceTimersByTime(600);
        expect(limiter.isAllowed('user1')).toBe(false);

        // Advance another 500ms (Total 1.1s). Window should have slid.
        // A true sliding window would allow requests proportionally, 
        // but for this challenge, we expect at least 1 new allowance 
        // after the full window period from the first request.
        jest.advanceTimersByTime(500);
        expect(limiter.isAllowed('user1')).toBe(true);
    });
});
