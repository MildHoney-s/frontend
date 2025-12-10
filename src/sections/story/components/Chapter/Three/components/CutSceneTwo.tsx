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
  const textRef = useRef<HTMLParagraphElement>(null) // 1. เพิ่ม Ref สำหรับข้อความ

  const bgPath = '/assets/part3/cutscene/Cutscene_2.png'
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
          onLeave: () => {
            if (onComplete) onComplete()
          },
        },
      })

      // --- Animation Sequence ---

      // 1. SET: ตั้งค่าเริ่มต้น ภาพ (Zoom 2, มืด) และ ข้อความ (ซ่อน, อยู่ต่ำกว่าปกติ)
      tl.set(imageWrapperRef.current, {
        scale: 2.1,
        xPercent: 5, 
        yPercent: 0,
        autoAlpha: 0, 
        boxShadow: 'none', 
        transformOrigin: 'center center',
      })
      .set(textRef.current, { // ตั้งค่าเริ่มต้นข้อความ
        autoAlpha: 0, 
        y: 30 
      })

        // 2. FADE IN IMAGE: ภาพค่อยๆ สว่างขึ้นมา
        .to(imageWrapperRef.current, {
          autoAlpha: 1,
          duration: 1.5,
          ease: 'power1.inOut',
        })

        // 3. ZOOM OUT IMAGE: ซูมออกกลับมาตรงกลาง
        .to(imageWrapperRef.current, {
          scale: 1,
          xPercent: 0, 
          yPercent: 0,
          boxShadow: finalShadow,
          duration: 2,
          ease: 'power1.inOut',
        })

        // 4. SHOW TEXT: ขึ้นข้อความมาพร้อมๆ กับช่วงที่กำลังซูมออก
        // '<+=0.5' หมายถึง เริ่มหลังจาก Zoom Out เริ่มไปแล้ว 0.5 วิ (ให้ภาพขยับก่อนนิดนึงแล้วตัวหนังสือค่อยมา)
        .to(textRef.current, {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: 'back.out(1.7)', // เด้งนิดๆ ให้ดูมีชีวิตชีวา
        }, '<+=0.5') 

    }, containerRef)

    return () => ctx.revert()
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black font-sans"
    >
      {/* Background Image */}
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

      {/* Subtitle Layer */}
      <div className="absolute bottom-[10%] left-0 z-20 w-full text-center px-4">
        <p 
          ref={textRef} 
          className="text-white text-xl md:text-3xl font-bold drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] tracking-wide"
        >
          ขอบคุณสำหรับทุกอย่างนะ ฮันนี่~
        </p>
      </div>

    </div>
  )
}