#!/bin/bash

# Simplified SLURM Course Deployment for Dokploy
# This script provides step-by-step instructions for manual deployment

set -e

DOKPLOY_URL="https://console.hackrsvalv.com"
PROJECT_NAME="slurm-course-builder"

echo "🚀 SLURM Course Deployment Guide for Dokploy"
echo "============================================="
echo ""
echo "📡 Dokploy Console: $DOKPLOY_URL"
echo "📦 Project Name: $PROJECT_NAME"
echo ""

# Test API connectivity
echo "🔍 Testing Dokploy API connectivity..."
API_TEST=$(curl -s -H "Authorization: Bearer claudeNgijGrymhdGthpHfyKuIcikrofhRjkdqoShPmSNaMpkqbHiCczFkOYfsQlkRuHhR" \
  "$DOKPLOY_URL/api/projects" 2>/dev/null || echo "API_ERROR")

if [[ "$API_TEST" == "API_ERROR" ]]; then
    echo "❌ Cannot connect to Dokploy API. Please check:"
    echo "   - URL: $DOKPLOY_URL"
    echo "   - API Key: claudeNgijGrymhdGthpHfyKuIcikrofhRjkdqoShPmSNaMpkqbHiCczFkOYfsQlkRuHhR"
    echo ""
    echo "🔧 Manual Deployment Steps:"
    echo "1. Login to Dokploy Console: $DOKPLOY_URL"
    echo "2. Create a new project: '$PROJECT_NAME'"
    echo "3. Add MySQL database service"
    echo "4. Add Redis cache service"
    echo "5. Deploy the application"
    echo ""
    echo "📝 Use the configuration files created in this directory:"
    echo "   - dokploy.json"
    echo "   - .env.production"
    echo ""
    exit 1
fi

echo "✅ Dokploy API is accessible"

# Create project using API
echo "📁 Creating new project..."
curl -X POST \
  -H "Authorization: Bearer claudeNgijGrymhdGthpHfyKuIcikrofhRjkdqoShPmSNaMpkqbHiCczFkOYfsQlkRuHhR" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "'$PROJECT_NAME'",
    "description": "SLURM Course Builder - Lithuanian DevOps/SysAdmin Training Platform"
  }' \
  "$DOKPLOY_URL/api/projects"

echo ""
echo "✅ Project creation request sent"
echo ""

echo "🎯 Next Steps:"
echo "1. Check Dokploy Console for project creation status"
echo "2. Configure services manually using the provided configuration"
echo "3. Deploy the application"
echo "4. Run the course initialization script"
echo ""

echo "📋 Manual Configuration Steps:"
echo ""
echo "1. DATABASE SETUP:"
echo "   - Service: MySQL 8.0"
echo "   - Database: slurm_courses"
echo "   - Username: slurm_user"
echo "   - Password: SlUrM_C0urse_2024!"
echo ""
echo "2. CACHE SETUP:"
echo "   - Service: Redis 7-alpine"
echo "   - Port: 6379"
echo ""
echo "3. APPLICATION SETUP:"
echo "   - Framework: Next.js"
echo "   - Build Command: pnpm install && pnpm run build"
echo "   - Start Command: pnpm start"
echo "   - Port: 3000"
echo "   - Environment: Use .env.production file"
echo ""
echo "4. DOMAIN SETUP:"
echo "   - Domain: kolega.neatsiliknuo.ai"
echo "   - SSL: Enabled"
echo "   - Redirect to HTTPS: Enabled"
echo ""

echo "🔧 Post-Deployment Commands:"
echo "Run these commands in the Dokploy terminal after deployment:"
echo ""
echo "# Database migration"
echo "pnpm run db:push"
echo ""
echo "# Create SLURM courses"
echo "pnpm exec tsx src/scripts/create-slurm-course.ts level1 admin@kolega.neatsiliknuo.ai"
echo "pnpm exec tsx src/scripts/create-slurm-course.ts level2 admin@kolega.neatsiliknuo.ai"
echo "pnpm exec tsx src/scripts/create-slurm-course.ts level3 admin@kolega.neatsiliknuo.ai"
echo ""

echo "🌐 Expected Result:"
echo "   - Course Builder: https://kolega.neatsiliknuo.ai"
echo "   - 3 SLURM courses with 74 total lessons"
echo "   - Complete DevOps/SysAdmin training platform"
echo ""
echo "🎉 Ready to deploy!"