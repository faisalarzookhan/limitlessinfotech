#!/bin/bash
# Limitless Infotech Deployment Script

# Exit on error
set -e

echo "🚀 Starting Limitless Infotech deployment..."

# 1. Check environment variables
echo "✅ Checking environment variables..."
if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ] || [ -z "$NEXT_PUBLIC_SUPABASE_ANON_KEY" ] || [ -z "$JWT_SECRET" ]; then
  echo "❌ Error: Required environment variables are missing!"
  exit 1
fi

# 2. Build the application
echo "🔨 Building application..."
npm run build

# 3. Deploy database migrations (if using direct SQL)
echo "🗄️ Running database migrations..."
psql $DATABASE_URL -f ./scripts/database-schema.sql
psql $DATABASE_URL -f ./scripts/seed-data.sql
psql $DATABASE_URL -f ./scripts/add-missing-columns.sql

# 4. Start the application
echo "🚀 Starting application..."
if [ "$DEPLOYMENT_TYPE" = "docker" ]; then
  docker-compose up -d
else
  npm run start
fi

echo "✅ Deployment complete! Application is now live."
echo "📊 Monitor your application at: https://your-domain.com/cpanel"
