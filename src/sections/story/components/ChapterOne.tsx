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

// ----------------------------------------------------------------------

export default function ChapterOne({ onComplete }: ChapterOneProps) {
  const [stage, setStage] = useState(1)

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
      {/* <BookOpenScene
        onComplete={() => setStage(1)}
  onReset={() => setStage(0)}
      /> */}

      {/* Stage 1 */}
      {stage >= 1 && (
        <div className="animate-in fade-in duration-700">
          <ClassroomScene onComplete={() => setStage(2)} />
        </div>
      )}

      {/* Stage 2 */}
      {stage >= 2 && (
        <div className="animate-in fade-in duration-700">
          <TeaShopScene onComplete={() => setStage(3)} />
        </div>
      )}

      {/* Stage 3 */}
      {stage >= 3 && (
        <div className="animate-in fade-in duration-700">
          <TrainingScene onComplete={() => setStage(4)} />
        </div>
      )}

      {/* Stage 4 */}
      {stage >= 4 && (
        <div className="animate-in fade-in duration-700">
          <MonsterEncounterScene onComplete={() => setStage(5)} />
        </div>
      )}

      {/* Stage 5 */}
      {stage >= 5 && (
        <div className="animate-in fade-in duration-700">
          <RescueHomeScene onComplete={() => setStage(6)} />
        </div>
      )}
    </div>
  )
}
