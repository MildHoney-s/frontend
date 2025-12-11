import React from 'react'

import BattleComponentOne from './components/BattleComponentOne'
import InColosseum from './components/InColosseum'
import VersusComponent from './components/VersusComponent'

// ✅ 1. กำหนด Props
interface SceneProps {
  onComplete?: () => void
}

export default function VersusSceneOne({ onComplete }: SceneProps) {
  return (
    <>
      <VersusComponent
        // ✅ 2. ส่ง onComplete เข้าไป
        onComplete={onComplete}
        refName="vsOne"
        playerA={{
          name: 'Mild-R',
          alias: 'สาวน้อย Introvert ผู้ชื่นชอบชานม',
          src: 'assets/part3/Character/Versus/Mild-R/',
          file: 'Mild',
          text: `สวัสดีค่ะทุกคน... มายด์ คะ 
                 ฝากตัวด้วยนะคะ...
                 (ถึงคิวรักษาหัวใจแล้ว เป็นเด็กดีต่อแถวนะคะ)`,
        }}
        playerB={{
          name: 'Dr.',
          alias: 'ศัลยแพทย์แห่งความตาย ผู้มาคุมน้ำตาล',
          text: "นักปราชญ์ที่อยู่เคียงคู่กับชีวิต และเผชิญหน้ากับความตาย เวทย์มนต์ที่ล้อเล่นกับผู้วายชน เนโครเมนเซอร์ ผู้ที่คอยเหนี่ยวรั้งชีวิตที่ดับสูญให้กลับมามีชีวิตอีกครั้ง...'ศัลยแพทย์แห่งความตาย'... ณ บัดนี้สิ่งที่เขานำพามาคือชีวิตหรือความตายกันแน่!!!",
          src: 'assets/part3/Character/Versus/Dr_Gamer/',
          file: 'Dr_Gamer',
        }}
      />
      <InColosseum />
      <BattleComponentOne />
    </>
  )
}
