// src/pages/LandingPage.tsx
import { LandingScreen } from '@/sections/landing-screen'
import { useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'

// import lists from chapters
// import { chapterOneImages } from '@/story/chapterOne'
// import { chapterTwoImages } from '@/story/chapterTwo'

// ----------------------------------------------------------------------

export default function LandingPage() {
  const navigate = useNavigate()

  const handleStart = useCallback(async () => {
    navigate('/story')
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }, [navigate])

  const allImages = [
    '/assets/book/book-cover.png',
    '/assets/book/book-back-cover.png',
    '/assets/book/paper.png',
    // add tag if used
    '/assets/book/tag.png',
    // and spread chapter lists
    // ...chapterOneImages,
    // ...chapterTwoImages,
  ]

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
        extraPreload={allImages}
      />
    </>
  )
}
