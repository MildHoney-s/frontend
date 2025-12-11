/* eslint-disable @typescript-eslint/no-explicit-any */
import ScrollHint from '@/components/ScrollDownAnimation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { ChapterOne, ChapterThree, ChapterTwo } from './components'

gsap.registerPlugin(ScrollTrigger)

// ----------------------------------------------------------------------

export default function StoryPageView() {
  const [chapterOneDone, setChapterOneDone] = useState(true)
  const [chapterTwoDone, setChapterTwoDone] = useState(true)
  const chapterTwoRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!chapterOneDone) return
    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })
  }, [chapterOneDone])

  useEffect(() => {
    if (!chapterTwoDone) return
    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })
  }, [chapterTwoDone])

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return

    const isProd =
      (typeof import.meta !== 'undefined' && (import.meta as any).env?.PROD) ||
      process.env.NODE_ENV === 'production'

    if (isProd) {
      window.scrollTo(0, 0)
    }
  }, [])

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: "url('/assets/background/honey_pattern.png')",
      }}
    >
      {/* กรอบกลาง */}
      <div className="mx-auto min-h-screen max-w-[1150px] bg-[#f5f5fa] px-4">
        {/* ส่ง onComplete ให้ ChapterOne */}
        <ChapterOne onComplete={() => setChapterOneDone(true)} />

        {/* เงื่อนไข render ChapterTwo — จะไม่ mount จนกว่า chapterOneDone === true */}
        {chapterOneDone && (
          <div
            id="chapter-two"
            ref={chapterTwoRef}
            className="animate-in fade-in duration-700"
            aria-hidden={!chapterOneDone}
          >
            <ChapterTwo onComplete={() => setChapterTwoDone(true)} />
          </div>
        )}
        {chapterTwoDone && <ChapterThree />}
      </div>
      <ScrollHint />
    </div>
  )
}
