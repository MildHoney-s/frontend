import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  onComplete: () => void
}

// ----------------------------------------------------------------------

export default function SchoolScene({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // --- 1. INTRO SEQUENCE ---
      gsap.to('.intro-overlay', {
        autoAlpha: 0,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200',
          scrub: true,
        },
      })

      // --- 2. CHARACTER ENTRANCE ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top+=300',
        },
      })

      tl.fromTo(
        '.honey-character',
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.5, ease: 'power2.out' },
      )

      // Setup
      gsap.set(['.bubble-1', '.bubble-middle', '.bubble-2'], {
        scale: 0,
        opacity: 0,
        transformOrigin: 'bottom left',
      })
      gsap.set('.face-worry, .face-sweat', { autoAlpha: 0 })
      gsap.set('.face-normal', { autoAlpha: 1 })
      gsap.set('.arena-bg-img', { autoAlpha: 0 })
      gsap.set('.lost-text', { autoAlpha: 0, scale: 0.5 })

      // --- TRIGGER 1: WORRY ---
      ScrollTrigger.create({
        trigger: '.trigger-1',
        start: 'top 60%',
        onEnter: () => {
          gsap.to('.face-normal', {
            autoAlpha: 0,
            duration: 0.3,
            overwrite: true,
          })
          gsap.to('.face-worry', {
            autoAlpha: 1,
            duration: 0.3,
            overwrite: true,
          })
          gsap.to('.bubble-1', {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(1.7)',
            overwrite: true,
          })
          gsap.to('.bubble-middle', {
            scale: 0,
            opacity: 0,
            duration: 0.1,
            overwrite: true,
          })
        },
        onLeaveBack: () => {
          gsap.to('.face-normal', {
            autoAlpha: 1,
            duration: 0.3,
            overwrite: true,
          })
          gsap.to('.face-worry', {
            autoAlpha: 0,
            duration: 0.3,
            overwrite: true,
          })
          gsap.to('.bubble-1', {
            scale: 0,
            opacity: 0,
            duration: 0.3,
            overwrite: true,
          })
        },
      })

      // --- TRIGGER MIDDLE ---
      ScrollTrigger.create({
        trigger: '.trigger-middle',
        start: 'top 60%',
        onEnter: () => {
          gsap.to('.face-worry', {
            autoAlpha: 0,
            duration: 0.3,
            overwrite: true,
          })
          gsap.to('.face-normal', {
            autoAlpha: 1,
            duration: 0.3,
            overwrite: true,
          })
          gsap.to('.bubble-1', {
            scale: 0,
            opacity: 0,
            duration: 0.2,
            overwrite: true,
          })
          gsap.to('.bubble-middle', {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(1.7)',
            delay: 0.1,
            overwrite: true,
          })
          gsap.to('.bubble-2', {
            scale: 0,
            opacity: 0,
            duration: 0.1,
            overwrite: true,
          })
        },
        onLeaveBack: () => {
          gsap.to('.face-normal', {
            autoAlpha: 0,
            duration: 0.3,
            overwrite: true,
          })
          gsap.to('.face-worry', {
            autoAlpha: 1,
            duration: 0.3,
            overwrite: true,
          })
          gsap.to('.bubble-middle', {
            scale: 0,
            opacity: 0,
            duration: 0.2,
            overwrite: true,
          })
          gsap.to('.bubble-1', {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            delay: 0.1,
            overwrite: true,
          })
        },
      })

      // --- TRIGGER 2: SWEAT ---
      ScrollTrigger.create({
        trigger: '.trigger-2',
        start: 'top 60%',
        onEnter: () => {
          gsap.to('.face-normal', {
            autoAlpha: 0,
            duration: 0.2,
            overwrite: true,
          })
          gsap.to('.face-sweat', {
            autoAlpha: 1,
            duration: 0.2,
            overwrite: true,
          })
          gsap.to('.honey-face-group', {
            rotation: 5,
            duration: 0.5,
            overwrite: true,
          })
          gsap.to('.bubble-middle', {
            scale: 0,
            opacity: 0,
            duration: 0.2,
            overwrite: true,
          })
          gsap.to('.bubble-2', {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(1.7)',
            delay: 0.1,
            overwrite: true,
          })
        },
        onLeaveBack: () => {
          gsap.to('.face-sweat', {
            autoAlpha: 0,
            duration: 0.2,
            overwrite: true,
          })
          gsap.to('.face-normal', {
            autoAlpha: 1,
            duration: 0.2,
            overwrite: true,
          })
          gsap.to('.honey-face-group', {
            rotation: 0,
            duration: 0.5,
            overwrite: true,
          })
          gsap.to('.bubble-2', {
            scale: 0,
            opacity: 0,
            duration: 0.2,
            overwrite: true,
          })
          gsap.to('.bubble-middle', {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            delay: 0.1,
            overwrite: true,
          })
        },
      })

      // --- TRIGGER 3: WALKING LOST (เข้า Arena) ---
      ScrollTrigger.create({
        trigger: '.trigger-3',
        start: 'top 60%',
        onEnter: () => {
          // เอา overwrite: true ออก เพื่อไม่ให้ background panning หยุดชะงัก
          gsap.to('.school-bg-img', { autoAlpha: 0, duration: 1 })
          gsap.to('.arena-bg-img', { autoAlpha: 1, duration: 1 })

          gsap.to('.lost-text', {
            autoAlpha: 1,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
            overwrite: true,
          })
          gsap.to('.bubble-2', {
            scale: 0,
            opacity: 0,
            duration: 0.3,
            overwrite: true,
          })
        },
        onLeaveBack: () => {
          gsap.to('.school-bg-img', { autoAlpha: 1, duration: 1 })
          gsap.to('.arena-bg-img', { autoAlpha: 0, duration: 1 })

          gsap.to('.lost-text', {
            autoAlpha: 0,
            scale: 0.5,
            duration: 0.5,
            overwrite: true,
          })
          gsap.to('.bubble-2', {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            overwrite: true,
          })
        },
      })

      // --- TRIGGER 4: EXIT SCENE (ออกจาก Arena -> มืดสนิท) ---
      // ✅ เพิ่มส่วนนี้ครับ: เมื่อไถเกือบสุดทาง ให้ทุกอย่าง Fade Out เป็นสีดำ
      ScrollTrigger.create({
        trigger: '.trigger-exit',
        start: 'top 80%', // เริ่ม Fade Out ก่อนจบ Scene นิดหน่อย
        onEnter: () => {
          // สั่งทุกอย่างให้หายไป
          gsap.to(['.arena-bg-img', '.lost-text', '.honey-character'], {
            autoAlpha: 0,
            duration: 1,
            ease: 'power1.inOut',
            overwrite: true, // บังคับให้หายไปเลย
          })
        },
        onLeaveBack: () => {
          // ถ้าไถกลับขึ้นมา ให้โชว์กลับมา
          gsap.to(['.arena-bg-img', '.lost-text', '.honey-character'], {
            autoAlpha: 1,
            duration: 0.5,
            overwrite: true,
          })
        },
      })

      // --- ANIMATION เดิน ---
      gsap.to('.honey-body', {
        scaleY: 1.02,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      gsap.to('.honey-character-container', {
        x: 650,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      })

      gsap.to(['.school-bg-img', '.arena-bg-img'], {
        yPercent: 10,
        xPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      })

      // จบ Scene
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'bottom bottom',
        onEnter: () => onComplete(),
      })
    }, containerRef)
    return () => ctx.revert()
  }, [onComplete])

  return (
    // เพิ่มความสูงอีกนิดเป็น 480vh เพื่อเผื่อที่ให้ Fade Out ตอนจบ
    <div ref={containerRef} className="relative h-[480vh] w-full bg-black">
      <div className="sticky left-0 top-0 h-screen w-full overflow-hidden">
        {/* Backgrounds */}
        <div className="school-img-container relative h-full w-full">
          <div
            className="school-bg-img absolute inset-0 origin-left scale-125 bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/Part2/Hall_School.png')" }}
          />
          <div
            className="arena-bg-img absolute inset-0 origin-left scale-125 bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/Part2/arena.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
        </div>

        {/* Character + Bubbles */}
        <div className="honey-character-container absolute bottom-0 left-0 z-20 h-[500px] w-[300px] md:left-20">
          <div className="honey-character relative h-full w-full opacity-0">
            <img
              src="/assets/Part2/Honey/Body.PNG"
              className="honey-body absolute bottom-0 left-0 w-full origin-bottom object-contain"
            />

            <div className="honey-face-group absolute left-1/2 top-[95px] w-[320px] origin-bottom -translate-x-1/2">
              <img
                src="/assets/Part2/Honey/Normal_Face.PNG"
                className="face-normal absolute left-0 top-0 w-full object-contain"
              />
              <img
                src="/assets/Part2/Honey/Worry_Face.PNG"
                className="face-worry absolute left-0 top-0 w-full object-contain opacity-0"
              />
              <img
                src="/assets/Part2/Honey/Sweat_Face.PNG"
                className="face-sweat absolute left-0 top-0 w-full object-contain opacity-0"
              />
            </div>

            {/* Bubbles */}
            <div className="bubble-1 absolute -right-[150px] -top-[60px] z-30 w-[300px] origin-bottom-left scale-0 rounded-[30px] border-4 border-gray-100 bg-white p-6 text-black opacity-0 shadow-xl">
              <p className="font-serif text-lg font-medium leading-relaxed">
                " เห้อ... ตาลุงนั่นชอบใช้ให้ไปทำเรื่องที่วุ่นวายตลอดเลย "
              </p>
              <div className="absolute -bottom-2 -left-2 h-6 w-6 rounded-full bg-white"></div>
              <div className="absolute -bottom-5 -left-6 h-3 w-3 rounded-full bg-white"></div>
            </div>

            <div className="bubble-middle absolute -right-[180px] -top-[80px] z-30 w-[300px] origin-bottom-left scale-0 rounded-[30px] border-4 border-gray-100 bg-white p-6 text-black opacity-0 shadow-xl">
              <p className="font-serif text-lg font-medium leading-relaxed">
                " จะว่าไปไม่ได้กลับมาซะนาน... <br />
                <span className="font-bold text-blue-600">
                  ที่นี่เองก็เปลี่ยนไปเยอะเหมือนกันนะ
                </span>{' '}
                "
              </p>
              <div className="absolute -bottom-2 -left-2 h-6 w-6 rounded-full bg-white"></div>
              <div className="absolute -bottom-5 -left-6 h-3 w-3 rounded-full bg-white"></div>
            </div>

            <div className="bubble-2 absolute -right-[150px] -top-[50px] z-30 w-[300px] origin-bottom-left scale-0 rounded-[30px] border-4 border-gray-100 bg-white p-6 text-black opacity-0 shadow-xl">
              <p className="text-center font-serif text-2xl font-bold leading-relaxed">
                " แล้วห้องอาจารย์ใหญ่ <br />
                <span className="text-red-500">ไปทางไหนเนี่ย?</span> "
              </p>
              <div className="absolute -bottom-2 -left-2 h-6 w-6 rounded-full bg-white"></div>
              <div className="absolute -bottom-5 -left-6 h-3 w-3 rounded-full bg-white"></div>
            </div>
          </div>
        </div>

        {/* Lost Text */}
        <div className="lost-text pointer-events-none absolute inset-0 z-40 flex items-center justify-center opacity-0">
          <div className="animate-float -translate-y-32 space-y-6 text-center">
            <h2 className="text-8xl font-black text-white/80 blur-[2px] drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] md:text-9xl">
              . . .
            </h2>
            <p className="text-white-300 text-2xl font-light uppercase tracking-widest opacity-70">
              ( หลงทางซะแล้ว )
            </p>
          </div>
        </div>

        {/* Intro Overlay */}
        <div className="intro-overlay absolute inset-0 z-50 flex items-center justify-center bg-black">
          <h1 className="animate-pulse font-serif text-4xl tracking-widest text-white md:text-6xl">
            โรงเรียนเวทมนตร์
          </h1>
        </div>
      </div>

      {/* --- SCROLL TRIGGERS --- */}
      <div className="trigger-1 absolute top-[100vh] h-[10px] w-full bg-transparent"></div>
      <div className="trigger-middle absolute top-[190vh] h-[10px] w-full bg-transparent"></div>
      <div className="trigger-2 absolute top-[280vh] h-[10px] w-full bg-transparent"></div>
      <div className="trigger-3 absolute top-[360vh] h-[10px] w-full bg-transparent"></div>

      {/* Trigger Exit: อยู่ท้ายสุด เพื่อ Fade Out ทุกอย่าง */}
      <div className="trigger-exit absolute top-[440vh] h-[10px] w-full bg-transparent"></div>
    </div>
  )
}
