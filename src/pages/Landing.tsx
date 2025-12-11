import { chapterOneAssets, chapterTwoAssets } from '@/assets'
import chapterThreeAssets from '@/assets/chapterThreeAssets'
import versusComponentAssets from '@/assets/versusComponentAssets'
import { LandingScreen } from '@/sections/landing-screen'
import { extractImagePaths } from '@/utils/extractImagePaths'
import { preloadImagesWithProgress } from '@/utils/preloadImages'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'

// ฟังก์ชันของคุณ

// optional: overall maximum wait before forcing navigation (ms)
const NAV_WAIT_TIMEOUT = 10000 // 10s (ปรับตามต้องการ)

function timeout(ms: number) {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error('timeout')), ms),
  )
}

export default function LandingPage() {
  const navigate = useNavigate()

  // preload state
  const [preloadDone, setPreloadDone] = useState(false)

  // keep promise & abort controller refs
  const preloadPromiseRef = useRef<Promise<void> | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  // --- build list of images to preload ---
  const allImages = [
    // chapterOneAssets might be object or values; safer to use extractImagePaths
    ...extractImagePaths(chapterOneAssets),
    // chapterTwoAssets assumed array already
    ...chapterTwoAssets,
    // chapterThreeAssets might be nested
    ...extractImagePaths(chapterThreeAssets),
    // versus component images (nested)
    ...extractImagePaths(versusComponentAssets),
  ]

  const uniqueImages = Array.from(new Set(allImages)).filter(Boolean)

  // start preload on mount (background)
  useEffect(() => {
    // don't start twice
    if (preloadPromiseRef.current) return

    const controller = new AbortController()
    abortRef.current = controller

    const p = preloadImagesWithProgress(
      uniqueImages,
      (loaded, total) => {
        console.log({ loaded, total })
      },
      controller.signal,
    )
      .then(() => {
        setPreloadDone(true)
        console.log(null)
      })
      .catch((err) => {
        // abort or other error
        if ((err as DOMException)?.name === 'AbortError') {
          console.log('aborted')
        } else {
          console.log((err && (err as Error).message) || String(err))
        }
        // still mark as done to avoid blocking forever; UX will continue
        setPreloadDone(true)
        console.log(null)
      })

    preloadPromiseRef.current = p

    return () => {
      // cleanup: abort inflight preloads when leaving page
      controller.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // mount once

  // handle start: wait for preload but with timeout fallback + abort if timed out
  const handleStart = useCallback(async () => {
    try {
      if (preloadPromiseRef.current && !preloadDone) {
        // race preload vs overall timeout
        await Promise.race([
          preloadPromiseRef.current,
          timeout(NAV_WAIT_TIMEOUT),
        ])
      }
    } catch (err) {
      // timeout or other error -> abort preload to cancel remaining loads
      abortRef.current?.abort()
    } finally {
      // ensure UI flags are reset and navigate
      navigate('/story')
      // scroll to top after navigate
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      })
    }
  }, [navigate, preloadDone])

  return (
    <>
      <Helmet>
        <title>เปิดหนังสือ | Mild-R HBD 2025</title>
      </Helmet>

      <LandingScreen
        coverSrc="/assets/book/book-cover.png"
        backCoverSrc="/assets/book/book-back-cover.png"
        pageSrc="/assets/book/paper.png"
        onStart={handleStart}
        // keep for backward compatibility (if LandingScreen still uses extraPreload)
        extraPreload={uniqueImages}
      />
    </>
  )
}
