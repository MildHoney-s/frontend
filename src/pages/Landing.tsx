// src/pages/LandingPage.tsx
import { LandingScreen } from '@/sections/landing-screen'
import { useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'

const storyAssets = import.meta.glob(
  '/assets/background/**/*.{png,jpg,jpeg,webp,gif,mp3}',
  {
    eager: true,
    as: 'url',
  },
)

const STORY_ASSETS = Object.values(storyAssets) as string[]

// ✅ 2. preload function
function preloadAssets(urls: string[]) {
  return Promise.all(
    urls.map(
      (url) =>
        new Promise<void>((resolve) => {
          if (url.endsWith('.mp3')) {
            const audio = new Audio()
            audio.src = url
            audio.oncanplaythrough = () => resolve()
          } else {
            const img = new Image()
            img.src = url
            img.onload = () => resolve()
          }
        }),
    ),
  )
}

// ----------------------------------------------------------------------

export default function LandingPage() {
  const navigate = useNavigate()

  const handleStart = useCallback(async () => {
    await preloadAssets(STORY_ASSETS)
    navigate('/story')
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }, [navigate])

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
      />
    </>
  )
}
