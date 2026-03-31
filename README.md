Looking at the README and codebase, I found several discrepancies and issues that need to be addressed:

1. **Test framework mismatch**: README mentions Mocha, but the actual test uses Jest
2. **File structure inconsistencies**: The actual structure includes `starter/` and `verifier/` directories not mentioned in README
3. **Missing installation and setup instructions**
4. **No usage examples showing the actual API**
5. **Test script mismatch**: package.json uses Mocha but tests are written in Jest

Here's the corrected README:

```markdown
# System Design Rate Limiter Template

## Overview
A coding challenge template for implementing a sliding window rate limiter to replace a vulnerable fixed window implementation. This repository demonstrates a common system design problem: preventing "thundering herd" scenarios and burst attacks that can overwhelm backend services.

## The Problem
The current implementation uses a **Fixed Window Counter** algorithm that has a critical vulnerability:
- Users can exploit window boundaries to exceed rate limits
- Example: With a 60 req/min limit, users can send 60 requests at 11:59:59 and 60 more at 12:00:01
- This effectively allows **120 requests in 2 seconds**, potentially overwhelming the system

## Challenge Requirements
Implement a **Sliding Window** rate limiter that:

1. **Enforces rolling limits**: No user exceeds the limit within any continuous time window
2. **Memory efficient**: Automatically purges old request data
3. **High performance**: `isAllowed()` operations complete in < 2ms
4. **Burst protection**: Prevents window-edge exploits

## Project Structure
```
├── README.md
├── manifest.json
├── package.json                 # Main package config (Jest-based)
├── src/limiter.js              # Your implementation goes here
├── starter/
│   ├── package.json            # Alternative Jest config
│   └── src/limiter.js          # Starter template (identical to src/)
└── verifier/
    └── limiter.test.js         # Test suite to validate your solution
```

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd sys-rate-limiter-template

# Install dependencies
npm install
```

## Usage

### Basic Implementation
```javascript
const RateLimiter = require('./src/limiter');

// Create a limiter: 100 requests per 60 seconds
const limiter = new RateLimiter(100, 60000);

// Check if request is allowed
if (limiter.isAllowed('user123')) {
    console.log('Request processed');
} else {
    console.log('Rate limit exceeded');
}
```

### Current Fixed Window Implementation (Vulnerable)
```javascript
class RateLimiter {
    constructor(limit, windowMs) {
        this.limit = limit;           // Max requests per window
        this.windowMs = windowMs;     // Window duration in milliseconds
        this.requests = new Map();    // userId -> { count, windowStart }
    }

    isAllowed(userId) {
        // Fixed window logic - has burst vulnerability
        // Your task: Replace with sliding window algorithm
    }
}
```

## Running Tests

```bash
# Run the test suite
npm test

# Tests verify:
# - Basic rate limiting functionality
# - Sliding window behavior across time boundaries
# - Prevention of burst attacks
```

## Test Scenarios
The verifier includes tests for:
- ✅ Basic request limiting within quota
- ✅ Sliding window enforcement across time boundaries
- ✅ Burst protection (the main vulnerability fix)

## Success Criteria
Your implementation should:
- **Pass all tests**: Including the sliding window boundary test
- **Maintain performance**: Fast lookup and cleanup operations  
- **Prevent bursts**: No window-edge exploitation possible
- **Scale efficiently**: Memory usage doesn't grow indefinitely

## Technical Stack
- **Runtime**: Node.js
- **Testing**: Jest
- **Algorithm**: Sliding Window (Log or Counter approach)
- **Data Structure**: Map-based in-memory storage

## Advanced Considerations (Discussion Points)
- **Distributed systems**: Using Redis + Lua scripts for multi-server deployments
- **Tiered limiting**: Different limits per user tier
- **Client feedback**: `Retry-After` headers for graceful backoff
- **Monitoring**: Rate limit metrics and alerting

## Getting Started
1. Examine the vulnerable fixed window implementation in `src/limiter.js`
2. Run `npm test` to see the failing sliding window test
3. Implement your sliding window algorithm
4. Ensure all tests pass and performance requirements are met

---

**Challenge Level**: Intermediate System Design  
**Estimated Time**: 45-60 minutes  
**Focus Areas**: Algorithm design, performance optimization, edge case handling
```

The main issues corrected:
- Updated test framework from Mocha to Jest
- Added proper project structure documentation
- Included installation and usage instructions
- Fixed dependency references
- Added concrete code examples
- Clarified the file organization with starter/ and verifier/ directories
- Made the challenge requirements more specific and actionable