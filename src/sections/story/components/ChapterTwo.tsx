import { useState } from 'react'

import {
  MildHouseScene,
  SchoolScene,
  ThreeMonthsLaterScene,
  TrainingGroundScene,
  TrainingMontageScene,
} from './Chapter/Two'

// ----------------------------------------------------------------------

export default function ChapterTwo() {
  const [stage, setStage] = useState(0)

  return (
    <div className="min-h-screen w-full bg-black text-white">
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
