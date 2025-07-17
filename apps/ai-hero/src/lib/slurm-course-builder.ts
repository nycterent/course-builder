import { db } from '@/db'
import { contentResource, contentResourceResource } from '@/db/schema'
import { guid } from '@/utils/guid'
import slugify from '@sindresorhus/slugify'
import { SlurmCourseStructure, type SlurmCourseLevel } from './slurm-course-structure'

export interface CreateSlurmCourseOptions {
  level: SlurmCourseLevel
  createdById: string
  organizationId?: string
}

export async function createSlurmCourse(options: CreateSlurmCourseOptions) {
  const { level, createdById, organizationId } = options
  const courseData = SlurmCourseStructure[level]
  
  console.log(`📚 Creating SLURM course ${level}:`, courseData.title)
  
  // Create main course/workshop
  const courseId = `course_${guid()}`
  const courseSlug = `${courseData.slug}~${guid()}`
  
  await db.insert(contentResource).values({
    id: courseId,
    type: 'workshop',
    createdById,
    organizationId,
    fields: {
      title: courseData.title,
      slug: courseSlug,
      description: courseData.description,
      state: 'draft',
      visibility: 'unlisted',
      duration: courseData.duration,
      targetAudience: courseData.targetAudience,
      body: `# ${courseData.title}

${courseData.description}

## Kursas skirtas:
${courseData.targetAudience}

## Trukmė:
${courseData.duration}

## Mokymosi tikslai:
- Įvaldyti SLURM darbo krūvio valdymo pagrindus
- Mokėti konfigūruoti ir administruoti SLURM sistemą
- Suprasti resursų valdymo principus
- Gebėti spręsti realias problemas

## Kurso struktūra:
${courseData.sections.map((section, index) => `
### ${index + 1}. ${section.title} (${section.duration})
${section.lessons.map((lesson, lessonIndex) => `
- ${lessonIndex + 1}.${index + 1} ${lesson.title} (${lesson.duration})
  ${lesson.description}`).join('')}
`).join('')}
      `
    }
  })
  
  console.log(`✅ Course created with ID: ${courseId}`)
  
  // Create sections and lessons
  for (let sectionIndex = 0; sectionIndex < courseData.sections.length; sectionIndex++) {
    const section = courseData.sections[sectionIndex]
    const sectionId = `section_${guid()}`
    const sectionSlug = `${slugify(section.title)}~${guid()}`
    
    console.log(`📖 Creating section: ${section.title}`)
    
    // Create section
    await db.insert(contentResource).values({
      id: sectionId,
      type: 'section',
      createdById,
      organizationId,
      fields: {
        title: section.title,
        slug: sectionSlug,
        description: `${section.title} - ${section.duration}`,
        state: 'draft',
        visibility: 'unlisted',
        body: `# ${section.title}

**Trukmė:** ${section.duration}

## Pamokos:
${section.lessons.map((lesson, index) => `
### ${index + 1}. ${lesson.title} (${lesson.duration})
${lesson.description}
`).join('')}
        `
      }
    })
    
    // Link section to course
    await db.insert(contentResourceResource).values({
      resourceOfId: courseId,
      resourceId: sectionId,
      position: sectionIndex
    })
    
    // Create lessons within section
    for (let lessonIndex = 0; lessonIndex < section.lessons.length; lessonIndex++) {
      const lesson = section.lessons[lessonIndex]
      const lessonId = `lesson_${guid()}`
      const lessonSlug = `${slugify(lesson.title)}~${guid()}`
      
      console.log(`📝 Creating lesson: ${lesson.title}`)
      
      // Create lesson
      await db.insert(contentResource).values({
        id: lessonId,
        type: lesson.type as 'lesson' | 'exercise',
        createdById,
        organizationId,
        fields: {
          title: lesson.title,
          slug: lessonSlug,
          description: lesson.description,
          state: 'draft',
          visibility: 'unlisted',
          duration: lesson.duration,
          body: generateLessonContent(lesson, level, section.title)
        }
      })
      
      // Link lesson to section
      await db.insert(contentResourceResource).values({
        resourceOfId: sectionId,
        resourceId: lessonId,
        position: lessonIndex
      })
    }
  }
  
  console.log(`🎉 SLURM course ${level} created successfully!`)
  
  return {
    courseId,
    courseSlug,
    title: courseData.title,
    sectionsCount: courseData.sections.length,
    totalLessons: courseData.sections.reduce((total, section) => total + section.lessons.length, 0)
  }
}

function generateLessonContent(lesson: any, level: SlurmCourseLevel, sectionTitle: string): string {
  const isExercise = lesson.type === 'exercise'
  const levelText = level === 'level1' ? 'Pradžiamokslis' : level === 'level2' ? 'Pažengęs' : 'Ekspertas'
  
  return `# ${lesson.title}

**Kursas:** SLURM ${levelText}  
**Skyrius:** ${sectionTitle}  
**Trukmė:** ${lesson.duration}  
**Tipas:** ${isExercise ? 'Laboratorinis darbas' : 'Pamoka'}

## Aprašymas
${lesson.description}

${isExercise ? `
## Užduotys

### Pasiruošimas
1. Įsitikinkite, kad turite prieigą prie SLURM aplinkos
2. Atsisiųskite reikalingus failus ir pavyzdžius
3. Paruoškite darbo aplinką

### Praktiniai veiksmai
${generateExerciseSteps(lesson, level)}

### Tikrinimas
- Patikrinkite, ar užduotys atliktos teisingai
- Pateikite rezultatus vertinimui
- Aptarkite problemas ir sprendimus

## Ištekliai
- SLURM dokumentacija
- Konfigūracijos pavyzdžiai
- Skriptų biblioteka
- Pagalbos kontaktai

## Vertinimo kriterijai
- Užduočių atlikimo kokybė
- Sprendimų originalumas
- Problemų sprendimo gebėjimai
- Dokumentacijos kokybė
` : `
## Mokymosi tikslai
Po šios pamokos galėsite:
${generateLearningObjectives(lesson, level)}

## Turinys
${generateLessonTopics(lesson, level)}

## Praktiniai pavyzdžiai
${generateExamples(lesson, level)}

## Papildoma medžiaga
- Dokumentacijos nuorodos
- Naudingos komandos
- Konfigūracijos pavyzdžiai
- Dažnai klausiami klausimai

## Kitas žingsnis
${generateNextSteps(lesson, level)}
`}

---

*Šis turinys yra SLURM darbo krūvio valdymo kurso dalis, skirta DevOps/SysAdmin specialistams.*
`
}

function generateExerciseSteps(lesson: any, level: SlurmCourseLevel): string {
  const steps = {
    level1: [
      '1. Prisijunkite prie SLURM klasterio',
      '2. Patikrinkite sistemos statusą naudodami `sinfo`',
      '3. Sukurkite paprastą batch skriptą',
      '4. Pateikite darbą naudodami `sbatch`',
      '5. Stebėkite darbo vykdymą su `squeue`',
      '6. Analizuokite rezultatus'
    ],
    level2: [
      '1. Konfigūruokite sudėtingesnę SLURM aplinką',
      '2. Nustatykite QoS parametrus',
      '3. Sukurkite automatizuotus skriptus',
      '4. Testuokite našumo optimizavimą',
      '5. Integruokite su išorinėmis sistemomis',
      '6. Dokumentuokite sprendimus'
    ],
    level3: [
      '1. Projektuokite korporatyvinio lygio sprendimą',
      '2. Implementuokite HA konfigūraciją',
      '3. Sukurkite specializuotus papildinius',
      '4. Testuokite katastrofų atkūrimo planus',
      '5. Paruoškite verslo ataskaitas',
      '6. Pristatykite sprendimą vadovybei'
    ]
  }
  
  return steps[level].join('\n')
}

function generateLearningObjectives(lesson: any, level: SlurmCourseLevel): string {
  const objectives = {
    level1: [
      '- Suprasti pagrindines SLURM sąvokas',
      '- Mokėti vykdyti paprastas komandas',
      '- Sukurti ir vykdyti batch skriptus',
      '- Stebėti darbo vykdymą'
    ],
    level2: [
      '- Konfigūruoti pažangius SLURM parametrus',
      '- Optimizuoti sistemos našumą',
      '- Integruoti su išorinėmis sistemomis',
      '- Automatizuoti procesus'
    ],
    level3: [
      '- Projektuoti korporatyvinio lygio sprendimus',
      '- Kurti specializuotus papildinius',
      '- Valdyti sudėtingas architektūras',
      '- Vadovauti techniniams projektams'
    ]
  }
  
  return objectives[level].join('\n')
}

function generateLessonTopics(lesson: any, level: SlurmCourseLevel): string {
  return `### Pagrindinės temos:
- ${lesson.description}
- Praktiniai pavyzdžiai
- Dažnos klaidos ir jų sprendimas
- Geriausioji praktika

### Detalus turinys:
*Detalus turinys bus pridėtas kurso kūrimo metu*`
}

function generateExamples(lesson: any, level: SlurmCourseLevel): string {
  return `### Pavyzdžiai:
*Praktiniai pavyzdžiai bus pridėti kurso kūrimo metu*

### Komandų pavyzdžiai:
\`\`\`bash
# Pavyzdžiai bus pridėti
sinfo
squeue
sbatch
\`\`\`

### Konfigūracijos pavyzdžiai:
\`\`\`
# Konfigūracijos pavyzdžiai bus pridėti
\`\`\``
}

function generateNextSteps(lesson: any, level: SlurmCourseLevel): string {
  return `Kita pamoka: *Bus nurodyta kurso kūrimo metu*

**Pasiruošimas kitai pamokai:**
- Peržiūrėkite šios pamokos medžiagą
- Atlikite papildomus pratimus
- Paruoškite klausimus`
}

// Utility function to get all course IDs for a level
export async function getSlurmCourseIds(level: SlurmCourseLevel): Promise<string[]> {
  const courseData = SlurmCourseStructure[level]
  const courses = await db.query.contentResource.findMany({
    where: (resource, { eq, like }) => 
      eq(resource.type, 'workshop') && 
      like(resource.fields, `%${courseData.slug}%`)
  })
  
  return courses.map(course => course.id)
}

// Utility function to delete a SLURM course and all its content
export async function deleteSlurmCourse(courseId: string): Promise<void> {
  console.log(`🗑️ Deleting SLURM course: ${courseId}`)
  
  // This would need to be implemented with proper cascade deletion
  // For now, just log the action
  console.log(`⚠️ Course deletion not implemented yet for: ${courseId}`)
}