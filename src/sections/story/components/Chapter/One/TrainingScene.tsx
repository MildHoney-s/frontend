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

export default function TrainingScene({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const sceneRef = useRef<HTMLDivElement | null>(null)

  // --- ปรับ path ให้ตรงกับของจริง ---
  const fieldBgImg = '/assets/Part1/training/field.png'
  const monsterImg = '/assets/Part1/training/monster.png'
  const carryHomeBgImg = '/assets/Part1/training/carry_home.png'

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ===== INITIAL STATE =====
      gsap.set('.black-overlay', { autoAlpha: 1 })

      gsap.set('.bg-carry-home', { autoAlpha: 0 })

      // backdrop ตอนฉาก carry home
      gsap.set('.carry-backdrop', { autoAlpha: 0 })
      gsap.set('.carry-title .char-reveal', { autoAlpha: 0, y: 10 })
      gsap.set('.carry-desc .char-reveal', { autoAlpha: 0, y: 10 })

      // Mild เริ่มเดินมาจากซ้ายล่าง
      gsap.set('.mild-wrapper', {
        bottom: '0%',
        left: '20%',
        xPercent: -80,
        yPercent: 0,
        autoAlpha: 1,
      })

      // ใบหน้า
      gsap.set('.mild-face-normal', { autoAlpha: 1 })
      gsap.set(['.mild-face-scared', '.mild-face-worried'], { autoAlpha: 0 })

      // มอนสเตอร์ & ฮันนี่
      gsap.set('.monster', {
        autoAlpha: 0,
        scale: 0.6,
        xPercent: 60,
        yPercent: 10,
      })
      gsap.set('.honey-wrapper', {
        autoAlpha: 0,
        xPercent: 80,
        yPercent: 13,
        bottom: '7%',
        right: '8%',
        rotate: 0, // ✅ เพิ่ม
        transformOrigin: '50% 100%', // ✅ หมุนจากปลายเท้า
      })

      // bubble / effect
      gsap.set(
        [
          '.bubble-mind-1',
          '.bubble-mind-2',
          '.bubble-mind-3',
          '.bubble-mind-4',
          '.bubble-mind-5',
          '.bubble-mind-6',
          '.bubble-mind-7',
          '.bubble-scream',
        ],
        {
          autoAlpha: 0,
          scale: 0.8,
          transformOrigin: 'bottom left',
        },
      )

      gsap.set('.bubble-honey', {
        autoAlpha: 0,
        scale: 0.8,
        transformOrigin: 'bottom left',
      })
      // เริ่มต้นให้มีแต่ text-h-1 ที่พร้อมแสดง (แต่ตัวอักษรยังซ่อน)
      gsap.set('.text-h-1', { display: 'block', autoAlpha: 1 })
      gsap.set('.text-h-2', { display: 'none', autoAlpha: 0 })
      gsap.set('.text-h-3', { display: 'none', autoAlpha: 0 })

      // RESET ตัวอักษร
      gsap.set('.text-h-1 .char-reveal', { autoAlpha: 0, y: 4 })
      gsap.set('.text-h-2 .char-reveal', { autoAlpha: 0, y: 4 })
      gsap.set('.text-h-3 .char-reveal', { autoAlpha: 0, y: 4 })

      gsap.set('.magic-fail-text', { autoAlpha: 0, scale: 0.7 })
      gsap.set('.magic-hit-flash', { autoAlpha: 0 })

      gsap.set('.magic-mild-fire', {
        autoAlpha: 0,
        scale: 0.4,
        transformOrigin: '50% 50%',
      })

      gsap.to('.magic-mild-fire', {
        rotation: -360,
        duration: 25,
        repeat: -1,
        ease: 'linear',
        transformOrigin: '50% 50%',
      })

      gsap.set('.magic-mild-fire-2', {
        autoAlpha: 0,
        scale: 0.4,
        transformOrigin: '50% 50%',
      })

      gsap.to('.magic-mild-fire-2', {
        rotation: -360,
        duration: 25,
        repeat: -1,
        ease: 'linear',
        transformOrigin: '50% 50%',
      })

      // ===== MAIN TIMELINE (scroll + pin) =====
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=8000',
          scrub: 1,
          pin: true,
          // markers: true,
          onLeave: () => onComplete?.(),
        },
      })

      /* -----------------------------------------
       * 1) Fade-in ฉาก + มายด์คิดในใจ (bubble-mind-1)
       * ----------------------------------------*/
      tl.to('.black-overlay', { autoAlpha: 0, duration: 1.5 })

      tl.addLabel('walkIn')
      tl.to(
        '.mild-wrapper',
        { xPercent: -10, duration: 3, ease: 'power1.inOut' },
        'walkIn',
      ).to(
        '.mild-wrapper',
        {
          y: '-=6',
          repeat: 10,
          yoyo: true,
          duration: 0.35,
          ease: 'sine.inOut',
        },
        'walkIn',
      )

      tl.to('.bubble-mind-1', {
        autoAlpha: 1,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.6)',
      })
        // รอให้คนอ่านประโยค "เอาล่ะ… วันนี้ต้องพยายามให้เต็มที่!"
        .to({}, { duration: 2 })
        // ซ่อน bubble มายด์
        .to('.bubble-mind-1', { autoAlpha: 0, scale: 0.8, duration: 0.4 })
        // แล้วให้วงเวทโผล่ขึ้นมาหลังจากคิดเสร็จ
        .to('.magic-mild-fire', {
          autoAlpha: 1,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
        })

      /* -----------------------------------------
       * 2) มายด์ลองร่ายเวท → ไม่สำเร็จ!
       * ----------------------------------------*/
      tl.addLabel('train')
      tl.to(
        '.magic-fail-text',
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.4,
          ease: 'back.out(1.7)',
        },
        'train',
      )
      tl.to(
        '.mild-wrapper',
        {
          x: '+=6',
          duration: 0.12,
          repeat: 6,
          yoyo: true,
          ease: 'power1.inOut',
        },
        'train',
      )
      tl.to({}, { duration: 1.5 })
      // วงเวทดับลงตอนร่ายเวทพลาด
      tl.to(
        '.magic-mild-fire',
        {
          autoAlpha: 0,
          duration: 0.3,
        },
        'train',
      )

      tl.to({}, { duration: 1.5 })
      tl.to('.magic-fail-text', { autoAlpha: 0, duration: 0.4 })

      /* -----------------------------------------
       * 3) มอนสเตอร์โผล่ + มายด์ตกใจ + bubble-mind-2
       * ----------------------------------------*/
      tl.addLabel('monster')
      tl.to(
        '.monster',
        {
          autoAlpha: 1,
          scale: 1,
          xPercent: -30,
          duration: 1.2,
          ease: 'back.out(1.3)',
        },
        'monster',
      )

      tl.to(
        '.mild-face-normal',
        { autoAlpha: 0, duration: 0.1 },
        'monster+=0.1',
      ).to(
        '.mild-face-scared',
        { autoAlpha: 1, duration: 0.1 },
        'monster+=0.15',
      )

      tl.to(
        '.bubble-mind-2',
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
        },
        'monster+=0.2',
      )
        // ✅ รอให้คนอ่าน “แย่แล้ว… มอนสเตอร์มาจากไหนเนี่ย”
        .to({}, { duration: 2 })

        // ✅ ซ่อน bubble-mind-2
        .to('.bubble-mind-2', {
          autoAlpha: 0,
          scale: 0.8,
          duration: 0.4,
        })

        // ✅ ให้ magic-mild-fire-2 โผล่หลังพูดจบ
        .to('.magic-mild-fire-2', {
          autoAlpha: 1,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
        })

        // ✅ ค้างวงเวทไว้สักพัก
        .to({}, { duration: 1.5 })

        // ✅ ค่อย ๆ ดับวงเวทก่อนเข้าฉากถัดไป
        .to('.magic-mild-fire-2', {
          autoAlpha: 0,
          duration: 0.4,
        })

      /* -----------------------------------------
       * 4) มายด์ยิงเวทใส่มอนสเตอร์ แต่ไม่โดน (bubble-mind-3)
       * ----------------------------------------*/
      tl.addLabel('attack')

      tl.to(
        '.magic-fail-text',
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.3,
          ease: 'back.out(1.7)',
        },
        'attack',
      ).to(
        '.mild-wrapper',
        {
          x: '+=10',
          duration: 0.12,
          repeat: 5,
          yoyo: true,
          ease: 'power1.inOut',
        },
        'attack',
      )

      tl.to(
        '.bubble-mind-3',
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.4,
          ease: 'back.out(1.7)',
        },
        'attack+=0.3',
      )

      tl.to({}, { duration: 2 })
      tl.to(['.magic-fail-text', '.bubble-mind-3'], {
        autoAlpha: 0,
        scale: 0.8,
        duration: 0.4,
      })

      /* -----------------------------------------
       * 5) มอนสเตอร์บุก → มายด์กรี๊ด (bubble-scream)
       * ----------------------------------------*/
      tl.addLabel('monsterCharge')
      tl.to(
        '.monster',
        {
          xPercent: -50,
          duration: 1.2,
          ease: 'power2.inOut',
        },
        'monsterCharge',
      )

      tl.to(
        '.bubble-scream',
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.3,
          ease: 'back.out(2)',
        },
        'monsterCharge+=0.4',
      )

      tl.to({}, { duration: 1.5 })

      /* -----------------------------------------
       * 6) ฮันนี่เข้าช่วย ยิงเวทใส่มอนสเตอร์
       * ----------------------------------------*/
      tl.addLabel('honeyIn')
      tl.to(
        '.honey-wrapper',
        {
          autoAlpha: 1,
          xPercent: -30,
          yPercent: 13,
          duration: 1.2,
          ease: 'power2.out',
        },
        'honeyIn',
      )

      tl.to(
        '.magic-hit-flash',
        { autoAlpha: 1, duration: 0.15, ease: 'power4.out' },
        'honeyIn+=0.8',
      ).to('.magic-hit-flash', { autoAlpha: 0, duration: 0.3 })

      tl.to(
        '.monster',
        {
          xPercent: -60,
          yPercent: -40,
          autoAlpha: 0,
          scale: 0.4,
          duration: 0.8,
          ease: 'power2.in',
        },
        'honeyIn+=0.8',
      )

      tl.to('.bubble-scream', { autoAlpha: 0, scale: 0.8, duration: 0.3 }, '<')

      /* -----------------------------------------
       * 7) ฮันนี่ถาม “เป็นอะไรไหม” (text-h-1)
       * ----------------------------------------*/
      tl.addLabel('afterBattle', 'honeyIn+=1.2')

      tl.to(
        '.bubble-honey',
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
        },
        'afterBattle',
      )

      tl.to(
        '.text-h-1 .char-reveal',
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.06,
          duration: 0.08,
        },
        'afterBattle+=0.2',
      )

      tl.to({}, { duration: 2 })

      tl.to(
        '.mild-face-scared',
        { autoAlpha: 0, duration: 0.2 },
        'afterBattle+=0.1',
      ).to(
        '.mild-face-normal',
        { autoAlpha: 1, duration: 0.2 },
        'afterBattle+=0.1',
      )

      /* -----------------------------------------
       * 9) ฮันนี่พูดครั้งที่ 2 (text-h-2) → แล้วจะไป
       * ----------------------------------------*/
      tl.to('.text-h-1', { autoAlpha: 0, duration: 0.2 })
      tl.set('.text-h-1', { display: 'none' })

      tl.to('.bubble-mind-4', {
        autoAlpha: 1,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.7)',
      })

      tl.to({}, { duration: 2 })

      tl.to('.bubble-mind-4', {
        autoAlpha: 0,
        scale: 0.8,
        duration: 0.3,
      })

      // ✅ บังคับให้ bubble กลับมาชัวร์ (กัน scrub ดูดกลับ)
      tl.set('.bubble-honey', { autoAlpha: 1, scale: 1 })

      tl.set('.text-h-2', { display: 'block', autoAlpha: 1 })

      // ✅ RESET char ของ text-h-2 ก่อนเล่น
      tl.set('.text-h-2 .char-reveal', { autoAlpha: 0, y: 4 })

      tl.fromTo(
        '.text-h-2 .char-reveal',
        { autoAlpha: 0, y: 4 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.03,
          duration: 0.05,
        },
      )

      tl.to({}, { duration: 2 })

      tl.to('.bubble-honey', { autoAlpha: 0, scale: 0.8, duration: 0.3 })
      // tl.to('.honey-wrapper', { y: 20, duration: 0.4, ease: 'power1.inOut' })

      /* -----------------------------------------
       * 10) มายด์จับเสื้อ + ถาม “จอมปราชญ์ไร้เสียง?”
       * ----------------------------------------*/
      tl.to('.bubble-mind-5', {
        autoAlpha: 1,
        scale: 1,
        duration: 0.4,
        ease: 'back.out(1.7)',
      })
        .to({}, { duration: 1 })
        .to('.bubble-mind-5', { autoAlpha: 0, scale: 0.8, duration: 0.3 })

      tl.to('.bubble-mind-6', {
        autoAlpha: 1,
        scale: 1,
        duration: 0.4,
        ease: 'back.out(1.7)',
      })
        .to({}, { duration: 2 })
        .to('.bubble-mind-6', { autoAlpha: 0, scale: 0.8, duration: 0.3 })

      /* -----------------------------------------
       * 11) ฮันนี่ตอบเวทตัวอักษร “เอ่อ…” (bubble-honey-3)
       * ----------------------------------------*/
      tl.set('.bubble-honey', { autoAlpha: 1, scale: 1 }) // เผื่อโดน fade ไปก่อนหน้า
      tl.set('.text-h-1', { autoAlpha: 0 })
      tl.set('.text-h-2', { autoAlpha: 0 })
      tl.set('.text-h-3', { display: 'block', autoAlpha: 1 })

      tl.set('.text-h-3 .char-reveal', { autoAlpha: 0, y: 4 })

      tl.fromTo(
        '.text-h-3 .char-reveal',
        { autoAlpha: 0, y: 4 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.03,
          duration: 0.05,
        },
      )

      // ✅ ให้ "เอ่อ…" ค้างซักพักก่อนหายไป
      tl.to({}, { duration: 2 })

      // ✅ สั่งให้ bubble หายไปก่อนค่อยล้ม
      tl.to('.bubble-honey', {
        autoAlpha: 0,
        scale: 0.8,
        duration: 0.3,
      })

      /* -----------------------------------------
       * 12) ฮันนี่ล้มหมดสติ (หมุน 90 องศา)
       * ----------------------------------------*/
      tl.to('.honey-wrapper', {
        rotate: -90, // หมุนล้ม
        y: -270, // ปรับตามที่ชอบ
        x: 200,
        duration: 3.0,
        ease: 'power2.in',
      })

      /* -----------------------------------------
       * 12) ฮันนี่สลบ → มายด์ตกใจ (bubble-mind-7)
       * ----------------------------------------*/
      tl.to('.bubble-mind-7', {
        autoAlpha: 1,
        scale: 1,
        duration: 0.4,
        ease: 'back.out(1.7)',
      })
        .to({}, { duration: 2 })
        .to('.bubble-mind-7', { autoAlpha: 0, scale: 0.8, duration: 0.3 })

      /* -----------------------------------------
       * 13) CUT SCENE → ฉากลากกลับบ้าน
       * ----------------------------------------*/
      tl.to('.black-overlay', { autoAlpha: 1, duration: 0.4 })

      tl.set('.bg-carry-home', { autoAlpha: 1 })
      tl.set('.monster', { autoAlpha: 0 })
      tl.set('.honey-wrapper', { autoAlpha: 0 })
      tl.set('.mild-wrapper', { autoAlpha: 0 })

      // ให้ตัดมาที่ฉาก carry home ปกติก่อน
      tl.to('.black-overlay', { autoAlpha: 0, duration: 0.6 })

      // รอสักนิดก่อนขึ้นคำบรรยาย
      tl.to({}, { duration: 0.5 })

      // โชว์ backdrop + animate ตัวอักษรทีละตัว
      tl.to('.carry-backdrop', {
        autoAlpha: 1,
        duration: 0.6,
        ease: 'power1.out',
      })

      tl.to(
        '.carry-title .char-reveal',
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.03,
          duration: 0.05,
          ease: 'power2.out',
        },
        '<0.1', // เริ่มใกล้ ๆ กับตอน backdrop ขึ้น
      )

      tl.to(
        '.carry-desc .char-reveal',
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.02,
          duration: 0.05,
          ease: 'power2.out',
        },
        '>-0.2', // ตามหลัง title มานิดหน่อย
      )

      // ค้างให้คนอ่าน
      tl.to({}, { duration: 2.5 })

      // ค่อย ๆ หาย
      tl.to('.carry-backdrop', {
        autoAlpha: 0,
        duration: 0.6,
        ease: 'power1.in',
      })

      // ปิดฉากไปตอนถัดไปเหมือนเดิม
      tl.to('.black-overlay', { autoAlpha: 1, duration: 1.5 }).to(
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
        {/* ================= BG LAYER ================= */}
        <div className="arena-bg absolute inset-0 z-0">
          <img
            src={fieldBgImg}
            className="h-full w-full object-cover"
            alt="Training Field"
          />
        </div>

        {/* BG ตอนพากลับบ้าน (Close-up แบบ TeaShop) */}
        <div className="bg-carry-home absolute inset-0 z-10 opacity-0">
          <img
            src={carryHomeBgImg}
            className="h-full w-full object-cover"
            alt="Carry Honey Home"
          />
        </div>

        {/* === BACKDROP + CENTER TEXT เมื่อพากลับบ้าน (FULL SCREEN) === */}
        <div className="carry-backdrop pointer-events-none absolute inset-0 z-[90] flex items-center justify-center opacity-0">
          {/* ชั้นมืดเต็มจอ */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* กล่องข้อความตรงกลาง */}
          <div className="relative z-10 px-[4cqw] py-[3cqw] text-center">
            <div className="carry-title mb-[1cqw] text-[2cqw] font-extrabold text-white drop-shadow-lg">
              <SplitText>ด้วยที่บุคคลปริศนาสลบไป</SplitText>
            </div>
            <div className="carry-desc text-[1.4cqw] leading-snug text-white/90">
              <SplitText className="space-y-1">
                เพราะเหตุนี้มายด์จึงต้องลากบุคคลปริศนากลับบ้าน
              </SplitText>
            </div>
          </div>
        </div>

        {/* ================= EFFECT LAYER ================= */}
        <div className="magic-hit-flash pointer-events-none absolute inset-0 z-20 bg-white/70" />

        {/* ================= MONSTER ================= */}
        <div className="monster absolute bottom-[10%] right-[10%] z-20 h-[45%] w-[23%]">
          <img
            src={monsterImg}
            className="h-full w-full object-contain"
            alt="Monster"
          />
        </div>

        {/* ================= MILD ================= */}
        <div className="mild-wrapper absolute bottom-[10%] left-[20%] z-30 flex h-[55%] w-[22%] items-end justify-center">
          {/* ===== Bubble Mind ทั้งหมด ===== */}
          <div className="bubble-mind-1 absolute -left-[5%] -top-[10%] z-40 w-full rounded-3xl bg-white/95 p-[5%] text-black shadow-xl">
            <p className="text-[1.1cqw] leading-snug">
              เอาล่ะ… ต้องทำให้ได้ดีกว่าก่อนหน้านี้
              <br />
              วันนี้ต้องพยายามให้เต็มที่!
            </p>
            <div className="absolute -bottom-[12%] left-[12%] h-[1.3cqw] w-[1.3cqw] rounded-full bg-white" />
            <div className="absolute -bottom-[24%] left-[18%] h-[0.9cqw] w-[0.9cqw] rounded-full bg-white" />
          </div>

          <div className="bubble-mind-2 absolute -left-[5%] -top-[10%] z-40 w-full rounded-3xl bg-white/95 p-[5%] text-black shadow-xl">
            <p className="text-[1.1cqw] leading-snug">
              แย่แล้ว… มอนสเตอร์มาจากไหนเนี่ย
              <br />
              แต่ตอนนี้ไม่มีเวลามาสงสัยแล้ว!
            </p>
            <div className="absolute -bottom-[12%] left-[12%] h-[1.3cqw] w-[1.3cqw] rounded-full bg-white" />
            <div className="absolute -bottom-[24%] left-[18%] h-[0.9cqw] w-[0.9cqw] rounded-full bg-white" />
          </div>

          <div className="bubble-mind-3 absolute -left-[5%] -top-[6%] z-40 w-full rounded-3xl bg-white/95 p-[5%] text-black shadow-xl">
            <p className="text-[1.1cqw] leading-snug">
              ไม่นะ… ไม่ได้ผลเลยเหรอ!?
            </p>
            <div className="absolute -bottom-[20%] left-[12%] h-[1.3cqw] w-[1.3cqw] rounded-full bg-white" />
            <div className="absolute -bottom-[32%] left-[18%] h-[0.9cqw] w-[0.9cqw] rounded-full bg-white" />
          </div>

          <div className="bubble-scream absolute -left-[5%] -top-[8%] z-50 w-full rounded-3xl bg-pink-100 p-[5%] text-black shadow-xl">
            <p className="text-[1.4cqw] font-bold leading-snug text-pink-600">
              อ้าาาาาาา!!!
            </p>
            <div
              className="absolute -bottom-[18%] left-[12%]
               h-0 w-0
               origin-top rotate-[-8deg] border-l-[1.1cqw]
               border-r-[1.1cqw] border-t-[1.6cqw] border-l-transparent
               border-r-transparent border-t-pink-100"
            />
          </div>

          <div className="bubble-mind-4 absolute -left-[5%] -top-[10%] z-40 w-full rounded-3xl bg-white/95 p-[5%] text-black shadow-xl">
            <p className="text-[1.1cqw] leading-snug">
              <span className="block text-[0.9cqw] text-gray-500">
                (เสียงเบาๆ)
              </span>
              มะไม่เป็นไรค่ะ
            </p>
            <div
              className="absolute -bottom-[18%] left-[12%]
               h-0 w-0
               origin-top rotate-[-8deg] border-l-[1.1cqw]
               border-r-[1.1cqw] border-t-[1.6cqw] border-l-transparent
               border-r-transparent border-t-white"
            />
          </div>

          <div className="bubble-mind-5 absolute -left-[5%] -top-[10%] z-40 w-full rounded-3xl bg-white/95 p-[5%] text-black opacity-0 shadow-xl">
            <p className="text-[1.4cqw] font-bold leading-snug">เอ๊ะ!!</p>
            <div
              className="absolute -bottom-[18%] left-[12%]
               h-0 w-0
               origin-top rotate-[-8deg] border-l-[1.1cqw]
               border-r-[1.1cqw] border-t-[1.6cqw] border-l-transparent
               border-r-transparent border-t-white"
            />
          </div>

          <div className="bubble-mind-6 absolute -left-[5%] -top-[10%] z-40 w-full rounded-3xl bg-white/95 p-[5%] text-black opacity-0 shadow-xl">
            <p className="text-[1.1cqw] leading-snug">
              <span className="block text-[0.9cqw] text-gray-500">
                (เสียงเบาๆ)
              </span>
              คุณใช่ “จอมปราชญ์ไร้เสียง” ไหมคะ?
            </p>
            <div
              className="absolute -bottom-[18%] left-[12%]
               h-0 w-0
               origin-top rotate-[-8deg] border-l-[1.1cqw]
               border-r-[1.1cqw] border-t-[1.6cqw] border-l-transparent
               border-r-transparent border-t-white"
            />
          </div>

          <div className="bubble-mind-7 absolute -left-[5%] -top-[10%] z-40 w-full rounded-3xl bg-white/95 p-[5%] text-black opacity-0 shadow-xl">
            <p className="text-[1.1cqw] leading-snug">
              <span className="block text-[0.9cqw] text-gray-500">
                (เสียงเบาๆ)
              </span>
              ยะแย่แล้ว เป็นไรไปเนี่ยคุณ…
            </p>
            <div
              className="absolute -bottom-[18%] left-[12%]
               h-0 w-0
               origin-top rotate-[-8deg] border-l-[1.1cqw]
               border-r-[1.1cqw] border-t-[1.6cqw] border-l-transparent
               border-r-transparent border-t-white"
            />
          </div>

          {/* ===== Mild Body ===== */}
          <div className="mild-group relative h-full w-[90%] ">
            <img
              src="/assets/Part2/Mild/Body/Hair.PNG"
              className="absolute inset-0 z-0"
            />
            <img
              src="/assets/Part2/Mild/Body/Body_1.PNG"
              className="absolute inset-0 z-10"
            />
            <img
              src="/assets/Part2/Mild/Arms/Arm_1_L.PNG"
              className="absolute inset-0 z-20"
            />
            <img
              src="/assets/Part2/Mild/Arms/Arm_1_R.PNG"
              className="absolute inset-0 z-20"
            />

            <div className="absolute left-0 top-[0%] z-30 w-full">
              <img
                src="/assets/Part2/Mild/Face/Face_01_หน้าปกติ.PNG"
                className="mild-face-normal w-full"
              />
              <img
                src="/assets/Part2/Mild/Face/Face_07_หน้ายิ้ม2.PNG"
                className="mild-face-worried absolute inset-0 w-full"
              />
              <img
                src="/assets/Part2/Mild/Face/Face_03_หน้าตกใจ.PNG"
                className="mild-face-scared absolute inset-0 w-full"
              />
            </div>
          </div>
        </div>

        {/* ================= FAIL TEXT ================= */}
        <div className="magic-fail-text absolute right-[18%] top-[18%] z-40 text-[3cqw] font-extrabold text-red-400 drop-shadow-[0_0_10px_rgba(0,0,0,0.9)]">
          ไม่สำเร็จ!
        </div>

        {/* ================= HONEY ================= */}
        <div className="honey-wrapper absolute bottom-[7%] right-[8%] z-30 flex h-[60%] w-[22%] items-end justify-center">
          <div className="honey-group relative z-20 h-[80%] w-[80%]">
            <img
              src="/assets/Part2/Honey/Body.PNG"
              className="relative w-full"
            />
            {/* <img
              src="/assets/Part2/Honey/Normal_Face.PNG"
              className="honey-normal-face absolute left-0 top-[2%] w-full"
            /> */}
            <img
              src="/assets/Part2/Honey/Hood_face.png"
              className="honey-hood-face absolute left-0 top-[2%] w-full"
            />
          </div>

          {/* ===== Honey Magic Text ===== */}
          <div className="bubble-honey absolute right-[150px] top-[50px] z-50 flex w-[320px] flex-col items-end text-right">
            <div className="text-h-1 text-[1.5cqw] font-bold text-yellow-300 drop-shadow-lg">
              <SplitText>เป็นอะไรไหม?</SplitText>
            </div>

            <div className="text-h-2 space-y-1 text-[1.5cqw] font-bold text-yellow-300 drop-shadow-lg">
              <p>
                <SplitText>งั้นหรอ...</SplitText>
              </p>
              <p>
                <SplitText>ถ้างั้นฉันขอตัวก่อนนะ</SplitText>
              </p>
            </div>

            <div className="text-h-3 relative -top-[2.5cqw] text-[1.5cqw] font-bold text-yellow-300 drop-shadow-lg">
              <SplitText>เอ่อ…</SplitText>
            </div>
          </div>
        </div>

        <img
          src="/assets/part3/Character/Battle/Mild/Magic1/Fire_Circle.png"
          className="magic-mild-fire absolute right-[20%] top-[60%] z-10 w-[300px]"
          alt="FireMagic"
        />

        <img
          src="/assets/part3/Character/Battle/Mild/Magic1/Fire_Circle.png"
          className="magic-mild-fire-2 absolute right-[19%] top-[60%] z-30 w-[300px]"
          alt="FireMagic"
        />

        {/* ================= BLACK OVERLAY ================= */}
        <div className="black-overlay pointer-events-none absolute inset-0 z-[100] bg-black" />
      </div>
    </div>
  )
}
