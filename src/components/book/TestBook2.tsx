/* eslint-disable @typescript-eslint/no-unused-vars */
import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'

export type Line = { speaker?: string; text: string; voice?: string }
export type Layer = {
  id: string
  type: 'image' | 'sprite' | 'ui'
  src: string
  x?: number
  y?: number
  scale?: number
}
export type Scene = {
  id: string
  bg: string
  layers?: Layer[]
  lines?: Line[]
  duration?: number
}

const SCENES: Scene[] = [
  {
    id: 'book-open',
    bg: '/assets/book-bg.png',
    layers: [
      { id: 'book', type: 'image', src: '/assets/book.png', x: 0, y: 0 },
    ],
    lines: [
      { text: 'คุณเชื่อในพลังพิเศษ หรือ ปรากฏการณ์เหนือธรรมชาติรึเปล่า' },
    ],
    duration: 4500,
  },
  {
    id: 'classroom',
    bg: '/assets/bg-classroom.png',
    layers: [
      {
        id: 'teacher',
        type: 'image',
        src: '/assets/teacher.png',
        x: 50,
        y: 20,
        scale: 1,
      },
      {
        id: 'mind',
        type: 'sprite',
        src: '/assets/char-mind.png',
        x: 20,
        y: 60,
        scale: 1,
      },
    ],
    lines: [
      { speaker: 'อาจารย์', text: 'เวทมนตร์นั้น เราต้องร่ายออกมาให้ชัดเจน...' },
      {
        speaker: 'เพื่อนๆ',
        text: 'อาจารย์คะ แบบนี้ถ้าคนที่พูดไม่ชัดจะทำยังไง?',
      },
    ],
  },
  // ... เพิ่ม scene ตามเนื้อเรื่องของคุณ
]

type Props = { width?: number; height?: number }

export default function BookAnimation({ width = 960, height = 540 }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const bgRef = useRef<HTMLDivElement | null>(null)
  const layersRef = useRef<Record<string, HTMLDivElement>>({})
  const textRef = useRef<HTMLDivElement | null>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const [sceneIndex, setSceneIndex] = useState(0)

  // helper: create span-wrapped characters for simple GSAP stagger-typing
  function setTypeText(el: HTMLElement, text: string) {
    el.innerHTML = ''
    const frag = document.createDocumentFragment()
    for (const ch of text) {
      const span = document.createElement('span')
      span.textContent = ch
      span.style.opacity = '0'
      frag.appendChild(span)
    }
    el.appendChild(frag)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      playScene(sceneIndex)
    }, containerRef)

    return () => {
      ctx.revert()
      tlRef.current?.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneIndex])

  function playScene(index: number) {
    const scene = SCENES[index]
    if (!scene || !containerRef.current) return

    // clear previous
    tlRef.current?.kill()
    if (bgRef.current) bgRef.current.style.backgroundImage = `url(${scene.bg})`

    // hide all layers first
    Object.values(layersRef.current).forEach((el) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(20px) scale(1)'
    })

    // create timeline
    const tl = gsap.timeline({
      onComplete: () => {
        // auto advance after a delay if more scenes exist
        // const nextDelay = (scene.duration ?? 3000) / 1000
        if (index < SCENES.length - 1) {
          setTimeout(() => setSceneIndex((i) => i + 1), scene.duration ?? 3000)
        }
      },
    })
    tlRef.current = tl

    // book-open special
    if (scene.id === 'book-open') {
      // a simple zoom-out and fade-in
      tl.fromTo(
        containerRef.current,
        { scale: 1.15, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2 },
      )
    } else {
      // scene entrance: fade bg + layers
      tl.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
      )
      // layer entrances
      ;(scene.layers ?? []).forEach((layer, i) => {
        const el = layersRef.current[layer.id]
        if (!el) return
        tl.to(
          el,
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          `-=${i * 0.08}`,
        )
      })
    }

    // dialogue typing
    if (scene.lines && scene.lines.length) {
      // show each line in sequence
      scene.lines.forEach((line, li) => {
        tl.call(
          () => {
            if (!textRef.current) return
            const speaker = line.speaker
              ? `<strong>${line.speaker}:</strong> `
              : ''
            setTypeText(textRef.current, speaker + line.text)
            // animate characters
            const spans = Array.from(textRef.current.querySelectorAll('span'))
            gsap.to(spans, { opacity: 1, duration: 0.02, stagger: 0.02 })
          },
          undefined,
          `+=0.15`,
        )
        // hold time per line (adjust)
        tl.to({}, { duration: Math.max(1.5, line.text.length * 0.03) })
        // clear text for next line
        tl.call(
          () => {
            if (textRef.current) textRef.current.innerHTML = ''
          },
          undefined,
          '+=0',
        )
      })
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ width, height, borderRadius: 12, background: '#000' }}
    >
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${SCENES[0].bg})` }}
      />
      {/* layers */}
      {(SCENES[sceneIndex]?.layers ?? []).map((l) => (
        <div
          key={l.id}
          ref={(el) => {
            if (el) layersRef.current[l.id] = el
            else delete layersRef.current[l.id]
          }}
          className="absolute"
          style={{
            left: `${l.x ?? 50}px`,
            top: `${l.y ?? 50}px`,
            transform: `translateY(20px)`,
            opacity: 0,
            pointerEvents: 'none',
          }}
        >
          <img src={l.src} alt={l.id} style={{ width: (l.scale ?? 1) * 220 }} />
        </div>
      ))}

      {/* text box */}
      <div
        ref={textRef}
        className="absolute bottom-6 left-6 right-6 rounded-md bg-black/60 p-4 font-sans text-lg text-white"
        style={{ minHeight: 72, backdropFilter: 'blur(6px)' }}
      />

      {/* navigation for dev */}
      <div style={{ position: 'absolute', right: 8, top: 8, zIndex: 50 }}>
        <button
          onClick={() => setSceneIndex((i) => Math.max(0, i - 1))}
          className="mr-2 rounded bg-white/20 px-3 py-1 text-white"
        >
          ◀
        </button>
        <button
          onClick={() =>
            setSceneIndex((i) => Math.min(SCENES.length - 1, i + 1))
          }
          className="rounded bg-white/20 px-3 py-1 text-white"
        >
          ▶
        </button>
      </div>
    </div>
  )
}
