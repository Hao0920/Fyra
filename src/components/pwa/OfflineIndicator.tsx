import { useState, useEffect } from 'react'
import { WifiOff, Wifi } from 'lucide-react'
import { cn } from '@/lib/utils'

export function OfflineIndicator() {
  const [online, setOnline] = useState(navigator.onLine)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleOnline = () => { setOnline(true); setShow(true); setTimeout(() => setShow(false), 3000) }
    const handleOffline = () => { setOnline(false); setShow(true) }
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    if (!navigator.onLine) setShow(true)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (!show) return null

  return (
    <div className={cn(
      "fixed top-14 left-0 right-0 z-40 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium transition-colors",
      online ? "bg-green-500/90 text-white" : "bg-yellow-500/90 text-black"
    )}>
      {online ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
      {online ? '已恢复网络连接' : '离线模式 - 数据将在联网后同步'}
    </div>
  )
}
