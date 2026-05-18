import { useState, useEffect } from 'react'
import { isInstalled, canInstall, promptInstall } from '@/lib/pwa'
import { Button } from '@/components/ui/button'
import { Download, X, Smartphone } from 'lucide-react'
import { cn } from '@/lib/utils'

export function InstallPrompt() {
  const [show, setShow] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      const installed = isInstalled()
      const dismissedBefore = localStorage.getItem('pwa-install-dismissed')
      if (!installed && !dismissedBefore && canInstall()) {
        setShow(true)
      }
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleDismiss = () => {
    setShow(false)
    setDismissed(true)
    localStorage.setItem('pwa-install-dismissed', 'true')
  }

  const handleInstall = async () => {
    const success = await promptInstall()
    if (success) setShow(false)
  }

  if (!show || dismissed) return null

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 rounded-xl border bg-background p-4 shadow-lg animate-in slide-in-from-bottom-4">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <Smartphone className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-sm">安装到主屏幕</h3>
          <p className="text-xs text-muted-foreground mt-0.5">像原生 App 一样使用，支持离线记账和自动同步</p>
          <div className="flex gap-2 mt-3">
            <Button size="sm" className="flex-1" onClick={handleInstall}>
              <Download className="h-3.5 w-3.5 mr-1" /> 安装
            </Button>
            <Button size="sm" variant="ghost" onClick={handleDismiss}>
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
