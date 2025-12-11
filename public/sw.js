/* eslint-disable @typescript-eslint/no-unused-vars */
const CACHE_NAME = 'mild-r-hdb-project-2025-assets-v3'
const FALLBACK_HTML = '/offline.html' // ถ้ามีหน้า offline

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

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) {
        return cached
      }
      // ถ้าไม่มีใน cache -> fetch จาก network, และเก็บลง cache แบบ runtime
      return fetch(req)
        .then((resp) => {
          // เก็บเฉพาะ response ที่เหมาะสม
          if (!resp || resp.status !== 200 || resp.type === 'opaque') {
            return resp
          }
          const respClone = resp.clone()
          caches.open(CACHE_NAME).then((cache) => {
            try {
              cache.put(req, respClone)
            } catch (e) {
              // ignore
            }
          })
          return resp
        })
        .catch(() => {
          // หากต้องการ fallback สุดท้าย เช่น html/page หรือ placeholder image
          if (req.destination === 'document') {
            return caches.match(FALLBACK_HTML)
          }
          return new Response(null, { status: 504 })
        })
    }),
  )
})

// รับ message จากหน้าเพื่อให้ SW cache URLs (วิธี B)
self.addEventListener('message', (event) => {
  const { type, urls } = event.data || {}
  if (type === 'CACHE_URLS' && Array.isArray(urls)) {
    // cache each url (no progress reporting here)
    caches.open(CACHE_NAME).then(async (cache) => {
      for (const u of urls) {
        try {
          const resp = await fetch(u, { credentials: 'same-origin' })
          if (resp && (resp.ok || resp.type === 'opaque')) {
            await cache.put(u, resp.clone())
          }
        } catch (e) {
          // ignore individual failures
          console.warn('SW cache failed for', u, e)
        }
      }
      // แจ้ง clients ว่า caching เสร็จ (simple)
      const clients = await self.clients.matchAll()
      for (const client of clients) {
        client.postMessage({ type: 'CACHE_DONE' })
      }
    })
  }
})
