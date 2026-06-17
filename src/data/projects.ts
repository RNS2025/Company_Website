import smashLogo from '../assets/logos/smash.png';
import scorecardLogo from '../assets/logos/scorecard.png';
import type { ImageMetadata } from 'astro';

/** Public portfolio highlights — beskrivelser uden links eller fortrolige kundedetaljer. */
export interface ProjectHighlight {
    title: string;
    summary: string;
    description: string;
    tags: string[];
    thumbnail: ImageMetadata;
}

export const projects: ProjectHighlight[] = [
    {
        title: 'Klub-app til padelcenter',
        summary: 'Medlemsplatform som progressiv web-app',
        description:
            'En medlemsorienteret app, hvor brugere kan håndtere profil, booking og klubliv fra mobil og desktop. Løsningen er installerbar som PWA og bygget til stabil drift i en travl hverdag.',
        tags: ['PWA', 'Medlemsportal', 'Booking'],
        thumbnail: smashLogo,
    },
    {
        title: 'Betalingsløsning til facilitet',
        summary: 'Self-service på iPad',
        description:
            'En enkel betalingsoplevelse til brug på stedet — designet så gæster kan gennemføre køb uden manuel kassebetjening. Fokus på tydelig brugerflade, hurtig gennemførsel og pålidelig drift.',
        tags: ['iPad', 'Self-service', 'POS'],
        thumbnail: smashLogo,
    },
    {
        title: 'Digital scorecard til golf',
        summary: 'Webløsning til nichegolfbaner',
        description:
            'Et digitalt scorecard, der erstatter papir og gør det nemt for spillere at registrere og følge runder. Bygget til enkel brug på banen og med overblik over resultater over tid.',
        tags: ['Webapp', 'Sport', 'Scorecard'],
        thumbnail: scorecardLogo,
    },
];
