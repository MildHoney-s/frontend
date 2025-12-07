import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'
import OpenScene from './scene03_1/openScene'

import './css/styles.css'; // อย่าลืม import ไฟล์ CSS
import './css/mixinPosition.scss'; // อย่าลืม import ไฟล์ CSS
import Versus01 from './versus01/versus01'
import Versus02 from './versus02/versus02'
import Versus03 from './versus03/versus03'
import Versus04 from './versus04/versus04'


gsap.registerPlugin(ScrollTrigger)

export default function ChapterThree() {
  const main = useRef<HTMLDivElement | null>(null)
  useGSAP(
    () => {
      const boxes = gsap.utils.toArray<HTMLElement>('.box')

      boxes.forEach((box) => {
        // เปลี่ยนเป็น .from
        gsap.from(box, {
          x: 500, // เริ่มต้นที่ทางขวา 500px (ค่าบวกคือขวา)
          // x: '100vw', // หรือถ้าอยากให้ลอยมาจากนอกจอเลย ให้ใช้ 100vw

          // แนะนำ: ใส่ opacity ให้ค่อยๆ จางออกมาด้วยจะสมูทขึ้น
          // opacity: 0, 

          scrollTrigger: {
            trigger: box,
            start: 'top 80%', // เริ่มขยับเมื่อหัวกล่องโผล่มาในจอ 20% (นับจากล่าง)
            end: 'center center', // จบเมื่อกล่องมาถึงกลางจอ
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
      <h1 className="text-center text-4xl font-bold">Chapter Three</h1>
      <div ref={main}>

        <div className="box gradient-blue">boxes
          <div className='bg-block'></div>
        </div>

        <p className="mt-4 text-lg">
          This is the content of Chapter One. Welcome to the first chapter of
          our story!
        </p>
        <div className="box gradient-blue">
          <div className='bg-black-center'>

            <p className='text-title'>- ณ วันแข่งขัน -</p>
          </div>
        </div>

        <div className="box gradient-blue">
          <OpenScene />
        </div>
        <div className="box gradient-blue">
          <Versus01 />
        </div>
        <div className="box gradient-blue">
          <Versus02 />
        </div>
        <div className="box gradient-blue">
          <Versus03 />
        </div>
        <div className="box gradient-blue">
          <Versus04 />
        </div>

        <div className='bg-block'></div>


      </div>
    </>
  )
}
