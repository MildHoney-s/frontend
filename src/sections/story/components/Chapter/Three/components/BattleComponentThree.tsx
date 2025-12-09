import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useLayoutEffect, useRef } from 'react'

// ลงทะเบียน Plugin
gsap.registerPlugin(ScrollTrigger)

export default function BattleComponentThree() {
  const containerRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  const bgPath = '/assets/part3/BG/bg_colosseum_night.png'

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

      // 1. SET: เริ่มต้น Zoom 2 เท่า ที่ตำแหน่ง "กลางบน"
      // xPercent: 0 = อยู่กลางแนวนอน
      // yPercent: 25 = ดันรูปไปข้างล่าง เพื่อให้เราเห็นขอบด้าน "บน"
      tl.set(bgRef.current, {
        scale: 2,
        xPercent: 0,
        yPercent: 25,
        transformOrigin: 'center center',
      })

        // 2. Scroll ช่วงแรก: แพนไปหา "กลางล่าง"
        // yPercent: -25 = ดันรูปไปข้างบน เพื่อให้เราเห็นขอบด้าน "ล่าง"
        .to(bgRef.current, {
          yPercent: -25,
          ease: 'none',
        })

        // 3. Scroll ช่วงหลัง: ซูมออกกลับมาตรงกลาง
        .to(bgRef.current, {
          scale: 1,
          xPercent: 0, // ย้ำค่าเดิม
          yPercent: 0, // กลับมาตรงกลาง
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
        {/* <h2 className="rounded bg-black/50 p-4 text-2xl text-white">
           Scene 3: Top to Bottom
        </h2> */}
      </div>
    </div>
  )
}
