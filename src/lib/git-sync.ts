import git from 'isomorphic-git';
import http from 'isomorphic-git/http/web';
import LightningFS from '@isomorphic-git/lightning-fs';
import { db } from './db';
import type { SyncConfig } from '@/types';

const DATA_FILE = 'data.json';

export class GitSyncEngine {
  private fs: any;
  private dir: string;
  private config: SyncConfig;

  constructor(config: SyncConfig) {
    this.config = config;
    this.dir = `/fyra-${config.owner}-${config.repo}`;
    this.fs = new (LightningFS as any)('fyra-fs');
  }

  async init() {
    try {
      await this.fs.promises.mkdir(this.dir);
    } catch {
      // directory exists
    }

    try {
      await git.clone({
        fs: this.fs,
        http,
        dir: this.dir,
        url: `https://github.com/${this.config.owner}/${this.config.repo}`,
        ref: this.config.branch,
        singleBranch: true,
        onAuth: () => ({ username: this.config.token }),
      });
    } catch (e: any) {
      if (e.message?.includes('not found')) {
        await git.init({ fs: this.fs, dir: this.dir, defaultBranch: this.config.branch });
      } else {
        throw e;
      }
    }
  }

  async sync() {
    try {
      await this.pull();
      const data = await this.exportData();
      const payload = JSON.stringify(data, null, 2);
      await this.fs.promises.writeFile(`${this.dir}/${DATA_FILE}`, payload);

      const status = await git.status({ fs: this.fs, dir: this.dir, filepath: DATA_FILE });
      if (status !== 'unmodified') {
        await git.add({ fs: this.fs, dir: this.dir, filepath: DATA_FILE });
        await git.commit({
          fs: this.fs,
          dir: this.dir,
          message: `sync: ${new Date().toISOString()}`,
          author: { name: 'Fyra', email: 'fyra@local' },
        });
        await git.push({
          fs: this.fs,
          http,
          dir: this.dir,
          remote: 'origin',
          ref: this.config.branch,
          onAuth: () => ({ username: this.config.token }),
        });
      }
      return { status: 'success', lastSync: new Date().toISOString(), error: null, pendingChanges: 0 };
    } catch (e: any) {
      return { status: 'error', lastSync: null, error: e.message, pendingChanges: 0 };
    }
  }

  async pull() {
    try {
      await git.pull({
        fs: this.fs,
        http,
        dir: this.dir,
        remote: 'origin',
        ref: this.config.branch,
        onAuth: () => ({ username: this.config.token }),
        fastForwardOnly: true,
      });
    } catch {
      // first time
    }
  }

  private async exportData() {
    return {
      version: 1,
      exportedAt: new Date().toISOString(),
      transactions: await db.transactions.toArray(),
      accounts: await db.accounts.toArray(),
      categories: await db.categories.toArray(),
      projects: await db.projects.toArray(),
      tags: await db.tags.toArray(),
      budgets: await db.budgets.toArray(),
      settings: (await db.settings.toArray())[0],
    };
  }
}