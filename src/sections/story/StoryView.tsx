import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'

import { ChapterOne, ChapterTwo } from './components'

gsap.registerPlugin(ScrollTrigger)

export default function StoryPageView() {
  const [chapterOneDone, setChapterOneDone] = useState(false)
  const chapterTwoRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!chapterOneDone) return
    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })
  }, [chapterOneDone])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const scrollToChapterTwo = (smooth = true) => {
    if (!chapterTwoRef.current) return
    chapterTwoRef.current.scrollIntoView({
      behavior: smooth ? 'smooth' : 'auto',
      block: 'start',
    })
  }

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: "url('/assets/background/honey_pattern.png')",
      }}
    >
      {/* กรอบกลาง */}
      <div className="mx-auto min-h-screen max-w-[1150px] bg-[#f5f5fa] px-4 py-8">
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
            <ChapterTwo />
          </div>
        )}
      </div>
    </div>
  )
}
