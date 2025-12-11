import React from 'react'

import BattleComponentTwo from './components/BattleComponentTwo'
import VersusComponent from './components/VersusComponent'

interface SceneProps {
  onComplete?: () => void
}

export default function VersusScene01({ onComplete }: SceneProps) {
  return (
    <div className="bg-black">
      {/* ✅ SECTION 1: Intro (แยกเป็น 2 Box) */}
      <div className="relative z-10 flex h-screen w-full flex-col items-center justify-center space-y-6 bg-black px-4 text-center">
        {' '}
        {/* space-y-6 คือระยะห่างระหว่างกล่อง */}
        {/* --- BOX 1: เกริ่นนำ --- */}
        <div className="w-full max-w-2xl rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8">
          <p className="text-lg font-light leading-relaxed text-gray-300 md:text-2xl">
            หลังจากผ่านการต่อสู้อันแสนดุเดือดไปหลายคู่
          </p>
        </div>
        {/* --- BOX 2: ประกาศคู่ต่อไป --- */}
        <div className="w-full max-w-3xl rounded-xl border border-white/10 bg-white/5 p-8 shadow-[0_0_50px_-12px_rgba(220,38,38,0.2)] backdrop-blur-sm md:p-12">
          {' '}
          {/* ใส่เงาแดงจางๆ ให้กล่องนี้ดูสำคัญ */}
          <p className="text-2xl font-bold leading-snug text-white md:text-4xl">
            ไปรับชมรอบที่ 2 คู่แรกกันเลยดีกว่า
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

      {/* ✅ SECTION 2: Versus Screen */}
      <VersusComponent
        onComplete={onComplete}
        refName="vsTwo"
        playerA={{
          name: 'Mild-R',
          alias: 'สาวน้อย Introvert ผู้ชื่นชอบชานม',
          src: 'assets/part3/model/Versus/Mild-R/',
          file: 'Mild',
          text: `สวัสดีค่ะทุกคน... มายด์ คะ 
                 ฝากตัวด้วยนะคะ...
                 (ถึงคิวรักษาหัวใจแล้ว เป็นเด็กดีต่อแถวนะคะ)`,
        }}
        playerB={{
          name: 'Z.H.A.R.K.',
          alias: 'อสูรฉลามผู้กัดกินความว่างเปล่า',
          text: `ในนามแห่งฉลามคลั่ง ข้าขอประกาศก้องต่อหน้าเกลียวคลื่นและพายุ! เจ้ามนุษย์เอ๋ย... จงรับผิดชอบซะ ที่บังอาจทำให้ 'ราชาแห่งห้วงลึก' ต้องหลงทางในแววตาคู่นั้น จนหาทางกลับมหาสมุทรไม่เจอ 
                (หากความรักคือมหาสมุทร...ข้าก็คงเป็นฉลามที่ยินดีจะ 'จมน้ำตาย' ในความลึกซึ้งของเจ้า)`,
          src: 'assets/part3/model/Versus/Zayzhik/',
          file: 'Zayzhik',
        }}
      />

      {/* ✅ SECTION 3: Battle */}
      <BattleComponentTwo />
    </div>
  )
}
