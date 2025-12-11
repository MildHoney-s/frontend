/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from 'react'

type Key = string | string[]
type KeyboardEventName = 'keydown' | 'keyup' | 'keypress'

export default function useKeyPress(
  targetKey: Key,
  callback: (event: KeyboardEvent) => void,
  eventType: KeyboardEventName = 'keydown',
) {
  const keys = Array.isArray(targetKey) ? targetKey : [targetKey]
  const memoizedCallback = useCallback(callback, [callback])

  useEffect(() => {
    const handleKey = (event: DocumentEventMap[typeof eventType]) => {
      const e = event as KeyboardEvent
      const pressedKey = e.key.toLowerCase()

      if (keys.some((k) => k.toLowerCase() === pressedKey)) {
        memoizedCallback(e)
      }
    }

    document.addEventListener(eventType, handleKey as EventListener)
    return () =>
      document.removeEventListener(eventType, handleKey as EventListener)
  }, [keys.join(','), memoizedCallback, eventType])
}
