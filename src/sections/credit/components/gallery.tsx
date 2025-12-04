/* eslint-disable @typescript-eslint/no-explicit-any */
import type { LightGallery as ILightGallery } from 'lightgallery/lightgallery'
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'
import LightGallery from 'lightgallery/react'
import { useCallback, useRef, useState } from 'react'

import type { Member } from '../_mock/Member'

type GalleryModalProps = {
  member: Member
  onClose: () => void
}

type LightGalleryInitDetail = { instance: ILightGallery } | ILightGallery

function extractLGInstance(
  detail: LightGalleryInitDetail,
): ILightGallery | null {
  if (!detail) return null
  if (typeof detail === 'object' && 'instance' in detail && detail.instance) {
    return detail.instance as ILightGallery
  }
  return detail as ILightGallery
}

type LGMaybeWithOpen = {
  openGallery?: () => void
} & Partial<ILightGallery>

function hasOpenGallery(x: unknown): x is LGMaybeWithOpen {
  return (
    typeof x === 'object' &&
    x !== null &&
    'openGallery' in x &&
    typeof (x as any).openGallery === 'function'
  )
}

// ----------------------------------------------------------------------

export default function GalleryModal({ member, onClose }: GalleryModalProps) {
  const lgRef = useRef<ILightGallery | null>(null)
  const [initFailed, setInitFailed] = useState(false)

  const images = member.gallery ?? []

  const dynamicEl = images.map((src) => ({
    src,
    thumb: src,
    responsive: src,
    subHtml: `<div style="padding:8px;"><h2>${member.name}'s Gallery</h2><p class="font-prompt">ภาพนี้จัดทำขึ้นเพื่อใช้ในโปรเจกต์วันเกิดเท่านั้น ห้ามนำไปใช้ในเชิงพาณิชย์ หรือดัดแปลง โดยมิได้รับอนุญาต</p></div>`,
  }))

  const onInit = useCallback((detail: LightGalleryInitDetail) => {
    const inst = extractLGInstance(detail)

    if (!inst) {
      console.error('[Gallery] onInit: missing instance', detail)
      setInitFailed(true)
      return
    }

    lgRef.current = inst

    if (hasOpenGallery(inst)) {
      try {
        inst.openGallery()
      } catch (err) {
        console.error('[Gallery] openGallery failed', err)
        setInitFailed(true)
      }
    } else {
      console.warn(
        '[Gallery] instance has no openGallery method — falling back to clickable thumbnails',
      )
      setInitFailed(true)
    }
  }, [])

  const onAfterClose = useCallback(() => {
    onClose()
  }, [onClose])

  if (!images.length) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
        <div className="relative w-full max-w-[900px] rounded-lg bg-white p-6 text-black shadow-xl">
          <button
            onClick={onClose}
            aria-label="Close gallery"
            className="absolute right-4 top-4 text-xl"
          >
            ×
          </button>
          <h2 className="mb-4 text-xl font-semibold">
            {member.name}'s Gallery
          </h2>
          <p className="py-20 text-center text-gray-500">No gallery items.</p>
        </div>
      </div>
    )
  }

  if (initFailed) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
        <div
          className="relative w-full max-w-[1100px] overflow-hidden rounded-lg bg-white p-6 text-black shadow-xl md:w-[95%] lg:max-w-[1300px]"
          style={{ maxHeight: 'calc(100vh - 48px)' }}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={onClose}
            aria-label="Close gallery"
            className="absolute right-4 top-4 z-40 text-xl text-gray-600 hover:text-black"
          >
            ×
          </button>
          <h2 className="mb-4 text-xl font-semibold">
            {member.name}'s Gallery (fallback)
          </h2>

          <div style={{ maxHeight: 'calc(100vh - 220px)', overflow: 'auto' }}>
            <LightGallery
              onInit={(d) =>
                (lgRef.current = (d as any)?.instance ?? (d as any))
              }
              plugins={[lgZoom, lgThumbnail]}
              speed={450}
              download={false}
              onAfterClose={onAfterClose}
            >
              <div className="grid grid-cols-3 gap-3">
                {images.map((src, i) => (
                  <a
                    key={src + i}
                    className="lgitem block overflow-hidden rounded-md"
                    href={src}
                    data-sub-html={`<strong>${member.name}</strong>`}
                  >
                    <img
                      src={src}
                      alt={`${member.name} ${i + 1}`}
                      className="h-36 w-full object-cover"
                      loading="lazy"
                    />
                  </a>
                ))}
              </div>
            </LightGallery>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div style={{ height: 'calc(100vh - 220px)', minHeight: 320 }}>
        <LightGallery
          onInit={onInit}
          dynamic
          dynamicEl={dynamicEl}
          plugins={[lgZoom, lgThumbnail]}
          download={true}
          onAfterClose={onAfterClose}
        />
      </div>
    </div>
  )
}
