import React from 'react'

import BattleComponentTwo from './components/BattleComponentTwo'
import VersusComponent from './components/VersusComponent'

// ✅ 1. กำหนด Props
interface SceneProps {
  onComplete?: () => void
}

export default function VersusScene01({ onComplete }: SceneProps) {
  return (
    <>
      <VersusComponent
        // ✅ 2. ส่ง onComplete เข้าไป
        onComplete={onComplete}
        refName="vsTwo"
        playerA={{
          name: 'Mild-R',
          alias: 'Mild-R สาวน้อย Introvert ',
          src: 'assets/part3/Character/Versus/Mild-R/',
          file: 'Mild',
          text: 'test',
        }}
        playerB={{
          name: 'S.H.A.R.K',
          alias: 'อสูรฉลามผู้กัดกินความว่างเปล่า',
          text: `ในนามแห่งฉลามคลั่ง ข้าขอประกาศก้องต่อหน้าเกลียวคลื่นและพายุ! เจ้ามนุษย์เอ๋ย... จงรับผิดชอบซะ ที่บังอาจทำให้ 'ราชาแห่งห้วงลึก' ต้องหลงทางในแววตาคู่นั้น จนหาทางกลับมหาสมุทรไม่เจอ 
                 หากความรักคือมหาสมุทร...ข้าก็คงเป็นฉลามที่ยินดีจะ 'จมน้ำตาย' ในความลึกซึ้งของเจ้า`,
          src: 'assets/part3/Character/Versus/Zayzhik/',
          file: 'Zayzhik',
        }}
      />

      <BattleComponentTwo />
    </>
  )
}
