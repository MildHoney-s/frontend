/* eslint-disable @typescript-eslint/no-explicit-any */
export function extractAssetPaths(input: unknown): string[] {
  const out: string[] = []
  const seen = new Set<unknown>()

  function walk(node: unknown) {
    if (node == null) return

    if (typeof node === 'string') {
      out.push(node)
      return
    }

    if (Array.isArray(node)) {
      for (const item of node) walk(item)
      return
    }

    if (typeof node === 'object') {
      // avoid circular refs
      if (seen.has(node)) return
      seen.add(node)

      for (const key of Object.keys(node as Record<string, unknown>)) {
        walk((node as Record<string, unknown>)[key])
      }
    }
  }

  walk(input)
  return out
}
