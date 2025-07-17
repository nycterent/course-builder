# Manual Dokploy Setup Guide for SLURM Course Builder

## 📋 Setup Steps

Since Dokploy is designed for web UI management, here's how to manually set up the SLURM course system:

### 1. Access Dokploy Console
- **URL**: https://console.hackrsvalv.com
- **API Key**: [Get from Dokploy Console → Settings → API Keys]

### 2. Create New Project
1. Click "New Project"
2. **Name**: `slurm-course-builder`
3. **Description**: `SLURM Course Builder - Lithuanian DevOps/SysAdmin Training Platform`

### 3. Add MySQL Database
1. In project, click "Add Service" → "Database" → "MySQL"
2. **Settings**:
   - **Name**: `mysql`
   - **Version**: `8.0`
   - **Database**: `slurm_courses`
   - **Username**: `slurm_user`
   - **Password**: `SlUrM_C0urse_2024!`
   - **Port**: `3306`
   - **Volume**: `/var/lib/mysql`

### 4. Add Redis Cache
1. Click "Add Service" → "Database" → "Redis"
2. **Settings**:
   - **Name**: `redis`
   - **Version**: `7-alpine`
   - **Port**: `6379`
   - **Volume**: `/data`

### 5. Create Application
1. Click "Add Application"
2. **Source**: GitHub (or Git)
3. **Repository**: Your course-builder repository
4. **Branch**: `main`
5. **Path**: `/apps/ai-hero`
6. **Build Settings**:
   - **Build Command**: `pnpm install && pnpm run build`
   - **Start Command**: `pnpm start`
   - **Port**: `3000`

### 6. Environment Variables
Add these environment variables in the application settings:

```env
NODE_ENV=production
NEXT_PUBLIC_APP_NAME=slurm-course-builder
NEXT_PUBLIC_HOST=kolega.neatsiliknuo.ai
NEXT_PUBLIC_URL=https://kolega.neatsiliknuo.ai
NEXTAUTH_URL=https://kolega.neatsiliknuo.ai
NEXTAUTH_SECRET=slurm-course-secret-key-change-this-in-production-2024
DATABASE_URL=mysql://slurm_user:SlUrM_C0urse_2024!@mysql:3306/slurm_courses
REDIS_URL=redis://redis:6379
```

### 7. Domain Configuration
1. Go to "Domains" section
2. Add domain: `kolega.neatsiliknuo.ai`
3. Enable SSL
4. Enable redirect to HTTPS

### 8. Resource Allocation
- **Memory**: 2048Mi
- **CPU**: 1000m

### 9. Deploy Application
1. Click "Deploy"
2. Wait for deployment to complete
3. Check logs for any errors

## 🔧 Post-Deployment Setup

### 1. Access Application Terminal
In Dokploy console, go to your application → "Terminal"

### 2. Run Database Migration
```bash
pnpm run db:push
```

### 3. Create SLURM Courses
```bash
# Level 1 - Beginner
pnpm exec tsx src/scripts/create-slurm-course.ts level1 admin@kolega.neatsiliknuo.ai

# Level 2 - Intermediate  
pnpm exec tsx src/scripts/create-slurm-course.ts level2 admin@kolega.neatsiliknuo.ai

# Level 3 - Advanced
pnpm exec tsx src/scripts/create-slurm-course.ts level3 admin@kolega.neatsiliknuo.ai
```

### 4. Verify Installation
- Visit: https://kolega.neatsiliknuo.ai
- Check if all services are running
- Verify courses are created

## 🎯 Expected Result

After completing these steps, you should have:
- **URL**: https://kolega.neatsiliknuo.ai
- **3 SLURM course levels**: 74 total lessons
- **Complete DevOps/SysAdmin training platform**
- **Admin email**: admin@kolega.neatsiliknuo.ai

## 🔍 Troubleshooting

### Common Issues:
1. **Build fails**: Check build logs in Dokploy console
2. **Database connection**: Verify MySQL service is running
3. **Domain not working**: Check DNS settings and SSL configuration
4. **Environment variables**: Ensure all required variables are set

### Debug Commands:
```bash
# Check services
docker ps

# Check logs
docker logs <container-name>

# Check database connection
mysql -h mysql -u slurm_user -p slurm_courses
```

## 🛠️ Management

### Monitoring:
- **Logs**: Dokploy Console → Application → Logs
- **Metrics**: Dokploy Console → Application → Metrics
- **Resources**: Dokploy Console → Application → Resources

### Scaling:
- **Replicas**: Adjust in application settings
- **Resources**: Increase memory/CPU as needed

### Updates:
- **Code**: Push to repository and redeploy
- **Environment**: Update variables in Dokploy console

---

## 📞 Support

If you encounter issues:
1. Check Dokploy logs
2. Verify all services are running
3. Check DNS and SSL configuration
4. Review environment variables

🎉 **Sėkmės su SLURM kursų diegimu!**