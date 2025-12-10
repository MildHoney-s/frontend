import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useLayoutEffect, useRef } from 'react'

// ลงทะเบียน Plugin
gsap.registerPlugin(ScrollTrigger)

export default function BattleComponentOne() {
  const containerRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  const bgPath = '/assets/part3/BG/bg_colosseum_day.png'

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // =========================================
      // 0. PREPARE MAGIC ANIMATION & IDLE
      // =========================================
      
      // ฟังก์ชันเริ่มลอยตัว (Idle)
      const startMagicIdle = () => {
        gsap.to('.magic-dr-Skull', { y: -15, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut', overwrite: 'auto' })
        gsap.to('.magic-dr-arm-l', { y: -10, rotation: 3, duration: 2.5, repeat: -1, yoyo: true, ease: 'sine.inOut', overwrite: 'auto' })
        gsap.to('.magic-dr-arm-r', { y: -8, rotation: -3, duration: 2.8, repeat: -1, yoyo: true, ease: 'sine.inOut', overwrite: 'auto' })
      }

      // ฟังก์ชันหยุดลอยตัว (Stop Idle) - เรียกเมื่อไถย้อนกลับ
      const stopMagicIdle = () => {
        gsap.killTweensOf(['.magic-dr-Skull', '.magic-dr-arm-l', '.magic-dr-arm-r']);
      }

      // เริ่มหมุนวงเวทย์รอไว้เลย (หมุนตลอดเวลาไม่เกี่ยวกับ Scroll)
      gsap.to('.magic-dr-ciecle-l', { rotation: 360, duration: 12, repeat: -1, ease: 'linear', transformOrigin: 'center center' })
      gsap.to('.magic-dr-ciecle-r', { rotation: -360, duration: 15, repeat: -1, ease: 'linear', transformOrigin: 'center center' })

      // สร้าง Timeline ย่อยสำหรับ Magic Entrance
      const magicEntrance = gsap.timeline({
        onComplete: startMagicIdle,        // จบแล้วเริ่มลอย
        onReverseComplete: stopMagicIdle,  // ถอยกลับจุดเริ่มต้นให้หยุดลอย
        onUpdate: () => {
           // เช็คทิศทาง ถ้ากำลังถอยหลัง (Reversing) ให้หยุด Idle ทันทีเพื่อไม่ให้ตีกับ Scrub
           if (magicEntrance.reversed()) {
             stopMagicIdle();
           }
        }
      })

      magicEntrance
        // 1. วงเวทย์ขยาย
        .fromTo(['.magic-dr-ciecle-l', '.magic-dr-ciecle-r'], 
          { scale: 0, autoAlpha: 0 }, 
          { scale: 1, autoAlpha: 1, duration: 1.5, ease: 'back.out(1.2)', transformOrigin: 'center center' }
        )
        // 2. กะโหลก (พุ่ง + หมุนตามเข็ม 45 องศา)
        .fromTo('.magic-dr-Skull', 
          { x: -100, y: -100, autoAlpha: 0, scale: 0.5, rotation: -45 },
          { x: 0, y: 0, autoAlpha: 1, scale: 1, rotation: 0, duration: 1, ease: 'power2.out' }, 
          "-=1"
        )
        // 3. กระดูกลอยขึ้น
        .fromTo(['.magic-dr-arm-l', '.magic-dr-arm-r'], 
          { y: 50, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1, stagger: 0.2, ease: 'power2.out' }, 
          "-=0.5"
        )

      // =========================================
      // 1. SCROLL ANIMATION (Main Trigger)
      // =========================================
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=500%', 
          scrub: 1,      // ✅ Scrub = 1 ทำให้ Animation เล่นไป/กลับ ตามนิ้ว
          pin: true,
        },
      })

      tl.set(bgRef.current, { scale: 2, xPercent: 25, yPercent: 25 })
        // Phase 1: Pan & Zoom Out
        .to(bgRef.current, { xPercent: -25, yPercent: -25, ease: 'none', duration: 1 })
        .to(bgRef.current, { scale: 1, xPercent: 0, yPercent: 0, ease: 'none', duration: 1 })
        
        // Phase 2: Magic Entrance (นำ Timeline ย่อยมาใส่ใน Timeline หลัก)
        // เมื่อไถลงจะเล่น magicEntrance / เมื่อไถขึ้นจะเล่น magicEntrance ย้อนหลัง
        .add(magicEntrance) 

        // Phase 3: Lock Screen (Hold)
        // เพิ่มช่วงว่างให้ไถค้างไว้ดู Effect สักพัก
        .to({}, { duration: 2 }) 

      // =========================================
      // 2. IDLE ANIMATION (Characters) - Loop ตลอด
      // =========================================
      gsap.to('.dr-arm-l', { rotation: 1, duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut', transformOrigin: 'top right' })
      gsap.to('.dr-arm-r', { rotation: -1, duration: 2.2, repeat: -1, yoyo: true, ease: 'sine.inOut', transformOrigin: 'top left' })
      gsap.to('.dr-head-group', { y: 2, rotation: 1, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut', transformOrigin: 'bottom center' })
      
      const drBlinkTl = gsap.timeline({ repeat: -1, repeatDelay: 3 })
      drBlinkTl.to('.dr-eye-close', { autoAlpha: 1, duration: 0.1 }).to('.dr-eye-close', { autoAlpha: 0, duration: 0.1, delay: 0.1 })

      gsap.to('.Mild-arm-l', { rotation: 2, duration: 2.5, repeat: -1, yoyo: true, ease: 'sine.inOut', transformOrigin: 'top right' })
      gsap.to('.Mild-hair', { rotation: 1, y: 1, duration: 2.8, repeat: -1, yoyo: true, ease: 'sine.inOut', transformOrigin: 'top center' })
      
      const mildBlinkTl = gsap.timeline({ repeat: -1, repeatDelay: 4 })
      mildBlinkTl.to('.Mild-eye-close', { autoAlpha: 1, duration: 0.1 }).to('.Mild-eye-close', { autoAlpha: 0, duration: 0.1, delay: 0.1 })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black">
      <div ref={bgRef} className="absolute inset-0 h-full w-full will-change-transform">
        <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${bgPath}')` }} />

        {/* 2. Dr.Gamer */}
        <div className="absolute top-[25%] left-[7%] z-20 h-[500px] w-[320px] md:h-[750px] md:w-[500px]">
          <div className="relative h-full w-full">
            <img src="/assets/part3/Character/Battle/Dr_Gamer/Pose/Dr_Gamer_L_Arm.png" className="dr-arm-l absolute left-0 top-0 z-20 w-full" alt="L Arm" />
            <img src="/assets/part3/Character/Battle/Dr_Gamer/Pose/Dr_Gamer_R_Arm.png" className="dr-arm-r absolute left-0 top-0 z-20 w-full" alt="R Arm" />
            <img src="/assets/part3/Character/Battle/Dr_Gamer/Pose/Dr_Gamer_Body.png" className="absolute left-0 top-0 z-10 w-full" alt="Body" />
            <div className="dr-head-group absolute left-0 top-[1%] z-30 w-full">
              <img src="/assets/part3/Character/Battle/Dr_Gamer/Pose/Dr_Gamer_head_op.png" className="w-full object-contain" alt="Eye Open" />
              <img src="/assets/part3/Character/Battle/Dr_Gamer/Pose/Dr_Gamer_head_cl.png" className="dr-eye-close absolute left-0 top-0 w-full object-contain opacity-0" alt="Eye Close" />
            </div>
          </div>
        </div>

        {/* 3. Mild */}
        <div className="absolute bottom-[-6%] right-[9%] z-20 h-[500px] w-[320px] md:h-[750px] md:w-[500px]">
          <div className="relative h-full w-full">
            <img src="/assets/part3/Character/Battle/Mild/Pose1/Mild_R_1_Arm.png" className="Mild-arm-l absolute left-0 top-0 z-20 w-full" alt="L Arm" />
            <img src="/assets/part3/Character/Battle/Mild/Pose1/Mild_R_1_hair.png" className="Mild-hair absolute left-0 top-0 z-10 w-full" alt="Hair" />
            <div className="absolute left-0 top-[1%] z-30 w-full">
              <img src="/assets/part3/Character/Battle/Mild/Pose1/Mild_R_1_Body_op.png" className="w-full object-contain" alt="Eye Open" />
              <img src="/assets/part3/Character/Battle/Mild/Pose1/Mild_R_1_Body_cl.png" className="Mild-eye-close absolute left-0 top-0 w-full object-contain opacity-0" alt="Eye Close" />
            </div>
          </div>
        </div>

        {/* 4. Dr.Gamer [Magic] */}
        <div className="absolute top-[15%] left-[0%] z-20 h-[1300px] w-[1300px]">
          <div className="relative h-full w-full">
            
            {/* Left Elements */}
            <img src="/assets/part3/Character/Battle/Dr_Gamer/Magic/R_circle.png" className="magic-dr-ciecle-l absolute left-[36%] top-[12%] z-10 w-[200px]" alt="L circle" />
            <div className="absolute left-[4%] top-[3%] w-full h-full pointer-events-none">
               <img src="/assets/part3/Character/Battle/Dr_Gamer/Magic/L_bone.png" className="magic-dr-arm-l absolute left-0 top-0 z-20 w-full" alt="L Bone" />
            </div>

            {/* Right Elements */}
            <img src="/assets/part3/Character/Battle/Dr_Gamer/Magic/R_circle.png" className="magic-dr-ciecle-r absolute left-[6%] bottom-[35%] z-10 w-[300px]" alt="R circle" />
            <div className="absolute w-full left-[5%] bottom-[13%] h-full pointer-events-none">
               <img src="/assets/part3/Character/Battle/Dr_Gamer/Magic/R_bone.png" className="magic-dr-arm-r absolute left-0 bottom-0 z-20 w-full" alt="R Bone" />
            </div>

            {/* Skull (Center) */}
            <img src="/assets/part3/Character/Battle/Dr_Gamer/Magic/Skull.png" className="magic-dr-Skull absolute left-[0%] top-[0%] z-10  w-[400px]" alt="head" />

          </div>
        </div>

      </div>
    </div>
  )
}