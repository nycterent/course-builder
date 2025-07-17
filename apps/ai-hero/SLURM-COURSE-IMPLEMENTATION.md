# SLURM Course Implementation Guide

## Overview

This document describes the implementation of a comprehensive SLURM (Simple Linux Utility for Resource Management) course system using the Course Builder platform. The course is designed for DevOps/SysAdmin professionals and is structured in 3 progressive levels.

## Course Structure

### Level 1 - Pradžiamokslis (Beginner)
- **Duration**: 40 academic hours
- **Target Audience**: System administrators, beginner DevOps specialists
- **Sections**: 5 sections with 20 lessons/exercises
- **Focus**: Basic SLURM concepts, job management, resource allocation

### Level 2 - Pažengęs (Intermediate)
- **Duration**: 60 academic hours
- **Target Audience**: Experienced system administrators, DevOps engineers
- **Sections**: 6 sections with 26 lessons/exercises
- **Focus**: Advanced configuration, performance optimization, security

### Level 3 - Ekspertas (Advanced)
- **Duration**: 80 academic hours
- **Target Audience**: Senior DevOps/SysAdmin specialists, HPC engineers
- **Sections**: 7 sections with 28 lessons/exercises
- **Focus**: Enterprise architecture, plugin development, business solutions

## Implementation Files

### Core Structure Files

#### 1. `slurm-course-structure.ts`
Contains the complete course structure definition with all levels, sections, and lessons.

**Key features:**
- Structured course data with TypeScript types
- Complete curriculum for all 3 levels
- Duration and target audience specifications
- Lesson types (lesson, exercise, solution)

#### 2. `slurm-course-builder.ts`
Main builder functions for creating course content in Course Builder format.

**Key functions:**
- `createSlurmCourse()` - Creates a complete course with all content
- `generateLessonContent()` - Generates lesson content based on type and level
- `getSlurmCourseIds()` - Utility to get course IDs
- `deleteSlurmCourse()` - Course deletion utility

#### 3. `slurm-course-manager.ts`
Management interface for SLURM courses with statistics and administration.

**Key functions:**
- `getAllSlurmCourses()` - Get all SLURM courses
- `getSlurmCourseStats()` - Get course statistics
- `updateSlurmCourseStatus()` - Update course status
- `generateSlurmCourseCertificate()` - Generate certificates
- `exportSlurmCourse()` - Export course data

#### 4. `create-slurm-course.ts`
Command-line script for creating SLURM courses.

**Usage:**
```bash
# Create Level 1 course
ts-node src/scripts/create-slurm-course.ts level1 admin@example.com

# Create Level 2 course
ts-node src/scripts/create-slurm-course.ts level2 admin@example.com

# Create Level 3 course
ts-node src/scripts/create-slurm-course.ts level3 admin@example.com
```

## Course Content Structure

### Database Schema
The courses use the standard Course Builder content resource schema:

```typescript
ContentResource {
  id: string
  type: 'workshop' | 'section' | 'lesson' | 'exercise' | 'solution'
  fields: {
    title: string
    slug: string
    description: string
    state: 'draft' | 'published' | 'archived'
    visibility: 'public' | 'private' | 'unlisted'
    body: string (markdown content)
    duration?: string
    targetAudience?: string
  }
  resources: ContentResourceResource[] // Child resources
}
```

### Content Hierarchy
```
Course (workshop)
├── Section 1 (section)
│   ├── Lesson 1.1 (lesson)
│   ├── Lesson 1.2 (lesson)
│   └── Lab 1.1 (exercise)
├── Section 2 (section)
│   ├── Lesson 2.1 (lesson)
│   ├── Lesson 2.2 (lesson)
│   └── Lab 2.1 (exercise)
└── ...
```

## Course Features

### 1. Progressive Learning Structure
- Each level builds upon the previous one
- Comprehensive curriculum from basics to expert level
- Practical exercises and laboratory work

### 2. Lithuanian Language Support
- All content is in Lithuanian
- Proper technical terminology
- Cultural context for Lithuanian IT professionals

### 3. Industry-Focused Content
- Designed for Fortune 10,000, 500, and 100 companies
- Real-world scenarios and use cases
- Enterprise-grade solutions and practices

### 4. Practical Components
- Hands-on laboratories (40% theory, 60% practice)
- Virtual SLURM environments
- Real scenario simulations
- Project-based learning

### 5. Certification Path
- Level-based certifications
- Practical examinations
- Project presentations
- Industry-recognized credentials

## Technical Implementation

### 1. Content Generation
The system automatically generates:
- Course structure with sections and lessons
- Lesson content with proper formatting
- Exercise instructions and objectives
- Learning objectives and assessments

### 2. Course Management
- Statistical tracking
- Progress monitoring
- Certificate generation
- Content export/import

### 3. Assessment System
- Practical examinations (60%)
- Theoretical tests (25%)
- Project presentations (15%)

## Usage Instructions

### Creating a New Course

1. **Run the creation script:**
   ```bash
   cd apps/ai-hero
   ts-node src/scripts/create-slurm-course.ts level1 your-email@example.com
   ```

2. **Verify creation:**
   ```bash
   # Check database for created resources
   # Use Course Builder admin interface
   ```

### Managing Courses

1. **Get course statistics:**
   ```typescript
   import { getSlurmCourseStats } from '@/lib/slurm-course-manager'
   const stats = await getSlurmCourseStats()
   ```

2. **Update course status:**
   ```typescript
   import { updateSlurmCourseStatus } from '@/lib/slurm-course-manager'
   await updateSlurmCourseStatus(courseId, 'published')
   ```

3. **Generate certificates:**
   ```typescript
   import { generateSlurmCourseCertificate } from '@/lib/slurm-course-manager'
   const cert = await generateSlurmCourseCertificate(courseId, userId)
   ```

## Content Examples

### Level 1 Lesson Example
```markdown
# HPC klasterių valdymo pagrindai

**Kursas:** SLURM Pradžiamokslis
**Skyrius:** SLURM Įvadas
**Trukmė:** 1.5 val.
**Tipas:** Pamoka

## Aprašymas
Supažindimas su aukšto našumo kompiuterijos konceptais

## Mokymosi tikslai
Po šios pamokos galėsite:
- Suprasti pagrindines HPC sąvokas
- Identifikuoti SLURM vaidmenį HPC aplinkoje
- Įvardyti pagrindinius komponentus
```

### Level 3 Exercise Example
```markdown
# Realaus klasterio projektavimas

**Kursas:** SLURM Ekspertas
**Skyrius:** Baigiamasis Projektas
**Trukmė:** 3 val.
**Tipas:** Laboratorinis darbas

## Aprašymas
Pilnas klasterio projektavimas ir implementacija

## Užduotys
1. Projektuokite korporatyvinio lygio sprendimą
2. Implementuokite HA konfigūraciją
3. Sukurkite specializuotus papildinius
4. Testuokite katastrofų atkūrimo planus
5. Paruoškite verslo ataskaitas
6. Pristatykite sprendimą vadovybei
```

## Customization Options

### Adding New Content
1. Modify `slurm-course-structure.ts` to add new sections/lessons
2. Update content generators in `slurm-course-builder.ts`
3. Re-run course creation script

### Changing Course Language
1. Update all text strings in structure files
2. Modify content generation functions
3. Update documentation

### Adding New Levels
1. Add new level to `SlurmCourseStructure`
2. Update type definitions
3. Add content generation logic

## Integration with Course Builder

### Authentication
- Uses Course Builder's authentication system
- Requires user to be logged in and have content creation permissions

### Content Management
- Integrates with Course Builder's content resource system
- Uses standard lesson/exercise/section types
- Supports versioning and collaboration features

### Commerce Integration
- Can be integrated with Course Builder's commerce system
- Supports pricing and purchase workflows
- Certification and completion tracking

## Future Enhancements

### Planned Features
1. **Interactive Labs**: Integration with virtual SLURM environments
2. **Video Content**: Video lessons and demonstrations
3. **Assessment Tools**: Automated testing and grading
4. **Collaboration**: Team-based projects and discussions
5. **Analytics**: Detailed learning analytics and progress tracking

### Technical Improvements
1. **Content Versioning**: Track changes and updates
2. **Localization**: Support for multiple languages
3. **API Integration**: SLURM API integration for hands-on labs
4. **Mobile Support**: Mobile-optimized course content

## Support and Maintenance

### Content Updates
- Regular updates to reflect SLURM changes
- Industry trend integration
- User feedback incorporation

### Technical Support
- Course Builder integration support
- Database maintenance
- Performance optimization

### Community
- User forums and discussion boards
- Expert mentorship programs
- Industry networking opportunities

---

*This implementation provides a comprehensive SLURM education platform suitable for professional development in DevOps and system administration roles.*