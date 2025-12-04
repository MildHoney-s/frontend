/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  onComplete: () => void
}

// ----------------------------------------------------------------------

export default function TrainingMontageScene({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  const trainingSteps = [
    {
      title: 'Stone Simulator',
      desc: 'ฝึกจิตใจให้นิ่งดั่งหินผา',
      color: 'bg-gray-800',
    },
    {
      title: 'Theory Class',
      desc: 'สอนหลักการใช้เวทมนตร์',
      color: 'bg-blue-900',
    },
    {
      title: 'First Monster',
      desc: 'ฝึกใช้เวทจริงกับมอนสเตอร์',
      color: 'bg-red-900',
    },
    {
      title: 'Physical Training',
      desc: 'ออกกำลังกาย (ชุดกีฬา)',
      color: 'bg-green-800',
    },
  ]

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.training-card')

      // Animation แบบ Stack Cards: เลื่อนลงมาทับกัน
      cards.forEach((card: any, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 100, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'top 20%',
              scrub: 1,
            },
          },
        )
      })

      // Trigger จบ
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'bottom bottom',
        onEnter: () => onComplete(),
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="w-full bg-black px-4 py-20 text-white">
      <h2 className="mb-20 text-center text-4xl font-bold text-yellow-500">
        Training Montage
      </h2>

      <div className="mx-auto max-w-4xl space-y-[40vh]">
        {' '}
        {/* เว้นระยะห่างเยอะๆ ให้ Scroll สนุก */}
        {trainingSteps.map((step, index) => (
          <div
            key={index}
            className={`training-card sticky top-20 flex h-[60vh] w-full flex-col items-center justify-center rounded-2xl border-4 border-white/20 p-8 shadow-2xl ${step.color}`}
          >
            <div className="absolute bottom-4 right-4 text-9xl font-bold opacity-20">
              {index + 1}
            </div>
            <h3 className="mb-4 text-4xl font-bold md:text-6xl">
              {step.title}
            </h3>
            <p className="text-xl text-gray-200 md:text-2xl">{step.desc}</p>

            {/* Placeholder รูป */}
            <div className="mt-8 flex h-1/2 w-full items-center justify-center rounded-lg border-2 border-dashed border-white/30 bg-black/30 text-gray-400">
              Image Asset Here
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 flex h-[20vh] items-center justify-center text-gray-500">
        (Scroll ต่อเพื่อข้ามเวลา)
      </div>
    </div>
  )
}
