import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useLayoutEffect, useRef } from 'react'

// ลงทะเบียน Plugin
gsap.registerPlugin(ScrollTrigger)

export default function BattleComponentFour() {
  const containerRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  // เปลี่ยน Path ตามไฟล์ภาพที่คุณต้องการ (เช่น bg_colosseum_night_2.png)
  const bgPath = '/assets/part3/BG/bg_colosseum_night_2.png'

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=300%',
          scrub: 1,
          pin: true,
        },
      })

      // --- Animation Sequence ---

      // 1. SET: เริ่มต้น Zoom 2 เท่า ที่ตำแหน่ง "ขวาบน" (Top-Right)
      // xPercent: -25 = ดันรูปไปทางซ้าย เพื่อให้เห็นขอบ "ขวา"
      // yPercent: 25  = ดันรูปไปข้างล่าง เพื่อให้เห็นขอบ "บน"
      tl.set(bgRef.current, {
        scale: 2,
        xPercent: -25,
        yPercent: 25,
        transformOrigin: 'center center',
      })

        // 2. Scroll ช่วงแรก: แพนไปหา "ซ้ายล่าง" (Bottom-Left)
        // xPercent: 25  = ดันรูปไปทางขวา เพื่อให้เห็นขอบ "ซ้าย"
        // yPercent: -25 = ดันรูปไปข้างบน เพื่อให้เห็นขอบ "ล่าง"
        .to(bgRef.current, {
          xPercent: 25,
          yPercent: -25,
          ease: 'none',
        })

        // 3. Scroll ช่วงหลัง: ซูมออกกลับมาตรงกลาง
        .to(bgRef.current, {
          scale: 1,
          xPercent: 0,
          yPercent: 0,
          ease: 'power1.inOut',
        })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage: `url('${bgPath}')`,
        }}
      />

      {/* Overlay Text */}
      <div className="pointer-events-none relative z-10 flex h-full w-full items-center justify-center">
        {/* Debug Text
        <h2 className="rounded bg-black/50 p-4 text-2xl text-white">
           Scene 4: Top-Right to Bottom-Left
        </h2> 
        */}
      </div>
    </div>
  )
}
