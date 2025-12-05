import { HomePageView, LandingScreen } from '@/sections/home'
import { useCallback, useState } from 'react'
import { Helmet } from 'react-helmet-async'

// ----------------------------------------------------------------------

export default function HomePage() {
  const [started, setStarted] = useState(false)

  const handleStart = useCallback(() => {
    setStarted(true)
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 30)
  }, [])

  return (
    <>
      <Helmet>
        <title>Home | Mild-R HBD 2025</title>
      </Helmet>

      {!started ? (
        <LandingScreen
          coverSrc="/assets/book/book-cover.png"
          pageSrc="/assets/book/book-back-cover.png"
          onStart={handleStart}
        />
      ) : (
        <HomePageView />
      )}
    </>
  )
}
