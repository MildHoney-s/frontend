import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

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
  // Use Ref instead of State to prevent re-renders
  const completedStages = useRef(new Set<number>())

  const handleStageComplete = (stage: number) => {
    if (completedStages.current.has(stage)) return
    completedStages.current.add(stage)

    // Trigger onComplete when the final scene (Stage 4) finishes
    if (stage === 4) {
      onComplete?.()
    }
  }

  return (
    <div
      id="chapter-two-root"
      className="min-h-screen w-full bg-black text-white"
    >
      {/* Render all scenes immediately in the DOM.
        GSAP ScrollTrigger will handle the pinning and logic 
        without needing React conditional rendering.
      */}

      {/* Stage 0 */}
      <div className="relative z-10">
        <SchoolScene onComplete={() => handleStageComplete(0)} />
      </div>

      {/* Stage 1 */}
      <div className="relative z-10">
        <TrainingGroundScene onComplete={() => handleStageComplete(1)} />
      </div>

      {/* Stage 2 */}
      <div className="relative z-10">
        <MildHouseScene onComplete={() => handleStageComplete(2)} />
      </div>

      {/* Stage 3 */}
      <div className="relative z-10">
        <TrainingMontageScene onComplete={() => handleStageComplete(3)} />
      </div>

      {/* Stage 4 (Final) */}
      <div className="relative z-10">
        <ThreeMonthsLaterScene onComplete={() => handleStageComplete(4)} />
      </div>
    </div>
  )
}
