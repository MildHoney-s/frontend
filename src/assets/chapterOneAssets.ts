import { AssetMap, prefixKeys } from '@/utils/prefixKeys'

export const bookOpenSceneAssets = {
  prologue_1: '/assets/Part1/Prologue_1.png',
  prologue_2: '/assets/Part1/Prologue_2.png',
  prologue_3: '/assets/Part1/Prologue_3.png',
}

export const classroomSceneAssets = {
  bg_1: '/assets/Part1/classroom/Classroom_2.png',
  bg_2: '/assets/Part1/classroom/Classroom_2_edit.png',
  teacher: '/assets/Part1/classroom/Xoneko_Sensei_open.png',
}

export const rescueHomeSceneAssets = {
  outsideHouseBg: '/assets/Part1/house/house_outside.png',
  insideHouseBg: '/assets/Part1/house/house_inside.png',
  closeUpBg: '/assets/Part1/house/mild_close_up.png',
  mildBody: '/assets/Part2/Mild/Body/Body_1.PNG',
  mildLeftArm: '/assets/Part2/Mild/Arms/Arm_1_L.PNG',
  mildRightArm: '/assets/Part2/Mild/Arms/Arm_1_R.PNG',
  mildHair: '/assets/Part2/Mild/Body/Hair.PNG',
  mildFaceNormal: '/assets/Part2/Mild/Face/Face_01_หน้าปกติ.PNG',
  mildFaceSmile: '/assets/Part2/Mild/Face/Face_07_หน้ายิ้ม2.PNG',
  mildFaceWorried: '/assets/Part2/Mild/Face/Face_05_หน้าเศร้า.PNG',
  honeyBody: '/assets/Part2/Honey/Body.PNG',
  honeyFaceHood: '/assets/Part2/Honey/Hood_face.png',
  honeyNormalFace: '/assets/Part2/Honey/Normal_Face.PNG',
  honeyWorryFace: '/assets/Part2/Honey/Worry_Face.PNG',
}

export const teashopSceneAssets = {
  marketBgImg: '/assets/Part1/teashop/market.png',
  shopBgImg: '/assets/Part1/teashop/milk_tea_shop.png',
  closeUpBgImg: '/assets/Part1/teashop/close_up.png',
  mildHair: '/assets/Part2/Mild/Body/Hair.PNG',
  mildBody: '/assets/Part2/Mild/Body/Body_1.PNG',
  mildArmLNormal: '/assets/Part2/Mild/Arms/Arm_1_L.PNG',
  mildArmRNormal: '/assets/Part2/Mild/Arms/Arm_1_R.PNG',
  mildArmRMilkTea: '/assets/Part2/Mild/Arms/Arm_milktea_R.PNG',
  mildFaceNormal: '/assets/Part2/Mild/Face/Face_01_หน้าปกติ.PNG',
  mildFaceSmile_1: '/assets/Part2/Mild/Face/Face_07_หน้ายิ้ม2.PNG',
  mildFaceSmile_2: '/assets/Part2/Mild/Face/Face_02_หน้ายิ้ม.PNG',
}

export const trainingSceneAssets = {
  fieldBgImg: '/assets/Part1/training/field.png',
  monsterImg: '/assets/Part1/training/monster.png',
  carryHomeBgImg: '/assets/Part1/training/carry_home.png',
  mildHair: '/assets/Part2/Mild/Body/Hair.PNG',
  mildBody: '/assets/Part2/Mild/Body/Body_1.PNG',
  mildArmL: '/assets/Part2/Mild/Arms/Arm_1_L.PNG',
  mildArmR: '/assets/Part2/Mild/Arms/Arm_1_R.PNG',
  mildFaceNormal: '/assets/Part2/Mild/Face/Face_01_หน้าปกติ.PNG',
  mildFaceSmile: '/assets/Part2/Mild/Face/Face_07_หน้ายิ้ม2.PNG',
  mildFaceShock: '/assets/Part2/Mild/Face/Face_03_หน้าตกใจ.PNG',
  honeyBody: '/assets/Part2/Honey/Body.PNG',
  honeyFaceHood: '/assets/Part2/Honey/Hood_face.png',
  magicCircle: '/assets/part3/model/Battle/Mild/Magic1/Fire_Circle.png',
}

const chapterOneAssets: AssetMap = {
  ...prefixKeys(bookOpenSceneAssets, 'bookOpen'),
  ...prefixKeys(classroomSceneAssets, 'classroom'),
  ...prefixKeys(rescueHomeSceneAssets, 'rescueHome'),
  ...prefixKeys(teashopSceneAssets, 'teaShop'),
  ...prefixKeys(trainingSceneAssets, 'training'),
}

export default chapterOneAssets
