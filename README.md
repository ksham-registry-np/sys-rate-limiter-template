# Challenge: HSR Layout API Rate Limiter (System Design Resilience)

## Scenario
You are a Platform Engineer at a hyper-growth SaaS startup in HSR Layout. Our APIs are being integrated by thousands of developers. During a recent product launch, we experienced a "Thundering Herd" problem where sudden bursts of requests from a few users overwhelmed our upstream services, causing a cascading failure across the platform.

Our current rate-limiting solution is too primitive. It uses a "Fixed Window" approach that allows users to double their quota if they time their requests at the edge of a minute. We need a more sophisticated, "Institutional Grade" rate limiter.

## The Technical Debt
The current `limiter.js` implements a **Fixed Window Counter**. It resets the request count exactly at the start of every minute. 

**The Vulnerability**: If a user is allowed 60 requests/minute, they can send 60 requests at 11:59:59 and another 60 requests at 12:00:01, effectively sending **120 requests in 2 seconds**. This burst can kill our database.

## Your Task: "Sliding Window" Implementation
Refactor the rate limiter to use a **Sliding Window Log** or **Sliding Window Counter** algorithm. The limit must be strictly enforced over any rolling 60-second period.

### Requirements:
1.  **Rolling Window Enforcement**: No user should ever exceed the limit within *any* continuous 60,000ms window.
2.  **Memory Efficiency**: The solution must not grow infinitely. Old request timestamps must be purged.
3.  **High Throughput**: The `isAllowed()` check must be extremely fast (< 2ms) to avoid adding latency to the API.

## The Scale-Up (Stretch Goals)
*In a real tech round, we would discuss these next steps:*
- **Distributed Limiting**: Our API runs on 20 different servers. How do you synchronize the rate limit state across all of them using **Redis** and **Lua Scripts** for atomicity?
- **Tiered Limits**: How would you implement different limits for "Free" vs "Enterprise" users without hardcoding?
- **Cost of Rejection**: Should we return a `Retry-After` header to help well-behaved clients back off?

## Success Criteria
- **Burst Protection**: Successfully rejects the "Window Edge" exploit (120 requests in 2 seconds).
- **Latency Consistency**: Under 2ms overhead per request.
- **Accurate Quotas**: Zero false positives; legitimate users are never blocked prematurely.

---

## Starter Code (Node.js)
- `limiter.js`: The file where you'll implement the sliding window logic.
- `package.json`: Benchmarking dependencies.
