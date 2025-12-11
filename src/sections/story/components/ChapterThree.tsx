import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

import {
  BehindSceneColosseum,
  VersusSceneFour,
  VersusSceneOne,
  VersusSceneThree,
  VersusSceneTwo,
} from './Chapter/Three'
import OpenSceneColosseum from './Chapter/Three/OpenSceneColosseum'

gsap.registerPlugin(ScrollTrigger)

interface ChapterThreeProps {
  onComplete?: () => void
}

export default function ChapterThree({ onComplete }: ChapterThreeProps) {
  // ใช้ useRef แทน State เพื่อไม่ให้ Re-render
  const completedStages = useRef(new Set<number>())

  const handleStageComplete = (stage: number) => {
    if (completedStages.current.has(stage)) return
    completedStages.current.add(stage)

    // Scene สุดท้ายคือ 5 (BehindSceneColosseum)
    if (stage === 5) {
      onComplete?.()
    }
  }

  return (
    <div
      id="chapter-three-root"
      className="min-h-screen w-full bg-black text-white"
    >
      {/* Render ทุก Scene ทิ้งไว้เลย เพื่อให้ GSAP คำนวณความสูงที่แท้จริงได้
        ไม่ต้องมี visibleScenes เช็ค condition
      */}

      {/* SCENE 0 */}
      <div className="relative z-50">
        <OpenSceneColosseum onComplete={() => handleStageComplete(0)} />
      </div>

      {/* SCENE 1 */}
      <div className="relative z-40">
        <VersusSceneOne onComplete={() => handleStageComplete(1)} />
      </div>

      {/* SCENE 2 */}
      <div className="relative z-30">
        <VersusSceneTwo onComplete={() => handleStageComplete(2)} />
      </div>

      {/* SCENE 3 */}
      <div className="relative z-20">
        <VersusSceneThree onComplete={() => handleStageComplete(3)} />
      </div>

      {/* SCENE 4 */}
      <div className="relative z-10">
        <VersusSceneFour onComplete={() => handleStageComplete(4)} />
      </div>

      {/* SCENE 5 */}
      <div className="relative z-0">
        <BehindSceneColosseum onComplete={() => handleStageComplete(5)} />
      </div>
    </div>
  )
}
