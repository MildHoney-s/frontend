import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

import {
  BookOpenScene,
  ClassroomScene,
  RescueHomeScene,
  TeaShopScene,
  TrainingScene,
} from './Chapter/One'

gsap.registerPlugin(ScrollTrigger)

interface ChapterOneProps {
  onComplete?: () => void
}

export default function ChapterOne({ onComplete }: ChapterOneProps) {
  // ไม่ต้องใช้ visibleScenes state แล้ว เพื่อให้ DOM นิ่งที่สุด
  // ไม่ต้องใช้ useLayoutEffect คำนวณ scroll percent แล้ว

  const completedStages = useRef(new Set<number>())

  const handleStageComplete = (stage: number) => {
    if (completedStages.current.has(stage)) return
    completedStages.current.add(stage)

    // เมื่อฉากสุดท้าย (RescueHomeScene) เล่นจบ ให้แจ้ง Parent เพื่อโหลด Chapter 2
    if (stage === 4) {
      onComplete?.()
    }
  }

  return (
    <div
      id="chapter-one-root"
      className="min-h-screen w-full bg-black text-white"
    >
      {/* Render ทุกฉากเรียงลงมาเลย
         GSAP จะคำนวณความสูงของทุกฉากได้ถูกต้องตั้งแต่เสี้ยววินาทีแรก
         ทำให้ไม่มีอาการดีดเวลามีของใหม่โผล่มา
      */}

      {/* Stage 0 */}
      <BookOpenScene onComplete={() => handleStageComplete(0)} />

      {/* Stage 1 */}
      <div className="relative z-10">
        <ClassroomScene onComplete={() => handleStageComplete(1)} />
      </div>

      {/* Stage 2 */}
      <div className="relative z-10">
        <TeaShopScene onComplete={() => handleStageComplete(2)} />
      </div>

      {/* Stage 3 */}
      <div className="relative z-10">
        <TrainingScene onComplete={() => handleStageComplete(3)} />
      </div>

      {/* Stage 4 (Scene สุดท้าย) */}
      <div className="relative z-10">
        <RescueHomeScene onComplete={() => handleStageComplete(4)} />
      </div>
    </div>
  )
}
