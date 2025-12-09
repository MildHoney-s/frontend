import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  onComplete: () => void
}

// Helper: SplitText (ใช้เฉพาะของ Honey)
const SplitText = ({ children, className }: { children: string, className?: string }) => {
  return (
    <span className={className} aria-label={children}>
      {children.split('').map((char, index) => (
        <span 
            key={index} 
            className="char-reveal inline-block opacity-0 translate-y-4" 
            style={{ minWidth: char === ' ' ? '0.3em' : 'auto' }} 
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}

export default function ThreeMonthsLaterScene({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Asset Paths
  const bgImg = "/assets/Part2/arena.png"; 

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // --- INITIAL SETUP ---
      // ✅ ตั้งค่าพื้นหลังดำให้ทึบสุด และอยู่ layer ล่าง (z-60)
      gsap.set('.black-overlay', { autoAlpha: 1, zIndex: 60 })
      
      // ✅ ตั้งค่ากลุ่มข้อความให้อยู่ layer บนกว่า (z-65) เพื่อให้เห็นบนพื้นดำ
      gsap.set('.time-skip-group', { autoAlpha: 1, zIndex: 65 })
      
      // Characters
      gsap.set('.mild-group', { x: -30, autoAlpha: 0 }) 
      gsap.set('.honey-group', { x: 30, autoAlpha: 0 })
      
      // Mild Setup
      gsap.set('.mild-face-worry', { autoAlpha: 1 })
      gsap.set(['.mild-face-happy', '.mild-face-drink'], { autoAlpha: 0 })
      
      // ✅ Arm Setup: เริ่มต้นใช้ Arm 2 (คุย)
      gsap.set(['.mild-arm-2-l', '.mild-arm-2-r'], { autoAlpha: 1 }) 
      gsap.set(['.mild-arm-1-l', '.mild-arm-milktea-r'], { autoAlpha: 0 }) // ซ่อนชุดกินชานมไว้ก่อน

      // Bubbles & Text
      gsap.set(['.bubble-mild', '.bubble-honey'], { scale: 0, autoAlpha: 0 })
      gsap.set(['.text-m-1', '.text-m-2', '.text-m-3'], { display: 'none', autoAlpha: 0 })
      gsap.set(['.text-h-1', '.text-h-2', '.text-h-3'], { display: 'none', autoAlpha: 1 })

      gsap.set('.final-text-group', { autoAlpha: 0 })


      // =========================================================
      // TIMELINE
      // =========================================================
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=8000',
          scrub: 1,
          pin: true,
          fastScrollEnd: true,
          onLeave: () => onComplete && onComplete(),
        },
      })

      // =========================================================
      // STEP 1: TIME SKIP (บนพื้นหลังดำ)
      // =========================================================
      
      tl.to('.time-skip-group .char-reveal', { 
          y: 0, autoAlpha: 1, stagger: 0.05, duration: 0.8, ease: 'back.out' 
      })
      
      tl.to({}, { duration: 0.5 }) 

      tl.to('.time-skip-group', { autoAlpha: 0, scale: 1.1, duration: 1.5, ease: 'power2.inOut' })
      tl.to('.black-overlay', { autoAlpha: 0, duration: 2, ease: 'power2.inOut' }, '<')


      // --- STEP 2: SCENE START (ตัวละครโผล่มา) ---
      tl.to(['.mild-group', '.honey-group'], { 
          autoAlpha: 1, x: 0, duration: 1, ease: 'power2.out' 
      }, '<0.5')


      // =========================================================
      // STEP 3: CONVERSATION (TURN-BASED)
      // =========================================================
      
      // --- TURN 1: Mild ---
      tl.set('.text-m-1', { display: 'block' })
      tl.to('.bubble-mild', { scale: 1, autoAlpha: 1, duration: 0.5, ease: 'back.out' })
      tl.to('.text-m-1', { autoAlpha: 1, duration: 0.5 }) 
      
      tl.to('.text-m-1', { autoAlpha: 0, duration: 0.2, delay: 1.5 }) 
      tl.to('.bubble-mild', { scale: 0, autoAlpha: 0, duration: 0.3 }, '<')
      tl.set('.text-m-1', { display: 'none' })

      // --- TURN 2: Honey ---
      tl.set('.text-h-1', { display: 'block' })
      tl.to('.bubble-honey', { scale: 1, autoAlpha: 1, duration: 0.5, ease: 'back.out' })
      tl.to('.text-h-1 .char-reveal', { y: 0, autoAlpha: 1, stagger: 0.03, duration: 0.05 })
      
      tl.to('.text-h-1', { autoAlpha: 0, duration: 0.2, delay: 1.5 })
      tl.to('.bubble-honey', { scale: 0, autoAlpha: 0, duration: 0.3 }, '<')
      tl.set('.text-h-1', { display: 'none' })

      // --- TURN 3: Mild ---
      tl.set('.text-m-2', { display: 'block' })
      tl.to('.bubble-mild', { scale: 1, autoAlpha: 1, duration: 0.5, ease: 'back.out' })
      tl.to('.text-m-2', { autoAlpha: 1, duration: 0.5 })
      
      tl.to('.text-m-2', { autoAlpha: 0, duration: 0.2, delay: 1.5 })
      tl.to('.bubble-mild', { scale: 0, autoAlpha: 0, duration: 0.3 }, '<')
      tl.set('.text-m-2', { display: 'none' })

      // --- TURN 4: Honey (Long Text) ---
      tl.set('.text-h-2', { display: 'block' })
      tl.to('.bubble-honey', { scale: 1, autoAlpha: 1, duration: 0.5, ease: 'back.out' })
      tl.to('.text-h-2 .char-reveal', { y: 0, autoAlpha: 1, stagger: 0.02, duration: 0.05 })
      
      tl.to('.text-h-2', { autoAlpha: 0, duration: 0.2, delay: 2.5 })
      tl.to('.bubble-honey', { scale: 0, autoAlpha: 0, duration: 0.3 }, '<')
      tl.set('.text-h-2', { display: 'none' })

      // --- TURN 5: Honey (Invite) ---
      tl.set('.text-h-3', { display: 'block' })
      tl.to('.bubble-honey', { scale: 1, autoAlpha: 1, duration: 0.5, ease: 'back.out' })
      tl.to('.text-h-3 .char-reveal', { y: 0, autoAlpha: 1, stagger: 0.03, duration: 0.05 })
      
      // --- TURN 6: Mild (Response) ---
      tl.to('.text-h-3', { autoAlpha: 0, duration: 0.2, delay: 1.5 })
      tl.to('.bubble-honey', { scale: 0, autoAlpha: 0, duration: 0.3 }, '<')
      tl.set('.text-h-3', { display: 'none' })

      // Mild ยิ้ม + เปิดกล่องตอบ
      tl.to('.mild-face-worry', { autoAlpha: 0, duration: 0.1 })
      tl.to('.mild-face-happy', { autoAlpha: 1, duration: 0.1 }, '<')
      
      tl.set('.text-m-3', { display: 'block' })
      tl.to('.bubble-mild', { scale: 1, autoAlpha: 1, duration: 0.5, ease: 'back.out' })
      tl.to('.text-m-3', { autoAlpha: 1, duration: 0.5 })

      // =========================================================
      // STEP 4: MILK TEA MOMENT (SWITCH ARMS & MOVE CLOSER)
      // =========================================================
      tl.to('.text-m-3', { autoAlpha: 0, duration: 0.2, delay: 1 })
      tl.to('.bubble-mild', { scale: 0, autoAlpha: 0, duration: 0.3 }, '<')

      // Zoom BG
      tl.to('.arena-bg', { scale: 1.3, transformOrigin: 'center bottom', duration: 1.5, ease: 'power2.inOut' })
      
      // Move Mild right & Scale up
      tl.to('.mild-group', { scale: 1.1, x: 20, duration: 1.5 }, '<')
      
      // ✅ Move Honey left (closer to Mild), Scale up, NO BLUR, NO FADE
      tl.to('.honey-group', { 
          scale: 1.05, // ขยายตามนิดหน่อย
          x: -10,      // ขยับมาทางซ้ายเข้าหามายด์
          autoAlpha: 1, // ชัดเจน
          filter: 'none', // ไม่เบลอ
          duration: 1.5 
      }, '<')

      // ✅ สลับแขน: ซ่อน Arm 2 -> โชว์ Arm 1 (กิน)
      tl.to(['.mild-arm-2-l', '.mild-arm-2-r'], { autoAlpha: 0, duration: 0.1 })
      tl.to(['.mild-arm-1-l', '.mild-arm-milktea-r'], { autoAlpha: 1, duration: 0.1 }, '<')

      // --- STEP 5: ENDING ---
      tl.to('.black-overlay', { autoAlpha: 1, duration: 1.5 }, '>1')
      
      // Final Text
      tl.to('.final-text-group', { autoAlpha: 1, duration: 0.1 })
      tl.to('.final-text-group .char-reveal', { 
          y: 0, autoAlpha: 1, stagger: 0.1, duration: 0.5, ease: 'back.out' 
      })

    }, containerRef)
    return () => ctx.revert()
  }, [onComplete])

  return (
    <div ref={containerRef} className="relative h-screen w-full bg-black overflow-hidden font-sans">
      
      <div className="absolute inset-0 w-full h-full perspective-[1500px]">
        
        {/* 1. BACKGROUND */}
        <div 
            className="arena-bg absolute inset-0 bg-cover bg-center z-0"
            style={{ backgroundImage: `url('${bgImg}')` }}
        >
            <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* 2. TIME SKIP TEXT (zIndex 65 เพื่อให้อยู่เหนือ overlay) */}
        <div className="time-skip-group absolute inset-0 flex flex-col items-center justify-center z-[65] pointer-events-none">
            <h2 className="font-serif text-5xl md:text-7xl text-white font-bold drop-shadow-lg">
                <SplitText>3 เดือนผ่านไป...</SplitText>
            </h2>
            <div className="h-1 w-24 bg-white mt-4 rounded-full shadow-lg"></div>
        </div>


        {/* 3. CHARACTERS CONTAINER (pb-0 เพื่อชิดล่าง) */}
        <div className="absolute z-10 inset-0 flex items-end justify-center pb-0">
            
            {/* --- MILD (LEFT) --- */}
            <div className="mild-group relative w-[280px] md:w-[350px] h-[500px] md:h-[600px] z-20 translate-y-20">
                <div className="mild-body-img relative w-full h-full">
                    {/* Body Base */}
                    <img src="/assets/Part2/Mild/Body/Hair.PNG" className="absolute top-0 left-0 w-full z-0" alt="Hair" />
                    <img src="/assets/Part2/Mild/Body/Body_1.PNG" className="absolute top-0 left-0 w-full z-10" alt="Body" />
                    
                    {/* ✅ ชุดแขนที่ 1 (Arm 2 - ใช้ตอนคุย) */}
                    <img src="/assets/Part2/Mild/Arms/Arm_2_L.PNG" className="mild-arm-2-l absolute top-0 left-0 w-full z-20" alt="L Arm 2" />
                    <img src="/assets/Part2/Mild/Arms/Arm_2_R.PNG" className="mild-arm-2-r absolute top-0 left-0 w-full z-20" alt="R Arm 2" />

                    {/* ✅ ชุดแขนที่ 2 (Arm 1 + MilkTea - ใช้ตอนกิน) */}
                    <img src="/assets/Part2/Mild/Arms/Arm_1_L.PNG" className="mild-arm-1-l absolute top-0 left-0 w-full z-20 opacity-0" alt="L Arm 1" />
                    <img src="/assets/Part2/Mild/Arms/Arm_milktea_R.PNG" className="mild-arm-milktea-r absolute top-0 left-0 w-full z-40 opacity-0" alt="R Arm MilkTea" />

                    {/* Face */}
                    <div className="absolute top-[1%] left-0 w-full z-30">
                        <img src="/assets/Part2/Mild/Face/Face_05_หน้าเศร้า.PNG" className="mild-face-worry w-full object-contain" alt="Worry" />
                        <img src="/assets/Part2/Mild/Face/Face_02_หน้ายิ้ม.PNG" className="mild-face-happy w-full object-contain opacity-0 absolute top-0 left-0" alt="Happy" />
                    </div>
                </div>

                {/* Mild Bubble */}
                <div className="bubble-mild absolute -top-[80px] -left-[20px] w-[240px] bg-white rounded-[30px] p-4 shadow-xl border-2 border-blue-200 origin-bottom-right z-50 flex items-center justify-center min-h-[100px]">
                    <div className="text-center text-gray-700 text-sm md:text-base leading-snug w-full">
                        <p className="text-m-1">เฮ้อ... <br/>อีกแค่เดือนเดียวก็จะถึงงานแข่งแล้ว...</p>
                        <p className="text-m-2">คือฉันกำลังคิดว่า... <br/>ตัวเองยังไม่พร้อมที่จะไปแข่งเลยค่ะ</p>
                        <p className="text-m-3 font-bold text-pink-500 text-lg">ก็ได้ค่ะ! (ไปกินกัน)</p>
                    </div>
                    <div className="absolute -bottom-3 right-8 w-4 h-4 bg-white transform rotate-45 border-r-2 border-b-2 border-gray-200"></div>
                </div>
            </div>


            {/* --- HONEY (RIGHT) --- */}
            <div className="honey-group relative w-[260px] md:w-[320px] h-[400px] md:h-[580px] z-20 ml-[-20px] translate-y-40">
                <div className="relative w-full h-full">
                    <img src="/assets/Part2/Honey/Body.PNG" className="relative w-full" alt="Honey Body" />
                    <img src="/assets/Part2/Honey/Normal_Face.PNG" className="absolute top-[2%] left-0 w-full" alt="Honey Face" />
                </div>

                {/* Honey Magic Text */}
                <div className="bubble-honey absolute -top-[100px] -right-[20px] w-[320px] text-right origin-bottom-left z-50 flex flex-col items-end justify-center min-h-[120px]">
                    <div className="text-yellow-100 text-sm md:text-base leading-relaxed drop-shadow-[0_0_5px_rgba(234,179,8,1)] font-medium">

                        <div className="text-h-1">
                            <SplitText>ทำหน้าแบบนั้น...</SplitText><br/>
                            <span className="text-yellow-300 font-bold text-lg">
                                <SplitText>กำลังกดดันตัวเองอยู่สินะ</SplitText>
                            </span>
                        </div>
                        <div className="text-h-2 space-y-2">
                            <p><SplitText>อย่ากดดันสิ...</SplitText></p>
                            <p><SplitText>ฉันเห็นความพยายามของเธอตลอดนะ</SplitText></p>
                            <p className="font-bold text-yellow-300 text-lg">
                                <SplitText>มั่นใจในตัวเองเข้าไว้สิ!</SplitText>
                            </p>
                        </div>

                        <div className="text-h-3">
                            <SplitText>งั้นพักการฝึกก่อน...</SplitText><br/>
                            <span className="text-pink-300 font-bold text-xl drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]">
                                <SplitText>ไปหาไรอร่อยๆ กินกัน!</SplitText>
                            </span>
                        </div>

                    </div>
                </div>
            </div>

        </div>

        {/* Overlay (zIndex 60) */}
        <div className="black-overlay absolute inset-0 bg-black z-[60] pointer-events-none"></div>

      </div>
    </div>
  )
}