import gsap from 'gsap'
import { useLayoutEffect, useRef } from 'react'

interface Props { onComplete: () => void }

export default function BookOpenScene({ onComplete }: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const textEl = rootRef.current?.querySelector('.page-text') as HTMLElement
      // prepare spans
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

      const tl = gsap.timeline({
        onComplete: () => { setTimeout(onComplete, 1500); }
      })
      tl.fromTo(rootRef.current, { autoAlpha: 0, scale: 1.08 }, { autoAlpha: 1, scale: 1, duration: 1.2 })
      tl.fromTo('.page', { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 }, '-=0.8')
      tl.to('.page-text span', { opacity: 1, stagger: 0.02, duration: 0.02 }, '>-0.1')
    }, rootRef)
    return () => ctx.revert()
  }, [onComplete])

  return (
    <div ref={rootRef} className="relative flex h-screen items-center justify-center bg-black">
      <div className="page w-[900px] max-w-full rounded-lg bg-cover p-12 shadow-2xl" style={{ backgroundImage: "url('/assets/ch1/book_open.png')" }}>
        <div className="page-text text-white text-2xl leading-relaxed">
          คุณเชื่อในพลังพิเศษ หรือ ปรากฏการณ์เหนือธรรมชาติรึเปล่า ที่ผู้คนในโลกยุคนี้เรียกกันว่า “เวทมนตร์” พลังที่ราวกับว่าเป็น “ปาฏิหารย์” หากแต่ในยุคสมัยนี้พวกเขาได้ริเริ่มดัดแปลงและสร้างสรรค์จนค้นพบว่ามนุษย์นั้นก็สามารถใช้เวทมนตร์ได้ เพียงแค่เอยคำร่าย ไม่ว่าใครก็สามารถใช้เวทมนตร์ได้ ซึ่งในบรรดาผู้คนเหล่านั้นมีจอมเวทอยู่คนหนึ่งที่สามารถใช้เวทมนตร์โดยมิต้องเอยคำร่ายใดๆและถูกขนานนามว่า “จอมปราชญ์ไร้เสียง”
        </div>
      </div>
    </div>
  )
}
