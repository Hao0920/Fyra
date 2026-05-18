import { Workbox } from 'workbox-window'

let wb: Workbox | null = null

export function registerSW() {
  if ('serviceWorker' in navigator) {
    wb = new Workbox('/sw.js')

    wb.addEventListener('installed', (event) => {
      if (event.isUpdate) {
        if (confirm('发现新版本，是否立即更新？')) {
          wb?.messageSkipWaiting()
        }
      }
    })

    wb.addEventListener('waiting', () => {
      console.log('[PWA] New version waiting')
    })

    wb.addEventListener('activated', () => {
      window.location.reload()
    })

    wb.register()
      .then(() => console.log('[PWA] Service Worker registered'))
      .catch(err => console.error('[PWA] SW registration failed:', err))
  }
}

export function updateSW() {
  wb?.update()
}

export function skipWaiting() {
  wb?.messageSkipWaiting()
}

export function isInstalled(): boolean {
  return window.matchMedia('(display-mode: standalone)').matches ||
         (navigator as any).standalone === true
}

export function canInstall(): boolean {
  return 'BeforeInstallPromptEvent' in window && !isInstalled()
}

let deferredPrompt: any = null

export function captureInstallPrompt() {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt = e
    console.log('[PWA] Install prompt captured')
  })
}

export async function promptInstall(): Promise<boolean> {
  if (!deferredPrompt) return false
  deferredPrompt.prompt()
  const result = await deferredPrompt.userChoice
  deferredPrompt = null
  return result.outcome === 'accepted'
}
