import React from 'react'

import BattleComponentThree from './components/BattleComponentThree'
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
        refName="vsThree"
        playerA={{
          name: 'Mild-R',
          alias: 'Mild-R สาวน้อย Introvert ',
          src: 'assets/part3/Character/Versus/Mild-R/',
          file: 'Mild',
          text: 'test',
        }}
        playerB={{
          name: 'Haruki',
          alias: 'ผู้มัวเมาในยามรัตติกาล 100%คาเฟอีน',
          text: 'ผู้ลุ่มหลงในค่ำคืนราวกับต้องมนตร์ คาเฟอีนไหลเวียนแทนเลือดในกาย ทำให้หัวใจเต้นแรงดุจพายุกลางดึก สายตาที่พร่าเลือนด้วยความง่วง กลับทอประกายแปลกประหลาดในแสงจันทร์ เขาถูกค่ำคืนกลืนกิน… และพร้อมกันนั้น เขาก็กลืนกินค่ำคืนกลับไป!!',
          src: 'assets/part3/Character/Versus/Haruki/',
          file: 'Haruki',
        }}
      />
      <BattleComponentThree />
    </>
  )
}
