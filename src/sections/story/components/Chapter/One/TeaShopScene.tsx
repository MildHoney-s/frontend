import { teashopSceneAssets } from '@/assets/chapterOneAssets'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  onComplete: () => void
}

// 🟢 CONFIG: สัดส่วนภาพต้นฉบับ (16:9)
const DESIGN_W = 1920
const DESIGN_H = 1080
const ASPECT_RATIO = DESIGN_W / DESIGN_H

export default function TeasShopScene({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const sceneRef = useRef<HTMLDivElement | null>(null)

  // แก้ path ให้ตรงกับไฟล์จริง

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ==== INITIAL STATE ====
      gsap.set('.black-overlay', { autoAlpha: 1 })

      // Mild
      gsap.set('.mild-wrapper', {
        xPercent: 145,
        yPercent: 0, // ✅ เริ่มจากด้านล่าง
        autoAlpha: 1,
      })
      gsap.set('.mild-face-normal', { autoAlpha: 1 })
      gsap.set(['.mild-face-smile', '.mild-face-happy'], { autoAlpha: 0 })

      // ✅ Arm Setup: เริ่มต้นใช้ Arm 2 (คุย)
      gsap.set(['.mild-arm-2-l', '.mild-arm-2-r'], { autoAlpha: 1 })
      gsap.set(['.mild-arm-1-l', '.mild-arm-milktea-r'], { autoAlpha: 0 }) // ซ่อนชุดกินชานมไว้ก่อน

      // BG
      gsap.set('.bg-market', { autoAlpha: 1 })
      gsap.set('.bg-shop', { autoAlpha: 0 })
      gsap.set('.bg-close-up', { autoAlpha: 0 })

      // bubbles
      gsap.set(
        [
          '.bubble-mild-1',
          '.bubble-staff-1',
          '.bubble-mild-2',
          '.bubble-staff-2',
          '.bubble-staff-3',
          '.bubble-mild-drink',
        ],
        { scale: 0.8, autoAlpha: 0, transformOrigin: 'bottom left' },
      )

      // ==== MAIN TIMELINE (scroll + pin) ====
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=6500', // ความยาวฉาก ปรับได้
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          // markers: true,
          onLeave: () => {
            requestAnimationFrame(() => onComplete?.())
          },
        },
      })

      // 1) เปิดฉากออกจากดำ
      tl.to('.black-overlay', { autoAlpha: 0, duration: 1.5 })

      // 2) มายด์เดินในเมือง (market wide shot)
      tl.addLabel('walk')
      tl.to(
        '.mild-wrapper',
        {
          yPercent: -30, // ✅ เดินจากล่างขึ้นมาจุดปกติ
          duration: 2.2,
          ease: 'power1.inOut',
        },
        'walk',
      ).to(
        '.mild-wrapper',
        {
          y: '-=6',
          repeat: 6,
          yoyo: true,
          duration: 0.35,
          ease: 'sine.inOut',
        },
        'walk',
      )

      // 3) บับเบิลคิด: “หาอะไรหวานๆกินก่อน...”
      tl.to(
        '.bubble-mild-1',
        {
          scale: 1,
          autoAlpha: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
        },
        'walk+=0.5',
      )
        .to('.bubble-mild-1', {
          autoAlpha: 0,
          scale: 0.8,
          duration: 0.4,
        })
        .addLabel('afterThink')

      // 4) พนักงานเรียกลูกค้า
      tl.to(
        '.bubble-staff-1',
        {
          scale: 1,
          autoAlpha: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
        },
        'afterThink+=0.2',
      )
        .to('.bubble-staff-1', {
          autoAlpha: 0,
          scale: 0.8,
          duration: 0.4,
          delay: 1.1,
        })
        // เปลี่ยนหน้าเป็นตกใจ
        .to(
          '.mild-face-normal',
          { autoAlpha: 0, duration: 0.1 },
          'afterThink+=0.2',
        )
        .to(
          '.mild-face-smile',
          { autoAlpha: 1, duration: 0.1 },
          'afterThink+=0.25',
        )

      // 5) มายด์คิด “อุ้ย! ชานมก็น่าสนใจนะ...”
      tl.to(
        '.bubble-mild-2',
        {
          scale: 1,
          autoAlpha: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
        },
        'afterThink+=1.4',
      ).to('.bubble-mild-2', {
        autoAlpha: 0,
        scale: 0.8,
        duration: 0.4,
        delay: 1.1,
      })

      // 6) เดินเข้าใกล้ร้าน + ตัดเป็นภาพหน้าร้าน close-up
      tl.addLabel('toShop')
      tl.to(
        '.mild-wrapper',
        {
          xPercent: 120,
          yPercent: -40,
          duration: 1.2,
          ease: 'power2.inOut',
        },
        'toShop',
      )

      // fade ดำแล้ว crossfade BG
      tl.to(
        '.black-overlay',
        { autoAlpha: 1, duration: 0.4, ease: 'power2.in' },
        'toShop+=0.6',
      )
        .set('.bg-market', { autoAlpha: 0 })
        .set('.bg-shop', { autoAlpha: 1 })
        // reposition / scale มายด์ให้ใหญ่ขึ้นหน้าเคาน์เตอร์
        .set('.mild-wrapper', {
          xPercent: 50,
          yPercent: 0,
          bottom: '5%',
          left: '50%',
          x: '-50%',
          width: '30%',
          height: '65%',
        })
        .to('.black-overlay', {
          autoAlpha: 0,
          duration: 0.4,
          ease: 'power2.out',
        })

      // 7) บทสนทนาหน้าร้าน
      // 7.1 พนักงาน: “เอาเหมือนเดิมใช่ไหมคะ...”
      tl.to('.bubble-staff-2', {
        scale: 1,
        autoAlpha: 1,
        duration: 0.5,
        ease: 'back.out(1.7)',
      }).to('.bubble-staff-2', {
        autoAlpha: 0,
        scale: 0.8,
        duration: 0.4,
        delay: 1.3,
      })

      // 7.2 จำลองเวลาผ่านไป (พักนิดนึง + สั่นเล็กน้อยเหมือนกำลังทำชานม)
      tl.to(
        '.mild-wrapper',
        {
          x: '+=4',
          duration: 0.12,
          repeat: 5,
          yoyo: true,
          ease: 'power1.inOut',
        },
        '>-0.5',
      )

      // 7.3 พนักงาน: “นี่ค่ะได้แล้วนะคะ”
      tl.to('.bubble-staff-3', {
        scale: 1,
        autoAlpha: 1,
        duration: 0.5,
        ease: 'back.out(1.7)',
      }).to('.bubble-staff-3', {
        autoAlpha: 0,
        scale: 0.8,
        duration: 0.4,
        delay: 1.3,
      })

      // ===========================
      // 8) CUT TO CLOSE-UP DRINKING
      // ===========================
      tl.addLabel('toCloseUp')

      // เฟดดำ → เปลี่ยน BG เป็น close-up + ขยับตำแหน่ง/ขนาดมายด์
      tl.to(
        '.black-overlay',
        { autoAlpha: 1, duration: 0.4, ease: 'power2.in' },
        'toCloseUp',
      )
        .set('.bg-shop', { autoAlpha: 0 })
        .set('.mild-wrapper', {
          autoAlpha: 0,
        })
        .set('.bg-close-up', {
          autoAlpha: 1,
        })
        .to('.black-overlay', {
          autoAlpha: 0,
          duration: 0.4,
          ease: 'power2.out',
        })

      // เปลี่ยนแขนเป็นชุดถือชานม
      tl.to(['.mild-arm-2-l', '.mild-arm-2-r'], {
        autoAlpha: 0,
        duration: 0.1,
      }).to(
        ['.mild-arm-1-l', '.mild-arm-milktea-r'],
        { autoAlpha: 1, duration: 0.1 },
        '<',
      )

      // เปลี่ยนหน้าเป็นยิ้ม + ทำท่าดูดชานมเด้งเบา ๆ ในฉาก close-up
      tl.to('.mild-face-smile', { autoAlpha: 0, duration: 0.15 })
        .to('.mild-face-happy', { autoAlpha: 1, duration: 0.15 }, '<')
        .to('.mild-wrapper', {
          y: '-=4',
          duration: 0.6,
          repeat: 4,
          yoyo: true,
          ease: 'sine.inOut',
        })

      // ====================================
      // 9) กลับไปหน้าร้าน + พูด "หวานกำลังดีเลย..."
      // ====================================
      tl.addLabel('backToShop')

      tl.to('.black-overlay', {
        autoAlpha: 1,
        duration: 0.4,
        ease: 'power2.in',
      })
        .set('.bg-close-up', { autoAlpha: 0 })
        .set('.bg-shop', { autoAlpha: 1 })
        .set('.mild-wrapper', {
          xPercent: 50,
          yPercent: 0,
          bottom: '5%',
          left: '50%',
          x: '-50%',
          width: '30%',
          height: '65%',
          autoAlpha: 1,
          y: 0,
        })
        .to('.black-overlay', {
          autoAlpha: 0,
          duration: 0.4,
          ease: 'power2.out',
        })

      tl.to(['.mild-arm-2-l', '.mild-arm-2-r'], { autoAlpha: 0, duration: 0.1 })
      tl.to(
        ['.mild-arm-1-l', '.mild-arm-milktea-r'],
        { autoAlpha: 1, duration: 0.1 },
        '<',
      )

      // 8) มายด์ดูดชานม → หน้ายิ้มแฮปปี้
      tl.to('.mild-face-smile', { autoAlpha: 0, duration: 0.15 })
        .to('.mild-face-happy', { autoAlpha: 1, duration: 0.15 }, '<')
        .to('.bubble-mild-drink', {
          scale: 1,
          autoAlpha: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
        })
        .to('.mild-wrapper', {
          y: '-=4',
          duration: 0.6,
          repeat: 4,
          yoyo: true,
          ease: 'sine.inOut',
        })

      // 9) ปิดฉากด้วย fade to black
      tl.to('.black-overlay', { autoAlpha: 1, duration: 1.2 }, '+=1')
      tl.to({}, { duration: 0.5 }) // เว้นจังหวะนิดนึงก่อนเปลี่ยนฉาก
    }, containerRef)

    return () => ctx.revert()
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black"
    >
      {/* SCENE: บังคับสัดส่วนเหมือน HouseScene */}
      <div
        ref={sceneRef}
        className="@container relative shadow-2xl"
        style={{
          width: '100vw',
          height: `${100 / ASPECT_RATIO}vw`,
          minHeight: '100vh',
          minWidth: `${100 * ASPECT_RATIO}vh`,
        }}
      >
        {/* ================= BG LAYER ================= */}
        <div className="bg-market absolute inset-0 z-0">
          <img
            src={teashopSceneAssets.marketBgImg}
            className="h-full w-full object-cover"
            alt="Market"
          />
        </div>
        <div className="bg-shop absolute inset-0 z-0 opacity-0">
          <img
            src={teashopSceneAssets.shopBgImg}
            className="h-full w-full object-cover"
            alt="Tea Shop Front"
          />
        </div>
        <div className="bg-close-up absolute inset-0 z-0 opacity-0">
          <img
            src={teashopSceneAssets.closeUpBgImg}
            alt="Close Up Drink"
            className="h-full w-full object-cover"
          />
        </div>

        {/* =============== MILD (เดิน + หน้าร้าน) =============== */}
        <div className="mild-wrapper absolute bottom-[10%] left-[20%] z-10 flex h-[55%] w-[25%] items-end justify-center">
          {/* ✅ Bubble จะขยับตามตัวละครอัตโนมัติ */}
          <div
            className="bubble-mild-1 absolute -left-[10%] -top-[5%] z-30 w-full
               origin-bottom-left scale-75 rounded-3xl bg-white/95
               p-[5%] text-black opacity-0 shadow-xl"
          >
            <p className="text-[1.1cqw] leading-snug">
              <span className="block text-[0.9cqw] text-gray-500">
                (คิดในใจ)
              </span>
              หาอะไรหวานๆกินก่อนไปซ้อมดีกว่า
              <br />
              ว่าแต่วันนี้กินอะไรดีนะ?
            </p>
            <div className="absolute -bottom-[12%] left-[88%] h-[1.3cqw] w-[1.3cqw] rounded-full bg-white" />
            <div className="absolute -bottom-[20%] left-[82%] h-[0.9cqw] w-[0.9cqw] rounded-full bg-white" />
          </div>

          {/* มายด์คิด “อุ้ย! ชานมก็…” */}
          <div
            className="bubble-mild-2 absolute -left-[10%] -top-[5%] z-20 w-full
                     origin-bottom-left scale-75 rounded-3xl bg-white/95
               p-[5%] text-black opacity-0 shadow-xl"
          >
            <p className="text-[1.1cqw] leading-snug">
              <span className="block text-[0.9cqw] text-gray-500">
                (คิดในใจ)
              </span>
              อุ้ย! ชานมก็น่าสนใจนะ…
              <br />
              ไปซื้อสักแก้วดีกว่า
            </p>
            <div className="absolute -bottom-[12%] left-[88%] h-[1.3cqw] w-[1.3cqw] rounded-full bg-white" />
            <div className="absolute -bottom-[20%] left-[82%] h-[0.9cqw] w-[0.9cqw] rounded-full bg-white" />
          </div>

          <div className="mild-group relative bottom-0 h-full w-[90%]">
            <div className="mild-body-img relative h-full w-full">
              {/* Body parts */}
              <img
                src={teashopSceneAssets.mildHair}
                className="absolute left-0 top-0 z-0 h-full w-full object-contain"
                alt="Back Hair"
              />
              <img
                src={teashopSceneAssets.mildBody}
                className="absolute left-0 top-0 z-10 h-full w-full object-contain"
                alt="Body"
              />
              {/* ✅ ชุดแขนที่ 1 (Arm 2 - ใช้ตอนคุย) */}
              <img
                src={teashopSceneAssets.mildArmLNormal}
                className="mild-arm-2-l absolute left-0 top-[5%] z-20 w-full"
                alt="L Arm 2"
              />
              <img
                src={teashopSceneAssets.mildArmRNormal}
                className="mild-arm-2-r absolute left-0 top-[5%] z-20 w-full"
                alt="R Arm 2"
              />

              {/* ✅ ชุดแขนที่ 2 (Arm 1 + MilkTea - ใช้ตอนกิน) */}
              <img
                src={teashopSceneAssets.mildArmLNormal}
                className="mild-arm-1-l absolute left-0 top-[5%] z-20 w-full opacity-0"
                alt="L Arm 1"
              />
              <img
                src={teashopSceneAssets.mildArmRMilkTea}
                className="mild-arm-milktea-r absolute left-0 top-[5%] z-40 w-full opacity-0"
                alt="R Arm MilkTea"
              />

              {/* Faces */}
              <div
                className="absolute z-30"
                style={{
                  top: '7%',
                  left: '0%',
                  width: '100%',
                  height: 'auto',
                }}
              >
                <img
                  src={teashopSceneAssets.mildFaceNormal}
                  className="mild-face-normal w-full object-contain"
                  alt="Normal"
                />
                <img
                  src={teashopSceneAssets.mildFaceSmile_1}
                  className="mild-face-smile absolute left-0 top-0 w-full object-contain"
                  alt="Smile 1"
                />
                <img
                  src={teashopSceneAssets.mildFaceSmile_2}
                  className="mild-face-happy absolute left-0 top-0 w-full object-contain"
                  alt="Smile 2"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ================== BUBBLES ================== */}

        {/* พนักงานเรียกลูกค้า (อยู่แถวเต็นท์ร้าน) */}
        <div
          className="bubble-staff-1 absolute left-[18%] top-[8%] z-20 w-[26%]
                     origin-bottom-left rounded-3xl bg-white p-[1.8%] text-black shadow-xl"
        >
          <p className="text-[1.1cqw] leading-snug">
            <span className="font-bold">พนักงาน:</span> เร่เข้ามาๆ
            ชานมหวานๆสูตรโบราณเจ้าเก่า พร้อมให้รับประทานแล้วค่ะ~
          </p>
          <div
            className="absolute -bottom-[14%] right-[12%]
               h-0 w-0
               origin-top rotate-[-8deg] border-l-[1.1cqw]
               border-r-[1.1cqw] border-t-[1.6cqw] border-l-transparent
               border-r-transparent border-t-white"
          />
        </div>

        {/* หน้าร้าน: พนักงานถามเหมือนเดิมไหม */}
        <div
          className="bubble-staff-2 absolute left-[18%] top-[12%] z-30 w-[26%]
                     origin-bottom-left rounded-3xl bg-white p-[1.8%] text-black shadow-xl"
        >
          <p className="text-[1.1cqw] leading-snug">
            <span className="font-bold">พนักงาน:</span> เอาเหมือนเดิมใช่ไหมคะ?
            ได้เลยค่ะ รอสักครู่นะคะ~
          </p>
          <div
            className="absolute -bottom-[14%] right-[12%]
               h-0 w-0
               origin-top rotate-[-8deg] border-l-[1.1cqw]
               border-r-[1.1cqw] border-t-[1.6cqw] border-l-transparent
               border-r-transparent border-t-white"
          />
        </div>

        {/* หลังผ่านไปสักพัก พนักงานยื่นแก้วให้ */}
        <div
          className="bubble-staff-3 absolute left-[18%] top-[12%] z-30 w-[24%]
                     origin-bottom-left rounded-3xl bg-white p-[1.8%] text-black shadow-xl"
        >
          <p className="text-[1.1cqw] leading-snug">
            <span className="font-bold">พนักงาน:</span> นี่ค่ะ ได้แล้วนะคะ
            ขอให้เอร็ดอร่อยค่ะ~
          </p>
          <div
            className="absolute -bottom-[14%] right-[12%]
               h-0 w-0
               origin-top rotate-[-8deg] border-l-[1.1cqw]
               border-r-[1.1cqw] border-t-[1.6cqw] border-l-transparent
               border-r-transparent border-t-white"
          />
        </div>

        {/* มายด์ดูดชานมยิ้มฟิน */}
        <div
          className="bubble-mild-drink absolute right-[22%] top-[25%] z-30 w-[26%]
                     origin-bottom-left rounded-3xl bg-white p-[1.8%] text-black shadow-xl"
        >
          <p className="text-[1.1cqw] leading-snug">
            <span className="block text-[0.9cqw] text-gray-500">(คิดในใจ)</span>
            หวานกำลังดีเลย… <br />
            แบบนี้มีแรงไปซ้อมต่อแน่นอน♪
          </p>
          <div className="absolute -bottom-[12%] right-[22%] h-[1.3cqw] w-[1.3cqw] rounded-full bg-white" />
          <div className="absolute -bottom-[20%] right-[28%] h-[0.9cqw] w-[0.9cqw] rounded-full bg-white" />
        </div>

        {/* BLACK OVERLAY ปิดฉาก / transition */}
        <div className="black-overlay pointer-events-none absolute inset-0 z-[100] bg-black" />
      </div>
    </div>
  )
}
