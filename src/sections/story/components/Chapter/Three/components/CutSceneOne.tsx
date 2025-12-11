import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useLayoutEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

// --- 1. SmartSplitText Component ---
const SmartSplitText = ({
  children,
  className = '',
}: {
  children: string
  className?: string
}) => {
  if (!children) return null
  const words = children.split(' ')
  return (
    <span className={`smart-split-text inline-block ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split('').map((char, charIndex) => (
            <span
              key={charIndex}
              className="magic-char inline-block will-change-transform"
            >
              {char}
            </span>
          ))}
          {wordIndex < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </span>
  )
}

// ข้อมูลบทพูด
const DIALOGUES = [
  {
    id: 1,
    speaker: 'มายด์',
    side: 'right',
    text: 'นี่จะรีบไปไหน ฉันยังไม่ได้ขอบคุณฮันนี่เลยนะที่ทำให้ฉันได้พิสูจน์ตัวเองกับเพื่อนๆ และคนอื่นๆ ในโรงเรียน',
  },
  {
    id: 2,
    speaker: 'ฮันนี่',
    side: 'left',
    note: '(เวทตัวอักษร)',
    text: 'หน้าที่ของฉันหมดลงตรงนี้เธอไม่จำเป็นต้องมีฉันอยู่หรอก เธอได้แสดงความสามารถของตัวเองให้ทุกคนได้เห็นแล้ว',
  },
  {
    id: 3,
    speaker: 'ฮันนี่',
    side: 'left',
    note: '(เวทตัวอักษร)',
    text: 'แต่ว่า.. ก็ยินดีด้วยนะ ฉันภูมิใจที่ได้เป็นอาจารย์ให้เธอนะ ฉันดีใจที่เธอสามารถพิสูจน์ตัวเองได้ รางวัลนี่มันเหมาะกับเธอจริงๆ',
  },
  {
    id: 4,
    speaker: 'มายด์',
    side: 'right',
    text: 'ขอบคุณนะคะที่คอยเป็นกำลังใจให้ในยามที่ฉันกลุ้มใจ ขอบคุณนะที่มอบความกล้าให้ฉัน ฉันดีใจที่ได้รู้จักกับฮันนี่จริงๆ นะ',
  },
  {
    id: 5,
    speaker: 'ฮันนี่',
    side: 'left',
    note: '(เวทตัวอักษร)',
    text: 'ฉันเองก็ดีใจที่ได้รู้จักกับเธอนะมายด์',
  },
  {
    id: 6,
    speaker: 'ฮันนี่',
    side: 'left',
    note: '(เสียงเบาๆ)',
    text: 'สุดท้ายนี้...',
  },
  {
    id: 7,
    speaker: 'ฮันนี่',
    side: 'left',
    isFinal: true,
    text: 'ขอบคุณเธอที่มอบความกล้าให้ฉัน ขอบคุณนะมายด์',
  },
]

export default function CutSceneOne() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageWrapperRef = useRef<HTMLDivElement>(null)
  const textWrapperRef = useRef<HTMLDivElement>(null)

  const bgPath = '/assets/part3/cutscene/Cutscene_1.png'

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Setup: ซ่อนตัวอักษร Magic
      gsap.set('.magic-char', { y: 20, autoAlpha: 0, scale: 0.5 })

      // Setup Background: เริ่มต้นแบบ Zoom กลางๆ (1.6)
      gsap.set(imageWrapperRef.current, {
        scale: 1.6,
        xPercent: -20,
        autoAlpha: 0,
        transformOrigin: 'center center',
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${DIALOGUES.length * 250}%`, // เพิ่มความยาวนิดหน่อยให้ movement สมูทขึ้น
          scrub: 1,
          pin: true,
        },
      })

      // Phase 0: Fade In
      tl.to(imageWrapperRef.current, { autoAlpha: 1, duration: 1 })

      // Phase 1: Loop Dialogues
      DIALOGUES.forEach((item, index) => {
        const selector = `.dialogue-${index}`
        const isMild = item.speaker === 'มายด์'
        const isMagic = item.note === '(เวทตัวอักษร)'

        // --- Camera Logic: คำนวณ Scale/X/Y ตามโจทย์ ---

        let targetScale = 2.0 // ค่า Default (Zoom กลางๆ)
        let targetX = 0
        let targetY = 0

        if (index === 0) {
          // เริ่มต้น: Zoom ไปที่มายด์ (ขวาสุด)
          targetScale = 1.6
          targetX = -30
          targetY = 0
        } else if (item.id >= 5) {
          // ตอนจบ: Zoom Out (เห็นเต็มจอ)
          targetScale = 1
          targetX = 0
          targetY = 0
        } else {
          // ระหว่างคุยกัน
          if (isMild) {
            // มายด์ (ขวา): "ซูมไปขวาบนเพิ่ม"
            targetScale = 2.4 // Zoom ลึกเข้าไป
            targetX = -45 // Pan ไปซ้ายเยอะๆ เพื่อให้เห็นขวา
            targetY = 15 // Pan ลง เพื่อให้เห็นด้านบน (ขวา-บน)
          } else {
            // ฮันนี่ (ซ้าย): "ซูมเข้าเพิ่มไปซ้ายกลาง"
            targetScale = 2.3 // Zoom ลึกเข้าไป
            targetX = 60 // Pan ไปขวาเยอะๆ เพื่อให้เห็นซ้าย
            targetY = 0 // กลางๆ (ซ้าย-กลาง)
          }
        }

        // --- Step พิเศษ: Transition (การถอยกล้องก่อนเปลี่ยนมุม) ---
        // ถ้ามีการเปลี่ยนคนพูด (เช่น จากฮันนี่ -> มายด์) ให้ถอยกล้องออกมาก่อนนิดนึง
        if (
          index > 0 &&
          DIALOGUES[index - 1].speaker !== item.speaker &&
          item.id < 5
        ) {
          tl.to(
            imageWrapperRef.current,
            {
              scale: 1.6, // ถอยมาที่ค่ากลาง
              xPercent: (targetX + (isMild ? 25 : -25)) / 2, // ขยับไปครึ่งทาง
              yPercent: 0,
              duration: 1,
              ease: 'power1.inOut',
            },
            'transit-' + index,
          )
        }

        // 1. Camera Animation (Move to Target)
        tl.to(
          imageWrapperRef.current,
          {
            scale: targetScale,
            xPercent: targetX,
            yPercent: targetY,
            duration: 2.5, // เพิ่มเวลาให้กล้องเดินเนียนขึ้น
            ease: 'power2.inOut',
          },
          'start-' + index,
        ) // เริ่มหลังจาก Transition (ถ้ามี) หรือต่อจากเดิม

          // 2. Show Box
          .fromTo(
            selector,
            { autoAlpha: 0, y: 30 },
            { autoAlpha: 1, y: 0, duration: 1, ease: 'back.out(1.2)' },
            '<+=0.8', // รอให้กล้องขยับไปได้สักพักค่อยขึ้นข้อความ
          )

        // 3. Magic Text Animation
        if (isMagic) {
          tl.to(
            `.magic-text-${index} .magic-char`,
            {
              y: 0,
              autoAlpha: 1,
              scale: 1,
              duration: 0.5,
              stagger: 0.03,
              ease: 'back.out(1.7)',
            },
            '<',
          )
        }

        // 4. Hold Text
        tl.to({}, { duration: 3 })

        // 5. Hide Text
        if (index < DIALOGUES.length - 1) {
          if (isMagic) {
            tl.to(
              `.magic-text-${index} .magic-char`,
              {
                autoAlpha: 0,
                y: -10,
                duration: 0.3,
                stagger: 0.01,
              },
              'hide-' + index,
            )
          }
          tl.to(
            selector,
            { autoAlpha: 0, y: -20, duration: 1 },
            'hide-' + index,
          )
        }
      })

      // Phase 2: End
      const lastIndex = DIALOGUES.length - 1
      tl.to(`.dialogue-${lastIndex}`, { autoAlpha: 0, duration: 1 })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // ... (ส่วน Render JSX เหมือนเดิม) ...
  const getBoxStyle = (isRight: boolean, isMagic: boolean) => {
    let classes =
      'max-w-[90%] md:max-w-[75%] p-4 md:p-6 rounded-2xl backdrop-blur-sm shadow-xl border '
    if (isMagic)
      classes += 'bg-transparent border-white/40 text-yellow-100 shadow-none'
    else if (isRight) classes += 'bg-pink-900/40 border-white/10'
    else classes += 'bg-yellow-900/40 border-white/10'
    return classes
  }

  return (
    <div
      ref={containerRef}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black font-sans"
    >
      <div
        ref={imageWrapperRef}
        className="aspect-video max-h-screen w-full will-change-transform"
        style={{
          backgroundImage: `url('${bgPath}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <div
        ref={textWrapperRef}
        className="pointer-events-none absolute bottom-0 left-0 z-20 flex h-[30vh] w-full flex-col justify-end bg-gradient-to-t from-black via-black/80 to-transparent px-4 pb-10 md:px-20"
      >
        <div className="relative mx-auto h-full w-full max-w-5xl">
          {DIALOGUES.map((item, index) => {
            const isRight = item.side === 'right'
            const isMagic = item.note === '(เวทตัวอักษร)'

            return (
              <div
                key={item.id}
                className={`dialogue-${index} absolute bottom-0 mb-4 flex w-full flex-col opacity-0 will-change-transform ${
                  isRight ? 'items-end text-right' : 'items-start text-left'
                }`}
              >
                <span
                  className={`mb-2 text-xl font-bold drop-shadow-md md:text-2xl ${
                    isRight ? 'text-pink-400' : 'text-yellow-400'
                  }`}
                >
                  {item.speaker}
                </span>
                <div className={getBoxStyle(isRight, isMagic)}>
                  {item.note && (
                    <p className="mb-1 text-sm italic text-gray-300">
                      {item.note}
                    </p>
                  )}
                  <div
                    className={`text-base leading-relaxed md:text-xl ${
                      item.isFinal
                        ? 'font-semibold text-yellow-100'
                        : 'text-white'
                    }`}
                  >
                    {isMagic ? (
                      <SmartSplitText className={`magic-text-${index} italic`}>
                        {item.text}
                      </SmartSplitText>
                    ) : (
                      item.text
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
