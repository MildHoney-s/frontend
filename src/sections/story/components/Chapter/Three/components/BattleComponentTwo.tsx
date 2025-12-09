import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useLayoutEffect, useRef } from 'react'

// ลงทะเบียน Plugin
gsap.registerPlugin(ScrollTrigger)

export default function BattleComponentTwo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  const bgPath = '/assets/part3/BG/bg_colosseum_day.png'

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current, // พื้นที่ที่จะใช้คำนวณ Scroll
          start: 'top top', // เริ่มเมื่อขอบบนของ Component ชนขอบบนจอ
          end: '+=300%', // ความยาวในการไถ (3 เท่าของหน้าจอ = ไถยาวๆ เพื่อให้ภาพค่อยๆ ขยับ)
          scrub: 1, // ความสมูท (1 วินาที delay เล็กน้อยให้นุ่มนวล)
          pin: true, // ตรึงภาพไว้ไม่ให้เลื่อนหายไปไหน จนกว่า Animation จะจบ
          // markers: true,              // เปิดตัวนี้ถ้าอยากเห็นเส้น Debug (เอาออกเมื่อเสร็จ)
        },
      })

      // --- Animation Sequence ---

      // 1. SET: เริ่มต้น Zoom 2 เท่า  แพนไปมุมขวาล่าง
      tl.set(bgRef.current, {
        scale: 2,
        xPercent: -25, // ขอบซ้ายชน
        yPercent: -25, // ขอบบนชน
      })

        // 2. Scroll ช่วงแรก: ที่มุมซ้ายบน
        .to(bgRef.current, {
          xPercent: 25, // ขอบขวาชน
          yPercent: 25, // ขอบล่างชน
          ease: 'none', // ปิด Ease เพื่อให้ขยับตามนิ้วเป๊ะๆ
        })

        // 3. Scroll ช่วงหลัง: ซูมออกกลับมาตรงกลาง
        .to(bgRef.current, {
          scale: 1,
          xPercent: 0,
          yPercent: 0,
          ease: 'none',
        })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    // กำหนดความสูงหลอกๆ ไว้ใน ScrollTrigger (ผ่าน end: '+=300%')
    // แต่ตัว Container จริงๆ ให้เป็น h-screen เพื่อเต็มจอ
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

      {/* Overlay Text (จะแสดงตลอดเวลา หรือจะใส่ Animation แยกก็ได้) */}
      <div className="pointer-events-none relative z-10 flex h-full w-full items-center justify-center">
        <h2 className="rounded bg-black/50 p-4 text-2xl text-white">
          Scroll Down to Explore
        </h2>
      </div>
    </div>
  )
}
