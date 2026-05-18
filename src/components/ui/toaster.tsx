import { useToast } from "@/hooks/use-toast"

export function Toaster() {
  const { toasts } = useToast()
  if (toasts.length === 0) return null
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div key={toast.id} className="rounded-lg border bg-background px-4 py-3 shadow-lg text-sm">
          {toast.title && <div className="font-medium">{toast.title}</div>}
          {toast.description && <div className="text-muted-foreground">{toast.description}</div>}
        </div>
      ))}
    </div>
  )
}
