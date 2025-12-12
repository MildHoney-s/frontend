export type ProgressCb = (done: number, total: number, url?: string) => void

const CACHE_NAME = 'mild-r-hdb-project-2025-assets-v4' // เปลี่ยนเวอร์ชันเมื่อ assets เปลี่ยนเพื่อลบ/รี-cache

export async function cacheAssets(
  urls: string[],
  options?: { signal?: AbortSignal; onProgress?: ProgressCb },
) {
  const { signal, onProgress } = options || {}
  const list = urls.filter(Boolean)
  const total = list.length
  let done = 0

  // helper to report progress
  const report = (url?: string) => {
    done++
    onProgress?.(done, total, url)
  }

  // If Cache API not available, fallback to classic preloading with Image()
  if (!('caches' in window)) {
    for (const url of list) {
      if (signal?.aborted) throw new DOMException('Aborted', 'AbortError')
      await new Promise<void>((resolve) => {
        const img = new Image()
        img.onload = () => {
          report(url)
          resolve()
        }
        img.onerror = () => {
          console.warn('image preload failed', url)
          report(url)
          resolve()
        }
        img.src = url
      })
    }
    return
  }

  const cache = await caches.open(CACHE_NAME)

  for (const url of list) {
    if (signal?.aborted) throw new DOMException('Aborted', 'AbortError')

    try {
      // ถ้ามีใน cache อยู่แล้ว ให้ข้าม
      const cached = await cache.match(url)
      if (cached) {
        report(url)
        continue
      }

      // fetch แล้วเก็บลง cache
      // NOTE: ถ้าไฟล์ข้ามโดเมน ต้องให้เซิร์ฟเวอร์อนุญาต CORS หรือจะได้ opaque response
      const resp = await fetch(url, { signal, credentials: 'same-origin' })
      // even if resp.ok === false we can still put (optional)
      if (resp && (resp.ok || resp.type === 'opaque')) {
        await cache.put(url, resp.clone())
      } else {
        console.warn('fetch failed for', url, resp.status)
      }
    } catch (err) {
      // fetch error or abort
      if ((err as DOMException)?.name === 'AbortError') throw err
      console.warn('cacheAssets: error caching', url, err)
    } finally {
      report(url)
    }
  }
}
