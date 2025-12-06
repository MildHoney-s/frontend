import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useState } from 'react'

import {
  BookOpenScene,
  ClassroomScene,
  MonsterEncounterScene,
  RescueHomeScene,
  TeaShopScene,
  TrainingScene,
} from './Chapter/One'

gsap.registerPlugin(ScrollTrigger)

interface ChapterOneProps {
  onComplete?: () => void
}

export default function ChapterOne({ onComplete }: ChapterOneProps) {
  const [stage, setStage] = useState(0)

  // เมื่อ scroll จนถึงท้าย chapter ให้เรียก onComplete
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: '#chapter-one-root',
      start: 'bottom bottom',
      onEnter: () => {
        onComplete?.()
      },
    })

    return () => trigger.kill()
  }, [onComplete])

  return (
    <div
      id="chapter-one-root"
      className="min-h-screen w-full bg-black text-white"
    >
      {/* Stage 0: เปิดหนังสือ (Intro) */}
      <BookOpenScene onComplete={() => setStage((prev) => Math.max(prev, 1))} />

      {/* Stage 1 */}
      {stage >= 1 && (
        <div className="animate-in fade-in duration-700">
          <ClassroomScene
            onComplete={() => setStage((prev) => Math.max(prev, 2))}
          />
        </div>
      )}

      {/* Stage 2 */}
      {stage >= 2 && (
        <div className="animate-in fade-in duration-700">
          <TeaShopScene
            onComplete={() => setStage((prev) => Math.max(prev, 3))}
          />
        </div>
      )}

      {/* Stage 3 */}
      {stage >= 3 && (
        <div className="animate-in fade-in duration-700">
          <TrainingScene
            onComplete={() => setStage((prev) => Math.max(prev, 4))}
          />
        </div>
      )}

      {/* Stage 4 */}
      {stage >= 4 && (
        <div className="animate-in fade-in duration-700">
          <MonsterEncounterScene
            onComplete={() => setStage((prev) => Math.max(prev, 5))}
          />
        </div>
      )}

      {/* Stage 5 */}
      {stage >= 5 && (
        <div className="animate-in fade-in duration-700">
          <RescueHomeScene
            onComplete={() => setStage((prev) => Math.max(prev, 6))}
          />
        </div>
      )}

      {/* Stage 6: Ending */}
      {stage >= 6 && (
        <div className="animate-in fade-in duration-700">
          <div className="mx-auto max-w-3xl p-10 text-center">
            <h2 className="font-serif text-3xl text-yellow-300">
              บทที่ 1 เสร็จสิ้น
            </h2>
            <p className="mt-4 text-gray-300">To be continued...</p>
          </div>
        </div>
      )}
    </div>
  )
}
