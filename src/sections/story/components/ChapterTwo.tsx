import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useState } from 'react'

// 1. เปลี่ยนจาก useEffect เป็น useLayoutEffect
import {
  MildHouseScene,
  SchoolScene,
  ThreeMonthsLaterScene,
  TrainingGroundScene,
  TrainingMontageScene,
} from './Chapter/Two'

gsap.registerPlugin(ScrollTrigger)

interface ChapterTwoProps {
  onComplete?: () => void
}

export default function ChapterTwo({ onComplete }: ChapterTwoProps) {
  const [stage, setStage] = useState(0)

  // ✅ 2. เพิ่มท่อนนี้เข้าไปสำคัญมาก!
  // ทุกครั้งที่ stage เปลี่ยน (มีฉากใหม่โผล่มา) ให้บอก GSAP ว่า "เฮ้ย หน้าเว็บยาวขึ้นแล้วนะ คำนวณใหม่ด่วน!"
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ใส่ setTimeout นิดนึง เพื่อรอให้ React วาดฉากใหม่เสร็จสมบูรณ์จริงๆ
      setTimeout(() => {
        ScrollTrigger.refresh()
      }, 200)
    })
    return () => ctx.revert()
  }, [stage])

  return (
    <div
      className="min-h-screen w-full bg-black text-white"
      id="chapter-two-root"
    >
      <SchoolScene onComplete={() => setStage((prev) => Math.max(prev, 1))} />

      {stage >= 1 && (
        <div className="animate-in fade-in duration-200">
          <TrainingGroundScene
            onComplete={() => setStage((prev) => Math.max(prev, 2))}
          />
        </div>
      )}

      {stage >= 2 && (
        <div className="animate-in fade-in duration-200">
          <MildHouseScene
            onComplete={() => setStage((prev) => Math.max(prev, 3))}
          />
        </div>
      )}

      {stage >= 3 && (
        <div className="animate-in fade-in duration-200">
          <TrainingMontageScene
            onComplete={() => setStage((prev) => Math.max(prev, 4))}
          />
        </div>
      )}

      {stage >= 4 && (
        <div className="animate-in fade-in duration-200">
          <ThreeMonthsLaterScene onComplete={() => onComplete?.()} />
        </div>
      )}
    </div>
  )
}
