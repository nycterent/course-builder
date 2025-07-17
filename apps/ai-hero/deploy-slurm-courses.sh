#!/bin/bash

# SLURM Course Deployment Script
# This script deploys the SLURM courses using Docker/Podman

set -e

echo "🚀 Starting SLURM Course Deployment..."

# Check if Docker or Podman is available
if command -v docker &> /dev/null; then
    CONTAINER_ENGINE="docker"
    COMPOSE_CMD="docker compose"
elif command -v podman &> /dev/null; then
    CONTAINER_ENGINE="podman"
    COMPOSE_CMD="podman-compose"
else
    echo "❌ Neither Docker nor Podman is available. Please install one of them."
    exit 1
fi

echo "📦 Using container engine: $CONTAINER_ENGINE"

# Copy environment file
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local from .env.docker template..."
    cp .env.docker .env.local
    echo "⚠️  Please edit .env.local with your actual configuration values"
fi

# Build and start services
echo "🏗️  Building and starting services..."
$COMPOSE_CMD up -d --build

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 10

# Run database migrations
echo "🗄️  Running database migrations..."
$COMPOSE_CMD exec ai-hero pnpm run db:push

# Create SLURM courses
echo "📚 Creating SLURM courses..."

# Level 1 - Beginner
echo "📖 Creating Level 1 (Beginner) course..."
$COMPOSE_CMD exec ai-hero pnpm exec tsx src/scripts/create-slurm-course.ts level1 admin@coursebuilder.io

# Level 2 - Intermediate  
echo "📖 Creating Level 2 (Intermediate) course..."
$COMPOSE_CMD exec ai-hero pnpm exec tsx src/scripts/create-slurm-course.ts level2 admin@coursebuilder.io

# Level 3 - Advanced
echo "📖 Creating Level 3 (Advanced) course..."
$COMPOSE_CMD exec ai-hero pnpm exec tsx src/scripts/create-slurm-course.ts level3 admin@coursebuilder.io

echo "✅ SLURM courses deployment completed successfully!"
echo ""
echo "🌐 Access your Course Builder instance at: http://localhost:3000"
echo "🗄️  Database admin at: http://localhost:8080"
echo "📊 Redis is available at: localhost:6379"
echo ""
echo "📚 SLURM Courses created:"
echo "  - Level 1 (Pradžiamokslis): 40 hours, 5 sections"
echo "  - Level 2 (Pažengęs): 60 hours, 6 sections"
echo "  - Level 3 (Ekspertas): 80 hours, 7 sections"
echo ""
echo "🛠️  Management commands:"
echo "  - Stop services: $COMPOSE_CMD down"
echo "  - View logs: $COMPOSE_CMD logs -f ai-hero"
echo "  - Database shell: $COMPOSE_CMD exec mysql mysql -u root -p coursebuilder"
echo "  - App shell: $COMPOSE_CMD exec ai-hero sh"
echo ""
echo "🎯 Happy learning with SLURM!"