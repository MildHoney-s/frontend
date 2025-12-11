import { extractAssetPaths } from '@/utils/extractAssetPaths'

export const houseSceneAssets = {
  bg_door_open: '/assets/Part2/House_1.png',
  bg_door_closed: '/assets/Part2/House_0.png',

  mild_hair: '/assets/Part2/Mild/Body/Hair.PNG',
  mild_body: '/assets/Part2/Mild/Body/Body_1.PNG',
  mild_arm_l: '/assets/Part2/Mild/Arms/Arm_1_L.PNG',
  mild_arm_r: '/assets/Part2/Mild/Arms/Arm_1_R.PNG',

  mild_face_normal: '/assets/Part2/Mild/Face/Face_01_หน้าปกติ.PNG',
  mild_face_surprise: '/assets/Part2/Mild/Face/Face_03_หน้าตกใจ.PNG',
  mild_face_happy: '/assets/Part2/Mild/Face/Face_02_หน้ายิ้ม.PNG',

  honey_body: '/assets/Part2/Honey/Body.PNG',
  honey_face: '/assets/Part2/Honey/Normal_Face.PNG',
}

export const schoolSceneAssets = {
  bg_school: '/assets/Part2/Hall_School.png',
  bg_arena: '/assets/Part2/arena.png',

  honey_body: '/assets/Part2/Honey/Body.PNG',
  honey_face_normal: '/assets/Part2/Honey/Normal_Face.PNG',
  honey_face_worry: '/assets/Part2/Honey/Worry_Face.PNG',
  honey_face_sweat: '/assets/Part2/Honey/Sweat_Face.PNG',
}

export const threeMonthsAssets = {
  bg_field: '/assets/Part2/field.png',
  mild: {
    hair: '/assets/Part2/Mild/Body/Hair.PNG',
    body: '/assets/Part2/Mild/Body/Body_1.PNG',
    arm_talk_l: '/assets/Part2/Mild/Arms/Arm_2_L.PNG',
    arm_talk_r: '/assets/Part2/Mild/Arms/Arm_2_R.PNG',
    arm_eat_l: '/assets/Part2/Mild/Arms/Arm_1_L.PNG',
    arm_milktea_r: '/assets/Part2/Mild/Arms/Arm_milktea_R.PNG',
    face_worry: '/assets/Part2/Mild/Face/Face_05_หน้าเศร้า.PNG',
    face_happy: '/assets/Part2/Mild/Face/Face_02_หน้ายิ้ม.PNG',
  },
  honey: {
    body: '/assets/Part2/Honey/Body.PNG',
    face_normal: '/assets/Part2/Honey/Normal_Face.PNG',
  },
}

export const trainingGroundAssets = {
  bg_arena: '/assets/Part2/arena.png',
  group_students: '/assets/Part2/group_students.png',
  mild: {
    hair: '/assets/Part2/Mild/Body/Hair.PNG',
    body: '/assets/Part2/Mild/Body/Body_1.PNG',
    arm_l: '/assets/Part2/Mild/Arms/Arm_4_L.PNG',
    arm_r: '/assets/Part2/Mild/Arms/Arm_4_R.PNG',
    face_serious: '/assets/Part2/Mild/Face/Face_08_หน้าจริงจัง.PNG',
    face_shock: '/assets/Part2/Mild/Face/Face_03_หน้าตกใจ.PNG',
    face_sad: '/assets/Part2/Mild/Face/Face_05_หน้าเศร้า.PNG',
  },
  honey: {
    body: '/assets/Part2/Honey/Body.PNG',
    face_scare: '/assets/Part2/Honey/Scare_Face.PNG',
    face_worry: '/assets/Part2/Honey/Worry_Face.PNG',
    face_normal: '/assets/Part2/Honey/Normal_Face.PNG',
  },
}

export const trainingAssets = {
  mental: [
    '/assets/Part2/Training/Scene 13-01.PNG',
    '/assets/Part2/Training/Scene 13-02.PNG',
    '/assets/Part2/Training/Scene 13-03.PNG',
  ],
  theory: {
    base: '/assets/Part2/Training/Scene 14-01.PNG',
    overlay: '/assets/Part2/Training/Scene 14-02.PNG',
  },
  combat: '/assets/Part2/Training/Scene 15-01.PNG', // Scene 15 (Optional insert)
  physical: {
    base: '/assets/Part2/Training/Scene 16-01.PNG',
    step1: '/assets/Part2/Training/Scene 16-02.PNG',
    step2: '/assets/Part2/Training/Scene 16-03.PNG',
  },
}

const chapterTwoRawAssets = {
  houseSceneAssets,
  schoolSceneAssets,
  threeMonthsAssets,
  trainingGroundAssets,
  trainingAssets,
}

const chapterTwoAssets = extractAssetPaths(chapterTwoRawAssets)

export default chapterTwoAssets
