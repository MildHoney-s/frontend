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
  file?: string
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
        // ============================================================
        // 1. INITIAL SETUP
        // ============================================================
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

        gsap.set('.character-vs-a', { x: -200, scale: 0.8 })
        gsap.set('.character-vs-b', { x: 200, scale: 0.8 })

        gsap.set('.card-vs-a', {
          x: -100,
          scale: 0.2,
          rotation: -90,
          transformOrigin: 'center center',
        })
        gsap.set('.card-vs-b', {
          x: 100,
          scale: 0.2,
          rotation: 90,
          transformOrigin: 'center center',
        })

        gsap.set('.info-a', { x: -50 })
        gsap.set('.info-b', { x: 50 })
        gsap.set(['.flavor-text-a', '.flavor-text-b'], {
          y: 30,
          autoAlpha: 0,
        })

        gsap.set(['.layer-01', '.layer-02', '.layer-vs'], {
          xPercent: -50,
          yPercent: -50,
          transformOrigin: 'center center',
          autoAlpha: 1,
        })
        gsap.set('.layer-vs', { scale: 0 })

        // ✅ ปิดตา/ปากไว้ก่อน (ไม่ forced show ตั้งแต่ต้น)
        gsap.set(['.char-a-open', '.char-b-open'], { autoAlpha: 0 })
        gsap.set(['.char-a-close', '.char-b-close'], { autoAlpha: 0 })

        // ============================================================
        // 2. BLINK SYSTEM (CONTROLLED START)
        // ============================================================
        const blinkSpeed = 0.15
        const blinkGap = 0.15
        const longPause = 3
        let mouthTl: gsap.core.Timeline | null = null

        const startBlink = () => {
          if (mouthTl) return

          gsap.set(['.char-a-open', '.char-b-open'], { autoAlpha: 1 })
          gsap.set(['.char-a-close', '.char-b-close'], { autoAlpha: 0 })

          mouthTl = gsap.timeline({ repeat: -1, repeatDelay: longPause })

          mouthTl
            .set(['.char-a-open', '.char-b-open'], { autoAlpha: 0 })
            .set(['.char-a-close', '.char-b-close'], { autoAlpha: 1 })
            .to({}, { duration: blinkSpeed })
            .set(['.char-a-close', '.char-b-close'], { autoAlpha: 0 })
            .set(['.char-a-open', '.char-b-open'], { autoAlpha: 1 })
            .to({}, { duration: blinkGap })
        }

        // ============================================================
        // 3. BACKGROUND LOOP
        // ============================================================
        gsap.to('.layer-02', {
          rotation: 360,
          duration: 20,
          repeat: -1,
          ease: 'linear',
        })

        // ============================================================
        // 4. SCROLL TRIGGER TIMELINE
        // ============================================================
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=400%',
            scrub: 1,
            pin: true,
            onLeave: () => {
              if (onComplete) onComplete()
            },
          },
        })

        // Step 1: VS Logo & Background
        tl.to('.layer-vs', {
          scale: 1,
          autoAlpha: 1,
          duration: 1,
          ease: 'back.out(1.7)',
        }).to(['.layer-01', '.layer-02'], { autoAlpha: 1, duration: 0.5 }, '<')

        // Step 2: Cards
        tl.to(
          '.card-vs-a',
          {
            x: 0,
            autoAlpha: 1,
            scale: 1,
            rotation: -15,
            duration: 2,
            ease: 'power2.out',
          },
          '+=0.2',
        ).to(
          '.card-vs-b',
          {
            x: 0,
            autoAlpha: 1,
            scale: 1,
            rotation: 20,
            duration: 2,
            ease: 'power2.out',
          },
          '<',
        )

        // Step 3: Characters Slide in
        tl.to(
          '.character-vs-a',
          {
            x: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 2,
            ease: 'power2.out',
          },
          '-=1.5',
        ).to(
          '.character-vs-b',
          {
            x: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 2,
            ease: 'power2.out',
            onComplete: () => {
              // ✅ เริ่ม blink หลัง step 3
              startBlink()
            },
          },
          '<',
        )

        // Step 4: Info
        tl.to(
          ['.info-a', '.info-b'],
          {
            x: 0,
            autoAlpha: 1,
            duration: 1.5,
            ease: 'back.out(1.2)',
          },
          '-=1',
        )

        // Step 5: Text
        tl.to(['.flavor-text-a', '.flavor-text-b'], {
          y: 0,
          autoAlpha: 1,
          duration: 2,
          ease: 'power2.out',
          stagger: 0.3,
        })

        // Step 6: Hold
        tl.to({}, { duration: 2 })

        // ============================================================
        // CLEANUP
        // ============================================================
        return () => {
          mouthTl?.kill()
        }
      })

      return () => ctx.revert()
    },
    { scope: containerRef },
  )

  return (
    <section
      id={refName}
      ref={containerRef}
      className="scene-container relative w-full h-screen overflow-hidden bg-black"
    >
      <div
        className="bg-versus relative h-full w-full"
        style={{
          backgroundImage: "url('/assets/part3/BG/versus_bg/bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="layers-container pointer-events-none absolute inset-0 overflow-hidden">
          <img
            className="versus-abs layer-01 absolute left-1/2 top-[40%] z-0 h-auto w-[120vh] opacity-80"
            src="/assets/part3/BG/versus_bg/01.png"
            alt="effect 01"
          />
          <img
            className="versus-abs layer-02 absolute left-1/2 top-[40%] z-10 h-auto w-[110%] opacity-60 mix-blend-screen"
            src="/assets/part3/BG/versus_bg/02.png"
            alt="ring"
          />
          <img
            className="versus-abs layer-vs absolute left-1/2 top-[40%] z-30 w-80 md:w-[800px]"
            src="/assets/part3/BG/versus_bg/vs.png"
            alt="VS"
          />
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
          <img
            className="card-vs-a absolute bottom-[60px] left-[0%] z-20 h-[55vh] max-h-[600px] object-contain md:h-[80vh]"
            src="/assets/part3/BG/versus_bg/card.png"
            alt="card"
          />

          <img
            className="character-vs-a char-a-close absolute bottom-[60px] left-[5%] z-30 h-[55vh] max-h-[550px] object-contain md:h-[80vh] opacity-0"
            src={fixPath(`${playerA.src}${playerA.file}_close.png`)}
            alt={`${playerA.name} close`}
          />
          <img
            className="character-vs-a char-a-open absolute bottom-[60px] left-[5%] z-30 h-[55vh] max-h-[550px] object-contain md:h-[80vh] opacity-0"
            src={fixPath(`${playerA.src}${playerA.file}_open.png`)}
            alt={`${playerA.name} open`}
          />

          {/* PLAYER B INFO */}
          <div className="info-b absolute right-[5%] top-[15%] z-50 flex max-w-[45%] flex-col items-end text-right md:top-[20%]">
            <h2 className="font-serif text-4xl font-black uppercase italic tracking-wider text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] md:text-6xl">
              {playerB.name}
            </h2>
            {playerB.alias && (
              <p
                className={`mt-2 inline-block skew-x-[-10deg] ${textColor} px-3 py-1 text-sm font-bold text-white shadow-lg md:text-lg`}
              >
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
          <img
            className="card-vs-b absolute bottom-[60px] right-[1%] z-20 h-[55vh] max-h-[600px] object-contain md:h-[80vh]"
            src="/assets/part3/BG/versus_bg/card.png"
            alt="card2"
          />
          <img
            className="character-vs-b char-b-close absolute bottom-[60px] right-[5%] z-30 h-[55vh] max-h-[600px] object-contain md:h-[80vh] opacity-0"
            src={fixPath(`${playerB.src}${playerB.file}_close.png`)}
            alt={`${playerB.name} close`}
          />
          <img
            className="character-vs-b char-b-open absolute bottom-[60px] right-[5%] z-30 h-[55vh] max-h-[600px] object-contain md:h-[80vh] opacity-0"
            src={fixPath(`${playerB.src}${playerB.file}_open.png`)}
            alt={`${playerB.name} open`}
          />

          {/* Gradients */}
          <div className="pointer-events-none absolute top-0 left-0 z-40 h-32 w-full bg-gradient-to-b from-black via-black/50 to-transparent"></div>
          <div className="pointer-events-none absolute bottom-0 left-0 z-40 h-32 w-full bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>
      </div>
    </section>
  )
}
