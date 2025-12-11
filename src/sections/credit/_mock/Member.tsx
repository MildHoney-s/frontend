/* eslint-disable react-refresh/only-export-components */
const ROLES = [
  'Creative',
  'Main Writer',
  'Proofreading',
  'Copywriter',
  'Artist',
  'Developer',
  'Project Manager',
] as const

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
    roles: ['Project Manager', 'Developer', 'Copywriter'],
    avatar: '/assets/team/KornDva.webp',
    roleBios: {
      'Project Manager': 'ดูแลภาพรวมโปรเจกต์และประสานงานทีม',
      Developer: 'พัฒนา Frontend และดูแล technical implementation',
      Copywriter:
        'เรียบเรียง ปรับสำนวน และจัดรูปแบบบทความให้เหมาะสมกับการนำเสนอ',
    },
    scores: { 'Project Manager': 95, Developer: 88 },
    twitterUrl: 'https://x.com/korndva',
  },
  {
    id: '2',
    name: 'OKITAO',
    roles: ['Artist'],
    avatar: '/assets/team/OKITAO.png',
    bio: 'สร้างภาพ Full CG ฉากจบ',
    scores: { Artist: 6.5 },
    twitterUrl: 'https://x.com/OK1TA0',
    gallery: [
      '/assets/OKITAO/OKITAO_art_a.png',
      '/assets/OKITAO/OKITAO_art_b.png',
    ],
  },
  {
    id: '3',
    name: 'Mr.GameFamer',
    roles: ['Creative'],
    avatar: '/assets/team/Mr-GameFamer.png',
    bio: 'คิดไอเดีย คอนเซ็ปต์ และทิศทางความสร้างสรรค์ของเนื้อเรื่อง',
    scores: { Creative: 71.43 },
    twitterUrl: 'https://x.com/MrGameFamer32',
  },
  {
    id: '4',
    name: 'gGameyy',
    roles: ['Artist'],
    avatar: '/assets/team/gGameyy.png',
    bio: 'ออกแบบฉากเมือง ห้องเรียน และตัวประกอบอื่นๆ',
    scores: { Artist: 16.1 },
    twitterUrl: 'https://x.com/gGameyy',
    gallery: [
      '/assets/gGameyy/Ami_behind.png',
      '/assets/gGameyy/Ashy_behind.png',
      '/assets/gGameyy/Classroom_1.png',
      '/assets/gGameyy/Classroom_2.png',
      '/assets/gGameyy/Elevene_front.png',
      '/assets/gGameyy/Elze_front.png',
      '/assets/gGameyy/Mewten_front.png',
      '/assets/gGameyy/MildR_behind.png',
      '/assets/gGameyy/MildR_front.png',
      '/assets/gGameyy/Tsuru_behind.png',
      '/assets/gGameyy/Tsuru_front.png',
      '/assets/gGameyy/Xoneko_Sensei.png',
    ],
  },
  {
    id: '5',
    name: 'pMorhNeung',
    roles: ['Main Writer', 'Artist'],
    avatar: '/assets/team/pMorhNeung.png',
    roleBios: {
      'Main Writer': 'เขียนบทหลัก วางโครงเรื่อง และพัฒนาเนื้อเรื่องของโปรเจกต์',
      Artist: 'วาดภาพซีนต่อสู้ทั้งหมด',
    },
    scores: { 'Main Writer': 100, Artist: 12.9 },
    twitterUrl: 'https://x.com/DoctorGamer_1',
    gallery: [
      '/assets/pMorhNeung/Versus_1_full_version.png',
      '/assets/pMorhNeung/Fight_1_full_version.png',
      '/assets/pMorhNeung/Versus_2_full_version.png',
      '/assets/pMorhNeung/Fight_2_full_version.png',
      '/assets/pMorhNeung/Versus_3_enemy.png',
      '/assets/pMorhNeung/Fight_3_full_version.png',
      '/assets/pMorhNeung/Versus_4_full_version.png',
      '/assets/pMorhNeung/Versus_4_mild.png',
      '/assets/pMorhNeung/Versus_4_enemy.png',
    ],
  },
  {
    id: '6',
    name: 'วิสกี้',
    roles: ['Creative'],
    avatar: '/assets/team/Whiskey.png',
    bio: 'คิดไอเดีย คอนเซ็ปต์ และทิศทางความสร้างสรรค์ของเนื้อเรื่อง',
    scores: { Creative: 71.43 },
    twitterUrl: 'https://x.com/whiskeyz04',
  },
  {
    id: '7',
    name: 'Tofuzama',
    roles: ['Main Writer'],
    avatar: '/assets/team/Tofuzama.png',
    bio: 'เขียนบทหลัก วางโครงเรื่อง และพัฒนาเนื้อเรื่องของโปรเจกต์',
    scores: { 'Main Writer': 85.72 },
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
  {
    id: '9',
    name: 'H',
    roles: ['Copywriter', 'Project Manager'],
    scores: { Copywriter: 100, 'Project Manager': 96 },
    twitterUrl: 'https://x.com/Kitsuyahanabi',
    roleBios: {
      Copywriter:
        'เรียบเรียง ปรับสำนวน และจัดรูปแบบบทความให้เหมาะสมกับการนำเสนอ',
      'Project Manager': 'ดูแลภาพรวมโปรเจกต์และประสานงานทีม',
    },
  },
  {
    id: '10',
    name: 'ZAYZHIK',
    roles: ['Main Writer', 'Artist', 'Developer'],
    avatar: '/assets/team/ZAYZHIK.png',
    bio: 'ดูแลภาพรวมโปรเจกต์และประสานงานทีม',
    roleBios: {
      'Main Writer': 'เขียนบทหลัก วางโครงเรื่อง และพัฒนาเนื้อเรื่องของโปรเจกต์',
      Artist: 'ดูแลงานภาพตัวละครหลักของเรื่องและซีนฝึก',
      Developer: 'พัฒนา Frontend ของโปรเจกต์',
    },
    scores: { 'Main Writer': 85.72, Artist: 32.3, Developer: 1 },
    twitterUrl: 'https://x.com/ZAYZHIK_KungV2',
    gallery: [
      '/assets/ZAYZHIK/Prologue_1.png',
      '/assets/ZAYZHIK/Prologue_2.png',
      '/assets/ZAYZHIK/Prologue_3.png',
      '/assets/ZAYZHIK/Honey_sleep.png',
      '/assets/ZAYZHIK/Mild_give_food.png',
      '/assets/ZAYZHIK/Training_1_1.png',
      '/assets/ZAYZHIK/Training_1_2.png',
      '/assets/ZAYZHIK/Training_1_3.png',
      '/assets/ZAYZHIK/Training_2_1.png',
      '/assets/ZAYZHIK/Training_2_2.png',
      '/assets/ZAYZHIK/Training_3.png',
      '/assets/ZAYZHIK/Training_4.png',
      '/assets/ZAYZHIK/Mild_1.png',
      '/assets/ZAYZHIK/Mild_2.png',
      '/assets/ZAYZHIK/Honey_1.png',
      '/assets/ZAYZHIK/Honey_2.png',
      '/assets/ZAYZHIK/Honey_3.png',
    ],
  },
  {
    id: '11',
    name: 'kochujang',
    roles: ['Proofreading', 'Project Manager'],
    avatar: '/assets/team/kochujang.png',
    bio: 'ดูแลภาพรวมโปรเจกต์และประสานงานทีม',
    roleBios: {
      Proofreading: 'ตรวจสอบคำผิด ไวยากรณ์ และความถูกต้องของเนื้อหา',
      'Project Manager': 'ดูแลภาพรวมโปรเจกต์และประสานงานทีม',
    },
    scores: { Proofreading: 100, 'Project Manager': 89 },
    twitterUrl: 'https://x.com/kochujang2703',
  },
  {
    id: '12',
    name: 'Kiwa',
    roles: ['Proofreading', 'Artist', 'Project Manager'],
    avatar: '/assets/team/Kiwa.png',
    roleBios: {
      Proofreading: 'ตรวจสอบคำผิด ไวยากรณ์ และความถูกต้องของเนื้อหา',
      Artist: 'ดูแลซีน close up และ Chibi ตัวประกอบ',
      'Project Manager': 'ดูแลภาพรวมโปรเจกต์และประสานงานทีม',
    },
    scores: { Proofreading: 100, Artist: 9.7, 'Project Manager': 89 },
    twitterUrl: 'https://x.com/KiwaPawari',
    gallery: [
      '/assets/kiwaawa/Mild_drink.png',
      '/assets/kiwaawa/Mild_take_honey.png',
      '/assets/kiwaawa/Student.png',
    ],
  },
  {
    id: '13',
    name: 'My_mint',
    roles: ['Creative'],
    avatar: '/assets/team/My-mint.jpg',
    bio: 'คิดไอเดีย คอนเซ็ปต์ และทิศทางความสร้างสรรค์ของเนื้อเรื่อง',
    scores: { Creative: 100 },
    twitterUrl: 'https://x.com/PeamaiT',
  },
  {
    id: '14',
    name: 'NUT-R',
    roles: ['Main Writer', 'Project Manager'],
    roleBios: {
      'Main Writer': 'เขียนบทหลัก วางโครงเรื่อง และพัฒนาเนื้อเรื่องของโปรเจกต์',
      'Project Manager': 'ดูแลภาพรวมโปรเจกต์และประสานงานทีม',
    },
    scores: { 'Main Writer': 100, 'Project Manager': 0 },
    twitterUrl: 'https://x.com/nut02888585',
  },
  {
    id: '15',
    name: 'Mimeaw03',
    roles: ['Creative'],
    bio: 'คิดไอเดีย คอนเซ็ปต์ และทิศทางความสร้างสรรค์ของเนื้อเรื่อง',
    scores: { Creative: 85.72 },
  },
  {
    id: '16',
    name: 'Methat',
    roles: ['Creative'],
    bio: 'คิดไอเดีย คอนเซ็ปต์ และทิศทางความสร้างสรรค์ของเนื้อเรื่อง',
    scores: { Creative: 57.15 },
  },
]

export { ROLES, type Role, type Member, TEAM }
