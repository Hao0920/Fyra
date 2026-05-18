import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSyncStore } from '@/stores/useSyncStore';
import { InstallPrompt } from '@/components/pwa/InstallPrompt';
import { OfflineIndicator } from '@/components/pwa/OfflineIndicator';
import {
  Home, PlusCircle, Wallet, FolderOpen, Target,
  CalendarDays, Search, Settings,
  CheckCircle2, AlertCircle, Loader2, CloudOff
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', icon: Home, label: '首页' },
  { path: '/accounts', icon: Wallet, label: '账户' },
  { path: '/projects', icon: FolderOpen, label: '项目' },
  { path: '/budgets', icon: Target, label: '预算' },
  { path: '/calendar', icon: CalendarDays, label: '日历' },
  { path: '/search', icon: Search, label: '搜索' },
  { path: '/settings', icon: Settings, label: '设置' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { status, sync } = useSyncStore();
  const [showNav, setShowNav] = useState(true);

  useEffect(() => {
    const handleScroll = () => setShowNav(window.scrollY < 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isRecordPage = location.pathname === '/record';

  return (
    <div className="min-h-screen bg-background pb-20">
      <OfflineIndicator />
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
        <div className="flex h-14 items-center justify-between px-4">
          <h1 className="text-lg font-semibold">Fyra</h1>
          <button onClick={() => sync()} className="flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium" disabled={status === 'syncing'}>
            {status === 'syncing' && <Loader2 className="h-3 w-3 animate-spin" />}
            {status === 'success' && <CheckCircle2 className="h-3 w-3 text-green-500" />}
            {status === 'error' && <AlertCircle className="h-3 w-3 text-red-500" />}
            {status === 'idle' && <CloudOff className="h-3 w-3 text-muted-foreground" />}
            <span className={cn(status === 'error' && 'text-red-500', status === 'success' && 'text-green-500', status === 'idle' && 'text-muted-foreground')}>
              {status === 'syncing' ? '同步中' : status === 'success' ? '已同步' : status === 'error' ? '失败' : '未同步'}
            </span>
          </button>
        </div>
      </header>
      <main className={cn("px-4 py-4", isRecordPage && "px-0 py-0")}>{children}</main>
      {!isRecordPage && (
        <nav className={cn("fixed bottom-0 left-0 right-0 z-50 border-t bg-background/80 backdrop-blur-md transition-transform", !showNav && "translate-y-full")}>
          <div className="flex h-16 items-center justify-around px-2 safe-area-pb">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link key={path} to={path} className={cn("flex flex-col items-center gap-0.5 rounded-lg px-3 py-1 text-xs transition-colors", location.pathname === path ? "text-primary" : "text-muted-foreground hover:text-foreground")}>
                <Icon className="h-5 w-5" /><span>{label}</span>
              </Link>
            ))}
          </div>
        </nav>
      )}
      {!isRecordPage && (
        <Link to="/record" className="fixed bottom-20 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95">
          <PlusCircle className="h-7 w-7" />
        </Link>
      )}
      <InstallPrompt />
    </div>
  );
}
