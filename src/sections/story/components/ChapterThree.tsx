import { useState } from 'react'
import OpenSceneColosseum from './Chapter/Three/OpenSceneColosseum'
import { 
  VersusScene01, 
  VersusScene02, 
  VersusScene03, 
  VersusScene04 
} from './Chapter/Three' // เช็ค index.ts ของ folder ให้ export ครบนะครับ

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
        <div className="transition-opacity duration-1000 ease-in opacity-0 animate-[fadeIn_1s_ease-in_forwards]">
          <VersusScene01
            onComplete={() => setStage((prev) => Math.max(prev, 2))}
          />
        </div>
      )}

      {/* SCENE 2: Versus 02 (Unlock เมื่อ Scene 1 จบ) */}
      {stage >= 2 && (
        <div className="transition-opacity duration-1000 ease-in opacity-0 animate-[fadeIn_1s_ease-in_forwards]">
          <VersusScene02
            onComplete={() => setStage((prev) => Math.max(prev, 3))}
          />
        </div>
      )}

      {/* SCENE 3: Versus 03 (Unlock เมื่อ Scene 2 จบ) */}
      {stage >= 3 && (
        <div className="transition-opacity duration-1000 ease-in opacity-0 animate-[fadeIn_1s_ease-in_forwards]">
          <VersusScene03
            onComplete={() => setStage((prev) => Math.max(prev, 4))}
          />
        </div>
      )}

      {/* SCENE 4: Versus 04 (Unlock เมื่อ Scene 3 จบ) */}
      {stage >= 4 && (
        <div className="transition-opacity duration-1000 ease-in opacity-0 animate-[fadeIn_1s_ease-in_forwards]">
          <VersusScene04
            onComplete={() => setStage((prev) => Math.max(prev, 5))} // จบ Chapter หรือไปต่อ
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
