/* eslint-disable @typescript-eslint/no-unused-vars */
const CACHE_PREFIX = 'Mild-R-HBD2025-story-assets'
const CACHE_VERSION = 'v2' // เปลี่ยนเมื่อ deploy asset ใหม่
const CACHE_NAME = `${CACHE_PREFIX}-${CACHE_VERSION}`

self.addEventListener('install', (e) => {
  self.skipWaiting()
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    (async () => {
      const keys = await caches.keys()
      await Promise.all(
        keys.map((k) => {
          if (k !== CACHE_NAME && k.startsWith(CACHE_PREFIX))
            return caches.delete(k)
          return Promise.resolve()
        }),
      )
      await self.clients.claim()
    })(),
  )
})

self.addEventListener('message', (event) => {
  const data = event.data || {}
  if (!data || !data.type) return

  if (data.type === 'CACHE_URLS') {
    const urls = Array.isArray(data.urls) ? data.urls : []
    const clientId = event.source && event.source.id ? event.source.id : null
    cacheUrlsWithProgress(urls, clientId)
  }

  if (data.type === 'CLEAR_CACHE') {
    const keep = data.keepName
    clearOldCaches(keep)
  }
})

async function clearOldCaches(keepName) {
  const keys = await caches.keys()
  await Promise.all(
    keys.map((k) => (k === keepName ? Promise.resolve() : caches.delete(k))),
  )
}

async function cacheUrlsWithProgress(urls = [], targetClientId = null) {
  const total = urls.length
  if (total === 0) {
    postToClient(targetClientId, { type: 'CACHE_COMPLETE', total: 0 })
    return
  }

  const cache = await caches.open(CACHE_NAME)
  let loaded = 0

  for (const url of urls) {
    try {
      const resp = await fetch(url, {
        credentials: 'same-origin',
        mode: 'cors',
      })
      if (resp && resp.ok) {
        await cache.put(url, resp.clone())
      } else {
        try {
          await cache.put(url, resp.clone())
        } catch (e) {
          // ignore
        }
      }
    } catch (err) {
      // ignore fetch error
    } finally {
      loaded++
      postToClient(targetClientId, { type: 'CACHE_PROGRESS', loaded, total })
    }
  }

  postToClient(targetClientId, { type: 'CACHE_COMPLETE', loaded: total, total })
}

async function postToClient(targetClientId, message) {
  try {
    if (targetClientId) {
      const client = await self.clients.get(targetClientId)
      client?.postMessage(message)
    } else {
      const all = await self.clients.matchAll({ includeUncontrolled: true })
      all.forEach((c) => c.postMessage(message))
    }
  } catch (e) {
    // ignore
  }
}
