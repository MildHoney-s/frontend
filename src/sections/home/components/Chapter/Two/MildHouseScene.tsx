import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef, useState } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  onComplete: () => void
}

// ----------------------------------------------------------------------

export default function MildHouseScene({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const doorRef = useRef<HTMLDivElement>(null)
  const [isDoorOpened, setIsDoorOpened] = useState(false)
  const [knockCount, setKnockCount] = useState(0)

  // Animation ตอนเคาะประตู
  const handleKnock = () => {
    if (isDoorOpened) return

    // เคาะ 3 ครั้งถึงจะเปิด
    if (knockCount < 2) {
      setKnockCount((prev) => prev + 1)
      // สั่นประตู
      gsap.to(doorRef.current, { x: 5, duration: 0.1, yoyo: true, repeat: 3 })
      // TODO: ใส่เสียงเคาะประตูตรงนี้ playSound('knock')
    } else {
      // เปิดประตู
      setIsDoorOpened(true)
      gsap.to(doorRef.current, {
        rotateY: -110,
        duration: 1.5,
        ease: 'power2.inOut',
        transformOrigin: 'left center', // จุดหมุนอยู่ซ้าย
      })
    }
  }

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Fade In ฉากบ้าน
      gsap.fromTo(
        '.house-bg',
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 2,
          scrollTrigger: { trigger: containerRef.current, start: 'top 60%' },
        },
      )

      // ถ้าเปิดประตูแล้ว ให้บทพูดลอยขึ้นมา
      if (isDoorOpened) {
        gsap.fromTo(
          '.dialogue-section',
          { autoAlpha: 0, y: 50 },
          { autoAlpha: 1, y: 0, duration: 1, delay: 1 },
        )
      }
    }, containerRef)
    return () => ctx.revert()
  }, [isDoorOpened])

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden bg-black pb-20 text-white"
    >
      {/* ส่วนประตูบ้าน (Interactive) */}
      <div className="house-bg relative flex h-screen w-full flex-col items-center justify-center">
        <div className="absolute top-10 animate-pulse text-sm text-gray-400">
          Scroll ลงมาแล้วเคาะประตูบ้าน...
        </div>

        {/* Container บ้าน */}
        <div className="perspective-1000 relative h-[500px] w-[300px] overflow-hidden rounded-xl border-8 border-gray-800 bg-gray-700 shadow-2xl md:h-[600px] md:w-[400px]">
          {/* พื้นหลังในบ้าน (เห็นตอนประตูเปิด) */}
          <div className="absolute inset-0 flex items-center justify-center bg-yellow-100">
            {isDoorOpened ? (
              <div className="animate-in fade-in zoom-in text-center duration-500">
                {/* ใส่รูปมายด์ตกใจ/ยิ้มตรงนี้ */}
                <div className="mx-auto mb-4 h-48 w-48 rounded-full border-4 border-white bg-pink-200"></div>
                <p className="rounded bg-white/80 px-2 font-bold text-black">
                  มายด์: "เอ๊ะ คุณฮันนี่!?"
                </p>
              </div>
            ) : (
              <div className="text-black/30">ในบ้าน...</div>
            )}
          </div>

          {/* บานประตู (ตัวบัง) */}
          <div
            ref={doorRef}
            onClick={handleKnock}
            className="absolute inset-0 flex cursor-pointer items-center justify-center border-r-4 border-black/20 bg-[#5D4037]"
            style={{ transformStyle: 'preserve-3d' }} // สำคัญสำหรับเปิดประตู 3D
          >
            {/* ลวดลายประตู */}
            <div className="h-[90%] w-[80%] rounded border-2 border-[#3E2723] opacity-50"></div>
            <div className="absolute right-4 h-4 w-4 rounded-full bg-yellow-500 shadow-lg"></div>{' '}
            {/* ลูกบิด */}
            {!isDoorOpened && (
              <span className="pointer-events-none absolute bottom-20 rounded bg-black/50 px-3 py-1 text-sm">
                {knockCount === 0 ? 'คลิกเพื่อเคาะ' : 'เคาะอีก!'}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* บทสนทนาหลังประตูเปิด (Manhwa Style) */}
      {isDoorOpened && (
        <div className="dialogue-section mx-auto mt-10 max-w-2xl space-y-20 px-6 pb-20">
          <div className="manhwa-panel rounded-xl border border-gray-700 bg-gray-900/80 p-6">
            <p className="mb-2 text-sm text-gray-400">มายด์ (เสียงเบาๆ)</p>
            <p className="text-xl">
              "ใครหรอคะ... เอ๊ะ คุณฮันนี่เองหรอ มีอะไรรึป่าวคะมาซะเย็นเชียว"
            </p>
          </div>

          <div className="manhwa-panel text-center">
            <p className="mb-2 font-bold text-yellow-500">
              ✨ ฮันนี่ (เวทตัวอักษร) ✨
            </p>
            <p className="font-serif text-2xl leading-relaxed text-yellow-200 md:text-3xl">
              "ขอโทษนะที่มารบกวน...
              <br />
              พอดีฉันตัดสินใจได้แล้วว่า
              <br />
              จะเป็นอาจารย์ให้เธอเอง"
            </p>
          </div>

          <div className="manhwa-panel flex flex-col items-center">
            <p className="mb-4 text-4xl">😲 ➝ 😄</p>
            <p className="text-3xl font-bold text-pink-400">"จริงหรอคะ!?"</p>
            <p className="mt-4 text-sm text-gray-400">
              &lt; มายด์ยิ้มแย้มอย่างสดใสน่ารัก &gt;
            </p>
          </div>

          <div className="pt-10 text-center">
            <button
              onClick={onComplete}
              className="animate-bounce rounded-full bg-blue-600 px-8 py-3 font-bold hover:bg-blue-500"
            >
              เริ่มการฝึกฝน (Next Scene) ▼
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
