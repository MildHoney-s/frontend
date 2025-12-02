import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

export default function ChapterOne() {
  const main = useRef<HTMLDivElement | null>(null)

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
    <>
      <h1 className="text-center text-4xl font-bold">Chapter One</h1>
      <div ref={main}>
        <p className="mt-4 text-lg">
          This is the content of Chapter One. Welcome to the first chapter of
          our story!
        </p>
        <div className="box gradient-blue">box</div>
        <div className="box gradient-blue">box</div>
        <div className="box gradient-blue">box</div>
      </div>
    </>
  )
}
