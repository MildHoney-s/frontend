import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useLayoutEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

export default function BattleComponentTwo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  const bgPath = '/assets/part3/BG/bg_colosseum_day.png'

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // =============================
      // 1. Blink Loops
      // =============================
      let zBlinkTween: gsap.core.Timeline | null = null
      let mildBlinkTween: gsap.core.Timeline | null = null

      const startBlinking = () => {
        // Zayzhik Blink
        zBlinkTween = gsap.timeline({ repeat: -1, repeatDelay: 3, delay: 0.5 })
        zBlinkTween.to('.zz-eye-close', { autoAlpha: 1, duration: 0.1 })
          .to('.zz-eye-close', { autoAlpha: 0, duration: 0.1, delay: 0.1 })

        // Mild Blink
        mildBlinkTween = gsap.timeline({ repeat: -1, repeatDelay: 4, delay: 2 })
        mildBlinkTween.to('.Mild-eye-close', { autoAlpha: 1, duration: 0.1 })
          .to('.Mild-eye-close', { autoAlpha: 0, duration: 0.1, delay: 0.1 })
      }

      startBlinking()

      // =============================
      // 2. Idle Animation
      // =============================
      const idleTween = gsap.timeline({ repeat: -1 })
      idleTween
        .to('.zz-arm-l', { rotation: 1, duration: 2, yoyo: true, repeat: -1, transformOrigin: 'top right', ease: 'sine.inOut' })
        .to('.zz-arm-r', { rotation: -1, duration: 2.2, yoyo: true, repeat: -1, transformOrigin: 'top left', ease: 'sine.inOut' }, 0)
        .to('.zz-head-group', { y: 2, rotation: 1, duration: 3, yoyo: true, repeat: -1, transformOrigin: 'bottom center', ease: 'sine.inOut' }, 0)

        .to('.Mild-arm-l', { rotation: 2, duration: 2.5, yoyo: true, repeat: -1, transformOrigin: 'top right', ease: 'sine.inOut' }, 0)
        .to('.Mild-arm-r', { rotation: -2, duration: 2.5, yoyo: true, repeat: -1, transformOrigin: 'top left', ease: 'sine.inOut' }, 0)
        .to('.Mild-hair-f-l, .Mild-hair-f-r, .Mild-hair-b-l, .Mild-hair-b-r', { y: 1, rotation: 1, duration: 2.8, yoyo: true, repeat: -1, transformOrigin: 'top center', ease: 'sine.inOut' }, 0)

      // =============================
      // 3. Scroll Timeline
      // =============================
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=500%',
          scrub: 1,
          pin: true,
        }
      })

      // Phase 1: Background Zoom + Pan
      tl.set(bgRef.current, { scale: 2, xPercent: -25, yPercent: -25 })
        .to(bgRef.current, { xPercent: 25, yPercent: 25, ease: 'none', duration: 1 })
        .to(bgRef.current, { scale: 1, xPercent: 0, yPercent: 0, ease: 'none', duration: 1 })

      // Phase 2: Magic Entrance
      tl.fromTo(['.magic-zayzhik-circle', '.magic-panda1', '.magic-panda2'],
        { scale: 0, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 1.5, ease: 'back.out(1.2)', stagger: 0.2 })

      // Phase 3: Mild Attack Loop
      const attackTimeline = gsap.timeline()
      const magicEls = ['.magic-panda1', '.magic-panda2']

      // ✅ แก้พิกัด: Mild อยู่ซ้าย ตีไปขวา (X ต้องเป็นบวก) และตีลงหา Zayzhik ที่อยู่ล่าง (Y ต้องเป็นบวก)
      const targets = [{ x: 600, y: 300 }, { x: 700, y: 400 }]

      for (let i = 0; i < 3; i++) {
        const cycleLabel = `cycle${i}`
        magicEls.forEach((el, idx) => {
          attackTimeline.to(el, { x: targets[idx].x, y: targets[idx].y, duration: 0.8, ease: 'power2.in' }, cycleLabel)
        })

        attackTimeline.call(() => gsap.fromTo('.white-flash', { opacity: 0.8 }, { opacity: 0, duration: 0.3 }))

        magicEls.forEach((el, idx) => {
          attackTimeline.to(el, { x: 0, y: 0, duration: 0.8, ease: 'power2.out' }, `${cycleLabel}_return`)
        })
      }
      tl.add(attackTimeline)

      // =============================
      // 4. Phase 4: Defeat Zayzhik
      // =============================
      tl.to('.zz-container', {
        rotation: -90,
        ease: 'bounce.out',
        duration: 2,
        onComplete: () => {
          zBlinkTween?.pause()
          gsap.set('.zz-eye-open', { autoAlpha: 0 })
          gsap.set('.zz-eye-close', { autoAlpha: 1 })
        },
        onReverseComplete: () => {
          zBlinkTween?.resume()
          gsap.set('.zz-eye-open', { autoAlpha: 1 })
          gsap.set('.zz-eye-close', { autoAlpha: 0 })
        }
      })

      // Phase 5: Victory Zoom Mild
      tl.to(bgRef.current, { scale: 1.7, transformOrigin: '20% 30%', duration: 3, ease: 'power2.inOut' })

      // Phase 6: Announcement Boxes
      tl.fromTo('.narration-final-1', { autoAlpha: 0, scale: 0.8 }, { autoAlpha: 1, scale: 0.8, duration: 1.5, ease: 'back.out(1.7)' }, '+=1')
        .to('.narration-final-1', { autoAlpha: 0, duration: 1 }, '+=3.5')
        .fromTo('.narration-final-2a', { autoAlpha: 0, scale: 0.8 }, { autoAlpha: 1, scale: 0.8, duration: 1.5, ease: 'back.out(1.7)' }, '+=4.5')
        .to('.narration-final-2a', { autoAlpha: 0, duration: 1 }, '+=7')
        .fromTo('.narration-final-2b', { autoAlpha: 0, scale: 0.8 }, { autoAlpha: 1, scale: 0.8, duration: 1.5, ease: 'back.out(1.7)' }, '+=8')
        .to({}, { duration: 3 })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black">

      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full will-change-transform origin-center"
      >
        {/* 1. Background Image Layer */}
        <div
          className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${bgPath}')` }}
        />

        {/* 2. ZAYZHIK */}
        <div className="zz-container absolute bottom-[-6%] right-[0%] z-20 h-[500px] w-[320px] md:h-[750px] md:w-[500px]">
          <div className="relative h-full w-full">
            <img src="/assets/part3/Character/Battle/Zayzhik/Pose/Zayzhik_arm_l.png" className="zz-arm-l absolute left-0 top-[2%] z-30 w-full" alt="L Arm" />
            <img src="/assets/part3/Character/Battle/Zayzhik/Pose/Zayzhik_arm_r.png" className="zz-arm-r absolute left-0 top-[2%] z-10 w-full" alt="R Arm" />
            <div className="zz-head-group absolute left-0 top-[1%] z-20 w-full">
              <img src="/assets/part3/Character/Battle/Zayzhik/Pose/Zayzhik_body_op.png" className="zz-eye-open w-full object-contain" alt="Eye Open" />
              <img src="/assets/part3/Character/Battle/Zayzhik/Pose/Zayzhik_body_cl.png" className="zz-eye-close absolute left-0 top-0 w-full object-contain opacity-0" alt="Eye Close" />
            </div>
          </div>
        </div>

        {/* 3. MILD */}
        <div className="mild-gamer-container absolute top-[25%] left-[0%] z-20 h-[500px] w-[320px] md:h-[750px] md:w-[500px]">
          <div className="relative h-full w-full">
            <img src="/assets/part3/Character/Battle/Mild/Pose2/Mild_R_2_arm_r.png" className="Mild-arm-r absolute left-0 top-0 z-20 w-full" alt="R Arm" />
            <img src="/assets/part3/Character/Battle/Mild/Pose2/Mild_R_2_arm_l.png" className="Mild-arm-l absolute left-0 top-0 z-20 w-full" alt="L Arm" />
            <img src="/assets/part3/Character/Battle/Mild/Pose2/Mild_R_2_hair_f_l.png" className="Mild-hair-f-l absolute left-0 top-0 z-30 w-full" alt="Hair FL" />
            <img src="/assets/part3/Character/Battle/Mild/Pose2/Mild_R_2_hair_b_r.png" className="Mild-hair-b-r absolute left-0 top-0 z-10 w-full" alt="Hair BR" />
            <img src="/assets/part3/Character/Battle/Mild/Pose2/Mild_R_2_hair_b_l.png" className="Mild-hair-b-l absolute left-0 top-0 z-10 w-full" alt="Hair BL" />
            <div className="absolute left-0 top-[1%] z-30 w-full">
              <img src="/assets/part3/Character/Battle/Mild/Pose2/Mild_R_2_Body_op.png" className="w-full object-contain" alt="Eye Open" />
              <img src="/assets/part3/Character/Battle/Mild/Pose2/Mild_R_2_Body_cl.png" className="Mild-eye-close absolute left-0 top-0 w-full object-contain opacity-0" alt="Eye Close" />
            </div>
          </div>
        </div>

        {/* 4. MAGIC zayzhik */}
        <div className="pointer-events-none absolute inset-0 z-20">
          <div className="magic-zayzhik-circle absolute bottom-[10%] right-[5%] opacity-0">
            <img src="/assets/part3/Character/Battle/Zayzhik/Magic/shark1.png" className="magic-shark1 w-[300px] animate-spin-slow" alt="Magic shark1" />
            <img src="/assets/part3/Character/Battle/Zayzhik/Magic/shark2.png" className="magic-shark2 w-[300px] animate-spin-slow" alt="Magic shark2" />
          </div>

        </div>

        {/*5. MAGIC Mild */}
        <div className="pointer-events-none absolute inset-0 z-20">
          {/* ✅ แก้ไข: เอา opacity-0 ออกจาก div แม่ เพื่อให้ GSAP ควบคุมลูกๆ ได้ */}
          <div className="magic-mild absolute top-[25%] left-[5%]">
            <img src="/assets/part3/Character/Battle/Mild/Magic2/panda1.png" className="magic-panda1 absolute w-[200px] opacity-0" alt="Magic panda1" />
            {/* ✅ แก้ไข: เปลี่ยนชื่อ class จาก magic-shark2 เป็น magic-panda2 */}
            <img src="/assets/part3/Character/Battle/Mild/Magic2/panda2.png" className="magic-panda2 absolute w-[200px] opacity-0" alt="Magic panda2" />
          </div>
        </div>

      </div>




      {/* UI / HUD ELEMENTS */}
      <div className="white-flash absolute inset-0 z-50 bg-white opacity-0 mix-blend-overlay pointer-events-none"></div>

      <div className="narration-box narration-final-1 absolute left-1/2 top-1/2 z-40 max-w-xl -translate-x-1/2 -translate-y-1/2 rotate-1 rounded-lg border-8 border-yellow-500 bg-white/90 p-8 text-center shadow-2xl shadow-yellow-800/50 opacity-0 will-change-transform">
        <p className="font-serif text-3xl font-extrabold leading-tight text-black md:text-4xl">
          การต่อสู้คู่ที่สอง
        </p>
        <p className="font-serif text-xl font-bold leading-relaxed text-red-700 mt-2 md:text-2xl">
          จบลงอย่างรวดเร็ว!
        </p>
      </div>

      <div className="narration-box narration-final-2a absolute left-1/2 top-1/2 z-40 max-w-xl -translate-x-1/2 -translate-y-1/2 rotate-[-2deg] rounded-lg border-8 border-pink-700 bg-white/90 p-8 text-center shadow-2xl shadow-pink-900/50 opacity-0 will-change-transform">
        <p className="font-serif text-xl font-bold leading-relaxed text-black md:text-2xl">
          <span className="text-4xl text-pink-600 font-extrabold block mb-2">"มายด์"</span>
          ยังคงโชว์ฟอร์มได้ยอดเยี่ยม
        </p>
      </div>

      <div className="narration-box narration-final-2b absolute left-1/2 top-1/2 z-40 max-w-xl -translate-x-1/2 -translate-y-1/2 rotate-[3deg] rounded-lg border-8 border-green-700 bg-white/90 p-8 text-center shadow-2xl shadow-green-900/50 opacity-0 will-change-transform">
        <p className="mt-4 text-xl font-medium text-gray-700 leading-relaxed">
          เอาชนะ Zayzhik ไปได้<br />
          อย่างสวยงาม!<br />
          ผ่านเข้ารอบต่อไปครับ!!
        </p>
      </div>

    </div>
  )
}