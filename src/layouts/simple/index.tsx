import ScrollToTopButton from './components/scroll-to-top-button'

import Footer from './footer'

interface SimpleLayoutT {
  children: React.ReactNode
}

export default function SimpleLayout({ children }: SimpleLayoutT) {
  return (
    <>
      <div className="w-full">
        {children}
        <Footer />
      </div>
      <ScrollToTopButton />
    </>
  )
}
