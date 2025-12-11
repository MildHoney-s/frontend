import { chapterOneAssets, chapterTwoAssets } from '@/assets'
import chapterThreeAssets from '@/assets/chapterThreeAssets'
import versusComponentAssets from '@/assets/versusComponentAssets'
import { LandingScreen } from '@/sections/landing-screen'
import { cacheAssets } from '@/utils/cacheAssets'
import { extractImagePaths } from '@/utils/extractImagePaths'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'

const NAV_WAIT_TIMEOUT = 60000 // 60s

function timeout(ms: number) {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error('timeout')), ms),
  )
}

const CACHE_FLAG = 'mildr_assets_cached_v1'

export default function LandingPage() {
  const navigate = useNavigate()
  const [preloadDone, setPreloadDone] = useState(false)
  const abortRef = useRef<AbortController | null>(null)
  const preloadPromiseRef = useRef<Promise<void> | null>(null)

  const allImages = [
    ...extractImagePaths(chapterOneAssets),
    ...chapterTwoAssets,
    ...extractImagePaths(chapterThreeAssets),
    ...extractImagePaths(versusComponentAssets),
  ]
  const uniqueImages = Array.from(new Set(allImages)).filter(Boolean)

  // start caching on mount if not cached already
  useEffect(() => {
    if (preloadPromiseRef.current) return

    // if already flagged as cached, we can short-circuit
    if (localStorage.getItem(CACHE_FLAG) === '1') {
      setPreloadDone(true)
      return
    }

    const controller = new AbortController()
    abortRef.current = controller

    const p = (async () => {
      try {
        await cacheAssets(uniqueImages, {
          signal: controller.signal,
        })
        // mark done in localStorage so future visits skip caching step
        localStorage.setItem(CACHE_FLAG, '1')
        setPreloadDone(true)
      } catch (err) {
        if ((err as DOMException)?.name === 'AbortError') {
          console.log('caching aborted')
        } else {
          console.warn('caching failed', err)
        }
        // still mark done so UX is not blocked
        setPreloadDone(true)
      }
    })()

    preloadPromiseRef.current = p
    return () => {
      controller.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // mount once

  // handleStart: wait for cache (with timeout)
  const handleStart = useCallback(async () => {
    try {
      if (preloadPromiseRef.current && !preloadDone) {
        await Promise.race([
          preloadPromiseRef.current,
          timeout(NAV_WAIT_TIMEOUT),
        ])
      }
    } catch (err) {
      console.log('Cache & preload timeout or error, aborting remaining loads')
      abortRef.current?.abort()
    } finally {
      navigate('/story')
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
