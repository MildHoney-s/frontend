/* eslint-disable @typescript-eslint/no-unused-vars */
const CACHE_NAME = 'mild-r-hdb-project-2025-assets-v6'
const ASSET_EXT = ['png', 'jpg', 'jpeg', 'webp', 'gif']

self.addEventListener('install', (event) => {
  // ถ้าต้องการ precache บางไฟล์คงใส่ที่นี่
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

// ให้ SW serve จาก cache ก่อน แล้วหา network เป็น fallback
self.addEventListener('fetch', (event) => {
  const req = event.request

  // เราจะเน้น assets ของเรา (images, css, js) หรือ request same-origin
  if (req.method !== 'GET') return

  const url = new URL(req.url)
  const ext = url.pathname.split('.').pop().toLowerCase()

  // Only handle image files
  const isImage = ASSET_EXT.includes(ext)

  if (!isImage) {
    // Let browser handle React bundles normally
    return
  }

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached

      // ถ้าไม่มีใน cache -> fetch จาก network, และเก็บลง cache แบบ runtime
      return fetch(req)
        .then((resp) => {
          // เก็บเฉพาะ response ที่เหมาะสม
          if (!resp || resp.status !== 200) return resp

          const respClone = resp.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(req, respClone).catch(() => {})
          })

          return resp
        })
        .catch(() => new Response(null, { status: 504 }))
    }),
  )
})

// รับ message จากหน้าเพื่อให้ SW cache URLs (วิธี B)
self.addEventListener('message', (ev) => {
  const { type, urls, messageId, cacheName } = ev.data || {}
  if (type === 'CACHE_URLS' && Array.isArray(urls)) {
    caches.open(cacheName || CACHE_NAME).then(async (cache) => {
      let loaded = 0
      const total = urls.length
      for (const u of urls) {
        try {
          const r = await fetch(u, { credentials: 'same-origin' })
          if (r && (r.ok || r.type === 'opaque')) await cache.put(u, r.clone())
        } catch (e) {
          // ignore individual failures
        } finally {
          loaded += 1
          const clientsList = await self.clients.matchAll()
          for (const c of clientsList) {
            c.postMessage({ type: 'CACHE_PROGRESS', messageId, loaded, total })
          }
        }
      }
      const clientsList = await self.clients.matchAll()
      for (const c of clientsList) {
        c.postMessage({ type: 'CACHE_DONE', messageId })
      }
    })
  }
})
