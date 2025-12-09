import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useLayoutEffect, useRef } from 'react'

// ลงทะเบียน Plugin
gsap.registerPlugin(ScrollTrigger)

export default function CutSceneOne() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageWrapperRef = useRef<HTMLDivElement>(null)

  const bgPath = '/assets/gallery/OKITAO_art_a.png'

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=400%',
          scrub: 1,
          pin: true,
        },
      })

      // --- Animation Sequence ---

      // 1. SET: เริ่มต้น Zoom 2 เท่า, จัดตำแหน่ง และ "ซ่อนภาพ"
      tl.set(imageWrapperRef.current, {
        scale: 2,
        xPercent: -50,
        yPercent: 0,
        autoAlpha: 0,
        transformOrigin: 'center center',
        // ✅ เพิ่ม: ปิด Shadow ในระดับ GSAP ด้วยเพื่อความชัวร์ (ถ้ามี)
        boxShadow: 'none',
      })

        // 2. PAN & FADE IN: เลื่อนไปซ้าย + ค่อยๆ สว่างขึ้น
        .to(imageWrapperRef.current, {
          xPercent: -25,
          autoAlpha: 1,
          ease: 'power1.inOut',
        })

        // 2. PAN & FADE IN: เลื่อนไปซ้าย + ค่อยๆ สว่างขึ้น
        .to(imageWrapperRef.current, {
          xPercent: 50,
          ease: 'power1.inOut',
        })

        // 3. PAN: เลื่อนกลับไปขวา
        .to(imageWrapperRef.current, {
          xPercent: -25,
          ease: 'none',
        })

        // 5. ZOOM OUT: ซูมออกตรงกลาง
        .to(imageWrapperRef.current, {
          scale: 1,
          xPercent: 0,
          yPercent: 0,
          ease: 'power1.inOut',
        })

        // 4. PAN: เลื่อนไปซ้ายอีกรอบ
        .to(imageWrapperRef.current, {
          scale: 2,
          xPercent: 50,
          ease: 'power1.inOut',
        })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black"
    >
      <div
        ref={imageWrapperRef}
        // ✅ เอา shadow-2xl ออก เพื่อไม่ให้กระทบกับ Set 1 และเพื่อให้ภาพเนียนไปกับพื้นหลัง
        className="aspect-video max-h-screen w-full will-change-transform"
        style={{
          backgroundImage: `url('${bgPath}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
        {/* Overlay Content */}
      </div>
    </div>
  )
}
