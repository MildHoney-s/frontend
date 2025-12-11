export type AssetMap = Record<string, string>

export function prefixKeys(obj: AssetMap, prefix: string): AssetMap {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [`${prefix}_${k}`, v]),
  )
}
