import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { KeyRound } from 'lucide-react'

interface ManualTokenProps {
  onSubmit: (token: string) => void
}

export function ManualToken({ onSubmit }: ManualTokenProps) {
  const [token, setToken] = useState('')

  return (
    <div className="space-y-3">
      <div className="relative">
        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="password"
          placeholder="ghp_xxxxxxxxxxxx"
          value={token}
          onChange={e => setToken(e.target.value)}
          className="pl-9"
        />
      </div>
      <p className="text-xs text-muted-foreground">
        在 GitHub Settings → Developer settings → Personal access tokens → Tokens (classic) 生成，需 repo 权限
      </p>
      <Button onClick={() => token && onSubmit(token)} disabled={!token} variant="outline" className="w-full">
        使用 Token 登录
      </Button>
    </div>
  )
}
