import { extractAssetPaths } from '@/utils/extractAssetPaths'

export const openSceneColosseumAssets = {
  bgImg: '/assets/part3/BG/bg_colosseum.png',
  firework_blue: '/assets/part3/firework/firework_blue.png',
  firework_navy: '/assets/part3/firework/firework_navy.png',
  firework_green: '/assets/part3/firework/firework_green.png',
  firework_orange: '/assets/part3/firework/firework_orange.png',
  firework_purple: '/assets/part3/firework/firework_purple.png',
  firework_white: '/assets/part3/firework/firework_white.png',
  firework_pink: '/assets/part3/firework/firework_pink.png',
}

export const inColosseumAssets = {
  bgImg: '/assets/part3/BG/bg_colosseum_in.png',
  mildGiff: '/assets/Part2/Mild/Assets/giff.png',
  mildCatEar: '/assets/Part2/Mild/Assets/mimi.png',
  mildHair: '/assets/Part2/Mild/Body/Hair.PNG',
  mildBody: '/assets/Part2/Mild/Body/Body_1.PNG',
  mildArmL_1: '/assets/Part2/Mild/Arms/Arm_1_L.PNG',
  mildArmL_2: '/assets/Part2/Mild/Arms/Arm_2_L.PNG',
  mildArmR_2: '/assets/Part2/Mild/Arms/Arm_2_R.PNG',
  mildArmR_MilkTea: '/assets/Part2/Mild/Arms/Arm_milktea_R.PNG',
  mildSadFace: '/assets/Part2/Mild/Face/Face_05_หน้าเศร้า.PNG',
  mildSmileFace: '/assets/Part2/Mild/Face/Face_02_หน้ายิ้ม.PNG',
  honeyNormalFace: '/assets/Part2/Honey/Normal_Face.PNG',
  honeyBody: '/assets/Part2/Honey/Body.PNG',
}

export const inColosseumBehindAssets = {
  bgImg: '/assets/part3/BG/bg_colosseum_in.png',
  honeyFace_1: '/assets/Part2/Honey/frieren.PNG',
  honeyFace_2: '/assets/Part2/Honey/Scare_Face.PNG',
  honeyBody: '/assets/Part2/Honey/Body.PNG',
  mildGiff: '/assets/Part2/Mild/Assets/giff.png',
  mildHair: '/assets/Part2/Mild/Body/Hair.PNG',
  mildBody: '/assets/Part2/Mild/Body/Body_1.PNG',
  mildSadFace: '/assets/Part2/Mild/Face/Face_05_หน้าเศร้า.PNG',
  mildArmL: '/assets/Part2/Mild/Arms/Arm_2_L.PNG',
  mildArmR: '/assets/Part2/Mild/Arms/Arm_1_R.PNG',
}

export const battleComponentsOneAssets = {
  // Background
  bg: '/assets/part3/BG/bg_colosseum_day.png',

  // Dr.Gamer (Pose)
  drGameArmL: '/assets/part3/model/Battle/Dr_Gamer/Pose/Dr_Gamer_L_Arm.png',
  drGameArmR: '/assets/part3/model/Battle/Dr_Gamer/Pose/Dr_Gamer_R_Arm.png',
  drGameBody: '/assets/part3/model/Battle/Dr_Gamer/Pose/dr_damer_body_pure.png',
  drGameEyeOpen:
    '/assets/part3/model/Battle/Dr_Gamer/Pose/Dr_Gamer_head_op.png',
  drGameEyeClose:
    '/assets/part3/model/Battle/Dr_Gamer/Pose/Dr_Gamer_head_cl.png',

  // Mild (Pose1)
  mildArmR: '/assets/part3/model/Battle/Mild/Pose1/Mild_R_1_Arm.png',
  mildHair: '/assets/part3/model/Battle/Mild/Pose1/Mild_R_1_hair.png',
  mildEyeOpen: '/assets/part3/model/Battle/Mild/Pose1/Mild_R_1_Body_op.png',
  mildEyeClose: '/assets/part3/model/Battle/Mild/Pose1/Mild_R_1_Body_cl.png',

  // Dr.Gamer Magic
  drMagicRCircle: '/assets/part3/model/Battle/Dr_Gamer/Magic/R_circle.png',
  drMagicRBone: '/assets/part3/model/Battle/Dr_Gamer/Magic/R_bone.png',
  drMagicLCircle: '/assets/part3/model/Battle/Dr_Gamer/Magic/R_circle.png', // (original code ใช้ R_circle อีกครั้ง สำหรับ left circle)
  drMagicLBone: '/assets/part3/model/Battle/Dr_Gamer/Magic/L_bone.png',
  drMagicSkull: '/assets/part3/model/Battle/Dr_Gamer/Magic/Skull.png',

  // Mild Magic
  mildMagicFire: '/assets/part3/model/Battle/Mild/Magic1/Fire_Circle.png',
  mildMagicIce: '/assets/part3/model/Battle/Mild/Magic1/Ice_Circle.png',
  mildMagicSunMoon:
    '/assets/part3/model/Battle/Mild/Magic1/Sun&moon_Circle.png',
}

export const battleComponentsTwoAssets = {
  // Background
  bg: '/assets/part3/BG/bg_colosseum_day.png',

  // Zayzhik (Pose)
  zzArmL: '/assets/part3/model/Battle/Zayzhik/Pose/Zayzhik_arm_l.png',
  zzArmR: '/assets/part3/model/Battle/Zayzhik/Pose/Zayzhik_arm_r.png',
  zzBodyOp: '/assets/part3/model/Battle/Zayzhik/Pose/Zayzhik_body_op.png',
  zzBodyCl: '/assets/part3/model/Battle/Zayzhik/Pose/Zayzhik_body_cl.png',

  // Mild (Pose2)
  mildArmR: '/assets/part3/model/Battle/Mild/Pose2/Mild_R_2_arm_r.png',
  mildArmL: '/assets/part3/model/Battle/Mild/Pose2/Mild_R_2_arm_l.png',
  mildHairFL: '/assets/part3/model/Battle/Mild/Pose2/Mild_R_2_hair_f_l.png',
  mildHairBR: '/assets/part3/model/Battle/Mild/Pose2/Mild_R_2_hair_b_r.png',
  mildHairBL: '/assets/part3/model/Battle/Mild/Pose2/Mild_R_2_hair_b_l.png',
  mildBodyOp: '/assets/part3/model/Battle/Mild/Pose2/Mild_R_2_Body_op.png',
  mildBodyCl: '/assets/part3/model/Battle/Mild/Pose2/Mild_R_2_Body_cl.png',

  // Zayzhik Magic (front/back)
  zzMagicCircle: '/assets/part3/model/Battle/Zayzhik/Magic/magic_circle.png',
  zzMagic4: '/assets/part3/model/Battle/Zayzhik/Magic/magic4.png',
  zzMagic2: '/assets/part3/model/Battle/Zayzhik/Magic/magic2.png',
  zzMagic3: '/assets/part3/model/Battle/Zayzhik/Magic/magic3.png',
  zzMagic1: '/assets/part3/model/Battle/Zayzhik/Magic/magic1.png',
  zzShark1: '/assets/part3/model/Battle/Zayzhik/Magic/shark1.png',
  zzShark2: '/assets/part3/model/Battle/Zayzhik/Magic/shark2.png',

  // Mild Magic (front/back)
  mildMagicCircle: '/assets/part3/model/Battle/Mild/Magic2/magic_circle.png',
  mildMagic0: '/assets/part3/model/Battle/Mild/Magic2/magic0.png',
  mildMagic1: '/assets/part3/model/Battle/Mild/Magic2/magic1.png',
  mildMagic2: '/assets/part3/model/Battle/Mild/Magic2/magic2.png',
  mildMagic3: '/assets/part3/model/Battle/Mild/Magic2/magic3.png',
  mildPanda1: '/assets/part3/model/Battle/Mild/Magic2/panda2.png',
  mildPanda2: '/assets/part3/model/Battle/Mild/Magic2/panda.png',
}

export const battleComponentsThreeAssets = {
  // Background
  bg: '/assets/part3/BG/bg_colosseum_night.png',

  // Haruki (Pose)
  harukiArmL: '/assets/part3/model/Battle/Haruki/Pose/Haruki_arm_l.png',
  harukiArmR: '/assets/part3/model/Battle/Haruki/Pose/Haruki_arm_r.png',
  harukiBodyOp: '/assets/part3/model/Battle/Haruki/Pose/Haruki_body_op.png',
  harukiBodyCl: '/assets/part3/model/Battle/Haruki/Pose/Haruki_body_cl.png',

  // Mild (Pose3)
  mildLeg: '/assets/part3/model/Battle/Mild/Pose3/Mild_R_3_leg.png',
  mildHead: '/assets/part3/model/Battle/Mild/Pose3/Mild_R_3_head.png',
  mildHood1: '/assets/part3/model/Battle/Mild/Pose3/Mild_R_3_hood_1.png',

  // Haruki Magic
  hrkMagicCircle1:
    '/assets/part3/model/Battle/Haruki/Magic/Sun&moon_Circle.png',
  hrkMagicCircle2:
    '/assets/part3/model/Battle/Haruki/Magic/Sun&moon_Circle.png',
  hrkBean1: '/assets/part3/model/Battle/Haruki/Magic/Coffee_Bean.png',

  // Mild Magic
  mildMagicCircle: '/assets/part3/model/Battle/Mild/Magic2/magic_circle.png',
  mildMagic2: '/assets/part3/model/Battle/Mild/Magic2/magic2.png',
  mildMagic3: '/assets/part3/model/Battle/Mild/Magic2/magic3.png',
  mildPanda1: '/assets/part3/model/Battle/Mild/Magic2/panda2.png',
}

export const battleComponentsFourAssets = {
  // Background
  bg: '/assets/part3/BG/bg_colosseum_night_2.png',

  // Debirun (Pose)
  debirunAsset: '/assets/part3/model/Battle/debirun/Pose/Debirun_asset.png',
  debirunArmL: '/assets/part3/model/Battle/debirun/Pose/Debirun_arm_l.png',
  debirunArmR: '/assets/part3/model/Battle/debirun/Pose/Debirun_arm_r.png',
  debirunBodyOp: '/assets/part3/model/Battle/debirun/Pose/Debirun_body_op.png',
  debirunBodyCl: '/assets/part3/model/Battle/debirun/Pose/Debirun_body_cl.png',

  // Debirun Magic (uses Mild/Magic1 circles)
  debirunMagicCircle1:
    '/assets/part3/model/Battle/Mild/Magic1/Sun&moon_Circle.png',
  debirunMagicCircle2:
    '/assets/part3/model/Battle/Mild/Magic1/Sun&moon_Circle.png',
  debirunMagicCircle3:
    '/assets/part3/model/Battle/Mild/Magic1/Sun&moon_Circle.png',
  debirunMagic1: '/assets/part3/model/Battle/debirun/Magic/magic_1.png',
  debirunMagic2: '/assets/part3/model/Battle/debirun/Magic/magic_2.png',
  debirunMagic3: '/assets/part3/model/Battle/debirun/Magic/magic_3.png',

  // Mild (Pose4 & Pose1)
  mildBody: '/assets/part3/model/Battle/Mild/Pose4/mild_body.png',
  mildHood: '/assets/part3/model/Battle/Mild/Pose4/mild_hood.png',
  mildHeadOp: '/assets/part3/model/Battle/Mild/Pose4/mild_head_op.png',
  mildHeadCl: '/assets/part3/model/Battle/Mild/Pose4/mild_head_cl.png',

  mildPose1Arm: '/assets/part3/model/Battle/Mild/Pose1/Mild_R_1_Arm.png',
  mildPose1Hair: '/assets/part3/model/Battle/Mild/Pose1/Mild_R_1_hair.png',
  mildPose1BodyOp: '/assets/part3/model/Battle/Mild/Pose1/Mild_R_1_Body_op.png',
  mildPose1BodyCl: '/assets/part3/model/Battle/Mild/Pose1/Mild_R_1_Body_cl.png',

  // Mild Summon / Magic2 (circle + front)
  mildMagicCircle: '/assets/part3/model/Battle/Mild/Magic2/magic_circle.png',
  mildMagic0: '/assets/part3/model/Battle/Mild/Magic2/magic0.png',
  mildMagic1: '/assets/part3/model/Battle/Mild/Magic2/magic1.png',
  mildMagic2: '/assets/part3/model/Battle/Mild/Magic2/magic2.png',
  mildMagic3: '/assets/part3/model/Battle/Mild/Magic2/magic3.png',
  mildPanda: '/assets/part3/model/Battle/Mild/Magic2/panda2.png',

  // Mild Elemental Magic (Magic1)
  magicFire: '/assets/part3/model/Battle/Mild/Magic1/Fire_Circle.png',
  magicIce: '/assets/part3/model/Battle/Mild/Magic1/Ice_Circle.png',
  magicSunMoon: '/assets/part3/model/Battle/Mild/Magic1/Sun&moon_Circle.png',
}

export const cutSence = {
  cutSence_1: '/assets/part3/cutscene/Cutscene_1.png',
  cutSence_2: '/assets/part3/cutscene/Cutscene_2.png',
}

const chapterThreeRawAssets = {
  openSceneColosseumAssets,
  inColosseumAssets,
  inColosseumBehindAssets,
  battleComponentsOneAssets,
  battleComponentsTwoAssets,
  battleComponentsThreeAssets,
  battleComponentsFourAssets,
  cutSence,
}

const chapterThreeAssets = extractAssetPaths(chapterThreeRawAssets)

export default chapterThreeAssets
