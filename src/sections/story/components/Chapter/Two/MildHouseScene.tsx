import { houseSceneAssets } from '@/assets/chapterTwoAssets'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'

import { SmartSplitText } from './component/SmartSplitText'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  onComplete: () => void
}

// 🟢 CONFIG: กำหนดสัดส่วนภาพต้นฉบับ (16:9)
const DESIGN_W = 1920
const DESIGN_H = 1080
const ASPECT_RATIO = DESIGN_W / DESIGN_H

export default function HouseScene({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const doorPanelRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.black-overlay', { autoAlpha: 1 })
      gsap.set('.honey-group', { x: 0, autoAlpha: 1 })
      gsap.set('.honey-bubble-think', {
        scale: 0,
        autoAlpha: 0,
        transformOrigin: 'bottom left',
      })
      gsap.set('.knock-text', { scale: 0, autoAlpha: 0 })
      gsap.set(doorPanelRef.current, { rotationY: 0 })

      gsap.set('.mild-group', {
        autoAlpha: 1,
        transformOrigin: 'bottom center',
      })
      gsap.set('.mild-face-normal', { autoAlpha: 1 })
      gsap.set(['.mild-face-surprise', '.mild-face-happy'], { autoAlpha: 0 })
      gsap.set(['.mild-bubble-think', '.mild-bubble-speak'], {
        scale: 0,
        autoAlpha: 0,
        transformOrigin: 'bottom left',
      })

      gsap.set('.magic-text-group', { autoAlpha: 0 })
      gsap.set(
        ['.text-mild-speak-1', '.text-mild-speak-2', '.text-mild-speak-3'],
        { autoAlpha: 0 },
      )

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=7000',
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          onLeave: () => {
            requestAnimationFrame(() => onComplete?.())
          },
        },
      })

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

      tl.to('.mild-bubble-speak', {
        scale: 1,
        autoAlpha: 1,
        duration: 0.5,
        ease: 'back.out',
      }).to('.text-mild-speak-1', { autoAlpha: 1, duration: 0.5 }, '<')

      tl.to('.text-mild-speak-1', { autoAlpha: 0, duration: 0.2, delay: 1.5 })
        .to(
          '.mild-group',
          {
            y: -20,
            scaleY: 1.05,
            scaleX: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: 'power1.out',
          },
          '<',
        )
        .to('.mild-face-normal', { autoAlpha: 0, duration: 0.1 }, '<')
        .to('.mild-face-surprise', { autoAlpha: 1, duration: 0.1 }, '<')
        .to('.text-mild-speak-2', { autoAlpha: 1, duration: 0.5 }, '>0.1')

      tl.to('.text-mild-speak-2', { autoAlpha: 0, duration: 0.2, delay: 1.5 })

      tl.to('.mild-bubble-speak', { autoAlpha: 0, scale: 0, duration: 0.3 })
      tl.to(['.magic-text-group'], { autoAlpha: 1, duration: 0.1 })

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

      tl.to(['.magic-text-group'], { autoAlpha: 0, duration: 0.5, delay: 1.5 })
      tl.to('.mild-face-surprise', { autoAlpha: 0, duration: 0.2 })
        .to('.mild-face-happy', { autoAlpha: 1, duration: 0.2 }, '<')
        .to(
          '.mild-bubble-speak',
          { scale: 1, autoAlpha: 1, duration: 0.3 },
          '<',
        )
        .to('.text-mild-speak-3', { autoAlpha: 1, duration: 0.3 }, '>0.1')

      tl.to('.black-overlay', { autoAlpha: 1, duration: 1.5 }, '>1.5')
      tl.to({}, { duration: 1 })
    }, containerRef)
    return () => ctx.revert()
  }, [onComplete])

  return (
    // 1. CONTAINER: เต็มจอ + จัดกึ่งกลาง
    <div
      ref={containerRef}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black"
    >
      {/* 2. SCENE: บังคับสัดส่วน (Crop แต่ไม่ยืด) */}
      <div
        ref={sceneRef}
        className="@container relative shadow-2xl"
        style={{
          width: '100vw',
          height: `${100 / ASPECT_RATIO}vw`, // ความสูงตามสัดส่วนความกว้าง
          minHeight: '100vh', // ต้องสูงเต็มจอเป็นอย่างน้อย
          minWidth: `${100 * ASPECT_RATIO}vh`, // ต้องกว้างเต็มจอเป็นอย่างน้อย
        }}
      >
        {/* BACKGROUND */}
        <div className="absolute inset-0 z-0">
          <img
            src={houseSceneAssets.bg_door_open}
            className="h-full w-full object-cover"
            alt="bg"
          />
        </div>
        <div className="bg-dim-overlay pointer-events-none absolute inset-0 z-[5] bg-black/60 opacity-0 transition-opacity" />

        {/* ============================================== */}
        {/* 🟢 LAYER 2: MILD (จุดที่แก้ปัญหา) */}
        {/* ============================================== */}
        <div
          className="absolute z-10 flex items-end justify-center overflow-hidden"
          style={{
            top: '38%',
            left: '35%',
            width: '20%',
            height: '55%',
          }}
        >
          <div className="mild-group relative bottom-0 h-full w-[90%]">
            <div className="mild-body-img relative h-full w-full">
              {/* Body Parts */}
              <img
                src={houseSceneAssets.mild_hair}
                className="absolute left-0 top-0 z-0 h-full w-full object-contain"
                alt="Back Hair"
              />
              <img
                src={houseSceneAssets.mild_body}
                className="absolute left-0 top-0 z-10 h-full w-full object-contain"
                alt="Body"
              />
              <img
                src={houseSceneAssets.mild_arm_l}
                className="absolute left-0 top-0 z-20 h-full w-full object-contain"
                alt="Left Arm"
              />
              <img
                src={houseSceneAssets.mild_arm_r}
                className="absolute left-0 top-0 z-20 h-full w-full object-contain"
                alt="Right Arm"
              />

              <div className="absolute left-0 top-20 z-30 h-auto w-full">
                <img
                  src={houseSceneAssets.mild_face_normal}
                  className="mild-face-normal w-full object-contain"
                  alt="Normal"
                />
                <img
                  src={houseSceneAssets.mild_face_surprise}
                  className="mild-face-surprise absolute left-0 top-0 w-full object-contain"
                  alt="Shock"
                />
                <img
                  src={houseSceneAssets.mild_face_happy}
                  className="mild-face-happy absolute left-0 top-0 w-full object-contain"
                  alt="Happy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* MASK บังหน้าประตู */}
        <div className="pointer-events-none absolute inset-0 z-20">
          <div
            className="h-full w-full bg-cover bg-center"
            style={{
              backgroundImage: `url('${houseSceneAssets.bg_door_open}')`,
              clipPath: 'polygon(0% 0%, 42.55% 0%, 42.55% 100%, 0% 100%)',
            }}
          />
        </div>

        {/* LAYER 3: DOOR PANEL */}
        <div ref={doorPanelRef} className="absolute inset-0 z-30">
          <img
            src={houseSceneAssets.bg_door_closed}
            className="h-full w-full object-cover"
            alt="door"
          />
          {/* Text ใช้ cqw เพื่อปรับขนาดตาม Scene */}
          <div className="knock-text absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg border border-white/50 bg-black/30 px-[2%] py-[1%] text-[3cqw] font-black text-white drop-shadow-md backdrop-blur-sm">
            ก๊อก! ก๊อก!
          </div>
        </div>

        {/* LAYER 4: HONEY */}
        <div className="honey-group absolute bottom-[0%] left-[45%] z-40 w-[25%]">
          <img
            src={houseSceneAssets.honey_body}
            className="relative w-full drop-shadow-2xl"
            alt="Honey"
          />
          <img
            src={houseSceneAssets.honey_face}
            className="absolute left-0 top-[1%] w-full"
            alt="Face"
          />

          <div className="honey-bubble-think absolute -right-[70%] -top-[50%] z-50 w-[130%] rounded-[2cqw] border-2 border-gray-200 bg-white p-[8%] shadow-xl">
            <p className="text-center text-[1.1cqw] font-bold leading-snug tracking-wider text-gray-700">
              "ใช่หลังนี้มั้ยนะ? <br />
              <span className="text-blue-500">ลองเคาะดูละกัน...</span>"
            </p>
            <div className="absolute -bottom-[10%] left-[15%] h-[1.5cqw] w-[1.5cqw] rounded-full border-b border-gray-200 bg-white" />
            <div className="absolute -bottom-[20%] left-[10%] h-[1cqw] w-[1cqw] rounded-full bg-white" />
          </div>
        </div>

        {/* LAYER 5: UI & TEXT */}
        <div className="pointer-events-none absolute inset-0 z-50">
          {/* Mild Think */}
          <div className="mild-bubble-think absolute right-[35%] top-[30%] z-50 w-[12%] origin-bottom-left rounded-full border-2 border-gray-300 bg-white p-[1.5%] shadow-xl">
            <p className="text-center text-[1cqw] italic text-gray-500">
              "เอ๊ะ... <br /> ใครมาซะเย็นป่านนี้"
            </p>
            <div className="absolute -bottom-[10%] left-[20%] h-[1.2cqw] w-[1.2cqw] rounded-full bg-white" />
            <div className="absolute -bottom-[25%] left-[10%] h-[0.8cqw] w-[0.8cqw] rounded-full bg-white" />
          </div>

          {/* Mild Speak */}
          <div className="mild-bubble-speak absolute left-[40%] top-[35%] z-50 grid min-h-[12%] w-[18%] origin-bottom-left place-items-center rounded-[1.5cqw] border-2 border-pink-300 bg-pink-50 p-[1.5%] shadow-2xl">
            <div className="text-mild-speak-1 absolute inset-0 flex items-center justify-center px-[5%] opacity-0">
              <p className="text-center text-[1.1cqw] font-bold leading-snug tracking-wide text-gray-700">
                <span className="mb-[2%] block text-[0.8cqw] font-medium tracking-wide text-gray-400">
                  (เสียงเบา)
                </span>
                "คะ... ใครหรอคะ..."
              </p>
            </div>
            <div className="text-mild-speak-2 absolute inset-0 flex items-center justify-center px-[5%] opacity-0">
              <p className="text-center text-[1.2cqw] font-bold leading-snug tracking-wide text-gray-800">
                "เอ๊ะ!? คุณฮันนี่เองหรอ... <br />{' '}
                <span className="mt-[2%] block text-[1cqw] tracking-wide text-gray-700">
                  มีธุระอะไรรึป่าวคะ?"
                </span>
              </p>
            </div>
            <div className="text-mild-speak-3 absolute inset-0 flex items-center justify-center px-[5%] opacity-0">
              <p className="text-center text-[2cqw] font-bold tracking-wide text-gray-900">
                "จะ... จริงหรอคะ!?"
              </p>
            </div>
            <div className="absolute -bottom-[8%] left-[15%] h-[1.5cqw] w-[1.5cqw] rotate-45 border-b-2 border-r-2 border-pink-300 bg-pink-50"></div>
            <div className="absolute -bottom-[2%] left-[15%] h-[1cqw] w-[2cqw] bg-pink-50"></div>
          </div>

          {/* Magic Text Group */}
          <div className="magic-text-group absolute inset-0 z-[60] flex flex-col items-end justify-center pr-[20%]">
            {/* เพิ่ม text-right และ items-end เพื่อให้ชิดขวาเหมือนต้นฉบับ */}
            <div className="relative flex flex-col items-end space-y-[2%] p-[1%] text-right">
              {/* บรรทัดที่ 1: สีเหลือง, เงาเข้ม, font-medium */}
              <div className="magic-line-wrapper-1 overflow-hidden whitespace-nowrap">
                <p
                  className="text-xl font-bold leading-relaxed tracking-wider text-blue-200 drop-shadow-[0_2px_4px_rgba(0,0,0,1)] md:text-3xl"
                  style={{ WebkitTextStroke: '1px rgba(0,0,0,0.6)' }}
                >
                  <SmartSplitText className="line-1">
                    ขอโทษนะที่มารบกวน
                  </SmartSplitText>
                </p>
              </div>

              {/* บรรทัดที่ 2: สีเหลือง, เงาเข้ม, font-medium */}
              <div className="magic-line-wrapper-2 overflow-hidden whitespace-nowrap">
                <p
                  className="text-xl font-bold leading-relaxed tracking-wider text-blue-200 drop-shadow-[0_2px_4px_rgba(0,0,0,1)] md:text-3xl"
                  style={{ WebkitTextStroke: '1px rgba(0,0,0,0.6)' }}
                >
                  <SmartSplitText className="line-2">
                    พอดีฉันตัดสินใจได้แล้วว่า
                  </SmartSplitText>
                </p>
              </div>

              {/* บรรทัดที่ 3: สีเหลือง, เงาเข้ม, font-bold (ตัวหนาเน้นเหมือนต้นฉบับ) */}
              <div className="magic-line-wrapper-3 overflow-hidden whitespace-nowrap">
                <p
                  className="text-xl font-bold leading-relaxed tracking-wider text-blue-200 drop-shadow-[0_2px_4px_rgba(0,0,0,1)] md:text-3xl"
                  style={{ WebkitTextStroke: '1px rgba(0,0,0,0.6)' }}
                >
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
