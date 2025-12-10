import React from 'react'

import BattleComponentOne from './components/BattleComponentOne'
import InColosseum from './components/InColosseum'
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
        refName="vsOne"
        playerA={{
          name: 'Mild-R',
          alias: 'Mild-R สาวน้อย Introvert',
          src: 'assets/part3/Character/Versus/Mild-R/',
          file: 'Mild',
          text: 'test',
        }}
        playerB={{
          name: 'Dr.Gamer',
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
