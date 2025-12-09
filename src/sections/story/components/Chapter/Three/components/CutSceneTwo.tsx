import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useLayoutEffect, useRef } from 'react'

// ลงทะเบียน Plugin
gsap.registerPlugin(ScrollTrigger)

interface Props {
  onComplete?: () => void
}

export default function CutSceneTwo({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageWrapperRef = useRef<HTMLDivElement>(null)

  const bgPath = '/assets/gallery/OKITAO_art_b.png'
  const finalShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.5)'

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=300%', // ระยะไถ
          scrub: 1,
          pin: true,

          // ✅ เมื่อไถจนจบ Scene ให้เรียก onComplete
          onLeave: () => {
            if (onComplete) onComplete()
          },
        },
      })

      // --- Animation Sequence ---

      // 1. SET: เริ่มต้น Zoom 2 เท่า, เห็นด้านซ้าย, มืดสนิท, ไม่มีเงา
      tl.set(imageWrapperRef.current, {
        scale: 2,
        xPercent: 25, // เริ่มโดยเห็นด้านซ้าย (เพื่อให้ต่างจาก Scene ก่อน)
        yPercent: 0,
        autoAlpha: 0, // เริ่มต้นแบบมืด
        boxShadow: 'none', // ปิดเงา
        transformOrigin: 'center center',
      })

        // 2. FADE IN: ค่อยๆ สว่างขึ้นมาก่อน (ยัง Zoom ค้างไว้)
        .to(imageWrapperRef.current, {
          autoAlpha: 1,
          duration: 1.5,
          ease: 'power1.inOut',
        })

        // 3. ZOOM OUT: ซูมออกกลับมาตรงกลาง + ใส่เงา -> จบ Scene
        .to(imageWrapperRef.current, {
          scale: 1,
          xPercent: 0, // กลับมาตรงกลาง
          yPercent: 0,
          boxShadow: finalShadow, // คืนเงาให้ตอนจบ
          duration: 2,
          ease: 'power1.inOut',
        })
    }, containerRef)

    return () => ctx.revert()
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black"
    >
      <div
        ref={imageWrapperRef}
        className="aspect-video max-h-screen w-full will-change-transform"
        style={{
          backgroundImage: `url('${bgPath}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
    </div>
  )
}
