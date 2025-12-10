/* eslint-disable @typescript-eslint/no-explicit-any */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useMemo, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  onComplete: () => void
}

const BriefingText = ({ children }: { children: React.ReactNode }) => (
  <div className="relative z-10 mx-auto mb-12 mt-40 w-full max-w-4xl px-4">
    <h3 className="border-l-4 border-blue-500 bg-gradient-to-r from-blue-400 to-purple-200 bg-clip-text pl-4 text-2xl font-bold leading-relaxed tracking-wider text-transparent">
      {children}
    </h3>
  </div>
)

export default function TrainingMontageScene({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasCompleted = useRef(false)

  const trainingSteps = [
    {
      images: [
        '/assets/Part2/Training/Scene 13-01.PNG',
        '/assets/Part2/Training/Scene 13-02.PNG',
        '/assets/Part2/Training/Scene 13-03.PNG',
      ],
    },
    {
      images: [
        '/assets/Part2/Training/Scene 14-01.PNG',
        '/assets/Part2/Training/Scene 14-02.PNG',
      ],
    },
    { images: ['/assets/Part2/Training/Scene 15-01.PNG'] },
    {
      images: [
        '/assets/Part2/Training/Scene 16-01.PNG',
        '/assets/Part2/Training/Scene 16-02.PNG',
        '/assets/Part2/Training/Scene 16-03.PNG',
      ],
    },
  ]
  const allImages = useMemo(
    () => trainingSteps.flatMap((step) => step.images),
    [],
  )

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // =========================================================
      // 1. General Images (Scene 13 - Mental Training Stack)
      // =========================================================
      const imageContainers = gsap.utils.toArray('.montage-image-container')

      imageContainers.forEach((container: any, i: number) => {
        if (i === 0) {
          gsap.fromTo(
            container,
            { opacity: 0, y: 50, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.5,
              ease: 'power2.out',
              delay: 0.3,
              scrollTrigger: {
                trigger: container,
                start: 'top 95%',
                toggleActions: 'play none none none',
              },
            },
          )
          return
        }

        const isMentalStack = i === 1 || i === 2
        const triggerTarget = isMentalStack ? imageContainers[0] : container
        const delayMultiplier = i === 2 ? 1.5 : 0.7

        gsap.to(container, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: i === 2 ? 1.6 : 1.2,
          delay: isMentalStack ? i * delayMultiplier : 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: triggerTarget,
            start: 'top 60%',
            end: 'bottom 5%',
            toggleActions: 'play none none none',
          },
        })
      })

      // =========================================================
      // Helper Function: Parallax Effect
      // =========================================================
      const addParallax = (target: string, distance: number = 60) => {
        const el = document.querySelector(target)
        if (el) {
          gsap.fromTo(
            el,
            { y: -distance },
            {
              y: distance,
              ease: 'none',
              scrollTrigger: {
                trigger: el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            },
          )
        }
      }

      // =========================================================
      // 2. Scene 14: Theory Class
      // =========================================================
      addParallax('.theory-container', 100) // Increased from 50 to 100

      const theoryOverlay = document.querySelector('.theory-overlay')
      if (theoryOverlay) {
        gsap.to(theoryOverlay, {
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: theoryOverlay.parentElement,
            start: 'top 20%',
            end: 'top 10%',
            scrub: 0.5,
          },
        })
      }

      // =========================================================
      // 3. Scene 16: Physical Training (Last Image - Extended)
      // =========================================================
      addParallax('.physical-overlay-container', 200) // Increased from 120 to 200

      const physicalContainer = document.querySelector(
        '.physical-overlay-container',
      )
      const overlays = gsap.utils.toArray('.physical-overlay') as HTMLElement[]

      if (physicalContainer && overlays.length > 0) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: physicalContainer,
            start: 'top 20%',
            end: 'bottom 20%', // Changed from 40% to 20% for longer display
            scrub: 1,
          },
        })

        tl.to(overlays[0], { opacity: 1, duration: 1 })
        tl.to({}, { duration: 0.5 }) // Increased pause between overlays
        tl.to(overlays[1], { opacity: 1, duration: 1 })
        tl.to({}, { duration: 1 }) // Add hold time at the end
      }

      // End Trigger - Moved further down for longer viewing
      ScrollTrigger.create({
        trigger: '.end-spacer',
        start: 'top 60%', // Changed from 'bottom' to 'top 60%' - triggers earlier but after scrolling past image
        onEnter: () => {
          if (!hasCompleted.current) {
            hasCompleted.current = true
            setTimeout(() => {
              onComplete?.()
            }, 1000) // Increased from 800ms to 1000ms
          }
        },
        once: true,
      })
    }, containerRef)
    
    return () => ctx.revert()
  }, [onComplete, allImages])

  const getMentalStyle = (index: number) => {
    const baseStyle = 'transition-all duration-500 translate-y-24'
    if (index === 0) return `z-10 ${baseStyle}`
    if (index === 1) return `z-20 -mt-[280px] ml-[15%] rotate-3 ${baseStyle}`
    if (index === 2)
      return `z-30 -mt-[150px] mr-[15%] -rotate-2 mb-[200px] ${baseStyle}` // Changed from -mt-[200px] to -mt-[150px]
    return ''
  }

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full bg-black px-4 py-20 pb-0"
    >
      <h2 className="mb-20 text-center text-6xl font-semibold uppercase tracking-wider text-white/30">
        // เริ่มต้นโปรแกรมฝึกพิเศษ //
      </h2>

      <div className="mx-auto flex max-w-4xl flex-col items-center">
        {allImages.map((src, index) => {
          if (index === 4 || index >= 6) return null

          let briefingContext = null
          if (index === 0) {
            briefingContext = (
              <BriefingText>
                ขั้นที่ 1: การฝึกควบคุมจิตและสมาธิขั้นสูง
              </BriefingText>
            )
          } else if (index === 3) {
            briefingContext = (
              <div className="mt-20 w-full">
                <BriefingText>ขั้นที่ 2: ศึกษาทฤษฎีการใช้เวทมนตร์</BriefingText>
              </div>
            )
          } else if (index === 5) {
            briefingContext = (
              <BriefingText>
                ขั้นที่ 3: ฝึกการใช้เวทมนตร์ในการต่อสู้
              </BriefingText>
            )
          }

          const imageElement = (
            <div
              key={index}
              className={`montage-image-container mb-20 w-full opacity-0 ${getMentalStyle(
                index,
              )}`}
            >
              {index === 3 ? (
                <div className="theory-container relative">
                  <img
                    src={src}
                    alt="Theory Base"
                    className="relative z-10 h-auto w-full rounded-xl border-4 border-white/5 shadow-2xl"
                    loading="eager"
                  />
                  <img
                    src={allImages[index + 1]}
                    alt="Theory Overlay"
                    className="theory-overlay absolute inset-0 z-20 h-full w-full rounded-xl border-4 border-white/5 object-cover opacity-0 shadow-2xl"
                    loading="eager"
                  />
                </div>
              ) : (
                <img
                  src={src}
                  alt={`Training Scene ${index + 1}`}
                  className="h-auto w-full rounded-xl border-4 border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
                  loading="eager"
                />
              )}
            </div>
          )

          return (
            <div
              key={`step-${index}`}
              className="flex w-full flex-col items-center"
            >
              {briefingContext}
              {imageElement}
            </div>
          )
        })}
        <BriefingText>ขั้นสุดท้าย: การฝึกฝนร่างกาย</BriefingText>

        <div className="physical-overlay-container relative mb-20 mt-12 w-full overflow-hidden rounded-xl border-4 border-white/5 bg-black shadow-2xl">
          <img
            src={allImages[6]}
            alt="Physical Base"
            className="relative z-10 block h-auto w-full"
            loading="eager"
          />
          <img
            src={allImages[7]}
            alt="Physical Overlay 1"
            className="physical-overlay absolute inset-0 z-20 h-full w-full object-cover opacity-0"
            loading="eager"
          />
          <img
            src={allImages[8]}
            alt="Physical Overlay 2"
            className="physical-overlay absolute inset-0 z-30 h-full w-full object-cover opacity-0"
            loading="eager"
          />
        </div>
      </div>

      {/* Increased spacer height for longer viewing time */}
      <div className="end-spacer h-[80vh] w-full bg-transparent"></div>
    </div>
  )
}