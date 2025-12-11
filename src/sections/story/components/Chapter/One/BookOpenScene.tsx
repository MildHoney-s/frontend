// BookOpenScene.tsx
import { bookOpenSceneAssets } from '@/assets/chapterOneAssets'
import { normalize } from '@/utils/normalize'
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
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root)

      // set overlay visible
      gsap.set(normalize(q('.black-overlay')), { autoAlpha: 1 })

      // ----- เตรียม span ทีละตัวอักษร (DocumentFragment เพื่อประสิทธิภาพ) -----
      const textEls = normalize(q('.page-text')) as HTMLElement[]
      const textEl = textEls[0] ?? null
      if (textEl && !textEl.dataset.split) {
        const full = textEl.textContent || ''
        textEl.textContent = ''
        const frag = document.createDocumentFragment()
        for (const ch of full.split('')) {
          const span = document.createElement('span')
          span.textContent = ch
          span.style.opacity = '0'
          frag.appendChild(span)
        }
        textEl.appendChild(frag)
        textEl.dataset.split = 'true'
      }

      // ----- Timeline ที่ผูกกับ scroll -----
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: '+=3500',
          scrub: 1,
          pin: true,
          // markers: true,
          onLeave: () => {
            requestAnimationFrame(() => onComplete?.())
          },
        },
      })

      // Fade out overlay
      tl.to(normalize(q('.black-overlay')), { autoAlpha: 0, duration: 1.5 })

      // หนังสือลอยขึ้น (ใช้ element ตัวแรกของ selector)
      const pageEls = normalize(q('.page')) as HTMLElement[]
      const pageEl = pageEls[0] ?? null
      if (pageEl) {
        tl.fromTo(
          pageEl,
          { y: 40, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8 },
          '<',
        )
      }

      // label สำหรับช่วงเริ่มโชว์ตัวอักษร
      tl.add('text')

      // ตัวอักษรไต่ขึ้นทีละตัวตาม scroll
      const rawSpans = normalize(q('.page-text span'))
      const spans = rawSpans.filter(
        (el): el is HTMLSpanElement => el instanceof HTMLSpanElement,
      )
      if (spans.length) {
        tl.to(
          spans,
          {
            opacity: 1,
            stagger: 0.03,
            duration: 0.03,
          },
          'text',
        )
      }

      // เปลี่ยน BG 2 เมื่อ scroll เลยช่วงหนึ่งไป
      const bg2 = normalize(q('.page-bg-2'))[0] ?? null
      if (bg2) tl.to(bg2, { autoAlpha: 1, duration: 0.8 }, 'text+=4')

      // เปลี่ยน BG 3 ช่วงท้าย ๆ ของข้อความ
      const bg3 = normalize(q('.page-bg-3'))[0] ?? null
      if (bg3) tl.to(bg3, { autoAlpha: 1, duration: 0.8 }, 'text+=8')

      // ปิดฉากด้วย fade to black
      tl.to(
        normalize(q('.black-overlay')),
        { autoAlpha: 1, duration: 1.2 },
        '+=1',
      )
      tl.to({}, { duration: 0.5 }) // เว้นจังหวะนิดนึงก่อนเปลี่ยนฉาก

      // ถ้าต้องการให้ ScrollTrigger คำนวณซ้ำ (layout เปลี่ยน)
      ScrollTrigger.refresh()
    }, root)

    return () => {
      ctx.revert()
    }
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
          style={{
            backgroundImage: `url('${bookOpenSceneAssets.prologue_1}')`,
          }}
        />
        <div
          className="page-bg-2 absolute inset-0 bg-cover bg-center opacity-0"
          style={{
            backgroundImage: `url('${bookOpenSceneAssets.prologue_2}')`,
          }}
        />
        <div
          className="page-bg-3 absolute inset-0 bg-cover bg-center opacity-0"
          style={{
            backgroundImage: `url('${bookOpenSceneAssets.prologue_3}')`,
          }}
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
