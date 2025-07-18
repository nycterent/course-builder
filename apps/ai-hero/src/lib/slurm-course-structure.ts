import { z } from 'zod'

import { ContentResourceSchema } from '@coursebuilder/core/schemas'

// SLURM Course Structure Definition
export const SlurmCourseStructure = {
	// Level 1 - Beginner (Pradžiamokslis)
	level1: {
		id: 'slurm-level-1',
		title: 'SLURM Darbo Krūvio Valdymas - 1 Lygis (Pradžiamokslis)',
		slug: 'slurm-pradžiamokslis',
		description:
			'Pagrindinis SLURM darbo krūvio valdymo kursas DevOps/SysAdmin specialistams',
		duration: '40 akademinių valandų',
		targetAudience:
			'Sistemos administratoriai, pradedantys DevOps specialistai',
		sections: [
			{
				id: 'slurm-l1-intro',
				title: 'SLURM Įvadas',
				duration: '6 val.',
				lessons: [
					{
						id: 'slurm-l1-intro-1',
						title: 'HPC klasterių valdymo pagrindai',
						type: 'lesson',
						duration: '1.5 val.',
						description:
							'Supažindimas su aukšto našumo kompiuterijos konceptais',
					},
					{
						id: 'slurm-l1-intro-2',
						title: 'SLURM architektūra ir komponentai',
						type: 'lesson',
						duration: '2 val.',
						description: 'Pagrindinis SLURM architektūros supratimas',
					},
					{
						id: 'slurm-l1-intro-3',
						title: 'Diegimas ir pradinis konfigūravimas',
						type: 'lesson',
						duration: '1.5 val.',
						description: 'Praktinis SLURM diegimas ir bazinis konfigūravimas',
					},
					{
						id: 'slurm-l1-intro-lab',
						title: 'Laboratorinis darbas: SLURM aplinkos sukūrimas',
						type: 'exercise',
						duration: '1 val.',
						description:
							'Praktinis SLURM aplinkos sukūrimas virtualioje aplinkoje',
					},
				],
			},
			{
				id: 'slurm-l1-jobs',
				title: 'Užduočių Valdymas',
				duration: '8 val.',
				lessons: [
					{
						id: 'slurm-l1-jobs-1',
						title: 'sbatch, srun, squeue komandos',
						type: 'lesson',
						duration: '2 val.',
						description: 'Pagrindinės SLURM komandos užduočių valdymui',
					},
					{
						id: 'slurm-l1-jobs-2',
						title: 'Paprastos darbo skriptų rašymas',
						type: 'lesson',
						duration: '2 val.',
						description: 'Batch skriptų kūrimas ir valdymas',
					},
					{
						id: 'slurm-l1-jobs-3',
						title: 'Užduočių būsenų stebėjimas',
						type: 'lesson',
						duration: '2 val.',
						description: 'Darbo stebėjimas ir būsenų analizė',
					},
					{
						id: 'slurm-l1-jobs-lab',
						title: 'Laboratorinis darbas: Užduočių valdymas',
						type: 'exercise',
						duration: '2 val.',
						description: 'Praktinis darbo skriptų kūrimas ir vykdymas',
					},
				],
			},
			{
				id: 'slurm-l1-resources',
				title: 'Resursų Valdymas',
				duration: '8 val.',
				lessons: [
					{
						id: 'slurm-l1-resources-1',
						title: 'Mazgų ir skaidmenų konfigūravimas',
						type: 'lesson',
						duration: '2 val.',
						description: 'Klasterio mazgų ir skaidmenų valdymas',
					},
					{
						id: 'slurm-l1-resources-2',
						title: 'CPU ir atminties priskyrimas',
						type: 'lesson',
						duration: '2 val.',
						description: 'Resursų paskirstymas ir valdymas',
					},
					{
						id: 'slurm-l1-resources-3',
						title: 'Bazinės QoS nuostatos',
						type: 'lesson',
						duration: '2 val.',
						description: 'Paslaugų kokybės valdymas',
					},
					{
						id: 'slurm-l1-resources-lab',
						title: 'Laboratorinis darbas: Resursų konfigūravimas',
						type: 'exercise',
						duration: '2 val.',
						description: 'Praktinis resursų konfigūravimas ir valdymas',
					},
				],
			},
			{
				id: 'slurm-l1-admin',
				title: 'Sistemos Administravimas',
				duration: '8 val.',
				lessons: [
					{
						id: 'slurm-l1-admin-1',
						title: 'Vartotojų ir grupių valdymas',
						type: 'lesson',
						duration: '2 val.',
						description: 'Vartotojų prieigos kontrolė',
					},
					{
						id: 'slurm-l1-admin-2',
						title: 'Bazinės saugumo nuostatos',
						type: 'lesson',
						duration: '2 val.',
						description: 'Saugumas ir prieigos kontrolė',
					},
					{
						id: 'slurm-l1-admin-3',
						title: 'Logų analizė ir trikčių šalinimas',
						type: 'lesson',
						duration: '2 val.',
						description: 'Diagnostikos ir trikčių šalinimo metodai',
					},
					{
						id: 'slurm-l1-admin-lab',
						title: 'Laboratorinis darbas: Administravimas',
						type: 'exercise',
						duration: '2 val.',
						description: 'Praktinis administravimo užduočių atlikimas',
					},
				],
			},
			{
				id: 'slurm-l1-practical',
				title: 'Praktiniai Darbai',
				duration: '10 val.',
				lessons: [
					{
						id: 'slurm-l1-practical-1',
						title: 'Virtualios SLURM aplinkos sukūrimas',
						type: 'exercise',
						duration: '3 val.',
						description: 'Pilnas virtualios aplinkos sukūrimas',
					},
					{
						id: 'slurm-l1-practical-2',
						title: 'Paprastų darbo eigų automatizavimas',
						type: 'exercise',
						duration: '3 val.',
						description: 'Automatizuotų procesų kūrimas',
					},
					{
						id: 'slurm-l1-practical-3',
						title: 'Stebėjimo įrankių naudojimas',
						type: 'exercise',
						duration: '2 val.',
						description: 'Sistemos stebėjimo įrankių konfigūravimas',
					},
					{
						id: 'slurm-l1-practical-final',
						title: 'Baigiamasis projektas',
						type: 'exercise',
						duration: '2 val.',
						description: '1 lygio žinių patikrinimas',
					},
				],
			},
		],
	},

	// Level 2 - Intermediate (Pažengęs)
	level2: {
		id: 'slurm-level-2',
		title: 'SLURM Darbo Krūvio Valdymas - 2 Lygis (Pažengęs)',
		slug: 'slurm-paženges',
		description:
			'Pažangus SLURM darbo krūvio valdymo kursas patyrusiems specialistams',
		duration: '60 akademinių valandų',
		targetAudience: 'Patyrę sistemos administratoriai, DevOps inžinieriai',
		sections: [
			{
				id: 'slurm-l2-config',
				title: 'Pažangus Konfigūravimas',
				duration: '12 val.',
				lessons: [
					{
						id: 'slurm-l2-config-1',
						title: 'Daugelio klasterių valdymas',
						type: 'lesson',
						duration: '3 val.',
						description: 'Multi-cluster valdymo strategijos',
					},
					{
						id: 'slurm-l2-config-2',
						title: 'Debesų integracija (AWS, Azure, GCP)',
						type: 'lesson',
						duration: '4 val.',
						description: 'Hibridinis debesų ir fizinio klasterio valdymas',
					},
					{
						id: 'slurm-l2-config-3',
						title: 'Konteinerių palaikymas',
						type: 'lesson',
						duration: '3 val.',
						description: 'Docker ir Kubernetes integracija',
					},
					{
						id: 'slurm-l2-config-lab',
						title: 'Laboratorinis darbas: Hibridinis klasteris',
						type: 'exercise',
						duration: '2 val.',
						description: 'Hibridinio klasterio sukūrimas ir valdymas',
					},
				],
			},
			{
				id: 'slurm-l2-performance',
				title: 'Našumo Optimizavimas',
				duration: '12 val.',
				lessons: [
					{
						id: 'slurm-l2-performance-1',
						title: 'Darbo prioritetų valdymas',
						type: 'lesson',
						duration: '3 val.',
						description: 'Pažangūs prioritetų valdymo metodai',
					},
					{
						id: 'slurm-l2-performance-2',
						title: 'Backfill algoritmų konfigūravimas',
						type: 'lesson',
						duration: '3 val.',
						description: 'Optimizuotos planimo algoritmai',
					},
					{
						id: 'slurm-l2-performance-3',
						title: 'Energijos taupymo režimai',
						type: 'lesson',
						duration: '3 val.',
						description: 'Energijos efektyvumo optimizavimas',
					},
					{
						id: 'slurm-l2-performance-lab',
						title: 'Laboratorinis darbas: Našumo tyrimai',
						type: 'exercise',
						duration: '3 val.',
						description: 'Našumo tyrimas ir optimizavimas',
					},
				],
			},
			{
				id: 'slurm-l2-security',
				title: 'Saugumo Valdymas',
				duration: '10 val.',
				lessons: [
					{
						id: 'slurm-l2-security-1',
						title: 'Autentifikacijos papildiniukai',
						type: 'lesson',
						duration: '3 val.',
						description: 'Pažangūs autentifikacijos metodai',
					},
					{
						id: 'slurm-l2-security-2',
						title: 'Prieigos kontrolės sistemos',
						type: 'lesson',
						duration: '3 val.',
						description: 'RBAC ir ABAC sistemų implementacija',
					},
					{
						id: 'slurm-l2-security-3',
						title: 'Audito ir atitikties užtikrinimas',
						type: 'lesson',
						duration: '2 val.',
						description: 'Saugos audito ir atitikties užtikrinimas',
					},
					{
						id: 'slurm-l2-security-lab',
						title: 'Laboratorinis darbas: Saugumo konfigūravimas',
						type: 'exercise',
						duration: '2 val.',
						description: 'Saugumo sistemų implementacija',
					},
				],
			},
			{
				id: 'slurm-l2-automation',
				title: 'Automatizavimas ir Skriptai',
				duration: '12 val.',
				lessons: [
					{
						id: 'slurm-l2-automation-1',
						title: 'Python/Bash skriptų kūrimas SLURM API',
						type: 'lesson',
						duration: '4 val.',
						description: 'Programinio valdymo sprendimai',
					},
					{
						id: 'slurm-l2-automation-2',
						title: 'Prolog/Epilog skriptų valdymas',
						type: 'lesson',
						duration: '3 val.',
						description: 'Darbo ciklo automatizavimas',
					},
					{
						id: 'slurm-l2-automation-3',
						title: 'Darbo eigų automatizavimas',
						type: 'lesson',
						duration: '3 val.',
						description: 'Workflow automatizavimo strategijos',
					},
					{
						id: 'slurm-l2-automation-lab',
						title: 'Laboratorinis darbas: Automatizavimas',
						type: 'exercise',
						duration: '2 val.',
						description: 'Automatizuotų sistemų kūrimas',
					},
				],
			},
			{
				id: 'slurm-l2-integrations',
				title: 'Integracijos',
				duration: '8 val.',
				lessons: [
					{
						id: 'slurm-l2-integrations-1',
						title: 'Grafikos procesoriaus (GPU) valdymas',
						type: 'lesson',
						duration: '3 val.',
						description: 'GPU resursų valdymas ir optimizavimas',
					},
					{
						id: 'slurm-l2-integrations-2',
						title: 'Tinklo failų sistemų optimizavimas',
						type: 'lesson',
						duration: '2 val.',
						description: 'NFS, Lustre, BeeGFS integracijos',
					},
					{
						id: 'slurm-l2-integrations-3',
						title: 'Duomenų bazių integracijos',
						type: 'lesson',
						duration: '2 val.',
						description: 'Apskaitos ir monitoringo DB integracijos',
					},
					{
						id: 'slurm-l2-integrations-lab',
						title: 'Laboratorinis darbas: Integracijos',
						type: 'exercise',
						duration: '1 val.',
						description: 'Trečiųjų šalių sistemų integracija',
					},
				],
			},
			{
				id: 'slurm-l2-practical',
				title: 'Praktiniai Projektai',
				duration: '6 val.',
				lessons: [
					{
						id: 'slurm-l2-practical-1',
						title: 'Realių scenarijų sprendimas',
						type: 'exercise',
						duration: '3 val.',
						description: 'Fortune 500 kompanijų scenarijų sprendimas',
					},
					{
						id: 'slurm-l2-practical-2',
						title: 'Našumo tyrimų atlikimas',
						type: 'exercise',
						duration: '3 val.',
						description: 'Detalus našumo tyrimas ir optimizavimas',
					},
				],
			},
		],
	},

	// Level 3 - Advanced (Ekspertas)
	level3: {
		id: 'slurm-level-3',
		title: 'SLURM Darbo Krūvio Valdymas - 3 Lygis (Ekspertas)',
		slug: 'slurm-ekspertas',
		description: 'Ekspertų lygio SLURM darbo krūvio valdymo kursas',
		duration: '80 akademinių valandų',
		targetAudience: 'Vyresni DevOps/SysAdmin specialistai, HPC inžinieriai',
		sections: [
			{
				id: 'slurm-l3-enterprise',
				title: 'Korporatyvinio Lygio Architektūra',
				duration: '16 val.',
				lessons: [
					{
						id: 'slurm-l3-enterprise-1',
						title: 'Didelio masto klasterių projektavimas',
						type: 'lesson',
						duration: '4 val.',
						description: 'Architektūros sprendimai dideliems klasteriams',
					},
					{
						id: 'slurm-l3-enterprise-2',
						title: 'Aukšto prieinamumo sprendimai',
						type: 'lesson',
						duration: '4 val.',
						description: 'HA architektūros ir failover strategijos',
					},
					{
						id: 'slurm-l3-enterprise-3',
						title: 'Katastrofų atkūrimo planai',
						type: 'lesson',
						duration: '4 val.',
						description: 'DR strategijos ir implementacija',
					},
					{
						id: 'slurm-l3-enterprise-lab',
						title: 'Laboratorinis darbas: Enterprise architektūra',
						type: 'exercise',
						duration: '4 val.',
						description: 'Korporatyvinio lygio architektūros projektavimas',
					},
				],
			},
			{
				id: 'slurm-l3-advanced',
				title: 'Pažangios Funkcijos',
				duration: '16 val.',
				lessons: [
					{
						id: 'slurm-l3-advanced-1',
						title: 'Heterogeniškų užduočių valdymas',
						type: 'lesson',
						duration: '4 val.',
						description: 'Sudėtingų darbo krūvių valdymas',
					},
					{
						id: 'slurm-l3-advanced-2',
						title: 'Specialių resursų (GRES) konfigūravimas',
						type: 'lesson',
						duration: '4 val.',
						description: 'Specializuotų resursų valdymas',
					},
					{
						id: 'slurm-l3-advanced-3',
						title: 'Darbo masyvų optimizavimas',
						type: 'lesson',
						duration: '4 val.',
						description: 'Job array optimizavimo strategijos',
					},
					{
						id: 'slurm-l3-advanced-lab',
						title: 'Laboratorinis darbas: Pažangios funkcijos',
						type: 'exercise',
						duration: '4 val.',
						description: 'Pažangių funkcijų implementacija',
					},
				],
			},
			{
				id: 'slurm-l3-plugins',
				title: 'Plėtinių Kūrimas',
				duration: '14 val.',
				lessons: [
					{
						id: 'slurm-l3-plugins-1',
						title: 'SLURM papildinių programavimas',
						type: 'lesson',
						duration: '5 val.',
						description: 'C/C++ papildinių kūrimas',
					},
					{
						id: 'slurm-l3-plugins-2',
						title: 'API ir duomenų bazės integracijos',
						type: 'lesson',
						duration: '4 val.',
						description: 'Išorinių sistemų integracija',
					},
					{
						id: 'slurm-l3-plugins-3',
						title: 'Monitoringo sprendimų kūrimas',
						type: 'lesson',
						duration: '3 val.',
						description: 'Specializuotų monitoringo įrankių kūrimas',
					},
					{
						id: 'slurm-l3-plugins-lab',
						title: 'Laboratorinis darbas: Plėtinių kūrimas',
						type: 'exercise',
						duration: '2 val.',
						description: 'Papildinio kūrimas ir integravimas',
					},
				],
			},
			{
				id: 'slurm-l3-business',
				title: 'Verslo Sprendimai',
				duration: '12 val.',
				lessons: [
					{
						id: 'slurm-l3-business-1',
						title: 'Kainų modeliai ir apskaita',
						type: 'lesson',
						duration: '3 val.',
						description: 'Chargeback ir showback sistemų kūrimas',
					},
					{
						id: 'slurm-l3-business-2',
						title: 'SLA valdymas',
						type: 'lesson',
						duration: '3 val.',
						description: 'Service Level Agreement valdymas',
					},
					{
						id: 'slurm-l3-business-3',
						title: 'Ataskaitų sistemos',
						type: 'lesson',
						duration: '3 val.',
						description: 'Vadybos ataskaitų sistemos',
					},
					{
						id: 'slurm-l3-business-lab',
						title: 'Laboratorinis darbas: Verslo sprendimai',
						type: 'exercise',
						duration: '3 val.',
						description: 'Verslo orientuotų sprendimų implementacija',
					},
				],
			},
			{
				id: 'slurm-l3-devops',
				title: 'DevOps Metodikos',
				duration: '10 val.',
				lessons: [
					{
						id: 'slurm-l3-devops-1',
						title: 'Infrastructure as Code (IaC)',
						type: 'lesson',
						duration: '3 val.',
						description: 'Terraform, Ansible SLURM valdymui',
					},
					{
						id: 'slurm-l3-devops-2',
						title: 'CI/CD integracijos',
						type: 'lesson',
						duration: '3 val.',
						description: 'Jenkins, GitLab CI integracija',
					},
					{
						id: 'slurm-l3-devops-3',
						title: 'Konteinerių orkestracija',
						type: 'lesson',
						duration: '2 val.',
						description: 'Kubernetes ir SLURM sąveika',
					},
					{
						id: 'slurm-l3-devops-lab',
						title: 'Laboratorinis darbas: DevOps metodikos',
						type: 'exercise',
						duration: '2 val.',
						description: 'DevOps procesų implementacija',
					},
				],
			},
			{
				id: 'slurm-l3-management',
				title: 'Vadybos Įgūdžiai',
				duration: '8 val.',
				lessons: [
					{
						id: 'slurm-l3-management-1',
						title: 'Projektų valdymas',
						type: 'lesson',
						duration: '3 val.',
						description: 'HPC projektų valdymo metodikos',
					},
					{
						id: 'slurm-l3-management-2',
						title: 'Komandos vadovavimas',
						type: 'lesson',
						duration: '2 val.',
						description: 'Technikos komandų vadovavimas',
					},
					{
						id: 'slurm-l3-management-3',
						title: 'Technologijų strategijos',
						type: 'lesson',
						duration: '2 val.',
						description: 'Technologijų strateginio planavimo metodai',
					},
					{
						id: 'slurm-l3-management-lab',
						title: 'Laboratorinis darbas: Vadybos įgūdžiai',
						type: 'exercise',
						duration: '1 val.',
						description: 'Vadybos scenarijų sprendimas',
					},
				],
			},
			{
				id: 'slurm-l3-final',
				title: 'Baigiamasis Projektas',
				duration: '4 val.',
				lessons: [
					{
						id: 'slurm-l3-final-project',
						title: 'Realaus klasterio projektavimas',
						type: 'exercise',
						duration: '3 val.',
						description: 'Pilnas klasterio projektavimas ir implementacija',
					},
					{
						id: 'slurm-l3-final-defense',
						title: 'Gynimas ir vertinimas',
						type: 'exercise',
						duration: '1 val.',
						description: 'Projekto gynimas ir ekspertų vertinimas',
					},
				],
			},
		],
	},
}

export type SlurmCourseLevel = keyof typeof SlurmCourseStructure
export type SlurmCourseSection =
	(typeof SlurmCourseStructure)[SlurmCourseLevel]['sections'][number]
export type SlurmCourseLesson = SlurmCourseSection['lessons'][number]
