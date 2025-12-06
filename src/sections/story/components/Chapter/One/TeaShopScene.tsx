import gsap from 'gsap'
import { useLayoutEffect, useRef, useState } from 'react'

interface Props {
  onComplete: () => void
}

export default function TeaShopScene({ onComplete }: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const cupRef = useRef<HTMLDivElement | null>(null)
  const [ordered, setOrdered] = useState(false)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.shop-bg', { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.2 })

      if (ordered && cupRef.current) {
        const tl = gsap.timeline()
        tl.fromTo(
          cupRef.current,
          { scale: 0.9, y: 30, rotation: -6 },
          { scale: 1, y: 0, rotation: 0, duration: 0.6, ease: 'power2.out' },
        )
        tl.to(cupRef.current, {
          y: -8,
          duration: 0.25,
          repeat: 6,
          yoyo: true,
          ease: 'sine.inOut',
        })
        tl.call(() => {
          setTimeout(() => onComplete(), 600)
        })
      }
    }, rootRef)
    return () => ctx.revert()
  }, [ordered, onComplete])

  return (
    <div
      ref={rootRef}
      className="relative h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/ch1/tea_shop_bg.png')" }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="shop-ui z-20 text-center">
          <h2 className="mb-4 font-serif text-3xl">ร้านชานมโบราณ</h2>
          <p className="mb-6 text-gray-300">
            มายด์: (นึกในใจ) หาอะไรหวานๆกินก่อนไปซ้อมดีกว่า
            ว่าแต่วันนี้กินไรดีนะ?
          </p>
          <button
            onClick={() => setOrdered(true)}
            className="rounded-full bg-yellow-500 px-6 py-2 font-bold"
            disabled={ordered}
          >
            สั่งชานม
          </button>
        </div>

        <div ref={cupRef} className="z-10 mt-8">
          <img src="/assets/ch1/milk_tea.png" alt="milk tea" className="w-48" />
          <div className="mt-4 text-center text-gray-300">
            มายด์จิ้มที่เมนูด้วยความเขิน แล้วพนักงานส่งชานม
          </div>
        </div>
      </div>
    </div>
  )
}
