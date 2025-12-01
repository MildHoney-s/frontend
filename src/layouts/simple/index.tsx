import { FaArrowUpLong } from 'react-icons/fa6'
import ScrollToTop from 'react-scroll-to-top'

import Footer from './footer'

interface SimpleLayoutT {
  children: React.ReactNode
}

export default function SimpleLayout({ children }: SimpleLayoutT) {
  const Arrow = (
    <div className="grid justify-items-center">
      <FaArrowUpLong
        size={24}
        style={{
          color: 'white',
        }}
      />
    </div>
  )

  return (
    <>
      <div className="w-full">
        {children}
        <Footer />
      </div>
      <ScrollToTop smooth component={Arrow} className="cus-scroll-to-top" />
    </>
  )
}
