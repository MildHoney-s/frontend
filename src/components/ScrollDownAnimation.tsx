import { useEffect, useState } from 'react'

export default function ScrollHint() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 5) {
        setVisible(false)
        window.removeEventListener('scroll', onScroll)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <div id="scroll-down-animation">
      <span className="mouse">
        <span className="move"></span>
      </span>
      <h2>Scroll ลง</h2>
    </div>
  )
}
