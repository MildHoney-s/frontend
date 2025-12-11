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
      // 0. Initial Setups (Hide Elements)
      // =============================
      gsap.set(
        [
          '.mild-magic-circle',
          '.mild-magic-float',
          '.zz-magic-circle',
          '.zz-magic-float',
        ],
        {
          scale: 0,
          autoAlpha: 0,
        },
      )
      gsap.set(
        ['.mild-panda-1', '.mild-panda-2', '.zz-shark-1', '.zz-shark-2'],
        { scale: 0, autoAlpha: 0 },
      )

      // =============================
      // 1. Blink Loops & Idle Body
      // =============================
      let zBlinkTween: gsap.core.Timeline | null = null
      let mildBlinkTween: gsap.core.Timeline | null = null

      const startBlinking = () => {
        zBlinkTween = gsap.timeline({ repeat: -1, repeatDelay: 3, delay: 0.5 })
        zBlinkTween
          .to('.zz-eye-close', { autoAlpha: 1, duration: 0.1 })
          .to('.zz-eye-close', { autoAlpha: 0, duration: 0.1, delay: 0.1 })

        mildBlinkTween = gsap.timeline({ repeat: -1, repeatDelay: 4, delay: 2 })
        mildBlinkTween
          .to('.Mild-eye-close', { autoAlpha: 1, duration: 0.1 })
          .to('.Mild-eye-close', { autoAlpha: 0, duration: 0.1, delay: 0.1 })
      }
      startBlinking()

      // Idle Body Animation
      const idleTween = gsap.timeline({ repeat: -1 })
      idleTween
        .to('.zz-arm-l', {
          rotation: 1,
          duration: 2,
          yoyo: true,
          repeat: -1,
          transformOrigin: 'top right',
          ease: 'sine.inOut',
        })
        .to(
          '.zz-arm-r',
          {
            rotation: -1,
            duration: 2.2,
            yoyo: true,
            repeat: -1,
            transformOrigin: 'top left',
            ease: 'sine.inOut',
          },
          0,
        )
        .to(
          '.zz-head-group',
          {
            y: 2,
            rotation: 1,
            duration: 3,
            yoyo: true,
            repeat: -1,
            transformOrigin: 'bottom center',
            ease: 'sine.inOut',
          },
          0,
        )
        .to(
          '.Mild-arm-l',
          {
            rotation: 2,
            duration: 2.5,
            yoyo: true,
            repeat: -1,
            transformOrigin: 'top right',
            ease: 'sine.inOut',
          },
          0,
        )
        .to(
          '.Mild-arm-r',
          {
            rotation: -2,
            duration: 2.5,
            yoyo: true,
            repeat: -1,
            transformOrigin: 'top left',
            ease: 'sine.inOut',
          },
          0,
        )
        .to(
          '.Mild-hair-f-l, .Mild-hair-f-r, .Mild-hair-b-l, .Mild-hair-b-r',
          {
            y: 1,
            rotation: 1,
            duration: 2.8,
            yoyo: true,
            repeat: -1,
            transformOrigin: 'top center',
            ease: 'sine.inOut',
          },
          0,
        )

      // =============================
      // 2. Floating Magic Animation
      // =============================
      gsap.to(['.mild-magic-float-group', '.zz-magic-float-group'], {
        y: -15,
        duration: 2.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })
      gsap.to(['.mild-panda-1', '.mild-panda-2'], {
        y: -10,
        x: 5,
        rotation: 2,
        duration: 1.8,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        stagger: 0.5,
      })
      gsap.to(['.zz-shark-1', '.zz-shark-2'], {
        y: -12,
        x: -5,
        rotation: -2,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        stagger: 0.5,
      })

      // =============================
      // 3. Main Scroll Timeline
      // =============================
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=600%',
          scrub: 1,
          pin: true,
        },
      })

      // --- Phase 1: Background Zoom + Pan ---
      tl.set(bgRef.current, { scale: 2, xPercent: -25, yPercent: -25 })
        .to(bgRef.current, {
          xPercent: 25,
          yPercent: 25,
          ease: 'none',
          duration: 1,
        })
        .to(bgRef.current, {
          scale: 1,
          xPercent: 0,
          yPercent: 0,
          ease: 'none',
          duration: 1,
        })

      // --- Phase 2: Magic Entrance ---
      tl.to(
        [
          '.mild-magic-circle',
          '.mild-magic-float',
          '.zz-magic-circle',
          '.zz-magic-float',
        ],
        {
          scale: 1,
          autoAlpha: 1,
          duration: 1,
          ease: 'back.out(1.2)',
        },
      ).to(
        ['.mild-panda-1', '.mild-panda-2', '.zz-shark-1', '.zz-shark-2'],
        {
          scale: 1,
          autoAlpha: 1,
          duration: 0.5,
          ease: 'back.out(1.5)',
          stagger: 0.1,
        },
      )

      // --- Phase 3: The CLASH ---
      const clashTimeline = gsap.timeline()

      // Clash 1
      clashTimeline
        .to(
          '.mild-panda-1',
          { x: 300, y: 150, rotation: 15, duration: 0.4, ease: 'power1.in' },
          'clash1',
        )
        .to(
          '.zz-shark-1',
          { x: -300, y: -150, rotation: -15, duration: 0.4, ease: 'power1.in' },
          'clash1',
        )
        .call(() => flashEffect(), [], 'clash1+=0.3')
        .to(
          ['.mild-panda-1', '.zz-shark-1'],
          { x: 0, y: 0, rotation: 0, duration: 0.6, ease: 'power1.out' },
          'clash1Return',
        )

      // Clash 2
      clashTimeline
        .to(
          '.mild-panda-2',
          { x: 400, y: 200, rotation: 20, duration: 0.4, ease: 'power1.in' },
          'clash2',
        )
        .to(
          '.zz-shark-2',
          { x: -350, y: -200, rotation: -20, duration: 0.4, ease: 'power1.in' },
          'clash2',
        )
        .call(() => flashEffect(), [], 'clash2+=0.3')
        .to(
          ['.mild-panda-2', '.zz-shark-2'],
          { x: 0, y: 0, rotation: 0, duration: 0.6, ease: 'power1.out' },
          'clash2Return',
        )

      // Clash 3: All In
      clashTimeline
        .to(
          '.mild-panda-1',
          { x: 350, y: 100, scale: 1.2, duration: 0.3, ease: 'power2.in' },
          'clash3',
        )
        .to(
          '.mild-panda-2',
          { x: 350, y: 250, scale: 1.2, duration: 0.3, ease: 'power2.in' },
          'clash3',
        )
        .to(
          '.zz-shark-1',
          { x: -350, y: -100, scale: 1.2, duration: 0.3, ease: 'power2.in' },
          'clash3',
        )
        .to(
          '.zz-shark-2',
          { x: -350, y: -250, scale: 1.2, duration: 0.3, ease: 'power2.in' },
          'clash3',
        )
        .call(() => flashEffect(), [], 'clash3+=0.2')
        .to(
          ['.zz-shark-1', '.zz-shark-2'],
          { x: -600, y: -100, autoAlpha: 0, rotation: -360, duration: 0.8 },
          'clash3End',
        )
        .to(
          ['.mild-panda-1', '.mild-panda-2'],
          { x: 0, y: 0, scale: 1, duration: 0.5 },
          'clash3End',
        )

      tl.add(clashTimeline)

      // --- Phase 4: Panda Attack Zayzhik ---
      const finalAttackTl = gsap.timeline()
      // Attack 1
      finalAttackTl
        .to('.mild-panda-1', {
          x: 650,
          y: 450,
          scale: 1.5,
          duration: 0.4,
          ease: 'back.in(1)',
        })
        .call(() => flashEffect(), [], '>-0.1')
        .to('.mild-panda-1', {
          x: 500,
          y: 300,
          scale: 1,
          duration: 0.4,
          ease: 'power1.out',
        })

      // Attack 2
      finalAttackTl
        .to('.mild-panda-2', {
          x: 700,
          y: 500,
          scale: 1.8,
          duration: 0.4,
          ease: 'back.in(1)',
        })
        .call(() => flashEffect(), [], '>-0.1')
        .to('.mild-panda-2', { autoAlpha: 0, duration: 0.2 }, '>') // Panda หายไปหลังชน
        .to('.mild-panda-1', { autoAlpha: 0, duration: 0.2 }, '<') // Panda หายไปหลังชน

      tl.add(finalAttackTl)

      // --- Phase 5: Defeat Zayzhik & Close Magic ---

      // 1. Clean Up Zayzhik's side first
      tl.to(
        [
          '.zz-magic-circle',
          '.zz-magic-float',
          '.zz-shark-1',
          '.zz-shark-2',
          '.mild-panda-1',
          '.mild-panda-2',
        ],
        {
          autoAlpha: 0,
          scale: 0,
          duration: 0.5,
          ease: 'back.in(1.7)',
        },
        '-=0.2',
      )

      // 2. Zayzhik Falls (Duration 2s)
      tl.to(
        '.zz-container',
        {
          rotation: -45,
          y: 10,
          ease: 'bounce.out',
          duration: 2,
          onStart: () => {
            zBlinkTween?.pause()
            gsap.set('.zz-eye-open', { autoAlpha: 0 })
            gsap.set('.zz-eye-close', { autoAlpha: 1 })
          },
          onReverseComplete: () => {
            zBlinkTween?.resume()
            gsap.set('.zz-eye-open', { autoAlpha: 1 })
            gsap.set('.zz-eye-close', { autoAlpha: 0 })
          },
        },
        '<', // Start same time as cleanup
      )

      // 3. ✅ UPDATED: Close ONLY .mild-magic-float (Keep .mild-magic-circle open)
      tl.to(
        '.mild-magic-float',
        {
          autoAlpha: 0,
          scale: 0,
          duration: 0.8,
          ease: 'back.in(1.2)',
        },
        '>-0.5', // เริ่มก่อนท่าล้มจบเล็กน้อย
      )

      // Helper Flash
      function flashEffect() {
        gsap.fromTo(
          '.white-flash',
          { opacity: 0.9 },
          { opacity: 0, duration: 0.2 },
        )
      }

      // --- Phase 6: Victory Zoom Mild & Text ---
      tl.to(bgRef.current, {
        scale: 1.7,
        transformOrigin: '20% 30%',
        duration: 3,
        ease: 'power2.inOut',
      })

      tl.fromTo(
        '.narration-final-1',
        { autoAlpha: 0, scale: 0.8 },
        { autoAlpha: 1, scale: 0.8, duration: 1.5, ease: 'back.out(1.7)' },
        '+=1',
      )
        .to('.narration-final-1', { autoAlpha: 0, duration: 1 }, '+=3.5')
        .fromTo(
          '.narration-final-2a',
          { autoAlpha: 0, scale: 0.8 },
          { autoAlpha: 1, scale: 0.8, duration: 1.5, ease: 'back.out(1.7)' },
          '+=4.5',
        )
        .to('.narration-final-2a', { autoAlpha: 0, duration: 1 }, '+=7')
        .fromTo(
          '.narration-final-2b',
          { autoAlpha: 0, scale: 0.8 },
          { autoAlpha: 1, scale: 0.8, duration: 1.5, ease: 'back.out(1.7)' },
          '+=8',
        )
        .to({}, { duration: 3 })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 h-full w-full origin-center will-change-transform"
      >
        {/* 1. Background Image Layer */}
        <div
          className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${bgPath}')` }}
        />

        {/* 2. ZAYZHIK (Right Bottom) */}
        <div className="zz-container absolute bottom-[-26%] right-[0%] z-20 h-[500px] w-[320px] origin-bottom-right md:h-[750px] md:w-[500px]">
          <div className="relative h-full w-full">
            <img
              src="/assets/part3/Character/Battle/Zayzhik/Pose/Zayzhik_arm_l.png"
              className="zz-arm-l absolute left-0 top-[2%] z-30 w-full"
              alt="L Arm"
            />
            <img
              src="/assets/part3/Character/Battle/Zayzhik/Pose/Zayzhik_arm_r.png"
              className="zz-arm-r absolute left-0 top-[2%] z-10 w-full"
              alt="R Arm"
            />
            <div className="zz-head-group absolute left-0 top-[1%] z-20 w-full">
              <img
                src="/assets/part3/Character/Battle/Zayzhik/Pose/Zayzhik_body_op.png"
                className="zz-eye-open w-full object-contain"
                alt="Eye Open"
              />
              <img
                src="/assets/part3/Character/Battle/Zayzhik/Pose/Zayzhik_body_cl.png"
                className="zz-eye-close absolute left-0 top-0 w-full object-contain opacity-0"
                alt="Eye Close"
              />
            </div>
          </div>
        </div>

        {/* 3. MILD (Left Top Area) */}
        <div className="mild-gamer-container absolute left-[-3%] top-[16%] z-20 h-[500px] w-[320px] md:h-[750px] md:w-[500px]">
          <div className="relative h-full w-full">
            <img
              src="/assets/part3/Character/Battle/Mild/Pose2/Mild_R_2_arm_r.png"
              className="Mild-arm-r absolute left-0 top-0 z-20 w-full"
              alt="R Arm"
            />
            <img
              src="/assets/part3/Character/Battle/Mild/Pose2/Mild_R_2_arm_l.png"
              className="Mild-arm-l absolute left-0 top-0 z-20 w-full"
              alt="L Arm"
            />
            <img
              src="/assets/part3/Character/Battle/Mild/Pose2/Mild_R_2_hair_f_l.png"
              className="Mild-hair-f-l absolute left-0 top-0 z-30 w-full"
              alt="Hair FL"
            />
            <img
              src="/assets/part3/Character/Battle/Mild/Pose2/Mild_R_2_hair_b_r.png"
              className="Mild-hair-b-r absolute left-0 top-0 z-10 w-full"
              alt="Hair BR"
            />
            <img
              src="/assets/part3/Character/Battle/Mild/Pose2/Mild_R_2_hair_b_l.png"
              className="Mild-hair-b-l absolute left-0 top-0 z-10 w-full"
              alt="Hair BL"
            />
            <div className="absolute left-0 top-[1%] z-30 w-full">
              <img
                src="/assets/part3/Character/Battle/Mild/Pose2/Mild_R_2_Body_op.png"
                className="w-full object-contain"
                alt="Eye Open"
              />
              <img
                src="/assets/part3/Character/Battle/Mild/Pose2/Mild_R_2_Body_cl.png"
                className="Mild-eye-close absolute left-0 top-0 w-full object-contain opacity-0"
                alt="Eye Close"
              />
            </div>
          </div>
        </div>

        {/* 4. MAGIC ZAYZHIK (Right Bottom Area) */}
        <div className="zz-magic-back pointer-events-none absolute bottom-[-5%] right-[-9%] z-10">
          <div className="zz-magic-float-group relative h-[700px] w-[700px]">
            <img
              src="/assets/part3/Character/Battle/Zayzhik/Magic/magic_circle.png"
              className="zz-magic-circle absolute inset-0 z-10 w-full opacity-80"
              alt="magic-circle"
            />
          </div>
        </div>
        <div className="zz-magic-front pointer-events-none absolute bottom-[-8%] right-[-8%] z-30  ">
          <div className="zz-magic-float-group relative h-[700px] w-[700px] opacity-[75%]">
            {/* Magic Aura */}
            <img
              src="/assets/part3/Character/Battle/Zayzhik/Magic/magic4.png"
              className="zz-magic-float absolute inset-0 z-40 w-full opacity-60 mix-blend-screen"
              alt="magic-0"
            />
            <img
              src="/assets/part3/Character/Battle/Zayzhik/Magic/magic2.png"
              className="zz-magic-float absolute inset-0 z-0 w-full opacity-60"
              alt="magic-1"
            />
            <img
              src="/assets/part3/Character/Battle/Zayzhik/Magic/magic3.png"
              className="zz-magic-float absolute inset-0 z-40 w-full opacity-60"
              alt="magic-1"
            />
            <img
              src="/assets/part3/Character/Battle/Zayzhik/Magic/magic1.png"
              className="zz-magic-float absolute inset-0 z-40 w-full opacity-60"
              alt="magic-1"
            />
          </div>
          {/* Sharks */}
          <img
            src="/assets/part3/Character/Battle/Zayzhik/Magic/shark1.png"
            className="zz-shark-1 absolute left-[20%] top-[35%] z-50 w-[120px]"
            alt="shark-1"
          />
          <img
            src="/assets/part3/Character/Battle/Zayzhik/Magic/shark2.png"
            className="zz-shark-2 absolute left-[60%] top-[10%] z-50 w-[110px]"
            alt="shark-2"
          />
        </div>
        {/* 5. MAGIC MILD (Left Top Area) */}
        <div className="mild-magic-back pointer-events-none absolute left-[-13%] top-[2%] z-10">
          <div className="mild-magic-float-group relative h-[700px] w-[700px]">
            <img
              src="/assets/part3/Character/Battle/Mild/Magic2/magic_circle.png"
              className="mild-magic-circle absolute inset-0 z-10 w-full opacity-80"
              alt="magic-circle"
            />
          </div>
        </div>

        {/* --- FRONT GROUP --- */}
        <div className="mild-magic-front pointer-events-none absolute left-[-14%] top-[10%] z-30">
          <div className="mild-magic-float-group relative h-[700px] w-[700px]">
            {/* Wrapper Magic Aura */}
            <div className="absolute inset-0 z-40 h-full w-full opacity-[75%]">
              <img
                src="/assets/part3/Character/Battle/Mild/Magic2/magic0.png"
                className="mild-magic-float absolute inset-0 w-full opacity-60 mix-blend-screen  z-0"
                alt="magic-0"
              />
              <img
                src="/assets/part3/Character/Battle/Mild/Magic2/magic1.png"
                className="mild-magic-float absolute inset-0 w-full opacity-60"
                alt="magic-1"
              />
              <img
                src="/assets/part3/Character/Battle/Mild/Magic2/magic2.png"
                className="mild-magic-float absolute inset-0 w-full opacity-60"
                alt="magic-1"
              />
              <img
                src="/assets/part3/Character/Battle/Mild/Magic2/magic3.png"
                className="mild-magic-float absolute inset-0 w-full opacity-60"
                alt="magic-1"
              />
            </div>
          </div>

          {/* Pandas */}
          <img
            src="/assets/part3/Character/Battle/Mild/Magic2/panda2.png"
            className="mild-panda-1 absolute left-[15%] top-[22%] z-50 w-[120px]"
            alt="panda-1"
          />
          <img
            src="/assets/part3/Character/Battle/Mild/Magic2/panda.png"
            className="mild-panda-2 absolute left-[60%] top-[10%] z-50 w-[140px]"
            alt="panda-2"
          />
        </div>
      </div>

      {/* UI / HUD ELEMENTS */}
      <div className="white-flash pointer-events-none absolute inset-0 z-50 bg-white opacity-0 mix-blend-overlay"></div>

      <div className="narration-box narration-final-1 absolute right-[-5%] top-[20%] z-40 max-w-xl -translate-x-1/2 -translate-y-1/2 rotate-1 rounded-lg border-8 border-yellow-500 bg-white/90 p-8 text-center opacity-0 shadow-2xl shadow-yellow-800/50 will-change-transform">
        <p className="font-serif text-3xl font-extrabold leading-tight text-black md:text-4xl">
          การต่อสู้คู่ที่สอง
        </p>
        <p className="mt-2 font-serif text-2xl font-bold leading-relaxed text-red-700 md:text-2xl">
          จบลงอย่างรวดเร็ว!
        </p>
      </div>

      <div className="narration-box narration-final-2a absolute right-[-5%] top-[20%] z-40 max-w-xl -translate-x-1/2 -translate-y-1/2 rotate-[-2deg] rounded-lg border-8 border-pink-700 bg-white/90 p-8 text-center opacity-0 shadow-2xl shadow-pink-900/50 will-change-transform">
        <p className="font-serif text-xl font-bold leading-relaxed text-black md:text-2xl">
          <span className="mb-2 block text-4xl font-extrabold text-pink-600">
            "Mild-R"
          </span>
          ยังคงโชว์ฟอร์มได้ยอดเยี่ยม
        </p>
      </div>

      <div className="narration-box narration-final-2b absolute right-[-5%] top-[20%] z-40 max-w-xl -translate-x-1/2 -translate-y-1/2 rotate-[3deg] rounded-lg border-8 border-green-700 bg-white/90 p-8 text-center opacity-0 shadow-2xl shadow-green-900/50 will-change-transform">
        <p className="mt-4 text-3xl font-medium leading-relaxed text-gray-700">
          เอาชนะ Z.H.A.R.K ไปได้
          <br />
          อย่างสวยงาม!
          <br />
          ผ่านเข้ารอบต่อไปครับ!!
        </p>
      </div>
    </div>
  )
}