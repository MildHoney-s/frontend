import { inColosseumAssets } from '@/assets/chapterThreeAssets'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  onComplete?: () => void
}

// 1. SplitText Component
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

export default function InColosseum({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // --- SETUP ---
      gsap.set('.colosseum-in-bg', {
        scale: 1.2,
        transformOrigin: 'center top',
        yPercent: 0,
      })
      gsap.set(['.mild-group', '.honey-group'], { opacity: 0, y: 20 })

      // Mild Bubbles Setup
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

      // Honey Bubble Setup
      gsap.set('.bubble-honey', {
        scale: 0,
        autoAlpha: 0,
        transformOrigin: 'bottom left',
      })
      
      // ✅ ซ่อน Text ทั้ง 3 ชุดไว้ก่อน
      gsap.set(['.text-h-1', '.text-h-2', '.text-h-3'], {
        display: 'none',
        autoAlpha: 0,
      })

      // Face Setup
      gsap.set('.mild-face-worry', { autoAlpha: 1 })
      gsap.set('.mild-face-happy', { autoAlpha: 0 })
      gsap.set('.mild-asset-mimi', { autoAlpha: 0 })

      // --- TIMELINE ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=7000', // เพิ่มระยะอีกนิดเผื่อให้ Text 3 อ่านทัน
          scrub: 1,
          pin: true,
          onLeave: () => {
            if (onComplete) onComplete()
          },
        },
      })

      // 1. Scene Start
      tl.to('.colosseum-in-bg', { yPercent: -20, duration: 2, ease: 'none' })
        .to(['.mild-group', '.honey-group'], {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
        })

      // 2. Mild Bubble 1
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

      // 3. Mild Bubble 2
        .to('.bubble-mild-2', {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
        })
        .to({}, { duration: 0.8 })
        .to('.bubble-mild-2', {
          opacity: 0,
          scale: 0,
          duration: 0.3,
          ease: 'back.in(1.7)',
        })

      // ===========================================
      // 4. HONEY TURN (Text 1 -> 2 -> 3)
      // ===========================================

      // เปิด Bubble Honey
        .to('.bubble-honey', {
          scale: 1,
          autoAlpha: 1,
          duration: 0.5,
          ease: 'back.out',
        })

      // --- Text 1 ---
        .set('.text-h-1', { display: 'block', autoAlpha: 1 })
        .to('.text-h-1 .char-reveal', {
          y: 0,
          autoAlpha: 1,
          stagger: 0.05,
          duration: 0.5,
          ease: 'back.out',
        })
        .to({}, { duration: 1.5 }) // แช่ไว้อ่าน

      // --- Text 2 ---
        .to('.text-h-1', { autoAlpha: 0, duration: 0.2, display: 'none' })
        .set('.text-h-2', { display: 'block', autoAlpha: 1 })
        .to('.text-h-2 .char-reveal', {
          y: 0,
          autoAlpha: 1,
          stagger: 0.03,
          duration: 0.5,
          ease: 'back.out',
        })
        .to({}, { duration: 2 }) // แช่ไว้อ่าน

      // --- Text 3 (✅ เพิ่มส่วนนี้) ---
        .to('.text-h-2', { autoAlpha: 0, duration: 0.2, display: 'none' })
        .set('.text-h-3', { display: 'block', autoAlpha: 1 })
        .to('.text-h-3 .char-reveal', {
            y: 0,
            autoAlpha: 1,
            stagger: 0.05,
            duration: 0.5,
            ease: 'back.out',
        })
        .to({}, { duration: 1.5 }) // แช่ไว้อ่าน (สั้นๆ)

      // ปิด Bubble Honey
        .to('.bubble-honey', { scale: 0, autoAlpha: 0, duration: 0.3 }, '+=0.2')

      // ===========================================

      // 5. Mild Reaction
        .to('.mild-face-worry', { autoAlpha: 0, duration: 0.2 })
        .to('.mild-face-happy', { autoAlpha: 1, duration: 0.2 }, '<')
        .to('.mild-asset-mimi', { autoAlpha: 1, duration: 0.2 }, '<')

      // 6. Mild Bubble 3
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

      // 7. Mild Bubble 4
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
        {/* Background */}
        <div
          className="colosseum-in-bg absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${inColosseumAssets.bgImg}')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
        </div>

        <div className="pointer-events-none absolute inset-0 z-10">
          {/* --- MILD --- */}
          <div className="mild-group absolute bottom-[-5%] left-[5%] z-20 h-[500px] w-[280px] translate-y-10 will-change-transform md:left-[10%] md:h-[600px] md:w-[330px]">
            <div className="mild-body-img relative h-full w-full">
              {/* Asset */}
              <img
                src={inColosseumAssets.mildGiff}
                className="absolute left-0 top-0 z-50 w-full"
                alt="Hair"
              />
              <img
                src={inColosseumAssets.mildCatEar}
                className="mild-asset-mimi absolute left-0 top-0 z-50 w-full"
                alt="Cat Ear"
              />

              {/* Body Parts */}
              <img
                src={inColosseumAssets.mildHair}
                className="absolute left-0 top-0 z-0 w-full"
                alt="Hair"
              />
              <img
                src={inColosseumAssets.mildBody}
                className="absolute left-0 top-0 z-10 w-full"
                alt="Body"
              />
              <img
                src={inColosseumAssets.mildArmL_2}
                className="mild-arm-2-l absolute left-0 top-0 z-20 w-full"
                alt="L Arm 2"
              />
              <img
                src={inColosseumAssets.mildArmR_2}
                className="mild-arm-2-r absolute left-0 top-0 z-20 w-full"
                alt="R Arm 2"
              />
              <img
                src={inColosseumAssets.mildArmL_1}
                className="mild-arm-1-l absolute left-0 top-0 z-20 w-full opacity-0"
                alt="L Arm 1"
              />
              <img
                src={inColosseumAssets.mildArmR_MilkTea}
                className="mild-arm-milktea-r absolute left-0 top-0 z-40 w-full opacity-0"
                alt="R Arm MilkTea"
              />
              <div className="absolute left-0 top-[1%] z-30 w-full">
                <img
                  src={inColosseumAssets.mildSadFace}
                  className="mild-face-worry w-full object-contain"
                  alt="Worry"
                />
                <img
                  src={inColosseumAssets.mildSmileFace}
                  className="mild-face-happy absolute left-0 top-0 w-full object-contain opacity-0"
                  alt="Happy"
                />
              </div>
            </div>
          </div>

          {/* MILD BUBBLES */}
          <div className="bubble-mild-1 absolute left-[20%] top-[30%] z-40 max-w-[200px] rounded-xl bg-white p-4 text-black shadow-lg after:absolute after:bottom-[-10px] after:left-4 after:border-[10px] after:border-transparent after:border-t-white after:content-['']">
            <p className="text-center text-xl font-bold tracking-wide text-pink-600 md:text-3xl">
              งือ~~
            </p>
          </div>
          <div className="bubble-mild-2 absolute left-[10%] top-[30%] z-40 max-w-[250px] rounded-xl bg-white p-4 text-black shadow-lg after:absolute after:bottom-[-10px] after:left-4 after:border-[10px] after:border-transparent after:border-t-white after:content-[''] md:max-w-[400px]">
            <p className="text-center text-xl font-bold tracking-wide text-pink-600 md:text-2xl">
              พิธีกรเรียกชื่อฉันแล้ว ทำไงดีไม่มั่นใจเลยว่าจะทำได้ไหม
            </p>
          </div>
          <div className="bubble-mild-3 absolute left-[10%] top-[30%] z-40 max-w-[250px] rounded-xl bg-white p-4 text-black shadow-lg after:absolute after:bottom-[-10px] after:left-4 after:border-[10px] after:border-transparent after:border-t-white after:content-[''] md:max-w-[400px]">
            <p className="text-center text-xl font-bold tracking-wide text-pink-600 md:text-2xl">
              อือ ขอบคุณนะฮันนี่ <br /> ที่เป็นกำลังใจให้เสมอ
            </p>
          </div>
          <div className="bubble-mild-4 absolute left-[10%] top-[30%] z-40 max-w-[250px] rounded-xl bg-white p-4 text-black shadow-lg after:absolute after:bottom-[-10px] after:left-4 after:border-[10px] after:border-transparent after:border-t-white after:content-[''] md:max-w-[400px]">
            <p className="text-center text-xl font-bold tracking-wide text-pink-600 md:text-2xl">
              ฉันจะออกไปแสดงผลลัพธ์ การฝึกกับฮันนี่ให้ทุกคนเห็นเอง
            </p>
          </div>
        </div>

        {/* --- HONEY --- */}
        <div className="pointer-events-none absolute inset-0 z-10">
          <div className="honey-group absolute bottom-[-18%] left-[0%] z-20 h-[500px] w-[280px] translate-y-10 will-change-transform md:left-[55%] md:h-[600px] md:w-[320px]">
            <div className="honey-body-img relative h-full w-full">
              <img
                src={inColosseumAssets.honeyNormalFace}
                className="absolute left-0 top-0 z-20 w-full"
                alt="Face"
              />
              <img
                src={inColosseumAssets.honeyBody}
                className="absolute left-0 top-0 z-10 w-full"
                alt="Body"
              />
            </div>

            {/* HONEY BUBBLE */}
            <div className="bubble-honey absolute -right-[20px] -top-[100px] z-50 flex min-h-[120px] w-[350px] origin-bottom-left flex-col items-end justify-center text-right">
              <div className="text-sm font-medium leading-relaxed text-yellow-300 drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] md:text-2xl">
                {/* Text Group 1 */}
                <div className="text-h-1">
                  <SplitText>เธอทำได้สิ อย่างที่ฉันเคยบอก</SplitText>
                </div>

                {/* Text Group 2 */}
                <div className="text-h-2 space-y-2">
                  <p>
                    <SplitText>ตลอดเวลาที่เธอฝึกกับฉัน</SplitText>
                  </p>
                  <p>
                    <SplitText>ฉันเห็นว่าเธอพยายามมากแค่ไหน</SplitText>
                  </p>
                </div>

                {/* Text Group 3 (เพิ่มเข้ามาใหม่) */}
                <div className="text-h-3 space-y-2">
                  <p className="text-4xl font-bold text-yellow-300">
                    <SplitText>มั่นใจเข้าไว้นะ สู้ๆ!</SplitText>
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}