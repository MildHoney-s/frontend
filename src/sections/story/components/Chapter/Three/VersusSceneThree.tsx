import React from 'react'

import BattleComponentThree from './components/BattleComponentThree'
import VersusComponent from './components/VersusComponent'

// ✅ 1. กำหนด Props
interface SceneProps {
  onComplete?: () => void
}

export default function VersusSceneThree({ onComplete }: SceneProps) {
  return (
    <>
      {/* ✅ SECTION 1: Intro (แยกเป็น 2 Box) */}
      <div className="relative z-10 flex h-screen w-full flex-col items-center justify-center space-y-6 bg-black px-4 text-center">
        {' '}
        {/* space-y-6 คือระยะห่างระหว่างกล่อง */}
        {/* --- BOX 1: เกริ่นนำ --- */}
        <div className="w-full max-w-2xl rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8">
          <p className="text-lg font-light leading-relaxed text-gray-300 md:text-2xl">
            เอาหละครับทุกท่าน
          </p>
        </div>
        {/* --- BOX 2: ประกาศคู่ต่อไป --- */}
        <div className="w-full max-w-3xl rounded-xl border border-white/10 bg-white/5 p-8 shadow-[0_0_50px_-12px_rgba(220,38,38,0.2)] backdrop-blur-sm md:p-12">
          {' '}
          {/* ใส่เงาแดงจางๆ ให้กล่องนี้ดูสำคัญ */}
          <p className="text-2xl font-bold leading-snug text-white md:text-4xl">
            ต่อไปก็เป็นรอบรองชนะเลิศกันแล้ว
          </p>
          <div className="mx-auto my-6 h-px w-20 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50"></div>
          <p className="animate-pulse text-3xl font-bold text-red-500 drop-shadow-[0_0_15px_rgba(220,38,38,0.8)] md:text-5xl">
            สำหรับคู่ต่อไปก็คือ...
          </p>
        </div>
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 animate-bounce text-gray-500">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>

      <VersusComponent
        // ✅ 2. ส่ง onComplete เข้าไป
        onComplete={onComplete}
        refName="vsThree"
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
          name: 'H.R.K.',
          alias: 'ผู้มัวเมาในยามรัตติกาล 100% คาเฟอีน',
          text: 'ผู้ลุ่มหลงในค่ำคืนราวกับต้องมนตร์ คาเฟอีนไหลเวียนแทนเลือดในกาย ทำให้หัวใจเต้นแรงดุจพายุกลางดึก สายตาที่พร่าเลือนด้วยความง่วง กลับทอประกายแปลกประหลาดในแสงจันทร์ เขาถูกค่ำคืนกลืนกิน… และพร้อมกันนั้น เขาก็กลืนกินค่ำคืนกลับไป!!',
          src: 'assets/part3/Character/Versus/Haruki/',
          file: 'Haruki',
        }}
      />
      <BattleComponentThree />
    </>
  )
}
