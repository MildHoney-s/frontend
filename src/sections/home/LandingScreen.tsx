import useKeyPress from '@/hooks/useKeyPress'
import gsap from 'gsap'
import { useCallback, useEffect, useRef, useState } from 'react'

interface LandingScreenProps {
  onStart: () => void
  coverSrc?: string
  pageSrc?: string
  flipSfxSrc?: string
  tagSrc?: string
}

export default function LandingScreenGSAP({
  onStart,
  coverSrc = '/assets/book/book-cover.png',
  pageSrc = '/assets/book/book-back-cover.png',
  flipSfxSrc,
  tagSrc,
}: LandingScreenProps) {
  // ---------- state & refs ----------
  const [visible, setVisible] = useState(true)
  const [opening, setOpening] = useState(false)
  const [currentCoverSrc, setCurrentCoverSrc] = useState<string>(coverSrc)

  const rootRef = useRef<HTMLDivElement | null>(null)
  const coverRef = useRef<HTMLDivElement | null>(null)
  const coverImageRef = useRef<HTMLDivElement | null>(null)
  const coverShadowRef = useRef<HTMLDivElement | null>(null)
  const innerPageRef = useRef<HTMLDivElement | null>(null)
  const innerPageSurfaceRef = useRef<HTMLDivElement | null>(null)
  const innerPageFoldRef = useRef<HTMLDivElement | null>(null)
  const pageShadowRef = useRef<HTMLDivElement | null>(null)
  const backCoverRef = useRef<HTMLDivElement | null>(null)
  const sfxRef = useRef<HTMLAudioElement | null>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const startedRef = useRef(false)

  const bookWidth = 380
  const bookHeight = 560

  // ---------- preload utility ----------
  const preload = useCallback((src?: string) => {
    if (!src) return
    const img = new Image()
    img.src = src
  }, [])

  // ---------- audio ----------
  useEffect(() => {
    if (!flipSfxSrc) return
    const audio = new Audio(flipSfxSrc)
    audio.preload = 'auto'
    sfxRef.current = audio
    return () => {
      // stop & cleanup
      audio.pause()
      sfxRef.current = null
    }
  }, [flipSfxSrc])

  const playSfx = useCallback((delay = 0) => {
    if (!sfxRef.current) return
    try {
      sfxRef.current.currentTime = 0
      if (delay <= 0) sfxRef.current.play().catch(() => {})
      else gsap.delayedCall(delay, () => sfxRef.current?.play().catch(() => {}))
    } catch {
      /* empty */
    }
  }, [])

  // focus button (if any) on mount
  useEffect(() => {
    const btn =
      rootRef.current?.querySelector<HTMLButtonElement>('button.open-btn')
    btn?.focus()
  }, [])

  // keypress support
  useKeyPress('Enter', () => {
    if (!visible) return
    handleOpen()
  })

  // ---------- open animation ----------
  const finishAndStart = useCallback(() => {
    if (startedRef.current) return
    startedRef.current = true

    const bookEl = coverRef.current
    const rootEl = rootRef.current
    if (!bookEl || !rootEl) {
      // fallback: ถ้าไม่เจอ element ก็ fade อย่างเดียว
      gsap.to(rootEl, {
        autoAlpha: 0,
        duration: 0.6,
        ease: 'power1.inOut',
        onComplete: () => {
          setVisible(false)
          onStart()
        },
      })
      return
    }

    // 1) หาตำแหน่งของหนังสือใน viewport
    const rect = bookEl.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // 2) หาตำแหน่งกลางของหน้าจอ
    const viewportX = window.innerWidth / 2
    const viewportY = window.innerHeight / 2

    // 3) คำนวน offset ที่ root ต้องเลื่อนไปให้หนังสืออยู่กลางจอขณะซูม
    const offsetX = viewportX - centerX
    const offsetY = viewportY - centerY

    const tl = gsap.timeline()

    // --- Zoom-in + move ---
    tl.to(rootEl, {
      scale: 1.4, // ขยายประมาณนี้กำลังสวย ปรับได้
      x: offsetX,
      y: offsetY,
      duration: 0.9,
      ease: 'power3.inOut',
    })

    // --- Fade out ---
    tl.to(rootEl, {
      autoAlpha: 0,
      duration: 0.5,
      ease: 'power1.inOut',
      onComplete: () => {
        setVisible(false)
        onStart()
      },
    })
  }, [onStart])

  // main handler: builds timeline and runs
  const handleOpen = useCallback(() => {
    if (opening) return
    setOpening(true)
    playSfx()

    // ensure preload of new cover/back images to reduce flicker
    preload(pageSrc)
    preload('/assets/book/book-back-cover.png') // example - adapt if different

    // prepare 3D and will-change
    const els = [
      coverRef.current,
      backCoverRef.current,
      innerPageRef.current,
      innerPageSurfaceRef.current,
      innerPageFoldRef.current,
    ].filter(Boolean) as HTMLElement[]

    gsap.set(els, {
      transformStyle: 'preserve-3d',
      force3D: true,
      willChange: 'transform',
    })

    gsap.set(coverShadowRef.current, { autoAlpha: 0 })
    gsap.set(pageShadowRef.current, { autoAlpha: 0 })
    gsap.set(innerPageRef.current, { autoAlpha: 0 })
    gsap.set(innerPageSurfaceRef.current, {
      rotationY: 85,
      x: 160,
      transformOrigin: 'left center',
    })
    gsap.set(innerPageFoldRef.current, {
      rotationY: 50,
      x: 120,
      transformOrigin: 'left center',
    })

    // kill previous tl if exists
    tlRef.current?.kill()

    const tl = gsap.timeline({
      onComplete: () => {
        // optionally finish after a short wait; here we call finishAndStart to proceed
        // you may choose to call finishAndStart at a different position in timeline
        finishAndStart()
      },
    })
    tlRef.current = tl

    // 0: small press
    tl.to(coverRef.current, {
      scale: 0.987,
      duration: 0.06,
      yoyo: true,
      repeat: 1,
    })

    // 1: start cover rotate deeply (open wide)
    tl.to(
      coverRef.current,
      {
        x: 30,
        rotationY: -160,
        z: 100,
        duration: 1.05,
        ease: 'power3.inOut',
        borderRadius: '0px 12px 12px 0px',
        cursor: 'default',
        onStart: () => playSfx(0.02),
      },
      0.02,
    )

    // switch cover image mid-animation and flip inner image to correct mirrored face
    tl.call(
      () => {
        // เปลี่ยนภาพผ่าน state (หรือ gsap.set เพื่อไม่ให้เกิด re-render)
        setCurrentCoverSrc('/assets/book/book-back-cover.png')
      },
      undefined,
      0.6,
    )

    // 2: animate cover shadow while opening (grows then fades)
    tl.to(coverShadowRef.current, { autoAlpha: 0.9, duration: 0.25 }, 0.12)
    tl.to(coverShadowRef.current, { autoAlpha: 0.4, duration: 0.8 }, 0.4)

    // 3: move back cover slightly to emphasize thickness
    tl.to(
      backCoverRef.current,
      { x: -180, duration: 0.9, ease: 'power2.out' },
      0.06,
    )

    // 4: reveal inner page with strong curl: surface comes from high rotation to flat
    tl.to(innerPageRef.current, { autoAlpha: 1, duration: 0.02 }, 0.22)
    tl.to(
      innerPageSurfaceRef.current,
      {
        rotationY: 0,
        x: 0,
        scale: 1,
        duration: 0.72,
        ease: 'power4.out',
      },
      0.28,
    )

    // 5: fold overlay moves to simulate curl and then relax
    tl.to(
      innerPageFoldRef.current,
      {
        rotationY: -12,
        x: 6,
        duration: 0.72,
        ease: 'power3.out',
      },
      0.32,
    )

    // 6: page shadow follows the curl
    tl.to(pageShadowRef.current, { autoAlpha: 0.7, duration: 0.36 }, 0.34)
    tl.to(pageShadowRef.current, { autoAlpha: 0.2, duration: 0.9 }, 0.72)

    // 7: subtle wobble
    tl.to(
      innerPageRef.current,
      {
        rotationY: -6,
        duration: 0.16,
        yoyo: true,
        repeat: 3,
        ease: 'sine.inOut',
      },
      '>-0.05',
    )

    // 8: slide cover a little left to settle
    tl.to(
      coverRef.current,
      { x: 30, duration: 0.46, ease: 'power2.out' },
      '-=0.35',
    )

    // play extra sfx near the end
    tl.call(() => playSfx(0.02))

    // don't forget to return tl (not required but useful in debugging)
    return tl
  }, [opening, pageSrc, playSfx, preload, finishAndStart])

  // cleanup on unmount
  useEffect(() => {
    return () => {
      tlRef.current?.kill()
      tlRef.current = null
      sfxRef.current?.pause()
    }
  }, [])

  if (!visible) return null

  // ---------- JSX ----------
  return (
    <div
      ref={rootRef}
      className="inset-0 flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-gray-900 to-indigo-900 p-6 text-white"
      aria-hidden={!visible}
      style={{ overflow: 'hidden' }}
    >
      <div className="w-full max-w-4xl">
        <div className="mx-auto flex flex-col items-center gap-6">
          <div
            style={{
              width: bookWidth * 1.5,
              maxWidth: '100%',
              perspective: 1800,
            }}
            className="relative"
          >
            <div
              style={{
                width: '100%',
                height: bookHeight + 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              className="relative"
            >
              {/* Back cover */}
              <div
                ref={backCoverRef}
                style={{
                  width: bookWidth,
                  height: bookHeight,
                  left: '50%',
                  transform: `translateX(-50%) translateX(8px)`,
                  top: 20,
                  position: 'absolute',
                  borderRadius: 18,
                  overflow: 'hidden',
                  backgroundImage: `url(${pageSrc})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.06)',
                }}
                aria-hidden
              />

              {/* inner page (surface + fold) */}
              <div
                ref={innerPageRef}
                style={{
                  width: bookWidth - 6,
                  height: bookHeight - 10,
                  left: '50%',
                  transform: `translateX(-50%)`,
                  top: 24,
                  position: 'absolute',
                  borderRadius: '0 12px 12px 0',
                  overflow: 'visible',
                  zIndex: 22,
                  pointerEvents: 'none',
                }}
                aria-hidden
              >
                <div
                  ref={innerPageSurfaceRef}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 12,
                    overflow: 'hidden',
                    background: '#fff',
                  }}
                />

                {/* fold overlay */}
                <div
                  ref={innerPageFoldRef}
                  style={{
                    position: 'absolute',
                    left: -2,
                    top: 0,
                    width: 72,
                    height: '100%',
                    borderRadius: '0 12px 12px 0',
                    pointerEvents: 'none',
                    background:
                      'linear-gradient(90deg, rgba(0,0,0,0.28), rgba(0,0,0,0.08) 40%, rgba(255,255,255,0.02) 60%, transparent 100%)',
                    transformOrigin: 'left center',
                    mixBlendMode: 'multiply',
                    zIndex: 25,
                  }}
                />

                {/* page shadow */}
                <div
                  ref={pageShadowRef}
                  style={{
                    position: 'absolute',
                    left: -2,
                    top: 0,
                    width: 88,
                    height: '100%',
                    borderRadius: '0 12px 12px 0',
                    pointerEvents: 'none',
                    background:
                      'radial-gradient(40% 60% at 10% 50%, rgba(0,0,0,0.6), transparent 35%)',
                    zIndex: 21,
                    mixBlendMode: 'multiply',
                    opacity: 0,
                  }}
                />
              </div>

              {/* cover (root) */}
              <div
                ref={coverRef}
                role="button"
                aria-label="เปิดหนังสือ"
                tabIndex={0}
                onClick={handleOpen}
                className="origin-left cursor-pointer"
                style={{
                  width: bookWidth,
                  height: bookHeight,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  top: 20,
                  position: 'absolute',
                  borderRadius: 18,
                  overflow: 'hidden',
                  zIndex: 40,
                  boxShadow:
                    '0 40px 100px rgba(2,6,23,0.6), inset 0 -6px 18px rgba(0,0,0,0.12)',
                  border: '1px solid rgba(0,0,0,0.12)',
                  // keep a neutral background while coverImage handles visible image
                  backgroundColor: 'transparent',
                }}
              >
                {/* cover image layer (always mounted) */}
                <div
                  ref={coverImageRef}
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${currentCoverSrc})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transformStyle: 'preserve-3d',
                    WebkitBackfaceVisibility: 'hidden',
                    backfaceVisibility: 'hidden',
                    borderRadius: '0px 12px 12px 0px',
                    willChange: 'transform, background-image',
                  }}
                />

                {/* cover shadow overlay */}
                <div
                  ref={coverShadowRef}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(90deg, rgba(0,0,0,0.55), rgba(0,0,0,0.0))',
                    pointerEvents: 'none',
                    opacity: 0,
                  }}
                />

                {/* right edge highlight */}
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    right: -6,
                    top: 12,
                    bottom: 12,
                    width: 12,
                    borderRadius: '0 8px 8px 0',
                    background:
                      'linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0))',
                    pointerEvents: 'none',
                  }}
                />
              </div>

              {tagSrc && (
                <img
                  src={tagSrc}
                  alt=""
                  aria-hidden
                  style={{
                    position: 'absolute',
                    width: 72,
                    height: 72,
                    right: `calc(50% - ${bookWidth / 2}px - 12px)`,
                    top: 6,
                    transform: 'rotate(-12deg)',
                    zIndex: 60,
                    pointerEvents: 'none',
                    filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.45))',
                  }}
                />
              )}
            </div>
          </div>

          {/* Title & info */}
          <div className="mt-2 text-center">
            <h1 className="text-2xl md:text-5xl">
              จงเปิดออก… แล้วเรื่องราวจะตื่นขึ้น
            </h1>
            <p className="mt-2 text-gray-300">กดหนังสือเพื่อเริ่มเรื่อง</p>
          </div>

          <p className="mt-4 text-xs text-gray-400">
            สามารถกด Enter ขณะเลือกปกเพื่อเปิดหนังสือได้เช่นกัน
          </p>
        </div>
      </div>
    </div>
  )
}
