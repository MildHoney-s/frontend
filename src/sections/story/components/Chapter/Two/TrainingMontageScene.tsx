/* eslint-disable @typescript-eslint/no-explicit-any */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef, useMemo } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  onComplete: () => void
}

const BriefingText = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full max-w-4xl mx-auto mt-40 mb-12 px-4 relative z-10">
    <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-200 tracking-wider pl-4 border-l-4 border-blue-500 leading-relaxed">
      {children}
    </h3>
  </div>
)

export default function TrainingMontageScene({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const trainingSteps = [
    { images: ['/assets/Part2/Training/Scene 13-01.PNG', '/assets/Part2/Training/Scene 13-02.PNG', '/assets/Part2/Training/Scene 13-03.PNG'] },
    { images: ['/assets/Part2/Training/Scene 14-01.PNG', '/assets/Part2/Training/Scene 14-02.PNG'] },
    { images: ['/assets/Part2/Training/Scene 15-01.PNG'] },
    { images: ['/assets/Part2/Training/Scene 16-01.PNG', '/assets/Part2/Training/Scene 16-02.PNG', '/assets/Part2/Training/Scene 16-03.PNG'] },
  ]
  const allImages = useMemo(() => trainingSteps.flatMap(step => step.images), [])

  useLayoutEffect(() => {
    // 🟢 Force Refresh เพื่อความชัวร์ของตำแหน่ง
    ScrollTrigger.refresh()
    
    const ctx = gsap.context(() => {
      
      // =========================================================
      // 1. General Images
      // =========================================================
      const imageContainers = gsap.utils.toArray('.montage-image-container')
      
      imageContainers.forEach((container: any, i: number) => {
        if (i === 0) {
           gsap.fromTo(container, 
             { opacity: 0, y: 50, scale: 0.95 },
             {
               opacity: 1, y: 0, scale: 1, 
               duration: 1.5, 
               ease: 'power2.out', 
               delay: 0.3,
               scrollTrigger: {
                 trigger: container,
                 start: 'top 95%',
                 toggleActions: 'play reverse play reverse'
               }
             }
           )
           return 
        }

        const isMentalStack = i === 1 || i === 2
        const triggerTarget = isMentalStack ? imageContainers[0] : container

        gsap.to(container, {
          opacity: 1, y: 0, scale: 1, 
          duration: 1.2,
          delay: isMentalStack ? i * 0.4 : 0, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: triggerTarget,
            start: 'top 80%', 
            end: 'bottom 20%', 
            toggleActions: 'play reverse play reverse',
          },
        })
      })

      // =========================================================
      // 🟢 Helper Function: Parallax Effect
      // =========================================================
      // เพิ่ม parameter 'distance' เพื่อกำหนดความแรงแยกกันได้
      const addParallax = (target: string, distance: number = 40) => {
        const el = document.querySelector(target)
        if (el) {
            gsap.fromTo(el, 
                { y: -distance }, // เริ่มต้นลอยขึ้น (สวนทาง)
                { 
                    y: distance,  // จบด้วยการเลื่อนลง
                    ease: 'none',
                    scrollTrigger: {
                        trigger: el,
                        start: "top bottom", 
                        end: "bottom top",   
                        scrub: 1 
                    }
                }
            )
        }
      }

      // =========================================================
      // 2. Scene 14: Theory Class
      // =========================================================
      // อันนี้เอาเบาๆ พอ (50px)
      addParallax('.theory-container', 50)

      const theoryOverlay = document.querySelector('.theory-overlay')
      if (theoryOverlay) {
        gsap.to(theoryOverlay, {
          opacity: 1, 
          ease: 'none',
          scrollTrigger: { 
              trigger: theoryOverlay.parentElement, 
              start: 'top 20%',
              end: 'top 5%',
              scrub: 0.5, 
          }
        })
      }

      // =========================================================
      // 3. Scene 16: Physical Training (อันสุดท้าย)
      // =========================================================
      // 🟢 จัดหนักๆ ให้เห็นชัดๆ ว่าเลื่อนลงมารับ (120px)
      addParallax('.physical-overlay-container', 120)

      const physicalContainer = document.querySelector('.physical-overlay-container')
      const overlays = gsap.utils.toArray('.physical-overlay') as HTMLElement[]

      if (physicalContainer && overlays.length > 0) {
          const tl = gsap.timeline({
              scrollTrigger: {
                  trigger: physicalContainer,
                  start: "top 20%", 
                  end: "bottom 40%", 
                  scrub: 1, 
              }
          })

          tl.to(overlays[0], { opacity: 1, duration: 1 })
          tl.to({}, { duration: 0.2 }) 
          tl.to(overlays[1], { opacity: 1, duration: 1 })
      }

      // End Trigger
      ScrollTrigger.create({
        trigger: '.end-spacer', 
        start: "top bottom",    
        onEnter: () => {
             setTimeout(() => { onComplete && onComplete() }, 800)
        },
        once: true 
      })

    }, containerRef)
    return () => ctx.revert()
  }, [onComplete])

  const getMentalStyle = (index: number) => {
    const baseStyle = "transition-all duration-500 translate-y-24"
    if (index === 0) return `z-10 ${baseStyle}`
    if (index === 1) return `z-20 -mt-[280px] ml-[15%] rotate-3 ${baseStyle}`
    if (index === 2) return `z-30 -mt-[200px] mr-[15%] -rotate-2 mb-[200px] ${baseStyle}` 
    return ""
  }

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-black px-4 py-20 pb-0"> 

      <h2 className="mb-20 text-center text-4xl font-bold text-white/30 tracking-[0.2em] uppercase">
        // Initiate Training Protocol //
      </h2>

      <div className="mx-auto max-w-4xl flex flex-col items-center">

        {allImages.map((src, index) => {
          if (index === 4 || index >= 6) return null

          let briefingContext = null
          if (index === 0) {
            briefingContext = <BriefingText>ขั้นที่ 1: การฝึกควบคุมจิตและสมาธิขั้นสูง</BriefingText>
          } else if (index === 3) {
             briefingContext = (
                <div className="mt-20 w-full">
                    <BriefingText>ขั้นที่ 2: ศึกษาทฤษฎีการใช้เวทมนตร์</BriefingText>
                </div>
             )
          } else if (index === 5) {
              briefingContext = <BriefingText>ขั้นที่ 3: ฝึกการใช้เวทมนตร์ในการต่อสู้</BriefingText>
          }

          const imageElement = (
            <div key={index} className={`montage-image-container w-full opacity-0 mb-20 ${getMentalStyle(index)}`}>
               {index === 3 ? (
                  <div className="theory-container relative">
                    <img src={src} alt="Theory Base" className="w-full h-auto rounded-xl shadow-2xl border-4 border-white/5 relative z-10" loading="eager" />
                    <img src={allImages[index + 1]} alt="Theory Overlay" className="theory-overlay w-full h-full rounded-xl shadow-2xl border-4 border-white/5 absolute inset-0 z-20 opacity-0 object-cover" loading="eager" />
                  </div>
               ) : (
                   <img src={src} alt={`Training Scene ${index + 1}`} className="w-full h-auto rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] border-4 border-white/5" loading="eager" />
               )}
            </div>
          )

          return (
            <div key={`step-${index}`} className="w-full flex flex-col items-center">
                {briefingContext}
                {imageElement}
            </div>
          )
        })}
        <BriefingText>ขั้นสุดท้าย: การฝึกฝนร่างกาย</BriefingText>

        <div className="physical-overlay-container w-full mt-12 relative rounded-xl shadow-2xl border-4 border-white/5 bg-black overflow-hidden mb-20">
            <img src={allImages[6]} alt="Physical Base" className="w-full h-auto relative z-10 block" loading="eager" />
            <img src={allImages[7]} alt="Physical Overlay 1" className="physical-overlay w-full h-full absolute inset-0 z-20 opacity-0 object-cover" loading="eager" />
            <img src={allImages[8]} alt="Physical Overlay 2" className="physical-overlay w-full h-full absolute inset-0 z-30 opacity-0 object-cover" loading="eager" />
        </div>

      </div>

      <div className="end-spacer w-full h-[20vh] bg-transparent"></div>
    </div>
  )
}