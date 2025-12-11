import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef, useState } from 'react'

import {
  BookOpenScene,
  ClassroomScene,
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
  const [visibleScenes, setVisibleScenes] = useState<number[]>([0])
  const completedStages = useRef(new Set<number>())
  const containerRef = useRef<HTMLDivElement>(null)

  // Preload all scenes progressively as user scrolls
  useLayoutEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      const clientHeight = window.innerHeight
      const scrollPercent = scrollTop / (scrollHeight - clientHeight)

      // Progressively reveal scenes based on scroll position
      if (scrollPercent > 0.2 && !visibleScenes.includes(1)) {
        setVisibleScenes((prev) => [...prev, 1])
      }
      if (scrollPercent > 0.4 && !visibleScenes.includes(2)) {
        setVisibleScenes((prev) => [...prev, 2])
      }
      if (scrollPercent > 0.6 && !visibleScenes.includes(3)) {
        setVisibleScenes((prev) => [...prev, 3])
      }
      if (scrollPercent > 0.8 && !visibleScenes.includes(4)) {
        setVisibleScenes((prev) => [...prev, 4])
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [visibleScenes])

  // Gentle refresh only when new scenes are added
  useLayoutEffect(() => {
    if (visibleScenes.length > 1) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh()
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [visibleScenes.length])

  const handleStageComplete = (stage: number) => {
    if (completedStages.current.has(stage)) return
    completedStages.current.add(stage)

    // Final completion
    if (stage === 4) {
      onComplete?.()
    }
  }

  return (
    <div
      ref={containerRef}
      id="chapter-one-root"
      className="min-h-screen w-full bg-black text-white"
    >
      {/* Stage 0: เปิดหนังสือ (Intro) */}
      <BookOpenScene onComplete={() => handleStageComplete(0)} />

      {/* Stage 1 */}
      {visibleScenes.includes(1) && (
        <div className="animate-in fade-in duration-700">
          <ClassroomScene onComplete={() => handleStageComplete(1)} />
        </div>
      )}

      {/* Stage 2 */}
      {visibleScenes.includes(2) && (
        <div className="animate-in fade-in duration-700">
          <TeaShopScene onComplete={() => handleStageComplete(2)} />
        </div>
      )}

      {/* Stage 3 */}
      {visibleScenes.includes(3) && (
        <div className="animate-in fade-in duration-700">
          <TrainingScene onComplete={() => handleStageComplete(3)} />
        </div>
      )}

      {/* Stage 5 */}
      {visibleScenes.includes(4) && (
        <div className="animate-in fade-in duration-700">
          <RescueHomeScene onComplete={() => handleStageComplete(5)} />
        </div>
      )}
    </div>
  )
}
