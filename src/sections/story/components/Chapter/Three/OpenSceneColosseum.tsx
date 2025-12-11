import { openSceneColosseumAssets } from '@/assets/chapterThreeAssets'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  onComplete: () => void
}

export default function OpenSceneColosseum({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // --- 0. INITIAL SETUP ---
      gsap.set('.location-title', { y: 30, autoAlpha: 0 })

      // ซ่อนกล่องข้อความทั้ง 3 กล่องไว้ก่อน
      gsap.set('.narration-box', { autoAlpha: 0, scale: 0.8, y: 20 })

      // BG Setup
      gsap.set('.colosseum-bg', {
        scale: 1.2,
        yPercent: -20,
        transformOrigin: 'center center',
      })

      // Fireworks Setup
      gsap.set('.firework', {
        y: 300,
        autoAlpha: 0,
        scale: () => gsap.utils.random(1.2, 1.8),
      })

      // --- 1. INTRO (Title) ---
      const introTl = gsap.timeline()
      introTl
        .to('.black-overlay', { autoAlpha: 0, duration: 2 })
        .to(
          '.location-title',
          { y: 0, autoAlpha: 1, duration: 1.5, ease: 'power2.out' },
          '<0.5',
        )

      // =========================================================
      // ✅ MASTER TIMELINE
      // =========================================================
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      })

      // STEP 1: PARALLAX PHASE (เลื่อนภาพ + พลุ)
      mainTl
        .to('.location-title', { autoAlpha: 0, duration: 0.5 })
        .addLabel('startScroll')

        .to(
          '.colosseum-bg',
          {
            yPercent: 10,
            ease: 'none',
            duration: 5,
          },
          'startScroll',
        )

        .to(
          '.firework',
          {
            y: -400,
            autoAlpha: 1,
            ease: 'none',
            stagger: { amount: 2, from: 'random' },
            duration: 5,
          },
          'startScroll',
        )

      // =========================================================
      // ✅ STEP 2: NARRATION SEQUENCE (เล่าเรื่อง 3 ช่วง)
      // =========================================================

      // กล่องที่ 1: ต้อนรับ
      mainTl
        .to('.narration-1', {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 2,
          ease: 'back.out(1.2)',
        })
        .to({}, { duration: 3 }) // ช่วงเวลาให้อ่าน
        .to('.narration-1', { autoAlpha: 0, scale: 1.1, duration: 1 }) // หายไป

      // กล่องที่ 2: เริ่มคู่แรก
      mainTl
        .to('.narration-2', {
          autoAlpha: 1,
          scale: 1,
          x: -280,
          y: -180,
          duration: 2,
          ease: 'back.out(1.2)',
        })
        .to({}, { duration: 3 })
        .to('.narration-2', { autoAlpha: 0, scale: 1.1, duration: 1 })

      // กล่องที่ 3: แนะนำคู่ต่อสู้ (ค้างไว้นานหน่อยก่อนตัดจบ)
      mainTl
        .to('.narration-3', {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 2,
          ease: 'back.out(1.2)',
        })
        .to({}, { duration: 6 }) // ค้างไว้นานๆ ให้ลุ้น

      // STEP 3: EXIT
      mainTl.to('.black-overlay', {
        autoAlpha: 1,
        duration: 2,
      })

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'bottom bottom',
        onEnter: () => onComplete(),
      })
    }, containerRef)
    return () => ctx.revert()
  }, [onComplete])

  return (
    // ✅ เพิ่มความสูงเป็น 500vh เพื่อให้มีพื้นที่เล่าเรื่อง 3 ช่วงได้ครบถ้วน
    <div ref={containerRef} className="relative h-[500vh] w-full bg-black">
      <div className="sticky left-0 top-0 h-screen w-full overflow-hidden font-sans">
        {/* Layer 1: Background */}
        <div
          className="colosseum-bg absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${openSceneColosseumAssets.bgImg}')`,
          }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Layer 1.5: Fireworks */}
        <div className="fireworks-layer pointer-events-none absolute inset-0 z-0">
          {/* 1. สีฟ้า (ซ้ายล่าง) */}
          <img
            src={openSceneColosseumAssets.firework_blue}
            className="firework absolute left-[5%] top-[65%] w-64 opacity-80 mix-blend-screen"
            alt="firework"
          />
          {/* 2. สี Navy (ขวากลาง) */}
          <img
            src={openSceneColosseumAssets.firework_navy}
            className="firework absolute right-[10%] top-[75%] w-64 opacity-80 mix-blend-screen"
            alt="firework"
          />
          {/* 3. สีเขียว (ซ้ายกลาง ค่อนบน) */}
          <img
            src={openSceneColosseumAssets.firework_green}
            className="firework absolute left-[25%] top-[40%] w-56 opacity-80 mix-blend-screen"
            alt="firework"
          />
          {/* 4. สีส้ม (ขวาล่าง) */}
          <img
            src={openSceneColosseumAssets.firework_orange}
            className="firework absolute right-[30%] top-[55%] w-72 opacity-80 mix-blend-screen"
            alt="firework"
          />
          {/* 5. สีม่วง (ซ้ายบนสุด) */}
          <img
            src={openSceneColosseumAssets.firework_purple}
            className="firework absolute left-[15%] top-[20%] w-64 opacity-80 mix-blend-screen"
            alt="firework"
          />
          {/* 6. สีขาว (ขวาบนสุด) */}
          <img
            src={openSceneColosseumAssets.firework_white}
            className="firework absolute right-[25%] top-[25%] w-64 opacity-80 mix-blend-screen"
            alt="firework"
          />
          {/* 7. สีชมพู (กึ่งกลาง ล่าง) */}
          <img
            src={openSceneColosseumAssets.firework_pink}
            className="firework absolute left-[50%] top-[80%] w-64 opacity-80 mix-blend-screen"
            style={{ transform: 'translateX(-50%)' }}
            alt="firework"
          />
        </div>

        {/* Layer 2: Location Title */}
        <div className="location-title pointer-events-none absolute bottom-10 left-10 z-10">
          <h2 className="font-serif text-3xl tracking-wide text-white drop-shadow-xl md:text-5xl">
            ณ วันแข่งขัน
          </h2>
          <div className="mt-2 h-1 w-24 rounded-full bg-yellow-500 opacity-80"></div>
        </div>

        {/* ========================================================= */}
        {/* ✅ Layer 2.5: NARRATION BOXES (เรียงซ้อนกัน 3 กล่อง) */}
        {/* ========================================================= */}
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center p-4">
          {/* กล่องที่ 1: ต้อนรับ */}
          <div className="narration-box narration-1 absolute max-w-2xl rotate-1 rounded-sm border-4 border-black bg-white/95 p-8 text-center shadow-2xl">
            <p className="font-serif text-xl font-bold leading-relaxed text-black md:text-2xl">
              ยินดีต้อนรับเข้าสู่ <br />
              <span className="text-3xl text-red-600">
                {' '}
                "การแข่งขันประจำโรงเรียนครั้งที่ 69"
              </span>
            </p>
            <p className="mt-4 text-lg font-semibold text-gray-700">
              การต่อสู้ที่ทุกคนรอคอย... มาถึงแล้ว!
            </p>
          </div>

          {/* กล่องที่ 2: ตัดบทเข้าสู่การแข่ง */}
          <div className="narration-box narration-2 absolute max-w-xl -rotate-1 rounded-sm border-4 border-black bg-white/95 p-6 text-center shadow-2xl">
            <p className="font-serif text-xl font-bold text-black md:text-2xl">
              "เพื่อไม่ให้เป็นการเสียเวลา..."
            </p>
            <div className="my-2 h-0.5 w-full bg-gray-300"></div>
            <p className="text-2xl font-black tracking-wider text-black">
              เรามาเริ่มที่{' '}
              <span className="bg-yellow-200 px-2 text-blue-600">คู่แรก</span>{' '}
              กันเลยครับ!
            </p>
          </div>

          {/* กล่องที่ 3: แนะนำคู่ต่อสู้ */}
          <div className="narration-box narration-3 absolute max-w-2xl rotate-2 rounded-sm border-4 border-black bg-white/95 p-8 text-center shadow-2xl">
            <p className="mb-2 text-lg font-bold text-gray-600">
              -- OPENING MATCH --
            </p>
            <p className="font-serif text-2xl font-black leading-loose text-black md:text-3xl">
              เป็นการพบกันระหว่าง...
              <br />
            </p>
          </div>
        </div>

        {/* Layer 3: Black Overlay */}
        <div className="black-overlay pointer-events-none absolute inset-0 z-50 bg-black"></div>
      </div>
    </div>
  )
}
