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
}

export interface VersusProps {
  playerA: Player
  playerB: Player
  refName: string // ใช้เป็น Unique ID สำหรับ Component นี้
  onComplete?: () => void
}

export default function VersusComponent({
  playerA,
  playerB,
  refName,
  onComplete,
}: VersusProps) {
  // สร้าง Map ไว้จับคู่ refName กับสี
  const colorMap: Record<string, string> = {
    vsOne: 'bg-red-700',
    vsTwo: 'bg-blue-700',
    vsThree: 'bg-yellow-700',
    vsFour: 'bg-green-700',
  }

  // ดึงค่าออกมา ถ้าไม่เจอ key ให้ใช้ 'bg-black' เป็นค่า Default
  const textColor = colorMap[refName] || 'bg-black'

  // containerRef นี้จะถูกสร้างใหม่ทุกครั้งที่มีการเรียกใช้ Component
  // ดังนั้นมันจะแยกกันโดยอัตโนมัติ ไม่ชนกันแน่นอนครับ
  const containerRef = useRef<HTMLDivElement | null>(null)

  const fixPath = (path?: string) => {
    if (!path) return ''
    return path.replace('public', '').replace('//', '/')
  }

  useGSAP(
    () => {
      // ✅ Scope: containerRef
      // การระบุ scope ตรงนี้คือหัวใจสำคัญที่ทำให้ Class .character-vs-a ของ Component นี้
      // ไม่ไปตีกับ .character-vs-a ของ Component อื่น
      const ctx = gsap.context(() => {
        // --- 1. INITIAL SETUP ---
        const elementsToHide = [
          '.character-vs-a',
          '.character-vs-b',
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

        // --- 2. LOOP ANIMATION ---
        gsap.to('.layer-02', {
          rotation: 360,
          duration: 20,
          repeat: -1,
          ease: 'linear',
        })

        // ============================================================
        // ✅ 3. SCROLL TRIGGER CONFIG (ผูกกับ refName)
        // ============================================================

        const triggerConfig = {
          id: refName, // ✅ ระบุ ID ให้ ScrollTrigger เพื่อให้ Debug ง่ายและแยก instance ชัดเจน
          trigger: containerRef.current, // ✅ ใช้ Ref ตัวใครตัวมัน
          start: 'top 60%',
          end: 'bottom center',
          toggleActions: 'play none none reverse',
        }

        // 3.1 VS Logo
        gsap.to('.layer-vs', {
          scale: 1,
          autoAlpha: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          scrollTrigger: triggerConfig,
        })

        // 3.2 Characters
        gsap.to('.character-vs-a', {
          x: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.1,
          scrollTrigger: triggerConfig,
        })
        gsap.to('.character-vs-b', {
          x: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.1,
          scrollTrigger: triggerConfig,
        })

        // 3.3 Info
        gsap.to(['.info-a', '.info-b'], {
          x: 0,
          autoAlpha: 1,
          duration: 0.6,
          ease: 'back.out',
          delay: 0.3,
          scrollTrigger: triggerConfig,
        })

        // 3.4 Flavor Text
        gsap.to(['.flavor-text-a', '.flavor-text-b'], {
          y: 0,
          autoAlpha: 1,
          duration: 1.5,
          ease: 'power2.out',
          stagger: 0.2,
          delay: 0.5,
          scrollTrigger: triggerConfig,
        })

        // --- 4. ON COMPLETE ---
        ScrollTrigger.create({
          id: `${refName}-complete`, // ✅ แยก ID ของ Trigger ตัวจบด้วย
          trigger: containerRef.current,
          start: 'bottom bottom',
          onEnter: () => {
            if (onComplete) onComplete()
          },
        })
      })
      return () => ctx.revert()
    },
    { scope: containerRef }, // Scope นี้สำคัญที่สุดในการป้องกัน Class ตีกัน
  )

  return (
    <section
      id={refName} // ✅ ใช้ refName เป็น HTML ID เพื่อแยก DOM Element ให้ชัดเจน
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
        {/* LAYERS GROUP */}
        <div className="layers-container pointer-events-none absolute inset-0 overflow-hidden">
          {/* Layer 01 */}
          <img
            className="versus-abs layer-01 absolute left-1/2 top-[40%] z-0 h-auto w-[120vh] opacity-80"
            src="/assets/part3/BG/versus_bg/01.png"
            alt="effect 01"
          />

          {/* Layer 02 */}
          <img
            className="versus-abs layer-02 absolute left-1/2 top-[40%] z-10 h-auto w-[110%] opacity-60 mix-blend-screen"
            src="/assets/part3/BG/versus_bg/02.png"
            alt="ring"
          />

          {/* VS Logo */}
          <img
            className="versus-abs layer-vs absolute left-1/2 top-[40%] z-30 w-80 md:w-[800px]"
            src="/assets/part3/BG/versus_bg/vs.png"
            alt="VS"
          />
        </div>

        {/* CONTENT */}
        <div className="content-container relative z-30 h-full w-full">
          {/* === PLAYER A === */}
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
          <img
            className="character-vs-a absolute bottom-[60px] left-[5%] z-30 h-[55vh] max-h-[550px] object-contain md:h-[80vh]"
            src={fixPath(playerA.src)}
            alt={playerA.name}
          />

          {/* === PLAYER B === */}
          <div className="info-b absolute right-[5%] top-[15%] z-50 flex max-w-[45%] flex-col items-end text-right md:top-[20%]">
            <h2 className="font-serif text-4xl font-black uppercase italic tracking-wider text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] md:text-6xl">
              {playerB.name}
            </h2>
            {playerB.alias && (
              <p
                className={`mt-2 inline-block skew-x-[-10deg] ${textColor} px-3 py-1 text-sm font-bold text-white shadow-lg md:text-lg`}
              >
                {' '}
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
          <img
            className="character-vs-b absolute bottom-[60px] right-[5%] z-30 h-[55vh] max-h-[600px] object-contain md:h-[80vh]"
            src={fixPath(playerB.src)}
            alt={playerB.name}
          />

          <div className="pointer-events-none absolute bottom-0 left-0 z-40 h-32 w-full bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>
      </div>
    </section>
  )
}
