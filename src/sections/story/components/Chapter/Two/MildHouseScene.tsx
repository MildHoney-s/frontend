import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  onComplete: () => void
}

export default function HouseScene({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // =========================================================
      // 1. INITIAL SETUP
      // =========================================================

      // Scene Atmosphere (ค่ำแล้ว)
      gsap.set('.black-overlay', { autoAlpha: 1 }) 
      gsap.set('.evening-overlay', { autoAlpha: 0.6 }) // สีน้ำเงินเข้ม/ม่วง ให้บรรยากาศค่ำๆ

      // Honey (ยืนรอหน้าประตู)
      gsap.set('.honey-group', { x: -50, autoAlpha: 1 })
      gsap.set('.honey-bubble-think', { scale: 0, autoAlpha: 0, transformOrigin: 'bottom right' })
      gsap.set('.knock-effect', { scale: 0, autoAlpha: 0 })

      // Mild (ซ่อนอยู่ในบ้าน/หลังประตู)
      gsap.set('.mild-group', { x: 50, autoAlpha: 0 }) // เริ่มต้นซ่อนไว้
      gsap.set('.mild-face-normal', { autoAlpha: 1 })
      gsap.set('.mild-face-surprise', { autoAlpha: 0 })
      gsap.set('.mild-face-happy', { autoAlpha: 0 })
      
      // Bubbles
      gsap.set('.mild-bubble-think', { scale: 0, autoAlpha: 0, transformOrigin: 'bottom left' })
      gsap.set('.mild-bubble-speak', { scale: 0, autoAlpha: 0, transformOrigin: 'bottom left' })
      
      // Magic Text (เวทตัวอักษรของฮันนี่)
      gsap.set('.magic-text-container', { autoAlpha: 0, scale: 0.8, y: 20 })


      // =========================================================
      // 2. TIMELINE
      // =========================================================
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          onLeave: () => onComplete && onComplete(),
        },
      })

      // --- PHASE 1: ARRIVAL & THINKING ---
      // เปิดฉาก Honey ยืนหน้าบ้าน
      tl.to('.black-overlay', { autoAlpha: 0, duration: 2 })
        .from('.house-bg', { scale: 1.1, duration: 2 }, '<')
      
      // Honey คิดในใจ: "ใช่หลังนี้ไหมนะ"
      tl.to('.honey-bubble-think', { scale: 1, autoAlpha: 1, duration: 0.5, ease: 'back.out' })
        .to('.honey-bubble-think', { scale: 0, autoAlpha: 0, duration: 0.3, delay: 1 }) // หายไป

      // --- PHASE 2: KNOCK KNOCK ---
      // Honey เคาะประตู (Effect สั่นๆ)
      tl.to('.honey-group', { x: -40, duration: 0.1, yoyo: true, repeat: 3 }) // ขยับตัวเหมือนเคาะ
        .to('.knock-effect', { scale: 1, autoAlpha: 1, duration: 0.2 }, '<')
        .to('.knock-effect', { scale: 1.2, duration: 0.2, yoyo: true, repeat: 3 }, '<')
        .to('.knock-effect', { autoAlpha: 0, duration: 0.2 }, '>0.5')

      // --- PHASE 3: MILD OPENS DOOR ---
      // Mild คิดในใจก่อนเปิด: "ใครกัน?"
      // (สมมติว่า Bubble ลอยออกมาจากในบ้านก่อนตัวคน)
      tl.to('.mild-bubble-think', { scale: 1, autoAlpha: 1, duration: 0.5, ease: 'back.out' })
        .to('.mild-bubble-think', { scale: 0, autoAlpha: 0, duration: 0.3, delay: 1 })

      // Mild แง้มประตูออกมา (Slide & Fade In)
      tl.to('.mild-group', { x: 0, autoAlpha: 1, duration: 1, ease: 'power2.out' })
      
      // Mild พูด: "เอ๊ะ คุณฮันนี่?"
      tl.to('.mild-bubble-speak', { scale: 1, autoAlpha: 1, duration: 0.5, ease: 'back.out' })
        .to('.text-mild-speak-1', { autoAlpha: 1, duration: 0.5 }, '<') // "ใครหรอคะ..."

      // Mild เปลี่ยนข้อความ -> ตกใจ
      tl.to('.text-mild-speak-1', { autoAlpha: 0, duration: 0.2, delay: 1 })
        .to('.mild-face-normal', { autoAlpha: 0, duration: 0.2 }, '<')
        .to('.mild-face-surprise', { autoAlpha: 1, duration: 0.2 }, '<')
        .to('.text-mild-speak-2', { autoAlpha: 1, duration: 0.2 }) // "เอ๊ะ คุณฮันนี่... มาซะเย็น"

      // --- PHASE 4: MAGIC TEXT REPLY ---
      // Honey ตอบกลับด้วยเวทมนตร์ (Bubble ปกติหายไป Mild เงียบฟัง)
      tl.to('.mild-bubble-speak', { autoAlpha: 0, scale: 0, duration: 0.3 }, '>0.5')
      
      // Magic Text ปรากฏ (Glow effect)
      tl.to('.magic-text-container', { 
          autoAlpha: 1, 
          scale: 1, 
          y: 0, 
          duration: 1.5, 
          ease: 'power3.out' 
      })

      // --- PHASE 5: HAPPY ENDING ---
      // Mild ดีใจเปลี่ยนหน้า + Bubble "จริงหรอคะ!?"
      tl.to('.mild-face-surprise', { autoAlpha: 0, duration: 0.3 }, '>1')
        .to('.mild-face-happy', { autoAlpha: 1, duration: 0.3 }, '<')
        .to('.mild-bubble-speak', { scale: 1, autoAlpha: 1, duration: 0.3 }, '<')
        .to('.text-mild-speak-2', { autoAlpha: 0, duration: 0 }, '<') // ซ่อน text เก่า
        .to('.text-mild-speak-3', { autoAlpha: 1, duration: 0.2 }) // โชว์ text ใหม่ "จริงหรอคะ!?"

      // Fade Out จบ Scene
      tl.to('.black-overlay', { autoAlpha: 1, duration: 1.5 }, '>1.5')

    }, containerRef)
    return () => ctx.revert()
  }, [onComplete])

  return (
    <div ref={containerRef} className="relative h-[450vh] w-full bg-black">
      <div className="sticky left-0 top-0 h-screen w-full overflow-hidden font-sans">
        
        {/* Background: หน้าบ้านมายด์ */}
        <div
          className="house-bg absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/Part2/Mild_House_Front.png')" }} // ⚠️ เปลี่ยนเป็นรูปหน้าบ้านจริง
        >
          {/* Evening Overlay: สีน้ำเงินม่วงเข้มๆ ให้ดูเป็นตอนค่ำ */}
          <div className="evening-overlay absolute inset-0 bg-indigo-900 mix-blend-multiply pointer-events-none"></div>
        </div>

        {/* --- HONEY (LEFT) --- */}
        <div className="honey-group absolute bottom-0 left-[5%] md:left-[15%] z-20 w-[260px] md:w-[320px]">
             <img src="/assets/Part2/Honey/Body.PNG" className="relative w-full" alt="Honey Body" />
             <img src="/assets/Part2/Honey/Normal_Face.PNG" className="absolute top-[95px] left-0 w-full" alt="Honey Face" />

             {/* 1. Thought Bubble */}
             <div className="honey-bubble-think absolute -right-[100px] top-[0px] w-[200px] bg-white rounded-full p-4 shadow-xl border-2 border-gray-300 opacity-0">
                <p className="text-gray-600 text-sm text-center italic">"ใช่หลังนี้มั้ยนะ?<br/>ลองเคาะดูละกัน"</p>
                <div className="absolute -bottom-2 left-4 w-3 h-3 bg-white rounded-full"></div>
                <div className="absolute -bottom-5 left-2 w-2 h-2 bg-white rounded-full"></div>
             </div>

             {/* 2. Knock Effect Text */}
             <div className="knock-effect absolute -right-[50px] top-[150px] pointer-events-none">
                 <h2 className="text-4xl font-black text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] italic transform -rotate-12">
                     Gok! Gok!
                 </h2>
             </div>
        </div>

        {/* --- MILD (RIGHT) --- */}
        <div className="mild-group absolute bottom-0 right-[5%] md:right-[15%] z-10 w-[260px] md:w-[320px]">
             {/* สมมติว่า Mild ยืนอยู่หลังประตู หรือโผล่มาจากขอบจอขวา */}
             <img src="/assets/Part2/Mild/Body/Body_1.PNG" className="relative w-full" alt="Mild Body" />
             
             <div className="absolute top-0 left-0 w-full h-full">
                <img src="/assets/Part2/Mild/Face/Face_08_หน้าจริงจัง.PNG" className="mild-face-normal w-full absolute top-0" alt="Normal" />
                <img src="/assets/Part2/Mild/Face/Face_03_หน้าตกใจ.PNG" className="mild-face-surprise w-full absolute top-0 opacity-0" alt="Surprise" />
                <img src="/assets/Part2/Mild/Face/Face_01_ยิ้ม.PNG" className="mild-face-happy w-full absolute top-0 opacity-0" alt="Happy" />
             </div>

             {/* Mild Thought Bubble (ก่อนเปิดประตู) */}
             <div className="mild-bubble-think absolute -left-[120px] top-[50px] w-[180px] bg-white rounded-full p-3 shadow-xl border-2 border-gray-300 opacity-0 z-30">
                <p className="text-gray-600 text-sm text-center italic">"ใครกันมาซะเย็นเชียว..."</p>
                <div className="absolute -bottom-2 right-4 w-3 h-3 bg-white rounded-full"></div>
                <div className="absolute -bottom-5 right-2 w-2 h-2 bg-white rounded-full"></div>
             </div>

             {/* Mild Speak Bubble */}
             <div className="mild-bubble-speak absolute -left-[160px] top-[20px] w-[240px] bg-white rounded-2xl p-4 shadow-xl border-2 border-gray-300 z-30 opacity-0">
                <div className="text-mild-speak-1 absolute inset-0 flex items-center justify-center p-4 opacity-0">
                    <p className="text-gray-800 text-sm leading-tight text-center">"(เสียงเบา)<br/>ใครหรอคะ..."</p>
                </div>
                <div className="text-mild-speak-2 absolute inset-0 flex items-center justify-center p-4 opacity-0">
                    <p className="text-black font-bold text-base leading-tight text-center">"เอ๊ะ!? คุณฮันนี่เองหรอ<br/>มีอะไรรึป่าวคะ<br/>มาซะเย็นเชียว"</p>
                </div>
                <div className="text-mild-speak-3 absolute inset-0 flex items-center justify-center p-4 opacity-0">
                    <p className="text-pink-600 font-black text-xl text-center">"จริงหรอคะ!?"</p>
                </div>
                {/* หาง Bubble */}
                <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-white transform rotate-45 border-r-2 border-b-2 border-gray-300"></div>
             </div>
        </div>

        {/* --- MAGIC TEXT (CENTER) --- */}
        {/* กล่องข้อความเวทมนตร์ ลอยอยู่ตรงกลาง */}
        <div className="magic-text-container absolute top-[30%] left-1/2 -translate-x-1/2 z-40 w-[90%] md:w-[600px] pointer-events-none">
            <div className="relative bg-blue-900/80 backdrop-blur-md border-2 border-blue-300 rounded-xl p-6 md:p-8 shadow-[0_0_30px_rgba(59,130,246,0.6)]">
                {/* Decoration Icons */}
                <div className="absolute -top-4 -left-4 text-3xl">✨</div>
                <div className="absolute -bottom-4 -right-4 text-3xl">✨</div>

                <p className="font-serif text-lg md:text-2xl text-blue-100 text-center leading-relaxed drop-shadow-md">
                    " ขอโทษนะที่มารบกวน... <br/>
                    พอดีฉันตัดสินใจได้แล้วว่า <br/>
                    <span className="text-yellow-300 font-bold text-xl md:text-3xl mt-2 block">
                        จะเป็นอาจารย์ให้เธอเอง!
                    </span> "
                </p>
            </div>
        </div>

        {/* Black Overlay */}
        <div className="black-overlay absolute inset-0 z-50 bg-black pointer-events-none"></div>

      </div>
    </div>
  )
}