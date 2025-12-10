import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

// ----------------------------------------------------------------------

export default function OpenScene() {
  const main = useRef<HTMLDivElement | null>(null)

  useGSAP(
    () => {
      // --- ลบส่วน Timeline Fade In ออกไปแล้ว ---

      // เหลือแค่ อนิเมชั่นพลุ
      gsap.from('.firework', {
        y: 500,
        opacity: 0,
        scale: 0.5,
        duration: 1.5,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.bg-chapter3-01',
          start: 'top 60%', // ปรับ trigger ให้เริ่มไวขึ้นนิดหน่อยตามความเหมาะสม
          end: 'center center',
          scrub: 1,
        },
      })
    },
    { scope: main },
  )

  return (
    <>
      {/* ลบ relative และ ref ที่เคยใช้ทำ fade ออก (ถ้าไม่ได้ใช้ทำอย่างอื่น) แต่ใส่ไว้กันเหนียวได้ */}
      <section className="bg-white" ref={main} id="chapter-three-open-scene">
        <div className="bg-chapter3-01 bg-lift-bottom-left relative overflow-hidden">
          <img
            className="firework abs x-400 y-0"
            src="assets/background/firework/firework_pink.png"
            alt="firework"
          />
          <img
            className="firework abs x-560 y-0"
            src="assets/background/firework/firework_blue.png"
            alt="firework"
          />
          <img
            className="firework abs x-480 y-90"
            src="assets/background/firework/firework_orange.png"
            alt="firework"
          />
          <img
            className="firework abs x-690 y-40"
            src="assets/background/firework/firework_green.png"
            alt="firework"
          />
          <img
            className="firework abs x-800 y-40"
            src="assets/background/firework/firework_white.png"
            alt="firework"
          />
        </div>

        <div className="box gradient-blue">
          <div className="bg-white-center">
            <p className="text-story">
              ยินดีต้อนรับเข้าสู่การแข่งขันประจำโรงเรียนครั้งที่ 69 <br />
              เพื่อไม่ให้เป็นการเสียเวลาเรามาเริ่มที่คู่แรกกันเลยครับ
              เป็นการพบกันระหว่าง{' '}
            </p>
          </div>
          <div className="bg-white-center">
            <p className="text-story">เป็นการพบกันระหว่าง </p>
          </div>
        </div>
      </section>
    </>
  )
}