/* eslint-disable no-inner-declarations */
/* eslint-disable no-async-promise-executor */
export async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return null

  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    })
    await navigator.serviceWorker.ready
    return registration
  } catch (err) {
    console.warn('service worker registration failed', err)
    return null
  }
}

export function cacheAssetsViaSW(
  urls: string[],
  onProgress?: (loaded: number, total: number) => void,
  timeoutMs = 120000,
) {
  return new Promise<void>(async (resolve, reject) => {
    if (!('serviceWorker' in navigator))
      return reject(new Error('Service Worker not supported'))

    try {
      const reg = await navigator.serviceWorker.ready
      const worker = reg.active || reg.waiting || reg.installing
      if (!worker) return reject(new Error('No active service worker'))

      let resolved = false

      function handleMessage(ev: MessageEvent) {
        const data = ev.data || {}
        if (!data || !data.type) return
        if (data.type === 'CACHE_PROGRESS') {
          onProgress?.(data.loaded ?? 0, data.total ?? 0)
        }
        if (data.type === 'CACHE_COMPLETE') {
          cleanup()
          resolved = true
          resolve()
        }
      }

      function cleanup() {
        navigator.serviceWorker.removeEventListener('message', handleMessage)
        clearTimeout(timer)
      }

      navigator.serviceWorker.addEventListener('message', handleMessage)

      const timer = setTimeout(() => {
        if (!resolved) {
          cleanup()
          reject(new Error('SW cache timeout'))
        }
      }, timeoutMs)

      try {
        worker.postMessage({ type: 'CACHE_URLS', urls })
      } catch (err) {
        cleanup()
        reject(err)
      }
    } catch (err) {
      reject(err)
    }
  })
}
