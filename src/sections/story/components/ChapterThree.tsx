import { useState } from 'react'

import {
  BehindSceneColosseum,
  VersusSceneFour,
  VersusSceneOne,
  VersusSceneThree,
  VersusSceneTwo,
} from './Chapter/Three'
import OpenSceneColosseum from './Chapter/Three/OpenSceneColosseum'

// เช็ค index.ts ของ folder ให้ export ครบนะครับ

export default function ChapterThree() {
  const [stage, setStage] = useState(0)

  return (
    <div className="min-h-screen w-full bg-black text-white">
      {/* SCENE 0: Intro Parallax */}
      <OpenSceneColosseum
        onComplete={() => setStage((prev) => Math.max(prev, 1))}
      />

      {/* SCENE 1: Versus 01 (Unlock เมื่อ Scene 0 จบ) */}
      {stage >= 1 && (
        <div className="animate-[fadeIn_1s_ease-in_forwards] opacity-0 transition-opacity duration-1000 ease-in">
          <VersusSceneOne
            onComplete={() => setStage((prev) => Math.max(prev, 2))}
          />
        </div>
      )}

      {/* SCENE 2: Versus 02 (Unlock เมื่อ Scene 1 จบ) */}
      {stage >= 2 && (
        <div className="animate-[fadeIn_1s_ease-in_forwards] opacity-0 transition-opacity duration-1000 ease-in">
          <VersusSceneTwo
            onComplete={() => setStage((prev) => Math.max(prev, 3))}
          />
        </div>
      )}

      {/* SCENE 3: Versus 03 (Unlock เมื่อ Scene 2 จบ) */}
      {stage >= 3 && (
        <div className="animate-[fadeIn_1s_ease-in_forwards] opacity-0 transition-opacity duration-1000 ease-in">
          <VersusSceneThree
            onComplete={() => setStage((prev) => Math.max(prev, 4))}
          />
        </div>
      )}

      {/* SCENE 4: Versus 04 (Unlock เมื่อ Scene 3 จบ) */}
      {stage >= 4 && (
        <div className="animate-[fadeIn_1s_ease-in_forwards] opacity-0 transition-opacity duration-1000 ease-in">
          <VersusSceneFour
            onComplete={() => setStage((prev) => Math.max(prev, 5))} // จบ Chapter หรือไปต่อ
          />
        </div>
      )}

      {/* SCENE 5: Versus 05 (Unlock เมื่อ Scene 4 จบ) */}
      {stage >= 5 && (
        <div className="animate-[fadeIn_1s_ease-in_forwards] opacity-0 transition-opacity duration-1000 ease-in">
          <BehindSceneColosseum
            onComplete={() => setStage((prev) => Math.max(prev, 6))} // จบ Chapter หรือไปต่อ
          />
        </div>
      )}

      {/* CSS Keyframes สำหรับ Fade In */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
