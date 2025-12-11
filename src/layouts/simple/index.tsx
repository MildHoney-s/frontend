import Footer from './Footer'
import { ScrollToTopButton } from './components'

interface SimpleLayoutT {
  children: React.ReactNode
}

// ----------------------------------------------------------------------

export default function SimpleLayout({ children }: SimpleLayoutT) {
  return (
    <>
      <div className="min-h-screen w-full">
        {children}
        <Footer />
      </div>
      <ScrollToTopButton />
    </>
  )
}
