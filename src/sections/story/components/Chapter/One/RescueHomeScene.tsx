import { rescueHomeSceneAssets } from '@/assets/chapterOneAssets'
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

// สัดส่วนฉาก 16:9
const DESIGN_W = 1920
const DESIGN_H = 1080
const ASPECT_RATIO = DESIGN_W / DESIGN_H

export default function RescueHomeScene({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const sceneRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ============ INITIAL STATE ============
      gsap.set('.black-overlay', { autoAlpha: 1 })

      gsap.set('.bg-house-outside', { autoAlpha: 1 })
      gsap.set('.bg-house-inside', { autoAlpha: 0 })
      gsap.set('.bg-close-up', { autoAlpha: 0 })

      // ป้ายสถานที่มุมซ้ายล่าง
      gsap.set('.rescue-location-banner', { autoAlpha: 0 })
      gsap.set('.rescue-location-title .char-reveal', { autoAlpha: 0, y: 10 })

      // ตัวละครในบ้าน (เริ่มยังไม่โผล่)
      gsap.set('.inside-group', { autoAlpha: 0 })
      gsap.set('.mild-wrapper', {
        autoAlpha: 1,
        bottom: '-7%',
        left: '50%',
        xPercent: 50,
      })
      gsap.set('.honey-wrapper', {
        autoAlpha: 1,
        bottom: '8%',
        left: '25%',
        xPercent: -50,
        rotate: '80deg',
      })

      // ใบหน้ามายด์
      gsap.set('.mild-face-normal', { autoAlpha: 1 })
      gsap.set(['.mild-face-smile', '.mild-face-worried'], { autoAlpha: 0 })

      // ใบหน้าฮันนี่
      gsap.set('.honey-face-hood', { autoAlpha: 1 })
      gsap.set(['.honey-face-normal', '.honey-face-worry'], { autoAlpha: 0 })

      // Bubble ทั้งหมดเริ่มซ่อน
      gsap.set(
        [
          '.bubble-mind-1',
          '.bubble-honey-1',
          '.bubble-mind-2',
          '.bubble-honey-2',
          '.bubble-mind-3',
          '.bubble-honey-3',
          '.bubble-mind-4',
          '.bubble-honey-4',
          '.bubble-mind-5',
          '.bubble-honey-5',
          '.bubble-mind-6',
          '.bubble-honey-6',
          '.bubble-mind-7',
        ],
        {
          autoAlpha: 0,
          scale: 0.85,
          transformOrigin: 'bottom left',
        },
      )

      // เวทตัวอักษร (SplitText) ในบับเบิลฮันนี่
      gsap.set('.bubble-honey-2 .char-reveal', { autoAlpha: 0, y: 4 })
      gsap.set('.bubble-honey-3 .char-reveal', { autoAlpha: 0, y: 4 })
      gsap.set('.bubble-honey-4 .char-reveal', { autoAlpha: 0, y: 4 })
      gsap.set('.bubble-honey-5 .char-reveal', { autoAlpha: 0, y: 4 })
      gsap.set('.bubble-honey-6 .char-reveal', { autoAlpha: 0, y: 4 })

      // ============ MAIN TIMELINE ============
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=9000',
          scrub: 1,
          pin: true,
          // markers: true,
          onLeave: () => {
            requestAnimationFrame(() => onComplete?.())
          },
        },
      })

      // ---------------------------------------
      // 1) Fade-in scene + ป้าย "ณ บ้านของมายด์"
      // ---------------------------------------
      tl.to('.black-overlay', { autoAlpha: 0, duration: 1.5 })

      // ขึ้นแถบดำด้านล่าง
      tl.to('.rescue-location-banner', {
        autoAlpha: 1,
        duration: 0.6,
        ease: 'power1.out',
      })

      // Animate ตัวอักษรทีละตัว
      tl.to(
        '.rescue-location-title .char-reveal',
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.03,
          duration: 0.05,
          ease: 'power2.out',
        },
        '<0.1',
      )

      // ค้างให้คนอ่าน
      tl.to({}, { duration: 2 })

      // หายก่อนตัดเข้าในบ้าน
      tl.to('.rescue-location-banner', {
        autoAlpha: 0,
        duration: 0.5,
        ease: 'power1.in',
      })

      // แล้วค่อย fade to black ตัดเข้าในบ้านต่อเหมือนเดิม
      tl.to('.black-overlay', { autoAlpha: 1, duration: 0.6 })
      tl.set('.bg-house-outside', { autoAlpha: 0 })
      tl.set('.bg-house-inside', { autoAlpha: 1 })
      tl.set('.inside-group', { autoAlpha: 1 })
      tl.to('.black-overlay', { autoAlpha: 0, duration: 0.6 })

      // ---------------------------------------
      // 2) Mild คิดในใจเรื่องท้องร้อง + จะทำข้าวห่อไข่ (bubble-mind-1)
      // ---------------------------------------
      tl.to('.bubble-mind-1', {
        autoAlpha: 1,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.6)',
      })

      tl.to({}, { duration: 2.2 })

      tl.to('.bubble-mind-1', {
        autoAlpha: 0,
        scale: 0.85,
        duration: 0.4,
        ease: 'power1.inOut',
      })

      // ---------------------------------------
      // 3) ตัดเป็นช่วงเตรียมกับข้าว (แค่เดินออกเฟรมเบา ๆ)
      // ---------------------------------------
      tl.to('.mild-wrapper', {
        xPercent: 100,
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power2.in',
      })

      tl.to({}, { duration: 1.2 }) // สมมุติช่วงทำกับข้าว

      // ---------------------------------------
      // 4) ??? ตื่นเพราะกลิ่นอาหาร (bubble-honey-1)
      // ---------------------------------------
      tl.to('.honey-wrapper', {
        y: -10,
        duration: 0.4,
        yoyo: true,
        repeat: 1,
        ease: 'sine.inOut',
      })

      tl.to({}, { duration: 2 })

      tl.to('.honey-wrapper', {
        bottom: '15%',
        // left: '%',
        rotate: '0deg',
        ease: 'power2.in',
      })

      tl.to('.bubble-honey-1', {
        autoAlpha: 1,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.6)',
      })

      tl.to({}, { duration: 2 })

      tl.to('.bubble-honey-1', {
        autoAlpha: 0,
        scale: 0.85,
        duration: 0.4,
      })

      // ---------------------------------------
      // 5) Mild ถือข้าวห่อไข่กลับมา + พูดเสียงเบา (bubble-mind-2)
      // ---------------------------------------
      tl.to('.mild-wrapper', {
        xPercent: 50,
        autoAlpha: 1,
        duration: 0.8,
        ease: 'power2.out',
      })

      tl.to('.bubble-mind-2', {
        autoAlpha: 1,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.7)',
      })

      tl.to({}, { duration: 3 })

      tl.to('.bubble-mind-2', {
        autoAlpha: 0,
        scale: 0.85,
        duration: 0.4,
      })

      // ---------------------------------------
      // 6) ฮันนี่ร่ายเวทตัวอักษร แนะนำตัว (bubble-honey-2)
      // ---------------------------------------
      tl.addLabel('honeyIntroduce')

      tl.to(
        '.bubble-honey-2',
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
        },
        'honeyIntroduce',
      )

      // 👉 เปลี่ยนหัวจากฮู้ด → หน้า normal ตอนเริ่มพูดแนะนำตัว
      tl.to(
        '.honey-face-hood',
        { autoAlpha: 0, duration: 0.3 },
        'honeyIntroduce',
      )
      tl.to(
        '.honey-face-normal',
        { autoAlpha: 1, duration: 0.3 },
        'honeyIntroduce',
      )

      tl.to('.bubble-honey-2 .char-reveal', {
        autoAlpha: 1,
        y: 0,
        stagger: 0.03,
        duration: 0.06,
        ease: 'power2.out',
      })

      tl.to({}, { duration: 2.2 })

      tl.to('.bubble-honey-2', {
        autoAlpha: 0,
        scale: 0.85,
        duration: 0.4,
      })

      // ---------------------------------------
      // 7) Mild แนะนำตัว + ถามเรื่อง "จอมปราชญ์ไร้เสียง" (bubble-mind-3)
      // ---------------------------------------
      tl.to('.bubble-mind-3', {
        autoAlpha: 1,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.7)',
      })

      tl.to({}, { duration: 2.3 })

      tl.to('.bubble-mind-3', {
        autoAlpha: 0,
        scale: 0.85,
        duration: 0.4,
      })

      // ---------------------------------------
      // 8) ฮันนี่บอกให้เรียก "ฮันนี่" แทน (bubble-honey-3)
      // ---------------------------------------
      tl.to('.bubble-honey-3', {
        autoAlpha: 1,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.7)',
      })

      tl.to('.bubble-honey-3 .char-reveal', {
        autoAlpha: 1,
        y: 0,
        stagger: 0.03,
        duration: 0.06,
        ease: 'power2.out',
      })

      tl.to({}, { duration: 2.3 })

      tl.to('.bubble-honey-3', {
        autoAlpha: 0,
        scale: 0.85,
        duration: 0.4,
      })

      // ---------------------------------------
      // 9) Mild ขอบคุณ + ชวนกินก่อนข้าวเย็น (bubble-mind-4)
      // ---------------------------------------
      tl.to('.bubble-mind-4', {
        autoAlpha: 1,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.7)',
      })

      tl.to({}, { duration: 2 })

      tl.to('.bubble-mind-4', {
        autoAlpha: 0,
        scale: 0.85,
        duration: 0.4,
      })

      tl.addLabel('toCloseUp')

      tl.to(
        '.black-overlay',
        { autoAlpha: 1, duration: 0.4, ease: 'power2.in' },
        'toCloseUp',
      )
        .set('.bg-house-outside', { autoAlpha: 0 })
        .set('.bg-house-inside', { autoAlpha: 0 })
        .set('.mild-wrapper', {
          autoAlpha: 0,
        })
        .set('.honey-wrapper', {
          autoAlpha: 0,
        })
        .set('.bg-close-up', {
          autoAlpha: 1,
        })
        .to('.black-overlay', {
          autoAlpha: 0,
          duration: 0.4,
          ease: 'power2.out',
        })

      tl.to({}, { duration: 2 })

      // =======================================
      // ✅ RETURN FROM CLOSE-UP → BACK TO HOUSE
      // =======================================
      tl.addLabel('backFromCloseUp')

      tl.to(
        '.black-overlay',
        { autoAlpha: 1, duration: 0.4, ease: 'power2.in' },
        'backFromCloseUp',
      )

      // ปิด close-up
      tl.set('.bg-close-up', { autoAlpha: 0 })

      // เปิดฉากบ้านกลับมา
      tl.set('.bg-house-inside', { autoAlpha: 1 })

      // คืนตัวละครกลับมาเหมือนเดิม
      tl.set('.mild-wrapper', {
        autoAlpha: 1,
        bottom: '-7%',
        left: '50%',
        xPercent: 50,
      })

      tl.set('.honey-wrapper', {
        autoAlpha: 1,
      })

      // เปิดภาพกลับ
      tl.to('.black-overlay', {
        autoAlpha: 0,
        duration: 0.4,
        ease: 'power2.out',
      })

      // ฮันนี่พยักหน้า / ก้มหน้ากินแบบนิด ๆ
      tl.to('.honey-wrapper', {
        y: -8,
        duration: 0.25,
        yoyo: true,
        repeat: 3,
        ease: 'sine.inOut',
      })

      // ---------------------------------------
      // 10) Mild ขอให้ฟังคำขอหน่อย (bubble-mind-5)
      // ---------------------------------------
      tl.to('.bubble-mind-5', {
        autoAlpha: 1,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.7)',
      })

      tl.to({}, { duration: 2 })

      tl.to('.bubble-mind-5', {
        autoAlpha: 0,
        scale: 0.85,
        duration: 0.4,
      })

      // ---------------------------------------
      // 11) ฮันนี่ให้ลองว่ามา (bubble-honey-4)
      // ---------------------------------------
      tl.to('.bubble-honey-4', {
        autoAlpha: 1,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.7)',
      })

      tl.to('.bubble-honey-4 .char-reveal', {
        autoAlpha: 1,
        y: 0,
        stagger: 0.03,
        duration: 0.06,
      })

      tl.to({}, { duration: 1.8 })

      tl.to('.bubble-honey-4', {
        autoAlpha: 0,
        scale: 0.85,
        duration: 0.4,
      })

      // ---------------------------------------
      // 12) Mild เล่าเรื่องตัวเอง / ขอให้เป็นอาจารย์ (bubble-mind-6)
      // ---------------------------------------
      tl.to('.bubble-mind-6', {
        autoAlpha: 1,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.7)',
      })

      tl.to({}, { duration: 3 })

      tl.to('.bubble-mind-6', {
        autoAlpha: 0,
        scale: 0.85,
        duration: 0.4,
      })

      // ---------------------------------------
      // 13) ฮันนี่ปฏิเสธเบา ๆ (bubble-honey-5)
      // ---------------------------------------
      tl.addLabel('honeyReject') // optional label to sync things

      // ให้หน้า normal -> worry ตอนเริ่มพูด
      tl.to(
        '.bubble-honey-5',
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
        },
        'honeyReject',
      )

      // เปลี่ยนหน้า: hood/normal -> worry (fade)
      tl.to(
        '.honey-face-hood',
        { autoAlpha: 0, duration: 0.18 },
        'honeyReject+=0.05',
      )
      tl.to(
        '.honey-face-normal',
        { autoAlpha: 0, duration: 0.18 },
        'honeyReject+=0.05',
      )
      tl.to(
        '.honey-face-worry',
        { autoAlpha: 1, duration: 0.22 },
        'honeyReject+=0.1',
      )

      // แสดงตัวอักษรทีละตัว (ตามที่มีเดิม)
      tl.to(
        '.bubble-honey-5 .char-reveal',
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.025,
          duration: 0.05,
        },
        'honeyReject+=0.12',
      )

      // เวลาที่อยากให้ค้าง (เดิมมี 3 วินาที) ให้ใช้เดิมหรือปรับได้
      tl.to({}, { duration: 3 })

      // พอบับเบิลหาย ให้กลับเป็นหน้า normal (หรือจะเลือก hood ก็เปลี่ยน target)
      tl.to(
        '.bubble-honey-5',
        {
          delay: 0.6,
          autoAlpha: 0,
          scale: 0.85,
          duration: 0.4,
        },
        '<',
      ) // ให้ hide พร้อมกันกับการถอย

      // คืนหน้าเป็น normal หลังบับเบิลหาย
      tl.to('.honey-face-worry', { autoAlpha: 0, duration: 0.18, delay: 0.6 })
      tl.to('.honey-face-normal', { autoAlpha: 1, duration: 0.18 }, '<0.05')

      // ---------------------------------------
      // 14) Mild ทำหน้าหงุง + พูดอีกที (bubble-mind-7 แต่ใช้คลาส mind-6-ต่อ)
      // ---------------------------------------
      tl.to('.mild-face-normal', { autoAlpha: 0, duration: 0.2 })
      tl.to('.mild-face-worried', { autoAlpha: 1, duration: 0.2 }, '<')

      tl.to('.bubble-mind-7', {
        autoAlpha: 1,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.7)',
      })

      tl.to({}, { duration: 2.2 })

      tl.to('.bubble-mind-7', {
        autoAlpha: 0,
        scale: 0.85,
        duration: 0.4,
      })

      // ---------------------------------------
      // 15) ฮันนี่ปิดท้าย “ไว้ถ้าฉันตัดสินใจได้แล้ว…” (bubble-honey-6)
      // ---------------------------------------
      tl.to('.bubble-honey-6', {
        autoAlpha: 1,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.7)',
      })

      tl.to('.bubble-honey-6 .char-reveal', {
        autoAlpha: 1,
        y: 0,
        stagger: 0.03,
        duration: 0.06,
      })

      tl.to({}, { duration: 2.5 })

      tl.to('.bubble-honey-6', {
        autoAlpha: 0,
        scale: 0.85,
        duration: 0.4,
      })

      // ปิดฉากด้วย fade to black
      tl.to('.black-overlay', { autoAlpha: 1, duration: 1.2 }).to(
        {},
        { duration: 0.5 },
      )
    }, containerRef)

    return () => ctx.revert()
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black"
    >
      <div
        ref={sceneRef}
        className="relative shadow-2xl"
        style={{
          width: '100vw',
          height: `${100 / ASPECT_RATIO}vw`,
          minHeight: '100vh',
          minWidth: `${100 * ASPECT_RATIO}vh`,
        }}
      >
        {/* ===== BG ภายนอกบ้าน ===== */}
        <div className="bg-house-outside absolute inset-0 z-0">
          <img
            src={rescueHomeSceneAssets.outsideHouseBg}
            className="h-full w-full object-cover"
            alt="Mild House Outside"
          />
        </div>

        {/* ===== BG ภายในบ้าน ===== */}
        <div className="bg-house-inside absolute inset-0 z-0 opacity-0">
          <img
            src={rescueHomeSceneAssets.insideHouseBg}
            className="h-full w-full object-cover"
            alt="Mild House Inside"
          />
        </div>

        {/* ===== BG close up ===== */}
        <div className="bg-close-up absolute inset-0 z-0">
          <img
            src={rescueHomeSceneAssets.closeUpBg}
            className="h-full w-full object-cover"
            alt="Mild Close Up"
          />
        </div>

        {/* แถบบอกสถานที่ : ณ บ้านของมายด์ */}
        <div className="rescue-location-banner pointer-events-none absolute inset-0 z-[90] flex opacity-0">
          {/* ชั้นมืดเต็มจอ */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* backdrop ดำโปร่งแสงแบบแถบล่าง */}
          <div className="w-full px-[3cqw] py-[1.2cqw]">
            <div className="rescue-location-title absolute bottom-[200px] left-[300px] text-[1.8cqw] font-extrabold text-white">
              <SplitText>ณ บ้านของมายด์</SplitText>
              {/* เส้นเหลืองใต้ชื่อเหมือนสนามแข่ง */}
              <span className="mt-[0.3cqw] block h-[0.25cqw] w-[6cqw] bg-yellow-400" />
            </div>
          </div>
        </div>

        {/* ===== ชั้นภายในบ้าน (ตัวละคร + บับเบิล) ===== */}
        <div className="inside-group absolute inset-0 z-20">
          {/* MILD */}
          <div className="mild-wrapper absolute bottom-[10%] left-[20%] z-30 flex h-[60%] w-[24%] items-end justify-center">
            {/* Bubble มายด์ */}
            <div className="bubble-mind-1 absolute -top-[8%] right-[10%] z-40 w-[160%] rounded-3xl bg-white/95 p-[5%] text-black shadow-xl">
              <p className="text-[1.1cqw] leading-snug">
                สงสัยเค้าคงไม่ได้กินไรแน่ๆเลย ท้องร้องดังขนาดนี้
                คงต้องทำอะไรให้เค้ากินสักหน่อยแล้ว เอาเป็น “ข้าวห่อไข่” ดีกว่า
              </p>
              <div className="absolute -bottom-[12%] left-[52%] h-[1.3cqw] w-[1.3cqw] rounded-full bg-white" />
              <div className="absolute -bottom-[24%] left-[58%] h-[0.9cqw] w-[0.9cqw] rounded-full bg-white" />
            </div>

            <div className="bubble-mind-2 absolute -top-[18%] right-[10%] z-40 w-[160%] rounded-3xl bg-white/95 p-[5%] text-black shadow-xl">
              <p className="text-[1.05cqw] leading-snug">
                <span className="block text-[0.9cqw] text-gray-500">
                  (เสียงเบาๆ)
                </span>
                เอ้า ตื่นแล้วหรอคะ ก่อนหน้านี้อยู่ๆคุณก็สลบไป
                ฉันเลยพาคุณมาพักที่บ้านของฉันก่อน คงจะเป็นเพราะหิวสินะ
                ระหว่างที่สลบอยู่ท้องคุณร้องตลอดเลย ฉันก็เลยทำข้าวห่อไข่มาให้คุณ
                หวังว่าจะชอบนะ
              </p>
              <div
                className="absolute -bottom-[18%] right-[12%]
               h-0 w-0
               origin-top rotate-[-8deg] border-l-[1.1cqw]
               border-r-[1.1cqw] border-t-[1.6cqw] border-l-transparent
               border-r-transparent border-t-white"
              />
            </div>

            <div className="bubble-mind-3 absolute -top-[13%] right-[10%] z-40 w-[170%] rounded-3xl bg-white/95 p-[5%] text-black shadow-xl">
              <p className="text-[1.05cqw] leading-snug">
                <span className="block text-[0.9cqw] text-gray-500">
                  (เสียงเบาๆ)
                </span>
                มายด์ค่ะ ยินดีที่ได้รู้จักนะคุณฮันนี่
                จะว่าไปที่คุณไม่พูดเลยแบบนี้คุณคือ “จอมปราชญ์ไร้เสียง” ใช่ไหมคะ
              </p>
              <div
                className="absolute -bottom-[18%] right-[12%]
               h-0 w-0
               origin-top rotate-[-8deg] border-l-[1.1cqw]
               border-r-[1.1cqw] border-t-[1.6cqw] border-l-transparent
               border-r-transparent border-t-white"
              />
            </div>

            <div className="bubble-mind-4 absolute -top-[13%] right-[10%] z-40 w-[150%] rounded-3xl bg-white/95 p-[5%] text-black shadow-xl">
              <p className="text-[1.05cqw] leading-snug">
                <span className="block text-[0.9cqw] text-gray-500">
                  (เสียงเบาๆ)
                </span>
                เข้าใจแล้วค่ะ
                ยังไงก็ขอบคุณนะคุณฮันนี่ที่เข้ามาช่วยฉันเมื่อก่อนหน้านี้
                เพื่อเป็นการตอบแทนยังไงก็รีบกินก่อนที่ข้าวจะเย็นดีกว่านะ
              </p>
              <div
                className="absolute -bottom-[18%] right-[12%]
               h-0 w-0
               origin-top rotate-[-8deg] border-l-[1.1cqw]
               border-r-[1.1cqw] border-t-[1.6cqw] border-l-transparent
               border-r-transparent border-t-white"
              />
            </div>

            <div className="bubble-mind-5 absolute -top-[8%] right-[10%] z-40 w-[150%] rounded-3xl bg-white/95 p-[5%] text-black shadow-xl">
              <p className="text-[1.05cqw] leading-snug">
                <span className="block text-[0.9cqw] text-gray-500">
                  (เสียงเบาๆ)
                </span>
                จะว่าไปคุณฮันนี่ช่วยฟังคำขอของฉันสักหน่อยได้ไหมคะ
              </p>
              <div
                className="absolute -bottom-[18%] right-[12%]
               h-0 w-0
               origin-top rotate-[-8deg] border-l-[1.1cqw]
               border-r-[1.1cqw] border-t-[1.6cqw] border-l-transparent
               border-r-transparent border-t-white"
              />
            </div>

            <div className="bubble-mind-6 absolute -top-[18%] right-[10%] z-40 w-[170%] rounded-3xl bg-white/95 p-[5%] text-black shadow-xl">
              <p className="text-[1.0cqw] leading-snug">
                <span className="block text-[0.9cqw] text-gray-500">
                  (เสียงเบาๆ)
                </span>
                จริงๆแล้วฉันเป็นคนขี้อายค่ะทำให้เวทมนตร์ที่ฉันร่ายมักจะไม่ค่อยสมบูรณ์
                เพื่อนๆในห้องก็เลยคอยแกล้งเป็นประจำ ฉันอยากพิสูจน์ตัวเอง
                ว่าจริงๆแล้วฉันก็ทำได้แบบคุณฮันนี่
                คุณพอจะเป็นอาจารย์ให้ฉันได้ไหม
              </p>
              <div
                className="absolute -bottom-[18%] right-[12%]
               h-0 w-0
               origin-top rotate-[-8deg] border-l-[1.1cqw]
               border-r-[1.1cqw] border-t-[1.6cqw] border-l-transparent
               border-r-transparent border-t-white"
              />
            </div>

            <div className="bubble-mind-7 absolute -top-[13%] right-[10%] z-40 w-[160%] rounded-3xl bg-white/95 p-[5%] text-black shadow-xl">
              <p className="text-[1.05cqw] leading-snug">
                <span className="block text-[0.9cqw] text-gray-500">
                  (เสียงเบาๆ)
                </span>
                งั้นหรอคะ แต่ยังไงก็ลองเก็บไปคิดอีกทีได้ไหม
                ฉันอยากทำได้แบบคุณฮันนี่จริงๆนะ
              </p>
              <div
                className="absolute -bottom-[18%] right-[12%]
               h-0 w-0
               origin-top rotate-[-8deg] border-l-[1.1cqw]
               border-r-[1.1cqw] border-t-[1.6cqw] border-l-transparent
               border-r-transparent border-t-white"
              />
            </div>

            {/* Mild body */}
            <div className="mild-group relative h-full w-[90%]">
              <img
                src={rescueHomeSceneAssets.mildHair}
                className="absolute inset-0 z-0"
              />
              <img
                src={rescueHomeSceneAssets.mildBody}
                className="absolute inset-0 z-10"
              />
              <img
                src={rescueHomeSceneAssets.mildLeftArm}
                className="absolute left-0 top-0 z-20 w-full"
                alt="L Arm 2"
              />
              <img
                src={rescueHomeSceneAssets.mildRightArm}
                className="absolute left-0 top-0 z-20 w-full"
                alt="R Arm 2"
              />
              <div className="absolute left-0 top-0 z-20 w-full">
                <img
                  src={rescueHomeSceneAssets.mildFaceNormal}
                  className="mild-face-normal w-full"
                />
                <img
                  src={rescueHomeSceneAssets.mildFaceSmile}
                  className="mild-face-smile absolute inset-0 w-full"
                />
                <img
                  src={rescueHomeSceneAssets.mildFaceWorried}
                  className="mild-face-worried absolute inset-0 w-full"
                />
              </div>
            </div>
          </div>

          {/* HONEY */}
          <div className="honey-wrapper absolute bottom-[8%] right-[18%] z-30 flex h-[60%] w-[24%] items-end justify-center">
            {/* Bubble ฮันนี่ */}
            <div className="bubble-honey-1 absolute left-[15%] top-[10%] z-40 w-full rounded-3xl bg-white/95 p-[5%] text-black shadow-xl">
              <p className="text-[1.05cqw] leading-snug">
                (นึกในใจ) เอ๋ นี่มันกลิ่นอะไรอ่ะหอมเชียว
                <br />
                ว่าแต่ที่นี่ที่ไหนเนี่ยเรามาอยู่ที่นี่ได้ยังไงกัน
              </p>
              <div className="absolute -bottom-[12%] left-[12%] h-[1.3cqw] w-[1.3cqw] rounded-full bg-white" />
              <div className="absolute -bottom-[24%] left-[18%] h-[0.9cqw] w-[0.9cqw] rounded-full bg-white" />
            </div>

            <div className="bubble-honey-2 absolute left-[15%] top-[10%] z-40 w-[170%] p-[5%]">
              <p className="text-h-1 text-[1.5cqw] font-bold text-yellow-300 drop-shadow-lg">
                <SplitText>
                  ขอโทษนะที่ทำให้เธอต้องลำบาก จะว่าไปฉันยังไม่แนะนำตัวเลย
                </SplitText>
                <SplitText>ฉันชื่อ “ฮันนี่” ยินดีที่ได้รู้จักนะ…</SplitText>
              </p>
            </div>

            <div className="bubble-honey-3 absolute left-[15%] top-[3%] z-40 w-[180%] p-[5%]">
              <p className="text-h-2 text-[1.5cqw] font-bold text-yellow-300 drop-shadow-lg">
                <SplitText>
                  ฉันก็ไม่ค่อยรู้หรอกแต่คนอื่นก็มักจะเรียกฉันแบบนั้น
                </SplitText>
                <SplitText>เล่นเอาเขินตลอดเลยเวลาที่มีคนเรียกแบบนั้น</SplitText>
                <SplitText>เป็นไปได้เรียกฉันว่า “ฮันนี่” จะดีกว่า</SplitText>
              </p>
            </div>

            <div className="bubble-honey-4 absolute left-[15%] top-[15%] z-40 w-[180%] p-[5%]">
              <p className="text-h-3 text-[1.5cqw] font-bold text-yellow-300 drop-shadow-lg">
                <SplitText>
                  ลองว่ามาสิ ถ้าอะไรที่ฉันพอช่วยได้ฉันจะช่วยเอง
                </SplitText>
              </p>
            </div>

            <div className="bubble-honey-5 absolute -top-[5%] left-[15%] z-40 w-[170%] p-[5%]">
              <p className="text-h-4 text-[1.5cqw] font-bold text-yellow-300 drop-shadow-lg">
                <SplitText>
                  ฉันเข้าใจเธอนะ เมื่อก่อนฉันเองก็เป็นแบบเธอเหมือนกัน
                </SplitText>
                <SplitText>แต่เรื่องให้เป็นอาจารย์ฉันว่าคงไม่ไหว</SplitText>
                <SplitText>
                  ฉันคิดว่าตัวเองคงสอนใครไม่ได้หรอกเพราะฉันเองก็ยังไม่กล้าแม้แต่จะพูดเลย
                </SplitText>
              </p>
            </div>

            <div className="bubble-honey-6 absolute left-[15%] top-[10%] z-40 w-[160%] p-[5%]">
              <p className="text-h-5 text-[1.5cqw] font-bold text-yellow-300 drop-shadow-lg">
                <SplitText>
                  ไว้ถ้าฉันตัดสินใจได้แล้วเดี๋ยวจะติดต่ออีกทีนะ
                </SplitText>
              </p>
            </div>

            {/* Honey body */}
            <div className="honey-group relative h-[80%] w-[80%]">
              <img
                src={rescueHomeSceneAssets.honeyBody}
                className="relative w-full"
              />

              {/* ใส่หน้าเป็นเลเยอร์ซ้อนกัน */}
              <img
                src={rescueHomeSceneAssets.honeyFaceHood}
                className="honey-face-hood absolute left-0 top-[2%] w-full"
              />
              <img
                src={rescueHomeSceneAssets.honeyNormalFace}
                className="honey-face-normal absolute left-0 top-[2%] w-full"
              />
              <img
                src={rescueHomeSceneAssets.honeyWorryFace}
                className="honey-face-worry absolute left-0 top-[2%] w-full"
              />
            </div>
          </div>
        </div>

        {/* BLACK OVERLAY */}
        <div className="black-overlay pointer-events-none absolute inset-0 z-[100] bg-black" />
      </div>
    </div>
  )
}
