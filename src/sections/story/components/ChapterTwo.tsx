import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useState } from 'react'

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

// ----------------------------------------------------------------------

export default function ChapterTwo({ onComplete }: ChapterTwoProps) {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: '#chapter-two-root',
      start: 'bottom bottom',
      onEnter: () => {
        onComplete?.()
      },
    })

    return () => trigger.kill()
  }, [onComplete])

  return (
    <div
      className="min-h-screen w-full bg-black text-white"
      id="chapter-two-root"
    >
      {/* แต่ละ Scene จะปลดล็อค Scene ถัดไปเมื่อ onComplete */}

      <SchoolScene onComplete={() => setStage((prev) => Math.max(prev, 1))} />

      {stage >= 1 && (
        <div className="animate-in fade-in duration-1000">
          <TrainingGroundScene
            onComplete={() => setStage((prev) => Math.max(prev, 2))}
          />
        </div>
      )}

      {stage >= 2 && (
        <div className="animate-in fade-in duration-1000">
          <MildHouseScene
            onComplete={() => setStage((prev) => Math.max(prev, 3))}
          />
        </div>
      )}

      {stage >= 3 && (
        <div className="animate-in fade-in duration-1000">
          <TrainingMontageScene
            onComplete={() => setStage((prev) => Math.max(prev, 4))}
          />
        </div>
      )}

      {stage >= 4 && (
        <div className="animate-in fade-in duration-1000">
          <ThreeMonthsLaterScene />
        </div>
      )}
    </div>
  )
}
