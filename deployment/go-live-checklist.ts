/**
 * Limitless Infotech - Production Deployment Checklist
 * This file serves as documentation for the deployment process
 */

export const deploymentSteps = {
  preDeployment: [
    "Verify all environment variables are configured",
    "Run final tests in staging environment",
    "Backup existing data (if applicable)",
    "Prepare database migrations",
    "Update DNS settings to point to new server",
    "Configure SSL certificates",
    "Set up monitoring and logging",
    "Configure backup schedule",
  ],

  deployment: [
    "Deploy database schema",
    "Run database migrations",
    "Deploy application code",
    "Configure web server",
    "Start application services",
    "Verify application is running",
  ],

  postDeployment: [
    "Run smoke tests",
    "Verify all critical paths",
    "Check monitoring systems",
    "Test backup and restore procedures",
    "Document deployment",
  ],
}

export const requiredEnvVars = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "JWT_SECRET",
  "JWT_EXPIRES_IN",
  "RESEND_API_KEY",
  "NEXT_PUBLIC_APP_URL",
  "NODE_ENV",
]

export const productionUrls = {
  app: "https://your-domain.com",
  api: "https://your-domain.com/api",
  admin: "https://your-domain.com/admin",
  cpanel: "https://your-domain.com/cpanel",
}
