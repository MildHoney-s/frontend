/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef, useCallback, useEffect, useRef } from 'react'
import HTMLFlipBook from 'react-pageflip'

import { type Page as BookPage, SAMPLE_PAGES } from './_mock/Example'

// { id, front, back? }

// Small wrapper for a single flip page
const PageWrapper = forwardRef<HTMLDivElement, { children: React.ReactNode }>(
  (props, ref) => (
    <div className="page" ref={ref}>
      <div className="page-content">{props.children}</div>
    </div>
  ),
)
PageWrapper.displayName = 'PageWrapper'

type TestBookProps = {
  pages?: BookPage[]
  // คุณอาจ expose ค่า config เหล่านี้เป็น props ได้ถ้าต้องการ
}

export default function TestBook({ pages = SAMPLE_PAGES }: TestBookProps) {
  const flipBookRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const flipNext = useCallback(() => {
    flipBookRef.current?.getPageFlip()?.flipNext()
  }, [])

  const flipPrev = useCallback(() => {
    flipBookRef.current?.getPageFlip()?.flipPrev()
  }, [])

  // wheel -> flip (เหมือนเวอร์ชันก่อน)
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    let last = 0
    const THRESH = 20
    const LOCK_MS = 500

    const onWheel = (e: WheelEvent) => {
      const now = Date.now()
      if (now - last < LOCK_MS) return

      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        if (e.deltaX > THRESH) {
          flipNext()
          last = now
        } else if (e.deltaX < -THRESH) {
          flipPrev()
          last = now
        }
      } else {
        if (e.deltaY > THRESH) {
          flipNext()
          last = now
        } else if (e.deltaY < -THRESH) {
          flipPrev()
          last = now
        }
      }
    }

    el.addEventListener('wheel', onWheel, { passive: true })
    return () => el.removeEventListener('wheel', onWheel as EventListener)
  }, [flipNext, flipPrev])

  // map pages: front/back -> 1 or 2 children per book page
  const renderedPages = (pages ?? []).flatMap((p) => {
    const arr = [<PageWrapper key={`${p.id}-front`}>{p.front}</PageWrapper>]
    if (p.back) {
      arr.push(<PageWrapper key={`${p.id}-back`}>{p.back}</PageWrapper>)
    }
    return arr
  })

  // --- IMPORTANT: pass required props that IProps expects ---
  // เพิ่มค่า default ที่ type ต้องการ (className, style, startPage, minWidth, ... ฯลฯ)
  return (
    <div ref={containerRef}>
      <HTMLFlipBook
        className="demo-book"
        style={{ margin: '0 auto' }}
        drawShadow={true}
        flippingTime={700}
        usePortrait={false}
        width={550}
        height={733}
        size="fixed"
        startPage={0}
        minWidth={315}
        maxWidth={1000}
        minHeight={400}
        maxHeight={1533}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}
        renderOnlyPageLengthChange={false}
        ref={(el: any) => (flipBookRef.current = el)}
      >
        {renderedPages}
      </HTMLFlipBook>
    </div>
  )
}
