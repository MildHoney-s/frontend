import { inColosseumBehindAssets } from '@/assets/chapterThreeAssets'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'

// import { SmartSplitText } from '../../Two/component/SmartSplitText' // ถ้าไม่ได้ใช้ในหน้านี้ comment ออกไปก่อนได้ครับ

gsap.registerPlugin(ScrollTrigger)

interface Props {
  onComplete?: () => void
}

export default function InColosseumBehind({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // --- SETUP ---

      // 1. Background setup
      gsap.set('.colosseum-in-bg', {
        scale: 1.2,
        transformOrigin: 'center center',
      })

      // 2. Honey Setup (ซ้ายล่าง)
      gsap.set('.honey-group', {
        xPercent: 0,
        autoAlpha: 1,
        transformOrigin: 'bottom left',
      })

      // ✅ แก้ไขตรงนี้ 1: Setup หน้าเริ่มต้น
      // ตั้งค่าให้ Face-1 แสดง และ Face-2 ซ่อนไว้ก่อน
      gsap.set('.Honey-Face-1', { autoAlpha: 1 })
      gsap.set('.Honey-Face-2', { autoAlpha: 0 })

      // 3. Mild Setup (เตรียมวิ่งจากกลางขวามาขวาล่าง)
      gsap.set('.mild-group', {
        autoAlpha: 0,
        scale: 0.6,
        y: -150,
        x: -50,
      })

      // 4. Elements อื่นๆ
      gsap.set('.honey-thought-bubble', { autoAlpha: 0, scale: 0 })
      gsap.set('.mild-speech-bubble', { autoAlpha: 0, scale: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=400%', // ปรับความยาว Scroll ตามความเหมาะสม
          scrub: 1,
          pin: true,
          onLeave: () => {
            if (onComplete) onComplete()
          },
        },
      })

      // --- ANIMATION TIMELINE ---

      // Phase 1: Camera Zoom to Honey (Left Bottom)
      tl.to('.colosseum-in-bg', {
        scale: 1.4,
        xPercent: 15,
        yPercent: 10,
        duration: 1.5,
        ease: 'power2.inOut',
      })
        .to(
          '.honey-group',
          {
            scale: 1.3,
            xPercent: 5,
            duration: 1.5,
            ease: 'power2.inOut',
          },
          '<',
        )

        // Phase 2: Honey Thinking (Thought Bubble)
        .to('.honey-thought-bubble', {
          autoAlpha: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
        })
        .to({}, { duration: 1 }) // แช่ไว้อ่านแป๊บหนึ่ง
        .to('.honey-thought-bubble', {
          autoAlpha: 0,
          scale: 0,
          duration: 0.3,
          ease: 'back.in(1.7)',
        })

        // Phase 3: Zoom Out (เตรียมเปิดตัว Mild)
        .to(['.colosseum-in-bg', '.honey-group'], {
          scale: 1,
          xPercent: 0,
          yPercent: 0,
          duration: 1.5,
          ease: 'power2.inOut',
        })

        // Phase 4: Mild Running In (จากกลางขวา มา ขวาล่าง)
        .to(
          '.mild-group',
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            x: 0,
            duration: 1,
            ease: 'power1.out',
          },
          '-=0.5',
        )

        // Phase 5: Mild พูด
        .to('.mild-speech-bubble', {
          autoAlpha: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
        })
        .to({}, { duration: 1 }) // แช่ให้อ่าน Bubble Mild แป๊บหนึ่ง

        // ✅ แก้ไขตรงนี้ 2: เพิ่ม Timeline สลับหน้า Honey
        // หลังจาก Mild พูดจบ ให้ Honey เปลี่ยนหน้า (ใช้ duration สั้นๆ เพื่อให้ดูเหมือนเปลี่ยนทันที หรือ crossfade เร็วๆ)
        .to('.Honey-Face-1', { autoAlpha: 0, duration: 0.2 }) // ซ่อนหน้าเก่า
        .to('.Honey-Face-2', { autoAlpha: 1, duration: 0.2 }, '<') // แสดงหน้าใหม่พร้อมกัน
    }, containerRef)
    return () => ctx.revert()
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      <div className="relative h-full w-full font-sans">
        {/* Background */}
        <div
          className="colosseum-in-bg absolute inset-0 bg-cover bg-center will-change-transform"
          style={{
            backgroundImage: `url('${inColosseumBehindAssets.bgImg}')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"></div>

          {/* --- HONEY GROUP (ซ้ายล่าง) --- */}
          <div className="pointer-events-none absolute inset-0 z-10">
            <div className="honey-group absolute bottom-[-25%] left-[15%] z-20 h-[500px] w-[280px] will-change-transform md:left-[15%] md:h-[600px] md:w-[3จ0px]">
              <div className="honey-body-img relative h-full w-full">
                {/* Honey Assets */}
                {/* หน้าที่ 1 (Frieren) - ใช้ class Honey-Face-1 */}
                <img
                  src={inColosseumBehindAssets.honeyFace_1}
                  className="Honey-Face-1 absolute left-0 top-0 z-20 w-full"
                  alt="Face-1"
                />
                {/* หน้าที่ 2 (ตกใจ) - ใช้ class Honey-Face-2 */}
                <img
                  src={inColosseumBehindAssets.honeyFace_2}
                  className="Honey-Face-2 absolute left-0 top-0 z-20 w-full"
                  alt="Face-2"
                />
                <img
                  src={inColosseumBehindAssets.honeyBody}
                  className="absolute left-0 top-0 z-10 w-full"
                  alt="Body"
                />

                {/* Honey Thought Bubble (ความคิด) */}
                <div className="overlay pointer-events-none absolute inset-0 z-[100]"></div>
                <div className="honey-thought-bubble absolute left-[80%] top-[20%] z-50 w-[200px] origin-bottom-left rounded-2xl bg-white p-4 text-black shadow-xl md:w-[280px]">
                  {/* หาง Bubble แบบความคิด (จุดๆ) */}
                  <div className="absolute bottom-[-10px] left-[-20px] flex space-x-1">
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                    <div className="relative top-2 h-3 w-3 rounded-full bg-white"></div>
                  </div>
                  <p className="text-sm font-bold italic text-gray-600 md:text-lg">
                    ( เธอทำมันได้แล้วจริงๆ <br />
                    ฉันดีใจกับเธอด้วยนะ หน้าที่ของฉันก็คงหมดลงแล้วล่ะ )
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* --- MILD GROUP (ขวาล่าง - Animation วิ่งมาจากไกล) --- */}
          <div className="pointer-events-none absolute inset-0 z-20">
            <div className="mild-group absolute bottom-[-8%] right-[3%] z-20 h-[500px] w-[280px] will-change-transform md:right-[5%] md:h-[600px] md:w-[300px]">
              <div className="mild-body-img relative h-full w-full">
                {/* Mild Assets */}
                <img
                  src={inColosseumBehindAssets.mildGiff}
                  className="absolute left-0 top-0 z-50 w-full"
                  alt="Hair Prop"
                />
                <img
                  src={inColosseumBehindAssets.mildHair}
                  className="absolute left-0 top-0 z-0 w-full"
                  alt="Hair"
                />
                <img
                  src={inColosseumBehindAssets.mildBody}
                  className="absolute left-0 top-0 z-10 w-full"
                  alt="Body"
                />
                <img
                  src={inColosseumBehindAssets.mildSadFace}
                  className="absolute left-0 top-0 z-30 w-full"
                  alt="Face"
                />
                {/* Arms (ท่าวิ่ง/ทักทาย) */}
                <img
                  src={inColosseumBehindAssets.mildArmL}
                  className="absolute left-0 top-0 z-20 w-full"
                  alt="Arm L"
                />
                <img
                  src={inColosseumBehindAssets.mildArmR}
                  className="absolute left-0 top-0 z-20 w-full"
                  alt="Arm R"
                />

                {/* Mild Speech Bubble (พูดตอนวิ่งมาถึง) */}
                <div className="mild-speech-bubble absolute right-[80%] top-[30%] z-50 w-[200px] origin-bottom-right rounded-2xl bg-pink-100 p-4 text-pink-600 shadow-xl md:w-[260px]">
                  {/* หาง Bubble แบบพูด */}
                  <div className="absolute -right-2 bottom-4 h-4 w-4 rotate-45 transform bg-pink-100"></div>
                  <p className="text-lg font-bold md:text-xl">
                    เดี๋ยวก่อนค่ะฮันนี่
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
