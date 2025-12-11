import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useLayoutEffect, useRef } from 'react'

// ลงทะเบียน Plugin
gsap.registerPlugin(ScrollTrigger)

export default function BattleComponentFour() {
  const containerRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  // BG Path
  const bgPath = '/assets/part3/BG/bg_colosseum_night_2.png'

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ... (Setup เดิม: ซ่อนของ, Loop blink, Idle) ...
      // (ผมละไว้ฐานที่เข้าใจ เพื่อประหยัดพื้นที่นะครับ ส่วนนี้เหมือนเดิมเป๊ะ)
      gsap.set('.mild-magic-back, .mild-magic-front', {
        autoAlpha: 0,
        scale: 0.8,
      })
      gsap.set('.mild-panda', { scaleX: -0, scaleY: 0, autoAlpha: 0 })
      gsap.set('.debirun-circle-1, .debirun-circle-2, .debirun-circle-3', {
        scale: 0,
        opacity: 0,
        transformOrigin: 'center center',
      })
      gsap.set('.debirun-magic-1, .debirun-magic-2, .debirun-magic-3', {
        scale: 0.5,
        opacity: 0,
        transformOrigin: 'bottom center',
      })

      // Loop Blink & Idle (เหมือนเดิม)
      let debirunBlinkTween = null
      const startBlinking = () => {
        debirunBlinkTween = gsap.timeline({
          repeat: -1,
          repeatDelay: 3.5,
          delay: 0.5,
        })
        debirunBlinkTween
          .to('.debirun-eye-close', { autoAlpha: 1, duration: 0.1 })
          .to('.debirun-eye-close', { autoAlpha: 0, duration: 0.1, delay: 0.1 })
        const mildBlinkTween = gsap.timeline({
          repeat: -1,
          repeatDelay: 4,
          delay: 2,
        })
        mildBlinkTween
          .to('.mild-eye-close, .Mild-eye-close', {
            autoAlpha: 1,
            duration: 0.1,
          })
          .to('.mild-eye-close, .Mild-eye-close', {
            autoAlpha: 0,
            duration: 0.1,
            delay: 0.1,
          })
      }
      startBlinking()

      gsap.to('.debirun-head-group, .debirun-arm-hood', {
        y: 3,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })
      gsap.to('.mild-head-group', {
        y: 2,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })
      const mildBattleIdle = gsap.timeline({
        repeat: -1,
        yoyo: true,
        defaults: { ease: 'sine.inOut' },
      })
      mildBattleIdle
        .to('.mild-pose-2', { y: 5, duration: 2.5 }, 0)
        .to(
          '.Mild-hair',
          { rotation: 2, transformOrigin: 'top center', duration: 3 },
          0,
        )
        .to(
          '.Mild-arm-l',
          { rotation: -3, transformOrigin: 'top right', duration: 3.5 },
          0,
        )
      gsap.to('.debirun-circle-1', {
        rotation: 360,
        repeat: -1,
        duration: 20,
        ease: 'linear',
      })
      gsap.to('.debirun-circle-2', {
        rotation: -360,
        repeat: -1,
        duration: 25,
        ease: 'linear',
      })
      gsap.to('.debirun-circle-3', {
        rotation: 360,
        repeat: -1,
        duration: 15,
        ease: 'linear',
      })
      gsap.to('.debirun-magic-1, .debirun-magic-2, .debirun-magic-3', {
        y: -10,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        stagger: 0.2,
      })
      gsap.to('.mild-magic-float-group', {
        y: -15,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })

      // =============================
      // 3. Main Scroll Timeline
      // =============================
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=1500%', // [ปรับเพิ่ม] เพิ่มความยาวเพราะมี Text เยอะขึ้น
          scrub: 1,
          pin: true,
        },
      })

      // =========================================
      // [NEW] Phase 0: The MC Announcer (3 Boxes)
      // =========================================

      // Box 1: คู่ชิง (Enter -> Stay -> Leave)
      tl.fromTo(
        '.intro-box-1',
        { autoAlpha: 0, y: 100, scale: 0.8 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 1.5, ease: 'back.out(1.2)' },
      )
        .to({}, { duration: 1 }) // แช่ไว้อ่าน
        .to('.intro-box-1', { autoAlpha: 0, y: -50, scale: 0.9, duration: 1 })

      // Box 2: สตอรี่ (Enter -> Stay -> Leave)
      tl.fromTo(
        '.intro-box-2',
        { autoAlpha: 0, x: -50 },
        { autoAlpha: 1, x: 0, duration: 1.5, ease: 'power2.out' },
      )
        .to({}, { duration: 1.5 }) // แช่ไว้นานหน่อย ประโยคยาว
        .to('.intro-box-2', { autoAlpha: 0, x: 50, duration: 1 })

      // Box 3: ไปลุ้นกัน! (Enter -> Stay -> Leave)
      tl.fromTo(
        '.intro-box-3',
        { autoAlpha: 0, scale: 2, rotate: -5 },
        {
          autoAlpha: 1,
          scale: 1,
          rotate: 0,
          duration: 1,
          ease: 'elastic.out(1, 0.5)',
        },
      )
        .to({}, { duration: 0.5 }) // แป๊บเดียวพอ กระตุ้น
        .to('.intro-box-3', {
          autoAlpha: 0,
          scale: 5,
          opacity: 0,
          duration: 1.5,
          ease: 'power2.in',
        }) // ขยายหายไปใส่คนดู

      // =========================================
      // Phase 1: Battle Begins (BG Move)
      // =========================================
      tl.set(bgRef.current, {
        scale: 2,
        xPercent: -50,
        yPercent: 10,
        transformOrigin: 'center center',
      })
        .to(bgRef.current, {
          xPercent: 40,
          yPercent: -40,
          ease: 'none',
          duration: 1,
        })
        .to(bgRef.current, {
          scale: 1,
          xPercent: 0,
          yPercent: 0,
          ease: 'power1.inOut',
          duration: 1,
        })

      // ... (Phase 2-7 เหมือนเดิมเป๊ะ ก๊อปปี้วางต่อจากนี้ได้เลยครับ) ...
      // Phase 2: Debirun Magic
      tl.to('.debirun-circle-1, .debirun-circle-2, .debirun-circle-3', {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)',
      }).to(
        '.debirun-magic-1, .debirun-magic-3, .debirun-magic-2',
        { scale: 1, opacity: 1, duration: 1, stagger: 0.1, ease: 'power2.out' },
        '<0.3',
      )
      // Phase 3: Mild Transform
      tl.to('.mild-pose-1', { autoAlpha: 0, duration: 0.5, scale: 0.9 }).fromTo(
        '.mild-pose-2',
        { autoAlpha: 0, scale: 1.1 },
        { autoAlpha: 1, scale: 1, duration: 0.5 },
        '<',
      )
      // Phase 4: Mild Magic
      tl.to('.mild-magic-back, .mild-magic-front', {
        autoAlpha: 1,
        scale: 1,
        duration: 1,
        ease: 'power2.out',
      })
      // Phase 5: Panda Attack
      tl.to('.mild-panda', {
        scaleX: -1,
        scaleY: 1,
        autoAlpha: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.5)',
      })
      tl.to('.mild-panda', {
        x: 600,
        y: -400,
        scaleX: -1.5,
        scaleY: 1.5,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power2.in',
      })
      tl.to(
        '.white-flash',
        { opacity: 0.8, duration: 0.1, yoyo: true, repeat: 3 },
        '-=0.5',
      )
      // Phase 6: Debirun Defeat
      tl.to(
        '.debirun-magic-group2',
        { opacity: 0, scale: 0.8, duration: 1, ease: 'power2.in' },
        '<',
      )
      tl.to(
        '.debirun-container',
        {
          rotation: -90,
          yPercent: 20,
          xPercent: 10,
          opacity: 0.5,
          filter: 'grayscale(100%)',
          ease: 'bounce.out',
          duration: 2,
          onComplete: () => {
            if (debirunBlinkTween) debirunBlinkTween.pause()
            gsap.set('.debirun-eye-open', { autoAlpha: 0 })
            gsap.set('.debirun-eye-close', { autoAlpha: 1 })
          },
          onReverseComplete: () => {
            if (debirunBlinkTween) debirunBlinkTween.resume()
            gsap.set('.debirun-eye-open', { autoAlpha: 1 })
            gsap.set('.debirun-eye-close', { autoAlpha: 0 })
          },
        },
        '<',
      )
      // Phase 7: Victory
      tl.to(bgRef.current, {
        scale: 1.8,
        xPercent: 40,
        yPercent: -40,
        duration: 2.5,
        ease: 'power2.inOut',
      })
      tl.fromTo(
        '.narration-box-1',
        { autoAlpha: 0, scale: 0, rotation: -10 },
        {
          autoAlpha: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: 'elastic.out(1, 0.6)',
        },
        '-=1.0',
      )
      tl.to({}, { duration: 0.5 })
      tl.to('.narration-box-1', {
        autoAlpha: 0,
        scale: 1.2,
        filter: 'blur(10px)',
        duration: 0.5,
      })
      tl.fromTo(
        '.narration-box-2',
        { autoAlpha: 0, y: 50 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: 'back.out(1.5)' },
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Background & Characters (เหมือนเดิม) */}
      <div
        ref={bgRef}
        className="absolute inset-0 h-full w-full origin-center bg-cover bg-center bg-no-repeat will-change-transform"
        style={{ backgroundImage: `url('${bgPath}')` }}
      >
        {/* ... (ตัวละคร Debirun, Mild, Magic ทั้งหมด วางไว้ตรงนี้เหมือนเดิมครับ) ... */}
        {/* เพื่อความกระชับ ผมขอละ Code ส่วนตัวละครไว้นะครับ เพราะไม่ได้แก้ส่วนนี้ */}

        {/* 2. DEBIRUN Container... */}
        <div className="debirun-container absolute bottom-[7%] right-[-5%] z-20 h-[500px] w-[320px] md:h-[650px] md:w-[400px]">
          <div className="relative h-full w-full">
            <img
              src="/assets/part3/Character/Battle/debirun/Pose/Debirun_asset.png"
              className="debirun-arm-hood absolute left-0 top-[2%] z-30 w-full"
              alt="Asset"
            />
            <img
              src="/assets/part3/Character/Battle/debirun/Pose/Debirun_arm_l.png"
              className="debirun-arm-l absolute left-[-1%] top-[2%] z-20 w-full"
              alt="L Arm"
            />
            <img
              src="/assets/part3/Character/Battle/debirun/Pose/Debirun_arm_r.png"
              className="debirun-arm-r absolute left-0 top-[3%] z-20 w-full"
              alt="R Arm"
            />
            <div className="debirun-head-group absolute left-0 top-[1%] z-10 w-full">
              <img
                src="/assets/part3/Character/Battle/debirun/Pose/Debirun_body_op.png"
                className="debirun-eye-open w-full object-contain"
                alt="Eye Open"
              />
              <img
                src="/assets/part3/Character/Battle/debirun/Pose/Debirun_body_cl.png"
                className="debirun-eye-close absolute left-0 top-0 w-full object-contain opacity-0"
                alt="Eye Close"
              />
            </div>
          </div>
        </div>
        {/* 4. MAGIC DEBIRUN ... */}
        <div className="debirun-magic-group2 pointer-events-none absolute bottom-[0%] right-[2%] z-10 h-full w-full">
          <img
            src="/assets/part3/Character/Battle/Mild/Magic1/Sun&moon_Circle.png"
            className="debirun-circle-1 absolute bottom-[40%] right-[18%] z-10 w-[200px]"
            alt="circle1"
          />
          <img
            src="/assets/part3/Character/Battle/Mild/Magic1/Sun&moon_Circle.png"
            className="debirun-circle-3 absolute bottom-[25%] right-[12%] z-10 w-[200px]"
            alt="circle2"
          />
          <img
            src="/assets/part3/Character/Battle/Mild/Magic1/Sun&moon_Circle.png"
            className="debirun-circle-2 absolute bottom-[23%] right-[-3%] z-10 w-[200px]"
            alt="circle3"
          />
          <img
            src="/assets/part3/Character/Battle/debirun/Magic/magic_1.png"
            className="debirun-magic-1 absolute bottom-[26%] right-[10%] z-10 w-[750px]"
            alt="magic-main-1"
          />
          <img
            src="/assets/part3/Character/Battle/debirun/Magic/magic_3.png"
            className="debirun-magic-3 absolute bottom-[8%] right-[7%] z-10 w-[600px]"
            alt="magic-main-3"
          />
          <img
            src="/assets/part3/Character/Battle/debirun/Magic/magic_2.png"
            className="debirun-magic-2 absolute bottom-[10%] right-[2%] z-10 w-[600px]"
            alt="magic-main-2"
          />
        </div>
        {/* 3. MILD POSE 1 & 2 ... */}
        <div className="mild-pose-1 absolute bottom-[-20%] left-[-3%] z-20 h-[500px] w-[320px] md:h-[750px] md:w-[500px]">
          <div className="relative h-full w-full">
            <img
              src="/assets/part3/Character/Battle/Mild/Pose4/mild_body.png"
              className="absolute left-0 top-0 z-10 w-full"
              alt="Body"
            />
            <img
              src="/assets/part3/Character/Battle/Mild/Pose4/mild_hood.png"
              className="mild-hood absolute left-0 top-0 z-20 w-full"
              alt="Hood"
            />
            <div className="mild-head-group absolute left-0 top-0 z-30 w-full">
              <div className="absolute left-0 top-[1%] w-full">
                <img
                  src="/assets/part3/Character/Battle/Mild/Pose4/mild_head_op.png"
                  className="mild-eye-open w-full object-contain"
                  alt="Face Open"
                />
                <img
                  src="/assets/part3/Character/Battle/Mild/Pose4/mild_head_cl.png"
                  className="mild-eye-close absolute left-0 top-0 w-full object-contain opacity-0"
                  alt="Face Close"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mild-pose-2 absolute bottom-[-20%] left-[-3%] z-20 h-[500px] w-[320px] opacity-0 md:h-[750px] md:w-[500px]">
          <div className="relative h-full w-full scale-x-[-1]">
            <img
              src="/assets/part3/Character/Battle/Mild/Pose1/Mild_R_1_Arm.png"
              className="Mild-arm-l absolute left-0 top-0 z-20 w-full"
              alt="L Arm"
            />
            <img
              src="/assets/part3/Character/Battle/Mild/Pose1/Mild_R_1_hair.png"
              className="Mild-hair absolute left-0 top-0 z-10 w-full"
              alt="Hair"
            />
            <div className="absolute left-0 top-[1%] z-30 w-full">
              <img
                src="/assets/part3/Character/Battle/Mild/Pose1/Mild_R_1_Body_op.png"
                className="w-full object-contain"
                alt="Eye Open"
              />
              <img
                src="/assets/part3/Character/Battle/Mild/Pose1/Mild_R_1_Body_cl.png"
                className="Mild-eye-close absolute left-0 top-0 w-full object-contain opacity-0"
                alt="Eye Close"
              />
            </div>
          </div>
        </div>
        {/* 5. MAGIC MILD ... */}
        <div className="mild-magic-back pointer-events-none absolute bottom-[-10%] left-[-12%] z-10 opacity-0">
          <div className="mild-magic-float-group relative h-[700px] w-[700px]">
            <img
              src="/assets/part3/Character/Battle/Mild/Magic2/magic_circle.png"
              className="absolute inset-0 z-10 w-full opacity-80"
              alt="magic-circle"
            />
          </div>
        </div>
        <div className="mild-magic-front pointer-events-none absolute bottom-[-10%] left-[-12%] z-30 opacity-0">
          <div className="mild-magic-float-group relative h-[700px] w-[700px]">
            <img
              src="/assets/part3/Character/Battle/Mild/Magic2/magic0.png"
              className="absolute inset-0 z-40 w-full opacity-60 mix-blend-screen"
              alt="magic-0"
            />
            <img
              src="/assets/part3/Character/Battle/Mild/Magic2/magic1.png"
              className="absolute inset-0 z-40 w-full opacity-60"
              alt="magic-1"
            />
            <img
              src="/assets/part3/Character/Battle/Mild/Magic2/magic2.png"
              className="absolute inset-0 z-40 w-full animate-pulse opacity-50"
              alt="magic-2"
            />
            <img
              src="/assets/part3/Character/Battle/Mild/Magic2/magic3.png"
              className="absolute inset-0 z-40 w-full animate-pulse"
              alt="magic-3"
            />
          </div>
          <img
            src="/assets/part3/Character/Battle/Mild/Magic2/panda.png"
            className="mild-panda absolute left-[10%] top-[40%] z-50 w-[150px] opacity-0"
            alt="panda-1"
          />
          <img
            src="/assets/part3/Character/Battle/Mild/Magic2/panda.png"
            className="mild-panda absolute left-[30%] top-[30%] z-50 w-[170px] opacity-0"
            alt="panda-2"
          />
          <img
            src="/assets/part3/Character/Battle/Mild/Magic2/panda.png"
            className="mild-panda absolute bottom-[30%] left-[40%] z-50 w-[100px] opacity-0"
            alt="panda-3"
          />
        </div>
      </div>
      {/* End Background */}

      {/* UI Elements: Flash */}
      <div className="white-flash pointer-events-none absolute inset-0 z-50 bg-white opacity-0 mix-blend-overlay"></div>

      {/* ============================================== */}
      {/* 3 กล่อง Intro แบบ พิธีกรพากย์มวย */}
      {/* ============================================== */}

      {/* กล่อง 1: จบกันไปแล้ว */}
      <div className="intro-box-1 narration-final-1 absolute left-1/2 top-[25%] z-40 max-w-xl -translate-x-1/2 -translate-y-1/2 rotate-1 rounded-lg border-8 border-yellow-500 bg-white/90 p-8 text-center opacity-0 shadow-2xl shadow-yellow-800/50 will-change-transform">
        <p className=" text-2xl font-medium leading-tight text-black md:text-3xl">
          ไม่น่าเชื่อว่าคู่ชิงจะเป็น
        </p>
        <p className=" mt-2 text-xl font-medium leading-relaxed text-red-700 md:text-2xl">
          <i>
            <b> MILD-R </b>
          </i>{' '}
          พบกับ{' '}
          <i>
            <b> อดีตแชมป์ Debby</b>
          </i>
        </p>
      </div>

      {/* กล่อง 2B: น่าจับตามอง (ส่วนขยาย) */}
      <div className="intro-box-2 narration-final-2b absolute left-1/2 top-[25%] z-40 max-w-xl -translate-x-1/2 -translate-y-1/2 rotate-[3deg] rounded-lg border-8 border-black bg-white/90 p-8 text-center opacity-0 shadow-2xl shadow-green-900/50 will-change-transform">
        <p className="mt-4 text-xl font-medium leading-relaxed text-black">
          ถือว่าเป็นครั้งแรกของเธอเลย <br />
          ที่ได้ลงแข่งรายการนี้แต่ก็มาได้ถึงรอบชิง
        </p>
      </div>

      {/* กล่อง 2B: น่าจับตามอง (ส่วนขยาย) */}
      <div className="intro-box-3 narration-final-2b absolute left-1/2 top-[25%] z-40 max-w-xl -translate-x-1/2 -translate-y-1/2 rotate-[3deg] rounded-lg border-8 border-black bg-white/90 p-8 text-center opacity-0 shadow-2xl shadow-green-900/50 will-change-transform">
        <p className="mt-4 text-xl font-medium leading-relaxed text-black">
          ไปลุ้นกันดีกว่าว่าใครจะคว้าชัยชนะครั้งนี้ระหว่าง MILD-R หรือ อดีตแชมป์
          Debby
        </p>
      </div>

      {/* ============================================== */}

      {/* Box ตอนจบ: ประกาศชื่อผู้ชนะ (เหมือนเดิม) */}
      <div className="narration-box-1 absolute left-1/2 top-[25%] z-40 w-[90%] max-w-2xl -translate-x-1/2 -translate-y-1/2 opacity-0">
        <div className="relative overflow-hidden rounded-2xl border-4 border-yellow-400 bg-gradient-to-b from-white to-yellow-50 p-1 shadow-[0_0_60px_rgba(234,179,8,0.6)] backdrop-blur-sm">
          <div className="rounded-xl border-2 border-dashed border-yellow-200 bg-white/95 px-8 py-10 text-center shadow-inner">
            <p className="font-serif text-xl font-bold leading-relaxed text-slate-600 md:text-4xl">
              ไม่น่าเชื่อเลยว่าแชมป์จะตกเป็นของ
              <br />
              นักแข่งหน้าใหม่...
            </p>
            <div className="mt-6 transform transition-all duration-500 hover:scale-105">
              <span className="block bg-gradient-to-r from-pink-500 via-red-500 to-pink-500 bg-clip-text text-7xl font-black italic tracking-tighter text-transparent drop-shadow-[0_5px_5px_rgba(0,0,0,0.2)] md:text-8xl">
                Mild-R!
              </span>
              <span className="mt-[-10px] block text-lg font-bold uppercase tracking-[0.5em] text-yellow-500">
                The Winner
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Box ตอนจบ: เชิญรับรางวัล (เหมือนเดิม) */}
      <div className="narration-box-2 absolute left-1/2 top-[25%] z-40 w-[90%] max-w-xl -translate-x-1/2 -translate-y-1/2 opacity-0">
        <div className="relative rotate-1 transform rounded-xl border-[6px] border-double border-yellow-500 bg-white/95 p-8 text-center shadow-2xl shadow-yellow-600/40">
          <div className="mb-4 flex justify-center text-4xl text-yellow-500">
            👑
          </div>
          <p className="font-serif text-xl font-bold leading-relaxed text-gray-800 md:text-2xl">
            ขอแสดงความยินดีกับชัยชนะด้วยนะครับ <br />
            <span className="mt-2 block text-base font-medium text-gray-500">
              ต่อไปขอเชิญแชมป์ปีนี้ขึ้นมารับรางวัลด้วยครับ
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
