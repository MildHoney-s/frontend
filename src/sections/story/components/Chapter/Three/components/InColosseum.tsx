import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  onComplete?: () => void
}

export default function InColosseum({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // --- INITIAL SETUP ---
      gsap.set('.colosseum-in-bg', {
        scale: 1.2,
        transformOrigin: 'center top',
      })

      // =========================================
      // ✅ PAN DOWN ANIMATION
      // =========================================
      gsap.fromTo(
        '.colosseum-in-bg',
        {
          yPercent: 0,
        },
        {
          yPercent: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
        },
      )

      // Trigger จบ Scene
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'bottom bottom',
        onEnter: () => {
          if (onComplete) onComplete()
        },
      })
    }, containerRef)
    return () => ctx.revert()
  }, [onComplete])

  return (
    <div ref={containerRef} className="relative h-[200vh] w-full bg-black">
      <div className="sticky left-0 top-0 h-screen w-full overflow-hidden font-sans">
        {/* Background Layer */}
        <div
          className="colosseum-in-bg absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/assets/part3/BG/bg_colosseum_in.png')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
        </div>

        {/* --- CHARACTER LAYER --- */}
        {/* ใช้ pointer-events-none เพื่อให้คลิกทะลุไปโดน Background ได้ (ถ้ามี Interaction) */}
        <div className="pointer-events-none absolute inset-0 z-10">
          {/* --- MILD --- */}
          {/* ✅ แก้ไข: ใช้ Position Absolute ระบุพิกัดตรงๆ */}
          <div
            className="mild-group /* ชิดล่าง
            */             /* ชิดซ้าย (ขยับมา
            2%            ไม่ให้ชิดขอบจอเกินไป) */ /* จอใหญ่ขยับเข้ามาอีกหน่อย */ /*
            ดันลงไปข้างล่างนิดนึงให้ดูเหมือนยืนอยู่ต่ำกว่าขอบจอ         */ absolute bottom-[4%]
            left-[5%]       z-20 h-[500px] w-[280px]
            
            translate-y-10 md:left-[25%] 
            md:h-[600px] md:w-[350px]"
          >
            <div className="mild-body-img relative h-full w-full">
              {/* Body Base */}
              <img
                src="/assets/Part2/Mild/Body/Hair.PNG"
                className="absolute left-0 top-0 z-0 w-full"
                alt="Hair"
              />
              <img
                src="/assets/Part2/Mild/Body/Body_1.PNG"
                className="absolute left-0 top-0 z-10 w-full"
                alt="Body"
              />

              {/* Arm Set 1 */}
              <img
                src="/assets/Part2/Mild/Arms/Arm_2_L.PNG"
                className="mild-arm-2-l absolute left-0 top-0 z-20 w-full"
                alt="L Arm 2"
              />
              <img
                src="/assets/Part2/Mild/Arms/Arm_2_R.PNG"
                className="mild-arm-2-r absolute left-0 top-0 z-20 w-full"
                alt="R Arm 2"
              />

              {/* Arm Set 2 */}
              <img
                src="/assets/Part2/Mild/Arms/Arm_1_L.PNG"
                className="mild-arm-1-l absolute left-0 top-0 z-20 w-full opacity-0"
                alt="L Arm 1"
              />
              <img
                src="/assets/Part2/Mild/Arms/Arm_milktea_R.PNG"
                className="mild-arm-milktea-r absolute left-0 top-0 z-40 w-full opacity-0"
                alt="R Arm MilkTea"
              />

              {/* Face */}
              <div className="absolute left-0 top-[1%] z-30 w-full">
                <img
                  src="/assets/Part2/Mild/Face/Face_05_หน้าเศร้า.PNG"
                  className="mild-face-worry w-full object-contain"
                  alt="Worry"
                />
                <img
                  src="/assets/Part2/Mild/Face/Face_02_หน้ายิ้ม.PNG"
                  className="mild-face-happy absolute left-0 top-0 w-full object-contain opacity-0"
                  alt="Happy"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 z-10">
          {/* --- HONEY --- */}
          {/* ✅ แก้ไข: ใช้ Position Absolute ระบุพิกัดตรงๆ */}
          <div
            className="honey-group /* ชิดล่าง
            */             /* ชิดซ้าย (ขยับมา
            2%            ไม่ให้ชิดขอบจอเกินไป) */ /* จอใหญ่ขยับเข้ามาอีกหน่อย */ /*
            ดันลงไปข้างล่างนิดนึงให้ดูเหมือนยืนอยู่ต่ำกว่าขอบจอ         */ absolute bottom-[-2%]
            left-[5%]       z-20 h-[500px] w-[280px]
            
            translate-y-10 md:left-[60%] 
            md:h-[600px] md:w-[350px]"
          >
            <div className="honey-body-img relative h-full w-full">
              {/* Body Base */}
              <img
                src="/assets/Part2/Honey/Normal_Face.PNG"
                className="absolute left-0 top-0 z-20 w-full"
                alt="Face"
              />
              <img
                src="/assets/Part2/Honey/Body.PNG"
                className="absolute left-0 top-0 z-10 w-full"
                alt="Body"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
