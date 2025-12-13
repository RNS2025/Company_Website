import smashLogo from '../assets/logos/smash.png';

export interface Project {
    id: string;
    slug: string;
    title: string;
    tagline: string;
    description: string;
    challenge: string;
    solution: string;
    results: string[];
    tags: string[];
    link: string;
    thumbnail: string;
    images: string[];
    features: string[];
}

export const projects: Project[] = [
    {
        id: 'smash-klub-app',
        slug: 'smash-klub-app',
        title: 'SMASH Padelcenter - Klub-app',
        tagline: 'Digitalt fællesskab med en moderne PWA',
        description: 'En omfattende medlemsplatform til SMASH Padelcenter, bygget som en Progressive Web App med fuld integration til betalingssystemer.',
        challenge: 'SMASH Padelcenter havde brug for en løsning til at håndtere medlemmer, banebookinger og betalinger på ét sted. Løsningen skulle være nem at bruge både for medlemmer og administratorer, samtidig med at den skulle fungere problemfrit på alle enheder.',
        solution: 'Vi udviklede en moderne PWA med MERN stack (MongoDB, Express, React, Node.js), der giver medlemmer mulighed for at booke baner, administrere deres profil og betale via integrerede betalingsløsninger som Stripe og Flatpay. Løsningen inkluderer også et kraftfuldt admin-dashboard til centrets ledelse.',
        results: [
            'Effektiviseret medlemshåndtering og reduceret administrativt arbejde',
            'Seamless booking-oplevelse på alle enheder',
            'Sikker integration med flere betalingsudbydere',
            'Real-time opdateringer af tilgængelighed'
        ],
        tags: ['PWA', 'MongoDB', 'React', 'Node.js', 'Stripe', 'Flatpay', 'Quickpay'],
        link: 'https://www.smash.rns-apps.dk',
        thumbnail: smashLogo.src,
        images: [
            '/logo.png',
            '/logo.png',
            '/logo.png'
        ],
        features: [
            'Medlems-dashboard med personlig profil',
            'Banebooking-system med real-time tilgængelighed',
            'Integrerede betalingsløsninger (Stripe, Flatpay, Quickpay)',
            'Admin-panel til centerhåndtering',
            'Push-notifikationer for booking-opdateringer',
            'Responsive design optimeret til mobil og desktop'
        ]
    },
    {
        id: 'smash-betalingssystem',
        slug: 'smash-betalingssystem',
        title: 'SMASH Padelcenter - Betalingssystem',
        tagline: 'Self-service betalingsløsning til iPad',
        description: 'En brugervenlig iPad-baseret betalingsterminal, der gør det nemt for medlemmer at betale for faciliteter selv.',
        challenge: 'SMASH havde brug for en simpel og sikker måde at håndtere betalinger for daglige faciliteter uden at kræve konstant personale. Løsningen skulle være intuitiv nok til, at alle kunne bruge den uden vejledning.',
        solution: 'Vi skabte en dedikeret iPad-applikation med en strømlinet betalingsflow. Systemet er designet med fokus på enkelhed og sikkerhed, med integration til eksisterende betalingssystemer. Løsningen fungerer som en selvbetjeningskiosk, der reducerer behovet for manuelt personale.',
        results: [
            'Reduceret ventetid ved betalinger',
            'Færre manuelle fejl i betalingshåndtering',
            'Øget tilgængelighed med 24/7 self-service',
            'Bedre overblik over transaktioner for ledelsen'
        ],
        tags: ['React', 'Node.js', 'Quickpay', 'iPad', 'POS'],
        link: 'https://www.pos.rns-apps.dk',
        thumbnail: smashLogo.src,
        images: [
            '/logo.png',
            '/logo.png'
        ],
        features: [
            'Brugervenlig touch-interface optimeret til iPad',
            'Sikker betalingsintegration med Quickpay',
            'Real-time transaktionshistorik',
            'Simpel produktvælger',
            'Kvittering via email',
            'Admin-dashboard til rapportering'
        ]
    }
];
