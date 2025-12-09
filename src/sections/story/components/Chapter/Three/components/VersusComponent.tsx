import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

export interface Player {
  name: string
  alias?: string
  text?: string
  src: string
  file?: string // เพิ่ม file เพื่อรองรับชื่อไฟล์แยก
}

export interface VersusProps {
  playerA: Player
  playerB: Player
  refName: string
  onComplete?: () => void
}

export default function VersusComponent({
  playerA,
  playerB,
  refName,
  onComplete,
}: VersusProps) {
  const colorMap: Record<string, string> = {
    vsOne: 'bg-red-700',
    vsTwo: 'bg-blue-700',
    vsThree: 'bg-yellow-700',
    vsFour: 'bg-green-700',
  }

  const textColor = colorMap[refName] || 'bg-black'
  const containerRef = useRef<HTMLDivElement | null>(null)

  const fixPath = (path?: string) => {
    if (!path) return ''
    return path.replace('public', '').replace('//', '/')
  }

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        // --- 1. INITIAL SETUP ---
        const elementsToHide = [
          '.character-vs-a',
          '.character-vs-b',
          '.card-vs-a',
          '.card-vs-b',
          '.info-a',
          '.info-b',
          '.flavor-text-a',
          '.flavor-text-b',
          '.layer-vs',
          '.layer-01',
          '.layer-02',
        ]
        gsap.set(elementsToHide, { autoAlpha: 0 })

        // Position Setup
        gsap.set('.character-vs-a', { x: -200, scale: 0.8 })
        gsap.set('.character-vs-b', { x: 200, scale: 0.8 })

        // Card Setup
        gsap.set('.card-vs-a', { x: -100, scale: 0.2, rotation: -90, transformOrigin: "center center" })
        gsap.set('.card-vs-b', { x: 100, scale: 0.2, rotation: 90, transformOrigin: "center center" })

        gsap.set('.info-a', { x: -50 })
        gsap.set('.info-b', { x: 50 })
        gsap.set(['.flavor-text-a', '.flavor-text-b'], { y: 30, autoAlpha: 0 })

        // Center Alignment
        gsap.set(['.layer-01', '.layer-02', '.layer-vs'], {
          xPercent: -50,
          yPercent: -50,
          transformOrigin: 'center center',
          autoAlpha: 1,
        })
        gsap.set('.layer-vs', { scale: 0 })

        // ============================================================
        // ✅ 2. MOUTH ANIMATION LOOP (สลับภาพ Open/Close)
        // ============================================================

        // 2.1 Set Initial State: ซ่อนรูป Close ไว้ก่อน
        gsap.set(['.char-a-close', '.char-b-close'], { autoAlpha: 0 })
        gsap.set(['.char-a-open', '.char-b-open'], { autoAlpha: 1 })

        // 2.2 Create Loop Timeline
        // duration: 0.3 คือความเร็วในการขยับปาก (ยิ่งน้อยยิ่งเร็ว)
        const mouthSpeed = 0.9;
        const mouthTl = gsap.timeline({ repeat: -1, repeatDelay: mouthSpeed });

        mouthTl
          // จังหวะที่ 1: สลับเป็น Close
          .set(['.char-a-open', '.char-b-open'], { autoAlpha: 0 })
          .set(['.char-a-close', '.char-b-close'], { autoAlpha: 1 })

          // รอแป๊บนึง
          .to({}, { duration: mouthSpeed })

          // จังหวะที่ 2: สลับกลับเป็น Open
          .set(['.char-a-close', '.char-b-close'], { autoAlpha: 0 })
          .set(['.char-a-open', '.char-b-open'], { autoAlpha: 1 });


        // --- 3. BACKGROUND LOOP ---
        gsap.to('.layer-02', {
          rotation: 360,
          duration: 20,
          repeat: -1,
          ease: 'linear',
        })

        // ============================================================
        // ✅ 4. SCROLL TRIGGER ANIMATIONS
        // ============================================================

        const triggerConfig = {
          id: refName,
          trigger: containerRef.current,
          start: 'top 30%',
          end: 'bottom center',
          toggleActions: 'play none none reverse',
        }

        const startDelay = 0.5

        // 4.1 VS Logo
        gsap.to('.layer-vs', {
          scale: 1,
          autoAlpha: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          delay: startDelay,
          scrollTrigger: triggerConfig,
        })

        // 4.2 Cards
        gsap.to('.card-vs-a', {
          x: 0,
          autoAlpha: 1,
          scale: 1,
          rotation: -15,
          duration: 0.8,
          ease: 'back.out(1.2)',
          delay: startDelay,
          scrollTrigger: triggerConfig,
        })
        gsap.to('.card-vs-b', {
          x: 0,
          autoAlpha: 1,
          scale: 1,
          rotation: 20,
          duration: 0.8,
          ease: 'back.out(1.2)',
          delay: startDelay,
          scrollTrigger: triggerConfig,
        })

        // 4.3 Characters
        // หมายเหตุ: เรา Animate class หลัก (.character-vs-a) มันจะขยับทั้งรูป Open และ Close ไปพร้อมกัน
        gsap.to('.character-vs-a', {
          x: 0,
          autoAlpha: 1, // ทำให้ Container หลักแสดงผล
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          delay: startDelay + 0.1,
          scrollTrigger: triggerConfig,
        })
        gsap.to('.character-vs-b', {
          x: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          delay: startDelay + 0.1,
          scrollTrigger: triggerConfig,
        })

        // 4.4 Info
        gsap.to(['.info-a', '.info-b'], {
          x: 0,
          autoAlpha: 1,
          duration: 0.6,
          ease: 'back.out',
          delay: startDelay + 0.3,
          scrollTrigger: triggerConfig,
        })

        // 4.5 Flavor Text
        gsap.to(['.flavor-text-a', '.flavor-text-b'], {
          y: 0,
          autoAlpha: 1,
          duration: 1.5,
          ease: 'power2.out',
          stagger: 0.2,
          delay: startDelay + 0.5,
          scrollTrigger: triggerConfig,
        })

        // --- 5. ON COMPLETE ---
        ScrollTrigger.create({
          id: `${refName}-complete`,
          trigger: containerRef.current,
          start: 'bottom bottom',
          onEnter: () => {
            if (onComplete) onComplete()
          },
        })
      })
      return () => ctx.revert()
    },
    { scope: containerRef },
  )

  return (
    <section
      id={refName}
      ref={containerRef}
      className="scene-container relative w-full overflow-hidden bg-black"
    >
      <div
        className="bg-versus relative h-[100vh] min-h-[800px] w-full"
        style={{
          backgroundImage: "url('/assets/part3/BG/versus_bg/bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="layers-container pointer-events-none absolute inset-0 overflow-hidden">
          <img className="versus-abs layer-01 absolute left-1/2 top-[40%] z-0 h-auto w-[120vh] opacity-80" src="/assets/part3/BG/versus_bg/01.png" alt="effect 01" />
          <img className="versus-abs layer-02 absolute left-1/2 top-[40%] z-10 h-auto w-[110%] opacity-60 mix-blend-screen" src="/assets/part3/BG/versus_bg/02.png" alt="ring" />
          <img className="versus-abs layer-vs absolute left-1/2 top-[40%] z-30 w-80 md:w-[800px]" src="/assets/part3/BG/versus_bg/vs.png" alt="VS" />
        </div>

        <div className="content-container relative z-30 h-full w-full">
          {/* PLAYER A INFO */}
          <div className="info-a absolute left-[5%] top-[15%] z-50 max-w-[40%] text-left md:top-[20%]">
            <h2 className="font-serif text-4xl font-black uppercase italic tracking-wider text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] md:text-6xl">
              {playerA.name}
            </h2>
            {playerA.alias && (
              <p className="mt-2 inline-block skew-x-[-10deg] bg-pink-600 px-3 py-1 text-sm font-bold text-white shadow-lg md:text-lg">
                {playerA.alias}
              </p>
            )}
            {playerA.text && (
              <div className="flavor-text-a pointer-events-auto mt-4 md:mt-8">
                <p className="max-w-[300px] text-left text-sm font-semibold leading-relaxed tracking-wide text-white drop-shadow-[0_2px_2px_rgba(0,0,0,1)] md:max-w-lg md:text-lg">
                  {playerA.text}
                </p>
              </div>
            )}
          </div>

          {/* PLAYER A IMAGES */}
          <img className="card-vs-a absolute bottom-[60px] left-[0%] z-20 h-[55vh] max-h-[600px] object-contain md:h-[80vh]" src="/assets/part3/BG/versus_bg/card.png" alt="card" />

          {/* ✅ เพิ่ม class char-a-open และ char-a-close เพื่อใช้ใน Loop Animation */}
          <img
            className="character-vs-a char-a-open absolute bottom-[60px] left-[5%] z-30 h-[55vh] max-h-[550px] object-contain md:h-[80vh]"
            src={fixPath(`${playerA.src}${playerA.file}_open.png`)}
            alt={`${playerA.name} open`}
          />
          <img
            className="character-vs-a char-a-close absolute bottom-[60px] left-[5%] z-30 h-[55vh] max-h-[550px] object-contain md:h-[80vh]"
            src={fixPath(`${playerA.src}${playerA.file}_close.png`)}
            alt={`${playerA.name} close`}
          />

          {/* PLAYER B INFO */}
          <div className="info-b absolute right-[5%] top-[15%] z-50 flex max-w-[45%] flex-col items-end text-right md:top-[20%]">
            <h2 className="font-serif text-4xl font-black uppercase italic tracking-wider text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] md:text-6xl">
              {playerB.name}
            </h2>
            {playerB.alias && (
              <p className={`mt-2 inline-block skew-x-[-10deg] ${textColor} px-3 py-1 text-sm font-bold text-white shadow-lg md:text-lg`}>
                {playerB.alias}
              </p>
            )}
            {playerB.text && (
              <div className="flavor-text-b pointer-events-auto mt-4 md:mt-8">
                <p className="max-w-[300px] text-right text-sm font-semibold leading-relaxed tracking-wide text-white drop-shadow-[0_2px_2px_rgba(0,0,0,1)] md:max-w-lg md:text-lg">
                  {playerB.text}
                </p>
              </div>
            )}
          </div>

          {/* PLAYER B IMAGES */}
          <img className="card-vs-b absolute bottom-[60px] right-[1%] z-20 h-[55vh] max-h-[600px] object-contain md:h-[80vh]" src="/assets/part3/BG/versus_bg/card.png" alt="card2" />

          {/* ✅ เพิ่ม class char-b-open และ char-b-close */}
          <img
            className="character-vs-b char-b-open absolute bottom-[60px] right-[5%] z-30 h-[55vh] max-h-[600px] object-contain md:h-[80vh]"
            src={fixPath(`${playerB.src}${playerB.file}_open.png`)}
            alt={`${playerB.name} open`}
          />
          <img
            className="character-vs-b char-b-close absolute bottom-[60px] right-[5%] z-30 h-[55vh] max-h-[600px] object-contain md:h-[80vh]"
            src={fixPath(`${playerB.src}${playerB.file}_close.png`)}
            alt={`${playerB.name} close`}
          />

          <div className="pointer-events-none absolute bottom-0 left-0 z-40 h-32 w-full bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>
      </div>
    </section>
  )
}