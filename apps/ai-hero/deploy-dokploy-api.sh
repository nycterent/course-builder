#!/bin/bash

# SLURM Course Deployment Script for Dokploy API
# Using correct API format with x-api-key header

set -e

# Configuration
API_KEY="claudeNgijGrymhdGthpHfyKuIcikrofhRjkdqoShPmSNaMpkqbHiCczFkOYfsQlkRuHhR"
DOKPLOY_URL="https://console.hackrsvalv.com"
PROJECT_NAME="slurm-course-builder"
DOMAIN="kolega.neatsiliknuo.ai"

echo "🚀 Starting SLURM Course deployment to Dokploy..."
echo "📡 Dokploy URL: $DOKPLOY_URL"
echo "📦 Project: $PROJECT_NAME"
echo "🌐 Domain: $DOMAIN"

# Function to make API calls
call_api() {
    local endpoint="$1"
    local method="$2"
    local data="$3"
    
    if [ -z "$data" ]; then
        curl -X "$method" \
            -H "accept: application/json" \
            -H "x-api-key: $API_KEY" \
            "$DOKPLOY_URL/api/$endpoint"
    else
        curl -X "$method" \
            -H "accept: application/json" \
            -H "x-api-key: $API_KEY" \
            -H "Content-Type: application/json" \
            -d "$data" \
            "$DOKPLOY_URL/api/$endpoint"
    fi
}

# 1. Create project
echo "📁 Creating project..."
PROJECT_DATA='{
  "name": "'$PROJECT_NAME'",
  "description": "SLURM Course Builder - Lithuanian DevOps/SysAdmin Training Platform"
}'

PROJECT_RESPONSE=$(call_api "project.create" "POST" "$PROJECT_DATA")
echo "Project response: $PROJECT_RESPONSE"

# Extract project ID from response
PROJECT_ID=$(echo "$PROJECT_RESPONSE" | grep -o '"projectId":"[^"]*' | cut -d'"' -f4)

if [ -z "$PROJECT_ID" ]; then
    echo "❌ Failed to create project or extract project ID"
    echo "Response: $PROJECT_RESPONSE"
    exit 1
fi

echo "✅ Project created with ID: $PROJECT_ID"

# 2. Create MySQL database
echo "🗄️  Creating MySQL database..."
DB_DATA='{
  "projectId": "'$PROJECT_ID'",
  "name": "mysql",
  "description": "SLURM courses database",
  "databaseName": "slurm_courses",
  "databaseUser": "slurm_user", 
  "databasePassword": "SlUrM_C0urse_2024!",
  "dockerImage": "mysql:8.0"
}'

DB_RESPONSE=$(call_api "mysql.create" "POST" "$DB_DATA")
echo "✅ MySQL database created"

# 3. Create Redis cache
echo "🔄 Creating Redis cache..."
REDIS_DATA='{
  "projectId": "'$PROJECT_ID'",
  "name": "redis",
  "description": "Redis cache for SLURM courses",
  "dockerImage": "redis:7-alpine"
}'

REDIS_RESPONSE=$(call_api "redis.create" "POST" "$REDIS_DATA")
echo "✅ Redis cache created"

# 4. Create the main application
echo "📱 Creating main application..."
APP_DATA='{
  "projectId": "'$PROJECT_ID'",
  "name": "slurm-course-app",
  "description": "SLURM Course Builder Application",
  "env": "NODE_ENV=production\nNEXT_PUBLIC_APP_NAME=slurm-course-builder\nNEXT_PUBLIC_HOST='$DOMAIN'\nNEXT_PUBLIC_URL=https://'$DOMAIN'\nNEXTAUTH_URL=https://'$DOMAIN'\nNEXTAUTH_SECRET=slurm-course-secret-key-change-this-in-production-2024\nDATABASE_URL=mysql://slurm_user:SlUrM_C0urse_2024!@mysql:3306/slurm_courses\nREDIS_URL=redis://redis:6379",
  "customGitUrl": "https://github.com/skillrecordings/course-builder.git",
  "customGitBranch": "main",
  "customGitBuildPath": "/apps/ai-hero",
  "dockerfile": "Dockerfile",
  "buildArgs": "--build-arg NODE_ENV=production"
}'

APP_RESPONSE=$(call_api "application.create" "POST" "$APP_DATA")
echo "Application response: $APP_RESPONSE"

# Extract application ID
APP_ID=$(echo "$APP_RESPONSE" | grep -o '"applicationId":"[^"]*' | cut -d'"' -f4)

if [ -z "$APP_ID" ]; then
    echo "❌ Failed to create application or extract application ID"
    echo "Response: $APP_RESPONSE"
    exit 1
fi

echo "✅ Application created with ID: $APP_ID"

# 5. Add domain
echo "🌐 Adding domain..."
DOMAIN_DATA='{
  "applicationId": "'$APP_ID'",
  "host": "'$DOMAIN'",
  "https": true,
  "port": 3000,
  "path": "/"
}'

DOMAIN_RESPONSE=$(call_api "domain.create" "POST" "$DOMAIN_DATA")
echo "✅ Domain added"

# 6. Deploy the application
echo "🚀 Deploying application..."
DEPLOY_DATA='{
  "applicationId": "'$APP_ID'"
}'

DEPLOY_RESPONSE=$(call_api "application.deploy" "POST" "$DEPLOY_DATA")
echo "✅ Deployment initiated"

echo ""
echo "🎉 SLURM Course deployment completed successfully!"
echo ""
echo "📊 Deployment Summary:"
echo "  - Project ID: $PROJECT_ID"
echo "  - Application ID: $APP_ID"
echo "  - URL: https://$DOMAIN"
echo ""
echo "⏳ Please wait for deployment to complete, then run these commands:"
echo ""
echo "🔧 Post-Deployment Commands (in Dokploy terminal):"
echo "# Database migration"
echo "pnpm run db:push"
echo ""
echo "# Create SLURM courses"
echo "pnpm exec tsx src/scripts/create-slurm-course.ts level1 admin@$DOMAIN"
echo "pnpm exec tsx src/scripts/create-slurm-course.ts level2 admin@$DOMAIN"
echo "pnpm exec tsx src/scripts/create-slurm-course.ts level3 admin@$DOMAIN"
echo ""
echo "📚 Expected Result:"
echo "  - Course Builder: https://$DOMAIN"
echo "  - 3 SLURM courses with 74 total lessons"
echo "  - Complete DevOps/SysAdmin training platform"
echo ""
echo "🎯 Happy learning with SLURM!"