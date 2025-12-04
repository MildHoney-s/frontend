import { useEffect, useState } from 'react'
import { FaArrowUpLong } from 'react-icons/fa6'

// ----------------------------------------------------------------------

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button
      aria-label="Scroll to top"
      onClick={scrollToTop}
      className={`
        /*
        mobile 80px,
        desktop
        50px */   fixed bottom-[80px] right-5 z-50 flex h-12
        w-12 items-center
        justify-center rounded-full bg-[#e44b90]
        text-white 
        shadow-lg
        transition-all duration-300
        sm:bottom-[50px]
        ${
          visible
            ? 'pointer-events-auto scale-100 opacity-100'
            : 'pointer-events-none scale-75 opacity-0'
        }
      `}
    >
      <FaArrowUpLong size={22} />
    </button>
  )
}
