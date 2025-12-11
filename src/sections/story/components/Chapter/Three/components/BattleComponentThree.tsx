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
      // 1. Blink & Idle Animation
      // =============================
      let harukiBlinkTween: gsap.core.Timeline | null = null

      const startBlinking = () => {
        // Haruki Blink
        harukiBlinkTween = gsap.timeline({
          repeat: -1,
          repeatDelay: 3.5,
          delay: 0.5,
        })
        harukiBlinkTween
          .to('.haruki-eye-close', { autoAlpha: 1, duration: 0.1 })
          .to('.haruki-eye-close', { autoAlpha: 0, duration: 0.1, delay: 0.1 })
      }
      startBlinking()

      const idleTween = gsap.timeline({ repeat: -1 })
      idleTween
        // Haruki Idle
        .to('.haruki-arm-l', {
          rotation: 3,
          duration: 2,
          yoyo: true,
          repeat: -1,
          transformOrigin: 'top right',
          ease: 'sine.inOut',
        })
        .to(
          '.haruki-arm-r',
          {
            rotation: -3,
            duration: 2.2,
            yoyo: true,
            repeat: -1,
            transformOrigin: 'top left',
            ease: 'sine.inOut',
          },
          0,
        )
        .to(
          '.haruki-head-group',
          { y: 3, duration: 2.5, yoyo: true, repeat: -1, ease: 'sine.inOut' },
          0,
        )
        // Mild Idle
        .to(
          '.mild-head-group',
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

        // Haruki Magic Circle Idle (หมุนวนเรื่อยๆ)
        .to(
          '.hrk-magic-circle-1',
          { rotation: '+=360', duration: 15, ease: 'none', repeat: -1 },
          0,
        )
        .to(
          '.hrk-magic-circle-2',
          { rotation: '-=360', duration: 18, ease: 'none', repeat: -1 },
          0,
        )

      // =============================
      // 2. Scroll Timeline
      // =============================
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=500%',
          scrub: 1,
          pin: true,
        },
      })

      // Phase 1: Background Zoom + Pan
      tl.set(bgRef.current, {
        scale: 2,
        xPercent: 0,
        yPercent: 25,
        transformOrigin: 'center center',
      })
        .to(bgRef.current, { yPercent: -10, ease: 'none', duration: 1 })
        .to(bgRef.current, {
          scale: 1,
          xPercent: 0,
          yPercent: 0,
          ease: 'none',
          duration: 1,
        })

      // ===================================
      // Phase 2: Setup Attack
      // ===================================
      const magicBean = '.hrk-bean-1'
      const panda = '.mild-panda-1'
      const harukiContainer = '.haruki-container'

      // Target Positions (ใช้ค่าเดิมจากโค้ดของคุณ)
      const mildTargetPos = { x: -200, y: 350 }
      const harukiHitPos = { x: -300, y: 200 }

      // กำหนดตำแหน่งเริ่มต้นของถั่วให้ใกล้ Haruki และซ่อนไว้ก่อน
      tl.set(magicBean, {
        autoAlpha: 0,
        scale: 1,
        x: 0,
        y: 0,
      })

      // ถั่วปรากฏตัว
      tl.fromTo(
        magicBean,
        { autoAlpha: 0, scale: 0.5 },
        { autoAlpha: 1, scale: 1, duration: 1, ease: 'power2.out' },
        '+=0.5',
      )

      // ===================================
      // ✅ Phase 3: Attack Sequence (Bean Attack -> Panda Defense -> Counter)
      // ===================================
      const attackTimeline = gsap.timeline()

      // 1. Coffee Bean ลอยเข้าหา Mild (ล่วงลงมาทางซ้ายล่าง)
      attackTimeline.to(
        magicBean,
        {
          x: mildTargetPos.x,
          y: mildTargetPos.y,
          scale: 1.5,
          rotation: 360,
          duration: 2,
          ease: 'power1.in',
        },
        'startAttack',
      )

      // 2. Panda พุ่งเข้าชน Coffee Bean (เริ่มที่ 1.5s ของถั่ว)
      attackTimeline.to(
        panda,
        {
          x: 400, // พุ่งจากซ้ายไปขวา (ใน wrapper)
          y: -100, // พุ่งขึ้นไปชน
          rotation: -720,
          scale: 1.5,
          duration: 0.5,
          ease: 'power2.in',
        },
        'startAttack+=1.5',
      )

      // 3. Flash Effect ตอนชนกัน
      attackTimeline.call(
        () =>
          gsap.fromTo(
            '.white-flash',
            { opacity: 0.8 },
            { opacity: 0, duration: 0.2 },
          ),
        null,
        'startAttack+=2',
      )

      // 4. Coffee Bean กระเด็นกลับไปชน Haruki (เริ่มพร้อม Flash)
      attackTimeline.to(
        magicBean,
        {
          x: harukiHitPos.x, // กระเด็นกลับไปทางขวาบน (ตำแหน่ง Haruki)
          y: harukiHitPos.y,
          scale: 3,
          rotation: 1080,
          duration: 1,
          ease: 'power2.in',
        },
        'startAttack+=2',
      )

      // 5. Panda กระเด็นกลับที่เดิมอย่างนุ่มนวล
      attackTimeline.to(
        panda,
        {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          duration: 1.5,
          ease: 'elastic.out(1, 0.5)',
        },
        'startAttack+=2.2',
      ) // 0.2s หลังชน

      // 6. Haruki ถูกชน -> Defeat Pattern (เริ่มพร้อมกับการกระเด็นกลับของถั่ว)
      attackTimeline.to(
        harukiContainer,
        {
          rotation: 90,
          yPercent: 20,
          xPercent: 250,
          opacity: 0.5,
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
          },
        },
        'startAttack+=2',
      ) // เริ่มพร้อมกระเด็น

      // 7. ซ่อนวงเวทย์ Haruki
      attackTimeline.to(
        ['.hrk-magic-circle-1', '.hrk-magic-circle-2'],
        {
          autoAlpha: 0,
          scale: 0,
          duration: 1,
        },
        'startAttack+=2',
      ) // เริ่มพร้อมกระเด็น

      // 8. Coffee Bean สลายตัว/หายไปหลังชน Haruki
      attackTimeline.to(
        magicBean,
        {
          autoAlpha: 0,
          scale: 0,
          duration: 0.5,
        },
        'startAttack+=2.8',
      ) // 0.8s หลังชน Haruki

      tl.add(attackTimeline, 'startPhase3') // เพิ่ม attackTimeline เข้าไปใน Scroll Timeline หลัก

      // Phase 5: Victory Zoom Mild (คนชนะ)
      tl.to(
        bgRef.current,
        {
          scale: 1.8,
          xPercent: 10,
          yPercent: -35,
          transformOrigin: 'center center',
          duration: 3,
          ease: 'power2.inOut',
        },
        '+=1',
      )

      // Phase 6: Announcement Boxes
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
        className="absolute inset-0 h-full w-full origin-center will-change-transform"
      >
        {/* BG Image Layer */}
        <div
          className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${bgPath}')` }}
        />

        {/* 2. HARUKI (ผู้ถูกโจมตี) */}
        <div className="haruki-container absolute left-[37%] top-[30%] z-20 h-[500px] w-[320px] md:h-[500px] md:w-[300px]">
          <div className="relative h-full w-full">
            <img
              src="/assets/part3/Character/Battle/Haruki/Pose/Haruki_arm_l.png"
              className="haruki-arm-l absolute left-0 top-[2%] z-10 w-full"
              alt="L Arm"
            />
            <img
              src="/assets/part3/Character/Battle/Haruki/Pose/Haruki_arm_r.png"
              className="haruki-arm-r absolute left-0 top-[2%] z-10 w-full"
              alt="R Arm"
            />
            <div className="haruki-head-group absolute left-0 top-[1%] z-20 w-full">
              <img
                src="/assets/part3/Character/Battle/Haruki/Pose/Haruki_body_op.png"
                className="haruki-eye-open w-full object-contain"
                alt="Eye Open"
              />
              <img
                src="/assets/part3/Character/Battle/Haruki/Pose/Haruki_body_cl.png"
                className="haruki-eye-close absolute left-0 top-0 w-full object-contain opacity-0"
                alt="Eye Close"
              />
            </div>
          </div>
        </div>

        {/* 3. MILD (ผู้ชนะ) */}
        <div className="mild-gamer-container absolute bottom-[-20%] left-[30%] z-20 h-[500px] w-[320px] md:h-[750px] md:w-[450px]">
          <div className="relative h-full w-full">
            <img
              src="/assets/part3/Character/Battle/Mild/Pose3/Mild_R_3_leg.png"
              className="absolute left-0 top-0 z-10 w-full"
              alt="Legs"
            />
            <div className="mild-head-group absolute left-0 top-0 z-20 w-full">
              <img
                src="/assets/part3/Character/Battle/Mild/Pose3/Mild_R_3_head.png"
                className="absolute left-0 top-0 z-30 w-full"
                alt="Head Base"
              />
              <div className="absolute left-0 top-[1%] w-full">
                <img
                  src="/assets/part3/Character/Battle/Mild/Pose3/Mild_R_3_hood_1.png"
                  className="mild-eye-open w-full object-contain"
                  alt="Hood Open"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 4. MAGIC HARUKI (Attack) */}
        {/* ตำแหน่ง: Top Right Area (เพื่อโจมตีลงมาทางซ้ายล่าง) */}
        <div className="magic-haruki-wrapper pointer-events-none absolute right-[0%] top-[0%] z-10 h-[700px] w-[700px]">
          {/* วงเวทย์ (หมุนเองใน Idle) */}
          <img
            src="/assets/part3/Character/Battle/Haruki/Magic/Sun&moon_Circle.png"
            className="hrk-magic-circle-1 absolute left-[-2%] top-[50%] z-10 h-[200px] w-[200px] opacity-80"
            alt="magic-circle-1"
          />
          <img
            src="/assets/part3/Character/Battle/Haruki/Magic/Sun&moon_Circle.png"
            className="hrk-magic-circle-2 absolute left-[18%] top-[50%] z-10 h-[200px] w-[200px] opacity-80"
            alt="magic-circle-2"
          />
          {/* Coffee Bean (เริ่มเคลื่อนที่ใน Scroll Timeline) */}
          <img
            src="/assets/part3/Character/Battle/Haruki/Magic/Coffee_Bean.png"
            className="hrk-bean-1 absolute left-[5%] top-[10%] z-50 w-[250px] origin-center"
            alt="coffee-bean"
          />
        </div>

        {/* 5. MAGIC MILD (Defense) */}
        {/* ตำแหน่ง: Bottom Left Area (เพื่อตั้งรับ) */}
        <div className="mild-magic-back pointer-events-none absolute bottom-[-5%] left-[19%] z-10">
          <div className="mild-magic-float-group relative h-[700px] w-[700px]">
            <img
              src="/assets/part3/Character/Battle/Mild/Magic2/magic_circle.png"
              className="mild-magic-circle absolute inset-0 z-10 w-full opacity-80"
              alt="magic-circle"
            />
            <img
              src="/assets/part3/Character/Battle/Mild/Magic2/magic2.png"
              className="mild-magic-circle absolute inset-0 z-40 w-full opacity-60"
              alt="magic-1"
            />
            <img
              src="/assets/part3/Character/Battle/Mild/Magic2/magic3.png"
              className="mild-magic-circle absolute inset-0 z-40 w-full opacity-60"
              alt="magic-1"
            />
          </div>
          {/* Panda (เคลื่อนที่ใน Scroll Timeline) */}
          <img
            src="/assets/part3/Character/Battle/Mild/Magic2/panda2.png"
            className="mild-panda-1 absolute left-[16%] top-[22%] z-50 w-[120px] origin-center"
            alt="panda-1"
          />
        </div>
      </div>
      {/* End Background Wrapper */}

      {/* UI / HUD ELEMENTS */}
      <div className="white-flash pointer-events-none absolute inset-0 z-50 bg-white opacity-0 mix-blend-overlay"></div>

      {/* Narration Boxes */}
      <div className="narration-box narration-final-1 absolute left-[20%] top-[20%] z-40 max-w-xl -translate-x-1/2 -translate-y-1/2 rotate-1 rounded-lg border-8 border-purple-900 bg-white/90 p-8 text-center opacity-0 shadow-2xl shadow-purple-900/50 will-change-transform">
        <p className="font-serif text-3xl font-extrabold leading-tight text-black md:text-4xl">
          การต่อสู้ในยามค่ำคืน
        </p>
        <p className="mt-2 font-serif text-xl font-bold leading-relaxed text-indigo-800 md:text-2xl">
          H.R.K. ต้านทานไม่ไหว!
        </p>
      </div>

      <div className="narration-box narration-final-2a absolute left-[20%] top-[20%] z-40 max-w-xl -translate-x-1/2 -translate-y-1/2 rotate-[-2deg] rounded-lg border-8 border-pink-700 bg-white/90 p-8 text-center opacity-0 shadow-2xl shadow-pink-900/50 will-change-transform">
        <p className="font-serif text-3xl font-bold leading-relaxed text-black md:text-3xl">
          <span className="mb-2 block text-4xl font-extrabold text-pink-600">
            "MILD_R"
          </span>
          คว้าชัยชนะไปได้อีกครั้ง!
        </p>
      </div>
    </div>
  )
}
