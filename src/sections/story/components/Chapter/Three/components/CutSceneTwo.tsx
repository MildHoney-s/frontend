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
  const textRef = useRef<HTMLParagraphElement>(null)
  const finTextRef = useRef<HTMLHeadingElement>(null) // [NEW] Ref สำหรับคำว่า Fin

  // ใช้ Ref เก็บ onComplete เพื่อไม่ต้องใส่ใน dependency array
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  const bgPath = '/assets/part3/cutscene/Cutscene_2.png'
  const finalShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.5)'

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          // [ปรับเพิ่ม] เพิ่มระยะไถอีกนิด เพื่อให้มีที่ว่างสำหรับ animation ตอนจบ
          end: '+=600%',
          scrub: 1,
          pin: true,
          onLeave: () => {
            if (onCompleteRef.current) onCompleteRef.current()
          },
        },
      })

      // --- Animation Sequence ---

      // 1. SET Initial State
      tl.fromTo(
        imageWrapperRef.current,
        {
          scale: 2.1,
          xPercent: 5,
          yPercent: 0,
          autoAlpha: 0,
          boxShadow: 'none',
          transformOrigin: 'center center',
        },
        {
          autoAlpha: 1,
          duration: 1.5,
          ease: 'power1.inOut',
        }
      )
      
      // 2. MAIN ZOOM OUT
      .to(imageWrapperRef.current, {
        scale: 1.2, 
        xPercent: 0,
        yPercent: 0,
        boxShadow: finalShadow,
        duration: 2,
        ease: 'power1.inOut',
      })

      // 3. SHOW TEXT
      .fromTo(
        textRef.current,
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: 'back.out(1.7)',
        },
        '<+=0.5'
      )

      // 4. SLOW ZOOM OUT
      .to(imageWrapperRef.current, {
        scale: 1,
        duration: 3,
        ease: 'none',
      }, '<')

      // 5. [NEW] FIN ANIMATION: ขึ้นคำว่า Fin ตอนท้ายสุด
      // เริ่มหลังจาก slow zoom จบลง (>)
      .fromTo(finTextRef.current,
        { autoAlpha: 0, scale: 0.8, rotation: -5 },
        {
          autoAlpha: 1,
          scale: 1,
          rotation: 0,
          duration: 1.5,
          ease: 'power2.out'
        },
        '>-=0.5' // เริ่มก่อนจบ zoom นิดนึง เพื่อความต่อเนื่อง
      )
      // เพิ่มช่วง hold ตอนท้ายสุดอีกนิดก่อนจะ onLeave
      .to({}, { duration: 1 })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black font-sans"
    >
      {/* Background Image */}
      <div
        ref={imageWrapperRef}
        className="aspect-video max-h-screen w-full will-change-transform opacity-0"
        style={{
          backgroundImage: `url('${bgPath}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Subtitle Layer */}
      <div className="absolute bottom-[10%] left-0 z-20 w-full px-4 text-center">
        <p
          ref={textRef}
          className="text-xl font-bold tracking-wide text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] opacity-0 md:text-3xl"
        >
          ขอบคุณสำหรับทุกอย่างนะ ฮันนี่~
        </p>
      </div>

      {/* [NEW] Fin Layer (Bottom Right) */}
      <div className="absolute bottom-4 right-8 z-30 p-4 md:bottom-8 md:right-12">
        <h2
          ref={finTextRef}
          className="font-serif text-5xl font-bold italic tracking-wider text-yellow-500 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] opacity-0 md:text-7xl"
        >
          End
        </h2>
      </div>
    </div>
  )
}