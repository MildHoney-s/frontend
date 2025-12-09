import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  onComplete: () => void // เรียกตอน intro เล่นจบครั้งหนึ่ง
  onReset: () => void // เรียกตอน scroll กลับมาใหม่ ให้ stage = 0
}

export default function BookOpenScene({ onComplete, onReset }: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const doneRef = useRef(false) // true = เล่นจบแล้วหนึ่งรอบ

  useLayoutEffect(() => {
    const previousOverflow = document.body.style.overflow

    const ctx = gsap.context(() => {
      const root = rootRef.current
      if (!root) return

      const textEl = root.querySelector('.page-text') as HTMLElement | null

      // เตรียม span ตัวอักษร
      if (textEl) {
        const full = textEl.textContent || ''
        textEl.innerHTML = ''
        full.split('').forEach((ch) => {
          const s = document.createElement('span')
          s.textContent = ch
          s.style.opacity = '0'
          textEl.appendChild(s)
        })
      }

      // สร้าง timeline (แต่ให้ paused ไว้ก่อน)
      const tl = gsap.timeline({
        paused: true,
        onComplete: () => {
          // เล่นจบหนึ่งรอบ → ปลดล็อก scroll และแจ้ง parent
          document.body.style.overflow = previousOverflow || 'auto'

          if (!doneRef.current) {
            doneRef.current = true
            setTimeout(onComplete, 800)
          }
        },
      })

      // fade-in ฉากรวม
      tl.fromTo(
        root,
        { autoAlpha: 0, scale: 1.08 },
        { autoAlpha: 1, scale: 1, duration: 1.2 },
        0,
      )

      // page ลอยขึ้น
      tl.fromTo(
        '.page',
        { y: 24, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8 },
        '-=0.8',
      )

      tl.addLabel('text')

      // ตัวอักษรขึ้นทีละตัว
      tl.to(
        '.page-text span',
        { opacity: 1, stagger: 0.02, duration: 0.02 },
        'text',
      )

      // เปลี่ยน BG เป็นภาพที่ 2
      tl.to('.page-bg-2', { autoAlpha: 1, duration: 1 }, 'text+=2.5')

      // เปลี่ยน BG เป็นภาพที่ 3
      tl.to('.page-bg-3', { autoAlpha: 1, duration: 1 }, 'text+=5')

      // ฟังก์ชันเริ่มเล่น intro + ล็อก scroll
      const playIntro = () => {
        document.body.style.overflow = 'hidden'
        tl.restart()
      }

      // ⭐ เล่นรอบแรกตอน mount
      playIntro()

      // ⭐ ถ้า scroll ย้อนกลับมาที่ฉากนี้อีก
      ScrollTrigger.create({
        trigger: root,
        start: 'top top',
        markers: true,
        onEnterBack: () => {
          // เล่นจบไปแล้วแล้วค่อยรีสตาร์ท
          if (doneRef.current) {
            doneRef.current = false // เตรียมให้ onComplete ทำงานใหม่รอบหน้า
            onReset() // ให้ ChapterOne setStage(0)
            playIntro() // ล็อก scroll + รีเล่น intro
          }
        },
      })
    }, rootRef)

    return () => {
      ctx.revert()
      document.body.style.overflow = previousOverflow
    }
  }, [onComplete, onReset])

  return (
    <div
      ref={rootRef}
      className="relative flex min-h-screen items-center justify-center bg-black"
    >
      <div className="page relative h-[80vh] w-[900px] max-w-full overflow-hidden rounded-lg shadow-2xl">
        {/* BG เลเยอร์ 1–3 */}
        <div
          className="page-bg-1 absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/Part1/Prologue_1.png')" }}
        />
        <div
          className="page-bg-2 absolute inset-0 bg-cover bg-center opacity-0"
          style={{ backgroundImage: "url('/assets/Part1/Prologue_2.png')" }}
        />
        <div
          className="page-bg-3 absolute inset-0 bg-cover bg-center opacity-0"
          style={{ backgroundImage: "url('/assets/Part1/Prologue_3.png')" }}
        />

        {/* content ด้านบนรูป */}
        <div className="relative p-12">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black/60 to-transparent" />

          <div className="page-text mx-auto max-w-[60ch] text-2xl leading-relaxed text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            คุณเชื่อในพลังพิเศษ หรือ ปรากฏการณ์เหนือธรรมชาติรึเปล่า
            ที่ผู้คนในโลกยุคนี้เรียกกันว่า “เวทมนตร์” พลังที่ราวกับว่าเป็น
            “ปาฏิหารย์”
            หากแต่ในยุคสมัยนี้พวกเขาได้ริเริ่มดัดแปลงและสร้างสรรค์จนค้นพบว่ามนุษย์นั้นก็สามารถใช้เวทมนตร์ได้
            เพียงแค่เอยคำร่าย ไม่ว่าใครก็สามารถใช้เวทมนตร์ได้
            ซึ่งในบรรดาผู้คนเหล่านั้นมีจอมเวทอยู่คนหนึ่งที่สามารถใช้เวทมนตร์โดยมิต้องเอยคำร่ายใดๆและถูกขนานนามว่า
            “จอมปราชญ์ไร้เสียง”
          </div>
        </div>
      </div>
    </div>
  )
}
