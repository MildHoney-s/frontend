// src/pages/LandingPage.tsx
import { LandingScreen } from '@/sections/landing-screen'
import { useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const navigate = useNavigate()

  const handleStart = useCallback(() => {
    navigate('/story')
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 30)
  }, [navigate])

  return (
    <>
      <Helmet>
        <title>เปิดหนังสือ | Mild-R HBD 2025</title>
      </Helmet>

      <LandingScreen
        coverSrc="/assets/book/book-cover.png"
        pageSrc="/assets/book/book-back-cover.png"
        onStart={handleStart}
      />
    </>
  )
}
