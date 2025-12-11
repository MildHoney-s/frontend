import { battleComponentsOneAssets } from '@/assets/chapterThreeAssets'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'

// ลงทะเบียน Plugin
gsap.registerPlugin(ScrollTrigger)

export default function BattleComponentOne() {
  const containerRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  const bgPath = battleComponentsOneAssets.bg

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // =========================================
      // 0. PREPARE HELPER FUNCTIONS (MAGIC)
      // =========================================
      const playFlash = () => {
        gsap.fromTo(
          '.white-flash',
          { opacity: 0.8 },
          { opacity: 0, duration: 0.3, ease: 'power2.out', overwrite: true },
        )
      }

      let idleTween: gsap.core.Timeline | null = null

      const startMagicIdle = () => {
        if (idleTween) idleTween.kill()
        idleTween = gsap.timeline()
        idleTween
          .to(
            '.magic-dr-Skull',
            { y: -15, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' },
            0,
          )
          .to(
            '.magic-dr-arm-l',
            {
              y: -10,
              rotation: 3,
              duration: 2.5,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
            },
            0,
          )
          .to(
            '.magic-dr-arm-r',
            {
              y: -8,
              rotation: -3,
              duration: 2.8,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
            },
            0,
          )
      }

      const stopMagicIdle = () => {
        if (idleTween) {
          idleTween.kill()
          idleTween = null
        }
        gsap.set(['.magic-dr-Skull', '.magic-dr-arm-l', '.magic-dr-arm-r'], {
          y: 0,
          rotation: 0,
        })
      }

      // =========================================
      // 0.1 PREPARE HELPER FUNCTIONS (BLINKING - แยกกันชัดเจน)
      // =========================================
      let drBlinkTween: gsap.core.Timeline | null = null
      let mildBlinkTween: gsap.core.Timeline | null = null

      const startBlinking = () => {
        drBlinkTween = gsap.timeline({ repeat: -1, repeatDelay: 3, delay: 0.5 })
        drBlinkTween
          .to('.dr-eye-close', { autoAlpha: 1, duration: 0.1 })
          .to('.dr-eye-close', { autoAlpha: 0, duration: 0.1, delay: 0.1 })

        mildBlinkTween = gsap.timeline({ repeat: -1, repeatDelay: 4, delay: 2 })
        mildBlinkTween
          .to('.Mild-eye-close', { autoAlpha: 1, duration: 0.1 })
          .to('.Mild-eye-close', { autoAlpha: 0, duration: 0.1, delay: 0.1 })
      }


      startBlinking()

      // =========================================
      // 0.2 BACKGROUND ANIMATIONS (IDLE)
      // =========================================
      // หมุนวงเวทย์
      gsap.to('.magic-dr-ciecle-l', {
        rotation: 360,
        duration: 12,
        repeat: -1,
        ease: 'linear',
        transformOrigin: 'center center',
      })
      gsap.to('.magic-dr-ciecle-r', {
        rotation: -360,
        duration: 15,
        repeat: -1,
        ease: 'linear',
        transformOrigin: 'center center',
      })
      gsap.to('.magic-mild-ice', {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: 'linear',
        transformOrigin: 'center center',
      })
      gsap.to('.magic-mild-sunmoon', {
        rotation: -360,
        duration: 25,
        repeat: -1,
        ease: 'linear',
        transformOrigin: 'center center',
      })
      gsap.to('.magic-mild-fire', {
        rotation: 360,
        duration: 18,
        repeat: -1,
        ease: 'linear',
        transformOrigin: 'center center',
      })

      // Idle ท่าทางตัวละคร
      gsap.to('.dr-arm-l', {
        rotation: 1,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        transformOrigin: 'top right',
      })
      gsap.to('.dr-arm-r', {
        rotation: -1,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        transformOrigin: 'top left',
      })
      gsap.to('.dr-head-group', {
        y: 2,
        rotation: 1,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        transformOrigin: 'bottom center',
      })

      gsap.to('.Mild-arm-l', {
        rotation: 2,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        transformOrigin: 'top right',
      })
      gsap.to('.Mild-hair', {
        rotation: 1,
        y: 1,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        transformOrigin: 'top center',
      })

      // --- Entrance Timeline ---
      const magicEntrance = gsap.timeline({
        onComplete: startMagicIdle,
        onReverseComplete: stopMagicIdle,
        onUpdate: function () {
          if (this.progress() < 1) stopMagicIdle()
        },
      })
      magicEntrance
        .fromTo(
          ['.magic-dr-ciecle-l', '.magic-dr-ciecle-r'],
          { scale: 0, autoAlpha: 0 },
          {
            scale: 1,
            autoAlpha: 1,
            duration: 1.5,
            ease: 'back.out(1.2)',
            transformOrigin: 'center center',
          },
        )
        .fromTo(
          ['.magic-mild-ice', '.magic-mild-sunmoon', '.magic-mild-fire'],
          { scale: 0, autoAlpha: 0 },
          {
            scale: 1,
            autoAlpha: 1,
            duration: 1.5,
            ease: 'back.out(1.2)',
            stagger: 0.2,
            transformOrigin: 'center center',
          },
          '<',
        )
        .fromTo(
          '.magic-dr-Skull',
          { x: -100, y: -100, autoAlpha: 0, scale: 0.5, rotation: -45 },
          {
            x: 0,
            y: 0,
            autoAlpha: 1,
            scale: 1,
            rotation: 0,
            duration: 1,
            ease: 'power2.out',
          },
          '-=1',
        )
        .fromTo(
          ['.magic-dr-arm-l', '.magic-dr-arm-r'],
          { y: 50, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1, stagger: 0.2, ease: 'power2.out' },
          '-=0.5',
        )

      // --- Mild Attack Loop ---
      const mildAttack = gsap.timeline()
      const magicElements = [
        '.magic-mild-ice',
        '.magic-mild-sunmoon',
        '.magic-mild-fire',
      ]
      const targets = [
        { x: -400, y: -500 },
        { x: -800, y: -500 },
        { x: -700, y: -100 },
      ]

      for (let i = 0; i < 3; i++) {
        const cycleLabel = `cycle${i}`
        mildAttack.addLabel(`${cycleLabel}_start`)
        magicElements.forEach((el, index) => {
          mildAttack.to(
            el,
            {
              x: targets[index].x,
              y: targets[index].y,
              duration: 0.8,
              ease: 'power2.in',
            },
            `${cycleLabel}_start+=${index * 0.1}`,
          )
        })
        mildAttack.call(playFlash)
        mildAttack.addLabel(`${cycleLabel}_return`)
        magicElements.forEach((el, index) => {
          mildAttack.to(
            el,
            { x: 0, y: 0, duration: 0.8, ease: 'power2.out' },
            `${cycleLabel}_return+=${index * 0.1}`,
          )
        })
        mildAttack.to({}, { duration: 0.2 })
      }

      // =========================================
      // 1. MAIN SCROLL TIMELINE
      // =========================================
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=1800%', // เพิ่มความยาวให้ครอบคลุมฉากประกาศ 3 กล่อง
          scrub: 1,
          pin: true,
        },
      })

      // Phase 1: Intro
      tl.set(bgRef.current, { scale: 2, xPercent: 25, yPercent: 25 })
        .to(bgRef.current, {
          xPercent: -25,
          yPercent: -25,
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

        // Phase 2: Magic Show
        .add(magicEntrance)
        .add(mildAttack)

        // ✅ Phase 3: DEFEAT SEQUENCE
        .call(() => {
          gsap.killTweensOf(['.dr-arm-l', '.dr-arm-r', '.dr-head-group'])
          if (drBlinkTween) drBlinkTween.kill() // สั่ง Kill Loop ก่อน
        })

        // ซ่อน Magic Effects
        .to(
          ['.magic-dr-Skull',
            '.magic-dr-arm-l',
            '.magic-dr-arm-r',
            '.magic-dr-ciecle-l',
            '.magic-dr-ciecle-r',
            '.magic-mild-ice',
            '.magic-mild-sunmoon',
            '.magic-mild-fire'
          ],
          {
            autoAlpha: 0,
            duration: 0.5,
          },
        )

        // Dr.Gamer ร่วง
        .to(
          '.dr-gamer-container',
          {
            y: '25vh',
            rotation: -90,
            ease: 'bounce.out',
            duration: 2,
            onStart: () => {
              drBlinkTween?.pause()
              gsap.set('.dr-eye-open', { autoAlpha: 0 })
              gsap.set('.dr-eye-close', { autoAlpha: 1 })
            },
            onReverseComplete: () => {
              drBlinkTween?.resume()
              gsap.set('.dr-eye-open', { autoAlpha: 1 })
              gsap.set('.dr-eye-close', { autoAlpha: 0 })
            },
          },
          '<', // Start same time as cleanup
        )



        // Final Hold (รอ Mild ชนะ)
        .to({}, { duration: 0.5 })

        // ✅ Phase 4: VICTORY ZOOM (ซูมไปหา Mild)
        .to(bgRef.current, {
          scale: 1.7,
          transformOrigin: '80% 80%', // ซูมไปที่ Mild
          duration: 3,
          ease: 'power2.inOut',
        })

        // ✅ Phase 5: ANNOUNCEMENT (ฉากประกาศ 3 กล่อง)
        .addLabel('announcement')

        // 1. กล่อง 1: จบกันไปแล้ว
        .fromTo(
          '.narration-final-1',
          { autoAlpha: 0, scale: 0.8, rotation: 5 },
          {
            autoAlpha: 1,
            scale: 0.8,
            rotation: 1,
            duration: 1.5,
            ease: 'back.out(1.7)',
          },
          'announcement+=1', // เริ่ม 1 วิ หลังซูม
        )
        // ค้างกล่อง 1 ไว้
        .to(
          '.narration-final-1',
          { autoAlpha: 0, duration: 1 },
          'announcement+=3.5',
        )

        // 2. กล่อง 2A: ไม่น่าเชื่อว่า... มายด์
        .fromTo(
          '.narration-final-2a',
          { autoAlpha: 0, scale: 0.8, rotation: -5 },
          {
            autoAlpha: 1,
            scale: 0.8,
            rotation: -1,
            duration: 1.5,
            ease: 'back.out(1.7)',
          },
          'announcement+=4.5', // เริ่ม 4.5 วิ หลังซูม (ต่อจากกล่อง 1)
        )
        // ค้างกล่อง 2A ไว้
        .to(
          '.narration-final-2a',
          { autoAlpha: 0, duration: 1 },
          'announcement+=7',
        )

        // 3. กล่อง 2B: น่าจับตามอง (ต่อเนื่อง)
        .fromTo(
          '.narration-final-2b',
          { autoAlpha: 0, scale: 0.8, rotation: 3 },
          {
            autoAlpha: 1,
            scale: 0.8,
            rotation: -1,
            duration: 1.5,
            ease: 'back.out(1.7)',
          },
          'announcement+=8', // เริ่ม 8 วิ หลังซูม (ต่อจากกล่อง 2A)
        )

        // จบซีน (ค้างกล่อง 2B ไว้)
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
        className="absolute inset-0 h-full w-full will-change-transform"
      >
        <div
          className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${bgPath}')` }}
        />

        {/* 2. Dr.Gamer */}
        <div className="dr-gamer-container absolute left-[6%] top-[13%] z-20 h-[500px] w-[320px] md:h-[750px] md:w-[500px]">
          <div className="relative h-full w-full">
            <img
              src={battleComponentsOneAssets.drGameArmL}
              className="dr-arm-l absolute left-0 top-0 z-20 w-full"
              alt="L Arm"
            />
            <img
              src={battleComponentsOneAssets.drGameArmR}
              className="dr-arm-r absolute left-0 top-0 z-20 w-full"
              alt="R Arm"
            />
            <img
              src={battleComponentsOneAssets.drGameBody}
              className="absolute left-0 top-0 z-10 w-full"
              alt="Body"
            />
            <div className="dr-head-group absolute left-0 top-[1%] z-30 w-full">
              {/* ตาเปิด (Base) */}
              <img
                src={battleComponentsOneAssets.drGameEyeOpen}
                className="dr-eye-open w-full object-contain"
                alt="Eye Open"
              />
              {/* ตาปิด (Overlay - เริ่มต้นซ่อนอยู่) */}
              <img
                src={battleComponentsOneAssets.drGameEyeClose}
                className="dr-eye-close absolute left-0 top-0 w-full object-contain opacity-0"
                alt="Eye Close"
              />
            </div>
          </div>
        </div>

        {/* 3. Mild */}
        <div className="absolute bottom-[-27%] right-[-5%] z-20 h-[500px] w-[320px] md:h-[750px] md:w-[500px]">
          <div className="relative h-full w-full">
            <img
              src={battleComponentsOneAssets.mildArmR}
              className="Mild-arm-l absolute left-0 top-0 z-20 w-full"
              alt="L Arm"
            />
            <img
              src={battleComponentsOneAssets.mildHair}
              className="Mild-hair absolute left-0 top-0 z-10 w-full"
              alt="Hair"
            />
            <div className="absolute left-0 top-[1%] z-30 w-full">
              <img
                src={battleComponentsOneAssets.mildEyeOpen}
                className="w-full object-contain"
                alt="Eye Open"
              />
              <img
                src={battleComponentsOneAssets.mildEyeClose}
                className="Mild-eye-close absolute left-0 top-0 w-full object-contain opacity-0"
                alt="Eye Close"
              />
            </div>
          </div>
        </div>

        {/* 4. Dr.Gamer [Magic] */}
        <div className="absolute left-[0%] top-[0%] z-20 h-[1300px] w-[1300px]">
          <div className="relative h-full w-full">
            {/* bone R */}
            <div className="pointer-events-none absolute bottom-[13%] left-[0%] h-full w-full">
              <img
                src={battleComponentsOneAssets.drMagicRCircle}
                className="magic-dr-ciecle-r absolute bottom-[35%] left-[2%] z-10 w-[250px]"
                alt="R circle"
              />
              <img
                src={battleComponentsOneAssets.drMagicRBone}
                className="magic-dr-arm-r absolute bottom-[15%] left-0 z-20  w-[1150px]"
                alt="R Bone"
              />
            </div>
            {/* bone L */}
            <img
              src={battleComponentsOneAssets.drMagicLCircle}
              className="magic-dr-ciecle-l absolute left-[27%] top-[3%] z-10 w-[200px]"
              alt="L circle"
            />
            <div className="pointer-events-none absolute left-[-5%] top-[3%] h-full w-full">
              <img
                src={battleComponentsOneAssets.drMagicLBone}
                className="magic-dr-arm-l absolute left-0 top-[-10%] z-20 w-full"
                alt="L Bone"
              />
            </div>

            <img
              src={battleComponentsOneAssets.drMagicSkull}
              className="magic-dr-Skull absolute left-[0%] top-[0%] z-10 w-[400px]"
              alt="head"
            />
          </div>
        </div>

        {/* 5. Mild [Magic] */}
        <div className="pointer-events-none absolute right-[-7%] top-[0%] z-20 h-[1300px] w-[1300px]">
          <div className="relative h-full w-full">
            <img
              src={battleComponentsOneAssets.mildMagicFire}
              className="magic-mild-fire absolute right-[0%] top-[20%] z-10 w-[350px]"
              alt="Fire"
            />
            <img
              src={battleComponentsOneAssets.mildMagicIce}
              className="magic-mild-ice absolute right-[27%] top-[38%] z-10 w-[300px]"
              alt="Ice"
            />
            <img
              src={battleComponentsOneAssets.mildMagicSunMoon}
              className="magic-mild-sunmoon absolute bottom-[18%] right-[2%] z-10 w-[400px]"
              alt="SunMoon"
            />
          </div>
        </div>

        {/* 6. Flash Overlay */}
        <div className="white-flash pointer-events-none absolute inset-0 z-50 bg-white opacity-0 mix-blend-overlay"></div>

        {/* ✅ 7. ANNOUNCEMENT BOXES (Narration) - 3 Boxes แยกตามความต้องการ + ปรับ Design ใหม่ */}

        {/* กล่อง 1: จบกันไปแล้ว */}
        {/* ✅ 7. ANNOUNCEMENT BOXES (Narration) - ปรับ Font และความโปร่งใส */}

        {/* กล่อง 1: จบกันไปแล้ว */}
        <div className="narration-box narration-final-1 absolute left-1/2 top-1/2 z-40 max-w-xl -translate-x-1/2 -translate-y-1/2 rotate-1 rounded-lg border-8 border-yellow-500 bg-white/90 p-8 text-center opacity-0 shadow-2xl shadow-yellow-800/50 will-change-transform">
          <p className=" text-2xl font-medium leading-tight text-black md:text-3xl">
            จบกันไปแล้วสำหรับคู่แรก
          </p>
          <p className=" mt-2 text-xl font-medium leading-relaxed text-red-700 md:text-2xl">
            เป็นการต่อสู้ที่ดุเดือดมาก!
          </p>
        </div>

        {/* กล่อง 2A: ไม่น่าเชื่อว่า... มายด์ */}
        <div className="narration-box narration-final-2a absolute left-1/2 top-1/2 z-40 max-w-xl -translate-x-1/2 -translate-y-1/2 rotate-[-2deg] rounded-lg border-8 border-pink-700 bg-white/90 p-8 text-center opacity-0 shadow-2xl shadow-pink-900/50 will-change-transform">
          <p className=" text-xl font-medium leading-relaxed text-black md:text-2xl">
            ไม่น่าเชื่อว่า<span className="underline">นักเวทม้ามืด</span>อย่าง
            <span className="mt-1 block text-4xl font-medium text-pink-600">
              "MIld-R"
            </span>
          </p>
          <p className=" mt-2 text-xl font-medium leading-relaxed text-black md:text-2xl">
            จะทำออกมาได้สุดยอดขนาดนี้!
          </p>
        </div>

        {/* กล่อง 2B: น่าจับตามอง (ส่วนขยาย) */}
        <div className="narration-box narration-final-2b absolute left-1/2 top-1/2 z-40 max-w-xl -translate-x-1/2 -translate-y-1/2 rotate-[3deg] rounded-lg border-8 border-green-700 bg-white/90 p-8 text-center opacity-0 shadow-2xl shadow-green-900/50 will-change-transform">
          <p className="mt-4 text-xl font-medium leading-relaxed text-black">
            ถือว่าน่าจับตามองกันเลยทีเดียว
            <br />
            ว่าเธอจะสามารถไปได้ไกล
            <br />
            แค่ไหนกันนะครับ!!
          </p>
        </div>
      </div>
    </div>
  )
}
