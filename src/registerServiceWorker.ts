/* eslint-disable @typescript-eslint/no-explicit-any */
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
