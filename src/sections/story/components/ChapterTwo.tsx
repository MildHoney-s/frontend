import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef, useState } from 'react'

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
      if (scrollPercent > 0.15 && !visibleScenes.includes(1)) {
        setVisibleScenes((prev) => [...prev, 1])
      }
      if (scrollPercent > 0.35 && !visibleScenes.includes(2)) {
        setVisibleScenes((prev) => [...prev, 2])
      }
      if (scrollPercent > 0.55 && !visibleScenes.includes(3)) {
        setVisibleScenes((prev) => [...prev, 3])
      }
      if (scrollPercent > 0.75 && !visibleScenes.includes(4)) {
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
      className="w-full bg-black text-white"
      id="chapter-two-root"
    >
      {/* Scene 0: School - Always visible */}
      <SchoolScene onComplete={() => handleStageComplete(0)} />

      {/* Scene 1: Training Ground */}
      {visibleScenes.includes(1) && (
        <TrainingGroundScene onComplete={() => handleStageComplete(1)} />
      )}

      {/* Scene 2: Mild's House */}
      {visibleScenes.includes(2) && (
        <MildHouseScene onComplete={() => handleStageComplete(2)} />
      )}

      {/* Scene 3: Training Montage */}
      {visibleScenes.includes(3) && (
        <TrainingMontageScene onComplete={() => handleStageComplete(3)} />
      )}

      {/* Scene 4: Three Months Later */}
      {visibleScenes.includes(4) && (
        <ThreeMonthsLaterScene onComplete={() => handleStageComplete(4)} />
      )}
    </div>
  )
}
