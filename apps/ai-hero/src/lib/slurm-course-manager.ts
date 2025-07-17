import { db } from '@/db'
import { contentResource, contentResourceResource } from '@/db/schema'
import { and, eq, like, sql } from 'drizzle-orm'
import { SlurmCourseStructure, type SlurmCourseLevel } from './slurm-course-structure'

export interface SlurmCourseInfo {
  id: string
  title: string
  slug: string
  level: SlurmCourseLevel
  sectionsCount: number
  lessonsCount: number
  createdAt: Date
  updatedAt: Date
  createdById: string
  status: 'draft' | 'published' | 'archived'
}

export interface SlurmCourseStats {
  totalCourses: number
  coursesByLevel: Record<SlurmCourseLevel, number>
  totalSections: number
  totalLessons: number
  totalExercises: number
}

// Get all SLURM courses
export async function getAllSlurmCourses(): Promise<SlurmCourseInfo[]> {
  const courses = await db.query.contentResource.findMany({
    where: and(
      eq(contentResource.type, 'workshop'),
      like(sql`JSON_EXTRACT(${contentResource.fields}, '$.slug')`, '%slurm-%')
    ),
    with: {
      resources: {
        with: {
          resource: {
            with: {
              resources: true
            }
          }
        }
      }
    }
  })
  
  return courses.map(course => {
    const slug = course.fields.slug as string
    const level = detectCourseLevel(slug)
    const sectionsCount = course.resources?.length || 0
    const lessonsCount = course.resources?.reduce((total, section) => 
      total + (section.resource.resources?.length || 0), 0) || 0
    
    return {
      id: course.id,
      title: course.fields.title as string,
      slug,
      level,
      sectionsCount,
      lessonsCount,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
      createdById: course.createdById,
      status: course.fields.state as 'draft' | 'published' | 'archived'
    }
  })
}

// Get SLURM course statistics
export async function getSlurmCourseStats(): Promise<SlurmCourseStats> {
  const courses = await getAllSlurmCourses()
  
  const stats: SlurmCourseStats = {
    totalCourses: courses.length,
    coursesByLevel: {
      level1: 0,
      level2: 0,
      level3: 0
    },
    totalSections: 0,
    totalLessons: 0,
    totalExercises: 0
  }
  
  courses.forEach(course => {
    stats.coursesByLevel[course.level]++
    stats.totalSections += course.sectionsCount
    stats.totalLessons += course.lessonsCount
  })
  
  // Get exercise count
  const exercises = await db.query.contentResource.findMany({
    where: and(
      eq(contentResource.type, 'exercise'),
      like(sql`JSON_EXTRACT(${contentResource.fields}, '$.slug')`, '%slurm-%')
    )
  })
  
  stats.totalExercises = exercises.length
  
  return stats
}

// Get specific SLURM course with full details
export async function getSlurmCourse(courseId: string) {
  const course = await db.query.contentResource.findFirst({
    where: eq(contentResource.id, courseId),
    with: {
      resources: {
        with: {
          resource: {
            with: {
              resources: {
                with: {
                  resource: true
                }
              }
            }
          }
        }
      }
    }
  })
  
  if (!course) {
    return null
  }
  
  const level = detectCourseLevel(course.fields.slug as string)
  const courseStructure = SlurmCourseStructure[level]
  
  return {
    ...course,
    level,
    courseStructure,
    sectionsCount: course.resources?.length || 0,
    lessonsCount: course.resources?.reduce((total, section) => 
      total + (section.resource.resources?.length || 0), 0) || 0
  }
}

// Update SLURM course status
export async function updateSlurmCourseStatus(
  courseId: string,
  status: 'draft' | 'published' | 'archived'
): Promise<void> {
  await db.update(contentResource)
    .set({
      fields: sql`JSON_SET(${contentResource.fields}, '$.state', ${status})`,
      updatedAt: new Date()
    })
    .where(eq(contentResource.id, courseId))
}

// Get course progress for a user
export async function getSlurmCourseProgress(
  courseId: string,
  userId: string
): Promise<{
  completedLessons: number
  totalLessons: number
  completedExercises: number
  totalExercises: number
  progressPercentage: number
}> {
  // This would need to be implemented with proper progress tracking
  // For now, return mock data
  return {
    completedLessons: 0,
    totalLessons: 0,
    completedExercises: 0,
    totalExercises: 0,
    progressPercentage: 0
  }
}

// Helper function to detect course level from slug
function detectCourseLevel(slug: string): SlurmCourseLevel {
  if (slug.includes('pradžiamokslis') || slug.includes('level-1')) {
    return 'level1'
  } else if (slug.includes('paženges') || slug.includes('level-2')) {
    return 'level2'
  } else if (slug.includes('ekspertas') || slug.includes('level-3')) {
    return 'level3'
  }
  return 'level1' // default
}

// Generate course completion certificate
export async function generateSlurmCourseCertificate(
  courseId: string,
  userId: string
): Promise<{
  certificateId: string
  courseTitle: string
  level: SlurmCourseLevel
  completedAt: Date
  certificateUrl: string
}> {
  // This would need to be implemented with proper certificate generation
  const course = await getSlurmCourse(courseId)
  
  if (!course) {
    throw new Error('Course not found')
  }
  
  const certificateId = `cert_${Date.now()}`
  const certificateUrl = `/certificates/${certificateId}`
  
  return {
    certificateId,
    courseTitle: course.fields.title as string,
    level: course.level,
    completedAt: new Date(),
    certificateUrl
  }
}

// Export course content for backup or migration
export async function exportSlurmCourse(courseId: string): Promise<any> {
  const course = await getSlurmCourse(courseId)
  
  if (!course) {
    throw new Error('Course not found')
  }
  
  return {
    courseId,
    exportedAt: new Date(),
    courseData: course,
    metadata: {
      version: '1.0',
      format: 'slurm-course-export',
      generator: 'course-builder'
    }
  }
}

// Duplicate course for customization
export async function duplicateSlurmCourse(
  sourceId: string,
  newTitle: string,
  createdById: string
): Promise<string> {
  // This would need to be implemented with proper course duplication
  // For now, just return a mock ID
  return `course_${Date.now()}`
}