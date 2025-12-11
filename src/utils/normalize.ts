export const normalize = <T extends HTMLElement = HTMLElement>(
  maybe: Element | Element[] | NodeListOf<Element> | null | undefined,
): T[] => {
  if (!maybe) return [] as T[]
  if (maybe instanceof Element) return [maybe as T]
  if (maybe instanceof NodeList) return Array.from(maybe) as T[]
  if (Array.isArray(maybe)) return maybe as T[]
  return [] as T[]
}
