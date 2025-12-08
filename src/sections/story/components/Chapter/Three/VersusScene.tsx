import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface Player {
  name: string
  alias: string
  text?: string
  src: string // แก้จาก iamge เป็น image
}

interface VersusProps {
  playerA: Player
  playerB: Player
}

// ----------------------------------------------------------------------

export default function VersusScene({ playerA, playerB }: VersusProps) {
  const main = useRef<HTMLDivElement | null>(null)
  useGSAP(
    () => {
      gsap.from('.character-vs', {
        y: -500, // เริ่มต้น: อยู่ต่ำลงไป 200px
        opacity: 0, // เริ่มต้น: จางๆ
        scale: 0.5, // เริ่มต้น: เล็กๆ (เพิ่มลูกเล่น)
        duration: 1,
        stagger: 0.1, // Key Point: ให้พลุแต่ละลูกลอยขึ้นมาไม่พร้อมกัน (ไล่ลำดับ) ดูสวยกว่ามาก
        scrollTrigger: {
          trigger: '.bg-versus',
          toggleActions: 'reverse none reverse none',
          start: 'top 80%', // เริ่มขยับเมื่อหัวกล่องโผล่มาในจอ 20% (นับจากล่าง)
          end: 'center center', // จบเมื่อกล่องมาถึงกลางจอ
          scrub: true,
        },
      })

      gsap.from('.character-vs-2', {
        y: 500, // เริ่มต้น: อยู่ต่ำลงไป 200px
        opacity: 0, // เริ่มต้น: จางๆ
        scale: 0.5, // เริ่มต้น: เล็กๆ (เพิ่มลูกเล่น)
        duration: 1,
        stagger: 0.1, // Key Point: ให้พลุแต่ละลูกลอยขึ้นมาไม่พร้อมกัน (ไล่ลำดับ) ดูสวยกว่ามาก
        scrollTrigger: {
          trigger: '.bg-versus',
          toggleActions: 'reverse none reverse none',
          start: 'top 80%', // เริ่มขยับเมื่อหัวกล่องโผล่มาในจอ 20% (นับจากล่าง)
          end: 'center center', // จบเมื่อกล่องมาถึงกลางจอ
          scrub: true,
        },
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.bg-versus', // จับที่ตัวกล่องใหญ่ (Section)
          start: 'top 70%', // เริ่มเล่นเมื่อหัวกล่องโผล่มาถึงเส้น 70% ของจอ (ค่อนไปทางล่าง)
          end: 'bottom center',
          toggleActions: 'play none none reverse', // เลื่อนมาถึง=เล่น, เลื่อนกลับขึ้นไป=ถอยหลัง(เตรียมเล่นใหม่)
          // markers: true, // เปิดเพื่อดูเส้น Debug
        },
      })
      // 1. ชื่อ A: พุ่งมาจากซ้าย (x: -100)
      tl.from('.p1-name', {
        x: -100,
        opacity: 0,
        duration: 1.5,
        ease: 'power4.out',
        delay: 0.2,
      }).from(
        '.p2-name',
        {
          x: 100,
          opacity: 0,
          duration: 1.5,
          ease: 'power4.out',
        },
        '<',
      ) // "<" คือเริ่มพร้อมกัน
    },
    { scope: main },
  )

  return (
    <>
      <section className="bg-white" ref={main} id="chapter-three-versus-scene">
        <div className="bg-versus ">
          {/* bg */}
          <img
            className="versus-abs"
            src="assets/background/chapter3/versus_bg/01.png"
          />
          <img
            className="versus-abs"
            src="assets/background/chapter3/versus_bg/02.png"
          />
          <img
            className="versus-abs"
            src="assets/background/chapter3/versus_bg/vs.png"
          />
          {/* Character A */}
          <p className="versus-text abs x-90 y-140 p1-name">{playerA.name}</p>
          <img className="character-vs abs x-40 y-270" src={playerA.src} />
          {/* Character B */}
          <p className="versus-text abs x-710 y-520 p2-name">{playerB.name}</p>
          <img className="character-vs-2 abs x-700 y-30" src={playerB.src} />
        </div>
      </section>
    </>
  )
}
