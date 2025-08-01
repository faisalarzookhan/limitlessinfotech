export interface ChecklistItem {
  id: string
  category: string
  task: string
  description: string
  status: "pending" | "completed" | "skipped" | "failed"
  notes?: string
  priority: "high" | "medium" | "low"
  link?: string // Link to documentation or tool
}

export const goLiveChecklist: ChecklistItem[] = [
  // --- Pre-Launch ---
  {
    id: "pre_1",
    category: "Pre-Launch",
    task: "Final Code Review",
    description: "Ensure all code adheres to quality standards, is well-documented, and free of critical bugs.",
    status: "pending",
    priority: "high",
    link: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews",
  },
  {
    id: "pre_2",
    category: "Pre-Launch",
    task: "Automated Test Suite Execution",
    description: "Run all unit, integration, and end-to-end tests. All tests must pass.",
    status: "pending",
    priority: "high",
    link: "/scripts/run-tests.ts",
  },
  {
    id: "pre_3",
    category: "Pre-Launch",
    task: "Manual QA Testing (UAT)",
    description: "Perform comprehensive manual testing across all features and user flows.",
    status: "pending",
    priority: "high",
    link: "/docs/audit-report-template.md",
  },
  {
    id: "pre_4",
    category: "Pre-Launch",
    task: "Accessibility Audit",
    description: "Verify WCAG compliance using tools like Lighthouse, WAVE, or axe DevTools.",
    status: "pending",
    priority: "high",
    link: "https://developers.google.com/web/tools/lighthouse",
  },
  {
    id: "pre_5",
    category: "Pre-Launch",
    task: "Performance Audit",
    description: "Analyze page load times, responsiveness, and resource usage with Lighthouse/GTmetrix.",
    status: "pending",
    priority: "high",
    link: "https://gtmetrix.com/",
  },
  {
    id: "pre_6",
    category: "Pre-Launch",
    task: "Security Scan",
    description: "Run vulnerability scans (e.g., OWASP ZAP, Snyk) and address identified issues.",
    status: "pending",
    priority: "high",
    link: "https://www.zaproxy.org/",
  },
  {
    id: "pre_7",
    category: "Pre-Launch",
    task: "Cross-Browser Compatibility",
    description: "Test on major browsers (Chrome, Firefox, Safari, Edge) and devices.",
    status: "pending",
    priority: "medium",
    link: "https://www.browserstack.com/",
  },
  {
    id: "pre_8",
    category: "Pre-Launch",
    task: "Content Review & Proofreading",
    description: "Check all text, images, and media for accuracy, grammar, and consistency.",
    status: "pending",
    priority: "high",
  },
  {
    id: "pre_9",
    category: "Pre-Launch",
    task: "Favicon & App Icons",
    description: "Ensure favicons and app icons are correctly configured for all platforms.",
    status: "pending",
    priority: "low",
  },
  {
    id: "pre_10",
    category: "Pre-Launch",
    task: "Error Pages (404, 500) Customization",
    description: "Verify custom error pages are user-friendly and functional.",
    status: "pending",
    priority: "medium",
  },

  // --- Deployment ---
  {
    id: "dep_1",
    category: "Deployment",
    task: "Environment Variables Configuration",
    description: "Ensure all production environment variables are correctly set on the server.",
    status: "pending",
    priority: "high",
  },
  {
    id: "dep_2",
    category: "Deployment",
    task: "Database Migration & Seeding",
    description: "Run necessary database migrations and seed initial production data.",
    status: "pending",
    priority: "high",
    link: "/scripts/database-schema.sql",
  },
  {
    id: "dep_3",
    category: "Deployment",
    task: "SSL Certificate Installation",
    description: "Install and configure SSL/TLS certificates for HTTPS.",
    status: "pending",
    priority: "high",
    link: "/app/cpanel/components/ssl-certificate-manager.tsx",
  },
  {
    id: "dep_4",
    category: "Deployment",
    task: "CDN Configuration",
    description: "Set up and verify Content Delivery Network for static assets.",
    status: "pending",
    priority: "medium",
    link: "/app/cpanel/components/cdn-manager.tsx",
  },
  {
    id: "dep_5",
    category: "Deployment",
    task: "DNS Records Update",
    description: "Update A, CNAME, MX, and other DNS records to point to the new server.",
    status: "pending",
    priority: "high",
    link: "/app/cpanel/components/domain-manager.tsx",
  },
  {
    id: "dep_6",
    category: "Deployment",
    task: "Firewall & Security Group Setup",
    description: "Configure server firewall rules to allow necessary traffic and block malicious access.",
    status: "pending",
    priority: "high",
    link: "/app/cpanel/components/security-center.tsx",
  },
  {
    id: "dep_7",
    category: "Deployment",
    task: "Automated Backups Configuration",
    description: "Set up regular, automated backups for the application and database.",
    status: "pending",
    priority: "high",
    link: "/app/cpanel/components/backup-manager.tsx",
  },
  {
    id: "dep_8",
    category: "Deployment",
    task: "Monitoring & Alerting Setup",
    description: "Configure server and application monitoring with alerts for critical issues.",
    status: "pending",
    priority: "high",
    link: "/app/cpanel/components/advanced-server-monitor.tsx",
  },
  {
    id: "dep_9",
    category: "Deployment",
    task: "Email Service Configuration",
    description: "Verify email sending (contact forms, notifications) and receiving (if applicable).",
    status: "pending",
    priority: "medium",
    link: "/app/cpanel/components/email-manager.tsx",
  },
  {
    id: "dep_10",
    category: "Deployment",
    task: "Cron Jobs / Scheduled Tasks Setup",
    description: "Ensure all necessary background tasks are configured and running.",
    status: "pending",
    priority: "medium",
    link: "/app/cpanel/components/backend-tools.tsx",
  },

  // --- Post-Launch ---
  {
    id: "post_1",
    category: "Post-Launch",
    task: "Health Check & Smoke Test",
    description: "Perform a quick check of core functionalities immediately after deployment.",
    status: "pending",
    priority: "high",
    link: "/deployment/health-check.ts",
  },
  {
    id: "post_2",
    category: "Post-Launch",
    task: "Google Analytics / Tracking Setup",
    description: "Verify analytics scripts are correctly implemented and data is being collected.",
    status: "pending",
    priority: "medium",
    link: "/app/cpanel/components/statistics.tsx",
  },
  {
    id: "post_3",
    category: "Post-Launch",
    task: "Search Engine Submission (Sitemap, Robots.txt)",
    description: "Submit sitemap to Google Search Console and verify robots.txt.",
    status: "pending",
    priority: "medium",
    link: "/app/sitemap.ts",
  },
  {
    id: "post_4",
    category: "Post-Launch",
    task: "Social Media Integration Check",
    description: "Verify social sharing buttons and meta tags (Open Graph, Twitter Cards).",
    status: "pending",
    priority: "low",
  },
  {
    id: "post_5",
    category: "Post-Launch",
    task: "Performance Monitoring",
    description: "Continuously monitor website performance and server health.",
    status: "pending",
    priority: "high",
    link: "/app/cpanel/components/advanced-server-monitor.tsx",
  },
  {
    id: "post_6",
    category: "Post-Launch",
    task: "Security Monitoring",
    description: "Regularly check security logs and scan for vulnerabilities.",
    status: "pending",
    priority: "high",
    link: "/app/cpanel/components/security-center.tsx",
  },
  {
    id: "post_7",
    category: "Post-Launch",
    task: "User Feedback Collection",
    description: "Set up channels for users to report bugs or provide feedback.",
    status: "pending",
    priority: "medium",
  },
]
