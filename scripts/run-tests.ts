#!/usr/bin/env node

/**
 * Test Runner Script
 * Run this script to execute the comprehensive testing framework
 */

import { WebsiteTestFramework } from "./test-framework"
import fs from "fs"
import path from "path"

async function main() {
  const args = process.argv.slice(2)
  const baseUrl = args[0] || "http://localhost:3000"

  console.log(`🚀 Starting comprehensive testing for: ${baseUrl}`)
  console.log("=".repeat(60))

  const framework = new WebsiteTestFramework(baseUrl)

  try {
    // Run all tests
    const results = await framework.runAllTests()

    // Generate report
    const report = framework.generateReport()

    // Save report to file
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
    const reportPath = path.join(process.cwd(), `test-report-${timestamp}.md`)

    fs.writeFileSync(reportPath, report)

    console.log(`\n📊 Test Results Summary:`)
    console.log("=".repeat(40))

    for (const suite of results) {
      const passRate = ((suite.summary.passed / suite.summary.total) * 100).toFixed(1)
      console.log(`${suite.name}: ${suite.summary.passed}/${suite.summary.total} (${passRate}%)`)

      if (suite.summary.failed > 0) {
        console.log(`  ❌ ${suite.summary.failed} failed`)
      }
      if (suite.summary.warnings > 0) {
        console.log(`  ⚠️  ${suite.summary.warnings} warnings`)
      }
    }

    console.log(`\n📄 Full report saved to: ${reportPath}`)

    // Exit with error code if there are failures
    const totalFailed = results.reduce((sum, suite) => sum + suite.summary.failed, 0)
    if (totalFailed > 0) {
      console.log(`\n❌ Testing completed with ${totalFailed} failures`)
      process.exit(1)
    } else {
      console.log(`\n✅ All tests passed successfully!`)
      process.exit(0)
    }
  } catch (error) {
    console.error("❌ Testing failed with error:", error)
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  main()
}

export { main as runTests }
