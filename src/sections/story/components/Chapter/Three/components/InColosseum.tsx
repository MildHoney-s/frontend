import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'

import { SmartSplitText } from '../../Two/component/SmartSplitText'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  onComplete?: () => void
}

export default function InColosseum({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ... (GSAP Setup ส่วนบนเหมือนเดิม) ...
      gsap.set('.colosseum-in-bg', {
        scale: 1.2,
        transformOrigin: 'center top',
        yPercent: 0,
      })
      gsap.set(['.mild-group', '.honey-group'], { opacity: 0, y: 20 })
      gsap.set(
        [
          '.bubble-mild-1',
          '.bubble-mild-2',
          '.bubble-mild-3',
          '.bubble-mild-4',
        ],
        {
          opacity: 0,
          scale: 0,
          transformOrigin: 'bottom left',
        },
      )
      gsap.set('.magic-char', { y: 20, autoAlpha: 0 })
      gsap.set('.mild-face-worry', { autoAlpha: 1 })
      gsap.set('.mild-face-happy', { autoAlpha: 0 })
      gsap.set('.mild-asset-mimi', { autoAlpha: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=1400%',
          scrub: 1,
          pin: true,
          onLeave: () => {
            if (onComplete) onComplete()
          },
        },
      })

      // ... (Timeline Logic เหมือนเดิม) ...
      tl.to('.colosseum-in-bg', { yPercent: -20, duration: 2, ease: 'none' })
        .to(['.mild-group', '.honey-group'], {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
        })
        .to('.bubble-mild-1', {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
        })
        .to({}, { duration: 0.5 })
        .to('.bubble-mild-1', {
          opacity: 0,
          scale: 0,
          duration: 0.3,
          ease: 'back.in(1.7)',
        })
        .to('.bubble-mild-2', {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
        })

        // Hide Bubble 2
        .to({}, { duration: 0.8 })
        .to('.bubble-mild-2', {
          opacity: 0,
          scale: 0,
          duration: 0.3,
          ease: 'back.in(1.7)',
        })

        // Magic Text 1-2
        .to('.line-1 .magic-char', {
          y: 0,
          autoAlpha: 1,
          duration: 0.1,
          stagger: 0.05,
          ease: 'power2.out',
        })
        .to(
          '.line-2 .magic-char',
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.1,
            stagger: 0.05,
            ease: 'power2.out',
          },
          '+=0.1',
        )

        // Collapse 1-2
        .to(
          ['.magic-line-wrapper-1', '.magic-line-wrapper-2'],
          {
            autoAlpha: 0,
            height: 0,
            marginTop: 0,
            marginBottom: 0,
            duration: 0.5,
            ease: 'power2.inOut',
          },
          '+=0.5',
        )

        // Magic Text 3-4
        .to('.line-3 .magic-char', {
          y: 0,
          autoAlpha: 1,
          duration: 0.1,
          stagger: 0.05,
          ease: 'power2.out',
        })
        .to(
          '.line-4 .magic-char',
          {
            y: 0,
            autoAlpha: 1,
            scale: 1.2,
            duration: 0.3,
            stagger: 0.08,
            ease: 'back.out(2)',
          },
          '+=0.1',
        )
        .to('.line-4 .magic-char', { scale: 1, duration: 0.2 })

        // Clear Screen
        .to(
          ['.magic-line-wrapper-3', '.magic-line-wrapper-4'],
          { autoAlpha: 0, duration: 0.5 },
          '+=0.5',
        )
        .to('.mild-face-worry', { autoAlpha: 0, duration: 0.2 }, '<')
        .to('.mild-face-happy', { autoAlpha: 1, duration: 0.2 }, '<')
        .to('.mild-asset-mimi', { autoAlpha: 1, duration: 0.2 }, '<')

        // Bubble 3-4
        .to('.bubble-mild-3', {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
        })
        .to({}, { duration: 0.8 })
        .to('.bubble-mild-3', {
          opacity: 0,
          scale: 0,
          duration: 0.3,
          ease: 'back.in(1.7)',
        })
        .to('.bubble-mild-4', {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
        })
        .to({}, { duration: 1.5 })
        .to('.bubble-mild-4', {
          opacity: 0,
          scale: 0,
          duration: 0.5,
          ease: 'back.in(1.7)',
        })
        .to({}, { duration: 0.5 })
    }, containerRef)
    return () => ctx.revert()
  }, [onComplete])

  return (
    <div ref={containerRef} className="relative h-screen w-full bg-black">
      <div className="relative h-full w-full overflow-hidden font-sans">
        {/* Background & Characters (เหมือนเดิม) */}
        <div
          className="colosseum-in-bg absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/assets/part3/BG/bg_colosseum_in.png')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
        </div>

        <div className="pointer-events-none absolute inset-0 z-10">
          {/* MILD */}
          <div className="mild-group absolute bottom-[4%] left-[5%] z-20 h-[500px] w-[280px] translate-y-10 will-change-transform md:left-[25%] md:h-[600px] md:w-[350px]">
            <div className="mild-body-img relative h-full w-full">
              {/* Asset */}

              <img
                src="/assets/Part2/Mild/Assets/giff.png"
                className="absolute left-0 top-0 z-50 w-full"
                alt="Hair"
              />
              <img
                src="/assets/Part2/Mild/Assets/mimi.png"
                className="mild-asset-mimi absolute left-0 top-0 z-50 w-full"
                alt="Hair"
              />

              {/* body */}
              <img
                src="/assets/Part2/Mild/Body/Hair.PNG"
                className="absolute left-0 top-0 z-0 w-full"
                alt="Hair"
              />
              <img
                src="/assets/Part2/Mild/Body/Body_1.PNG"
                className="absolute left-0 top-0 z-10 w-full"
                alt="Body"
              />
              <img
                src="/assets/Part2/Mild/Arms/Arm_2_L.PNG"
                className="mild-arm-2-l absolute left-0 top-0 z-20 w-full"
                alt="L Arm 2"
              />
              <img
                src="/assets/Part2/Mild/Arms/Arm_2_R.PNG"
                className="mild-arm-2-r absolute left-0 top-0 z-20 w-full"
                alt="R Arm 2"
              />
              <img
                src="/assets/Part2/Mild/Arms/Arm_1_L.PNG"
                className="mild-arm-1-l absolute left-0 top-0 z-20 w-full opacity-0"
                alt="L Arm 1"
              />
              <img
                src="/assets/Part2/Mild/Arms/Arm_milktea_R.PNG"
                className="mild-arm-milktea-r absolute left-0 top-0 z-40 w-full opacity-0"
                alt="R Arm MilkTea"
              />
              <div className="absolute left-0 top-[1%] z-30 w-full">
                <img
                  src="/assets/Part2/Mild/Face/Face_05_หน้าเศร้า.PNG"
                  className="mild-face-worry w-full object-contain"
                  alt="Worry"
                />
                <img
                  src="/assets/Part2/Mild/Face/Face_02_หน้ายิ้ม.PNG"
                  className="mild-face-happy absolute left-0 top-0 w-full object-contain opacity-0"
                  alt="Happy"
                />
              </div>
            </div>
          </div>

          {/* BUBBLES 1-4 (เหมือนเดิม) */}
          <div className="bubble-mild-1 absolute left-[20%] top-[40%] z-40 max-w-[200px] rounded-xl bg-white p-4 text-black shadow-lg after:absolute after:bottom-[-10px] after:left-4 after:border-[10px] after:border-transparent after:border-t-white after:content-['']">
            <p className="text-center text-xl font-bold tracking-wide text-pink-600 md:text-3xl">
              งือ~~
            </p>
          </div>
          <div className="bubble-mild-2 absolute left-[10%] top-[40%] z-40 max-w-[250px] rounded-xl bg-white p-4 text-black shadow-lg after:absolute after:bottom-[-10px] after:left-4 after:border-[10px] after:border-transparent after:border-t-white after:content-[''] md:max-w-[400px]">
            <p className="text-center text-xl font-bold tracking-wide text-pink-600 md:text-2xl">
              พิธีกรเรียกชื่อฉันแล้ว ทำไงดีไม่มั่นใจเลยว่าจะทำได้ไหม
            </p>
          </div>
          <div className="bubble-mild-3 absolute left-[10%] top-[40%] z-40 max-w-[250px] rounded-xl bg-white p-4 text-black shadow-lg after:absolute after:bottom-[-10px] after:left-4 after:border-[10px] after:border-transparent after:border-t-white after:content-[''] md:max-w-[400px]">
            <p className="text-center text-xl font-bold tracking-wide text-pink-600 md:text-2xl">
              อือ ขอบคุณนะที่เป็นกำลังใจให้เสมอ
            </p>
          </div>
          <div className="bubble-mild-4 absolute left-[10%] top-[40%] z-40 max-w-[250px] rounded-xl bg-white p-4 text-black shadow-lg after:absolute after:bottom-[-10px] after:left-4 after:border-[10px] after:border-transparent after:border-t-white after:content-[''] md:max-w-[400px]">
            <p className="text-center text-xl font-bold tracking-wide text-pink-600 md:text-2xl">
              ฉันจะออกไปแสดงผลลัพธ์ของการฝึกกับฮันนี่ให้ทุกคนเห็นเอง
            </p>
          </div>
        </div>

        {/* HONEY (เหมือนเดิม) */}
        <div className="pointer-events-none absolute inset-0 z-10">
          <div className="honey-group absolute bottom-[-2%] left-[5%] z-20 h-[500px] w-[280px] translate-y-10 will-change-transform md:left-[60%] md:h-[600px] md:w-[350px]">
            <div className="honey-body-img relative h-full w-full">
              <img
                src="/assets/Part2/Honey/Normal_Face.PNG"
                className="absolute left-0 top-0 z-20 w-full"
                alt="Face"
              />
              <img
                src="/assets/Part2/Honey/Body.PNG"
                className="absolute left-0 top-0 z-10 w-full"
                alt="Body"
              />
            </div>
          </div>
        </div>

        {/* ✅ MAGIC TEXT LAYER (แก้ตรงนี้) */}
        <div className="magic-text-group pointer-events-none absolute inset-0 z-[60] flex flex-col items-end justify-center pr-[5%] md:pr-[10%]">
          <div className="relative flex flex-col items-end space-y-6 p-4 text-right">
            {/* Line 1 (ต้องมี overflow-hidden เพื่อใช้ animation หุบ) -> เพิ่ม py-1 กันเงาขาด */}
            <div className="magic-line-wrapper-1 overflow-hidden py-1">
              <p className="text-xl font-bold leading-relaxed tracking-wider text-blue-200 drop-shadow-[0_2px_4px_rgba(0,0,0,1)] [-webkit-text-stroke:1px_rgba(0,0,0,0.6)] md:text-3xl">
                <SmartSplitText className="line-1">
                  เธอทำได้สิ อย่างที่ฉันเคยบอก
                </SmartSplitText>
              </p>
            </div>

            {/* Line 2 (ต้องมี overflow-hidden เพื่อใช้ animation หุบ) -> เพิ่ม py-1 กันเงาขาด */}
            <div className="magic-line-wrapper-2 overflow-hidden py-1">
              <p className="text-xl font-bold leading-relaxed tracking-wider text-blue-200 drop-shadow-[0_2px_4px_rgba(0,0,0,1)] [-webkit-text-stroke:1px_rgba(0,0,0,0.6)] md:text-3xl">
                <SmartSplitText className="line-2">
                  ตลอดเวลาที่เธอฝึกกับฉัน
                </SmartSplitText>
              </p>
            </div>

            {/* Line 3 (ไม่หุบ -> เอา overflow-hidden ออก + เพิ่ม py-1) */}
            <div className="magic-line-wrapper-3 whitespace-nowrap py-1">
              <p className="text-xl font-bold leading-relaxed tracking-wider text-blue-200 drop-shadow-[0_2px_4px_rgba(0,0,0,1)] [-webkit-text-stroke:1px_rgba(0,0,0,0.6)] md:text-3xl">
                <SmartSplitText className="line-3">
                  ฉันเห็นว่าเธอพยายามมากแค่ไหน
                </SmartSplitText>
              </p>
            </div>

            {/* Line 4 (ไม่หุบ -> เอา overflow-hidden ออก + เพิ่ม py-1) */}
            <div className="magic-line-wrapper-4 whitespace-nowrap py-1">
              <p className="text-xl font-bold leading-relaxed tracking-wider text-blue-200 drop-shadow-[0_2px_4px_rgba(0,0,0,1)] [-webkit-text-stroke:1px_rgba(0,0,0,0.6)] md:text-3xl">
                <SmartSplitText className="line-4">
                  มั่นใจเข้าไว้นะ สู้ๆ!
                </SmartSplitText>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
