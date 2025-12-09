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

  // Optional: You can keep this as a fallback, but the specific onComplete 
  // passed to the final scene is more accurate for pinned scroll sections.
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: '#chapter-two-root',
      start: 'bottom bottom',
      onEnter: () => {
        // This is a safeguard in case the user scrolls past everything quickly
        // onComplete?.() 
      },
    })

    return () => trigger.kill()
  }, [onComplete])

  return (
    <div
      className="min-h-screen w-full bg-black text-white"
      id="chapter-two-root"
    >


      <SchoolScene onComplete={() => setStage((prev) => Math.max(prev, 1))} />

      {stage >= 1 && (
        <div className="animate-in fade-in duration-700">
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