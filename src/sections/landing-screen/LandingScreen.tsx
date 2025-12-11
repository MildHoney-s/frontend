/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable no-inner-declarations */
// src/components/LandingScreenGSAP.tsx
import useKeyPress from '@/hooks/useKeyPress'
import { cacheAssetsViaSW } from '@/registerServiceWorker'
import { preloadImagesWithProgress } from '@/utils/preloadImages'
import gsap from 'gsap'
import { useCallback, useEffect, useRef, useState } from 'react'

interface LandingScreenProps {
  onStart: () => void
  coverSrc?: string
  backCoverSrc?: string
  pageSrc?: string
  flipSfxSrc?: string
  tagSrc?: string
  extraPreload?: string[]
}

// ---------- helper: load from CacheStorage ----------
async function loadImageFromCache(
  cacheName: string,
  url: string,
): Promise<string | null> {
  if (!('caches' in window)) return null
  try {
    const cache = await caches.open(cacheName)
    const resp = await cache.match(url)
    if (!resp) return null
    const blob = await resp.blob()
    return URL.createObjectURL(blob) // caller must revoke
  } catch (err) {
    console.warn('loadImageFromCache error', url, err)
    return null
  }
}

// ----------------------------------------------------------------------

export default function LandingScreenGSAP({
  onStart,
  coverSrc = '/assets/book/book-cover.png',
  backCoverSrc = '/assets/book/book-back-cover.png',
  pageSrc = '/assets/book/paper.png',
  flipSfxSrc,
  tagSrc,
  extraPreload = [],
}: LandingScreenProps) {
  // ---------- state & refs ----------
  const CACHE_NAME = 'mild-r-assets-v1' // ต้องตรงกับชื่อที่ใช้ตอน cacheAssets
  const [visible, setVisible] = useState(true)
  const [opening, setOpening] = useState(false)

  // Hold original URL (props) and possible object URLs from cache
  const [currentCoverSrc, setCurrentCoverSrc] = useState<string>(coverSrc)
  const [currentBackSrc, setCurrentBackSrc] = useState<string>(backCoverSrc)
  const [currentPageSrc, setCurrentPageSrc] = useState<string>(pageSrc)
  const [currentTagSrc, setCurrentTagSrc] = useState<string | undefined>(tagSrc)

  const objectUrlsRef = useRef<string[]>([]) // keep list to revoke later

  const [preloadProgress, setPreloadProgress] = useState(0) // 0..100
  const [preloaded, setPreloaded] = useState(false)
  const [isPreloading, setIsPreloading] = useState(false)
  const preloadAbortRef = useRef<AbortController | null>(null)

  // ... other refs (same as before)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const bookRef = useRef<HTMLDivElement | null>(null)
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

  // ---------- audio (same) ----------
  useEffect(() => {
    if (!flipSfxSrc) return
    const audio = new Audio(flipSfxSrc)
    audio.preload = 'auto'
    sfxRef.current = audio
    return () => {
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

  // ---------- try load cached images on mount ----------
  useEffect(() => {
    let mounted = true

    ;(async () => {
      // Try load each important asset from CacheStorage
      // If found -> set to object URL; otherwise leave default URL (so browser will fetch it / SW may intercept)
      try {
        const tries: Array<Promise<void>> = []

        async function trySet(
          url: string | undefined,
          setter: (s: string) => void,
        ) {
          if (!url) return
          const obj = await loadImageFromCache(CACHE_NAME, url)
          if (!mounted) {
            if (obj) URL.revokeObjectURL(obj)
            return
          }
          if (obj) {
            objectUrlsRef.current.push(obj)
            setter(obj)
          }
        }

        tries.push(trySet(coverSrc, setCurrentCoverSrc))
        tries.push(trySet(backCoverSrc, setCurrentBackSrc))
        tries.push(trySet(pageSrc, setCurrentPageSrc))
        if (tagSrc) tries.push(trySet(tagSrc, (s) => setCurrentTagSrc(s)))

        await Promise.all(tries)
      } catch (e) {
        console.warn('error while trying to load cached assets', e)
      }
    })()

    return () => {
      mounted = false
      // revoke created object URLs
      objectUrlsRef.current.forEach((u) => {
        try {
          URL.revokeObjectURL(u)
        } catch {
          /* empty */
        }
      })
      objectUrlsRef.current = []
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // run once on mount

  // ---------- focus button (if any) on mount ----------
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

  // ---------- finishAndStart, playOpenAnimation (same as before) ----------
  const finishAndStart = useCallback(() => {
    if (startedRef.current) return
    startedRef.current = true

    const bookEl = coverRef.current
    const rootEl = rootRef.current

    const isDesktop = window.innerWidth >= 1024

    if (!bookEl || !rootEl) {
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

    if (!isDesktop) {
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

    const rect = bookEl.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const viewportX = window.innerWidth / 2
    const viewportY = window.innerHeight / 2
    const offsetX = viewportX - centerX
    const offsetY = viewportY - centerY

    const tl = gsap.timeline()

    tl.to(rootEl, {
      scale: 1.4,
      x: offsetX,
      y: offsetY,
      duration: 0.9,
      ease: 'power3.inOut',
    })

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

  const playOpenAnimation = useCallback(() => {
    // prepare elements
    const els = [
      coverRef.current,
      backCoverRef.current,
      innerPageRef.current,
      innerPageSurfaceRef.current,
      innerPageFoldRef.current,
    ].filter(Boolean) as HTMLElement[]

    const isDesktop = window.innerWidth >= 1024

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

    tlRef.current?.kill()

    if (isDesktop) {
      gsap.set(bookRef.current, {
        left: '25%',
      })
    }

    const tl = gsap.timeline({
      onComplete: () => {
        finishAndStart()
      },
    })
    tlRef.current = tl

    // (rest of timeline same as original)
    tl.to(coverRef.current, {
      scale: 0.987,
      duration: 0.06,
      yoyo: true,
      repeat: 1,
    })

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

    tl.call(
      () => {
        // when timeline wants to swap cover image to back, prefer cached object URL if present
        setCurrentCoverSrc(backCoverSrc) // backCoverSrc might still be an objectURL if cached and set earlier
      },
      undefined,
      0.6,
    )

    tl.to(coverShadowRef.current, { autoAlpha: 0.9, duration: 0.25 }, 0.12)
    tl.to(coverShadowRef.current, { autoAlpha: 0.4, duration: 0.8 }, 0.4)
    tl.to(
      backCoverRef.current,
      { x: -180, duration: 0.9, ease: 'power2.out' },
      0.06,
    )
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
    tl.to(pageShadowRef.current, { autoAlpha: 0.7, duration: 0.36 }, 0.34)
    tl.to(pageShadowRef.current, { autoAlpha: 0.2, duration: 0.9 }, 0.72)
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
    tl.to(
      coverRef.current,
      { x: 30, duration: 0.46, ease: 'power2.out' },
      '-=0.35',
    )
    tl.call(() => playSfx(0.02))

    return tl
  }, [finishAndStart, playSfx, backCoverSrc])

  // ---------- main handler: start preload then play animation ----------
  const handleOpen = useCallback(() => {
    if (opening) return
    setOpening(true)
    playSfx()

    // start preloading
    setIsPreloading(true)
    setPreloadProgress(0)
    setPreloaded(false)

    const allToPreload = [
      coverSrc,
      backCoverSrc,
      pageSrc,
      tagSrc,
      '/assets/book/book-back-cover.png',
      ...extraPreload,
    ].filter(Boolean) as string[]

    // cache via service worker (if available) - uses your existing helper
    cacheAssetsViaSW(allToPreload, (loaded: number, total: number) => {
      setPreloadProgress(Math.round((loaded / Math.max(total, 1)) * 100))
    })
      .then(() => {
        setPreloaded(true)
        setIsPreloading(false)
        playOpenAnimation()
      })
      .catch((swErr: any) => {
        console.warn('SW caching failed/fallback', swErr)
        // fallback to JS preloader with progress
        const controller = new AbortController()
        preloadAbortRef.current = controller
        preloadImagesWithProgress(
          allToPreload,
          (loaded, total) => {
            setPreloadProgress(Math.round((loaded / Math.max(total, 1)) * 100))
          },
          controller.signal,
        )
          .then(() => {
            setPreloaded(true)
            setIsPreloading(false)
            playOpenAnimation()
          })
          .catch((err) => {
            console.error('fallback preload error', err)
            setPreloaded(true)
            setIsPreloading(false)
            playOpenAnimation()
          })
      })
  }, [
    opening,
    playSfx,
    coverSrc,
    backCoverSrc,
    pageSrc,
    tagSrc,
    extraPreload,
    playOpenAnimation,
  ])

  // cleanup on unmount
  useEffect(() => {
    return () => {
      tlRef.current?.kill()
      tlRef.current = null
      sfxRef.current?.pause()
      preloadAbortRef.current?.abort()
      // revoke any object URLs we created (also done in mounting effect's cleanup)
      objectUrlsRef.current.forEach((u) => {
        try {
          URL.revokeObjectURL(u)
        } catch {
          /* empty */
        }
      })
      objectUrlsRef.current = []
    }
  }, [])

  // ---------- render (use current* state values for backgrounds / img src) ----------
  if (!visible) return null

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
              ref={bookRef}
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
                  backgroundImage: `url(${currentBackSrc})`,
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
                    backgroundImage: `url(${currentPageSrc})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
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

              {currentTagSrc && (
                <img
                  src={currentTagSrc}
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
            <p className="mt-2 text-gray-300">
              {isPreloading
                ? `กำลังเตรียมเรื่องราว… ${preloadProgress}%`
                : preloaded
                  ? 'เตรียมเรื่องราวพร้อมแล้ว กำลังเปิด…'
                  : 'กดหนังสือเพื่อเริ่มเรื่อง'}
            </p>
          </div>

          <p className="mt-4 text-xs text-gray-400">
            สามารถกด Enter ขณะเลือกปกเพื่อเปิดหนังสือได้เช่นกัน
          </p>
        </div>
      </div>
    </div>
  )
}
