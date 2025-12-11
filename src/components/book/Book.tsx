import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

import { Page, SAMPLE_PAGES } from './_mock/Example'

gsap.registerPlugin(ScrollTrigger)

// ----------------------------------------------------------------------

export default function Book({ pages = SAMPLE_PAGES }: { pages?: Page[] }) {
  const wrapperRef = useRef<HTMLDivElement | null>(null) // wrapper to pin (has max-width + mx-auto)
  const containerRef = useRef<HTMLDivElement | null>(null) // inner book container for perspective
  const pageRefs = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    const totalPages = pages.length

    // initial styles for each page element (will be centered)
    pageRefs.current.forEach((el, i) => {
      if (!el) return
      gsap.set(el, {
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
        // keep transform origin on left edge (page flip hinge)
        transformOrigin: 'left center',
        rotateY: 0,
        zIndex: totalPages - i,
        willChange: 'transform',
      })
    })

    // set perspective on the container (inner) which will be centered inside wrapper
    if (containerRef.current) {
      containerRef.current.style.perspective = '1400px'
    }

    // timeline that maps to scroll
    const tl = gsap.timeline({
      defaults: { ease: 'none', duration: 1 },
      scrollTrigger: {
        // pin the wrapper (the centered element) so pinned element stays centered
        trigger: wrapperRef.current,
        start: 'top top',
        // choose end based on viewport height (1 screen per page)
        end: () => `+=${totalPages * window.innerHeight}`,
        scrub: 0.6,
        pin: wrapperRef.current, // pin the wrapper so it remains centered while scrolling
        anticipatePin: 1,
        snap: {
          snapTo: 1 / totalPages,
          duration: { min: 0.15, max: 0.6 },
          delay: 0.02,
          ease: 'power1.out',
        },
        // markers: true,
      },
    })

    // animate each page flip at sequential positions
    pages.forEach((_p, i) => {
      const el = pageRefs.current[i]
      if (!el) return

      tl.to(
        el,
        {
          rotateY: -180,
          transformOrigin: 'left center',
          onStart: () => {
            // temporarily bring page to top while animating
            gsap.set(el, { zIndex: totalPages + 10 })
          },
          onReverseComplete: () => {
            // restore ordering when flipping back
            pageRefs.current.forEach((pEl, idx) => {
              if (pEl) gsap.set(pEl, { zIndex: totalPages - idx })
            })
          },
        },
        i, // position on timeline
      )
    })

    // cleanup
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
      tl.kill()
    }
  }, [pages])

  return (
    // wrapperRef is the centered block we will pin — ensure width + margin auto
    <div ref={wrapperRef} className="mx-auto w-full">
      {/* book area with fixed height (adaptable) and centered content */}
      <div
        className="relative w-full"
        style={{
          height:
            typeof window !== 'undefined'
              ? Math.min(window.innerHeight * 0.8, 720)
              : 480,
        }}
      >
        {/* inner container has perspective */}
        <div ref={containerRef} className="relative h-full w-full">
          {/* pages: absolutely positioned and centered horizontally */}
          {pages.map((p, i) => {
            return (
              <div
                key={p.id}
                className="pointer-events-none absolute inset-0 flex items-stretch justify-center"
              >
                {/* page element centered: left-1/2 translate-x-1/2 ensures center alignment even when pinned */}
                <div
                  ref={(el) => (pageRefs.current[i] = el)}
                  className="absolute left-1/2 top-0 h-full -translate-x-1/2"
                  style={{ width: '50%', maxWidth: '640px' }}
                >
                  {/* front */}
                  <div className="absolute inset-0 overflow-hidden border border-slate-200 bg-white shadow-md">
                    {p.front}
                  </div>

                  {/* back side */}
                  <div
                    className="absolute inset-0 border border-slate-200 bg-white shadow-md"
                    style={{
                      transform: 'rotateY(180deg)',
                      backfaceVisibility: 'hidden',
                    }}
                  >
                    {p.back ?? null}
                  </div>
                </div>
              </div>
            )
          })}

          {/* spine visual: centered */}
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-full -translate-x-1/2"
            style={{ width: 4 }}
          />
        </div>
      </div>
    </div>
  )
}
