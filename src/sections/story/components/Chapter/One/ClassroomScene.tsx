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
      // ตัวละครและฉาก
      gsap.set('.teacher-group', { x: -50, autoAlpha: 0 })
      gsap.set('.student-group', { autoAlpha: 0 })
      gsap.set('.bg-students', { autoAlpha: 0 })
      gsap.set(['.bubble-teacher', '.bubble-student'], { scale: 0, autoAlpha: 0, transformOrigin: 'bottom left' })
      
      // Text Setup: ใช้ autoAlpha ควบคุมการมองเห็น
      gsap.set('.text-t-1', { autoAlpha: 1 }) 
      gsap.set('.text-t-2', { autoAlpha: 0 }) // ซ่อนชุด 2 ไว้ก่อน
      
      // ซ่อนประโยคย่อยในชุด 2
      gsap.set(['.final-line-1', '.final-line-2', '.final-line-3'], { autoAlpha: 0, y: 15 }) 

      // =========================================================
      // MAIN TIMELINE
      // =========================================================
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=7000', // ระยะยาวเพื่อให้ Scroll สมูท
          scrub: 1.5,    // ความหน่วงให้นุ่มนวล
          pin: true,
          onLeave: () => onComplete && onComplete(),
        },
      })

      // STEP 1: Teacher Enter
      tl.to('.intro-overlay', { autoAlpha: 0, duration: 2 })
      tl.to('.teacher-group', { x: 0, autoAlpha: 1, duration: 2 })
      tl.to('.bubble-teacher', { scale: 1, autoAlpha: 1, duration: 1.5, ease: 'back.out(1.2)' }, '-=1')
      tl.to({}, { duration: 3 }) // อ่าน Text 1

      // STEP 2: Swap to Students
      tl.to(['.teacher-group', '.bubble-teacher'], { autoAlpha: 0, duration: 2 })
      tl.to('.bg-teacher', { autoAlpha: 0, duration: 2 }, '<')
      tl.to('.bg-students', { autoAlpha: 1, duration: 2 }, '<')
      tl.to('.student-group', { autoAlpha: 1, duration: 2 }, '<')
      tl.to('.bubble-student', { scale: 1, autoAlpha: 1, duration: 1.5, ease: 'back.out(1.2)' })
      tl.to({}, { duration: 4 }) // อ่าน Text นักเรียน

      // STEP 3: Back to Teacher
      tl.to(['.student-group', '.bubble-student'], { autoAlpha: 0, duration: 2 })
      tl.to('.bg-students', { autoAlpha: 0, duration: 2 }, '<')
      tl.to('.bg-teacher', { autoAlpha: 1, duration: 2 }, '<')
      tl.to('.teacher-group', { autoAlpha: 1, duration: 2 }, '<')

      // ✅ สลับ Text (ใช้ Fade เพื่อความสมูทตอนย้อนกลับ)
      tl.to('.text-t-1', { autoAlpha: 0, duration: 1 }) 
      tl.to('.text-t-2', { autoAlpha: 1, duration: 1 }) 
      
      tl.to('.bubble-teacher', { scale: 1, autoAlpha: 1, duration: 1.5, ease: 'back.out(1.2)' }, '<')

      // =========================================================
      // STEP 4: Reveal Final Sentences (ค่อยๆ มา)
      // =========================================================
      
      // ประโยค 1
      tl.to('.final-line-1', { autoAlpha: 1, y: 0, duration: 3, ease: 'power2.out' })
      tl.to({}, { duration: 4 })
      tl.to('.final-line-1', { autoAlpha: 0, y: -10, duration: 1 })

      // ประโยค 2
      tl.to('.final-line-2', { autoAlpha: 1, y: 0, duration: 3, ease: 'power2.out' })
      tl.to({}, { duration: 4 })
      tl.to('.final-line-2', { autoAlpha: 0, y: -10, duration: 1 })

      // ประโยค 3 (จบ)
      tl.to('.final-line-3', { autoAlpha: 1, y: 0, duration: 3, ease: 'power2.out' })
      tl.to({}, { duration: 5 })

    }, containerRef)

    return () => ctx.revert()
  }, [onComplete])

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black text-white font-sans">
      
      {/* BACKGROUNDS */}
      <div className="bg-teacher absolute inset-0 bg-cover bg-center z-0 will-change-opacity" 
           style={{ backgroundImage: "url('/assets/Part1/classroom/Classroom_2.png')" }} />
      <div className="bg-students absolute inset-0 bg-cover bg-center z-0 will-change-opacity" 
           style={{ backgroundImage: "url('/assets/Part1/classroom/Classroom_1.png')" }} />

      {/* INTRO OVERLAY */}
      <div className="intro-overlay absolute inset-0 z-50 flex items-start justify-center bg-black/60 pt-24 backdrop-blur-sm pointer-events-none">
        <h1 className="text-4xl text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] md:text-6xl font-bold tracking-widest">
          ณ ห้องเรียนเวทมนตร์
        </h1>
      </div>

      {/* TEACHER GROUP */}
      <div className="teacher-group absolute bottom-[10%] right-[5%] z-10 w-[280px] md:bottom-[38%] md:right-[10%] md:w-[350px]">
        <img src="/assets/Part1/classroom/Xoneko_Sensei_open.png" alt="teacher" className="w-full drop-shadow-2xl" />
        
        {/* TEACHER BUBBLE */}
        <div className="bubble-teacher absolute -top-[80px] -left-[180px] w-[300px] md:w-[400px] min-h-[140px] 
                        bg-white text-black p-6 rounded-2xl shadow-xl origin-bottom-right z-20
                        after:content-[''] after:absolute after:bottom-[-20px] after:right-10 
                        after:border-[15px] after:border-transparent after:border-t-white">
            
            <p className="font-bold text-purple-700 mb-2">อาจารย์:</p>
            
            {/* ✅ ใช้ Position Absolute ทับกันเหมือนเดิม แต่ควบคุมด้วย autoAlpha */}
            <div className="relative w-full h-full">
                
                {/* Text Set 1 */}
                <div className="text-t-1 absolute top-0 left-0 w-full">
                    <p className="leading-relaxed text-sm md:text-base text-gray-800">
                    “ก็อย่างที่สอนข้างต้นไป เวทมนตร์นั้น เราต้องร่ายออกมาให้ชัดเจน
                    เพื่อที่จะทำให้ตัวเวทมนตร์นั้นแสดงผลออกมาได้อย่างมีประสิทธิภาพ”
                    </p>
                </div>

                {/* Text Set 2 Container */}
                <div className="text-t-2 absolute top-0 left-0 w-full h-full">
                    {/* ประโยคย่อย 1 */}
                    <div className="final-line final-line-1 absolute top-0 left-0 w-full">
                        <p className="leading-relaxed text-sm md:text-base text-gray-800">
                        “ก็ใช่ว่าจะเป็นไปไม่ได้นะ อย่าง 1 ในนักปราชญ์ มีอยู่คนนึงสามารถใช้เวทโดยไม่ต้องร่ายเลยด้วยซ้ำ แต่มันเป็นศาสตร์ขั้นสูงเลยล่ะ”
                        </p>
                    </div>
                    
                    {/* ประโยคย่อย 2 */}
                    <div className="final-line final-line-2 absolute top-0 left-0 w-full">
                        <p className="leading-relaxed text-sm md:text-base text-gray-800">
                        “อาจารย์คิดว่านักเรียนมีศักยภาพพอ... เพราะงั้นทุกคนจงพยายาม เป็น <strong className="text-purple-600">จอมเวทผู้ยิ่งใหญ่</strong> อย่างจอมเวทไร้ร่ายให้ได้ละ”
                        </p>
                    </div>

                    {/* ประโยคย่อย 3 */}
                    <div className="final-line final-line-3 absolute top-0 left-0 w-full flex flex-col justify-center text-center pt-2">
                        <p className="text-sm md:text-base text-gray-800">“เอาล่ะ บทเรียนวันนี้จบแล้ว อีก 4 เดือนจะมีงานแข่ง...”</p>
                        <p className="text-red-500 font-bold text-lg mt-2">“เพราะงั้นแยกย้ายกลับบ้านกันได้แล้ว!”</p>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* STUDENT GROUP */}
      <div className="student-group absolute inset-0 z-10 pointer-events-none">
        <img src="/assets/Part1/classroom/MildR_front.png" className="absolute right-[25%] top-[35%] w-[200px] md:w-[280px]" alt="mild" />
        <img src="/assets/Part1/classroom/Elevene_front.png" className="absolute left-[73%] top-[67%] w-[220px] md:w-[300px] z-20" alt="elevene" />
        <img src="/assets/Part1/classroom/Elze_front.png" className="absolute right-[15%] top-[2%] w-[210px] md:w-[290px]" alt="elze" />

        {/* STUDENT BUBBLE */}
        <div className="bubble-student absolute top-[5%] left-[10%] md:left-[20%] w-[300px] md:w-[450px] 
                        bg-white text-black p-6 rounded-2xl shadow-xl origin-bottom-left
                        after:content-[''] after:absolute after:bottom-[-20px] after:right-10
                        after:border-[15px] after:border-transparent after:border-t-white">
             <p className="font-bold mb-2 text-blue-600">เพื่อนๆ:</p>
             <p className="leading-relaxed text-sm md:text-base text-gray-700">
                “อาจารย์คะ แบบนี้ถ้าคนที่แม้แต่พูดปกติยังพูดให้ชัดไม่ได้เลย แล้วกับการร่ายเวทมนตร์จะไม่มีปัญหาหรอคะ<br/>
                <span className="font-semibold text-blue-800 block mt-2">ก็มีแต่คนที่ร่ายเวทได้เท่านั้นสิคะ ถึงจะใช้เวทมนตร์ได้”</span>
             </p>
        </div>
      </div>

    </div>
  )
}