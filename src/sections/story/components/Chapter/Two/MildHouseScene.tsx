import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'
import { SmartSplitText } from './component/SmartSplitText'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  onComplete: () => void
}

export default function HouseScene({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const doorPanelRef = useRef<HTMLDivElement>(null)

  // Asset Paths
  const openDoorImg = '/assets/Part2/House_1.png'
  const closedDoorImg = '/assets/Part2/House_0.png'

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // --- INITIAL SETUP ---
      gsap.set('.black-overlay', { autoAlpha: 1 })

      gsap.set('.honey-group', { x: 0, autoAlpha: 1 })
      gsap.set('.honey-bubble-think', {
        scale: 0,
        autoAlpha: 0,
        transformOrigin: 'bottom left',
      })
      gsap.set('.knock-text', { scale: 0, autoAlpha: 0 })

      gsap.set(doorPanelRef.current, { rotationY: 0 })

      gsap.set('.mild-group', { autoAlpha: 1, transformOrigin: 'bottom center' }) // เพิ่ม transformOrigin เพื่อให้ยืดหดจากด้านล่าง
      gsap.set('.mild-face-normal', { autoAlpha: 1 })
      gsap.set(['.mild-face-surprise', '.mild-face-happy'], { autoAlpha: 0 })
      gsap.set(['.mild-bubble-think', '.mild-bubble-speak'], {
        scale: 0,
        autoAlpha: 0,
        transformOrigin: 'bottom left', // ปรับจุดขยายให้มาจากทางซ้ายล่าง (ทางตัวละคร)
      })

      gsap.set('.magic-text-group', { autoAlpha: 0 })
      gsap.set(
        ['.text-mild-speak-1', '.text-mild-speak-2', '.text-mild-speak-3'],
        { autoAlpha: 0 },
      )

      // =========================================================
      // TIMELINE
      // =========================================================
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=7000',
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          onLeave: () => {
            requestAnimationFrame(() => {
              onComplete?.()
            })
          },
        },
      })

      // --- STEP 1: ARRIVAL ---
      tl.to('.black-overlay', { autoAlpha: 0, duration: 2 })
      tl.to('.honey-bubble-think', {
        scale: 1,
        autoAlpha: 1,
        duration: 0.5,
        ease: 'back.out',
      }).to('.honey-bubble-think', {
        scale: 0,
        autoAlpha: 0,
        duration: 0.3,
        delay: 0.5,
      })

      // --- STEP 2: KNOCK KNOCK ---
      tl.to('.honey-group', { x: 5, duration: 0.1, yoyo: true, repeat: 3 })
        .to('.knock-text', { scale: 1.2, autoAlpha: 1, duration: 0.1 }, '<')
        .to(
          '.knock-text',
          { scale: 1, duration: 0.1, yoyo: true, repeat: 3 },
          '<',
        )
        .to('.knock-text', { autoAlpha: 0, duration: 0.2 }, '>0.2')

      tl.to('.mild-bubble-think', {
        scale: 1,
        autoAlpha: 1,
        duration: 0.5,
        ease: 'back.out',
      }).to('.mild-bubble-think', {
        scale: 0,
        autoAlpha: 0,
        duration: 0.3,
        delay: 0.5,
      })

      // --- STEP 3: BLINK TO OPEN ---
      tl.to('.black-overlay', {
        autoAlpha: 1,
        duration: 0.15,
        ease: 'power2.in',
      })
        .set(doorPanelRef.current, { autoAlpha: 0 })
        .to('.black-overlay', {
          autoAlpha: 0,
          duration: 0.3,
          ease: 'power2.out',
        })

      // --- STEP 3.5: DIALOGUE ---
      tl.to('.mild-bubble-speak', {
        scale: 1,
        autoAlpha: 1,
        duration: 0.5,
        ease: 'back.out',
      }).to('.text-mild-speak-1', { autoAlpha: 1, duration: 0.5 }, '<')

      // จังหวะเปลี่ยนหน้าเป็นตกใจ และเพิ่ม Animation สะดุ้ง (Startle)
      tl.to('.text-mild-speak-1', { autoAlpha: 0, duration: 0.2, delay: 1.5 })
        
        // --- STARTLE ANIMATION (สะดุ้ง) ---
        .to('.mild-group', { 
            y: -20,         // กระโดดขึ้น
            scaleY: 1.05,   // ยืดตัวนิดหน่อย
            scaleX: 0.95,   // หดแกนนอนนิดหน่อยให้ดูเด้งๆ
            duration: 0.1, 
            yoyo: true,     // กลับที่เดิม
            repeat: 1,      // ทำ 1 รอบ (เด้งขึ้น-ลง)
            ease: "power1.out"
        }, "<") // เริ่มพร้อมกับการเปลี่ยนหน้า
        // ----------------------------------

        .to('.mild-face-normal', { autoAlpha: 0, duration: 0.1 }, '<')
        .to('.mild-face-surprise', { autoAlpha: 1, duration: 0.1 }, '<')
        .to('.text-mild-speak-2', { autoAlpha: 1, duration: 0.5 }, '>0.1')

      tl.to('.text-mild-speak-2', { autoAlpha: 0, duration: 0.2, delay: 1.5 })

      // --- STEP 4: MAGIC PROPOSAL ---
      tl.to('.mild-bubble-speak', { autoAlpha: 0, scale: 0, duration: 0.3 })
      tl.to(['.magic-text-group'], { autoAlpha: 1, duration: 0.1 })

      // Typewriter Effect
      tl.to('.line-1 .magic-char', {
        y: 0,
        autoAlpha: 1,
        duration: 0.05,
        stagger: 0.05,
        ease: 'power2.out',
      })
      tl.to(
        '.line-2 .magic-char',
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.05,
          stagger: 0.05,
          ease: 'power2.out',
        },
        '>0.2',
      )
      tl.to(
        '.line-3 .magic-char',
        {
          y: 0,
          autoAlpha: 1,
          scale: 1.1,
          duration: 0.3,
          stagger: 0.08,
          ease: 'back.out(2)',
        },
        '>0.2',
      )

      // --- STEP 5: HAPPY ENDING ---
      tl.to(['.magic-text-group',], {
        autoAlpha: 0,
        duration: 0.5,
        delay: 1.5,
      })

      tl.to('.mild-face-surprise', { autoAlpha: 0, duration: 0.2 })
        .to('.mild-face-happy', { autoAlpha: 1, duration: 0.2 }, '<')
        .to(
          '.mild-bubble-speak',
          { scale: 1, autoAlpha: 1, duration: 0.3 },
          '<',
        )
        .to('.text-mild-speak-3', { autoAlpha: 1, duration: 0.3 }, '>0.1')

      // --- STEP 6: BLACK OUT & BUFFER ---
      tl.to('.black-overlay', { autoAlpha: 1, duration: 1.5 }, '>1.5')
      tl.to({}, { duration: 1 })
    }, containerRef)
    return () => ctx.revert()
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      <div className="absolute inset-0 h-full w-full" style={{ perspective: '1500px' }}>
        {/* BACKGROUND */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${openDoorImg}')` }}
        />

        <div className="bg-dim-overlay pointer-events-none absolute inset-0 z-[5] bg-black/60 opacity-0 transition-opacity" />

        {/* LAYER 2: MILD */}
        <div
          className="absolute z-10 flex items-end justify-center overflow-hidden"
          style={{
            top: '38%',
            left: '35%',
            width: '20%',
            height: '55%',
          }}
        >
          {/* เพิ่ม id หรือ class เพื่อให้ง่ายต่อการอ้างอิง ถ้าจำเป็น */}
          <div className="mild-group relative bottom-0 h-full w-[90%]">
            <div className="mild-body-img relative h-full w-full">
              <img
                src="/assets/Part2/Mild/Body/Hair.PNG"
                className="absolute left-0 top-0 z-0 h-full w-full object-contain"
                alt="Back Hair"
              />
              <img
                src="/assets/Part2/Mild/Body/Body_1.PNG"
                className="absolute left-0 top-0 z-10 h-full w-full object-contain"
                alt="Body"
              />
              <img
                src="/assets/Part2/Mild/Arms/Arm_1_L.PNG"
                className="absolute left-0 top-0 z-20 h-full w-full object-contain"
                alt="Left Arm"
              />
              <img
                src="/assets/Part2/Mild/Arms/Arm_1_R.PNG"
                className="absolute left-0 top-0 z-20 h-full w-full object-contain"
                alt="Right Arm"
              />
              <div
                className="absolute z-30"
                style={{
                  top: '15%',
                  left: '0%',
                  width: '100%',
                  height: 'auto',
                }}
              >
                <img
                  src="/assets/Part2/Mild/Face/Face_01_หน้าปกติ.PNG"
                  className="mild-face-normal w-full object-contain"
                  alt="Normal"
                />
                <img
                  src="/assets/Part2/Mild/Face/Face_03_หน้าตกใจ.PNG"
                  className="mild-face-surprise absolute left-0 top-0 w-full object-contain"
                  alt="Shock"
                />
                <img
                  src="/assets/Part2/Mild/Face/Face_02_หน้ายิ้ม.PNG"
                  className="mild-face-happy absolute left-0 top-0 w-full object-contain"
                  alt="Happy"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className="pointer-events-none absolute inset-0 z-20 bg-cover bg-center"
          style={{
            backgroundImage: `url('${openDoorImg}')`,
            clipPath: 'polygon(0% 0%, 42% 0%, 42% 100%, 0% 100%)',
          }}
        />

        {/* LAYER 3: DOOR PANEL */}
        <div
          ref={doorPanelRef}
          className="absolute inset-0 z-30 bg-cover bg-center"
          style={{
            backgroundImage: `url('${closedDoorImg}')`,
          }}
        >
          <div className="knock-text absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg border border-white/50 bg-black/30 px-2 text-2xl font-black text-white drop-shadow-md backdrop-blur-sm md:text-4xl">
            ก๊อก! ก๊อก!
          </div>
        </div>

        {/* LAYER 4: HONEY */}
        <div className="honey-group absolute bottom-[0%] left-[45%] z-40 w-[200px] md:w-[280px]">
          <img
            src="/assets/Part2/Honey/Body.PNG"
            className="relative w-full drop-shadow-2xl"
            alt="Honey Body"
          />
          <img
            src="/assets/Part2/Honey/Normal_Face.PNG"
            className="absolute left-0 top-[1%] w-full"
            alt="Honey Face"
          />

          <div className="honey-bubble-think absolute -right-[140px] -top-[100px] z-50 w-[200px] rounded-[30px] border-2 border-gray-200 bg-white p-4 shadow-xl">
            <p className="text-center text-sm font-bold leading-snug tracking-wider text-gray-700 md:text-base">
              "ใช่หลังนี้มั้ยนะ?
              <br />
              <span className="text-blue-500">ลองเคาะดูละกัน...</span>"
            </p>
            <div className="absolute -bottom-3 left-6 h-4 w-4 rounded-full border-b border-gray-200 bg-white" />
            <div className="absolute -bottom-6 left-4 h-2 w-2 rounded-full bg-white" />
          </div>
        </div>

        {/* LAYER 5: TEXT UI */}
        <div className="pointer-events-none absolute inset-0 z-50">
          {/* Mild Bubbles */}
          <div className="mild-bubble-think absolute right-[35%] top-[30%] z-50 w-[180px] origin-bottom-left rounded-full border-2 border-gray-300 bg-white p-4 shadow-xl">
            <p className="text-center text-sm italic text-gray-500">
              "เอ๊ะ...
              <br />
              ใครมาซะเย็นป่านนี้"
            </p>
            <div className="absolute -bottom-2 left-4 h-3 w-3 rounded-full bg-white" />
            <div className="absolute -bottom-5 left-2 h-2 w-2 rounded-full bg-white" />
          </div>

          {/* แก้ไขตำแหน่ง Mild Speak Bubble ให้ใกล้ตัวละครมากขึ้น */}
          <div className="mild-bubble-speak absolute left-[50%] top-[25%] z-50 grid min-h-[120px] w-[260px] origin-bottom-left place-items-center rounded-[20px] border-4 border-pink-200 bg-white p-4 shadow-2xl md:w-[300px]">
            <div className="text-mild-speak-1 absolute inset-0 flex items-center justify-center px-4 opacity-0">
              <p className="text-center text-sm font-bold leading-snug tracking-wide text-gray-600 md:text-base">
                <span className="mb-1 block text-xs font-medium tracking-wide text-gray-400">
                  (เสียงเบา)
                </span>
                "คะ... ใครหรอคะ..."
              </p>
            </div>
            
            {/* แก้ไขสี Text เป็นสีดำปกติ */}
            <div className="text-mild-speak-2 absolute inset-0 flex items-center justify-center px-4 opacity-0">
              <p className="text-center text-base font-bold leading-snug tracking-wide text-black md:text-lg">
                "เอ๊ะ!? คุณฮันนี่เองหรอ...
                <br />
                <span className="mt-1 block text-sm tracking-wide text-black md:text-base">
                  มีธุระอะไรรึป่าวคะ?"
                </span>
              </p>
            </div>
            
            {/* แก้ไขสี Text เป็นสีดำหรือโทนเข้ม */}
            <div className="text-mild-speak-3 absolute inset-0 flex items-center justify-center px-4 opacity-0">
              <p className="text-center text-xl font-bold tracking-wide text-black md:text-3xl">
                "จะ... จริงหรอคะ!?"
              </p>
            </div>
            
            {/* ปรับหาง Bubble ให้ชี้ไปทางซ้ายล่างหาตัวละคร */}
            <div className="absolute -bottom-3 -left-2 h-6 w-6 rotate-12 transform rounded-bl-lg border-b-4 border-l-4 border-pink-200 bg-white" />
          </div>

          {/* MAGIC TEXT */}
          <div className="magic-text-group absolute inset-0 z-[60] flex flex-col items-end justify-center pr-[5%] md:pr-[10%]">
            <div className="relative flex flex-col items-center space-y-6 p-4">
              <div className="magic-line-wrapper-1 overflow-hidden whitespace-nowrap">
                <p className="text-xl font-bold leading-relaxed tracking-wider text-blue-200 drop-shadow-[0_2px_4px_rgba(0,0,0,1)] md:text-3xl" style={{ WebkitTextStroke: '1px rgba(0,0,0,0.6)' }}>
                  <SmartSplitText className="line-1">
                    ขอโทษนะที่มารบกวน
                  </SmartSplitText>
                </p>
              </div>

              <div className="magic-line-wrapper-2 overflow-hidden whitespace-nowrap">
                <p className="text-xl font-bold leading-relaxed tracking-wider text-blue-200 drop-shadow-[0_2px_4px_rgba(0,0,0,1)] md:text-3xl" style={{ WebkitTextStroke: '1px rgba(0,0,0,0.6)' }}>
                  <SmartSplitText className="line-2">
                    พอดีฉันตัดสินใจได้แล้วว่า
                  </SmartSplitText>
                </p>
              </div>

              <div className="magic-line-wrapper-3 overflow-hidden whitespace-nowrap">
                <p className="text-xl font-bold leading-relaxed tracking-wider text-blue-200 drop-shadow-[0_2px_4px_rgba(0,0,0,1)] md:text-3xl" style={{ WebkitTextStroke: '1px rgba(0,0,0,0.6)' }}>
                  <SmartSplitText className="line-3">
                    จะเป็นอาจารย์ให้เธอเอง!
                  </SmartSplitText>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BLACK OVERLAY */}
        <div className="black-overlay pointer-events-none absolute inset-0 z-[100] bg-black" />
      </div>
    </div>
  )
}