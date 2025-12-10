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

      // =============================
      // 1. Blink Loops
      // =============================
      let harukiBlinkTween: gsap.core.Timeline | null = null
      let mildBlinkTween: gsap.core.Timeline | null = null

      const startBlinking = () => {
        // Haruki Blink
        harukiBlinkTween = gsap.timeline({ repeat: -1, repeatDelay: 3.5, delay: 0.5 })
        harukiBlinkTween.to('.haruki-eye-close', { autoAlpha: 1, duration: 0.1 })
          .to('.haruki-eye-close', { autoAlpha: 0, duration: 0.1, delay: 0.1 })

        // Mild Blink
        mildBlinkTween = gsap.timeline({ repeat: -1, repeatDelay: 4, delay: 2 })
        mildBlinkTween.to('.mild-eye-close', { autoAlpha: 1, duration: 0.1 })
          .to('.mild-eye-close', { autoAlpha: 0, duration: 0.1, delay: 0.1 })
      }

      startBlinking()

      // =============================
      // 2. Idle Animation
      // =============================
      const idleTween = gsap.timeline({ repeat: -1 })
      idleTween
        // Haruki Idle (ลอยๆ แบบเวทมนตร์)
        .to('.haruki-arm-l', { rotation: 3, duration: 2, yoyo: true, repeat: -1, transformOrigin: 'top right', ease: 'sine.inOut' })
        .to('.haruki-arm-r', { rotation: -3, duration: 2.2, yoyo: true, repeat: -1, transformOrigin: 'top left', ease: 'sine.inOut' }, 0)
        .to('.haruki-head-group', { y: 3, duration: 2.5, yoyo: true, repeat: -1, ease: 'sine.inOut' }, 0)

        // Mild Idle (Pose 3 น่าจะนั่งหรือยืนนิ่งๆ ขยับน้อยกว่า)
        .to('.mild-head-group', { y: 2, rotation: 1, duration: 3, yoyo: true, repeat: -1, transformOrigin: 'bottom center', ease: 'sine.inOut' }, 0)

      // =============================
      // 3. Scroll Timeline
      // =============================
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=500%', // เพิ่มความยาวเพื่อให้ scroll ได้ smooth ขึ้น
          scrub: 1,
          pin: true,
        }
      })

      // Phase 1: Background Zoom + Pan
      // เริ่มจากซูมที่ตรงกลาง แล้วแพนลงมาหาตัวละคร
      tl.set(bgRef.current, { scale: 2, xPercent: 0, yPercent: 25, transformOrigin: 'center center' })
        .to(bgRef.current, { yPercent: -10, ease: 'none', duration: 1 }) // แพนขึ้นไปหา Haruki
        .to(bgRef.current, { scale: 1, xPercent: 0, yPercent: 0, ease: 'none', duration: 1 }) // ซูมออกเห็นภาพรวม

      // Phase 2: Magic Entrance
      tl.fromTo(['.magic-haruki-group'],
        { scale: 0, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 1.5, ease: 'back.out(1.2)' })

      // Phase 3: Attack Sequence (Haruki Attacks Mild)
      const attackTimeline = gsap.timeline()
      const magicEl = '.magic-bean' // ลูกถั่ว
      const magicCircle = '.magic-circle' // วงเวทย์
      
      // Haruki อยู่บน Mild อยู่ล่าง -> โจมตีลงแกน Y เป็นหลัก
      const target = { x: 0, y: 400 } 

      for (let i = 0; i < 3; i++) {
        const cycleLabel = `cycle${i}`
        
        // หมุนวงเวทย์เร็วขึ้นตอนยิง
        attackTimeline.to(magicCircle, { rotation: '+=360', duration: 0.5, ease: 'power1.in' }, cycleLabel)

        // ยิงถั่ว
        attackTimeline.to(magicEl, { x: target.x, y: target.y, scale: 1.5, duration: 0.6, ease: 'power2.in' }, cycleLabel)

        // Flash Effect
        attackTimeline.call(() => gsap.fromTo('.white-flash', { opacity: 0.8 }, { opacity: 0, duration: 0.3 }))

        // ถั่วกลับที่เดิม (รีเซ็ตเพื่อยิงใหม่)
        attackTimeline.to(magicEl, { x: 0, y: 0, scale: 1, duration: 0.1, autoAlpha: 0 }, `+=${0.1}`)
        attackTimeline.to(magicEl, { autoAlpha: 1, duration: 0.2 })
      }
      tl.add(attackTimeline)

      // =============================
      // ✅ Phase 4: Defeat Haruki (สมมติว่า Haruki แพ้)
      // =============================
      tl.to('.haruki-container', { 
        rotation: 15, // เซเล็กน้อย
        yPercent: 20, // ตกลงมา
        opacity: 0.5, // จางลง
        ease: 'power2.inOut', 
        duration: 2,
        
        // Logic จัดการตาตอนแพ้
        onComplete: () => {
          harukiBlinkTween?.pause()
          gsap.set('.haruki-eye-open', { autoAlpha: 0 })
          gsap.set('.haruki-eye-close', { autoAlpha: 1 })
        },
        onReverseComplete: () => {
          harukiBlinkTween?.resume()
          gsap.set('.haruki-eye-open', { autoAlpha: 1 })
          gsap.set('.haruki-eye-close', { autoAlpha: 0 })
        }
      })

      // Phase 5: Victory Zoom Mild (คนชนะ)
      tl.to(bgRef.current, { scale: 1.8, xPercent: 10, yPercent: 20, transformOrigin: 'center center', duration: 3, ease: 'power2.inOut' })

      // Phase 6: Announcement Boxes
      tl.fromTo('.narration-final-1', { autoAlpha: 0, scale: 0.8 }, { autoAlpha: 1, scale: 0.8, duration: 1.5, ease: 'back.out(1.7)' }, '+=1')
        .to('.narration-final-1', { autoAlpha: 0, duration: 1 }, '+=3.5')
        .fromTo('.narration-final-2a', { autoAlpha: 0, scale: 0.8 }, { autoAlpha: 1, scale: 0.8, duration: 1.5, ease: 'back.out(1.7)' }, '+=4.5')
        .to({}, { duration: 3 })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Background Wrapper */}
      <div
        ref={bgRef}
        className="absolute inset-0 h-full w-full will-change-transform origin-center"
      >
        {/* BG Image Layer */}
        <div 
            className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${bgPath}')` }}
        />

        {/* 2. HARUKI (Zayzhik เดิม) */}
        {/* แก้ไข Path \ เป็น / และเปลี่ยนชื่อ Class */}
        <div className="haruki-container absolute top-[15%] left-[30%] z-20 h-[500px] w-[320px] md:h-[750px] md:w-[500px]">
          <div className="relative h-full w-full">
            <img src="/assets/part3/Character/Battle/Haruki/Pose/Haruki_arm_l.png" className="haruki-arm-l absolute left-0 top-[2%] z-30 w-full" alt="L Arm" />
            <img src="/assets/part3/Character/Battle/Haruki/Pose/Haruki_arm_r.png" className="haruki-arm-r absolute left-0 top-[2%] z-10 w-full" alt="R Arm" />
            <div className="haruki-head-group absolute left-0 top-[1%] z-20 w-full">
              <img src="/assets/part3/Character/Battle/Haruki/Pose/Haruki_body_op.png" className="haruki-eye-open w-full object-contain" alt="Eye Open" />
              <img src="/assets/part3/Character/Battle/Haruki/Pose/Haruki_body_cl.png" className="haruki-eye-close absolute left-0 top-0 w-full object-contain opacity-0" alt="Eye Close" />
            </div>
          </div>
        </div>

        {/* 3. MILD */}
        {/* จัดระเบียบ Layer และ Class */}
        <div className="mild-gamer-container absolute bottom-[-10%] left-[30%] z-20 h-[500px] w-[320px] md:h-[750px] md:w-[500px]">
          <div className="relative h-full w-full">
            {/* Leg น่าจะอยู่ล่างสุด */}
            <img src="/assets/part3/Character/Battle/Mild/Pose3/Mild_R_3_leg.png" className="absolute left-0 top-0 z-10 w-full" alt="Legs" />
            
            {/* Head/Hood Group */}
            <div className="mild-head-group absolute left-0 top-0 z-20 w-full">
                <img src="/assets/part3/Character/Battle/Mild/Pose3/Mild_R_3_head.png" className="absolute left-0 top-0 w-full" alt="Head Base" />
                <div className="absolute left-0 top-[1%] w-full">
                    <img src="/assets/part3/Character/Battle/Mild/Pose3/Mild_R_3_hood_1.png" className="mild-eye-open w-full object-contain" alt="Hood Open" />
                    <img src="/assets/part3/Character/Battle/Mild/Pose3/Mild_R_3_hood_2.png" className="mild-eye-close absolute left-0 top-0 w-full object-contain opacity-0" alt="Hood Close" />
                </div>
            </div>
          </div>
        </div>

        {/* 4. MAGIC HARUKI */}
        <div className="pointer-events-none absolute inset-0 z-20">
          <div className="magic-haruki-group absolute top-[15%] left-[30%] opacity-0">
            {/* วงเวทย์หมุนตลอดเวลา */}
            <img src="/assets/part3/Character/Battle/Haruki/Magic/Sun&moon_Circle.png" className="magic-circle w-[350px] animate-spin-slow absolute top-[-50px] left-[-20px]" alt="Magic Circle" />
            {/* เมล็ดกาแฟสำหรับยิง */}
            <img src="/assets/part3/Character/Battle/Haruki/Magic/Coffee_Bean.png" className="magic-bean w-[150px] absolute top-[50px] left-[80px]" alt="Magic Bean" />
          </div>
        </div>

      </div>
      {/* End Background Wrapper */}


      {/* UI / HUD ELEMENTS */}
      <div className="white-flash absolute inset-0 z-50 bg-white opacity-0 mix-blend-overlay pointer-events-none"></div>

      <div className="narration-box narration-final-1 absolute left-1/2 top-1/2 z-40 max-w-xl -translate-x-1/2 -translate-y-1/2 rotate-1 rounded-lg border-8 border-purple-900 bg-white/90 p-8 text-center shadow-2xl shadow-purple-900/50 opacity-0 will-change-transform">
        <p className="font-serif text-3xl font-extrabold leading-tight text-black md:text-4xl">
          การต่อสู้ในยามค่ำคืน
        </p>
        <p className="font-serif text-xl font-bold leading-relaxed text-indigo-800 mt-2 md:text-2xl">
          Haruki ต้านทานไม่ไหว!
        </p>
      </div>

      <div className="narration-box narration-final-2a absolute left-1/2 top-1/2 z-40 max-w-xl -translate-x-1/2 -translate-y-1/2 rotate-[-2deg] rounded-lg border-8 border-pink-700 bg-white/90 p-8 text-center shadow-2xl shadow-pink-900/50 opacity-0 will-change-transform">
        <p className="font-serif text-xl font-bold leading-relaxed text-black md:text-2xl">
          <span className="text-4xl text-pink-600 font-extrabold block mb-2">"มายด์"</span>
          คว้าชัยชนะไปได้อีกครั้ง!
        </p>
      </div>

    </div>
  )
}