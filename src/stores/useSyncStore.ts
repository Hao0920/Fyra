import { create } from 'zustand';
import { GitSyncEngine } from '@/lib/git-sync';
import { db } from '@/lib/db';
import type { SyncState, SyncStatus } from '@/types';

interface SyncStore extends SyncState {
  engine: GitSyncEngine | null;
  initSync: () => Promise<void>;
  sync: () => Promise<void>;
  restore: () => Promise<void>;
  setStatus: (status: SyncStatus) => void;
}

export const useSyncStore = create<SyncStore>((set, get) => ({
  status: 'idle',
  lastSync: null,
  error: null,
  pendingChanges: 0,
  engine: null,

  initSync: async () => {
    const settings = (await db.settings.toArray())[0];
    if (!settings?.githubToken || !settings?.githubRepo) return;

    const [owner, repo] = settings.githubRepo.split('/');
    if (!owner || !repo) return;

    const engine = new GitSyncEngine({
      token: settings.githubToken,
      owner,
      repo,
      branch: settings.githubBranch || 'main',
      encrypt: settings.encryptData,
      password: settings.encryptPassword,
    });

    await engine.init();
    set({ engine });
    await engine.restore();
  },

  sync: async () => {
    const { engine } = get();
    if (!engine) {
      set({ status: 'error', error: '未配置同步' });
      return;
    }

    set({ status: 'syncing', error: null });
    const result = await engine.sync();
    set(result);
  },

  restore: async () => {
    const { engine } = get();
    if (!engine) return;
    await engine.restore();
  },

  setStatus: (status) => set({ status }),
}));

let lastCount = 0;
setInterval(async () => {
  const count = await db.transactions.count();
  if (count !== lastCount) {
    lastCount = count;
    const state = useSyncStore.getState();
    if (state.status === 'success' || state.status === 'idle') {
      useSyncStore.setState({ pendingChanges: count });
    }
  }
}, 5000);
