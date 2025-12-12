export interface ProcessStep {
    id: string;
    title: string;
    description: string;
    icon: string;
    details: string[];
}

export const processSteps: ProcessStep[] = [
    {
        id: 'discovery',
        title: 'Discovery',
        description: 'Vi starter med at forstå jeres behov, mål og udfordringer.',
        icon: 'Search',
        details: [
            'Indledende møde og behovsanalyse',
            'Definering af projektets omfang',
            'Identifikation af tekniske krav',
            'Tidsplan og budget aftales'
        ]
    },
    {
        id: 'design',
        title: 'Design',
        description: 'Vi designer løsningen med fokus på brugeroplevelse og funktionalitet.',
        icon: 'Palette',
        details: [
            'Wireframes og prototyper',
            'UI/UX design',
            'Teknisk arkitektur',
            'Godkendelse og feedback'
        ]
    },
    {
        id: 'development',
        title: 'Development',
        description: 'Vi bygger løsningen med ren kode og moderne teknologier.',
        icon: 'Code',
        details: [
            'Agil udviklingsproces',
            'Regelmæssige status-opdateringer',
            'Test-driven development',
            'Løbende kvalitetssikring'
        ]
    },
    {
        id: 'delivery',
        title: 'Delivery',
        description: 'Vi leverer den færdige løsning og sikrer en smooth overgang.',
        icon: 'Rocket',
        details: [
            'Deployment til produktion',
            'Brugertræning og dokumentation',
            'Performance optimering',
            'Support og vedligeholdelse'
        ]
    }
];
