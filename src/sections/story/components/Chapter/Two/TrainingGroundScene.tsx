import { trainingGroundAssets } from '@/assets/chapterTwoAssets'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'

import MagicCircleSVG from '../../../../../components/MagicCircleSVG'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  onComplete: () => void
}

const MAGIC_RUNES = [
  'ᚠ',
  'ᚢ',
  'ᚦ',
  'ᚨ',
  'ᚱ',
  'ᚲ',
  'ᚷ',
  'ᚹ',
  'ᚺ',
  'ᚾ',
  'ᛁ',
  'ᛃ',
  'ᛇ',
  'ᛈ',
  'ᛉ',
  'ᛊ',
  'ᛏ',
  'ᛒ',
  'ᛖ',
  'ᛗ',
  'ᛚ',
  'ᛜ',
  'ᛞ',
  'ᛟ',
]

export default function TrainingGroundScene({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // =========================================================
      // 1. INITIAL SETUP
      // =========================================================

      // Mild & Magic
      gsap.set('.mild-group', { autoAlpha: 0, scale: 0.8 })
      gsap.set('.mild-face-serious', { autoAlpha: 1 })
      gsap.set(['.mild-face-shock', '.mild-face-sad'], { autoAlpha: 0 })
      gsap.set('.magic-circle-svg', { autoAlpha: 0, scale: 0, rotation: 0 })
      gsap.set('.rune-char', { autoAlpha: 0, scale: 0, x: 0, y: 0 })
      gsap.set('.fail-symbol', { autoAlpha: 0, scale: 0 })
      gsap.set('.magic-text', { autoAlpha: 0, y: 20 })

      // Bully
      gsap.set('.group-students', { autoAlpha: 0 })
      gsap.set('.bully-word', { autoAlpha: 0, scale: 0 })
      gsap.set('.bully-laugh', { scale: 0, opacity: 0 })

      // Honey (เริ่มนอกจอซ้าย x: -200)
      gsap.set('.honey-group', { x: -200, autoAlpha: 0 })
      gsap.set(
        ['.honey-face-scare', '.honey-face-worry', '.honey-face-normal'],
        { autoAlpha: 0 },
      )
      gsap.set('.honey-bubble', {
        scale: 0,
        opacity: 0,
        transformOrigin: 'bottom left',
      })
      gsap.set(['.honey-text-1', '.honey-text-2', '.honey-text-3'], {
        autoAlpha: 0,
      })

      // Scene
      gsap.set('.location-title', { y: 30, autoAlpha: 0 })
      gsap.set('.black-overlay', { autoAlpha: 1 })

      // Animation เดินดึ๋งๆ (เหมือนฉากโรงเรียน)
      gsap.to('.honey-body-img', {
        scaleY: 1.02,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // =========================================================
      // 2. MAIN TIMELINE
      // =========================================================
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          onLeave: () => onComplete && onComplete(),
        },
      })

      // --- PHASE 1: INTRO ---
      tl.to('.black-overlay', { autoAlpha: 0, duration: 2 })
        .fromTo('.arena-bg', { scale: 1 }, { scale: 1.3, duration: 4 }, '<')
        .to('.location-title', { y: 0, autoAlpha: 1, duration: 1 }, '<0.5')
        .to('.location-title', { autoAlpha: 0, duration: 0.5 }, '>1')

      // --- PHASE 2: CASTING MAGIC ---
      tl.to('.mild-group', {
        autoAlpha: 1,
        scale: 1,
        duration: 1,
        ease: 'back.out',
      }).to('.magic-circle-svg', { autoAlpha: 1, scale: 1.2, duration: 1 }, '<')

      // Runes Animation
      const runes = gsap.utils.toArray<HTMLElement>('.rune-char')
      runes.forEach((rune, i) => {
        const angle = (i / runes.length) * Math.PI * 2
        const r = 180 + (Math.random() - 0.5) * 40
        tl.to(
          rune,
          {
            x: Math.cos(angle) * r,
            y: Math.sin(angle) * r,
            rotation: Math.random() * 360,
            autoAlpha: 1,
            scale: 1,
            duration: 0.5,
            ease: 'back.out',
          },
          '<0.01',
        )
      })

      tl.to(['.runes-container', '.magic-circle-svg'], {
        rotation: 180,
        scale: 1.1,
        duration: 0.5,
      }).to(
        '.mild-body-img',
        { x: 5, repeat: 5, yoyo: true, duration: 0.05 },
        '<',
      )

      // --- PHASE 3: EXPLOSION & FAIL ---
      tl.to(['.rune-char', '.magic-circle-svg'], { scale: 0.8, duration: 0.1 })
        .to('.rune-char', {
          x: () => (Math.random() - 0.5) * 1500,
          y: () => (Math.random() - 0.5) * 1500,
          rotation: () => Math.random() * 3000,
          scale: 0,
          autoAlpha: 0,
          duration: 0.3,
          ease: 'expo.out',
        })
        .to('.magic-circle-svg', { scale: 1.5, opacity: 0, duration: 0.2 }, '<')
        .to('.mild-face-serious', { autoAlpha: 0, duration: 0.1 }, '<')
        .to('.mild-face-shock', { autoAlpha: 1, duration: 0.1 }, '<')

        .to('.mild-group', { scale: 0.9, y: 20, duration: 0.5 }, '<')
        .to(
          '.fail-symbol',
          { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'back.out' },
          '<0.2',
        )
        .to('.fail-symbol', { autoAlpha: 0, duration: 0.5 }, '>1')

      // --- PHASE 4: BULLY ---
      tl.to('.group-students', { autoAlpha: 1, duration: 0.5 })
        .to('.bully-1', {
          autoAlpha: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(1.5)',
        })
        .to(
          '.bully-2',
          { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' },
          '>0.2',
        )
        .to('.mild-face-shock', { autoAlpha: 0, duration: 0.5 }, '<')
        .to('.mild-face-sad', { autoAlpha: 1, duration: 0.5 }, '<')
        .to(
          '.bully-3',
          { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' },
          '>0.2',
        )
        .fromTo(
          '.bully-laugh',
          { scale: 0, opacity: 0 },
          { scale: 1.2, opacity: 1, duration: 0.5 },
          '<0.2',
        )

      // --- PHASE 5: HONEY SEQUENCE (Walk Left -> Right) ---

      // 5.1 Focus Shift & Honey Enter (จากซ้าย -> หยุด)
      tl.to(
        [
          '.arena-bg',
          '.group-students',
          '.bully-word',
          '.bully-laugh',
          '.mild-group',
        ],
        {
          filter: 'brightness(0.5)',
          duration: 1,
        },
        '>0.5',
      )
        .to('.arena-bg', { scale: 1.1, duration: 1.5 }, '<')
        .to(
          ['.bully-word', '.bully-laugh'],
          {
            autoAlpha: 0,
            scale: 0.5,
            transformOrigin: 'bottom center',
            duration: 1,
          },
          '<',
        )
        .to(
          '.mild-group',
          { scale: 0.5, transformOrigin: 'bottom center', duration: 1.5 },
          '<',
        )

        .to(
          '.group-students',
          {
            scale: 0.5,
            y: 50,
            transformOrigin: 'bottom center',
            duration: 1.5,
          },
          '<',
        )

        .to(
          '.honey-group',
          { x: 0, autoAlpha: 1, duration: 0.8, ease: 'power2.out' },
          '>0.2',
        )
        .to('.honey-face-scare', { autoAlpha: 1, duration: 0.1 }, '<')
        .to(
          '.honey-bubble',
          { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out' },
          '-=0.3', // บับเบิ้ลเด้งขึ้นมาก่อนหยุดเดินนิดนึง
        )
        .to('.honey-text-1', { autoAlpha: 1, duration: 0.5 }, '<')

        // 5.2 Honey เดินไปกลาง (x: 0 -> 350)
        .to('.honey-group', { x: '35vw', duration: 2, ease: 'linear' }, '>1')
        .to('.honey-text-1', { autoAlpha: 0, duration: 0.3 }, '<')
        .to('.honey-face-scare', { autoAlpha: 0, duration: 0.3 }, '<')
        .to('.honey-face-worry', { autoAlpha: 1, duration: 0.3 }, '<')
        .to('.honey-text-2', { autoAlpha: 1, duration: 0.3 }, '>0.1')

        // 5.3 Honey เดินออกขวา (x: 350 -> 1000)
        .to('.honey-group', { x: '120vw', duration: 2.5, ease: 'linear' }, '>1')
        .to('.honey-text-2', { autoAlpha: 0, duration: 0.3 }, '<')
        .to('.honey-face-worry', { autoAlpha: 0, duration: 0.3 }, '<')
        .to('.honey-face-normal', { autoAlpha: 1, duration: 0.3 }, '<')
        .to('.honey-text-3', { autoAlpha: 1, duration: 0.3 }, '>0.1')

      // --- PHASE 6: EXIT ---
      tl.to('.black-overlay', { autoAlpha: 1, duration: 1 }, '>0.5').to(
        '.magic-text',
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
        },
        '<0.5',
      )
    }, containerRef)
    return () => ctx.revert()
  }, [onComplete])

  return (
    <div ref={containerRef} className="relative h-[1000vh] w-full bg-black">
      <div className="sticky left-0 top-0 h-screen w-full overflow-hidden">
        {/* Background */}
        <div
          className="arena-bg absolute inset-0 origin-bottom transform-gpu bg-cover bg-center will-change-transform"
          style={{ backgroundImage: `url('${trainingGroundAssets.bg_arena}')` }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Title */}
        <div className="location-title pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          <h2 className="text-3xl tracking-wide text-white drop-shadow-xl md:text-5xl">
            ณ ลานฝึกเวทมนตร์
          </h2>
        </div>

        {/* --- CENTER STAGE --- */}
        <div className="absolute inset-0 z-20 flex items-end justify-center pb-[10vh]">
          {/* 1. เพื่อนนักเรียน */}
          <img
            src={trainingGroundAssets.group_students}
            className="group-students absolute bottom-[10%] left-1/2 z-10 w-[85%] -translate-x-1/2 object-contain md:w-[50%]"
            alt="Group"
          />

          {/* 2. MILD CHARACTER */}
          <div className="mild-group relative z-20 h-[400px] w-[250px] will-change-transform md:h-[480px] md:w-[320px]">
            <div className="mild-body-img relative h-full w-full">
              <img
                src={trainingGroundAssets.mild.hair}
                className="absolute left-0 top-0 z-0 h-full w-full object-contain"
                alt="Back Hair"
              />
              <img
                src={trainingGroundAssets.mild.body}
                className="absolute left-0 top-0 z-10 h-full w-full object-contain"
                alt="Body"
              />
              <img
                src={trainingGroundAssets.mild.arm_l}
                className="absolute left-0 top-0 z-20 h-full w-full object-contain"
                alt="Left Arm"
              />
              <img
                src={trainingGroundAssets.mild.arm_r}
                className="absolute left-0 top-0 z-20 h-full w-full object-contain"
                alt="Right Arm"
              />

              {/* Faces */}
              <div className="absolute left-0 top-[1%] z-30 h-auto w-full">
                <img
                  src={trainingGroundAssets.mild.face_serious}
                  className="mild-face-serious w-full object-contain"
                  alt="Serious"
                />
                <img
                  src={trainingGroundAssets.mild.face_shock}
                  className="mild-face-shock absolute left-0 top-0 w-full object-contain"
                  alt="Shock"
                />
                <img
                  src={trainingGroundAssets.mild.face_sad}
                  className="mild-face-sad absolute left-0 top-0 w-full object-contain"
                  alt="Sad"
                />
              </div>
            </div>
            <div className="fail-symbol absolute -top-10 left-1/2 z-40 -translate-x-1/2 text-6xl font-bold text-white drop-shadow-md">
              . . .
            </div>
          </div>

          {/* 3. MAGIC CIRCLE */}
          <div className="runes-container pointer-events-none absolute inset-0 z-50 flex items-center justify-center">
            <MagicCircleSVG
              className="magic-circle-svg absolute text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]"
              style={{ width: '450px', height: '450px' }}
            />
            {MAGIC_RUNES.map((rune, i) => (
              <span
                key={i}
                className="rune-char absolute text-3xl font-bold text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.8)] md:text-5xl"
              >
                {rune}
              </span>
            ))}
          </div>
        </div>

        {/* --- BULLY TEXT SECTION --- */}
        <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
          <div className="bully-word bully-1 absolute left-[5%] top-[25%] max-w-[200px] -rotate-6 md:max-w-[280px]">
            <p className="rounded-lg border border-red-500/50 bg-black/60 p-3 text-center text-lg font-bold leading-snug tracking-wide text-red-500 shadow-lg backdrop-blur-sm md:text-2xl">
              "ดูสิ!
              <br />
              ฝึกไปก็เหนื่อยเปล่า
              <br />
              คนขี้อายแบบเธอ...
              <br />
              จะไปทำได้ยังไงกัน"
            </p>
          </div>
          <div className="bully-word bully-2 absolute right-[5%] top-[35%] max-w-[400px] rotate-3 md:max-w-[400px]">
            <p className="rounded-lg border border-orange-400/50 bg-black/60 p-3 text-center text-lg font-bold leading-snug tracking-wide text-orange-400 shadow-lg backdrop-blur-sm md:text-2xl">
              "สงสัยคงคิดว่า
              <br />
              ตัวเองจะเป็นแบบ
              <br />
              ท่าน <span className="text-yellow-300">“จอมปราชญ์ไร้เสียง”</span>
              <br />
              ได้สิท่า"
            </p>
          </div>
          <div className="bully-word bully-3 absolute left-1/2 top-[15%] max-w-[600px] -translate-x-1/2 md:max-w-[600px]">
            <p className="stroke-black text-center text-xl font-black leading-tight tracking-widest text-yellow-400 drop-shadow-[0_2px_4px_rgba(0,0,0,1)] md:text-3xl">
              "งานประจำปีอย่าคิดไปลงเชียวนะ!
              <br />
              <span className="mt-2 block text-lg font-bold tracking-widest text-red-500 md:text-2xl">
                เดี๋ยวพวกฉันเสียชื่อ
                <br />
                ที่มีเพื่อนร่วมชั้น...
                <br />
                ไร้ความสามารถแบบเธอ!"
              </span>
            </p>
          </div>
          <div className="bully-laugh absolute inset-0 z-[-1] flex items-center justify-center">
            <h1 className="text-[100px] font-black leading-none tracking-tighter text-white opacity-20 md:text-[150px]">
              ฮาฮา
            </h1>
          </div>
        </div>

        {/* --- HONEY SECTION --- */}
        <div className="honey-group absolute bottom-0 left-0 z-40 h-[500px] w-[300px] md:left-20">
          <div className="relative h-full w-full">
            {/* Added class honey-body-img for scaleY animation */}
            <img
              src={trainingGroundAssets.honey.body}
              className="honey-body-img absolute bottom-0 left-0 w-full object-contain"
              alt="Honey Body"
            />

            {/* Faces */}
            <img
              src={trainingGroundAssets.honey.face_scare}
              className="honey-face-scare absolute left-1/2 top-[115px] w-[320px] -translate-x-1/2 object-contain"
              alt="Scare"
            />
            <img
              src={trainingGroundAssets.honey.face_worry}
              className="honey-face-worry absolute left-1/2 top-[115px] w-[320px] -translate-x-1/2 object-contain"
              alt="Worry"
            />
            <img
              src={trainingGroundAssets.honey.face_normal}
              className="honey-face-normal absolute left-1/2 top-[115px] w-[320px] -translate-x-1/2 object-contain"
              alt="Normal"
            />

            {/* Bubble - สไตล์เดียวกับ SchoolScene */}
            <div className="honey-bubble absolute -right-[200px] -top-[40px] z-50 flex min-h-[150px] w-[300px] origin-bottom-left items-center justify-center rounded-[30px] border-4 border-gray-100 bg-white p-6 text-black shadow-xl md:w-[320px]">
              <div className="relative h-full w-full">
                {/* Text 1 */}
                <div className="honey-text-1 absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-center text-xl font-semibold leading-relaxed tracking-wide">
                    "เอ๊ะ.. นั่นมายด์รึป่าว?
                    <br />
                    ทำไมเหมือนโดนแกล้งเลย..."
                  </p>
                </div>

                {/* Text 2 */}
                <div className="honey-text-2 absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-center text-xl font-semibold leading-relaxed tracking-wide">
                    "นี่มันเหมือนกับเรา
                    <br />
                    เมื่อก่อนเลย...
                    <br />
                    มายด์ต้องรู้สึกแย่มากแน่ๆ"
                  </p>
                </div>

                {/* Text 3 */}
                <div className="honey-text-3 absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-center text-xl font-semibold leading-relaxed tracking-wide">
                    "หรือเราควรจะสอนมายด์ดู!
                    <br />
                    ...เดี๋ยวเสร็จธุระแล้ว
                    <br />
                    รีบมาหาดีกว่า!"
                  </p>
                </div>
              </div>

              {/* หาง Bubble */}
              <div className="absolute -bottom-2 -left-2 h-6 w-6 rounded-full bg-white"></div>
              <div className="absolute -bottom-5 -left-6 h-3 w-3 rounded-full bg-white"></div>
            </div>
          </div>
        </div>

        {/* Black Overlay */}
        <div className="black-overlay pointer-events-none absolute inset-0 z-50 flex items-center justify-center bg-black">
          <div className="magic-text text-center opacity-0">
            <p className="text-lg italic text-white">
              &lt; หลังจากฮันนี่เสร็จธุระแล้ว &gt;
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
