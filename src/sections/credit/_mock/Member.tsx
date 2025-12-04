/* eslint-disable react-refresh/only-export-components */
const ROLES = ['Copywriter', 'Artist', 'Developer', 'Project Manager'] as const

type Role = (typeof ROLES)[number]

interface Member {
  id: string
  name: string
  roles: Role[]
  avatar?: string
  bio?: string
  roleBios?: Partial<Record<Role, string>>
  scores: Partial<Record<Role, number>>
  twitterUrl?: string
  gallery?: string[]
}

const TEAM: Member[] = [
  {
    id: '1',
    name: 'KornDva',
    roles: ['Project Manager', 'Developer'],
    avatar: '/assets/team/KornDva.webp',
    bio: 'ดูแลภาพรวมโปรเจกต์และพัฒนา Frontend ของโปรเจกต์',
    roleBios: {
      'Project Manager': 'ดูแลภาพรวมโปรเจกต์และประสานงานทีม',
      Developer: 'พัฒนา Frontend และดูแล technical implementation',
    },
    scores: { 'Project Manager': 95, Developer: 88 },
    twitterUrl: 'https://x.com/korndva',
  },
  {
    id: '2',
    name: 'OKITAO',
    roles: ['Artist'],
    avatar: '/assets/team/OKITAO.png',
    bio: 'สร้างสรรค์งานภาพ Full CG Ending ของโปรเจกต์',
    scores: { Artist: 0 },
    twitterUrl: 'https://x.com/OK1TA0',
    gallery: [
      '/assets/gallery/OKITAO_art_a.png',
      '/assets/gallery/OKITAO_art_b.png',
    ],
  },
  {
    id: '3',
    name: 'Mr.GameFamer',
    roles: ['Copywriter'],
    avatar: '/assets/team/Mr-GameFamer.png',
    bio: 'เขียนบทและกำกับโทนเนื้อเรื่องของโปรเจกต์',
    scores: { Copywriter: 0 },
    twitterUrl: 'https://x.com/MrGameFamer32',
  },
  {
    id: '4',
    name: 'gGameyy',
    roles: ['Artist'],
    avatar: '/assets/team/gGameyy.png',
    bio: 'ออกแบบและวาดงานภาพประกอบของโปรเจกต์',
    scores: { Artist: 1 },
    twitterUrl: 'https://x.com/gGameyy',
    gallery: ['/assets/gallery/OKITAO_art_a.png'],
  },
  {
    id: '5',
    name: 'pMorhNeung',
    roles: ['Copywriter', 'Artist'],
    avatar: '/assets/team/pMorhNeung.png',
    bio: 'ร่วมเขียนเรื่องและรับผิดชอบงานภาพประกอบ',
    scores: { Copywriter: 0, Artist: 1 },
    twitterUrl: 'https://x.com/DoctorGamer_1',
    gallery: ['/assets/gallery/OKITAO_art_a.png'],
  },
  {
    id: '6',
    name: 'วิสกี้',
    roles: ['Copywriter'],
    avatar: '/assets/team/Whiskey.png',
    bio: 'เขียนบทและกำกับโทนเนื้อเรื่องของโปรเจกต์',
    scores: { Copywriter: 0 },
    twitterUrl: 'https://x.com/whiskeyz04',
  },
  {
    id: '7',
    name: 'Tofuzama',
    roles: ['Copywriter'],
    avatar: '/assets/team/Tofuzama.png',
    bio: 'เขียนบทและกำกับโทนเนื้อเรื่องของโปรเจกต์',
    scores: { Copywriter: 0 },
    twitterUrl: 'https://x.com/kungkichii17',
  },
  {
    id: '8',
    name: 'HaRuki KC',
    roles: ['Developer'],
    avatar: '/assets/team/HaRuki-KC.png',
    bio: 'พัฒนา Frontend ของโปรเจกต์',
    scores: { Developer: 94 },
    twitterUrl: 'https://x.com/Rinne66601642',
  },
]

export { ROLES, type Role, type Member, TEAM }
