#!/bin/bash

# SLURM Course Deployment Script for Dokploy
# This script deploys the SLURM courses to your Dokploy instance

set -e

# Configuration
DOKPLOY_API_KEY="${DOKPLOY_API_KEY:-}"

# Check if API key is provided
if [ -z "$DOKPLOY_API_KEY" ]; then
    echo "❌ Error: DOKPLOY_API_KEY environment variable is required"
    echo "Usage: DOKPLOY_API_KEY=your_api_key ./deploy-to-dokploy.sh"
    exit 1
fi
DOKPLOY_URL="https://console.hackrsvalv.com"
PROJECT_NAME="slurm-course-builder"
GITHUB_REPO="https://github.com/your-username/course-builder.git"
BRANCH="main"

echo "🚀 Starting SLURM Course deployment to Dokploy..."
echo "📡 Dokploy URL: $DOKPLOY_URL"
echo "📦 Project: $PROJECT_NAME"

# Function to make API calls to Dokploy
call_dokploy_api() {
    local endpoint="$1"
    local method="$2"
    local data="$3"
    
    curl -s -X "$method" \
        -H "Authorization: Bearer $DOKPLOY_API_KEY" \
        -H "Content-Type: application/json" \
        -d "$data" \
        "$DOKPLOY_URL/api$endpoint"
}

# 1. Create a new project
echo "📁 Creating new project..."
PROJECT_DATA='{
  "name": "'$PROJECT_NAME'",
  "description": "SLURM Course Builder - Lithuanian DevOps/SysAdmin Training Platform",
  "framework": "nextjs"
}'

PROJECT_RESPONSE=$(call_dokploy_api "/projects" "POST" "$PROJECT_DATA")
PROJECT_ID=$(echo "$PROJECT_RESPONSE" | grep -o '"id":"[^"]*' | cut -d'"' -f4)

if [ -z "$PROJECT_ID" ]; then
    echo "❌ Failed to create project. Response: $PROJECT_RESPONSE"
    exit 1
fi

echo "✅ Project created with ID: $PROJECT_ID"

# 2. Create MySQL database service
echo "🗄️  Creating MySQL database..."
DB_DATA='{
  "projectId": "'$PROJECT_ID'",
  "name": "mysql",
  "type": "mysql",
  "version": "8.0",
  "database": "slurm_courses",
  "username": "slurm_user",
  "password": "SlUrM_C0urse_2024!",
  "port": 3306,
  "volume": {
    "name": "mysql-data",
    "mountPath": "/var/lib/mysql"
  }
}'

DB_RESPONSE=$(call_dokploy_api "/services" "POST" "$DB_DATA")
echo "✅ MySQL database created"

# 3. Create Redis cache service
echo "🔄 Creating Redis cache..."
REDIS_DATA='{
  "projectId": "'$PROJECT_ID'",
  "name": "redis",
  "type": "redis",
  "version": "7-alpine",
  "port": 6379,
  "volume": {
    "name": "redis-data",
    "mountPath": "/data"
  }
}'

REDIS_RESPONSE=$(call_dokploy_api "/services" "POST" "$REDIS_DATA")
echo "✅ Redis cache created"

# 4. Create the main application
echo "📱 Creating main application..."
APP_DATA='{
  "projectId": "'$PROJECT_ID'",
  "name": "slurm-course-app",
  "type": "application",
  "framework": "nextjs",
  "repository": {
    "url": "'$GITHUB_REPO'",
    "branch": "'$BRANCH'",
    "path": "/apps/ai-hero"
  },
  "buildCommand": "cd /apps/ai-hero && pnpm install && pnpm run build",
  "startCommand": "cd /apps/ai-hero && pnpm start",
  "port": 3000,
  "environment": {
    "NODE_ENV": "production",
    "NEXT_PUBLIC_APP_NAME": "slurm-course-builder",
    "NEXT_PUBLIC_HOST": "kolega.neatsiliknuo.ai",
    "NEXT_PUBLIC_URL": "https://kolega.neatsiliknuo.ai",
    "NEXTAUTH_URL": "https://kolega.neatsiliknuo.ai",
    "NEXTAUTH_SECRET": "slurm-course-secret-key-change-this-in-production-2024",
    "DATABASE_URL": "mysql://slurm_user:SlUrM_C0urse_2024!@mysql:3306/slurm_courses",
    "REDIS_URL": "redis://redis:6379"
  },
  "domains": [
    {
      "domain": "kolega.neatsiliknuo.ai",
      "ssl": true,
      "redirectToHttps": true
    }
  ],
  "healthCheck": {
    "path": "/api/health",
    "port": 3000,
    "timeout": 30
  },
  "resources": {
    "memory": "2048Mi",
    "cpu": "1000m"
  }
}'

APP_RESPONSE=$(call_dokploy_api "/applications" "POST" "$APP_DATA")
APP_ID=$(echo "$APP_RESPONSE" | grep -o '"id":"[^"]*' | cut -d'"' -f4)

if [ -z "$APP_ID" ]; then
    echo "❌ Failed to create application. Response: $APP_RESPONSE"
    exit 1
fi

echo "✅ Application created with ID: $APP_ID"

# 5. Deploy the application
echo "🚀 Deploying application..."
DEPLOY_DATA='{
  "applicationId": "'$APP_ID'",
  "branch": "'$BRANCH'"
}'

DEPLOY_RESPONSE=$(call_dokploy_api "/deploy" "POST" "$DEPLOY_DATA")
echo "✅ Deployment initiated"

# 6. Wait for deployment to complete
echo "⏳ Waiting for deployment to complete..."
sleep 30

# 7. Run database migrations
echo "🗄️  Running database migrations..."
MIGRATION_DATA='{
  "applicationId": "'$APP_ID'",
  "command": "cd /apps/ai-hero && pnpm run db:push"
}'

MIGRATION_RESPONSE=$(call_dokploy_api "/execute" "POST" "$MIGRATION_DATA")
echo "✅ Database migrations completed"

# 8. Create SLURM courses
echo "📚 Creating SLURM courses..."

# Create Level 1 course
LEVEL1_DATA='{
  "applicationId": "'$APP_ID'",
  "command": "cd /apps/ai-hero && pnpm exec tsx src/scripts/create-slurm-course.ts level1 admin@kolega.neatsiliknuo.ai"
}'

LEVEL1_RESPONSE=$(call_dokploy_api "/execute" "POST" "$LEVEL1_DATA")
echo "📖 Level 1 (Beginner) course created"

# Create Level 2 course
LEVEL2_DATA='{
  "applicationId": "'$APP_ID'",
  "command": "cd /apps/ai-hero && pnpm exec tsx src/scripts/create-slurm-course.ts level2 admin@kolega.neatsiliknuo.ai"
}'

LEVEL2_RESPONSE=$(call_dokploy_api "/execute" "POST" "$LEVEL2_DATA")
echo "📖 Level 2 (Intermediate) course created"

# Create Level 3 course
LEVEL3_DATA='{
  "applicationId": "'$APP_ID'",
  "command": "cd /apps/ai-hero && pnpm exec tsx src/scripts/create-slurm-course.ts level3 admin@kolega.neatsiliknuo.ai"
}'

LEVEL3_RESPONSE=$(call_dokploy_api "/execute" "POST" "$LEVEL3_DATA")
echo "📖 Level 3 (Advanced) course created"

echo ""
echo "🎉 SLURM Course deployment completed successfully!"
echo ""
echo "📊 Deployment Summary:"
echo "  - Project ID: $PROJECT_ID"
echo "  - Application ID: $APP_ID"
echo "  - URL: https://kolega.neatsiliknuo.ai"
echo ""
echo "📚 SLURM Courses created:"
echo "  - Level 1 (Pradžiamokslis): 40 hours, 5 sections, 20 lessons"
echo "  - Level 2 (Pažengęs): 60 hours, 6 sections, 26 lessons"
echo "  - Level 3 (Ekspertas): 80 hours, 7 sections, 28 lessons"
echo ""
echo "🔗 Access Points:"
echo "  - Course Builder: https://kolega.neatsiliknuo.ai"
echo "  - Dokploy Console: $DOKPLOY_URL/project/$PROJECT_ID"
echo ""
echo "🛠️  Management:"
echo "  - View logs: Dokploy Console → Applications → Logs"
echo "  - Monitor resources: Dokploy Console → Applications → Metrics"
echo "  - Scale application: Dokploy Console → Applications → Scale"
echo ""
echo "📧 Default Admin Email: admin@kolega.neatsiliknuo.ai"
echo ""
echo "🎯 Happy learning with SLURM!"