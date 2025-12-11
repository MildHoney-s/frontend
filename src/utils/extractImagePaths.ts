/* eslint-disable @typescript-eslint/no-explicit-any */
export function extractImagePaths(obj: any): string[] {
  const result: string[] = []
  const IMG_EXT = /\.(png|jpg|jpeg|webp|gif|svg)$/i

  const walk = (value: any) => {
    if (!value) return

    if (typeof value === 'string' && IMG_EXT.test(value)) {
      result.push(value)
      return
    }

    if (typeof value === 'object') {
      Object.values(value).forEach((v) => walk(v))
    }
  }

  walk(obj)
  return result
}
