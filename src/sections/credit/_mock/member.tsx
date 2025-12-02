export interface Member {
  id: string
  name: string
  roles: string[]
  avatar?: string
  bio?: string
  scores: Record<string, number>
  twitterUrl?: string
  gallery?: string[]
}

export const TEAM: Member[] = [
  {
    id: '1',
    name: 'KornDva',
    roles: ['Producer', 'Frontend', 'Artist'],
    avatar: '/assets/team/KornDva.webp',
    bio: 'Concept, frontend & coordination',
    scores: { Producer: 95, Frontend: 88 },
    twitterUrl: 'https://x.com/korndva',
    gallery: [
      '/assets/gallery/art_a.png',
      '/assets/gallery/art_b.png',
      '/assets/gallery/art_b.png',
      '/assets/gallery/art_b.png',
      '/assets/gallery/art_b.png',
      '/assets/gallery/art_b.png',
      '/assets/gallery/art_b.png',
      '/assets/gallery/art_b.png',
      '/assets/gallery/art_b.png',
      '/assets/gallery/art_b.png',
      '/assets/gallery/art_b.png',
      '/assets/gallery/art_b.png',
      '/assets/gallery/art_b.png',
      '/assets/gallery/art_b.png',
      '/assets/gallery/art_b.png',
      '/assets/gallery/art_b.png',
      '/assets/gallery/art_b.png',
      '/assets/gallery/art_b.png',
      '/assets/gallery/art_b.png',
      '/assets/gallery/art_b.png',
    ],
  },
  {
    id: '2',
    name: 'Mild-R',
    roles: ['Art Director', 'Artist'],
    avatar: '/assets/team/mild.jpg',
    bio: 'Art & character design',
    scores: { 'Art Director': 92 },
  },
  {
    id: '3',
    name: 'Hana',
    roles: ['Music & Sound', 'Artist'],
    avatar: '/assets/team/hana.jpg',
    bio: 'Original soundtrack & SFX',
    scores: { 'Music & Sound': 85 },
  },
  {
    id: '4',
    name: 'Taku',
    roles: ['Animator'],
    avatar: '/assets/team/taku.jpg',
    bio: 'Motion & animation',
    scores: { Animator: 89 },
  },
  {
    id: '5',
    name: 'Nari',
    roles: ['Copywriter'],
    avatar: '/assets/team/nari.jpg',
    bio: 'Text, translations & proofing',
    scores: { Copywriter: 78 },
  },
  {
    id: '6',
    name: 'Alice',
    roles: ['Producer', 'PM'],
    avatar: '/assets/team/alice.jpg',
    bio: 'Project support & schedule',
    scores: { Producer: 82, PM: 91 },
  },
  {
    id: '7',
    name: 'Bob',
    roles: ['QA / Ops'],
    avatar: '/assets/team/bob.jpg',
    bio: 'QA, deploy & monitoring',
    scores: { 'QA / Ops': 90 },
  },
  {
    id: '8',
    name: 'Carol',
    roles: ['QA / Ops', 'Community'],
    avatar: '/assets/team/carol.jpg',
    bio: 'QA & community manager',
    scores: { 'QA / Ops': 83, Community: 94 },
  },
  {
    id: '9',
    name: 'Dave',
    roles: ['Support'],
    avatar: '/assets/team/dave.jpg',
    bio: 'User support & docs',
    scores: { Support: 73 },
  },
  {
    id: '10',
    name: 'Eve',
    roles: ['Frontend', 'Artist'],
    avatar: '/assets/team/eve.jpg',
    bio: 'UI & illustrations',
    scores: { Frontend: 86, Artist: 91 },
  },
]
