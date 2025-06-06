/**
 * Limitless Infotech - Health Check Script
 * Run this after deployment to verify system health
 */

import fetch from "node-fetch"

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://your-domain.com"

async function checkEndpoint(endpoint: string, expectedStatus = 200): Promise<boolean> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`)
    return response.status === expectedStatus
  } catch (error) {
    console.error(`Error checking ${endpoint}:`, error)
    return false
  }
}

async function runHealthChecks() {
  console.log("🔍 Running health checks...")

  const checks = [
    { name: "Main page", endpoint: "/", expected: 200 },
    { name: "API health", endpoint: "/api/health", expected: 200 },
    { name: "Authentication", endpoint: "/api/auth/me", expected: 401 }, // Should be 401 if not authenticated
  ]

  let allPassed = true

  for (const check of checks) {
    const passed = await checkEndpoint(check.endpoint, check.expected)
    console.log(`${passed ? "✅" : "❌"} ${check.name}: ${passed ? "PASSED" : "FAILED"}`)
    if (!passed) allPassed = false
  }

  if (allPassed) {
    console.log("✅ All health checks passed! System is operational.")
  } else {
    console.error("❌ Some health checks failed. Please investigate.")
    process.exit(1)
  }
}

runHealthChecks()
