import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'
import MagicCircleSVG from '../../../../../components/MagicCircleSVG' // เช็ค path ให้ถูกนะครับ

gsap.registerPlugin(ScrollTrigger)

interface Props {
  onComplete: () => void
}

const MAGIC_RUNES = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ', 'ᛇ', 'ᛈ', 'ᛉ', 'ᛊ', 'ᛏ', 'ᛒ', 'ᛖ', 'ᛗ', 'ᛚ', 'ᛜ', 'ᛞ', 'ᛟ']

export default function TrainingGroundScene({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // =========================================================
      // 1. INITIAL SETUP (ตั้งค่าเริ่มต้นทั้งหมดตรงนี้)
      // =========================================================

      // Mild & Magic
      gsap.set('.mild-group', { autoAlpha: 0, scale: 0.8 })
      gsap.set('.mild-face-serious', { autoAlpha: 1 })
      gsap.set(['.mild-face-shock', '.mild-face-sad'], { autoAlpha: 0 })
      gsap.set('.magic-circle-svg', { autoAlpha: 0, scale: 0, rotation: 0 })
      gsap.set('.rune-char', { autoAlpha: 0, scale: 0, x: 0, y: 0 })
      gsap.set('.fail-symbol', { autoAlpha: 0, scale: 0 })
      gsap.set('.magic-text', { autoAlpha: 0, y: 20 }) // ซ่อนไว้ + เลื่อนลงนิดนึง

      // Bully
      gsap.set('.group-students', { autoAlpha: 0 })
      gsap.set('.bully-word', { autoAlpha: 0, scale: 0 })
      gsap.set('.bully-laugh', { scale: 0, opacity: 0 })

      // Honey (เริ่มที่นอกจอฝั่งขวา)
      gsap.set('.honey-group', { x: 0, autoAlpha: 0 })
      gsap.set(['.honey-face-scare', '.honey-face-worry', '.honey-face-normal'], { autoAlpha: 0 })
      gsap.set('.honey-bubble', { scale: 0, opacity: 0, transformOrigin: 'bottom left' })
      gsap.set(['.honey-text-1', '.honey-text-2', '.honey-text-3'], { autoAlpha: 0 })

      // Scene
      gsap.set('.location-title', { y: 30, autoAlpha: 0 })
      gsap.set('.black-overlay', { autoAlpha: 1 })


      // =========================================================
      // 2. MAIN TIMELINE
      // =========================================================
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom', // ใช้ความสูงของ container ควบคุมความยาว
          scrub: 1,
          onLeave: () => onComplete && onComplete(),
        },
      })

      // --- PHASE 1: INTRO ---
      tl.to('.black-overlay', { autoAlpha: 0, duration: 2 })
        .fromTo('.arena-bg', { scale: 1 }, { scale: 1.3, duration: 4 }, '<')
        .to('.location-title', { y: 0, autoAlpha: 1, duration: 1 }, '<0.5')
        .to('.location-title', { autoAlpha: 0, duration: 0.5 }, '>1')

      // --- PHASE 2: CASTING MAGIC ---
      tl.to('.mild-group', { autoAlpha: 1, scale: 1, duration: 1, ease: 'back.out' })
        .to('.magic-circle-svg', { autoAlpha: 1, scale: 1.2, duration: 1 }, '<')

      // Runes Animation
      const runes = gsap.utils.toArray<HTMLElement>('.rune-char')
      runes.forEach((rune, i) => {
        const angle = (i / runes.length) * Math.PI * 2
        const r = 180 + (Math.random() - 0.5) * 40
        tl.to(rune, {
          x: Math.cos(angle) * r,
          y: Math.sin(angle) * r,
          rotation: Math.random() * 360,
          autoAlpha: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out'
        }, '<0.01')
      })

      tl.to(['.runes-container', '.magic-circle-svg'], { rotation: 180, scale: 1.1, duration: 0.5 })
        .to('.mild-body-img', { x: 5, repeat: 5, yoyo: true, duration: 0.05 }, '<')

      // --- PHASE 3: EXPLOSION & FAIL ---
      tl.to(['.rune-char', '.magic-circle-svg'], { scale: 0.8, duration: 0.1 })
        .to('.rune-char', {
           x: () => (Math.random() - 0.5) * 1500,
           y: () => (Math.random() - 0.5) * 1500,
           rotation: () => Math.random() * 3000,
           scale: 0, autoAlpha: 0, duration: 0.3, ease: 'expo.out'
        })
        .to('.magic-circle-svg', { scale: 1.5, opacity: 0, duration: 0.2 }, '<')
        // Face Change: Serious -> Shock
        .to('.mild-face-serious', { autoAlpha: 0, duration: 0.1 }, '<')
        .to('.mild-face-shock', { autoAlpha: 1, duration: 0.1 }, '<')

        .to('.mild-group', { scale: 0.9, y: 20, duration: 0.5 }, '<')
        .to('.fail-symbol', { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'back.out' }, '<0.2')
        .to('.fail-symbol', { autoAlpha: 0, duration: 0.5 }, '>1')

      // --- PHASE 4: BULLY ---
      tl.to('.group-students', { autoAlpha: 1, duration: 0.5 })
        .to('.bully-1', { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' })
        .to('.bully-2', { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' }, '>0.2')
        // Face Change: Shock -> Sad
        .to('.mild-face-shock', { autoAlpha: 0, duration: 0.5 }, '<')
        .to('.mild-face-sad', { autoAlpha: 1, duration: 0.5 }, '<')
        .to('.bully-3', { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' }, '>0.2')
        .fromTo('.bully-laugh', { scale: 0, opacity: 0 }, { scale: 1.2, opacity: 1, duration: 0.5 }, '<0.2')

      // --- PHASE 5: HONEY SEQUENCE (Right -> Center -> Left) ---

      // 5.1 Focus Shift & Honey Enter (Right)
      tl.to(['.arena-bg', '.group-students', '.bully-word', '.bully-laugh', '.mild-group'], { 
          filter: 'blur(5px) brightness(0.5)', duration: 1 
      }, '>0.5')
      .to('.arena-bg', { scale: 1.1, duration: 1.5 }, '<')
      .to(['.bully-word', '.bully-laugh'], { autoAlpha: 0, scale: 0.5, transformOrigin: 'bottom center', duration: 1 }, '<')
      .to(['.group-students', '.mild-group'], { scale: 0.5, transformOrigin: 'bottom center', duration: 1.5 }, '<')

      // Honey เดินมาขวา (x: 250) + หน้า Scare + Text 1
      .to('.honey-group', { x: 250, autoAlpha: 1, duration: 0.5, ease: 'power2.out' }, '>0.2')
      .to('.honey-face-scare', { autoAlpha: 1, duration: 0.1 }, '<') 
      .to('.honey-bubble', { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out' }, '-=0.5')
      .to('.honey-text-1', { autoAlpha: 1, duration: 0.5 }, '<')

      // 5.2 Honey เดินมากลาง (x: 0) + หน้า Worry + Text 2
      .to('.honey-group', { x: 500, duration: 2, ease: 'linear' }, '>1')
      .to('.honey-text-1', { autoAlpha: 0, duration: 0.3 }, '<')
      .to('.honey-face-scare', { autoAlpha: 0, duration: 0.3 }, '<')
      .to('.honey-face-worry', { autoAlpha: 1, duration: 0.3 }, '<')
      .to('.honey-text-2', { autoAlpha: 1, duration: 0.3 }, '>0.1')

      // 5.3 Honey เดินไปซ้าย (x: -250) + หน้า Normal + Text 3
      .to('.honey-group', { x: 750, duration: 2, ease: 'linear' }, '>1')
      .to('.honey-text-2', { autoAlpha: 0, duration: 0.3 }, '<')
      .to('.honey-face-worry', { autoAlpha: 0, duration: 0.3 }, '<')
      .to('.honey-face-normal', { autoAlpha: 1, duration: 0.3 }, '<')
      .to('.honey-text-3', { autoAlpha: 1, duration: 0.3 }, '>0.1')

      // --- PHASE 6: EXIT ---
      tl.to('.black-overlay', { autoAlpha: 1, duration: 1 }, '>1')
      .to('.magic-text', {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out'
      }, '<0.5') // เริ่มทำงานหลังจากจอดำเริ่มไปได้ครึ่งทาง (ซ้อนเหลื่อมกันนิดๆ)

    }, containerRef)
    return () => ctx.revert()
  }, [onComplete])

  return (
    // ใช้ h-[500vh] เพื่อสร้างพื้นที่ Scroll ยาวๆ
    <div ref={containerRef} className="relative h-[500vh] w-full bg-black">

      {/* ใช้ Sticky เพื่อให้ภาพติดอยู่กับหน้าจอขณะ Scroll */}
      <div className="sticky left-0 top-0 h-screen w-full overflow-hidden font-sans">

        {/* Background */}
        <div
          className="arena-bg absolute inset-0 transform-gpu bg-cover bg-center origin-bottom will-change-transform"
          style={{ backgroundImage: "url('/assets/Part2/arena.png')" }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Title */}
        <div className="location-title pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          <h2 className="text-3xl font-serif text-white drop-shadow-xl md:text-5xl">
            ณ ลานฝึกเวทมนตร์
          </h2>
        </div>

        {/* --- CENTER STAGE --- */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
            {/* 1. เพื่อนนักเรียน */}
            <img
                src="/assets/Part2/group_students.png"
                className="group-students absolute bottom-50 left-1/2 w-[85%] -translate-x-1/2 object-contain md:w-[50%] z-10" 
                alt="Group"
            />

            {/* 2. MILD CHARACTER */}
            <div className="mild-group relative w-[250px] h-[400px] md:w-[320px] md:h-[480px] will-change-transform z-20">
                <div className="mild-body-img relative w-full h-full">
                    <img src="/assets/Part2/Mild/Body/Hair.PNG" className="absolute top-0 left-0 w-full h-full object-contain z-0" alt="Back Hair" />
                    <img src="/assets/Part2/Mild/Body/Body_1.PNG" className="absolute top-0 left-0 w-full h-full object-contain z-10" alt="Body" />
                    <img src="/assets/Part2/Mild/Arms/Arm_1_L.PNG" className="absolute top-0 left-0 w-full h-full object-contain z-20" alt="Left Arm" />
                    <img src="/assets/Part2/Mild/Arms/Arm_1_R.PNG" className="absolute top-0 left-0 w-full h-full object-contain z-20" alt="Right Arm" />

                    {/* Faces Container */}
                    <div className="absolute top-[1%] left-0 w-full h-auto z-30">
                        <img src="/assets/Part2/Mild/Face/Face_08_หน้าจริงจัง.PNG" className="mild-face-serious w-full object-contain" alt="Serious" />
                        <img src="/assets/Part2/Mild/Face/Face_03_หน้าตกใจ.PNG" className="mild-face-shock absolute top-0 left-0 w-full object-contain" alt="Shock" />
                        <img src="/assets/Part2/Mild/Face/Face_05_หน้าเศร้า.PNG" className="mild-face-sad absolute top-0 left-0 w-full object-contain" alt="Sad" />
                    </div>
                </div>
                <div className="fail-symbol absolute -top-10 left-1/2 -translate-x-1/2 text-6xl font-bold text-white drop-shadow-md z-40"> . . . </div>
            </div>

            {/* 3. MAGIC CIRCLE */}
            <div className="runes-container absolute inset-0 pointer-events-none flex items-center justify-center z-50">
                <MagicCircleSVG
                    className="magic-circle-svg absolute text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]"
                    style={{ width: '450px', height: '450px' }}
                />
                {MAGIC_RUNES.map((rune, i) => (
                    <span key={i} className="rune-char absolute text-3xl md:text-5xl font-bold text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]">{rune}</span>
                ))}
            </div>
        </div>

        {/* --- BULLY TEXT SECTION --- */}
        <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
            <div className="bully-word bully-1 absolute top-[25%] left-[5%] max-w-[200px] md:max-w-[280px] -rotate-6">
                <p className="text-lg md:text-2xl font-bold text-red-500 bg-black/60 p-3 rounded-lg backdrop-blur-sm border border-red-500/50 shadow-lg text-center leading-snug">
                    "ดูสิ!<br/>ฝึกไปก็เหนื่อยเปล่า<br/>คนขี้อายแบบเธอ...<br/>จะไปทำได้ยังไงกัน"
                </p>
            </div>
            <div className="bully-word bully-2 absolute top-[35%] right-[5%] max-w-[400px] md:max-w-[400px] rotate-3">
                <p className="text-lg md:text-2xl font-bold text-orange-400 bg-black/60 p-3 rounded-lg backdrop-blur-sm border border-orange-400/50 shadow-lg text-center leading-snug">
                    "สงสัยคงคิดว่า<br/>ตัวเองจะเป็นแบบ<br/>ท่าน <span className="text-yellow-300">“จอมปราชญ์ไร้เสียง”</span><br/>ได้สิท่า"
                </p>
            </div>
            <div className="bully-word bully-3 absolute top-[15%] left-1/2 -translate-x-1/2 max-w-[600px] md:max-w-[600px]">
                 <p className="text-xl md:text-3xl font-black text-yellow-400 drop-shadow-[0_2px_4px_rgba(0,0,0,1)] stroke-black text-center leading-tight">
                    "งานประจำปีอย่าคิดไปลงเชียวนะ!<br/>
                    <span className="text-red-500 text-lg md:text-2xl font-bold mt-2 block">
                        เดี๋ยวพวกฉันเสียชื่อ<br/>ที่มีเพื่อนร่วมชั้น...<br/>ไร้ความสามารถแบบเธอ!"
                    </span>
                </p>
            </div>
            <div className="bully-laugh absolute inset-0 flex items-center justify-center z-[-1]">
                <h1 className="text-[100px] md:text-[150px] font-black leading-none tracking-tighter text-white opacity-20">HAHA</h1>
            </div>
        </div>

        {/* --- HONEY SECTION --- */}
        <div className="honey-group absolute bottom-0 left-0 z-40 h-[500px] w-[300px] md:left-20">
          <div className="relative h-full w-full">
            <img src="/assets/Part2/Honey/Body.PNG" className="absolute bottom-0 left-0 w-full object-contain" alt="Honey Body" />

            {/* Faces */}
            <img src="/assets/Part2/Honey/Scare_Face.PNG" className="honey-face-scare absolute left-1/2 top-[115px] w-[320px] -translate-x-1/2 object-contain" alt="Scare" />
            <img src="/assets/Part2/Honey/Worry_Face.PNG" className="honey-face-worry absolute left-1/2 top-[115px] w-[320px] -translate-x-1/2 object-contain" alt="Worry" />
            <img src="/assets/Part2/Honey/Normal_Face.PNG" className="honey-face-normal absolute left-1/2 top-[115px] w-[320px] -translate-x-1/2 object-contain" alt="Normal" />

            {/* Bubble */}
            <div className="honey-bubble absolute -right-[180px] -top-[140px] w-[280px] md:w-[320px] origin-bottom-left rounded-[30px] border-4 border-yellow-400 bg-white p-6 text-black shadow-2xl z-50 flex items-center justify-center min-h-[150px]">
               <div className="relative w-full h-full">
                   <div className="honey-text-1 absolute inset-0 flex flex-col items-center justify-center">
                       <p className="font-serif text-base md:text-lg leading-snug font-bold text-center">
                          " เอ๊ะ.. นั่นมายด์รึป่าว?<br/>ทำไมเหมือนโดนแกล้ง... "
                       </p>
                   </div>
                   <div className="honey-text-2 absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-gray-600 text-sm font-normal block italic text-center">
                          " นี่มันเหมือนกับเรา<br/>เมื่อก่อนเลย... <br/>มายด์ต้องรู้สึกแย่มากแน่ๆ "
                      </span>
                   </div>
                   <div className="honey-text-3 absolute inset-0 flex flex-col items-center justify-center">
                       <span className="text-red-600 text-lg block font-black bg-yellow-100 rounded-lg p-1 text-center">
                          " หรือเราควรจะสอนมายด์ดู!<br/>...เดี๋ยวเสร็จธุระแล้ว<br/>รีบมาหาดีกว่า! "
                      </span>
                   </div>
               </div>
               <div className="absolute -bottom-3 -left-2 h-6 w-6 rounded-full bg-white"></div>
               <div className="absolute -bottom-6 -left-6 h-3 w-3 rounded-full bg-white"></div>
            </div>
          </div>
        </div>

        {/* Black Overlay */}
        <div className="black-overlay pointer-events-none absolute inset-0 z-50 bg-black flex items-center justify-center">
             <div className="text-center opacity-0 magic-text">
                 <p className="text-white italic">&lt; หลังจากฮันนี่เสร็จธุระแล้ว &gt;</p>
             </div>
        </div>

      </div>
    </div>
  )
}