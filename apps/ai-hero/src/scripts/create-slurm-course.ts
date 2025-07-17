#!/usr/bin/env ts-node

import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { createSlurmCourse, type CreateSlurmCourseOptions } from '@/lib/slurm-course-builder'
import { SlurmCourseStructure, type SlurmCourseLevel } from '@/lib/slurm-course-structure'

async function main() {
  const args = process.argv.slice(2)
  const level = args[0] as SlurmCourseLevel
  const userEmail = args[1] || 'admin@example.com'
  
  if (!level || !SlurmCourseStructure[level]) {
    console.error('❌ Please provide a valid level: level1, level2, or level3')
    console.error('Usage: ts-node create-slurm-course.ts <level> [user-email]')
    process.exit(1)
  }
  
  console.log(`🚀 Creating SLURM course for level: ${level}`)
  console.log(`👤 User email: ${userEmail}`)
  
  try {
    // Find user by email
    const user = await db.query.users.findFirst({
      where: eq(users.email, userEmail)
    })
    
    if (!user) {
      console.error(`❌ User not found with email: ${userEmail}`)
      console.error('Please provide a valid user email or create a user first')
      process.exit(1)
    }
    
    console.log(`✅ Found user: ${user.name} (${user.email})`)
    
    // Create the course
    const result = await createSlurmCourse({
      level,
      createdById: user.id,
      organizationId: null // or provide organization ID if needed
    })
    
    console.log(`🎉 Successfully created SLURM course!`)
    console.log(`📚 Course ID: ${result.courseId}`)
    console.log(`🔗 Course Slug: ${result.courseSlug}`)
    console.log(`📖 Title: ${result.title}`)
    console.log(`📑 Sections: ${result.sectionsCount}`)
    console.log(`📝 Total Lessons: ${result.totalLessons}`)
    
    const courseData = SlurmCourseStructure[level]
    console.log(`\n📊 Course Summary:`)
    console.log(`Duration: ${courseData.duration}`)
    console.log(`Target Audience: ${courseData.targetAudience}`)
    console.log(`\nSections created:`)
    
    courseData.sections.forEach((section, index) => {
      console.log(`  ${index + 1}. ${section.title} (${section.duration})`)
      console.log(`     Lessons: ${section.lessons.length}`)
    })
    
    console.log(`\n✅ Course creation completed successfully!`)
    
  } catch (error) {
    console.error('❌ Error creating SLURM course:', error)
    process.exit(1)
  }
}

// Handle command line execution
if (require.main === module) {
  main().catch((error) => {
    console.error('Fatal error:', error)
    process.exit(1)
  })
}

export { main as createSlurmCourseScript }