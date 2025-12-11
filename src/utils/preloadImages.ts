export type ProgressCallback = (loaded: number, total: number) => void

export function preloadImagesWithProgress(
  srcList: string[],
  onProgress?: ProgressCallback,
  signal?: AbortSignal,
  timeoutMs = 15000, // เพิ่ม timeout
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted)
      return reject(new DOMException('aborted', 'AbortError'))

    const urls = srcList.filter(Boolean)
    const total = urls.length
    if (total === 0) {
      onProgress?.(0, 0)
      return resolve()
    }

    let loaded = 0
    const imgs: HTMLImageElement[] = []
    const timers: number[] = []

    const markDone = () => {
      loaded++
      onProgress?.(loaded, total)
      if (loaded >= total) {
        cleanup()
        resolve()
      }
    }

    const cleanup = () => {
      imgs.forEach((img, i) => {
        img.onload = null
        img.onerror = null
        clearTimeout(timers[i])
      })
    }

    urls.forEach((src) => {
      const img = new Image()
      imgs.push(img)

      const idx = imgs.length - 1

      // timeout fallback
      timers[idx] = window.setTimeout(() => {
        markDone()
      }, timeoutMs)

      img.onload = () => {
        clearTimeout(timers[idx])
        markDone()
      }

      img.onerror = () => {
        clearTimeout(timers[idx])
        markDone()
      }

      img.src = src

      // FIX: ถ้ารูป cache-loaded แล้ว -> complete จะเป็น true
      if (img.complete) {
        clearTimeout(timers[idx])
        markDone()
      }
    })

    if (signal) {
      signal.addEventListener(
        'abort',
        () => {
          cleanup()
          reject(new DOMException('aborted', 'AbortError'))
        },
        { once: true },
      )
    }
  })
}
