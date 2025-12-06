import gsap from 'gsap'
import { useLayoutEffect, useRef, useState } from 'react'
gsap.registerPlugin()

interface Props { onComplete: () => void }

export default function RescueHomeScene({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const doorRef = useRef<HTMLDivElement | null>(null)
  const [isDoorOpened, setIsDoorOpened] = useState(false)
  const [knockCount, setKnockCount] = useState(0)

  const handleKnock = () => {
    if (isDoorOpened) return
    if (knockCount < 2) {
      setKnockCount((p) => p + 1)
      gsap.to(doorRef.current, { x: 6, duration: 0.08, yoyo: true, repeat: 3 })
    } else {
      setIsDoorOpened(true)
      gsap.to(doorRef.current, { rotateY: -100, duration: 1.2, ease: 'power2.inOut', transformOrigin: 'left center' })
      // after open, show dialog then advance
      setTimeout(() => setTimeout(onComplete, 1300), 800)
    }
  }

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.house-bg-ch1', { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.2 })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative h-screen w-full bg-black flex items-center justify-center text-white">
      <div className="rescue-house relative h-[560px] w-[420px] perspective-1000">
        <div className="house-bg-ch1 absolute inset-0 rounded-xl bg-cover" style={{ backgroundImage: "url('/assets/ch1/home_kitchen_bg.png')" }} />
        <div ref={doorRef} onClick={handleKnock} className="rescue-door absolute inset-0 flex items-center justify-center bg-[#5D4037] cursor-pointer" style={{ transformStyle: 'preserve-3d' }}>
          <div className="door-knob absolute right-8 bottom-28 h-4 w-4 rounded-full bg-yellow-400"></div>
          {!isDoorOpened && <span className="pointer-events-none absolute bottom-10 text-sm text-gray-200">{knockCount === 0 ? 'คลิกเพื่อเคาะ' : 'เคาะอีก!'}</span>}
        </div>
      </div>

      <div className="absolute bottom-6">
        {isDoorOpened ? (
          <div className="dialogue-section mx-auto max-w-2xl space-y-6 px-6 pb-6 text-center">
            <p className="text-yellow-200">ฮันนี่ (เวทตัวอักษร): "ขอโทษนะที่ทำให้เธอต้องลำบาก... ฉันชื่อ ฮันนี่"</p>
            <p className="text-gray-300">มายด์: (เสียงเบาๆ) "มายด์ค่ะ ยินดีที่ได้รู้จักนะคุณฮันนี่"</p>
            <p className="mt-4 text-sm text-gray-400">มายด์ชวนฮันนี่กินข้าวห่อไข่เพื่อให้หายหิว</p>
          </div>
        ) : null}
      </div>
    </div>
  )
}
