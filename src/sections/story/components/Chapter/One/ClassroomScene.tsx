import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  onComplete: () => void
}

export default function ClassroomScene({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // --- SETUP ---
      gsap.set('.teacher-group', { x: -50, autoAlpha: 0 })
      gsap.set('.student-group', { autoAlpha: 0 })
      gsap.set('.bg-students', { autoAlpha: 0 })
      gsap.set(['.bubble-teacher', '.bubble-student'], {
        scale: 0,
        autoAlpha: 0,
        transformOrigin: 'bottom left',
      })

      // Text Setup
      // ครูรอบแรก: ให้ค่อย ๆ โผล่
      gsap.set('.text-t-1', { autoAlpha: 0, y: 15 })
      // ชุดที่สองของครู (สามประโยค) ซ่อนไว้ก่อน
      gsap.set('.text-t-2', { autoAlpha: 0 })
      gsap.set(['.final-line-1', '.final-line-2', '.final-line-3'], {
        autoAlpha: 0,
        y: 15,
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=5500', // ยืด/หดความยาวซีนได้ที่นี่
          scrub: 1.2, // ยิ่งมากยิ่งหนืด
          pin: true,
          // markers: true,
          onLeave: () => {
            requestAnimationFrame(() => onComplete?.())
          },
        },
      })

      // ===================== STEP 1: TEACHER ENTER =====================
      tl.add('intro')

      tl.to('.intro-overlay', { autoAlpha: 0, duration: 1.5 }, 'intro')
      tl.to(
        '.teacher-group',
        { x: 0, autoAlpha: 1, duration: 2, ease: 'power2.out' },
        'intro+=0.2',
      )
      tl.to(
        '.bubble-teacher',
        { scale: 1, autoAlpha: 1, duration: 1.2, ease: 'back.out(1.4)' },
        'intro+=0.6',
      )

      // ข้อความครูรอบแรกค่อย ๆ เลื่อนขึ้น + fade-in
      tl.to(
        '.text-t-1',
        {
          autoAlpha: 1,
          y: 0,
          duration: 2,
          ease: 'power2.out',
        },
        'intro+=0.8',
      )

      // เวลาสำหรับให้คนอ่าน (ขึ้นกับ scroll เพราะมี scrub)
      tl.to({}, { duration: 2 })

      // ===================== STEP 2: SWITCH TO STUDENTS =====================
      tl.add('toStudents')

      tl.to(
        ['.teacher-group', '.bubble-teacher'],
        { autoAlpha: 0, duration: 1.5 },
        'toStudents',
      )
      tl.to('.bg-teacher', { autoAlpha: 0, duration: 1.5 }, 'toStudents')
      tl.to('.bg-students', { autoAlpha: 1, duration: 1.5 }, 'toStudents')
      tl.to(
        '.student-group',
        { autoAlpha: 1, duration: 1.5, ease: 'power2.out' },
        'toStudents+=0.2',
      )
      tl.to(
        '.bubble-student',
        {
          scale: 1,
          autoAlpha: 1,
          duration: 1.2,
          ease: 'back.out(1.4)',
        },
        'toStudents+=0.4',
      )

      tl.to({}, { duration: 2.5 }) // เวลาอ่านของเพื่อน ๆ

      // ===================== STEP 3: BACK TO TEACHER =====================
      tl.add('backToTeacher')

      tl.to(
        ['.student-group', '.bubble-student'],
        { autoAlpha: 0, duration: 1.5 },
        'backToTeacher',
      )
      tl.to('.bg-students', { autoAlpha: 0, duration: 1.5 }, 'backToTeacher')
      tl.to('.bg-teacher', { autoAlpha: 1, duration: 1.5 }, 'backToTeacher')
      tl.to(
        '.teacher-group',
        { autoAlpha: 1, duration: 1.5, ease: 'power2.out' },
        'backToTeacher+=0.2',
      )

      // ซ่อน text ชุดแรก แล้วโชว์ container ของ text ชุดสอง
      tl.to('.text-t-1', { autoAlpha: 0, duration: 0.8 }, 'backToTeacher+=0.5')
      tl.to('.text-t-2', { autoAlpha: 1, duration: 0.8 }, 'backToTeacher+=0.5')

      tl.to(
        '.bubble-teacher',
        { scale: 1, autoAlpha: 1, duration: 1.2, ease: 'back.out(1.4)' },
        'backToTeacher+=0.7',
      )

      // ===================== STEP 4: FINAL SENTENCES =====================

      // ประโยค 1
      tl.add('final1')
      tl.to(
        '.final-line-1',
        {
          autoAlpha: 1,
          y: 0,
          duration: 2,
          ease: 'power2.out',
        },
        'final1',
      )
      tl.to({}, { duration: 2 })
      tl.to('.final-line-1', { autoAlpha: 0, y: -10, duration: 0.8 })

      // ประโยค 2
      tl.add('final2')
      tl.to(
        '.final-line-2',
        {
          autoAlpha: 1,
          y: 0,
          duration: 2,
          ease: 'power2.out',
        },
        'final2',
      )
      tl.to({}, { duration: 2 })
      tl.to('.final-line-2', { autoAlpha: 0, y: -10, duration: 0.8 })

      // ประโยค 3 (ค้างไว้จบฉาก)
      tl.add('final3')
      tl.to(
        '.final-line-3',
        {
          autoAlpha: 1,
          y: 0,
          duration: 2,
          ease: 'power2.out',
        },
        'final3',
      )
      tl.to({}, { duration: 3 })
    }, containerRef)

    return () => ctx.revert()
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black text-white"
    >
      {/* BACKGROUNDS */}
      <div
        className="bg-teacher will-change-opacity absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/Part1/classroom/Classroom_2.png')",
        }}
      />
      <div
        className="bg-students will-change-opacity absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/assets/Part1/classroom/Classroom_2_edit.png')",
        }}
      />

      {/* INTRO OVERLAY */}
      <div className="intro-overlay pointer-events-none absolute inset-0 z-50 flex items-start justify-center bg-black/60 pt-24 backdrop-blur-sm">
        <h1 className="text-4xl font-bold tracking-widest text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] md:text-6xl">
          ณ ห้องเรียนเวทมนตร์
        </h1>
      </div>

      {/* TEACHER GROUP */}
      <div className="teacher-group absolute bottom-[10%] right-[5%] z-10 w-[280px] md:bottom-[38%] md:right-[10%] md:w-[350px]">
        <img
          src="/assets/Part1/classroom/Xoneko_Sensei_open.png"
          alt="teacher"
          className="w-full drop-shadow-2xl"
        />

        {/* TEACHER BUBBLE */}
        <div
          className="bubble-teacher absolute -left-[180px] -top-[80px] z-20 min-h-[110px] w-[300px] 
                     origin-bottom-right rounded-2xl bg-white p-6 text-black shadow-xl
                     after:absolute after:bottom-[-20px] after:right-10 after:border-[15px]
                     after:border-transparent after:border-t-white after:content-['']
                     md:w-[400px]"
        >
          <div className="relative h-full w-full">
            {/* Text Set 1 */}
            <div className="text-t-1 left-0 top-0 w-full">
              <p className="text-sm leading-relaxed text-gray-800 md:text-base">
                “ก็อย่างที่สอนข้างต้นไป เวทมนตร์นั้น เราต้องร่ายออกมาให้ชัดเจน
                เพื่อที่จะทำให้ตัวเวทมนตร์นั้นแสดงผลออกมาได้อย่างมีประสิทธิภาพ”
              </p>
            </div>

            {/* Text Set 2 */}
            <div className="text-t-2 left-0 top-0 h-full w-full">
              {/* ประโยคย่อย 1 */}
              <div className="final-line final-line-1 absolute left-0 top-0 w-full">
                <p className="text-sm leading-relaxed text-gray-800 md:text-base">
                  “ก็ใช่ว่าจะเป็นไปไม่ได้นะ อย่าง 1 ในนักปราชญ์
                  มีอยู่คนนึงสามารถใช้เวทโดยไม่ต้องร่ายเลยด้วยซ้ำ
                  แต่มันเป็นศาสตร์ขั้นสูงเลยล่ะ”
                </p>
              </div>

              {/* ประโยคย่อย 2 */}
              <div className="final-line final-line-2 absolute left-0 top-0 w-full">
                <p className="text-sm leading-relaxed text-gray-800 md:text-base">
                  “อาจารย์คิดว่านักเรียนมีศักยภาพพอ... เพราะงั้นทุกคนจงพยายาม
                  เป็น{' '}
                  <strong className="text-purple-600">จอมเวทผู้ยิ่งใหญ่</strong>{' '}
                  อย่างจอมเวทไร้ร่ายให้ได้ละ”
                </p>
              </div>

              {/* ประโยคย่อย 3 */}
              <div className="final-line final-line-3 absolute left-0 top-0 flex w-full flex-col justify-center text-center">
                <p className="text-sm text-gray-800 md:text-base">
                  “เอาล่ะ บทเรียนวันนี้จบแล้ว อีก 4 เดือนจะมีงานแข่ง...”
                </p>
                <p className="text-md mt-2 font-bold text-red-500">
                  “เพราะงั้นแยกย้ายกลับบ้านกันได้แล้ว!”
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STUDENT GROUP */}
      <div className="student-group pointer-events-none absolute inset-0 z-10">
        {/* <img
          src="/assets/Part1/classroom/MildR_front.png"
          className="absolute right-[23%] top-[37%] w-[200px] md:w-[280px]"
          alt="mild"
        />
        <img
          src="/assets/Part1/classroom/Elevene_front.png"
          className="absolute left-[73%] top-[67%] z-20 w-[220px] md:w-[300px]"
          alt="elevene"
        />
        <img
          src="/assets/Part1/classroom/Elze_front.png"
          className="absolute right-[15%] top-[2%] w-[210px] md:w-[290px]"
          alt="elze"
        /> */}

        {/* STUDENT BUBBLE */}
        <div
          className="bubble-student absolute left-[25%] top-[5%] w-[300px]
                     origin-bottom-left rounded-2xl bg-white p-6 text-black shadow-xl
                     after:absolute after:bottom-[-20px] after:right-10 after:border-[15px]
                     after:border-transparent after:border-t-white after:content-['']
                     md:left-[20%] md:w-[450px]"
        >
          <p className="text-sm leading-relaxed text-gray-700 md:text-base">
            “อาจารย์คะ แบบนี้ถ้าคนที่แม้แต่พูดปกติยังพูดให้ชัดไม่ได้เลย
            แล้วกับการร่ายเวทมนตร์จะไม่มีปัญหาหรอคะ
            <br />
            <span className="mt-2 block font-semibold text-blue-800">
              ก็มีแต่คนที่ร่ายเวทได้เท่านั้นสิคะ ถึงจะใช้เวทมนตร์ได้”
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
