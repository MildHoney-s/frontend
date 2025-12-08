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
  onComplete?: () => void
}

export default function VersusComponent({ playerA, playerB, onComplete }: VersusProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  const fixPath = (path?: string) => {
    if (!path) return ''
    return path.replace('public', '').replace('//', '/')
  }

  useGSAP(() => {
    // ✅ Scope: containerRef จะทำให้การเลือก Class .xxxx มีผลแค่ใน Component นี้เท่านั้น
    // ทำให้ VersusScene01, 02, 03 ไม่ตีกันเอง
    const ctx = gsap.context(() => {
      
      // --- 1. INITIAL SETUP ---
      const elementsToHide = [
        '.character-vs-a', '.character-vs-b',
        '.info-a', '.info-b',
        '.flavor-text-a', '.flavor-text-b',
        '.layer-vs', '.layer-01', '.layer-02'
      ]
      gsap.set(elementsToHide, { autoAlpha: 0 })

      // Position Setup
      gsap.set('.character-vs-a', { x: -200, scale: 0.8 })
      gsap.set('.character-vs-b', { x: 200, scale: 0.8 })
      gsap.set('.info-a', { x: -50 })
      gsap.set('.info-b', { x: 50 })
      gsap.set(['.flavor-text-a', '.flavor-text-b'], { y: 30, autoAlpha: 0 })

      // Center Alignment (GSAP Handle)
      gsap.set(['.layer-01', '.layer-02', '.layer-vs'], {
        xPercent: -50,
        yPercent: -50,
        transformOrigin: 'center center',
        autoAlpha: 1
      })
      gsap.set('.layer-vs', { scale: 0 })

      // --- 2. LOOP ANIMATION (BG Ring) ---
      gsap.to('.layer-02', { rotation: 360, duration: 20, repeat: -1, ease: 'linear' })

      // ============================================================
      // ✅ 3. INDEPENDENT ENTRANCE (แยก Animation ไม่ใช้ Timeline)
      // ============================================================
      
      // กำหนด Config ของ ScrollTrigger ไว้ที่เดียว เพื่อใช้ร่วมกัน
      const triggerConfig = {
        trigger: containerRef.current,
        start: 'top 60%',      // เริ่มเมื่อหัวกล่องเข้าจอมาเกินครึ่ง
        end: 'bottom center',
        toggleActions: 'play none none reverse', // เล่นเมื่อเจอ, ถอยกลับเมื่อเลื่อนหนี
      }

      // 3.1 VS Logo: เด้งมาก่อน (Delay 0)
      gsap.to('.layer-vs', {
        scale: 1,
        autoAlpha: 1,
        duration: 0.6,
        ease: 'back.out(1.7)',
        scrollTrigger: triggerConfig
      })

      // 3.2 Characters: พุ่งสวนกัน (Delay 0.1)
      gsap.to('.character-vs-a', {
        x: 0, autoAlpha: 1, scale: 1, duration: 0.8, ease: 'power2.out', delay: 0.1,
        scrollTrigger: triggerConfig
      })
      gsap.to('.character-vs-b', {
        x: 0, autoAlpha: 1, scale: 1, duration: 0.8, ease: 'power2.out', delay: 0.1,
        scrollTrigger: triggerConfig
      })

      // 3.3 Info (ชื่อ/ฉายา): ตามมาติดๆ (Delay 0.3)
      gsap.to(['.info-a', '.info-b'], {
        x: 0, 
        autoAlpha: 1, 
        duration: 0.6, 
        ease: 'back.out', 
        delay: 0.3,
        scrollTrigger: triggerConfig
      })

      // 3.4 Flavor Text: ลอยขึ้นมาช้าสุด (Delay 0.5)
      gsap.to(['.flavor-text-a', '.flavor-text-b'], {
        y: 0,
        autoAlpha: 1,
        duration: 1.5,
        ease: 'power2.out',
        stagger: 0.2, // ให้ A กับ B เหลื่อมกันนิดนึง
        delay: 0.5,
        scrollTrigger: triggerConfig
      })

      // --- 4. ON COMPLETE TRIGGER ---
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'bottom bottom', // เมื่อเลื่อนจบกล่องนี้
        onEnter: () => {
          if (onComplete) onComplete()
        }
      })

    })
    return () => ctx.revert()
  }, { scope: containerRef })

  return (
    <section className="scene-container relative w-full overflow-hidden bg-black" ref={containerRef}>
      <div className="bg-versus relative h-[100vh] min-h-[800px] w-full"
        style={{ backgroundImage: "url('/assets/part3/BG/versus_bg/bg.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>

        {/* LAYERS GROUP */}
        <div className="layers-container pointer-events-none absolute inset-0 overflow-hidden">
          {/* Layer 01: ลดขนาดเหลือ w-[120vh] */}
          <img className="versus-abs layer-01 absolute left-1/2 top-[40%] h-auto w-[120vh] opacity-80 z-0" src="/assets/part3/BG/versus_bg/01.png" alt="effect 01" />
          
          {/* Layer 02: ลดขนาดเหลือ w-[110%] */}
          <img className="versus-abs layer-02 absolute left-1/2 top-[40%] h-auto w-[110%] opacity-60 mix-blend-screen z-10" src="/assets/part3/BG/versus_bg/02.png" alt="ring" />
          
          {/* VS Logo */}
          <img className="versus-abs layer-vs absolute left-1/2 top-[40%] z-30 w-80 md:w-[800px]" src="/assets/part3/BG/versus_bg/vs.png" alt="VS" />
        </div>

        {/* CONTENT */}
        <div className="content-container relative z-30 h-full w-full">

          {/* === PLAYER A === */}
          <div className="info-a absolute left-[5%] top-[15%] md:top-[20%] z-50 max-w-[40%] text-left">
            <h2 className="text-4xl font-black text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] md:text-6xl font-serif tracking-wider uppercase italic">{playerA.name}</h2>
            {playerA.alias && <p className="mt-2 inline-block bg-pink-600 px-3 py-1 text-sm md:text-lg font-bold text-white shadow-lg skew-x-[-10deg]">{playerA.alias}</p>}
            {playerA.text && (
              <div className="flavor-text-a mt-4 md:mt-8 pointer-events-auto">
                <p className="max-w-[300px] md:max-w-lg text-sm md:text-lg text-white text-left leading-relaxed font-semibold drop-shadow-[0_2px_2px_rgba(0,0,0,1)] tracking-wide">
                  {playerA.text}
                </p>
              </div>
            )}
          </div>
          <img className="character-vs-a absolute bottom-[60px] left-[5%] h-[55vh] max-h-[600px] object-contain md:h-[80vh] z-30" src={fixPath(playerA.src)} alt={playerA.name} />

          {/* === PLAYER B === */}
          <div className="info-b absolute right-[5%] top-[15%] md:top-[20%] z-50 flex max-w-[45%] flex-col items-end text-right">
            <h2 className="text-4xl font-black text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] md:text-6xl font-serif tracking-wider uppercase italic">{playerB.name}</h2>
            {playerB.alias && <p className="mt-2 inline-block bg-blue-700 px-3 py-1 text-sm md:text-lg font-bold text-white shadow-lg skew-x-[-10deg]">{playerB.alias}</p>}
            {playerB.text && (
              <div className="flavor-text-b mt-4 md:mt-8 pointer-events-auto">
                <p className="max-w-[300px] md:max-w-lg text-sm md:text-lg text-white text-right leading-relaxed font-semibold drop-shadow-[0_2px_2px_rgba(0,0,0,1)] tracking-wide">
                  {playerB.text}
                </p>
              </div>
            )}
          </div>
          <img className="character-vs-b absolute bottom-[60px] right-[5%] h-[55vh] max-h-[600px] object-contain md:h-[80vh] z-30" src={fixPath(playerB.src)} alt={playerB.name} />

          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-black/50 to-transparent z-40 pointer-events-none"></div>
        </div>
      </div>
    </section>
  )
}