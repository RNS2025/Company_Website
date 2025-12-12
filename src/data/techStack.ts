export interface TechCategory {
    id: string;
    title: string;
    technologies: Technology[];
}

export interface Technology {
    name: string;
    icon?: string;
    description?: string;
}

export const techStack: TechCategory[] = [
    {
        id: 'frontend',
        title: 'Frontend',
        technologies: [
            { name: 'React', description: 'Modern UI bibliotek' },
            { name: 'Next.js', description: 'React framework' },
            { name: 'Astro', description: 'Static site generator' },
            { name: 'TypeScript', description: 'Type-safe JavaScript' },
            { name: 'Tailwind CSS', description: 'Utility-first CSS' }
        ]
    },
    {
        id: 'backend',
        title: 'Backend',
        technologies: [
            { name: 'Node.js', description: 'JavaScript runtime' },
            { name: 'Express', description: 'Web framework' },
            { name: 'MongoDB', description: 'NoSQL database' },
            { name: 'PostgreSQL', description: 'Relational database' },
            { name: 'REST APIs', description: 'API design' }
        ]
    },
    {
        id: 'mobile',
        title: 'Mobile',
        technologies: [
            { name: 'React Native', description: 'Cross-platform' },
            { name: 'PWA', description: 'Progressive Web Apps' },
            { name: 'iOS', description: 'Native iOS' },
            { name: 'Android', description: 'Native Android' }
        ]
    },
    {
        id: 'tools',
        title: 'Tools & DevOps',
        technologies: [
            { name: 'Git', description: 'Version control' },
            { name: 'Docker', description: 'Containerization' },
            { name: 'Vercel', description: 'Deployment platform' },
            { name: 'GitHub Actions', description: 'CI/CD' },
            { name: 'Figma', description: 'Design tool' }
        ]
    }
];
