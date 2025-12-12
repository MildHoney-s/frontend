/* eslint-disable @typescript-eslint/no-explicit-any */
export type ProgressCb = (loaded: number, total: number) => void

const DEFAULT_SW_CACHE_NAME = 'mild-r-hdb-project-2025-assets-v4'
const SW_MESSAGE_TIMEOUT = 8000 // ms: ถ้า SW ไม่ตอบภายในเวลานี้ ให้ fallback

export async function registerSW() {
  if ('serviceWorker' in navigator) {
    try {
      const reg = await navigator.serviceWorker.register('/service-worker.js', {
        scope: '/',
      })
      console.log('SW registered', reg)

      // optional: wait until active
      if (!navigator.serviceWorker.controller) {
        // refresh so that new SW takes control (optional)
      }
      return reg
    } catch (err) {
      console.warn('SW register failed', err)
    }
  }
  return null
}

export function sendMessageToSW(msg: any) {
  if (!navigator.serviceWorker.controller) return
  navigator.serviceWorker.controller.postMessage(msg)
}

export async function cacheAssetsViaSW(
  urls: string[],
  onProgress?: ProgressCb,
  options?: { cacheName?: string; signal?: AbortSignal },
): Promise<void> {
  const { cacheName = DEFAULT_SW_CACHE_NAME, signal } = options || {}
  const list = urls.filter(Boolean)
  const total = list.length

  // helper progress reporter
  const report = (loaded: number) => {
    try {
      onProgress?.(loaded, total)
    } catch {
      /* empty */
    }
  }

  // Abort check helper
  function throwIfAborted() {
    if (signal?.aborted) throw new DOMException('Aborted', 'AbortError')
  }

  // 1) Try via Service Worker (postMessage), correlate with messageId
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    const messageId = Math.random().toString(36).slice(2, 9)
    let resolved = false

    return new Promise<void>((resolve, reject) => {
      // cleanup function
      const cleanup = () => {
        navigator.serviceWorker.removeEventListener('message', onMessage)
        clearTimeout(timeoutId)
      }

      // message handler (listen for progress/done/error from SW)
      const onMessage = (ev: MessageEvent) => {
        const data = ev.data || {}
        if (!data || data.messageId !== messageId) return

        if (data.type === 'CACHE_PROGRESS') {
          // SW might send { type: 'CACHE_PROGRESS', messageId, loaded, total }
          report(Number(data.loaded) || 0)
          return
        }

        if (data.type === 'CACHE_DONE') {
          resolved = true
          cleanup()
          report(total)
          resolve()
          return
        }

        if (data.type === 'CACHE_ERROR') {
          // SW reports an error — fallback
          cleanup()
          resolved = true
          reject(new Error(data.reason || 'ServiceWorker cache error'))
          return
        }
      }

      // timeout: if SW doesn't respond, fallback to client caching
      const timeoutId = setTimeout(() => {
        if (resolved) return
        navigator.serviceWorker.removeEventListener('message', onMessage)
        // fallback path below will run (we call the helper)
        doFallbackCaching().then(resolve).catch(reject)
      }, SW_MESSAGE_TIMEOUT)

      navigator.serviceWorker.addEventListener('message', onMessage)

      // send message to SW to cache urls
      try {
        throwIfAborted()
        navigator.serviceWorker.controller!.postMessage({
          type: 'CACHE_URLS',
          messageId,
          urls: list,
          cacheName,
        })
      } catch (err) {
        cleanup()
        // immediate fallback
        doFallbackCaching().then(resolve).catch(reject)
      }
    })
  }

  // 2) If no SW controller, fallback to in-page caching
  return doFallbackCaching()

  // ---------- helper: fallback caching implemented in page ----------
  async function doFallbackCaching(): Promise<void> {
    throwIfAborted()

    const listToCache = Array.from(new Set(list.filter(Boolean))) // ensure unique
    const totalItems = listToCache.length
    if (totalItems === 0) {
      // nothing to do, but report zero progress
      report(0)
      return
    }

    // If no CacheStorage, fallback to Image preloading
    if (!('caches' in window)) {
      let loaded = 0
      for (const u of listToCache) {
        throwIfAborted()
        await new Promise<void>((res) => {
          const img = new Image()
          img.onload = () => {
            loaded += 1
            report(Math.min(loaded, totalItems))
            res()
          }
          img.onerror = () => {
            loaded += 1
            report(Math.min(loaded, totalItems))
            res()
          }
          img.src = u
        })
      }
      return
    }

    const cache = await caches.open(cacheName)
    let loaded = 0

    for (const u of listToCache) {
      throwIfAborted()
      try {
        // check if already cached
        const existing = await cache.match(u)
        if (existing) {
          // count it as loaded once and continue to next
          loaded += 1
          report(Math.min(loaded, totalItems))
          continue
        }

        const resp = await fetch(u, { credentials: 'same-origin', signal })
        if (resp && (resp.ok || resp.type === 'opaque')) {
          try {
            await cache.put(u, resp.clone())
          } catch (putErr) {
            console.warn('cache.put failed for', u, putErr)
          }
        } else {
          console.warn(
            'fetch failed for',
            u,
            resp && (resp.status || resp.type),
          )
        }

        // count successful/failure after attempting fetch/put
        loaded += 1
        report(Math.min(loaded, totalItems))
      } catch (err) {
        if ((err as DOMException)?.name === 'AbortError') throw err
        // On error, still count the item to avoid blocking progress
        loaded += 1
        report(Math.min(loaded, totalItems))
        console.warn('fetch error for', u, err)
      }
    }
    return
  }
}
