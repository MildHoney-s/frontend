/* eslint-disable @typescript-eslint/no-explicit-any */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

// ----------------------------------------------------------------------

export default function ThreeMonthsLaterScene() {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Fade Text
      const texts = gsap.utils.toArray('.final-text')
      texts.forEach((text: any) => {
        gsap.fromTo(
          text,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: { trigger: text, start: 'top 85%' },
          },
        )
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full bg-gradient-to-b from-black to-gray-900 pb-40 text-white"
    >
      {/* Time Skip Header */}
      <div className="flex h-[50vh] items-center justify-center border-b border-gray-800">
        <h2 className="final-text font-serif text-5xl text-gray-400 md:text-7xl">
          3 เดือนผ่านไป...
        </h2>
      </div>

      {/* Dialogue Flow */}
      <div className="mx-auto max-w-2xl space-y-24 px-6 py-20">
        {/* มายด์กังวล */}
        <div className="final-text text-center">
          <p className="mb-2 text-blue-300">มายด์ (หน้ากลุ้มใจ)</p>
          <p className="text-2xl">
            "เฮ้อ... อีกแค่เดือนเดียวก็จะถึงงานแข่งแล้ว"
          </p>
          <p className="mt-2 text-xl text-gray-400">
            "ยังไม่ถึงไหนเลยจะทำไงดี... ฉันยังไม่พร้อมเลย"
          </p>
        </div>

        {/* ฮันนี่ปลอบ */}
        <div className="final-text rounded-xl border border-yellow-600/30 bg-yellow-900/20 p-8 text-center">
          <p className="mb-4 font-bold text-yellow-500">ฮันนี่ (เวทตัวอักษร)</p>
          <p className="text-lg leading-loose text-yellow-100">
            "อย่าไปกดดันตัวเองขนาดนั้นสิ
            <br />
            ฉันเห็นความพยายามของเธอตลอด 3 เดือนที่ผ่านมาเลยนะ
            <br />
            <span className="text-2xl font-bold">
              ดังนั้นฉันรู้ว่าเธอทำมันได้แน่ๆ
            </span>
            <br />
            มั่นใจในตัวเองเข้าไว้สิ"
          </p>
        </div>

        {/* บทสรุป */}
        <div className="final-text space-y-6 text-center">
          <p className="text-gray-400">มายด์: "ก็มันไม่มั่นใจนี่หน่า..."</p>
          <p className="text-yellow-100">
            ฮันนี่: "งั้นพักการฝึกก่อน แล้วไปหาไรอร่อยๆ กินไหม ฉันเลี้ยงเอง"
          </p>
          <p className="text-3xl font-bold text-pink-400">
            มายด์: "ก็ได้ค่ะ!" (ยิ้มแฉ่ง)
          </p>
        </div>
      </div>

      {/* ฉากจบ: ชานม */}
      <div className="final-text relative mt-20 flex h-[80vh] w-full flex-col items-center justify-center overflow-hidden">
        {/* BG ร้านชานม */}
        <div className="absolute inset-0 bg-orange-900/30"></div>

        <div className="z-10 text-center">
          <div className="mx-auto mb-6 flex h-64 w-64 items-center justify-center rounded-full border-4 border-white bg-orange-200 font-bold text-black shadow-lg">
            <span className="opacity-50">รูปดูดชานม</span>
          </div>
          <h2 className="mt-10 font-serif text-4xl tracking-widest text-white md:text-6xl">
            ณ วันแข่งขัน
          </h2>
          <p className="mt-4 text-sm uppercase tracking-[0.5em] text-gray-500">
            To be continued in Part 3
          </p>
        </div>
      </div>
    </div>
  )
}
