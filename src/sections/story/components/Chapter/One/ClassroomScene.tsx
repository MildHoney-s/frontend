import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'
gsap.registerPlugin(ScrollTrigger)

interface Props { onComplete: () => void }

export default function ClassroomScene({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // intro fade
      gsap.to('.intro-overlay', {
        autoAlpha: 0,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200',
          scrub: true,
        },
      })

      // teacher entrance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top+=200',
        },
      })
      tl.fromTo('.teacher', { x: -120, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 1.2 })

      // show speech bubble on trigger
      ScrollTrigger.create({
        trigger: '.trigger-lecture',
        start: 'top 65%',
        onEnter: () => {
          gsap.to('.bubble-teacher', { scale: 1, autoAlpha: 1, duration: 0.6, ease: 'back.out(1.7)' })
        },
      })

      // finish
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'bottom bottom',
        onEnter: () => onComplete(),
      })
    }, containerRef)
    return () => ctx.revert()
  }, [onComplete])

  return (
    <div ref={containerRef} className="relative h-[420vh] w-full bg-gradient-to-b from-black to-gray-900">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/assets/ch1/classroom_bg.png')" }} />
        <div className="intro-overlay absolute inset-0 flex items-center justify-center">
          <h1 className="font-serif text-5xl text-white">ห้องเรียนเวทมนตร์</h1>
        </div>

        <div className="teacher absolute bottom-10 left-10 opacity-0 z-20">
          <img src="/assets/ch1/teacher.png" alt="teacher" className="w-64" />
        </div>

        <div className="bubble-teacher absolute top-24 right-24 z-30 scale-0 opacity-0 bg-white text-black p-6 rounded-xl shadow-lg max-w-[420px]">
          <p className="font-bold">อาจารย์:</p>
          <p>“ก็อย่างที่สอนข้างต้นไป เวทมนตร์นั้น เราต้องร่ายออกมาให้ชัดเจน เพื่อที่จะทำให้ตัวเวทมนตร์นั้นแสดงผลออกมาได้อย่างมีประสิทธิภาพ”</p>
        </div>

        <div className="absolute inset-0 pointer-events-none" />

      </div>

      <div className="trigger-lecture absolute top-[120vh] h-[10px] w-full" />
    </div>
  )
}
