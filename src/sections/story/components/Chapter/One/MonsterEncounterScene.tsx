import gsap from 'gsap'
import { useLayoutEffect, useRef, useState } from 'react'

interface Props {
  onComplete: () => void
}

export default function MonsterEncounterScene({ onComplete }: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const monsterRef = useRef<HTMLDivElement | null>(null)
  const helperRef = useRef<HTMLDivElement | null>(null)
  const [helperArrived, setHelperArrived] = useState(false)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        monsterRef.current,
        { x: 260, autoAlpha: 0 },
        { x: 120, autoAlpha: 1, duration: 1.1, ease: 'power2.out' },
      )
      if (helperArrived) {
        const tl = gsap.timeline({
          onComplete: () => {
            setTimeout(onComplete, 900)
          },
        })
        tl.to(helperRef.current, { x: 0, autoAlpha: 1, duration: 0.8 })
        tl.to(
          monsterRef.current,
          { x: 480, autoAlpha: 0, duration: 0.6, ease: 'power2.in' },
          '<',
        )
      }
    }, rootRef)
    return () => ctx.revert()
  }, [helperArrived, onComplete])

  return (
    <div
      ref={rootRef}
      className="relative h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/ch1/field_battle_bg.png')" }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div ref={monsterRef} className="monster w-56 opacity-0">
          <img
            src="/assets/ch1/monster_angry.png"
            alt="monster"
            className="w-full"
          />
        </div>

        <div
          ref={helperRef}
          className="helper absolute bottom-28 left-[-260px] opacity-0"
        >
          <img
            src="/assets/ch1/honey_silhouette.png"
            alt="helper"
            className="w-56"
          />
        </div>
      </div>

      <div className="absolute bottom-8 left-8">
        <p className="mb-3 text-gray-300">
          มอนสเตอร์หลุดฝูงมาคุ้มคลั่ง — มายด์โดนทำร้ายแต่ยังร่ายไม่สำเร็จ
        </p>
        <button
          className="rounded bg-blue-600 px-4 py-2"
          onClick={() => setHelperArrived(true)}
        >
          ให้บุคคลปริศนาช่วย
        </button>
      </div>
    </div>
  )
}
