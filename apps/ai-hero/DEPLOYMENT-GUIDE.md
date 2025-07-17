# SLURM Course Deployment Guide

## Overview
This guide helps you deploy the SLURM course system using Docker or Podman containers.

## Prerequisites
- Docker or Podman installed
- Docker Compose (for Docker) or podman-compose (for Podman)
- At least 4GB RAM available
- Port 3000, 3306, 6379, and 8080 available

## Quick Start

### 1. Clone and Navigate
```bash
git clone <repository-url>
cd course-builder/apps/ai-hero
```

### 2. Run Deployment Script
```bash
./deploy-slurm-courses.sh
```

This script will:
- ✅ Detect Docker or Podman
- ✅ Create environment configuration
- ✅ Build and start all services
- ✅ Run database migrations
- ✅ Create all 3 SLURM course levels
- ✅ Provide access information

### 3. Access the Application
- **Course Builder**: http://localhost:3000
- **Database Admin**: http://localhost:8080
- **Redis**: localhost:6379

## Manual Deployment

### 1. Environment Setup
```bash
# Copy environment template
cp .env.docker .env.local

# Edit configuration (optional)
nano .env.local
```

### 2. Start Services
```bash
# Using Docker
docker compose up -d --build

# Using Podman
podman-compose up -d --build
```

### 3. Database Setup
```bash
# Wait for database to be ready
sleep 10

# Run migrations
docker compose exec ai-hero pnpm run db:push

# Or with Podman
podman-compose exec ai-hero pnpm run db:push
```

### 4. Create SLURM Courses
```bash
# Create Level 1 (Beginner)
docker compose exec ai-hero pnpm exec tsx src/scripts/create-slurm-course.ts level1 admin@coursebuilder.io

# Create Level 2 (Intermediate)
docker compose exec ai-hero pnpm exec tsx src/scripts/create-slurm-course.ts level2 admin@coursebuilder.io

# Create Level 3 (Advanced)
docker compose exec ai-hero pnpm exec tsx src/scripts/create-slurm-course.ts level3 admin@coursebuilder.io
```

## Services Overview

### Course Builder App (ai-hero)
- **Port**: 3000
- **Technology**: Next.js 15, TypeScript, TailwindCSS
- **Features**: Course management, user authentication, content creation

### MySQL Database
- **Port**: 3306
- **Version**: MySQL 8.0
- **Credentials**: root/coursebuilder, coursebuilder/coursebuilder
- **Volume**: Persistent storage for course data

### Redis Cache
- **Port**: 6379
- **Purpose**: Session caching, performance optimization
- **Volume**: Persistent storage for cache

### phpMyAdmin
- **Port**: 8080
- **Purpose**: Database administration interface
- **Access**: http://localhost:8080

## Course Structure Created

### Level 1 - Pradžiamokslis (Beginner)
- **Duration**: 40 academic hours
- **Sections**: 5 (SLURM Įvadas, Užduočių Valdymas, Resursų Valdymas, etc.)
- **Total Lessons**: 20 lessons and exercises
- **Target**: System administrators, beginner DevOps specialists

### Level 2 - Pažengęs (Intermediate)
- **Duration**: 60 academic hours
- **Sections**: 6 (Pažangus Konfigūravimas, Našumo Optimizavimas, etc.)
- **Total Lessons**: 26 lessons and exercises
- **Target**: Experienced system administrators, DevOps engineers

### Level 3 - Ekspertas (Advanced)
- **Duration**: 80 academic hours
- **Sections**: 7 (Korporatyvinio Lygio Architektūra, Plėtinių Kūrimas, etc.)
- **Total Lessons**: 28 lessons and exercises
- **Target**: Senior DevOps/SysAdmin specialists, HPC engineers

## Management Commands

### Service Management
```bash
# Stop all services
docker compose down

# Restart services
docker compose restart

# View logs
docker compose logs -f ai-hero

# Update services
docker compose up -d --build
```

### Database Management
```bash
# Database shell
docker compose exec mysql mysql -u root -p coursebuilder

# Database backup
docker compose exec mysql mysqldump -u root -p coursebuilder > backup.sql

# Database restore
docker compose exec -T mysql mysql -u root -p coursebuilder < backup.sql
```

### Application Management
```bash
# App shell
docker compose exec ai-hero sh

# Run scripts
docker compose exec ai-hero pnpm run db:studio
docker compose exec ai-hero pnpm run db:seed
```

## Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Check what's using the port
sudo lsof -i :3000

# Kill the process
sudo kill -9 <PID>
```

#### Database Connection Issues
```bash
# Check database status
docker compose ps mysql

# Check database logs
docker compose logs mysql

# Recreate database
docker compose down mysql
docker volume rm ai-hero_mysql_data
docker compose up -d mysql
```

#### Course Creation Failures
```bash
# Check app logs
docker compose logs ai-hero

# Verify database schema
docker compose exec ai-hero pnpm run db:push

# Retry course creation
docker compose exec ai-hero pnpm exec tsx src/scripts/create-slurm-course.ts level1 admin@coursebuilder.io
```

### Performance Optimization

#### Memory Usage
```bash
# Check container memory usage
docker stats

# Increase memory limits in docker-compose.yml
services:
  ai-hero:
    deploy:
      resources:
        limits:
          memory: 2G
```

#### Database Performance
```bash
# Check database performance
docker compose exec mysql mysql -u root -p -e "SHOW PROCESSLIST;"

# Optimize database
docker compose exec mysql mysql -u root -p -e "OPTIMIZE TABLE coursebuilder.ContentResource;"
```

## Production Deployment

### Environment Variables
```bash
# Production environment
NODE_ENV=production
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-strong-secret-key

# Database (use managed service)
DATABASE_URL=mysql://user:password@your-db-host:3306/coursebuilder

# Redis (use managed service)
REDIS_URL=redis://your-redis-host:6379
```

### SSL/TLS Setup
```bash
# Add SSL certificates
# Update docker-compose.yml with SSL configuration
# Use reverse proxy (nginx, traefik, etc.)
```

### Backup Strategy
```bash
# Automated backups
#!/bin/bash
docker compose exec mysql mysqldump -u root -p coursebuilder > backup-$(date +%Y%m%d).sql
```

## Security Considerations

### Database Security
- Change default passwords
- Use strong credentials
- Enable SSL for database connections
- Regular security updates

### Application Security
- Set strong NEXTAUTH_SECRET
- Enable HTTPS in production
- Regular dependency updates
- Monitor for security vulnerabilities

## Monitoring and Logging

### Health Checks
```bash
# Check service health
docker compose ps

# Application health
curl http://localhost:3000/api/health
```

### Log Management
```bash
# View all logs
docker compose logs

# Follow specific service logs
docker compose logs -f ai-hero

# Log rotation
docker compose logs --tail=100 ai-hero
```

## Support and Maintenance

### Regular Maintenance
- Monitor disk usage
- Update container images
- Database optimization
- Security updates

### Getting Help
- Check logs for error messages
- Review Course Builder documentation
- Contact support team

---

## Quick Reference

### Default Credentials
- **Database**: root/coursebuilder
- **phpMyAdmin**: root/coursebuilder
- **Default User**: admin@coursebuilder.io

### Important URLs
- **Application**: http://localhost:3000
- **Database Admin**: http://localhost:8080
- **API Health**: http://localhost:3000/api/health

### Volume Locations
- **MySQL Data**: `ai-hero_mysql_data`
- **Redis Data**: `ai-hero_redis_data`

### Course Management
- **Create Course**: `tsx src/scripts/create-slurm-course.ts <level> <user-email>`
- **View Courses**: Access through Course Builder interface
- **Manage Content**: Use built-in course management tools

🎯 **Happy learning with SLURM courses!**