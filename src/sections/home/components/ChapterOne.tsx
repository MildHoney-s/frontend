// import { Book } from '@/components/book'
import BookScroll from '@/components/book/TestBook'
import { Page } from '@/components/book/_mock/Example'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const STORYBOOK: Page[] = [
  {
    id: 'page-1',
    front: (
      <div className="flex h-full flex-col items-center justify-center bg-yellow-100 p-6 text-center font-nithan">
        <h2 className=" text-2xl font-bold">
          คุณเชื่อในพลังพิเศษ หรือ ปรากฏการณ์เหนือธรรมชาติรึเปล่า
        </h2>
        <p className="text-lg font-semibold">
          นี่คือจุดเริ่มต้นของการเดินทางที่น่าตื่นเต้นของเรา
        </p>
      </div>
    ),
    back: (
      <div className="flex h-full flex-col items-center justify-center bg-yellow-100 p-6 text-center font-nithan">
        <p className="text-lg">
          นี่คือจุดเริ่มต้นของการเดินทางที่น่าตื่นเต้นของเรา
        </p>
      </div>
    ),
  },
]

// ----------------------------------------------------------------------

export default function ChapterOne() {
  const main = useRef<HTMLDivElement | null>(null)

  // ถ้าคุณมี animation อื่น ๆ ให้แยก selector ให้ชัดเจน (ไม่ทำงานกับหนังสือ)
  useGSAP(
    () => {
      const boxes = gsap.utils.toArray<HTMLElement>('.box')
      boxes.forEach((box) => {
        gsap.to(box, {
          x: 150,
          scrollTrigger: {
            trigger: box,
            start: 'bottom bottom',
            end: 'top 20%',
            scrub: true,
            // markers: true,
          },
        })
      })
    },
    { scope: main },
  )

  return (
    <div ref={main}>
      <div className="mx-auto" id="book-wrapper">
        {/* <Book pages={STORYBOOK} /> */}
        <BookScroll pages={STORYBOOK} />
      </div>
      <div></div>
    </div>
  )
}
