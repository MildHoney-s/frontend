import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  onComplete?: () => void
}

export default function InColosseumBehind({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  // เพิ่ม ref สำหรับตัว Background เพื่อความแม่นยำในการจับ Element
  const bgRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // =========================================
      // 1. SETUP: เริ่มต้นที่ "ซูมซ้ายล่าง"
      // =========================================
      gsap.set(bgRef.current, {
        scale: 2, // ซูม 2 เท่า
        xPercent: 25, // ดันรูปไปทางขวา 25% (เพื่อให้เราเห็นขอบ "ซ้าย")
        yPercent: -50, // ดันรูปขึ้นบน 25% (เพื่อให้เราเห็นขอบ "ล่าง")
        transformOrigin: 'center center',
      })

      // =========================================
      // 2. ANIMATION: ค่อยๆ ซูมออกกลับมาตรงกลาง
      // =========================================
      gsap.to(bgRef.current, {
        scale: 1, // กลับมาขนาดปกติ
        xPercent: 0, // กลับมาตรงกลางแกน X
        yPercent: 0, // กลับมาตรงกลางแกน Y
        ease: 'none', // ใช้ none เพื่อให้ขยับตามนิ้วเป๊ะๆ (หรือใช้ power1.inOut ถ้าอยากให้นุ่มตอนจบ)
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom', // ระยะทางในการไถจนจบ
          scrub: 1, // หน่วงเวลา 1 วินาทีให้นุ่มนวล
        },
      })

      // Trigger จบ Scene
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'bottom bottom',
        onEnter: () => {
          if (onComplete) onComplete()
        },
      })
    }, containerRef)
    return () => ctx.revert()
  }, [onComplete])

  return (
    // กำหนดความสูง 200vh เพื่อให้มีระยะไถกล้อง (ยิ่งสูง ยิ่งซูมออกช้า)
    <div ref={containerRef} className="relative h-[200vh] w-full bg-black">
      <div className="sticky left-0 top-0 h-screen w-full overflow-hidden font-sans">
        {/* Background Layer */}
        <div
          ref={bgRef}
          className="colosseum-in-bg absolute inset-0 bg-cover bg-center will-change-transform"
          style={{
            backgroundImage: "url('/assets/part3/BG/bg_colosseum_in.png')",
          }}
        >
          {/* Dark Overlay (Optional) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
        </div>
      </div>
    </div>
  )
}
