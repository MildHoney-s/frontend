export type ProgressCallback = (loaded: number, total: number) => void

/**
 * Preload images with progress callback and optional AbortSignal.
 * Resolves when all images are done (load or error). Rejects on abort.
 */
export function preloadImagesWithProgress(
  srcList: string[],
  onProgress?: ProgressCallback,
  signal?: AbortSignal,
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted)
      return reject(new DOMException('aborted', 'AbortError'))

    const urls = srcList.filter(Boolean) as string[]
    const total = urls.length
    if (total === 0) {
      onProgress?.(0, 0)
      return resolve()
    }

    let loaded = 0
    const imgs: HTMLImageElement[] = []

    const markDone = () => {
      loaded++
      onProgress?.(loaded, total)
      if (loaded >= total) {
        resolve()
      }
    }

    urls.forEach((src) => {
      const img = new Image()
      imgs.push(img)
      img.onload = markDone
      img.onerror = markDone // treat error as done so it won't hang
      // set src after handlers
      img.src = src
    })

    if (signal) {
      signal.addEventListener(
        'abort',
        () => {
          // cleanup listeners
          imgs.forEach((i) => {
            i.onload = null
            i.onerror = null
          })
          reject(new DOMException('aborted', 'AbortError'))
        },
        { once: true },
      )
    }
  })
}

/**
 * Simple preload without progress/abort (convenience)
 */
export function preloadImages(srcList: string[]): void {
  srcList.filter(Boolean).forEach((src) => {
    const img = new Image()
    img.src = src
  })
}
