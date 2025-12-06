import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'
gsap.registerPlugin(ScrollTrigger)

interface Props { onComplete: () => void }

export default function TrainingScene({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.mind-char', { x: -60, autoAlpha: 0 })
      gsap.set('.magic-fail', { autoAlpha: 0, scale: 0.7 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=300',
          scrub: true,
        },
      })
      tl.to('.mind-char', { x: 0, autoAlpha: 1, duration: 1.2 })
      tl.to('.magic-fail', { autoAlpha: 1, scale: 1, duration: 0.5 }, '<0.3')

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'bottom bottom',
        onEnter: () => onComplete(),
      })
    }, containerRef)
    return () => ctx.revert()
  }, [onComplete])

  return (
    <div ref={containerRef} className="relative h-[360vh] w-full bg-black">
      <div className="sticky top-0 h-screen">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/assets/ch1/training_field.png')" }} />
        <img src="/assets/ch1/mind_char.png" className="mind-char absolute bottom-16 left-12 w-64" />
        <div className="magic-fail absolute top-28 right-28 text-6xl text-red-400 opacity-0 scale-75">ไม่สำเร็จ!</div>
        <div className="absolute bottom-10 left-6 text-gray-300">มายด์พยายามร่ายลูกไฟ แต่ลิ้นพันทำให้เวทไม่สมบูรณ์</div>
      </div>
    </div>
  )
}
