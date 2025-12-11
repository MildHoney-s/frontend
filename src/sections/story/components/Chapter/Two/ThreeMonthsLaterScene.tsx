import { threeMonthsAssets } from '@/assets/chapterTwoAssets'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  onComplete: () => void
}

const SplitText = ({
  children,
  className,
}: {
  children: string
  className?: string
}) => {
  return (
    <span className={className} aria-label={children}>
      {children.split('').map((char, index) => (
        <span
          key={index}
          className="char-reveal inline-block translate-y-4 opacity-0"
          style={{ minWidth: char === ' ' ? '0.3em' : 'auto' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}

export default function ThreeMonthsLaterScene({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  const bgImg = threeMonthsAssets.bg_field

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // --- INITIAL SETUP ---
      // ✅ ตั้งค่าพื้นหลังดำให้ทึบสุด และอยู่ layer ล่าง (z-60)
      gsap.set('.black-overlay', { autoAlpha: 1, zIndex: 60 })

      // ✅ ตั้งค่ากลุ่มข้อความให้อยู่ layer บนกว่า (z-65) เพื่อให้เห็นบนพื้นดำ
      gsap.set('.time-skip-group', { autoAlpha: 1, zIndex: 65 })

      // Characters
      gsap.set('.mild-group', { x: -30, autoAlpha: 0 })
      gsap.set('.honey-group', { x: 30, autoAlpha: 0 })

      // Mild Setup
      gsap.set('.mild-face-worry', { autoAlpha: 1 })
      gsap.set(['.mild-face-happy', '.mild-face-drink'], { autoAlpha: 0 })

      // ✅ Arm Setup: เริ่มต้นใช้ Arm 2 (คุย)
      gsap.set(['.mild-arm-2-l', '.mild-arm-2-r'], { autoAlpha: 1 })
      gsap.set(['.mild-arm-1-l', '.mild-arm-milktea-r'], { autoAlpha: 0 }) // ซ่อนชุดกินชานมไว้ก่อน

      // Bubbles & Text
      gsap.set(['.bubble-mild', '.bubble-honey'], { scale: 0, autoAlpha: 0 })
      gsap.set(['.text-m-1', '.text-m-2', '.text-m-3'], {
        display: 'none',
        autoAlpha: 0,
      })
      gsap.set(['.text-h-1', '.text-h-2', '.text-h-3'], {
        display: 'none',
        autoAlpha: 1,
      })

      gsap.set('.final-text-group', { autoAlpha: 0 })

      // =========================================================
      // TIMELINE
      // =========================================================
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=8000',
          scrub: 1,
          pin: true,
          fastScrollEnd: true,
          onLeave: () => onComplete && onComplete(),
        },
      })

      // =========================================================
      // STEP 1: TIME SKIP (บนพื้นหลังดำ)
      // =========================================================

      tl.to('.time-skip-group .char-reveal', {
        y: 0,
        autoAlpha: 1,
        stagger: 0.05,
        duration: 0.8,
        ease: 'back.out',
      })

      tl.to({}, { duration: 0.5 })

      tl.to('.time-skip-group', {
        autoAlpha: 0,
        scale: 1.1,
        duration: 1.5,
        ease: 'power2.inOut',
      })
      tl.to(
        '.black-overlay',
        { autoAlpha: 0, duration: 2, ease: 'power2.inOut' },
        '<',
      )

      // --- STEP 2: SCENE START (ตัวละครโผล่มา) ---
      tl.to(
        ['.mild-group', '.honey-group'],
        {
          autoAlpha: 1,
          x: 0,
          duration: 1,
          ease: 'power2.out',
        },
        '<0.5',
      )

      // =========================================================
      // STEP 3: CONVERSATION (TURN-BASED)
      // =========================================================

      // --- TURN 1: Mild ---
      tl.set('.text-m-1', { display: 'block' })
      tl.to('.bubble-mild', {
        scale: 1,
        autoAlpha: 1,
        duration: 0.5,
        ease: 'back.out',
      })
      tl.to('.text-m-1', { autoAlpha: 1, duration: 0.5 })

      tl.to('.text-m-1', { autoAlpha: 0, duration: 0.2, delay: 1.5 })
      tl.to('.bubble-mild', { scale: 0, autoAlpha: 0, duration: 0.3 }, '<')
      tl.set('.text-m-1', { display: 'none' })

      // --- TURN 2: Honey ---
      tl.set('.text-h-1', { display: 'block' })
      tl.to('.bubble-honey', {
        scale: 1,
        autoAlpha: 1,
        duration: 0.5,
        ease: 'back.out',
      })
      tl.to('.text-h-1 .char-reveal', {
        y: 0,
        autoAlpha: 1,
        stagger: 0.03,
        duration: 0.05,
      })

      tl.to('.text-h-1', { autoAlpha: 0, duration: 0.2, delay: 1.5 })
      tl.to('.bubble-honey', { scale: 0, autoAlpha: 0, duration: 0.3 }, '<')
      tl.set('.text-h-1', { display: 'none' })

      // --- TURN 3: Mild ---
      tl.set('.text-m-2', { display: 'block' })
      tl.to('.bubble-mild', {
        scale: 1,
        autoAlpha: 1,
        duration: 0.5,
        ease: 'back.out',
      })
      tl.to('.text-m-2', { autoAlpha: 1, duration: 0.5 })

      tl.to('.text-m-2', { autoAlpha: 0, duration: 0.2, delay: 1.5 })
      tl.to('.bubble-mild', { scale: 0, autoAlpha: 0, duration: 0.3 }, '<')
      tl.set('.text-m-2', { display: 'none' })

      // --- TURN 4: Honey (Long Text) ---
      tl.set('.text-h-2', { display: 'block' })
      tl.to('.bubble-honey', {
        scale: 1,
        autoAlpha: 1,
        duration: 0.5,
        ease: 'back.out',
      })
      tl.to('.text-h-2 .char-reveal', {
        y: 0,
        autoAlpha: 1,
        stagger: 0.02,
        duration: 0.05,
      })

      tl.to('.text-h-2', { autoAlpha: 0, duration: 0.2, delay: 2.5 })
      tl.to('.bubble-honey', { scale: 0, autoAlpha: 0, duration: 0.3 }, '<')
      tl.set('.text-h-2', { display: 'none' })

      // --- TURN 5: Honey (Invite) ---
      tl.set('.text-h-3', { display: 'block' })
      tl.to('.bubble-honey', {
        scale: 1,
        autoAlpha: 1,
        duration: 0.5,
        ease: 'back.out',
      })
      tl.to('.text-h-3 .char-reveal', {
        y: 0,
        autoAlpha: 1,
        stagger: 0.03,
        duration: 0.05,
      })

      // --- TURN 6: Mild (Response) ---
      tl.to('.text-h-3', { autoAlpha: 0, duration: 0.2, delay: 1.5 })
      tl.to('.bubble-honey', { scale: 0, autoAlpha: 0, duration: 0.3 }, '<')
      tl.set('.text-h-3', { display: 'none' })

      // Mild ยิ้ม + เปิดกล่องตอบ
      tl.to('.mild-face-worry', { autoAlpha: 0, duration: 0.1 })
      tl.to('.mild-face-happy', { autoAlpha: 1, duration: 0.1 }, '<')

      tl.set('.text-m-3', { display: 'block' })
      tl.to('.bubble-mild', {
        scale: 1,
        autoAlpha: 1,
        duration: 0.5,
        ease: 'back.out',
      })
      tl.to('.text-m-3', { autoAlpha: 1, duration: 0.5 })

      // =========================================================
      // STEP 4: MILK TEA MOMENT (SWITCH ARMS & MOVE CLOSER)
      // =========================================================
      tl.to('.text-m-3', { autoAlpha: 0, duration: 0.2, delay: 1 })
      tl.to('.bubble-mild', { scale: 0, autoAlpha: 0, duration: 0.3 }, '<')

      // Zoom BG
      tl.to('.arena-bg', {
        scale: 1.3,
        transformOrigin: 'center bottom',
        duration: 1.5,
        ease: 'power2.inOut',
      })

      // Move Mild right & Scale up
      tl.to('.mild-group', { scale: 1.1, x: 20, duration: 1.5 }, '<')

      // ✅ Move Honey left (closer to Mild), Scale up, NO BLUR, NO FADE
      tl.to(
        '.honey-group',
        {
          scale: 1.05, // ขยายตามนิดหน่อย
          x: -10, // ขยับมาทางซ้ายเข้าหามายด์
          autoAlpha: 1, // ชัดเจน
          filter: 'none', // ไม่เบลอ
          duration: 1.5,
        },
        '<',
      )

      // ✅ สลับแขน: ซ่อน Arm 2 -> โชว์ Arm 1 (กิน)
      tl.to(['.mild-arm-2-l', '.mild-arm-2-r'], { autoAlpha: 0, duration: 0.1 })
      tl.to(
        ['.mild-arm-1-l', '.mild-arm-milktea-r'],
        { autoAlpha: 1, duration: 0.1 },
        '<',
      )

      // --- STEP 5: CHARACTERS WALK OFF SCREEN ---
      tl.to({}, { duration: 0.5 }) // Short pause after milk tea moment

      // Both characters walk off to the right side
      tl.to(
        '.mild-group',
        {
          x: '60vw', // Walk off to the right
          autoAlpha: 0.8,
          duration: 2,
          ease: 'power1.inOut',
        },
        '<',
      )
      tl.to(
        '.honey-group',
        {
          x: '65vw', // Walk off to the right (slightly ahead)
          autoAlpha: 0.8,
          duration: 2,
          ease: 'power1.inOut',
        },
        '<',
      )

      // Fade to black after they walk off
      tl.to('.black-overlay', { autoAlpha: 1, duration: 1.5 }, '>0.3')

      // Final Text
      tl.to('.final-text-group', { autoAlpha: 1, duration: 0.1 })
      tl.to('.final-text-group .char-reveal', {
        y: 0,
        autoAlpha: 1,
        stagger: 0.1,
        duration: 0.5,
        ease: 'back.out',
      })
    }, containerRef)
    return () => ctx.revert()
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      <div className="perspective-[1500px] absolute inset-0 h-full w-full">
        {/* 1. BACKGROUND */}
        <div
          className="arena-bg absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${bgImg}')` }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* 2. TIME SKIP TEXT (zIndex 65 เพื่อให้อยู่เหนือ overlay) */}
        <div className="time-skip-group pointer-events-none absolute inset-0 z-[65] flex flex-col items-center justify-center">
          <h2 className="text-5xl font-bold tracking-wider text-white drop-shadow-lg md:text-7xl">
            <SplitText>3 เดือนผ่านไป...</SplitText>
          </h2>
          <div className="mt-4 h-1 w-24 rounded-full bg-white shadow-lg"></div>
        </div>

        {/* 3. CHARACTERS CONTAINER (pb-0 เพื่อชิดล่าง) */}
        <div className="absolute inset-0 z-10 flex items-end justify-center pb-0">
          {/* --- MILD (LEFT) --- */}
          <div className="mild-group relative z-20 h-[500px] w-[280px] translate-y-20 md:h-[600px] md:w-[350px]">
            <div className="mild-body-img relative h-full w-full">
              {/* Body Base */}
              <img
                src={threeMonthsAssets.mild.hair}
                className="absolute left-0 top-0 z-0 w-full"
                alt="Hair"
              />
              <img
                src={threeMonthsAssets.mild.body}
                className="absolute left-0 top-0 z-10 w-full"
                alt="Body"
              />

              {/* ✅ ชุดแขนที่ 1 (Arm 2 - ใช้ตอนคุย) */}
              <img
                src={threeMonthsAssets.mild.arm_talk_l}
                className="mild-arm-2-l absolute left-0 top-0 z-20 w-full"
                alt="L Arm 2"
              />
              <img
                src={threeMonthsAssets.mild.arm_talk_r}
                className="mild-arm-2-r absolute left-0 top-0 z-20 w-full"
                alt="R Arm 2"
              />

              {/* ✅ ชุดแขนที่ 2 (Arm 1 + MilkTea - ใช้ตอนกิน) */}
              <img
                src={threeMonthsAssets.mild.arm_eat_l}
                className="mild-arm-1-l absolute left-0 top-0 z-20 w-full opacity-0"
                alt="L Arm 1"
              />
              <img
                src={threeMonthsAssets.mild.arm_milktea_r}
                className="mild-arm-milktea-r absolute left-0 top-0 z-40 w-full opacity-0"
                alt="R Arm MilkTea"
              />

              {/* Face */}
              <div className="absolute left-0 top-[1%] z-30 w-full">
                <img
                  src={threeMonthsAssets.mild.face_worry}
                  className="mild-face-worry w-full object-contain"
                  alt="Worry"
                />
                <img
                  src={threeMonthsAssets.mild.face_happy}
                  className="mild-face-happy absolute left-0 top-0 w-full object-contain opacity-0"
                  alt="Happy"
                />
              </div>
            </div>

            {/* Mild Bubble: สีฟ้า */}
            <div className="bubble-mild absolute -left-[20px] -top-[80px] z-50 flex min-h-[100px] w-[240px] origin-bottom-right items-center justify-center rounded-[30px] border-2 border-pink-300 bg-blue-50 p-4 shadow-xl">
              <div className="w-full text-center text-sm leading-snug text-gray-700 md:text-base">
                <p className="text-m-1 tracking-wide">
                  เฮ้อ... <br />
                  อีกแค่เดือนเดียวก็จะถึงงานแข่งแล้ว...
                </p>
                <p className="text-m-2 tracking-wide">
                  คือฉันกำลังคิดว่า... <br />
                  ตัวเองยังไม่พร้อมที่จะไปแข่งเลยค่ะ
                </p>
                <p className="text-m-3 text-lg font-bold tracking-wide text-pink-500">
                  ก็ได้ค่ะ! (ไปกินกัน)
                </p>
              </div>
              {/* ปรับสีหางบอลลูนให้ตรงกับตัวกล่อง */}
              <div className="absolute -bottom-3 right-8 h-4 w-4 rotate-45 transform border-b-2 border-r-2 border-pink-300 bg-blue-50"></div>
            </div>
          </div>

          {/* --- HONEY (RIGHT) --- */}
          <div className="honey-group relative z-20 ml-[-20px] h-[400px] w-[260px] translate-y-40 md:h-[580px] md:w-[320px]">
            <div className="relative h-full w-full">
              <img
                src={threeMonthsAssets.honey.body}
                className="relative w-full"
                alt="Honey Body"
              />
              <img
                src={threeMonthsAssets.honey.face_normal}
                className="absolute left-0 top-[2%] w-full"
                alt="Honey Face"
              />
            </div>

            {/* Honey Magic Text */}
            <div className="bubble-honey absolute -right-[20px] -top-[100px] z-50 flex min-h-[120px] w-[320px] origin-bottom-left flex-col items-end justify-center text-right">
              <div className="text-sm font-medium leading-relaxed text-yellow-300 drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] md:text-base">
                <div className="text-h-1">
                  <SplitText>ทำหน้าแบบนั้น...</SplitText>
                  <br />
                  <span className="text-lg font-bold">
                    <SplitText>กำลังกดดันตัวเองอยู่สินะ</SplitText>
                  </span>
                </div>
                <div className="text-h-2 space-y-2">
                  <p>
                    <SplitText>อย่ากดดันสิ...</SplitText>
                  </p>
                  <p>
                    <SplitText>ฉันเห็นความพยายามของเธอตลอดนะ</SplitText>
                  </p>
                  <p className="text-lg font-bold text-yellow-300">
                    <SplitText>มั่นใจในตัวเองเข้าไว้สิ!</SplitText>
                  </p>
                </div>

                <div className="text-h-3">
                  <SplitText>งั้นพักการฝึกก่อน...</SplitText>
                  <br />
                  <span className="text-xl font-bold text-pink-300 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]">
                    <SplitText>ไปหาไรอร่อยๆ กินกัน!</SplitText>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay (zIndex 60) */}
        <div className="black-overlay pointer-events-none absolute inset-0 z-[60] bg-black"></div>
      </div>
    </div>
  )
}
