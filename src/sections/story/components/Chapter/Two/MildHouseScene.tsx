import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  onComplete: () => void
}

// ✅ Helper Component: ช่วยแตกตัวอักษร
const SplitText = ({ children, className }: { children: string, className?: string }) => {
  return (
    <span className={className} aria-label={children}>
      {children.split('').map((char, index) => (
        <span 
            key={index} 
            className="magic-char inline-block opacity-0 translate-y-4" // เริ่มต้น: จางและอยู่ต่ำลงมา
            style={{ minWidth: char === ' ' ? '0.3em' : 'auto' }} 
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}

export default function HouseScene({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const doorPanelRef = useRef<HTMLDivElement>(null)

  // Asset Paths
  const openDoorImg = "/assets/Part2/House_1.png";   
  const closedDoorImg = "/assets/Part2/House_0.png"; 

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // --- INITIAL SETUP ---
      gsap.set('.black-overlay', { autoAlpha: 1 })
      
      gsap.set('.honey-group', { x: 0, autoAlpha: 1 })
      gsap.set('.honey-bubble-think', { scale: 0, autoAlpha: 0, transformOrigin: 'bottom left' })
      gsap.set('.knock-text', { scale: 0, autoAlpha: 0 })
      
      gsap.set(doorPanelRef.current, { rotationY: 0 }) 

      gsap.set('.mild-group', { autoAlpha: 1 }) 
      
      gsap.set('.mild-face-normal', { autoAlpha: 1 })
      gsap.set(['.mild-face-surprise', '.mild-face-happy'], { autoAlpha: 0 })
      
      gsap.set(['.mild-bubble-think', '.mild-bubble-speak'], { scale: 0, autoAlpha: 0, transformOrigin: 'bottom right' })
      
      // ✅ ตั้งค่าเริ่มต้น Magic Text Group
      gsap.set('.magic-text-group', { autoAlpha: 0 })
      
      // หมายเหตุ: ไม่ต้อง set .magic-line-x แล้ว เพราะเรา set ค่าเริ่มต้น opacity-0 ไว้ใน className ของ SplitText แล้ว

      gsap.set(['.text-mild-speak-1', '.text-mild-speak-2', '.text-mild-speak-3'], { autoAlpha: 0 })

      // =========================================================
      // TIMELINE
      // =========================================================
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=5000', 
          scrub: 1,
          pin: true,
          fastScrollEnd: true,
          onLeave: () => onComplete && onComplete(),
        },
      })

      // --- STEP 1: ARRIVAL ---
      tl.to('.black-overlay', { autoAlpha: 0, duration: 2 })
      tl.to('.honey-bubble-think', { scale: 1, autoAlpha: 1, duration: 0.5, ease: 'back.out' })
        .to('.honey-bubble-think', { scale: 0, autoAlpha: 0, duration: 0.3, delay: 0.5 })

      // --- STEP 2: KNOCK KNOCK ---
      tl.to('.honey-group', { x: 5, duration: 0.1, yoyo: true, repeat: 3 }) 
        .to('.knock-text', { scale: 1.2, autoAlpha: 1, duration: 0.1 }, '<')
        .to('.knock-text', { scale: 1, duration: 0.1, yoyo: true, repeat: 3 }, '<')
        .to('.knock-text', { autoAlpha: 0, duration: 0.2 }, '>0.2')

      tl.to('.mild-bubble-think', { scale: 1, autoAlpha: 1, duration: 0.5, ease: 'back.out' })
        .to('.mild-bubble-think', { scale: 0, autoAlpha: 0, duration: 0.3, delay: 0.5 })

      // --- STEP 3: BLINK TO OPEN ---
      tl.to('.black-overlay', { autoAlpha: 1, duration: 0.15, ease: 'power2.in' })
        .set(doorPanelRef.current, { autoAlpha: 0 }) 
        .to('.black-overlay', { autoAlpha: 0, duration: 0.3, ease: 'power2.out' })
      
      // --- STEP 3.5: DIALOGUE ---
      // 1. Bubble มา + Text 1 มา
      tl.to('.mild-bubble-speak', { scale: 1, autoAlpha: 1, duration: 0.5, ease: 'back.out' })
        .to('.text-mild-speak-1', { autoAlpha: 1, duration: 0.5 }, '<')
      
      // 2. Text 1 หาย
      tl.to('.text-mild-speak-1', { autoAlpha: 0, duration: 0.2, delay: 1.5 }) 
      
      // 3. เปลี่ยนหน้า + Text 2 มา
        .to('.mild-face-normal', { autoAlpha: 0, duration: 0.1 })
        .to('.mild-face-surprise', { autoAlpha: 1, duration: 0.1 }, '<')
        .to('.text-mild-speak-2', { autoAlpha: 1, duration: 0.5 }, '>0.1')

      // 4. Text 2 หาย
      tl.to('.text-mild-speak-2', { autoAlpha: 0, duration: 0.2, delay: 1.5 })

      // =======================================================
      // ✅ --- STEP 4: MAGIC PROPOSAL (TYPEWRITER STYLE) ---
      // =======================================================
      
      // ซ่อน Bubble พูด
      tl.to('.mild-bubble-speak', { autoAlpha: 0, scale: 0, duration: 0.3 })

      // Magic Text Group มา
      tl.to('.magic-text-group', { autoAlpha: 1, duration: 0.1 })
      
      // Typewriter Effect บรรทัดที่ 1
      tl.to('.line-1 .magic-char', {
        y: 0,
        autoAlpha: 1,
        duration: 0.05,
        stagger: 0.05, // พิมพ์ทีละตัว
        ease: 'power2.out'
      })

      // Typewriter Effect บรรทัดที่ 2
      tl.to('.line-2 .magic-char', {
        y: 0,
        autoAlpha: 1,
        duration: 0.05,
        stagger: 0.05,
        ease: 'power2.out'
      }, '>0.2') // เว้นนิดนึง

      // Typewriter Effect บรรทัดที่ 3
      tl.to('.line-3 .magic-char', {
        y: 0,
        autoAlpha: 1,
        scale: 1.1,
        duration: 0.3,
        stagger: 0.08, // ช้าลงนิดนึงเพื่อเน้น
        ease: 'back.out(2)'
      }, '>0.2')

      // --- STEP 5: HAPPY ENDING ---
      // ซ่อน Magic Text
      tl.to(['.magic-text-group', '.bg-dim-overlay'], { autoAlpha: 0, duration: 0.5, delay: 1.5 })

      // เปลี่ยนหน้ายิ้ม + Text 3 มา
      tl.to('.mild-face-surprise', { autoAlpha: 0, duration: 0.2 })
        .to('.mild-face-happy', { autoAlpha: 1, duration: 0.2 }, '<')
        .to('.mild-bubble-speak', { scale: 1, autoAlpha: 1, duration: 0.3 }, '<')
        .to('.text-mild-speak-3', { autoAlpha: 1, duration: 0.3 }, '>0.1')

      // จบ
      tl.to('.black-overlay', { autoAlpha: 1, duration: 1.5 }, '>1.5')
    }, containerRef)
    return () => ctx.revert()
  }, [onComplete])

  return (
    <div ref={containerRef} className="relative h-screen w-full bg-black overflow-hidden font-sans">
      <div className="absolute inset-0 w-full h-full perspective-[1500px]">
        {/* BACKGROUND */}
        <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{ backgroundImage: `url('${openDoorImg}')` }}
        ></div>

        <div className="bg-dim-overlay absolute inset-0 bg-black/60 opacity-0 z-[5] pointer-events-none transition-opacity"></div>

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
            <div className="mild-group relative w-[90%] h-full bottom-0">
                <div className="mild-body-img relative w-full h-full">
                    <img src="/assets/Part2/Mild/Body/Hair.PNG" className="absolute top-0 left-0 w-full h-full object-contain z-0" alt="Back Hair" />
                    <img src="/assets/Part2/Mild/Body/Body_1.PNG" className="absolute top-0 left-0 w-full h-full object-contain z-10" alt="Body" />
                    <img src="/assets/Part2/Mild/Arms/Arm_1_L.PNG" className="absolute top-0 left-0 w-full h-full object-contain z-20" alt="Left Arm" />
                    <img src="/assets/Part2/Mild/Arms/Arm_1_R.PNG" className="absolute top-0 left-0 w-full h-full object-contain z-20" alt="Right Arm" />
                    <div className="absolute z-30" style={{ top: '15%', left: '0%', width: '100%', height: 'auto' }}>
                        <img src="/assets/Part2/Mild/Face/Face_01_หน้าปกติ.PNG" className="mild-face-normal w-full object-contain" alt="Normal" />
                        <img src="/assets/Part2/Mild/Face/Face_03_หน้าตกใจ.PNG" className="mild-face-surprise absolute top-0 left-0 w-full object-contain" alt="Shock" />
                        <img src="/assets/Part2/Mild/Face/Face_02_หน้ายิ้ม.PNG" className="mild-face-happy absolute top-0 left-0 w-full object-contain" alt="Happy" />
                    </div>
                </div>
            </div>
        </div>
        <div
            className="absolute inset-0 bg-cover bg-center z-20 pointer-events-none"
            style={{
                backgroundImage: `url('${openDoorImg}')`,
                clipPath: 'polygon(0% 0%, 42% 0%, 42% 100%, 0% 100%)'
            }}
        >
        </div>

        {/* LAYER 3: DOOR PANEL */}
        <div 
            ref={doorPanelRef}
            className="absolute inset-0 bg-cover bg-center z-30"
            style={{
                backgroundImage: `url('${closedDoorImg}')`,
            }}
        >
            <div className="knock-text absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-white font-black text-2xl md:text-4xl drop-shadow-md whitespace-nowrap bg-black/30 px-2 rounded-lg backdrop-blur-sm border border-white/50">
                ก๊อก! ก๊อก!
            </div>
        </div>

        {/* LAYER 4: HONEY */}
        <div className="honey-group absolute bottom-[0%] left-[45%] z-40 w-[200px] md:w-[280px]">
             <img src="/assets/Part2/Honey/Body.PNG" className="relative w-full drop-shadow-2xl" alt="Honey Body" />
             <img src="/assets/Part2/Honey/Normal_Face.PNG" className="absolute top-[1%] left-0 w-full" alt="Honey Face" />
             
             <div className="honey-bubble-think absolute -right-[140px] -top-[100px] w-[200px] bg-white rounded-[30px] p-4 shadow-xl border-2 border-gray-200 z-50">
                <p className="text-gray-700 text-sm md:text-base font-bold text-center leading-snug">
                    " ใช่หลังนี้มั้ยนะ?<br/>
                    <span className="text-blue-500">ลองเคาะดูละกัน...</span> "
                </p>
                <div className="absolute -bottom-3 left-6 w-4 h-4 bg-white rounded-full border-b border-gray-200"></div>
                <div className="absolute -bottom-6 left-4 w-2 h-2 bg-white rounded-full"></div>
             </div>
        </div>

          {/* LAYER 5: TEXT UI */}
        <div className="absolute inset-0 z-50 pointer-events-none">
             
             {/* Mild Bubbles */}
             <div className="mild-bubble-think absolute top-[30%] right-[35%] w-[180px] bg-white rounded-full p-4 shadow-xl border-2 border-gray-300 origin-bottom-left z-50">
                <p className="text-gray-500 text-sm text-center italic">" เอ๊ะ...<br/>ใครมาซะเย็นป่านนี้ "</p>
                <div className="absolute -bottom-2 left-4 w-3 h-3 bg-white rounded-full"></div>
                <div className="absolute -bottom-5 left-2 w-2 h-2 bg-white rounded-full"></div>
             </div>

             <div className="mild-bubble-speak absolute top-[25%] right-[28%] w-[260px] md:w-[300px] min-h-[120px] bg-white rounded-[20px] shadow-2xl border-4 border-pink-200 origin-bottom-left z-50 grid place-items-center p-4">
                <div className="text-mild-speak-1 absolute inset-0 flex items-center justify-center px-4 opacity-0">
                    <p className="text-gray-600 text-sm md:text-base font-bold leading-snug text-center">
                        <span className="text-xs text-gray-400 font-normal block mb-1">(เสียงเบา)</span>
                        " คะ... ใครหรอคะ... "
                    </p>
                </div>
                <div className="text-mild-speak-2 absolute inset-0 flex items-center justify-center px-4 opacity-0">
                    <p className="text-black font-bold text-base md:text-lg leading-snug text-center">
                        " เอ๊ะ!? คุณฮันนี่เองหรอ...<br/>
                        <span className="text-pink-500 text-sm md:text-base block mt-1">มีธุระอะไรรึป่าวคะ? "</span>
                    </p>
                </div>
                <div className="text-mild-speak-3 absolute inset-0 flex items-center justify-center px-4 opacity-0">
                    <p className="text-pink-600 font-black text-xl md:text-3xl text-center">
                        " จะ... จริงหรอคะ!? "
                    </p>
                </div>
                <div className="absolute -bottom-3 -left-2 h-6 w-6 bg-white transform rotate-12 rounded-bl-lg border-l-4 border-b-4 border-pink-200"></div>
             </div>

            {/* --- MAGIC TEXT (TYPEWRITER STYLE) --- */}
             <div className="magic-text-group absolute inset-0 flex flex-col items-end justify-center z-[60] pr-[5%] md:pr-[10%]">
                <div className="relative p-4 flex flex-col items-end space-y-6">
                    
                    {/* ✅ บรรทัด 1: ใช้ SplitText + Class line-1 */}
                    <div className="magic-line-wrapper-1 overflow-hidden whitespace-nowrap">
                        <p className="font-serif text-xl md:text-3xl text-blue-200 font-bold leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
                            <SplitText className="line-1">ขอโทษนะที่มารบกวน</SplitText>
                        </p>
                    </div>
                    
                    {/* ✅ บรรทัด 2: ใช้ SplitText + Class line-2 */}
                    <div className="magic-line-wrapper-2 overflow-hidden whitespace-nowrap">
                        <p className="font-serif text-xl md:text-3xl text-blue-200 font-bold leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
                            <SplitText className="line-2">พอดีฉันตัดสินใจได้แล้วว่า</SplitText>
                        </p>
                    </div>

                    {/* ✅ บรรทัด 3: ใช้ SplitText + Class line-3 */}
                    <div className="magic-line-wrapper-3 overflow-hidden whitespace-nowrap">
                        <p className="font-serif text-xl md:text-3xl text-blue-200 font-bold leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
                             <SplitText className="line-3">จะเป็นอาจารย์ให้เธอเอง!</SplitText>
                        </p>
                    </div>

                </div>
             </div>
        </div>

        <div className="black-overlay absolute inset-0 z-[70] bg-black pointer-events-none"></div>
      </div>
    </div>
  )
}