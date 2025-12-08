import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

export default function OpenScene() {
  const main = useRef<HTMLDivElement | null>(null)
  useGSAP(
    () => {
      gsap.from('.firework', {
        y: 500, // เริ่มต้น: อยู่ต่ำลงไป 200px
        opacity: 0, // เริ่มต้น: จางๆ
        scale: 0.5, // เริ่มต้น: เล็กๆ (เพิ่มลูกเล่น)
        duration: 1,
        stagger: 0.1, // Key Point: ให้พลุแต่ละลูกลอยขึ้นมาไม่พร้อมกัน (ไล่ลำดับ) ดูสวยกว่ามาก
        scrollTrigger: {
          trigger: '.bg-chapter3-01',
          toggleActions: 'revese none revese none',
          start: 'top 80%', // เริ่มขยับเมื่อหัวกล่องโผล่มาในจอ 20% (นับจากล่าง)
          end: 'center center', // จบเมื่อกล่องมาถึงกลางจอ
          scrub: true,
        },
      })
    },
    { scope: main },
  )

  return (
    <>
      <section className="bg-white" ref={main} id="chapter-three-open-scene">
        <div className="bg-chapter3-01 bg-lift-bottom-left">
          <img
            className="firework abs x-400 y-0"
            src="public\assets\background\firework\firework_pink.png"
          />
          <img
            className="firework abs x-560 y-0"
            src="public\assets\background\firework\firework_blue.png"
          />
          <img
            className="firework abs x-480 y-90"
            src="public\assets\background\firework\firework_orange.png"
          />
          <img
            className="firework abs x-690 y-40"
            src="public\assets\background\firework\firework_green.png"
          />
          <img
            className="firework abs x-800 y-40"
            src="public\assets\background\firework\firework_white.png"
          />
          {/* Content ข้างใน (ถ้ามี) */}
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
