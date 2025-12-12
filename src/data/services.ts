export interface Service {
    id: string;
    title: string;
    description: string;
    icon: string;
    features: string[];
}

export const services: Service[] = [
    {
        id: 'web-solutions',
        title: 'Webløsninger',
        description: 'Moderne, responsive webapplikationer bygget med de nyeste teknologier. Fra simple landingssider til komplekse platforme.',
        icon: 'Code2',
        features: [
            'Progressive Web Apps (PWA)',
            'React & Next.js applikationer',
            'E-commerce løsninger',
            'CMS integration',
            'API udvikling'
        ]
    },
    {
        id: 'mobile-apps',
        title: 'Mobile Apps',
        description: 'Native og cross-platform mobilapplikationer der leverer en fantastisk brugeroplevelse på alle enheder.',
        icon: 'Smartphone',
        features: [
            'iOS & Android apps',
            'React Native udvikling',
            'Push notifications',
            'Offline funktionalitet',
            'App Store publicering'
        ]
    },
    {
        id: 'custom-software',
        title: 'Skræddersyet Software',
        description: 'Unikke softwareløsninger designet specielt til jeres behov og arbejdsprocesser.',
        icon: 'Wrench',
        features: [
            'Systemintegration',
            'Database design',
            'Admin dashboards',
            'Automatisering',
            'API integrations'
        ]
    }
];
