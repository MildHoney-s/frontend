import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  onComplete: () => void
}

export default function BookOpenScene({ onComplete }: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const root = rootRef.current
      if (!root) return

      gsap.set('.black-overlay', { autoAlpha: 1 })

      // ----- เตรียม span ทีละตัวอักษร -----
      const textEl = root.querySelector('.page-text') as HTMLElement | null
      if (textEl && !textEl.dataset.split) {
        const full = textEl.textContent || ''
        textEl.textContent = ''
        full.split('').forEach((ch) => {
          const span = document.createElement('span')
          span.textContent = ch
          span.style.opacity = '0'
          textEl.appendChild(span)
        })
        textEl.dataset.split = 'true'
      }

      // ----- Timeline ที่ผูกกับ scroll -----
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: '+=3500', // ปรับความยาวฉากได้ ตัวอักษรจะไหลช้าหรือเร็วตามระยะนี้
          scrub: 1,
          pin: true,
          // markers: true,
          onLeave: () => {
            requestAnimationFrame(() => onComplete?.())
          },
        },
      })

      tl.to('.black-overlay', { autoAlpha: 0, duration: 1.5 })

      // fade-in ฉาก
      // tl.fromTo(
      //   root,
      //   { autoAlpha: 0, scale: 1.05 },
      //   { autoAlpha: 1, scale: 1, duration: 0.6 },
      //   0,
      // )

      // หนังสือลอยขึ้น
      tl.fromTo(
        '.page',
        { y: 40, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8 },
        '<', // เริ่มพร้อมกับ root
      )

      // label สำหรับช่วงเริ่มโชว์ตัวอักษร
      tl.add('text')

      // ตัวอักษรไต่ขึ้นทีละตัวตาม scroll
      tl.to(
        '.page-text span',
        {
          opacity: 1,
          stagger: 0.03,
          duration: 0.03,
        },
        'text',
      )

      // เปลี่ยน BG 2 เมื่อ scroll เลยช่วงหนึ่งไป
      tl.to(
        '.page-bg-2',
        { autoAlpha: 1, duration: 0.8 },
        'text+=4', // เลื่อนจุดเปลี่ยน BG ได้ตามจังหวะที่อยากให้เกิด
      )

      // เปลี่ยน BG 3 ช่วงท้าย ๆ ของข้อความ
      tl.to(
        '.page-bg-3',
        { autoAlpha: 1, duration: 0.8 },
        'text+=8', // ขยับตัวเลขให้ตรงกับจังหวะที่ชอบ
      )

      // 9) ปิดฉากด้วย fade to black
      tl.to('.black-overlay', { autoAlpha: 1, duration: 1.2 }, '+=1')
      tl.to({}, { duration: 0.5 }) // เว้นจังหวะนิดนึงก่อนเปลี่ยนฉาก
    }, rootRef)

    return () => ctx.revert()
  }, [onComplete])

  return (
    <div
      ref={rootRef}
      className="relative flex h-screen w-full items-center justify-center bg-black"
    >
      <div className="page relative h-full w-full max-w-full overflow-hidden rounded-lg shadow-2xl">
        {/* BG 1–3 ซ้อนกันแล้วใช้ opacity สลับ */}
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

        {/* BLACK OVERLAY ปิดฉาก / transition */}
        <div className="black-overlay pointer-events-none absolute inset-0 z-[100] bg-black" />
      </div>
    </div>
  )
}
