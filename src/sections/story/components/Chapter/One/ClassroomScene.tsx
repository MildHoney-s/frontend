import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  onComplete: () => void
}

// ----------------------------------------------------------------------

export default function ClassroomScene({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const root = containerRef.current!
      // -------------------------
      // Intro overlay (ณ ห้องเรียน) fade out while scrolling ลงนิดหน่อย
      gsap.to('.intro-overlay', {
        autoAlpha: 0,
        y: -30,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: '+=220',
          scrub: true,
        },
      })

      // -------------------------
      // Teacher entrance
      const teacherTl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top top+=200',
          toggleActions: 'play none none reverse',
        },
      })

      teacherTl.fromTo(
        '.teacher-wrap',
        { x: -120, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 1, ease: 'power2.out' },
      )

      // -------------------------
      // speech bubble (อาจารย์) appear เมื่อ scroll มาถึงจุด
      ScrollTrigger.create({
        trigger: '.trigger-lecture',
        start: 'top 65%',
        onEnter: () => {
          gsap.to('.bubble-teacher', {
            scale: 1,
            autoAlpha: 1,
            duration: 0.6,
            ease: 'back.out(1.7)',
          })
        },
        onLeaveBack: () => {
          gsap.to('.bubble-teacher', {
            scale: 0.8,
            autoAlpha: 0,
            duration: 0.3,
          })
        },
      })

      // -------------------------
      // STUDENT SEQUENCE:
      // เปลี่ยน BG + โชว์นักเรียน + ฟองคำพูดเพื่อนๆ
      ScrollTrigger.create({
        trigger: '.trigger-student',
        start: 'top 65%',
        onEnter: () => {
          // เปลี่ยนจาก BG อาจารย์ -> BG นักเรียน
          gsap.to('.bg-teacher', { autoAlpha: 0, duration: 0.6 })
          gsap.to('.bg-students', { autoAlpha: 1, duration: 0.6 })

          // ซ่อนครู
          gsap.to('.teacher-wrap', { autoAlpha: 0, duration: 0.4 })

          // โชว์กลุ่มนักเรียน
          gsap.to('.student-group', {
            autoAlpha: 1,
            duration: 0.6,
          })

          // โชว์ bubble นักเรียน
          gsap.to('.bubble-student', {
            scale: 1,
            autoAlpha: 1,
            duration: 0.6,
            ease: 'back.out(1.7)',
          })

          // ซ่อน bubble อาจารย์
          gsap.to('.bubble-teacher', {
            autoAlpha: 0,
            scale: 0.8,
            duration: 0.3,
          })
        },
        onLeaveBack: () => {
          // กลับเป็นฉากอาจารย์
          gsap.to('.bg-teacher', { autoAlpha: 1, duration: 0.4 })
          gsap.to('.bg-students', { autoAlpha: 0, duration: 0.4 })

          // กลับมาโชว์ครู
          gsap.to('.teacher-wrap', { autoAlpha: 1, duration: 0.4 })

          gsap.to('.student-group', { autoAlpha: 0, duration: 0.3 })

          gsap.to('.bubble-student', {
            scale: 0.8,
            autoAlpha: 0,
            duration: 0.3,
          })

          gsap.to('.bubble-teacher', {
            scale: 1,
            autoAlpha: 1,
            duration: 0.4,
          })
        },
      })

      // -------------------------
      // finish -> call onComplete when chapter view scrolled to bottom
      ScrollTrigger.create({
        trigger: root,
        start: 'bottom bottom',
        onEnter: () => onComplete(),
      })
    }, containerRef)

    return () => ctx.revert()
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className="relative h-[420vh] w-full bg-black text-white"
    >
      {/* Sticky area */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background 1: ห้องเรียน (ตอนอาจารย์พูด) */}
        <div
          className="bg-teacher absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/assets/Part1/classroom/Classroom_2.png')",
          }}
        />

        {/* Background 2: ชั้นหนังสือ (ตอนนักเรียนพูด) */}
        <div
          className="bg-students absolute inset-0 bg-cover bg-center opacity-0"
          style={{
            backgroundImage: "url('/assets/Part1/classroom/Classroom_1.png')",
          }}
        />

        {/* Intro overlay: "ณ ห้องเรียนเวทมนตร์" */}
        <div className="intro-overlay absolute inset-0 z-40 flex items-start justify-center bg-black/30 pt-24 backdrop-blur-sm">
          <h1 className="text-4xl text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.35)] md:text-6xl">
            ณ ห้องเรียนเวทมนตร์
          </h1>
        </div>

        {/* Teacher - ยืนหน้าห้องข้างโต๊ะ */}
        <div className="teacher-wrap absolute bottom-[40%] right-[2%] z-30 opacity-0">
          <div className="relative w-64 md:w-72">
            <img
              src="/assets/Part1/classroom/Xoneko_Sensei_open.png"
              alt="teacher"
              className="block w-full"
            />
          </div>
        </div>

        {/* Teacher speech bubble */}
        <div className="bubble-teacher absolute right-[8%] top-[18%] z-40 max-w-[420px] origin-top-right scale-75 rounded-xl bg-white p-6 text-black opacity-0 shadow-lg after:absolute after:bottom-[-20px] after:right-6 after:border-[10px] after:border-transparent after:border-t-white after:content-['']">
          <p className="font-bold">อาจารย์:</p>
          <p>
            “ก็อย่างที่สอนข้างต้นไป เวทมนตร์นั้น เราต้องร่ายออกมาให้ชัดเจน
            เพื่อที่จะทำให้ตัวเวทมนตร์นั้นแสดงผลออกมาได้อย่างมีประสิทธิภาพ”
          </p>
        </div>

        {/* ===== STUDENT GROUP (โชว์ตอน BG เปลี่ยน) ===== */}
        <div className="student-group pointer-events-none absolute inset-0 z-30 opacity-0">
          {/* Mild (กลาง) */}
          <div className="student mild absolute left-[63%] top-[56%] -translate-x-1/2 -translate-y-1/2">
            <img
              src="/assets/Part1/classroom/MildR_front.png"
              className="w-56"
              alt="mild-r"
            />
          </div>

          {/* Elevene (ซ้ายสุด – บนบันได) */}
          <div className="student elevene absolute right-[-14%] top-[88%] -translate-x-1/2 -translate-y-1/2">
            <img
              src="/assets/Part1/classroom/Elevene_front.png"
              className="w-64"
              alt="elevene"
            />
          </div>

          {/* Elze (ขวากลาง) */}
          <div className="student elze absolute left-[77%] top-[21%] -translate-x-1/2 -translate-y-1/2">
            <img
              src="/assets/Part1/classroom/Elze_front.png"
              className="w-64"
              alt="elze"
            />
          </div>
        </div>

        {/* Student speech bubble */}
        <div
          className="bubble-student absolute left-[24%] top-[6%] z-40 max-w-[520px] origin-top-left scale-75 rounded-xl bg-white p-6 text-black opacity-0 shadow-lg
                        after:absolute after:bottom-[-16px] after:right-2 after:border-[10px] after:border-transparent after:border-t-white after:content-['']"
        >
          <p className="font-bold">เพื่อนๆ:</p>
          <p>
            “อาจารย์คะ แบบนี้ถ้าคนที่แม้แต่พูดปกติยังพูดให้ชัดไม่ได้เลย
            แล้วกับการร่ายเวทมนตร์จะไม่มีปัญหาหรอคะ
            ก็มีแต่คนที่ร่ายเวทได้เท่านั้นสิคะ ถึงจะใช้เวทมนตร์ได้”
          </p>
        </div>

        <div className="pointer-events-none absolute inset-0" />
      </div>

      {/* trigger ให้ bubble อาจารย์โผล่หลังเลื่อนลงไปหน่อย */}
      <div className="trigger-lecture absolute top-[120vh] h-[10px] w-full" />

      {/* trigger สำหรับบทพูดนักเรียน + เปลี่ยนฉาก */}
      <div className="trigger-student absolute top-[220vh] h-[10px] w-full" />
    </div>
  )
}
